import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_COOKIE_NAME = 'sellappku_admin_session';

export async function verifyAdminPassword(password: string): Promise<boolean> {
    return password === ADMIN_PASSWORD;
}

export async function createAdminSession(): Promise<void> {
    const cookieStore = await cookies();
    // Simple session token (in production, use JWT or encrypted token)
    const sessionToken = Buffer.from(`admin:${Date.now()}`).toString('base64');

    cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });
}

export async function getAdminSession(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

export async function deleteAdminSession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
    const session = await getAdminSession();
    return !!session;
}
