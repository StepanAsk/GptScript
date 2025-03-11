// ==UserScript==
// @name         Global
// @homepageURL  https://github.com/StepanAsk/GptScript
// @version      2.0
// @description  Добавляет старый функционал нажатия enter в глобал
// @supportURL   https://t.me/St_ask
// @author       SaintAsk
// @match        https://global.cainiao.com/*
// @icon         https://global.cainiao.com/favicon.ico
// @grant        none
// @updateURL    https://github.com/StepanAsk/GptScript/raw/refs/heads/main/Global_v3.user.js
// @downloadURL  https://github.com/StepanAsk/GptScript/raw/refs/heads/main/Global_v3.user.js
// ==/UserScript==

(function () {
    'use strict';

    const getElement = (selector) => document.querySelector(selector);
    let isClearing = false;

    const waitForSearchContent = new MutationObserver((mutations, observer) => {
        if (getElement('div.search-content')) {
            setupFocusListener();
            setupInputListener();
            observer.disconnect();
        }
    });

    waitForSearchContent.observe(document.body, { childList: true, subtree: true });

    const setupFocusListener = () => {
        const wrapper = getElement('div.codemirror-wrapper');
        if (wrapper) {
            wrapper.addEventListener('focus', () => {
                isClearing = true;
                getElement('.next-btn-text > .next-btn-helper')?.click();
                setTimeout(() => { isClearing = false; }, 200);
            }, true);
        }
    };

    const setupInputListener = () => {
        const target = getElement('.CodeMirror-line');
        if (target) {
            const observer = new MutationObserver((mutations) => {
                if (!isClearing) {
                    for (const mutation of mutations) {
                        for (const node of mutation.addedNodes) {
                            if (node.nodeType === Node.ELEMENT_NODE && node.matches('span') && node.textContent.trim().length > 0) {
                                getElement('button.track-btn')?.click();
                                closeInputField();
                                return;
                            }
                        }
                    }
                }
            });
            observer.observe(target, { childList: true, subtree: true });
        }

        document.addEventListener('paste', (event) => {
            if (target && document.activeElement.closest('.CodeMirror')) {
                setTimeout(() => {
                    if (target.textContent.trim().length > 0) {
                        getElement('button.track-btn')?.click();
                        closeInputField();
                    }
                }, 50);
            }
        });
    };

    const closeInputField = () => {
        const wrapper = getElement('div.codemirror-wrapper');
        if (wrapper) {
            wrapper.blur();
            wrapper.style.opacity = '0';
            wrapper.style.height = '40px';
        }
        document.activeElement?.blur();
        getElement('body')?.focus();
    };

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && document.activeElement.closest('.CodeMirror')) {
            event.preventDefault();
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        waitForSearchContent.observe(document.body, { childList: true, subtree: true });
    });
})();
