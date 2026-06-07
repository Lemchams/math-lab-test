'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

type Cube = {
  id: number;
};

type Spark = {
  id: number;
  left: string;
  top: string;
  delay: number;
};

export function MathLabModule() {
  const [units, setUnits] = useState<Cube[]>([]);
  const [dizaines, setDizaines] = useState(0);
  const [fusionCount, setFusionCount] = useState(0);
  const [merging, setMerging] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const fusionLockRef = useRef(false);

  const sparkles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => ({
        id: index,
        left: `${10 + index * 7}%`,
        top: `${18 + (index % 3) * 10}%`,
        delay: index * 40,
      })),
    []
  );

  const triggerSparkles = () => {
    setSparks(sparkles);
    window.setTimeout(() => setSparks([]), 850);
  };

  const addCube = () => {
    setUnits((current) => {
      const next = [...current, { id: Date.now() + Math.random() }];

      if (next.length === 10 && !fusionLockRef.current) {
        fusionLockRef.current = true;
        setMerging(true);
        triggerSparkles();

        window.setTimeout(() => {
          setUnits([]);
          setDizaines((value) => value + 1);
          setFusionCount((value) => value + 1);
          setMerging(false);
          fusionLockRef.current = false;
        }, 700);
      }

      return next;
    });
  };

  return (
    <main className="min-h-screen px-4 py-8 text-slate-900 md:px-6 lg:px-8">
      <section className="mx-auto flex max-w-6xl flex-col rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)] backdrop-blur md:p-8">
        <header className="mb-8 flex flex-col gap-3 border-b border-slate-200 pb-6">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">La Fabrique des Nombres</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">Numération de position (6ème)</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">Clique sur les cubes pour construire des unités puis observe la magie de la fusion vers les dizaines.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-700">
              <Sparkles className="h-4 w-4" />
              Animations Framer Motion
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Unités</p>
                <h2 className="text-xl font-semibold text-slate-900">Ajoute des cubes</h2>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{units.length} cube{units.length > 1 ? 's' : ''}</div>
            </div>

            <button
              type="button"
              onClick={addCube}
              className="group relative flex w-full items-center justify-between rounded-[24px] border border-slate-200 bg-[linear-gradient(135deg,#fffdfb_0%,#fff7ec_100%)] p-5 text-left transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-[0_18px_30px_-20px_rgba(245,158,11,0.45)]"
            >
              <div>
                <p className="text-sm text-slate-500">Ajouter une unité</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">Cliquer pour construire</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 shadow-inner">+1</div>
            </button>

            <div className="mt-5 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>À la 10e unité, la fusion démarre.</span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700">10 → 1 dizaine</span>
              </div>

              <div className="mt-4 flex min-h-[180px] flex-wrap items-start gap-3 rounded-[22px] border border-dashed border-slate-300 bg-white p-4">
                {units.length > 0 ? (
                  units.map((cube, index) => (
                    <motion.div
                      key={cube.id}
                      layout
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200 bg-[linear-gradient(135deg,#fef3c7_0%,#fde68a_100%)] text-sm font-semibold text-amber-900 shadow-[0_10px_18px_-14px_rgba(245,158,11,0.85)]"
                    >
                      {index + 1}
                    </motion.div>
                  ))
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-[18px] border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400">Aucune unité pour l’instant.</div>
                )}
              </div>
            </div>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Dizaines</p>
                <h2 className="text-xl font-semibold text-slate-900">Observation visuelle</h2>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{dizaines} dizaine{dizaines > 1 ? 's' : ''}</div>
            </div>

            <div className="grid gap-4">
              <motion.div
                layout
                className="relative overflow-hidden rounded-[24px] border border-amber-200 bg-[linear-gradient(135deg,#fffaf3_0%,#fff7ed_100%)] p-5"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_25%)]" />
                <div className="relative flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-700">Fusion</p>
                    <p className="mt-1 text-sm text-slate-600">Les 10 cubes se rassemblent puis deviennent une barre de dizaine.</p>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.04, 1], rotate: [0, -3, 3, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: 'mirror' }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-lg font-semibold text-amber-950 shadow-[0_12px_18px_-14px_rgba(245,158,11,0.8)]"
                  >
                    10
                  </motion.div>
                </div>

                {sparks.length > 0 && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {sparks.map((spark) => (
                      <motion.span
                        key={spark.id}
                        className="absolute h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.8)]"
                        style={{ left: spark.left, top: spark.top }}
                        animate={{ opacity: [0.15, 1, 0], y: [0, -18, -30], scale: [0.7, 1.1, 0.8] }}
                        transition={{ duration: 0.9, delay: spark.delay / 1000, ease: 'easeOut' }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Barre de dizaines</p>
                    <p className="mt-1 text-sm text-slate-600">Chaque barre représente 10 unités.</p>
                  </div>
                  <div className="rounded-full bg-slate-200 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-600">{fusionCount} fusion{fusionCount > 1 ? 's' : ''}</div>
                </div>

                <div className="mt-4 flex min-h-[120px] items-end gap-3 rounded-[22px] border border-dashed border-slate-300 bg-white p-4">
                  {Array.from({ length: dizaines }).map((_, index) => (
                    <motion.div
                      key={`ten-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="h-16 w-4 rounded-full bg-[linear-gradient(180deg,#f59e0b_0%,#fbbf24_100%)] shadow-[0_8px_18px_-10px_rgba(245,158,11,0.9)]"
                    />
                  ))}
                  {dizaines === 0 && <span className="text-sm text-slate-400">Aucune dizaine encore.</span>}
                </div>
              </div>

            </div>
          </article>
        </div>

        <AnimatePresence>
          {merging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[32px] bg-white/30"
            >
              <motion.div
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.92 }}
                animate={{ opacity: 1, x: 190, y: -20, scale: 1.08 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="flex w-40 flex-col gap-1 rounded-[24px] border border-amber-200 bg-white/90 p-3 shadow-[0_18px_30px_-18px_rgba(245,158,11,0.7)]"
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <motion.div
                    key={`merge-${index}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="h-3 w-full rounded-full bg-[linear-gradient(135deg,#fde68a_0%,#f59e0b_100%)]"
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

    </main>
  );
}
