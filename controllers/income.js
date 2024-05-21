const IncomeSchema = require("../models/incomeModel");



exports.addIncome = async (req, res) => {
    // console.log(req.body)
    try {
        const {title, amount, date, description, userEmail} = req.body;
        const income = new IncomeSchema({
            title,
            amount,
            date,
            description,
            userEmail
        });
        if(!title || !amount || !date){
            console.log("All fields are required!")
            return res.status(400).json({msg: 'Please fill all the fields'});
        }
        if(amount<=0 || !amount === Number){
            console.log("Amount should be a number greater than 0")
            return res.status(400).json({msg: 'Amount should be a number greater than 0'});
        }
        await income.save();
        res.status(200).json({msg: 'Income added successfully'});
        console.log("Income saved")
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}

exports.getIncome = async (req, res) => {
    // console.log(req.query)
    try {
        const {userEmail} = req.query;
        const income = await IncomeSchema.find({userEmail}).sort({createdAt: -1});
        res.status(200).json(income);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}

exports.deleteIncome = async (req, res) => {
    // console.log(req.params)
    try {
        const income = await IncomeSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: 'Income deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}