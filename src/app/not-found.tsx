import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex min-h-[calc(100vh-85px)] flex-col items-center justify-center text-center">
      <h1 className="text-accent text-3xl font-semibold">404</h1>
      <h2 className="text-accent text-xl font-semibold">Page Not Found</h2>
      <Link href="/" className="mt-5 mb-2 inline-block">
        <Button className="">Back to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
