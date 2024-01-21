import { type Request, type Response } from 'express'
import Account from '../../models/Account'
import mongoose from 'mongoose'
import zod from 'zod'

const transferSchema = zod.object({
  amount: zod.number(),
  to: zod.string()
})

const transfer = async (req: Request, res: Response) => {
  try {

    if (!transferSchema.safeParse(req.body)) {
      res.status(411).json({
        message: "Incorrect Inputs"
      })
      return
    }

    const { amount, to } = req.body;

    const session = await mongoose.startSession();

    session.startTransaction();

    const fromAccount = await Account.findOne({
      userId: req.user
    }).session(session);

    if (!fromAccount || (fromAccount.balance && fromAccount.balance < amount)) {
      await session.abortTransaction();
      res.status(400).json({
        message: "Insufficient balance"
      })
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      res.status(400).json({
        message: "Invalid account"
      })
    }

    await Account.updateOne({ userId: req.user }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();

    res.status(200).json({
      message: "Transfer Successfull"
    })
  } catch (err) {
    console.log('error: ', err)
    res.status(500)
  }
}

export default transfer