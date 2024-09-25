let usuario = {
    "id": "1",
    "nombre": "Carlos Jhoan Aguilar",
    "rol": "Desarrollador",
    "foto": ""
};

let developerUpdates = {
    userId: usuario.id,
    activities: []
};

function addUpdate(activityId, updateType, details) {
    developerUpdates.activities.push({
        activityId: activityId,
        updateType: updateType,
        timestamp: new Date().toISOString(),
        details: details
    });
    console.log('Actualización añadida:', developerUpdates);
}

async function sendUpdatesToServer() {
    console.log('Intentando enviar actualizaciones al servidor:', developerUpdates);
    // Comentamos el código de envío real por ahora
    /*
    try {
        const response = await fetch('/api/developer-updates', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(developerUpdates)
        });

        if (response.ok) {
            console.log('Actualizaciones enviadas con éxito');
            developerUpdates.activities = [];
        } else {
            console.error('Error al enviar actualizaciones');
        }
    } catch (error) {
        console.error('Error al enviar actualizaciones:', error);
    }
    */
    console.log('Simulando envío exitoso. Limpiando actividades.');
    developerUpdates.activities = [];
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
                        <button type="button" class="btn btn-success" id="startActivityButton">Empezar actividad</button>
                        <button type="button" class="btn btn-warning" id="pauseActivityButton" style="display: none;">Pausar actividad</button>
                        <button type="button" class="btn btn-danger" id="finishActivityButton" style="display: none;">Finalizar actividad</button>
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
            .card-footer a{
            width : auto;
            height : 50px;
            }
    `;
    document.head.appendChild(style);

    const checkElementsAndInitialize = setInterval(() => {
        const navLinks = document.querySelectorAll('.nav-link');
        const filteredItems = document.getElementById('filtered-items');
        const searchInput = document.getElementById('searchInput');

        if (navLinks.length && filteredItems && searchInput) {
            clearInterval(checkElementsAndInitialize);
            console.log('Elementos encontrados, inicializando filtro');
            initializeFilter(navLinks, filteredItems, searchInput, usuario);
        }
    }, 100);
}

async function initializeFilter(navLinks, filteredItems, searchInput, usuario) {
    console.log('Inicializando filtro');
    let items = [];

    const estados = {
        'Pendiente': { color: 'bg-secondary', text: 'Pendiente' },
        'En Proceso': { color: 'bg-warning', text: 'En Proceso' },
        'Pausada': { color: 'bg-info', text: 'Pausada' },
        'Finalizado': { color: 'bg-success', text: 'Finalizado' },
        'default': { color: 'bg-danger', text: 'Desconocido' }
    };

    async function itemss() {
        try {
            const actividades = await getActividad();
            items = Array.isArray(actividades) ? actividades : [actividades];
            items = items.map(actividad => {
                console.log('Estado de actividad:', actividad.estado);
                return {
                    id: actividad.id,
                    name: actividad.nombre,
                    date: actividad.fechaInicio,
                    description: actividad.descripcion,
                    creationDate: actividad.fechaInicio,
                    project: actividad.proyecto.nombre,
                    lider: actividad.proyecto.techLead.nombre,
                    encargado: actividad.usuario ? actividad.usuario.nombre : null,
                    timeEstimation: null,
                    cronometroInterval: null,
                    cronometroStartTime: null,
                    estado: actividad.estado ? actividad.estado.nombre : 'Pendiente',
                    horasUsadas: actividad.horasUsadas
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

    if (items.length === 0) {
        console.log("No se cargaron actividades. Usando datos de ejemplo.");
        items = [
            { id: 1, name: 'Actividad A', date: '2023-05-15', description: 'Descripción de la Actividad A', creationDate: '2023-01-10', project: 'Proyecto 1', lider: 'Lider 1', encargado: null, timeEstimation: null, cronometroInterval: null, cronometroStartTime: null, estado: 'Pendiente', horasUsadas: 0 },
        ];
    }

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
            itemsToShow.sort((a, b) => a.project.localeCompare(b.project));
        } else if (filter === 'myActivities') {
            itemsToShow = itemsToShow.filter(item => item.encargado === usuario.nombre);
        }

        if (searchTerm) {
            itemsToShow = itemsToShow.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        itemsToShow.forEach(item => {
            const highlightedName = highlightText(item.name, searchTerm);
            const highlightedDescription = highlightText(item.description, searchTerm);

            let asignarButton = '';
            if (item.estado === 'Pendiente' && item.encargado === null ) {
                asignarButton = `<button class="btn btn-primary btn-sm my-2" data-id="${item.id}">Asignarme esta actividad</button>`;
            }

            let finalizarButton = '';
            if (item.encargado === usuario.nombre) {
                finalizarButton = `<button class="btn btn-danger finalizar-actividad" data-id="${item.id}">Finalizar actividad</button>`;
            }

            let pausarButton = '';
            if (item.encargado === usuario.nombre && item.estado === 'En Proceso') {
                pausarButton = `<button class="btn btn-secondary pausar-actividad" data-id="${item.id}">Pausar actividad</button>`;
            }

            let reanudarButton = '';
            if (item.encargado === usuario.nombre && item.estado === 'Pausada') {
                reanudarButton = `<button class="btn btn-success reanudar-actividad" data-id="${item.id}">Reanudar actividad</button>`;
            }

            const encargadoText = item.encargado ? `Encargado: ${item.encargado}` : 'No hay desarrollador asignado';

            const estadoInfo = estados[item.estado] || estados['default'];

            filteredContent += `
                <div class="col-12 mb-3">
                    <div class="card" data-id="${item.id}">
                        <div class="card-body">
                            <h5 class="card-title">${highlightedName}</h5>
                            <p class="card-text">${highlightedDescription}</p>
                            <p class="card-text"><small class="text-muted">Fecha de inicio: ${item.date}</small></p>
                            <p class="card-text"><small class="text-muted">Lider del proyecto: ${item.lider}</small></p>
                            <p class="card-text"><small class="text-muted">Proyecto: ${item.project}</small></p>
                            <p class="card-text"><small class="text-muted">${encargadoText}</small></p>
                            <p class="card-text"><small class="text-muted">Horas usadas: ${item.horasUsadas}</small></p>
                        </div>
                        <div class="card-footer">
                            <span class="badge ${estadoInfo.color}">${estadoInfo.text}</span>
                            ${asignarButton}
                            ${finalizarButton}
                            ${pausarButton}
                            ${reanudarButton}
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

        const asignarButtons = filteredItems.querySelectorAll('.btn-primary');
        asignarButtons.forEach(button => {
            button.addEventListener('click', () => {
                const itemId = parseInt(button.getAttribute('data-id'), 10);
                const selectedItem = items.find(item => item.id === itemId);
                const assignModal = new bootstrap.Modal(document.getElementById('assignModal'));
                assignModal.show();
                document.getElementById('confirmAssignButton').onclick = () => {
                    selectedItem.estado = 'Pendiente';
                    selectedItem.encargado = usuario.nombre;
                    addUpdate(selectedItem.id, 'assign', 'Actividad asignada');
                    filterItems(document.querySelector('.nav-link.active').getAttribute('data-filter'), searchInput.value.trim());
                    assignModal.hide();
                    sendUpdatesToServer();
                };
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

        if (item.encargado === usuario.nombre) {
            if (item.estado === 'Pendiente') {
                const startButton = document.createElement('button');
                startButton.textContent = 'Empezar actividad';
                startButton.className = 'btn btn-success';
                startButton.addEventListener('click', () => {
                    console.log('Iniciando actividad:', item.id);
                    item.estado = 'En Proceso';
                    startCronometro(item);
                    addUpdate(item.id, 'start', 'Actividad iniciada');
                    filterItems(document.querySelector('.nav-link.active').getAttribute('data-filter'), searchInput.value.trim());
                    showNotification('Actividad iniciada', 'success');
                    sendUpdatesToServer();
                });
                modalFooter.appendChild(startButton);
            } else if (item.estado === 'En Proceso') {
                const pauseButton = document.createElement('button');
                pauseButton.textContent = 'Pausar actividad';
                pauseButton.className = 'btn btn-secondary';
                pauseButton.addEventListener('click', () => {
                    console.log('Pausando actividad:', item.id);
                    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
                    confirmModal.show();
                    document.getElementById('confirmStopButton').onclick = () => {
                        stopCronometro(item);
                        item.estado = 'Pausada';
                        addUpdate(item.id, 'pause', 'Actividad pausada');
                        filterItems(document.querySelector('.nav-link.active').getAttribute('data-filter'), searchInput.value.trim());
                        confirmModal.hide();
                        showNotification('Actividad pausada', 'info');
                        sendUpdatesToServer();
                    };
                });
                modalFooter.appendChild(pauseButton);
            } else if (item.estado === 'Pausada') {
                const reanudarButton = document.createElement('button');
                reanudarButton.textContent = 'Reanudar actividad';
                reanudarButton.className = 'btn btn-success';
                reanudarButton.addEventListener('click', () => {
                    console.log('Reanudando actividad:', item.id);
                    startCronometro(item);
                    item.estado = 'En Proceso';
                    addUpdate(item.id, 'resume', 'Actividad reanudada');
                    filterItems(document.querySelector('.nav-link.active').getAttribute('data-filter'), searchInput.value.trim());
                    showNotification('Actividad reanudada', 'success');
                    sendUpdatesToServer();
                });
                modalFooter.appendChild(reanudarButton);
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
                    filterItems(document.querySelector('.nav-link.active').getAttribute('data-filter'), searchInput.value.trim());
                    finishActivityModal.hide();
                    showNotification('Actividad finalizada', 'success');
                    sendUpdatesToServer();
                };
            });
            modalFooter.appendChild(finalizarButton);

            if (item.cronometroInterval === null) {
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
                            timeEstimationModal.hide();
                            sendUpdatesToServer();
                        } else {
                            showNotification('Por favor, ingrese un tiempo estimado válido', 'danger');
                        }
                    };
                });
                modalFooter.appendChild(timeEstimationButton);
            }
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

// Esta función debe ser implementada para obtener las actividades del servidor
async function getActividad() {
    // Implementación de la función para obtener actividades
    // Por ahora, retornamos un array vacío
    return [];
}