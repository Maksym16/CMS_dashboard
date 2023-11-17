import prismadb from '@/lib/prismadb';
import React from 'react';
import CategoryForm from './components/categoty-form';

const CategoryPage = async ({
  params
}: {
  params: { categoryId: string, projectId: string }
}) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId
    }
  })

  const billboards = await prismadb.billboard.findMany({
    where: {
      projectId: params.projectId
    }
  })

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards}/>
      </div>
    </div>
  );
}

export default CategoryPage;
