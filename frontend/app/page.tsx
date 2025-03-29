'use client';

import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { ArrowRight, Server, Database, Network, Cpu, ExternalLink, Play, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Award, Users, Clock, Globe } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Data center"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        
        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Enterprise Server Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            High-performance refurbished servers, storage, and networking equipment
            for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link href="/products">Browse Products</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Enterprise Servers',
                description: 'High-performance servers from leading manufacturers.',
                icon: <Server className="h-12 w-12 mb-4" />,
                href: '/products?category=Servers',
              },
              {
                title: 'Storage Solutions',
                description: 'Reliable storage systems for your data needs.',
                icon: <Database className="h-12 w-12 mb-4" />,
                href: '/products?category=Storage',
              },
              {
                title: 'Network Equipment',
                description: 'Enterprise-grade networking hardware.',
                icon: <Network className="h-12 w-12 mb-4" />,
                href: '/products?category=Networking',
              },
            ].map((product, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center text-primary">
                    {product.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <Button asChild variant="outline">
                    <Link href={product.href}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: 'Quality Assurance',
                description: 'Rigorous testing and certification process',
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: 'Warranty Coverage',
                description: 'Comprehensive warranty on all products',
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: 'Expert Support',
                description: '24/7 technical support and assistance',
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: 'Fast Delivery',
                description: 'Quick shipping worldwide',
              },
            ].map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-primary">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Contact our sales team to discuss your requirements and find the perfect
            solution for your business.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 