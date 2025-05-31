import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Button } from "/resources/js/components/ui/button.jsx";
import { Input } from "/resources/js/components/ui/input.jsx";
import { Plus, ChevronLeft, ChevronRight, Search, CircleX } from 'lucide-react';
import { useState } from 'react';
import CreateSolicitudVacacionesModal from '../components/CreateSolicitudVacacionesModal.jsx';
import CalendarioMexico from '../components/CalendarioMexico.jsx';
import jsPDF from 'jspdf';

const breadcrumbs = [
    {
        title: 'Vacaciones',
        href: '/vacaciones',
    },
];

export default function Vacaciones() {

    const { empleado, vacaciones } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const diasDisponibles = empleado?.dias_vacaciones || 0;
    const diasUsados = empleado?.dias_usados || 0;

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

   const filteredVacaciones = [...vacaciones]
    .reverse()
    .filter(v => v.motivo?.toLowerCase().includes(searchTerm.toLowerCase()));

 
    const totalPages = Math.ceil(filteredVacaciones.length / rowsPerPage);
    const paginatedVacaciones = filteredVacaciones.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );




function generarPDF(solicitud, nombreEmpleado) {
    const doc = new jsPDF();
    
    // Configuración general
    const margenIzquierdo = 20;
    const margenDerecho = 160;
    const margenSuperior = 20;
    let y = margenSuperior;

    // Título
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Solicitud de Vacaciones", margenIzquierdo, y);
    y += 15;

    // Fecha de creación
   doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    const fechaCreacionFormateada = formatearFecha(solicitud.created_at);
    doc.text(`Creado el: ${fechaCreacionFormateada}`, margenDerecho - 20, y);
    y += 10;

    // Empresa
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Empresa: ________________________", margenIzquierdo, y);
    y += 15;

    // Datos del encabezado
    doc.setFontSize(12);
    
    // Línea "De:" con nombre en negrita
    doc.setFont("helvetica", "normal");
    doc.text("De: ", margenIzquierdo, y);
    doc.setFont("helvetica", "bold");
    doc.text(nombreEmpleado, margenIzquierdo + doc.getTextWidth("De: "), y);
    y += 7;
    
    // Línea "Asunto:" con motivo en negrita
    doc.setFont("helvetica", "normal");
    doc.text("Asunto: ", margenIzquierdo, y);
    doc.setFont("helvetica", "bold");
    doc.text(solicitud.motivo, margenIzquierdo + doc.getTextWidth("Asunto: "), y);
    y += 15;

    // Cuerpo del texto con formato
    doc.setFont("helvetica", "normal");
    
    // Primera línea del párrafo
    let x = margenIzquierdo;
    doc.text("Por la presente, y para que quede constancia por escrito, solicito de la manera más", x, y);
    y += 7;
    doc.text("atenta un permiso a cuenta de vacaciones el día ", x, y);
    
    // Fecha de inicio en negrita (formato día-mes-año)
    x = margenIzquierdo + doc.getTextWidth("atenta un permiso a cuenta de vacaciones el día ");
    doc.setFont("helvetica", "bold");
    doc.text(formatearFecha(solicitud.fecha_inicio), x, y);
    
    // Continuar con texto normal
    x += doc.getTextWidth(formatearFecha(solicitud.fecha_inicio));
    doc.setFont("helvetica", "normal");
    doc.text(" al ", x, y);
    
    // Fecha fin en negrita (formato día-mes-año)
    x += doc.getTextWidth(" al ");
    doc.setFont("helvetica", "bold");
    doc.text(formatearFecha(solicitud.fecha_fin), x, y);
    
    // Continuar con el resto del texto
    x += doc.getTextWidth(formatearFecha(solicitud.fecha_fin));
    doc.setFont("helvetica", "normal");
    doc.text(",", x, y);
    
    y += 7;
    x = margenIzquierdo;
    doc.text("debiendo regresar a mi lugar de trabajo el día ", x, y);
    
   
    x = margenIzquierdo + doc.getTextWidth("debiendo regresar a mi lugar de trabajo el día ");
    doc.setFont("helvetica", "bold");
    doc.text(formatearFecha(sumarUnDia(solicitud.fecha_fin)), x, y);
    doc.setFont("helvetica", "normal");
    doc.text(".", x + doc.getTextWidth(formatearFecha(sumarUnDia(solicitud.fecha_fin))), y);
    
    y += 15;
    

  
     x = margenIzquierdo;
    doc.setFont("helvetica", "normal");
    doc.text("Cabe mencionar que con este permiso estaré tomando ", x, y);
    x += doc.getTextWidth("Cabe mencionar que con este permiso estaré tomando ");
    
    doc.setFont("helvetica", "bold");
    doc.text(`${solicitud.dias}`, x, y);
    x += doc.getTextWidth(`${solicitud.dias}`);
    
    doc.setFont("helvetica", "normal");
    doc.text(" días de vacaciones,", x, y);
    
    // Salto de línea
    y += 7;
    x = margenIzquierdo;
    
    // Línea 2: continuación del texto
    doc.setFont("helvetica", "normal");
    doc.text("quedando aún ", x, y);
    x += doc.getTextWidth("quedando aún ");
    
    doc.setFont("helvetica", "bold");
    const diasRestantes = diasDisponibles - solicitud.dias;
    doc.text(`${diasRestantes}`, x, y);
    x += doc.getTextWidth(`${diasRestantes}`);
    
    doc.setFont("helvetica", "normal");
    doc.text(" disponibles en mi saldo anual.", x, y);
    y += 15;


    
    // Resto del párrafo
    const restoTexto = `Esperando que no haya problema alguno por parte de la Dirección de la empresa, quedo a la espera de su visto bueno

Sin otro particular, reciba un cordial saludo.`;

    const lineasResto = doc.splitTextToSize(restoTexto, 170);
    doc.text(lineasResto, margenIzquierdo, y);
    y += lineasResto.length * 7 + 15;
    
if (solicitud.observaciones && solicitud.observaciones.trim() !== "") {
    doc.setFont("helvetica", "bold");
    doc.text("Observaciones:", margenIzquierdo, y);
    y += 7;

    doc.setFont("helvetica", "normal");
    const observacionesTexto = doc.splitTextToSize(solicitud.observaciones, 170);
    doc.text(observacionesTexto, margenIzquierdo, y);
    y += observacionesTexto.length * 7 + 10;
}


    // Firma
    doc.text("Atentamente,", margenIzquierdo, y);
    y += 7;
    doc.setFont("helvetica", "bold");
    doc.text(nombreEmpleado, margenIzquierdo, y);
    y += 30;

    // Espacios para firmas
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    
    // Firma del empleado (lado izquierdo)
    doc.text(nombreEmpleado, margenIzquierdo+7, y);
    doc.text("_____________________________", margenIzquierdo, y + 7);
    
    // Nombre y firma del jefe directo (lado derecho)
    doc.text("Nombre y firma del jefe directo:", margenDerecho-25, y);
    doc.text("_____________________________", margenDerecho-28, y + 7);
    y += 25;
    
    // Autorización de RHH (centrada)
    const textoRHH = "Autorización de RRHH:";
    const lineaRHH = "_____________________________";
    const anchoTextoRHH = doc.getTextWidth(textoRHH);
    const anchoLineaRHH = doc.getTextWidth(lineaRHH);
    const centroX = (doc.internal.pageSize.width / 2);
    
    doc.text(textoRHH, centroX - (anchoTextoRHH / 2), y);
    doc.text(lineaRHH, centroX - (anchoLineaRHH / 2), y + 7);

    // Guardar PDF
    doc.save(`Solicitud_Vacaciones_${nombreEmpleado}_${solicitud.id}.pdf`);
}

