# System Architecture Diagram

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Desktop Application                      │
│                         (Electron)                           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Dashboard  │  │   Recorder   │  │   Library    │      │
│  │     Page     │  │     Page     │  │     Page     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              React Components Layer                   │   │
│  │  - ScreenSelector  - RecorderControls                │   │
│  │  - CameraOverlay   - RecordingCard                   │   │
│  │  - VideoPlayer     - Timeline                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Services & Utilities Layer               │   │
│  │  - API Client      - Media Devices                   │   │
│  │  - File Helpers    - Custom Hooks                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                      Backend API Server                      │
│                        (FastAPI)                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  API Endpoints                        │   │
│  │  /api/recordings  /api/storage  /api/processing      │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Service Layer                        │   │
│  │  - RecordingService                                   │   │
│  │  - VideoProcessingService                             │   │
│  │  - StorageService                                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Models & Schemas Layer                   │   │
│  │  - Recording Model    - Pydantic Schemas             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└───────────────┬───────────────────────────┬─────────────────┘
                │                           │
                │                           │
        ┌───────▼────────┐         ┌───────▼────────┐
        │    MongoDB     │         │  File Storage  │
        │   Database     │         │   (Local FS)   │
        └────────────────┘         └────────────────┘
                                            │
                                    ┌───────▼────────┐
                                    │     FFmpeg     │
                                    │   Processing   │
                                    └────────────────┘
```

## Recording Flow

```
User Action                 Frontend                Backend
    │                          │                       │
    ├─ Select Screen ─────────►│                       │
    │                          │                       │
    ├─ Configure Settings ────►│                       │
    │                          │                       │
    ├─ Start Recording ───────►│                       │
    │                          │                       │
    │                    MediaRecorder                 │
    │                     Captures Stream              │
    │                          │                       │
    │                    Store Chunks                  │
    │                     in Memory                    │
    │                          │                       │
    ├─ Stop Recording ────────►│                       │
    │                          │                       │
    │                    Create Blob                   │
    │                          │                       │
    │                          ├─ POST /recordings ───►│
    │                          │                       │
    │                          │                  Save Metadata
    │                          │                    to MongoDB
    │                          │                       │
    │                          │◄─── Response ─────────┤
    │                          │                       │
    │◄─── Success ─────────────┤                       │
    │                          │                       │
```

## Video Processing Flow

```
User Request              Frontend                Backend                FFmpeg
    │                        │                       │                     │
    ├─ Process Video ───────►│                       │                     │
    │                        │                       │                     │
    │                        ├─ POST /processing ───►│                     │
    │                        │                       │                     │
    │                        │                  Create Task                │
    │                        │                       │                     │
    │                        │◄─── Accepted ─────────┤                     │
    │                        │                       │                     │
    │◄─── Processing ────────┤                       │                     │
    │                        │                       │                     │
    │                        │                  Background Task            │
    │                        │                       │                     │
    │                        │                       ├─ Process Video ────►│
    │                        │                       │                     │
    │                        │                       │              Encode/Merge
    │                        │                       │                     │
    │                        │                       │◄─── Output ─────────┤
    │                        │                       │                     │
    │                        │                  Update Status              │
    │                        │                   in MongoDB                │
    │                        │                       │                     │
    │                        │◄─── Completed ────────┤                     │
    │                        │                       │                     │
    │◄─── Ready ─────────────┤                       │                     │
    │                        │                       │                     │
```

## Data Models

```
Recording Document (MongoDB)
┌─────────────────────────────────┐
│ _id: ObjectId                   │
│ title: string                   │
│ filename: string                │
│ file_path: string               │
│ file_size: int                  │
│ duration: float                 │
│ resolution: string              │
│ fps: int                        │
│ format: string                  │
│ has_screen: bool                │
│ has_camera: bool                │
│ has_system_audio: bool          │
│ has_microphone: bool            │
│ tags: array[string]             │
│ created_at: datetime            │
│ updated_at: datetime            │
│ is_processed: bool              │
│ processing_status: string       │
└─────────────────────────────────┘
```

## Component Hierarchy

```
App
├── Layout
│   ├── Sidebar Navigation
│   └── Main Content Area
│       ├── Dashboard
│       │   ├── Stats Cards
│       │   ├── Quick Actions
│       │   └── Recent Recordings
│       │
│       ├── RecorderScreen
│       │   ├── ScreenSelector
│       │   ├── SettingsPanel
│       │   ├── RecorderControls
│       │   ├── MicSelector
│       │   └── CameraOverlay
│       │
│       ├── RecordingLibrary
│       │   ├── Search Bar
│       │   ├── Filter Options
│       │   └── RecordingCard (multiple)
│       │
│       ├── VideoPlayer
│       │   ├── Video Element
│       │   ├── Timeline
│       │   └── Controls
│       │
│       └── Settings
│           ├── Video Settings
│           ├── Audio Settings
│           └── Storage Settings
```

## Technology Stack Layers

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  React Components + Tailwind CSS        │
└─────────────────────────────────────────┘
                  │
┌─────────────────────────────────────────┐
│         Application Layer               │
│  Electron Main Process + IPC            │
└─────────────────────────────────────────┘
                  │
┌─────────────────────────────────────────┐
│         Business Logic Layer            │
│  FastAPI Services + Background Tasks    │
└─────────────────────────────────────────┘
                  │
┌─────────────────────────────────────────┐
│         Data Layer                      │
│  MongoDB + File System + FFmpeg         │
└─────────────────────────────────────────┘
```

## Security Boundaries

```
┌──────────────────────────────────────────────┐
│           Electron Renderer Process          │
│              (Untrusted Zone)                │
│                                              │
│  ┌────────────────────────────────────┐     │
│  │      Context Bridge (Secure)       │     │
│  └────────────────────────────────────┘     │
└──────────────────────────────────────────────┘
                    │
                    │ IPC
                    │
┌──────────────────────────────────────────────┐
│           Electron Main Process              │
│              (Trusted Zone)                  │
│                                              │
│  - File System Access                        │
│  - Desktop Capture                           │
│  - System Integration                        │
└──────────────────────────────────────────────┘
                    │
                    │ HTTP
                    │
┌──────────────────────────────────────────────┐
│              Backend API                     │
│                                              │
│  - Input Validation                          │
│  - Authentication (if needed)                │
│  - Rate Limiting                             │
└──────────────────────────────────────────────┘
```
