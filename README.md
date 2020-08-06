# innova-store-disc-weight-finder

https://www.innovastore.fi/ didn't have search funtionality for disc weights so here is application to automate search for discs in certain weight range. Application gathers all of the disc page urls in Innova Store disc search page with browserScript.js. After it has completed gathering of URLs, it sends URL data to Node application which opens every disc store page, checks it's weight and opens the disc store page if weight meets requirements.

Any changes to Innova Store might break this application in the future

## Installation & running

1. Download https://nodejs.org/en/
2. Install dependencys -> "npm install" in project directory
3. Run -> "node index.js {minWeight} {maxWeight}"

        node index.js 150 156

4. Copy paste browserScript.js's content to your browser's console and run

