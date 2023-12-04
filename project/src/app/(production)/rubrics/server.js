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
