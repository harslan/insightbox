# InsightBox - The Cursor of EDA/EFA

> Democratizing data insights for everyone — from 7 to 70, A to Z

InsightBox is a lightweight web application that automatically generates comprehensive Exploratory Data Analysis (EDA) and Exploratory Factor Analysis (EFA) reports from any uploaded dataset. Built with modern web technologies and AI-powered guidance, it makes advanced analytics accessible to users of all backgrounds.

## 🌟 Features

- **📊 Automatic EDA**: Complete exploratory data analysis with visualizations
- **🔍 Factor Analysis**: Exploratory Factor Analysis (EFA) with suitability testing
- **🤖 AI Guidance**: Plain-language explanations and recommendations
- **📈 Interactive Visualizations**: Beautiful charts and graphs using Recharts
- **📄 Report Generation**: Download comprehensive PDF reports
- **🎨 Modern UI**: Beautiful, accessible interface inspired by professional design
- **🔒 Privacy-First**: All processing happens in your browser

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/insightbox.git
cd insightbox

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment

### Option 1: Deploy to Vercel (Recommended - Free & Easy)

1. **Sign up for Vercel**: Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. **Import your repository**: Click "New Project" and import `harslan/insightbox`
3. **Configure settings**:
   - Framework Preset: Vite
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
4. **Deploy**: Click "Deploy" - Vercel will automatically deploy your app
5. **Your app will be live** at: `https://insightbox.vercel.app` (or your custom domain)

**Benefits of Vercel:**
- ✅ Free tier with generous limits
- ✅ Automatic deployments on every push
- ✅ Preview deployments for pull requests
- ✅ Global CDN for fast loading
- ✅ Automatic HTTPS/SSL
- ✅ No configuration needed - it auto-detects Vite!

### Option 2: Deploy to GitHub Pages

This project is also configured for GitHub Pages deployment:

1. **Update the repository name** in `vite.config.ts` if your repo name differs from `insightbox`
2. **Push to GitHub**: The GitHub Actions workflow will automatically deploy on push to `main`
3. **Enable GitHub Pages**: Go to Settings → Pages and select "GitHub Actions" as the source
4. **Approve the environment**: Approve the `github-pages` environment when prompted

The app will be available at `https://yourusername.github.io/insightbox/`

## 🎯 Usage

1. **Upload Dataset**: Drag and drop or browse for CSV, Excel, TSV, or JSON files
2. **Automatic Analysis**: The app analyzes your data and generates insights
3. **Explore Results**: Review EDA findings, correlations, missing data patterns
4. **Factor Analysis**: If applicable, explore underlying factors in your data
5. **Download Report**: Generate and download a comprehensive PDF report

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Recharts** - Data visualizations
- **PapaParse** - CSV parsing
- **Framer Motion** - Animations
- **jsPDF & html2canvas** - PDF generation
- **Lucide React** - Icons

## 📊 Supported File Formats

- CSV (`.csv`)
- Excel (`.xlsx`, `.xls`)
- TSV (`.tsv`)
- JSON (`.json`)

## 🎨 Design Philosophy

InsightBox follows the "Cursor of EDA/EFA" philosophy:

- **Accessibility First**: Designed for users from 7 to 70 years old
- **AI Guidance**: Every analysis includes plain-language explanations
- **Consistent Results**: Thorough analysis from A to Z
- **Professional Quality**: Production-ready visualizations and reports

## 📝 Project Structure

```
insightbox/
├── src/
│   ├── components/
│   │   ├── results/        # Result display components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── FileUpload.tsx
│   │   └── AnalysisResults.tsx
│   ├── utils/
│   │   ├── analysis.ts     # EDA/EFA analysis engine
│   │   └── reportGenerator.ts
│   ├── types.ts            # TypeScript type definitions
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
├── vite.config.ts
└── README.md
```

## 🔬 Analysis Capabilities

### Exploratory Data Analysis (EDA)
- Data shape and structure analysis
- Column statistics (mean, median, std dev, min, max)
- Missing data detection and visualization
- Correlation analysis with heatmaps
- Distribution analysis for numeric and categorical variables
- Automatic insights and recommendations

### Exploratory Factor Analysis (EFA)
- Kaiser-Meyer-Olkin (KMO) suitability test
- Bartlett's test of sphericity
- Principal Component Analysis (PCA) based factor extraction
- Scree plot visualization
- Factor loadings table
- Variance explained analysis
- Plain-language factor interpretation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by the need to democratize data analytics
- Built for MSBA students and data enthusiasts
- Designed with accessibility and usability in mind

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for everyone who wants to understand their data better**

