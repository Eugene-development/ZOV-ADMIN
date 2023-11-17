import { createCategory } from '@/app/(production)/categories/server'

export default function index({ data }) {
    return (
        <button
            onClick={() => createCategory(data)}
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-24 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
        >
            Добавить
        </button>
    )
}
