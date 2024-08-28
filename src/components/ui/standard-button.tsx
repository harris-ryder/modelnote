import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC, createElement } from 'react';
import { cn } from '../../lib/utils/utils'
import { Loader2, TableProperties, Palette, Pin, Focus, PinOff, ChevronUp, MessageSquarePlus, X, UserRoundPlus, EllipsisVertical, ArrowUpRight, Command } from 'lucide-react';

export const buttonVariants = cva(
  'active:scale-95 inline-flex gap-2 items-center justify-center text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'text-slate-500 border border-slate-400 hover:border-sky-500 hover:text-sky-500',
        active: '',
        danger: 'bg-rose-400 hover:bg-rose-600 border border-rose-300 text-black hover:text-white',
        dark: 'bg-sky-200 hover:bg-sky-300',
        darker: 'bg-sky-500 hover:bg-sky-600 border border-sky-300 text-white hover:text-white',
        light: 'bg-sky-100 bg-opacity-50 text-black hover:bg-sky-200 border border-sky-200',
        green: 'border border-green-500 text-green-500 hover:border-sky-500 hover:text-sky-500',
        pink: 'border border-pink-500 text-pink-500 hover:border-sky-500 hover:text-sky-500',
      },
      size: {
        lg: 'h-11 px-8 rounded-md text-sm',
        md: 'h-8 px-4 rounded-md text-sm',
        sm: 'h-6 px-2 rounded-md text-sm',
        xs: 'h-5 px-2 rounded-md text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type SmartIcon = 'Google' | 'TableProperties' | 'Palette' | 'Pin' | 'Focus' | 'PinOff' | 'ChevronUp' | 'MessageSquarePlus' | 'X' | 'UserRoundPlus' | 'EllipsisVertical' | 'ArrowUpRight' | 'Command';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  icon?: SmartIcon;
  strokeWidth?: number;
}


const GoogleIcon = () => (
  <div className="gsi-material-button-icon w-4 h-4">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ display: 'block' }}
    >
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
      <path fill="none" d="M0 0h48v48H0z"></path>
    </svg>
  </div>
);

const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  isLoading,
  size,
  icon,
  strokeWidth = 1.25,

  ...props
}) => {

  const IconComponent = icon ? {
    TableProperties,
    Palette,
    Pin,
    Focus,
    PinOff,
    ChevronUp,
    MessageSquarePlus,
    X,
    UserRoundPlus,
    EllipsisVertical,
    ArrowUpRight,
    Command,
    Google: null,
  }[icon] : null;

  const IconProps = {
    className: `${size ? {
      lg: 'w-6 h-6',
      md: 'w-4 h-4',
      sm: 'w-4 h-4',
      xs: 'w-4 h-4',
    }[size] : ''}`,
    strokeWidth: strokeWidth
  };

  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isLoading}
      {...props}
    >
      {children}
      {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {!isLoading && IconComponent && createElement(IconComponent, IconProps)}
      {icon === 'Google' && GoogleIcon()}
    </button>
  );
};

export default Button;



