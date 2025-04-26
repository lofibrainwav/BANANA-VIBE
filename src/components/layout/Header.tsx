import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-yellow-500">🍌 Banana Vibe</span>
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link href="/vibes">
            <Button variant="ghost">My Vibes</Button>
          </Link>
          <Link href="/auth/signin">
            <Button>Sign In</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
} 