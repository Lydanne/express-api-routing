const methods = require('./Methods');
let r = {};

let static = (__dir,APIDir) => {
    let DirOBJ = methods.getDirList(APIDir);
    let APIList = methods.filterDir(DirOBJ.list);
    let APIFind = methods.APIShift(APIList);
    let API = {};
    // console.log(DirOBJ,APIList,APIFind);
    
    for (let i = 0; i < APIList.length; i++) {
        //路由请求
        const item = APIFind.__list[i];
        console.log(item);
        API[item] = require(__dir+item);
        
    }

    return (req, res, next) => {
        const APIPath = req.path+ '.' + req.method;
        
        
        if (APIFind[APIPath]) {
            API[APIPath](req,res,r);
        }   

        next();
    }
}

let rely = (bao)=>{
    r = bao;
}



module.exports = {
    static,
    rely
}