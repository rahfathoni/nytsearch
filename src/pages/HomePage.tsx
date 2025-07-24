import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import type { Article, NytSearchResponse } from "../types/article"

const NYTIMES_API_KEY = import.meta.env.VITE_NYTIMES_API_KEY as string

export default function HomePage() {
  const [state, setState] = useState({
    articles: [] as Article[],
    searchQuery: "",
    isLoading: false,
    error: null as string | null,
    currentPage: 1,
    totalData: 100, // maximum data by default api
  })
  const { articles, isLoading, error, currentPage, totalData } = state
  
  const fetchArticles = useCallback(async (query = "", page = 1) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await axios.get(
        "https://api.nytimes.com/svc/search/v2/articlesearch.json", 
        {
          params: {
            q: query,
            page,
            'api-key': NYTIMES_API_KEY,
          },
        }
      )

      const data: NytSearchResponse = response.data
      
      setState((prev) => ({
        ...prev,
        articles: data.response.docs,
        isLoading: false,
        search: query,
        currentPage: page,
      }))
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setState((prev) => ({ 
        ...prev, 
        articles: [], 
        error: errorMessage 
      }))
    } finally {
      setState((prev) => ({ ...prev, isLoading: false}))
    }
  }, [])

  useEffect(() => {
    fetchArticles("", 1)
  }, [fetchArticles])

  return (
    <div>
      <div className="mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-bold mb-4 font-unique">The New York Times Article Search</h1>
          <p className="text-lg text-gray-600 mb-8">
            Search through our collection of articles by keywords
          </p>
        </div>
        {/* temporary */}
        {/* {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
               <pre key={article._id} className="text-sm whitespace-pre-wrap">
                {JSON.stringify(article, null, 2)}
              </pre>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            {isLoading ? "Loading articles..." : "No articles found."}
          </div>
        )}
        {error && <div className="text-center text-red-500">{error}</div>}   */}
      </div>
    </div>
  )
}