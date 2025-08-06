// Espera a que todo el contenido del DOM (HTML) esté completamente cargado antes de ejecutar el script.
// Esto asegura que todos los elementos HTML existan y puedan ser manipulados por JavaScript.
document.addEventListener('DOMContentLoaded', () => {

    // --- MANEJO DEL MENÚ MÓVIL ---
    const menuToggle = document.getElementById('menu-toggle'); // Botón para abrir/cerrar el menú móvil
    const mobileMenu = document.getElementById('mobile-menu');   // El menú móvil en sí

    // Verifica que los elementos existan antes de añadir los escuchadores de eventos para evitar errores.
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            // Alterna la clase 'hidden' en el menú móvil para mostrarlo u ocultarlo.
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- MANEJO DEL FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('contact-form');

    // Verifica que el formulario exista.
    if (contactForm) {
        // *** CAMBIO CLAVE AQUÍ: Hemos eliminado e.preventDefault(); ***
        // Ahora el formulario se enviará de forma nativa a la URL de FormSubmit.co
        contactForm.addEventListener('submit', function(e) {
            // FormSubmit.co maneja la redirección a una página de "Gracias" por defecto.
            // Si quieres un mensaje personalizado sin redirigir, necesitaríamos usar fetch en lugar de la acción nativa.
            // Por ahora, para que funcione con FormSubmit.co directamente, simplemente permitimos el envío.
            
            // Opcionalmente, puedes resetear el formulario después de un pequeño retraso,
            // pero FormSubmit.co ya redirige a una página de éxito por defecto.
            // Si no quieres la redirección de FormSubmit.co, necesitarías un enfoque diferente (usando fetch).
            // this.reset(); // Si lo dejas, se reseteará antes de la redirección de FormSubmit.co
        });
    }

    // --- SCROLL SUAVE Y ANIMACIONES AL NAVEGAR ---
    // Selecciona todos los enlaces que apuntan a una sección (su href empieza con '#').
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Evita el salto instantáneo predeterminado.
            
            const targetId = this.getAttribute('href'); // Obtiene el ID de la sección (ej. '#servicios').
            const targetElement = document.querySelector(targetId); // Encuentra el elemento HTML correspondiente.
            
            if (targetElement) {
                // Cálculo para el scroll suave:
                // `offsetTop` es la distancia del elemento desde la parte superior del documento.
                // Restamos la altura del encabezado (`header.offsetHeight`) para que el elemento no quede oculto detrás del menú fijo.
                const offset = document.querySelector('header').offsetHeight || 0; 
                window.scrollTo({
                    top: targetElement.offsetTop - offset, // Posición final del scroll.
                    behavior: 'smooth'                     // Animación de scroll suave.
                });
                
                // Animación de pulsación para las tarjetas de servicio:
                // Si el enlace clickeado es para la sección de servicios, aplica una animación.
                if (targetId === '#servicios') {
                    const cards = document.querySelectorAll('.service-card'); // Selecciona todas las tarjetas de servicio.
                    cards.forEach((card, index) => {
                        // Retrasa la animación de cada tarjeta para un efecto escalonado.
                        setTimeout(() => {
                            card.classList.add('animate-pulse'); // Añade la clase que activa la animación CSS.
                            // Después de 1 segundo, remueve la clase para que la animación no se repita indefinidamente.
                            setTimeout(() => card.classList.remove('animate-pulse'), 1000); 
                        }, index * 200); // Retraso de 200ms por cada tarjeta.
                    });
                }
                
                // Oculta el menú móvil si está abierto después de hacer clic en un enlace.
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // --- ANIMACIÓN DE FADE-IN AL APARECER SECCIONES ---
    // Selecciona todos los elementos que quieres que aparezcan gradualmente.
    const fadeInElements = document.querySelectorAll('section, .service-card, .testimonial-card');
    
    // Crea un Intersection Observer. Este API permite saber cuándo un elemento entra o sale del viewport.
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si el elemento está intersectando (es decir, visible en el viewport)
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';         // Establece la opacidad a 1 (totalmente visible).
                entry.target.style.transform = 'translateY(0)'; // Vuelve a su posición original (sin desplazamiento vertical).
                fadeInObserver.unobserve(entry.target); // Deja de observar el elemento una vez que ha aparecido.
            }
        });
    }, { threshold: 0.1 }); // El observador se activa cuando el 10% del elemento es visible.
    
    // Inicializa los estilos para los elementos con fade-in antes de que aparezcan.
    fadeInElements.forEach(element => {
        element.style.opacity = '0'; // Inicialmente invisibles.
        element.style.transform = 'translateY(20px)'; // Ligeramente desplazados hacia abajo.
        // Define la transición para una aparición suave.
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(element); // Comienza a observar cada elemento.
    });
});
