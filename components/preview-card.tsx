export function PreviewCard({
  children,
  fullWidth = false,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div className="relative rounded-xl border bg-gradient-to-br from-muted/20 via-background to-muted/30 p-8 flex items-center justify-center min-h-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,119,198,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,119,198,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className={fullWidth ? "relative z-10 w-full" : "relative z-10"}>
        {children}
      </div>
    </div>
  );
}
