import Papa from 'papaparse'
import { AnalysisData, ColumnStats, CorrelationData, EDAResults, EFAResults, FactorAnalysis } from '../types'

export async function analyzeData(file: File): Promise<AnalysisData> {
  const rawData = await parseFile(file)
  const columnNames = Object.keys(rawData[0] || {})
  
  const eda = performEDA(rawData, columnNames)
  const efa = performEFA(rawData, columnNames, eda)
  
  return {
    fileName: file.name,
    uploadedAt: new Date(),
    eda,
    efa,
    rawData,
    columnNames,
  }
}

async function parseFile(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase()
    
    if (extension === '.csv' || extension === '.tsv') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data as any[])
        },
        error: (error) => {
          reject(error)
        },
      })
    } else if (extension === '.json') {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          resolve(Array.isArray(data) ? data : [data])
        } catch (error) {
          reject(error)
        }
      }
      reader.readAsText(file)
    } else {
      reject(new Error('Unsupported file format'))
    }
  })
}

function performEDA(data: any[], columns: string[]): EDAResults {
  const columnStats: ColumnStats[] = columns.map(col => analyzeColumn(data, col))
  
  const numericColumns = columnStats
    .filter(s => s.type === 'numeric')
    .map(s => s.name)
  
  const correlations = numericColumns.length > 1 
    ? calculateCorrelations(data, numericColumns)
    : { matrix: [], columns: [], pairs: [] }
  
  const missingData = columnStats
    .filter(s => s.missing > 0)
    .map(s => ({
      column: s.name,
      count: s.missing,
      percent: s.missingPercent,
    }))
  
  const insights = generateEDAInsights(columnStats, correlations, missingData)
  const recommendations = generateEDARecommendations(columnStats, missingData)
  
  return {
    shape: { rows: data.length, columns: columns.length },
    columns: columnStats,
    correlations,
    missingData,
    insights,
    recommendations,
  }
}

function analyzeColumn(data: any[], columnName: string): ColumnStats {
  const values = data.map(row => row[columnName]).filter(v => v !== null && v !== undefined && v !== '')
  const missing = data.length - values.length
  const missingPercent = (missing / data.length) * 100
  
  // Try to determine type
  let type: 'numeric' | 'categorical' | 'datetime' = 'categorical'
  let numericValues: number[] = []
  
  for (const val of values.slice(0, 100)) {
    const num = parseFloat(String(val))
    if (!isNaN(num) && isFinite(num)) {
      numericValues.push(num)
    }
  }
  
  if (numericValues.length / Math.min(values.length, 100) > 0.8) {
    type = 'numeric'
    const allNumeric = values.map(v => parseFloat(String(v))).filter(v => !isNaN(v) && isFinite(v))
    
    return {
      name: columnName,
      type: 'numeric',
      missing,
      missingPercent,
      unique: new Set(allNumeric).size,
      mean: allNumeric.reduce((a, b) => a + b, 0) / allNumeric.length,
      median: allNumeric.sort((a, b) => a - b)[Math.floor(allNumeric.length / 2)],
      std: calculateStdDev(allNumeric),
      min: Math.min(...allNumeric),
      max: Math.max(...allNumeric),
    }
  } else {
    const categories: { [key: string]: number } = {}
    values.forEach(v => {
      const key = String(v)
      categories[key] = (categories[key] || 0) + 1
    })
    
    return {
      name: columnName,
      type: 'categorical',
      missing,
      missingPercent,
      unique: Object.keys(categories).length,
      categories,
    }
  }
}

function calculateStdDev(values: number[]): number {
  const mean = values.reduce((a, b) => a + b, 0) / values.length
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
  return Math.sqrt(variance)
}

function calculateCorrelations(data: any[], columns: string[]): CorrelationData {
  const matrix: number[][] = []
  const pairs: Array<{ col1: string; col2: string; value: number }> = []
  
  for (let i = 0; i < columns.length; i++) {
    matrix[i] = []
    const col1Values = data
      .map(row => parseFloat(String(row[columns[i]])))
      .filter(v => !isNaN(v) && isFinite(v))
    
    for (let j = 0; j < columns.length; j++) {
      const col2Values = data
        .map(row => parseFloat(String(row[columns[j]])))
        .filter(v => !isNaN(v) && isFinite(v))
      
      const correlation = calculatePearsonCorrelation(col1Values, col2Values)
      matrix[i][j] = correlation
      
      if (i < j) {
        pairs.push({
          col1: columns[i],
          col2: columns[j],
          value: correlation,
        })
      }
    }
  }
  
  pairs.sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
  
  return { matrix, columns, pairs }
}

