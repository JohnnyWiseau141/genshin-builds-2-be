import mongoose from 'mongoose'
import isEmail from 'validator/lib/isEmail.js'
import * as bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: [true, "Please enter an email"], lowercase: true, unique: true , validate: [isEmail, "Please enter a valid email"]},
  password: { type: String, required: [true, "Please enter a password"], minlength: [6, "Minimum password length is 6 characters"] },
  profile: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true,
})

//fire a function before doc saved to db
userSchema.pre('save',async function(next){
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password,salt)
  next()
})

const User = mongoose.model('User', userSchema)

export { User }