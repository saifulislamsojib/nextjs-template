const AuthLayout = ({ children }: LayoutProps<'/auth'>) => {
  return (
    <div className="flex min-h-[calc(100vh-85px)] items-center pb-1">
      <div className="mx-auto w-full max-w-[600px] shadow">{children}</div>
    </div>
  );
};

export default AuthLayout;
