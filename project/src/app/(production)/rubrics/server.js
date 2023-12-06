'use server'
import { revalidatePath } from 'next/cache'
import { gql, request } from 'graphql-request'
import { v4 as uuidv4 } from 'uuid'

const RUBRICS = gql`
    query rubric {
        rubric(orderBy: [{ column: VALUE, order: ASC }]) {
            ...body
            ...SEO
            ...parent
            ...children
        }
    }

    fragment body on Rubric {
        id
        value
        slug
        key
        created_at
        updated_at
    }
    fragment SEO on Rubric {
        seoTitle {
            id
            value
        }
        seoDescription {
            id
            value
        }
    }
    fragment parent on Rubric {
        parent: parentable {
            ... on Menu {
                id
                value
            }
        }
    }
    fragment children on Rubric {
        category {
            id
            value
        }
    }
`

export async function getRubrics() {
    const url = process.env.NEXT_PUBLIC_GRAPHQL
    const variables = {
        key: process.env.NEXT_PUBLIC_KEY,
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    }

    return await request(url, RUBRICS, variables, requestHeaders)
}

const CREATE_RUBRIC = gql`
    mutation create_rubric(
        $id: UUID!
        $key: UUID!
        $is_active: Boolean
        $value: String!
        $slug: String!
        # $parentableType: String
        # $parentableId: UUID!
        $createSeoTitle: CreateSeoTitleInput!
        $createSeoDescription: CreateSeoDescriptionInput!
    ) {
        createRubric(
            input: {
                id: $id
                key: $key
                is_active: $is_active
                value: $value
                slug: $slug
                # parentable_type: $parentableType
                # parentable_id: $parentableId
                seoTitle: { create: $createSeoTitle }
                seoDescription: { create: $createSeoDescription }
            }
        ) {
            id
            value
        }
    }
`

export async function createRubric(data) {
    const url = process.env.NEXT_PUBLIC_GRAPHQL
    const variables = {
        id: uuidv4(),
        key: process.env.NEXT_PUBLIC_KEY,
        is_active: true,
        value: data.text,
        slug: data.slug,
        // parentableType: 'menu',
        // parentableId: data.selectedParent,
        createSeoTitle: {
            key: process.env.NEXT_PUBLIC_KEY,
            value: data.title,
        },
        createSeoDescription: {
            key: process.env.NEXT_PUBLIC_KEY,
            value: data.description,
        },
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    }
    await request(url, CREATE_RUBRIC, variables, requestHeaders)
    revalidatePath('/rubrics')
}

const UPDATE_RUBRIC = gql`
    mutation update_rubric(
        $id: UUID!
        $key: UUID!
        $is_active: Boolean
        $value: String!
        $slug: String
        # $parentableType: String
        # $parentableId: UUID
        $updateSeoTitle: UpdateSeoTitleInput!
        $updateSeoDescription: UpdateSeoDescriptionInput!
    ) {
        updateRubric(
            input: {
                id: $id
                key: $key
                is_active: $is_active
                value: $value
                slug: $slug
                # parentable_type: $parentableType
                # parentable_id: $parentableId
                seoTitle: { update: $updateSeoTitle }
                seoDescription: { update: $updateSeoDescription }
            }
        ) {
            value
        }
    }
`

export async function updateRubric(data) {
    const url = process.env.NEXT_PUBLIC_GRAPHQL
    const variables = {
        id: data.id,
        key: process.env.NEXT_PUBLIC_KEY,
        is_active: true,
        value: data.text,
        slug: data.slug,
        // parentableType: 'menu',
        // parentableId: data.selectedParent,
        updateSeoTitle: {
            id: data.idTitle,
            key: process.env.NEXT_PUBLIC_KEY,
            value: data.title,
        },
        updateSeoDescription: {
            id: data.idDescription,
            key: process.env.NEXT_PUBLIC_KEY,
            value: data.description,
        },
    }
    const requestHeaders = {
        ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    }

    await request(url, UPDATE_RUBRIC, variables, requestHeaders)
    revalidatePath('/rubrics')
}

const DELETE_RUBRIC = gql`
    mutation delete_rubric($id: UUID!) {
        deleteRubric(id: $id) {
            value
        }
    }
`

export async function deleteRubric({ id }) {
    const url = process.env.NEXT_PUBLIC_GRAPHQL
    const variables = {
        id,
    }
    // const requestHeaders = {
    //     ConnectionName: process.env.NEXT_PUBLIC_CONNECTION_NAME,
    // }

    await request(url, DELETE_RUBRIC, variables)
    revalidatePath('/rubrics')
}
