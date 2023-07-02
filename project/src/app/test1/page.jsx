"use client"
import { useAuth } from './hook/auth'

// http://localhost:3000/test1?utm_source=yandex&utm_medium=zzd
import { usePathname, useSearchParams } from 'next/navigation'

export default function page() {
const { user } = useAuth({ middleware: 'auth' })

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const url = `${pathname}?${searchParams}`
    console.log(url)

  return (
    <div>page</div>
  )
}