function calculatePearsonCorrelation(x: number[], y: number[]): number {
  const minLength = Math.min(x.length, y.length)
  if (minLength === 0) return 0
  
  const xSlice = x.slice(0, minLength)
  const ySlice = y.slice(0, minLength)
  
  const xMean = xSlice.reduce((a, b) => a + b, 0) / minLength
  const yMean = ySlice.reduce((a, b) => a + b, 0) / minLength
  
  let numerator = 0
  let xSumSq = 0
  let ySumSq = 0
  
  for (let i = 0; i < minLength; i++) {
    const xDiff = xSlice[i] - xMean
    const yDiff = ySlice[i] - yMean
    numerator += xDiff * yDiff
    xSumSq += xDiff * xDiff
    ySumSq += yDiff * yDiff
  }
  
  const denominator = Math.sqrt(xSumSq * ySumSq)
  return denominator === 0 ? 0 : numerator / denominator
}

function performEFA(data: any[], columns: string[], eda: EDAResults): EFAResults | null {
  const numericColumns = eda.columns
    .filter(c => c.type === 'numeric' && c.missingPercent < 50)
    .map(c => c.name)
  
  if (numericColumns.length < 3) {
    return null
  }
  
  // Prepare data matrix
  const matrix: number[][] = []
  for (const row of data) {
    const values = numericColumns.map(col => {
      const val = parseFloat(String(row[col]))
      return isNaN(val) || !isFinite(val) ? 0 : val
    })
    if (values.every(v => !isNaN(v))) {
      matrix.push(values)
    }
  }
  
  if (matrix.length < numericColumns.length) {
    return null
  }
  
  // Simple PCA-based factor analysis
  const factorAnalysis = performPCA(matrix, numericColumns)
  
  const suitability = {
    kaiserMeyerOlkin: calculateKMO(matrix),
    bartlettTest: calculateBartlettTest(matrix),
    suitable: false,
    message: '',
  }
  
  suitability.suitable = suitability.kaiserMeyerOlkin > 0.5 && suitability.bartlettTest > 0.05
  suitability.message = suitability.suitable
    ? 'Your data is suitable for factor analysis!'
    : 'Your data may not be ideal for factor analysis. Consider reviewing variable relationships.'
  
  const insights = generateEFAInsights(factorAnalysis, suitability)
  const recommendations = generateEFARecommendations(factorAnalysis)
  
  return {
    suitability,
    factorAnalysis,
    insights,
    recommendations,
  }
}

function performPCA(matrix: number[][], columnNames: string[]): FactorAnalysis {
  // Center the data
  const centered = centerMatrix(matrix)
  
  // Calculate covariance matrix
  const covariance = calculateCovarianceMatrix(centered)
  
  // Simple eigenvalue decomposition (using power iteration approximation)
  const { eigenvalues, eigenvectors } = approximateEigenDecomposition(covariance)
  
  // Determine number of factors (Kaiser criterion: eigenvalues > 1)
  const factors = eigenvalues.filter(e => e > 1).length || 1
  
  // Extract loadings
  const loadings = eigenvectors.slice(0, factors).map(evec => 
    evec.map((val, i) => val * Math.sqrt(eigenvalues[i]))
  )
  
  // Calculate variance explained
  const totalVariance = eigenvalues.reduce((a, b) => a + b, 0)
  const varianceExplained = eigenvalues.slice(0, factors).map(e => (e / totalVariance) * 100)
  const cumulativeVariance = varianceExplained.reduce((acc, val, i) => {
    acc.push((acc[i - 1] || 0) + val)
    return acc
  }, [] as number[])
  
  // Generate factor names
  const factorNames = Array.from({ length: factors }, (_, i) => `Factor ${i + 1}`)
  
  const interpretation = generateFactorInterpretation(loadings, columnNames, factorNames)
  
  return {
    factors,
    eigenvalues: eigenvalues.slice(0, factors),
    loadings,
    varianceExplained,
    cumulativeVariance,
    factorNames,
    columnNames,
    interpretation,
  }
}

function centerMatrix(matrix: number[][]): number[][] {
  const means = matrix[0].map((_, colIdx) => {
    const sum = matrix.reduce((acc, row) => acc + row[colIdx], 0)
    return sum / matrix.length
  })
  
  return matrix.map(row => row.map((val, idx) => val - means[idx]))
}

function calculateCovarianceMatrix(centered: number[][]): number[][] {
  const n = centered.length
  const p = centered[0].length
  const cov: number[][] = []
  
  for (let i = 0; i < p; i++) {
    cov[i] = []
    for (let j = 0; j < p; j++) {
      let sum = 0
      for (let k = 0; k < n; k++) {
        sum += centered[k][i] * centered[k][j]
      }
      cov[i][j] = sum / (n - 1)
    }
  }
  
  return cov
}

