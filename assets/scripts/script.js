window.addEventListener('DOMContentLoaded', e=> {
    const body = document.body;
    const header = createHeader();
    body.prepend(header);
    const main = createElement('main', 'main');
    createGameBoard(main);
    header.after(main);
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
    const gameCounterWrap = createElement('div', 'game__counter-wrap', 'Количество ходов');
    const gameCounter = createElement('span', 'game__counter', 0);
    gameCounterWrap.append(gameCounter);
    const gameValueWrap = createElement('div', 'game__value-wrap', 'Угадано');
    const gameValue = createElement('span', 'game__value', 0);
    gameValueWrap.append(gameValue);
    gameValueWrap.append('из 8');
    game.append(gameCounterWrap, gameValueWrap);
    const gameBoard = createElement('div', 'game__board');
    for(let i = 0; i < 16; i++) {
        gameBoard.append(createElement('div', 'game__item'));
    }
    game.append(gameBoard);
    parentElement.append(game);
}
