const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_51NE5jdCdL5Uy64pBUzRICyvtIsWUMpOTBDNtH23m7MxsSnAqqdd6Pfrl63HGtKlp38UCjEuxYH4rNwh45plqGPd800S7kLoDUQ")

//router endpoints

router.post("/intents", async (req, res) => {
    console.log("payment", req.body);
    try {
        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: '2022-11-15' }
        );
        // create payment intents
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'pkr',
            customer: customer.id,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        // return the secret

        res.json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
            publishableKey: 'pk_test_51NE5jdCdL5Uy64pBWiu3k8tGVcYpq06Dz7uMoDL3jRuNDFCNqnDb1C3Jpv22HD8mzR9g7oERZX6IQMyWt451NlzO00veHvd5V7'
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }

})

module.exports = router;