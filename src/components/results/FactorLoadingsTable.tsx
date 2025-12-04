import { FactorAnalysis } from '../../types'

interface FactorLoadingsTableProps {
  factorAnalysis: FactorAnalysis
}

export default function FactorLoadingsTable({ factorAnalysis }: FactorLoadingsTableProps) {
  const columnNames = factorAnalysis.columnNames || 
    Array.from({ length: factorAnalysis.loadings[0]?.length || 0 }, (_, i) => `Variable ${i + 1}`)

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-purple-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Variable</th>
            {factorAnalysis.factorNames.map((name, idx) => (
              <th key={idx} className="px-4 py-3 text-center text-xs font-semibold uppercase">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {columnNames.map((colName, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">{colName}</td>
              {factorAnalysis.loadings.map((factorLoadings, factorIdx) => {
                const loading = factorLoadings[rowIdx]
                const absLoading = Math.abs(loading)
                return (
                  <td key={factorIdx} className="px-4 py-3 text-sm text-center">
                    <span
                      className={`font-semibold ${
                        absLoading > 0.5 ? 'text-purple-700' :
                        absLoading > 0.3 ? 'text-purple-500' :
                        'text-gray-400'
                      }`}
                    >
                      {loading.toFixed(3)}
                    </span>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Loading Interpretation:</strong></p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><span className="text-purple-700 font-semibold">|Loading| &gt; 0.5</span>: Strong association</li>
          <li><span className="text-purple-500 font-semibold">0.3 &lt; |Loading| ≤ 0.5</span>: Moderate association</li>
          <li><span className="text-gray-400 font-semibold">|Loading| ≤ 0.3</span>: Weak association</li>
        </ul>
      </div>
    </div>
  )
}

