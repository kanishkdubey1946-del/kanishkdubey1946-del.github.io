'use client';

import { lazy, Suspense } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense fallback={<div className="spline-react-loading" role="status">Loading interactive scene…</div>}>
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
