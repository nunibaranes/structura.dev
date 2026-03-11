import type { LearningMaterial } from '@/types/challenge';

export const learning: LearningMaterial = {
  challengeSlug: 'component-boundaries',
  concepts: [
    {
      title: 'Single Responsibility',
      explanation:
        'A component should have one reason to change. If it handles both data fetching and UI rendering, those are two separate reasons to change — and two reasons to introduce bugs. Split them.',
    },
    {
      title: 'Cohesion',
      explanation:
        'Things that change together should live together. A notification bell\'s icon, badge count, and dropdown are highly cohesive — they form one component, not three separate ones.',
    },
    {
      title: 'Coupling',
      explanation:
        'Components should depend on each other as little as possible. If changing the sidebar breaks the order list, they\'re too tightly coupled. Good boundaries create independence.',
    },
    {
      title: 'Props as Contracts',
      explanation:
        'The props a component accepts define its public API. Clean, minimal props = clean boundary. If a component needs 15 props, it\'s probably doing too much behind one interface.',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Splitting by visual layout instead of responsibility',
      why: '"Left column" and "right column" are not good component boundaries. "UserProfile" and "OrderList" are — they represent distinct responsibilities.',
    },
    {
      mistake: 'Splitting too granularly',
      why: 'Creating a component for every HTML element adds indirection without value. A <UserAvatar> is useful. A <DivWrapper> is not.',
    },
    {
      mistake: 'Prop drilling through 4+ intermediary layers',
      why: 'If props pass through components that don\'t use them, your boundaries may be in the wrong place. Consider lifting state, using context, or redrawing the tree.',
    },
  ],
  quickCheck: [
    {
      question:
        'A component fetches user data, renders a profile card, and handles profile editing. How many responsibilities does it have?',
      options: [
        'One — it\'s all related to the user profile',
        'Two — fetching and displaying',
        'Three — fetching, displaying, and editing',
        'It depends on the component size',
      ],
      correctIndex: 2,
      explanation:
        'Fetching, displaying, and editing are three distinct responsibilities. Consider splitting into a data-fetching wrapper, a display component, and an edit form.',
    },
    {
      question:
        'A <Header> contains a logo, nav links, and a search bar with autocomplete. Should the search bar be its own component?',
      options: [
        'No — it\'s part of the header',
        'Yes — if it has its own state and behavior like input handling and API calls',
        'Only if the header file is too long',
        'Only if the search bar is used on other pages',
      ],
      correctIndex: 1,
      explanation:
        'The search bar has its own state (input value, suggestions), behavior (API calls, keyboard navigation), and lifecycle. That\'s a separate responsibility regardless of where it appears.',
    },
    {
      question:
        'Two sibling components both need the user\'s display name. What\'s the best approach?',
      options: [
        'Duplicate the data fetch in each component',
        'Put the name in a global store',
        'Lift the state to their nearest common parent',
        'Use localStorage to share the value',
      ],
      correctIndex: 2,
      explanation:
        'Lifting state to the nearest common parent is the simplest approach. It keeps the data flow explicit without introducing global state for a localized need.',
    },
  ],
};
