'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  HomeIcon,
  ChartBarIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'My Vibes', href: '/vibes', icon: ChatBubbleLeftIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-yellow-500">🍌 Banana Vibe</span>
        </Link>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-yellow-50 text-yellow-900'
                  : 'text-gray-700 hover:bg-yellow-50 hover:text-yellow-900'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 