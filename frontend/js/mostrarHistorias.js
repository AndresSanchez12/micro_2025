function cargarHistorias() {
    fetch('http://localhost:8000/api/historias')
      .then(res => res.json())
      .then(data => {
        const contenedor = document.getElementById('historiasContainer');
        contenedor.innerHTML = ''; // Limpiar
  
        if (!data.length) {
          contenedor.innerHTML = '<p>No hay historias registradas.</p>';
          return;
        }
  
        // Ordenar por sprint_id
        data.sort((a, b) => a.sprint_id - b.sprint_id);
  
        // Agrupar por sprint_id
        const grupos = {};
        data.forEach(historia => {
          const sprintId = historia.sprint_id || 'Sin Sprint';
          if (!grupos[sprintId]) {
            grupos[sprintId] = [];
          }
          grupos[sprintId].push(historia);
        });
  
        for (const sprintId in grupos) {
          const grupoDiv = document.createElement('div');
          grupoDiv.className = 'sprint-group';
          grupoDiv.innerHTML = `<br><h2>Sprint ID: ${sprintId}</h2>`;
  
          grupos[sprintId].forEach(historia => {
            const card = document.createElement('div');
            card.className = 'historia-card';
            card.innerHTML = `
              <h2>${historia.titulo}</h2>
              <p><strong>Descripción:</strong> ${historia.descripcion}</p>
              <p><strong>Responsable:</strong> ${historia.responsable}</p>
              <p><strong>Estado:</strong> ${historia.estado}</p>
              <p><strong>Puntos:</strong> ${historia.puntos}</p>
              <p><strong>Fecha creación:</strong> ${historia.fecha_creacion}</p>
              <p><strong>Fecha finalización:</strong> ${historia.fecha_finalizacion || '—'}</p>
              <br>
            `;
            grupoDiv.appendChild(card);
          });
  
          contenedor.appendChild(grupoDiv);
        }
      })
      .catch(err => {
        console.error('Error al cargar historias:', err);
        document.getElementById('historiasContainer').innerHTML = '<p>Error al cargar las historias.</p>';
      });
  }
  
  cargarHistorias();
  