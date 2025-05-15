import type { AudienceData } from '../context/FormContext';

/**
 * Props for the audience component
 */
export interface AudienceProps {
  formData: AudienceData;
  onToggleGroup: (group: string) => void;
  onBack: () => void;
  onSubmit: () => void;
} 