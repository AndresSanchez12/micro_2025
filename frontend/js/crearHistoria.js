function cargarSprints() {
    fetch('http://localhost:8000/api/sprints')
      .then(res => res.json())
      .then(data => {
        const select = document.getElementById('sprintSelect');
        select.innerHTML = '<option value="">Selecciona un Sprint</option>';
        data.forEach(sprint => {
          const option = document.createElement('option');
          option.value = sprint.id;
          option.textContent = `${sprint.nombre} (${sprint.fecha_inicio} - ${sprint.fecha_fin})`;
          select.appendChild(option);
        });
      })
      .catch(err => console.error('Error al cargar sprints:', err));
  }
  
  cargarSprints();
  
  document.getElementById('historiaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
  
    const data = {
      titulo: form.titulo.value,
      descripcion: form.descripcion.value,
      responsable: form.responsable.value,
      estado: form.estado.value,
      puntos: parseInt(form.puntos.value),
      fecha_creacion: form.fecha_creacion.value,
      fecha_finalizacion: form.fecha_finalizacion.value,
      sprint_id: parseInt(form.sprint_id.value)
    };
  
    fetch('http://localhost:8000/api/historias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => {
      alert('Historia creada con éxito');
      form.reset();
    })
    .catch(error => {
      alert('Error al crear la historia');
      console.error(error);
    });
  });
  