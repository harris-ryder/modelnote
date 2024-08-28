import { ButtonHTMLAttributes, FC } from 'react';

export interface ToggleSwitchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftLabel: string;
  rightLabel: string;
  isChecked: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({ leftLabel, rightLabel, isChecked, size = 'sm', className, ...props }) => {

  const toggleHeight = {
    'sm': 'h-6 text-xs',
    'md': 'h-8 text-sm',
    'lg': 'h-10 text-md'
  }[size]


  return (
    <button {...props} className={`relative ${toggleHeight} ${className} flex items-center border border-sky-500 rounded-md overflow-hidden`}>

      {/* Switch handle */}
      <div className={`absolute top-0 transition-transform duration-300 ease-in-out ${isChecked ? 'translate-x-0' : 'translate-x-full'} h-full w-1/2 bg-sky-500 border border-sky-100 rounded-md`}>
      </div>

      {/* Left label */}
      <div
        className={`relative z-10 cursor-pointer ${isChecked ? 'text-white' : 'text-gray-700'} flex-1 rounded-l-md text-center`}
      >
        {leftLabel}
      </div>

      {/* Right label */}
      <div
        className={`relative z-10 cursor-pointer ${!isChecked ? 'text-white' : 'text-gray-700'} flex-1 rounded-r-md text-center`}
      >
        {rightLabel}
      </div>
    </button>
  );
};

export default ToggleSwitch;

