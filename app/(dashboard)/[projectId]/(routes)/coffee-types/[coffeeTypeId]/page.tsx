import prismadb from '@/lib/prismadb';
import React from 'react';
import CoffeeTypeForm from './components/coffee-type-form';

const CoffeeTypePage = async ({
  params
}: {
  params: { coffeeTypeId: string }
}) => {
  const coffeeType = await prismadb.coffeeType.findUnique({
    where: {
      id: params.coffeeTypeId
    }
  })

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CoffeeTypeForm initialData={coffeeType}/>
      </div>
    </div>
  );
}

export default CoffeeTypePage;
