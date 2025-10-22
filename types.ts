export enum CallState {
  Idle = 'Idle',
  Ringing = 'Ringing',
  Connected = 'Connected',
  Ended = 'Ended'
}

export interface Template {
  id: number;
  icon: string;
  title: string;
  tone: string;
  languages: string;
  previewLine: string;
}

export interface TranscriptEntry {
  speaker: 'System' | 'IVR' | 'Agent';
  text: string;
  timestamp: string;
  isSpeaking?: boolean;
}