import { gql, request } from 'graphql-request'

export const CATEGORY = gql`
    query category {
        category {
            value
        }
    }
`
const CREATE_CATEGORY = gql`
    mutation create_category(
        $key: String!
        $is_active: Boolean
        $value: String!
        $slug: String!
        $parentableType: String
        $parentableId: Int!
    ) {
        createCategory(
            input: {
                key: $key
                is_active: $is_active
                value: $value
                slug: $slug
                parentable_type: $parentableType
                parentable_id: $parentableId
            }
        ) {
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
        key: process.env.NEXT_PUBLIC_KEY,
        is_active: false,
        value: "kkkkkkk",
        slug: "kkkkkkk",
        parentableType: "catalog",
        parentableId: 16
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    }

    return await request(url, CREATE_CATEGORY, variables, requestHeaders)
}
