webpackJsonp([28],{ANj2:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r=t("LPk9"),a=t("+1pJ"),n=t("FJop"),o=t("9woI"),i=t.n(o),d=t("QmSG"),c=t("x47x"),l={data:function(){var e=this;return{accountAddressValue:localStorage.getItem("newAccountAddress"),submitId:"transferSubmit",usable:0,fee:0,accountAddress:[],remnant:0,address:localStorage.getItem("newAccountAddress"),transferForm:{address:localStorage.getItem("newAccountAddress"),outName:"",joinAddress:"",joinNo:"",serviceNo:"",remark:""},transferRules:{selectAddress:[{validator:function(s,t,r){""===t?r(new Error(e.$t("message.addressNull"))):(""!==e.transferForm.checkPass&&e.$refs.transferForm.validateField("joinNo"),r())},trigger:"blur"}],joinAddress:[{validator:function(s,t,r){t?(e.address=localStorage.getItem("newAccountAddress"),/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.exec(t)?t===e.address?r(new Error(e.$t("message.addressOrTransfer"))):r():r(new Error(e.$t("message.c168")))):r(new Error(e.$t("message.transferNull")))},trigger:"blur"}],joinNo:[{validator:function(s,t,r){t||r(new Error(e.$t("message.transferNO"))),setTimeout(function(){if(/(^\+?|^\d?)\d*\.?\d+$/.exec(t)){var s=new c.BigNumber(t),a=new c.BigNumber(e.usable);1===s.comparedTo(a.minus(.01))?r(new Error(e.$t("message.transferNO2"))):t<.01?r(new Error(e.$t("message.transferNO3"))):/^\d{1,8}(\.\d{1,8})?$/.exec(t)?r():r(new Error(e.$t("message.c136")))}else r(new Error(e.$t("message.transferNO1")))},100)},trigger:"blur"}]},userAddressList:[],dialogTableVisible:!1}},components:{Back:r.a,AccountAddressBar:a.a,Password:n.a},mounted:function(){""===this.address&&(this.address=localStorage.getItem("newAccountAddress")),this.getBalanceAddress("/accountledger/balance/"+this.address)},methods:{getBalanceAddress:function(e){var s=this;this.$fetch(e).then(function(e){if(e.success){var t=new c.BigNumber(1e-8);s.usable=parseFloat(t.times(e.data.usable.value).toString())}})},chenckAccountAddress:function(e){this.address=e,this.accountAddressValue=e,localStorage.setItem("newAccountAddress",this.address),this.getBalanceAddress("/accountledger/balance/"+e),this.$refs.transferForm.validateField("joinAddress"),this.$refs.transferForm.validateField("joinNo"),this.countFee()},accountCopy:function(){i()(this.accountAddressValue),this.$message({message:this.$t("message.c129"),type:"success",duration:"800"})},allUsable:function(e){var s=this;0===e?this.$message({message:this.$t("message.creditLow"),type:"warning "}):(this.countFee(e),setTimeout(function(){s.transferForm.joinNo=d.c(e,.01),s.$refs.transferForm.validateField("joinAddress"),s.$refs.transferForm.validateField("joinNo")},500))},openDB:function(){indexedDB.open("usersDB",1).onupgradeneeded=function(e){var s=e.target.result;if(!s.objectStoreNames.contains("usersDB"))s.createObjectStore("addressList",{keyPath:"userAddress",autoIncrement:!1})}},toUsersAddressList:function(){this.dialogTableVisible=!0;var e=[];indexedDB.open("usersDB",1).onsuccess=function(s){s.target.result.transaction("addressList","readonly").objectStore("addressList").openCursor().onsuccess=function(s){var t=s.target.result;t&&(e.push(t.value),t.continue())}},this.userAddressList=e},checkedAddress:function(e){this.transferForm.joinAddress=e,this.dialogTableVisible=!1},dbcheckedAddress:function(e,s){this.transferForm.joinAddress=e.userAddress,this.dialogTableVisible=!1},countFee:function(){var e=this;if(""!==this.transferForm.joinAddress&&this.transferForm.joinNo>0){var s=new c.BigNumber(1e8),t="address="+this.address+"&toAddress="+this.transferForm.joinAddress+"&amount="+s.times(this.transferForm.joinNo)+"&remark="+this.transferForm.remark.replace(/\n/g,"");this.$fetch("/accountledger/transfer/fee?"+t).then(function(s){if(s.success){var t=new c.BigNumber(1e-8);e.fee=t.times(s.data.value)}})}},transferSubmit:function(e){var s=this;this.$refs[e].validate(function(e){if(!e)return!1;"true"===localStorage.getItem("encrypted")?s.$refs.password.showPassword(!0):s.$confirm(s.$t("message.c172"),"",{confirmButtonText:s.$t("message.confirmButtonText"),cancelButtonText:s.$t("message.cancelButtonText")}).then(function(){s.toSubmit("")}).catch(function(){})})},toSubmit:function(e){var s=this,t=new c.BigNumber(1e8),r='{"address":"'+this.address+'","toAddress":"'+this.transferForm.joinAddress+'","amount":'+t.times(this.transferForm.joinNo)+',"password":"'+e+'","remark":"'+this.transferForm.remark.replace(/\n/g,"")+'"}';this.$post("/accountledger/transfer",r).then(function(e){e.success?(s.$message({message:s.$t("message.passWordSuccess"),type:"success"}),s.transferForm.joinAddress="",s.transferForm.joinNo="",s.transferForm.remark="",s.getBalanceAddress("/account/balance/"+s.transferForm.address),sessionStorage.setItem("walletActiveName","second"),s.$router.push({name:"/wallet"})):s.$message({message:s.$t("message.passWordFailed")+e.msg,type:"warning"})})}}},u={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"transfer"},[t("Back",{attrs:{backTitle:this.$t("message.walletManagement")}}),e._v(" "),t("div",{staticClass:"transfer-info"},[t("h2",[e._v("NULS "+e._s(e.$t("message.transfer")))]),e._v(" "),t("el-form",{ref:"transferForm",attrs:{model:e.transferForm,rules:e.transferRules}},[t("el-form-item",{staticClass:"out-address",attrs:{label:e.$t("message.sourceAddress")+"："}},[t("AccountAddressBar",{on:{chenckAccountAddress:e.chenckAccountAddress}}),e._v(" "),t("i",{staticClass:"copy_icon copyBtn cursor-p",attrs:{"data-clipboard-text":e.accountAddressValue,title:e.$t("message.c143")},on:{click:e.accountCopy}})],1),e._v(" "),t("el-form-item",{attrs:{label:e.$t("message.destinationAddress")+"：",prop:"joinAddress"}},[t("el-input",{ref:"joinAddress",attrs:{type:"text"},on:{change:e.countFee},model:{value:e.transferForm.joinAddress,callback:function(s){e.$set(e.transferForm,"joinAddress","string"==typeof s?s.trim():s)},expression:"transferForm.joinAddress"}}),e._v(" "),t("i",{staticClass:"cursor-p icons",on:{click:e.toUsersAddressList}})],1),e._v(" "),t("el-form-item",{attrs:{label:e.$t("message.transferAmount")+"：",prop:"joinNo"}},[t("span",{staticClass:"allUsable"},[e._v(e._s(e.$t("message.currentBalance"))+": "+e._s(e.usable)+" NULS")]),e._v(" "),t("el-input",{attrs:{type:"text",maxlength:17},on:{change:e.countFee},model:{value:e.transferForm.joinNo,callback:function(s){e.$set(e.transferForm,"joinNo",s)},expression:"transferForm.joinNo"}})],1),e._v(" "),t("el-form-item",{attrs:{label:e.$t("message.remarks")+"："}},[t("el-input",{attrs:{type:"textarea",maxlength:30},on:{change:e.countFee},model:{value:e.transferForm.remark,callback:function(s){e.$set(e.transferForm,"remark","string"==typeof s?s.trim():s)},expression:"transferForm.remark"}})],1),e._v(" "),t("el-form-item",{attrs:{label:e.$t("message.c28")+": "+this.fee+" NULS"}}),e._v(" "),t("el-form-item",{staticClass:"transfer-submit"},[t("el-button",{attrs:{type:"primary",id:"transferSubmit"},on:{click:function(s){e.transferSubmit("transferForm")}}},[e._v("\n          "+e._s(e.$t("message.c114"))+"\n        ")])],1)],1),e._v(" "),t("el-dialog",{staticClass:"transfer-dialog",attrs:{visible:e.dialogTableVisible},on:{"update:visible":function(s){e.dialogTableVisible=s}}},[t("el-table",{attrs:{data:e.userAddressList},on:{"row-dblclick":e.dbcheckedAddress}},[t("el-table-column",{attrs:{property:"userAddress",label:e.$t("message.tabName"),"min-width":"280",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{property:"userAlias",label:e.$t("message.tabAlias"),width:"70",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{property:"userHelp",label:e.$t("message.remarks"),width:"110",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{label:e.$t("message.operation"),width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(s){return[t("span",{staticClass:"cursor-p text-d",on:{click:function(t){e.checkedAddress(s.row.userAddress)}}},[e._v(e._s(e.$t("message.select")))])]}}])})],1)],1),e._v(" "),t("Password",{ref:"password",attrs:{submitId:e.submitId},on:{toSubmit:e.toSubmit}})],1)],1)},staticRenderFns:[]};var m=t("VU/8")(l,u,!1,function(e){t("ZcP2")},null,null);s.default=m.exports},ZcP2:function(e,s){}});
//# sourceMappingURL=28.319b7fd7855caccb0455.js.map