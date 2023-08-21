from fastapi import FastAPI, APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sql.database.database import SessionLocal
from sql.app.models.model import Idea5w2hIdea
from fastapi.middleware.cors import CORSMiddleware
from sql.settings.setting import DATABASE_URL
from pydantic import BaseModel

router = APIRouter()
app = FastAPI()


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


engine = create_engine(DATABASE_URL, echo=True)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class Idea5w2hIdeaCreate(BaseModel):
    why: str
    when: str
    where: str
    who: str
    what: str
    how: str
    how_much: str
    idea_5w2h_title: str


class Idea5w2hIdeaResponse(BaseModel):
    idea_5w2h_id: int
    why: str
    when: str
    where: str
    who: str
    what: str
    how: str
    how_much: str
    idea_5w2h_title: str


class Idea5w2hIdeaUpdate(BaseModel):
    why: str
    when: str
    where: str
    who: str
    what: str
    how: str
    how_much: str
    idea_5w2h_title: str


@router.post("/5w2h", response_model=Idea5w2hIdeaResponse)
def create_idea_5w2h_idea(idea_5w2h_idea_data: Idea5w2hIdeaCreate, db: Session = Depends(get_db)):
    try:
        new_idea_5w2h_idea = Idea5w2hIdea(**idea_5w2h_idea_data.dict())

        db.add(new_idea_5w2h_idea)
        db.commit()
        db.refresh(new_idea_5w2h_idea)

        return Idea5w2hIdeaResponse(**new_idea_5w2h_idea.__dict__)
    except Exception as e:
        print("Error occurred:", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/5w2h")
def get_idea_5w2h_idea(idea_5w2h_id: int = Query(..., description="IDEA_5w2h_IDEA ID"), db: Session = Depends(get_db)):
    try:
        idea_5w2h_idea = db.query(Idea5w2hIdea).filter(Idea5w2hIdea.idea_5w2h_id == idea_5w2h_id).first()
        if idea_5w2h_idea is None:
            raise HTTPException(status_code=404, detail="5w2h not found")

        return Idea5w2hIdeaResponse(**idea_5w2h_idea.__dict__)
    except Exception as e:
        print("Error occurred:", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/5w2h/{idea_5w2h_id}", response_model=dict)
def delete_idea_5w2h_idea(idea_5w2h_id: int, db: Session = Depends(get_db)):
    try:
        idea_5w2h_idea = db.query(Idea5w2hIdea).filter(Idea5w2hIdea.idea_5w2h_id == idea_5w2h_id).first()
        if idea_5w2h_idea is None:
            raise HTTPException(status_code=404, detail="5w2h not found")

        db.delete(idea_5w2h_idea)
        db.commit()

        return {"message": "5w2h deleted successfully"}
    except Exception as e:
        print("Error occurred:", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/5w2h/{idea_5w2h_id}", response_model=Idea5w2hIdeaResponse)
def update_idea_5w2h_idea(idea_5w2h_id: int, idea_5w2h_idea_data: Idea5w2hIdeaUpdate, db: Session = Depends(get_db)):
    try:
        idea_5w2h_idea = db.query(Idea5w2hIdea).filter(Idea5w2hIdea.idea_5w2h_id == idea_5w2h_id).first()
        if idea_5w2h_idea is None:
            raise HTTPException(status_code=404, detail="5w2h not found")

        for field, value in idea_5w2h_idea_data.dict().items():
            setattr(idea_5w2h_idea, field, value)

        db.commit()
        db.refresh(idea_5w2h_idea)

        return Idea5w2hIdeaResponse(**idea_5w2h_idea.__dict__)
    except Exception as e:
        print("Error occurred:", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/5w2h_list")
def get_all_idea_5w2h_idea(db: Session = Depends(get_db)):
    try:
        idea_5w2h_ideas = db.query(Idea5w2hIdea).all()
        return idea_5w2h_ideas
    except Exception as e:
        print("Error occurred:", e)
        raise HTTPException(status_code=500, detail=str(e))
