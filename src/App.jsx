import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Data
const projects = [
    {
        id: 1,
        brand: 'John Deere',
        title: 'Stand Interactivo',
        description: 'Durante la Expo Guadalajara 2024, nuestro stand interactivo fue galardonado con el primer lugar, destacando tanto por su diseño innovador como por la experiencia inmersiva que ofrecía a los visitantes. La instalación combinaba tecnología de punta con elementos interactivos que permitían a los asistentes explorar los productos de John Deere de manera única y memorable, creando una experiencia que destacó entre todas las propuestas presentadas.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        logoPath: '/logojd.svg'
    },
    {
        id: 2,
        brand: 'Tesla',
        title: 'Experiencia Virtual',
        description: 'Desarrollamos una experiencia de realidad virtual que permite a los usuarios explorar los vehículos Tesla de manera inmersiva, destacando sus características tecnológicas más avanzadas. Los visitantes pueden personalizar su vehículo, explorar el interior y exterior, y experimentar las funciones autónomas en un entorno virtual completamente realista que los transporta al futuro de la movilidad.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        logoPath: '/logojd.svg'
    },
    {
        id: 3,
        brand: 'Apple',
        title: 'Showcase Interactivo',
        description: 'Creamos un showcase interactivo para el lanzamiento del iPhone, combinando elementos físicos y digitales para crear una experiencia memorable para los asistentes. La instalación incluía hologramas, superficies táctiles y realidad aumentada para mostrar las características del producto de forma innovadora, estableciendo un nuevo estándar en presentaciones de productos tecnológicos.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        logoPath: '/logojd.svg'
    },
    {
        id: 4,
        brand: 'Nike',
        title: 'Instalación Deportiva',
        description: 'Una instalación interactiva que combina sensores de movimiento y proyección mapping para crear una experiencia única donde los usuarios pueden interactuar con productos Nike. Los visitantes participan en desafíos deportivos virtuales mientras exploran la línea de productos, creando una conexión emocional con la marca y demostrando el poder de la tecnología aplicada al deporte.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        logoPath: '/logojd.svg'
    }
];

// Constants
const PRIMARY_TEXT_COLOR = '#D8ECF1';

