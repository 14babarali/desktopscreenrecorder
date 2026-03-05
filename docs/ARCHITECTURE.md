# Architecture Documentation

## System Overview

The application follows a client-server architecture with clear separation of concerns.

## Backend Architecture

### Layers

1. **API Layer** (`app/api/`)
   - REST endpoints
   - Request validation
   - Response formatting
   - Error handling

2. **Service Layer** (`app/services/`)
   - Business logic
   - Data processing
   - External integrations
   - Async operations

3. **Model Layer** (`app/models/`)
   - Database models
   - Data structures

4. **Schema Layer** (`app/schemas/`)
   - Request/response schemas
   - Data validation
   - Type definitions

5. **Core Layer** (`app/core/`)
   - Configuration
   - Database connection
   - Shared utilities

### Services

- **RecordingService**: Manages recording metadata CRUD operations
- **VideoProcessingService**: Handles video encoding, merging, compression
- **StorageService**: Manages file storage and disk operations

## Frontend Architecture

### Structure

1. **Components** (`src/components/`)
   - Reusable UI components
   - Presentational logic
   - No business logic

2. **Pages** (`src/pages/`)
   - Route-level components
   - Page layouts
   - Data fetching

3. **Hooks** (`src/hooks/`)
   - Custom React hooks
   - Shared stateful logic
   - Side effects

4. **Services** (`src/services/`)
   - API communication
   - External integrations

5. **Utils** (`src/utils/`)
   - Helper functions
   - Utilities

### Key Components

- **Layout**: Application shell with navigation
- **ScreenSelector**: Screen/window selection interface
- **RecorderControls**: Recording control panel
- **CameraOverlay**: Webcam overlay component
- **RecordingCard**: Recording list item
- **VideoPlayer**: Video playback interface

### State Management

- React hooks for local state
- Context API for global state (if needed)
- Custom hooks for shared logic

## Electron Integration

### Main Process (`electron/main.js`)
- Window management
- System integration
- IPC handlers
- Desktop capture

### Preload Script (`electron/preload.js`)
- Context bridge
- Secure API exposure
- IPC communication

## Data Flow

1. User interacts with UI
2. Component calls service function
3. Service makes API request
4. Backend processes request
5. Service layer executes business logic
6. Database operations performed
7. Response returned to frontend
8. UI updates with new data

## Recording Flow

1. User selects screen/window
2. Configure audio/video settings
3. Start recording
4. MediaRecorder captures streams
5. Chunks stored in memory
6. Stop recording
7. Blob created from chunks
8. Metadata sent to backend
9. File saved to storage
10. Database record created

## Video Processing Flow

1. User requests processing
2. Backend receives request
3. Background task started
4. FFmpeg processes video
5. Output file created
6. Database updated
7. User notified
