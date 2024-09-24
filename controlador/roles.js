
// export async function getCategories(rolId) {
//     const getCategoriesUrl = `http://satisfied-rejoicing-production.up.railway.app/api/rol/${rolId}`;
    
//     const response = await fetch(getCategoriesUrl, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });

//     if (!response.ok) {
//         const text = await response.text();
//         throw new Error(`Network response was not ok: ${response.statusText} - ${text}`);
//     }

//     return response.json();
// }
