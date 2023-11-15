'use client'

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Billboard } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { BillboardColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-tabel';
import { ApiList } from '@/components/ui/api-list';

interface BillboardClientProps {
  data: BillboardColumn[]
}

const BillboardClient: React.FC<BillboardClientProps> = ({
  data
}) => {
  const router = useRouter()
  const params = useParams()

  const addNewHandler = () => {
    return router.push(`/${params.projectId}/billboards/new`)
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description='Manage billboards for your project'
        />
        <Button onClick={addNewHandler}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="label"/>
      <Separator />
      <Heading title={'Billboards API'} description='Billboards list API'/>
      <ApiList entityName='billboards' entityIDName='billboardId'/>
    </>
  );
}

export default BillboardClient;
