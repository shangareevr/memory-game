window.addEventListener('DOMContentLoaded', e=> {
    const body = document.body;
    const header = createHeader();
    body.prepend(header);
    const main = createElement('main', 'main');
    createGameBoard(main);
    header.after(main);

    const cards = document.querySelectorAll('.game__item');
    if (cards.length > 0) {
        cards.forEach((card, index)=> {
            card.addEventListener('click', e=> {
                const image = card.querySelector('.game__image');
                image.style.backgroundImage = `url(${images[gameImagesIndxForCard[index]]})`;
                card.classList.add('active');
            })
        })
    }
});

function createHeader() {
    const header = createElement('header', 'header');
    const newGameBtn = createElement('button', 'header__new-game header__btn', 'Новая игра');
    const resultsBtn = createElement('button', 'header__results header__btn', 'Таблица лидеров');
    header.append(newGameBtn, resultsBtn);
    return header;
}

function createElement(tagName, className, text = '' ) {
    const element = document.createElement(`${tagName}`);
    element.className = className;
    element.innerText = text;
    return element;
}

function createGameBoard(parentElement) {
    const game = createElement('div', 'game');
    const gameCounterWrap = createElement('div', 'game__counter-wrap', 'Количество ходов ');
    const gameCounter = createElement('span', 'game__counter', 0);
    gameCounterWrap.append(gameCounter);
    const gameValueWrap = createElement('div', 'game__value-wrap', 'Угадано ');
    const gameValue = createElement('span', 'game__value', 0);
    gameValueWrap.append(gameValue);
    gameValueWrap.append(' из 8');
    game.append(gameCounterWrap, gameValueWrap);
    const gameBoard = createElement('div', 'game__board');
    for(let i = 0; i < images.length * 2; i++) {
        const gameItem = createElement('div', 'game__item');
        const gameImage = createElement('div', 'game__image');
        gameItem.append(gameImage);
        gameBoard.append(gameItem);
    }
    game.append(gameBoard);
    parentElement.append(game);
}

const images = [
    './assets/images/css.svg',
    './assets/images/html.svg',
    './assets/images/js.svg',
    './assets/images/sass.svg',
    './assets/images/ts.svg',
    './assets/images/vite.svg',
    './assets/images/vue.svg',
    './assets/images/webpack.svg'
]

function createRandomArray(min, max, repetitions = 1) {
    //массив с повторениями
    const array = [];
    for (let number = min; number <= max; number++) {
        for (let i = 0; i < repetitions; i++) {
            array.push(number);
        }
    }
    // 2. Перемешиваем массив алгоритмом Fisher-Yates
    for (let i = array.length - 1; i > 0; i--) {
        // Случайный индекс от 0 до i включительно
        const randomIndex = Math.floor(Math.random() * (i + 1));
        // Меняем элементы местами
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

const gameImagesIndxForCard = createRandomArray(0, images.length - 1, 2);