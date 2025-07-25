import Header from "../components/header"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto px-6 py-8 sm:px-12 lg:px-18">
        {children}
      </main>
    </>
  )
}