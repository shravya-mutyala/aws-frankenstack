#!/usr/bin/env python3
import os
import aws_cdk as cdk
from stacks.monster_stack import MonsterStack

app = cdk.App()

# Use environment variables or defaults
account = os.environ.get('CDK_DEFAULT_ACCOUNT', '829734435862')
region = os.environ.get('CDK_DEFAULT_REGION', 'us-east-1')

MonsterStack(
    app, 
    "ProjectStitchStack",
    env=cdk.Environment(account=account, region=region)
)

app.synth()
