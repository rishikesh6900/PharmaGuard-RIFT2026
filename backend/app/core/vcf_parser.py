VALID_GENES = {
    "CYP2D6",
    "CYP2C19",
    "CYP2C9",
    "SLCO1B1",
    "TPMT",
    "DPYD"
}

def parse_vcf(file_content: str):
    variants = []

    lines = file_content.split("\n")

    for line in lines:
        # Skip metadata lines
        if line.startswith("##"):
            continue

        # Skip header line
        if line.startswith("#CHROM"):
            continue

        # Skip empty lines
        if not line.strip():
            continue

        columns = line.split("\t")

        if len(columns) < 8:
            continue  # malformed line

        rsid = columns[2]
        info_field = columns[7]

        gene = None
        star = None

        # Parse INFO field
        info_items = info_field.split(";")
        for item in info_items:
            if item.startswith("GENE="):
                gene = item.split("=")[1]
            if item.startswith("STAR="):
                star = item.split("=")[1]
        
        if gene not in VALID_GENES:
            continue

        variant = {
            "rsid": rsid,
            "gene": gene,
            "star": star
        }

        variants.append(variant)

    return variants

