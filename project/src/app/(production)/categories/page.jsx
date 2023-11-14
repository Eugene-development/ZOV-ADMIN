import { Category } from '@/UI'
import { getCategory } from './server'



export default async () => {
    const data = await getCategory()
    console.log(data)

    return (
        <>
            <Category data={data} />
        </>
    )
}
