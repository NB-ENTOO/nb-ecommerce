import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We are committed to protecting your privacy and ensuring the security of
          your personal information.
        </p>
      </div>

      {/* Key Points */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Key Privacy Points</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <Shield className="h-8 w-8 mb-4" />,
              title: 'Data Protection',
              description:
                'We implement industry-standard security measures to protect your personal information.',
            },
            {
              icon: <Lock className="h-8 w-8 mb-4" />,
              title: 'Secure Transactions',
              description:
                'All transactions are encrypted and processed through secure payment gateways.',
            },
            {
              icon: <Eye className="h-8 w-8 mb-4" />,
              title: 'Transparency',
              description:
                'We are transparent about how we collect, use, and share your information.',
            },
            {
              icon: <FileText className="h-8 w-8 mb-4" />,
              title: 'Your Rights',
              description:
                'You have control over your data and can request access, modification, or deletion.',
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

      {/* Policy Sections */}
      <div className="space-y-12">
        {/* Information Collection */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Information We Collect</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Personal Information
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We collect information that you provide directly to us,
                    including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Name and contact information</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information</li>
                    <li>Company details (if applicable)</li>
                    <li>Order history and preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Automatically Collected Information
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    When you visit our website, we automatically collect certain
                    information, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>IP address and device information</li>
                    <li>Browser type and settings</li>
                    <li>Browsing activity and patterns</li>
                    <li>Website usage statistics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* How We Use Information */}
        <section>
          <h2 className="text-2xl font-bold mb-6">How We Use Your Information</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Primary Uses</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Process and fulfill your orders</li>
                    <li>Communicate about your purchases</li>
                    <li>Provide customer support</li>
                    <li>Send important account notifications</li>
                    <li>Process payments and prevent fraud</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Additional Uses
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Improve our products and services</li>
                    <li>Personalize your shopping experience</li>
                    <li>Send marketing communications (with consent)</li>
                    <li>Analyze website performance</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Data Sharing */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Information Sharing</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-6">
                We share your information only in specific circumstances:
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Service Providers
                  </h3>
                  <p className="text-muted-foreground">
                    We share information with trusted service providers who assist
                    in operating our website, conducting business, and serving our
                    users. These providers are bound by confidentiality agreements.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Legal Requirements</h3>
                  <p className="text-muted-foreground">
                    We may disclose information when required by law or to protect
                    our rights, privacy, safety, or property.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Business Transfers
                  </h3>
                  <p className="text-muted-foreground">
                    If we are involved in a merger, acquisition, or sale of assets,
                    your information may be transferred as part of that transaction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Your Privacy Rights</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  You have certain rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your information</li>
                  <li>Withdraw consent for marketing communications</li>
                  <li>Request data portability</li>
                </ul>
                <p className="text-muted-foreground">
                  To exercise these rights, please contact our privacy team using
                  the information below.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Contact Section */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Privacy Questions?</h2>
        <p className="text-lg text-muted-foreground mb-6">
          If you have any questions about our privacy practices or would like to
          exercise your privacy rights, please contact us.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Contact Privacy Team</Link>
        </Button>
      </div>
    </div>
  );
} 