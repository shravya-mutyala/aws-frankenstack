import json
import os
import boto3
from datetime import datetime
import hashlib

s3_client = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

table = dynamodb.Table(os.environ['LINEAGE_TABLE'])

def handler(event, context):
    """The Brain - Analyzes file metadata and coordinates other heads"""
    
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        size = record['s3']['object']['size']
        
        # Generate file ID
        file_id = hashlib.md5(f"{bucket}/{key}".encode()).hexdigest()
        
        # Get file metadata
        metadata = s3_client.head_object(Bucket=bucket, Key=key)
        
        # Log to DynamoDB - The Memory
        lineage_entry = {
            'fileId': file_id,
            'timestamp': datetime.utcnow().isoformat(),
            'bucket': bucket,
            'key': key,
            'size': size,
            'contentType': metadata.get('ContentType', 'unknown'),
            'etag': metadata.get('ETag', ''),
            'status': 'processed'
        }
        
        table.put_item(Item=lineage_entry)
        
        # Generate AI summary - The Voice
        summary = generate_bedrock_summary(key, size, metadata)
        
        # Update with summary
        table.update_item(
            Key={'fileId': file_id, 'timestamp': lineage_entry['timestamp']},
            UpdateExpression='SET summary = :summary',
            ExpressionAttributeValues={':summary': summary}
        )
        
        print(f"Monster processed: {key} | Summary: {summary}")
    
    return {
        'statusCode': 200,
        'body': json.dumps('Monster is alive!')
    }

def generate_bedrock_summary(filename, size, metadata):
    """The Voice - Uses Bedrock to create monster reports"""
    
    prompt = f"""Analyze this file event in a spooky Frankenstein theme:
File: {filename}
Size: {size} bytes
Type: {metadata.get('ContentType', 'unknown')}

Provide a brief, creepy summary (max 50 words) as if the monster is reporting."""
    
    try:
        response = bedrock.invoke_model(
            modelId='anthropic.claude-3-haiku-20250307-v1:0',
            body=json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 100,
                "messages": [{
                    "role": "user",
                    "content": prompt
                }]
            })
        )
        
        result = json.loads(response['body'].read())
        return result['content'][0]['text']
    except Exception as e:
        return f"The monster whispers: {filename} has been consumed..."