// Component: SplashScreen
const SplashScreen = ({ onFinished, videoUrl }) => {
    const [animateText, setAnimateText] = useState(false);
    const splashRef = useRef(null);

    useEffect(() => {
        const textTimer = setTimeout(() => setAnimateText(true), 500);
        const finishTimer = setTimeout(onFinished, 4500);
        const handleInteraction = () => onFinished();

        const currentRef = splashRef.current;
        if (currentRef) {
            ['wheel', 'touchstart', 'click'].forEach(event =>
                currentRef.addEventListener(event, handleInteraction, { passive: true, once: true })
            );
        }
        return () => {
            clearTimeout(textTimer);
            clearTimeout(finishTimer);
            if (currentRef) {
                ['wheel', 'touchstart', 'click'].forEach(event =>
                    currentRef.removeEventListener(event, handleInteraction)
                );
            }
        };
    }, [onFinished]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };
    const splashText = "Creamos experiencias digitales interactivas e inmersivas.";
    const words = splashText.split(' ');

    return (
        <motion.div
            ref={splashRef}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black cursor-pointer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
            style={{ color: PRIMARY_TEXT_COLOR }}
        >
            <video src={videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-black/60" />
            <AnimatePresence>
                {animateText && (
                    <motion.h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-light text-center max-w-4xl px-6 leading-tight" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0 }}>
                        {words.map((word, i) => (
                            <motion.span key={i} variants={itemVariants} style={{ display: 'inline-block', marginRight: '0.6rem' }} className={word.toLowerCase().match(/digitales|interactivas|inmersivas/) ? "font-bold" : ""}>
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>
                )}
            </AnimatePresence>
            {animateText && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.7, y: 0, transition: { delay: words.length * 0.1 + 1, duration: 0.8 } }} className="absolute bottom-16 text-sm flex flex-col items-center" style={{ color: PRIMARY_TEXT_COLOR }}>
                    <span>Desliza o haz clic para continuar</span>
                    <ChevronDown className="mt-1 h-5 w-5 animate-bounce" />
                </motion.div>
            )}
        </motion.div>
    );
};

// Component: VideoCard
const VideoCard = ({ project, isActive, isExpanded, onExpandToggle, primaryTextColor }) => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(() => setShowContent(true), isExpanded ? 100 : 500);
            return () => clearTimeout(timer);
        } else {
            setShowContent(false);
        }
    }, [isActive, isExpanded, project.id]);

    const handleExpandClick = (e) => {
        e.preventDefault(); e.stopPropagation();
        if (isActive) onExpandToggle(project.id);
    };

    const handleModalBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onExpandToggle(project.id);
        }
    };

    const cardContentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1, delayChildren: 0.2 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    };

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video src={project.videoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; const img = document.createElement('img'); img.src = `https://via.placeholder.com/800x600/1a1a1a/${primaryTextColor.substring(1)}?text=${project.brand}`; img.className = 'w-full h-full object-cover'; img.alt = project.brand; e.target.parentNode.appendChild(img); }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-lg flex flex-col"
                        style={{ zIndex: 100, color: primaryTextColor }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }}
                        exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }}
                        onClick={handleModalBackgroundClick}
                    >
                        <motion.button
                            onClick={(e) => { e.stopPropagation(); onExpandToggle(project.id); }}
                            className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 flex items-center justify-center w-12 h-12 text-inherit rounded-full hover:bg-white/10"
                            style={{ zIndex: 110 }}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.4 } }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronDown className="w-7 h-7 md:w-8 md:h-8" />
                        </motion.button>

                        <motion.div className="h-full w-full flex flex-col p-4 md:p-6 lg:p-8 pt-safe-top-modal overflow-hidden" onClick={(e) => e.stopPropagation()} variants={cardContentVariants} initial="hidden" animate="visible">
                            <motion.div className="mb-6 md:mb-8 lg:mb-10 mt-16 md:mt-16" variants={itemVariants}>
                                <div className="h-10 md:h-12 lg:h-14 w-auto opacity-90"><img src={project.logoPath} alt={`${project.brand} Logo`} className="h-full w-auto object-contain filter drop-shadow-lg" /></div>
                            </motion.div>
                            <motion.h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 md:mb-8 lg:mb-10" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.5)' }} variants={itemVariants}>{project.title}</motion.h3>
                            <motion.div className="flex-1 overflow-hidden" variants={itemVariants}>
                                <div className="h-full overflow-y-auto pr-2 custom-scrollbar pb-12"><p className="text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>{project.description}</p></div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showContent && !isExpanded && (
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 pb-[calc(env(safe-area-inset-bottom,20px)+100px)] text-inherit"
                        variants={cardContentVariants} initial="hidden" animate="visible" exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                    >
                        <motion.div className="mb-8 md:mb-10 lg:mb-12" variants={itemVariants}> {/* Increased margin-bottom */}
                            <div className="h-8 md:h-10 lg:h-12 w-auto opacity-90"><img src={project.logoPath} alt={`${project.brand} Logo`} className="h-full w-auto object-contain filter drop-shadow-lg" /></div>
                        </motion.div>
                        <motion.h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 md:mb-4 lg:mb-5 leading-tight" style={{ textShadow: '0 2px 5px rgba(0,0,0,0.5)' }} variants={itemVariants}>{project.title}</motion.h3>
                        <motion.div className="relative cursor-pointer text-content-area mb-0" variants={itemVariants} onClick={handleExpandClick}>
                            <div className="relative overflow-hidden max-h-[4.2em] md:max-h-[4.5em] lg:max-h-[4.8em]">
                                <p className="text-sm md:text-base lg:text-lg xl:text-xl leading-[1.35] text-gradient-blur">{project.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Component: VideoCarousel
const VideoCarousel = ({ expandedProject, onExpandChange, primaryTextColor }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const carouselRef = useRef(null);
    const autoPlayTimeoutRef = useRef(null);
    const isTransitioningRef = useRef(false);
    const dragStartX = useRef(0);
    const isDragging = useRef(false);

    const changeSlide = useCallback((newIndex, dir) => {
        if (isTransitioningRef.current || expandedProject || newIndex === currentIndex) return;
        clearTimeout(autoPlayTimeoutRef.current);
        isTransitioningRef.current = true;
        setDirection(dir);
        setCurrentIndex(newIndex);
        setTimeout(() => { isTransitioningRef.current = false; }, 700);
    }, [expandedProject, currentIndex]);

    useEffect(() => {
        if (expandedProject || isTransitioningRef.current) {
            clearTimeout(autoPlayTimeoutRef.current); return;
        }
        autoPlayTimeoutRef.current = setTimeout(() => {
            changeSlide((currentIndex + 1) % projects.length, 1);
        }, 9000);
        return () => clearTimeout(autoPlayTimeoutRef.current);
    }, [currentIndex, expandedProject, projects.length, changeSlide]);

    const handleInteractionStart = (clientX) => {
        if (expandedProject || isTransitioningRef.current) return false;
        if (clientX === undefined || clientX === null) return false; // Add check for clientX
        isDragging.current = true;
        dragStartX.current = clientX;
        clearTimeout(autoPlayTimeoutRef.current);
        return true;
    };
    const handleInteractionEnd = (clientX) => {
        if (!isDragging.current || expandedProject || isTransitioningRef.current) return;
        if (clientX === undefined || clientX === null) return; // Add check for clientX
        const diff = dragStartX.current - clientX;
        const threshold = 50;
        if (Math.abs(diff) > threshold) {
            if (diff > 0) changeSlide((currentIndex + 1) % projects.length, 1);
            else changeSlide((currentIndex - 1 + projects.length) % projects.length, -1);
        }
        isDragging.current = false;
    };

    const handleTouchStart = (e) => { if (e.target.closest('button, a, .text-content-area')) return; handleInteractionStart(e.touches?.[0]?.clientX); };
    const handleTouchEnd = (e) => handleInteractionEnd(e.changedTouches?.[0]?.clientX);
    const handleMouseDown = (e) => { if (e.target.closest('button, a, .text-content-area')) return; handleInteractionStart(e.clientX); };
    const handleMouseUp = (e) => handleInteractionEnd(e.clientX);

    const currentProject = projects?.[currentIndex];
    const slideVariants = {
        enter: dir => ({ x: dir > 0 ? '100%' : '-100%', scale: 0.95, opacity: 0 }),
        center: { x: 0, scale: 1, opacity: 1, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
        exit: dir => ({ x: dir < 0 ? '100%' : '-100%', scale: 0.95, opacity: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }),
    };

    const navButtonClass = "p-2 rounded-full bg-black/20 hover:bg-black/40 active:bg-black/50 transition-colors duration-150"; // Removed absolute, top, -translate-y, z-30 as they are now handled by parent flex container

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black" ref={carouselRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={() => isDragging.current = false}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div key={currentIndex} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="w-full h-full absolute">
                    {currentProject && <VideoCard project={currentProject} isActive={true} isExpanded={expandedProject === currentProject.id} onExpandToggle={onExpandChange} primaryTextColor={primaryTextColor} />}
                </motion.div>
            </AnimatePresence>

            {!expandedProject && (
                <div className="absolute bottom-[calc(env(safe-area-inset-bottom,0px)+20px)] left-0 right-0 flex items-center justify-between px-3 md:px-5 z-30"> {/* Adjusted padding */}
                    <button onClick={() => { if (!isTransitioningRef.current) changeSlide((currentIndex - 1 + projects.length) % projects.length, -1); }} className={navButtonClass} aria-label="Anterior Caso de Éxito">
                        <ChevronLeft size={28} style={{ color: primaryTextColor }} />
                    </button>
                    <div className="flex space-x-3"> {/* This is .slider-dots now */}
                        {projects.map((_, index) => (
                            <button key={index} aria-label={`Ver caso de éxito ${index + 1}`} className={`slider-dot ${currentIndex === index ? 'active' : ''}`}
                                onClick={() => { if (!isTransitioningRef.current && index !== currentIndex) changeSlide(index, index > currentIndex ? 1 : -1); }} />
                        ))}
                    </div>
                    <button onClick={() => { if (!isTransitioningRef.current) changeSlide((currentIndex + 1) % projects.length, 1); }} className={navButtonClass} aria-label="Siguiente Caso de Éxito">
                        <ChevronRight size={28} style={{ color: primaryTextColor }} />
                    </button>
                </div>
            )}
        </div>
    );
};

// Component: App (Main)
const App = () => {
    const [expandedProject, setExpandedProject] = useState(null);
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    const [isAppLoaded, setIsAppLoaded] = useState(false);

    useEffect(() => {
        if (!showSplashScreen) {
            const timer = setTimeout(() => setIsAppLoaded(true), 50);
            return () => clearTimeout(timer);
        }
    }, [showSplashScreen]);

    const handleContactClick = () => {
        window.open(`https://wa.me/521234567890?text=${encodeURIComponent('Hola, me interesa conocer más sobre sus servicios.')}`, '_blank');
    };
    const handleSplashFinished = useCallback(() => setShowSplashScreen(false), []);
    const handleExpandProjectChange = useCallback((projectId) => {
        setExpandedProject(prevId => (prevId === projectId ? null : projectId));
    }, []);


    const headerVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.3 } },
        exit: { opacity: 0, y: -30, transition: { duration: 0.3 } }
    };

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

                body {
                  background-color: #000;
                  color: ${PRIMARY_TEXT_COLOR};
                  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
                  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                  overscroll-behavior-y: contain;
                  overflow: hidden; /* Added from error context */
                }
                .lucide { color: ${PRIMARY_TEXT_COLOR}; }
                .text-gradient-blur {
                  background-image: linear-gradient(to bottom,
                    ${PRIMARY_TEXT_COLOR} 0%,
                    ${PRIMARY_TEXT_COLOR} 1.2em, /* Solid for first line */
                    rgba(216, 236, 241, 0.5) 1.8em, /* Stronger fade start on 2nd line */
                    rgba(216, 236, 241, 0.3) 2.4em,
                    rgba(216, 236, 241, 0.1) 3.0em,
                    rgba(216, 236, 241, 0) 3.6em /* Fully transparent sooner */
                  );
                  -webkit-background-clip: text; background-clip: text;
                  -webkit-text-fill-color: transparent; text-fill-color: transparent;
                  filter: blur(0.6px); /* Adjusted blur */
                }
                /* .slider-dots class is no longer needed as dots are directly styled within the flex container */
                .slider-dot {
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  background-color: rgba(216, 236, 241, 0.3);
                  cursor: pointer;
                  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .slider-dot.active {
                  background-color: ${PRIMARY_TEXT_COLOR};
                  transform: scale(1.3);
                }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(216, 236, 241, 0.3); border-radius: 3px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .pt-safe-top-modal { padding-top: calc(env(safe-area-inset-top) + 1rem); }
            `}</style>

            <AnimatePresence mode="wait">
                {showSplashScreen && <SplashScreen key="splash" onFinished={handleSplashFinished} videoUrl={projects?.[0]?.videoUrl} />}
            </AnimatePresence>

            <AnimatePresence>
                {!showSplashScreen && (
                    <>
                        <motion.header key="app-header" className="fixed top-0 left-0 right-0 p-4 md:p-6 lg:p-8 pt-[calc(env(safe-area-inset-top,0px)+1rem)] z-50" variants={headerVariants} initial="hidden" animate={isAppLoaded && !expandedProject ? "visible" : "exit"}>
                            <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto px-2">
                                <img src="/logo.svg" alt="B4D Logo" className="w-auto h-10 md:h-12 filter drop-shadow-lg" />
                                <motion.button onClick={handleContactClick} className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-black/30 border rounded-full backdrop-blur-sm text-sm md:text-base" style={{ color: PRIMARY_TEXT_COLOR, borderColor: `${PRIMARY_TEXT_COLOR}50` }} whileHover={{ backgroundColor: `${PRIMARY_TEXT_COLOR}20`, scale: 1.05, borderColor: `${PRIMARY_TEXT_COLOR}80`}} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" /><span>Contacto</span>
                                </motion.button>
                            </div>
                        </motion.header>
                        <motion.div key="app-content" initial={{ opacity: 0 }} animate={{ opacity: isAppLoaded ? 1 : 0, transition: { duration: 0.8, delay: 0.1 } }} className="w-full h-screen">
                           {projects.length > 0 && <VideoCarousel expandedProject={expandedProject} onExpandChange={handleExpandProjectChange} primaryTextColor={PRIMARY_TEXT_COLOR} />}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default App;