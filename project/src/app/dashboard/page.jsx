
import { getCategory, createCategory, updateCategory, deleteCategory } from './server'
import { usePathname, useSearchParams } from 'next/navigation'

const Dashboard = async (request) => {
    // const client = getClient()
// const pathname = usePathname()
    // const data = await getCategory()
    const data = await createCategory()
    // const path = request.nextUrl.searchParams.get('path')
    // const data = await updateCategory()
    // const data = await deleteCategory()
    console.log(data)
    // revalidatePath(pathname)
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
