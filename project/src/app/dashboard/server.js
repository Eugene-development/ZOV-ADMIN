import { gql, request } from 'graphql-request'
import { v4 as uuidv4 } from 'uuid'
import { revalidatePath } from 'next/cache'

const CATEGORY = gql`
    query category {
        category {
            id
            value
        }
    }
`
const CREATE_CATEGORY = gql`
    mutation create_category(
        $id: ID!
        $key: String!
        $is_active: Boolean
        $value: String!
        $slug: String!
        $parentableType: String
        $parentableId: Int!
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

const UPDATE_CATEGORY = gql`
    mutation update_category(
        $id: String!
        $key: String!
        $is_active: Boolean
        $value: String!
        $slug: String
        $parentableType: String
        $parentableId: Int # $updateSeoTitle: UpdateSeoTitleInput!
    ) # $updateSeoDescription: UpdateSeoDescriptionInput!
    {
        updateCategory(
            input: {
                id: $id
                key: $key
                is_active: $is_active
                value: $value
                slug: $slug
                parentable_type: $parentableType
                parentable_id: $parentableId
                # seoTitle: { update: $updateSeoTitle }
                # seoDescription: { update: $updateSeoDescription }
            }
        ) {
            value
        }
    }
`

export const DELETE_CATEGORY = gql`
    mutation delete_category($id: ID!) {
        deleteCategory(id: $id) {
            value
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

    return await request(url, CATEGORY, variables, requestHeaders)
}

export async function createCategory() {
    const url = process.env.NEXT_PUBLIC_GRAPHQL
    const variables = {
        // id: 'ergkmgk',
        id: uuidv4(),
        key: process.env.NEXT_PUBLIC_KEY,
        is_active: true,
        value: 'eeeeeee2',
        slug: 'kkkkkkk',
        parentableType: 'catalog',
        parentableId: 16,
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    }
    // revalidatePath(pathname)
    return await request(url, CREATE_CATEGORY, variables, requestHeaders)
}

export async function updateCategory() {
    const url = process.env.NEXT_PUBLIC_GRAPHQL
    const variables = {
        id: '8c1b0862-4552-4219-a277-9ba40d48bfc9',
        key: process.env.NEXT_PUBLIC_KEY,
        is_active: false,
        value: 'aaaaaaaaâ',
        slug: 'kkkkkkk',
        parentableType: 'catalog',
        parentableId: 16,
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    }

    return await request(url, UPDATE_CATEGORY, variables, requestHeaders)
}

export async function deleteCategory() {
    const url = process.env.NEXT_PUBLIC_GRAPHQL
    const variables = {
        id: '63f2e83a-41b8-4c30-895e-9c4e2368a2f5',
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    }

    return await request(url, DELETE_CATEGORY, variables, requestHeaders)
}
