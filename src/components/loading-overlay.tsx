import { IconLoader2 } from "@tabler/icons-react"
import nytLogo from "../assets/nyt-big.svg"

interface LoadingOverlayProps {
  show: boolean
}

export default function LoadingOverlay({ show }: LoadingOverlayProps) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 bg-white/70 flex items-center justify-center">
      <div className="relative w-24 h-24">
        <IconLoader2 className="absolute animate-spin text-dark-gray" size={100} stroke={1.5} />
        <img
          src={nytLogo}
          alt="nyt Logo"
          className="absolute w-10 h-10 top-1/2 left-1/2"
          style={{ transform: "translate(-30%, -30%)" }}
        />
      </div>
    </div>
  )
}