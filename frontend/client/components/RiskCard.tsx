import { AlertCircle, CheckCircle, AlertTriangle, Ban, HelpCircle } from 'lucide-react';

interface RiskAssessment {
  risk_label: 'Safe' | 'Adjust Dosage' | 'Toxic' | 'Ineffective' | 'Unknown';
  confidence_score: number;
  severity: 'none' | 'low' | 'moderate' | 'high' | 'critical';
}

interface RiskCardProps {
  riskAssessment: RiskAssessment;
  drug: string;
}

export const RiskCard = ({ riskAssessment, drug }: RiskCardProps) => {
  const getRiskStyles = (label: string) => {
    switch (label) {
      case 'Safe':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          badge: 'bg-green-100 text-green-800',
          icon: CheckCircle,
          color: 'text-green-600',
        };
      case 'Adjust Dosage':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          badge: 'bg-yellow-100 text-yellow-800',
          icon: AlertTriangle,
          color: 'text-yellow-600',
        };
      case 'Toxic':
      case 'Ineffective':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          badge: 'bg-red-100 text-red-800',
          icon: Ban,
          color: 'text-red-600',
        };
      case 'Unknown':
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          badge: 'bg-gray-100 text-gray-800',
          icon: HelpCircle,
          color: 'text-gray-600',
        };
    }
  };

  const styles = getRiskStyles(riskAssessment.risk_label);
  const Icon = styles.icon;

  return (
    <div className={`rounded-lg border ${styles.border} ${styles.bg} p-6 md:p-8`}>
      <div className="flex items-start gap-4">
        <Icon className={`w-8 h-8 flex-shrink-0 ${styles.color}`} />
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Risk Assessment</h3>
          <p className="text-sm text-muted-foreground mb-4">
            For {drug}
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Risk Level
              </label>
              <div className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold ${styles.badge}`}>
                {riskAssessment.risk_label}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Confidence Score
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      riskAssessment.confidence_score >= 0.8
                        ? 'bg-green-500'
                        : riskAssessment.confidence_score >= 0.6
                        ? 'bg-yellow-500'
                        : 'bg-orange-500'
                    }`}
                    style={{ width: `${riskAssessment.confidence_score * 100}%` }}
                  />
                </div>
                <span className="font-semibold text-foreground min-w-fit">
                  {(riskAssessment.confidence_score * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Severity
              </label>
              <span className="inline-block text-foreground font-medium capitalize px-3 py-1 rounded bg-muted">
                {riskAssessment.severity}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
