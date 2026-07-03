# 🧬 PharmaGuard — AI-Assisted Pharmacogenomic Risk Assessment Platform

> **Explainable AI-powered clinical decision support for pharmacogenomics.**

PharmaGuard is a full-stack clinical decision support prototype that analyzes genomic **VCF (Variant Call Format)** files and predicts **drug-specific pharmacogenomic risks** using deterministic clinical rules enhanced with AI-generated explanations.

Unlike many AI healthcare applications, **the AI model never makes clinical decisions.** All medication risk assessments are produced using deterministic, CPIC-aligned pharmacogenomic rules, while Google Gemini is used solely to generate human-readable explanations.

---

## 🚀 Live Demo

**Frontend:** https://pharmaguard-ui.vercel.app

> **Demo:** A sample VCF file is included in this repository for testing.

---

# 📌 Features

* 🧬 Upload genomic **VCF** files
* ⚕️ Analyze pharmacogenomic variants
* 🧠 CPIC-aligned phenotype prediction
* 💊 Drug-specific deterministic risk assessment
* 📋 Clinical recommendation engine
* 🤖 AI-generated plain-language explanations (Google Gemini)
* 📊 Confidence and severity scoring
* 📁 Download structured JSON reports
* 🌙 Dark / Light mode
* 🐳 Dockerized production deployment

---

# 🏗 System Architecture

```
                    CLIENT (React + Vite)
                           │
                           │ Upload VCF
                           ▼
          Spring Boot Clinical Decision Engine
                           │
 ┌──────────────────────────────────────────────────────┐
 │ 1. VCF Upload                                        │
 │ 2. Variant Parsing                                   │
 │ 3. Actionable Variant Filtering                      │
 │ 4. Diplotype Resolution                              │
 │ 5. Phenotype Mapping (CPIC Rules)                    │
 │ 6. Drug Risk Classification                          │
 │ 7. Clinical Recommendation Engine                    │
 │ 8. Confidence & Severity Scoring                     │
 │ 9. Gemini Explanation Service                        │
 │10. Structured JSON Response                          │
 └──────────────────────────────────────────────────────┘
                           │
                           ▼
                 React Clinical Dashboard
```

---

# 🧠 Decision Pipeline

1. Upload VCF file
2. Parse genomic variants
3. Filter actionable pharmacogenomic variants
4. Resolve diplotypes
5. Predict metabolizer phenotype
6. Perform deterministic drug risk analysis
7. Generate structured clinical recommendations
8. Calculate confidence and severity
9. Generate AI explanation
10. Return structured JSON response

---

# 🏛 Design Principles

* Deterministic clinical logic
* AI used only for explanations
* Explainable variant traceability
* Modular architecture
* Production-ready deployment
* Environment-based configuration
* Strict schema-compliant JSON responses
* Separation of business logic and AI layer

---

# ⚙️ Technology Stack

## Backend

| Technology        | Purpose               |
| ----------------- | --------------------- |
| Java 21           | Runtime               |
| Spring Boot       | REST API              |
| Maven             | Dependency Management |
| Docker            | Containerization      |
| Google Gemini API | AI Explanations       |
| Render            | Deployment            |

---

## Frontend

| Technology      | Purpose               |
| --------------- | --------------------- |
| React 18        | UI Framework          |
| Vite            | Build Tool            |
| React Router v6 | Routing               |
| Axios           | API Communication     |
| Lucide React    | Icons                 |
| OGL             | Aurora Hero Animation |
| Vanilla CSS     | Styling               |
| Vercel          | Deployment            |

---

# 🔬 Clinical Pipeline Modules

| Module                            | Responsibility                          |
| --------------------------------- | --------------------------------------- |
| **VcfParserService**              | Parses uploaded VCF files               |
| **Variant Filter**                | Removes non-actionable variants         |
| **DiplotypeResolver**             | Resolves star allele pairs              |
| **PhenotypeRulesEngine**          | Maps diplotypes to CPIC phenotypes      |
| **DrugRiskService**               | Determines medication risk              |
| **ClinicalRecommendationService** | Produces treatment guidance             |
| **RiskAssessmentFactory**         | Computes confidence and severity        |
| **LlmExplanationService**         | Generates patient-friendly explanations |
| **ResponseAssembler**             | Builds final JSON response              |

---

# 🧬 Supported Drugs

