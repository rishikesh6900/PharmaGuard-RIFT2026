import os
import json
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")


def generate_explanation(drug, gene, diplotype, phenotype, risk_label, variants):

    rsids = [v["rsid"] for v in variants if v["gene"] == gene]

    prompt = f"""
Return ONLY valid JSON.
Drug: {drug}
Gene: {gene}
Diplotype: {diplotype}
Phenotype: {phenotype}
Risk: {risk_label}
Variants: {rsids}

Format:
{{
  "summary": "",
  "biological_mechanism": "",
  "clinical_rationale": "",
  "dosing_guidance": "",
  "variant_citations": []
}}
"""

    try:
        response = model.generate_content(prompt)


        raw_text = response.text.strip()

        # Robust markdown fence removal
        if raw_text.startswith("```"):
            parts = raw_text.split("```")
            if len(parts) >= 2:
                raw_text = parts[1].strip()

        if raw_text.startswith("json"):
            raw_text = raw_text[4:].strip()

        return json.loads(raw_text)

    except Exception as e:
        print("GEMINI ERROR:", e)
        print("RAW TEXT:", raw_text if 'raw_text' in locals() else "No response")

        return {
            "summary": "Explanation unavailable",
            "biological_mechanism": "Deterministic CPIC-based logic applied.",
            "clinical_rationale": "Based on resolved phenotype.",
            "dosing_guidance": "Refer CPIC guidelines.",
            "variant_citations": rsids
        }
