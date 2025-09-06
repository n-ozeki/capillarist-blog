import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Rate limiting (簡易版 - 本格的な実装にはRedisなどが必要)
  const userAgent = request.headers.get('user-agent') || '';
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  
  // 疑わしいUser-Agentをブロック
  const suspiciousPatterns = [
    'sqlmap',
    'nikto',
    'nmap',
    'masscan',
    'gobuster',
    'dirb',
    'dirbuster',
  ];
  
  const isSuspicious = suspiciousPatterns.some(pattern => 
    userAgent.toLowerCase().includes(pattern.toLowerCase())
  );
  
  if (isSuspicious) {
    return new Response('Blocked', { status: 403 });
  }

  // 追加のセキュリティヘッダー（Next.configに加えて）
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Powered-By', ''); // Next.jsのX-Powered-Byヘッダーを削除
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};