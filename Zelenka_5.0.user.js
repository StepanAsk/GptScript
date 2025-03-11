// ==UserScript==
// @name         Zelenka v5.0
// @namespace    http://tampermonkey.net/
// @version      5.0
// @description  Добавляет функционал нажатия enter для пробивки трека
// @supportURL   https://t.me/St_ask
// @author       SaintAsk
// @match        https://outside-gcpconsole.cainiao.com/aEOrderList*
// @icon         https://global.cainiao.com/favicon.ico
// @grant        none
// @updateURL    https://github.com/StepanAsk/GptScript/raw/refs/heads/main/Zelenka_6.0.user.js
// @downloadURL  https://github.com/StepanAsk/GptScript/raw/refs/heads/main/Zelenka_6.0.user.js
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', () => {
        const link = document.querySelector(".mui-table > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)");
        if (link) {
            window.open(link.href, '_blank');
        }

        const chineseTextStart = "请";
        const inputMessage = document.querySelector('.mui-form-left > div:nth-child(1)');
        const langSelect = document.querySelector('#langSelect > option:nth-child(3)');

        if (inputMessage && inputMessage.textContent.startsWith(chineseTextStart)) {
            if (langSelect) {
                langSelect.selected = true;
                const langDropdown = document.querySelector('#langSelect');
                if (langDropdown) {
                    langDropdown.dispatchEvent(new Event('change'));
                }
            }
        }

        const nonClickableLink = document.querySelector('.mui-form-row > a:nth-child(3)');
        if (nonClickableLink) {
            nonClickableLink.style.pointerEvents = 'none';
            nonClickableLink.style.cursor = 'default';
        }
    });

    document.addEventListener('focusin', (event) => {
        const inputMessage = document.querySelector('#inputMessage');
        if (event.target === inputMessage) {
            inputMessage.value = '';
        }
    });

    document.addEventListener('input', (event) => {
        const inputMessage = document.querySelector('#inputMessage');
        const primaryButton = document.querySelector('.mui-btn-m-primary');

        if (event.target === inputMessage && primaryButton) {
            primaryButton.click();
        }
    });

    document.addEventListener('keydown', (event) => {
        const inputMessage = document.querySelector('#inputMessage');
        const link = document.querySelector(".mui-table > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)");

        if (event.key === 'Enter' && document.activeElement !== inputMessage) {
            if (link) {
                window.open(link.href, '_blank');
            }
        }
    });
})();
