const csv = require('csv-parser');
const { Readable } = require('stream');

async function parseCSV(csvData) {
    const result = [];
    const stream = Readable.from(csvData);

    return new Promise((resolve, reject) => {
        stream
            .pipe(csv())
            .on('data', (data) => {
                const serialNumber = parseInt(data.serialNumber, 10);
                const productName = data.productName;
                const inputImageUrls = data.inputImageUrls ? data.inputImageUrls.split(',').map(url => url.trim()) : [];

                if (serialNumber && productName && inputImageUrls.length > 0) {
                    result.push({ serialNumber, productName, inputImageUrls });
                }
            })
            .on('end', () => resolve(result))
            .on('error', (error) => reject(error));
    });
}

module.exports = { parseCSV };
