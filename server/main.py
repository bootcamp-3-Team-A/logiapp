from fastapi import FastAPI
from api.openai_api import router as chat_router
from api.mandala_api import router as mandala_router
from api.idea_5w2h_api import router as idea_5w2h_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(chat_router)
app.include_router(mandala_router)
app.include_router(idea_5w2h_router)

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


@app.get("/")
def read_root():
    return {"message": "Hello World!"}
