import prismadb from "@/lib/prismadb";

export const getStockCount = async (projectId: string) => {
  const stockCount = await prismadb.product.count({
    where: {
      projectId,
      isArchived: false,
    }
  });

  return stockCount;
};