import type { Article } from "../types/article"
import imageNotFound from '../assets/Image-not-found.png'
import { IconExternalLink, IconCalendar, IconUser, IconExternalLinkOff } from "@tabler/icons-react"
import { formatDate } from "../lib/date"

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const isValidUrl = Boolean(article.web_url) && article.web_url.startsWith("http")

  const handleClick = () => {
    if (isValidUrl) window.open(article.web_url, "_blank", "noopener,noreferrer")
  }

  return (
    <div
      className={`${isValidUrl ? "cursor-pointer" : "cursor-default"} 
        hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.015] transition duration-300 ease-in-out 
        h-full flex flex-col rounded-[15px] border border-gray-200 bg-white text-black shadow`}
      onClick={handleClick}
    >
      <div className="relative h-48 w-full">
        <img
          src={article.multimedia?.default?.url || imageNotFound}
          alt={article.multimedia?.caption || "Image not found"}
          className="w-full h-full rounded-t-[15px] object-cover"
        />
      </div>

      <div className="p-4 flex-1">
        <div className="mb-2">
          <span className="bg-gray text-dark-gray px-3 py-1 rounded-[15px] text-xs">
            {article.section_name || article.subsection_name || article.news_desk}
          </span>
        </div>

        <h3 className="font-bold text-xl mb-2 line-clamp-2 text-black">{article.headline.main}</h3>

        <div className="w-full space-y-2 pb-2">
          <div className="flex items-center text-xs text-gray-500">
            <IconUser size={16} className="mr-1" />
            <span>{article.byline?.original || "Unknown Author"}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-500">
              <IconCalendar size={16} className="mr-1" />
              <span>{formatDate(article.pub_date) || "Unknown Date"}</span>
            </div>

          </div>
        </div>

        <p className="text-dark-gray text-sm mb-4 line-clamp-3">{article.abstract}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {article.keywords.slice(0, 4).map((keyword, index) => (
            <span key={index} className="border text-xs px-2 py-0.5 rounded-[15px] mb-1">
              {keyword.value}
            </span>
          ))}
        </div>

        <div className="flex justify-end p-0 mt-auto">
          {isValidUrl ? (
            <IconExternalLink size={20} className="text-primary hover:text-blue-800 transition-colors" />
          ) : (
            <IconExternalLinkOff size={20} className="text-dark-gray" />
          )}
        </div>
      </div>
    </div>
  )
}
