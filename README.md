# Next.js Component Registry Project Structure

```
your-project/
├── app/                              # Next.js App Router
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx
│   └── blocks/
│       ├── editor/
│       │   └── page.tsx
│       └── examples/
│           └── [name]/
│               └── page.tsx
│
├── registry/                         # Registry source files
│   ├── new-york/                     # New york style
│   │   ├── ui/                       # UI primitives
│   │   │   ├── button/
│   │   │   │   ├── button.tsx
│   │   │   │   └── button.json      # Optional: per-component registry config
│   │   │   ├── card/
│   │   │   │   ├── card.tsx
│   │   │   │   └── card.json
│   │   │   ├── tooltip/
│   │   │   │   ├── tooltip.tsx
│   │   │   │   └── tooltip.json
│   │   │   ├── popover/
│   │   │   │   ├── popover.tsx
│   │   │   │   └── popover.json
│   │   │   ├── dialog/
│   │   │   ├── menu/
│   │   │   ├── dialog/
│   │   │   ├── input/
│   │   │   ├── label/
│   │   │   ├── select/
│   │   │   ├── textarea/
│   │   │   └── ...
│   │   │
│   │   ├── blocks/                   # Complex multi-file blocks
│   │   │   ├── editor/
│   │   │   │   ├── components/
│   │   │   │   │   ├── editor-toolbar.tsx
│   │   │   │   │   ├── editor-menu.tsx
│   │   │   │   │   ├── editor-bubble.tsx
│   │   │   │   │   └── editor-content.tsx
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── use-editor.ts
│   │   │   │   │   └── use-editor-state.ts
│   │   │   │   ├── lib/
│   │   │   │   │   ├── editor-config.ts
│   │   │   │   │   └── editor-utils.ts
│   │   │   │   ├── extensions/
│   │   │   │   │   ├── slash-command.tsx
│   │   │   │   │   └── custom-extension.tsx
│   │   │   │   ├── editor.tsx         # Main component
│   │   │   │   └── editor.json        # Registry config
│   │   │   │
│   │   │   ├── dashboard-01/
│   │   │   │   ├── components/
│   │   │   │   │   ├── sidebar.tsx
│   │   │   │   │   ├── header.tsx
│   │   │   │   │   └── main-content.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── dashboard-01.json
│   │   │   │
│   │   │   ├── login-form/
│   │   │   ├── signup-form/
│   │   │   ├── data-table/
│   │   │   └── ...
│   │   │
│   │   ├── hooks/                    # Shared hooks
│   │   │   ├── use-toast.ts
│   │   │   ├── use-media-query.ts
│   │   │   └── ...
│   │   │
│   │   ├── lib/                      # Utility functions
│   │   │   ├── utils.ts
│   │   │   └── cn.ts
│   │   │
│   │   └── examples/                 # Usage examples
│   │       ├── button-demo.tsx
│   │       ├── card-demo.tsx
│   │       └── editor-demo.tsx
│   │
│   └── registry.json                 # Main registry manifest
│
├── public/
│   └── r/                            # Built registry JSON files (generated)
│       ├── button.json
│       ├── card.json
│       ├── editor.json
│       └── ...
│
├── components/                       # Internal app components (not in registry)
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   └── docs/
│       ├── component-preview.tsx
│       └── code-block.tsx
│
├── lib/                              # App utilities
│   ├── registry.ts                   # Registry loading logic
│   └── mdx.ts
│
├── config/
│   ├── site.ts                       # Site configuration
│   └── docs.ts                       # Docs navigation
│
├── styles/
│   └── globals.css                   # Global styles with CSS variables
│
├── .cursorrules                      # Cursor AI rules
├── components.json                   # shadcn config
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js

```

## Key Files Configuration

