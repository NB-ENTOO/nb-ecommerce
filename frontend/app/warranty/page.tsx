import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock, Wrench, Phone, CheckCircle2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function WarrantyPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Warranty & Support</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We stand behind our products with comprehensive warranty coverage and
          dedicated technical support to ensure your complete satisfaction.
        </p>
      </div>

      {/* Warranty Plans */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Warranty Coverage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Shield className="h-8 w-8 mb-4" />,
              title: 'Standard Warranty',
              description:
                'Basic coverage for all products with parts and labor warranty.',
              features: [
                '1-year parts warranty',
                '90-day labor warranty',
                'Email support',
                'Standard response time',
              ],
            },
            {
              icon: <Clock className="h-8 w-8 mb-4" />,
              title: 'Extended Warranty',
              description:
                'Additional coverage period with enhanced support features.',
              features: [
                '3-year parts warranty',
                '1-year labor warranty',
                'Priority email & phone support',
                'Next business day response',
              ],
            },
            {
              icon: <Wrench className="h-8 w-8 mb-4" />,
              title: 'Premium Support',
              description:
                'Comprehensive coverage with dedicated technical support.',
              features: [
                '5-year parts warranty',
                '3-year labor warranty',
                '24/7 technical support',
                'Same-day response',
              ],
            },
          ].map((plan, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex justify-center text-primary">
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Support Information */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Technical Support</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-start space-x-4 mb-6">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Contact Support</h3>
                    <p className="text-muted-foreground mb-2">
                      Our technical support team is available to assist you with any
                      issues or questions.
                    </p>
                    <p className="font-medium">
                      Phone: +1 (555) 123-4567
                      <br />
                      Email: support@net-bridge.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Support Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 24/7
                      <br />
                      Saturday: 9:00 AM - 5:00 PM (PST)
                      <br />
                      Sunday: Emergency Support Only
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="font-semibold">What's Covered</h3>
                <ul className="space-y-3">
                  {[
                    'Hardware defects and malfunctions',
                    'System configuration issues',
                    'Software compatibility problems',
                    'Performance optimization',
                    'Technical consultation',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warranty Claims */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Warranty Claims Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">How to File a Claim</h3>
              <ol className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <p className="text-muted-foreground">
                    Contact our support team via phone or email to report the issue
                    and get a claim number.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="text-muted-foreground">
                    Provide detailed information about the problem and your product
                    details.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <p className="text-muted-foreground">
                    Our technical team will assess the issue and provide
                    instructions for repair or replacement.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    4
                  </span>
                  <p className="text-muted-foreground">
                    Follow the provided instructions to complete the warranty
                    service process.
                  </p>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="h-6 w-6 text-destructive mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Important Notes</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Warranty is non-transferable</li>
                      <li>• Keep your proof of purchase</li>
                      <li>• Report issues promptly</li>
                      <li>• Follow proper usage guidelines</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Need Support?</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Our technical support team is ready to assist you with any questions or
          concerns.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">Contact Support</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/support">Visit Help Center</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 