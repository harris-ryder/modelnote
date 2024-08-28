import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC, createElement } from 'react';
import { cn } from '../../lib/utils/utils'
import { Loader2, Copy, TableProperties, Palette, Pin, Focus, PinOff, ChevronUp, MessageSquarePlus, X, UserRoundPlus, EllipsisVertical, ArrowUpRight, Command } from 'lucide-react';

export const iconButtonVariants = cva(
  'group relative active:scale-95 inline-flex gap-2 items-center justify-center text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-sky-100 text-slate-500 border border-slate-400 hover:border-sky-500 hover:text-sky-500',
        dark: 'bg-sky-200 hover:bg-sky-300',
        ghost: 'hover:scale-110',
        light: 'hover:bg-sky-300',
        active: '',
        email: '',
      },
      size: {
        lg: 'h-14 w-14 rounded-md',
        md: 'h-10 w-10 rounded',
        sm: 'h-8 w-8 rounded',
        xs: 'h-6 w-6 rounded',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type SmartIcon = 'TableProperties' | 'Copy' | 'Palette' | 'Pin' | 'Focus' | 'PinOff' | 'ChevronUp' | 'MessageSquarePlus' | 'X' | 'UserRoundPlus' | 'EllipsisVertical' | 'ArrowUpRight' | 'Command';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
  isLoading?: boolean;
  icon?: SmartIcon;
  strokeWidth?: number;
  hoverText?: string;

}

const IconButton: FC<IconButtonProps> = ({
  className,
  variant,
  isLoading,
  size,
  icon,
  children,
  strokeWidth = 1.25,
  hoverText,
  ...props
}) => {

  const IconComponent = icon ? {
    Copy,
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
  }[icon] : null;

  const IconProps = {
    className: `${size ? {
      lg: 'w-6 h-6',
      md: 'w-4 h-4',
      sm: 'w-4 h-4',
      xs: 'w-2 h-2',
    }[size] : ''}`,
    strokeWidth: strokeWidth
  };



  return (
    <button
      className={cn(iconButtonVariants({ variant, size }), className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {!isLoading && IconComponent && createElement(IconComponent, IconProps)}


      {hoverText &&
        <p
          className="absolute left-0 translate-x-20 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {hoverText}
        </p>
      }


      {children}
    </button>
  );
};

export default IconButton;


