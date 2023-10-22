import { gql, request } from 'graphql-request'
import { v4 as uuidv4 } from 'uuid'

const CATEGORY = gql`
    query category {
        category {
            value
        }
    }
`
const CREATE_CATEGORY = gql`
    mutation create_category(
        $id: String!
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
        id: uuidv4(),
        key: process.env.NEXT_PUBLIC_KEY,
        is_active: true,
        value: '999',
        slug: 'kkkkkkk',
        parentableType: 'catalog',
        parentableId: 16,
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    }

    return await request(url, CREATE_CATEGORY, variables, requestHeaders)
}

export async function updateCategory() {
    const url = process.env.NEXT_PUBLIC_GRAPHQL
    const variables = {
        id: 'oo36d92r-b456-4106-b01f-e6fe7ca178a7',
        key: process.env.NEXT_PUBLIC_KEY,
        is_active: false,
        value: 'uiuiuiuiuiu',
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
        id: '4',
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    }

    return await request(url, DELETE_CATEGORY, variables, requestHeaders)
}
