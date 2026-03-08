import styles from './CommonMistakes.module.css';

interface CommonMistakesProps {
  mistakes: {
    mistake: string;
    why: string;
  }[];
}

export function CommonMistakes({ mistakes }: CommonMistakesProps) {
  return (
    <div className={styles.list}>
      {mistakes.map((item) => (
        <div key={item.mistake} className={styles.item}>
          <p className={styles.mistake}>{item.mistake}</p>
          <p className={styles.why}>{item.why}</p>
        </div>
      ))}
    </div>
  );
}
