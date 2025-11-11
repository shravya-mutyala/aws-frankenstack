from aws_cdk import (
    Stack,
    aws_s3 as s3,
    aws_lambda as lambda_,
    aws_dynamodb as dynamodb,
    aws_s3_notifications as s3n,
    aws_iam as iam,
    RemovalPolicy,
    Duration,
    Tags
)
from constructs import Construct

class MonsterStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        
        # Tag all resources
        Tags.of(self).add("Project", "ProjectStitch")
        Tags.of(self).add("Environment", "hackathon")
        
        # S3 Bucket - The Mouth
        self.ingestion_bucket = s3.Bucket(
            self, "IngestionBucket",
            removal_policy=RemovalPolicy.DESTROY,
            auto_delete_objects=True,
            event_bridge_enabled=True
        )
        Tags.of(self.ingestion_bucket).add("Component", "Mouth")
        
        # DynamoDB - The Memory
        self.lineage_table = dynamodb.Table(
            self, "LineageTable",
            partition_key=dynamodb.Attribute(
                name="fileId",
                type=dynamodb.AttributeType.STRING
            ),
            sort_key=dynamodb.Attribute(
                name="timestamp",
                type=dynamodb.AttributeType.STRING
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            point_in_time_recovery=True,
            removal_policy=RemovalPolicy.DESTROY
        )
        Tags.of(self.lineage_table).add("Component", "Memory")
        
        # Lambda - The Brain
        self.analyzer_function = lambda_.Function(
            self, "MetadataAnalyzer",
            runtime=lambda_.Runtime.PYTHON_3_11,
            handler="index.handler",
            code=lambda_.Code.from_asset("../lambda/analyzer"),
            timeout=Duration.seconds(15),
            tracing=lambda_.Tracing.ACTIVE,
            environment={
                "LINEAGE_TABLE": self.lineage_table.table_name,
                "BUCKET_NAME": self.ingestion_bucket.bucket_name
            }
        )
        Tags.of(self.analyzer_function).add("Component", "Brain")
        
        # Grant permissions
        self.ingestion_bucket.grant_read(self.analyzer_function)
        self.lineage_table.grant_write_data(self.analyzer_function)
        
        # Bedrock permissions
        self.analyzer_function.add_to_role_policy(
            iam.PolicyStatement(
                actions=["bedrock:InvokeModel"],
                resources=["*"]
            )
        )
        
        # S3 trigger
        self.ingestion_bucket.add_event_notification(
            s3.EventType.OBJECT_CREATED,
            s3n.LambdaDestination(self.analyzer_function)
        )
