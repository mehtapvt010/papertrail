# 🧾 PaperTrail AI Monorepo

AI-powered “digital glovebox” for secure document uploads, OCR parsing, intelligent indexing, and chatbot-style retrieval — deployed fully on AWS via CDK.

## 📁 Folder Structure

| Folder             | Purpose                                    |
|--------------------|--------------------------------------------|
| `mobile/`          | React Native / Expo app (to be scaffolded) |
| `web/`             | Marketing site (Next.js / Vite, coming soon) |
| `services/`        | Lambda functions, Step Functions, workers  |
| `infra/cdk/`       | AWS CDK v2 infrastructure (TypeScript)     |
| `.github/workflows/` | CI + CD deployment via GitHub Actions   |

---

## 🛠️ Local Development

First-time setup:

```bash
corepack enable
pnpm install
aws configure sso      # or configure profile via AWS CLI
cd infra/cdk
pnpm exec cdk deploy --require-approval never
