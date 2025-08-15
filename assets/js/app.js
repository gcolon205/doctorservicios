let providers = [];

async function loadProviders() {
  const response = await fetch('data/providers.json');
  providers = await response.json();
}

function uniqueValues(array, key) {
  const set = new Set(array.map(item => item[key]));
  return Array.from(set).sort();
}

function renderProviderCard(provider) {
  return `
    <div class="col-md-6" data-aos="fade-up">
      <div class="provider-card">
        <img src="${provider.photos && provider.photos.length ? provider.photos[0] : 'recursos/addphoto.jpg'}" alt="${provider.name}">
        <div>
          <h5>${provider.name}</h5>
          <p class="mb-1"><strong>Categoría:</strong> ${provider.category}</p>
          <p class="mb-1"><strong>Municipio:</strong> ${provider.municipio}</p>
          <p class="rating mb-2">${'\u2605'.repeat(Math.round(provider.rating))}</p>
          <a href="provider.html?id=${provider.id}" class="btn btn-outline-primary btn-sm">Ver detalles</a>
        </div>
      </div>
    </div>
  `;
}

function renderProvidersList(list) {
  const container = document.getElementById('providersList');
  if (!container) return;
  container.innerHTML = list.map(renderProviderCard).join('');
}

function renderFilters() {
  const catSelect = document.getElementById('categoryFilter');
  const munSelect = document.getElementById('municipioFilter');
  const categories = uniqueValues(providers, 'category');
  const municipios = uniqueValues(providers, 'municipio');
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    catSelect.appendChild(opt);
  });
  municipios.forEach(mun => {
    const opt = document.createElement('option');
    opt.value = mun;
    opt.textContent = mun;
    munSelect.appendChild(opt);
  });
}

function initProviderListPage() {
  loadProviders().then(() => {
    renderProvidersList(providers);
    renderFilters();
    const fuse = new Fuse(providers, {
      keys: ['name', 'category', 'municipio', 'keywords'],
      threshold: 0.4
    });
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const municipioFilter = document.getElementById('municipioFilter');

    function updateList() {
      let filtered = providers.slice();

      const catVal = categoryFilter.value;
      if (catVal) {
        filtered = filtered.filter(p => p.category === catVal);
      }
      const munVal = municipioFilter.value;
      if (munVal) {
        filtered = filtered.filter(p => p.municipio === munVal);
      }
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        const results = fuse.search(searchTerm);
        const ids = new Set(results.map(r => r.item.id));
        filtered = filtered.filter(p => ids.has(p.id));
      }
      renderProvidersList(filtered);
    }

    searchInput.addEventListener('input', () => {
      clearTimeout(searchInput._timeout);
      searchInput._timeout = setTimeout(updateList, 200);
    });
    categoryFilter.addEventListener('change', updateList);
    municipioFilter.addEventListener('change', updateList);
  });
}

function initProviderDetailPage() {
  loadProviders().then(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const provider = providers.find(p => p.id === id);
    const container = document.getElementById('providerDetail');
    if (!container) return;
    if (!provider) {
      container.innerHTML = '<p>Proveedor no encontrado.</p>';
      return;
    }
    const stars = '\u2605'.repeat(Math.round(provider.rating)) + '\u2606'.repeat(5 - Math.round(provider.rating));
    const servicesList = provider.services.map(s => `<li>${s}</li>`).join('');
    const photos = provider.photos && provider.photos.length ? provider.photos.map(src => `<img src="${src}" class="img-fluid rounded me-2 mb-2" style="max-width:200px;">`).join('') : '';
    const whatsappMessage = encodeURIComponent(`Hola, vengo de Doctor Servicios. Necesito información sobre ${provider.category} en ${provider.municipio}.`);
    const whatsappLink = `https://wa.me/${provider.whatsapp}?text=${whatsappMessage}`;
    container.innerHTML = `
      <div class="row">
        <div class="col-md-4">
          ${photos || '<img src="recursos/addphoto.jpg" class="img-fluid rounded mb-3" alt="Foto del proveedor">'}
        </div>
        <div class="col-md-8">
          <h2>${provider.name}</h2>
          <p><strong>Categoría:</strong> ${provider.category}</p>
          <p><strong>Municipio:</strong> ${provider.municipio}</p>
          <p class="rating"><span>${stars}</span> (${provider.reviewsCount} opiniones)</p>
          <p>${provider.description}</p>
          <h5>Servicios:</h5>
          <ul>${servicesList}</ul>
          <a href="${whatsappLink}" target="_blank" class="btn btn-success"><i class="fa-brands fa-whatsapp"></i> Contactar por WhatsApp</a>
        </div>
      </div>
    `;
  });
}
