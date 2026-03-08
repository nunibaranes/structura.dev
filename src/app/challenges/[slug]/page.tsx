import { getChallengeBySlug } from '@/lib/challenges/utils';
import { getLearningMaterial } from '@/lib/learning/data';
import { challenges } from '@/lib/challenges/data';
import { ChallengeWorkspace } from './ChallengeWorkspace';
import Link from 'next/link';
import styles from './page.module.css';

export function generateStaticParams() {
  return challenges.map((c) => ({ slug: c.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ChallengePage({ params }: PageProps) {
  const { slug } = await params;
  const challenge = getChallengeBySlug(slug);

  if (!challenge) {
    return (
      <div className={styles.page}>
        <Link href="/challenges" className={styles.backLink}>
          ← Back to challenges
        </Link>
        <p className={styles.errorMessage}>Challenge not found.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Link href="/challenges" className={styles.backLink}>
        ← Back to challenges
      </Link>
      <ChallengeWorkspace challenge={challenge} learningMaterial={getLearningMaterial(slug)} />
    </div>
  );
}
