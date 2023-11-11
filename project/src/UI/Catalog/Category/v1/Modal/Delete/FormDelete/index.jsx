import {
    deleteCategory,
} from '@/app/(production)/categories/server'

export default (id) => {
  return (
    <form action={deleteCategory.bind(null, id)}>
        <input type="submit" value="Удалить"/>
    </form>
  )
}
