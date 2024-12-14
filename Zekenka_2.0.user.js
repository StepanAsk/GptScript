// ==UserScript==
// @name         Zelenka v2.0
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Проверка URL, нажатие Enter, предотвращение новой строки, автоматическое открытие ссылки и клик по кнопке
// @author       SaintAsk
// @match        https://outside-gcpconsole.cainiao.com/aEOrderList*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Функция для добавления параметра lang=ru_RU в URL, если его нет
    function addLangParamIfMissing() {
        if (!window.location.href.includes("lang=ru_RU")) {
            const currentUrl = window.location.href;
            const separator = currentUrl.includes('?') ? '&' : '?';
            const newUrl = currentUrl + separator + 'lang=ru_RU';
            history.replaceState({}, '', newUrl);  // Меняем URL без перезагрузки страницы
            console.log('Параметр lang=ru_RU добавлен в URL');
        }
    }

    // Открытие ссылки при загрузке страницы
    window.addEventListener('load', () => {
        const link = document.querySelector(".mui-table > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)");
        if (link) {
            window.open(link.href, '_blank');
            console.log('Ссылка открыта в новой вкладке');
        }

        // После открытия ссылки проверяем и добавляем lang=ru_RU в URL, если его нет
        addLangParamIfMissing();
    });

    // Обработка нажатия Enter
    document.addEventListener('keydown', (event) => {
        const inputMessage = document.querySelector('#inputMessage');
        const primaryButton = document.querySelector('.mui-btn-m-primary');

        if (event.key === 'Enter') {
            // Если фокус на поле ввода
            if (document.activeElement === inputMessage && primaryButton) {
                event.preventDefault();  // Предотвращаем стандартное поведение

                // Снимаем фокус с поля ввода
                inputMessage.blur();
                console.log('Фокус снят с поля ввода');

                // Добавляем lang=ru_RU, если его нет, и кликаем по кнопке
                addLangParamIfMissing();
                primaryButton.click();  // Имитируем клик по кнопке
                console.log('Клик по кнопке поиска выполнен');
            }
        }
    });
})();
