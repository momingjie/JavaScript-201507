/**
 *
 * @file ajaxHelper on 2015/12/12.
 */
/*
* �հ��ķ����Ǳ����ڲ���������������޸�
* */
(function(){
    //Ϊ�˷�ֹ�ظ�����
    if(this.x){
        return;
    }
    ��window����һ��x����Ϊһ������
    var x=this.x={};

var settings={
    //����·��
    url:'',
   // ʹ��ʲôHTTP����
    type:'',
    //���͸�������������
    data:{},

    //�Ƿ��첽
    async:true,
    //�û���
    username:undefined,
    //�û�����
    password:undefined,
    //��������Ӧ������
    dataType:'text',
    //�ɹ��ǵ��õĺ���
    success:function(){},
    //ʧ��ʱ���õĺ���
    error:function(){},
    //��ʱ���� Ϊ0ʱ�����߳�ʱ�߼�
    timeout:0,
    //�Զ���ͷ��Ϣ
    headers:{},
    //������������Ķ���
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
            throw new Error("http�������Ϸ�")
        }
        if(util.isObject(_opt.data)){
            var arr=[];
            for(n in _opt.data){
                if(!_opt.data.hasOwnProperty(n)) continue;
                arr.push(encodeURIComponent(n)+'='+encodeURIComponent(_opt.data[n]))
            }
          _opt.data=arr.join('&');
        }
        //��ΪGETϵ��Ҫ��dataƴ�ӵ�url���棬��Ҫ�ж���û��"?"
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
                //���ݵͰ汾ie
                setTimeout(function(){
                    if(xhr.readyState!==4){
                        xhr.abort();
                    }
                },_opt.timeout);
            }
        }
    }
//���ñհ� ��ʵ��һ���ж϶������͵��߼�
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