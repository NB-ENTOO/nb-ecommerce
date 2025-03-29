import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Scale, AlertTriangle, Shield } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Please read these terms carefully before using our website and services.
          By using our services, you agree to these terms.
        </p>
      </div>

      {/* Key Points */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Key Points</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <FileText className="h-8 w-8 mb-4" />,
              title: 'Agreement to Terms',
              description:
                'By accessing our website and services, you agree to be bound by these terms and conditions.',
            },
            {
              icon: <Scale className="h-8 w-8 mb-4" />,
              title: 'Legal Compliance',
              description:
                'You must comply with all applicable laws and regulations when using our services.',
            },
            {
              icon: <AlertTriangle className="h-8 w-8 mb-4" />,
              title: 'Limitations',
              description:
                'We may limit or terminate access to our services for violations of these terms.',
            },
            {
              icon: <Shield className="h-8 w-8 mb-4" />,
              title: 'Protection',
              description:
                'We protect our intellectual property rights and respect the rights of others.',
            },
          ].map((point, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-primary">{point.icon}</div>
                  <div>
                    <h3 className="font-semibold mb-2">{point.title}</h3>
                    <p className="text-muted-foreground">{point.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Terms Sections */}
      <div className="space-y-12">
        {/* Account Terms */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Account Terms</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Account Creation</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>You must be 18 years or older to create an account</li>
                    <li>You must provide accurate and complete information</li>
                    <li>You are responsible for maintaining account security</li>
                    <li>You must notify us of any unauthorized account use</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Account Usage</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>One person or entity per account</li>
                    <li>No sharing of account credentials</li>
                    <li>Account may be terminated for violations</li>
                    <li>You are responsible for all account activity</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Service Terms */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Service Terms</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Service Usage</h3>
                  <p className="text-muted-foreground mb-4">
                    Our services are provided "as is" and may be modified at any
                    time. We reserve the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Modify or discontinue services</li>
                    <li>Refuse service to anyone</li>
                    <li>Change pricing with notice</li>
                    <li>Limit features or functionality</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Prohibited Uses</h3>
                  <p className="text-muted-foreground mb-4">
                    You may not use our services to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Violate any laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Transmit malicious code or content</li>
                    <li>Interfere with service operation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Payment Terms */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Payment Terms</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Pricing</h3>
                  <p className="text-muted-foreground mb-4">
                    All prices are subject to change. We will provide notice of
                    any price changes. Additional terms:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Prices are in USD unless otherwise noted</li>
                    <li>Taxes may apply based on location</li>
                    <li>Shipping costs are additional</li>
                    <li>Volume discounts may be available</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Payment Methods</h3>
                  <p className="text-muted-foreground mb-4">
                    We accept various payment methods:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Major credit cards</li>
                    <li>Bank transfers</li>
                    <li>Purchase orders (qualified businesses)</li>
                    <li>Other approved payment methods</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Warranty and Liability */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Warranty and Liability</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Limited Warranty</h3>
                  <p className="text-muted-foreground">
                    Products are covered by our standard warranty terms. The
                    warranty is limited to repair or replacement of defective
                    products. See our warranty policy for complete details.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Limitation of Liability
                  </h3>
                  <p className="text-muted-foreground">
                    We are not liable for indirect, incidental, special, or
                    consequential damages arising from the use of our services or
                    products. Our liability is limited to the amount paid for the
                    product or service.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Contact Section */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Questions About Our Terms?</h2>
        <p className="text-lg text-muted-foreground mb-6">
          If you have any questions about our terms of service, please contact our
          legal team.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">Contact Legal Team</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/privacy">View Privacy Policy</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 