var mongoose  =  require('mongoose');  
  
var exceldataSchema = new mongoose.Schema({  
    name:{  
        type:String  
    },  
    email:{  
        type:String  
    },   
    mobile:{
        type:Number 
    },
    dob:{
        type:String
    },
    workexp:{  
        type:String  
    },  
    resume:{  
        type:String  
    },
    currloc:{  
        type:String  
    },  
    postadd:{  
        type:String  
    }, 
    curremp:{  
        type:String  
    },  
    currdes:{  
        type:String  
    }
});  
  
module.exports = mongoose.model('UserModel',exceldataSchema);  

