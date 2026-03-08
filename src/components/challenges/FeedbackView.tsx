import type { AIFeedback } from '@/types/challenge';
import styles from './FeedbackView.module.css';

interface FeedbackViewProps {
  feedback: AIFeedback;
}

export function FeedbackView({ feedback }: FeedbackViewProps) {
  return (
    <div className={styles.feedback}>
      <FeedbackSection title="Strengths" items={feedback.strengths} itemStyle={styles.strengthItem} />
      <FeedbackSection title="Probing Questions" items={feedback.probingQuestions} itemStyle={styles.questionItem} />
      <FeedbackSection title="Missed Concepts" items={feedback.missedConcepts} itemStyle={styles.missedItem} />
      <FeedbackSection title="Suggestions" items={feedback.suggestions} itemStyle={styles.suggestionItem} />
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Overall Assessment</h3>
        <p className={styles.overall}>{feedback.overallAssessment}</p>
      </div>
    </div>
  );
}

function FeedbackSection({
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