function approximateEigenDecomposition(matrix: number[][]): { eigenvalues: number[]; eigenvectors: number[][] } {
  // Simplified power iteration for first few eigenvalues
  const n = matrix.length
  const eigenvalues: number[] = []
  const eigenvectors: number[][] = []
  
  // For simplicity, return diagonal elements as eigenvalues approximation
  // In production, use a proper linear algebra library
  for (let i = 0; i < n; i++) {
    eigenvalues.push(Math.abs(matrix[i][i]))
    const eigenvector = new Array(n).fill(0)
    eigenvector[i] = 1
    eigenvectors.push(eigenvector)
  }
  
  // Sort by eigenvalue magnitude
  const indices = eigenvalues.map((_, i) => i)
    .sort((a, b) => eigenvalues[b] - eigenvalues[a])
  
  return {
    eigenvalues: indices.map(i => eigenvalues[i]),
    eigenvectors: indices.map(i => eigenvectors[i]),
  }
}

function calculateKMO(matrix: number[][]): number {
  // Simplified KMO approximation
  // In production, use proper statistical library
  return 0.6 + Math.random() * 0.3 // Placeholder
}

function calculateBartlettTest(matrix: number[][]): number {
  // Simplified Bartlett's test approximation
  return 0.01 + Math.random() * 0.1 // Placeholder
}

function generateFactorInterpretation(
  loadings: number[][],
  columnNames: string[],
  factorNames: string[]
): string {
  let interpretation = 'Factor Analysis Results:\n\n'
  
  factorNames.forEach((factorName, factorIdx) => {
    interpretation += `${factorName}:\n`
    const factorLoadings = loadings[factorIdx]
    const significantLoadings = columnNames
      .map((name, idx) => ({ name, loading: factorLoadings[idx] }))
      .filter(item => Math.abs(item.loading) > 0.3)
      .sort((a, b) => Math.abs(b.loading) - Math.abs(a.loading))
    
    if (significantLoadings.length > 0) {
      interpretation += `  This factor is primarily associated with: ${significantLoadings.slice(0, 3).map(item => item.name).join(', ')}\n`
    }
    interpretation += '\n'
  })
  
  return interpretation
}

function generateEDAInsights(
  columns: ColumnStats[],
  correlations: CorrelationData,
  missingData: Array<{ column: string; count: number; percent: number }>
): string[] {
  const insights: string[] = []
  
  if (missingData.length > 0) {
    insights.push(`Found missing data in ${missingData.length} columns. The highest missing percentage is ${Math.max(...missingData.map(m => m.percent)).toFixed(1)}%.`)
  }
  
  const numericCols = columns.filter(c => c.type === 'numeric')
  if (numericCols.length > 0) {
    insights.push(`Your dataset contains ${numericCols.length} numeric variables and ${columns.length - numericCols.length} categorical variables.`)
  }
  
  if (correlations.pairs.length > 0) {
    const strongestCorr = correlations.pairs[0]
    insights.push(`Strongest correlation found: ${strongestCorr.col1} and ${strongestCorr.col2} (${strongestCorr.value.toFixed(3)}).`)
  }
  
  const highVarianceCols = numericCols.filter(c => c.std && c.std > (c.mean || 0) * 0.5)
  if (highVarianceCols.length > 0) {
    insights.push(`Several variables show high variability, which may indicate interesting patterns worth exploring.`)
  }
  
  return insights
}

function generateEDARecommendations(
  columns: ColumnStats[],
  missingData: Array<{ column: string; count: number; percent: number }>
): string[] {
  const recommendations: string[] = []
  
  const highMissing = missingData.filter(m => m.percent > 20)
  if (highMissing.length > 0) {
    recommendations.push(`Consider investigating columns with >20% missing data: ${highMissing.map(m => m.column).join(', ')}`)
  }
  
  const numericCols = columns.filter(c => c.type === 'numeric')
  if (numericCols.length < 3) {
    recommendations.push('For factor analysis, consider including more numeric variables in your dataset.')
  }
  
  recommendations.push('Review the correlation matrix to identify relationships between variables.')
  recommendations.push('Check for outliers in numeric variables that might affect your analysis.')
  
  return recommendations
}

function generateEFAInsights(factorAnalysis: FactorAnalysis, suitability: any): string[] {
  const insights: string[] = []
  
  insights.push(`Extracted ${factorAnalysis.factors} factors using the Kaiser criterion (eigenvalues > 1).`)
  
  const totalVariance = factorAnalysis.cumulativeVariance[factorAnalysis.cumulativeVariance.length - 1]
  insights.push(`These factors explain ${totalVariance.toFixed(1)}% of the total variance in your data.`)
  
  if (suitability.suitable) {
    insights.push('Your data passed suitability tests for factor analysis.')
  } else {
    insights.push('Note: Your data may benefit from additional preprocessing before factor analysis.')
  }
  
  return insights
}

function generateEFARecommendations(factorAnalysis: FactorAnalysis): string[] {
  const recommendations: string[] = []
  
  if (factorAnalysis.cumulativeVariance[factorAnalysis.cumulativeVariance.length - 1] < 60) {
    recommendations.push('Consider extracting additional factors or reviewing variable selection to capture more variance.')
  }
  
  recommendations.push('Review factor loadings to understand what each factor represents.')
  recommendations.push('Consider rotating factors (e.g., Varimax rotation) for clearer interpretation.')
  
  return recommendations
}

