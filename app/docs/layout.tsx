import Sidebar from "@/components/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-3.5rem-1px)]">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-3xl">{children}</div>
      </main>
    </div>
  );
}
