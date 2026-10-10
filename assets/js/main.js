const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.nav-wrap'))closeMenu();});
const lang=document.querySelector('[data-language]'),languagePage=lang.getAttribute('href');
function syncLanguage(){lang.href=languagePage+location.hash;}syncLanguage();window.addEventListener('hashchange',syncLanguage);
const links=[...nav.querySelectorAll('a')],sections=[...document.querySelectorAll('main section[id]')];
function markSection(){let current=sections[0];for(const section of sections){if(section.getBoundingClientRect().top<=150)current=section;}for(const link of links){const active=link.hash==='#'+current.id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}lang.href=languagePage+'#'+current.id;}
let pending=false;window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(()=>{markSection();pending=false;});}},{passive:true});markSection();syncLanguage();
const dialog=document.querySelector('#lightbox');document.querySelectorAll('[data-lightbox]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();const image=dialog.querySelector('img');image.src=link.href;image.alt=link.querySelector('img')?.alt||'';dialog.showModal();}));dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
