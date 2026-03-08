'use client';

import { useState } from 'react';
import type { LearningMaterial } from '@/types/challenge';
import { ConceptCard } from './ConceptCard';
import { CommonMistakes } from './CommonMistakes';
import { QuickCheck } from './QuickCheck';
import styles from './LearnSection.module.css';

interface LearnSectionProps {
  material: LearningMaterial;
}

export function LearnSection({ material }: LearnSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.toggleLeft}>
          <span className={styles.toggleLabel}>Learn before solving</span>
          <span className={styles.toggleHint}>
            {material.concepts.length} concepts, {material.quickCheck.length} quick checks
          </span>
        </div>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
          ▶
        </span>
      </button>

      {isOpen && (
        <div className={styles.content}>
          <section>
            <h3 className={styles.sectionHeading}>Key Concepts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {material.concepts.map((concept) => (
                <ConceptCard key={concept.title} title={concept.title} explanation={concept.explanation} />
              ))}
            </div>
          </section>

          <section>
            <h3 className={styles.sectionHeading}>Common Mistakes</h3>
            <CommonMistakes mistakes={material.commonMistakes} />
          </section>

          <section>
            <h3 className={styles.sectionHeading}>Quick Check</h3>
            <QuickCheck questions={material.quickCheck} />
          </section>
        </div>
      )}
    </div>
  );
}