// Función para formatear fecha a formato día-mes-año
function formatearFecha(fecha) {
    const date = new Date(fecha);
    const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    
    const dia = date.getDate();
    const mes = meses[date.getMonth()];
    const año = date.getFullYear();
    
    return `${dia}-${mes}-${año}`;
}

// Utilidad para sumar un día a una fecha (en formato YYYY-MM-DD)
function sumarUnDia(fecha) {
    const date = new Date(fecha);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
}
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vacaciones" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    <div className="bg-white dark:bg-[#171717] p-6 rounded-xl shadow-md flex flex-col items-center">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Días Disponibles</h2>
                        <p className="text-4xl font-bold text-gray-900 dark:text-green-400">{diasDisponibles}</p>
                    </div>

                    <div className="bg-white dark:bg-[#171717] p-6 rounded-xl shadow-md flex flex-col items-center">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Días Usados</h2>
                        <p className="text-4xl font-bold text-green-600 dark:text-red-600">{diasUsados}</p>
                    </div>
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className='flex items-center justify-between border-b border-b-border/70 p-4'>
                        <h1 className='text-3xl font-bold p-5 pl-6'>Mis Solicitudes</h1>
                        <CreateSolicitudVacacionesModal
                            empleadoId={empleado?.id}
                            diasDisponibles={diasDisponibles}
                            onClose={() => setShowModal(false)}
                        />
                    </div>

      
                    <div className="p-4 flex items-center">
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                type="text"
                                placeholder="Buscar por motivo..."
                                className="pl-10 w-full"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reinicia paginación al buscar
                                }}
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

                    <div className="p-4">
                        <div className="overflow-x-auto rounded-lg shadow">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-100 dark:bg-[#222]">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Motivo</th>
                                        <th className="px-4 py-2 text-left">Fecha Inicio</th>
                                        <th className="px-4 py-2 text-left">Fecha Fin</th>
                                        <th className="px-4 py-2 text-left">Días</th>
                                        <th className="px-4 py-2 text-left">Estado</th>
                                        <th className="px-4 py-2 text-left">Observaciones</th>
                                        <th className="px-4 py-2 text-left">PDF</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                     {paginatedVacaciones.map((v, index) => (
                                        <tr key={index} className='hover:bg-gray-50 dark:hover:bg-[#21211f]'>
                                            <td className="px-4 py-2 border-r">{v.motivo}</td>
                                            <td className="px-4 py-2 border-r">{v.fecha_inicio}</td>
                                            <td className="px-4 py-2 border-r">{v.fecha_fin}</td>
                                            <td className="px-4 py-2 border-r">{v.dias}</td>
                                           <td className="px-4 py-2 border-r">
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
                                        <td className="px-4 py-2 border-r">{v.observaciones}</td>
                                        <td className="px-4 py-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                           onClick={() => generarPDF(v, empleado?.nombre, diasDisponibles)}
                                        >
                                            Descargar PDF
                                        </Button>
                                    </td>
                                        </tr>
                                    ))}
                                    {filteredVacaciones.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                                                No hay solicitudes registradas.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {filteredVacaciones.length > 0 && (
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
                                            <span className="font-medium">{Math.min(currentPage * rowsPerPage, filteredVacaciones.length)}</span>{" "}
                                            de <span className="font-medium">{filteredVacaciones.length}</span> resultados
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
                        )}
                    </div>
                </div>
                <div className="bg-white dark:bg-[#171717] p-6 rounded-xl shadow-md flex justify-center items-center">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Aqui puedes ver los días festivos</h2>
                    </div>
                    <CalendarioMexico />

            </div>
        </AppLayout>
    );
}
