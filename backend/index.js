// index.js
const express = require("express");
const connectDB = require("./db/config");
const bodyParser = require("body-parser");
const Users = require("./db/Users")
const FoodItem = require("./db/FoodItem")
const FoodCategory = require("./db/FoodCategory")
const Orders = require("./db/Orders")
const cors = require('cors')
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")


connectDB();
const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("hello")
})

const loginValidationRules = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required')
];

app.post("/login", loginValidationRules, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/createuser", async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    let user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        location: req.body.location
    });
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
});

app.post("/orders", async (req, res) => {
    try {
        const { email, orders } = req.body;

        if (!email || !orders || !Array.isArray(orders)) {
            return res.status(400).json({ error: 'Invalid request format' });
        }
        const existingUser = await Orders.findOne({ email });

        if (existingUser) {
            await Orders.findOneAndUpdate(
                { email },
                { $push: { orders: { $each: orders } } },
                { new: true },

            )
            return res.status(200).json({ message: 'Order processed successfully' })


        } else {
            let newOrders = new Orders({ email, orders });
            await newOrders.save()
        }
        return res.status(200).json({ message: 'Order processed successfully' })

    } catch (error) {
        console.error('Error processing orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/orders/:email',async (req,res)=>{
    let email=req.params.email
    let result = await Orders.findOne({email:email})
    if(result){
        res.json(result)
    }
})




app.get("/cat", async (req, res) => {

    let cat = await FoodCategory.find();
    if (cat.length > 0) {
        res.json(cat)
    } else {
        res.send({ cat: "no data found" })
    }
})
app.get("/food", async (req, res) => {

    let result = await FoodItem.find();
    if (result.length > 0) {
        res.json(result)
    } else {
        res.send({ result: "no data found" })
    }


})
console.log("working")

// Start the server
app.listen(8080)