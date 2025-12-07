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

export function InstallTabs({
  commands,
}: {
  commands: { pnpm: string; npm: string; yarn: string; bun: string };
}) {
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
    <Tabs defaultValue="pnpm" className="w-full">
      <TabsList className="w-fit">
        <TabsTrigger value="pnpm">pnpm</TabsTrigger>
        <TabsTrigger value="npm">npm</TabsTrigger>
        <TabsTrigger value="yarn">yarn</TabsTrigger>
        <TabsTrigger value="bun">bun</TabsTrigger>
      </TabsList>
      {(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
        <TabsContent key={pm} value={pm}>
          <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-4 py-3 mt-2">
            <code className="flex-1 text-sm font-mono">{commands[pm]}</code>
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={() => copyCommand(commands[pm], pm)}
              className="h-7 w-7 shrink-0"
            >
              {copiedCommand === pm ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
