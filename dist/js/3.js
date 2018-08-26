webpackJsonp([3],{

/***/ 304:
/* no static exports found */
/* all exports used */
/*!*******************************!*\
  !*** ./src/pages/SysMsgs.vue ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !vue-style-loader!css-loader?sourceMap!../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-1bf3ea74","scoped":false,"hasInlineConfig":true}!../../~/vux-loader/src/after-less-loader.js!less-loader!../../~/vux-loader/src/style-loader.js!../../~/vue-loader/lib/selector?type=styles&index=0!./SysMsgs.vue */ 359)

var Component = __webpack_require__(/*! ../../~/vue-loader/lib/component-normalizer */ 2)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../~/vux-loader/src/script-loader.js!../../~/vue-loader/lib/selector?type=script&index=0!./SysMsgs.vue */ 340),
  /* template */
  __webpack_require__(/*! !../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-1bf3ea74"}!../../~/vux-loader/src/before-template-compiler-loader.js!../../~/vux-loader/src/template-loader.js!../../~/vue-loader/lib/selector?type=template&index=0!./SysMsgs.vue */ 352),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\IM\\NIM_Web_Demo_H5-master\\src\\pages\\SysMsgs.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] SysMsgs.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1bf3ea74", Component.options)
  } else {
    hotAPI.reload("data-v-1bf3ea74", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 340:
/* no static exports found */
/* all exports used */
/*!*******************************************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vux-loader/src/script-loader.js!./~/vue-loader/lib/selector.js?type=script&index=0!./src/pages/SysMsgs.vue ***!
  \*******************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _configs = __webpack_require__(/*! ../configs */ 3);

var _configs2 = _interopRequireDefault(_configs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mounted: function mounted() {
    this.$store.dispatch('markSysMsgRead');
    this.$store.dispatch('markCustomSysMsgRead');
  },
  updated: function updated() {
    this.$store.dispatch('markSysMsgRead');
    this.$store.dispatch('markCustomSysMsgRead');
  },
  data: function data() {
    return {
      sysType: 0,
      defaultAvatar: _configs2.default.defaultUserIcon,
      deleteIdServer: ''
    };
  },

  computed: {
    userInfos: function userInfos() {
      return this.$store.state.userInfos || {};
    },
    sysMsgs: function sysMsgs() {
      var _this = this;

      var sysMsgs = this.$store.state.sysMsgs.filter(function (msg) {
        switch (msg.type) {
          case 'addFriend':
            msg.showText = (msg.friend.alias || msg.friend.account) + ' \u6DFB\u52A0\u60A8\u4E3A\u597D\u53CB~';
            msg.avatar = _this.userInfos[msg.from] && _this.userInfos[msg.from].avatar;
            return true;
          case 'deleteFriend':
            msg.showText = msg.from + ' \u5C06\u60A8\u4ECE\u597D\u53CB\u4E2D\u5220\u9664';
            msg.avatar = _this.userInfos[msg.from].avatar;
            return false;
          case 'applyTeam':
            console.log('applyTeam', msg);
            msg.showText = msg.from;
            msg.avatar = _this.userInfos[msg.from] && _this.userInfos[msg.from].avatar || _this.defaultAvatar;
            msg.desc = '\u7533\u8BF7\u52A0\u5165\u7FA4:' + _this.getTeamName(msg.to);
            return true;
          case 'teamInvite':
            msg.showText = msg.attach.team.name;
            msg.avatar = _this.userInfos[msg.from] && _this.userInfos[msg.from].avatar || _this.defaultAvatar;
            msg.desc = '\u9080\u8BF7\u4F60\u52A0\u5165\u7FA4' + msg.to;
            return true;
          case 'rejectTeamApply':
            msg.showText = msg.attach.team.name;
            msg.desc = '管理员拒绝你加入本群';
            msg.avatar = msg.attach.team.avatar || _this.defaultAvatar;
            return true;
          case 'rejectTeamInvite':
            var op = _this.userInfos[msg.from];
            msg.showText = op.nick;
            msg.avatar = op.avatar || _this.defaultAvatar;
            msg.desc = op.nick + '\u62D2\u7EDD\u4E86\u7FA4' + _this.getTeamName(msg.to) + '\u7684\u5165\u7FA4\u9080\u8BF7';
            return true;
        }
        console.log(msg);
        return false;
      });
      sysMsgs.sort(function (msg1, msg2) {
        return msg2.time - msg1.time;
      });
      return sysMsgs;
    },
    customSysMsgs: function customSysMsgs() {
      var _this2 = this;

      var customSysMsgs = this.$store.state.customSysMsgs.filter(function (msg) {
        if (msg.scene === 'p2p') {
          var content = JSON.parse(msg.content);
          msg.showText = '' + content.content;
          msg.avatar = _this2.userInfos[msg.from].avatar;
          return msg;
        }
        return false;
      });
      return customSysMsgs;
    },
    msgList: function msgList() {
      return this.sysType === 0 ? this.sysMsgs : this.customSysMsgs;
    }
  },
  methods: {
    deleteMsg: function deleteMsg(idServer) {
      this.$store.commit('deleteSysMsgs', {
        type: this.sysType,
        idServer: idServer
      });
    },
    clearMsgs: function clearMsgs() {
      var that = this;
      this.$vux.confirm.show({
        title: '确认要清空消息吗？',
        onConfirm: function onConfirm() {
          that.$store.dispatch('resetSysMsgs', {
            type: that.sysType
          });
        }
      });
    },
    getTeamName: function getTeamName(teamId) {
      var team = this.$store.state.teamlist.find(function (team) {
        return team.teamId === teamId;
      });
      return team && team.name || '';
    },
    handleTeamApply: function handleTeamApply(msg, pass) {
      var action = void 0;
      switch (msg.type) {
        case 'applyTeam':
          action = pass ? 'passTeamApply' : 'rejectTeamApply';
          break;
        case 'teamInvite':
          action = pass ? 'acceptTeamInvite' : 'rejectTeamInvite';
          break;
        default:
          return;
      }
      this.$store.dispatch('delegateTeamFunction', {
        functionName: action,
        options: {
          idServer: msg.idServer,
          teamId: msg.to,
          from: msg.from,
          done: function done(error, obj) {
            console.log('handleDone', obj);
          }
        }
      });
    },
    findTeamInfo: function findTeamInfo(teamId) {
      var team = this.$store.state.teamlist.find(function (item) {
        return item.teamId === teamId;
      });
      return team && team.name || teamId;
    },
    showDelBtn: function showDelBtn(vNode) {
      var _this3 = this;

      if (vNode && vNode.data && vNode.data.attrs) {
        this.deleteIdServer = vNode.data.attrs.idServer;
        this.stopBubble = true;
        setTimeout(function () {
          _this3.stopBubble = false;
        }, 20);
      }
    },
    hideDelBtn: function hideDelBtn() {
      if (this.deleteIdServer !== null && !this.stopBubble) {
        this.deleteIdServer = null;
        return true;
      }
      return false;
    }
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 344:
/* no static exports found */
/* all exports used */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?sourceMap!./~/vue-loader/lib/style-compiler?{"id":"data-v-1bf3ea74","scoped":false,"hasInlineConfig":true}!./~/vux-loader/src/after-less-loader.js!./~/less-loader/lib/loader.js!./~/vux-loader/src/style-loader.js!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/pages/SysMsgs.vue ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../~/css-loader/lib/css-base.js */ 6)(true);
// imports


// module
exports.push([module.i, "\n.p-sysmsgs .u-list {\n  height: 100%;\n  overflow-y: scroll;\n}\n.p-sysmsgs p {\n  word-wrap: normal;\n  word-break: break-all;\n  color: #333;\n}\n.p-sysmsgs .g-teamSys {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 100;\n  -webkit-flex-grow: 100;\n     -moz-box-flex: 100;\n      -ms-flex-positive: 100;\n          flex-grow: 100;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n     -moz-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  overflow: hidden;\n}\n.p-sysmsgs .g-teamSys .m-info {\n  -webkit-flex-shrink: 1;\n      -ms-flex-negative: 1;\n          flex-shrink: 1;\n  overflow: hidden;\n}\n.p-sysmsgs .g-teamSys .m-info .u-time {\n  color: #aaa;\n}\n.p-sysmsgs .g-teamSys .m-info .u-desc {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: #aaa;\n  font-size: 1rem;\n}\n.p-sysmsgs .g-teamSys .m-options {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.p-sysmsgs .g-teamSys .m-options .weui-btn.weui-btn_mini {\n  padding: 0;\n  width: 3rem;\n  height: 2rem;\n}\n.p-sysmsgs .g-teamSys .m-options .weui-btn + .weui-btn {\n  margin-top: 0;\n  margin-left: 0.5rem;\n}\n.p-sysmsgs .u-msg-state {\n  color: #aaa;\n  font-size: .9rem;\n}\n.p-sysmsgs .empty-hint {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 5rem;\n  margin: auto;\n  text-align: center;\n}\n", "", {"version":3,"sources":["E:/IM/NIM_Web_Demo_H5-master/src/pages/SysMsgs.vue"],"names":[],"mappings":";AAAA;EACE,aAAa;EACb,mBAAmB;CACpB;AACD;EACE,kBAAkB;EAClB,sBAAsB;EACtB,YAAY;CACb;AACD;EACE,qBAAc;EAAd,sBAAc;EAAd,kBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,sBAAe;EAAf,uBAAe;KAAf,mBAAe;MAAf,uBAAe;UAAf,eAAe;EACf,0BAA+B;EAA/B,uCAA+B;KAA/B,uBAA+B;MAA/B,uBAA+B;UAA/B,+BAA+B;EAC/B,0BAAoB;EAApB,4BAAoB;KAApB,uBAAoB;MAApB,uBAAoB;UAApB,oBAAoB;EACpB,iBAAiB;CAClB;AACD;EACE,uBAAe;MAAf,qBAAe;UAAf,eAAe;EACf,iBAAiB;CAClB;AACD;EACE,YAAY;CACb;AACD;EACE,iBAAiB;EACjB,wBAAwB;EACxB,oBAAoB;EACpB,YAAY;EACZ,gBAAgB;CACjB;AACD;EACE,qBAAc;EAAd,sBAAc;EAAd,kBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,0BAAoB;EAApB,4BAAoB;KAApB,uBAAoB;MAApB,uBAAoB;UAApB,oBAAoB;CACrB;AACD;EACE,WAAW;EACX,YAAY;EACZ,aAAa;CACd;AACD;EACE,cAAc;EACd,oBAAoB;CACrB;AACD;EACE,YAAY;EACZ,iBAAiB;CAClB;AACD;EACE,mBAAmB;EACnB,QAAQ;EACR,SAAS;EACT,UAAU;EACV,aAAa;EACb,mBAAmB;CACpB","file":"SysMsgs.vue","sourcesContent":[".p-sysmsgs .u-list {\n  height: 100%;\n  overflow-y: scroll;\n}\n.p-sysmsgs p {\n  word-wrap: normal;\n  word-break: break-all;\n  color: #333;\n}\n.p-sysmsgs .g-teamSys {\n  display: flex;\n  flex-grow: 100;\n  justify-content: space-between;\n  align-items: center;\n  overflow: hidden;\n}\n.p-sysmsgs .g-teamSys .m-info {\n  flex-shrink: 1;\n  overflow: hidden;\n}\n.p-sysmsgs .g-teamSys .m-info .u-time {\n  color: #aaa;\n}\n.p-sysmsgs .g-teamSys .m-info .u-desc {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: #aaa;\n  font-size: 1rem;\n}\n.p-sysmsgs .g-teamSys .m-options {\n  display: flex;\n  align-items: center;\n}\n.p-sysmsgs .g-teamSys .m-options .weui-btn.weui-btn_mini {\n  padding: 0;\n  width: 3rem;\n  height: 2rem;\n}\n.p-sysmsgs .g-teamSys .m-options .weui-btn + .weui-btn {\n  margin-top: 0;\n  margin-left: 0.5rem;\n}\n.p-sysmsgs .u-msg-state {\n  color: #aaa;\n  font-size: .9rem;\n}\n.p-sysmsgs .empty-hint {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 5rem;\n  margin: auto;\n  text-align: center;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 352:
/* no static exports found */
/* all exports used */
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-1bf3ea74"}!./~/vux-loader/src/before-template-compiler-loader.js!./~/vux-loader/src/template-loader.js!./~/vue-loader/lib/selector.js?type=template&index=0!./src/pages/SysMsgs.vue ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "g-inherit m-article"
  }, [_c('x-header', {
    staticClass: "m-tab",
    attrs: {
      "left-options": {
        backText: ' '
      }
    }
  }, [_c('button-tab', {
    staticClass: "m-tab-top",
    model: {
      value: (_vm.sysType),
      callback: function($$v) {
        _vm.sysType = $$v
      },
      expression: "sysType"
    }
  }, [_c('button-tab-item', {
    staticClass: "u-tab-top"
  }, [_vm._v("系统消息")])], 1), _vm._v(" "), _c('a', {
    attrs: {
      "slot": "left"
    },
    slot: "left"
  }), _vm._v(" "), _c('a', {
    attrs: {
      "slot": "right"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.clearMsgs($event)
      }
    },
    slot: "right"
  }, [_vm._v("清空")])], 1), _vm._v(" "), _c('div', {
    staticClass: "m-article-main p-sysmsgs"
  }, [_c('group', {
    staticClass: "u-list"
  }, [_vm._l((_vm.msgList), function(msg) {
    return [(msg.type === "applyTeam" || msg.type === "teamInvite") ? _c('cell', {
      directives: [{
        name: "touch",
        rawName: "v-touch:swipeleft",
        value: (_vm.showDelBtn),
        expression: "showDelBtn",
        arg: "swipeleft"
      }, {
        name: "touch",
        rawName: "v-touch:swiperight",
        value: (_vm.hideDelBtn),
        expression: "hideDelBtn",
        arg: "swiperight"
      }],
      key: msg.idServer,
      staticClass: "u-list-item",
      attrs: {
        "idServer": msg.idServer
      }
    }, [_c('img', {
      staticClass: "icon",
      attrs: {
        "slot": "icon",
        "width": "24",
        "src": msg.avatar
      },
      slot: "icon"
    }), _vm._v(" "), _c('div', {
      staticClass: "g-teamSys",
      attrs: {
        "slot": "child"
      },
      slot: "child"
    }, [_c('div', {
      staticClass: "m-info"
    }, [_c('span', {
      staticClass: "u-name"
    }, [_vm._v(_vm._s(msg.from))]), _vm._v(" "), _c('span', {
      staticClass: "u-time"
    }, [_vm._v(_vm._s(msg.showTime))]), _vm._v(" "), _c('p', {
      staticClass: "u-desc"
    }, [_vm._v(_vm._s(msg.desc))]), _vm._v(" "), (msg.ps) ? _c('p', {
      staticClass: "u-desc"
    }, [_vm._v(_vm._s(("留言:" + (msg.ps))))]) : _vm._e()]), _vm._v(" "), (_vm.deleteIdServer !== msg.idServer) ? _c('div', {
      staticClass: "m-options",
      attrs: {
        "slot": "default"
      },
      slot: "default"
    }, [(msg.state === "init") ? [_c('x-button', {
      attrs: {
        "type": "primary",
        "mini": true,
        "action-type": "button"
      },
      nativeOn: {
        "click": function($event) {
          _vm.handleTeamApply(msg, true)
        }
      }
    }, [_vm._v("同意")]), _vm._v(" "), _c('x-button', {
      attrs: {
        "type": "warn",
        "mini": true,
        "action-type": "button"
      },
      nativeOn: {
        "click": function($event) {
          _vm.handleTeamApply(msg, false)
        }
      }
    }, [_vm._v("拒绝")])] : _c('div', {
      staticClass: "u-msg-state"
    }, [_vm._v("\n                " + _vm._s(msg.state === 'error' ? '已过期' : msg.state === 'rejected' ? '已拒绝' : '已同意') + "\n              ")])], 2) : _vm._e()]), _vm._v(" "), _c('span', {
      staticClass: "u-tag-del",
      class: {
        active: _vm.deleteIdServer === msg.idServer
      },
      on: {
        "click": function($event) {
          _vm.deleteMsg(msg.idServer)
        }
      }
    })]) : _c('cell', {
      directives: [{
        name: "touch",
        rawName: "v-touch:swipeleft",
        value: (_vm.showDelBtn),
        expression: "showDelBtn",
        arg: "swipeleft"
      }, {
        name: "touch",
        rawName: "v-touch:swiperight",
        value: (_vm.hideDelBtn),
        expression: "hideDelBtn",
        arg: "swiperight"
      }],
      key: msg.idServer,
      staticClass: "u-list-item",
      attrs: {
        "title": msg.showText,
        "value": msg.showTime,
        "inline-desc": msg.desc,
        "idServer": msg.idServer
      }
    }, [_c('img', {
      staticClass: "icon",
      attrs: {
        "slot": "icon",
        "width": "24",
        "src": msg.avatar
      },
      slot: "icon"
    }), _vm._v(" "), _c('span', {
      staticClass: "u-tag-del",
      class: {
        active: _vm.deleteIdServer === msg.idServer
      },
      on: {
        "click": function($event) {
          _vm.deleteMsg(msg.idServer)
        }
      }
    })])]
  })], 2), _vm._v(" "), (!_vm.msgList || _vm.msgList.length < 1) ? _c('div', {
    staticClass: "empty-hint"
  }, [_vm._v("暂无任何消息")]) : _vm._e()], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1bf3ea74", module.exports)
  }
}

/***/ }),

/***/ 359:
/* no static exports found */
/* all exports used */
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-style-loader!./~/css-loader?sourceMap!./~/vue-loader/lib/style-compiler?{"id":"data-v-1bf3ea74","scoped":false,"hasInlineConfig":true}!./~/vux-loader/src/after-less-loader.js!./~/less-loader/lib/loader.js!./~/vux-loader/src/style-loader.js!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/pages/SysMsgs.vue ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../~/css-loader?sourceMap!../../~/vue-loader/lib/style-compiler?{"id":"data-v-1bf3ea74","scoped":false,"hasInlineConfig":true}!../../~/vux-loader/src/after-less-loader.js!../../~/less-loader/lib/loader.js!../../~/vux-loader/src/style-loader.js!../../~/vue-loader/lib/selector.js?type=styles&index=0!./SysMsgs.vue */ 344);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(/*! ../../~/vue-style-loader/lib/addStylesClient.js */ 7)("667705bd", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-1bf3ea74\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/vux-loader/src/after-less-loader.js!../../node_modules/less-loader/lib/loader.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SysMsgs.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-1bf3ea74\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/vux-loader/src/after-less-loader.js!../../node_modules/less-loader/lib/loader.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SysMsgs.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

});
//# sourceMappingURL=3.js.map