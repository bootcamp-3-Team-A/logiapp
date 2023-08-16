from fastapi import FastAPI
from api.openai_api import router as chat_router
<<<<<<< HEAD
from api.mandala_api import router as mandala_router
=======
>>>>>>> 6685d4c (Initial commit)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(chat_router)
<<<<<<< HEAD
app.include_router(mandala_router)

origins = [
    "http://localhost:3000",
=======

origins = [
    "http://localhost:3000",  # Update this with your Next.js frontend URL
>>>>>>> 6685d4c (Initial commit)
]

app.add_middleware(
    CORSMiddleware,
<<<<<<< HEAD
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
=======
    allow_origins=["*"],
    allow_credentials=True,  # 追記により追加
    allow_methods=["*"],  # 追記により追加
    allow_headers=["*"],  # 追記により追加
>>>>>>> 6685d4c (Initial commit)
)


@app.get("/")
def read_root():
    return {"message": "Hello World!"}
