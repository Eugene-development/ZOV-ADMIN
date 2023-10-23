import { gql, request } from 'graphql-request'
import { v4 as uuidv4 } from 'uuid'

const RUBRICS = gql`
    query rubric {
        rubric {
            id
            value
            key
            category {
                id
                value
            }
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
