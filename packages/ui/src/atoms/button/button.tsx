import { cva, VariantProps } from 'class-variance-authority';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { Spinner } from '../spinner';

const styles = cva(
  [
    'flex',
    'items-center',
    'justify-center',
    'font-semibold',
    'transition-colors',
  ],
  {
    variants: {
      size: {
        sm: ['px-3', 'py-2', 'text-sm'],
        md: ['px-4', 'py-2', 'text-sm', 'md:text-base', 'md:py-3'],
        lg: ['px-5', 'py-4', 'text-lg'],
      },
      variant: {
        primary: ['bg-primary-500', 'hover:bg-primary-600'],
        secondary: ['bg-zinc-800', 'text-white', 'hover:bg-zinc-700/50'],
        white: ['bg-white', 'text-zinc-800', 'hover:bg-zinc-50'],
        disabled: ['bg-zinc-700', 'text-zinc-400', 'cursor-not-allowed'],
      },
      shape: {
        rectangle: ['rounded'],
        rounded: ['rounded-full'],
      },
    },
    defaultVariants: { size: 'md', variant: 'secondary', shape: 'rectangle' },
  }
);

type ButtonProps = Pick<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'onClick' | 'type' | 'disabled' | 'className'
> &
  VariantProps<typeof styles> & {
    icon?: ReactNode;
  } & {
    loading?: boolean;
  };

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  icon,
  size,
  shape,
  disabled,
  variant,
  loading,
  className,
  ...rest
}) => (
  <button
    disabled={disabled || loading}
    className={`${styles({
      size,
      variant: disabled ? 'disabled' : variant,
      shape,
    })} ${className}`}
    {...rest}
  >
    <div className="mr-1">{loading ? <Spinner size={20} /> : icon}</div>
    {children}
  </button>
);
