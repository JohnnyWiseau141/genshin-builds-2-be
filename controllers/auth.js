import { User } from '../models/user.js'
import { Profile } from '../models/profile.js'
import jwt from 'jsonwebtoken'

// Handle errors
function handleErrors(err){
  let errors = {email:"",password:""}

  //duplicate user error code
  if(err.code === 11000){
    errors.email = 'That email is already registered'
    return errors
  }

  //email or password validation errors
  if(err.message.includes('User validation failed')){
    Object.values(err.errors).forEach(({properties}) =>{
      errors[properties.path] = properties.message
    })
  }
  return errors
}

// Create JWT 
function createJWT(user){
  return jwt.sign({user}, process.env.SECRET, {expiresIn: '24h'})
}

async function signup(req,res){
  const profile = new Profile(req.body)
  const user = new User(req.body)
  req.body.profile = profile._id
  try {
    await user.save()
    await profile.save()

    const token = createJWT(user._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: 3*24*60*60*1000})
    res.status(201).json({user: user._id})
  }
  catch(err){
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

async function login(req,res){
  res.send('user login')
}

export{
  signup,
  login
}