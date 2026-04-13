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

function readManifest(): GalleryItem[] {
    ensureDir();
    if (!fs.existsSync(MANIFEST)) return [];
    try { return JSON.parse(fs.readFileSync(MANIFEST, 'utf-8')); } catch { return []; }
}

function writeManifest(items: GalleryItem[]) {
    ensureDir();
    fs.writeFileSync(MANIFEST, JSON.stringify(items, null, 2));
}

export async function getGallery(): Promise<GalleryItem[]> {
    return readManifest();
}

export async function uploadImage(slot: string, buffer: Buffer, ext: string, alt: string): Promise<GalleryItem> {
    ensureDir();
    const safeExt = ext.replace(/[^a-z0-9]/gi, '').toLowerCase() || 'jpg';
    const filename = `${slot}.${safeExt}`;
    const filePath = path.join(UPLOADS_DIR, filename);
    fs.writeFileSync(filePath, buffer);
    const url = `/uploads/${filename}?t=${Date.now()}`;
    const item: GalleryItem = { id: `${slot}-${Date.now()}`, url, slot, alt, filename, addedAt: new Date().toISOString() };
    const manifest = readManifest();
    writeManifest([...manifest.filter(m => m.slot !== slot), item]);
    return item;
}

export async function deleteImage(slot: string): Promise<void> {
    const manifest = readManifest();
    const item = manifest.find(m => m.slot === slot);
    if (item) {
        const filePath = path.join(UPLOADS_DIR, item.filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    writeManifest(manifest.filter(m => m.slot !== slot));
}