### 1. `registry/registry.json`
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "your-project",
  "homepage": "https://your-project.com",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "title": "Button",
      "description": "A customizable button component.",
      "files": [
        {
          "path": "registry/new-york/ui/button/button.tsx",
          "type": "registry:component"
        }
      ],
      "registryDependencies": []
    },
    {
      "name": "editor",
      "type": "registry:block",
      "title": "Rich Text Editor",
      "description": "A powerful rich text editor with markdown support.",
      "files": [
        {
          "path": "registry/new-york/blocks/editor/editor.tsx",
          "type": "registry:component"
        },
        {
          "path": "registry/new-york/blocks/editor/components/editor-toolbar.tsx",
          "type": "registry:component"
        },
        {
          "path": "registry/new-york/blocks/editor/hooks/use-editor.ts",
          "type": "registry:hook"
        },
        {
          "path": "registry/new-york/blocks/editor/lib/editor-config.ts",
          "type": "registry:lib"
        }
      ],
      "dependencies": ["..."],
      "registryDependencies": ["button", "tooltip", "popover"]
    }
  ]
}
```

### 2. `registry/new-york/blocks/editor/editor.json` (Per-component config)
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "editor",
  "type": "registry:block",
  "title": "Rich Text Editor",
  "description": "A powerful rich text editor with markdown support.",
  "categories": ["editor", "content"],
  "author": "Your Name <you@example.com>",
  "dependencies": [
    "@lexical/react",
    "@lexical/utils",
    "..."
  ],
  "registryDependencies": [
    "button",
    "tooltip",
    "popover",
    "menu"
  ],
  "files": [
    {
      "path": "registry/new-york/blocks/editor/editor.tsx",
      "type": "registry:component"
    },
    {
      "path": "registry/new-york/blocks/editor/components/editor-toolbar.tsx",
      "type": "registry:component"
    },
    {
      "path": "registry/new-york/blocks/editor/components/editor-menu.tsx",
      "type": "registry:component"
    },
    {
      "path": "registry/new-york/blocks/editor/hooks/use-editor.ts",
      "type": "registry:hook"
    },
    {
      "path": "registry/new-york/blocks/editor/lib/editor-config.ts",
      "type": "registry:lib"
    }
  ],
  "cssVars": {
    "theme": {
      "editor-border-radius": "0.5rem"
    },
    "light": {
      "editor-background": "0 0% 100%",
      "editor-border": "0 0% 90%"
    },
    "dark": {
      "editor-background": "0 0% 10%",
      "editor-border": "0 0% 20%"
    }
  },
  "css": {
    "@layer components": {
      ".editor-content": {
        "min-height": "300px",
        "padding": "1rem"
      }
    }
  },
  "docs": "For full documentation, visit https://your-project.com/docs/components/editor"
}
```

### 3. `package.json` scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "registry:build": "shadcn build",
    "registry:watch": "shadcn build --watch",
    "prebuild": "pnpm registry:build"
  },
  "devDependencies": {
    "shadcn": "latest"
  }
}
```

### 4. `components.json` (shadcn config)
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks",
    "registry": "@/registry"
  }
}
```

## File Organization Best Practices

### For UI Primitives (Small components)
```
registry/new-york/ui/button/
├── button.tsx           # Main component
└── button.json          # Optional: Registry config if needs special setup
```

### For Blocks (Complex components)
```
registry/new-york/blocks/editor/
├── components/          # Sub-components
│   ├── editor-toolbar.tsx
│   ├── editor-menu.tsx
│   └── editor-bubble.tsx
├── hooks/              # Component-specific hooks
│   └── use-editor.ts
├── lib/                # Utilities and configs
│   ├── editor-config.ts
│   └── editor-utils.ts
├── extensions/         # Custom extensions
│   └── slash-command.tsx
├── editor.tsx          # Main entry point
└── editor.json         # Registry configuration
```

## Import Conventions

All imports in registry files should use the `@/registry` path alias:

```tsx
// Good ✅
import { Button } from "@/registry/new-york/ui/button/button"
import { useEditor } from "@/registry/new-york/blocks/editor/hooks/use-editor"

// Bad ❌
import { Button } from "../../ui/button/button"
import { Button } from "@/components/ui/button"
```

## Building the Registry

```bash
# Build once
pnpm registry:build

# Watch mode during development
pnpm registry:watch

# Output location: public/r/*.json
```

## Usage in Your App

```tsx
// app/page.tsx
import { Button } from "@/registry/new-york/ui/button/button"
import { Editor } from "@/registry/new-york/blocks/editor/editor"

export default function Page() {
  return (
    <div>
      <Button>Click me</Button>
      <Editor />
    </div>
  )
}
```

## Installation by Users

```bash
# Install a UI component
npx shadcn@latest add https://your-project.com/r/button.json

# Install a block
npx shadcn@latest add https://your-project.com/r/editor.json

# Install with namespace (if configured)
npx shadcn@latest add your-project:editor
```

## Tips

1. **Keep blocks self-contained**: Each block should have all its dependencies in its directory
2. **Use consistent naming**: `component-name.tsx` and `component-name.json`
3. **Document dependencies**: Always list all `dependencies` and `registryDependencies`
4. **Add examples**: Include example usage in `registry/new-york/examples/`
5. **Version control**: Commit built files in `public/r/` or add to `.gitignore` and build on CI
6. **Test installations**: Regularly test installing components in a fresh project
7. **Use categories**: Organize components with categories in the registry config
8. **Add docs field**: Include helpful documentation or setup instructions

## Advanced: Multiple Styles

If you support multiple styles (like shadcn's "default" and "new-york"):

```
registry/
├── default/
│   ├── ui/
│   └── blocks/
├── new-york/
│   ├── ui/
│   └── blocks/
└── registry.json
```

Users can install specific styles:
```bash
npx shadcn@latest add https://your-project.com/r/new-york/button.json
```