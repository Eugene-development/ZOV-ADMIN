import { gql, request } from 'graphql-request'
import { v4 as uuidv4 } from 'uuid'

const PRODUCTS = gql`
    query product {
        product {
            id
            value
            key
        }
    }
`

export async function getProducts() {
    const url = process.env.NEXT_PUBLIC_GRAPHQL
    const variables = {
        key: process.env.NEXT_PUBLIC_KEY,
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    }

    return await request(url, PRODUCTS, variables, requestHeaders)
}
