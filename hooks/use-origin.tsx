import { useState, useEffect } from "react";

export const useOrigin = () => {
  const [mounted, setMMounted] = useState(false);
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''

  useEffect(() => {
    setMMounted(true);
  }, []);

  if (!mounted) {
    return '';
  }

  return origin;
}