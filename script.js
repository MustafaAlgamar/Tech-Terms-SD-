let termsData = { terms: [] }; // متغير عام لتخزين البيانات

fetch('terms.json')
  .then(response => response.json())
  .then(data => {
    termsData = data;
    displayTerms(termsData.terms);
  })
  .catch(error => {
    console.error('خطأ في تحميل البيانات:', error);
  });

// دالة لعرض المصطلحات على الصفحة
    function displayTerms(filteredTerms) {
        const termsContainer = document.getElementById('termsContainer');
        termsContainer.innerHTML = '';  // مسح المحتوى السابق

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

    // دالة لتصفية المصطلحات حسب البحث والفئة    // دالة لتصفية المصطلحات حسب البحث والفئة
    function filterTerms() {
        const searchQuery = document.getElementById('searchInput').value.toLowerCase();
        const selectedCategory = document.getElementById('categorySelect').value;const filteredTerms = termsData.terms.filter(term => {
            const matchesSearch = term.term.toLowerCase().includes(searchQuery) || term.translation.toLowerCase().includes(searchQuery);
            const matchesCategory = selectedCategory === '' || term.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        displayTerms(filteredTerms);  // عرض المصطلحات المصفاة
    }

    // استدعاء الدالة لعرض المصطلحات عند تحميل الصفحة
    displayTerms(termsData.terms)
