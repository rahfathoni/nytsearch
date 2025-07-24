import React, { useState } from "react"
import {
  IconSearch,
  IconX,
  IconLoader2,
} from "@tabler/icons-react"

interface HomeSearchProps {
  onSearch: (query: string) => void
  onClear: () => void
  searchQuery: string
  isLoading: boolean
}

export default function HomeSearch({
  onSearch,
  onClear,
  searchQuery,
  isLoading,
}: HomeSearchProps) {
  const [inputValue, setInputValue] = useState(searchQuery)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(inputValue.trim())
  }

  const handleClear = () => {
    setInputValue("")
    onClear()
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="relative flex-1">
          <IconSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
            stroke={1.5}
          />
          <input
            value={inputValue}
            className="pl-10 pr-10 py-3 w-full rounded-md border-2 border-gray-300 text-base focus:border-primary focus:ring-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            type="text"
            placeholder="Search articles by keyword..."
            disabled={isLoading}
            onChange={(e) => setInputValue(e.target.value)}
            />
          {inputValue && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
              type="button"
              disabled={isLoading}
              onClick={handleClear}
            >
              <IconX size={20} stroke={1.5} />
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 text-lg rounded-md font-medium text-white bg-primary hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isLoading ? (
            <IconLoader2 className="animate-spin" size={20} stroke={1.5} />
          ) : (
            "Search"
          )}
        </button>
      </div>
    </form>
  )
}