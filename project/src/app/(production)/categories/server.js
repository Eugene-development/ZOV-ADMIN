'use server'
import { revalidatePath } from 'next/cache'
import { gql, request } from 'graphql-request'
import { v4 as uuidv4 } from 'uuid'
// import sortBy from 'lodash/sortBy'

const CATEGORIES = gql`
    query category {
        category(orderBy: [{ column: CREATED_AT, order: DESC }]) {
            id
            value
            key
            created_at
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

    // const categories = data.category.map(
    //     ({ id, value, product, created_at }) => ({
    //         id,
    //         value,
    //         product,
    //         timestamp: new Date(created_at).getTime(),
    //     }),
    // )

    // return sortBy(categories, 'timestamp')
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

export async function createCategory(data) {
    // console.log(data)
    const url = process.env.NEXT_PUBLIC_GRAPHQL
    const variables = {
        id: uuidv4(),
        key: process.env.NEXT_PUBLIC_KEY,
        is_active: true,
        value: data.text,
        slug: data.slug,
        parentableType: 'rubric',
        parentableId: '8297afac-57bf-4886-8767-669e36044390',
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    }
    await request(url, CREATE_CATEGORY, variables, requestHeaders)
    revalidatePath('/categories')
}

const UPDATE_CATEGORY = gql`
    mutation update_category(
        $id: UUID!
        $key: UUID!
        $is_active: Boolean
        $value: String!
        $slug: String
        $parentableType: String
        $parentableId: UUID # $updateSeoDescription: UpdateSeoDescriptionInput!
    ) # $updateSeoTitle: UpdateSeoTitleInput!
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

export async function updateCategory(data) {
    console.log(data)
    const url = process.env.NEXT_PUBLIC_GRAPHQL
    const variables = {
        id: data.id,
        key: process.env.NEXT_PUBLIC_KEY,
        is_active: false,
        value: data.text,
        slug: data.slug,
        parentableType: 'rubric',
        parentableId: process.env.NEXT_PUBLIC_KEY,
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    }

    await request(url, UPDATE_CATEGORY, variables, requestHeaders)
    revalidatePath('/categories')
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
