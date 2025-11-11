# 🪦 Echoes of the Dead Web - Deployment Guide

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+ (for AWS CDK infrastructure)
- Chrome browser (for extension)
- OpenAI or Anthropic API key
- Pinecone account (free tier works)

### Step 1: Install Dependencies

```bash
# Root dependencies
npm install

# Frontend dependencies
cd frontend
npm install
cd ..
```

### Step 2: Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your API keys:
# - OPENAI_API_KEY or ANTHROPIC_API_KEY
# - PINECONE_API_KEY
# - PINECONE_ENVIRONMENT
# - PINECONE_INDEX_NAME
```

### Step 3: Start the Resurrection Engine

```bash
# Terminal 1: Start backend server
npm run backend

# Terminal 2: Start frontend (in new terminal)
cd frontend
npm run dev
```

The séance chamber will be available at: http://localhost:5173

### Step 4: Load Chrome Extension (Optional)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `chrome_extension/` folder from this project
5. The extension icon will appear in your toolbar

## AWS Deployment (Production)

### Prerequisites
- AWS Account with appropriate permissions
- AWS CLI configured with credentials
- AWS CDK installed globally: `npm install -g aws-cdk`

### Step 1: Set Up Infrastructure

```bash
cd infrastructure

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Bootstrap CDK (first time only)
cdk bootstrap --profile your-aws-profile

# Deploy infrastructure
cdk deploy --profile your-aws-profile
```

### Step 2: Update Environment Variables

After deployment, CDK will output resource names. Update your `.env`:

```bash
# Add from CDK outputs
S3_BUCKET_NAME=your-resurrection-bucket
DYNAMODB_TABLE_NAME=your-resurrection-table
```

### Step 3: Deploy Backend

Option A: Deploy to AWS Lambda (recommended)
```bash
# Backend will be deployed as part of CDK stack
# API Gateway endpoint will be in CDK outputs
```

Option B: Deploy to EC2/ECS
```bash
# Build backend
npm run build

# Deploy using your preferred method
# Update CORS settings to allow your frontend domain
```

### Step 4: Deploy Frontend

Option A: AWS Amplify
```bash
cd frontend
npm run build

# Deploy dist/ folder to Amplify
# Or connect GitHub repo for automatic deployments
```

Option B: S3 + CloudFront
```bash
cd frontend
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-frontend-bucket --profile your-aws-profile

# Configure CloudFront distribution
# Update CORS in backend to allow CloudFront domain
```

## Environment Variables Reference

### Required
- `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` - For ghost conversations
- `PINECONE_API_KEY` - For vector memory storage
- `PINECONE_ENVIRONMENT` - Your Pinecone environment (e.g., us-east-1-aws)
- `PINECONE_INDEX_NAME` - Name of your Pinecone index

### Optional
- `PORT` - Backend server port (default: 3001)
- `AWS_REGION` - AWS region for services (default: us-east-1)
- `AWS_PROFILE` - AWS CLI profile name
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)

## Pinecone Setup

1. Create free account at https://www.pinecone.io/
2. Create new index:
   - Name: `dead-web-memory`
   - Dimensions: `1536` (for OpenAI embeddings)
   - Metric: `cosine`
3. Copy API key and environment from dashboard
4. Add to `.env` file

## Troubleshooting

### Backend won't start
```bash
# Check if port 3001 is already in use
# Windows:
netstat -ano | findstr :3001
# Mac/Linux:
lsof -i :3001

# Kill the process or change PORT in .env
```

### Frontend can't connect to backend
```bash
# Verify backend is running on http://localhost:3001
# Check browser console for CORS errors
# Ensure CORS is enabled in backend-server.js
```

### Wayback Machine API errors
```bash
# The Wayback Machine API is public and free
# Rate limits: ~15 requests per second
# If you hit rate limits, add delay between requests
# No API key needed
```

### Chrome Extension not working
```bash
# Ensure extension is loaded in chrome://extensions/
# Check that "Developer mode" is enabled
# Reload extension after code changes
# Check browser console for errors
```

### AWS CDK deployment fails
```bash
# Ensure AWS credentials are configured
aws configure --profile your-aws-profile

# Verify CDK is bootstrapped
cdk bootstrap --profile your-aws-profile

# Check CloudFormation console for detailed errors
```

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│  Chrome Extension (Dead Link Detector)      │
│  - Detects 404s                             │
│  - One-click resurrection                   │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│  React Frontend (Gothic CRT UI)             │
│  - Vite dev server (local)                  │
│  - S3 + CloudFront (production)             │
│  - WebSocket connection to backend          │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│  Express Backend (Resurrection Engine)      │
│  - Node.js server (local)                   │
│  - Lambda + API Gateway (production)        │
│  - WebSocket for real-time updates          │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│  External Services                          │
│  ├─ Wayback Machine API (free)              │
│  ├─ OpenAI/Anthropic (paid)                 │
│  ├─ Pinecone (free tier available)          │
│  ├─ AWS S3 (storage)                        │
│  └─ AWS DynamoDB (metadata)                 │
└─────────────────────────────────────────────┘
```

## Cost Estimates (Production)

### Free Tier (Suitable for Demo)
- Wayback Machine: Free
- Pinecone: Free tier (1M vectors)
- AWS Free Tier: S3, Lambda, DynamoDB (12 months)
- **Total: $0/month**

### Low Traffic (~1000 resurrections/month)
- OpenAI API: ~$10/month
- Pinecone: Free tier
- AWS: ~$5/month
- **Total: ~$15/month**

### Production (~10,000 resurrections/month)
- OpenAI API: ~$100/month
- Pinecone: ~$70/month (paid tier)
- AWS: ~$50/month
- **Total: ~$220/month**

## Security Considerations

1. **API Keys**: Never commit `.env` file to git
2. **CORS**: Configure strict CORS policies in production
3. **Rate Limiting**: Implement rate limiting on API endpoints
4. **Input Validation**: Sanitize all user inputs (URLs)
5. **AWS IAM**: Follow least-privilege principles (see `.kiro/steering/aws-standards.md`)

## Monitoring

### Local Development
```bash
# Backend logs
npm run backend

# Frontend logs
cd frontend && npm run dev

# Check WebSocket connection in browser DevTools
```

### Production
```bash
# CloudWatch Logs
aws logs tail /aws/lambda/resurrection-engine --follow --profile your-aws-profile

# API Gateway metrics
# View in AWS Console → API Gateway → Your API → Dashboard

# DynamoDB metrics
# View in AWS Console → DynamoDB → Your Table → Metrics
```

## Scaling Considerations

### Backend
- Use AWS Lambda for automatic scaling
- Implement caching for frequently resurrected sites
- Add Redis for session management

### Vector Store
- Upgrade Pinecone tier for more vectors
- Implement vector caching for popular sites
- Consider self-hosted alternatives (Weaviate, Milvus)

### Frontend
- Use CloudFront CDN for global distribution
- Implement service worker for offline support
- Add lazy loading for resurrection gallery

---

**The séance chamber awaits... 👻**

For issues or questions, check the GitHub repository or contact the maintainers.
