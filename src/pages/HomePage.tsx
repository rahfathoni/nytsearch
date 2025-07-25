import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import type { Article, NytSearchResponse } from "../types/article"
import HomeArticles from "../components/home-articles"
import HomeSearch from "../components/home-search"
import { IconChevronDown } from "@tabler/icons-react"

const NYTIMES_API_KEY = import.meta.env.VITE_NYTIMES_API_KEY as string

const SORT_OPTIONS = ["best", "newest", "oldest", "relevance"] as const
type SortOption = typeof SORT_OPTIONS[number]

interface HomePageProps {
  setMainLoading: (loading: boolean) => void
}

export default function HomePage({ setMainLoading }: HomePageProps) {
  const [state, setState] = useState({
    articles: [] as Article[],
    searchQuery: "",
    sortBy: "best" as SortOption,
    isLoading: false,
    error: null as string | null,
    currentPage: 1,
    offset: 0,
    totalData: 0,
    hasMoreData: true,
  })
  const { articles, isLoading, error, searchQuery, totalData, currentPage, hasMoreData, sortBy } = state

  const fetchArticles = useCallback(async (query = "", page = 1, sort = 'best') => {
    setMainLoading(true)
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const response = await axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
        params: {
          q: query,
          sort,
          page,
          'api-key': NYTIMES_API_KEY,
        },
      })

      const data: NytSearchResponse = response.data
      const newArticles = data.response.docs

      setState((prev) => ({
        ...prev,
        articles: page === 1 ? newArticles : [...prev.articles, ...newArticles],
        currentPage: page,
        totalData: data.response.metadata.hits,
        offset: data.response.metadata.offset,
        hasMoreData: newArticles && newArticles.length > 0,
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
      setMainLoading(false)
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [setMainLoading])

  const handleSearch = (query: string) => {
    setState((prev) => ({
      ...prev,
      searchQuery: query,
      currentPage: 1,
      hasMoreData: true,
      sortBy: "best",
    }))
    fetchArticles(query, 1, sortBy)
  }

  const handleClearSearch = () => {
    setState((prev) => ({
      ...prev,
      searchQuery: "",
      currentPage: 1,
      hasMoreData: true,
      sortBy: "best",
    }))
    fetchArticles("", 1, sortBy)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as SortOption
    setState((prev) => ({ ...prev, sortBy: newSort }))
    fetchArticles(searchQuery, 1, newSort)
  }

  const handleEndReached = () => {
    if (!isLoading && hasMoreData) {
      fetchArticles(searchQuery, currentPage + 1, sortBy)
    }
  }

  useEffect(() => {
    fetchArticles("", 1)
  }, [fetchArticles])

  return (
    <div className="relative">
      <div className="mx-auto relative z-0">
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
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <div className="text-gray-600 text-sm">
              {searchQuery ? (
                <p>
                  {totalData} result{totalData !== 1 ? "s" : ""} found for "{searchQuery}"
                </p>
              ) : (
                <span className="invisible">.</span>
              )}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <label className="text-gray-600 text-sm whitespace-nowrap">
                Sort by:
              </label>

              <div className="relative min-w-[140px]">
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  disabled={articles.length === 0}
                  className="bg-white text-sm pl-5 pr-10 py-1 rounded-md border border-gray-300
                    focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed 
                    cursor-pointer transition appearance-none w-full"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </option>
                  ))}
                </select>

                <IconChevronDown
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                />
              </div>
            </div>
          </div>

          <HomeArticles
            articles={articles}
            isLoading={isLoading}
            hasMore={hasMoreData}
            onEndReached={handleEndReached}
          />
        </div>
      </div>
    </div>
  )
}