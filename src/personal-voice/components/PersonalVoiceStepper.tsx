import React from "react";
import type { StepperProps } from "../models/stepper.model";
import { SvgIcon } from "../../shared/icons";

/**
 * Presentational component for the multi-step process indicator
 */
export const PersonalVoiceStepper: React.FC<StepperProps> = ({ 
  steps, 
  currentStep 
}) => {
  // Fixed size for the SVG dots (should match the actual size of the SVG)
  const dotSize = 20;
  
  return (
    <div className="w-full my-6">
      {/* Step labels */}
      <div className="flex justify-between mb-2">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={`flex flex-col items-center ${
              step.id === currentStep ? "text-orange-500" : "text-gray-400"
            }`}
          >
            <span className="text-sm font-medium">{step.label}</span>
          </div>
        ))}
      </div>
      
      {/* Stepper container with fixed height */}
      <div style={{ position: 'relative', height: `${dotSize}px` }}>
        {/* Lines container with exact positioning */}
        <div 
          style={{ 
            position: 'absolute',
            left: `${dotSize / 2}px`,
            right: `${dotSize / 2}px`,
            height: '2px',
            backgroundColor: '#E5E7EB',
            top: `${dotSize / 2 - 1}px` // Center of dot, minus half the line height
          }}
        ></div>
        
        {/* Progress line with exact same positioning */}
        <div 
          style={{ 
            position: 'absolute',
            left: `${dotSize / 2}px`,
            height: '2px',
            backgroundColor: '#E85427',
            top: `${dotSize / 2 - 1}px`,
            width: currentStep > 1 ? `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - ${dotSize}px)` : '0'
          }}
        ></div>
        
        {/* Dots with absolute positioning and explicit z-index */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          zIndex: 10
        }}>
          {steps.map((step) => (
            <div key={step.id}>
              {step.id <= currentStep ? (
                <SvgIcon name="step-active" color="#E85427" />
              ) : (
                <SvgIcon name="step-inactive" color="#D9D9D9" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 