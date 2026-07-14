import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  const protectedPaths = ['/dashboard', '/chat', '/lernreise', '/sommermission', '/philipp-vorbereitung', '/nicole-vorbereitung', '/onboarding', '/feedback-uebersicht', '/rolle-waehlen', '/eltern-uebersicht', '/eltern-einladen']
  const isProtected = protectedPaths.some(p => path.startsWith(p))

  if (isProtected && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/chat/:path*', '/lernreise/:path*', '/sommermission/:path*', '/philipp-vorbereitung/:path*', '/nicole-vorbereitung/:path*', '/onboarding/:path*', '/feedback-uebersicht/:path*', '/rolle-waehlen/:path*', '/eltern-uebersicht/:path*', '/eltern-einladen/:path*'],
}
