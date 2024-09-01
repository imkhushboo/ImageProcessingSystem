const axios = require('axios');
const sharp = require('sharp');
const Product = require('../entity/Images');
const Request = require('../entity/RequestStatus');
const fs = require('fs');
const path = require('path');


async function processImagesAsync(requestId, products) {
    try {
        for (const product of products) {
            const outputImageUrls = [];

            for (const url of product.inputImageUrls) {
                const response = await axios.get(url, { responseType: 'arraybuffer' });
                const imageBuffer = Buffer.from(response.data, 'binary');

                const compressedImageBuffer = await sharp(imageBuffer)
                    .jpeg({ quality: 50 })
                    .toBuffer();

                const outputFilePath = path.join(__dirname, '../uploads', `compressed-${Date.now()}.jpg`);
                fs.writeFileSync(outputFilePath, compressedImageBuffer);

                outputImageUrls.push(`http://localhost:8080/uploads/${path.basename(outputFilePath)}`);
            }

            await Product.updateOne(
                { serialNumber: product.serialNumber, requestId },
                { $set: { outputImageUrls } }
            );
        }

        await Request.updateOne({ requestId }, { status: 'completed' });
    } catch (error) {
        console.error('Error processing images:', error);
        await Request.updateOne({ requestId }, { status: 'failed' });
    }
}

module.exports = { processImagesAsync };
