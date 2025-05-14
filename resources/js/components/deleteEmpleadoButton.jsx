import React from 'react';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { Button } from "/resources/js/components/ui/button.jsx";

export default function DeleteEmpleadoButton({ id }) {
  const handleDelete = () => {
    if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      router.delete(`/empleados/${id}`);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      className="ml-2"
    >
      <Trash2 className="mr-2" /> Eliminar
    </Button>
  );
}
