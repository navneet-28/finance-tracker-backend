const ExpenseSchema = require('../models/ExpenseModel');



exports.addExpense = async (req, res) => {
    // console.log(req.body)
    try {
        const {title, amount, date, description, userEmail} = req.body;
        const expense = new ExpenseSchema({
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
            return res.status(401).json({msg: 'Amount should be a number greater than 0'});
        }
        await expense.save();
        res.status(200).json({msg: 'Expense added successfully'});
        console.log("Expense saved")
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}

exports.getExpense = async (req, res) => {
    // console.log(req.query)
    try {
        const {userEmail} = req.query;
        const expense = await ExpenseSchema.find({userEmail}).sort({createdAt: -1});
        res.status(200).json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}

exports.deleteExpense = async (req, res) => {
    // console.log(req.params)
    try {
        const expense = await ExpenseSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: 'Expense deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}
