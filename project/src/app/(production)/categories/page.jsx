import { Category } from '@/UI'
import { getCategory } from './server'

export default async () => {
    const data = await getCategory()

    return (
        <>
            <Category data={data} />
        </>
    )
}
