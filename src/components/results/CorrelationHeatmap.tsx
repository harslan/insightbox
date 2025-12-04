import { CorrelationData } from '../../types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface CorrelationHeatmapProps {
  correlations: CorrelationData
}

export default function CorrelationHeatmap({ correlations }: CorrelationHeatmapProps) {
  // Prepare data for top correlations bar chart
  const topCorrelations = correlations.pairs
    .slice(0, 15)
    .map(pair => ({
      name: `${pair.col1} ↔ ${pair.col2}`,
      value: pair.value,
      absValue: Math.abs(pair.value),
    }))
    .sort((a, b) => b.absValue - a.absValue)

  const getColor = (value: number) => {
    const abs = Math.abs(value)
    if (abs > 0.7) return value > 0 ? '#ef4444' : '#3b82f6'
    if (abs > 0.5) return value > 0 ? '#f97316' : '#60a5fa'
    return value > 0 ? '#fbbf24' : '#93c5fd'
  }

  return (
    <div>
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={topCorrelations} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[-1, 1]} />
            <YAxis dataKey="name" type="category" width={200} />
            <Tooltip
              formatter={(value: number) => value.toFixed(3)}
              labelStyle={{ color: '#333' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {topCorrelations.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.value)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 mr-2"></div>
          <span>Strong Positive (&gt;0.7)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-500 mr-2"></div>
          <span>Moderate Positive (0.5-0.7)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 mr-2"></div>
          <span>Strong Negative (&lt;-0.7)</span>
        </div>
      </div>
    </div>
  )
}

