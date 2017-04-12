<template>
  <div v-html='html'></div>
  <ul>
    <li v-for='(item,index) in productList'>
      <div v-bind:class="{'check':item.checked}"
           @click='selectedProduct(item)'>
        选择
      </div>
      <img v-bind:src='item.productImage' alt=''>
      <div>{{index}}</div>
      {{item.productPrice|formatMoney}}
      <a href='javascript:void(0)' @click='changemoney(item,-1)'>-</a>
      <input type='text' value='0' disabled v-model='item.productQuentity'>
      <a href='javascript:void(0)' @click='changemoney(item,1)'>+</a>
      <div>{{item.productQuentity*item.productPrice|money('元')}}</div>
      <div class='item-include'>
        <dl>
          <dt>赠送：</dt>
          <dd v-for='part in item.parts' v-text='part.partsName'></dd>
        </dl>
      </div>

    </li>
  </ul>
  <div :class="{'checked':checkAllFlag}" @click='checkAll(true)'> 全选 </div>
  <div @click='checkAll(false)'>取消全选</div>
</template>
<script>
  /**
   * Created by liwenqian on 2017/4/12.
   */

  export default {
    name:'buycar',
    data: function () {
      return  {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
        deFlag: false,
        curProduct: ''
      }
    },
    // ready:{},//生命周期1.0
    filters: {
      formatMoney: function (value) {
        return '¥' + value.toFixed(2)
      }
    },//局部过滤器
    mounted: function () {
      this.$nextTick(() => {
        'use strict'
        this.cartView()
      })
    },
    methods: {
      filter: function () {
      },
      cartView: function () {
        let _this = this
        this.$http.get('data/cartData.json', {'id': 123}).then(res => {
          _this.productList = res.body.result.list
          _this.totalMoney = res.body.result.totalMoney
        })
      },
      changemoney: function (product, way) {
        if (way > 0) {
          product.productQuentity++
        }
        else {
          if (product.productQuentity > 0) {
            product.productQuentity--
          } else {
            product.productQuentity = 0
          }

        }
        this.calctotalPrice()
      },
      selectedProduct: function (item) {
        if (typeof item.checked == 'undefined') {
          //如果vue data中没有一个字段，但是需要去用这个字段用
          //1  vue.set(item,'checked',true)
          //2 局部注册  this.$set(item,'checked',true)
          this.$set(item, 'checked', true)
        } else {
          item.checked = !item.checked
        }
        this.calctotalPrice()
      },
      checkAll: function (flag) {
        'use strict'
        this.checkAllFlag = flag
        var _this = this
        this.productList.forEach(function (item, index) {
          //先去判断item是否有checked属性
          if (typeof item.checked == 'undefined') {
            _this.$set(item, 'checked', _this.checkAllFlag)
          } else {
            item.checked = _this.checkAllFlag
          }
        })
        this.calctotalPrice()
      },
      calctotalPrice: function () {
        'use strict'
        var _this = this
        this.totalMoney = 0
        this.productList.forEach(function (item, index) {
          if (item.checked) {
            _this.totalMoney += item.productPrice * item.productQuentity
          }
        })
      },
      delConfirm: function (item) {
        'use strict'
        this.deFlag = true
        this.curProduct = item
      },
      delProduct: function () {
        var index = this.productList.indexof(this.curProduct)
        this.productList.splice(index, 1)
        this.deFlag = false
        // this.$http
        // 实际上应该把商品的id给后台让后台删除后设为false
      }
    }
  }
  Vue.filter('money', function (value, type) {
    return '¥' + value.toFixed(2) + type
  })
</script>
