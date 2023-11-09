'use client';

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Copy, Server } from 'lucide-react';
import { Badge, BadgeProps } from './badge';
import { Button } from './button';
import toast from 'react-hot-toast';
import { APiAlertProps } from '@/lib/alertsData';

const textMap: Record<APiAlertProps["variant"], string> = {
  public: 'Public',
  admin: "Admin"
}

const variantMap: Record<APiAlertProps["variant"], BadgeProps["variant"]> = {
  public: 'secondary',
  admin: 'destructive'
}

export const ApiAlert: React.FC<APiAlertProps> = ({
  title,
  description,
  variant = 'public'
}) => {

  const onCopy  = () => {
    navigator.clipboard.writeText(description)
    toast.success("API route copied to the clipboard!")
  }
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className='flex items-center gap-3'>
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className='mt-4 flex justify-between items-center'>
        <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
