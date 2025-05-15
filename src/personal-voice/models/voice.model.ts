import type { VoiceData } from '../context/FormContext';

/**
 * Props for the voice component
 */
export interface VoiceProps {
  formData: VoiceData;
  onChange: <K extends keyof VoiceData>(field: K, value: VoiceData[K]) => void;
  onToggleTone: (tone: string) => void;
  onBack: () => void;
  onSubmit: () => void;
} 