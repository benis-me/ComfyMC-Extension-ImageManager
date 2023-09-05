(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".image-manager-types{position:absolute;left:50%;transform:translate(-50%);pointer-events:all}.image-manager-image__item{width:calc((100% - 50px) / 6)}.image-manager-image__item img{width:100%;aspect-ratio:1;vertical-align:middle;user-select:none;-webkit-user-select:none}.image-manager-container{display:flex;flex-wrap:wrap;gap:10px;overflow-y:auto;height:100%;margin-top:10px}.image-manager-container::-webkit-scrollbar{width:12px;height:12px;background:transparent}.image-manager-container::-webkit-scrollbar-corner{width:0}.image-manager-container::-webkit-scrollbar-thumb{border-radius:8px;border:4px solid transparent;background-clip:content-box;background-color:#dbdbdb}.image-manager-dialog .t-dialog{padding:50px 20px 20px;width:85vw;height:85vh;box-shadow:0 10px 20px -5px #00000014}.image-manager-dialog .t-dialog__header{position:absolute;top:0;left:0;width:100%;pointer-events:none;user-select:none;-webkit-user-select:none}.image-manager-dialog .t-dialog__header-content{padding:15px 20px 20px;align-items:center;justify-content:space-between}.image-manager-dialog .t-dialog__body{position:relative;display:flex;flex-direction:column;padding:0;height:100%}.image-manager-dialog__header__close{cursor:pointer;pointer-events:all}.image-manager-dialog .image-manager-main{display:flex;align-items:center;justify-content:center;width:300px;height:300px}")),document.head.appendChild(e)}}catch(a){console.error("vite-plugin-css-injected-by-js",a)}})();
var I = Object.defineProperty;
var N = (n, e, t) => e in n ? I(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var a = (n, e, t) => (N(n, typeof e != "symbol" ? e + "" : e, t), t);
const E = location.origin;
function b(n) {
  return `${E}${n}`;
}
function D(n, e = {}) {
  return fetch(b(n), e);
}
async function M(n = "") {
  const e = n ? `/image-manager/get-images?search=${n}` : "/image-manager/get-images";
  return await (await D(e)).json();
}
const F = window.Vue.defineComponent, v = window.Vue.createTextVNode, d = window.Vue.unref, m = window.Vue.withCtx, h = window.Vue.createVNode, L = window.Vue.renderList, R = window.Vue.Fragment, _ = window.Vue.openBlock, $ = window.Vue.createElementBlock, j = window.Vue.toDisplayString, G = window.Vue.createBlock, O = { class: "image-manager-types" }, S = window.TDesign.RadioGroup, y = window.TDesign.RadioButton, U = /* @__PURE__ */ F({
  __name: "ImageTypes",
  props: {
    types: {}
  },
  emits: ["change"],
  setup(n, { emit: e }) {
    function t(o) {
      e("change", o);
    }
    return (o, c) => (_(), $("div", O, [
      h(d(S), {
        variant: "default-filled",
        "default-value": "all",
        onChange: t
      }, {
        default: m(() => [
          h(d(y), {
            value: "all",
            key: "all"
          }, {
            default: m(() => [
              v("全部")
            ]),
            _: 1
          }),
          (_(!0), $(R, null, L(o.types, (s, u) => (_(), G(d(y), {
            value: s,
            key: u
          }, {
            default: m(() => [
              v(j(s), 1)
            ]),
            _: 2
          }, 1032, ["value"]))), 128))
        ]),
        _: 1
      })
    ]));
  }
});
const P = window.Vue.defineComponent, q = window.Vue.createElementVNode, z = window.Vue.openBlock, H = window.Vue.createElementBlock, J = { class: "image-manager-image__item" }, K = ["src"], Q = window.Vue.computed, W = /* @__PURE__ */ P({
  __name: "ImageItem",
  props: {
    image: {}
  },
  setup(n) {
    const e = n, t = Q(
      () => `${E}/view?filename=${e.image.name}&subfolder=${e.image.subfolder === "." ? "" : e.image.subfolder}`
    );
    return (o, c) => (z(), H("div", J, [
      q("img", { src: t.value }, null, 8, K)
    ]));
  }
});
const X = window.Vue.defineComponent, Y = window.Vue.renderList, Z = window.Vue.Fragment, p = window.Vue.openBlock, B = window.Vue.createElementBlock, ee = window.Vue.createBlock, ne = { class: "image-manager-container" }, te = /* @__PURE__ */ X({
  __name: "ImageContainer",
  props: {
    images: {}
  },
  setup(n) {
    return (e, t) => (p(), B("div", ne, [
      (p(!0), B(Z, null, Y(e.images, (o, c) => (p(), ee(W, {
        image: o,
        key: c
      }, null, 8, ["image"]))), 128))
    ]));
  }
});
const oe = window.Vue.defineComponent, T = window.Vue.createElementVNode, g = window.Vue.createVNode, ae = window.Vue.createTextVNode, k = window.Vue.unref, w = window.Vue.withCtx, se = window.Vue.openBlock, ie = window.Vue.createBlock, ce = /* @__PURE__ */ T("div", { class: "image-manager-dialog__header__title" }, "图片管理器", -1), ue = { class: "image-manager-dialog__header__close" }, le = window.VueUse.useEventBus, x = window.Vue.computed, f = window.Vue.ref, C = window.Vue.onMounted, re = window.TDesign.Dialog, de = window.TDesign.Button, me = /* @__PURE__ */ oe({
  __name: "App",
  setup(n) {
    const e = f({}), t = x(() => Object.keys(e.value)), o = f("all"), c = x(
      () => o.value === "all" ? Object.values(e.value).flat() : e.value[o.value]
    );
    C(async () => {
      const l = (await M()).images.reduce((i, V) => {
        const [r] = V.name.split("_");
        return i[r] || (i[r] = []), i[r].push(V), i;
      }, {});
      e.value = l;
    });
    const s = f(!1);
    function u() {
      s.value = !1, setTimeout(() => {
        le("Extension::ImageManager::Close").emit();
      }, 300);
    }
    return C(() => {
      setTimeout(() => {
        s.value = !0;
      }, 100);
    }), (A, l) => (se(), ie(k(re), {
      class: "image-manager-dialog",
      attach: "body",
      mode: "modeless",
      draggable: !0,
      visible: s.value,
      placement: "center",
      "on-close": u,
      footer: !1,
      "close-btn": !1
    }, {
      header: w(() => [
        ce,
        g(U, {
          types: t.value,
          onChange: l[0] || (l[0] = (i) => o.value = i)
        }, null, 8, ["types"]),
        T("div", ue, [
          g(k(de), {
            theme: "default",
            onClick: u
          }, {
            default: w(() => [
              ae("关闭")
            ]),
            _: 1
          })
        ])
      ]),
      default: w(() => [
        g(te, { images: c.value }, null, 8, ["images"])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
});
const _e = window.Vue.createApp, pe = window.VueUse.useEventBus;
class we {
  constructor(e) {
    a(this, "id", "comfymc-image-manager");
    a(this, "name", "Image Manager");
    a(this, "version", "0.0.1");
    a(this, "description", "生成图片的管理器");
    a(this, "app");
    a(this, "extensionApp", null);
    this.app = e, pe("Extension::ImageManager::Close").on(() => {
      this.closeApp();
    });
  }
  async init() {
    this.app.addMenu({
      id: "image-manager",
      name: "图片管理器",
      icon: "ri-folder-image-line",
      onClick: () => {
        this.openApp();
      }
    });
  }
  openApp() {
    const e = document.getElementById("app");
    if (!e)
      return;
    const t = document.createElement("div");
    t.id = "image-manager", e.appendChild(t), this.extensionApp = _e(me), this.extensionApp.mount(t);
  }
  closeApp() {
    const e = document.getElementById("image-manager");
    e && (this.extensionApp && (this.extensionApp.unmount(), this.extensionApp = null), e.remove());
  }
}
export {
  we as default
};
