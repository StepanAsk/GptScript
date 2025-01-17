// ==UserScript==
// @name         Zelenka v3.0
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Добавляет функционал нажатия enter для пробивки трека
// @supportURL   https://t.me/St_ask
// @author       SaintAsk
// @match        https://outside-gcpconsole.cainiao.com/aEOrderList*
// @icon         https://global.cainiao.com/favicon.ico
// @grant        none
// @updateURL    https://github.com/StepanAsk/GptScript/raw/refs/heads/main/Zelenka_3.0.user.js
// @downloadURL  https://github.com/StepanAsk/GptScript/raw/refs/heads/main/Zelenka_3.0.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Открытие ссылки при загрузке страницы
    window.addEventListener('load', () => {
        const link = document.querySelector(".mui-table > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)");
        if (link) {
            window.open(link.href, '_blank');
        }

        // Проверка языка на странице и изменение его, если нужно
        const chineseTextStart = "请"; // Иероглиф, который всегда стоит в начале текста
        const inputMessage = document.querySelector('.mui-form-left > div:nth-child(1)');
        const langSelect = document.querySelector('#langSelect > option:nth-child(3)'); // Русский язык

        // Если текст начинается с китайского иероглифа "请", меняем язык на русский
        if (inputMessage && inputMessage.textContent.startsWith(chineseTextStart)) {
            if (langSelect) {
                langSelect.selected = true; // Выбираем русский язык
                const langDropdown = document.querySelector('#langSelect');
                if (langDropdown) {
                    langDropdown.dispatchEvent(new Event('change')); // Тригерим событие изменения
                }
            }
        }
    });

    // Обработка нажатия Enter
    document.addEventListener('keydown', (event) => {
        const inputMessage = document.querySelector('#inputMessage');
        const primaryButton = document.querySelector('.mui-btn-m-primary');
        const link = document.querySelector(".mui-table > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)");

        if (event.key === 'Enter') {
            event.preventDefault();  // Предотвращаем стандартное поведение

            // Если фокус на поле ввода
            if (document.activeElement === inputMessage && primaryButton) {
                // Снимаем фокус с поля ввода
                inputMessage.blur();

                // Имитируем клик по кнопке поиска
                primaryButton.click();
            } else if (link) {
                // Если фокус не на поле ввода, открываем ссылку в новой вкладке
                window.open(link.href, '_blank');
            }
        }
    });
})();
