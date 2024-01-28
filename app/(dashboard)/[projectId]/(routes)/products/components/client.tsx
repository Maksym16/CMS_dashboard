'use client'

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Billboard } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { ProductColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-tabel';
import { ApiList } from '@/components/ui/api-list';

interface ProductClientProps {
  data: ProductColumn[]
}

const ProductClient: React.FC<ProductClientProps> = ({
  data
}) => {
  const router = useRouter()
  const params = useParams()

  const addNewHandler = () => {
    return router.push(`/${params.projectId}/products/new`)
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description='Manage products for your project'
        />
        <Button onClick={addNewHandler}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="name"/>
      <Heading title={'Products API'} description='Products list API'/>
      <Separator />
      <ApiList entityName='products' entityIDName='productId'/>
    </>
  );
}

export default ProductClient;
