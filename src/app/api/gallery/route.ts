import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        if (process.env.NODE_ENV === 'development') {
            const { getGallery } = await import('@/lib/storage-local');
            return NextResponse.json(await getGallery());
        }
        const { getGallery } = await import('@/lib/storage-github');
        return NextResponse.json(await getGallery());
    } catch (err) {
        console.error('[/api/gallery GET]', err);
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
