import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'local_database.json');

interface DatabaseSchema {
  products: any[];
  categories: any[];
  orders: any[];
  customers: any[];
  banners: any[];
  offers: any[];
  reviews: any[];
  staff_users: {
    id: any;
    name: string;
    email: string;
    phone: string;
    role: "Super Admin" | "Admin" | "Manager" | "Staff" | "Support Agent";
    status: "Active" | "Inactive";
    createdAt?: string;
  }[];
  whatsapp_settings: any;
  contact_settings: {
    address: string;
    phone: string;
    email: string;
  };
  cms: any;
  learn_play: any;
}

const defaultData: DatabaseSchema = {
  products: [],
  categories: [],
  orders: [],
  customers: [],
  banners: [],
  offers: [],
  reviews: [],
  staff_users: [
    { id: 1, name: "Admin Setup", email: "admin@global.store", phone: "", role: "Super Admin", status: "Active" },
    { id: 2, name: "Support Agent", email: "support@global.store", phone: "", role: "Staff", status: "Active" }
  ],
  whatsapp_settings: {
    enabled: true,
    phone: "910000000000",
    message: "Hi! I would like to order..."
  },
  contact_settings: {
    address: "123 Fun Street, Playville, Learning State 45678",
    phone: "+1 (800) MINDSKY",
    email: "hello@mindsky.store"
  },
  cms: {
    hero_title: "Fun, Fashion & Learning for Every Kid",
    hero_subtitle: "Discover play-tested, parent-approved gear.",
    hero_button_text: "Shop Now"
  },
  learn_play: {
    printables: []
  }
};

function ensureDB() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
  }
}

export function readDB(): DatabaseSchema {
  ensureDB();
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const data = JSON.parse(raw);
    // Ensure all keys exist
    return { ...defaultData, ...data };
  } catch (error) {
    return defaultData;
  }
}

export function writeDB(data: DatabaseSchema) {
  ensureDB();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function generateId(): number {
  return Date.now();
}

export default { readDB, writeDB, generateId };
