// Инициализация AOS после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        disable: false
    });
});

// Меню
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

if (burger && menu) {
    burger.addEventListener("click", () => {
        menu.classList.toggle("active");
        burger.classList.toggle("active");
    });
}

// Плавная прокрутка
const scrollBtn = document.getElementById("scrollBtn");
if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}

// СНЕГ
const canvas = document.getElementById("snow");
if (canvas) {
    const ctx = canvas.getContext("2d");
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    
    let snowflakes = [];
    
    // Создаем снежинки
    function createSnowflakes(count) {
        snowflakes = [];
        for(let i = 0; i < count; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 3 + 1,
                speed: Math.random() * 1 + 0.5
            });
        }
    }
    
    createSnowflakes(150);
    
    function drawSnow() {
        if (!ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        
        snowflakes.forEach(flake => {
            ctx.moveTo(flake.x, flake.y);
            ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        });
        
        ctx.fill();
        moveSnow();
    }
    
    function moveSnow() {
        snowflakes.forEach(flake => {
            flake.y += flake.speed;
            
            if (flake.y > canvas.height) {
                flake.y = 0;
                flake.x = Math.random() * canvas.width;
            }
        });
    }
    
    // Запускаем анимацию снега
    setInterval(drawSnow, 33);
    
    window.addEventListener("resize", () => {
        resizeCanvas();
        createSnowflakes(150);
    });
}

// Функция для добавления новостей
function addNews() {
    const title = document.getElementById('newsTitle');
    const desc = document.getElementById('newsDesc');
    const date = document.getElementById('newsDate');
    
    if (!title || !desc || !date) return;
    
    if (!title.value || !desc.value || !date.value) {
        showNotification('Пожалуйста, заполните все поля!', 'error');
        return;
    }
    
    const newsContainer = document.getElementById('newsContainer');
    
    // Форматируем дату
    const formattedDate = new Date(date.value).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Создаем карточку новости
    const newsCard = document.createElement('div');
    newsCard.className = 'news-card';
    
    newsCard.innerHTML = `
        <h3>${escapeHtml(title.value)}</h3>
        <p>${escapeHtml(desc.value)}</p>
        <div class="news-date">${formattedDate}</div>
    `;
    
    // Добавляем новость в начало контейнера
    if (newsContainer.firstChild) {
        newsContainer.insertBefore(newsCard, newsContainer.firstChild);
    } else {
        newsContainer.appendChild(newsCard);
    }
    
    // Очищаем форму
    title.value = '';
    desc.value = '';
    date.value = '';
    
    showNotification('Новость успешно добавлена!', 'success');
}

// Функция для экранирования HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Функция для показа уведомления
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#38bdf8' : '#ef4444'};
        color: ${type === 'success' ? '#0a192f' : 'white'};
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Добавляем демо-новости
document.addEventListener('DOMContentLoaded', function() {
    const demoNews = [
        {
            title: 'День открытых дверей',
            desc: 'Приглашаем абитуриентов и их родителей на день открытых дверей!',
            date: '2026-03-15'
        },
        {
            title: 'Новая лаборатория',
            desc: 'В колледже открылась современная IT-лаборатория',
            date: '2026-03-10'
        },
        {
            title: 'Спортивные соревнования',
            desc: 'Команда колледжа заняла 1 место в городских соревнованиях',
            date: '2026-03-05'
        }
    ];
    
    // Добавляем демо-новости с задержкой
    setTimeout(() => {
        demoNews.forEach(news => {
            const titleInput = document.getElementById('newsTitle');
            const descInput = document.getElementById('newsDesc');
            const dateInput = document.getElementById('newsDate');
            
            if (titleInput && descInput && dateInput) {
                titleInput.value = news.title;
                descInput.value = news.desc;
                dateInput.value = news.date;
                addNews();
            }
        });
    }, 500);
});
