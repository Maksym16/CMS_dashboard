import prismadb from "@/lib/prismadb";

export const getSalesCount = async (projectId: string) => {
  const salesCount = await prismadb.order.count({
    where: {
      projectId,
      isPaid: true
    },
  });

  return salesCount;
};