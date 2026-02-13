const puppeteer = require('puppeteer');

async function main() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 320, height: 568 }
    });

    const page = await browser.newPage();

    try {
        console.log('Navigating to http://localhost:3000...');
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

        console.log('Waiting 3 seconds...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        console.log('Looking for "Спеццена" text...');
        const element = await page.evaluate(() => {
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                null
            );

            let node;
            while (node = walker.nextNode()) {
                if (node.textContent.includes('Спеццена')) {
                    return node.parentElement?.getBoundingClientRect();
                }
            }
            return null;
        });

        if (element) {
            console.log('Found "Спеццена", scrolling into view...');
            await page.evaluate(() => {
                const walker = document.createTreeWalker(
                    document.body,
                    NodeFilter.SHOW_TEXT,
                    null
                );

                let node;
                while (node = walker.nextNode()) {
                    if (node.textContent.includes('Спеццена')) {
                        node.parentElement?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                        break;
                    }
                }
            });

            await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
            console.log('Could not find "Спеццена" text, taking screenshot of current view...');
        }

        const outputPath = '/private/tmp/claude-501/-Users-sergejsafronov-Documents-French-Super-je-parle/e64b55a9-b14f-41da-a0ca-84f54e3963bb/scratchpad/pricing-cards-mobile.png';
        console.log(`Taking screenshot and saving to ${outputPath}...`);

        await page.screenshot({
            path: outputPath,
            fullPage: false
        });

        console.log('Screenshot saved successfully!');

    } finally {
        await browser.close();
    }
}

main().catch(console.error);
