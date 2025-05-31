document.getElementById('sprintForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
  
    const data = {
      nombre: form.nombre.value,
      fecha_inicio: form.fecha_inicio.value,
      fecha_fin: form.fecha_fin.value
    };
  
    fetch('http://localhost:8000/api/sprints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      alert(json.message || 'Sprint creado');
      form.reset();
    })
    .catch(err => {
      alert('Error al crear sprint');
      console.error(err);
    });
  });
  