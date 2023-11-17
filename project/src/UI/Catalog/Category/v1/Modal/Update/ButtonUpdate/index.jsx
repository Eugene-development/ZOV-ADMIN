import { updateCategory } from '@/app/(production)/categories/server'

export default function index({ data }) {
    return (
        <button
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-24 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
            onClick={() => updateCategory(data)}
        >
            Обновить
        </button>
    )
}
