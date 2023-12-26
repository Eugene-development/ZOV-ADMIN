import { Product } from '@/UI'
import { getProducts, getAllCategories } from './server'

export default async () => {
    const data = await getProducts()
    const allCategory = await getAllCategories()


    return (
        <>
            <Product data={data} allCategory={allCategory}/>
        </>
    )
}
