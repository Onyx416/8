// admin-data.js
// Инициализация данных администратора в localStorage

const MASTER_ADMIN = {
    id: 'admin_main',
    name: 'админ',
    phone: '+7 (111) 111-11-11',
    email: 'admin1@gmail.com',
    password: 'админ1234',
    isAdmin: true,
    createdAt: new Date().toISOString(),
    orders: []
};

function initAdminData() {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Удаляем всех пользователей с isAdmin = true (кроме master admin)
    users = users.filter(u => u.isAdmin !== true || u.email === MASTER_ADMIN.email);

    // Проверяем, есть ли уже master admin
    const existingAdmin = users.find(u => u.email === MASTER_ADMIN.email);
    if (!existingAdmin) {
        users.push(MASTER_ADMIN);
    }

    localStorage.setItem('users', JSON.stringify(users));
    console.log('✅ Главный администратор добавлен в систему');
}

// Запускаем инициализацию
initAdminData();