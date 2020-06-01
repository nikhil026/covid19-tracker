const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cheerio = require('cheerio');
const https = require('https');
const app = express();

app.use(express.static(path.join(__dirname, './../build')));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './../build', 'index.html'));
});

app.get('/api/covid19/india', function (req, resp) {

    // Fetch health ministry data from their website
    https.get('https://www.mohfw.gov.in', (res) => {
        const { statusCode } = res;

        const contentType = res.headers['content-type'];

        let error;
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                `Status Code: ${statusCode}`);
        }

        if (error) {
            console.error(error.message);
            res.resume();
            return resp.send('Some issue')
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                const $ = cheerio.load(rawData);

                let scrapedArr = [];
                let splitedArray = [];


                $('#state-data table> tbody > tr > td').each((index, b) => {
                    // As table contains 35 state/ut with 6 columns each
                    if (index < 210) {
                        scrapedArr.push($(b).text())
                    } else {
                        return;
                    }
                });


                for (let i = 0, chunk = 6, j = scrapedArr.length; i < j; i += 6) {
                    splitedArray.push(scrapedArr.slice(i, i + chunk));
                }

                let statesArray = splitedArray.map((state, index) => {
                    let obj = {
                        "State/UT": state[1],
                        "TotalActive": Number(state[2]),
                        "TotalRecovered": Number(state[3]),
                        "TotalDeaths": Number(state[4]),
                        "TotalConfirmed": Number(state[5])
                    };
                    return obj;

                })
                return resp.send(statesArray)

            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
        return resp.send('Server Error')
    });
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, './../build', 'index.html'));
    });
})

app.listen(process.env.PORT || 8080);