from fastapi import APIRouter, UploadFile, File, Form
from app.core.vcf_parser import parse_vcf
from app.core.phenotype_engine import resolve_phenotype
from app.core.cpic_rules import assess_risk,DRUG_GENE_MAP
from app.core.gemini_explainer import generate_explanation
from datetime import datetime


router = APIRouter()




@router.post("/analyze")
async def analyze_vcf(
    file: UploadFile = File(...),
    drug: str = Form(...)
):
    content = await file.read()
    decoded_content = content.decode("utf-8")

    # Step 1: Parse
    variants = parse_vcf(decoded_content)

    # Step 2: Phenotype
    phenotype_results = resolve_phenotype(variants)

    # Step 3: Risk
    risk = assess_risk(drug, phenotype_results)

    primary_gene = DRUG_GENE_MAP.get(drug.upper())

    diplotype = None
    phenotype = None

    for result in phenotype_results:
        if result["gene"] == primary_gene:
            diplotype = result["diplotype"]
            phenotype = result["phenotype"]
            break

    explanation = generate_explanation(
        drug,
        primary_gene,
        diplotype,
        phenotype,
        risk["risk_label"],
        variants
    )

    # Build detected variants list
    detected_variants = [
        {"rsid": v["rsid"]}
        for v in variants
        if v["gene"] == primary_gene
    ]

    # Build clinical recommendation
    clinical_recommendation = {
        "recommendation": risk["risk_label"],
        "guideline_source": "CPIC"
    }

    final_response = {
        "patient_id": "PATIENT_001",
        "drug": drug,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "risk_assessment": risk,
        "pharmacogenomic_profile": {
            "primary_gene": primary_gene,
            "diplotype": diplotype,
            "phenotype": phenotype,
            "detected_variants": detected_variants
        },
        "clinical_recommendation": clinical_recommendation,
        "llm_generated_explanation": explanation,
        "quality_metrics": {
            "vcf_parsing_success": True
        }
    }

    return final_response
