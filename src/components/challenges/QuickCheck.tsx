'use client';

import { useState } from 'react';
import type { QuickCheckQuestion } from '@/types/challenge';
import styles from './QuickCheck.module.css';

interface QuickCheckProps {
  questions: QuickCheckQuestion[];
}

export function QuickCheck({ questions }: QuickCheckProps) {
  return (
    <div className={styles.wrapper}>
      {questions.map((q, i) => (
        <QuickCheckItem key={i} question={q} index={i} />
      ))}
    </div>
  );
}

function QuickCheckItem({ question, index }: { question: QuickCheckQuestion; index: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  function handleSelect(optionIndex: number) {
    if (answered) return;
    setSelected(optionIndex);
  }

  return (
    <div className={styles.question}>
      <p className={styles.questionText}>
        {index + 1}. {question.question}
      </p>
      <div className={styles.options}>
        {question.options.map((option, i) => {
          let optionClass = styles.option;
          if (answered) {
            optionClass += ` ${styles.disabled}`;
            if (i === question.correctIndex) {
              optionClass += ` ${styles.correct}`;
            } else if (i === selected) {
              optionClass += ` ${styles.incorrect}`;
            }
          }

          return (
            <button
              key={i}
              className={optionClass}
              onClick={() => handleSelect(i)}
              disabled={answered}
            >
              {option}
            </button>
          );
        })}
      </div>
      {answered && <p className={styles.explanation}>{question.explanation}</p>}
    </div>
  );
}
