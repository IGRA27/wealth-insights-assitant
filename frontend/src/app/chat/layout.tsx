export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col items-center p-4">
      <h1 className="mb-4 text-3xl font-semibold">Chat</h1>
      {children}
    </section>
  );
}
