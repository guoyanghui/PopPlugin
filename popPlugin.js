var PopPlugin = (function($){

    var PopPlugin = function(options){
        this.defaultProps = {
            title:"合作协议",
            content:"协议内容",
            agreeContent:"我已同意以上协议",
            btnTxt:"下一步"
        };
        this.defaultTemplate = "<div data-popPlugin='true'>" +
            "<div class='pp-content'>" +
                "<div class='pp-header'>" +
                    "<h4>{title}</h4>" +
                "</div>" +
                "<div class='pp-body'>{content}</div>" +
                "<div class='pp-footer'>" +
                    "<div class='pp-footer-radio'>" +
                        "<i class='radio'></i>" +
                        "<span>{agreeContent}</span>" +
                    "</div>" +
                    "<button id='next' data-PopBtn='true'>{btnTxt}</button>" +
                "</div>" +
            "</div>" +
            "</div>";
        this.options = $.extend({},this.defaultProps,options?options:null);
        if(options.methods){
            var self = this;
            for(var props in options.methods){
                self[props] = options.methods[props];
            }
        }
        /*初始化*/
        this.init();
        this.rootEle = $("div[data-popplugin=true]");
        this.content = this.rootEle.find(".pp-content");
        this.agreeBtn = this.rootEle.find(".pp-footer-radio");
        this.nextBtn = this.rootEle.find("button[data-PopBtn=true]");
        this.hide();
        this.contentFn();
        this.agreeFn();
        this.shadowFn();
    };

    PopPlugin.prototype = {
        init:function(){
            var renderHtml = this.render(this.options,this.defaultTemplate);
            $("body").append(renderHtml);
        },
        render:function(data,temp){
            for(var prop in data){
                var re = new RegExp("{"+prop+"}","g");
                temp = temp.replace(re,data[prop]);
            }
            return temp;
        },
        show:function(){
            $("body,html").css({
                "overflow":"hidden"
            });
            this.rootEle.show();
        },
        hide:function(){
            $("body,html").css({
                "overflow":"auto"
            });
            this.rootEle.hide();
        },
        agreeFn:function(){
            var self = this;
            self.agreeBtn.on("click",function(){
                if($(this).hasClass("active")){
                    $(this).removeClass("active");
                    self.nextBtn.removeClass("active");
                }else{
                    $(this).addClass("active");
                    self.nextBtn.addClass("active");
                }
            });

        },
        contentFn:function(){
            this.content.on("click",function(ev){
                var ev = ev || event;
                ev.stopPropagation();
            })
        },
        shadowFn:function(){
            var self = this;
            this.rootEle.on("click",function(){
                self.hide();
            })
        }
    };
    return PopPlugin;


})(jQuery);