// ==UserScript==
// @name         Autoscroll BZ info
// @namespace    https://github.com/StepanAsk/GptScript
// @version      1.0
// @description  Прокрутка к последнему статусу БЗ, чтобы посмотреть куда переводить CP.
// @author       SaintAsk
// @match        https://outside-gcpconsole.cainiao.com/aeNewOrderDetail?orderCode=*
// @grant        none
// @updateURL    https://github.com/StepanAsk/GptScript/raw/refs/heads/main/Autoscroll%20BZ%20info.js
// @downloadURL  https://github.com/StepanAsk/GptScript/raw/refs/heads/main/Autoscroll%20BZ%20info.js
// ==/UserScript==

(function () {
    'use strict';

    let found = false; // Флаг для предотвращения повторной работы
    let attempts = 0; // Счетчик попыток
    const maxAttempts = 200; // Максимальное количество попыток
    const intervalTime = 100; // Интервал проверки в мс

    // Основная функция поиска элемента
    function findAndScroll() {
        const interval = setInterval(() => {
            attempts++;
            if (found || attempts > maxAttempts) {
                clearInterval(interval);
                if (!found) {
                    console.error("Элемент не найден после максимального количества попыток.");
                }
                return;
            }

            const targetElement = document.querySelector('.detail-box > h3:nth-child(41)');
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'auto', block: 'end' });
                console.log("Элемент найден и прокрутка выполнена.");
                found = true;
                clearInterval(interval);
            } else {
                console.log(`Попытка ${attempts}: Элемент пока не найден.`);
            }
        }, intervalTime);
    }

    // DOM MutationObserver для подстраховки
    function initObserver() {
        const observer = new MutationObserver(() => {
            if (found) return;

            const targetElement = document.querySelector('.detail-box > h3:nth-child(41)');
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'auto', block: 'end' });
                console.log("MutationObserver: Элемент найден и прокрутка выполнена.");
                found = true;
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        console.log("MutationObserver запущен.");
    }

    // Запуск скрипта
    window.addEventListener('load', () => {
        console.log("Скрипт запущен. Ожидание элемента...");

        // Параллельно используем интервал и наблюдатель
        findAndScroll();
        initObserver();
    });
})();
