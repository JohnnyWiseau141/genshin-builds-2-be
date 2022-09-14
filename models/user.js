import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  profile: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true,
})

const User = mongoose.model('User', userSchema)

export { User }