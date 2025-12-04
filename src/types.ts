export interface ColumnStats {
  name: string
  type: 'numeric' | 'categorical' | 'datetime'
  missing: number
  missingPercent: number
  unique?: number
  mean?: number
  median?: number
  std?: number
  min?: number
  max?: number
  distribution?: number[]
  categories?: { [key: string]: number }
}

export interface CorrelationData {
  matrix: number[][]
  columns: string[]
  pairs: Array<{
    col1: string
    col2: string
    value: number
  }>
}

export interface FactorAnalysis {
  factors: number
  eigenvalues: number[]
  loadings: number[][]
  varianceExplained: number[]
  cumulativeVariance: number[]
  factorNames: string[]
  columnNames: string[]
  interpretation: string
}

export interface EDAResults {
  shape: { rows: number; columns: number }
  columns: ColumnStats[]
  correlations: CorrelationData
  missingData: Array<{ column: string; count: number; percent: number }>
  insights: string[]
  recommendations: string[]
}

export interface EFAResults {
  suitability: {
    kaiserMeyerOlkin: number
    bartlettTest: number
    suitable: boolean
    message: string
  }
  factorAnalysis: FactorAnalysis
  insights: string[]
  recommendations: string[]
}

export interface AnalysisData {
  fileName: string
  uploadedAt: Date
  eda: EDAResults
  efa: EFAResults | null
  rawData: any[]
  columnNames: string[]
}

