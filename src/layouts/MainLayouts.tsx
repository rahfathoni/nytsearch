import Header from "../components/header"
import LoadingOverlay from "../components/loading-overlay"

interface MainLayoutProps {
  children: React.ReactNode
  isLoading: boolean
}

export default function MainLayout({ children, isLoading }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main className="mx-auto px-6 py-8 sm:px-12 lg:px-18">
        {children}
      </main>
      <LoadingOverlay show={isLoading} />
    </>
  )
}