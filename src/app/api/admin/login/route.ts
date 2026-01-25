import { login } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { password } = await request.json();

    const success = await login(password);

    if (success) {
        return NextResponse.json({ success: true });
    }

    return NextResponse.json(
        { success: false, message: 'Password salah' },
        { status: 401 }
    );
}
