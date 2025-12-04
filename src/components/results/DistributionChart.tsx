import { ColumnStats } from '../../types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DistributionChartProps {
  column: ColumnStats
}

export default function DistributionChart({ column }: DistributionChartProps) {
  if (column.type === 'categorical' && column.categories) {
    const data = Object.entries(column.categories)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({
        name: name.length > 15 ? name.substring(0, 15) + '...' : name,
        count,
      }))

    return (
      <div>
        <h4 className="font-semibold mb-2 text-sm">{column.name}</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={10} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#0066CC" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  // For numeric, show a simple summary
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="font-semibold mb-3 text-sm">{column.name}</h4>
      <div className="space-y-2 text-xs">
        {column.mean !== undefined && (
          <div className="flex justify-between">
            <span className="text-gray-600">Mean:</span>
            <span className="font-semibold">{column.mean.toFixed(2)}</span>
          </div>
        )}
        {column.median !== undefined && (
          <div className="flex justify-between">
            <span className="text-gray-600">Median:</span>
            <span className="font-semibold">{column.median.toFixed(2)}</span>
          </div>
        )}
        {column.std !== undefined && (
          <div className="flex justify-between">
            <span className="text-gray-600">Std Dev:</span>
            <span className="font-semibold">{column.std.toFixed(2)}</span>
          </div>
        )}
        {column.min !== undefined && column.max !== undefined && (
          <div className="flex justify-between">
            <span className="text-gray-600">Range:</span>
            <span className="font-semibold">
              {column.min.toFixed(2)} - {column.max.toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

