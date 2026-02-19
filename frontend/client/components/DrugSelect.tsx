interface DrugSelectProps {
  selectedDrug: string;
  setSelectedDrug: (drug: string) => void;
}

const DRUGS = ['CODEINE', 'WARFARIN', 'CLOPIDOGREL', 'SIMVASTATIN', 'AZATHIOPRINE', 'FLUOROURACIL'];

export const DrugSelect = ({ selectedDrug, setSelectedDrug }: DrugSelectProps) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold mb-3 text-foreground">
        Select Drug <span className="text-destructive">*</span>
      </label>
      <select
        value={selectedDrug}
        onChange={(e) => setSelectedDrug(e.target.value)}
        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
      >
        <option value="">Choose a drug...</option>
        {DRUGS.map((drug) => (
          <option key={drug} value={drug}>
            {drug}
          </option>
        ))}
      </select>
    </div>
  );
};
