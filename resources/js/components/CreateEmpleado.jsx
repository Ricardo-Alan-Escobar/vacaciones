import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { X } from 'lucide-react';
import { Button, buttonVariants } from "/resources/js/components/ui/button.jsx";
import { Plus, Save } from 'lucide-react';
import Swal from 'sweetalert2';

export default function CreateEmpleadoModal() {
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    nombre: '',
    puesto: '',
    fecha_ingreso: '',
    correo: '',
    tiene_vacaciones: false,
    dias_vacaciones: 0,
     rol: 'empleado',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    // Detectar modo oscuro del sistema
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    router.post('/empleados', form, {
      onSuccess: () => {
        setShowModal(false);
        
        // Mostrar alerta con SweetAlert2 adaptada al tema oscuro/claro
        Swal.fire({
          title: '¡Éxito!',
          text: `Empleado ${form.nombre} agregado correctamente`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          timer: 3000,
          timerProgressBar: true,
          background: isDarkMode ? '#171717' : '#ffffff',
          color: isDarkMode ? '#e4e4e4' : '#545454',
          iconColor: isDarkMode ? '#4ade80' : '#2e7d32',
          confirmButtonColor: isDarkMode ? '#3b82f6' : '#4f46e5',
          customClass: {
            popup: isDarkMode ? 'dark-mode-popup' : '',
            title: isDarkMode ? 'dark-mode-title' : '',
            htmlContainer: isDarkMode ? 'dark-mode-content' : '',
            confirmButton: 'swal-confirm-button',
            timerProgressBar: isDarkMode ? 'dark-mode-timer' : ''
          },
          showClass: {
            popup: 'animate__animated animate__fadeInDown animate__faster'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp animate__faster'
          }
        });
        
        setForm({
          nombre: '',
          puesto: '',
          fecha_ingreso: '',
          correo: '',
          tiene_vacaciones: false,
          dias_vacaciones: 0,
        });
      },
    });
  };

  return (
    <>
     

      <Button onClick={() => setShowModal(true)}
        className="cursor-pointer"
        size="lg"
       > 
       <Plus/> Agregar Empleado
        </Button>
      {/* Modal */}
      {showModal && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70"
    onClick={() => setShowModal(false)}
  >
    <div
      className="bg-white dark:bg-[#171717] rounded-lg shadow-lg w-full max-w-md p-6 relative dark:text-gray-100"
      onClick={e => e.stopPropagation()} 
    >
      {/* Botón cerrar */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-50"
      >
        <X size={20} className='cursor-pointer'/>
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Agregar nuevo empleado</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="w-full border dark:border-gray-900 p-2 rounded bg-white dark:bg-[#232321] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Puesto</label>
          <input
            type="text"
            name="puesto"
            value={form.puesto}
            onChange={handleChange}
            className="w-full border dark:border-gray-900 p-2 rounded bg-white dark:bg-[#232321] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha de Ingreso</label>
          <input
            type="date"
            name="fecha_ingreso"
            value={form.fecha_ingreso}
            onChange={handleChange}
            className="w-full border dark:border-gray-900 p-2 rounded bg-white dark:bg-[#232321] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Correo</label>
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            required
            className="w-full border dark:border-gray-900 p-2 rounded bg-white dark:bg-[#232321] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-900"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="tiene_vacaciones"
            checked={form.tiene_vacaciones}
            onChange={e => setForm({ ...form, tiene_vacaciones: e.target.checked })}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">¿Tiene vacaciones?</label>
        </div>
        {form.tiene_vacaciones && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Días de Vacaciones</label>
            <input
              type="number"
              name="dias_vacaciones"
              value={form.dias_vacaciones}
              onChange={handleChange}
              className="w-full border dark:border-gray-900 p-2 rounded bg-white dark:bg-[#232321] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-900"
            />
          </div>
        )}

        <div className='flex items-center justify-end mt-4'>
        <Button
          type="submit"
          className=" cursor-pointer"
          size="lg"
        >
        <Save />  Guardar
        </Button>
        </div>
      </form>
    </div>
  </div>
)}
    </>
  );
}