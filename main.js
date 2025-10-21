 document.addEventListener('DOMContentLoaded', function(){
    try{
      const cookieKey = 'dinamo_cookie_consented_v1';
      const banner = document.getElementById('cookieBanner');
      const acceptBtn = document.getElementById('acceptCookies');
      const dismissBtn = document.getElementById('dismissCookies');
      const whatsappEl = document.querySelector('.whatsapp-float');

      function updateWhatsAppOffset(){
        const base = 22;
        if(!banner || !whatsappEl) return document.documentElement.style.setProperty('--whatsapp-bottom', base + 'px');
        const isShown = banner.classList.contains('show');
        if(isShown){
          // ensure layout updated
          const rect = banner.getBoundingClientRect();
          const extra = 12;
          const val = Math.max(base, Math.ceil(rect.height + extra));
          document.documentElement.style.setProperty('--whatsapp-bottom', val + 'px');
        }else{
          document.documentElement.style.setProperty('--whatsapp-bottom', base + 'px');
        }
      }

      // show banner if no consent
      var showBanner = false;
      try{
        const ok = localStorage.getItem(cookieKey);
        if(!ok) showBanner = true;
      }catch(e){ showBanner = true; }
      if(showBanner && banner) banner.classList.add('show');

      // initial offset update
      setTimeout(updateWhatsAppOffset,140);

      if(acceptBtn) acceptBtn.addEventListener('click', function(){
        try{ localStorage.setItem(cookieKey, '1'); }catch(e){}
        if(banner) banner.classList.remove('show');
        updateWhatsAppOffset();
      });
      if(dismissBtn) dismissBtn.addEventListener('click', function(){ if(banner) banner.classList.remove('show'); updateWhatsAppOffset(); });

      window.addEventListener('resize', updateWhatsAppOffset);
      if(banner){
        const obs = new MutationObserver(updateWhatsAppOffset);
        obs.observe(banner, { attributes: true, attributeFilter: ['class'] });
      }
    }catch(e){ console.warn('Cookie banner error', e); }
  });