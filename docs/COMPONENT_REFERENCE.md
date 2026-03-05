# Component Reference

## Backend Components

### API Endpoints (`backend/app/api/`)

#### recordings.py
- **Purpose**: Recording CRUD operations
- **Endpoints**:
  - `POST /recordings` - Create new recording
  - `GET /recordings` - List all recordings
  - `GET /recordings/{id}` - Get specific recording
  - `PATCH /recordings/{id}` - Update recording
  - `DELETE /recordings/{id}` - Delete recording
- **Features**: Pagination, filtering by tags, search

#### storage.py
- **Purpose**: Storage management
- **Endpoints**:
  - `GET /storage/info` - Get storage statistics
  - `DELETE /storage/file/{filename}` - Delete file
- **Features**: Disk usage monitoring, file cleanup

#### processing.py
- **Purpose**: Video processing operations
- **Endpoints**:
  - `POST /processing/process` - Process video
- **Features**: Background tasks, format conversion, compression

### Services (`backend/app/services/`)

#### recording_service.py
- **Purpose**: Recording business logic
- **Methods**:
  - `create_recording()` - Create recording metadata
  - `get_recording()` - Retrieve recording by ID
  - `get_recordings()` - List recordings with filters
  - `update_recording()` - Update recording metadata
  - `delete_recording()` - Remove recording
- **Features**: Async operations, MongoDB integration

#### video_processing_service.py
- **Purpose**: Video manipulation
- **Methods**:
  - `merge_streams()` - Combine video/audio streams
  - `compress_video()` - Reduce file size
  - `convert_format()` - Change video format
- **Features**: FFmpeg integration, async processing

#### storage_service.py
- **Purpose**: File system operations
- **Methods**:
  - `get_storage_info()` - Calculate storage usage
  - `delete_file()` - Remove file from disk
  - `get_file_path()` - Resolve file paths
- **Features**: Disk monitoring, path management

### Models (`backend/app/models/`)

#### recording.py
- **Purpose**: Database schema definition
- **Fields**: All recording metadata
- **Features**: Pydantic validation, MongoDB compatibility

### Schemas (`backend/app/schemas/`)

#### recording.py
- **Purpose**: Request/response validation
- **Schemas**:
  - `RecordingCreate` - Create request
  - `RecordingUpdate` - Update request
  - `RecordingResponse` - API response
  - `RecordingList` - List response
  - `ProcessingRequest` - Processing request
- **Features**: Type validation, documentation

### Core (`backend/app/core/`)

#### config.py
- **Purpose**: Application configuration
- **Settings**: Database, storage, recording defaults
- **Features**: Environment variable loading

#### database.py
- **Purpose**: Database connection management
- **Functions**: Connect, disconnect, get database
- **Features**: Async MongoDB client

### Utils (`backend/app/utils/`)

#### logger.py
- **Purpose**: Logging configuration
- **Features**: Console and file logging

#### validators.py
- **Purpose**: Input validation
- **Functions**: Validate resolution, FPS, format, file size

## Frontend Components

### Pages (`ui/src/pages/`)

#### Dashboard.jsx
- **Purpose**: Main landing page
- **Features**:
  - Storage statistics
  - Recent recordings
  - Quick actions
  - Navigation shortcuts
- **State**: Recordings list, storage info

#### RecorderScreen.jsx
- **Purpose**: Recording interface
- **Features**:
  - Screen selection
  - Settings configuration
  - Recording controls
  - Real-time preview
- **State**: Recording state, settings, streams

#### RecordingLibrary.jsx
- **Purpose**: Recording management
- **Features**:
  - Grid view of recordings
  - Search functionality
  - Tag filtering
  - Delete operations
- **State**: Recordings list, filters

#### VideoPlayer.jsx
- **Purpose**: Video playback
- **Features**:
  - Video player
  - Timeline scrubbing
  - Playback speed control
  - Metadata display
- **State**: Recording data, playback state

#### Settings.jsx
- **Purpose**: Application configuration
- **Features**:
  - Video settings
  - Audio settings
  - Storage preferences
  - Default values
- **State**: Settings object

### Components (`ui/src/components/`)

#### Layout.jsx
- **Purpose**: Application shell
- **Features**:
  - Sidebar navigation
  - Route rendering
  - Active route highlighting
- **Props**: children

#### ScreenSelector.jsx
- **Purpose**: Screen/window selection
- **Features**:
  - List available sources
  - Thumbnail previews
  - Selection state
- **Props**: onSelect
- **State**: sources, selectedSource

