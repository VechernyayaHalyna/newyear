const audio = document.getElementById('backgroundMusic');

        // Убеждаемся, что музыка начнет играть после загрузки страницы
        window.addEventListener('load', () => {
            audio.play().catch((error) => {
                console.warn("Автоматическое воспроизведение заблокировано браузером:", error);
            });
        });

audio.volume = 0.5;

// устанавливаем триггер для модального окна (название можно изменить)
const modalTrigger = document.getElementsByClassName("trigger")[0];

// получаем ширину отображенного содержимого и толщину ползунка прокрутки
const windowInnerWidth = document.documentElement.clientWidth;
const scrollbarWidth = parseInt(window.innerWidth) - parseInt(document.documentElement.clientWidth);

// привязываем необходимые элементы
const bodyElementHTML = document.getElementsByTagName("body")[0];
const modalBackground = document.getElementsByClassName("modalBackground")[0];
const modalClose = document.getElementsByClassName("modalClose")[0];
const modalActive = document.getElementsByClassName("modalActive")[0];

// функция для корректировки положения body при появлении ползунка прокрутки
function bodyMargin() {
    bodyElementHTML.style.marginRight = "-" + scrollbarWidth + "px";
}

// при длинной странице - корректируем сразу
bodyMargin();

modalTrigger.addEventListener("click", function () {
    // делаем модальное окно видимым
    modalBackground.style.display = "block";

    // если размер экрана больше 1366 пикселей (т.е. на мониторе может появиться ползунок)
    if (windowInnerWidth >= 1366) {
        bodyMargin();
    }

    // позиционируем наше окно по середине, где 175 - половина ширины модального окна
    modalActive.style.left = "calc(50% - " + (175 - scrollbarWidth / 2) + "px)";

    setTimeout(function () {
        const photo = document.querySelector('.animated-photo');
        photo.style.display = 'block'; // Показываем фото
    }, 3000); // 5 секунд

    // Если нужно, чтобы фото исчезло через 10 секунд после открытия:
    setTimeout(function () {
        const photo = document.querySelector('.animated-photo');
        photo.style.display = 'none'; // Скрываем фото
    }, 7000); // 10 секунд
});

// нажатие на крестик закрытия модального окна
modalClose.addEventListener("click", function () {
    modalBackground.style.display = "none";
    if (windowInnerWidth >= 1366) {
        bodyMargin();
    }
});

// закрытие модального окна на зону вне окна, т.е. на фон
modalBackground.addEventListener("click", function (event) {
    if (event.target === modalBackground) {
        modalBackground.style.display = "none";
        if (windowInnerWidth >= 1366) {
            bodyMargin();
        }
    }
});

const poet = document.getElementsByClassName('wishPhrase');


let wish = ['Желаю взять с собою в Новый год\nЛюбовь, мечту, приятные мгновения.\nА праздник пусть с собою принесет\nПобольше сил, здоровья, вдохновения!',
    'Поздравляю с годом Новым,\nБудет он счастливым, добрым, \nПусть исполнит все желания, \nМира, счастья, понимания.',
    'Пусть Новый год преподнесет\nПриятный в жизни поворот! \nЖивите счастливо, спокойно\nИ будьте всем всегда довольны!',
    'Пусть тают снежинки, пусть тают сердца, \nПусть сказке волшебной не будет конца, \nНадежду с собой принесет Новый год, \nИ все долгожданное произойдет!',
    'Ура, я всех вас поздравляю, \nС Новым годом, обнимаю\nИ желаю волшебства, \nЧтоб год прошел ваш на ура!',
    'Ярких хлопушек и впечатлений, \nНовых событий и озарений, \nДрузей самых лучших и волшебства.\nС Новым годом тебя, друг, ура!',
    'Шипит шампанское, ура! \nПусть не шипит весь год Змея. \nЖелаю в этот Новый год\nНе знать печали и забот!',
    'В Новый Год мы снова дети. \nЖдём подарков и чудес. \nПусть огромной будет радость, \nЧто к нам спустится с небес.',
    'С Новым годом поздравляю, \nПодружиться с ним желаю, \nЧтоб карманы золотились, \nВсе мечты осуществились.',
    'В Новый год корзину счастья\nИ мешок любви желаю, \nЧтобы жизнью наслаждаться, \nЭти радости вкушая!',
    'В новогодней суете\nНе забудьте о себе. \nИ найдите без труда\nДля себя мешок добра.',
    'С Новым годом поздравляю, \nПерспектив, высот желаю. \nЧтобы денежек хватало, \nА от счастья в жар бросало!',
    'Пусть Новый год будет хорошим, \nУдачей, счастьем припорошен, \nЖелаю много радостных свершений\nИ добиваться целей без сомнений!',
    'В Новый год желаю денег\nИ любви, что сносит крышу. \nИ чтобы шаги везенья\nПовсеместно было слышно.',
    'Пусть в новое счастье откроются двери, \nИ сбудется всё, во что ты так веришь. \nИ в Новом году всё будет отлично, \nИ станут мечты все реалистичны!',
    'С Новым годом поздравляю, \nАзарта в каждом дне желаю, \nЧтобы жить по полной классно, \nИ чувствовать себя прекрасно.',
    'С Новым годом от души поздравляю, \nМного счастья и смеха желаю! \nСилы, бодрости, денег, уюта, \nВолшебства целый воз и чуда.'
]

function arrayRandElement(arr) {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

let wishDiv = document.getElementsByClassName('wish')[0];
wishDiv.innerHTML = arrayRandElement(wish).replace(/\n/g, '<br>');

const fireworksContainer = document.getElementById('fireworks-container');

// Генерация фейерверков
function createFirework() {
    const numberOfSparks = 20; // Количество "искорок" в одном фейерверке
    const x = Math.random() * window.innerWidth; // Случайная координата X
    const y = Math.random() * window.innerHeight; // Случайная координата Y

    for (let i = 0; i < numberOfSparks; i++) {
        const spark = document.createElement('div');
        spark.classList.add('spark');

        // Случайное направление для каждой искры
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 100 + 50; // Дистанция разлета
        spark.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
        spark.style.setProperty('--y', `${Math.sin(angle) * distance}px`);

        // Позиционирование искры
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;

        fireworksContainer.appendChild(spark);

        // Удаляем искру через 1 секунду
        setTimeout(() => {
            spark.remove();
        }, 1000);
    }
}

// Создаем фейерверки каждые 500 миллисекунд
setInterval(createFirework, 500);


