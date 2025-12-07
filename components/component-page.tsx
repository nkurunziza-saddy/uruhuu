import { PreviewCard } from "./preview-card";
import { InstallTabs } from "./install-tabs";
import { COMPONENTS } from "@/lib/constants/components";

export function ComponentPage({
  component,
}: {
  component: (typeof COMPONENTS)[number];
}) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{component.name}</h1>
        <p className="text-muted-foreground">
          A {component.name.toLowerCase()} component built with Base UI.
        </p>
      </div>

      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
          Preview
        </h2>
        <PreviewCard fullWidth={component.fullWidth}>
          {component.example}
        </PreviewCard>
      </section>

      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
          Installation
        </h2>
        <InstallTabs commands={component.commands} />
      </section>

      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
          Usage
        </h2>
        <div className="rounded-lg border bg-muted/40 p-4">
          <pre className="text-sm font-mono overflow-x-auto">
            <code>{`import { ${component.name.replace(
              /\s+/g,
              ""
            )} } from "@/registry/new-york/ui/${component.id}";

<${component.name.replace(/\s+/g, "")} />`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
          Tips
        </h2>
        <ul className="text-sm text-muted-foreground space-y-2.5">
          <li className="flex items-start gap-2.5">
            <span className="text-primary mt-0.5">•</span>
            <span>
              Built with Base UI — fully accessible and keyboard navigable.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-primary mt-0.5">•</span>
            <span>
              Customize styles by modifying the component file directly.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-primary mt-0.5">•</span>
            <span>
              Check the component source for all available props and variants.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
