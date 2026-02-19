DRUG_GENE_MAP = {
    "CODEINE": "CYP2D6",
    "WARFARIN": "CYP2C9",
    "CLOPIDOGREL": "CYP2C19",
    "SIMVASTATIN": "SLCO1B1",
    "AZATHIOPRINE": "TPMT",
    "FLUOROURACIL": "DPYD"
}

CPIC_RISK_RULES = {
    "CODEINE": {
        "PM": ("Ineffective", "high"),
        "IM": ("Adjust Dosage", "moderate"),
        "NM": ("Safe", "none"),
        "URM": ("Toxic", "critical")
    },
    "CLOPIDOGREL": {
        "PM": ("Ineffective", "high"),
        "IM": ("Adjust Dosage", "moderate"),
        "NM": ("Safe", "none")
    },
    "WARFARIN": {
        "PM": ("Adjust Dosage", "high"),
        "IM": ("Adjust Dosage", "moderate"),
        "NM": ("Safe", "none")
    }
}

def assess_risk(drug: str, phenotype_results: list):

    drug = drug.upper()

    if drug not in DRUG_GENE_MAP:
        return {
            "risk_label": "Unknown",
            "confidence_score": 0.0,
            "severity": "none"
        }

    primary_gene = DRUG_GENE_MAP[drug]

    # Find matching phenotype
    phenotype = None
    for result in phenotype_results:
        if result["gene"] == primary_gene:
            phenotype = result["phenotype"]
            break

    if not phenotype:
        return {
            "risk_label": "Unknown",
            "confidence_score": 0.3,
            "severity": "low"
        }

    drug_rules = CPIC_RISK_RULES.get(drug, {})

    if phenotype in drug_rules:
        label, severity = drug_rules[phenotype]
        return {
            "risk_label": label,
            "confidence_score": 0.9,
            "severity": severity
        }

    return {
        "risk_label": "Unknown",
        "confidence_score": 0.5,
        "severity": "low"
    }

