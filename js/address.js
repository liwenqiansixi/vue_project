/**
 * Created by liwenqian on 2017/4/12.
 */
new Vue({
    el: "#address",
    data: {
        addressList: [],
        limit: 3,
        currentIndex: 0,
        shopway: 1,
        more: '点击加载更多'
    },
    mounted: function () {
        "use strict";
        this.$nextTick(() => {
            this.getAddressList();
        })
    },
    computed: {
        filterAddress: function () {
            return this.addressList.slice(0, this.limit);
        }
        // filterAddress:()=>this.addressList.slice(0, 3)
    },
    methods: {
        getAddressList: function () {
            var _this = this;
            this.$http.get("data/address.json", {"id": 123}).then(res => {
                console.log(res.body.result);
                _this.addressList = res.body.result;
            })
        },
        moreItem: function () {
            this.more = "点击收起";
            if (this.limit == 3) {
                this.limit = this.addressList.length;
            } else {
                this.limit = 3;
            }
        },
        setDefault: function (addressId) {
            this.addressList.forEach(function (address, index) {
                if (address.addressId == addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }
            })
        }
    }

});