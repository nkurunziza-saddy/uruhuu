"use client";

import { Button } from "@/registry/new-york/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function QuickStartPage() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyCommand = async (command: string, type: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedCommand(type);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-3">Quick Start</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Get up and running in minutes.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">1. Install Dependencies</h2>
        <p className="text-muted-foreground">
          Make sure you have Tailwind CSS set up in your project.
        </p>
        <Tabs defaultValue="pnpm" className="w-full">
          <TabsList className="w-fit">
            <TabsTrigger value="pnpm">pnpm</TabsTrigger>
            <TabsTrigger value="npm">npm</TabsTrigger>
          </TabsList>
          <TabsContent value="pnpm">
            <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-4 py-3 mt-2">
              <code className="flex-1 text-sm font-mono">
                pnpm add @base-ui-components/react
              </code>
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={() =>
                  copyCommand("pnpm add @base-ui-components/react", "base-pnpm")
                }
                className="h-7 w-7"
              >
                {copiedCommand === "base-pnpm" ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="npm">
            <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-4 py-3 mt-2">
              <code className="flex-1 text-sm font-mono">
                npm install @base-ui-components/react
              </code>
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={() =>
                  copyCommand(
                    "npm install @base-ui-components/react",
                    "base-npm"
                  )
                }
                className="h-7 w-7"
              >
                {copiedCommand === "base-npm" ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">2. Add Components</h2>
        <p className="text-muted-foreground">
          Use the CLI to add components to your project. Select a component from
          the sidebar and copy the install command.
        </p>
        <div className="rounded-lg border bg-muted/40 px-4 py-3">
          <code className="text-sm font-mono">
            npx shadcn@latest add button
          </code>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">3. Import & Use</h2>
        <p className="text-muted-foreground">
          Import components from your local registry and use them.
        </p>
        <div className="rounded-lg border bg-muted/40 p-4">
          <pre className="text-sm font-mono overflow-x-auto">
            {`import { Button } from "@/registry/new-york/ui/button";

export default function Page() {
  return <Button>Click me</Button>;
}`}
          </pre>
        </div>
      </div>

      <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
        <p className="text-sm">
          <strong>Tip:</strong> Components are designed to be copied and
          customized. Feel free to modify them to match your design system.
        </p>
      </div>
    </div>
  );
}
