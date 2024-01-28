import { UserButton, auth } from '@clerk/nextjs';
import { MainNav } from '@/components/main-nav';
import ProjectSwitcher from '@/components/project-switcher';
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import { ModeToggle } from './ui/mode-toggle';

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }
  const projects = await prismadb.project.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <ProjectSwitcher items={projects} />
        <MainNav className="px-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
