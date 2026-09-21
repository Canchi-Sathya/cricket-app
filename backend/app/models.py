from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    first_name = Column(String(100))
    last_name = Column(String(100))
    phone = Column(String(20))
    dob = Column(Date)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    matches = relationship("Match", back_populates="owner")


class Match(Base):
    __tablename__ = "matches"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    opponent = Column(String(150), nullable=False)
    match_date = Column(Date, nullable=False)
    runs = Column(Integer, default=0)
    wickets = Column(Integer, default=0)
    catches = Column(Integer, default=0)
    result = Column(String(20))
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    owner = relationship("User", back_populates="matches")