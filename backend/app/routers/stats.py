from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/stats", tags=["stats"])


@router.get("/{user_id}", response_model=schemas.StatsOut)
def get_stats(user_id: int, db: Session = Depends(get_db)):
    row = (
        db.query(
            func.count(models.Match.id),
            func.coalesce(func.sum(models.Match.runs), 0),
            func.coalesce(func.sum(models.Match.wickets), 0),
            func.coalesce(func.sum(models.Match.catches), 0),
        )
        .filter(models.Match.user_id == user_id)
        .first()
    )
    total_matches, total_runs, total_wickets, total_catches = row
    return schemas.StatsOut(
        total_matches=total_matches,
        total_runs=total_runs,
        total_wickets=total_wickets,
        total_catches=total_catches,
    )