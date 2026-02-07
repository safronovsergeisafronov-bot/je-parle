/**
 * GitHub Device Authorization Script
 *
 * Автоматизирует ввод кода на странице github.com/login/device
 *
 * Usage: node scripts/github-auth.js <CODE>
 * Example: node scripts/github-auth.js ABCD-1234
 */

const puppeteer = require('puppeteer');

async function authorizeGitHub(code) {
    if (!code) {
        console.error('❌ Укажи код: node scripts/github-auth.js XXXX-XXXX');
        process.exit(1);
    }

    console.log(`🚀 Открываю браузер для авторизации GitHub...`);

    const browser = await puppeteer.launch({
        headless: false, // Показываем браузер
        defaultViewport: { width: 1280, height: 800 },
        args: ['--start-maximized']
    });

    const page = await browser.newPage();

    try {
        // Открываем страницу авторизации
        await page.goto('https://github.com/login/device', {
            waitUntil: 'networkidle2'
        });

        console.log('📄 Страница загружена');

        // Проверяем, нужна ли авторизация
        const loginForm = await page.$('input[name="login"]');
        if (loginForm) {
            console.log('⚠️  Нужно сначала войти в GitHub аккаунт');
            console.log('👆 Войди в свой аккаунт в открывшемся браузере');

            // Ждём пока пользователь залогинится
            await page.waitForSelector('input[name="user-code"]', { timeout: 300000 });
        }

        // Вводим код
        const codeInput = await page.waitForSelector('input[name="user-code"]', { timeout: 10000 });

        // Очищаем поле и вводим код
        await codeInput.click({ clickCount: 3 });
        await codeInput.type(code.replace('-', ''));

        console.log('✅ Код введён');

        // Нажимаем Continue
        const continueButton = await page.waitForSelector('button[type="submit"]');
        await continueButton.click();

        console.log('🔄 Нажал Continue, жду подтверждения...');

        // Ждём страницу авторизации приложения
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        // Проверяем, есть ли кнопка Authorize
        const authorizeButton = await page.$('button[name="authorize"]');
        if (authorizeButton) {
            await authorizeButton.click();
            console.log('✅ Нажал Authorize');
            await page.waitForNavigation({ waitUntil: 'networkidle2' });
        }

        // Проверяем успех
        const successMessage = await page.$('.flash-success, .octicon-check');
        if (successMessage) {
            console.log('🎉 Авторизация успешна!');
        } else {
            console.log('✅ Процесс завершён. Проверь gh auth status');
        }

        // Даём пользователю увидеть результат
        await new Promise(resolve => setTimeout(resolve, 3000));

    } catch (error) {
        console.error('❌ Ошибка:', error.message);

        // Скриншот только если запущен в debug-режиме
        if (process.env.DEBUG) {
            await page.screenshot({ path: 'github-auth-error.png' });
            console.log('📸 Скриншот сохранён в github-auth-error.png');
        }

    } finally {
        await browser.close();
        console.log('👋 Браузер закрыт');
    }
}

// Получаем код из аргументов командной строки
const code = process.argv[2];
authorizeGitHub(code);
