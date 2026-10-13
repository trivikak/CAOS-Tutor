import { lessons, projects } from './course';
export type Progress = { read: string[]; solved: string[]; tasks: string[]; notes: Record<string, string> };
export const storageKey = 'rpi-caos-progress-v1';
export function readProgress(): Progress {
  const empty: Progress = { read: [], solved: [], tasks: [], notes: {} };
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (!raw || typeof raw !== 'object') return empty;
    const p = raw as Record<string, unknown>;
    const ids = lessons.map(l => l.id);
    const taskIds = projects.flatMap(p => p.steps.map((_, i) => `${p.id}-${i}`));
    const strings = (v: unknown, allowed: string[]) => Array.isArray(v) ? [...new Set(v.filter((s): s is string => typeof s === 'string' && allowed.includes(s)))] : [];
    return { read: strings(p.read, ids), solved: strings(p.solved, ids), tasks: strings(p.tasks, taskIds), notes: p.notes && typeof p.notes === 'object' ? Object.fromEntries(Object.entries(p.notes).filter(([k,v]) => ids.includes(k) && typeof v === 'string')) : {} };
  } catch { return empty; }
}
