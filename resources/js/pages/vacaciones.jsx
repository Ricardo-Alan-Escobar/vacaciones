import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Button } from "/resources/js/components/ui/button.jsx";
import { Plus} from 'lucide-react';


const breadcrumbs = [
    {
        title: 'Vacaciones',
        href: '/vacaciones',
    },
];

export default function Vacaciones() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vacaciones" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
    <div className="bg-white dark:bg-[#171717] p-6 rounded-xl shadow-md flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Días Disponibles</h2>
        <p className="text-4xl font-bold text-gray-900 dark:text-green-400">0</p>
    </div>

    <div className="bg-white dark:bg-[#171717] p-6 rounded-xl shadow-md flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Días Usados</h2>
        <p className="text-4xl font-bold text-green-600 dark:text-red-600">0</p>
    </div>
</div>


                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    
                    <div className='flex items-center justify-between border-b border-b-border/70 p-4'>
                        <h1 className='text-3xl font-bold p-5 pl-6'>Mis Solicitudes</h1>
                        <Button size="lg" className="cursor-pointer"><Plus />Solicitar Vacaciones</Button>
                        </div>
                </div>
            </div>
        </AppLayout>
    );
}