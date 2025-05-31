fetch('http://localhost:8000/api/historias')
  .then(res => res.json())
  .then(data => {
    let totalFinalizadas = 0;
    let totalPendientes = 0;
    let totalImpedimentos = 0;

    const responsables = {};

    data.forEach(historia => {
      const estado = historia.estado.toLowerCase();
      const responsable = historia.responsable || 'Sin responsable';

      if (!responsables[responsable]) {
        responsables[responsable] = { finalizadas: 0, pendientes: 0, impedimentos: 0 };
      }

      if (estado === 'finalizada') {
        totalFinalizadas++;
        responsables[responsable].finalizadas++;
      } else if (estado === 'impedimento') {
        totalImpedimentos++;
        responsables[responsable].impedimentos++;
      } else {
        totalPendientes++;
        responsables[responsable].pendientes++;
      }
    });

    // Mostrar resumen general
    document.getElementById('totalFinalizadas').textContent = totalFinalizadas;
    document.getElementById('totalPendientes').textContent = totalPendientes;
    document.getElementById('totalImpedimentos').textContent = totalImpedimentos;

    // Mostrar resumen por responsable
    const contenedor = document.getElementById('resumenResponsables');
    for (const [nombre, resumen] of Object.entries(responsables)) {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${nombre}</h3>
        <ul>
          <li>Finalizadas: ${resumen.finalizadas}</li>
          <li>Pendientes: ${resumen.pendientes}</li>
          <li>Impedimentos: ${resumen.impedimentos}</li>
        </ul>
      `;
      contenedor.appendChild(div);
    }
  })
  .catch(err => {
    console.error('Error al cargar historias:', err);
    alert('Error al cargar los datos del informe');
  });
