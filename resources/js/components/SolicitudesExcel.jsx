import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ExportSolicitudesExcel({ data }) {
    const handleExport = () => {
        const exportData = data.map((v) => ({
            Empleado: v.empleado?.user?.name || 'Desconocido',
            Correo: v.empleado?.user?.email || '-',
            Motivo: v.motivo,
            "Fecha Inicio": v.fecha_inicio,
            "Fecha Fin": v.fecha_fin,
            Días: v.dias,
            Observaciones: v.observaciones,
            Estado: v.estado,
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Solicitudes");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, "solicitudes.xlsx");
    };

    return (
        <Button onClick={handleExport} variant="outline" className="cursor-pointer">
            <Download className="h-4 w-4 mr-2" /> Descargar Excel
        </Button>
    );
} 
