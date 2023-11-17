import prismadb from "@/lib/prismadb";
import CategoryClientt from "./components/client";
import { CategoryColumn } from "./components/columns";
import { format } from 'date-fns'

interface CategoriesPageProps {
  params: { projectId: string }
}
const CategoriesPage: React.FC<CategoriesPageProps> = async ({ params }) => {
  const categories = await prismadb.category.findMany({
    where: {
      projectId: params.projectId
    },
    include: {
      billboard: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  const formattedCategories: CategoryColumn[] = categories.map((category) => {
    return {
      id: category.id,
      name: category.name,
      billboardLabel: category.billboard.label,
      createdAt: format(category.createdAt, "MMMM do, yyyy")
    }
  })

  return  (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClientt data={formattedCategories}/>
      </div>
    </div>
  )
}

export default CategoriesPage;