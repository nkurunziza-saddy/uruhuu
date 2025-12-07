import { ComponentPage } from "@/components/component-page";
import { IntroductionPage } from "@/components/intro";
import { QuickStartPage } from "@/components/quickstart";
import { ThemingPage } from "@/components/theming";
import { COMPONENTS } from "@/lib/constants/components";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DocsPage({ params }: PageProps) {
  const { id } = await params;
  const isPage = ["introduction", "quick-start", "theming"].includes(id);
  const selectedComponent = COMPONENTS.find((c) => c.id === id);

  if (id === "introduction") return <IntroductionPage />;
  if (id === "quick-start") return <QuickStartPage />;
  if (id === "theming") return <ThemingPage />;

  if (!isPage && selectedComponent) {
    return <ComponentPage component={selectedComponent} />;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="text-muted-foreground">
        The page you're looking for doesn't exist.
      </p>
    </div>
  );
}
