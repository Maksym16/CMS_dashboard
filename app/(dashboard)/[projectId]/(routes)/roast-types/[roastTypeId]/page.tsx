import prismadb from '@/lib/prismadb';
import React from 'react';
import RoastTypeForm from './components/roast-type-form';

const RoastTypePage = async ({
  params
}: {
  params: { roastTypeId: string }
}) => {
  const roastType = await prismadb.roastType.findUnique({
    where: {
      id: params.roastTypeId
    }
  })

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RoastTypeForm initialData={roastType}/>
      </div>
    </div>
  );
}

export default RoastTypePage;
