// Asumimos que esta información del usuario se obtiene de algún sistema de autenticación
let usuario = {
    "id": "5",
    "nombre": "Carlos Jhoan Aguilar",
    "rol": "Desarrollador",
    "foto": ""
};

// Guardamos el ID del usuario en el localStorage para persistencia
localStorage.setItem('usuarioId', usuario.id);

let developerUpdates = [];
let items = []; // Moved to global scope
let searchInput; // Declare searchInput in global scope

function addUpdate(activityId, updateType, details) {
    developerUpdates.push({
        activityId: activityId,
        updateType: updateType,
        timestamp: new Date().toISOString(),
        details: details
    });
}

let objetos = [];
console.log("validando objetos ", objetos);

function prepareActivityData(activity) {
    const data = {
        nombre: activity.name,
        descripcion: activity.description,
        horasUsadas: activity.horasUsadas.toString(),
        fechaInicio: activity.date,
        fechaFin: activity.fechaFin || activity.date,
        idUser: activity.encargado ? activity.encargado.id : "",
        idProyecto: activity.project && activity.project.id ? activity.project.id : 1,
        idEstado: getEstadoId(activity.estado)
    };
    console.log("Datos preparados para enviar:", data);
    return data;
}

function getEstadoId(estadoNombre) {
    const estadoMap = {
        'En Progreso': 1,
        'Finalizado': 2,
        'En Revisión': 3,
        'Pendiente': 4
    };
    return estadoMap[estadoNombre] || 4; // Por defecto, devolvemos 'Pendiente' (4)
}

