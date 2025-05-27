import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { X, CalendarPlus, Save } from 'lucide-react';
import { Button } from '/resources/js/components/ui/button.jsx';
import Swal from 'sweetalert2';

export default function CreateSolicitudVacacionesModal({ empleadoId, diasDisponibles  }) {
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    empleado_id: empleadoId || '',
    motivo: '',
    fecha_inicio: '',
    fecha_fin: '',
    dias: 0,
  });
 
  const handleChange = e => {
  const { name, value } = e.target;
  const updatedForm = { ...form, [name]: value };

 if (name === 'fecha_inicio' || name === 'fecha_fin') {
  const start = new Date(updatedForm.fecha_inicio);
  const end = new Date(updatedForm.fecha_fin);

  if (!isNaN(start) && !isNaN(end)) {
    let count = 0;
    const current = new Date(start);
    current.setHours(12, 0, 0, 0); // Establecer a medio día para evitar errores por horario

    while (current <= end) {
      const day = current.getDay();
      if (day !== 0) { // 0 es domingo
        count++;
      }
      current.setDate(current.getDate() + 1);
    }

    updatedForm.dias = count;
  } else {
    updatedForm.dias = 0;
  }
}


  setForm(updatedForm);
};

  const handleSubmit = e => {
  e.preventDefault();

  const start = new Date(form.fecha_inicio);
  const end = new Date(form.fecha_fin);

  const diasSolicitados = form.dias;

  if (end < start) {
    Swal.fire({
      title: 'Fechas inválidas',
      text: 'La fecha de fin no puede ser anterior a la fecha de inicio.',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
    return;
  }

  if (diasDisponibles <= 0) {
    Swal.fire({
      title: 'Sin días disponibles',
      text: 'No puedes solicitar vacaciones porque no tienes días disponibles.',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
    return;
  }

  if (diasSolicitados > diasDisponibles) {
    Swal.fire({
      title: 'Días excedidos',
      text: `Solo tienes ${diasDisponibles} días disponibles.`,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
    return;
  }

 router.post('/vacaciones', form, {
  onSuccess: () => {
    setShowModal(false);

    const isDark = document.documentElement.classList.contains('dark');

    Swal.fire({
      title: '¡Solicitud enviada!',
      text: 'Tu solicitud de vacaciones ha sido registrada con éxito.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      timer: 3000,
      background: isDark ? '#171717' : '#fff', 
      color: isDark ? '#f3f4f6' : '#111827',   // texto claro u oscuro
      iconColor: isDark ? '#10b981' : '#16a34a', // verde para éxito
    });
  },
});

};
 

  return (
    <>
      <Button
  onClick={() => setShowModal(true)}
  className="cursor-pointer"
  size="lg"
  disabled={diasDisponibles <= 0}
  title={diasDisponibles <= 0 ? 'No tienes días disponibles' : ''}
>
  <CalendarPlus className="mr-2" /> Solicitar Vacaciones
</Button>

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
              <X size={20} className="cursor-pointer" />
            </button>

            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Nueva Solicitud de Vacaciones
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Motivo
                </label>
                <input
                  type="text"
                  name="motivo"
                  value={form.motivo}
                  onChange={handleChange}
                  required
                  className="w-full border dark:border-gray-900 p-2 rounded bg-white dark:bg-[#232321] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Fecha de Inicio
                </label>
                <input
                  type="date"
                  name="fecha_inicio"
                  value={form.fecha_inicio}
                  onChange={handleChange}
                  required
                  className="w-full border dark:border-gray-900 p-2 rounded bg-white dark:bg-[#232321] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Fecha de Fin
                </label>
                <input
                  type="date"
                  name="fecha_fin"
                  value={form.fecha_fin}
                  min={form.fecha_inicio} // Aquí se establece el mínimo
                  onChange={handleChange}
                  required
                  className="w-full border dark:border-gray-900 p-2 rounded bg-white dark:bg-[#232321] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Días Solicitados
                </label>
                <input
                  type="number"
                  name="dias"
                  value={form.dias}
                  readOnly
                  className="w-full border dark:border-gray-900 p-2 rounded bg-white dark:bg-[#232321] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-900"
                />

              </div>

              <div className="flex items-center justify-end mt-4">
                <Button type="submit" className="cursor-pointer" size="lg">
                  <Save className="mr-2" /> Guardar Solicitud
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
