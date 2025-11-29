'use server'
 
import { cookies } from 'next/headers'
 
export async function setLanguageCookie(locale) {
  const cookieStore = await cookies()
  cookieStore.set('erasmiana-lang', locale)
  console.log('set?')
}