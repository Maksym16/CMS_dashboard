'use client';

import { useState, useEffect } from 'react';

import { CreateProjectModal } from '@/components/modals/create-project-modal';

export const ModalProvider = () => {
  //in order to avoid hydretion errors beatween server and client side rendering we need this check
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateProjectModal />
    </>
  )
}