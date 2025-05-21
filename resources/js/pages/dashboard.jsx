import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import CreateEmpleado from '../components/CreateEmpleado';
import EditEmpleadoModal from '../components/editEmpleadoModal';
import { Button } from "/resources/js/components/ui/button.jsx";
import { Input } from "/resources/js/components/ui/input.jsx";
import { Trash, Edit, Search, ChevronLeft, ChevronRight, CircleX    } from 'lucide-react';
import Swal from 'sweetalert2';
import SolicitudesGlobales from '../components/SolicitudesGlobales';
import CalendarioMexico from '../components/CalendarioMexico';

export default function Dashboard({ empleados, vacaciones }) {
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmpleados, setFilteredEmpleados] = useState(empleados);
    
    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 8;
    const totalPages = Math.ceil(filteredEmpleados.length / rowsPerPage);
    
    
    const getCurrentEmpleados = () => {
        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        return filteredEmpleados.slice(indexOfFirstRow, indexOfLastRow);
    };

    
    useEffect(() => {
        const results = empleados.filter(empleado =>
            empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEmpleados(results);
        setCurrentPage(1); 
    }, [searchTerm, empleados]);

    const handleEdit = (empleado) => {
        setSelectedEmpleado(empleado);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡Esta acción no se puede deshacer!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: document.documentElement.classList.contains('dark') ? '#171717' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#111827',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/empleados/${id}`, {
                    onSuccess: () => {
                        Swal.fire({
                            title: '¡Eliminado!',
                            text: 'El empleado ha sido eliminado.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false,
                            background: document.documentElement.classList.contains('dark') ? '#171717' : '#fff',
                            color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#111827',
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: 'Error',
                            text: 'Ocurrió un error al eliminar el empleado.',
                            icon: 'error',
                            background: document.documentElement.classList.contains('dark') ? '#171717' : '#fff',
                            color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#111827',
                        });
                    }
                });
            }
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Tarjetas resumen */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="bg-white dark:bg-[#171717] p-6 rounded-xl shadow-md flex flex-col items-center">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Empleados Totales</h2>
                        <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">{empleados.length}</p>
                    </div>

                    <div className="bg-white dark:bg-[#171717] p-6 rounded-xl shadow-md flex flex-col items-center">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Con Vacaciones</h2>
                        <p className="text-4xl font-bold text-green-600 dark:text-green-400">{empleados.filter(e => e.tiene_vacaciones).length}</p>
                    </div>

                    <div className="bg-white dark:bg-[#171717] p-6 rounded-xl shadow-md flex flex-col items-center">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Sin Vacaciones</h2>
                        <p className="text-4xl font-bold text-red-600 dark:text-red-400">{empleados.filter(e => !e.dias_vacaciones).length}</p>
                    </div>
                </div>

                {/* Tabla de empleados */}
                <div className="border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl md:min-h-min">
                    <div className="flex items-center justify-between border-b border-b-border/70 p-4">
                        <h1 className="text-3xl font-bold p-5 pl-6">Lista de Empleados</h1>
                        <CreateEmpleado />
                    </div>

                    {/* Barra de búsqueda */}
                    <div className="p-4 flex items-center">
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                type="text"
                                placeholder="Buscar por nombre..."
                                className="pl-10 w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
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

                    <div className="overflow-x-auto p-4">
                        <table className="min-w-full border text-sm text-left">
                            <thead className="bg-gray-100 dark:bg-[#171717] text-gray-700 dark:text-gray-300">
                                <tr>
                                    <th className="px-4 py-2 border">Nombre</th>
                                    <th className="px-4 py-2 border">Puesto</th>
                                    <th className="px-4 py-2 border">Fecha de ingreso</th>
                                    <th className="px-4 py-2 border">Correo</th>
                                    <th className="px-4 py-2 border">Vacaciones</th>
                                    <th className="px-4 py-2 border">Días</th>
                                    <th className="px-4 py-2 border">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmpleados.length > 0 ? (
                                    getCurrentEmpleados().map((emp, idx) => (
                                        <tr key={idx} className="border-b hover:bg-gray-50 dark:hover:bg-[#21211f]">
                                            <td className="px-4 py-2 border">{emp.nombre}</td>
                                            <td className="px-4 py-2 border">{emp.puesto || '-'}</td>
                                            <td className="px-4 py-2 border">{emp.fecha_ingreso}</td>
                                            <td className="px-4 py-2 border">{emp.correo}</td>
                                            <td className="px-4 py-2 border">{emp.tiene_vacaciones ? 'Sí' : 'No'}</td>
                                            <td className="px-4 py-2 border">
                                                {emp.tiene_vacaciones ? emp.dias_vacaciones : '-'}
                                            </td>
                                            <td className="px-4 py-2 border space-x-2">
                                                <Button
                                                    onClick={() => handleEdit(emp)}
                                                    variant="secondary"
                                                >
                                                    <Edit className="h-4 w-4 mr-1" /> Editar
                                                </Button>
                                                <Button
                                                    onClick={() => handleDelete(emp.id)}
                                                    variant="destructive"
                                                >
                                                    <Trash className="h-4 w-4 mr-1" /> Eliminar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            No se encontraron empleados con ese nombre
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        
                        {/* Controles de paginación */}
                       
                    </div>
                     {filteredEmpleados.length > 0 && (
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
                                            <span className="font-medium">
                                                {Math.min(currentPage * rowsPerPage, filteredEmpleados.length)}
                                            </span>{" "}
                                            de <span className="font-medium">{filteredEmpleados.length}</span> resultados
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
                                                
                                                // Lógica para mostrar páginas cercanas a la actual
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
                {/* Solicitudes globales */}
                 <SolicitudesGlobales vacaciones={vacaciones} />

                  <div className="bg-white dark:bg-[#171717] p-6 rounded-xl shadow-md flex justify-center items-center">
                                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Aqui puedes ver los días festivos</h2>
                                </div>
                                <CalendarioMexico />
            </div>

            {/* Modal de edición */}
            {showModal && selectedEmpleado && (
                <EditEmpleadoModal
                    empleado={selectedEmpleado}
                    onClose={() => setShowModal(false)}
                />
            )}
           
        </AppLayout>
    );
}