#### RecorderControls.jsx
- **Purpose**: Recording control panel
- **Features**:
  - Start/stop/pause buttons
  - Timer display
  - Mic/camera toggles
- **Props**: isRecording, isPaused, recordingTime, callbacks
- **State**: None (controlled)

#### CameraOverlay.jsx
- **Purpose**: Webcam overlay
- **Features**:
  - Camera stream display
  - Draggable positioning
  - Resizable window
- **Props**: enabled, onStreamReady
- **State**: position, size, stream

#### RecordingCard.jsx
- **Purpose**: Recording list item
- **Features**:
  - Thumbnail display
  - Metadata display
  - Action buttons
- **Props**: recording, onDelete
- **State**: None

#### MicSelector.jsx
- **Purpose**: Microphone selection
- **Features**:
  - Device list
  - Volume meter
  - Enable/disable
- **Props**: onSelect, enabled
- **State**: devices, selectedDevice, volume

#### SettingsPanel.jsx
- **Purpose**: Settings configuration
- **Features**:
  - Resolution selector
  - FPS selector
  - Format selector
  - Audio enhancement toggles
- **Props**: settings, onChange
- **State**: None (controlled)

#### Timeline.jsx
- **Purpose**: Video timeline
- **Features**:
  - Progress bar
  - Seek functionality
  - Time display
- **Props**: duration, currentTime, onSeek
- **State**: isDragging

### Hooks (`ui/src/hooks/`)

#### useRecorder.js
- **Purpose**: Recording logic
- **Features**:
  - MediaRecorder management
  - Recording state
  - Timer management
  - Chunk collection
- **Returns**: Recording state and controls

### Services (`ui/src/services/`)

#### api.js
- **Purpose**: Backend API client
- **Features**:
  - Axios configuration
  - API endpoints
  - Error handling
- **Exports**: recordingsAPI, storageAPI, processingAPI

### Utils (`ui/src/utils/`)

#### mediaDevices.js
- **Purpose**: Media device utilities
- **Functions**:
  - `getScreenStream()` - Get screen capture
  - `getMicrophoneStream()` - Get mic input
  - `getCameraStream()` - Get camera stream
  - `getAudioDevices()` - List audio devices
  - `getVideoDevices()` - List video devices
  - `mergeAudioStreams()` - Combine audio

#### fileHelpers.js
- **Purpose**: File utilities
- **Functions**:
  - `saveRecordingToFile()` - Download file
  - `formatFileSize()` - Format bytes
  - `formatDuration()` - Format seconds
  - `generateFilename()` - Create filename

### Features (`ui/src/features/`)

#### recorder/RecorderContext.jsx
- **Purpose**: Recorder state management
- **Features**:
  - Global recorder state
  - Settings management
  - Context provider
- **State**: All recorder settings

### Electron (`ui/electron/`)

#### main.js
- **Purpose**: Electron main process
- **Features**:
  - Window management
  - IPC handlers
  - Desktop capture
  - App lifecycle

#### preload.js
- **Purpose**: Context bridge
- **Features**:
  - Secure API exposure
  - IPC communication
- **Exposed APIs**: getSources, getAudioDevices

#### recorder/screenCapture.js
- **Purpose**: Screen capture utilities
- **Features**:
  - Source enumeration
  - Stream configuration
  - Thumbnail generation

## Usage Examples

### Creating a Recording (Backend)
```python
from app.services.recording_service import RecordingService
from app.schemas.recording import RecordingCreate

service = RecordingService()
recording = await service.create_recording(
    RecordingCreate(
        title="My Recording",
        filename="recording.mp4",
        file_path="/recordings/recording.mp4",
        file_size=1024000,
        duration=60.0,
        resolution="1080p",
        fps=30,
        format="mp4"
    )
)
```

### Using Recorder Hook (Frontend)
```javascript
import { useRecorder } from '../hooks/useRecorder';

function MyComponent() {
  const {
    isRecording,
    startRecording,
    stopRecording,
    recordingTime
  } = useRecorder();

  const handleStart = async () => {
    const stream = await getScreenStream(sourceId);
    await startRecording(stream);
  };

  return (
    <button onClick={handleStart}>
      {isRecording ? 'Stop' : 'Start'}
    </button>
  );
}
```

### API Call (Frontend)
```javascript
import { recordingsAPI } from '../services/api';

// Get all recordings
const response = await recordingsAPI.getAll({ limit: 10 });
const recordings = response.data.recordings;

// Create recording
await recordingsAPI.create({
  title: "New Recording",
  filename: "rec.mp4",
  // ... other fields
});
```
