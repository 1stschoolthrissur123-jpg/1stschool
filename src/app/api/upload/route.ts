import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    try {
        const form = await req.formData();
        const file = form.get('file') as File | null;
        const slot = form.get('slot') as string | null;
        const alt = (form.get('alt') as string) || `1st School — ${slot}`;

        if (!file || !slot) {
            return NextResponse.json({ error: 'file and slot are required' }, { status: 400 });
        }

        if (file.size > 100 * 1024 * 1024) {
            return NextResponse.json({ error: 'Image must be under 100 MB' }, { status: 413 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';

        if (process.env.NODE_ENV === 'development') {
            const { uploadImage } = await import('@/lib/storage-local');
            const item = await uploadImage(slot, buffer, ext, alt);
            return NextResponse.json(item);
        }

        const { uploadImage } = await import('@/lib/storage-github');
        const item = await uploadImage(slot, buffer, ext, alt);
        return NextResponse.json(item);
    } catch (err) {
        console.error('[/api/upload POST]', err);
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
