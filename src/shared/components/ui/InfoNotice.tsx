import React from 'react';
import type { ReactNode } from 'react';

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
      <svg className="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M18.0798 18.0798C16.7212 19.4341 14.9168 20.1827 13 20.1827C11.0832 20.1827 9.27885 19.4341 7.92019 18.0798C6.56587 16.7212 5.81731 14.9168 5.81731 13C5.81731 11.0832 6.56587 9.27885 7.92019 7.92019C9.27885 6.56587 11.0832 5.81731 13 5.81731C14.9168 5.81731 16.7212 6.56587 18.0798 7.92019C19.4341 9.27885 20.1827 11.0832 20.1827 13C20.1827 14.9168 19.4341 16.7212 18.0798 18.0798ZM4 13C4 17.9716 8.02837 22 13 22C17.9716 22 22 17.9716 22 13C22 8.02837 17.9716 4 13 4C8.02837 4 4 8.02837 4 13ZM12.0914 8.5H13.9087V13.9087H12.0914V8.5ZM12.0914 15.6827H13.9087V17.5H12.0914V15.6827Z" fill={iconFill}/>
      </svg>
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
}; 