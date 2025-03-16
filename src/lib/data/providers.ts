import { v4 as uuidv4 } from 'uuid';

export interface Provider {
  id: string;
  name: string;
  email: string;
  tax_number: string;
  country: string;
  created_at: Date;
  updated_at: Date;
  alias: string;
  cbu: string;
}

// Mock data for providers
export const providers: Provider[] = [
  {
    id: uuidv4(),
    name: "TechSupply Corp",
    email: "billing@techsupply.com",
    tax_number: "30-12345678-9",
    country: "AR",
    alias: "techsupply.pagos",
    cbu: "0000000000000000000001",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01")
  },
  {
    id: uuidv4(),
    name: "Global Services SA",
    email: "payments@globalservices.com",
    tax_number: "30-98765432-1",
    country: "AR",
    alias: "globalservices.pagos",
    cbu: "0000000000000000000002",
    created_at: new Date("2024-01-15"),
    updated_at: new Date("2024-01-15")
  },
  {
    id: uuidv4(),
    name: "Digital Solutions LLC",
    email: "finance@digitalsolutions.com",
    tax_number: "30-45678901-2",
    country: "US",
    alias: "digitalsolutions.payments",
    cbu: "0000000000000000000003",
    created_at: new Date("2024-02-01"),
    updated_at: new Date("2024-02-01")
  }
];