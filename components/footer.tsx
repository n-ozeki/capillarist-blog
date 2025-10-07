import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center gap-4 text-sm">
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
              プライバシーポリシー
            </Link>
          </div>
          <p className="text-gray-600">© 2025 Capillarist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
