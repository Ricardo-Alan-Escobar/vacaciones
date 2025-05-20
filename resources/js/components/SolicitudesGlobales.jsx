import React from 'react';
import { router } from '@inertiajs/react';
import { Button } from "/resources/js/components/ui/button.jsx";
import { CircleCheckBig, CircleX } from 'lucide-react';
import Swal from 'sweetalert2';

export default function SolicitudesGlobales({ vacaciones }) {

  const actualizarEstado = (id, estado, nombreEmpleado) => {
    // Configuración de tema basada en el modo dark
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    // Mostrar confirmación con SweetAlert2
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
        // Realizar la actualización del estado
        router.put(route('admin.solicitudes.updateEstado', id), { estado }, {
          preserveState: true,
          onSuccess: () => {
            // Mostrar alerta de éxito
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
          onError: (errors) => {
            // Mostrar alerta de error
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
      <div className='overflow-x-auto p-4'>
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-100 dark:bg-[#171717] text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-2 text-left">Empleado</th>
              <th className="px-4 py-2 text-left">Correo</th>
              <th className="px-4 py-2 text-left">Motivo</th>
              <th className="px-4 py-2 text-left">Fecha Inicio</th>
              <th className="px-4 py-2 text-left">Fecha Fin</th>
              <th className="px-4 py-2 text-left">Días</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {vacaciones.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                  No hay solicitudes registradas.
                </td>
              </tr>
            ) : (
              vacaciones.map((v) => (
                <tr key={v.id} className="border-b hover:bg-gray-50 dark:hover:bg-[#21211f]">
                  <td className="px-4 py-2 border">{v.empleado?.user?.name || 'Desconocido'}</td>
                  <td className="px-4 py-2 border">{v.empleado?.user?.email || '-'}</td>
                  <td className="px-4 py-2 border">{v.motivo}</td>
                  <td className="px-4 py-2 border">{v.fecha_inicio}</td>
                  <td className="px-4 py-2 border">{v.fecha_fin}</td>
                  <td className="px-4 py-2 border">{v.dias}</td>
                  <td className="px-4 py-2 border capitalize">{v.estado}</td>
                  <td className="px-4 py-2 border space-x-2">
                    {v.estado === 'pendiente' ? (
                      <>
                        <Button
                          type="button"
                          onClick={() => actualizarEstado(v.id, 'aprobado', v.empleado?.user?.name)}
                          className="bg-green-600 text-white hover:bg-green-800 cursor-pointer"
                          aria-label={`Aprobar solicitud de ${v.empleado?.user?.name || 'empleado'}`}
                        >
                          <CircleCheckBig className="mr-1" /> Aprobar
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => actualizarEstado(v.id, 'rechazado', v.empleado?.user?.name)}
                          aria-label={`Rechazar solicitud de ${v.empleado?.user?.name || 'empleado'}`}
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

      {/* Estilos CSS para SweetAlert en modo oscuro */}
      <style jsx global>{`
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