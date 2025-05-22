import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Bell, Moon, Sun, ExternalLink, Check, X } from 'lucide-react';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const marcarComoLeida = (id) => {
    router.post(`/notificaciones/${id}/leer`, {}, {
        preserveScroll: true,
        onSuccess: () => {
            Swal.fire({
                title: '¡Éxito!',
                text: 'Notificación marcada como leída',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                background: '#171717',
                color: '#ffffff',
                iconColor: '#10b981',
                toast: true,
                position: 'top-end'
            });
        },
        onError: () => {
            Swal.fire({
                title: 'Error',
                text: 'No se pudo marcar la notificación como leída',
                icon: 'error',
                background: '#171717',
                color: '#ffffff',
                iconColor: '#ef4444',
                confirmButtonColor: '#ef4444',
                confirmButtonText: 'Entendido'
            });
        }
    });
};

const eliminarNotificacion = (id) => {
    Swal.fire({
        title: '¿Eliminar notificación?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        background: '#171717',
        color: '#ffffff',
        iconColor: '#f59e0b',
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            router.delete(`/notificaciones/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    Swal.fire({
                        title: '¡Eliminada!',
                        text: 'La notificación ha sido eliminada',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                        background: '#171717',
                        color: '#ffffff',
                        iconColor: '#10b981',
                        toast: true,
                        position: 'top-end'
                    });
                },
                onError: () => {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo eliminar la notificación',
                        icon: 'error',
                        background: '#171717',
                        color: '#ffffff',
                        iconColor: '#ef4444',
                        confirmButtonColor: '#ef4444',
                        confirmButtonText: 'Entendido'
                    });
                }
            });
        }
    });
};

export default function Notificaciones({ notificaciones }) {
    



    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Notificaciones', href: '/notificaciones' }]}>
            <Head title="Notificaciones" />

            <div className="min-h-screen bg-gradient-to-br transition-colors duration-300">
                <div className="mx-auto p-6">
                    {/* Header */}
                        <div className=" space-x-3 bg-white dark:bg-[#171717] p-6 rounded-xl shadow-md flex justify-start items-center mb-6">
                            <div className="p-3 bg-blue-500 dark:bg-gray-600 rounded-xl shadow-lg">
                                <Bell className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Notificaciones
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    {notificaciones.length} {notificaciones.length === 1 ? 'notificación' : 'notificaciones'}
                                </p>
                            </div>
                        </div>
                   
                    {/* Content */}
                    {notificaciones.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="p-6 bg-white dark:bg-[#171717] rounded-2xl shadow-xl border border-gray-200 dark:border-[#2f2b2b] max-w-md mx-auto">
                                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-fit mx-auto mb-4">
                                    <Bell className="h-8 w-8 text-gray-400 dark:text-gray-200" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    No hay notificaciones
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Cuando tengas nuevas notificaciones, aparecerán aquí.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {notificaciones.map((noti, index) => (
                                <div
                                    key={noti.id}
                                    className={`group border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden
                                             ${noti.read_at ? 'opacity-60 bg-white dark:bg-[#1f1818] border-gray-300 dark:border-[#1f1818]' : 'bg-white dark:bg-[#1f261e] dark:hover:bg-[#2d2b2b] border-blue-500 dark:border-green-400'}
                                         `}
                                         style={{
                                             animationDelay: `${index * 100}ms`,
                                             animation: 'slideInUp 0.5s ease-out forwards'
                                         }}
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-3">
                                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                                   <span className="text-sm font-bold text-blue-600 dark:text-green-400">
                                                     {noti.read_at ? 'Notificación leída' : 'Nueva notificación'}
                                                </span>
                                                </div>
                                                
                                                <p className="text-gray-900 dark:text-white text-lg leading-relaxed mb-4">
                                                    {noti.data.mensaje}
                                                </p>

                                                {noti.created_at && (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                                        {formatDate(noti.created_at)}
                                                    </p>
                                                )}

                                                {noti.data.url && (
                                                    <a
                                                        href={noti.data.url}
                                                        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm"
                                                    >
                                                        <span>Ver más</span>
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                               <button
                                                    onClick={() => marcarComoLeida(noti.id)}
                                                    className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </button>

                                                {/* Eliminar notificación */}
                                                <button
                                                    onClick={() => eliminarNotificacion(noti.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </AppLayout>
    );
}