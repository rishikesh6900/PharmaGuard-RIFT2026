DIPLOTYPE_MAP = {
    "CYP2D6": {
        "*1/*1": "NM",
        "*1/*4": "IM",
        "*4/*1": "IM",
        "*4/*4": "PM"
    },
    "CYP2C19": {
        "*1/*1": "NM",
        "*1/*2": "IM",
        "*2/*2": "PM"
    },
}
def resolve_phenotype(variants):
    gene_star_map = {}

    # Collect star alleles per gene
    for variant in variants:
        gene = variant["gene"]
        star = variant["star"]

        if not star:
            continue

        if gene not in gene_star_map:
            gene_star_map[gene] = []

        gene_star_map[gene].append(star)

    results = []

    for gene, stars in gene_star_map.items():

        if len(stars) < 2:
            diplotype = f"{stars[0]}/Unknown"
        else:
            diplotype = f"{stars[0]}/{stars[1]}"

        phenotype = DIPLOTYPE_MAP.get(gene, {}).get(diplotype, "Unknown")

        results.append({
            "gene": gene,
            "diplotype": diplotype,
            "phenotype": phenotype
        })

    return results
