'use client';

import { useState } from 'react';
import type { UserSolution } from '@/types/challenge';
import { Button } from '@/components/ui/Button';
import styles from './SolutionForm.module.css';

interface SolutionFormProps {
  challengeSlug: string;
  onSubmit: (solution: UserSolution) => void;
  isSubmitting: boolean;
}

const fields = [
  {
    key: 'components' as const,
    label: 'Components & Services',
    hint: 'What are the main components or services in your design?',
    placeholder: 'Describe the key building blocks of your architecture...',
  },
  {
    key: 'dataFlow' as const,
    label: 'Data Flow',
    hint: 'How does data move through your system?',
    placeholder: 'Describe how data flows between components...',
  },
  {
    key: 'tradeoffs' as const,
    label: 'Tradeoffs',
    hint: 'What tradeoffs did you make and why?',
    placeholder: 'Explain the key decisions and their tradeoffs...',
  },
  {
    key: 'freeText' as const,
    label: 'Additional Notes',
    hint: 'Anything else about your design — migration plan, alternatives considered, etc.',
    placeholder: 'Any additional context or explanation...',
  },
];

type FormFields = Omit<UserSolution, 'challengeSlug'>;

export function SolutionForm({ challengeSlug, onSubmit, isSubmitting }: SolutionFormProps) {
  const [form, setForm] = useState<FormFields>({
    components: '',
    dataFlow: '',
    tradeoffs: '',
    freeText: '',
  });

  const canSubmit = form.components.trim() !== '' && form.dataFlow.trim() !== '';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({ challengeSlug, ...form });
  }

  function handleChange(key: keyof FormFields, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.key} className={styles.fieldGroup}>
          <label className={styles.label} htmlFor={field.key}>
            {field.label}
          </label>
          <span className={styles.hint}>{field.hint}</span>
          <textarea
            id={field.key}
            className={styles.textarea}
            placeholder={field.placeholder}
            value={form[field.key]}
            onChange={(e) => handleChange(field.key, e.target.value)}
          />
        </div>
      ))}
      <div className={styles.actions}>
        <Button type="submit" disabled={!canSubmit || isSubmitting}>
          {isSubmitting ? 'Evaluating...' : 'Get Feedback'}
        </Button>
      </div>
    </form>
  );
}
