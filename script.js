/*
  Lena Berding — Website Script
  -------------------------------
  Steuert das Hamburger-Menü, das FAQ-Akkordeon (nur auf
  live-fashion-illustration.html) und den "E-Mail kopieren"-Button.
  Da jede Seite jetzt eine eigene HTML-Datei ist, braucht es keine
  JavaScript-Seitenumschaltung mehr — normale Links reichen.
*/

// ---------- Masonry-Galerie (editorial-illustration.html + series-*.html) ----------
// Verteilt die Fotos automatisch auf gleich breite Spalten (2-3, je nach
// Bildschirmbreite) — unabhängig vom Seitenverhältnis der einzelnen Fotos.
// Jedes neue Foto wird immer in die aktuell kürzeste Spalte einsortiert, damit
// keine Spalte leer bleibt und alle Spalten die Breite gleichmäßig ausnutzen.
(function () {
  function columnsForWidth(width) {
    if (width < 560) return 1;
    if (width < 900) return 2;
    return 3;
  }

  function layout(container) {
    const items = container._masonryItems
      || Array.from(container.children).filter((el) => el.classList.contains('masonry-item'));
    if (!items.length) return;
    container._masonryItems = items;

    const cols = columnsForWidth(container.clientWidth || container.offsetWidth);
    container.innerHTML = '';
    const columns = [];
    const heights = [];
    for (let i = 0; i < cols; i++) {
      const col = document.createElement('div');
      col.className = 'masonry-col';
      container.appendChild(col);
      columns.push(col);
      heights.push(0);
    }

    items.forEach((item) => {
      let target = 0;
      for (let i = 1; i < cols; i++) { if (heights[i] < heights[target]) target = i; }
      columns[target].appendChild(item);
      const img = item.querySelector('img');
      const ratio = (img && img.naturalWidth && img.naturalHeight)
        ? img.naturalHeight / img.naturalWidth
        : 1.2; // Schätzwert, solange das Bild noch nicht geladen ist
      heights[target] += ratio;
    });
  }

  function initMasonry() {
    const containers = document.querySelectorAll('.masonry');
    if (!containers.length) return;

    containers.forEach(layout);

    // Sobald alle Bilder einer Galerie geladen sind, einmal neu einsortieren —
    // dann stimmt die Spaltenverteilung auch für Bilder mit unbekanntem Format.
    containers.forEach((container) => {
      let pending = 0;
      container.querySelectorAll('img').forEach((img) => {
        if (!img.complete) {
          pending++;
          img.addEventListener('load', () => {
            pending--;
            if (pending === 0) layout(container);
          }, { once: true });
        }
      });
    });

    // Bei Fenstergröße-Änderung (z. B. Handy drehen) Spaltenzahl neu berechnen.
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => containers.forEach(layout), 150);
    });
  }

  document.addEventListener('DOMContentLoaded', initMasonry);
})();

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

// E-Mail-Adresse erst zur Laufzeit aus zwei Teilen zusammensetzen, damit sie nirgendwo
// als fertiger String im Quellcode steht (Schutz gegen simple Scraper-Bots, die HTML/Text
// nach E-Mail-Mustern durchsuchen — auch auf GitHub selbst). Betrifft alle Elemente mit
// data-email-user/data-email-domain (Menü-Links, Footer-Links, Copy-Button in den
// "Let's talk"-Sektionen, Impressum/Datenschutz-Kontaktzeile).
function initEmailProtection() {
  document.querySelectorAll('[data-email-user]').forEach(function (el) {
    const address = el.dataset.emailUser + '@' + el.dataset.emailDomain;

    if (el.tagName === 'A' && !el.getAttribute('href')) {
      el.href = 'mailto:' + address;
    }
    if (el.children.length === 0 && el.textContent.trim() === '') {
      el.textContent = address;
    }
    if (el.classList.contains('copy-btn')) {
      el.addEventListener('click', function () { copyEmail(el, address); });
    }
  });
}
document.addEventListener('DOMContentLoaded', initEmailProtection);

// FAQ-Daten für die Live-Fashion-Illustration-Seite.
// Frage/Antwort hier anpassen, hinzufügen oder entfernen.
const faqData = [
  ["What's the ideal guest number or event size?", "It works for events of any size. It can be an intimate VIP evening where every guest receives a sketch, or a larger event where I draw as many guests as possible within a set time window. Depending on your creative needs and number of guests, the amount of illustrations can vary from 8-12 per hour (3-5 mins per illustration). I recommend bookings of at least 3 hours."],
  ["What kind of illustrations will be created?", "I create expressive fashion sketches that focus on silhouette and personality. I usually draw in ink and coloured pencil on A6 or A5 fine art paper. The paper can be customised for your event. This could include your logo, event details, a custom illustration, fabric samples, lipstick swatches, pressed flowers ... Let's talk about the different ways you can make your brand stand out."],
  ["What do you need on the day?", "A good sized table, a chair and decent lighting. I bring everything else. On the day of your event, I will arrive 30-45 mins earlier to set up before the event begins."],
  ["How are events priced?", "Hourly rate + material fee + travel fees (if necessary). Free within Berlin and surroundings. A 30% deposit secures your booking. Please send a booking request with your event details for precise quotes and availability."],
  ["What's it like to work with you?", "I'm easy to work with and I know how to read a room. I speak German, English, Spanish, and Russian, and adapt easily to different guests and event settings. My goal is to make the process feel effortless for everyone."],
  ["Is this a good fit for my brand?", "Yes, if you're planning:<ul><li>a fashion brand</li><li>a beauty, jewellery, food, or lifestyle brand</li><li>a product launch, VIP event, brand activation, or a pop-up event</li></ul>"]
];

document.addEventListener('DOMContentLoaded', () => {
  const faqList = document.getElementById('faqList');
  if (!faqList) return; // Seite ohne FAQ-Section — nichts zu tun
  faqData.forEach(([q, a]) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `<div class="faq-q"><span>${q}</span><span class="plus">+</span></div><div class="faq-a">${a}</div>`;
    faqList.appendChild(item);
  });
});
