"use client"
import { useAuth } from './hook/auth'

export default function page() {
const { user } = useAuth({ middleware: 'auth' })

  return (
    <div>page</div>
  )
}
