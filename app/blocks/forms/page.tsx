import { APP_DESCRIPTION, APP_NAME } from "@/lib/configs";
import { BorderSeparator } from "@/registry/new-york/ui/border-separator";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Forms - ${APP_NAME}`,
  description: APP_DESCRIPTION,
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="cpx space-y-2 py-5">
        <h1 className="font-bold font-heading text-4xl">Forms</h1>
        <p className="text-muted-foreground text-sm">
          Coming soon...
        </p>
      </div>
      <BorderSeparator />
    </div>
  );
}
