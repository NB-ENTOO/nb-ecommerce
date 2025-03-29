'use client';

import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { ArrowRight, Server, Database, Network, Cpu, ExternalLink, Play, ChevronRight, Star } from 'lucide-react';

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8">Welcome to NB E-commerce</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Your trusted source for enterprise server equipment.
        </p>
      </div>
    </Layout>
  );
} 