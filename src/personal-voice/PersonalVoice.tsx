import React, { useState, useEffect } from "react";
import { useFormContext, StepType } from "./context/FormContext";
import type { FormState } from "./context/FormContext";
import { IntroStep } from "./steps/IntroStep";
import { ProfileStep } from "./steps/ProfileStep";
import { VoiceStep } from "./steps/VoiceStep";
import { AudienceStep } from "./steps/AudienceStep";
import { FineTuningStep } from "./steps/FineTuningStep";
import { PersonalVoiceStepper } from "./components/PersonalVoiceStepper";
import { PersonalVoicePreview } from "./components/PersonalVoicePreview";

// Mock function to simulate an Apollo GraphQL query
const fetchPersonalVoiceData = (): Promise<{ personalVoice: FormState | null }> => {
  // For demonstration, we'll return sample data or null based on some condition
  // In a real app, this would be replaced with an actual Apollo query
  
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get data from localStorage for demo purposes
      const personalVoiceExists = localStorage.getItem('personalVoiceExists');
      
      if (personalVoiceExists === 'true') {
        // Sample data that would come from the API
        resolve({
          personalVoice: {
            profile: {
              jobTitle: 'Sales Executive',
              region: 'Europe',
              skills: 'Sales, Motivation, Writing, Speaking'
            },
            voice: {
              writingSample: '',
              creativityLevel: 'balanced',
              tones: ['conversational', 'casual', 'confident']
            },
            audience: {
              targetGroups: ['sales', 'operations', 'it']
            },
            fineTuning: {
              audienceType: '',
              callToAction: 'Encourage Discussion',
              useEmojis: false,
              translateContent: false,
              translateLanguage: ''
            }
          }
        });
      } else {
        // No personal voice configured yet
        resolve({ personalVoice: null });
      }
    }, 500); // Simulate network delay
  });
};

/**
 * Main component for Personal Voice setup
 * Uses Context API for steps, but handles preview mode independently
 */
export const PersonalVoice: React.FC = () => {
  const { currentStep, formState } = useFormContext();
  const [personalVoiceData, setPersonalVoiceData] = useState<FormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  
  // Fetch personal voice data on component mount - ONLY ONCE
  useEffect(() => {
    // Only fetch if we haven't fetched yet
    if (!hasFetched) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const { personalVoice } = await fetchPersonalVoiceData();
          setPersonalVoiceData(personalVoice);
          setHasFetched(true);
        } catch (error) {
          console.error('Error fetching personal voice data:', error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchData();
    }
  }, [hasFetched]);
  
  // Define steps for the stepper
  const steps = [
    { id: 1, label: "Your Profile" },
    { id: 2, label: "Your Voice" },
    { id: 3, label: "Audience" },
    { id: 4, label: "Fine-tuning" }
  ];
  
  // Map steps to step numbers for the stepper
  const stepToNumberMapping: Record<string, number> = {
    [StepType.PROFILE]: 1,
    [StepType.VOICE]: 2,
    [StepType.AUDIENCE]: 3,
    [StepType.FINE_TUNING]: 4
  };
  
  // Determine current step number for stepper
  const currentStepNumber = stepToNumberMapping[currentStep] || 0;
  
  // Handle actions from the preview component
  const handleDelete = () => {
    // In a real app, this would make an API call to delete the personal voice
    localStorage.removeItem('personalVoiceExists');
    setPersonalVoiceData(null);
  };
  
  const handleEdit = () => {
    setEditMode(true);
  };
  
  const handleTest = () => {
    // In a real app, this would trigger a test of the configured voice
    alert("Testing your personal voice settings...");
  };
  
  // Render the appropriate step based on currentStep
  const renderStep = () => {
    switch (currentStep) {
      case StepType.INTRO:
        return <IntroStep />;
      case StepType.PROFILE:
        return <ProfileStep />;
      case StepType.VOICE:
        return <VoiceStep />;
      case StepType.AUDIENCE:
        return <AudienceStep />;
      case StepType.FINE_TUNING:
        return <FineTuningStep onSetupComplete={() => {
          // Save to localStorage for demo purposes - in a real app, this would be an API call
          localStorage.setItem('personalVoiceExists', 'true');
          setPersonalVoiceData(formState);
          setEditMode(false);
        }} />;
      default:
        return <IntroStep />;
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-gray-800 pb-4 border-b border-gray-200">
          Personal Voice
        </h1>
        <div className="text-center py-10">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Determine what to render based on personal voice data and edit mode
  const renderContent = () => {
    // In edit mode or when no personal voice exists, show the form flow
    if (editMode || !personalVoiceData) {
      return (
        <>
          {/* Only show stepper if not on the intro page */}
          {currentStep !== StepType.INTRO && (
            <PersonalVoiceStepper 
              steps={steps} 
              currentStep={currentStepNumber} 
            />
          )}
          
          {/* Render the current step */}
          {renderStep()}
        </>
      );
    }
    
    // Otherwise show the preview
    return (
      <PersonalVoicePreview
        formData={personalVoiceData}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onTest={handleTest}
      />
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 pb-4 border-b border-gray-200">
        Personal Voice
      </h1>
      
      <div className="mt-8">
        {renderContent()}
      </div>
    </div>
  );
}; 