'use client';

import AlertModal from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Heading from '@/components/ui/heading';
import ImageUpload from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';

import { Region } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

export interface RegionFormProps {
  initialData: Region | null;
}

type RegionFormValue = z.infer<typeof formSchema>;

const RegionForm: React.FC<RegionFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit region' : 'Create region';
  const description = initialData ? 'Edit a region' : 'Add a new region';
  const toastMessage = initialData ? 'Region updated' : 'Region created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<RegionFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (data: RegionFormValue) => {
    setLoading(true);
    try {
      if (initialData) {
        await axios.patch(`/api/${params.projectId}/regions/${params.regionId}`, data);
      } else {
        await axios.post(`/api/${params.projectId}/regions`, data);
      }
      router.refresh();
      router.push(`/${params.projectId}/regions`)
      toast.success(toastMessage);
    } catch (e) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/${params.projectId}/regions/${params.regionId}`);
      router.refresh();
      router.push(`/${params.projectId}/regions`);
      toast.success('Region has been deleted!');
    } catch (e) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter region name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter region value"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default RegionForm;
