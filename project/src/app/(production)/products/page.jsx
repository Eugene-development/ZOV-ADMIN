import { Product } from '@/UI'
import { getProducts } from './server'

export default async () => {
    const data = await getProducts()

    return (
        <>
            <Product data={data} />
        </>
    )
}
