import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

const features = [
  {
    title: 'Realistic Challenges',
    description:
      'Solve architecture problems based on real-world scenarios with realistic constraints and tradeoffs.',
  },
  {
    title: 'AI Architecture Coach',
    description:
      'Get feedback from an AI that thinks like a senior architect — it probes your design, not just grades it.',
  },
  {
    title: 'Learn by Doing',
    description:
      'No passive videos. Every concept is practiced through hands-on design exercises with immediate feedback.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Learn Software Architecture
          <br />
          <span className={styles.highlight}>by Doing</span>
        </h1>
        <p className={styles.subtitle}>
          Practice architecture challenges, get AI-powered feedback, and build the
          design skills that take engineers from senior to staff.
        </p>
        <Link href="/challenges">
          <Button>Start Practicing</Button>
        </Link>
      </section>

      <section className={styles.features}>
        {features.map((feature) => (
          <div key={feature.title} className={styles.feature}>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </section>
    </>
  );
}
