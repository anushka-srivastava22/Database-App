
var express     = require('express');  
var mongoose    = require('mongoose');  
var multer      = require('multer');  
var path        = require('path');  
var userModel    = require('./routes/UserModel');  
var excelToJson = require('convert-excel-to-json');
var bodyParser  = require('body-parser');  
var storage = multer.diskStorage({  
destination:(req,file,cb)=>{  
cb(null,'./public/uploads');  
},  
filename:(req,file,cb)=>{  
cb(null,file.originalname);  
}  
});  
var uploads = multer({storage:storage});  
//connect to db  
mongoose.connect('mongodb://localhost:27017/exceldemo',{useNewUrlParser:true}).then(()=>console.log('connected to db')).catch((err)=>console.log(err))  
//init app  
var app = express();  
//set the template engine  
app.set('view engine','ejs');  
//fetch data from the request  
app.use(bodyParser.urlencoded({extended:false}));  
//static folder  
app.use(express.static(path.resolve(__dirname,'public')));  
//route for Home page
app.get('/', (req, res) => {
res.sendFile(__dirname + '/index.html');
});
// Upload excel file and import to mongodb
app.post('/uploadfile', upload.single("uploadfile"), (req, res) =>{
importExcelData2MongoDB(__dirname + '/uploads/' + req.file.filename);
console.log(res);
});
// Import Excel File to MongoDB database
function importExcelData2MongoDB(filePath){
// -> Read Excel File to Json Data
const excelData = excelToJson({
sourceFile: filePath,
sheets:[{
// Excel Sheet Name
name: 'Interns',
// Header Row -> be skipped and will not be present at our result object.
header:{
rows: 1
},
// Mapping columns to keys
columnToKey: {
A: '_id',
B: 'name',
C: 'email',
D: 'mobile',
E: 'dob',
F: 'workexp',
G: 'resume',
H: 'currloc',
I: 'postadd',
J: 'curremp',
K: 'currdes'
}
}]
});
// -> Log Excel Data to Console
console.log(excelData);
/**
{ 
Customers:
[ 
{ _id: 1, name: 'Jack Smith', address: 'Massachusetts', age: 23 },
{ _id: 2, name: 'Adam Johnson', address: 'New York', age: 27 },
{ _id: 3, name: 'Katherin Carter', address: 'Washington DC', age: 26 },
{ _id: 4, name: 'Jack London', address: 'Nevada', age: 33 },
{ _id: 5, name: 'Jason Bourne', address: 'California', age: 36 } 
] 
}
*/  
// Insert Json-Object to MongoDB
userModel.insertMany(jsonObj,(err,data)=>{  
if(err){  
console.log(err);  
}else{  
res.redirect('/');  
}  
}); 
fs.unlinkSync(filePath);
}
//assign port  
var port = process.env.PORT || 3000;  
app.listen(port,()=>console.log('server run at port '+port));

/*var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;*/