| Drug         | Primary Gene(s)        | Clinical Risk                  |
| ------------ | ---------------------- | ------------------------------ |
| Codeine      | CYP2D6                 | Toxicity / Ineffective Therapy |
| Warfarin     | CYP2C9, VKORC1, CYP4F2 | Bleeding / Thrombosis          |
| Clopidogrel  | CYP2C19                | Reduced Antiplatelet Response  |
| Simvastatin  | SLCO1B1                | Myopathy / Rhabdomyolysis      |
| Azathioprine | TPMT, NUDT15           | Myelosuppression               |
| Fluorouracil | DPYD                   | Severe Drug Toxicity           |

---

# 📊 Response Structure

Each selected drug returns a structured assessment.

```json
[
  {
    "risk_assessment": {},
    "pharmacogenomic_profile": {},
    "clinical_recommendation": {},
    "llm_generated_explanation": "",
    "quality_metrics": {}
  }
]
```

---

# 🌐 API Documentation

## Endpoint

```
POST /api/vcf/analyse
```

### Content Type

```
multipart/form-data
```

---

## Request Parameters

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| file      | File   | VCF File                  |
| drugs     | String | Comma-separated drug list |

Example:

```
drugs=WARFARIN,CLOPIDOGREL
```

---

## Sample Response

```json
[
  {
    "risk_assessment": {
      "risk": "ADJUST_DOSE",
      "confidence": 95
    },
    "clinical_recommendation": {
      "summary": "Dose adjustment recommended."
    },
    "llm_generated_explanation": "The patient's genotype suggests..."
  }
]
```

---

# 📱 Frontend Features

* Drag-and-drop VCF upload
* Multi-drug selection
* Animated confidence ring
* Gene accordion
* Variant table
* Clinical recommendation cards
* AI explanation panel
* JSON viewer
* Report download
* Responsive UI
* Dark / Light mode

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/vedang012/PharmaGuard.git

cd PharmaGuard
```

---

# Backend Setup

```bash
cd pharmaguard-backend
```

### Configure Environment Variables

`application.properties`

```properties
server.port=${PORT:8080}

google.ai.api-key=${GEMINI_API}

app.frontend-url=${FRONTEND_URL}
```

### Run

```bash
mvn clean install

mvn spring-boot:run
```

---

# Docker Deployment

```dockerfile
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

COPY pom.xml .

COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
```

Deploy using **Render** as a Docker Web Service.

---

# Frontend Setup

```bash
cd pharmaguard-frontend

npm install
```

Create `.env`

```env
VITE_API_BASE_URL=http://localhost:8080

VITE_USE_MOCK=false
```

Run

```bash
npm run dev
```

Deploy using **Vercel**.

---

# 🔒 Security

* No hardcoded secrets
* Environment variable configuration
* Backend-only Gemini API access
* Schema validation
* Deterministic clinical engine
* AI isolated from clinical decision-making

---

# 📈 Future Enhancements

* Additional CPIC pharmacogenes
* PDF clinical report generation
* FHIR interoperability
* User authentication
* Patient history support
* Batch VCF analysis
* Pharmacogenomic knowledge graph
* Clinical dashboard analytics

---

# 👥 Team

| Member              | Responsibility                              |
| ------------------- | ------------------------------------------- |
| **Vedang Solaskar** | Backend Architecture & Clinical Engine      |
| **Mrudul Bokade**   | Frontend Development & UI/UX                |
| **Rishikesh Nate**  | AI Integration, Deployment & Infrastructure |

---

# 🏆 Hackathon Highlights

* ✅ Deterministic pharmacogenomic engine
* ✅ Explainable AI architecture
* ✅ Full-stack production deployment
* ✅ Dockerized backend
* ✅ Strict JSON schema compliance
* ✅ Modular clinical pipeline
* ✅ CPIC-aligned phenotype rules
* ✅ Six clinically relevant pharmacogenomic drugs
* ✅ Modern React interface
* ✅ Production-style REST architecture

---

# ⚠️ Disclaimer

PharmaGuard is a **hackathon prototype** developed for educational and research purposes.

It is **not** a certified medical device and should **not** be used for clinical diagnosis, treatment decisions, or patient care.

Clinical decisions should always be made by qualified healthcare professionals using validated pharmacogenomic testing and established medical guidelines.

---

# 📄 License

This project was developed for the **RIFT Hackathon**.

Feel free to fork, learn from, and build upon the architecture for educational purposes.
