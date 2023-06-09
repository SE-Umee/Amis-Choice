require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const paymentRouters = require("./src/router/payment")
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/payments", paymentRouters)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))






// const stripe = require('stripe')('sk_test_51NE5jdCdL5Uy64pBUzRICyvtIsWUMpOTBDNtH23m7MxsSnAqqdd6Pfrl63HGtKlp38UCjEuxYH4rNwh45plqGPd800S7kLoDUQ');

// app.use(express.json());
// app.use(cors());

// app.post("/pay", async (req, res) => {
//     try {
//         // Use an existing Customer ID if this is a returning customer.
//         const customer = await stripe.customers.create();
//         const ephemeralKey = await stripe.ephemeralKeys.create(
//             { customer: customer.id },
//             { apiVersion: '2022-11-15' }
//         );
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: 1099,
//             currency: 'eur',
//             customer: customer.id,
//             automatic_payment_methods: {
//                 enabled: true,
//             },
//         });

//         res.json({
//             paymentIntent: paymentIntent.client_secret,
//             ephemeralKey: ephemeralKey.secret,
//             customer: customer.id,
//             publishableKey: 'pk_test_51NE5jdCdL5Uy64pBWiu3k8tGVcYpq06Dz7uMoDL3jRuNDFCNqnDb1C3Jpv22HD8mzR9g7oERZX6IQMyWt451NlzO00veHvd5V7'
//         });
//     } catch (error) {
//         console.error(error),

//             res.status(500).json({ message: "Internal server Error" })
//     }
// });


