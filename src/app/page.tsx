import React from 'react';
import Link from 'next/link';
import WaveBackground from '@/components/ui/WaveBackground';
import NeonButton from '@/components/ui/NeonButton';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold text-yellow-800">Welcome to Banana Vibe</h1>
      <p className="text-lg text-yellow-700">Your personal vibe management platform is getting ready!</p>
    </div>
  );
}
