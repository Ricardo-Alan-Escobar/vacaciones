import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { BookOpen, Settings , LayoutGrid, TreePalm  } from 'lucide-react';
import AppLogo from './app-logo';
import { usePage } from '@inertiajs/react';

const mainNavItems = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
     {
        title: 'Vacaciones',
        url: '/vacaciones',
        icon: TreePalm ,
    },
    {
        title: 'Configuración',
        url: '/settings/profile',
        icon: Settings  ,
    },
];

const footerNavItems = [
  
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;
    const userRol = auth?.user?.rol;

    const filteredMainNavItems = mainNavItems.filter(item => {
        if (item.title === 'Dashboard' && userRol !== 'admin') {
            return false;
        }
         if (item.title === 'Vacaciones' && userRol === 'admin') {
        return false;
    }
        return true;
    });
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={userRol === 'admin' ? '/dashboard' : '/vacaciones'} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredMainNavItems} />

            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser/>
            </SidebarFooter>
        </Sidebar>
    );
}
