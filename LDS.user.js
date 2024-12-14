// ==UserScript==
// @name         Авто-клик на элемент выпадающего списка (фикс)
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Автоматический клик на элемент, совпадающий с текстом, введённым в поле ввода, после завершения ввода
// @author       SaintAsk
// @match        https://lds.ru.cainiao.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const inputSelector = 'input[aria-label="搜索"]';
    const containerSelector = '.css-1o8djpp.cn-next-overlay-inner';
    const liSelector = '.cn-next-menu-item';
    let inputEntered = false;

    window.addEventListener('load', () => {
        const targetInput = document.querySelector(inputSelector);

        if (targetInput) {
            targetInput.addEventListener('input', () => {
                const inputValue = targetInput.value.trim();
                inputEntered = !!inputValue;
                if (inputEntered) {
                    waitForContainer(() => clickMatchingItem(inputValue));
                }
            });
        }
    });

    function waitForContainer(callback) {
        const observer = new MutationObserver((mutations, obs) => {
            const container = document.querySelector(containerSelector);
            if (container && container.getAttribute('aria-hidden') === 'false' && inputEntered) {
                callback();
                obs.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    function clickMatchingItem(inputValue) {
        const container = document.querySelector(containerSelector);
        if (container) {
            const listItems = container.querySelectorAll(liSelector);
            listItems.forEach(li => {
                const span = li.querySelector('.cn-next-menu-item-text');
                if (span && span.textContent.trim() === inputValue) {
                    li.click();
                }
            });
        }
    }
})();