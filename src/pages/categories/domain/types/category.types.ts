export type CategoryPropsDTO = {
  id?: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  is_active?: boolean;
  company_id: string;
  created_at?: Date;
  updated_at?: Date;
};

export type CreateCategoryDTO = Omit<
  CategoryPropsDTO,
  'id' | 'created_at' | 'updated_at'
>;
