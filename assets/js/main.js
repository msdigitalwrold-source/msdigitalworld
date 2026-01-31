(function(){
  function siteRoot(){
    var seg=location.pathname.split('/').filter(Boolean)[0]||'';
    return location.origin + (seg ? '/' + seg + '/' : '/');
  }
  function load(id, path){
    var el=document.getElementById(id);
    if(!el) return;
    fetch(path,{cache:'no-store'}).then(function(r){return r.text()}).then(function(html){el.innerHTML=html;enhanceAfterInclude();}).catch(function(){
      var rel=path.replace(siteRoot(),'');
      fetch(rel).then(function(r){return r.text()}).then(function(html){el.innerHTML=html;enhanceAfterInclude();});
    });
  }
  function normalizeInternalLinks(){
    var base=siteRoot();
    document.querySelectorAll('a[href^="/"]').forEach(function(a){
      var val=a.getAttribute('href');
      if(!val) return;
      val=val.replace(/^\/MSDigital\//i, base);
      if(val.charAt(0)==='/' && val.indexOf(base)!==0){ val=base + val.substring(1); }
      a.setAttribute('href', val);
    });
  }
  function normalizeAssetPaths(){
    var base=siteRoot();
    document.querySelectorAll('img[src^="/"]').forEach(function(img){
      var val=img.getAttribute('src');
      if(!val) return;
      val=val.replace(/^\/MSDigital\//i, base);
      if(val.charAt(0)==='/' && val.indexOf(base)!==0){ val=base + val.substring(1); }
      img.setAttribute('src', val);
    });
  }
  function enhanceAfterInclude(){
    var burger=document.querySelector('.burger');
    var menu=document.querySelector('.menu');
    if(burger&&menu){burger.addEventListener('click',function(){menu.classList.toggle('open')});}
    normalizeInternalLinks();
    normalizeAssetPaths();
    var links=document.querySelectorAll('.menu a');
    var current=location.pathname.replace(/\/$/,'/index.html');
    links.forEach(function(a){
      var p=a.pathname.replace(/\/$/,'/index.html');
      if(a.href && p===current){a.classList.add('active');a.setAttribute('aria-current','page');}
    });

    var triggers=[].slice.call(document.querySelectorAll('.menu .has-dropdown > .trigger'));
    function closeAll(){
      document.querySelectorAll('.menu .has-dropdown.open').forEach(function(li){
        li.classList.remove('open');
        var t=li.querySelector('.trigger'); if(t){t.setAttribute('aria-expanded','false');}
      });
    }
    triggers.forEach(function(btn){
      btn.addEventListener('click',function(e){
        e.preventDefault();
        var li=btn.parentElement; var wasOpen=li.classList.contains('open');
        closeAll();
        if(!wasOpen){ li.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
      });
    });
    document.addEventListener('click',function(e){
      var within=e.target.closest('.menu');
      if(!within){ closeAll(); }
    });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ closeAll(); }});

    document.querySelectorAll('.menu .has-dropdown').forEach(function(li){
      var items=li.querySelectorAll('.submenu a');
      items.forEach(function(a){
        var p=a.pathname.replace(/\/$/,'/index.html');
        if(p===current){ var t=li.querySelector('.trigger'); if(t){ t.classList.add('active'); } }
      });
    });
  }
  document.addEventListener('DOMContentLoaded',function(){
    (function(){
      var ver='20260110-2';
      document.querySelectorAll('link[rel="stylesheet"]').forEach(function(l){
        var href=l.getAttribute('href')||'';
        if(/\/assets\/css\/style\.css/i.test(href)){
          try{
            var u=new URL(href, location.href);
            u.searchParams.set('v', ver);
            l.setAttribute('href', u.toString());
          }catch(e){}
        }
      });
    })();
    load('header', siteRoot()+'partials/header.html');
    load('footer', siteRoot()+'partials/footer.html');

    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target);}})},{threshold:0.12});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});

    var parallaxEls=[].slice.call(document.querySelectorAll('[data-parallax]'));
    if(parallaxEls.length){window.addEventListener('scroll',function(){var y=window.scrollY;parallaxEls.forEach(function(el){var s=el.getAttribute('data-parallax')||'0.2';el.style.transform='translateY('+(y*parseFloat(s)*-1)+'px)';});},{passive:true});}

    document.querySelectorAll('form[data-enhance]')?.forEach(function(f){
      f.addEventListener('submit',function(e){e.preventDefault();var msg=f.querySelector('.form-success');if(msg){msg.style.display='block';msg.focus();}f.reset();});
    });

    var can=document.querySelector('link[rel="canonical"]');
    if(can){ can.setAttribute('href', location.origin + location.pathname); }

    function applyHeaderScrollState(){
      var header=document.querySelector('.header');
      if(!header) return;
      if(window.scrollY>10){header.classList.add('scrolled');}else{header.classList.remove('scrolled');}
    }
    applyHeaderScrollState();
    window.addEventListener('scroll',applyHeaderScrollState,{passive:true});
    window.addEventListener('resize',applyHeaderScrollState);
  });
})();
