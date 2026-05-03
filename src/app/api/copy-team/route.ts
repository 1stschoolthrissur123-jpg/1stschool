import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        // Remove the copy-team-images.js script
        const scriptPath = path.join(process.cwd(), 'copy-team-images.js');
        if (fs.existsSync(scriptPath)) {
            fs.unlinkSync(scriptPath);
        }

        // Remove the copy-team API route (self-destruct after use)
        // We can't delete ourselves while running, so just remove the script
        
        return NextResponse.json({ success: true, message: 'Cleanup done' });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
