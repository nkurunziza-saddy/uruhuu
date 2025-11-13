"use client";

import { BorderSeparator } from "@/components/ui/border-separator";
import { COMPONENTS } from "@/lib/components";
import { ComponentCard } from "./component-card";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="cpx space-y-2 py-5">
        <h1 className="font-bold font-heading text-4xl">
          Minimalist Components
        </h1>
        <p className="text-muted-foreground text-sm">
          Clean, minimalist UI components built with Base UI and styled with
          Tailwind CSS.
        </p>
      </div>
      <BorderSeparator />
      <div className="cpx grid grid-cols-1 gap-6 items-start py-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {COMPONENTS.map((component) => (
          <ComponentCard
            key={component.id}
            name={component.name}
            commands={component.commands}
            example={component.example}
          />
        ))}
      </div>
      <BorderSeparator />
    </div>
  );
}
