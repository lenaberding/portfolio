/*
  Lena Berding — Website Script
  -------------------------------
  Steuert das Hamburger-Menü, das FAQ-Akkordeon (nur auf
  live-fashion-illustration.html) und den "E-Mail kopieren"-Button.
  Da jede Seite jetzt eine eigene HTML-Datei ist, braucht es keine
  JavaScript-Seitenumschaltung mehr — normale Links reichen.
*/

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('overlay');
  const burgerBtn = document.getElementById('burgerBtn');
  const overlayClose = document.getElementById('overlayClose');

  function openMenu(){ overlay.classList.add('open'); }
  function closeMenu(){ overlay.classList.remove('open'); }

  if (burgerBtn) burgerBtn.addEventListener('click', openMenu);
  if (overlayClose) overlayClose.addEventListener('click', closeMenu);

  // Menü schließen, wenn ein Link darin angeklickt wird (bevor die neue Seite lädt)
  document.querySelectorAll('.overlay-links a, .overlay-quick a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // FAQ-Akkordeon (nur vorhanden auf live-fashion-illustration.html)
  document.addEventListener('click', (e) => {
    const item = e.target.closest('.faq-item');
    if (item) item.classList.toggle('open');
  });
});

// E-Mail in die Zwischenablage kopieren, mit "Copied!"-Feedback.
// Fallback für Browser/Kontexte, in denen die moderne Clipboard-API blockiert ist.
function copyEmail(btn, email){
  const showFeedback = () => {
    const label = btn.querySelector('.copy-label');
    const original = label.textContent;
    label.textContent = 'Copied!';
    setTimeout(() => { label.textContent = original; }, 1800);
  };
  const fallbackCopy = () => {
    const ta = document.createElement('textarea');
    ta.value = email;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); } catch (err) {}
    document.body.removeChild(ta);
    showFeedback();
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email).then(showFeedback).catch(fallbackCopy);
  } else {
    fallbackCopy();
  }
}

// FAQ-Daten für die Live-Fashion-Illustration-Seite.
// Frage/Antwort hier anpassen, hinzufügen oder entfernen.
const faqData = [
  ["What's the ideal guest number or event size?", "It works for events of any size — an intimate VIP evening where every guest receives a sketch, or a larger event where I draw as many guests as possible within a set time. Expect 8–12 illustrations per hour. I recommend bookings of at least 3 hours."],
  ["What kind of illustrations will be created?", "Expressive fashion sketches focused on silhouette and personality, usually ink and coloured pencil on A6 or A5 fine art paper, customised for your event — your logo, event details, fabric samples or pressed flowers. We decide the design beforehand."],
  ["What do you need on the day?", "A good sized table and a chair — I bring everything else. I arrive 30–45 minutes early to set up before the event begins."],
  ["How are events priced?", "Hourly rate plus material fee plus travel fees if necessary. Send a booking request with your event details for a precise quote and availability."],
  ["Is this a good fit for my brand?", "Yes, if you're a fashion, beauty, jewellery, food or lifestyle brand planning a product launch, VIP event, brand activation or pop-up."]
];

document.addEventListener('DOMContentLoaded', () => {
  const faqList = document.getElementById('faqList');
  if (!faqList) return; // Seite ohne FAQ-Section — nichts zu tun
  faqData.forEach(([q, a]) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `<div class="faq-q"><span>${q}</span><span class="plus">+</span></div><div class="faq-a"><p>${a}</p></div>`;
    faqList.appendChild(item);
  });
});
