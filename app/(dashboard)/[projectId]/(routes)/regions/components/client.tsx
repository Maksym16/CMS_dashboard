'use client'

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { RegionColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-tabel';
import { ApiList } from '@/components/ui/api-list';

interface RegionClientProps {
  data: RegionColumn[]
}

const RegionClient: React.FC<RegionClientProps> = ({
  data
}) => {
  const router = useRouter()
  const params = useParams()

  const addNewHandler = () => {
    return router.push(`/${params.projectId}/regions/new`)
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Regions (${data.length})`}
          description='Manage regions for your project'
        />
        <Button onClick={addNewHandler}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="name"/>
      <Separator />
      <Heading title={'Regions API'} description='Regions list API'/>
      <ApiList entityName='regions' entityIDName='regionId'/>
    </>
  );
}

export default RegionClient;
