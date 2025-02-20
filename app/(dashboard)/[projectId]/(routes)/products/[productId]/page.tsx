import prismadb from '@/lib/prismadb';
import React from 'react';
import ProductForm from './components/product-form';

const ProductPage = async ({
  params,
}: {
  params: { productId: string; projectId: string };
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      projectId: params.projectId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      projectId: params.projectId,
    },
  });

  const coffeeTypes = await prismadb.coffeeType.findMany({
    where: {
      projectId: params.projectId,
    },
  });

  const roastTypes = await prismadb.roastType.findMany({
    where: {
      projectId: params.projectId,
    },
  });

  const regions = await prismadb.region.findMany({
    where: {
      projectId: params.projectId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          sizes={sizes}
          coffeeTypes={coffeeTypes}
          roastTypes={roastTypes}
          regions={regions}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
