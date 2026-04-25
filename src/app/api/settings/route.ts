import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET() {
    try {
        let settings = {};
        if (process.env.NODE_ENV === 'development') {
            const { getSettings } = await import('@/lib/storage-local');
            settings = await getSettings();
        } else {
            const { getSettings } = await import('@/lib/storage-github');
            settings = await getSettings();
        }
        return NextResponse.json(settings);
    } catch (err) {
        console.error('[/api/settings GET]', err);
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { key, value } = body;
        if (!key) {
            return NextResponse.json({ error: 'key is required' }, { status: 400 });
        }

        if (process.env.NODE_ENV === 'development') {
            const { updateSetting } = await import('@/lib/storage-local');
            await updateSetting(key, value || '');
        } else {
            const { updateSetting } = await import('@/lib/storage-github');
            await updateSetting(key, value || '');
        }
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[/api/settings POST]', err);
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
