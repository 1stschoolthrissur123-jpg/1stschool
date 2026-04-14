export interface GalleryItem {
    id: string;
    url: string;
    slot: string;
    alt: string;
    filename: string;
    addedAt: string;
}

const GH_API = 'https://api.github.com';
const OWNER = process.env.GITHUB_OWNER ?? '';
const REPO = process.env.GITHUB_REPO ?? '';
const BRANCH = process.env.GITHUB_BRANCH ?? 'main';
const TOKEN = process.env.GITHUB_TOKEN ?? '';
const BASE = 'public/uploads';
const MANIFEST = `${BASE}/firstschool-manifest.json`;

function buildContentsUrl(filePath: string, includeRef = false) {
    const encodedPath = filePath.split('/').map(encodeURIComponent).join('/');
    const url = new URL(`${GH_API}/repos/${OWNER}/${REPO}/contents/${encodedPath}`);
    if (includeRef) url.searchParams.set('ref', BRANCH);
    return url.toString();
}

async function ghFetch(filePath: string, init?: RequestInit, includeRef = false) {
    const res = await fetch(buildContentsUrl(filePath, includeRef), {
        ...init,
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'X-GitHub-Api-Version': '2022-11-28',
            ...(init?.headers ?? {}),
        },
        cache: 'no-store',
    });
    return res;
}

async function parseGitHubError(res: Response) {
    const text = await res.text();
    try { return JSON.parse(text); } catch { return { message: text }; }
}

async function getSHA(filePath: string): Promise<string | null> {
    const res = await ghFetch(filePath, undefined, true);
    if (!res.ok) return null;
    const data = await res.json();
    return data.sha ?? null;
}

function getArray(data: any): GalleryItem[] {
    if (Array.isArray(data)) return data;
    if (data && typeof data === 'object' && Array.isArray(data.gallery)) return data.gallery;
    return [];
}

async function readManifestRaw(): Promise<any> {
    const res = await ghFetch(MANIFEST, undefined, true);
    if (!res.ok) return [];
    const data = await res.json();
    try {
        const text = Buffer.from(data.content, 'base64').toString('utf-8');
        return JSON.parse(text);
    } catch { return []; }
}

async function writeManifestRaw(data: any) {
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');
    const sha = await getSHA(MANIFEST);
    const body: Record<string, unknown> = {
        message: `chore: update gallery manifest [${new Date().toISOString()}]`,
        content,
        branch: BRANCH,
    };
    if (sha) body.sha = sha;
    const res = await ghFetch(MANIFEST, { method: 'PUT', body: JSON.stringify(body) });
    if (!res.ok) {
        const err = await parseGitHubError(res);
        throw new Error(`GitHub manifest write failed: ${JSON.stringify(err)}`);
    }
}

export async function getGallery(): Promise<GalleryItem[]> {
    if (!TOKEN || !OWNER || !REPO) {
        throw new Error('Missing GitHub env vars: GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO');
    }
    const data = await readManifestRaw();
    return getArray(data);
}

export async function uploadImage(slot: string, buffer: Buffer, ext: string, alt: string): Promise<GalleryItem> {
    if (!TOKEN || !OWNER || !REPO) {
        throw new Error('Missing GitHub env vars. Set GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO in Netlify.');
    }
    const safeExt = ext.replace(/[^a-z0-9]/gi, '').toLowerCase() || 'jpg';
    const filename = `${slot}.${safeExt}`;
    const filePath = `${BASE}/${filename}`;
    const content = buffer.toString('base64');
    const sha = await getSHA(filePath);
    const body: Record<string, unknown> = {
        message: `feat: upload image for slot '${slot}'`,
        content,
        branch: BRANCH,
    };
    if (sha) body.sha = sha;
    const uploadRes = await ghFetch(filePath, { method: 'PUT', body: JSON.stringify(body) });
    if (!uploadRes.ok) {
        const err = await parseGitHubError(uploadRes);
        throw new Error(`GitHub upload failed: ${JSON.stringify(err)}`);
    }
    const url = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${BASE}/${filename}?t=${Date.now()}`;
    const item: GalleryItem = { id: `${slot}-${Date.now()}`, url, slot, alt, filename, addedAt: new Date().toISOString() };

    const data = await readManifestRaw();
    const items = getArray(data);
    const updatedItems = [...items.filter(m => m.slot !== slot), item];

    if (Array.isArray(data)) {
        await writeManifestRaw(updatedItems);
    } else {
        await writeManifestRaw({ ...data, gallery: updatedItems });
    }
    return item;
}

export async function deleteImage(slot: string): Promise<void> {
    const data = await readManifestRaw();
    const items = getArray(data);
    const item = items.find(m => m.slot === slot);
    if (item) {
        const filePath = `${BASE}/${item.filename}`;
        const sha = await getSHA(filePath);
        if (sha) {
            const res = await ghFetch(filePath, {
                method: 'DELETE',
                body: JSON.stringify({ message: `chore: remove image for slot '${slot}'`, sha, branch: BRANCH }),
            });
            if (!res.ok) {
                const err = await parseGitHubError(res);
                throw new Error(`GitHub delete failed: ${JSON.stringify(err)}`);
            }
        }
    }
    const updatedItems = items.filter(m => m.slot !== slot);
    if (Array.isArray(data)) {
        await writeManifestRaw(updatedItems);
    } else {
        await writeManifestRaw({ ...data, gallery: updatedItems });
    }
}
