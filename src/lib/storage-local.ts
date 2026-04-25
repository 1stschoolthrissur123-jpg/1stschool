import fs from 'fs';
import path from 'path';

export interface GalleryItem {
    id: string;
    url: string;
    slot: string;
    alt: string;
    filename: string;
    addedAt: string;
}

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
const MANIFEST = path.join(UPLOADS_DIR, 'firstschool-manifest.json');

function ensureDir() {
    if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function readManifestRaw(): any {
    ensureDir();
    if (!fs.existsSync(MANIFEST)) return [];
    try { return JSON.parse(fs.readFileSync(MANIFEST, 'utf-8')); } catch { return []; }
}

function writeManifestRaw(data: any) {
    ensureDir();
    fs.writeFileSync(MANIFEST, JSON.stringify(data, null, 2));
}

function getArray(data: any): GalleryItem[] {
    if (Array.isArray(data)) return data;
    if (data && typeof data === 'object' && Array.isArray(data.gallery)) return data.gallery;
    return [];
}

export async function getGallery(): Promise<GalleryItem[]> {
    return getArray(readManifestRaw());
}

export async function uploadImage(slot: string, buffer: Buffer, ext: string, alt: string): Promise<GalleryItem> {
    ensureDir();
    const safeExt = ext.replace(/[^a-z0-9]/gi, '').toLowerCase() || 'jpg';
    const filename = `${slot}.${safeExt}`;
    const filePath = path.join(UPLOADS_DIR, filename);
    fs.writeFileSync(filePath, buffer);
    const url = `/uploads/${filename}?t=${Date.now()}`;
    const item: GalleryItem = { id: `${slot}-${Date.now()}`, url, slot, alt, filename, addedAt: new Date().toISOString() };

    const data = readManifestRaw();
    const items = getArray(data);
    const updatedItems = [...items.filter(m => m.slot !== slot), item];

    if (Array.isArray(data)) {
        writeManifestRaw(updatedItems);
    } else {
        writeManifestRaw({ ...data, gallery: updatedItems });
    }
    return item;
}

export async function deleteImage(slot: string): Promise<void> {
    const data = readManifestRaw();
    const items = getArray(data);
    const item = items.find(m => m.slot === slot);
    if (item) {
        const filePath = path.join(UPLOADS_DIR, item.filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    const updatedItems = items.filter(m => m.slot !== slot);
    if (Array.isArray(data)) {
        writeManifestRaw(updatedItems);
    } else {
        writeManifestRaw({ ...data, gallery: updatedItems });
    }
}

export async function getSettings(): Promise<Record<string, string>> {
    const data = readManifestRaw();
    if (Array.isArray(data)) return {};
    return data.settings || {};
}

export async function updateSetting(key: string, value: string): Promise<void> {
    const data = readManifestRaw();
    const isArray = Array.isArray(data);
    const settings = isArray ? {} : (data.settings || {});
    settings[key] = value;
    
    if (isArray) {
        writeManifestRaw({ gallery: data, settings });
    } else {
        writeManifestRaw({ ...data, settings });
    }
}
