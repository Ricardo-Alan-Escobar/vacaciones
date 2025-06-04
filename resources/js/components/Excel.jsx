import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
 
export default function ExportToExcel({ data }) {
    const handleExport = () => {
        const exportData = data.map(emp => ({
            Nombre: emp.nombre,
            Puesto: emp.puesto || '-',
            'Fecha de ingreso': emp.fecha_ingreso,
            Correo: emp.correo,
            Vacaciones: emp.tiene_vacaciones ? 'Sí' : 'No',
            Días: emp.tiene_vacaciones ? emp.dias_vacaciones : '-',
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Empleados");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, "empleados.xlsx");
    };

    return (
        <Button onClick={handleExport} variant="outline" className="cursor-pointer">
            <Download className="h-4 w-4 mr-2" /> Descargar Excel
        </Button>
    );
}
