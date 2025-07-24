import Header from "../components/header"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto px-4 py-4 sm:px-8 lg:px-16">
        {children}
      </main>
    </>
  );
}