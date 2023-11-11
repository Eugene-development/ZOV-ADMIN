import { deleteCategory } from '@/app/(production)/categories/server'

export default id => {
    return (
        <div>
            <form action={deleteCategory.bind(null, id)}>
                <input
                    type="submit"
                    value="Удалить"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                />
            </form>
        </div>
    )
}
