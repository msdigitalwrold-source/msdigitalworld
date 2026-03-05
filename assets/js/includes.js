(function () {
  function setActiveNavLink(root) {
    try {
      var path = window.location.pathname.split('/').pop() || 'index.html';
      var links = root.querySelectorAll('.nav-link[href]');
      links.forEach(function (a) {
        a.classList.remove('is-active');
        var href = a.getAttribute('href');
        if (href === path) a.classList.add('is-active');
      });
    } catch (e) {
      // no-op
    }
  }

  function inject(selector, url) {
    var mount = document.querySelector(selector);
    if (!mount) return Promise.resolve(null);

    return fetch(url, { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error('Failed to load ' + url + ' (' + r.status + ')');
        return r.text();
      })
      .then(function (html) {
        mount.innerHTML = html;
        setActiveNavLink(mount);
        return mount;
      })
      .catch(function () {
        return null;
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    inject('#site-nav', 'partials/navbar.html');
  });
})();
