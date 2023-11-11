'use server'
import { gql, request } from 'graphql-request'
import { revalidatePath } from 'next/cache'
const CATEGORIES = gql`
    query category {
        category {
            id
            value
            key
            product {
                id
                value
            }
        }
    }
`

export async function getCategory() {
    const url = process.env.NEXT_PUBLIC_GRAPHQL
    const variables = {
        key: process.env.NEXT_PUBLIC_KEY,
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    }

    return await request(url, CATEGORIES, variables, requestHeaders)
}

const DELETE_CATEGORY = gql`
    mutation delete_category($id: UUID!) {
        deleteCategory(id: $id) {
            value
        }
    }
`

export async function deleteCategory({ id }) {
    // console.log(id)

    const url = process.env.NEXT_PUBLIC_GRAPHQL
    const variables = {
        id,
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
        // 'Content-Type': 'application/json',
    }
    await request(url, DELETE_CATEGORY, variables, requestHeaders)
    revalidatePath('/categories')

    return
}
