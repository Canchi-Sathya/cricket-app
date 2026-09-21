from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    confirm_password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    dob: Optional[date] = None

    class Config:
        from_attributes = True


class StatsOut(BaseModel):
    total_matches: int
    total_runs: int
    total_wickets: int
    total_catches: int


class ProfileUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    dob: Optional[date] = None


class MatchCreate(BaseModel):
    user_id: int
    opponent: str
    match_date: date
    runs: int = 0
    wickets: int = 0
    catches: int = 0
    result: Optional[str] = None
    notes: Optional[str] = None


class MatchUpdate(BaseModel):
    opponent: Optional[str] = None
    match_date: Optional[date] = None
    runs: Optional[int] = None
    wickets: Optional[int] = None
    catches: Optional[int] = None
    result: Optional[str] = None
    notes: Optional[str] = None


class MatchOut(BaseModel):
    id: int
    opponent: str
    match_date: date
    runs: int
    wickets: int
    catches: int
    result: Optional[str] = None
    notes: Optional[str] = None

class Config:
    from_attributes = True


    