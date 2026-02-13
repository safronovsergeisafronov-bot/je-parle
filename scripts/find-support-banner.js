const puppeteer = require('puppeteer');

async function main() {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: { width: 1280, height: 800 }
    });

    const page = await browser.newPage();

    try {
        // Navigate to localhost:3000
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
        
        console.log('Page loaded. Looking for SupportBanner section...');
        
        // Find the SupportBanner by looking for the text "При поддержке"
        await page.evaluate(() => {
            const elements = document.querySelectorAll('*');
            for (const el of elements) {
                if (el.textContent && el.textContent.includes('При поддержке French Tech & CopyFrog')) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    break;
                }
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Take screenshot
        const screenshotPath = '/private/tmp/claude-501/-Users-sergejsafronov-Documents-French-Super-je-parle/697e3322-9e75-4fee-a34e-7134c43d7fa2/scratchpad/support-banner-2.png';
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log('Screenshot saved to:', screenshotPath);
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
}

main().catch(console.error);
