import PageIllustration from "@/components/page-illustration";

export default function AuthLayout({
  children,
}) {
  return (
    <main className="relative flex grow flex-col">
      <PageIllustration multiple />

      {children}
    </main>
  );
}
