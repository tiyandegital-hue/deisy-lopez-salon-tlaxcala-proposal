/* Deisy López Salón — interactions (no data leaves the browser) */
(function () {
  'use strict';

  /* Mobile nav */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? '✕' : '☰';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      }
    });
  }

  /* Occasion picker (Servicios) */
  var pickerBtns = document.querySelectorAll('.picker-btn');
  var pickerResult = document.querySelector('.picker-result');
  var MAP = {
    boda:   { id: 'servicio-novias',   name: 'Especial Novias (Bridal Glam)', note: 'Maquillaje y peinado coordinados con tu vestido y velo.' },
    xv:     { id: 'servicio-xv',       name: 'Paquete Especial XV Años',      note: 'Tiara, ondas voluminosas y un look juvenil para tu noche de gala.' },
    fiesta: { id: 'servicio-maquillaje', name: 'Maquillaje Social & Glam',    note: 'El look de noche para graduaciones, galas y fiestas.' },
    diario: { id: 'servicio-unas',     name: 'Uñas Acrílicas & Arte',         note: 'Sets esculturales y arte a mano alzada para lucir todos los días.' }
  };
  pickerBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      pickerBtns.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      document.querySelectorAll('.service-section').forEach(function (s) { s.classList.remove('highlight'); });
      var pick = MAP[btn.dataset.occasion];
      if (!pick) return;
      var target = document.getElementById(pick.id);
      if (target) {
        target.classList.add('highlight');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (pickerResult) {
        pickerResult.innerHTML = '<strong>Para tu ocasión recomendamos: ' + pick.name + '.</strong> ' + pick.note +
          ' Baja a la sección marcada para ver los detalles y cotizar por Facebook.';
        pickerResult.classList.add('show');
      }
    });
  });

  /* Gallery filters */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('[data-cat]');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      var f = btn.dataset.filter;
      cards.forEach(function (card) {
        var show = f === 'todos' || card.dataset.cat.split(' ').indexOf(f) !== -1;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  /* Contact form (demo only — no data is sent) */
  var form = document.getElementById('reserva-form');
  if (form) {
    // Preselect service from ?servicio= / ?look= param (gallery CTAs)
    var params = new URLSearchParams(window.location.search);
    var pre = params.get('servicio') || params.get('look');
    var select = document.getElementById('servicio');
    if (pre && select) {
      var opt = select.querySelector('option[value="' + pre + '"]');
      if (opt) select.value = pre;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      ['nombre', 'telefono', 'servicio', 'fecha'].forEach(function (id) {
        var input = document.getElementById(id);
        var field = input.closest('.field');
        var ok = input.value && input.value.trim() !== '';
        field.classList.toggle('invalid', !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        var firstBad = form.querySelector('.field.invalid input, .field.invalid select');
        if (firstBad) firstBad.focus();
        return;
      }
      form.style.display = 'none';
      var thanks = document.getElementById('form-thanks');
      if (thanks) {
        thanks.classList.add('show');
        thanks.focus();
      }
    });
    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field');
      if (field) field.classList.remove('invalid');
    });
  }
})();
