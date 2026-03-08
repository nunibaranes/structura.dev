'use client';

import { useState } from 'react';
import styles from './ConceptCard.module.css';

interface ConceptCardProps {
  title: string;
  explanation: string;
}

export function ConceptCard({ title, explanation }: ConceptCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.card}>
      <button className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.title}>{title}</span>
        <span className={`${styles.indicator} ${isOpen ? styles.indicatorOpen : ''}`}>
          ▶
        </span>
      </button>
      {isOpen && <p className={styles.body}>{explanation}</p>}
    </div>
  );
}
