import nytLogo from '../assets/nyt-big.svg'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray shadow-sm">
      <div className="mx-auto px-4 py-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-left">
          <div className="flex items-center space-x-3">
            <img
              className="h-[1.5em] w-auto align-text-bottom"
              src={nytLogo}
              alt="Logo"
            />
            <span className="text-2xl font-bold text-gray-900 font-unique">
              NYT Search
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}