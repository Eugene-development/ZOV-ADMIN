'use client'
import { useAuth } from '@/hooks/auth'
export default function page() {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <div>
            {user ? (
                <p>В системе</p>
            ) : (
                <>
                    <p>Авторизация</p>
                </>
            )}
        </div>
    )
}
