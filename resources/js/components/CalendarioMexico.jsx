import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarioMexico() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  // Días festivos de México
  const diasFestivos = {
    0: [ // Enero
      { day: 1, name: "Año Nuevo", type: "Oficial" },
      { day: 6, name: "Día de los Reyes Magos", type: "Conmemorativo" }
    ],
    1: [ // Febrero
      { day: 5, name: "Día de la Constitución", type: "Oficial" },
      { day: 14, name: "Día de San Valentín", type: "Conmemorativo" },
      { day: 24, name: "Día de la Bandera", type: "Cívico" }
    ],
    2: [ // Marzo
      { day: 21, name: "Natalicio de Benito Juárez", type: "Oficial" }
    ],
    3: [ // Abril
      { day: 30, name: "Día del Niño", type: "Conmemorativo" }
    ],
    4: [ // Mayo
      { day: 1, name: "Día del Trabajo", type: "Oficial" },
      { day: 5, name: "Batalla de Puebla", type: "Cívico" },
      { day: 10, name: "Día de las Madres", type: "Conmemorativo" },
      { day: 15, name: "Día del Maestro", type: "Conmemorativo" }
    ],
    5: [ // Junio
      { day: 20, name: "Día del Padre", type: "Conmemorativo" }
    ],
    6: [ // Julio
    ],
    7: [ // Agosto
    ],
    8: [ // Septiembre
      { day: 16, name: "Día de la Independencia", type: "Oficial" },
    ],
    9: [ // Octubre
      { day: 12, name: "Día de la Raza", type: "Conmemorativo" }
    ],
    10: [ // Noviembre
      { day: 1, name: "Día de Todos los Santos", type: "Conmemorativo" },
      { day: 2, name: "Día de Muertos", type: "Conmemorativo" },
      { day: 20, name: "Aniversario de la Revolución", type: "Oficial" }
    ],
    11: [ // Diciembre
      { day: 12, name: "Día de la Virgen de Guadalupe", type: "Conmemorativo" },
      { day: 25, name: "Navidad", type: "Oficial" }
    ]
  };

  // Nombres de los meses
  const nombreMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Nombres de los días de la semana
  const nombreDias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  // Obtener días del mes
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Generar los días del calendarios
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const calendarDays = [];

    // Días vacíos anteriores al primer día del mes
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-14"></div>);
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      // Verificar si es un día festivo
      const festivosDelMes = diasFestivos[currentMonth] || [];
      const esFestivo = festivosDelMes.find(festivo => festivo.day === day);
      
      let dayClass = "flex items-center justify-center h-14 w-14 rounded-full mx-auto";
      if (esFestivo) {
        dayClass += " bg-[#403c3c] text-white font-bold";
      } else if (new Date().getDate() === day && new Date().getMonth() === currentMonth && new Date().getFullYear() === currentYear) {
        dayClass += " bg-green-700 text-white font-bold";
      } else if (selectedDate === day) {
        dayClass += " bg-gray-600 text-white";
      } else {
        dayClass += " hover:bg-gray-700 cursor-pointer";
      }

      calendarDays.push(
        <div key={day} className="relative">
          <button 
            className={dayClass}
            onClick={() => setSelectedDate(day)}
            title={esFestivo ? esFestivo.name : ''}
          >
            {day}
          </button>
          {esFestivo && (
            <div className="w-2 h-2 bg-green-400 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
          )}
        </div>
      );
    }

    return calendarDays;
  };

  // Cambiar de mes
  const changeMonth = (increment) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDate(null);
  };

  // Obtener información del día seleccionado
  const getSelectedDateInfo = () => {
    if (!selectedDate) return null;
    
    const festivosDelMes = diasFestivos[currentMonth] || [];
    return festivosDelMes.find(festivo => festivo.day === selectedDate);
  };
  
  const selectedDateInfo = getSelectedDateInfo();

  return (
    <div className="flex flex-col md:flex-row w-full h-full  rounded-xl text-gray-200">
      {/* Estilos globales para las barras de desplazamiento */}
      <style >{`
        /* Estilo de la barra de scroll */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        /* Estilo del track (fondo) de la barra de scroll */
        ::-webkit-scrollbar-track {
          background: #2D2C2C;
          border-radius: 10px;
        }
        
        /* Estilo del thumb (barra deslizadora) */
        ::-webkit-scrollbar-thumb {
          background: #403c3c;
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        
        /* Estilo hover del thumb */
        ::-webkit-scrollbar-thumb:hover {
          background: #464646;
        }
        
        /* Estilo para cuando está activo (clic) */
        ::-webkit-scrollbar-thumb:active {
          background: #464646;
        }
        
        /* Estilo para la esquina donde se encuentran las barras horizontales y verticales */
        ::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>


      <div className="w-full md:w-1/2 mr-3">
        <div className="dark:bg-[#171717] rounded-xl shadow-xl p-6 h-[650px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6 dark:text-[#9b8c8c] " />
              <h2 className="text-2xl font-bold">Calendario México</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => changeMonth(-1)}
                className="p-2 rounded-full hover:bg-gray-800"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-semibold">
                {nombreMeses[currentMonth]} {currentYear}
              </h3>
              <button 
                onClick={() => changeMonth(1)}
                className="p-2 rounded-full hover:bg-gray-800"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-4 mb-2">
            {nombreDias.map(dia => (
              <div key={dia} className="text-center font-medium text-gray-400">
                {dia}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-4 flex-grow">
            {generateCalendarDays()}
          </div>

          {/* Leyenda */}
          <div className="mt-6 flex flex-wrap items-center gap-4 flex-shrink-0 justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-[#403c3c]"></div>
              <span className="text-sm">Día Festivo</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-green-600"></div>
              <span className="text-sm">Hoy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-gray-600"></div>
              <span className="text-sm">Seleccionado</span>
            </div>
          </div>

          {/* Información del día seleccionado */}
          {selectedDate && (
            <div className="mt-4 p-4 bg-[#403c3c] rounded-lg flex-shrink-0">
              <h4 className="font-semibold text-lg">
                {selectedDate} de {nombreMeses[currentMonth]} de {currentYear}
              </h4>
              {selectedDateInfo ? (
                <div className="mt-2">
                  <p className="text-green-500 font-bold text-lg">{selectedDateInfo.name}</p>
                  <p className="text-sm text-gray-300">Tipo: {selectedDateInfo.type}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-300 mt-2">No hay eventos para este día</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sección de Días Festivos - 50% */}
      <div className="w-full md:w-1/2 ml-3">
        <div className="dark:bg-[#171717]  rounded-xl shadow-xl p-6 h-[650px] flex flex-col">
          <h2 className="text-2xl font-bold mb-6 flex items-center flex-shrink-0">
            <span className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-3">
              <Calendar className="w-5 h-5" />
            </span>
            Días Festivos de México
          </h2>

          <div className="overflow-y-auto flex-grow pr-2 custom-scrollbar">
            {nombreMeses.map((mes, index) => {
            const festivosDelMes = diasFestivos[index] || [];
            if (festivosDelMes.length === 0) return null;

            return (
              <div key={mes} className="mb-6">
                <h3 className="text-lg font-semibold text-green-300 mb-3 border-b border-[#484545] pb-2">{mes}</h3>
                <ul className="space-y-3">
                  {festivosDelMes.map(festivo => (
                    <li key={`${mes}-${festivo.day}`} className="flex items-start">
                      <div className="w-8 h-8 bg-[#403c3c] rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="font-bold">{festivo.day}</span>
                      </div>
                      <div>
                        <p className="font-medium">{festivo.name}</p>
                        <p className="text-sm text-gray-400">{festivo.type}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}