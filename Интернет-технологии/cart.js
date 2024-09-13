// Функция для добавления товара в корзину
function addToCart(productId, productName, price, link) {
    // Создаем или получаем корзину из localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Проверяем, есть ли уже такой товар в корзине
    let existingItem = cart.find(item => item.id === productId);
    if (!existingItem) {
        cart.push({ id: productId, name: productName, price: price, quantity: 1, link: link });
    }

    // Обновляем корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Обновляем отображение корзины
    updateCartUI();
}

// Функция удаления товара из корзины
function removeFromCart(productId) {
    // Получаем корзину из localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Удаляем товар с заданным идентификатором из корзины
    let updatedCart = cart.filter(item => item.id !== productId);

    // Обновляем корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Обновляем отображение корзины
    updateCartUI();
}

// Функция для отображения корзины на странице
function updateCartUI() {
    // Получаем корзину из localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Находим элемент, где будет отображаться корзина
    let cartContainer = document.getElementById('cart-container');

    // Очищаем содержимое корзины
    cartContainer.innerHTML = '';

    // Добавляем каждый товар из корзины на страницу
    cart.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.classList.add('cart-item'); // Добавляем класс для стилизации
        itemElement.innerHTML = `
            <p><a href="${item.link}">${item.name}</a> - ${item.price} руб. x ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Удалить</button>
        `;
        cartContainer.appendChild(itemElement);
    });

    // Обновляем отображение общей суммы корзины
    let totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `Общая сумма: ${calculateTotalPrice()} руб.`;
}

// Функция для подсчета общей суммы товаров в корзине
function calculateTotalPrice() {
    // Получаем корзину из localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Суммируем цены всех товаров, учитывая их количество
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return total;
}

// Функция для показа корзины
function showCart() {
    let cartContainer = document.getElementById('cart-container');
    let btnCart = document.getElementById('show-cart-btn');
    let rect = btnCart.getBoundingClientRect(); // Получаем координаты кнопки "Корзина"
    cartContainer.style.top = rect.bottom + 'px'; // Устанавливаем верхнюю границу корзины под кнопкой
    cartContainer.style.left = rect.left + 'px'; // Устанавливаем левую границу корзины по левой границе кнопки
    cartContainer.classList.add('active'); // Показываем корзину
}

// Функция для скрытия корзины при уводе мыши с нее
function hideCart() {
    let cartContainer = document.getElementById('cart-container');
    cartContainer.classList.remove('active'); // Скрываем корзину
}

// Добавляем обработчики событий для кнопки "Корзина"
let btnCart = document.getElementById('show-cart-btn');
btnCart.addEventListener('mouseover', showCart);
btnCart.addEventListener('mouseout', hideCart);

// Добавляем обработчик события для окна корзины, чтобы оно оставалось видимым при наведении мыши на него
let cartContainer = document.getElementById('cart-container');
cartContainer.addEventListener('mouseover', showCart);
cartContainer.addEventListener('mouseout', hideCart);

updateCartUI(); // Вызываем функцию обновления корзины при загрузке страницы
