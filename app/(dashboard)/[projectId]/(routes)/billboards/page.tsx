import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import BillboardClient from "./components/client";


interface BillboardsPageProps {
  params: { projectId: string }
}
const BillboardsPage: React.FC<BillboardsPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const project = await prismadb.project.findFirst({
    where: {
      id: params.projectId
    }
  })

  if (!project) {
    redirect('/')
  }

  return  (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  )
}

export default BillboardsPage;