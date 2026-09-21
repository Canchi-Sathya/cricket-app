from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine
from .routers import auth, profile, matches, stats

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Cricket Stats API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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