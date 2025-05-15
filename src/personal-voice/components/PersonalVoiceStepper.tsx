import React from "react";
import type { StepperProps } from "../models/stepper.model";

/**
 * Presentational component for the multi-step process indicator
 */
export const PersonalVoiceStepper: React.FC<StepperProps> = ({ 
  steps, 
  currentStep 
}) => {
  return (
    <div className="w-full my-6">
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
      
      <div className="relative">
        {/* Background line */}
        <div className="absolute inset-0 h-1 top-1/2 -translate-y-1/2 bg-gray-200"></div>
        
        {/* Progress line */}
        <div 
          className="absolute h-1 top-1/2 -translate-y-1/2 bg-orange-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {/* Step dots */}
        <div className="flex justify-between relative">
          {steps.map((step) => (
            <div key={step.id} className="z-10">
              {step.id <= currentStep ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#E85427"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <circle cx="10.3333" cy="10" r="10" fill="#D9D9D9"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 