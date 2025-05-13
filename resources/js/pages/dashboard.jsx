import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import CreateEmpleado from '../components/CreateEmpleado';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <h1 className='text-3xl font-bold p-5 pl-6'>Empleados totales</h1>
                        <div className='flex items-center justify-center'>
                            <p className='text-8xl m-12 text-blue-500'>0</p>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                      <h1 className='text-3xl font-bold p-5 pl-6'>Empleados con vacaciones</h1>
                      <div className='flex items-center justify-center'>
                        <p className='text-8xl m-12 text-green-500'>0</p>
                    </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <h1 className='text-3xl font-bold p-5 pl-6'>Empleados sin vacaciones</h1>
                        <div className='flex items-center justify-center'>
                            <p className='text-8xl m-12 text-red-500'>0</p>
                        </div>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    
                    <div className='flex items-center justify-between border-b border-b-border/70 p-4'>
                        <h1 className='text-3xl font-bold p-5 pl-6'>Lista de Empleados</h1>
                        <CreateEmpleado />
                        </div>
                </div>
            </div>
        </AppLayout>
    );
}
