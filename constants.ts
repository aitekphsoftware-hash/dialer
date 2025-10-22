
import { Template } from './types';

export const TEMPLATES: Template[] = [
  {
    id: 1,
    icon: '✈️',
    title: 'Turkish Airlines CSR',
    tone: 'Empathetic',
    languages: 'EN/TR',
    previewLine: 'Good afternoon, this is Turkish Airlines customer service. How can I assist you today?',
  },
  {
    id: 2,
    icon: '🏦',
    title: 'Banking Support',
    tone: 'Calm',
    languages: 'EN',
    previewLine: 'Hello, banking support here. How can I help with your account today?',
  },
  {
    id: 3,
    icon: '📱',
    title: 'Telecom Helpdesk',
    tone: 'Energetic',
    languages: 'EN/TL',
    previewLine: 'Hi! Telecom helpdesk speaking. What seems to be the issue with your line?',
  },
  {
    id: 4,
    icon: '🚗',
    title: 'Insurance Claims',
    tone: 'Reassuring',
    languages: 'EN',
    previewLine: 'You’ve reached insurance claims. I can guide you through the next steps.',
  },
];

export const IVR_MESSAGE = 'Thank you for calling Turkish Airlines. Your call is important to us. Please stay on the line for assistance.';
