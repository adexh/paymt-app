import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  email: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  methods: {
    generateAuthToken () {
      try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET)
        return token
      } catch (err) {
        console.log(err)
      }
    }
  }
})

export default mongoose.model('users', userSchema)