import { cva, VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes, FC } from 'react'

export const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center text-sm font-medium transition-color focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-sky-200 text-black hover:bg-sky-300',
        light: 'bg-sky-100 bg-opacity-50 text-black hover:bg-sky-200 border border-sky-200',
        ghost: 'bg-slate-200 text-slate-300',
      },
      size: {
        default: 'h-10 py-2 px-4 rounded-md',
        round: 'w-6 h-6 rounded-full',
        xs: 'h-6 text-xs px-2 rounded-full',
        sm: 'h-9 px-2 rounded',
        lg: 'h-11 px-8 rounded-md',
        child: 'p-4 rounded-md'
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  isLoading,
  size,
  ...props
}) => {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      disabled={isLoading}
      {...props}>
      {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
      {children}
    </button>
  )
}

export default Button
