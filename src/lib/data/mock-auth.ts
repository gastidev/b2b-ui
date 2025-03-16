// Mock data for authentication and registration
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'manager' | 'employee';
  companyId: string;
}

export interface Company {
  id: string;
  name: string;
  taxId: string;
  address: string;
  phone: string;
  website: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

// Mock database
export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@demo.com',
    role: 'manager',
    companyId: '1'
  },
  {
    id: "2",
    firstName:"Maria",
    lastName:"Gonzalez",
    email:"mail@mail.com",
    role:"employee",
    companyId: '2'
  }
];

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Demo Company',
    taxId: '30-12345678-9',
    address: 'Av. Demo 123',
    phone: '+54 11 1234-5678',
    website: 'https://demo.com',
    description: 'Demo company description',
    status: 'approved',
    createdAt: new Date()
  }
];

// Mock authentication functions
export function registerUser(userData: Omit<User, 'id'>): User {
  const newUser = {
    id: (mockUsers.length + 1).toString(),
    ...userData
  };
  mockUsers.push(newUser);
  return newUser;
}

export function registerCompany(companyData: Omit<Company, 'id' | 'status' | 'createdAt'>): Company {
  const newCompany = {
    id: (mockCompanies.length + 1).toString(),
    ...companyData,
    status: 'pending' as const,
    createdAt: new Date()
  };
  mockCompanies.push(newCompany);
  return newCompany;
}

export function findUserByEmail(email: string): User | undefined {
  return mockUsers.find(user => user.email === email);
}

export function findCompanyById(id: string): Company | undefined {
  return mockCompanies.find(company => company.id === id);
}