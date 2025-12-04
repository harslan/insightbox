import { FactorAnalysis } from '../../types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

interface ScreePlotProps {
  factorAnalysis: FactorAnalysis
}

export default function ScreePlot({ factorAnalysis }: ScreePlotProps) {
  const data = factorAnalysis.eigenvalues.map((eigenvalue, idx) => ({
    factor: `F${idx + 1}`,
    eigenvalue,
  }))

  return (
    <div>
      <h4 className="font-semibold mb-4">Scree Plot</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="factor" />
          <YAxis label={{ value: 'Eigenvalue', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <ReferenceLine y={1} stroke="#ef4444" strokeDasharray="5 5" label="Kaiser Criterion (1.0)" />
          <Line
            type="monotone"
            dataKey="eigenvalue"
            stroke="#0066CC"
            strokeWidth={2}
            dot={{ fill: '#0066CC', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-sm text-gray-600 mt-2">
        Factors with eigenvalues above 1.0 (red line) are typically retained using the Kaiser criterion.
      </p>
    </div>
  )
}

