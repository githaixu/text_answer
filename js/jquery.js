$.fn.accordion = function(options){
    //default configuration properties
    var defaults = {
      trigger : ".js-accordion-trigger",//トグルボタン
      content : ".js-accordion-contents",//トグル表示エリア
      triggerClose : ".js-accordion-close",//閉じるボタン
      toggleMove : true,//トップ移動アニメーション
      ajax : [
        false,
        {
          type : "html",
          callback : (function(){})
        }
      ]//ajax
    };
    var options = $.extend(defaults,options);

    //this is the jquery object that the accordion is called upon
    var accordions = this;
    //i => index , obj => each item on the array 
    return this.each(function(i,obj){
      //初期化
      var $this = $(this); //the jquery object the each in call on 
      var $trigger = $(obj).find(options.trigger);//開閉ボタン取得
      var $content = $(obj).find(options.content);//コンテンツ取得
      var close = $(obj).find(options.triggerClose);//閉じるボタン取得
      var setting = (function(obj){
        return {
          //20200317
          _clearAccordions : function(){
            accordions.each(setting._toggleClose).on();
          },
          //20200317
          //表示・非表示演算
          _toggleMove : function(){
            //見出しアニメーション
            var h = this.find(options.trigger).offset().top - 8;//triggerの位置取得
            $('html, body').animate({ scrollTop: h }, $.transions.speed);
          },
          //active付与判定
          _toggleCheck : function(){
            //options.triggerのactiveクラスを監視
            return this.find(options.trigger).hasClass("js-active");
          },
          //close
          _toggleClose : function(){
            $content.stop(true,true).animate({height:"hide"},$.transions.speed,function(){
              $trigger.removeClass("js-active");
            });
          },
          //open
          _toggleOpen : function(){
            $trigger.addClass("js-active");
            $content.stop(true,true).css({display:"none"}).removeClass("js-none").animate({height:"show"},$.transions.speed,function(){
              //トップ移動アニメーション
              if(options.toggleMove){
                setting._toggleMove.call($this);//トップへアニメーション移動
              };
            });
          },
          //表示
          _toggleView : function(obj){
            var JSACTIVE = this.find(options.trigger).hasClass("js-active");

            //true : 閉じる false : 開く
            if(JSACTIVE){
              setting._toggleClose.call(this);//close
              setting._ajax.call(obj,true);//ajax

            }else{
              setting._ajax.call(obj,false);//ajax
              //20200317
              //clear other js-active;
              //$this.removeClass("js-active");
              setting._clearAccordions()
              //20200317
              setting._toggleOpen.call(this);//open
            }
          },
          _ajax : function(flag){
            //ajax有の場合
            if(options.ajax[0]){
              //true : 閉じた時エレメント削除
              if(flag){
                $content.fadeOut($.transions.speed,function(){
                  $content.empty();
                });
                return false;
              }
              var thisUrl = $.getReqAjax.apply(this);
              // ----------------------------------------------------
              // 送信
              // ----------------------------------------------------
              $.ajaxSet(
                //RequestData
                {
                  url : thisUrl,//URL取得オブジェクト
                  dataType : options.ajax[1].type,
                  beforeSend : function(){
                    //loading
                    $content.html($.loading());
                  }
                },
                //ResponseData
                {
                  done : function(text){
                      $content.css({"display":"none"}).html(text);
                      $content.fadeIn($.transions.speed);
                      options.ajax[1].callback();

                  }
                }//ResponseData
              );
            }//ajax オプション出し分け
          }
        }// 連想配列
      })();//end setting


      /* functions
      -----------------------------------------------------------------------------------------*/
      //開閉Event
      $trigger.on($.touch.click,function(){
        setting._toggleView.call($this,this);//表示
        return false;
      });// end click

       //closeボタン
      $(close).on($.touch.click,function(){
        setting._toggleView.call($this);//表示

        return false;
      });//end click

    });// end each
  }//end accordion