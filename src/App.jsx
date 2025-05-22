import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, ChevronDown } from 'lucide-react';

// Datos de ejemplo para los proyectos
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

// Componente VideoCard
const VideoCard = ({ project, isActive, isExpanded, onExpandToggle, isExiting }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isActive && !isExiting) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 500); // Reducido de 700ms a 500ms
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isActive, isExiting, project.id]);

  const cardStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    transform: isExiting ? 'scale(0.85) translateX(-15%)' : 'scale(1) translateX(0%)',
    opacity: isExiting ? 0 : 1,
    transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)' // Reducido de 0.7s a 0.5s
  };

  const handleExpandClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isExiting && isActive) {
      onExpandToggle(project.id);
    }
  };

  const handleModalClick = (e) => {
    const isTextArea = e.target.closest('p, h3, button') || 
                      e.target.tagName === 'P' || 
                      e.target.tagName === 'H3' || 
                      e.target.tagName === 'BUTTON' ||
                      e.target.tagName === 'svg' ||
                      e.target.tagName === 'text' ||
                      e.target.tagName === 'rect' ||
                      e.target.tagName === 'circle' ||
                      e.target.tagName === 'path';
    
    if (!isTextArea) {
      onExpandToggle(project.id);
    }
  };

  return (
    <div style={cardStyle}>
      {/* Video/Image de fondo */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          src={project.videoUrl} 
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            const img = document.createElement('img');
            img.src = `https://via.placeholder.com/800x600/1a1a1a/ffffff?text=${project.brand}`;
            img.className = 'w-full h-full object-cover';
            img.alt = project.brand;
            e.target.parentNode.appendChild(img);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Modal expandido */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
          style={{ zIndex: 100 }}
          onClick={handleModalClick}
        >
          {/* Botón cerrar */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExpandToggle(project.id);
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 text-white hover:text-green-400 transition-all duration-300 rounded-full hover:bg-white/10 animate-slide-down"
            style={{ zIndex: 110 }}
          >
            <ChevronDown className="w-7 h-7 md:w-8 md:h-8" />
          </button>

          {/* Contenido del modal */}
          <div 
            className="h-full w-full flex flex-col p-4 md:p-6 lg:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo de la marca */}
            <div 
              className="mb-6 md:mb-8 lg:mb-10 mt-16 md:mt-16 animate-slide-up"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="h-10 md:h-10 lg:h-12 xl:h-14 w-auto opacity-90">
                <img 
                  src={project.logoPath} 
                  alt={`${project.brand} Logo`}
                  className="h-full w-auto object-contain filter drop-shadow-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Título del proyecto */}
            <h3 
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 md:mb-8 lg:mb-10 text-white animate-slide-up"
              style={{ 
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                animationDelay: '0.4s'
              }}
            >
              {project.title}
            </h3>

            {/* Descripción scrolleable */}
            <div 
              className="flex-1 overflow-hidden animate-slide-up"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="h-full overflow-y-auto pr-2">
                <p 
                  className="text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-white/90 pb-8"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                >
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenido normal (no expandido) - Mejorado posicionamiento */}
      {showContent && !isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 text-white animate-fade-in pb-32 md:pb-16 lg:pb-12 safe-area-bottom">
          {/* Logo de la marca - Implementado con img */}
          <div 
            className="mb-4 md:mb-5 lg:mb-6 animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="h-8 md:h-8 lg:h-10 xl:h-12 w-auto opacity-90">
              <img 
                src={project.logoPath} 
                alt={`${project.brand} Logo`}
                className="h-full w-auto object-contain filter drop-shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Título del proyecto - Con menos margen inferior */}
          <h3 
            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 md:mb-4 lg:mb-5 animate-slide-up leading-tight"
            style={{ 
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              animationDelay: '0.3s'
            }}
          >
            {project.title}
          </h3>

          /* Descripción truncada - Con más espacio y botón más visible */}
          <div
            className="relative cursor-pointer text-content-area animate-slide-up mb-8"
            style={{ animationDelay: '0.4s' }}
            onClick={handleExpandClick}
          >
            <div className="relative overflow-hidden h-20 md:h-16 mb-4">
              <p 
                className="text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed transition-colors duration-200 hover:text-white/80"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
              >
                {project.description.split(' ').map((word, index, words) => {
                  const totalWords = words.length;
                  const fadeStart = Math.floor(totalWords * 0.5);
                  let opacity = 1;
                  
                  if (index >= fadeStart) {
                    const fadeProgress = (index - fadeStart) / (totalWords - fadeStart);
                    opacity = Math.max(0.1, 1 - (fadeProgress * 0.9));
                  }
                  
                  return (
                    <span key={index} style={{ opacity }}>
                      {word}{index < words.length - 1 ? ' ' : ''}
                    </span>
                  );
                })}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
            </div>
            
            {/* Indicador de expansión - Más visible y con mejor posicionamiento */}
            <button
              className="text-green-400 text-sm md:text-sm font-medium bg-black/40 px-4 py-3 rounded-full backdrop-blur-sm hover:text-green-300 hover:bg-black/60 transition-all duration-200 hover:scale-105 active:scale-95 animate-fade-in border border-green-400/40 shadow-lg"
              style={{ 
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                animationDelay: '0.8s'
              }}
              onClick={handleExpandClick}
            >
              ↓ Ver más
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente VideoCarousel
const VideoCarousel = ({ expandedProject, onExpandChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);
  const hasMoved = useRef(false);

  const changeSlide = useCallback((newIndex) => {
    if (isTransitioning || expandedProject) return;
    
    setIsTransitioning(true);
    setNextIndex(newIndex);
    
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 500); // Reducido de 700ms a 500ms
  }, [isTransitioning, expandedProject]);

  // Auto-advance del carrusel - Reducido a 9 segundos
  useEffect(() => {
    if (!isAutoPlaying || expandedProject || isTransitioning) return;

    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % projects.length;
      changeSlide(newIndex);
    }, 9000); // Reducido de 11000ms a 9000ms (2 segundos menos)

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, expandedProject, isTransitioning, changeSlide]);

  // Manejo de touch/drag events
  const handleTouchStart = (e) => {
    if (expandedProject || isTransitioning) return;
    
    const target = e.target;
    const isTextContent = target.closest('.text-content-area') ||
                         target.tagName === 'P' ||
                         target.tagName === 'H3' ||
                         target.tagName === 'BUTTON' ||
                         target.closest('button') ||
                         target.closest('svg');
    
    if (isTextContent) return;
    
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    currentX.current = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = Math.abs(startX.current - currentX.current);
    if (diff > 10) {
      hasMoved.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current || !hasMoved.current) {
      isDragging.current = false;
      hasMoved.current = false;
      return;
    }
    
    isDragging.current = false;
    
    const diff = startX.current - currentX.current;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        const newIndex = (currentIndex + 1) % projects.length;
        changeSlide(newIndex);
      } else {
        const newIndex = (currentIndex - 1 + projects.length) % projects.length;
        changeSlide(newIndex);
      }
    }
    
    hasMoved.current = false;
  };

  const handleExpandToggle = (projectId) => {
    if (isTransitioning || projects[currentIndex].id !== projectId) return;
    
    if (expandedProject === projectId) {
      onExpandChange(null);
      setIsAutoPlaying(true);
    } else {
      onExpandChange(projectId);
      setIsAutoPlaying(false);
    }
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden" 
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      <div className="relative w-full h-full">
        {/* Slide actual */}
        <VideoCard
          key={`current-${currentIndex}`}
          project={projects[currentIndex]}
          isActive={true}
          isExpanded={expandedProject === projects[currentIndex].id}
          onExpandToggle={handleExpandToggle}
          isExiting={isTransitioning}
        />

        {/* Slide entrante */}
        {isTransitioning && (
          <div
            className="absolute inset-0 w-full h-full overflow-hidden animate-slide-in"
          >
            <div className="absolute inset-0 w-full h-full">
              <video 
                src={projects[nextIndex].videoUrl} 
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const img = document.createElement('img');
                  img.src = `https://via.placeholder.com/800x600/1a1a1a/ffffff?text=${projects[nextIndex].brand}`;
                  img.className = 'w-full h-full object-cover';
                  img.alt = projects[nextIndex].brand;
                  e.target.parentNode.appendChild(img);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente principal App
const App = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleContactClick = () => {
    const phoneNumber = '521234567890';
    const message = encodeURIComponent('Hola, me interesa conocer más sobre sus servicios.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slide-down {
          from { 
            opacity: 0; 
            transform: translateY(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slide-in {
          from {
            transform: scale(1.1) translateX(100%);
          }
          to {
            transform: scale(1) translateX(0%);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          opacity: 0;
        }
        
        .animate-slide-down {
          animation: slide-down 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          opacity: 0;
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
        }
        
        /* Mejoras específicas para móviles */
        @media (max-width: 640px) {
          .safe-area-top {
            padding-top: env(safe-area-inset-top, 24px);
          }
          
          .safe-area-bottom {
            padding-bottom: env(safe-area-inset-bottom, 40px);
          }
        }
      `}</style>

      {/* Header - Mejorado para móviles */}
      <header 
        className={`absolute top-0 left-0 right-0 p-4 md:p-6 lg:p-8 pt-12 md:pt-8 lg:pt-8 transition-all duration-400 safe-area-top ${
          expandedProject ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
        style={{ zIndex: expandedProject ? 10 : 50 }}
      >
        <div className="flex items-center justify-between w-full">
          <img 
            src="/logo.svg" 
            alt="B4D Logo" 
            className="w-auto h-10 md:h-10 lg:h-12"
          />

          {/* Botón de contacto - Ajustado para móviles */}
          <button
            onClick={handleContactClick}
            className={`flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 lg:px-6 lg:py-3 bg-transparent border border-white/30 rounded-full text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-sm md:text-base hover:scale-105 active:scale-95 ${isLoaded ? 'animate-slide-up' : ''}`}
            style={{ animationDelay: '0.2s' }}
          >
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base">Contacto</span>
          </button>
        </div>
      </header>

      {/* Texto principal - Optimizado para móviles */}
      <div 
        className={`absolute top-32 md:top-28 lg:top-32 left-4 right-4 md:left-6 md:right-auto lg:left-8 xl:left-12 max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl transition-all duration-400 safe-area-top ${
          expandedProject ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
        style={{ zIndex: expandedProject ? 10 : 40 }}
      >
        <div className={`text-white ${isLoaded ? 'animate-slide-up' : ''}`} style={{ animationDelay: '0.4s' }}>
          <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light mb-4 leading-tight"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
            Creamos <span className="font-bold">productos</span> y{' '}
            <span className="font-bold">experiencias</span> inmersivas
            extraordinarias
          </h1>
        </div>
      </div>

      {/* Carrusel de videos */}
      <VideoCarousel 
        expandedProject={expandedProject}
        onExpandChange={setExpandedProject}
      />
    </>
  );
};

export default App;