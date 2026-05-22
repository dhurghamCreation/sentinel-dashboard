import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Cpu,
  Globe2,
  HardDrive,
  Lock,
  Radar,
  RefreshCw,
  Server,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

const APP_VERSION = '2.1.0';

const metricCards = [
  {
    id: 'storage',
    title: 'Protected Capacity',
    value: '12.8 PB',
    delta: '+4.8% this week',
    icon: HardDrive,
    color: 'text-emerald-300',
  },
  {
    id: 'latency',
    title: 'Cross-Region Latency',
    value: '3.9 ms',
    delta: '-0.6 ms optimized',
    icon: Radar,
    color: 'text-sky-300',
  },
  {
    id: 'clusters',
    title: 'Active Clusters',
    value: '1,408',
    delta: '+22 nodes online',
    icon: Server,
    color: 'text-fuchsia-300',
  },
  {
    id: 'encryption',
    title: 'Encryption Strength',
    value: 'AES-256 + PQC',
    delta: 'Compliance aligned',
    icon: Lock,
    color: 'text-amber-300',
  },
];

const incidentFeed = [
  { time: '14:02:01', level: 'ok', text: 'Shard_4 verified with deterministic checksum match.' },
  { time: '14:02:05', level: 'critical', text: 'Integrity drift detected in shard group alpha-0.' },
  { time: '14:02:06', level: 'info', text: 'Parity stream requested from Dublin and Frankfurt mirrors.' },
  { time: '14:02:10', level: 'ok', text: 'Recovery window established. Zero data-loss path available.' },
];

const services = [
  { name: 'Vault Mesh', health: 99.99 },
  { name: 'Parity Engine', health: 98.44 },
  { name: 'Quantum Relay', health: 97.82 },
  { name: 'Threat Firewall', health: 99.2 },
];

export default function SentinelDashboard() {
  const [status, setStatus] = useState('Critical');
  const [healing, setHealing] = useState(false);

  const riskScore = useMemo(() => (status === 'Healthy' ? 7 : 72), [status]);

  const initiateHealing = () => {
    if (healing || status === 'Healthy') {
      return;
    }
    setHealing(true);
    setTimeout(() => {
      setStatus('Healthy');
      setHealing(false);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(14,165,233,0.20),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(244,114,182,0.12),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(20,184,166,0.14),transparent_28%)]" />

      <main className="relative mx-auto max-w-7xl p-4 pb-10 md:p-8">
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-7 rounded-3xl border border-slate-800/90 bg-slate-900/70 p-5 shadow-[0_20px_80px_rgba(2,6,23,0.55)] backdrop-blur"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-2">
                <Shield className="h-7 w-7 text-sky-300" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight md:text-3xl">
                  Sentinel Archive Command Grid
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  High-trust recovery orchestration for multi-region vault systems.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                Secure Mesh Online
              </span>
              <span className="rounded-full border border-slate-700 bg-slate-800/90 px-3 py-1 text-slate-300">
                Version {APP_VERSION}
              </span>
            </div>
          </div>
        </motion.header>

        <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 * idx }}
                className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.18em] text-slate-400">{card.title}</span>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
                <p className="text-2xl font-extrabold text-slate-100">{card.value}</p>
                <p className="mt-1 text-xs text-slate-400">{card.delta}</p>
              </motion.article>
            );
          })}
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <motion.article
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 xl:col-span-2"
          >
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Global Integrity</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">
                  {status === 'Healthy' ? 'System Stable' : 'Threat Detected'}
                </h2>
              </div>
              <div
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${
                  status === 'Healthy'
                    ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300'
                    : 'border-rose-400/30 bg-rose-500/10 text-rose-300'
                }`}
              >
                {status === 'Healthy' ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                {status}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
              <div className="md:col-span-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                    <span>Adaptive Risk Score</span>
                    <span>{riskScore}/100</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${riskScore}%` }}
                      transition={{ duration: 0.7 }}
                      className={`h-full rounded-full ${status === 'Healthy' ? 'bg-emerald-400' : 'bg-rose-400'}`}
                    />
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                      <p className="text-xs text-slate-400">Recovery SLA</p>
                      <p className="mt-1 flex items-center gap-2 font-semibold text-emerald-300">
                        <Clock3 className="h-4 w-4" /> 2m 21s
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                      <p className="text-xs text-slate-400">Threat Scan Rate</p>
                      <p className="mt-1 flex items-center gap-2 font-semibold text-sky-300">
                        <Activity className="h-4 w-4" /> 64.2k/s
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={initiateHealing}
                  disabled={healing || status === 'Healthy'}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-sky-400/30 bg-gradient-to-r from-sky-600 to-cyan-500 px-4 py-3 font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${healing ? 'animate-spin' : ''}`} />
                  {status === 'Healthy' ? 'System Already Restored' : healing ? 'Reconstructing Parity...' : 'Initialize Autonomous Healing'}
                </button>
              </div>

              <div className="md:col-span-2">
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Service Health</span>
                    <Cpu className="h-4 w-4 text-slate-500" />
                  </div>
                  <div className="space-y-3">
                    {services.map((service) => (
                      <div key={service.name}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="text-slate-300">{service.name}</span>
                          <span className="text-slate-400">{service.health.toFixed(2)}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-teal-400 to-sky-400"
                            style={{ width: `${service.health}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm uppercase tracking-[0.22em] text-slate-400">Live Incident Feed</h3>
              <Sparkles className="h-4 w-4 text-amber-300" />
            </div>

            <div className="space-y-3 text-xs">
              {incidentFeed.map((item, idx) => (
                <motion.div
                  key={`${item.time}-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.06 }}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"
                >
                  <p className="mb-1 font-mono text-[11px] text-slate-400">[{item.time}]</p>
                  <p
                    className={
                      item.level === 'critical'
                        ? 'text-rose-300'
                        : item.level === 'ok'
                          ? 'text-emerald-300'
                          : 'text-sky-300'
                    }
                  >
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs text-slate-300">
              <p className="mb-2 flex items-center gap-2 text-slate-200">
                <Globe2 className="h-4 w-4 text-teal-300" /> Geo Replication
              </p>
              <p>Regions synchronized: eu-west-1, eu-central-1, us-east-2</p>
            </div>
          </motion.aside>
        </section>

        <footer className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-xs text-slate-400 md:grid-cols-3">
          <p className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-300" /> Autonomous incident response active
          </p>
          <p className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-sky-300" /> Zero-trust posture enforced
          </p>
          <p className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-300" /> Recovery readiness: Tier-1
          </p>
        </footer>
      </main>
    </div>
  );
}
