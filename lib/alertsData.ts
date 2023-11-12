export  interface APiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
} 

export const alertsData: Record<string, APiAlertProps> = {
  settingsForm: {
    title: 'NEXT_PUBLIC_API_URL',
    description: 'settings',
    variant: 'public'
  }
}