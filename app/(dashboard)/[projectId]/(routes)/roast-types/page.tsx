import prismadb from "@/lib/prismadb";
import RoastTypesClient from "./components/client";
import { RoastTypeColumn } from "./components/columns";
import { format } from 'date-fns'

interface ColorPageProps {
  params: { projectId: string }
}
const RoastTypesPage: React.FC<ColorPageProps> = async ({ params }) => {

  const roastTypes = await prismadb.roastType.findMany({
    where: {
      projectId: params.projectId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedRoastTypes: RoastTypeColumn[] = roastTypes.map((c) => {
    return {
      id: c.id,
      name: c.name,
      value: c.value,
      createdAt: format(c.createdAt, "MMMM do, yyyy")
    }
  })

  return  (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RoastTypesClient data={formattedRoastTypes}/>
      </div>
    </div>
  )
}

export default RoastTypesPage;