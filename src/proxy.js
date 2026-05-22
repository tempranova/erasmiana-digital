import { NextResponse } from "next/server";

const locales = ['en', 'nl']
const defaultLocale = 'en'
 
function getLocale(request) {
  let cookieLang = request.cookies.get('erasmiana-lang')
  if(cookieLang) {
    if(locales.indexOf(cookieLang.value) > -1) {
      return locales[locales.indexOf(cookieLang.value)]
    } else {
      return defaultLocale;
    }
  } else {
    return defaultLocale;
  }
}

export default function proxy(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return
 
  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|assets|audio|scripts|video|osd).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}