const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.status(201).json({ clientSecret: paymentIntent.client_secret });
    // console.log(paymentIntent);
  } else {
    res.status(403).json({ message: "please select items that you want" });
  }

});
app.get("/", (req, res) => res.send("Success"));
app.listen(4444, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("running at http://localhost:4444");
  }
});
