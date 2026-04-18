import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'local_database.json');

interface DatabaseSchema {
  products: any[];
  categories: any[];
  orders: any[];
  customers: any[];
  cms: any;
}

const defaultData: DatabaseSchema = {
  products: [],
  categories: [],
  orders: [],
  customers: [],
  cms: {
    hero_title: "Fun, Fashion & Learning for Every Kid",
    hero_subtitle: "Discover play-tested, parent-approved gear.",
    hero_button_text: "Shop Now"
  }
};

function ensureDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
  }
}

export function readDB(): DatabaseSchema {
  ensureDB();
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    return defaultData;
  }
}

export function writeDB(data: DatabaseSchema) {
  ensureDB();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Helper generic numeric ID generator
export function generateId(): number {
  return Date.now();
}
