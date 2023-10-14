import { useQuery, gql } from '@apollo/client'
import { getClient } from '@/lib/ApolloClient'
import { getCategory, createCategory } from './server'

const Dashboard = async () => {
    const client = getClient()
    // const { data } = await client.query(CATEGORY)
    // const { loading, data } = useQuery (CATEGORY) ;
    // const data = await getCategory()
    const data = await createCategory()
    console.log(data)
    return (
        <>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            Вы авторизованы!
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
