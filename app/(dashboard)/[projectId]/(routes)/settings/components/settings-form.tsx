'use client';

import AlertModal from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Heading from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';

import { Project } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

export interface SettingsFormProps {
  project: Project;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValue = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({ project }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: project,
  });

  const onSubmit = async (data: SettingsFormValue) => {
    setLoading(true)
    console.log(data)
    try {
      await axios.patch(`/api/projects/${params.projectId}`, data)
      router.refresh()
      toast.success('Project has been changed!')
    } catch(e) {
      toast.error('Something went wrong!')
    } finally {
      setLoading(false)
    }
  };

  const onDelete = async () => {
    setLoading(true)
    try {
      await axios.delete(`/api/projects/${params.projectId}`)
      router.refresh()
      router.push('/')
      toast.success('Project has been deleted!')
    } catch(e) {
      toast.error('Something went wrong!')
    } finally {
      setLoading(false)
      setOpen(false)

    }
  }

  return (
    <>
      <AlertModal 
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Project settings" description="Manage your project" />

        <Button disabled={loading} variant="destructive" size="icon" onClick={() => setOpen(true)}>
          <Trash className="h-4 w-4" />
        </Button>
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
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading} placeholder='Enter name...' {...field }
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml - auto' type='submit'>
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SettingsForm;
