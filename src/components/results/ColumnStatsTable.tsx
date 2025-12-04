import { ColumnStats } from '../../types'

interface ColumnStatsTableProps {
  columns: ColumnStats[]
}

export default function ColumnStatsTable({ columns }: ColumnStatsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Column</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Type</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Missing</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Unique</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Mean</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Median</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Std Dev</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Min</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Max</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {columns.map((col, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">{col.name}</td>
              <td className="px-4 py-3 text-sm">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  col.type === 'numeric' ? 'bg-blue-100 text-blue-800' :
                  col.type === 'categorical' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {col.type}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {col.missing} ({col.missingPercent.toFixed(1)}%)
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{col.unique || '-'}</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {col.mean !== undefined ? col.mean.toFixed(2) : '-'}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {col.median !== undefined ? col.median.toFixed(2) : '-'}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {col.std !== undefined ? col.std.toFixed(2) : '-'}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {col.min !== undefined ? col.min.toFixed(2) : '-'}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {col.max !== undefined ? col.max.toFixed(2) : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

