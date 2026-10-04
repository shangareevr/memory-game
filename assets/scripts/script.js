window.addEventListener('DOMContentLoaded', e=> {
    const body = document.body;
    const header = createHeader();
    body.prepend(header);
    const main = createElement('main', 'main');
    createGameBoard(main);
    header.after(main);
    main.after(creatModal());
    let firstIndex = null;
    let secondIndex = null;
    let firstCardIndex = null;
    let secondCardIndex = null;
    let isFirstClick = true;
    let total = 0;
    let totalClick = 0;
    let results = JSON.parse(localStorage.getItem('rshRes') ?? '[]');
    console.log(gameImagesIndxForCard)
    const cards = document.querySelectorAll('.game__item');
    if (cards.length > 0) {
        cards.forEach((card, index)=> {
            card.addEventListener('click', e=> {
                const activeCards = document.querySelectorAll('.game__item.active');
                if (activeCards.length < 2 && !document.querySelector('.game__board.start') && !card.classList.contains('fixed') && !card.classList.contains('active')) {
                    const image = card.querySelector('.game__image');
                    const imageIndex = gameImagesIndxForCard[index];
                    image.style.backgroundImage = `url(${images[imageIndex]})`;
                    card.classList.add('active');

                    if (isFirstClick) {
                        firstIndex = imageIndex;
                        firstCardIndex = index;
                    } else {                        
                        secondIndex = imageIndex;
                        secondCardIndex = index;
                        updateElementValue('.game__counter');
                    }

                    if (!isFirstClick) {
                        totalClick += 1;

                        if (firstIndex === secondIndex ) {
                            firstIndex = null;
                            secondIndex = null;
                            cards[firstCardIndex].className = 'game__item fixed';
                            cards[secondCardIndex].className = 'game__item fixed';
                            firstCardIndex = null;
                            secondCardIndex = null;
                            updateElementValue('.game__value');
                            total++;
                            if (total == images.length) {
                                openModal('Поздравляю вы выиграли', `Количество ходов:  ${totalClick}`);
                                total = 0;
                                results.push([totalClick, Date.now()]);
                                sortAndSaveResult(results);
                            }
                        } else {
                            setTimeout(()=>{
                                cards[firstCardIndex].classList.remove('active');
                                cards[secondCardIndex].classList.remove('active');
                                firstIndex = null;
                                firstCardIndex = null;
                                secondIndex = null;
                                secondCardIndex = null;
                            }, 1000)
                        }
                    }
                    isFirstClick = !isFirstClick;
                }
            })
        })
    }

    const newGameBtns = document.querySelectorAll('.btn-new-game');
    if (newGameBtns.length > 0) {
        newGameBtns.forEach(btn=> {
            btn.addEventListener('click', e=> {
                newGame();
            })
        })
    }

    setTimeout(()=> {
        const board = document.querySelector('.game__board.start');
        if (board) {
            board.classList.remove('start');
        }
    }, 1000)

    const modalOverlay = document.querySelector('.modal__overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click',e=> {
            modalClose();
        })
    }

    const modalCloseBtn = document.querySelector('.modal__close');

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', e=> {
            modalClose();
        })
    }

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            modalClose();
        }
    });
});

function createHeader() {
    const header = createElement('header', 'header');
    const newGameBtn = createElement('button', 'btn-new-game header__btn', 'Новая игра');
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
    const gameBoard = createElement('div', 'game__board start');
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

let gameImagesIndxForCard = createRandomArray(0, images.length - 1, 2);

function updateElementValue(element) {
    const currentElement = document.querySelector(element);
    const currentValue = +currentElement.innerText;
    currentElement.innerText = currentValue + 1;
}

function newGame () {
    modalClose();

    gameImagesIndxForCard = createRandomArray(0, images.length - 1, 2);
    firstIndex = null;
    secondIndex = null;
    firstCardIndex = null;
    secondCardIndex = null;
    isFirstClick = true;
    const cards = document.querySelectorAll('.game__item');
    if (cards.length > 0) {
        cards.forEach(card=> {
            card.className = 'game__item';
        })
    }

    const counter = document.querySelector('.game__counter');

    if (counter) {
        counter.innerText = 0;
    }

    const value = document.querySelector('.game__value');
    if (value) {
        value.innerText = 0;
    }

    const board = document.querySelector('.game__board');
    board.classList.add('start');
    setTimeout(()=> {
        const board = document.querySelector('.game__board.start');
        if (board) {
            board.classList.remove('start');
        }
    }, 1000)
}

function creatModal() {
    const modal = createElement('div', 'modal');
    const overlay = createElement('div', 'modal__overlay');
    const modalWrap = createElement('div', 'modal__content');
    const modalTitle = createElement('div', 'modal__title');
    const modalContent = createElement('div', 'modal__text');
    const modalTable = createElement('div', 'modal__table');
    const tablePosition = createElement('div', 'modal__position', 'место');
    const tableCount = createElement('div', 'modal__count', 'Количество ходов');
    const tableDate = createElement('div','modal__date', 'Дата игры');
    const modalBtns = createElement('div', 'modal__btns');
    const modalClose = createElement('button', 'modal__btn modal__close', 'Закрыть');
    const modalNewGame = createElement('button', 'modal__btn modal__new-game btn-new-game', 'Новая игра');
    modalBtns.append(modalClose, modalNewGame);
    modalTable.append(tablePosition, tableCount, tableDate);
    modalWrap.append(modalTitle, modalContent, modalTable, modalBtns);
    modal.append(overlay, modalWrap);
    return modal;
}

function openModal(title, text) {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.add('active');
        const modalTitle = document.querySelector('.modal__title');
        modalTitle.innerText = title;
        const modalText = document.querySelector('.modal__text');
        modalText.innerText = text;
    }
}

function modalClose() {
    const modal = document.querySelector('.modal.active');
    if (modal) {
        modal.classList.remove('active');
    }
}

function sortAndSaveResult(arr) {
    arr.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0];
        }
        return a[1] - b[1];
    });

    localStorage.setItem('rshRes', JSON.stringify(arr));
    return arr;
}