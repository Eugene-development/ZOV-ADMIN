import { Rubric } from '@/UI'
import { getRubrics } from './server'

export default async () => {
    const data = await getRubrics()

    return (
        <>
            <Rubric data={data} />
        </>
    )
}
