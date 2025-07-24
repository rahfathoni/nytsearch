import type { Article } from "../types/article"
import { IconLoader2 } from "@tabler/icons-react"
import ArticleCard from "./article-card"

interface HomeArticlesProps {
  articles: Article[]
  isLoading: boolean
}

export default function HomeArticles({ articles, isLoading }: HomeArticlesProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <IconLoader2 className="animate-spin" size={20} stroke={1.5} color="blue"/>
        <span className="ml-2 text-gray-600">Searching articles...</span>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-600 font-semibold text-lg">
          No articles found. Try a different search keywords.
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  )
}
