import { Download, RotateCcw, Sparkles, TrendingUp, BarChart3 } from 'lucide-react'
import { AnalysisData } from '../types'
import EDASection from './results/EDASection'
import EFASection from './results/EFASection'
import AIGuidance from './results/AIGuidance'
import { generateReport } from '../utils/reportGenerator'

interface AnalysisResultsProps {
  data: AnalysisData
  onReset: () => void
}

export default function AnalysisResults({ data, onReset }: AnalysisResultsProps) {
  const handleDownloadReport = async () => {
    await generateReport(data)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Analysis Complete!</h1>
          <p className="text-gray-600">
            Dataset: <span className="font-semibold">{data.fileName}</span> • 
            {' '}{data.eda.shape.rows.toLocaleString()} rows × {data.eda.shape.columns} columns
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleDownloadReport} className="btn-secondary">
            <Download className="w-5 h-5 inline mr-2" />
            Download Report
          </button>
          <button onClick={onReset} className="btn-primary">
            <RotateCcw className="w-5 h-5 inline mr-2" />
            New Analysis
          </button>
        </div>
      </div>

      <AIGuidance data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
          <BarChart3 className="w-8 h-8 text-accent mb-2" />
          <h3 className="font-bold text-lg mb-1">EDA Complete</h3>
          <p className="text-sm text-gray-700">
            Explored {data.eda.columns.length} variables with {data.eda.insights.length} key insights
          </p>
        </div>
        
        {data.efa ? (
          <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
            <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-bold text-lg mb-1">EFA Complete</h3>
            <p className="text-sm text-gray-700">
              Extracted {data.efa.factorAnalysis.factors} factors explaining{' '}
              {data.efa.factorAnalysis.cumulativeVariance[data.efa.factorAnalysis.cumulativeVariance.length - 1].toFixed(1)}% variance
            </p>
          </div>
        ) : (
          <div className="card bg-gray-50 border-2 border-dashed border-gray-300">
            <TrendingUp className="w-8 h-8 text-gray-400 mb-2" />
            <h3 className="font-bold text-lg mb-1 text-gray-500">EFA Skipped</h3>
            <p className="text-sm text-gray-600">
              Insufficient numeric variables for factor analysis
            </p>
          </div>
        )}
        
        <div className="card bg-gradient-to-br from-green-50 to-green-100">
          <Sparkles className="w-8 h-8 text-green-600 mb-2" />
          <h3 className="font-bold text-lg mb-1">AI Insights</h3>
          <p className="text-sm text-gray-700">
            {data.eda.insights.length + (data.efa?.insights.length || 0)} insights generated
          </p>
        </div>
      </div>

      <EDASection eda={data.eda} />
      
      {data.efa && <EFASection efa={data.efa} />}
    </div>
  )
}

