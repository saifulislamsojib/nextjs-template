import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
} & ComponentProps<"button">;

const Button = ({ children, className }: ButtonProps) => {
  return (
    <button
      className={cn("bg-slate-300 text-base py-2 px-3 rounded-md", className)}
    >
      {children}
    </button>
  );
};

export default Button;
