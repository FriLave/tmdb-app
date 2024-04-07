import React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      small: 'size-6 stroke-1',
      medium: 'size-8 stroke-1',
      large: 'size-12 stroke-1',
      xlarge: 'size-16 stroke-1',
      xxlarge: 'size-20 stroke-1',
      xxxlarge: 'size-24 stroke-1',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

export const Spinner = ({ size, show, children, className }: SpinnerContentProps) => {
  return (
    <span className={spinnerVariants({ show })}>
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  );
}
