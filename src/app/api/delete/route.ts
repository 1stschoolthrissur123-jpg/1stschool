import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
    try {
        const { slot } = await req.json() as { slot?: string };
        if (!slot) {
            return NextResponse.json({ error: 'slot is required' }, { status: 400 });
        }

        if (process.env.NODE_ENV === 'development') {
            const { deleteImage } = await import('@/lib/storage-local');
            await deleteImage(slot);
            return NextResponse.json({ ok: true });
        }
        const { deleteImage } = await import('@/lib/storage-github');
        await deleteImage(slot);
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('[/api/delete DELETE]', err);
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
