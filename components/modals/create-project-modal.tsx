'use client';

import { useCreateProjectModal } from '@/hooks/use-store-modal';
import { Modal } from '@/components/ui/modal';

export const CreateProjectModal = () => {
  const createProjectModal = useCreateProjectModal();

  return (
    <Modal
      title="Create project"
      description="Add a new project to manage your content"
      isOpen={createProjectModal.isOpen}
      onClose={createProjectModal.onClose}
    >
      create project form
    </Modal>
  );
};
