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

const UPDATE_CATEGORY = gql`
    mutation update_category(
        $id: UUID!
        $key: String!
        $is_active: Boolean
        $value: String!
        $slug: String
        $parentableType: String
        $parentableId: UUID # $updateSeoDescription: UpdateSeoDescriptionInput!
        # $updateSeoTitle: UpdateSeoTitleInput!
    ) {
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
    mutation delete_category($id: UUID!) {
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
    // revalidatePath(pathname)
    return await request(url, CREATE_CATEGORY, variables, requestHeaders)
}

export async function updateCategory() {
    const url = process.env.NEXT_PUBLIC_GRAPHQL
    const variables = {
        id: 'b10f0921-45b0-4aa1-b022-8b1dcc2faa95',
        key: process.env.NEXT_PUBLIC_KEY,
        is_active: false,
        value: 'aaaaaaaaâ',
        slug: 'kkkkkkk',
        parentableType: 'catalog',
        parentableId: '8297afac-57bf-4886-8767-669e36044390',
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    }

    return await request(url, UPDATE_CATEGORY, variables, requestHeaders)
}

export async function deleteCategory() {
    const url = process.env.NEXT_PUBLIC_GRAPHQL
    const variables = {
        id: '77fcf4c6-3d19-4648-b187-e042d7b41c1f',
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    }

    return await request(url, DELETE_CATEGORY, variables, requestHeaders)
}
