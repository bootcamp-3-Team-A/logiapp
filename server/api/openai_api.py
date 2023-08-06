from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
import os
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()
router = APIRouter()

llm = OpenAI(temperature=0.7)

origins = [
    "http://localhost:3000",  # Update this with your Next.js frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 特定のオリジンを許可する場合は origins に適切なオリジンを指定
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProductInput(BaseModel):
    product: str


prompt = PromptTemplate(
    input_variables=["product"],
    template='チョコレートから連想される言葉をJSON形式で9個教えてください => {{"1":"甘い", "2":"幸せ", "3":"バレンタイン", "4":"カカオ", "5":"お菓子", "6":"デザート", "7":"ショコラティエ", "8":"ケーキ","9":"美味しい"}}\n{product}から連想される言葉を9つ教えてください => ',
)

chain = LLMChain(llm=llm, prompt=prompt)


@router.post("/chat")
async def chat_endpoint(product_input: ProductInput):
    product = product_input.product
    prediction = chain.run(product)
    return {"response": prediction.strip()}


@router.get("/chat")
def read_root():
    return {"message": "/chat is fine!"}
