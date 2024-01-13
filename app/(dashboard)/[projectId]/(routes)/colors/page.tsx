import prismadb from "@/lib/prismadb";
import ColorClient from "./components/client";
import { ColorColumn } from "./components/columns";
import { format } from 'date-fns'

interface ColorPageProps {
  params: { projectId: string }
}
const ColorsPage: React.FC<ColorPageProps> = async ({ params }) => {

  const colors = await prismadb.color.findMany({
    where: {
      projectId: params.projectId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedColors: ColorColumn[] = colors.map((c) => {
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
        <ColorClient data={formattedColors}/>
      </div>
    </div>
  )
}

export default ColorsPage;