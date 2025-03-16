export interface Invitation {
  email: string;
  role: string;
  status: string;
  company_id: string;
  company_name: string;
  invited_by: string;
  first_name: string;
  last_name: string;
  expires_at: string;
  metadata: {
    last_name: string;
    first_name: string;
    invited_by: string;
    company_name?: string;
    inviter_name?: string;
  };
}
