import { Upload, BarChart3, TrendingUp, Users, Zap, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  const features = [
    { icon: Upload, text: 'Simple Upload' },
    { icon: BarChart3, text: 'Auto EDA' },
    { icon: TrendingUp, text: 'Factor Analysis' },
    { icon: Users, text: 'For Everyone' },
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-primary mb-4">
            Democratizing Data Insights
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            From 7 to 70, A to Z — AI agents that guide you through complete EDA and EFA analysis
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {features.map((feature, idx) => (
            <div key={idx} className="card text-center">
              <feature.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
              <p className="text-sm font-medium">{feature.text}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="success-box max-w-2xl mx-auto"
        >
          <div className="flex items-start space-x-3">
            <Zap className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
            <div className="text-left">
              <h3 className="font-bold text-lg mb-2">What Makes InsightBox Special?</h3>
              <ul className="space-y-2 text-sm">
                <li>• <strong>AI Agents</strong> that explain every step in plain language</li>
                <li>• <strong>Consistent Results</strong> — thorough analysis from A to Z</li>
                <li>• <strong>No Expertise Required</strong> — designed for everyone</li>
                <li>• <strong>Complete Insights</strong> — EDA and EFA in one workflow</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

