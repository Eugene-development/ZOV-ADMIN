'use server'
import { revalidatePath } from 'next/cache'
import { gql, request } from 'graphql-request'
import { v4 as uuidv4 } from 'uuid'

const { NEXT_PUBLIC_GRAPHQL, NEXT_PUBLIC_KEY, NEXT_PUBLIC_CONNECTION_NAME } =
    process.env

const requestHeaders = {
    ConnectionName: NEXT_PUBLIC_CONNECTION_NAME,
}

const CATEGORIES = gql`
    query category {
        category(orderBy: [{ column: VALUE, order: ASC }]) {
            ...body
            ...SEO
            ...parent
            ...children
        }
    }

    fragment body on Category {
        id
        value
        slug
        key
        created_at
        updated_at
    }
    fragment SEO on Category {
        seoTitle {
            id
            value
        }
        seoDescription {
            id
            value
        }
    }
    fragment parent on Category {
        parent: parentable {
            ... on Rubric {
                id
                value
            }
        }
    }
    fragment children on Category {
        product {
            id
            value
        }
    }
`
const ALL_RUBRICS = gql`
    query rubric {
        rubric(orderBy: [{ column: VALUE, order: ASC }]) {
            id
            value
        }
    }
`
export async function getCategory() {
    const variables = {
        key: NEXT_PUBLIC_KEY,
    }
    try {
        return await request(
            NEXT_PUBLIC_GRAPHQL,
            CATEGORIES,
            variables,
            requestHeaders,
        )
    } catch (error) {
        console.error('Error occurred while fetching category:', error)
        throw error
    }
}

export async function getAllRubric() {
    const variables = {
        key: NEXT_PUBLIC_KEY,
    }

    return await request(
        NEXT_PUBLIC_GRAPHQL,
        ALL_RUBRICS,
        variables,
        requestHeaders,
    )
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
        $createSeoTitle: CreateSeoTitleInput!
        $createSeoDescription: CreateSeoDescriptionInput!
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
                seoTitle: { create: $createSeoTitle }
                seoDescription: { create: $createSeoDescription }
            }
        ) {
            id
            value
        }
    }
`

export async function createCategory(data) {
    const variables = {
        id: uuidv4(),
        key: NEXT_PUBLIC_KEY,
        is_active: true,
        value: data.text,
        slug: data.slug,
        parentableType: 'rubric',
        parentableId: data.selectedParent,
        createSeoTitle: {
            key: NEXT_PUBLIC_KEY,
            value: data.title,
        },
        createSeoDescription: {
            key: NEXT_PUBLIC_KEY,
            value: data.description,
        },
    }
    await request(
        NEXT_PUBLIC_GRAPHQL,
        CREATE_CATEGORY,
        variables,
        requestHeaders,
    )
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
        $parentableId: UUID
        $updateSeoTitle: UpdateSeoTitleInput!
        $updateSeoDescription: UpdateSeoDescriptionInput!
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
                seoTitle: { update: $updateSeoTitle }
                seoDescription: { update: $updateSeoDescription }
            }
        ) {
            value
        }
    }
`

export async function updateCategory(data) {
    const variables = {
        id: data.id,
        key: NEXT_PUBLIC_KEY,
        is_active: true,
        value: data.text,
        slug: data.slug,
        parentableType: 'rubric',
        parentableId: data.selectedParent,
        updateSeoTitle: {
            id: data.idTitle,
            key: NEXT_PUBLIC_KEY,
            value: data.title,
        },
        updateSeoDescription: {
            id: data.idDescription,
            key: NEXT_PUBLIC_KEY,
            value: data.description,
        },
    }

    await request(
        NEXT_PUBLIC_GRAPHQL,
        UPDATE_CATEGORY,
        variables,
        requestHeaders,
    )
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
    const variables = {
        id,
    }

    await request(
        NEXT_PUBLIC_GRAPHQL,
        DELETE_CATEGORY,
        variables,
        requestHeaders,
    )
    revalidatePath('/categories')
}
