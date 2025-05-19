import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Button } from "/resources/js/components/ui/button.jsx";
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CreateSolicitudVacacionesModal from '../components/CreateSolicitudVacacionesModal.jsx';

const breadcrumbs = [
    {
        title: 'Vacaciones',
        href: '/vacaciones',
    },
];

export default function Vacaciones() {
   
    const { empleado, vacaciones  } = usePage().props;
     const [showModal, setShowModal] = useState(false);

    const diasDisponibles = empleado?.dias_vacaciones || 0;
    const diasUsados = empleado?.dias_usados || 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vacaciones" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    <div className="bg-white dark:bg-[#171717] p-6 rounded-xl shadow-md flex flex-col items-center">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Días Disponibles</h2>
                        <p className="text-4xl font-bold text-gray-900 dark:text-green-400">{diasDisponibles}</p>
                    </div>

                    <div className="bg-white dark:bg-[#171717] p-6 rounded-xl shadow-md flex flex-col items-center">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Días Usados</h2>
                        <p className="text-4xl font-bold text-green-600 dark:text-red-600">{diasUsados}</p>
                    </div>
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className='flex items-center justify-between border-b border-b-border/70 p-4'>
                        <h1 className='text-3xl font-bold p-5 pl-6'>Mis Solicitudes</h1>
                       <CreateSolicitudVacacionesModal
                    empleadoId={empleado?.id}
                     diasDisponibles={diasDisponibles}
                    onClose={() => setShowModal(false)}
                />
                    </div>
                    <div className="p-4">
    <h2 className="text-2xl font-semibold mb-4">Historial de Solicitudes</h2>
    <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-[#222]">
                <tr>
                    <th className="px-4 py-2 text-left">Motivo</th>
                    <th className="px-4 py-2 text-left">Fecha Inicio</th>
                    <th className="px-4 py-2 text-left">Fecha Fin</th>
                    <th className="px-4 py-2 text-left">Días</th>
                    <th className="px-4 py-2 text-left">Estado</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {vacaciones.map((v, index) => (
                    <tr key={index}>
                        <td className="px-4 py-2">{v.motivo}</td>
                        <td className="px-4 py-2">{v.fecha_inicio}</td>
                        <td className="px-4 py-2">{v.fecha_fin}</td>
                        <td className="px-4 py-2">{v.dias}</td>
                        <td className="px-4 py-2 capitalize">{v.estado}</td>
                    </tr>
                ))}
                {vacaciones.length === 0 && (
                    <tr>
                        <td colSpan="5" className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                            No hay solicitudes registradas.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
      
    </div>
</div>
                </div>
            </div>
        </AppLayout>
    );
}