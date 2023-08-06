from fastapi import FastAPI
from api.openai_api import router as chat_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(chat_router)

origins = [
    "http://localhost:3000",  # Update this with your Next.js frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,  # 追記により追加
    allow_methods=["*"],  # 追記により追加
    allow_headers=["*"],  # 追記により追加
)


@app.get("/")
def read_root():
    return {"message": "Hello World!"}
