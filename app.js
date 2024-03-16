const express=require('express');
const mongoose=require('mongoose');
const authRoutes=require('./routes/authRoutes');
const cookieParser=require('cookie-parser');//middleware
const {requireAuth}=require('./middleware/authMiddleware');
const {checkUser}=require('./middleware/authMiddleware');

const app=express();

app.use(express.static('public'));
app.use(express.json());//takes any json data that comes as request and parses into a JS object for us to use..
app.use(cookieParser());
app.set('view engine','ejs');

//database connection..
const dbURI='mongodb connection string';
mongoose.connect(dbURI)
.then(result=>{
    console.log('coonected to db');
    app.listen(3000);
})
.catch(err=>console.log(err));

//routes
app.get('*',checkUser); //applies to every get request..
app.get('/',requireAuth,(req,res)=>res.render('home'));
app.get('/smoothies',requireAuth,(req,res)=>res.render('smoothies'));

app.use(authRoutes);

