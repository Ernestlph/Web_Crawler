// normalizeURL 

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
function normalizeURL(urlString) {
    const url = new URL(urlString)
    url.pathname = url.pathname.replace(/\/$/, '')
    url.hostname = url.hostname.replace(/^www\./, '')
    const newURL = `${url.hostname}${url.pathname}`
    return newURL

}

// getURLSFromHTML() used to parse through html and extract a list of all the link URLs

function getURLsFromHTML(htmlBody, baseURL) {

    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    const urls = []
    linkElements.forEach(element => {
        const url = element.href
        urls.push(url)
    })
    return urls

}



module.exports = {
    normalizeURL,
    getURLsFromHTML,
}