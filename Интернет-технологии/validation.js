function validateForm() {
    // Получаем значения полей формы
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Проверка валидности email
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Введите корректный email');
        return false;
    }

    // Проверка валидности номера телефона
    var phonePattern = /^\d{11}$/;
    if (!phonePattern.test(phone)) {
        alert('Введите 11 цифр номера телефона');
        return false;
    }

    // Проверка валидности логина
    if (username.length < 4) {
        alert('Логин должен содержать не менее 4 символов');
        return false;
    }

    // Проверка валидности пароля
    if (password.length < 4) {
        alert('Пароль должен содержать не менее 4 символов');
        return false;
    }

    return true;
}