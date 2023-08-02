from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
import os
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()
router = APIRouter()

llm = OpenAI(temperature=0.7)


prompt = PromptTemplate(
    input_variables=["product"],
    template='チョコレートから連想される言葉をJSON形式で8つ教えてください => {{"1":"甘い", "2":"幸せ", "3":"バレンタイン", "4":"カカオ", "5":"お菓子", "6":"デザート", "7":"ショコラティエ", "8":"ケーキ"}}\n{product}から連想される言葉を8つ教えてください => ',
)


chain = LLMChain(llm=llm, prompt=prompt)


@router.post("/chat")
async def chat_endpoint(product: str):
    # Execute LLM Chain
    prediction = chain.run(product)
    return {"response": prediction.strip()}


@router.get("/chat")
def read_root():
    return {"message": "/chat is fine!"}
