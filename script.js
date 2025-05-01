// script.js: Modal interactivo para Test de Diagnóstico de FOMO

document.addEventListener('DOMContentLoaded', () => {
    const btnEval = document.getElementById('btn-evaluacion');
    const modal = document.getElementById('modal');
    const modalQuestion = document.getElementById('modal-question');
    const modalButtonsContainer = document.getElementById('modal-buttons');
    const modalBtns = document.querySelectorAll('.modal-btn');
    const modalClose = document.getElementById('modal-close');
    const fechaMisteriosa = document.getElementById('fecha-misteriosa').textContent;
  
    const preguntas = [
      '¿Con qué frecuencia revisas redes sociales? (1=nunca, 5=siempre)',
      '¿Te sientes ansioso/a si tus amigos publican planes sin invitarte? (1=poco, 5=mucho)',
      '¿Has dejado de hacer actividades por miedo a perder otras mejores? (1=poco, 5=mucho)',
      '¿Piensas frecuentemente qué hacen los demás mientras tú no estás? (1=poco, 5=mucho)',
      '¿Te cuesta desconectar del teléfono por miedo a perder notificaciones? (1=poco, 5=mucho)'
    ];
  
    let currentQuestion = 0;
    let respuestas = [];
  
    btnEval.addEventListener('click', () => {
      currentQuestion = 0;
      respuestas = [];
      modal.classList.remove('hidden');
      modalButtonsContainer.style.display = 'flex';
      showQuestion();
    });
  
    modalBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const valor = parseInt(btn.dataset.value, 10);
        respuestas.push(valor);
        currentQuestion++;
        if (currentQuestion < preguntas.length) {
          showQuestion();
        } else {
          showResultado();
        }
      });
    });
  
    modalClose.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  
    function showQuestion() {
      modalQuestion.textContent = preguntas[currentQuestion];
    }
  
    function showResultado() {
      const total = respuestas.reduce((ac, v) => ac + v, 0);
      let nivel = '';
      if (total <= 8) nivel = 'Nivel bajo de FOMO. ¡Tu diagnóstico indica control!';
      else if (total <= 16) nivel = 'Nivel moderado de FOMO. Podrías beneficiarte de nuestro tratamiento.';
      else nivel = 'Nivel alto de FOMO. Te recomendamos nuestro tratamiento intensivo.';
  
    modalQuestion.innerHTML =
      `<strong>Resultado:</strong> ${nivel}<br><em style="border: 1px solid; padding: 5px; display: inline-block; margin-top: 1rem;">Inicio del tratamiento: ${fechaMisteriosa}</em>`;
      modalButtonsContainer.style.display = 'none';
    }
  });

  function actualizarHeaderHeight() {
    const h = document.querySelector('.header').offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${h}px`);
  }
  
  // al cargar y al redimensionar
  window.addEventListener('load', actualizarHeaderHeight);
  window.addEventListener('resize', actualizarHeaderHeight);  
  