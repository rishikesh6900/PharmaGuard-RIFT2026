import { useState } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';

interface LLMExplanation {
  summary: string;
  biological_mechanism: string;
  clinical_rationale: string;
  dosing_guidance: string;
  variant_citations: string[];
}

interface ExplanationCardProps {
  explanation: LLMExplanation;
}

export const ExplanationCard = ({ explanation }: ExplanationCardProps) => {
  const [openIndex, setOpenIndex] = useState(0);

  const sections = [
    {
      title: 'Summary',
      content: explanation.summary,
    },
    {
      title: 'Biological Mechanism',
      content: explanation.biological_mechanism,
    },
    {
      title: 'Clinical Rationale',
      content: explanation.clinical_rationale,
    },
    {
      title: 'Dosing Guidance',
      content: explanation.dosing_guidance,
    },
  ];

  return (
    <div className="pharma-card p-6 md:p-8">
      <div className="flex items-start gap-4 mb-6">
        <BookOpen className="w-8 h-8 text-primary flex-shrink-0" />
        <h3 className="text-lg font-semibold text-foreground">
          Clinical Explanation
        </h3>
      </div>

      <div className="space-y-2">
        {sections.map((section, idx) => (
          <div key={idx} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-muted/50 transition-colors"
            >
              <span className="font-medium text-foreground">{section.title}</span>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition-transform ${
                  openIndex === idx ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === idx && (
              <div className="px-4 py-4 bg-muted/30 border-t border-border text-foreground text-sm leading-relaxed">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {explanation.variant_citations.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <label className="block text-sm font-medium text-muted-foreground mb-3">
            Variant Citations
          </label>
          <div className="space-y-2">
            {explanation.variant_citations.map((citation, idx) => (
              <div
                key={idx}
                className="text-sm text-foreground bg-muted/30 px-3 py-2 rounded"
              >
                {citation}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
