const fs = require('fs');

/**
 * 
 * @param {String} Dir Read the file directory
 * @returns {exists:Boolean,list:Array} 
 * exists:Indicates whether a file directory exists
 * list:File directory
 */
function getDirList(Dir='/') {
    if (!fs.existsSync(Dir)) {
        //检查文件路径是否存在
        return { exists: false, err: "path exists false" };
    }
    let stat = fs.statSync(Dir);
    if (!stat.isDirectory()) {
        //检查是否为文件夹
        return { exists: false, err: "dir isDir false" };
    }

    let list = fs.readdirSync(Dir);
    //获取文件列表
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        let temp = getDirList(Dir + '/' + item);
        if (temp.exists) {
            list[i] = {
                isDir:true,
                path:Dir+'/'+item,
                child:temp.list
            };
        }else{
            list[i] = {
                isDir:false,
                path:Dir+'/'+item
            };
        }
    }
    return { exists: true, list };
}

// eg:DirOBJ
// [
//     {
//         isDir:true,
//         path:'/admin',
//         chlid:[
//             {
//                 isDir:false,
//                 path:'/admin/post.login.js'
//             }
//         ]
//     },
//     {
//         isDir:true,
//         path:'/user',
//         child:[
//             {
//                 isDir:true,
//                 path:'/user/add',
//                 child:[]
//             },
//             {
//                 isDir:false,
//                 path:'/user/post.login.js'
//             }
//         ]
//     },
//     {
//         isDir:false,
//         path:'/get.list.js'
//     }
// ]

/**
 * 
 * @param {Array} DirOBJ DirOBJ对象
 */
function filterDir(DirOBJ=[]) {
    let list = [];
    for (let i = 0; i < DirOBJ.length; i++) {
        const item = DirOBJ[i];
        if (item.isDir) {
            if(item.child.length){
                let t = filterDir(item.child);
                for (let j = 0; j < t.length; j++) {
                    const item = t[j];
                    list.push(item);
                }
            }
        }else{
            list.push(item.path);
        }
    }

    return list;
}

function APIShift(list) {
    let t = {};
    t['__list'] = [];
    list.forEach(item => {
        t[item.substr(1,item.length-4)] =true;
        t["__list"].push(item.substr(1,item.length-4));
    });

    return t;
}

module.exports = { getDirList ,filterDir, APIShift}