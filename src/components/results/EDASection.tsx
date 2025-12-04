import { BarChart3, Database, AlertTriangle } from 'lucide-react'
import { EDAResults } from '../../types'
import ColumnStatsTable from './ColumnStatsTable'
import CorrelationHeatmap from './CorrelationHeatmap'
import MissingDataChart from './MissingDataChart'
import DistributionChart from './DistributionChart'

interface EDASectionProps {
  eda: EDAResults
}

export default function EDASection({ eda }: EDASectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center mb-6">
        <BarChart3 className="w-8 h-8 text-accent mr-3" />
        <h2 className="text-3xl font-bold text-primary">Exploratory Data Analysis</h2>
      </div>

      <div className="card mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{eda.shape.rows.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Rows</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{eda.shape.columns}</div>
            <div className="text-sm text-gray-600">Total Columns</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {eda.columns.filter(c => c.type === 'numeric').length}
            </div>
            <div className="text-sm text-gray-600">Numeric Variables</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {eda.columns.filter(c => c.type === 'categorical').length}
            </div>
            <div className="text-sm text-gray-600">Categorical Variables</div>
          </div>
        </div>
      </div>

      {eda.missingData.length > 0 && (
        <div className="card mb-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-500 mr-2" />
            <h3 className="text-xl font-bold">Missing Data Overview</h3>
          </div>
          <MissingDataChart missingData={eda.missingData} />
        </div>
      )}

      <div className="card mb-6">
        <div className="flex items-center mb-4">
          <Database className="w-6 h-6 text-accent mr-2" />
          <h3 className="text-xl font-bold">Column Statistics</h3>
        </div>
        <ColumnStatsTable columns={eda.columns} />
      </div>

      {eda.columns.filter(c => c.type === 'numeric').length > 0 && (
        <div className="card mb-6">
          <h3 className="text-xl font-bold mb-4">Variable Distributions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {eda.columns
              .filter(c => c.type === 'numeric')
              .slice(0, 6)
              .map((col, idx) => (
                <DistributionChart key={idx} column={col} />
              ))}
          </div>
        </div>
      )}

      {eda.correlations.pairs.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Correlation Analysis</h3>
          <CorrelationHeatmap correlations={eda.correlations} />
          
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Strongest Correlations</h4>
            <div className="space-y-2">
              {eda.correlations.pairs.slice(0, 10).map((pair, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">
                    <strong>{pair.col1}</strong> ↔ <strong>{pair.col2}</strong>
                  </span>
                  <span className={`font-semibold ${
                    Math.abs(pair.value) > 0.7 ? 'text-red-600' :
                    Math.abs(pair.value) > 0.5 ? 'text-orange-600' :
                    'text-blue-600'
                  }`}>
                    {pair.value.toFixed(3)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

