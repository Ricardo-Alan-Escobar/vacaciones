import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { X, Save, Pencil } from 'lucide-react';
import { Button } from "/resources/js/components/ui/button.jsx";

export default function EditEmpleadoModal({ empleado, onClose }) {
  const [form, setForm] = useState({ ...empleado });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    router.put(`/empleados/${empleado.id}`, form, {
      onSuccess: () => {
        onClose(); 
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
            {['nombre', 'puesto', 'fecha_ingreso', 'correo'].map(field => (
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
              <Button type="submit" size="lg">
                <Save className="mr-2" /> Guardar Cambios
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
