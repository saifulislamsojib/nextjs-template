import type { LayoutProps } from "@/types";

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-[calc(100vh-85px)] flex items-center pb-1">
      <div className="w-full max-w-[600px] mx-auto shadow">{children}</div>
    </div>
  );
};

export default AuthLayout;
