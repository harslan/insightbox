import { TrendingUp, CheckCircle, XCircle } from 'lucide-react'
import { EFAResults } from '../../types'
import ScreePlot from './ScreePlot'
import FactorLoadingsTable from './FactorLoadingsTable'

interface EFASectionProps {
  efa: EFAResults
}

export default function EFASection({ efa }: EFASectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center mb-6">
        <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
        <h2 className="text-3xl font-bold text-primary">Exploratory Factor Analysis</h2>
      </div>

      <div className="card mb-6">
        <div className="flex items-center mb-4">
          {efa.suitability.suitable ? (
            <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
          ) : (
            <XCircle className="w-6 h-6 text-orange-500 mr-2" />
          )}
          <h3 className="text-xl font-bold">Data Suitability</h3>
        </div>
        <div className="space-y-2">
          <p className={`font-semibold ${efa.suitability.suitable ? 'text-green-700' : 'text-orange-700'}`}>
            {efa.suitability.message}
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Kaiser-Meyer-Olkin (KMO)</div>
              <div className="text-2xl font-bold text-primary">
                {efa.suitability.kaiserMeyerOlkin.toFixed(3)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {efa.suitability.kaiserMeyerOlkin > 0.6 ? 'Good' : 'Acceptable'}
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Bartlett's Test (p-value)</div>
              <div className="text-2xl font-bold text-primary">
                {efa.suitability.bartlettTest.toFixed(4)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {efa.suitability.bartlettTest < 0.05 ? 'Significant' : 'Not Significant'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <h3 className="text-xl font-bold mb-4">Factor Extraction Summary</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600">
              {efa.factorAnalysis.factors}
            </div>
            <div className="text-sm text-gray-600 mt-1">Factors Extracted</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600">
              {efa.factorAnalysis.cumulativeVariance[efa.factorAnalysis.cumulativeVariance.length - 1].toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 mt-1">Variance Explained</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600">
              {efa.factorAnalysis.eigenvalues[0].toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 mt-1">First Eigenvalue</div>
          </div>
        </div>

        <ScreePlot factorAnalysis={efa.factorAnalysis} />
      </div>

      <div className="card mb-6">
        <h3 className="text-xl font-bold mb-4">Variance Explained by Each Factor</h3>
        <div className="space-y-3">
          {efa.factorAnalysis.varianceExplained.map((variance, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">{efa.factorAnalysis.factorNames[idx]}</span>
                <span className="text-sm text-gray-600">
                  {variance.toFixed(1)}% • Cumulative: {efa.factorAnalysis.cumulativeVariance[idx].toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${variance}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-4">Factor Loadings</h3>
        <p className="text-sm text-gray-600 mb-4">
          Factor loadings show how strongly each variable is associated with each factor. 
          Higher absolute values indicate stronger relationships.
        </p>
        <FactorLoadingsTable factorAnalysis={efa.factorAnalysis} />
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold mb-2">Interpretation Guide</h4>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {efa.factorAnalysis.interpretation}
          </p>
        </div>
      </div>
    </section>
  )
}

