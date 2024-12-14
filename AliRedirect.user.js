// ==UserScript==
// @name         AliRedirect
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Автоматически заменяет домен aliexpress.com на aliexpress.ru
// @author       SaintAsk
// @match        *://*.aliexpress.com/*
// @run-at       document-start
// @grant        none
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
