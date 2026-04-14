import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const { password } = await req.json();
        const adminPass = process.env.ADMIN_PASSWORD;

        if (!adminPass) {
            // If no password is set, allow access but log a warning (or deny in production)
            console.warn('ADMIN_PASSWORD not set in environment variables.');
            return NextResponse.json({ success: true, message: 'No password protection configured.' });
        }

        if (password === adminPass) {
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
    } catch (err) {
        return NextResponse.json({ success: false, error: 'Authentication error' }, { status: 500 });
    }
}
