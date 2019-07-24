const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getgeoCode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Get Path
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Set path 
app.set("view engine","hbs")
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Set Static pages path
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Phaninder'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Phani'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Press F11 for help',
        name:'Vicky'
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address with the search query.'
        })
    }
    const address = req.query.address
    getgeoCode(address,(err,data)=>{
        if(err){
            return res.send({
                error:err
            })            
        }
        forecast(data,(err2,result)=>{
            if(err2){
                return res.send({
                    error:err2
                })
            }
            
            res.send({
                forecast:result,
                location:data.location,
                address:address
            })
        })
    })

})

app.get("/help/*",(req,res)=>{
    res.render('404',{
        title:'Help Page not found',
        name:'Vicky'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'Page not found',
        name:'Vicky'
    })
})

app.listen(port,()=>{
    console.log("Express running at port "+port)
})