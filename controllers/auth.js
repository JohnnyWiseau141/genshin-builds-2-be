import { User } from '../models/user.js'

//handle errors
function handleErrors(err){
  let errors = {email:"",password:""}

  //duplicate error code
  if(err.code === 11000){
    errors.email = 'That email is already registered'
    return errors
  }

  //validation errors
  if(err.message.includes('User validation failed')){
    Object.values(err.errors).forEach(({properties}) =>{
      errors[properties.path] = properties.message
    })
  }
  return errors
}

function signup_get(req,res){
  res.render('signup')
}

function login_get(req,res){
  res.render('login')
}

async function signup_post(req,res){
  const {email, password} = req.body
  try {
    const user = await User.create({ email, password})
    res.status(201).json(user)

  }
  catch(err){
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

async function login_post(req,res){
  res.send('user login')
}

export{
  signup_get,
  signup_post,
  login_get,
  login_post
}