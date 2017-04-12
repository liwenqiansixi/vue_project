/**
 * Created by liwenqian on 2017/4/12.
 */
new Vue({
    el: "#app",
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag:false,
        deFlag:false,
        curProduct:''
    },
    // ready:{},//生命周期1.0
    filters: {
        formatMoney: function (value) {
            "use strict";
            return '¥' + value.toFixed(2);
        }
    },//局部过滤器
    mounted: function () {
        this.$nextTick(() => {
            "use strict";
            this.cartView();
        });
        // 不能保证已经插入文档必须包含一侧vue.nextTick/va.$nextTick
    },
    methods: {
        filter: function () {
        },//全局过滤器
        cartView: function () {
            let _this = this;
            //只能使用this
            this.$http.get("data/cartData.json", {"id": 123}).then(res => {
                _this.productList = res.body.result.list;
                _this.totalMoney = res.body.result.totalMoney
            })
        },
        changemoney: function (product, way) {
            "use strict";
            if (way > 0) {
                product.productQuentity++;
            }
            else {
                if(product.productQuentity>0){
                    product.productQuentity--;
                }else{
                    product.productQuentity=0;
                }

            }
            this.calctotalPrice();
        },
        selectedProduct:function(item){
            "use strict";
            if(typeof item.checked=="undefined"){
                //如果vue data中没有一个字段，但是需要去用这个字段用
                //1  vue.set(item,"checked",true)
                //2 局部注册  this.$set(item,"checked",true)
                this.$set(item,"checked",true);
            }else{
                item.checked=!item.checked;
            }
            this.calctotalPrice();
        },
        checkAll:function(flag){
            "use strict";
            this.checkAllFlag=flag;
            var _this=this;
                this.productList.forEach(function(item,index){
                    //先去判断item是否有checked属性
                    if(typeof item.checked=="undefined"){
                        _this.$set(item,"checked",_this.checkAllFlag);
                    }else{
                        item.checked=_this.checkAllFlag;
                    }
                })
            this.calctotalPrice();
        },
        calctotalPrice:function(){
            "use strict";
            var _this=this;
            this.totalMoney=0;
            this.productList.forEach(function(item,index){
                if(item.checked){
                    _this.totalMoney+=item.productPrice*item.productQuentity;
                }
            })
        },
        delConfirm:function(item){
            "use strict";
            this.deFlag=true;
            this.curProduct=item;
        },
        delProduct:function(){
            var index=this.productList.indexof(this.curProduct);
            this.productList.splice(index,1);
            this.deFlag=false;
            // this.$http
            // 实际上应该把商品的id给后台让后台删除后设为false
        }
    }
})
Vue.filter("money", function (value, type) {
    "use strict";
    return "¥" + value.toFixed(2) + type;
})