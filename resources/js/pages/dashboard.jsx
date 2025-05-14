import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import CreateEmpleado from '../components/CreateEmpleado';
import EditEmpleadoModal from '../components/editEmpleadoModal';
import { Button, buttonVariants } from "/resources/js/components/ui/button.jsx";
import { Trash, Edit } from 'lucide-react';

export default function Dashboard({ empleados }) {
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);
    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

    const handleEdit = (empleado) => {
        setSelectedEmpleado(empleado);
        setShowModal(true); // Muestra el modal cuando se hace clic en "Editar"
    };

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
            router.delete(`/empleados/${id}`);
        }
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
                    <p className="text-4xl font-bold text-red-600 dark:text-red-400">{empleados.filter(e => !e.tiene_vacaciones).length}</p>
                  </div>
                </div>


                {/* Tabla de empleados */}
                <div className="border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl md:min-h-min">
                    <div className="flex items-center justify-between border-b border-b-border/70 p-4">
                        <h1 className="text-3xl font-bold p-5 pl-6">Lista de Empleados</h1>
                        <CreateEmpleado />
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
                                {empleados.map((emp, idx) => (
                                    <tr key={idx} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
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
                                               <Edit /> Editar
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(emp.id)}
                                               variant="destructive"
                                               
                                            >
                                               <Trash /> Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal de edición */}
            {showModal && selectedEmpleado && (
                <EditEmpleadoModal
                    empleado={selectedEmpleado} // Pasa el empleado seleccionado al modal
                    onClose={() => setShowModal(false)} // Cierra el modal
                />
            )}
        </AppLayout>
    );
}
