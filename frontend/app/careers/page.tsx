import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Building2, Users, Heart, Zap } from 'lucide-react';
import Link from 'next/link';

const jobListings = [
  {
    title: 'Technical Support Specialist',
    department: 'Customer Support',
    location: 'Silicon Valley, CA',
    type: 'Full-time',
    description:
      'Provide technical support for enterprise server equipment and assist customers with configuration and troubleshooting.',
  },
  {
    title: 'Sales Engineer',
    department: 'Sales',
    location: 'Silicon Valley, CA',
    type: 'Full-time',
    description:
      'Work with enterprise clients to understand their needs and provide technical solutions using our server equipment.',
  },
  {
    title: 'Inventory Manager',
    department: 'Operations',
    location: 'Silicon Valley, CA',
    type: 'Full-time',
    description:
      'Manage and optimize our inventory of server equipment, ensuring accurate tracking and efficient operations.',
  },
  {
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Create and execute marketing strategies to promote our enterprise server solutions and grow our market presence.',
  },
];

export default function CareersPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Be part of a dynamic team that's revolutionizing the enterprise server
          equipment industry. We're always looking for talented individuals to join
          our mission.
        </p>
      </div>

      {/* Company Culture Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Culture</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: <Building2 className="h-8 w-8 mb-4" />,
              title: 'Innovation',
              description:
                'We encourage creative thinking and innovative solutions to complex problems.',
            },
            {
              icon: <Users className="h-8 w-8 mb-4" />,
              title: 'Collaboration',
              description:
                'Work with talented individuals in a collaborative environment.',
            },
            {
              icon: <Heart className="h-8 w-8 mb-4" />,
              title: 'Work-Life Balance',
              description:
                'We value your personal time and promote a healthy work-life balance.',
            },
            {
              icon: <Zap className="h-8 w-8 mb-4" />,
              title: 'Growth',
              description:
                'Continuous learning and career development opportunities.',
            },
          ].map((value, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center text-primary">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Job Listings Section */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Open Positions</h2>
        <div className="grid grid-cols-1 gap-6">
          {jobListings.map((job, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">
                        Department: {job.department}
                      </p>
                      <p className="text-muted-foreground">
                        Location: {job.location}
                      </p>
                      <p className="text-muted-foreground">Type: {job.type}</p>
                    </div>
                    <p className="mt-4">{job.description}</p>
                  </div>
                  <Button asChild className="shrink-0">
                    <Link href={`/careers/${job.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Health & Wellness',
              items: [
                'Comprehensive health insurance',
                'Dental and vision coverage',
                'Mental health support',
                'Gym membership',
              ],
            },
            {
              title: 'Work Perks',
              items: [
                'Flexible work hours',
                'Remote work options',
                'Professional development',
                'Company events',
              ],
            },
            {
              title: 'Financial Benefits',
              items: [
                'Competitive salary',
                '401(k) matching',
                'Stock options',
                'Performance bonuses',
              ],
            },
          ].map((benefit, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <ul className="space-y-2">
                  {benefit.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center text-muted-foreground"
                    >
                      <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 