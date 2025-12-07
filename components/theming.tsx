import { codeToHtml } from "shiki";

export async function ThemingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-3">Theming</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Customize the look and feel with CSS variables.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">CSS Variables</h2>
        <p className="text-muted-foreground">
          The theme is controlled via CSS variables defined in your{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
            globals.css
          </code>
          .
        </p>
        <div
          className="rounded-lg border overflow-hidden [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed [&_pre]:bg-transparent! [&_code]:font-mono"
          dangerouslySetInnerHTML={{
            __html: await codeToHtml(
              `:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --accent: 0 0% 96.1%;
  --border: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
  --radius: 0.5rem;
}`,
              { lang: "css", theme: "vitesse-dark" }
            ),
          }}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Dark Mode</h2>
        <p className="text-muted-foreground">
          Dark mode is supported out of the box. Add the{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm">dark</code>{" "}
          class to your HTML element.
        </p>
        <div
          className="rounded-lg border overflow-hidden [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed [&_pre]:bg-transparent! [&_code]:font-mono"
          dangerouslySetInnerHTML={{
            __html: await codeToHtml(
              `.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --muted: 0 0% 14.9%;
  /* ... */
}`,
              { lang: "css", theme: "vitesse-dark" }
            ),
          }}
        />
      </div>
    </div>
  );
}
