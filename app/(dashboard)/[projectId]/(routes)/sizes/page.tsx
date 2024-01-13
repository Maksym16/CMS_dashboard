import prismadb from "@/lib/prismadb";
import SizeClient from "./components/client";
import { SizeColumn } from "./components/columns";
import { format } from 'date-fns'

interface SizePageProps {
  params: { projectId: string }
}
const SizesPage: React.FC<SizePageProps> = async ({ params }) => {

  const sizes = await prismadb.size.findMany({
    where: {
      projectId: params.projectId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedSizes: SizeColumn[] = sizes.map((s) => {
    return {
      id: s.id,
      name: s.name,
      value: s.value,
      createdAt: format(s.createdAt, "MMMM do, yyyy")
    }
  })

  return  (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes}/>
      </div>
    </div>
  )
}

export default SizesPage;