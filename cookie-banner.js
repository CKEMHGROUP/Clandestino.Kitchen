/* ─────────────────────────────────────────────
   CK / JoEs TaBLe — GDPR Cookie Consent
   Lightweight, no dependencies, GDPR Art.7 compliant
   Works on both joestable and clandestino.kitchen
   v1 · June 2026
───────────────────────────────────────────── */
(function(){
  'use strict';

  var STORAGE_KEY = 'ck_cookie_consent';
  var POLICY_URL  = typeof CK_COOKIE_POLICY_URL !== 'undefined'
                    ? CK_COOKIE_POLICY_URL
                    : 'cookie-policy.html';

  // Already consented or declined — do nothing
  if (localStorage.getItem(STORAGE_KEY)) return;

  var banner = document.createElement('div');
  banner.id = 'ck-cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-modal', 'false');
  banner.setAttribute('aria-label', 'Cookie consent');

  banner.innerHTML = [
    '<div class="ck-cb-inner">',
    '  <div class="ck-cb-text">',
    '    <strong>We use cookies</strong>',
    '    <span>This site uses essential cookies only. No tracking, no analytics, no advertising. ',
    '    By continuing you accept our <a href="' + POLICY_URL + '">Cookie Policy</a>.</span>',
    '  </div>',
    '  <div class="ck-cb-actions">',
    '    <button id="ck-cb-accept" class="ck-cb-btn ck-cb-accept">Accept</button>',
    '    <button id="ck-cb-decline" class="ck-cb-btn ck-cb-decline">Decline</button>',
    '  </div>',
    '</div>'
  ].join('');

  var style = document.createElement('style');
  style.textContent = [
    '#ck-cookie-banner{',
    '  position:fixed;bottom:0;left:0;right:0;z-index:9999;',
    '  padding:0;',
    '  animation:ck-slide-up .4s cubic-bezier(.16,1,.3,1) forwards;',
    '}',
    '@keyframes ck-slide-up{from{transform:translateY(100%);opacity:0}to{transform:none;opacity:1}}',
    '.ck-cb-inner{',
    '  max-width:1200px;margin:0 auto;',
    '  display:flex;align-items:center;justify-content:space-between;',
    '  gap:24px;flex-wrap:wrap;',
    '  padding:16px 40px;',
    '  background:var(--dark,#0e0c0a);',
    '  border-top:1px solid rgba(184,154,94,.2);',
    '}',
    '.ck-cb-text{',
    '  font-family:var(--M,"Inter",sans-serif);',
    '  font-size:11px;font-weight:300;letter-spacing:.03em;',
    '  color:rgba(237,232,222,.55);',
    '  display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;',
    '}',
    '.ck-cb-text strong{',
    '  color:rgba(237,232,222,.85);font-weight:400;',
    '  font-family:var(--F,"Raleway",sans-serif);font-size:12px;',
    '  white-space:nowrap;',
    '}',
    '.ck-cb-text a{color:rgba(184,154,94,.8);text-decoration:none;border-bottom:1px solid rgba(184,154,94,.3);}',
    '.ck-cb-text a:hover{color:#b89a5e;}',
    '.ck-cb-actions{display:flex;gap:8px;flex-shrink:0;}',
    '.ck-cb-btn{',
    '  font-family:var(--M,"Inter",sans-serif);',
    '  font-size:9px;font-weight:300;letter-spacing:.2em;text-transform:uppercase;',
    '  border:none;cursor:pointer;padding:0 20px;min-height:36px;',
    '  transition:all .25s;',
    '}',
    '.ck-cb-accept{background:#b89a5e;color:#0e0c0a;}',
    '.ck-cb-accept:hover{background:#ccaa66;}',
    '.ck-cb-decline{background:transparent;color:rgba(237,232,222,.3);border:1px solid rgba(237,232,222,.1);}',
    '.ck-cb-decline:hover{color:rgba(237,232,222,.6);border-color:rgba(237,232,222,.3);}',
    '@media(max-width:640px){',
    '  .ck-cb-inner{padding:14px 20px;flex-direction:column;align-items:flex-start;gap:14px;}',
    '  .ck-cb-actions{width:100%;justify-content:flex-end;}',
    '}'
  ].join('');

  function dismiss(value) {
    localStorage.setItem(STORAGE_KEY, value);
    banner.style.transition = 'transform .3s ease, opacity .3s ease';
    banner.style.transform = 'translateY(100%)';
    banner.style.opacity = '0';
    setTimeout(function(){ banner.remove(); style.remove(); }, 320);
  }

  document.head.appendChild(style);
  document.body.appendChild(banner);

  document.getElementById('ck-cb-accept').addEventListener('click', function(){ dismiss('accepted'); });
  document.getElementById('ck-cb-decline').addEventListener('click', function(){ dismiss('declined'); });
})();
