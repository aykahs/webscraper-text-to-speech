const axios = require('axios');
const cheerio = require('cheerio');
var fs = require('fs');

const extractLinks = $ => $('.next_page').attr('href')
const extractContent = $ => $('.text-left').text();
const extractheader = $ => $('#chapter-heading').text();
const url = 'https://ww3.slimeisekai.com/manga/that-time-i-got-reincarnated-as-a-slime-light-novel-chapter-408/';
// crawlTask(url);

const crawl = async url => {
    console.log(url)
    axios.get(url).then(({ data }) => {
        const $ = cheerio.load(data); // Initialize cheerio
        const url = extractLinks($);
        const content = extractContent($);
        let header = extractheader($);
        header = header.replace(/\s+/g, '-').toLowerCase();
        header = '../Text/' + header + '.txt';
        fs.appendFile(header, content, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        if (url == undefined){
            return 'done';
        }
        crawlTask(url);
    });
};

const crawlTask = async(url) => {
  await crawl(url);
};
(async () => {
    await crawlTask(url);
})();