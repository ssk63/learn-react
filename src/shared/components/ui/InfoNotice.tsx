import React from 'react';
import type { ReactNode } from 'react';
import { SvgIcon } from '../../icons/SvgIcon';

interface InfoNoticeProps {
  children: ReactNode;
  theme?: 'orange' | 'blue' | 'green' | 'gray';
  className?: string;
}

export const InfoNotice: React.FC<InfoNoticeProps> = ({ 
  children, 
  theme = 'orange',
  className = ''
}) => {
  // Define theme colors
  const themeStyles = {
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-100',
      iconFill: '#FB7147'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      iconFill: '#3B82F6'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-100',
      iconFill: '#10B981'
    },
    gray: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      iconFill: '#6B7280'
    }
  };

  const { bg, border, iconFill } = themeStyles[theme];

  return (
    <div className={`${bg} ${border} rounded-md p-4 flex items-start gap-3 ${className}`}>
      <SvgIcon 
        name="info" 
        color={iconFill} 
        size="lg" 
        className="flex-shrink-0" 
      />
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
}; 