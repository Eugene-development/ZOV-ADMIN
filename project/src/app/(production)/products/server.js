'use server'
import { revalidatePath } from 'next/cache'
import { gql, request } from 'graphql-request'
import { v4 as uuidv4 } from 'uuid'

const { NEXT_PUBLIC_GRAPHQL, NEXT_PUBLIC_KEY, NEXT_PUBLIC_CONNECTION_NAME } =
    process.env

const requestHeaders = {
    ConnectionName: NEXT_PUBLIC_CONNECTION_NAME,
}

const PRODUCTS = gql`
    query product {
        product(orderBy: [{ column: CREATED_AT, order: DESC }]) {
            ...body
            ...SEO
            ...parent
            ...children
        }
    }
    fragment body on Product {
        id
        value
        slug
        key
        created_at
        updated_at
    }
    fragment SEO on Product {
        seoTitle {
            id
            value
        }
        seoDescription {
            id
            value
        }
    }
    fragment parent on Product {
        parent: parentable {
            ... on Category {
                id
                value
            }
        }
    }
    fragment children on Product {
        unit {
            id
            value
        }
    }
`

export async function getProducts() {
    const {
        NEXT_PUBLIC_GRAPHQL,
        NEXT_PUBLIC_KEY,
        NEXT_PUBLIC_CONNECTION_NAME,
    } = process.env

    const variables = {
        key: NEXT_PUBLIC_KEY,
    }

    const requestHeaders = {
        ConnectionName: NEXT_PUBLIC_CONNECTION_NAME,
    }

    return request(NEXT_PUBLIC_GRAPHQL, PRODUCTS, variables, requestHeaders)
}

const DELETE_PRODUCT = gql`
    mutation delete_product($id: UUID!) {
        deleteProduct(id: $id) {
            value
        }
    }
`

export async function deleteProduct({ id }) {
    const variables = {
        id,
    }

    await request(NEXT_PUBLIC_GRAPHQL, DELETE_PRODUCT, variables)
    revalidatePath('/products')
}
