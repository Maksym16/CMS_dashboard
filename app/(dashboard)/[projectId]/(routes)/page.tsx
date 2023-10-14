import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: { projectId: string }
}
const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const project = await prismadb.project.findFirst({
    where: {
      id: params.projectId
    }
  })

  return  (
    <div>
      Active project: {project?.name}
    </div>
  )
}

export default DashboardPage;