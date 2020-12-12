//安装并配置node.jsHTTP服务器
//既然客户端想服务器发送HTTP请求，也就代表服务器必须要提供HTTP服务，
//而在node.js环境中实现HTTP服务的方式有两种：HTTP模块和express模块
//加载Express模块
const express=require("express");
//引入bodyParser模块，node高版本自带则不用自己下载
const bodyParser=require('body-parser');
//加载cors模块
const cors=require("cors");
//加载mysql模块
const mysql=require("mysql");
//加载MD5的模块
const md5=require("md5");
//创建web服务器
const server=express();
//为所有的HTTP请求使用CORS模块

server.use(cors({
    origin:['http://127.0.0.1:8080','http://localhost:8080']
}));
server.use(bodyParser.urlencoded({
        extended:false
}));
server.use(express.static('./public'));
const pool=mysql.createPool({
        host:'127.0.0.1',
        port:'3306',
        user:'root',
        password:'',
        database:'hh',
        connectionLimit:'15'
});
//指定WEB服务器监听的端口
server.listen(3000);

// //获取所有的文章分类
// server.get("/category",(req,res)=>{
//         let sql='select id, category_name from xzqa_category order by id desc';
//         pool.query(sql,(err,result)=>{
//                 if(err)throw err;
//                 res.send({code:200,message:'查询成功',result:result});

//         });
        
// });
// //获取指定分类下包含的文章数据
// server.get("/article",(req,res)=>{
//         //获取地址栏的url参数
//         let id=req.query.id;
//         let page=req.query.page;
//         let pagesize=15;
//         let offset=(page-1)*pagesize;
//         let rowcount;
//         let sql="select count(id) as count from xzqa_article where category_id=?";
//         pool.query(sql,[id],(err,result)=>{
//                 if(err) throw err;
//                 console.log(result[0].count);
//                 rowcount=result[0].count;
      
        
//         // let offset=(page-1)*pagesize;
//         //计算出总页数
//         let pagecount=Math.ceil(rowcount/pagesize);
//         console.log(pagecount);
//         sql="select id,subject,description,image from xzqa_article where category_id=? limit ?,?";
//         pool.query(sql,[id,offset,pagesize],(err,result)=>{
//                 if(err)throw err;
//                 res.send({code:200,message:'查询成功',result:result,pagecount:pagecount});
        
//         });

// });
// });

// server.get("/review/:id",(req,res)=>{
//         let id=req.params.id;
//         let sql="select r.id,subject,content,created_at,nickname,avatar,article_number from xzqa_article as r inner join xzqa_author as u on author_id=u.id where r.id=?"; 
//         pool.query(sql,[id],(err,result)=>{
//                 if(err) throw err;
//                 res.send({code:200,message:'查询成功',result:result[0]});
//         });
// });
// server.get("/comments",(req,res)=>{
//         let id=req.query.id;
//         console.log(id);
//         let sql="select c.id,c.content,created_at,username,avatar,created_at from xzqa_users as u inner join xzqa_comments as c on u.id=user_id where article_id=? order by c.id limit 5";
//         pool.query(sql,[id],(err,result)=>{
//                 if(err) throw err;
//                 res.send({code:200,message:'查询成功',result:result});
//         });
// });
// //用户接口注册
// server.post("/register",(req,res)=>{
//         let username=req.body.username;
//         let password=md5(req.body.password);
//         let sql="select count(id) as count from xzqa_author where username=?";
//         pool.query(sql,[username],(err,result)=>{
//                 if(err) throw err;
//                 if(result[0].count){
//                 res.send({code:201,message:"用户已经存在，注册失败"});     
//                 }else{
//                 // sql="insert into xzqa_author(username,password) values (?,md5(?))";
//                 sql="insert into xzqa_author(username,password) values (?,?)";
//                pool.query(sql,[username,password],(err,result)=>{
//                        if(err) throw err;
//                 //        if(result.affectedRows){
//                 //                res.send({code:200,message:'注册成功'});
//                 //                console.log(result);
//                 //        }
//                 res.send({code:200,message:'注册成功'});
//                });
//                 }
                
               
//         });
// });

// server.post("/login",(req,res)=>{
//         let username=req.body.username;
//         let password=md5(req.body.password);
//         let sql="select id,username,password,nickname,avatar,article_number from xzqa_author where username=? and password=?";
//         pool.query(sql,[username,password],(err,result)=>{
//                 if(err) throw err;
//                 console.log(result);
//                if(result.length){
//                         res.send({code:200,message:"登录成功",info:result[0]});
                    
//                 }else{
//                         res.send({code:201,message:"用户名不存在，请注册"});
//                 }
//         });
// });