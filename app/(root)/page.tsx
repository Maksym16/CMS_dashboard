
'use client';
import { useEffect } from "react";

import { useCreateProjectModal } from "@/hooks/use-store-modal";

const SetupPage = () => {
  const onOpen = useCreateProjectModal((state) => state.onOpen);
  const isOpen = useCreateProjectModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])
  
  return (
    <div>
      Root page'
    </div>
  );
}

export default SetupPage;
