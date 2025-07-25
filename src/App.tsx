import { useState } from "react"
import MainLayout from "./layouts/MainLayouts"
import HomePage from "./pages/HomePage"

function App() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <MainLayout isLoading={isLoading}>
      <HomePage setMainLoading={setIsLoading} />
    </MainLayout>
  )
}

export default App
