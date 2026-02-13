const puppeteer = require('puppeteer');

async function main() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1440, height: 900 }
    });

    const page = await browser.newPage();

    try {
        console.log('Opening http://localhost:3000...');
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

        console.log('Waiting 3 seconds for page to fully load...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        console.log('Taking full page screenshot...');
        await page.screenshot({
            path: '/private/tmp/claude-501/-Users-sergejsafronov-Documents-French-Super-je-parle/e64b55a9-b14f-41da-a0ca-84f54e3963bb/scratchpad/full-page.png',
            fullPage: true
        });

        console.log('Screenshot saved to /private/tmp/claude-501/-Users-sergejsafronov-Documents-French-Super-je-parle/e64b55a9-b14f-41da-a0ca-84f54e3963bb/scratchpad/full-page.png');

    } finally {
        await browser.close();
    }
}

main().catch(console.error);
