export interface GalleryItem {
    id: string;
    url: string;
    slot: string;
    alt: string;
    filename: string;
    addedAt?: string;
}

// In-memory storage for local development (Edge runtime compatible)
// Since Next.js Edge runtime does not support 'fs' or 'path', we store local uploads in memory.
// This means local uploads will reset when the dev server restarts, but it allows testing without errors.

let galleryCache: GalleryItem[] = [];
let settingsCache: Record<string, string> = {};

export async function getGallery(): Promise<GalleryItem[]> {
    return galleryCache;
}

export async function uploadImage(slot: string, buffer: Buffer | ArrayBuffer, ext: string, alt: string): Promise<GalleryItem> {
    const safeExt = ext.replace(/[^a-z0-9]/gi, '').toLowerCase() || 'jpg';
    const filename = `${slot}.${safeExt}`;
    
    // Create a data URI for the uploaded file so it works locally without hitting the filesystem
    let base64 = '';
    if (Buffer.isBuffer(buffer)) {
        base64 = buffer.toString('base64');
    } else {
        base64 = Buffer.from(buffer).toString('base64');
    }
    
    const mimeType = safeExt === 'mp4' ? 'video/mp4' : safeExt === 'webm' ? 'video/webm' : `image/${safeExt}`;
    const url = `data:${mimeType};base64,${base64}`;
    
    const item: GalleryItem = { 
        id: `${slot}-${Date.now()}`, 
        url, 
        slot, 
        alt, 
        filename, 
        addedAt: new Date().toISOString() 
    };

    galleryCache = [...galleryCache.filter(m => m.slot !== slot), item];
    return item;
}

export async function deleteImage(slot: string): Promise<void> {
    galleryCache = galleryCache.filter(m => m.slot !== slot);
}

export async function getSettings(): Promise<Record<string, string>> {
    return settingsCache;
}

export async function updateSetting(key: string, value: string): Promise<void> {
    settingsCache[key] = value;
}
