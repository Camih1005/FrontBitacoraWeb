function initializeFilterSystem() {
    // Insertar HTML
    document.body.insertAdjacentHTML('beforeend', `
        <div class="filtroContainer">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Actividades</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" href="#" data-filter="all">Todos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-filter="az">A-Z</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-filter="date">Por Fecha</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-filter="description">Por Descripción</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-filter="creationDate">Por Fecha de Creación</a>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" id="searchInput">
                        <button class="btn btn-outline-success" type="submit" id="searchButton">Buscar</button>
                    </form>
                </div>
            </div>
        </nav>

        <div class="container mt-4">
            <div id="filtered-items" class="row">
                <!-- Los elementos filtrados se mostrarán aquí -->
            </div>
        </div>
        </div>
    `);

    // Insertar CSS
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            font-weight: bold;
            text-decoration: underline;
        }
        .card {
            transition: transform 0.3s ease-in-out;
        }
        .card:hover {
            transform: scale(1.05);
        }
        #filtered-items {
            min-height: 200px;
        }
        .highlight {
            background-color: yellow;
            font-weight: bold;
        }
        /* Estilos para el menú desplegable en móvil */
        .navbar-collapse {
            z-index: 1050; /* Asegura que esté por encima de otros elementos */
            position: absolute; /* Permite que se superponga */
            background-color: white; /* Fondo blanco */
            transition: all 0.3s ease; /* Transición suave */
            padding: 5px; /* Reduce el padding del menú */
        }
        .navbar-nav .nav-link {
            font-size: 0.85rem; /* Reduce el tamaño de la fuente */
            padding: 4px 8px; /* Ajusta el padding de los enlaces */
        }
        .form-control {
            font-size: 0.85rem; /* Reduce el tamaño de la fuente del input */
        }
        .btn {
            font-size: 0.85rem; /* Reduce el tamaño de la fuente del botón */
            padding: 4px 8px; /* Ajusta el padding del botón */
        }
    `;
    document.head.appendChild(style);

    // Esperar a que los elementos estén disponibles
    const checkElementsAndInitialize = setInterval(() => {
        const navLinks = document.querySelectorAll('.nav-link');
        const filteredItems = document.getElementById('filtered-items');
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');

        if (navLinks.length && filteredItems && searchInput && searchButton) {
            clearInterval(checkElementsAndInitialize);
            initializeFilter(navLinks, filteredItems, searchInput, searchButton);
        }
    }, 100);
}

function initializeFilter(navLinks, filteredItems, searchInput, searchButton) {
    // Datos de ejemplo
    const items = [
        { id: 1, name: 'Actividad A', date: '2023-05-15', description: 'Descripción de la Actividad A', creationDate: '2023-01-10' },
        { id: 2, name: 'Tarea B', date: '2023-06-20', description: 'Descripción de la Tarea B', creationDate: '2023-01-15' },
        { id: 3, name: 'Evento C', date: '2023-04-10', description: 'Descripción del Evento C', creationDate: '2023-01-20' },
        { id: 4, name: 'Proyecto D', date: '2023-07-05', description: 'Descripción del Proyecto D', creationDate: '2023-01-25' },
        { id: 5, name: 'Curso E', date: '2023-03-25', description: 'Descripción del Curso E', creationDate: '2023-02-05' },
    ];

    function highlightText(text, searchTerm) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    function filterItems(filter, searchTerm = '') {
        let filteredContent = '';
        let itemsToShow = [...items];

        // Aplicar filtro
        if (filter === 'az') {
            itemsToShow.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filter === 'date') {
            itemsToShow.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (filter === 'description') {
            itemsToShow.sort((a, b) => a.description.localeCompare(b.description));
        } else if (filter === 'creationDate') {
            itemsToShow.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
        }

        // Aplicar búsqueda
        if (searchTerm) {
            itemsToShow = itemsToShow.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Generar contenido con resaltado
        itemsToShow.forEach(item => {
            const highlightedName = highlightText(item.name, searchTerm);
            const highlightedDescription = highlightText(item.description, searchTerm);

            filteredContent += `
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${highlightedName}</h5>
                            <p class="card-text">${highlightedDescription}</p>
                            <p class="card-text"><small class="text-muted">Fecha: ${item.date}</small></p>
                        </div>
                    </div>
                </div>
            `;
        });

        filteredItems.innerHTML = filteredContent || '<p class="col-12">No se encontraron resultados.</p>';
    }

    // Filtrar al cambiar entre opciones del menú
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            filterItems(filter, searchInput.value);
        });
    });

    // Filtrar al hacer clic en el botón de búsqueda
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        const activeFilter = document.querySelector('.nav-link.active').getAttribute('data-filter');
        filterItems(activeFilter, searchInput.value);
    });

    // Búsqueda en tiempo real
    searchInput.addEventListener('input', function() {
        const activeFilter = document.querySelector('.nav-link.active').getAttribute('data-filter');
        filterItems(activeFilter, this.value);
    });

    // Inicializar con todos los items
    filterItems('all');
}

// Iniciar el sistema de filtro cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFilterSystem);
} else {
    initializeFilterSystem();
}
