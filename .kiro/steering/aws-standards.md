---
inclusion: always
---

# AWS Project Standards

## Infrastructure as Code
- Use AWS CDK with Python
- Follow least privilege IAM principles
- Tag all resources with: Project=ProjectStitch, Environment, Component

## Lambda Functions
- Use Python 3.11 runtime
- Keep functions under 15 seconds
- Use environment variables for configuration
- Enable X-Ray tracing

## DynamoDB
- Use on-demand billing for hackathon
- Enable point-in-time recovery
- Use composite keys for lineage tracking

## Security
- Never commit AWS credentials
- Use IAM roles for service-to-service communication
- Enable CloudWatch logging for all services
