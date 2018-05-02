/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__field__ = __webpack_require__(3);


class Game {
    constructor(data) {
        this.field; //поле
    }
    start() {
        let width = 8;
        let height = 3;
        let card_back = 2;
        let back_btns = document.getElementsByClassName('choose_back');
        let size_btns = document.getElementsByClassName('choose_size');

        document.querySelector('.back_article').onclick = (event) =>{ //делигирование события установления рубашки
            if(event.target.classList.contains('choose_back')){
                card_back = event.target.value;
                this.set_cardBack(card_back);
            }
        }
        document.querySelector('.size_article').onclick = (event) =>{ //делигирование события установления размера потя
            if(event.target.classList.contains('choose_size')){
                width = event.target.value * 2;
                this.create_field(width, height, card_back);
            }
        }

        this.create_field(width, height, card_back);

        document.querySelector('#playAgain').onclick = () => {
            this.create_field(width, height, card_back);
            this.show_startPage();
        }
        this.show_startPage();
    }
    reset_gameData() {
        document.querySelector('.game-field').innerHTML = '';
        document.getElementById('clicks').innerHTML = 0;
    }

    create_field(width, height, card_back) {
        this.field = new __WEBPACK_IMPORTED_MODULE_0__field__["a" /* Field */](width, height);
        let row = '<div class="row">';
        let field_area = document.querySelector('.game-field');
        this.reset_gameData(); //обнуляем все данные
        this.set_cardBack(card_back); //задаем рубашку
        for (let i = 0; i < width; i++) //создаем строку поля
            row += '<div class="card move"></div>';
        row += '</div>';
        for (let i = 0; i < height; i++) //создаем ячейки поля
            field_area.innerHTML += row;
        for (let item of document.getElementsByClassName('card')) // зададим рандомность для постоянного движения карт
            item.style.animationDelay = Math.random() * (3 - 0) + 's';
        this.field.fill_cells(document.getElementsByClassName('card')); //заполним карты значениями
    }

