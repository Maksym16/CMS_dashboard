'use client'

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { RoastTypeColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-tabel';
import { ApiList } from '@/components/ui/api-list';

interface RoastTypesClientProps {
  data: RoastTypeColumn[]
}

const RoastTypesClient: React.FC<RoastTypesClientProps> = ({
  data
}) => {
  const router = useRouter()
  const params = useParams()

  const addNewHandler = () => {
    return router.push(`/${params.projectId}/roast-types/new`)
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Roast Types (${data.length})`}
          description='Manage roast types for your project'
        />
        <Button onClick={addNewHandler}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="name"/>
      <Separator />
      <Heading title={'Roast types API'} description='Roast types list API'/>
      <ApiList entityName='roastTypes' entityIDName='roastTypeId'/>
    </>
  );
}

export default RoastTypesClient;
