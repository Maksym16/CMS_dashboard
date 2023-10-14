'use client';

import { Project } from '@prisma/client';
import { useCreateProjectModal } from '@/hooks/use-project-modal';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { useState } from 'react';
import { Check, ChevronsUpDown, Grip, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface ProjectSwitcherProps extends PopoverTriggerProps {
  items: Project[];
}

export default function ProjectSwitcher({
  className,
  items = [],
}: ProjectSwitcherProps) {
  const projectModal = useCreateProjectModal();
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const formatedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentProject = formatedItems.find(
    (project) => project.value === params.projectId
  );

  const onProjectSelect = (project: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${project.value}`);
  };
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            size="sm"
            aria-expanded={open}
            area-aria-label="Select a project"
            className={cn('w-[200px] justify-between', className)}
          >
            <Grip className="mr-2 h-4 w-4" />
            {currentProject?.value
              ? formatedItems.find((project) => project.value === currentProject.value)?.label
              : 'Select project...'}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search project..." />
              <CommandEmpty>No project found...</CommandEmpty>
              <CommandGroup heading="Projects:">
                {formatedItems.map((project) => (
                  <CommandItem
                    key={project.value}
                    onSelect={() => onProjectSelect(project)}
                    className="text-sm"
                  >
                    <Grip className="mr-2 h-4 w-4" />
                    {project.label}
                    <Check
                      className={cn(
                        'ml-auto h-4 w-4',
                        project.value === currentProject?.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    projectModal.onOpen()
                  }}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create new project
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
