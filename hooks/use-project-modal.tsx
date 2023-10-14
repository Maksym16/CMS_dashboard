import { create } from 'zustand';

interface IUseCreateProjectModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateProjectModal = create<IUseCreateProjectModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false})
}))