// normalizeURL 

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
function normalizeURL(url) {
    const urlObj = new URL(url)
    let fullPath = `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`
    if (fullPath.length > 0 && fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath
}

// getURLSFromHTML() used to parse through html and extract a list of all the link URLs, converting any relative URLs into absolute URLs before pushing it all into an array.

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const aElements = dom.window.document.querySelectorAll('a')
    for (const aElement of aElements) {
        if (aElement.href.slice(0, 1) === '/') {
            try {
                urls.push(new URL(aElement.href, baseURL).href)
            } catch (err) {
                console.log(`${err.message}: ${aElement.href}`)
            }
        } else {
            try {
                urls.push(new URL(aElement.href).href)
            } catch (err) {
                console.log(`${err.message}: ${aElement.href}`)
            }
        }
    }
    return urls
}

const crawledURLs = []
//baseURL is the initial URL, currentURL is the URL we are currently crawling, pages is an array of URLs we have already visited and the number of times the code sees each URL
async function crawlPage(baseURL, currentURL, pages) {
    // Check if currentURL is on the same domain as baseURL
    if (new URL(baseURL).hostname !== new URL(currentURL).hostname) {
        return pages
    }

    // Get normalizedURL of currentURL
    const normalURL = normalizeURL(currentURL)

    // if normalURL is already in pages, increment the value of the key by 1 
    if (pages[normalURL] > 0) {
        pages[normalURL]++;
        return pages
    } else {
        pages[normalURL] = 1
    }

    // Start crawling the currentURL
    console.log(`Crawling ${normalURL}`)
    let htmlBody = ``
    try {
        const response = await fetch(currentURL)
        if (response.status > 399) {
            console.log(`Error in fetch with status code ${response.status} on page ${currentURL}`)
            return pages
        }

        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`Non-HTML response with content type ${contentType} on page ${currentURL}`)
            return pages
        }
        htmlBody = await response.text()

    } catch (error) {
        console.log(`Error in fetch: ${error.message}`)
    }

    // Get all the URLs from the currentURL and add them to the pages array, recursively calling crawlPage on each URL.
    const urls = getURLsFromHTML(htmlBody, baseURL)
    for (const url of urls) {
        pages = await crawlPage(baseURL, url, pages)
    }

    return pages
}


// This part module.exports is used to export the functions and variables defined in the crawl.js file.

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}