import { Bot, Lightbulb, AlertCircle } from 'lucide-react'
import { AnalysisData } from '../../types'
import { motion } from 'framer-motion'

interface AIGuidanceProps {
  data: AnalysisData
}

export default function AIGuidance({ data }: AIGuidanceProps) {
  const allInsights = [
    ...data.eda.insights.map(i => ({ type: 'insight', text: i, source: 'EDA' })),
    ...(data.efa?.insights.map(i => ({ type: 'insight', text: i, source: 'EFA' })) || []),
  ]
  
  const allRecommendations = [
    ...data.eda.recommendations.map(r => ({ type: 'recommendation', text: r, source: 'EDA' })),
    ...(data.efa?.recommendations.map(r => ({ type: 'recommendation', text: r, source: 'EFA' })) || []),
  ]

  return (
    <div className="mb-8">
      <div className="card bg-gradient-to-r from-primary to-primary-light text-white mb-6">
        <div className="flex items-start space-x-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Bot className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">Your AI Analysis Guide</h2>
            <p className="text-white/90">
              Our AI agents have analyzed your dataset and prepared insights in plain language. 
              Here's what we discovered:
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <div className="flex items-center mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
            <h3 className="text-xl font-bold">Key Insights</h3>
          </div>
          <div className="space-y-3">
            {allInsights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{item.text}</p>
                  <span className="text-xs text-gray-500 mt-1 block">From {item.source}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-xl font-bold">Recommendations</h3>
          </div>
          <div className="space-y-3">
            {allRecommendations.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{item.text}</p>
                  <span className="text-xs text-gray-500 mt-1 block">From {item.source}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
        <h3 className="font-bold text-lg mb-3 flex items-center">
          <Bot className="w-5 h-5 mr-2 text-purple-600" />
          What This Means For You
        </h3>
        <p className="text-gray-700 mb-3">
          {data.efa 
            ? `Your dataset has been thoroughly analyzed through both Exploratory Data Analysis (EDA) and Exploratory Factor Analysis (EFA). 
            The EDA revealed patterns in your individual variables, while the EFA identified ${data.efa.factorAnalysis.factors} underlying factors 
            that explain relationships between your variables.`
            : `Your dataset has been analyzed through Exploratory Data Analysis (EDA). We've examined each variable's characteristics, 
            relationships between variables, and data quality. For factor analysis, consider including more numeric variables in your dataset.`
          }
        </p>
        <p className="text-sm text-gray-600">
          <strong>Next Steps:</strong> Review the detailed sections below to dive deeper into specific aspects of your data. 
          Each visualization and statistic has been designed to be understandable regardless of your statistical background.
        </p>
      </div>
    </div>
  )
}

