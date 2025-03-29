import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Server, Database, Network, Users, Award, Clock, Globe, Shield } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About NET-BRIDGE</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Leading supplier of refurbished servers, storage, and network equipment since 2001.
          Providing complete units and component parts to customers worldwide.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Years of Experience', value: '20+' },
          { label: 'Team Members', value: '60+' },
          { label: 'Countries Served', value: '100+' },
          { label: 'Satisfied Customers', value: '10,000+' },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Core Values Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Award className="h-8 w-8 mb-4 text-primary" />,
              title: 'Quality Assurance',
              description:
                'Every piece of equipment undergoes rigorous testing and refurbishment to meet the highest standards.',
            },
            {
              icon: <Users className="h-8 w-8 mb-4 text-primary" />,
              title: 'Expert Support',
              description:
                'Our team of specialists provides comprehensive technical support and guidance.',
            },
            {
              icon: <Shield className="h-8 w-8 mb-4 text-primary" />,
              title: 'Warranty Protection',
              description:
                'All products come with a comprehensive warranty and support package.',
            },
          ].map((value, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Product Categories Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Server className="h-8 w-8 mb-4" />,
              title: 'Servers',
              description:
                'Enterprise-grade servers from leading manufacturers, fully tested and configured.',
              href: '/products?category=Servers',
            },
            {
              icon: <Database className="h-8 w-8 mb-4" />,
              title: 'Storage Solutions',
              description:
                'Reliable storage solutions for all your data management needs.',
              href: '/products?category=Storage',
            },
            {
              icon: <Network className="h-8 w-8 mb-4" />,
              title: 'Networking Equipment',
              description:
                'High-performance networking equipment for seamless connectivity.',
              href: '/products?category=Networking',
            },
          ].map((category, index) => (
            <Card key={index} className="group relative overflow-hidden">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <Button asChild>
                  <Link href={category.href}>Browse {category.title}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: <Clock className="h-6 w-6 mb-2" />,
              title: 'Fast Delivery',
              description: 'Next day delivery available on most items',
            },
            {
              icon: <Globe className="h-6 w-6 mb-2" />,
              title: 'Global Reach',
              description: 'Shipping to customers worldwide',
            },
            {
              icon: <Shield className="h-6 w-6 mb-2" />,
              title: 'Secure Shopping',
              description: 'Safe and secure payment methods',
            },
            {
              icon: <Award className="h-6 w-6 mb-2" />,
              title: 'Price Match',
              description: 'Competitive pricing on all products',
            },
          ].map((feature, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <div className="flex justify-center text-primary">{feature.icon}</div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Browse our extensive catalog of enterprise IT equipment or contact us for expert advice.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/products">Browse Products</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 