# CookingCV
This a adapter CV to employes offerts with AI
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Acerca del proyecto

Es un proyecto para la hackaton con ningun objetivo comercial mas alla de GANAR :D,
el proyecto usara una arquitectura Hexogal + Layared by feauteres. conectada con Supabase
en gestion de base de datos.

para la validacion de formulario se usara Zod + React Hook Forms
para la UI minimalista con Shadcn + lucide icons

### Estructura de carpetas

``
src/
├── app/                  # (Routing) Solo define rutas, layouts y recibe params
│   ├── (auth)/           # Grupos de rutas
│   ├── dashboard/
│   └── api/              # Webhooks o endpoints externos
├── components/           # UI Compartida
│   ├── ui/               # Componentes de shadcn (atómicos)
│   └── shared/           # Botones complejos, headers, etc.
├── modules/              # 🎯 EL NÚCLEO (Domain/Feature Layer)
│   ├── tickets/          # Ejemplo de un dominio
│   │   ├── components/   # UI específica de tickets (DataTables, Forms)
│   │   ├── actions.ts    # Server Actions (Equivalente al "Controller")
│   │   ├── services.ts   # Llamadas a Supabase (Equivalente al "Model/Repo")
│   │   ├── schema.ts     # Validaciones Zod y tipos de TS
│   │   └── hooks.ts      # Hooks específicos (si aplica)
│   └── users/            # Otro dominio...
├── lib/                  # Configuraciones globales
│   ├── supabase/         # Clientes (client.ts, server.ts, admin.ts)
│   └── utils.ts          # Utils de tailwind/shadcn
├── hooks/                # Hooks globales (use-mobile, etc.)
└── types/                # Tipos globales o generados por Supabase CLI
``
