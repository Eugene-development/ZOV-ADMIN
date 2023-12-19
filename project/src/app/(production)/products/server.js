'use server'
import { revalidatePath } from 'next/cache'
import { gql, request } from 'graphql-request'
import { v4 as uuidv4 } from 'uuid'

const { NEXT_PUBLIC_GRAPHQL, NEXT_PUBLIC_KEY, NEXT_PUBLIC_CONNECTION_NAME } =
    process.env

const requestHeaders = {
    ConnectionName: NEXT_PUBLIC_CONNECTION_NAME,
}

const PRODUCTS = gql`
    query product {
        product(orderBy: [{ column: CREATED_AT, order: DESC }]) {
            ...body
            ...SEO
            ...parent
            ...children
        }
    }
    fragment body on Product {
        id
        value
        slug
        key
        created_at
        updated_at
    }
    fragment SEO on Product {
        seoTitle {
            id
            value
        }
        seoDescription {
            id
            value
        }
    }
    fragment parent on Product {
        parent: parentable {
            ... on Category {
                id
                value
            }
        }
    }
    fragment children on Product {
        unit {
            id
            value
        }
    }
`

export async function getProducts() {
    const {
        NEXT_PUBLIC_GRAPHQL,
        NEXT_PUBLIC_KEY,
        NEXT_PUBLIC_CONNECTION_NAME,
    } = process.env

    const variables = {
        key: NEXT_PUBLIC_KEY,
    }

    const requestHeaders = {
        ConnectionName: NEXT_PUBLIC_CONNECTION_NAME,
    }

    return request(NEXT_PUBLIC_GRAPHQL, PRODUCTS, variables, requestHeaders)
}

const CREATE_PRODUCT = gql`
    mutation create_product(
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
        createProduct(
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

export async function createProduct(data) {
    const variables = {
        id: uuidv4(),
        key: NEXT_PUBLIC_KEY,
        is_active: true,
        value: data.text,
        slug: data.slug,
        // parentableType: 'menu',
        // parentableId: data.selectedParent,
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
        CREATE_PRODUCT,
        variables,
        requestHeaders,
    )
    revalidatePath('/products')
}

const DELETE_PRODUCT = gql`
    mutation delete_product($id: UUID!) {
        deleteProduct(id: $id) {
            value
        }
    }
`

export async function deleteProduct({ id }) {
    const variables = {
        id,
    }

    await request(NEXT_PUBLIC_GRAPHQL, DELETE_PRODUCT, variables)
    revalidatePath('/products')
}
