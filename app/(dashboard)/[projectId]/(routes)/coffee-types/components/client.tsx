'use client'

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { CoffeeTypeColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-tabel';
import { ApiList } from '@/components/ui/api-list';

interface CoffeeTypeClientProps {
  data: CoffeeTypeColumn[]
}

const CoffeeTypeClient: React.FC<CoffeeTypeClientProps> = ({
  data
}) => {
  const router = useRouter()
  const params = useParams()

  const addNewHandler = () => {
    return router.push(`/${params.projectId}/coffee-types/new`)
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Coffee Types (${data.length})`}
          description='Manage coffee types for your project'
        />
        <Button onClick={addNewHandler}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="name"/>
      <Separator />
      <Heading title={'Coffee Types API'} description='Coffee Types list API'/>
      <ApiList entityName='coffeeTypeId' entityIDName='coffeeTypeId'/>
    </>
  );
}

export default CoffeeTypeClient;
