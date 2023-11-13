'use server'
import { revalidatePath } from 'next/cache'
import { gql, request } from 'graphql-request'
import { v4 as uuidv4 } from 'uuid'

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

const CREATE_CATEGORY = gql`
    mutation create_category(
        $id: UUID!
        $key: UUID!
        $is_active: Boolean
        $value: String!
        $slug: String!
        $parentableType: String
        $parentableId: UUID!
    ) {
        createCategory(
            input: {
                id: $id
                key: $key
                is_active: $is_active
                value: $value
                slug: $slug
                parentable_type: $parentableType
                parentable_id: $parentableId
            }
        ) {
            id
            value
        }
    }
`

export async function createCategory() {
    const url = process.env.NEXT_PUBLIC_GRAPHQL
    const variables = {
        id: uuidv4(),
        key: process.env.NEXT_PUBLIC_KEY,
        is_active: true,
        value: 'eeeeeee2',
        slug: 'kkkkkkk',
        parentableType: 'catalog',
        parentableId: '8297afac-57bf-4886-8767-669e36044390',
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    }
    return await request(url, CREATE_CATEGORY, variables, requestHeaders)
}

const DELETE_CATEGORY = gql`
    mutation delete_category($id: UUID!) {
        deleteCategory(id: $id) {
            value
        }
    }
`

export async function deleteCategory({ id }) {
    const url = process.env.NEXT_PUBLIC_GRAPHQL
    const variables = {
        id,
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    }

    await request(url, DELETE_CATEGORY, variables, requestHeaders)
    revalidatePath('/categories')
}
