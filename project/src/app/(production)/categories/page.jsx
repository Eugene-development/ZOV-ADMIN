import { Category } from '@/UI'
import { getCategory, getAllRubric } from './server'

export default async () => {
    const data = await getCategory()
    const allRubric = await getAllRubric()

    return (
        <>
            <Category data={data} allRubric={allRubric} />
        </>
    )
}
