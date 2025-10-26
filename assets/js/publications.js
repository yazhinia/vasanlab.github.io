(function () {
  const target = document.getElementById('scholar-list');
  if (!target) return;

  fetch('assets/data/publications.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(items => {
      // Sort by year desc (fallback to 0)
      items.sort((a, b) => (b.year || 0) - (a.year || 0));

      // Render top 12
      const top = items.slice(0, 12);
      target.innerHTML = top.map(p => {
        const title = p.title || 'Untitled';
        const authors = p.authors || '';
        const venue = [p.venue, p.year].filter(Boolean).join(', ');
        const links = [
          p.pdf && `<a href="${p.pdf}" class="button small">PDF</a>`,
          p.url && `<a href="${p.url}" class="button small alt">Publisher</a>`,
          p.preprint && `<a href="${p.preprint}" class="button small">Preprint</a>`,
          p.code && `<a href="${p.code}" class="button small">Code</a>`
        ].filter(Boolean).join(' ');

        return `
          <article class="post">
            <h3>${title}</h3>
            <p>${authors}${venue ? `. <em>${venue}</em>.` : ''}</p>
            <p>${links}</p>
          </article>`;
      }).join('');
    })
    .catch(err => {
      console.error('Failed to load publications.json', err);
      target.innerHTML = `<p>Couldn’t load the latest items right now. Please try again later.</p>`;
    });
})();
