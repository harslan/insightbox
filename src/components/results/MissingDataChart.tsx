import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface MissingDataChartProps {
  missingData: Array<{ column: string; count: number; percent: number }>
}

export default function MissingDataChart({ missingData }: MissingDataChartProps) {
  const data = missingData
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 10)
    .map(item => ({
      column: item.column.length > 20 ? item.column.substring(0, 20) + '...' : item.column,
      percent: item.percent,
      count: item.count,
    }))

  const getColor = (percent: number) => {
    if (percent > 50) return '#ef4444'
    if (percent > 20) return '#f97316'
    return '#fbbf24'
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="column" angle={-45} textAnchor="end" height={100} />
        <YAxis label={{ value: 'Missing %', angle: -90, position: 'insideLeft' }} />
        <Tooltip
          formatter={(value: number, _name: string, props: any) => [
            `${value.toFixed(1)}% (${props.payload.count} values)`,
            'Missing Data'
          ]}
        />
        <Bar dataKey="percent" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.percent)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

