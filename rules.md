# 📁 Reglas de Arquitectura para la Estructura de Archivos

## 🎯 Principios Fundamentales

La arquitectura del proyecto sigue un enfoque modular y orientado a dominios, con una clara separación de responsabilidades y una estructura predecible.

## 📂 Estructura Base

# Filenames 

- Use kebab-case for filenames
- Use PascalCase for component names
- Use camelCase for variable names
- Use snake_case for database names
- Use PascalCase for type names

### Nivel Raíz (`/src`)

```
src/
├── components/     # Componentes compartidos entre múltiples pages
├── hooks/         # Hooks reutilizables globalmente
├── services/      # Servicios compartidos (API, utilidades, etc.)
└── pages/         # Páginas de la aplicación
```

#### ⚡ Regla #1: Ubicación de Recursos Compartidos
- Los recursos que son utilizados por **múltiples pages** DEBEN ubicarse en `/src`
- Esto incluye:
  - Componentes globales
  - Hooks universales
  - Servicios compartidos
  - Utilidades comunes
  - Tipos globales

### Estructura de Pages (`/pages`)

```
pages/
└── feature/           # Ejemplo: auth, dashboard, etc.
    ├── components/    # Componentes específicos de la feature
    ├── hooks/        # Hooks específicos
    ├── services/     # Servicios de la feature
    ├── context/      # Contextos específicos
    ├── domain/       # Dominio de la feature
    │   ├── types/    # Tipos y interfaces
    │   ├── entities/ # Entidades del dominio
    │   └── dto/      # Objetos de transferencia de datos
    └── index.tsx     # Página principal de la feature
```

#### ⚡ Regla #2: Organización por Features
- Cada feature DEBE tener su propia estructura modular
- Los recursos específicos de una feature NO DEBEN estar en `/src`

#### ⚡ Regla #3: Dominio de Feature
- Todo lo relacionado con el modelo de datos DEBE estar en `/domain`
- Esto incluye:
  - `types/`: Interfaces y tipos TypeScript
  - `entities/`: Modelos de dominio
  - `dto/`: Objetos para transferencia de datos

## 🔍 Ejemplo Práctico (Auth)

```
auth/
├── hooks/           # Hooks de autenticación
├── services/        # Servicios de auth (API calls)
├── types/          # Tipos específicos de auth
├── schemas/        # Esquemas de validación
├── store/          # Estado local de auth
├── manager/        # Lógica de gestión
└── *.tsx           # Páginas de auth
```

## ⚠️ Consideraciones Importantes

1. **Principio de Cohesión**
   - Los archivos relacionados DEBEN estar juntos
   - Cada feature DEBE ser autocontenida

2. **Principio de Separación**
   - Los recursos compartidos van en `/src`
   - Los recursos específicos van en su feature

3. **Nomenclatura**
   - Usar nombres descriptivos y en inglés
   - Seguir convenciones de kebab-case para carpetas
   - PascalCase para componentes React

4. **Importaciones**
   - Evitar importaciones circulares
   - Preferir importaciones relativas dentro de la feature
   - Usar importaciones absolutas para recursos de `/src` 

5. **Servicios API**
   - Todos los servicios DEBEN utilizar el cliente `gastiClient` para las conexiones API
   - Cada operación de API DEBE estar en su propio archivo
   - Nomenclatura de archivos:
     - Usar kebab-case
     - El nombre debe describir la operación: `create-category.ts`, `update-user.ts`, `get-products.ts`
   - Estructura ejemplo de servicios:
   ```
   services/
   ├── create-category.ts
   ├── update-category.ts
   ├── delete-category.ts
   └── get-categories.ts
   ```

6. **Gestión de Estado y Datos**
   - DEBE utilizarse React Query para todas las operaciones de datos
   - NO usar efectos (useEffect) para llamadas a API
   - Estructura de hooks:
     ```
     hooks/
     ├── queries/           # Hooks para consultas (GET)
     │   ├── use-categories.ts
     │   └── use-products.ts
     └── mutations/         # Hooks para mutaciones (POST, PUT, DELETE)
         ├── use-create-category.ts
         └── use-update-product.ts
     ```
   - Principios de diseño de hooks:
     - Responsabilidad única: cada hook debe hacer UNA sola cosa
     - Los hooks de queries deben enfocarse en obtener y devolver datos
     - Los hooks de mutations deben manejar una única operación de modificación
     - Evitar la gestión de estado local (useState) cuando sea posible
     - Utilizar el cache de React Query para el estado compartido

   - Convenciones de nomenclatura:
     - Queries: `use{Recurso}` o `use{Recurso}{Acción}` si es específico
       ```typescript
       // use-categories.ts - Hook para listar categorías
       export const useCategories = () => {
         return useQuery({
           queryKey: ['categories'],
           queryFn: getCategories,
           select: (data) => ({
             categories: data,
             isEmpty: data.length === 0,
             hasSubcategories: data.some(cat => cat.subcategories?.length > 0)
           })
         });
       }
       ```

     - Mutations: `use{Acción}{Recurso}`
       ```typescript
       // use-create-category.ts - Hook para crear categoría
       export const useCreateCategory = () => {
         const queryClient = useQueryClient();
         return useMutation({
           mutationFn: createCategory,
           onSuccess: () => {
             queryClient.invalidateQueries(['categories']);
             toast.success('Categoría creada exitosamente');
           }
         });
       }
       ```

   - Ejemplos de separación de responsabilidades:
     ```typescript
     // ❌ MAL: Un hook haciendo demasiado
     const useCategoryManager = () => {
       // Maneja listado, creación, actualización, eliminación
       // Difícil de mantener y reutilizar
     }

     // ✅ BIEN: Hooks específicos
     const useCategories = () => {
       // Solo maneja el listado y transformación de datos
     }

     const useCreateCategory = () => {
       // Solo maneja la creación
     }

     const useUpdateCategory = () => {
       // Solo maneja la actualización
     }
     ``` 