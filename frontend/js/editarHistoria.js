let historiaIdGlobal = null;

function cargarSprints(seleccionado) {
  fetch('http://localhost:8000/api/sprints')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('sprintSelect');
      select.innerHTML = '<option value="">Selecciona un Sprint</option>';
      data.forEach(sprint => {
        const option = document.createElement('option');
        option.value = sprint.id;
        option.textContent = sprint.nombre + ' (' + sprint.fecha_inicio + ' - ' + sprint.fecha_fin + ')';
        if (sprint.id === seleccionado) option.selected = true;
        select.appendChild(option);
      });
    })
    .catch(err => console.error('Error al cargar sprints:', err));
}

document.getElementById('buscarForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('historiaId').value);
  if (!id) return alert("ID inválido");

  fetch(`http://localhost:8000/api/historias/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Historia no encontrada");
      return res.json();
    })
    .then(({ historia }) => {
      historiaIdGlobal = historia.id;
      const form = document.getElementById('historiaForm');
      form.titulo.value = historia.titulo;
      form.descripcion.value = historia.descripcion;
      form.responsable.value = historia.responsable;
      form.estado.value = historia.estado;
      form.puntos.value = historia.puntos;
      form.fecha_creacion.value = historia.fecha_creacion;
      form.fecha_finalizacion.value = historia.fecha_finalizacion || '';
      cargarSprints(historia.sprint_id);
      form.style.display = 'block';
    })
    .catch(err => {
      alert('No se pudo cargar la historia');
      console.error(err);
    });
});

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

  fetch(`http://localhost:8000/api/historias/${historiaIdGlobal}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(json => {
    alert('Historia actualizada con éxito');
    form.reset();
    form.style.display = 'none';
  })
  .catch(error => {
    alert('Error al actualizar la historia');
    console.error(error);
  });
});
