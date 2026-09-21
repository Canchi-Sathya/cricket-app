from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/profile", tags=["profile"])


@router.get("/{user_id}", response_model=schemas.UserOut)
def get_profile(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).get(user_id)
    if not user:
        raise HTTPException(404, "User not found")
    return user


@router.put("/{user_id}", response_model=schemas.UserOut)
def update_profile(user_id: int, payload: schemas.ProfileUpdate, db: Session = Depends(get_db)):
    user = db.query(models.User).get(user_id)
    if not user:
        raise HTTPException(404, "User not found")

    for field, value in payload.dict(exclude_unset=True).items():
        setattr(user, field, value)

    db.commit()
    db.refresh(user)
    return user