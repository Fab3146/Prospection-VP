import React from 'react';

interface BadgeProps {
  label: string;
  color: string;
  bgColor: string;
}

const Badge: React.FC<BadgeProps> = ({ label, color, bgColor }) => {
  return (
    <span 
      style={{ backgroundColor: bgColor, color: color }}
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    >
      {label}
    </span>
  );
};

export default Badge;