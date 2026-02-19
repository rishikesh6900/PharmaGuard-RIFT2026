from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(title="PharmaGuard API")

app.include_router(router)

@app.get("/health")
def health_check():
    return {"status": "running"}

