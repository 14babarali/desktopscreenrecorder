# Development Guide

## Project Structure

```
project-root/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── api/         # API endpoints
│   │   ├── core/        # Configuration
│   │   ├── models/      # Database models
│   │   ├── schemas/     # Pydantic schemas
│   │   ├── services/    # Business logic
│   │   └── utils/       # Utilities
│   └── requirements.txt
├── ui/                  # Electron frontend
│   ├── electron/        # Electron main process
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── features/    # Feature modules
│   │   ├── hooks/       # Custom hooks
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── utils/       # Utilities
│   └── package.json
└── docs/                # Documentation
```

## Development Workflow

### Backend Development

1. **Start MongoDB**
   ```bash
   # Ensure MongoDB is running
   ```

2. **Activate virtual environment**
   ```bash
   cd backend
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   ```

3. **Run development server**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

4. **Access API docs**
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

### Frontend Development

1. **Start Vite dev server**
   ```bash
   cd ui
   npm run dev
   ```

2. **Run Electron in development**
   ```bash
   npm run electron:dev
   ```

## Code Style

### Python (Backend)
- Follow PEP 8
- Use type hints
- Document functions with docstrings
- Use async/await for I/O operations

### JavaScript/React (Frontend)
- Use functional components
- Follow React hooks best practices
- Use meaningful variable names
- Add JSDoc comments for complex functions

## Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd ui
npm test
```

## Building

### Backend
No build step required. Deploy Python files directly.

### Frontend
```bash
cd ui
npm run build
npm run package
```

## Common Tasks

### Add New API Endpoint
1. Create route in `backend/app/api/`
2. Add service logic in `backend/app/services/`
3. Define schemas in `backend/app/schemas/`
4. Update API client in `ui/src/services/api.js`

### Add New Component
1. Create component in `ui/src/components/`
2. Use Tailwind CSS for styling
3. Export from component file
4. Import where needed

### Add New Page
1. Create page in `ui/src/pages/`
2. Add route in `ui/src/App.jsx`
3. Add navigation link in `ui/src/components/Layout.jsx`

## Debugging

### Backend
- Use `print()` or `logger.debug()`
- Check logs in console
- Use FastAPI's automatic validation errors

### Frontend
- Use React DevTools
- Check browser console
- Use Electron DevTools (Ctrl+Shift+I)

## Performance Tips

### Backend
- Use async operations
- Index MongoDB collections
- Implement caching where appropriate
- Use background tasks for heavy operations

### Frontend
- Lazy load components
- Memoize expensive computations
- Optimize re-renders
- Use virtual scrolling for large lists

## Security Considerations

- Validate all inputs
- Sanitize file paths
- Limit file sizes
- Use HTTPS in production
- Implement rate limiting
- Handle errors gracefully
