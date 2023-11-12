'use client'

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

interface BillboardClientProps {

}

const BillboardClient: React.FC<BillboardClientProps> = (props) => {
  const router = useRouter()
  const params = useParams()

  const addNewHandler = () => {
    return router.push(`/${params.projectId}/billboards/new`)
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards (0)"
          description='Manage billboards for your project'
        />
        <Button onClick={addNewHandler}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
    </>
  );
}

export default BillboardClient;
