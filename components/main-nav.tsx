'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.projectId}`,
      label: 'Dashboard',
      active: pathname === `/${params.projectId}`
    },
    {
      href: `/${params.projectId}/billboards`,
      label: 'Billboards',
      active: pathname === `/${params.projectId}/billboards`
    },
    {
      href: `/${params.projectId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.projectId}/categories`
    },
    {
      href: `/${params.projectId}/sizes`,
      label: 'Sizes',
      active: pathname === `/${params.projectId}/sizes`
    },
    {
      href: `/${params.projectId}/colors`,
      label: 'Colors',
      active: pathname === `/${params.projectId}/colors`
    },
    {
      href: `/${params.projectId}/roast-types`,
      label: 'Roast Types',
      active: pathname === `/${params.projectId}/roast-types`
    },
    {
      href: `/${params.projectId}/products`,
      label: 'Products',
      active: pathname === `/${params.projectId}/products`
    },
    {
      href: `/${params.projectId}/orders`,
      label: 'Orders',
      active: pathname === `/${params.projectId}/orders`
    },
    { 
      href: `/${params.projectId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.projectId}/settings`
    }
  ];

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
    >
      {routes.map(route => (
        <Link 
          key={route.href} 
          href={route.href}
          className={cn('text-sm font-medium transition-colors hover:text-primary',
          route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}