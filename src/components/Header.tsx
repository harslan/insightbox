import { Brain, Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary to-primary-light text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">InsightBox</h1>
              <p className="text-sm text-white/90">The Cursor of EDA/EFA</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Analytics</span>
          </div>
        </div>
      </div>
    </header>
  )
}

