import React from 'react';
import { ISpecification } from '@/types/product';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface SpecificationsListProps {
  specifications: ISpecification[];
}

export default function SpecificationsList({ specifications }: SpecificationsListProps) {
  // Group specifications by category
  const groupedSpecs = specifications.reduce<Record<string, ISpecification[]>>(
    (acc, spec) => {
      if (!acc[spec.category]) {
        acc[spec.category] = [];
      }
      acc[spec.category].push(spec);
      return acc;
    },
    {}
  );

  // Sort specifications within each category by sortOrder
  Object.values(groupedSpecs).forEach((specs) => {
    specs.sort((a, b) => a.sortOrder - b.sortOrder);
  });

  return (
    <div className="space-y-6">
      {Object.entries(groupedSpecs).map(([category, specs]) => (
        <Card key={category} className="p-6">
          <h3 className="text-lg font-semibold mb-4">{category}</h3>
          <div className="space-y-4">
            {specs.map((spec, index) => (
              <React.Fragment key={spec.key}>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{spec.key}</span>
                  <span>
                    {spec.value}
                    {spec.unit && ` ${spec.unit}`}
                  </span>
                </div>
                {index < specs.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
} 