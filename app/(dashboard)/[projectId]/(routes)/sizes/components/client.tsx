'use client'

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { SizeColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-tabel';
import { ApiList } from '@/components/ui/api-list';

interface SizesClientProps {
  data: SizeColumn[]
}

const SizesClient: React.FC<SizesClientProps> = ({
  data
}) => {
  const router = useRouter()
  const params = useParams()

  const addNewHandler = () => {
    return router.push(`/${params.projectId}/sizes/new`)
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description='Manage sizes for your project'
        />
        <Button onClick={addNewHandler}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="name"/>
      <Separator />
      <Heading title={'Sizes API'} description='Sizes list API'/>
      <ApiList entityName='sizes' entityIDName='sizeId'/>
    </>
  );
}

export default SizesClient;