    set_cardBack(val) {
        document.querySelector('.game-field').style.setProperty('--card-back', 'url("../media/img/back/card_back_' + val + '.gif")');
    }
    show_startPage() {
        document.location = '#startPage';
    }
    static remember_user(){
        let data = {};
        data.first_name = document.getElementById('inputFName').value || 'NoName';
        data.last_name = document.getElementById('inputLName').value || 'NoName';
        data.email = document.getElementById('inputEmail').value || 'NoEmail';
        window.localStorage.setItem('current',JSON.stringify(data));
    }
    static show_winPage() {
        document.location = '#winPage';
    }
    static add_to_score() {
        let data = JSON.parse(window.localStorage.getItem('current'))
        data.clicks = document.getElementById('clicks').innerHTML;
        data.time = document.getElementById('time').innerHTML;
        let score = JSON.parse(window.localStorage.getItem('score')) || [];
        if(score.length == 10 ) score.pop();
        score.push(data);
        window.localStorage.setItem('score',JSON.stringify(score));
    }
    static count_clicks() {
        document.getElementById('clicks').innerHTML = +document.getElementById('clicks').innerHTML + 1;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Card {
    constructor(value, dom_el) {
        this.value = value; //значение карточки
        this.dom_el = dom_el; //элемент из DOM, закрепленный за карточкой
    }
    show_me() {
        this.set_class('flipIn');
    }
    show_hide(show) {
        let time;
        if (show) { //если нужно показать и спрятать
            this.set_class('flipInOut');
            time = 2000;
        } else { //если нужно только спрятать
            this.set_class('flipOut');
            time = 1000;
        }
        setTimeout(() => { //таймаут нужен, чтобы дать завершиться перевороту
            this.dom_el.className = 'card move';
        }, time);
    }
    show_remove(show) {
        let css_class;
        if (show) this.set_class('showAndRemove'); //если нужно показать и удалить
        else this.set_class('getOut'); //если нужно только удалить
        this.dom_el.onclick = () => {};
    }
    set_class(css_class) {
        this.dom_el.style.animationDelay = ''; //уберем рандомность для постоянного движения карт
        this.dom_el.className = 'card ' + css_class + ' card_' + this.value;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Card;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(0);


function main() {
    let game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* Game */]();
    game.start();
    document.querySelectorAll('.startBtn').forEach((el)=>{
        el.onclick = (event) => {
            let regExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
            let email = document.getElementById('inputEmail').value;
            if(el.id = 'startBtn' && !regExp.test(email)){
                alert('You didnt write your e-mail, or you wrote it wtong');
                event.preventDefault();
            } else {
                game.field.stopwatch.start();
                __WEBPACK_IMPORTED_MODULE_0__game__["a" /* Game */].remember_user();
            }
        }
    });
    document.getElementById('menuBtn').onclick = () => {
        game.field.stopwatch.stop();
    }
    document.getElementById('scoreBtn').onclick = () => {
        let data = JSON.parse(window.localStorage.getItem('score')) || [];
        data.sort((a,b)=>{
            return a.clicks - b.clicks;
        });

        let table = '';
        data.forEach((el,i) => {
            table += `<tr><td>${i+1}</td>`;
            for(let par in el) table += `<td>${el[par]}</td>`;
            table += `</tr>`;
        });
        document.getElementById('score').innerHTML = table;
    }
}

document.addEventListener('DOMContentLoaded', main);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stopwatch__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__card__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game__ = __webpack_require__(0);




class Field{ //класс Поле отвечает за передачу карточкам значений и проверку карт на совпадения
    constructor(fld_width, fld_height) {
        this.active_cards = fld_width * fld_height; //количество карт на столе
        this.card_to_compare; //уже открытая карта
        this.stopwatch = new __WEBPACK_IMPORTED_MODULE_0__stopwatch__["a" /* Stopwatch */](); //таймер
    }

    fill_cells(cards_elements) { //заполняем "ячейки" поля значениями
        let values = this.generate_vals();
        let cells = [];
        values.forEach((item, i) => {
            cells[i] = new __WEBPACK_IMPORTED_MODULE_1__card__["a" /* Card */](item, cards_elements[i]); //в ячейку поля записывается Карта с
            cards_elements[i].onclick = () => { //уникальным значением и собственным элементом в DOM
                __WEBPACK_IMPORTED_MODULE_2__game__["a" /* Game */].count_clicks(); //подсчет кликов
                this.compare(cells[i]); //сравнивание открытых карт
            };
        });
    }
    generate_vals() {
        let vals = [];
        for (let i = 0; i < this.active_cards; i++)
            vals[i] = Math.floor(i / 2); //заполняем массив парными значениями
        vals.sort(() => Math.random() - 0.5); //рандомим их
        return vals;
    }

    compare(card) {
        if (this.card_to_compare === undefined) { //если раньше ни одна карта не была открыта
            this.card_to_compare = card; //записываем открытую в буфер
            card.show_me(); //показываем ее
        } else {
            if (this.card_to_compare.value === card.value && this.card_to_compare != card) { //если значения совпали
                card.show_remove(true); //показываем и убираем карту
                this.active_cards -= 2; //уменьшаем количество карт на столе
                this.card_to_compare.show_remove(false); //просто убираем карту
            } else {
                if (this.card_to_compare != card) { //если значения не совали
                    card.show_hide(true); //показываем и прячем карту
                    this.card_to_compare.show_hide(false); //просто прячем карту
                } else { //если кликнул сам на себя
                    card.show_hide(false); //просто прячем карту
                }
            }
            this.card_to_compare = undefined; //очищаем буфер
        }
        if (this.active_cards == 0) { //если все карты убраны с поля
            __WEBPACK_IMPORTED_MODULE_2__game__["a" /* Game */].add_to_score();
            __WEBPACK_IMPORTED_MODULE_2__game__["a" /* Game */].show_winPage(); //показываем поле поздравления
            this.stopwatch.stop();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Field;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display || document.querySelector('.stopwatch');
        this.times = [0, 0, 0];
        this.print(this.times);
    }
    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }
    stop() {
        this.running = false;
        this.time = null;
    }
    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }
    calculate(timestamp) {
        let diff = timestamp - this.time;
        this.times[2] += diff / 10;
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }
    print() {
        let formated = `\
        ${this.pad0(this.times[0], 2)}:\
        ${this.pad0(this.times[1], 2)}:\
        ${this.pad0(Math.floor(this.times[2]), 2)}`;
        this.display.innerText = formated;
    }
    pad0(value, count) {
        let result = value.toString();
        for (; result.length < count; --count)
            result = '0' + result;
        return result;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Stopwatch;


/***/ })
/******/ ]);