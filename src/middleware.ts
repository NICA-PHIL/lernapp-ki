import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

function unauthorized() {
  return new NextResponse('Zugang erforderlich', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Produktmanager-Handoff"' },
  })
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/produktmanager-handoff')) {
    const auth = request.headers.get('authorization')
    if (!auth?.startsWith('Basic ')) return unauthorized()
    const [user, pass] = Buffer.from(auth.slice(6), 'base64').toString('utf-8').split(':')
    if (user !== process.env.HANDOFF_USER || pass !== process.env.HANDOFF_PASS) return unauthorized()
    return NextResponse.next({ request })
  }

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
  matcher: ['/dashboard/:path*', '/chat/:path*', '/lernreise/:path*', '/sommermission/:path*', '/philipp-vorbereitung/:path*', '/nicole-vorbereitung/:path*', '/onboarding/:path*', '/feedback-uebersicht/:path*', '/rolle-waehlen/:path*', '/eltern-uebersicht/:path*', '/eltern-einladen/:path*', '/produktmanager-handoff/:path*'],
}
