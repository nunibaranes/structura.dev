import type { AIFeedback } from '@/types/challenge';
import styles from './FeedbackView.module.css';

interface FeedbackViewProps {
  feedback: AIFeedback;
}

export function FeedbackView({ feedback }: FeedbackViewProps) {
  return (
    <div className={styles.feedback}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Summary</h3>
        <p className={styles.summary}>{feedback.summary}</p>
      </div>

      <FeedbackList title="Strengths" items={feedback.strengths} itemStyle={styles.strengthItem} />
      <FeedbackList title="Gaps & Risks" items={feedback.gapsAndRisks} itemStyle={styles.gapItem} />
      <FeedbackList title="Tradeoffs to Consider" items={feedback.tradeoffs} itemStyle={styles.tradeoffItem} />

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Next Step</h3>
        <p className={styles.nextStep}>{feedback.nextStep}</p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Reflection Question</h3>
        <p className={styles.reflection}>{feedback.reflectionQuestion}</p>
      </div>
    </div>
  );
}

function FeedbackList({
  title,
  items,
  itemStyle,
}: {
  title: string;
  items: string[];
  itemStyle: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.list}>
        {items.map((item, i) => (
          <p key={i} className={`${styles.item} ${itemStyle}`}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
