Express3 Demo
==============================

Nodejs给Javascript赋予了服务端应用的生命，Jquery让Javascript成为浏览中开发的利器。 最近学习了Nodejs的Express3.0的开发框架，本来是按照“node.js开发指南”书中介绍，但“node.js开发指南”讲的是Express2.x的，从Express2.x到Express3.0自己模索中还是走了不少弯路的。写篇文章总结一下。

项目分支
------------------------

+ Express 3.x Demo ( https://github.com/bsspirit/nodejs-demo/tree/express3 )
+ Express 4.x Demo ( https://github.com/bsspirit/nodejs-demo/tree/express4 )

关于作者
----------------------

* 张丹(Conan), 程序员Java,R,PHP,Javacript
* weibo：@Conan_Z
* blog: http://blog.fens.me
* email: bsspirit@gmail.com

使用说明
----------------------

Nodejs开发框架Express3.0开发手记–从零开始

http://blog.fens.me/nodejs-express3/ 

Mongoose使用案例：让JSON数据直接POST入MongoDB

http://blog.fens.me/nodejs-mongoose-json/ 

源代码下载
----------------------

程序代码已经上传到github有需要的同学，自行下载。
https://github.com/bsspirit/nodejs-demo

# Express+Mongodb Js Driver下的开发
1.框架的认识
    /public：浏览器会load的,html中要用到的用于交互的js脚本
    /routes: 浏览器不会load到的，不好调试，后台数据接口
    /views: routes中渲染用的html
把所有routes里的实现，搬运到public中？
/public/javascripts/bundle.js里头，便于调试，不会分散到多个文件中，
但那是快速开发的是否能保证性能。
2.开发的模块顺序
    要用到的数据结构：
        json,obj,string,array的转换，
        js data api
        html data api
        mongodb data api
        
    需要进行的数据操作：
        查找
        插入
        更改
# bundle.js 是如何生成的
需要查看，chrome extension里头的mindmap项目

