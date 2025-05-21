import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Welcome() {
    const { auth } = usePage().props;
    const [scrolled, setScrolled] = useState(false);

    // Efecto para detectar scroll y cambiar el estilo del header
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head title="Gestión de Vacaciones">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            {/* Header con efecto de transparencia */}
            <header className={`fixed w-full px-6 py-4 lg:px-12 flex justify-between items-center transition-all duration-300 z-20 ${
                scrolled ? "bg-white/90 dark:bg-black/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
            }`}>
                {/* Logo */}
                <div className="flex items-center">
                    <img 
                        src="https://grupomaquirsa.netlify.app/_astro/logop.B9PxXdGN.png" 
                        alt="Logo" 
                        className="h-10 w-auto"
                    />
                </div>
                
                {/* Navegación */}
                <nav className="flex items-center gap-6">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-2 text-sm text-white font-medium transition-colors duration-200"
                        >
                            Panel de Control
                        </Link>
                    ) : (
                        <div className="flex gap-4">
                            <Link
                                href={route('login')}
                                className="rounded-lg border border-gray-300 dark:border-gray-700 px-5 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                href={route('login')}
                                className="rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-2 text-sm text-white font-medium transition-colors duration-200"
                            >
                                Administrador
                            </Link>
                        </div>
                    )}
                </nav>
            </header>

            {/* Hero Section */}
            <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-100">
                <main className="flex flex-1 flex-col lg:flex-row items-center justify-center w-full max-w-7xl mx-auto px-6 pt-24 lg:pt-0">
                    
                    {/* Sección de texto */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-8 py-12">
                        <div className="space-y-6">
                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                Gestiona tus <span className="text-blue-600 dark:text-blue-400">vacaciones</span> de forma inteligente
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl">
                                Simplifica el proceso de solicitud y aprobación de ausencias laborales con nuestra plataforma intuitiva.
                            </p>
                        </div>
                        
                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <Link
                                href={auth.user ? route('dashboard') : route('login')}
                                className="rounded-lg bg-blue-600 hover:bg-blue-700 px-8 py-3 text-white font-medium transition-colors duration-200"
                            >
                                {auth.user ? 'Ir al Panel' : 'Ingresar ahora'}
                            </Link>
                            <Link
                                href="#features"
                                className="rounded-lg border border-gray-300 dark:border-gray-700 px-8 py-3 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                            >
                                Contactar a sistemas
                            </Link>
                        </div>
                    </div>

                    {/* Imagen principal */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center py-8">
                        <div className="relative">
                            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur-xl"></div>
                            <div className="relative bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl">
                                <img
                                    src="https://grupomaquirsa.netlify.app/_astro/logop.B9PxXdGN.png"
                                    alt="Gestión de Vacaciones"
                                    className="w-full max-w-md object-contain rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </main>
                
                {/* Features Section (scroll target) */}
                <section id="features" className="w-full max-w-7xl mx-auto px-6 py-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Características Principales</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Calendario Intuitivo</h3>
                            <p className="text-gray-600 dark:text-gray-300">Visualiza y planifica tus días libres con nuestro calendario fácil de usar.</p>
                        </div>
                        
                        {/* Feature 2 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Procesos Automatizados</h3>
                            <p className="text-gray-600 dark:text-gray-300">Aprobaciones y notificaciones automáticas para agilizar los procesos internos.</p>
                        </div>
                        
                        {/* Feature 3 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Reportes Detallados</h3>
                            <p className="text-gray-600 dark:text-gray-300">Accede a estadísticas y reportes sobre el uso de vacaciones y permisos.</p>
                        </div>
                    </div>
                </section>
                
                {/* Footer simple */}
                <footer className="w-full bg-white dark:bg-gray-800 py-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 dark:text-gray-400">
                        <p>© {new Date().getFullYear()} Sistema de Gestión de Vacaciones. Todos los derechos reservados.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}