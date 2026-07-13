const escapeHtml = (value = '') => value.replace(/[&<>'"]/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[character]);
const formatDate = date => new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(`${date}T12:00:00`));
const articleCard = article => `<article class="public-article"><p class="article-meta"><span>${escapeHtml(article.category)}</span><span>${formatDate(article.date)}</span></p><h2><a href="article.html?article=${encodeURIComponent(article.slug)}">${escapeHtml(article.title)}</a></h2><p>${escapeHtml(article.excerpt)}</p><a href="article.html?article=${encodeURIComponent(article.slug)}" class="read-link">Read article <b>→</b></a></article>`;

fetch('data/articles.json')
  .then(response => { if (!response.ok) throw new Error('Could not load articles'); return response.json(); })
  .then(data => {
    const articles = [...(data.articles || [])].sort((a, b) => b.date.localeCompare(a.date));
    const list = document.querySelector('#article-list');
    if (list) list.innerHTML = articles.length ? articles.map(articleCard).join('') : '<p>No articles have been published yet.</p>';
    const page = document.querySelector('#article-page');
    if (page) {
      const slug = new URLSearchParams(window.location.search).get('article');
      const article = articles.find(item => item.slug === slug);
      page.innerHTML = article ? `<article><p class="article-meta"><span>${escapeHtml(article.category)}</span><span>${formatDate(article.date)}</span></p><h1>${escapeHtml(article.title)}</h1><p class="article-excerpt">${escapeHtml(article.excerpt)}</p><div class="article-body">${escapeHtml(article.body).split('\n').filter(Boolean).map(paragraph => `<p>${paragraph}</p>`).join('')}</div></article>` : '<p>That article could not be found.</p>';
      if (article) document.title = `${article.title} — Maine Action Wrestling`;
    }
  })
  .catch(() => {
    document.querySelectorAll('#article-list, #article-page').forEach(element => { element.innerHTML = '<p>Articles will appear here once the site is published.</p>'; });
  });
