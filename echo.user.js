// ==UserScript==
// @name         Cainiao Hidden Text Revealer v6.0
// @namespace    http://tampermonkey.net/
// @version      6.0
// @description  Автоматическое раскрытие скрытого текста без кнопки и логов
// @author       SaintAsk
// @match        https://echo.sg.cainiao.com/p/online
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Периодичность проверки (в миллисекундах)
    const INTERVAL_MS = 1000;

    // Селекторы скрытого текста и кнопок для всех столбцов
    const HIDDEN_TEXT_SELECTOR = 'p.sc-licaXj.jdqJGP span[data-i18n-ignore="true"]';
    const REVEAL_BUTTON_SELECTOR = 'p.sc-licaXj.jdqJGP span.sc-iuAqxS.kanDXL i.cn-next-icon';

    // Функция для раскрытия скрытого текста во всех столбцах
    function revealHiddenText() {
        // Найти ВСЕ элементы с текстом-звёздочками во всех столбцах
        const hiddenTextElements = document.querySelectorAll(HIDDEN_TEXT_SELECTOR);

        hiddenTextElements.forEach((el) => {
            const text = el.textContent.trim();

            // Проверяем, состоит ли текст только из звездочек
            if (/^\*+$/.test(text)) {
                // Найти кнопку для раскрытия текста рядом с текущим элементом
                const revealButton = el.closest('div').querySelector(REVEAL_BUTTON_SELECTOR);
                if (revealButton) {
                    revealButton.click(); // Имитация клика по кнопке
                }

                // Принудительно показываем текст после клика
                setTimeout(() => {
                    el.style.display = 'inline';
                    el.style.visibility = 'visible';
                    el.style.opacity = '1';
                    el.style.transition = 'none';
                }, 100); // Минимальная задержка для отображения текста
            }
        });
    }

    // Запуск функции с интервалом
    setInterval(revealHiddenText, INTERVAL_MS);

})();
