const productsContainer = document.getElementById('products');
const filtersForm = document.getElementById('catalog-filters');

function displayProducts(cards) {
    productsContainer.innerHTML = '';
    cards.forEach(card => {
    const productHTML = `
      <article class="product-card">
        <a href="../pages/product.html?productId=${card._id}" class="card-image">
        <img class="card-image" src="${card.image}" alt="product image"  /></a>
        <h3 class="card-title">
          <a href="../pages/product.html?productId=${card._id}">${card.name}</a>
  
  
        </h3>
  
        
        <p class="card-price ">
          <span>
            <span class="price">${card.price}</span>
           
            грн
          </span>
         
  
        </p>
       
  
      </article>
    `;
    productsContainer.insertAdjacentHTML('beforeend', productHTML);
});
}

// Функція для фільтрації карток за ціною
function filterProducts(minPrice, maxPrice) {
    const filteredCards = CardsArray.filter(card => {
        const price = card.discountedPrice || card.price; // Використовуємо знижку, якщо є
        return (minPrice === null || price >= minPrice) && (maxPrice === null || price <= maxPrice);
    });

    displayProducts(filteredCards);
}

// Додаємо обробник події для форми
filtersForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Забороняємо перезавантаження сторінки

    const minPrice = parseInt(document.getElementById('min').value, 10);
    const maxPrice = parseInt(document.getElementById('max').value, 10);

    filterProducts(
        isNaN(minPrice) ? null : minPrice, 
        isNaN(maxPrice) ? null : maxPrice
    );
});

// Початкове відображення всіх продуктів
displayProducts(CardsArray);


// Функція для фільтрації продуктів
function CategoryProducts(categoryId, underCategoryId) {
    let CategoryCards = CardsArray;

    if (categoryId) {
        CategoryCards = CategoryCards.filter(card => card.categoryId === categoryId);
    }
    if (underCategoryId) {
        CategoryCards = CategoryCards.filter(card => card.underCategoryId === underCategoryId);
    }

    displayProducts(CategoryCards);
}

// Отримання параметрів з URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
const subcategory = urlParams.get('subcategory');

// Фільтрація та відображення продуктів
CategoryProducts(category, subcategory);
