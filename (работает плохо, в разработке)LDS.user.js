// ==UserScript==
// @name         LDS
// @homepageURL  https://github.com/StepanAsk/GptScript
// @version      1.0
// @description  Автоклик поиска по пробитому треку в LDS
// @supportURL   https://t.me/St_ask
// @author       SaintAsk
// @match        https://lds.ru.cainiao.com/*
// @icon         https://global.cainiao.com/favicon.ico
// @grant        none
// @updateURL    https://github.com/StepanAsk/GptScript/raw/refs/heads/main/LDS.user.js
// @downloadURL  https://github.com/StepanAsk/GptScript/raw/refs/heads/main/LDS.user.js
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
