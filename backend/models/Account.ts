import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: 'User',
    required: true
  },
  balance: {
    type: Number
  }
})

export default mongoose.model('Account', accountSchema)