from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class QuoteRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    company: Optional[str] = ""
    product_interest: Optional[str] = ""
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class QuoteRequestCreate(BaseModel):
    name: str
    email: str
    phone: str
    company: Optional[str] = ""
    product_interest: Optional[str] = ""
    message: str

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "Mestar API Running"}

@api_router.post("/quote")
async def create_quote(input_data: QuoteRequestCreate):
    quote_obj = QuoteRequest(**input_data.model_dump())
    doc = quote_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.quotes.insert_one(doc)
    return {"success": True, "id": quote_obj.id, "message": "Quote request received"}

@api_router.get("/quotes")
async def get_quotes():
    quotes = await db.quotes.find({}, {"_id": 0}).to_list(1000)
    return quotes

@api_router.post("/contact")
async def create_contact(input_data: ContactMessageCreate):
    contact_obj = ContactMessage(**input_data.model_dump())
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.contacts.insert_one(doc)
    return {"success": True, "id": contact_obj.id, "message": "Message received"}

@api_router.get("/products")
async def get_products():
    return {
        "categories": [
            {
                "id": "soil-preparation",
                "name_tr": "Toprak Hazırlama Ekipmanları",
                "name_en": "Soil Preparation Equipment",
                "products": ["HT475", "SPIDER275", "SPIDER475"]
            },
            {
                "id": "potato-planters",
                "name_tr": "Patates Dikim Makineleri",
                "name_en": "Potato Planters",
                "products": ["ALPHA275", "ALPHA475", "PDO-2N", "PDO-2F", "PDO-4N"]
            },
            {
                "id": "potato-harvesters",
                "name_tr": "Patates Söküm Makineleri",
                "name_en": "Potato Harvesters",
                "products": ["ULTRA275", "ULTRA475", "PSH-2S"]
            },
            {
                "id": "onion-harvesters",
                "name_tr": "Soğan Söküm Makineleri",
                "name_en": "Onion Harvesters",
                "products": ["SSM-1400"]
            }
        ]
    }

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
