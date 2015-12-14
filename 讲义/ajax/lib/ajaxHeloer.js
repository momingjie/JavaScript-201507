/**
 *
 * @file ajaxHelper on 2015/12/12.
 */
/*
* 闭包的方法是保护内部变量，不受外界修改
* */
(function(){
    //为了防止重复加载
    if(this.x){
        return;
    }
    给window声明一个x变量为一个对象
    var x=this.x={};

var settings={
    //请求路径
    url:'',
   // 使用什么HTTP方法
    type:'',
    //发送给服务器的数据
    data:{},

    //是否异步
    async:true,
    //用户名
    username:undefined,
    //用户密码
    password:undefined,
    //服务器响应的类型
    dataType:'text',
    //成功是调用的函数
    success:function(){},
    //失败时调用的函数
    error:function(){},
    //超时毫秒 为0时代表不走超时逻辑
    timeout:0,
    //自定义头信息
    headers:{},
    //函数里的上下文对象
    context:window
}
    x.$http=function(opt){
if(!util.isObject(opt)){
       throw new Error('chan')
        }
        var _opt={};
        for(var n in settings){
            if (!settings.hasOwnProperty(n))continue;
            _opt[n]=opt[n]||settings[n];
        }
        var xhr=util.getXHR();
        if(/!^(get|post|head|dalete|put|options)$/ig.test(_opt.type)){
            throw new Error("http方法不合法")
        }
        if(util.isObject(_opt.data)){
            var arr=[];
            for(n in _opt.data){
                if(!_opt.data.hasOwnProperty(n)) continue;
                arr.push(encodeURIComponent(n)+'='+encodeURIComponent(_opt.data[n]))
            }
          _opt.data=arr.join('&');
        }
        //因为GET系需要把data拼接到url后面，需要判断有没有"?"
        if(/^(get|datele|head)$/ig.test(_opt.type)){
            _opt.url+=(/\?/.test(_opt.url)?'&':'?')+opt.data;
            _opt.data=null;
        }
        if(/\?/.test(_opt.url)){}
        xhr.open(_opt.type,_opt.url,_opt.async,_opt.username,_opt.password);

        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&/^2\d{2}$/.test(xhr.status)){
                var txt=xhr.responseText;
                if(_opt.dataType.toUpperCase()==='JSON'){
                    try{
                        txt=util.JSONparse(txt);
                    }catch(e){
                        _opt.error(e);
                        return;
                    }
                }
            }
        };
        if(util.isNumber(_opt.timeout)&&_opt.timeout>0){
            if('timeout'in xhr){
                xhr.timeout=_opt.timeout;
                xhr.ontimeout= function () {
                    _opt.error();
                }
            }else{
                //兼容低版本ie
                setTimeout(function(){
                    if(xhr.readyState!==4){
                        xhr.abort();
                    }
                },_opt.timeout);
            }
        }
    }
//利用闭包 来实现一个判断对象类型的逻辑
    var isType=function(type){
        return function (obj){
            return Object.prototype.toString.call(obj)===('[object '+type+']');
        }
    };
    var util= {

        getXHR: (function () {
            var list=[
                function () {
                    return new XMLHttpRequest;
                }, function () {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }, function () {
                    return new ActiveXObject('Msxml2.XMLHTTP');
                }, function () {
                    return new ActiveXObject('Msxml2.XMLHTTP');
                }
                ],xhr;
        })(),
        each:(function(){
            if([].forEach){
                return function(list,callback,context){
                     [].forEach.call(list,callback,context);
                }
            }

            return function(list,callback,context){
                for(var i =0;l=list.length;i++){
                    callback.call(context,list[i],i,list)
                }
            }
        })(),
        init:function(){
            this.each(['String','Object','Number','Array','Function'],function(item){
                util['is'+item]=isType(item);
            })
        },
        JSONparse:(function(){
            if(window.JSON){
                return function(str){
                    return JSON.parse(str)
                }
            }
        })()
    }
util.init();
})();