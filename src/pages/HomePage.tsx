import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import type { Article, NytSearchResponse } from "../types/article"
import HomeArticles from "../components/home-articles"
import HomeSearch from "../components/home-search"

const NYTIMES_API_KEY = import.meta.env.VITE_NYTIMES_API_KEY as string

export default function HomePage() {
  const [state, setState] = useState({
    articles: [] as Article[],
    searchQuery: "",
    isLoading: false,
    error: null as string | null,
    currentPage: 1,
    offset: 0,
    totalData: 0, // maximum data 1000 data or 100 page default by api
  })
  const { articles, isLoading, error, searchQuery, totalData } = state
  
  const fetchArticles = useCallback(async (query = "", page = 1) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    await new Promise((resolve) => setTimeout(resolve, 300))

    try {
      const response = await axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
        params: {
          q: query,
          sort: query ? "relevance" : "best",
          page,
          'api-key': NYTIMES_API_KEY,
        },
      })

      const data: NytSearchResponse = response.data

      setState((prev) => ({
        ...prev,
        articles: page === 1 ? data.response.docs : [...prev.articles, ...data.response.docs],
        isLoading: false,
        currentPage: page,
        totalData: data.response.metadata.hits,
        offset: data.response.metadata.offset,
        error: null,
      }))
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setState((prev) => ({ 
        ...prev, 
        articles: [], 
        error: errorMessage 
      }))
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const handleSearch = (query: string) => {
    setState((prev) => ({ ...prev, searchQuery: query, currentPage: 1 }))
    fetchArticles(query, 1)
  }

  const handleClearSearch = () => {
    setState((prev) => ({ ...prev, searchQuery: "", currentPage: 1 }))
    fetchArticles("", 1)
  }

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
        
        <HomeSearch
          searchQuery={searchQuery}
          isLoading={isLoading}
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />

        {error && (
          <div className="mt-6 p-4 bg-danger border border-red-800 rounded-lg">
            <p className="text-white">Error: {error}</p>
          </div>
        )}

        <div className="mt-8">
          {searchQuery && articles.length > 0 && !isLoading && (
            <div className="mb-6">
              <p className="text-gray-600">
                {totalData} result{totalData !== 1 ? "s" : ""} found for "{searchQuery}"
              </p>
            </div>
          )}

          <HomeArticles articles={articles} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}