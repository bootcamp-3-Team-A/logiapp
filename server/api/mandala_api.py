from fastapi import FastAPI, APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sql.database.database import SessionLocal
from sql.app.models.model import IdeaMandalaCore
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


class IdeaMandalaCoreCreate(BaseModel):
    mandala1_1: str
    mandala1_2: str
    mandala1_3: str
    mandala1_4: str
    mandala1_5: str
    mandala1_6: str
    mandala1_7: str
    mandala1_8: str
    mandala1_9: str
    mandala2_1: str
    mandala2_2: str
    mandala2_3: str
    mandala2_4: str
    mandala2_5: str
    mandala2_6: str
    mandala2_7: str
    mandala2_8: str
    mandala2_9: str
    mandala3_1: str
    mandala3_2: str
    mandala3_3: str
    mandala3_4: str
    mandala3_5: str
    mandala3_6: str
    mandala3_7: str
    mandala3_8: str
    mandala3_9: str
    mandala4_1: str
    mandala4_2: str
    mandala4_3: str
    mandala4_4: str
    mandala4_5: str
    mandala4_6: str
    mandala4_7: str
    mandala4_8: str
    mandala4_9: str
    mandala5_1: str
    mandala5_2: str
    mandala5_3: str
    mandala5_4: str
    mandala5_5: str
    mandala5_6: str
    mandala5_7: str
    mandala5_8: str
    mandala5_9: str
    mandala6_1: str
    mandala6_2: str
    mandala6_3: str
    mandala6_4: str
    mandala6_5: str
    mandala6_6: str
    mandala6_7: str
    mandala6_8: str
    mandala6_9: str
    mandala7_1: str
    mandala7_2: str
    mandala7_3: str
    mandala7_4: str
    mandala7_5: str
    mandala7_6: str
    mandala7_7: str
    mandala7_8: str
    mandala7_9: str
    mandala8_1: str
    mandala8_2: str
    mandala8_3: str
    mandala8_4: str
    mandala8_5: str
    mandala8_6: str
    mandala8_7: str
    mandala8_8: str
    mandala8_9: str
    mandala9_1: str
    mandala9_2: str
    mandala9_3: str
    mandala9_4: str
    mandala9_5: str
    mandala9_6: str
    mandala9_7: str
    mandala9_8: str
    mandala9_9: str
    mandala_title: str


class IdeaMandalaCoreResponse(BaseModel):
    mandala_id: int
    mandala1_1: str
    mandala1_2: str
    mandala1_3: str
    mandala1_4: str
    mandala1_5: str
    mandala1_6: str
    mandala1_7: str
    mandala1_8: str
    mandala1_9: str
    mandala2_1: str
    mandala2_2: str
    mandala2_3: str
    mandala2_4: str
    mandala2_5: str
    mandala2_6: str
    mandala2_7: str
    mandala2_8: str
    mandala2_9: str
    mandala3_1: str
    mandala3_2: str
    mandala3_3: str
    mandala3_4: str
    mandala3_5: str
    mandala3_6: str
    mandala3_7: str
    mandala3_8: str
    mandala3_9: str
    mandala4_1: str
    mandala4_2: str
    mandala4_3: str
    mandala4_4: str
    mandala4_5: str
    mandala4_6: str
    mandala4_7: str
    mandala4_8: str
    mandala4_9: str
    mandala5_1: str
    mandala5_2: str
    mandala5_3: str
    mandala5_4: str
    mandala5_5: str
    mandala5_6: str
    mandala5_7: str
    mandala5_8: str
    mandala5_9: str
    mandala6_1: str
    mandala6_2: str
    mandala6_3: str
    mandala6_4: str
    mandala6_5: str
    mandala6_6: str
    mandala6_7: str
    mandala6_8: str
    mandala6_9: str
    mandala7_1: str
    mandala7_2: str
    mandala7_3: str
    mandala7_4: str
    mandala7_5: str
    mandala7_6: str
    mandala7_7: str
    mandala7_8: str
    mandala7_9: str
    mandala8_1: str
    mandala8_2: str
    mandala8_3: str
    mandala8_4: str
    mandala8_5: str
    mandala8_6: str
    mandala8_7: str
    mandala8_8: str
    mandala8_9: str
    mandala9_1: str
    mandala9_2: str
    mandala9_3: str
    mandala9_4: str
    mandala9_5: str
    mandala9_6: str
    mandala9_7: str
    mandala9_8: str
    mandala9_9: str
    mandala_title: str


@router.post("/mandala_core", response_model=IdeaMandalaCoreResponse)
def create_mandala_core(mandala_data: IdeaMandalaCoreCreate, db: Session = Depends(get_db)):
    try:
        new_mandala = IdeaMandalaCore(**mandala_data.dict())

        db.add(new_mandala)
        db.commit()
        db.refresh(new_mandala)

        return IdeaMandalaCoreResponse(**new_mandala.__dict__)
    except Exception as e:
        print("Error occurred:", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/mandala_core")
def read_root():
    return {"message": "/mandala_core is fine!"}
