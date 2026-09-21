import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine
from .routers import auth, profile, matches, stats

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Cricket Stats API")

origins_env = os.environ.get("ALLOWED_ORIGINS", "http://localhost:3000")
allowed_origins = [origin.strip() for origin in origins_env.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(matches.router)
app.include_router(stats.router)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Hello, Cricket API"}