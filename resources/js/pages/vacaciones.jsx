import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Button } from "/resources/js/components/ui/button.jsx";
import { Input } from "/resources/js/components/ui/input.jsx";
import { Plus, ChevronLeft, ChevronRight, Search, CircleX } from 'lucide-react';
import { useState } from 'react';
import CreateSolicitudVacacionesModal from '../components/CreateSolicitudVacacionesModal.jsx';
import CalendarioMexico from '../components/CalendarioMexico.jsx';

const breadcrumbs = [
    {
        title: 'Vacaciones',
        href: '/vacaciones',
    },
];

export default function Vacaciones() {

    const { empleado, vacaciones } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const diasDisponibles = empleado?.dias_vacaciones || 0;
    const diasUsados = empleado?.dias_usados || 0;

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

   const filteredVacaciones = [...vacaciones]
    .reverse()
    .filter(v => v.motivo?.toLowerCase().includes(searchTerm.toLowerCase()));


    const totalPages = Math.ceil(filteredVacaciones.length / rowsPerPage);
    const paginatedVacaciones = filteredVacaciones.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

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

      
                    <div className="p-4 flex items-center">
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                type="text"
                                placeholder="Buscar por motivo..."
                                className="pl-10 w-full"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reinicia paginación al buscar
                                }}
                            />
                        </div>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="cursor-pointer ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <CircleX />
                            </button>
                        )}
                    </div>

                    <div className="p-4">
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
                                    {paginatedVacaciones.map((v, index) => (
                                        <tr key={index} className='hover:bg-gray-50 dark:hover:bg-[#21211f]'>
                                            <td className="px-4 py-2 border-r">{v.motivo}</td>
                                            <td className="px-4 py-2 border-r">{v.fecha_inicio}</td>
                                            <td className="px-4 py-2 border-r">{v.fecha_fin}</td>
                                            <td className="px-4 py-2 border-r">{v.dias}</td>
                                           <td className="px-4 py-2">
                                          <span
                                            className={`inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full ${
                                              v.estado === 'pendiente'
                                                ? 'bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-200'
                                                : v.estado === 'aprobado'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                                : v.estado === 'rechazado'
                                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                                            }`}
                                          >
                                            {v.estado}
                                          </span>
                                        </td>
                                        </tr>
                                    ))}
                                    {filteredVacaciones.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                                                No hay solicitudes registradas.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {filteredVacaciones.length > 0 && (
                            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#171717] px-4 py-3 sm:px-6 mt-4 rounded-b-lg">
                                <div className="flex flex-1 justify-between sm:hidden">
                                    <Button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        variant="outline"
                                        size="sm"
                                    >
                                        Anterior
                                    </Button>
                                    <Button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        variant="outline"
                                        size="sm"
                                    >
                                        Siguiente
                                    </Button>
                                </div>
                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            Mostrando <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> a{" "}
                                            <span className="font-medium">{Math.min(currentPage * rowsPerPage, filteredVacaciones.length)}</span>{" "}
                                            de <span className="font-medium">{filteredVacaciones.length}</span> resultados
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                            <Button
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                variant="outline"
                                                size="icon"
                                                className="rounded-l-md"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </Button>
                                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                let pageNumber;
                                                if (totalPages <= 5) {
                                                    pageNumber = i + 1;
                                                } else if (currentPage <= 3) {
                                                    pageNumber = i + 1;
                                                } else if (currentPage >= totalPages - 2) {
                                                    pageNumber = totalPages - 4 + i;
                                                } else {
                                                    pageNumber = currentPage - 2 + i;
                                                }

                                                return (
                                                    <Button
                                                        key={pageNumber}
                                                        onClick={() => setCurrentPage(pageNumber)}
                                                        variant={currentPage === pageNumber ? "default" : "outline"}
                                                        size="icon"
                                                        className="h-8 w-8"
                                                    >
                                                        {pageNumber}
                                                    </Button>
                                                );
                                            })}
                                            <Button
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                variant="outline"
                                                size="icon"
                                                className="rounded-r-md"
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-white dark:bg-[#171717] p-6 rounded-xl shadow-md flex justify-center items-center">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Aqui puedes ver los días festivos</h2>
                    </div>
                    <CalendarioMexico />

            </div>
        </AppLayout>
    );
}
