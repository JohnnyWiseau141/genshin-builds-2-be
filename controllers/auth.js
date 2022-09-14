import { User } from '../models/user.js'

function signup_get(req,res){
  res.render('signup')
}

function login_get(req,res){
  res.render('login')
}

function signup_post(req,res){
  res.send('new signup')
}

function login_post(req,res){
  res.send('user login')
}

export{
  signup_get,
  signup_post,
  login_get,
  login_post
}