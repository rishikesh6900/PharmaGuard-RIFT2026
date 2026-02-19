import { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { FileUpload } from '@/components/FileUpload';
import { DrugSelect } from '@/components/DrugSelect';
import { RiskCard } from '@/components/RiskCard';
import { ProfileCard } from '@/components/ProfileCard';
import { ExplanationCard } from '@/components/ExplanationCard';
import { JsonViewer } from '@/components/JsonViewer';

interface AnalysisResult {
  patient_id: string;
  drug: string;
  timestamp: string;
  risk_assessment: {
    risk_label: 'Safe' | 'Adjust Dosage' | 'Toxic' | 'Ineffective' | 'Unknown';
    confidence_score: number;
    severity: 'none' | 'low' | 'moderate' | 'high' | 'critical';
  };
  pharmacogenomic_profile: {
    primary_gene: string;
    diplotype: string;
    phenotype: string;
    detected_variants: Array<{ rsid: string }>;
  };
  clinical_recommendation: {
    recommendation: string;
    guideline_source: string;
  };
  llm_generated_explanation: {
    summary: string;
    biological_mechanism: string;
    clinical_rationale: string;
    dosing_guidance: string;
    variant_citations: string[];
  };
  quality_metrics: {
    vcf_parsing_success: boolean;
  };
}

export default function Index() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedDrug, setSelectedDrug] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!file || !selectedDrug) {
      setError('Please upload a VCF file and select a drug');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('drug', selectedDrug);

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
      setFile(null);
      setSelectedDrug('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze VCF file';
      setError(errorMessage);
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setResult(null);
    setError('');
    setFile(null);
    setSelectedDrug('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="pharma-container py-6">
          <h1 className="text-3xl font-bold text-primary">PharmaGuard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            AI-Powered Precision Medicine
          </p>
        </div>
      </header>

      <main className="pharma-container py-12">
        {!result ? (
          <div className="max-w-2xl mx-auto">
            {/* Hero Section */}
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Pharmacogenomic Risk Prediction
              </h2>
              <p className="text-lg text-muted-foreground mb-2">
                Analyze genomic data to predict drug response and optimize treatment
              </p>
              <p className="text-sm text-muted-foreground">
                Upload your VCF file and select a drug for personalized insights
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">Analysis Failed</h4>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            )}

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="pharma-card p-8">
                <FileUpload file={file} setFile={setFile} />
              </div>

              <div className="pharma-card p-8">
                <DrugSelect selectedDrug={selectedDrug} setSelectedDrug={setSelectedDrug} />
              </div>

              <button
                type="submit"
                disabled={loading || !file || !selectedDrug}
                className="w-full pharma-button-primary flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze VCF & Predict Risk'
                )}
              </button>
            </form>

            <div className="mt-12 text-center text-sm text-muted-foreground space-y-2">
              <p>RIFT 2026 Hackathon Submission</p>
              <p>CPIC-Aligned Deterministic Risk Engine</p>
            </div>
          </div>
        ) : (
          <div>
            {/* Results Header */}
            <div className="mb-8">
              <button
                onClick={handleNewAnalysis}
                className="text-primary hover:underline font-medium mb-4"
              >
                ← New Analysis
              </button>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Analysis Results
              </h2>
              <p className="text-muted-foreground">
                Patient ID: <span className="font-mono font-semibold">{result.patient_id}</span>
              </p>
              <p className="text-muted-foreground text-sm">
                Analysis completed at {new Date(result.timestamp).toLocaleString()}
              </p>
            </div>

            {/* Results Grid */}
            <div className="space-y-6 mb-8">
              {/* Risk Assessment Card */}
              <RiskCard
                riskAssessment={result.risk_assessment}
                drug={result.drug}
              />

              {/* Pharmacogenomic Profile Card */}
              <ProfileCard profile={result.pharmacogenomic_profile} />

              {/* Clinical Recommendation Card */}
              <div className="pharma-card p-6 md:p-8">
                <h3 className="text-lg font-semibold mb-4 text-foreground">
                  Clinical Recommendation
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Guideline Source
                    </label>
                    <p className="font-semibold text-foreground">
                      {result.clinical_recommendation.guideline_source}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Recommendation
                    </label>
                    <p className="text-foreground leading-relaxed">
                      {result.clinical_recommendation.recommendation}
                    </p>
                  </div>
                </div>
              </div>

              {/* LLM Explanation Card */}
              <ExplanationCard explanation={result.llm_generated_explanation} />

              {/* JSON Viewer */}
              <JsonViewer data={result} />

              {/* Footer */}
              <div className="text-center text-sm text-muted-foreground space-y-2 py-8 border-t border-border mt-8">
                <p>RIFT 2026 Hackathon Submission</p>
                <p>CPIC-Aligned Deterministic Risk Engine</p>
              </div>
            </div>

            {/* New Analysis Button */}
            <div className="flex justify-center gap-4 sticky bottom-6">
              <button
                onClick={handleNewAnalysis}
                className="pharma-button-primary"
              >
                Perform New Analysis
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
