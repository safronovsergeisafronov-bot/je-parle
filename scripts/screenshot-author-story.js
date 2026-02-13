const puppeteer = require('puppeteer');

async function main() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1440, height: 900 }
    });

    const page = await browser.newPage();

    try {
        console.log('Navigating to http://localhost:3000...');
        await page.goto('http://localhost:3000', {
            waitUntil: 'networkidle2'
        });

        console.log('Waiting 2 seconds for page to fully load...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Looking for section with id="story"...');
        const storySection = await page.$('#story');

        if (!storySection) {
            throw new Error('Could not find section with id="story"');
        }

        console.log('Scrolling to AuthorStory section...');
        await page.evaluate(() => {
            const element = document.querySelector('#story');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        // Wait for smooth scroll to complete
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Taking screenshot of the section...');
        await storySection.screenshot({
            path: '/tmp/author-story-v2.png',
            type: 'png'
        });

        console.log('Screenshot saved to /tmp/author-story-v2.png');

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await browser.close();
    }
}

main().catch(console.error);
