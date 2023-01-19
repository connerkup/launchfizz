require('dotenv').config()
const express = require('express')
const { Configuration, OpenAIApi } = require("openai");
const router = express.Router()
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

router.post('/generate', async (req, res) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: req.body['product-description'],
            temperature: 0,
            max_tokens: 25,
        });
        res.json({
            success: true,
            productDescription: response.data.choices[0].text
        });
    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            message: 'Error generating product description'
        });
    }
});


module.exports = router;
