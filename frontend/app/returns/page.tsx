import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Clock, Package, Shield, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function ReturnsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Returns Policy</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We want you to be completely satisfied with your purchase. Learn about
          our returns process and policies.
        </p>
      </div>

      {/* Return Policy Overview */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Return Policy Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Clock className="h-8 w-8 mb-4" />,
              title: 'Return Window',
              description:
                'You have 30 days from the date of delivery to initiate a return for most products.',
            },
            {
              icon: <Package className="h-8 w-8 mb-4" />,
              title: 'Product Condition',
              description:
                'Items must be in original condition, unused, and in original packaging with all accessories.',
            },
            {
              icon: <Shield className="h-8 w-8 mb-4" />,
              title: 'Return Protection',
              description:
                'All returns are insured and tracked to ensure safe delivery back to our facility.',
            },
          ].map((policy, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center text-primary">
                  {policy.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{policy.title}</h3>
                <p className="text-muted-foreground">{policy.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Return Process */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Return Process</h2>
        <Card>
          <CardContent className="p-6">
            <ol className="space-y-6">
              <li className="flex items-start space-x-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h3 className="font-semibold mb-2">Contact Us</h3>
                  <p className="text-muted-foreground">
                    Contact our support team to initiate a return request. You'll
                    need your order number and reason for return.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h3 className="font-semibold mb-2">Return Authorization</h3>
                  <p className="text-muted-foreground">
                    Once approved, you'll receive a Return Merchandise
                    Authorization (RMA) number and return shipping instructions.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h3 className="font-semibold mb-2">Package the Item</h3>
                  <p className="text-muted-foreground">
                    Carefully package the item in its original packaging with all
                    accessories. Include the RMA number on the outside of the box.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <h3 className="font-semibold mb-2">Ship the Return</h3>
                  <p className="text-muted-foreground">
                    Ship the item using the provided return shipping label or
                    instructions. Keep tracking information for your records.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  5
                </span>
                <div>
                  <h3 className="font-semibold mb-2">Refund Processing</h3>
                  <p className="text-muted-foreground">
                    Once we receive and inspect the item, we'll process your
                    refund within 5-7 business days.
                  </p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Important Information */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Important Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-6 w-6 text-destructive mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Non-Returnable Items</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Custom configured servers</li>
                    <li>• Opened software licenses</li>
                    <li>• Special order items</li>
                    <li>• Items marked as final sale</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Shield className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Return Shipping</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Free returns for defective items</li>
                    <li>• Customer pays return shipping for non-defective items</li>
                    <li>• International returns may have additional fees</li>
                    <li>• All returns must be insured</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Need to Return Something?</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Our customer service team is here to help you with the return process.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">Start Return Process</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/support">View FAQs</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 