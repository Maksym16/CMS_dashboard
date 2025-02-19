import prismadb from "@/lib/prismadb";
import CoffeeTypeClient from "./components/client";
import { CoffeeTypeColumn } from "./components/columns";
import { format } from 'date-fns'

interface CoffeeTypePageProps {
  params: { projectId: string }
}
const CoffeeTypesPage: React.FC<CoffeeTypePageProps> = async ({ params }) => {

  const coffeeTypes = await prismadb.coffeeType.findMany({
    where: {
      projectId: params.projectId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedCoffeeTypes: CoffeeTypeColumn[] = coffeeTypes.map((c) => {
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
        <CoffeeTypeClient data={formattedCoffeeTypes}/>
      </div>
    </div>
  )
}

export default CoffeeTypesPage;