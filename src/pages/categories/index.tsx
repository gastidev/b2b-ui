import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCategories } from './hooks/queries/use-categories';
import { useCreateCategory } from './hooks/mutations/use-create-category';
import { useUpdateCategory } from './hooks/mutations/use-update-category';
import { useDeleteCategory } from './hooks/mutations/use-delete-category';
import { useCreateSubcategory } from './hooks/mutations/use-create-subcategory';
import { Category } from './domain/types';
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from './domain/types/category';

// Lista de emojis comunes para categorías corporativas
const emojiList = [
  { name: 'Tecnología', emoji: '💻' },
  { name: 'Software', emoji: '⚙️' },
  { name: 'Hardware', emoji: '🖥️' },
  { name: 'Servicios Cloud', emoji: '☁️' },
  { name: 'Recursos Humanos', emoji: '👥' },
  { name: 'Finanzas', emoji: '💰' },
  { name: 'Marketing', emoji: '📈' },
  { name: 'Ventas', emoji: '🤝' },
  { name: 'Oficina', emoji: '💼' },
  { name: 'Logística', emoji: '📦' },
  { name: 'Transporte', emoji: '🚚' },
  { name: 'Comunicaciones', emoji: '📱' },
  { name: 'Seguridad', emoji: '🔒' },
  { name: 'Legal', emoji: '⚖️' },
  { name: 'Capacitación', emoji: '📚' },
  { name: 'Mantenimiento', emoji: '🔧' },
  { name: 'Infraestructura', emoji: '🏢' },
  { name: 'Consultoría', emoji: '💡' },
  { name: 'Investigación', emoji: '🔍' },
  { name: 'Desarrollo', emoji: '⌨️' },
  { name: 'Calidad', emoji: '✅' },
  { name: 'Administración', emoji: '📊' },
  { name: 'Proyectos', emoji: '📋' },
  { name: 'Innovación', emoji: '🚀' },
];

const initialCategoryFormData: CreateCategoryDTO = {
  company_id: '',
  name: '',
  description: '',
  icon: '',
  color: '',
};

