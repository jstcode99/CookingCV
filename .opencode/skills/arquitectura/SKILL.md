---
name: arquitectura
description: >
  Arquitectura real del proyecto — Modular con Next.js App Router.
  Usar SIEMPRE al crear módulos nuevos, rutas, componentes, o cuando el usuario
  pregunte dónde va un archivo o cómo organizar código nuevo.
---

# Arquitectura — Modular (Next.js App Router)

## Filosofía

Arquitectura **modular por dominio**: cada módulo en `src/modules/` es autónomo y agrupa
todo lo que necesita (UI, lógica, validación, acceso a datos). El código compartido vive
en `components/`, `hooks/`, `lib/` y `types/`.

## Capas y regla de dependencia

```
app/              ← Solo routing: páginas, layouts, params, API routes
modules/<dominio> ← Núcleo: lógica, datos, UI y validación por feature
components/       ← UI reutilizable (shadcn base + componentes compartidos)
lib/              ← Config global (clientes Supabase, utils)
hooks/            ← Hooks globales
types/            ← Tipos globales / generados por Supabase CLI
```

**Regla clave:** `app/` solo importa de `modules/`. Los módulos pueden importar de
`components/`, `lib/`, `hooks/` y `types/`, pero **nunca entre módulos distintos**
(si hay lógica compartida, extráela a `lib/` o `components/shared/`).

## Árbol de carpetas

```
src/
├── app/                        # (Routing) Solo rutas, layouts y params
│   ├── (auth)/                 # Grupo de rutas de autenticación
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx
│   ├── dashboard/              # Rutas protegidas del dashboard
│   │   └── tickets/page.tsx    # Importa componentes de modules/tickets
│   ├── api/                    # Webhooks o endpoints externos
│   ├── layout.tsx
│   └── page.tsx
│
├── modules/                    # 🎯 EL NÚCLEO (Feature/Domain Layer)
│   ├── tickets/                # Ejemplo de módulo
│   │   ├── components/         # UI específica del módulo (DataTables, Forms)
│   │   ├── actions.ts          # Server Actions (escrituras, mutaciones)
│   │   ├── services.ts         # Llamadas a Supabase (queries, reads)
│   │   ├── schema.ts           # Schemas Zod + tipos TypeScript del módulo
│   │   └── hooks.ts            # Hooks cliente específicos (si aplica)
│   └── users/                  # Otro módulo...
│       ├── components/
│       ├── actions.ts
│       ├── services.ts
│       └── schema.ts
│
├── components/                 # UI compartida entre módulos
│   ├── ui/                     # Componentes atómicos de shadcn/ui
│   └── shared/                 # Componentes compuestos reutilizables
│                               # (headers, sidebars, modals genéricos, etc.)
│
├── lib/                        # Configuraciones y utilidades globales
│   ├── supabase/
│   │   ├── client.ts           # Cliente browser (Client Components)
│   │   ├── server.ts           # Cliente server (SSR / Server Actions)
│   │   └── admin.ts            # Cliente admin (service_role)
│   └── utils.ts                # cn(), helpers de Tailwind/shadcn
│
├── hooks/                      # Hooks globales (use-mobile, use-toast, etc.)
└── types/                      # Tipos globales o generados por Supabase CLI
    ├── database.types.ts       # Auto-generado por `supabase gen types`
    └── index.ts                # Re-exports de tipos compartidos
```

## Anatomía de un módulo

Cada archivo dentro de `modules/<dominio>/` tiene una responsabilidad clara:

| Archivo | Responsabilidad |
|---|---|
| `schema.ts` | Schemas Zod para validación + tipos TypeScript inferidos |
| `services.ts` | Funciones de lectura/query a Supabase (solo `select`) |
| `actions.ts` | Server Actions para escrituras (`insert`, `update`, `delete`) |
| `hooks.ts` | Hooks cliente que consumen actions/services (React Query, etc.) |
| `components/` | Componentes React exclusivos de este módulo |

## Dónde va cada cosa nueva

| Qué creas | Dónde |
|---|---|
| Nuevo módulo/dominio | `src/modules/<dominio>/` |
| Schema de validación + tipos | `src/modules/<dominio>/schema.ts` |
| Queries a Supabase (reads) | `src/modules/<dominio>/services.ts` |
| Mutaciones / Server Actions | `src/modules/<dominio>/actions.ts` |
| Hook cliente del módulo | `src/modules/<dominio>/hooks.ts` |
| Componente UI del módulo | `src/modules/<dominio>/components/<componente>.tsx` |
| Componente shadcn (atómico) | `src/components/ui/<componente>.tsx` |
| Componente compartido | `src/components/shared/<componente>.tsx` |
| Página / ruta | `src/app/<ruta>/page.tsx` |
| Hook global | `src/hooks/use-<nombre>.ts` |
| Config / util global | `src/lib/utils.ts` o `src/lib/<nombre>.ts` |
| Cliente Supabase | `src/lib/supabase/{client|server|admin}.ts` |
| Tipos globales | `src/types/index.ts` |
| Tipos generados Supabase | `src/types/database.types.ts` (no editar a mano) |
| Migración SQL | `supabase/migrations/<timestamp>_<descripcion>.sql` |

## Al añadir un módulo nuevo, sigue este orden

1. Crear carpeta `src/modules/<dominio>/`
2. `schema.ts` → definir tipos Zod + inferir tipos TypeScript
3. `services.ts` → implementar queries de lectura con el cliente Supabase server
4. `actions.ts` → implementar Server Actions de escritura, usar schema para validar
5. `hooks.ts` → (si hay lógica cliente) wrappear con React Query u otro
6. `components/` → construir la UI específica consumiendo actions/services
7. `src/app/<ruta>/page.tsx` → crear la página e importar componentes del módulo

## Reglas importantes

- **`app/` no contiene lógica:** solo importa y renderiza componentes de `modules/`.
- **Los módulos no se importan entre sí:** si dos módulos comparten lógica, muévela a `lib/` o `components/shared/`.
- **`services.ts` es solo lectura:** las escrituras van siempre en `actions.ts` como Server Actions (`"use server"`).
- **`schema.ts` es la fuente de verdad de tipos:** usa `z.infer<typeof schema>` en lugar de definir tipos sueltos.
- **Supabase CLI:** al cambiar el schema de la DB, regenerar `types/database.types.ts` con `supabase gen types typescript`.
