import { gql, request } from 'graphql-request'

export const CATEGORY = gql`
    query category {
		category{
      value
    }
	}
`

export async function getCategory() {
	const url = process.env.NEXT_PUBLIC_GRAPHQL
	const variables = {
		key: '1',

	}
	return await request(url, CATEGORY, variables)
}