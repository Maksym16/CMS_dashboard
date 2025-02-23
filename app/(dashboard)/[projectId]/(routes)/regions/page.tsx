import prismadb from "@/lib/prismadb";
import RegionClient from "./components/client";
import { RegionColumn } from "./components/columns";
import { format } from 'date-fns'

interface RegionsPageProps {
  params: { projectId: string }
}
const RegionsPage: React.FC<RegionsPageProps> = async ({ params }) => {

  const regions = await prismadb.region.findMany({
    where: {
      projectId: params.projectId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedRegions: RegionColumn[] = regions.map((s) => {
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
        <RegionClient data={formattedRegions}/>
      </div>
    </div>
  )
}

export default RegionsPage;