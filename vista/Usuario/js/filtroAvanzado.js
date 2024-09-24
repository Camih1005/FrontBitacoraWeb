
let usuario = {
    "nombre" : "Carlos Jhoan Aguilar",
    "rol" : "Desarrollador",
    "foto" : ""
}

function initializeFilterSystem() {
    document.body.insertAdjacentHTML('beforeend', `
        <div class="filtroContainer">
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

        <div class="container mt-4">
            <div id="filtered-items" class="row">
            </div>
        </div>

        <div id="cronometro" class="position-fixed bottom-0 start-0 m-3 p-3 bg-primary text-white rounded shadow">Cronómetro: 00:00:00</div>

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
                        <button type="button" class="btn btn-success" id="completedActivityButton">Empezar actividad</button>
                        <button type="button" class="btn btn-warning" id="pausedActivityButton">Pausar actividad</button>
                        <button type="button" class="btn btn-info" id="resumeActivityButton">Reanudar actividad</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirmModalLabel">Confirmar inicio de actividad</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ¿Estás seguro de que quieres empezar esta actividad?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="confirmStartButton">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="timeEstimationModal" tabindex="-1" aria-labelledby="timeEstimationModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h 5 class="modal-title" id="timeEstimationModalLabel">Estim ación de tiempo</h5>
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

        <div id="notificationToast" class="toast position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Notificación</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body" id="notificationMessage"></div>
        </div>
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
        #cronometro {
            cursor: pointer;
            transition: transform 0.3s ease-in-out;
        }
        #cronometro:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);

    const checkElementsAndInitialize = setInterval(() => {
        const navLinks = document.querySelectorAll('.nav-link');
        const filteredItems = document.getElementById('filtered-items');
        const searchInput = document.getElementById('searchInput');
        const cronometroElement = document.getElementById('cronometro');

        if (navLinks.length && filteredItems && searchInput && cronometroElement) {
            clearInterval(checkElementsAndInitialize);
            initializeFilter(navLinks, filteredItems, searchInput, cronometroElement);
        }
    }, 100);
}

function initializeFilter(navLinks, filteredItems, searchInput, cronometroElement) {
    const items = [
        { id: 1, name: 'Actividad A', date: '2023-05-15', description: 'Descripción de la Actividad A', creationDate: '2023-01-10', timeEstimation: null, cronometroInterval: null, cronometroStartTime: null },
        { id: 2, name: 'Tarea B', date: '2023-06-20', description: 'Descripción de la Tarea B', creationDate: '2023-01-15', timeEstimation: null, cronometroInterval: null, cronometroStartTime: null },
        { id: 3, name: 'Evento C', date: '2023-04-10', description: 'Descripción del Evento C', creationDate: '2023-01-20', timeEstimation: null, cronometroInterval: null, cronometroStartTime: null },
        { id: 4, name: 'Proyecto D', date: '2023-07-05', description: 'Descripción del Proyecto D', creationDate: '2023- 01-25', timeEstimation: null, cronometroInterval: null, cronometroStartTime: null },
        { id : 5, name: 'Curso E', date: '2023-03-25', description: 'Descripción del Curso E', creationDate: '2023-02-05', timeEstimation: null, cronometroInterval: null, cronometroStartTime: null },
    ];

    function startCronometro(item) {
        item.cronometroStartTime = Date.now();
        item.cronometroInterval = setInterval(() => {
            const elapsedTime = Date.now() - item.cronometroStartTime;
            const hours = Math.floor(elapsedTime / 3600000);
            const minutes = Math.floor((elapsedTime % 3600000) / 60000);
            const seconds = Math.floor((elapsedTime % 60000) / 1000);
            cronometroElement.textContent = `Cronómetro: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
            const progressBar = document.getElementById(`progress-bar-${item.id}`);
            if (progressBar) {
                const progress = (elapsedTime / item.timeEstimation) * 100;
                progressBar.style.width = `${progress}%`;
                progressBar.ariaValueNow = progress;
                document.getElementById(`progress-text-${item.id}`).textContent = `${Math.round(progress)}%`;
      
                if (progress >= 100) {
                    clearInterval(item.cronometroInterval);
                    showNotification('Se acabó el tiempo de la actividad. Esperamos que todo te haya salido bien.', 'success');
                    playSound('/path/to/your/repo/audio_file.mp3');
                }
            }
        }, 1000);
    }

    function stopCronometro(item) {
        clearInterval(item.cronometroInterval);
        cronometroElement.textContent = 'Cronómetro: 00:00:00';
        item.cronometroStartTime = null;
    }

    function resumeCronometro(item) {
        if (item.cronometroInterval === null) {
            item.cronometroInterval = setInterval(() => {
                const elapsedTime = Date.now() - item.cronometroStartTime;
                const hours = Math.floor(elapsedTime / 3600000);
                const minutes = Math.floor((elapsedTime % 3600000) / 60000);
                const seconds = Math.floor((elapsedTime % 60000) / 1000);
                cronometroElement.textContent = `Cronómetro: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
                const progressBar = document.getElementById(`progress-bar-${item.id}`);
                if (progressBar) {
                    const progress = (elapsedTime / item.timeEstimation) * 100;
                    progressBar.style.width = `${progress}%`;
                    progressBar.ariaValueNow = progress;
                    document.getElementById(`progress-text-${item.id}`).textContent = `${Math.round(progress)}%`;
      
                    if (progress >= 100) {
                        clearInterval(item.cronometroInterval);
                        showNotification('Se acabó el tiempo de la actividad. Esperamos que todo te haya salido bien.', 'success');
                        playSound('/path/to/your/repo/audio_file.mp3');
                    }
                }
            }, 1000);
        }
    }

    function highlightText(text, searchTerm) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    function filterItems(filter, searchTerm = '') {
        let filteredContent = '';
        let itemsToShow = [...items];

        if (filter === 'az') {
            itemsToShow.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filter === 'date') {
            itemsToShow.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (filter === 'description') {
            itemsToShow.sort((a, b) => a.description.localeCompare(b.description));
        } else if (filter === 'creationDate') {
            itemsToShow.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
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

            filteredContent += `
    <div class="col-12 mb-3">
        <div class ="card" data-id="${item.id}">
            <div class="card-body">
                <h5 class="card-title">${highlightedName}</h5>
                <p class="card-text">${highlightedDescription}</p>
                <p class="card-text"><small class="text-muted">Fecha: ${item.date}</small></p>
            </div>
           <div class="progress">
  <div class="progress-bar progress-bar-striped progress-bar-animated" id="progress-bar-${item.id}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
  <span id="progress-text-${item.id}">0%</span>
</div>
        </div>
        
    </div>
`;
        });

        filteredItems.innerHTML = filteredContent || '<p class="col-12">No se encontraron resultados.</p>';

        const cards = filteredItems.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const itemId = parseInt(card.getAttribute('data-id'), 10);
                const selectedItem = items.find(item => item.id === itemId);
                showActivityModal(selectedItem);
            });
        });
    }

    function showActivityModal(item) {
        const modalTitle = document.getElementById('modalActivityName');
        const modalDescription = document.getElementById('modalActivityDescription');
        const modalDate = document.getElementById('modalActivityDate');
        const deleteButton = document.getElementById('deleteActivityButton');
        const completeButton = document.getElementById('completedActivityButton');
        const pauseButton = document.getElementById('pausedActivityButton');
        const resumeButton = document.getElementById('resumeActivityButton');

        modalTitle.textContent = item.name;
        modalDescription.textContent = item.description;
        modalDate.textContent = `Fecha : ${item.date}`;

        // Mostrar el modal
        const modal = new bootstrap.Modal(document.getElementById('activityModal'));
        modal.show();

        completeButton.style.display = item.cronometroInterval ? 'none' : 'inline-block';
        pauseButton.style.display = item.cronometroInterval ? 'inline-block' : 'none';
        resumeButton.style.display = item.cronometroInterval ? 'none' : 'inline-block';

        completeButton.onclick = () => {
            const timeEstimationModal = new bootstrap.Modal(document.getElementById('timeEstimationModal'));
            timeEstimationModal.show();
            document.getElementById('confirmTimeEstimationButton').onclick = () => {
                const timeEstimation = parseInt(document.getElementById('timeEstimationInput').value, 10);
                if (timeEstimation > 0) {
                    item.timeEstimation = timeEstimation * 60 * 1000; // Convertir minutos a milisegundos
                    startCronometro(item);
                    timeEstimationModal.hide();
                } else {
                    showNotification('Por favor, ingrese un tiempo estimado válido', 'danger');
                }
            };
        };

        pauseButton.onclick = () => {
            stopCronometro(item);
            showNotification('Actividad pausada', 'info');
            modal.hide();
        };

        resumeButton.onclick = () => {
            resumeCronometro(item);
            showNotification('Actividad reanudada', 'info');
            modal.hide();
        };

        deleteButton.onclick = () => {
            deleteActivity(item.id);
            modal.hide();
        };
    }

    function deleteActivity(id) {
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items.splice(index, 1);
            filterItems(document.querySelector('.nav-link.active').getAttribute('data-filter'), searchInput.value.trim());
            showNotification('Actividad eliminada', 'info');
        }
    }

    function showNotification(message, type) {
        const toast = new bootstrap.Toast(document.getElementById('notificationToast'));
        const toastBody = document.getElementById('notificationMessage');
        toastBody.textContent = message;
        toastBody.className = `toast-body bg-${type} text-white`;
        toast.show();
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            const searchTerm = searchInput.value.trim();
            filterItems(filter, searchTerm);
        });
    });

    searchInput.addEventListener('input', () => {
        const activeFilter = document.querySelector('.nav-link.active').getAttribute('data-filter');
        const searchTerm = searchInput.value.trim();
        filterItems(activeFilter, searchTerm);
    });

    filterItems('all');
}

initializeFilterSystem();