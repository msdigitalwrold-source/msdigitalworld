(function(){
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  var year = document.getElementById('year');

  if (year) year.textContent = String(new Date().getFullYear());

  function closeAllDropdowns(except) {
    document.querySelectorAll('.has-dropdown.open').forEach(function(li){
      if (except && li === except) return;
      li.classList.remove('open');
    });
  }

  function setNavExpanded(expanded){
    if (!navToggle || !nav) return;
    navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    nav.classList.toggle('is-open', expanded);
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function(){
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      setNavExpanded(!expanded);
    });
  }

  document.querySelectorAll('[data-dropdown-trigger]').forEach(function(trigger){
    var parent = trigger.closest('.has-dropdown');
    if (!parent) return;

    trigger.addEventListener('click', function(e){
      var isMobile = window.matchMedia('(max-width: 940px)').matches;
      if (isMobile) {
        e.preventDefault();
        var willOpen = !parent.classList.contains('open');
        closeAllDropdowns(parent);
        parent.classList.toggle('open', willOpen);
      }
    });

    parent.addEventListener('mouseenter', function(){
      var isMobile = window.matchMedia('(max-width: 940px)').matches;
      if (isMobile) return;
      closeAllDropdowns(parent);
      parent.classList.add('open');
    });

    parent.addEventListener('mouseleave', function(){
      var isMobile = window.matchMedia('(max-width: 940px)').matches;
      if (isMobile) return;
      parent.classList.remove('open');
    });
  });

  document.addEventListener('click', function(e){
    var insideDropdown = e.target.closest('.has-dropdown');
    if (!insideDropdown) closeAllDropdowns();

    var insideNav = e.target.closest('#primary-nav') || e.target.closest('.nav-toggle');
    var isMobile = window.matchMedia('(max-width: 940px)').matches;
    if (isMobile && nav && nav.classList.contains('is-open') && !insideNav) {
      setNavExpanded(false);
      closeAllDropdowns();
    }
  });

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      closeAllDropdowns();
      setNavExpanded(false);
    }
  });

  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  if (counters.length) {
    function animateCounter(el) {
      var target = parseInt(el.getAttribute('data-count') || '0', 10);
      if (!isFinite(target) || target <= 0) return;
      var duration = 900;
      var start = 0;
      var startTime = null;
      function tick(ts) {
        if (!startTime) startTime = ts;
        var p = Math.min(1, (ts - startTime) / duration);
        var value = Math.floor(start + (target - start) * (p * (2 - p)));
        el.textContent = String(value);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.35 });

      counters.forEach(function(el){ io.observe(el); });
    } else {
      counters.forEach(animateCounter);
    }
  }

  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reveals.length) {
    function show(el) {
      el.classList.add('is-visible');
    }

    if ('IntersectionObserver' in window) {
      var rio = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            show(entry.target);
            rio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

      reveals.forEach(function(el){ rio.observe(el); });
    } else {
      reveals.forEach(show);
    }
  }
})();
