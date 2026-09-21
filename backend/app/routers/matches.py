from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/matches", tags=["matches"])


@router.get("/{user_id}", response_model=List[schemas.MatchOut])
def list_matches(user_id: int, db: Session = Depends(get_db)):
    return (
        db.query(models.Match)
        .filter(models.Match.user_id == user_id)
        .order_by(models.Match.match_date.desc())
        .all()
    )


@router.post("", response_model=schemas.MatchOut)
def create_match(payload: schemas.MatchCreate, db: Session = Depends(get_db)):
    match = models.Match(**payload.dict())
    db.add(match)
    db.commit()
    db.refresh(match)
    return match


@router.put("/{match_id}", response_model=schemas.MatchOut)
def update_match(match_id: int, payload: schemas.MatchUpdate, db: Session = Depends(get_db)):
    match = db.query(models.Match).get(match_id)
    if not match:
        raise HTTPException(404, "Match not found")

    for field, value in payload.dict(exclude_unset=True).items():
        setattr(match, field, value)

    db.commit()
    db.refresh(match)
    return match


@router.delete("/{match_id}")
def delete_match(match_id: int):
    raise HTTPException(501, "Delete not implemented yet")