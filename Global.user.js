// ==UserScript==
// @name         Global
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Открытие, очистка, нажатие кнопки и закрытие CodeMirror на Cainiao
// @match        https://global.cainiao.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let isCodeMirrorOpen = false;

    const getElement = (selector) => document.querySelector(selector);

    const toggleCodeMirror = (show) => {
        const wrapper = getElement('.codemirror-wrapper');
        const codeMirror = getElement('.CodeMirror');
        if (wrapper && codeMirror) {
            wrapper.style.opacity = show ? '1' : '0';
            wrapper.style.height = show ? 'auto' : '40px';
            codeMirror.style.display = show ? 'block' : 'none';
            isCodeMirrorOpen = show;
        }
    };

    const clearCodeMirrorText = () => {
        const codeMirror = getElement('.CodeMirror');
        if (codeMirror?.CodeMirror) codeMirror.CodeMirror.setValue('');
    };

    const clickQueryButton = () => getElement('.next-btn.track-btn')?.click();

    const setupInputFocusListener = () => {
        const inputField = getElement('input[name="search"]');
        if (inputField) {
            inputField.addEventListener('focus', () => {
                if (!isCodeMirrorOpen && document.visibilityState === 'visible') {
                    toggleCodeMirror(true);
                    clearCodeMirrorText();
                }
            });
        }
    };

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            clickQueryButton();
            toggleCodeMirror(false);
            getElement('input[name="search"]')?.focus();
        }
    });

    const waitForInputField = setInterval(() => {
        if (getElement('input[name="search"]')) {
            clearInterval(waitForInputField);
            setupInputFocusListener();
        }
    }, 100);
})();
