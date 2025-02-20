import prismadb from "@/lib/prismadb";
import ProductClient from "./components/client";
import { ProductColumn } from "./components/columns";
import { format } from 'date-fns'
import { formatter } from "@/lib/utils";



interface ProductsPageProps {
  params: { projectId: string }
}
const ProductsPage: React.FC<ProductsPageProps> = async ({ params }) => {

  const products = await prismadb.product.findMany({
    where: {
      projectId: params.projectId
    },
    include: {
      category: true,
      size: true,
      coffeeType: true,
      roastType: true,
      region: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedProducts: ProductColumn[] = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      price: formatter.format(product.price.toNumber()),
      category: product.category.name,
      size: product.size.name,
      region: product.region.name,
      coffeeType: product.coffeeType.value,
      roastType: product.roastType.value,
      description: product.description,
      createdAt: format(product.createdAt, "MMMM do, yyyy")
    }
  })

  return  (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts}/>
      </div>
    </div>
  )
}

export default ProductsPage;