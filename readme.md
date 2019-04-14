# Express-API-Routing
## 简述：
    Express-API-Routing是一个简单的Express路由系统，他不需要你进行其他的操作，只需要将API文件放到规定的文件夹内，Express-API-Routing将自动加载到项目中。
## 快速上手
### 安装Express-API-Routing到项目中

```js
npm i -S express-api-routing
//下载
const APIRouting =  require('express-api-routing');
//引入
```

### 项目中使用

#### 项目目录

	|api
	|	|admin
	|	|	|login.POST.js
	|	|test.GET.js
	|app.js

注意：api文件夹下的api文件名格式必须是

	<APINAME>.<GET|POST|…>.js


#### ./app.js


```js
const express = require('express');
const APIRouting = require('express-api-routing');
const mysql = require('mysql');
const app = express();

let pool = mysql.createPool({
    host:'localhost',
    port:3306,
    database:'khjldb',
    username:'root',
    password:'12345678'
});

APIRouting.globalStore({mysql,pool});
//store:全局化对象

app.use(APIRouting.static(__dirname,'./api'));
//static:设置api文件的目录

app.listen(8088, () => {
    console.log('Example app listening on port 8088!');
});

//Run app, then load http://localhost:8088 in a browser to see the output.

```

#### ./api/test.js

```js
module.exports = (req,res)=>{
    //req:是请求的对象
    //res:是响应对象
    pool.connection(...);
    
    
    res.send('hello');
}
```

## 最后

​	如果Express-API-Routing有BUG大家可以pull request 给我反馈

