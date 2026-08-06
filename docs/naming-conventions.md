# Next.js Naming Conventions

## Purpose

This document defines the naming conventions and folder structure used throughout the project. Consistent naming improves readability, discoverability, and maintainability across the codebase.

---

# Project Structure

The project follows a **Feature-Based Architecture**.

```
src/
└── features/
    └── feature-name/
        ├── api/
        ├── components/
        ├── hooks/
        ├── queries/
        ├── schemas/
        ├── services/
        ├── store/
        └── types/
```

Each feature is self-contained and owns its UI, business logic, API integration, state management, and types.

---

# Folder Naming

All feature folders should use **kebab-case**.

✅ Good

```
property-unit
tenant-management
maintenance-request
lease-contract
```

❌ Bad

```
PropertyUnit
propertyUnit
Property_Unit
```

---

# File Naming Convention

Use **kebab-case** for all files unless otherwise specified.

```
property-card.tsx
property-form.tsx
create-property-dialog.tsx
property.service.ts
property.query.ts
property.schema.ts
```

---

# React Components

Component filenames should use **kebab-case**.

```
property-card.tsx
tenant-table.tsx
lease-status-badge.tsx
```

Component names should use **PascalCase**.

```tsx
export function PropertyCard() {
    return (...)
}
```

---

# Pages

For App Router, use Next.js conventions.

```
app/
    dashboard/
        page.tsx
        loading.tsx
        error.tsx
        layout.tsx
```

Do not rename these reserved files.

---

# Hooks

Hooks should:

- live inside `hooks/`
- begin with `use`

```
hooks/
    use-property.ts
    use-property-filter.ts
    use-pagination.ts
```

```tsx
export function useProperty() {}
```

---

# API Layer

The `api` folder contains direct HTTP requests.

```
api/
    property.api.ts
    tenant.api.ts
    lease.api.ts
```

Example

```ts
getProperties()
createProperty()
updateProperty()
deleteProperty()
```

Avoid putting business logic inside the API layer.

---

# Services

The service layer contains business logic.

```
services/
    property.service.ts
    lease.service.ts
```

Example responsibilities

- data transformation
- validation helpers
- reusable business rules
- mapping API responses

---

# TanStack Query

All React Query logic belongs inside `queries/`.

```
queries/
    property.query.ts
    tenant.query.ts
```

Example

```ts
usePropertiesQuery()

usePropertyQuery()

useCreatePropertyMutation()

useUpdatePropertyMutation()

useDeletePropertyMutation()
```

Query Keys

```ts
propertyKeys.all
propertyKeys.list
propertyKeys.detail(id)
```

---

# Zustand Store

Store files belong inside `store/`.

```
store/
    property.store.ts
    auth.store.ts
```

Store names

```ts
usePropertyStore()

useAuthStore()
```

---

# Validation Schemas

Schemas belong inside `schemas/`.

```
schemas/
    property.schema.ts
    tenant.schema.ts
```

Example

```ts
propertySchema

createPropertySchema

updatePropertySchema
```

---

# Types

Shared types belong inside `types/`.

```
types/
    property.ts
    tenant.ts
    lease.ts
```

Prefer

```ts
Property

PropertyUnit

PropertyForm

PropertyResponse
```

Avoid

```ts
IProperty
TProperty
propertyType
```

---

# Constants

Use UPPER_SNAKE_CASE.

```ts
MAX_FILE_SIZE

DEFAULT_PAGE_SIZE

PROPERTY_STATUS
```

---

# Variables

Use **camelCase**.

```ts
property

propertyList

selectedProperty

totalUnits
```

---

# Functions

Use camelCase and begin with a verb.

```
getProperty()

createProperty()

updateProperty()

deleteProperty()

calculateTotalRent()

formatCurrency()
```

Avoid

```
propertyData()

data()

property()
```

---

# Interfaces & Types

Use PascalCase.

```
Property

PropertyUnit

PropertyForm

PropertyResponse

PaginationMeta
```

---

# Enums

Use PascalCase.

```ts
enum PropertyStatus {
    Available,
    Occupied,
    Maintenance
}
```

---

# Boolean Variables

Boolean names should read naturally.

```
isLoading

isSubmitting

isOpen

hasPermission

canEdit

shouldRefetch
```

Avoid

```
loading

open

permission
```

---

# Component Props

Always suffix with `Props`.

```ts
interface PropertyCardProps {
    property: Property
}
```

---

# Feature Independence

Each feature should be self-contained.

```
features/
    property/
    tenant/
    lease/
```

A feature should own:

- components
- hooks
- queries
- API
- schemas
- state
- types

Avoid importing internal files directly from another feature.

Instead, expose reusable functionality through a public API (e.g., an `index.ts`) or move shared code into a dedicated `shared` or `lib` module.

---

# General Guidelines

- Use TypeScript strict mode.
- Prefer named exports over default exports.
- Keep components focused on a single responsibility.
- Keep business logic out of UI components.
- Use feature isolation.
- Avoid deeply nested folders.
- Keep filenames descriptive.
- Maintain consistency across all features.

---

# Summary

| Item | Convention |
|-------|------------|
| Folder Names | kebab-case |
| File Names | kebab-case |
| Components | PascalCase |
| Hooks | useSomething |
| Variables | camelCase |
| Functions | camelCase (verb first) |
| Types | PascalCase |
| Enums | PascalCase |
| Constants | UPPER_SNAKE_CASE |
| Boolean Variables | is/has/can/should prefix |
| Props Interface | `ComponentNameProps` |