export interface Category {
  id: string;
  name: string;
  description?: string;
  icon: string;
  color?: string;
  is_active?: boolean;
  company_id: string;
  created_at?: Date;
  updated_at?: Date;
  subcategories: Subcategory[];
}

export interface CategoryFormData {
  name: string;
  description?: string;
  icon: string;
  color?: string;
  company_id: string;
}

export interface Subcategory {
  id: string;
  name: string;
  category_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SubcategoryFormData {
  name: string;
  category_id: string;
}
