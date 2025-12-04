import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import FileUpload from './components/FileUpload'
import AnalysisResults from './components/AnalysisResults'
import { AnalysisData } from './types'
import { analyzeData } from './utils/analysis'

function App() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [currentStep, setCurrentStep] = useState<'upload' | 'analyzing' | 'results'>('upload')

  const handleFileUpload = async (file: File) => {
    setCurrentStep('analyzing')
    
    try {
      const data = await analyzeData(file)
      setAnalysisData(data)
      setCurrentStep('results')
    } catch (error) {
      console.error('Analysis error:', error)
      alert('Error analyzing data. Please check your file format and try again.')
      setCurrentStep('upload')
    }
  }

  const handleReset = () => {
    setAnalysisData(null)
    setCurrentStep('upload')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      {currentStep === 'upload' && (
        <>
          <Hero />
          <FileUpload onFileUpload={handleFileUpload} />
        </>
      )}
      
      {currentStep === 'analyzing' && (
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-primary mb-2">Analyzing Your Data</h2>
            <p className="text-gray-600">Our AI agents are exploring your dataset and generating insights...</p>
          </div>
        </div>
      )}
      
      {currentStep === 'results' && analysisData && (
        <AnalysisResults data={analysisData} onReset={handleReset} />
      )}
    </div>
  )
}

export default App

