import { cva, VariantProps } from 'class-variance-authority'
import { CircleX } from 'lucide-react'
import { ButtonHTMLAttributes, FC } from 'react'
import clsx from 'clsx' // Import clsx for combining class names

export const buttonVariants = cva(
  'inline-flex justify-between items-center justify-center rounded-full text-sm transition-color focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-sky-200 text-black hover:bg-sky-300',
        light: 'bg-sky-100 bg-opacity-50 text-black hover:bg-sky-200 border border-sky-200',
        ghost: 'bg-slate-200 text-slate-300',
      },
      size: {
        default: 'h-10 py-2 px-4',
        round: 'w-6 h-6 rounded-full',
        xs: 'h-6 text-xs px-2',
        sm: 'h-9 pr-2 pl-4',
        lg: 'h-11 px-8',
        child: 'p-4'
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface EmailButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const EmailButton: FC<EmailButtonProps> = ({
  className,
  variant,
  isLoading,
  size,
  children,
  onClick,
  ...props
}) => {
  return (
    <div className={clsx(buttonVariants({ variant, size }), className)}>
      {children}
      <button onClick={onClick}
        {...props}
      >
        <CircleX strokeWidth={1.25} className='active:scale-95 ml-2 h-6 w-6 hover:scale-110' />
      </button>
    </div>
  )
}

export default EmailButton

