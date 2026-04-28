import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const { password } = await req.json();
        const adminPass = '1stschool@2026';

        if (password === adminPass) {
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
    } catch (err) {
        return NextResponse.json({ success: false, error: 'Authentication error' }, { status: 500 });
    }
}
