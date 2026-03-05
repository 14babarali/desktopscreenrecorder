# API Documentation

## Base URL
```
http://localhost:8000/api
```

## Recordings Endpoints

### Get All Recordings
```
GET /recordings
Query Parameters:
  - skip: int (default: 0)
  - limit: int (default: 50)
  - tags: string (comma-separated)

Response: RecordingList
```

### Get Recording by ID
```
GET /recordings/{recording_id}
Response: RecordingResponse
```

### Create Recording
```
POST /recordings
Body: RecordingCreate
Response: RecordingResponse
```

### Update Recording
```
PATCH /recordings/{recording_id}
Body: RecordingUpdate
Response: RecordingResponse
```

### Delete Recording
```
DELETE /recordings/{recording_id}
Response: { message: string }
```

## Storage Endpoints

### Get Storage Info
```
GET /storage/info
Response: {
  total_gb: float,
  used_gb: float,
  free_gb: float,
  recordings_gb: float,
  storage_path: string
}
```

### Delete File
```
DELETE /storage/file/{filename}
Response: { message: string }
```

## Processing Endpoints

### Process Video
```
POST /processing/process
Body: ProcessingRequest
Response: { message: string, recording_id: string }
```

## Schemas

### RecordingCreate
```json
{
  "title": "string",
  "filename": "string",
  "file_path": "string",
  "file_size": 0,
  "duration": 0.0,
  "resolution": "1080p",
  "fps": 30,
  "format": "mp4",
  "has_screen": true,
  "has_camera": false,
  "has_system_audio": false,
  "has_microphone": false,
  "tags": []
}
```

### RecordingUpdate
```json
{
  "title": "string",
  "tags": [],
  "processing_status": "string",
  "is_processed": false
}
```

### ProcessingRequest
```json
{
  "recording_id": "string",
  "output_format": "mp4",
  "compress": false,
  "target_size_mb": 100
}
```
