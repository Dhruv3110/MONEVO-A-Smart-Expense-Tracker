from server.config.settings import app
from server.routes.expenses_route import router as expenses_router
from fastapi.responses import JSONResponse
from fastapi.requests import Request

# Register routes
app.include_router(expenses_router)

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"status": "error", "message": "An unexpected error occurred."},
    )

# Run with: uvicorn main:app --reload
