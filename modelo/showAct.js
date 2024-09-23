document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const filteredItems = document.getElementById('filtered-items');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // Datos de ejemplo (reemplaza esto con tus propios datos o con una llamada a tu API)
    const items = [
        { id: 1, name: 'Actividad A', date: '2023-05-15', description: 'Descripción de la Actividad A' },
        { id: 2, name: 'Tarea B', date: '2023-06-20', description: 'Descripción de la Tarea B' },
        { id: 3, name: 'Evento C', date: '2023-04-10', description: 'Descripción del Evento C' },
        { id: 4, name: 'Proyecto D', date: '2023-07-05', description: 'Descripción del Proyecto D' },
        { id: 5, name: 'Curso E', date: '2023-03-25', description: 'Descripción del Curso E' },
    ];

    function filterItems(filter, searchTerm = '') {
        let filteredContent = '';
        let itemsToShow = [...items];

        // Aplicar filtro
        if (filter === 'az') {
            itemsToShow.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filter === 'date') {
            itemsToShow.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        // Aplicar búsqueda
        if (searchTerm) {
            itemsToShow = itemsToShow.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        itemsToShow.forEach(item => {
            filteredContent += `
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.description}</p>
                            <p class="card-text"><small class="text-muted">Fecha: ${item.date}</small></p>
                        </div>
                    </div>
                </div>
            `;
        });

        filteredItems.innerHTML = filteredContent || '<p class="col-12">No se encontraron resultados.</p>';
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            filterItems(filter, searchInput.value);
        });
    });

    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        const activeFilter = document.querySelector('.nav-link.active').getAttribute('data-filter');
        filterItems(activeFilter, searchInput.value);
    });

    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const activeFilter = document.querySelector('.nav-link.active').getAttribute('data-filter');
            filterItems(activeFilter, this.value);
        }
    });

    // Inicializar con todos los items
    filterItems('all');
});