export function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] =
    useState(false);
  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);
  const [showIconPicker, setShowIconPicker] =
    useState(false);
  const [categoryFormData, setCategoryFormData] =
    useState<CreateCategoryDTO>(initialCategoryFormData);
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);
  const [expandedCategories, setExpandedCategories] =
    useState<Record<string, boolean>>({});
  const createSubcategoryMutation = useCreateSubcategory();
  const [
    showCreateSubcategoryDialog,
    setShowCreateSubcategoryDialog,
  ] = useState(false);
  const [subcategoryFormData, setSubcategoryFormData] =
    useState({
      name: '',
      description: '',
      categoryId: '',
    });

  const {
    data = { categories: [], isEmpty: true },
    isLoading,
  } = useCategories();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return data.categories;

    const searchLower = searchTerm.toLowerCase();
    return (data.categories || []).filter(
      (category) =>
        category.name.toLowerCase().includes(searchLower) ||
        (category.subcategories || []).some((sub) =>
          sub.name.toLowerCase().includes(searchLower)
        )
    );
  }, [data, searchTerm]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleCategoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCategoryFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconSelect = (emoji: string) => {
    setCategoryFormData((prev) => ({
      ...prev,
      icon: emoji,
    }));
    setShowIconPicker(false);
  };

  const handleAddCategory = () => {
    createCategoryMutation.mutate(categoryFormData, {
      onSuccess: () => {
        setShowAddDialog(false);
        setCategoryFormData(initialCategoryFormData);
      },
    });
  };

  const handleEditCategory = () => {
    if (!selectedCategory) return;

    const updateData: UpdateCategoryDTO = {
      name: categoryFormData.name,
      description: categoryFormData.description,
      icon: categoryFormData.icon,
      color: categoryFormData.color,
    };

    updateCategoryMutation.mutate(
      {
        id: selectedCategory.id,
        category: updateData,
      },
      {
        onSuccess: () => {
          setShowEditDialog(false);
          setCategoryFormData(initialCategoryFormData);
          setSelectedCategory(null);
        },
      }
    );
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;

    deleteCategoryMutation.mutate(selectedCategory.id, {
      onSuccess: () => {
        setShowDeleteDialog(false);
        setSelectedCategory(null);
      },
    });
  };

  const handleSubcategoryInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setSubcategoryFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateSubcategory = () => {
    if (
      !subcategoryFormData.categoryId ||
      !subcategoryFormData.name
    )
      return;

    createSubcategoryMutation.mutate(
      {
        categoryId:
          selectedCategory?.id ||
          subcategoryFormData.categoryId,
        name: subcategoryFormData.name,
        description: subcategoryFormData.description,
      },
      {
        onSuccess: () => {
          setShowCreateSubcategoryDialog(false);
          setSubcategoryFormData({
            name: '',
            description: '',
            categoryId: '',
          });
          setSelectedCategory(null);
        },
      }
    );
  };

  return (
    <div className='container mx-auto py-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Categorías</h1>
        <div className='flex gap-2'>
          <Dialog
            open={showAddDialog}
            onOpenChange={setShowAddDialog}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className='mr-2 h-4 w-4' />
                Agregar Categoría
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Agregar Nueva Categoría
                </DialogTitle>
                <DialogDescription>
                  Complete los detalles de la nueva
                  categoría
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='name'>Nombre</Label>
                  <Input
                    id='name'
                    name='name'
                    value={categoryFormData.name}
                    onChange={handleCategoryInputChange}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='description'>
                    Descripción
                  </Label>
                  <Input
                    id='description'
                    name='description'
                    value={categoryFormData.description}
                    onChange={handleCategoryInputChange}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='color'>Color</Label>
                  <Input
                    id='color'
                    name='color'
                    type='color'
                    value={categoryFormData.color}
                    onChange={handleCategoryInputChange}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label>Emoji</Label>
                  <Popover
                    open={showIconPicker}
                    onOpenChange={setShowIconPicker}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className='w-full justify-between'
                      >
                        {categoryFormData.icon ? (
                          <div className='flex items-center gap-2'>
                            <span className='text-2xl'>
                              {categoryFormData.icon}
                            </span>
                            <span className='text-muted-foreground'>
                              {emojiList.find(
                                (item) =>
                                  item.emoji ===
                                  categoryFormData.icon
                              )?.name ||
                                'Emoji seleccionado'}
                            </span>
                          </div>
                        ) : (
                          'Seleccionar emoji'
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className='p-0'
                      align='start'
                      style={{ width: '320px' }}
                    >
                      <Command>
                        <CommandInput placeholder='Buscar emoji por nombre...' />
                        <CommandEmpty>
                          No se encontraron emojis.
                        </CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className='h-72'>
                            <div className='grid grid-cols-2 gap-2 p-2'>
                              {emojiList.map((item) => (
                                <CommandItem
                                  key={item.emoji}
                                  onSelect={() =>
                                    handleIconSelect(
                                      item.emoji
                                    )
                                  }
                                  className='flex items-center gap-2 cursor-pointer hover:bg-accent'
                                >
                                  <span className='text-2xl'>
                                    {item.emoji}
                                  </span>
                                  <span className='text-sm truncate'>
                                    {item.name}
                                  </span>
                                </CommandItem>
                              ))}
                            </div>
                          </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleAddCategory}
                  disabled={
                    createCategoryMutation.isPending
                  }
                >
                  {createCategoryMutation.isPending
                    ? 'Creando...'
                    : 'Crear Categoría'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className='flex items-center space-x-2 mb-4'>
        <Search className='h-4 w-4 text-gray-400' />
        <Input
          placeholder='Buscar categorías...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='max-w-sm'
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[300px]'>
                Nombre
              </TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Emoji</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className='h-24 text-center'
                >
                  <div className='flex items-center justify-center'>
                    <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent' />
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className='h-24 text-center'
                >
                  <div className='flex flex-col items-center justify-center text-muted-foreground'>
                    <div className='mb-2'>
                      No hay categorías disponibles
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setShowAddDialog(true)}
                    >
                      <Plus className='mr-2 h-4 w-4' />
                      Crear primera categoría
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <React.Fragment key={category.id}>
                  <TableRow
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() =>
                      toggleCategory(category.id)
                    }
                  >
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        {expandedCategories[category.id] ? (
                          <ChevronDown className='h-4 w-4' />
                        ) : (
                          <ChevronRight className='h-4 w-4' />
                        )}
                        <span className='text-2xl'>
                          {category.icon || ''}
                        </span>
                        <span>{category.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {category.description || ''}
                    </TableCell>
                    <TableCell>
                      <span className='text-2xl'>
                        {category.icon || ''}
                      </span>
                    </TableCell>
                    <TableCell>
                      {category.color && (
                        <div
                          className='w-6 h-6 rounded'
                          style={{
                            backgroundColor: category.color,
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className='flex space-x-2'>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCategory(category);
                            setCategoryFormData({
                              company_id: category.company_id,
                              name: category.name,
                              description:
                                category.description || '',
                              icon: category.icon,
                              color: category.color || '',
                            });
                            setShowEditDialog(true);
                          }}
                        >
                          <Pencil className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCategory(
                              category as Category
                            );
                            setShowDeleteDialog(true);
                          }}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedCategories[category.id] && (
                    <>
                      {(category.subcategories || []).map(
                        (subcategory) => (
                          <TableRow
                            key={subcategory.id}
                            className='bg-muted/50'
                          >
                            <TableCell>
                              <div className='flex items-center gap-2 pl-8'>
                                {subcategory.name}
                              </div>
                            </TableCell>
                            <TableCell>
                              {subcategory.name}
                            </TableCell>
                            <TableCell />
                            <TableCell />
                            <TableCell>
                              <div className='flex space-x-2'>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                >
                                  <Pencil className='h-4 w-4' />
                                </Button>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                >
                                  <Trash2 className='h-4 w-4' />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                      <TableRow className='bg-muted/50 border-t border-background'>
                        <TableCell colSpan={5}>
                          <div className='flex justify-center py-2'>
                            <Button
                              variant='ghost'
                              size='sm'
                              className='text-muted-foreground hover:text-foreground'
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCategory(
                                  category as Category
                                );
                                setSubcategoryFormData(
                                  (prev) => ({
                                    ...prev,
                                    categoryId: category.id,
                                  })
                                );
                                setShowCreateSubcategoryDialog(
                                  true
                                );
                              }}
                            >
                              <Plus className='mr-2 h-4 w-4' />
                              Agregar subcategoría
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Categoría</DialogTitle>
            <DialogDescription>
              Modifique los detalles de la categoría
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Nombre</Label>
              <Input
                id='name'
                name='name'
                value={categoryFormData.name}
                onChange={handleCategoryInputChange}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='description'>
                Descripción
              </Label>
              <Input
                id='description'
                name='description'
                value={categoryFormData.description}
                onChange={handleCategoryInputChange}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='color'>Color</Label>
              <Input
                id='color'
                name='color'
                type='color'
                value={categoryFormData.color}
                onChange={handleCategoryInputChange}
              />
            </div>
            <div className='grid gap-2'>
              <Label>Emoji</Label>
              <Popover
                open={showIconPicker}
                onOpenChange={setShowIconPicker}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-full justify-between'
                  >
                    {categoryFormData.icon ? (
                      <div className='flex items-center gap-2'>
                        <span className='text-2xl'>
                          {categoryFormData.icon}
                        </span>
                        <span className='text-muted-foreground'>
                          {emojiList.find(
                            (item) =>
                              item.emoji ===
                              categoryFormData.icon
                          )?.name || 'Emoji seleccionado'}
                        </span>
                      </div>
                    ) : (
                      'Seleccionar emoji'
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className='p-0'
                  align='start'
                  style={{ width: '320px' }}
                >
                  <Command>
                    <CommandInput placeholder='Buscar emoji por nombre...' />
                    <CommandEmpty>
                      No se encontraron emojis.
                    </CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className='h-72'>
                        <div className='grid grid-cols-2 gap-2 p-2'>
                          {emojiList.map((item) => (
                            <CommandItem
                              key={item.emoji}
                              onSelect={() =>
                                handleIconSelect(item.emoji)
                              }
                              className='flex items-center gap-2 cursor-pointer hover:bg-accent'
                            >
                              <span className='text-2xl'>
                                {item.emoji}
                              </span>
                              <span className='text-sm truncate'>
                                {item.name}
                              </span>
                            </CommandItem>
                          ))}
                        </div>
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleEditCategory}
              disabled={updateCategoryMutation.isPending}
            >
              {updateCategoryMutation.isPending
                ? 'Guardando...'
                : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Categoría</DialogTitle>
            <DialogDescription>
              ¿Está seguro que desea eliminar esta
              categoría? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              variant='destructive'
              onClick={handleDeleteCategory}
              disabled={deleteCategoryMutation.isPending}
            >
              {deleteCategoryMutation.isPending
                ? 'Eliminando...'
                : 'Eliminar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showCreateSubcategoryDialog}
        onOpenChange={setShowCreateSubcategoryDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Subcategoría</DialogTitle>
            <DialogDescription>
              {selectedCategory
                ? `Creando subcategoría para ${selectedCategory.name}`
                : 'Ingrese los detalles de la nueva subcategoría'}
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            {!selectedCategory ? (
              <div className='grid gap-2'>
                <Label htmlFor='categoryId'>
                  Categoría
                </Label>
                <select
                  id='categoryId'
                  name='categoryId'
                  value={subcategoryFormData.categoryId}
                  onChange={handleSubcategoryInputChange}
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  <option value=''>
                    Seleccione una categoría
                  </option>
                  {filteredCategories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className='flex items-center gap-2 p-2 bg-muted rounded-md'>
                <span className='text-2xl'>
                  {selectedCategory.icon}
                </span>
                <div>
                  <p className='font-medium'>
                    {selectedCategory.name}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {selectedCategory.description}
                  </p>
                </div>
              </div>
            )}
            <div className='grid gap-2'>
              <Label htmlFor='name'>Nombre</Label>
              <Input
                id='name'
                name='name'
                value={subcategoryFormData.name}
                onChange={handleSubcategoryInputChange}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='description'>
                Descripción
              </Label>
              <Input
                id='description'
                name='description'
                value={subcategoryFormData.description}
                onChange={handleSubcategoryInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleCreateSubcategory}
              disabled={
                createSubcategoryMutation.isPending ||
                !subcategoryFormData.categoryId ||
                !subcategoryFormData.name
              }
            >
              {createSubcategoryMutation.isPending
                ? 'Creando...'
                : 'Crear Subcategoría'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
