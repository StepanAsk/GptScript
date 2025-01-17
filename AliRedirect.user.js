// ==UserScript==
// @name         AliRedirect
// @homepageURL  http://tampermonkey.net/
// @version      1.0
// @description  Автоматически заменяет домен aliexpress.com на aliexpress.ru
// @supportURL   https://t.me/St_ask
// @author       SaintAsk
// @match        *://*.aliexpress.com/*
// @icon         https://www.aliexpress.com/favicon.ico
// @run-at       document-start
// @grant        none
// @updateURL    https://github.com/StepanAsk/GptScript/raw/refs/heads/main/AliRedirect.user.js
// @downloadURL  https://github.com/StepanAsk/GptScript/raw/refs/heads/main/AliRedirect.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Проверяем, находится ли пользователь на домене aliexpress.com
    if (window.location.hostname.includes('aliexpress.com')) {
        // Заменяем домен на aliexpress.ru
        let newUrl = window.location.href.replace('aliexpress.com', 'aliexpress.ru');
        window.location.replace(newUrl);
    }
})();
