// ==UserScript==
// @name         EDESK
// @homepageURL  https://github.com/StepanAsk/GptScript
// @version      1.0
// @description  функционал поиска и раскрытия всевидящих очей
// @supportURL   https://t.me/St_ask
// @author       SaintAsk
// @match        https://echo.sg.cainiao.com/assistant/XL_DESK_ONLINE*
// @icon         https://global.cainiao.com/favicon.ico
// @grant        none
// @updateURL    https://github.com/StepanAsk/GptScript/raw/refs/heads/main/EDESKv1.1.user.js
// @downloadURL  https://github.com/StepanAsk/GptScript/raw/refs/heads/main/EDESKv1.1.user.js
// ==/UserScript==

(function() {
    'use strict';

    console.log("Tampermonkey script started");

    // Очистка поля ввода при получении фокуса
    document.addEventListener('focusin', event => {
        if (event.target.matches('.next-input > input')) {
            console.log("Input field focused, clearing value");
            event.target.value = '';  // Очищаем поле при фокусе
        }
    });

    // Постоянная проверка наличия "******" в целевых элементах
    function checkForStars() {
        const selectors = [
            '.sc-fPXMVe:nth-child(1) .cn-next-col:nth-child(3) span > span',
            '.sc-fPXMVe:nth-child(1) .cn-next-col:nth-child(5) span > span',
            '.sc-fPXMVe:nth-child(1) .cn-next-col:nth-child(4) span > span',
            '.sc-fPXMVe:nth-child(2) .cn-next-col:nth-child(3) span > span'
        ];
        return selectors.some(selector => {
            const element = document.querySelector(selector);
            return element && element.textContent.includes("******");
        });
    }

    // Функция для клика по элементам .sc-koXPp
    function clickElements() {
        document.querySelectorAll('.sc-koXPp').forEach(el => {
            if (el.offsetParent !== null && !el.dataset.clicked) {
                el.dataset.clicked = true; // Устанавливаем флаг, чтобы избежать повторного клика
                console.log("Clicking element", el);
                el.click(); // Кликаем на элемент
                // Таймаут для предотвращения дабл кликов
                setTimeout(() => {
                    el.dataset.clicked = false; // Сбрасываем флаг после задержки
                    console.log("Ready for next click");
                }, 1000);  // Таймаут 1 секунда
            }
        });
    }

    // Обработчик для вставки текста в поле ввода и клика на кнопку
    document.addEventListener('paste', event => {
        let inputField = event.target;
        if (inputField.matches('.next-input > input')) {
            console.log("Text pasted into input field");
            requestAnimationFrame(() => {
                let submitButton = document.querySelector('button.next-btn');
                if (submitButton) {
                    console.log("Clicking submit button");
                    submitButton.click(); // Кликаем по кнопке
                    inputField.blur(); // Снимаем фокус с поля ввода
                } else {
                    console.log("Submit button not found");
                }
            });
        }
    });

    // Главный цикл: постоянная проверка звездочек и клики по элементам
    setInterval(() => {
        if (checkForStars()) {
            clickElements(); // Если "******" найдено, кликаем по элементам
        }
    }, 1000); // Проверка каждую секунду

})();
