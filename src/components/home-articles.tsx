import { useEffect, useRef } from "react"
import type { Article } from "../types/article"
import { IconLoader2 } from "@tabler/icons-react"
import ArticleCard from "./article-card"

interface HomeArticlesProps {
  articles: Article[]
  isLoading: boolean
  onEndReached?: () => void
}

export default function HomeArticles({ articles, isLoading, onEndReached }: HomeArticlesProps) {
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!onEndReached || isLoading) return

    const handleScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY
      const pageHeight = document.documentElement.scrollHeight

      const isAtBottom = scrollBottom >= pageHeight - 2
      if (isAtBottom) onEndReached()
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [onEndReached, isLoading])


  return (
    <>
      {articles.length === 0 && !isLoading && (
        <div className="text-center py-12 text-black font-semibold text-lg">
          No articles found. Try a different search keywords.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>

      <div ref={endRef} className="h-10" />

      {isLoading && (
        <div className="flex justify-center items-center py-6">
          <IconLoader2 className="animate-spin text-dark-gray" size={20} stroke={1.5} />
          <span className="ml-2 text-primary font-bold">Loading more articles...</span>
        </div>
      )}
    </>
  )
}