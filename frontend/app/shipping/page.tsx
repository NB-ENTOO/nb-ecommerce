import { Card, CardContent } from '@/components/ui/card';
import { Truck, Globe, Clock, Shield, AlertCircle } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Learn about our shipping policies, methods, and estimated delivery times
          for enterprise server equipment.
        </p>
      </div>

      {/* Shipping Methods */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shipping Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Clock className="h-8 w-8 mb-4" />,
              title: 'Standard Shipping',
              description:
                'Delivery within 5-7 business days. Free for orders over $1000.',
              cost: 'From $50',
            },
            {
              icon: <Truck className="h-8 w-8 mb-4" />,
              title: 'Express Shipping',
              description:
                'Delivery within 2-3 business days. Available for most locations.',
              cost: 'From $150',
            },
            {
              icon: <Globe className="h-8 w-8 mb-4" />,
              title: 'International Shipping',
              description:
                'Delivery within 7-14 business days. Subject to customs clearance.',
              cost: 'Custom Quote',
            },
          ].map((method, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center text-primary">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                <p className="text-muted-foreground mb-4">{method.description}</p>
                <p className="font-semibold">{method.cost}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Shipping Policies */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shipping Policies</h2>
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Order Processing</h3>
                  <p className="text-muted-foreground">
                    Orders are typically processed within 1-2 business days. For
                    custom configurations, additional processing time may be
                    required. You will receive a confirmation email with tracking
                    information once your order ships.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Shipping Restrictions
                  </h3>
                  <p className="text-muted-foreground">
                    Some products may have shipping restrictions due to size,
                    weight, or destination. International orders may be subject to
                    customs duties and taxes, which are the responsibility of the
                    recipient.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Tracking & Insurance
                  </h3>
                  <p className="text-muted-foreground">
                    All shipments include tracking and insurance coverage. For
                    high-value items, additional insurance options are available at
                    checkout.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Important Information */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Important Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <Shield className="h-6 w-6" />,
              title: 'Secure Packaging',
              description:
                'All items are carefully packaged to ensure safe delivery. We use industry-standard materials and methods to protect your equipment during transit.',
            },
            {
              icon: <AlertCircle className="h-6 w-6" />,
              title: 'Delivery Notes',
              description:
                'For large or heavy items, please ensure someone is available to receive and inspect the delivery. We may require a signature for high-value items.',
            },
          ].map((info, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-primary mt-1">{info.icon}</div>
                  <div>
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    <p className="text-muted-foreground">{info.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 