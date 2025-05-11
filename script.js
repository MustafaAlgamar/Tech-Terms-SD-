
let termsData = [];

// تحميل بيانات JSON
fetch('terms.json')
  .then(response => response.json())
  .then(data => {
    termsData = data.terms;
    populateCategories();
    displayTerms(termsData);
  })
  .catch(error => {
    console.error("فشل في تحميل البيانات:", error);
  });

// دالة عرض المصطلحات
function displayTerms(filteredTerms) {
  const termsContainer = document.getElementById('termsContainer');
  termsContainer.innerHTML = '';

  filteredTerms.forEach(term => {
    const termCard = document.createElement('div');
    termCard.classList.add('col-12', 'col-md-6', 'col-lg-4', 'term-card');
    termCard.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="term-title">term.term</h5>
          <h6 class="category-title">{term.category}</h6>
          <p class="definition">term.definition</p>
          <p><strong>الترجمة:</strong>{term.translation}</p>
        </div>
      </div>
    `;
    termsContainer.appendChild(termCard);
  });
}

// فلترة المصطلحات
function filterTerms() {
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();
  const selectedCategory = document.getElementById('categoryDropdown').value;
const filtered = termsData.filter(term => {
    const matchSearch = term.term.toLowerCase().includes(searchQuery) || term.translation.toLowerCase().includes(searchQuery);
    const matchCategory = !selectedCategory || term.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  displayTerms(filtered);
}

// تعبئة قائمة الفئات
function populateCategories() {
  const categories = [...new Set(termsData.map(term => term.category))];
  const dropdown = document.getElementById('categoryDropdown');

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    dropdown.appendChild(option);
  });

  // ربط الأحداث
  document.getElementById('searchInput').addEventListener('input', filterTerms);
  document.getElementById('categoryDropdown').addEventListener('change', filterTerms);
}
