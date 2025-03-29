import { IConfigurationGroup } from '@/types/product';

export interface ValidationError {
  field: string;
  message: string;
}

export const validateConfiguration = (
  selectedOptions: Record<string, string>,
  configurationOptions: IConfigurationGroup[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Check required fields
  configurationOptions.forEach((group) => {
    if (group.required && !selectedOptions[group.name]) {
      errors.push({
        field: group.name,
        message: `${group.name} is required`,
      });
    }
  });

  // Check stock availability
  Object.entries(selectedOptions).forEach(([groupName, selectedValue]) => {
    const group = configurationOptions.find((g) => g.name === groupName);
    if (group) {
      const option = group.options.find((o) => o.value === selectedValue);
      if (option && option.stock === 0) {
        errors.push({
          field: groupName,
          message: `Selected ${groupName} is out of stock`,
        });
      }
    }
  });

  return errors;
};

export const validateWarrantyUpgrade = (
  selectedWarranty: string | null,
  warrantyOptions: any[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (selectedWarranty) {
    const warrantyOption = warrantyOptions.find((w) => w.type === selectedWarranty);
    if (!warrantyOption) {
      errors.push({
        field: 'warranty',
        message: 'Invalid warranty option selected',
      });
    }
  }

  return errors;
};

export const validateSupportUpgrade = (
  selectedSupport: string | null,
  supportOptions: any[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (selectedSupport) {
    const supportOption = supportOptions.find((s) => s.type === selectedSupport);
    if (!supportOption) {
      errors.push({
        field: 'support',
        message: 'Invalid support option selected',
      });
    }
  }

  return errors;
};

export const validateQuoteSubmission = (
  selectedOptions: Record<string, string>,
  configurationOptions: IConfigurationGroup[],
  selectedWarranty: string | null,
  warrantyOptions: any[],
  selectedSupport: string | null,
  supportOptions: any[]
): ValidationError[] => {
  return [
    ...validateConfiguration(selectedOptions, configurationOptions),
    ...validateWarrantyUpgrade(selectedWarranty, warrantyOptions),
    ...validateSupportUpgrade(selectedSupport, supportOptions),
  ];
}; 