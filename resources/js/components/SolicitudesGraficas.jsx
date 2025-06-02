import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const COLORS = {
  pendiente: "#3B82F6",   // azul
  aprobado: "#10B981",    // verde
  rechazado: "#EF4444",   // rojo
};

export default function SolicitudesGraficas({ data }) {
  // Gráfica 1: Conteo por estado
  const estadoCounts = data.reduce((acc, curr) => {
    acc[curr.estado] = (acc[curr.estado] || 0) + 1;
    return acc;
  }, {});
  const estadoData = Object.keys(estadoCounts).map(key => ({
    name: key,
    value: estadoCounts[key],
  }));

  // Gráfica 2: Total de días por empleado
  const diasPorEmpleado = data.reduce((acc, curr) => {
    const nombre = curr.empleado?.user?.name || 'Desconocido';
    acc[nombre] = (acc[nombre] || 0) + curr.dias;
    return acc;
  }, {});
  const diasData = Object.keys(diasPorEmpleado).map(nombre => ({
    name: nombre,
    dias: diasPorEmpleado[nombre],
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 dark:bg-[#171717] p-4 rounded-xl">
      {/* Gráfica de Pie */}
      <div className="bg-white dark:bg-[#1f1f1f] p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Solicitudes por Estado</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={estadoData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {estadoData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#A1A1AA"} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfica de Barras */}
      <div className="bg-white dark:bg-[#1f1f1f] p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Días Solicitados por Empleado</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={diasData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="name" stroke="#D1D5DB" />
            <YAxis stroke="#D1D5DB" />
            <Tooltip />
            <Legend />
            <Bar dataKey="dias" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
