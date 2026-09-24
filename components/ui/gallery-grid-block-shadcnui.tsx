'use client';

// Adapted from the MIT-licensed Gallery Grid with Lightbox by Moumen Soliman:
// https://21st.dev/@moumensoliman/components/gallery-grid-block-shadcnui

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type GalleryItem = { slug: string };

export function GalleryGridBlock<T extends GalleryItem>({
  items,
  className,
  label,
  renderItem,
}: {
  items: T[];
  className: string;
  label: string;
  renderItem: (item: T, index: number) => ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div layout={!reduceMotion} className={className} role="list" aria-label={label}>
      <AnimatePresence mode="popLayout" initial={false}>
        {items.map((item, index) => (
          <motion.div
            key={item.slug}
            role="listitem"
            layout={!reduceMotion}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.94, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : Math.min(index * 0.035, 0.18) }}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
