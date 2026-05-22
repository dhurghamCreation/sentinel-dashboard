import os
import json
import hashlib

def create_shards(file_path, n=10):
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    # 1. Setup paths
    base_dir = os.path.dirname(os.path.dirname(os.getcwd()))
    vault_path = os.path.join(base_dir, "vault_storage")
    os.makedirs(vault_path, exist_ok=True)

    # 2. Read File
    with open(file_path, 'rb') as f:
        data = f.read()

    # 3. Simple Sharding Logic
    shard_size = (len(data) + n - 1) // n
    shards_info = {}

    for i in range(n):
        chunk = data[i*shard_size : (i+1)*shard_size]
        shard_name = f"shard_{i}.dat"
        full_shard_path = os.path.join(vault_path, shard_name)
        
        with open(full_shard_path, 'wb') as sf:
            sf.write(chunk)
        
        # Calculate Hash for Manifest
        shards_info[shard_name] = hashlib.sha256(chunk).hexdigest()

    # 4. Create the 'Bridge' (manifest.json)
    manifest = {
        "file_name": os.path.basename(file_path),
        "total_shards": n,
        "hashes": shards_info
    }
    
    manifest_path = os.path.join(vault_path, "manifest.json")
    with open(manifest_path, 'w') as mf:
        json.dump(manifest, mf, indent=4)

    print(f"--- SUCCESS ---")
    print(f"Vault created at: {vault_path}")
    print(f"Manifest generated: {manifest_path}")

if __name__ == '__main__':
    import sys
    file_to_process = sys.argv[1] if len(sys.argv) > 1 else "../../my_secret.txt"
    create_shards(file_to_process)
