"use client"

import { Button } from "@/components/ui/button"
import { Share2, Twitter, Facebook, Link as LinkIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface ShareButtonProps {
  title: string
  url: string
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, "_blank", "noopener,noreferrer")
  }

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(facebookUrl, "_blank", "noopener,noreferrer")
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        })
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing:", err)
        }
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          シェア
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {navigator.share && (
          <DropdownMenuItem onClick={handleNativeShare}>
            <Share2 className="h-4 w-4 mr-2" />
            シェアする
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleTwitterShare}>
          <Twitter className="h-4 w-4 mr-2" />
          Twitterでシェア
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleFacebookShare}>
          <Facebook className="h-4 w-4 mr-2" />
          Facebookでシェア
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink}>
          <LinkIcon className="h-4 w-4 mr-2" />
          {copied ? "コピーしました！" : "リンクをコピー"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
