import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from "/resources/js/components/ui/button.jsx";
import { Input } from "/resources/js/components/ui/input.jsx";
import { CircleCheckBig, CircleX, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Swal from 'sweetalert2';

export default function SolicitudesGlobales({ vacaciones }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 5;

  const filteredData = vacaciones.slice().reverse().filter((v) => {
  const nombre = v.empleado?.user?.name?.toLowerCase() || '';
  const correo = v.empleado?.user?.email?.toLowerCase() || '';
  const term = searchTerm.toLowerCase();
  return nombre.includes(term) || correo.includes(term);
});

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const actualizarEstado = (id, estado, nombreEmpleado) => {
    const isDarkMode = document.documentElement.classList.contains('dark');

    Swal.fire({
      title: `¿Confirmar cambio?`,
      text: `¿Estás seguro que deseas ${estado === 'aprobado' ? 'aprobar' : 'rechazar'} la solicitud de ${nombreEmpleado || 'este empleado'}?`,
      icon: estado === 'aprobado' ? 'question' : 'warning',
      showCancelButton: true,
      confirmButtonText: estado === 'aprobado' ? 'Aprobar' : 'Rechazar',
      cancelButtonText: 'Cancelar',
      background: isDarkMode ? '#171717' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#000000',
      confirmButtonColor: estado === 'aprobado' ? '#10B981' : '#EF4444',
      customClass: {
        popup: isDarkMode ? 'dark-theme-popup' : '',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        router.put(route('admin.solicitudes.updateEstado', id), { estado }, {
          preserveState: true,
          onSuccess: () => {
            Swal.fire({
              title: '¡Completado!',
              text: `La solicitud ha sido ${estado === 'aprobado' ? 'aprobada' : 'rechazada'} correctamente.`,
              icon: 'success',
              background: isDarkMode ? '#171717' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#000000',
              confirmButtonColor: '#3B82F6',
              customClass: {
                popup: isDarkMode ? 'dark-theme-popup' : '',
              }
            });
          },
          onError: () => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo procesar la solicitud. Intenta nuevamente.',
              icon: 'error',
              background: isDarkMode ? '#171717' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#000000',
              confirmButtonColor: '#EF4444',
              customClass: {
                popup: isDarkMode ? 'dark-theme-popup' : '',
              }
            });
          }
        });
      }
    });
  };

  return (
    <div className="border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl md:min-h-min">
      <div className="flex items-center justify-between border-b border-b-border/70 p-4">
        <h1 className="text-3xl font-bold p-5 pl-6">Solicitudes</h1>
      </div>

      {/* BARRA BUSCADORA */}
      <div className="p-4 flex items-center">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); 
            }}
            className="pl-10 w-full border "
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

      <div className='overflow-x-auto p-4'>
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-100 dark:bg-[#171717] text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-2">Empleado</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Motivo</th>
              <th className="px-4 py-2">Fecha Inicio</th>
              <th className="px-4 py-2">Fecha Fin</th>
              <th className="px-4 py-2">Días</th>
              <th className="px-4 py-2">Observaciones</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                  No hay solicitudes registradas.
                </td>
              </tr>
            ) : (
              paginatedData.map((v) => (
                <tr key={v.id} className="border-b hover:bg-gray-50 dark:hover:bg-[#21211f]">
                  <td className="px-4 py-2 border">{v.empleado?.user?.name || 'Desconocido'}</td>
                  <td className="px-4 py-2 border">{v.empleado?.user?.email || '-'}</td>
                  <td className="px-4 py-2 border">{v.motivo}</td>
                  <td className="px-4 py-2 border">{v.fecha_inicio}</td>
                  <td className="px-4 py-2 border">{v.fecha_fin}</td>
                  <td className="px-4 py-2 border">{v.dias}</td>
                   <td className="px-4 py-2 border">{v.observaciones}</td>
                   <td className="px-4 py-2 border">
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
                  <td className="px-4 py-2 border space-x-2">
                    {v.estado === 'pendiente' ? (
                      <>
                        <Button
                          onClick={() => actualizarEstado(v.id, 'aprobado', v.empleado?.user?.name)}
                          className="bg-green-600 cursor-pointer text-white hover:bg-green-800"
                        >
                          <CircleCheckBig className="mr-1" /> Aprobar
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => actualizarEstado(v.id, 'rechazado', v.empleado?.user?.name)}
                        >
                          <CircleX className="mr-1" /> Rechazar
                        </Button>
                      </>
                    ) : (
                      <span className="text-sm text-gray-500 italic">Sin acciones</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINACIÓN */}
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
              <span className="font-medium">{Math.min(currentPage * rowsPerPage, vacaciones.length)}</span> de{" "}
              <span className="font-medium">{vacaciones.length}</span> resultados
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

      {/* Estilos para SweetAlert en modo oscuro */}
      <style>{`
        .dark-theme-popup {
          border: 1px solid #2d2d2d !important;
        }
        .dark .swal2-popup {
          background-color: #171717 !important;
          color: #ffffff !important;
        }
        .dark .swal2-title, 
        .dark .swal2-content,
        .dark .swal2-html-container {
          color: #ffffff !important;
        }
        .dark .swal2-input,
        .dark .swal2-textarea {
          background-color: #262626 !important;
          color: #ffffff !important;
          border-color: #3d3d3d !important;
        }
      `}</style>
    </div>
  );
}
