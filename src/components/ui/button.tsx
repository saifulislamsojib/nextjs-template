import { cn } from '@/lib/utils';
import type { ComponentProps, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
} & ComponentProps<'button'>;

const Button = ({ children, className }: ButtonProps) => {
  return (
    <button className={cn('rounded-md bg-slate-300 px-3 py-2 text-base', className)}>
      {children}
    </button>
  );
};

export default Button;
