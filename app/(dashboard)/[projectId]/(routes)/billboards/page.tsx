import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import BillboardClient from "./components/client";
import { BillboardColumn } from "./components/columns";
import { format } from 'date-fns'

interface BillboardsPageProps {
  params: { projectId: string }
}
const BillboardsPage: React.FC<BillboardsPageProps> = async ({ params }) => {

  const billboards = await prismadb.billboard.findMany({
    where: {
      projectId: params.projectId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const  formattedBillboards: BillboardColumn[] = billboards.map((billboard) => {
    return {
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, "MMMM do, yyyy")
    }
  })

  return  (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards}/>
      </div>
    </div>
  )
}

export default BillboardsPage;