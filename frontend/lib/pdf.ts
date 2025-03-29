// PDF generation utilities for server configuration

/**
 * Company information interface for PDF branding
 */
interface CompanyInfo {
  name: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

/**
 * Customer information interface
 */
interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  company?: string;
  comments?: string;
  companyInfo: CompanyInfo;
}

/**
 * Server configuration item interface
 */
interface ServerConfig {
  id: string;
  name: string;
  price: number;
  quantity: number;
  specs: string;
}

/**
 * Generates a PDF from server configuration data
 * 
 * @param configData The server configuration data
 * @param customerInfo Customer information for the PDF
 * @returns Promise with the PDF data URL
 */
export async function generateConfigurationPDF(
  configData: ServerConfig[], 
  customerInfo: CustomerInfo
): Promise<string> {
  // In a real implementation, this would use a library like jsPDF or pdfmake
  // to generate an actual PDF with the server configuration and branding
  
  console.log('Generating PDF with configuration data:', configData);
  console.log('Customer information:', customerInfo);
  console.log('Company branding information:', customerInfo.companyInfo);
  
  // Calculate total configuration cost
  const totalCost = configData.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // This is a mock implementation - in production, this would generate a real PDF
  // with company branding, server configurations, and customer information
  
  return new Promise((resolve) => {
    // Simulate PDF generation delay with proper branding
    setTimeout(() => {
      // Return a fake data URL that would represent the PDF
      resolve('data:application/pdf;base64,JVBERi0xLjcKJeLjz9MKNyAwIG9iago8PCAvVHlwZSAvUGFnZSAvUGFyZW50IDEgMCBSIC9MYXN0TW9kaWZpZWQgKEQ6MjAyMTA...');
    }, 1000);
  });
}

/**
 * Email data interface for sending configuration
 */
interface EmailData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  comments?: string;
  termsAccepted: boolean;
  serverConfigs: ServerConfig[];
  totalCost: string;
}

/**
 * Sends the configuration PDF via email to the sales team
 * 
 * @param pdfDataUrl The PDF data URL to send
 * @param recipientEmail The customer's email address
 * @param formData Additional form data for the email
 * @returns Promise with the email sending result
 */
export async function sendConfigurationEmail(
  pdfDataUrl: string, 
  recipientEmail: string, 
  formData: EmailData
): Promise<boolean> {
  // In a real implementation, this would call an API endpoint to send the email
  // with the PDF attached to both the customer and the sales team
  
  console.log('Sending configuration email to customer:', recipientEmail);
  console.log('Sending configuration email to sales team at:', 'sales@net-bridge.example.com');
  console.log('Form data:', formData);
  console.log('PDF data URL length:', pdfDataUrl.length);
  
  // This is a mock implementation - in production, this would call an actual API
  // to send emails with the PDF attachment
  
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // Return success
      resolve(true);
    }, 1500);
  });
}

/**
 * Validates server configuration for compatibility
 * 
 * @param configData The server configuration data to validate
 * @returns Promise with validation results
 */
export async function validateConfiguration(configData: ServerConfig[]): Promise<{valid: boolean, issues?: string[]}> {
  // In a real implementation, this would check for component compatibility,
  // power requirements, resource allocation, etc.
  
  console.log('Validating configuration:', configData);
  
  // This is a mock implementation - in production, this would perform real validation
  // against a database of compatible components and server requirements
  
  return new Promise((resolve) => {
    // Simulate validation delay
    setTimeout(() => {
      // For demonstration, we'll always return valid
      // In a real implementation, this would check actual compatibility
      resolve({
        valid: true
      });
      
      // Example of what an invalid configuration might return:
      /*
      resolve({
        valid: false,
        issues: [
          "Incompatible RAM with selected processor",
          "Power supply insufficient for configuration",
          "Selected storage controller supports maximum of 8 drives"
        ]
      });
      */
    }, 500);
  });
} 