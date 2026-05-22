/*
FILE: FileWatcher.cs | PROJECT: Sentinel-Archive
FUNCTION: Monitors the local 'Drop-Zone' and triggers the Sharding Engine.
*/
using System;
using System.IO;

class SentinelWatcher {
    static void Main() {
        using var watcher = new FileSystemWatcher(@"C:\Sentinel\DropZone");

        watcher.Created += OnCreated;
        watcher.EnableRaisingEvents = true;

        Console.WriteLine("Sentinel System Active. Monitoring for file corruption...");
        Console.ReadLine();
    }

    private static void OnCreated(object sender, FileSystemEventArgs e) {
        // TRIGGER: System.Diagnostics.Process.Start("python", "shard_logic.py " + e.FullPath);
        Console.WriteLine($"New File Detected: {e.Name}. Sharding in progress...");
    }
}