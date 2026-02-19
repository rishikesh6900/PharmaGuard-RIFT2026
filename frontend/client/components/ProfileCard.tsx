import { Dna } from 'lucide-react';

interface Variant {
  rsid: string;
}

interface PharmacogenomicProfile {
  primary_gene: string;
  diplotype: string;
  phenotype: string;
  detected_variants: Variant[];
}

interface ProfileCardProps {
  profile: PharmacogenomicProfile;
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <div className="pharma-card p-6 md:p-8">
      <div className="flex items-start gap-4 mb-6">
        <Dna className="w-8 h-8 text-primary flex-shrink-0" />
        <h3 className="text-lg font-semibold text-foreground">
          Pharmacogenomic Profile
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Primary Gene
          </label>
          <p className="font-mono text-lg font-semibold text-foreground bg-muted/50 px-3 py-2 rounded">
            {profile.primary_gene}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Diplotype
          </label>
          <p className="font-mono text-lg font-semibold text-foreground bg-muted/50 px-3 py-2 rounded">
            {profile.diplotype}
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Phenotype
          </label>
          <p className="font-mono text-foreground bg-muted/50 px-3 py-2 rounded">
            {profile.phenotype}
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-muted-foreground mb-3">
            Detected Variants
          </label>
          {profile.detected_variants.length > 0 ? (
            <div className="space-y-2">
              {profile.detected_variants.map((variant, idx) => (
                <div
                  key={idx}
                  className="bg-muted/50 px-3 py-2 rounded font-mono text-sm text-foreground"
                >
                  {variant.rsid}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">No variants detected</p>
          )}
        </div>
      </div>
    </div>
  );
};