async function sendUpdatesToServer(activityId) {
    const activity = items.find(item => item.id === activityId);
    if (!activity) {
        console.error('No se encontró la actividad para enviar actualizaciones.');
        return;
    }

    const updatedData = prepareActivityData(activity);
    console.log('Intentando enviar actualizaciones al servidor:', updatedData);

    try {
        const response = await fetch(`https://satisfied-rejoicing-production.up.railway.app/api/actividad/actualizarActividad/${activityId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData)
        });
        if (response.ok) {
            console.log('Actualizaciones enviadas con éxito');
            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            filterItems(document.querySelector('.nav-link.active').getAttribute('data-filter'), searchInput.value.trim());
        } else {
            console.error('Error al enviar actualizaciones');
            const errorText = await response.text();
            console.error('Respuesta del servidor:', errorText);
        }
    } catch (error) {
        console.error('Error al enviar actualizaciones:', error);
    }
}

function initializeFilterSystem() {
    console.log('Inicializando sistema de filtros');
    console.log('Usuario actual:', usuario);

    document.body.insertAdjacentHTML('beforeend', `
        <div class="filtroContainer my-5">
        <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
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
                            <a class="nav-link" href="#" data-filter="description">Por Descripción</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-filter="creationDate">Por Fecha de Creación</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-filter="project">Por Proyecto</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-filter="myActivities">Ver Mis Actividades</a>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" id="searchInput">
                    </form>
                </div>
            </div>
        </nav>

        <div class="container mt-4">
            <div id="filtered-items" class="row">
            </div>
        </div>

        <div id="cronometro" class="position-fixed bottom-0 start-0 m-3 p-3 bg-primary text-white rounded shadow d-none" style="cursor: pointer;">00:00:00</div>

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
                        <!-- Los botones se agregarán dinámicamente aquí -->
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirmModalLabel">Confirmar parada de actividad</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ¿Estás seguro de que quieres parar esta actividad?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="confirmStopButton">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="timeEstimationModal" tabindex="-1" aria-labelledby="timeEstimationModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="timeEstimationModalLabel">Estimación de tiempo</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label for="timeEstimationInput">Ingrese el tiempo estimado para la actividad (en minutos):</label>
                        <input type="number" id="timeEstimationInput" class="form-control">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="confirmTimeEstimationButton">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="finishActivityModal" tabindex="-1" aria-labelledby="finishActivityModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="finishActivityModalLabel">Finalizar Actividad</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ¿Ya terminaste la actividad?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        <button type="button" class="btn btn-primary" id="confirmFinishButton">Sí</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="assignModal" tabindex="-1" aria-labelledby="assignModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="assignModalLabel">Asignar Actividad</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ¿Estás seguro de que quieres asignarte esta actividad?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="confirmAssignButton">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="notificationToast" class="toast position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Notificación</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body" id="notificationMessage"></div>
        </div>
    `);

    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            font-weight: bold;
            text-decoration: underline;
        }
        .card {
            transition: transform 0.3s ease-in-out;
            cursor: pointer;
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
        .card-footer a {
            width: auto;
            height: 50px;
        }
        .my-activity {
            background-color: #e6f7ff !important;
        }
    `;
    document.head.appendChild(style);

    const checkElementsAndInitialize = setInterval(() => {
        const navLinks = document.querySelectorAll('.nav-link');
        const filteredItems = document.getElementById('filtered-items');
        searchInput = document.getElementById('searchInput');

        if (navLinks.length && filteredItems && searchInput) {
            clearInterval(checkElementsAndInitialize);
            console.log('Elementos encontrados, inicializando filtro');
            initializeFilter(navLinks, filteredItems, searchInput);
        }
    }, 100);
}

async function initializeFilter(navLinks, filteredItems, searchInput) {
    console.log('Inicializando filtro');

    const estados = {
        'Pendiente': { color: 'bg-secondary', text: 'Pendiente' },
        'En Progreso': { color: 'bg-warning', text: 'En Progreso' },
        'Finalizado': { color: 'bg-success', text: 'Finalizado' },
        'En Revisión': { color: 'bg-info', text: 'En Revisión' },
        'default': { color: 'bg-danger', text: 'Desconocido' }
    };

    let actividades;
  
    async function itemss() {
        try {
            actividades = await getActividad();
            console.log(actividades);
            items = Array.isArray(actividades) ? actividades : [actividades];
            items = items.map(actividad => {
                console.log('Estado de actividad:', actividad.estado);
                console.log('Proyecto:', actividad.project ? actividad.project.nombre : 'Sin proyecto');
                return {
                    id: actividad.id || 0,
                    name: actividad.nombre || 'Sin nombre',
                    date: actividad.fechaInicio || 'Fecha no disponible',
                    description: actividad.descripcion || 'Sin descripción',
                    creationDate: actividad.fechaInicio || 'Fecha no disponible',
                    project: actividad.project || { nombre: 'Sin proyecto', id: 1 },
                    lider: actividad.project && actividad.project.techLead ? actividad.project.techLead.nombre : 'Sin líder',
                    encargado: actividad.usuario || null,
                    timeEstimation: null,
                    cronometroInterval: null,
                    cronometroStartTime: null,
                    estado: actividad.estado && actividad.estado.nombre ? actividad.estado.nombre : 'Pendiente',
                    horasUsadas: actividad.horasUsadas || 0
                };
            });
            console.log("Items cargados:", items);
            return items;
        } catch (error) {
            console.error("Error al cargar las actividades:", error);
            return [];
        }
    }
    
    items = await itemss();
    console.log('Número de items:', items.length);
    
    if (items.length === 0) {
        console.log("No se cargaron actividades. Usando datos de ejemplo.");
        items = [
            { id: 1, name: 'EJEMPLO', date: '2023-05-15', description: 'Descripción de la Actividad A', creationDate: '2023-01-10', project: { nombre: 'Proyecto 1', id: 1 }, lider: 'Lider 1', encargado: null, timeEstimation: null, cronometroInterval: null, cronometroStartTime: null, estado: 'Pendiente', horasUsadas: 0 },
        ];
    }
    
    console.log(items);
   
    function startCronometro(item) {
        console.log('Iniciando cronómetro para la actividad:', item.id);
        item.cronometroStartTime = Date.now();
        item.cronometroInterval = setInterval(() => {
            const elapsedTime = Date.now() - item.cronometroStartTime;
            const hours = Math.floor(elapsedTime / 3600000);
            const minutes = Math.floor((elapsedTime % 3600000) / 60000);
            const seconds = Math.floor((elapsedTime % 60000) / 1000);
            const cronometroElement = document.getElementById('cronometro');
            cronometroElement.textContent = `Cronómetro: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    function stopCronometro(item) {
        console.log('Deteniendo cronómetro para la actividad:', item.id);
        clearInterval(item.cronometroInterval);
        item.cronometroStartTime = null;
    }

    function highlightText(text, searchTerm) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    async function filterItems(filter, searchTerm = '') {
        console.log(`Aplicando filtro: ${filter}, término de búsqueda: ${searchTerm}`);
        let filteredContent = '';
        let itemsToShow = [...items];

        if (filter === 'description') {
            itemsToShow.sort((a, b) => a.description.localeCompare(b.description));
        } else if (filter === 'creationDate') {
            itemsToShow.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
        } else if (filter === 'project') {
            itemsToShow.sort((a, b) => a.project.nombre.localeCompare(b.project.nombre));
        } else if (filter === 'myActivities') {
            itemsToShow = itemsToShow.filter(item => item.encargado && item.encargado.id === localStorage.getItem('usuarioId'));
        }

        if (searchTerm) {
            itemsToShow = itemsToShow.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        const usuarioId = localStorage.getItem('usuarioId');

        itemsToShow.forEach(item => {
            const highlightedName = highlightText(item.name, searchTerm);
            const highlightedDescription = highlightText(item.description, searchTerm);

            const encargadoText = item.encargado ? `Encargado: ${item.encargado.nombre}` : 'No hay desarrollador asignado';

            const estadoInfo = estados[item.estado] || estados['default'];
            const isMyActivity = item.encargado && item.encargado.id === usuarioId;

            filteredContent += `
                <div class="col-12 mb-3">
                    <div class="card ${isMyActivity ? 'my-activity' : ''}" data-id="${item.id}">
                        <div class="card-body">
                            <h5 class="card-title">${highlightedName}</h5>
                            <p class="card-text">${highlightedDescription}</p>
                            <p class="card-text"><small class="text-muted">Fecha de inicio: ${item.date}</small></p>
                            <p class="card-text"><small class="text-muted">Lider del proyecto: ${item.lider}</small></p>
                            <p class="card-text"><small class="text-muted">Proyecto: ${item.project.nombre}</small></p>
                            <p class="card-text"><small class="text-muted">${encargadoText}</small></p>
                            <p class="card-text"><small class="text-muted">Horas usadas: ${item.horasUsadas}</small></p>
                        </div>
                        <div class="card-footer">
                            <span class="badge ${estadoInfo.color}">${estadoInfo.text}</span>
                        </div>
                    </div>
                </div>
            `;
        });
    
        filteredItems.innerHTML = filteredContent || '<p class="col-12">No se encontraron resultados.</p>';

        const cards = filteredItems.querySelectorAll('.card');
        cards.forEach(card => {
            const itemId = parseInt(card.getAttribute('data-id'), 10);
            const selectedItem = items.find(item => item.id === itemId);
            selectedItem.card = card;

            card.addEventListener('click', () => {
                showActivityModal(selectedItem);
            });
        });
    }

    function showActivityModal(item) {
        console.log('Mostrando modal para la actividad:', item);
        const modalTitle = document.getElementById('modalActivityName');
        const modalDescription = document.getElementById('modalActivityDescription');
        const modalDate = document.getElementById('modalActivityDate');
        const modalFooter = document.querySelector('.modal-footer');

        modalTitle.textContent = item.name;
        modalDescription.textContent = item.description;
        modalDate.textContent = `Fecha de inicio: ${item.date}`;

        modalFooter.innerHTML = '';

        const usuarioId = localStorage.getItem('usuarioId');
        if (item.encargado && item.encargado.id === usuarioId) {
            if (item.estado === 'Pendiente') {
                const startButton = document.createElement('button');
                startButton.textContent = 'Empezar actividad';
                startButton.className = 'btn btn-success';
                startButton.addEventListener('click', () => {
                    console.log('Iniciando actividad:', item.id);
                    item.estado = 'En Progreso';
                    startCronometro(item);
                    addUpdate(item.id, 'start', 'Actividad iniciada');
                    sendUpdatesToServer(item.id);
                    filterItems(document.querySelector('.nav-link.active').getAttribute('data-filter'), searchInput.value.trim());
                    showNotification('Actividad iniciada', 'success');
                });
                modalFooter.appendChild(startButton);
            }

            if (item.estado === 'En Progreso') {
                const pauseButton = document.createElement('button');
                pauseButton.textContent = 'Pausar actividad';
                pauseButton.className = 'btn btn-secondary';
                pauseButton.addEventListener('click', () => {
                    console.log('Pausando actividad:', item.id);
                    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
                    confirmModal.show();
                    document.getElementById('confirmStopButton').onclick = () => {
                        stopCronometro(item);
                        item.estado = 'Pendiente';
                        addUpdate(item.id, 'pause', 'Actividad pausada');
                        sendUpdatesToServer(item.id);
                        filterItems(document.querySelector('.nav-link.active').getAttribute('data-filter'), searchInput.value.trim());
                        confirmModal.hide();
                        showNotification('Actividad pausada', 'info');
                    };
                });
                modalFooter.appendChild(pauseButton);
            }

            const finalizarButton = document.createElement('button');
            finalizarButton.textContent = 'Finalizar actividad';
            finalizarButton.className = 'btn btn-danger';
            finalizarButton.addEventListener('click', () => {
                console.log('Finalizando actividad:', item.id);
                const finishActivityModal = new bootstrap.Modal(document.getElementById('finishActivityModal'));
                finishActivityModal.show();
                document.getElementById('confirmFinishButton').onclick = () => {
                    item.estado = 'Finalizado';
                    addUpdate(item.id, 'finish', 'Actividad finalizada');
                    sendUpdatesToServer(item.id);
                    filterItems(document.querySelector('.nav-link.active').getAttribute('data-filter'), searchInput.value.trim());
                    finishActivityModal.hide();
                    showNotification('Actividad finalizada', 'success');
                };
            });
            modalFooter.appendChild(finalizarButton);

            const timeEstimationButton = document.createElement('button');
            timeEstimationButton.textContent = 'Estimar tiempo';
            timeEstimationButton.className = 'btn btn-primary';
            timeEstimationButton.addEventListener('click', () => {
                console.log('Estimando tiempo para la actividad:', item.id);
                const timeEstimationModal = new bootstrap.Modal(document.getElementById('timeEstimationModal'));
                timeEstimationModal.show();
                document.getElementById('confirmTimeEstimationButton').onclick = () => {
                    const timeEstimation = parseInt(document.getElementById('timeEstimationInput').value, 10);
                    if (timeEstimation > 0) {
                        item.timeEstimation = timeEstimation * 60 * 1000; // Convertir minutos a milisegundos
                        startCronometro(item);
                        addUpdate(item.id, 'estimate', `Tiempo estimado: ${timeEstimation} minutos`);
                        sendUpdatesToServer(item.id);
                        timeEstimationModal.hide();
                    } else {
                        showNotification('Por favor, ingrese un tiempo estimado válido', 'danger');
                    }
                };
            });
            modalFooter.appendChild(timeEstimationButton);
        } else if (!item.encargado) {
            const assignButton = document.createElement('button');
            assignButton.textContent = 'Asignarme esta actividad';
            assignButton.className = 'btn btn-primary';
            assignButton.addEventListener('click', () => {
                const assignModal = new bootstrap.Modal(document.getElementById('assignModal'));
                assignModal.show();
                document.getElementById('confirmAssignButton').onclick = () => {
                    item.encargado = { id: usuarioId, nombre: usuario.nombre };
                    item.estado = 'Pendiente';
                    addUpdate(item.id, 'assign', 'Actividad asignada');
                    sendUpdatesToServer(item.id);
                    filterItems(document.querySelector('.nav-link.active').getAttribute('data-filter'), searchInput.value.trim());
                    assignModal.hide();
                    showNotification('Actividad asignada', 'success');
                };
            });
            modalFooter.appendChild(assignButton);
        }

        // Mostrar el modal
        const modal = new bootstrap.Modal(document.getElementById('activityModal'));
        modal.show();
    }

    function showNotification(message, type) {
        console.log(`Mostrando notificación: ${message}, tipo: ${type}`);
        const toast = new bootstrap.Toast(document.getElementById('notificationToast'));
        const toastBody = document.getElementById('notificationMessage');
        toastBody.textContent = message;
        toastBody.className = `toast-body bg-${type} text-white`;
        toast.show();
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            console.log('Cambiando filtro:', this.getAttribute('data-filter'));
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            const searchTerm = searchInput.value.trim();
            filterItems(filter, searchTerm);
        });
    });

    searchInput.addEventListener('input', () => {
        console.log('Búsqueda actualizada:', searchInput.value.trim());
        const activeFilter = document.querySelector('.nav-link.active').getAttribute('data-filter');
        const searchTerm = searchInput.value.trim();
        filterItems(activeFilter, searchTerm);
    });

    console.log('Aplicando filtro inicial: all');
    filterItems('all');
}

initializeFilterSystem();

async function getActividad() {
    const getCategoriesUrl = 'https://satisfied-rejoicing-production.up.railway.app/api/actividad';
    
    const response = await fetch(getCategoriesUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
  
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Network response was not ok: ${response.statusText} - ${text}`);
    }
  
    return response.json();
}