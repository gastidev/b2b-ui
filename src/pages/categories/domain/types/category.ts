export interface CreateCategoryDTO {
  company_id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  is_active: boolean;
  company_id: string;
  created_at: Date;
  updated_at: Date;
  subcategories: Subcategory[];
}

export interface UpdateCategoryDTO {
  name: string;
  description: string;
  icon: string;
  color: string;
}
