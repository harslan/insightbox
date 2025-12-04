import { useState, useRef } from 'react'
import { Upload, FileSpreadsheet, X, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FileUploadProps {
  onFileUpload: (file: File) => void
}

export default function FileUpload({ onFileUpload }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && isValidFile(droppedFile)) {
      setFile(droppedFile)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && isValidFile(selectedFile)) {
      setFile(selectedFile)
    }
  }

  const isValidFile = (file: File): boolean => {
    const validExtensions = ['.csv', '.xlsx', '.xls', '.tsv', '.json']
    const extension = '.' + file.name.split('.').pop()?.toLowerCase()
    return validExtensions.includes(extension)
  }

  const handleUpload = () => {
    if (file) {
      onFileUpload(file)
    }
  }

  const handleRemove = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="info-box mb-6">
          <h3 className="font-bold text-lg mb-2">📊 Supported File Formats</h3>
          <p className="text-sm text-gray-700">
            Upload CSV, Excel (.xlsx, .xls), TSV, or JSON files. Your data stays private and is processed entirely in your browser.
          </p>
        </div>

        <div
          className={`border-4 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
            isDragging
              ? 'border-accent bg-accent/5 scale-105'
              : 'border-gray-300 hover:border-accent hover:bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">Drag & Drop Your Dataset</h3>
                <p className="text-gray-600 mb-4">or</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-primary"
                >
                  Browse Files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls,.tsv,.json"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </motion.div>
            ) : (
              <motion.div
                key="file-selected"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-center space-x-3">
                  <FileSpreadsheet className="w-12 h-12 text-accent" />
                  <div className="text-left">
                    <p className="font-semibold text-lg">{file.name}</p>
                    <p className="text-sm text-gray-600">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={handleRemove}
                    className="ml-4 p-2 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </button>
                </div>
                <button onClick={handleUpload} className="btn-primary w-full">
                  <CheckCircle className="w-5 h-5 inline mr-2" />
                  Analyze Dataset
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="tip-box mt-6">
          <h4 className="font-semibold mb-2">💡 Tips for Best Results</h4>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>• Ensure your first row contains column headers</li>
            <li>• For EFA, include at least 3-5 related variables</li>
            <li>• Remove any completely empty rows or columns before uploading</li>
            <li>• Larger datasets (10,000+ rows) may take longer to process</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

