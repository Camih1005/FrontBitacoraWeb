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
  

  async function sendUpdatesToServer() {
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
}
