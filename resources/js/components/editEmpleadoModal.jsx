import React, { useState, useEffect  } from 'react';
import { router } from '@inertiajs/react';
import { X, Save, Pencil } from 'lucide-react';
import { Button } from "/resources/js/components/ui/button.jsx";
import Swal from 'sweetalert2';

export default function EditEmpleadoModal({ empleado, onClose }) {
  const [form, setForm] = useState({ ...empleado });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    // Verificar al cargar
    checkDarkMode();
    
    // Configurar un observador de mutación para detectar cambios en las clases del documento
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    router.put(`/empleados/${empleado.id}`, form, {
      onSuccess: () => {
        onClose();
        
        // Mostrar alerta con SweetAlert2 adaptada al tema oscuro/claro
        Swal.fire({
          title: '¡Actualizado!',
          text: `Empleado ${form.nombre} actualizado correctamente`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          timer: 3000,
          timerProgressBar: true,
          background: isDarkMode ? '#1e1e1e' : '#ffffff',
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
      },
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70" onClick={onClose}>
        <div
          className="bg-white dark:bg-[#171717] rounded-lg shadow-lg w-full max-w-md p-6 relative dark:text-gray-100"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-50"
          >
            <X size={20} className="cursor-pointer" />
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Editar Empleado</h2>

            {/* Reutilizando campos */}
            {['nombre', 'puesto', 'fecha_ingreso', 'correo', 'jefe', 'empresa'].map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {field.replace('_', ' ').toUpperCase()}
                </label>
                <input
                  type={field === 'fecha_ingreso' ? 'date' : field === 'correo' ? 'email' : 'text'}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required={field === 'nombre' || field === 'correo'}
                  className="w-full border dark:border-gray-900 p-2 rounded bg-white dark:bg-[#232321] text-gray-900 dark:text-gray-100"
                />
              </div>
            ))}

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
                  className="w-full border dark:border-gray-900 p-2 rounded bg-white dark:bg-[#232321] text-gray-900 dark:text-gray-100"
                />
              </div>
            )}

            <div className="flex justify-end">
              <Button type="submit" size="lg" className="cursor-pointer">
                <Save className="mr-2" /> Guardar Cambios
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
