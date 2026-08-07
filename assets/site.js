/* EatOps — shared site behaviour (Features / Pricing / About / Contact) */
(function(){
  "use strict";

  /* nav background + scroll progress */
  var nav = document.getElementById('nav');
  var sp = document.getElementById('scrollProgress');
  function onScroll(){
    if(nav){ nav.classList.toggle('scrolled', window.scrollY > 40); }
    if(sp){
      var h = document.documentElement.scrollHeight - window.innerHeight;
      sp.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll, {passive:true});
  onScroll();

  /* mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  if(toggle && nav){
    toggle.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.querySelectorAll('.nav-links a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }

  /* scroll reveals */
  var revealObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); revealObs.unobserve(e.target); }
    });
  }, {threshold:0.14});
  document.querySelectorAll('.reveal').forEach(function(el){ revealObs.observe(el); });

  /* contact form -> mailto (no backend needed) */
  var form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var d = new FormData(form);
      var v = function(k){ return (d.get(k) || '').toString().trim(); };
      var subject = 'EatOps demo — ' + (v('cafe') || v('name') || 'New enquiry');
      var lines = [
        'Name: ' + v('name'),
        'Café / Group: ' + v('cafe'),
        'Email: ' + v('email'),
        'Phone: ' + v('phone'),
        'Outlets: ' + v('outlets'),
        '',
        v('message')
      ];
      var href = 'mailto:hello@eatops.co?subject=' + encodeURIComponent(subject) +
                 '&body=' + encodeURIComponent(lines.join('\n'));
      var note = document.getElementById('formNote');
      if(note){ note.style.display = 'block'; }
      window.location.href = href;
    });
  }
})();
