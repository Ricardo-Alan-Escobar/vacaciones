import { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';

export default function Permisos() {
  const { empleado, permisos } = usePage().props;
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrado por motivo
  const filteredPermisos = [...permisos]
    .reverse()
    .filter((p) =>
      p.motivo?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Permisos", href: "/permisos" },
      ]}
    >
      <Head title="Permisos" />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Mis Permisos</h1>

        {/* Barra de búsqueda */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por motivo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Tabla de permisos */}
        <div className="overflow-x-auto border-1 border-gray-500- rounded-lg shadow">
          <table className="w-full text-sm text-left border-collapse">
            <thead className=" text-gray-100 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 border-b">Fecha Solicitud</th>
                <th className="px-4 py-3 border-b">Motivo</th>
                <th className="px-4 py-3 border-b">Fecha Inicio</th>
                <th className="px-4 py-3 border-b">Fecha Fin</th>
                <th className="px-4 py-3 border-b">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredPermisos.length > 0 ? (
                filteredPermisos.map((permiso, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 border-b">
                      {permiso.fecha_solicitud}
                    </td>
                    <td className="px-4 py-3 border-b">{permiso.motivo}</td>
                    <td className="px-4 py-3 border-b">
                      {permiso.fecha_inicio}
                    </td>
                    <td className="px-4 py-3 border-b">
                      {permiso.fecha_fin}
                    </td>
                    <td className="px-4 py-3 border-b">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                          permiso.estado === "Aprobado"
                            ? "bg-green-100 text-green-700"
                            : permiso.estado === "Pendiente"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {permiso.estado}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No se encontraron permisos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
