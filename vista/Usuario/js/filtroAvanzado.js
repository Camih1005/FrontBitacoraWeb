let usuario = {
    "nombre" : "Carlos Jhoan Aguilar",
    "rol" : "Desarrollador",
    "foto" : ""
}

function initializeFilterSystem() {
    document.body.insertAdjacentHTML('beforeend', `
        <div class="filtroContainer">
        <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top"> <!-- Cambiada la clase a 'sticky-top' -->
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
                    </form>
                </div>
            </div>
        </nav>

        <div class="container mt-4"> <!-- Eliminado el margen superior, ya no es necesario -->
            <div id="filtered-items" class="row">
                <!-- Los elementos filtrados se mostrarán aquí -->
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="activityModal" tabindex="-1" aria-labelledby="activityModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="activityModalLabel">Detalles de la Actividad</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h5 id="modalActivityName"></h5>
                        <p id="modalActivityDescription"></p>
                        <p><small class="text-muted" id="modalActivityDate"></small></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" id="deleteActivityButton">Eliminar Actividad</button>
                        <button type="button" class="btn btn-success" id="completedActivityButton">Actividad Hecha</button>
                        <button type="button" class="btn btn-warning" id="pausedActivityButton">Actividad Pausada</button>
                    </div>
                </div>
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
            cursor: pointer; /* Cambia el cursor al pasar sobre las tarjetas */
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

        if (navLinks.length && filteredItems && searchInput) {
            clearInterval(checkElementsAndInitialize);
            initializeFilter(navLinks, filteredItems, searchInput);
        }
    }, 100);
}

function initializeFilter(navLinks, filteredItems, searchInput) {
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
    <div class="col-12 mb-3">  <!-- Cambiado de col-md-4 a col-12 -->
        <div class="card" data-id="${item.id}">
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

        // Agregar el evento de clic para abrir el modal en las tarjetas
        const cards = filteredItems.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const itemId = card.getAttribute('data-id');
                const item = items.find(i => i.id == itemId);

                // Llenar el modal con la información de la actividad
                document.getElementById('modalActivityName').innerText = item.name;
                document.getElementById('modalActivityDescription').innerText = item.description;
                document.getElementById('modalActivityDate').innerText = item.date;

                // Mostrar el modal
                const activityModal = new bootstrap.Modal(document.getElementById('activityModal'));
                activityModal.show();
            });
        });
    }

    // Inicializar el filtro por defecto
    filterItems('all');

    // Manejo de clics en los enlaces de la barra de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.getAttribute('data-filter');
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
            filterItems(filter, searchInput.value);
        });
    });

    // Manejo de búsqueda en tiempo real
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim();
        filterItems('all', searchTerm);
    });
}

// Iniciar el sistema de filtrado al cargar la página
document.addEventListener('DOMContentLoaded', initializeFilterSystem);
