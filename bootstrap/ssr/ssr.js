import { ref, computed, onMounted, onBeforeUnmount, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, createTextVNode, toDisplayString, useSSRContext, Fragment, renderList, createCommentVNode, withModifiers, withDirectives, vModelText, vModelSelect, vModelCheckbox, withKeys, onUnmounted, vShow, Teleport, createSSRApp, h as h$1 } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderAttr, ssrRenderSlot, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderTeleport, ssrRenderStyle } from "vue/server-renderer";
import { usePage, Link, Head, useForm, router, createInertiaApp } from "@inertiajs/vue3";
import { LayoutDashboard, Sparkles, Users, BarChart3, Wallet, CreditCard, X, UserCog, Shield, Settings2, LogOut, ChevronUp, ChevronDown, Menu, Sun, Moon, Bell, ArrowLeft, Undo2, CheckCircle, Clock, Share2, Check, Copy, TrendingUp, ArrowRight, XCircle, Upload, FileImage, ArrowUp, Infinity as Infinity$1, ReceiptText, Download, Search, BookmarkIcon, ArrowDownToLine, Puzzle, ChevronRight, Bookmark, Calendar, MapPin, Monitor, Headphones, Star, Trash2, Loader, Phone, Lock, Mail, Globe, Play, Loader2, AlertCircle, Terminal, Plus, Eye, Tag, Repeat, MessageSquare, Filter, MousePointerClick, Zap, Smartphone, Tablet, BellOff, Camera, User, LogIn, AlertTriangle } from "lucide-vue-next";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
const _sfc_main$D = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const sidebarOpen = ref(false);
    const userMenuOpen = ref(false);
    const userMenuRef = ref(null);
    const isDark = ref(
      localStorage.getItem("theme") === "dark" || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    if (isDark.value) document.documentElement.classList.add("dark");
    const user = computed(() => page.props.auth.user);
    const subscription = computed(() => page.props.auth.subscription);
    const userInitials = computed(() => {
      var _a;
      const parts = (((_a = user.value) == null ? void 0 : _a.name) || "").split(" ").filter(Boolean);
      return parts.map((p2) => p2[0].toUpperCase()).slice(0, 2).join("") || "?";
    });
    const nav = [
      { name: "Dashboard", href: route("dashboard"), icon: LayoutDashboard, current: () => route().current("dashboard") },
      { name: "Lead Generator", href: route("leads.search.create"), icon: Sparkles, current: () => route().current("leads.search.*") || route().current("leads.generator*") || route().current("leads.searches.*") },
      { name: "My Leads", href: route("leads.index"), icon: Users, current: () => route().current("leads.index") || route().current("leads.show") },
      { name: "Saved Searches", href: route("leads.saved.index"), icon: BarChart3, current: () => route().current("leads.saved.*") },
      { name: "Exports", href: route("leads.exports.index"), icon: Wallet, current: () => route().current("leads.exports.*") },
      { name: "Affiliate", href: route("affiliate.index"), icon: Wallet, current: () => route().current("affiliate.*") },
      { name: "Billing", href: route("billing.index"), icon: CreditCard, current: () => route().current("billing.*") }
    ];
    const onClickOutside = (e2) => {
      if (userMenuRef.value && !userMenuRef.value.contains(e2.target)) {
        userMenuOpen.value = false;
      }
    };
    onMounted(() => document.addEventListener("mousedown", onClickOutside));
    onBeforeUnmount(() => document.removeEventListener("mousedown", onClickOutside));
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-surface-50 dark:bg-surface-950" }, _attrs))}>`);
      if (sidebarOpen.value) {
        _push(`<div class="fixed inset-0 z-40 bg-black/50 lg:hidden"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 transition-transform lg:translate-x-0 flex flex-col",
        sidebarOpen.value ? "translate-x-0" : "-translate-x-full"
      ])}"><div class="flex h-16 items-center justify-between px-6 border-b border-surface-200 dark:border-surface-800 flex-shrink-0">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-9 w-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold"${_scopeId}>C</div><span class="font-bold text-surface-900 dark:text-surface-50"${_scopeId}>CustomerNearMe</span>`);
          } else {
            return [
              createVNode("div", { class: "h-9 w-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold" }, "C"),
              createVNode("span", { class: "font-bold text-surface-900 dark:text-surface-50" }, "CustomerNearMe")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="lg:hidden">`);
      _push(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent));
      _push(`</button></div><nav class="flex-1 overflow-y-auto p-4 space-y-1"><!--[-->`);
      ssrRenderList(nav, (item) => {
        _push(ssrRenderComponent(unref(Link), {
          key: item.name,
          href: item.href,
          class: [
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
            item.current() ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400" : "text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
          ]
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), { class: "h-5 w-5 flex-shrink-0" }, null), _parent2, _scopeId);
              _push2(` ${ssrInterpolate(item.name)}`);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "h-5 w-5 flex-shrink-0" })),
                createTextVNode(" " + toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav>`);
      if ((_a = subscription.value) == null ? void 0 : _a.is_trial) {
        _push(`<div class="mx-4 mb-3 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 flex-shrink-0"><p class="text-xs font-semibold text-primary-700 dark:text-primary-300"> Trial: ${ssrInterpolate(subscription.value.days_remaining)} days left </p>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("billing.index"),
          class: "mt-2 block text-center text-xs btn-primary"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Upgrade Plan `);
            } else {
              return [
                createTextVNode(" Upgrade Plan ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="border-t border-surface-200 dark:border-surface-800 flex-shrink-0 relative">`);
      if (userMenuOpen.value) {
        _push(`<div class="absolute bottom-full left-3 right-3 mb-2 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 shadow-xl overflow-hidden"><div class="px-4 py-3 border-b border-surface-100 dark:border-surface-800"><div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0"></span><span class="text-sm font-semibold text-surface-900 dark:text-white">Online</span></div>`);
        if ((_b = user.value) == null ? void 0 : _b.last_login_at) {
          _push(`<p class="text-xs text-surface-500 mt-0.5 pl-4"> Last active: ${ssrInterpolate(user.value.last_login_at)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="py-2">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("profile.edit"),
          onClick: ($event) => userMenuOpen.value = false,
          class: "flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(UserCog), { class: "h-5 w-5 text-surface-400" }, null, _parent2, _scopeId));
              _push2(` Edit Profile `);
            } else {
              return [
                createVNode(unref(UserCog), { class: "h-5 w-5 text-surface-400" }),
                createTextVNode(" Edit Profile ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("profile.edit"),
          onClick: ($event) => userMenuOpen.value = false,
          class: "flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Shield), { class: "h-5 w-5 text-surface-400" }, null, _parent2, _scopeId));
              _push2(` Security Settings `);
            } else {
              return [
                createVNode(unref(Shield), { class: "h-5 w-5 text-surface-400" }),
                createTextVNode(" Security Settings ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("profile.edit"),
          onClick: ($event) => userMenuOpen.value = false,
          class: "flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Settings2), { class: "h-5 w-5 text-surface-400" }, null, _parent2, _scopeId));
              _push2(` Preferences `);
            } else {
              return [
                createVNode(unref(Settings2), { class: "h-5 w-5 text-surface-400" }),
                createTextVNode(" Preferences ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="px-3 pb-3 grid grid-cols-2 gap-2"><div class="rounded-xl bg-blue-50 dark:bg-blue-900/20 px-3 py-2.5 text-center"><p class="text-lg font-bold text-blue-600 dark:text-blue-400 leading-none">${ssrInterpolate(((_c = user.value) == null ? void 0 : _c.leads_count) ?? 0)}</p><p class="text-xs text-surface-500 mt-0.5">Leads</p></div><div class="rounded-xl bg-green-50 dark:bg-green-900/20 px-3 py-2.5 text-center"><p class="text-lg font-bold text-green-600 dark:text-green-400 leading-none">${ssrInterpolate(((_d = user.value) == null ? void 0 : _d.devices_count) ?? 0)}</p><p class="text-xs text-surface-500 mt-0.5">Devices</p></div></div><div class="border-t border-surface-100 dark:border-surface-800 px-3 py-2"><button class="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">`);
        _push(ssrRenderComponent(unref(LogOut), { class: "h-5 w-5" }, null, _parent));
        _push(` Sign Out </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors"><div class="relative flex-shrink-0"><div class="h-9 w-9 rounded-full overflow-hidden bg-primary-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">`);
      if ((_e = user.value) == null ? void 0 : _e.avatar_url) {
        _push(`<img${ssrRenderAttr("src", user.value.avatar_url)} class="w-full h-full object-cover"${ssrRenderAttr("alt", user.value.name)}>`);
      } else {
        _push(`<span>${ssrInterpolate(userInitials.value)}</span>`);
      }
      _push(`</div><span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-surface-900"></span></div><div class="flex-1 text-left min-w-0"><p class="text-sm font-semibold text-surface-900 dark:text-white truncate leading-tight">${ssrInterpolate((_f = user.value) == null ? void 0 : _f.name)}</p><p class="text-xs text-surface-400 truncate">${ssrInterpolate((_h = (_g = user.value) == null ? void 0 : _g.email) == null ? void 0 : _h.replace(/(.{12}).*(@.*)/, "$1...$2"))}</p></div><div class="flex items-center gap-1 flex-shrink-0"><span class="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"><svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></span>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(userMenuOpen.value ? unref(ChevronUp) : unref(ChevronDown)), { class: "h-4 w-4 text-surface-400" }, null), _parent);
      _push(`</div></button></div></aside><div class="lg:pl-64"><header class="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-surface-200 dark:border-surface-800 bg-white/80 dark:bg-surface-900/80 backdrop-blur px-4 lg:px-6"><button class="lg:hidden">`);
      _push(ssrRenderComponent(unref(Menu), { class: "h-6 w-6" }, null, _parent));
      _push(`</button><div class="flex-1"></div><div class="flex items-center gap-2"><button class="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">`);
      if (isDark.value) {
        _push(ssrRenderComponent(unref(Sun), { class: "h-5 w-5 text-surface-600 dark:text-surface-300" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Moon), { class: "h-5 w-5 text-surface-600" }, null, _parent));
      }
      _push(`</button>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("notifications.index"),
        class: "p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 relative transition-colors"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Bell), { class: "h-5 w-5 text-surface-600 dark:text-surface-300" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Bell), { class: "h-5 w-5 text-surface-600 dark:text-surface-300" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></header><main class="p-4 lg:p-8">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
};
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const _sfc_main$C = {
  __name: "Commissions",
  __ssrInlineRender: true,
  props: { commissions: Object },
  setup(__props) {
    const fmtDate = (d2) => new Date(d2).toLocaleDateString();
    const statusBadge = (s2) => ({
      pending: { class: "bg-orange-50 text-orange-700", icon: Clock, label: "On hold" },
      approved: { class: "bg-primary-50 text-primary-700", icon: CheckCircle, label: "Available" },
      paid: { class: "bg-accent-50 text-accent-700", icon: Wallet, label: "Paid" },
      reversed: { class: "bg-red-50 text-red-700", icon: Undo2, label: "Reversed" }
    })[s2] || { class: "bg-surface-100", icon: Clock, label: s2 };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Commissions" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-5xl mx-auto space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("affiliate.index"),
              class: "text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Back to affiliate `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                    createTextVNode(" Back to affiliate ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}>Commission history</h1><p class="mt-1 text-sm text-surface-500"${_scopeId}>Every commission you&#39;ve earned, with status.</p></div><div class="card overflow-hidden"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead class="bg-surface-50 dark:bg-surface-800/50 text-left"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 font-semibold"${_scopeId}>Date</th><th class="px-4 py-3 font-semibold"${_scopeId}>Referred user</th><th class="px-4 py-3 font-semibold"${_scopeId}>Rate</th><th class="px-4 py-3 font-semibold"${_scopeId}>Amount</th><th class="px-4 py-3 font-semibold"${_scopeId}>Status</th><th class="px-4 py-3 font-semibold"${_scopeId}>Available on</th></tr></thead><tbody class="divide-y divide-surface-200 dark:divide-surface-800"${_scopeId}><!--[-->`);
            ssrRenderList(__props.commissions.data, (c2) => {
              _push2(`<tr${_scopeId}><td class="px-4 py-3 text-surface-500"${_scopeId}>${ssrInterpolate(fmtDate(c2.created_at))}</td><td class="px-4 py-3 font-mono text-xs"${_scopeId}>${ssrInterpolate(c2.referred_email)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(c2.rate)}%</td><td class="px-4 py-3 font-medium"${_scopeId}>${ssrInterpolate(c2.currency)} ${ssrInterpolate(Number(c2.amount).toLocaleString())}</td><td class="px-4 py-3"${_scopeId}><span class="${ssrRenderClass(["badge inline-flex items-center gap-1 text-xs", statusBadge(c2.status).class])}"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(statusBadge(c2.status).icon), { class: "h-3 w-3" }, null), _parent2, _scopeId);
              _push2(` ${ssrInterpolate(statusBadge(c2.status).label)}</span></td><td class="px-4 py-3 text-xs text-surface-500"${_scopeId}>${ssrInterpolate(c2.status === "pending" && c2.hold_until ? fmtDate(c2.hold_until) : "—")}</td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.commissions.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="px-4 py-12 text-center text-surface-500"${_scopeId}>No commissions yet.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.commissions.last_page > 1) {
              _push2(`<div class="flex items-center justify-between text-sm"${_scopeId}><p class="text-surface-500"${_scopeId}>Showing ${ssrInterpolate(__props.commissions.from)}–${ssrInterpolate(__props.commissions.to)} of ${ssrInterpolate(__props.commissions.total)}</p><div class="flex gap-1"${_scopeId}><!--[-->`);
              ssrRenderList(__props.commissions.links, (link) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: link.label,
                  href: link.url ?? "#",
                  class: [
                    "px-3 py-1 rounded border text-sm",
                    link.active ? "bg-primary-600 text-white border-primary-600" : link.url ? "border-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800" : "border-surface-100 text-surface-300 cursor-not-allowed"
                  ],
                  "preserve-scroll": true
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-5xl mx-auto space-y-6" }, [
                createVNode(unref(Link), {
                  href: _ctx.route("affiliate.index"),
                  class: "text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                    createTextVNode(" Back to affiliate ")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("div", null, [
                  createVNode("h1", { class: "text-2xl font-bold" }, "Commission history"),
                  createVNode("p", { class: "mt-1 text-sm text-surface-500" }, "Every commission you've earned, with status.")
                ]),
                createVNode("div", { class: "card overflow-hidden" }, [
                  createVNode("table", { class: "w-full text-sm" }, [
                    createVNode("thead", { class: "bg-surface-50 dark:bg-surface-800/50 text-left" }, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Date"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Referred user"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Rate"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Amount"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Status"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Available on")
                      ])
                    ]),
                    createVNode("tbody", { class: "divide-y divide-surface-200 dark:divide-surface-800" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.commissions.data, (c2) => {
                        return openBlock(), createBlock("tr", {
                          key: c2.id
                        }, [
                          createVNode("td", { class: "px-4 py-3 text-surface-500" }, toDisplayString(fmtDate(c2.created_at)), 1),
                          createVNode("td", { class: "px-4 py-3 font-mono text-xs" }, toDisplayString(c2.referred_email), 1),
                          createVNode("td", { class: "px-4 py-3" }, toDisplayString(c2.rate) + "%", 1),
                          createVNode("td", { class: "px-4 py-3 font-medium" }, toDisplayString(c2.currency) + " " + toDisplayString(Number(c2.amount).toLocaleString()), 1),
                          createVNode("td", { class: "px-4 py-3" }, [
                            createVNode("span", {
                              class: ["badge inline-flex items-center gap-1 text-xs", statusBadge(c2.status).class]
                            }, [
                              (openBlock(), createBlock(resolveDynamicComponent(statusBadge(c2.status).icon), { class: "h-3 w-3" })),
                              createTextVNode(" " + toDisplayString(statusBadge(c2.status).label), 1)
                            ], 2)
                          ]),
                          createVNode("td", { class: "px-4 py-3 text-xs text-surface-500" }, toDisplayString(c2.status === "pending" && c2.hold_until ? fmtDate(c2.hold_until) : "—"), 1)
                        ]);
                      }), 128)),
                      __props.commissions.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "6",
                          class: "px-4 py-12 text-center text-surface-500"
                        }, "No commissions yet.")
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                __props.commissions.last_page > 1 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex items-center justify-between text-sm"
                }, [
                  createVNode("p", { class: "text-surface-500" }, "Showing " + toDisplayString(__props.commissions.from) + "–" + toDisplayString(__props.commissions.to) + " of " + toDisplayString(__props.commissions.total), 1),
                  createVNode("div", { class: "flex gap-1" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.commissions.links, (link) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: link.label,
                        href: link.url ?? "#",
                        class: [
                          "px-3 py-1 rounded border text-sm",
                          link.active ? "bg-primary-600 text-white border-primary-600" : link.url ? "border-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800" : "border-surface-100 text-surface-300 cursor-not-allowed"
                        ],
                        innerHTML: link.label,
                        "preserve-scroll": true
                      }, null, 8, ["href", "class", "innerHTML"]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Affiliate/Commissions.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$C
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$B = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    stats: Object,
    timeline: Array,
    referral_code: String,
    referral_link: String,
    recent_referrals: Array
  },
  setup(__props) {
    const props = __props;
    const copied = ref(false);
    const copy = (text) => {
      navigator.clipboard.writeText(text);
      copied.value = true;
      setTimeout(() => copied.value = false, 2e3);
    };
    const fmtMoney = (amt) => `${props.stats.currency} ${Number(amt).toLocaleString(void 0, { maximumFractionDigits: 0 })}`;
    const fmtDate = (d2) => new Date(d2).toLocaleDateString();
    const maxAmount = computed(() => Math.max(...props.timeline.map((t3) => t3.amount), 1));
    const sparklinePath = computed(() => {
      if (!props.timeline.length) return "";
      const w2 = 600, h2 = 60;
      const stepX = w2 / Math.max(props.timeline.length - 1, 1);
      return props.timeline.map((t3, i2) => {
        const x2 = i2 * stepX;
        const y2 = h2 - t3.amount / maxAmount.value * h2;
        return `${i2 === 0 ? "M" : "L"} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
      }).join(" ");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Affiliate" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full space-y-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}>Affiliate Program</h1><p class="mt-1 text-sm text-surface-500"${_scopeId}> Earn ${ssrInterpolate(__props.stats.commission_percent)}% on first payments + ${ssrInterpolate(__props.stats.recurring_percent)}% on every renewal. </p></div><div class="card p-6 bg-gradient-to-br from-primary-600 to-primary-800 text-white"${_scopeId}><div class="flex items-center gap-2 text-primary-100"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Share2), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(`<span class="text-xs font-semibold uppercase tracking-wide"${_scopeId}>Your referral link</span></div><div class="mt-3 flex items-center gap-2"${_scopeId}><code class="flex-1 px-3 py-2 rounded-lg bg-white/15 font-mono text-sm break-all"${_scopeId}>${ssrInterpolate(__props.referral_link)}</code><button class="px-4 py-2 rounded-lg bg-white text-primary-700 font-medium text-sm hover:bg-primary-50 inline-flex items-center gap-2"${_scopeId}>`);
            if (copied.value) {
              _push2(ssrRenderComponent(unref(Check), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Copy), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            }
            _push2(` ${ssrInterpolate(copied.value ? "Copied!" : "Copy")}</button></div><p class="mt-3 text-xs text-primary-100"${_scopeId}> Code: <span class="font-mono font-semibold"${_scopeId}>${ssrInterpolate(__props.referral_code)}</span> · Cookie window: 90 days </p></div><div class="grid grid-cols-2 lg:grid-cols-4 gap-4"${_scopeId}><div class="card p-5"${_scopeId}><div class="flex items-center gap-2 text-surface-500 text-xs"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Wallet), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Available </div><p class="mt-2 text-2xl font-bold"${_scopeId}>${ssrInterpolate(fmtMoney(__props.stats.available))}</p><p class="text-xs text-surface-500 mt-1"${_scopeId}>Ready to withdraw</p></div><div class="card p-5"${_scopeId}><div class="flex items-center gap-2 text-surface-500 text-xs"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(TrendingUp), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Total earned </div><p class="mt-2 text-2xl font-bold"${_scopeId}>${ssrInterpolate(fmtMoney(__props.stats.total_earned))}</p><p class="text-xs text-surface-500 mt-1"${_scopeId}>All time</p></div><div class="card p-5"${_scopeId}><div class="flex items-center gap-2 text-surface-500 text-xs"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Wallet), { class: "h-4 w-4 text-orange-500" }, null, _parent2, _scopeId));
            _push2(` Pending </div><p class="mt-2 text-2xl font-bold"${_scopeId}>${ssrInterpolate(fmtMoney(__props.stats.pending))}</p><p class="text-xs text-surface-500 mt-1"${_scopeId}>In hold period</p></div><div class="card p-5"${_scopeId}><div class="flex items-center gap-2 text-surface-500 text-xs"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Users), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Referrals </div><p class="mt-2 text-2xl font-bold"${_scopeId}>${ssrInterpolate(__props.stats.total_referrals)}</p><p class="text-xs text-surface-500 mt-1"${_scopeId}>${ssrInterpolate(__props.stats.conversion_rate)}% converted</p></div></div><div class="card p-6"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h2 class="font-semibold"${_scopeId}>Earnings — last 30 days</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("affiliate.commissions.index"),
              class: "text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` View all commissions `);
                  _push3(ssrRenderComponent(unref(ArrowRight), { class: "h-3.5 w-3.5" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" View all commissions "),
                    createVNode(unref(ArrowRight), { class: "h-3.5 w-3.5" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="relative h-24"${_scopeId}><svg viewBox="0 0 600 60" preserveAspectRatio="none" class="w-full h-full"${_scopeId}><defs${_scopeId}><linearGradient id="grad" x1="0" y1="0" x2="0" y2="1"${_scopeId}><stop offset="0%" stop-color="#3B82F6" stop-opacity="0.3"${_scopeId}></stop><stop offset="100%" stop-color="#3B82F6" stop-opacity="0"${_scopeId}></stop></linearGradient></defs><path${ssrRenderAttr("d", `${sparklinePath.value} L 600 60 L 0 60 Z`)} fill="url(#grad)"${_scopeId}></path><path${ssrRenderAttr("d", sparklinePath.value)} stroke="#2563EB" stroke-width="2" fill="none" vector-effect="non-scaling-stroke"${_scopeId}></path></svg></div></div><div class="grid md:grid-cols-3 gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("affiliate.withdrawals.index"),
              class: "card p-6 hover:border-primary-500 transition border-2 border-transparent"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Wallet), { class: "h-6 w-6 text-primary-600" }, null, _parent3, _scopeId2));
                  _push3(`<h3 class="mt-3 font-semibold"${_scopeId2}>Withdraw earnings</h3><p class="mt-1 text-sm text-surface-500"${_scopeId2}> Min ${ssrInterpolate(fmtMoney(__props.stats.min_withdrawal))} · Bank, JazzCash, EasyPaisa </p>`);
                } else {
                  return [
                    createVNode(unref(Wallet), { class: "h-6 w-6 text-primary-600" }),
                    createVNode("h3", { class: "mt-3 font-semibold" }, "Withdraw earnings"),
                    createVNode("p", { class: "mt-1 text-sm text-surface-500" }, " Min " + toDisplayString(fmtMoney(__props.stats.min_withdrawal)) + " · Bank, JazzCash, EasyPaisa ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("affiliate.referrals.index"),
              class: "card p-6 hover:border-primary-500 transition border-2 border-transparent"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Users), { class: "h-6 w-6 text-accent-600" }, null, _parent3, _scopeId2));
                  _push3(`<h3 class="mt-3 font-semibold"${_scopeId2}>View referrals</h3><p class="mt-1 text-sm text-surface-500"${_scopeId2}>${ssrInterpolate(__props.stats.total_referrals)} signups · ${ssrInterpolate(__props.stats.converted_referrals)} paying</p>`);
                } else {
                  return [
                    createVNode(unref(Users), { class: "h-6 w-6 text-accent-600" }),
                    createVNode("h3", { class: "mt-3 font-semibold" }, "View referrals"),
                    createVNode("p", { class: "mt-1 text-sm text-surface-500" }, toDisplayString(__props.stats.total_referrals) + " signups · " + toDisplayString(__props.stats.converted_referrals) + " paying", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("affiliate.commissions.index"),
              class: "card p-6 hover:border-primary-500 transition border-2 border-transparent"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TrendingUp), { class: "h-6 w-6 text-orange-600" }, null, _parent3, _scopeId2));
                  _push3(`<h3 class="mt-3 font-semibold"${_scopeId2}>Commission history</h3><p class="mt-1 text-sm text-surface-500"${_scopeId2}>Track every commission earned</p>`);
                } else {
                  return [
                    createVNode(unref(TrendingUp), { class: "h-6 w-6 text-orange-600" }),
                    createVNode("h3", { class: "mt-3 font-semibold" }, "Commission history"),
                    createVNode("p", { class: "mt-1 text-sm text-surface-500" }, "Track every commission earned")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="card overflow-hidden"${_scopeId}><div class="px-6 py-4 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between"${_scopeId}><h2 class="font-semibold"${_scopeId}>Recent referrals</h2></div><table class="w-full text-sm"${_scopeId}><thead class="bg-surface-50 dark:bg-surface-800/50 text-left"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 font-semibold"${_scopeId}>Name</th><th class="px-4 py-3 font-semibold"${_scopeId}>Email</th><th class="px-4 py-3 font-semibold"${_scopeId}>Joined</th><th class="px-4 py-3 font-semibold"${_scopeId}>Status</th></tr></thead><tbody class="divide-y divide-surface-200 dark:divide-surface-800"${_scopeId}><!--[-->`);
            ssrRenderList(__props.recent_referrals, (r2) => {
              _push2(`<tr${_scopeId}><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(r2.name)}</td><td class="px-4 py-3 text-surface-500 font-mono text-xs"${_scopeId}>${ssrInterpolate(r2.email)}</td><td class="px-4 py-3 text-surface-500"${_scopeId}>${ssrInterpolate(fmtDate(r2.created_at))}</td><td class="px-4 py-3"${_scopeId}>`);
              if (r2.is_paying) {
                _push2(`<span class="badge bg-accent-50 text-accent-700"${_scopeId}>Paying</span>`);
              } else {
                _push2(`<span class="badge bg-surface-100 text-surface-500"${_scopeId}>Trial</span>`);
              }
              _push2(`</td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.recent_referrals.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="4" class="px-4 py-12 text-center text-surface-500 text-sm"${_scopeId}> No referrals yet. Share your link to start earning! </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full space-y-6" }, [
                createVNode("div", null, [
                  createVNode("h1", { class: "text-2xl font-bold" }, "Affiliate Program"),
                  createVNode("p", { class: "mt-1 text-sm text-surface-500" }, " Earn " + toDisplayString(__props.stats.commission_percent) + "% on first payments + " + toDisplayString(__props.stats.recurring_percent) + "% on every renewal. ", 1)
                ]),
                createVNode("div", { class: "card p-6 bg-gradient-to-br from-primary-600 to-primary-800 text-white" }, [
                  createVNode("div", { class: "flex items-center gap-2 text-primary-100" }, [
                    createVNode(unref(Share2), { class: "h-4 w-4" }),
                    createVNode("span", { class: "text-xs font-semibold uppercase tracking-wide" }, "Your referral link")
                  ]),
                  createVNode("div", { class: "mt-3 flex items-center gap-2" }, [
                    createVNode("code", { class: "flex-1 px-3 py-2 rounded-lg bg-white/15 font-mono text-sm break-all" }, toDisplayString(__props.referral_link), 1),
                    createVNode("button", {
                      onClick: ($event) => copy(__props.referral_link),
                      class: "px-4 py-2 rounded-lg bg-white text-primary-700 font-medium text-sm hover:bg-primary-50 inline-flex items-center gap-2"
                    }, [
                      copied.value ? (openBlock(), createBlock(unref(Check), {
                        key: 0,
                        class: "h-4 w-4"
                      })) : (openBlock(), createBlock(unref(Copy), {
                        key: 1,
                        class: "h-4 w-4"
                      })),
                      createTextVNode(" " + toDisplayString(copied.value ? "Copied!" : "Copy"), 1)
                    ], 8, ["onClick"])
                  ]),
                  createVNode("p", { class: "mt-3 text-xs text-primary-100" }, [
                    createTextVNode(" Code: "),
                    createVNode("span", { class: "font-mono font-semibold" }, toDisplayString(__props.referral_code), 1),
                    createTextVNode(" · Cookie window: 90 days ")
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-2 lg:grid-cols-4 gap-4" }, [
                  createVNode("div", { class: "card p-5" }, [
                    createVNode("div", { class: "flex items-center gap-2 text-surface-500 text-xs" }, [
                      createVNode(unref(Wallet), { class: "h-4 w-4" }),
                      createTextVNode(" Available ")
                    ]),
                    createVNode("p", { class: "mt-2 text-2xl font-bold" }, toDisplayString(fmtMoney(__props.stats.available)), 1),
                    createVNode("p", { class: "text-xs text-surface-500 mt-1" }, "Ready to withdraw")
                  ]),
                  createVNode("div", { class: "card p-5" }, [
                    createVNode("div", { class: "flex items-center gap-2 text-surface-500 text-xs" }, [
                      createVNode(unref(TrendingUp), { class: "h-4 w-4" }),
                      createTextVNode(" Total earned ")
                    ]),
                    createVNode("p", { class: "mt-2 text-2xl font-bold" }, toDisplayString(fmtMoney(__props.stats.total_earned)), 1),
                    createVNode("p", { class: "text-xs text-surface-500 mt-1" }, "All time")
                  ]),
                  createVNode("div", { class: "card p-5" }, [
                    createVNode("div", { class: "flex items-center gap-2 text-surface-500 text-xs" }, [
                      createVNode(unref(Wallet), { class: "h-4 w-4 text-orange-500" }),
                      createTextVNode(" Pending ")
                    ]),
                    createVNode("p", { class: "mt-2 text-2xl font-bold" }, toDisplayString(fmtMoney(__props.stats.pending)), 1),
                    createVNode("p", { class: "text-xs text-surface-500 mt-1" }, "In hold period")
                  ]),
                  createVNode("div", { class: "card p-5" }, [
                    createVNode("div", { class: "flex items-center gap-2 text-surface-500 text-xs" }, [
                      createVNode(unref(Users), { class: "h-4 w-4" }),
                      createTextVNode(" Referrals ")
                    ]),
                    createVNode("p", { class: "mt-2 text-2xl font-bold" }, toDisplayString(__props.stats.total_referrals), 1),
                    createVNode("p", { class: "text-xs text-surface-500 mt-1" }, toDisplayString(__props.stats.conversion_rate) + "% converted", 1)
                  ])
                ]),
                createVNode("div", { class: "card p-6" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                    createVNode("h2", { class: "font-semibold" }, "Earnings — last 30 days"),
                    createVNode(unref(Link), {
                      href: _ctx.route("affiliate.commissions.index"),
                      class: "text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" View all commissions "),
                        createVNode(unref(ArrowRight), { class: "h-3.5 w-3.5" })
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "relative h-24" }, [
                    (openBlock(), createBlock("svg", {
                      viewBox: "0 0 600 60",
                      preserveAspectRatio: "none",
                      class: "w-full h-full"
                    }, [
                      createVNode("defs", null, [
                        createVNode("linearGradient", {
                          id: "grad",
                          x1: "0",
                          y1: "0",
                          x2: "0",
                          y2: "1"
                        }, [
                          createVNode("stop", {
                            offset: "0%",
                            "stop-color": "#3B82F6",
                            "stop-opacity": "0.3"
                          }),
                          createVNode("stop", {
                            offset: "100%",
                            "stop-color": "#3B82F6",
                            "stop-opacity": "0"
                          })
                        ])
                      ]),
                      createVNode("path", {
                        d: `${sparklinePath.value} L 600 60 L 0 60 Z`,
                        fill: "url(#grad)"
                      }, null, 8, ["d"]),
                      createVNode("path", {
                        d: sparklinePath.value,
                        stroke: "#2563EB",
                        "stroke-width": "2",
                        fill: "none",
                        "vector-effect": "non-scaling-stroke"
                      }, null, 8, ["d"])
                    ]))
                  ])
                ]),
                createVNode("div", { class: "grid md:grid-cols-3 gap-4" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("affiliate.withdrawals.index"),
                    class: "card p-6 hover:border-primary-500 transition border-2 border-transparent"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Wallet), { class: "h-6 w-6 text-primary-600" }),
                      createVNode("h3", { class: "mt-3 font-semibold" }, "Withdraw earnings"),
                      createVNode("p", { class: "mt-1 text-sm text-surface-500" }, " Min " + toDisplayString(fmtMoney(__props.stats.min_withdrawal)) + " · Bank, JazzCash, EasyPaisa ", 1)
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(unref(Link), {
                    href: _ctx.route("affiliate.referrals.index"),
                    class: "card p-6 hover:border-primary-500 transition border-2 border-transparent"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Users), { class: "h-6 w-6 text-accent-600" }),
                      createVNode("h3", { class: "mt-3 font-semibold" }, "View referrals"),
                      createVNode("p", { class: "mt-1 text-sm text-surface-500" }, toDisplayString(__props.stats.total_referrals) + " signups · " + toDisplayString(__props.stats.converted_referrals) + " paying", 1)
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(unref(Link), {
                    href: _ctx.route("affiliate.commissions.index"),
                    class: "card p-6 hover:border-primary-500 transition border-2 border-transparent"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(TrendingUp), { class: "h-6 w-6 text-orange-600" }),
                      createVNode("h3", { class: "mt-3 font-semibold" }, "Commission history"),
                      createVNode("p", { class: "mt-1 text-sm text-surface-500" }, "Track every commission earned")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("div", { class: "card overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between" }, [
                    createVNode("h2", { class: "font-semibold" }, "Recent referrals")
                  ]),
                  createVNode("table", { class: "w-full text-sm" }, [
                    createVNode("thead", { class: "bg-surface-50 dark:bg-surface-800/50 text-left" }, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Name"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Email"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Joined"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Status")
                      ])
                    ]),
                    createVNode("tbody", { class: "divide-y divide-surface-200 dark:divide-surface-800" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recent_referrals, (r2) => {
                        return openBlock(), createBlock("tr", {
                          key: r2.id
                        }, [
                          createVNode("td", { class: "px-4 py-3" }, toDisplayString(r2.name), 1),
                          createVNode("td", { class: "px-4 py-3 text-surface-500 font-mono text-xs" }, toDisplayString(r2.email), 1),
                          createVNode("td", { class: "px-4 py-3 text-surface-500" }, toDisplayString(fmtDate(r2.created_at)), 1),
                          createVNode("td", { class: "px-4 py-3" }, [
                            r2.is_paying ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "badge bg-accent-50 text-accent-700"
                            }, "Paying")) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "badge bg-surface-100 text-surface-500"
                            }, "Trial"))
                          ])
                        ]);
                      }), 128)),
                      __props.recent_referrals.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "4",
                          class: "px-4 py-12 text-center text-surface-500 text-sm"
                        }, " No referrals yet. Share your link to start earning! ")
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Affiliate/Index.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$B
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$A = {
  __name: "Referrals",
  __ssrInlineRender: true,
  props: { referrals: Object },
  setup(__props) {
    const fmtDate = (d2) => new Date(d2).toLocaleDateString();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Referrals" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-5xl mx-auto space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("affiliate.index"),
              class: "text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Back to affiliate `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                    createTextVNode(" Back to affiliate ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}>Your referrals</h1><p class="mt-1 text-sm text-surface-500"${_scopeId}> Names are partially masked for your referrals&#39; privacy. </p></div><div class="card overflow-hidden"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead class="bg-surface-50 dark:bg-surface-800/50 text-left"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 font-semibold"${_scopeId}>Name</th><th class="px-4 py-3 font-semibold"${_scopeId}>Email</th><th class="px-4 py-3 font-semibold"${_scopeId}>Signed up</th><th class="px-4 py-3 font-semibold"${_scopeId}>Status</th></tr></thead><tbody class="divide-y divide-surface-200 dark:divide-surface-800"${_scopeId}><!--[-->`);
            ssrRenderList(__props.referrals.data, (r2) => {
              _push2(`<tr${_scopeId}><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(r2.name)}</td><td class="px-4 py-3 font-mono text-xs"${_scopeId}>${ssrInterpolate(r2.email)}</td><td class="px-4 py-3 text-surface-500"${_scopeId}>${ssrInterpolate(fmtDate(r2.created_at))}</td><td class="px-4 py-3"${_scopeId}>`);
              if (r2.has_paid) {
                _push2(`<span class="badge bg-accent-50 text-accent-700"${_scopeId}>Paying</span>`);
              } else {
                _push2(`<span class="badge bg-surface-100 text-surface-500"${_scopeId}>Trial / Free</span>`);
              }
              _push2(`</td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.referrals.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="4" class="px-4 py-12 text-center text-surface-500"${_scopeId}> No referrals yet. Share your link! </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-5xl mx-auto space-y-6" }, [
                createVNode(unref(Link), {
                  href: _ctx.route("affiliate.index"),
                  class: "text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                    createTextVNode(" Back to affiliate ")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("div", null, [
                  createVNode("h1", { class: "text-2xl font-bold" }, "Your referrals"),
                  createVNode("p", { class: "mt-1 text-sm text-surface-500" }, " Names are partially masked for your referrals' privacy. ")
                ]),
                createVNode("div", { class: "card overflow-hidden" }, [
                  createVNode("table", { class: "w-full text-sm" }, [
                    createVNode("thead", { class: "bg-surface-50 dark:bg-surface-800/50 text-left" }, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Name"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Email"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Signed up"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Status")
                      ])
                    ]),
                    createVNode("tbody", { class: "divide-y divide-surface-200 dark:divide-surface-800" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.referrals.data, (r2) => {
                        return openBlock(), createBlock("tr", {
                          key: r2.id
                        }, [
                          createVNode("td", { class: "px-4 py-3" }, toDisplayString(r2.name), 1),
                          createVNode("td", { class: "px-4 py-3 font-mono text-xs" }, toDisplayString(r2.email), 1),
                          createVNode("td", { class: "px-4 py-3 text-surface-500" }, toDisplayString(fmtDate(r2.created_at)), 1),
                          createVNode("td", { class: "px-4 py-3" }, [
                            r2.has_paid ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "badge bg-accent-50 text-accent-700"
                            }, "Paying")) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "badge bg-surface-100 text-surface-500"
                            }, "Trial / Free"))
                          ])
                        ]);
                      }), 128)),
                      __props.referrals.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "4",
                          class: "px-4 py-12 text-center text-surface-500"
                        }, " No referrals yet. Share your link! ")
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Affiliate/Referrals.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$A
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$z = {
  __name: "Withdrawals",
  __ssrInlineRender: true,
  props: {
    withdrawals: Object,
    stats: Object
  },
  setup(__props) {
    const props = __props;
    const showForm = ref(false);
    const form = useForm({
      amount: props.stats.available,
      method: "bank",
      account_title: "",
      account_number: "",
      bank_name: ""
    });
    const fmtMoney = (a2) => `${props.stats.currency} ${Number(a2).toLocaleString(void 0, { maximumFractionDigits: 0 })}`;
    const fmtDate = (d2) => d2 ? new Date(d2).toLocaleDateString() : "—";
    const submit = () => form.post(route("affiliate.withdrawals.store"), {
      preserveScroll: true,
      onSuccess: () => {
        showForm.value = false;
        form.reset();
      }
    });
    const statusBadge = (s2) => ({
      pending: { class: "bg-orange-50 text-orange-700", icon: Clock, label: "Pending" },
      approved: { class: "bg-primary-50 text-primary-700", icon: CheckCircle, label: "Approved" },
      paid: { class: "bg-accent-50 text-accent-700", icon: CheckCircle, label: "Paid" },
      rejected: { class: "bg-red-50 text-red-700", icon: XCircle, label: "Rejected" }
    })[s2] || { class: "bg-surface-100", icon: Clock, label: s2 };
    const canWithdraw = props.stats.available >= props.stats.min_withdrawal;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Withdrawals" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-4xl mx-auto space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("affiliate.index"),
              class: "text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Back to affiliate `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                    createTextVNode(" Back to affiliate ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="card p-6 flex items-center justify-between flex-wrap gap-4"${_scopeId}><div${_scopeId}><p class="text-xs text-surface-500"${_scopeId}>Available to withdraw</p><p class="text-3xl font-bold"${_scopeId}>${ssrInterpolate(fmtMoney(__props.stats.available))}</p><p class="text-xs text-surface-500 mt-1"${_scopeId}> Minimum withdrawal: ${ssrInterpolate(fmtMoney(__props.stats.min_withdrawal))}</p></div>`);
            if (canWithdraw) {
              _push2(`<button class="btn-primary"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Wallet), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(showForm.value ? "Cancel" : "Request withdrawal")}</button>`);
            } else {
              _push2(`<p class="text-sm text-surface-500 text-right"${_scopeId}> Need ${ssrInterpolate(fmtMoney(__props.stats.min_withdrawal - __props.stats.available))} more to withdraw. </p>`);
            }
            _push2(`</div>`);
            if (showForm.value) {
              _push2(`<form class="card p-6 space-y-4"${_scopeId}><h2 class="font-semibold"${_scopeId}>New withdrawal request</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="label"${_scopeId}>Amount (PKR)</label><input type="number"${ssrRenderAttr("value", unref(form).amount)}${ssrRenderAttr("max", __props.stats.available)}${ssrRenderAttr("min", __props.stats.min_withdrawal)} required class="input"${_scopeId}>`);
              if (unref(form).errors.amount) {
                _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.amount)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="label"${_scopeId}>Payout method</label><select required class="input"${_scopeId}><option value="bank"${ssrIncludeBooleanAttr(Array.isArray(unref(form).method) ? ssrLooseContain(unref(form).method, "bank") : ssrLooseEqual(unref(form).method, "bank")) ? " selected" : ""}${_scopeId}>Bank transfer</option><option value="jazzcash"${ssrIncludeBooleanAttr(Array.isArray(unref(form).method) ? ssrLooseContain(unref(form).method, "jazzcash") : ssrLooseEqual(unref(form).method, "jazzcash")) ? " selected" : ""}${_scopeId}>JazzCash</option><option value="easypaisa"${ssrIncludeBooleanAttr(Array.isArray(unref(form).method) ? ssrLooseContain(unref(form).method, "easypaisa") : ssrLooseEqual(unref(form).method, "easypaisa")) ? " selected" : ""}${_scopeId}>EasyPaisa</option></select></div><div${_scopeId}><label class="label"${_scopeId}>Account holder name</label><input${ssrRenderAttr("value", unref(form).account_title)} required class="input"${_scopeId}>`);
              if (unref(form).errors.account_title) {
                _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.account_title)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="label"${_scopeId}>${ssrInterpolate(unref(form).method === "bank" ? "Account / IBAN" : "Mobile number")}</label><input${ssrRenderAttr("value", unref(form).account_number)} required class="input"${ssrRenderAttr("placeholder", unref(form).method === "bank" ? "PK00..." : "03XX-XXXXXXX")}${_scopeId}>`);
              if (unref(form).errors.account_number) {
                _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.account_number)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (unref(form).method === "bank") {
                _push2(`<div class="md:col-span-2"${_scopeId}><label class="label"${_scopeId}>Bank name</label><input${ssrRenderAttr("value", unref(form).bank_name)} required class="input" placeholder="e.g. HBL, Meezan, UBL"${_scopeId}>`);
                if (unref(form).errors.bank_name) {
                  _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.bank_name)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="pt-3 border-t border-surface-200 dark:border-surface-800"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary w-full"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Submitting..." : "Submit withdrawal request")}</button><p class="mt-2 text-xs text-surface-500 text-center"${_scopeId}> Requests are processed manually within 2-3 business days. </p></div></form>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="card overflow-hidden"${_scopeId}><div class="px-6 py-4 border-b border-surface-200 dark:border-surface-800"${_scopeId}><h2 class="font-semibold"${_scopeId}>Withdrawal history</h2></div><table class="w-full text-sm"${_scopeId}><thead class="bg-surface-50 dark:bg-surface-800/50 text-left"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 font-semibold"${_scopeId}>Date</th><th class="px-4 py-3 font-semibold"${_scopeId}>Amount</th><th class="px-4 py-3 font-semibold"${_scopeId}>Method</th><th class="px-4 py-3 font-semibold"${_scopeId}>Account</th><th class="px-4 py-3 font-semibold"${_scopeId}>Status</th><th class="px-4 py-3 font-semibold"${_scopeId}>Reference</th></tr></thead><tbody class="divide-y divide-surface-200 dark:divide-surface-800"${_scopeId}><!--[-->`);
            ssrRenderList(__props.withdrawals.data, (w2) => {
              _push2(`<tr${_scopeId}><td class="px-4 py-3 text-surface-500"${_scopeId}>${ssrInterpolate(fmtDate(w2.created_at))}</td><td class="px-4 py-3 font-medium"${_scopeId}>${ssrInterpolate(fmtMoney(w2.amount))}</td><td class="px-4 py-3 capitalize"${_scopeId}>${ssrInterpolate(w2.method)}</td><td class="px-4 py-3 font-mono text-xs"${_scopeId}>${ssrInterpolate(w2.account_number)}</td><td class="px-4 py-3"${_scopeId}><span class="${ssrRenderClass(["badge inline-flex items-center gap-1 text-xs", statusBadge(w2.status).class])}"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(statusBadge(w2.status).icon), { class: "h-3 w-3" }, null), _parent2, _scopeId);
              _push2(` ${ssrInterpolate(statusBadge(w2.status).label)}</span></td><td class="px-4 py-3 text-xs text-surface-500"${_scopeId}>${ssrInterpolate(w2.transaction_reference || "—")}</td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.withdrawals.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="px-4 py-12 text-center text-surface-500"${_scopeId}>No withdrawals yet.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-4xl mx-auto space-y-6" }, [
                createVNode(unref(Link), {
                  href: _ctx.route("affiliate.index"),
                  class: "text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                    createTextVNode(" Back to affiliate ")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("div", { class: "card p-6 flex items-center justify-between flex-wrap gap-4" }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-xs text-surface-500" }, "Available to withdraw"),
                    createVNode("p", { class: "text-3xl font-bold" }, toDisplayString(fmtMoney(__props.stats.available)), 1),
                    createVNode("p", { class: "text-xs text-surface-500 mt-1" }, " Minimum withdrawal: " + toDisplayString(fmtMoney(__props.stats.min_withdrawal)), 1)
                  ]),
                  canWithdraw ? (openBlock(), createBlock("button", {
                    key: 0,
                    onClick: ($event) => showForm.value = !showForm.value,
                    class: "btn-primary"
                  }, [
                    createVNode(unref(Wallet), { class: "h-4 w-4" }),
                    createTextVNode(" " + toDisplayString(showForm.value ? "Cancel" : "Request withdrawal"), 1)
                  ], 8, ["onClick"])) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "text-sm text-surface-500 text-right"
                  }, " Need " + toDisplayString(fmtMoney(__props.stats.min_withdrawal - __props.stats.available)) + " more to withdraw. ", 1))
                ]),
                showForm.value ? (openBlock(), createBlock("form", {
                  key: 0,
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "card p-6 space-y-4"
                }, [
                  createVNode("h2", { class: "font-semibold" }, "New withdrawal request"),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "label" }, "Amount (PKR)"),
                      withDirectives(createVNode("input", {
                        type: "number",
                        "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                        max: __props.stats.available,
                        min: __props.stats.min_withdrawal,
                        required: "",
                        class: "input"
                      }, null, 8, ["onUpdate:modelValue", "max", "min"]), [
                        [vModelText, unref(form).amount]
                      ]),
                      unref(form).errors.amount ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-xs text-red-600"
                      }, toDisplayString(unref(form).errors.amount), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "label" }, "Payout method"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(form).method = $event,
                        required: "",
                        class: "input"
                      }, [
                        createVNode("option", { value: "bank" }, "Bank transfer"),
                        createVNode("option", { value: "jazzcash" }, "JazzCash"),
                        createVNode("option", { value: "easypaisa" }, "EasyPaisa")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(form).method]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "label" }, "Account holder name"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).account_title = $event,
                        required: "",
                        class: "input"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).account_title]
                      ]),
                      unref(form).errors.account_title ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-xs text-red-600"
                      }, toDisplayString(unref(form).errors.account_title), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "label" }, toDisplayString(unref(form).method === "bank" ? "Account / IBAN" : "Mobile number"), 1),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).account_number = $event,
                        required: "",
                        class: "input",
                        placeholder: unref(form).method === "bank" ? "PK00..." : "03XX-XXXXXXX"
                      }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                        [vModelText, unref(form).account_number]
                      ]),
                      unref(form).errors.account_number ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-xs text-red-600"
                      }, toDisplayString(unref(form).errors.account_number), 1)) : createCommentVNode("", true)
                    ]),
                    unref(form).method === "bank" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "md:col-span-2"
                    }, [
                      createVNode("label", { class: "label" }, "Bank name"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).bank_name = $event,
                        required: "",
                        class: "input",
                        placeholder: "e.g. HBL, Meezan, UBL"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).bank_name]
                      ]),
                      unref(form).errors.bank_name ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-xs text-red-600"
                      }, toDisplayString(unref(form).errors.bank_name), 1)) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "pt-3 border-t border-surface-200 dark:border-surface-800" }, [
                    createVNode("button", {
                      type: "submit",
                      disabled: unref(form).processing,
                      class: "btn-primary w-full"
                    }, toDisplayString(unref(form).processing ? "Submitting..." : "Submit withdrawal request"), 9, ["disabled"]),
                    createVNode("p", { class: "mt-2 text-xs text-surface-500 text-center" }, " Requests are processed manually within 2-3 business days. ")
                  ])
                ], 32)) : createCommentVNode("", true),
                createVNode("div", { class: "card overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-surface-200 dark:border-surface-800" }, [
                    createVNode("h2", { class: "font-semibold" }, "Withdrawal history")
                  ]),
                  createVNode("table", { class: "w-full text-sm" }, [
                    createVNode("thead", { class: "bg-surface-50 dark:bg-surface-800/50 text-left" }, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Date"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Amount"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Method"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Account"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Status"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Reference")
                      ])
                    ]),
                    createVNode("tbody", { class: "divide-y divide-surface-200 dark:divide-surface-800" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.withdrawals.data, (w2) => {
                        return openBlock(), createBlock("tr", {
                          key: w2.id
                        }, [
                          createVNode("td", { class: "px-4 py-3 text-surface-500" }, toDisplayString(fmtDate(w2.created_at)), 1),
                          createVNode("td", { class: "px-4 py-3 font-medium" }, toDisplayString(fmtMoney(w2.amount)), 1),
                          createVNode("td", { class: "px-4 py-3 capitalize" }, toDisplayString(w2.method), 1),
                          createVNode("td", { class: "px-4 py-3 font-mono text-xs" }, toDisplayString(w2.account_number), 1),
                          createVNode("td", { class: "px-4 py-3" }, [
                            createVNode("span", {
                              class: ["badge inline-flex items-center gap-1 text-xs", statusBadge(w2.status).class]
                            }, [
                              (openBlock(), createBlock(resolveDynamicComponent(statusBadge(w2.status).icon), { class: "h-3 w-3" })),
                              createTextVNode(" " + toDisplayString(statusBadge(w2.status).label), 1)
                            ], 2)
                          ]),
                          createVNode("td", { class: "px-4 py-3 text-xs text-surface-500" }, toDisplayString(w2.transaction_reference || "—"), 1)
                        ]);
                      }), 128)),
                      __props.withdrawals.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "6",
                          class: "px-4 py-12 text-center text-surface-500"
                        }, "No withdrawals yet.")
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Affiliate/Withdrawals.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$z
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$y = {
  __name: "GuestLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-surface-50 dark:bg-surface-950" }, _attrs))}><div class="mb-6">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg"${_scopeId}> C </div><span class="text-xl font-bold text-surface-900 dark:text-surface-50"${_scopeId}>Customer Near Me</span>`);
          } else {
            return [
              createVNode("div", { class: "h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg" }, " C "),
              createVNode("span", { class: "text-xl font-bold text-surface-900 dark:text-surface-50" }, "Customer Near Me")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="w-full sm:max-w-md px-6 py-8 bg-white dark:bg-surface-900 shadow-md overflow-hidden sm:rounded-2xl border border-surface-200 dark:border-surface-800">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><p class="mt-6 text-xs text-surface-500"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Customer Near Me. All rights reserved. </p></div>`);
    };
  }
};
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const _sfc_main$x = {
  __name: "ConfirmPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({ password: "" });
    const submit = () => form.post(route("password.confirm"), {
      onFinish: () => form.reset("password")
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$y, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Confirm Password" }, null, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-center"${_scopeId}>Confirm your password</h1><p class="mt-2 text-sm text-surface-500 text-center"${_scopeId}> This is a secure area. Please confirm your password before continuing. </p><form class="mt-6 space-y-4"${_scopeId}><div${_scopeId}><label class="label"${_scopeId}>Password</label><input type="password"${ssrRenderAttr("value", unref(form).password)} required autofocus class="input"${_scopeId}>`);
            if (unref(form).errors.password) {
              _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary w-full"${_scopeId}>Confirm</button></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Confirm Password" }),
              createVNode("h1", { class: "text-2xl font-bold text-center" }, "Confirm your password"),
              createVNode("p", { class: "mt-2 text-sm text-surface-500 text-center" }, " This is a secure area. Please confirm your password before continuing. "),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "mt-6 space-y-4"
              }, [
                createVNode("div", null, [
                  createVNode("label", { class: "label" }, "Password"),
                  withDirectives(createVNode("input", {
                    type: "password",
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autofocus: "",
                    class: "input"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).password]
                  ]),
                  unref(form).errors.password ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "mt-1 text-xs text-red-600"
                  }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                ]),
                createVNode("button", {
                  type: "submit",
                  disabled: unref(form).processing,
                  class: "btn-primary w-full"
                }, "Confirm", 8, ["disabled"])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ConfirmPassword.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$x
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$w = {
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: { status: String },
  setup(__props) {
    const form = useForm({ email: "" });
    const submit = () => form.post(route("password.email"));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$y, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Forgot Password" }, null, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-center text-surface-900 dark:text-surface-50"${_scopeId}>Reset your password</h1><p class="mt-2 text-center text-sm text-surface-500"${_scopeId}> Enter your email and we&#39;ll send you a reset link. </p>`);
            if (__props.status) {
              _push2(`<div class="mt-4 p-3 rounded-lg bg-accent-50 text-accent-700 text-sm text-center"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="mt-6 space-y-4"${_scopeId}><div${_scopeId}><label for="email" class="label"${_scopeId}>Email</label><input id="email" type="email"${ssrRenderAttr("value", unref(form).email)} required autofocus class="input"${_scopeId}>`);
            if (unref(form).errors.email) {
              _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary w-full"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Sending..." : "Send reset link")}</button></form><p class="mt-6 text-center text-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("login"),
              class: "text-primary-600 hover:underline"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Back to login`);
                } else {
                  return [
                    createTextVNode("Back to login")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Forgot Password" }),
              createVNode("h1", { class: "text-2xl font-bold text-center text-surface-900 dark:text-surface-50" }, "Reset your password"),
              createVNode("p", { class: "mt-2 text-center text-sm text-surface-500" }, " Enter your email and we'll send you a reset link. "),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mt-4 p-3 rounded-lg bg-accent-50 text-accent-700 text-sm text-center"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "mt-6 space-y-4"
              }, [
                createVNode("div", null, [
                  createVNode("label", {
                    for: "email",
                    class: "label"
                  }, "Email"),
                  withDirectives(createVNode("input", {
                    id: "email",
                    type: "email",
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    class: "input"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).email]
                  ]),
                  unref(form).errors.email ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "mt-1 text-xs text-red-600"
                  }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                ]),
                createVNode("button", {
                  type: "submit",
                  disabled: unref(form).processing,
                  class: "btn-primary w-full"
                }, toDisplayString(unref(form).processing ? "Sending..." : "Send reset link"), 9, ["disabled"])
              ], 32),
              createVNode("p", { class: "mt-6 text-center text-sm" }, [
                createVNode(unref(Link), {
                  href: _ctx.route("login"),
                  class: "text-primary-600 hover:underline"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Back to login")
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$w
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$v = {
  __name: "Login",
  __ssrInlineRender: true,
  props: { canResetPassword: Boolean, status: String },
  setup(__props) {
    const page = usePage();
    const googleEnabled = computed(() => {
      var _a;
      return Boolean((_a = page.props.app) == null ? void 0 : _a.google_oauth_enabled);
    });
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.post(route("login"), {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$y, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Log in" }, null, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-center text-surface-900 dark:text-surface-50"${_scopeId}>Welcome back</h1><p class="mt-2 text-center text-sm text-surface-500"${_scopeId}>Sign in to continue generating leads</p>`);
            if (__props.status) {
              _push2(`<div class="mt-4 text-sm font-medium text-accent-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="mt-6 space-y-4"${_scopeId}><div${_scopeId}><label for="email" class="label"${_scopeId}>Email</label><input id="email" type="email"${ssrRenderAttr("value", unref(form).email)} required autofocus autocomplete="username" class="input"${_scopeId}>`);
            if (unref(form).errors.email) {
              _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><div class="flex items-center justify-between"${_scopeId}><label for="password" class="label"${_scopeId}>Password</label>`);
            if (__props.canResetPassword) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("password.request"),
                class: "text-xs text-primary-600 hover:underline"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Forgot? `);
                  } else {
                    return [
                      createTextVNode(" Forgot? ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><input id="password" type="password"${ssrRenderAttr("value", unref(form).password)} required autocomplete="current-password" class="input"${_scopeId}>`);
            if (unref(form).errors.password) {
              _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-center"${_scopeId}><input id="remember" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).remember) ? ssrLooseContain(unref(form).remember, null) : unref(form).remember) ? " checked" : ""} class="h-4 w-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500"${_scopeId}><label for="remember" class="ml-2 text-sm text-surface-700 dark:text-surface-300"${_scopeId}>Remember me</label></div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary w-full"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Signing in..." : "Sign in")}</button>`);
            if (googleEnabled.value) {
              _push2(`<div class="relative my-4"${_scopeId}><div class="absolute inset-0 flex items-center"${_scopeId}><div class="w-full border-t border-surface-200 dark:border-surface-800"${_scopeId}></div></div><div class="relative flex justify-center text-xs"${_scopeId}><span class="bg-white dark:bg-surface-900 px-2 text-surface-500"${_scopeId}>or</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (googleEnabled.value) {
              _push2(`<a${ssrRenderAttr("href", _ctx.route("auth.google"))} class="btn-secondary w-full"${_scopeId}><svg class="h-5 w-5" viewBox="0 0 24 24"${_scopeId}><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"${_scopeId}></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z"${_scopeId}></path><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.99 10.99 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"${_scopeId}></path><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"${_scopeId}></path></svg> Continue with Google </a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</form><p class="mt-6 text-center text-sm text-surface-500"${_scopeId}> New here? `);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("register"),
              class: "font-medium text-primary-600 hover:underline"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create an account `);
                } else {
                  return [
                    createTextVNode(" Create an account ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Log in" }),
              createVNode("h1", { class: "text-2xl font-bold text-center text-surface-900 dark:text-surface-50" }, "Welcome back"),
              createVNode("p", { class: "mt-2 text-center text-sm text-surface-500" }, "Sign in to continue generating leads"),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mt-4 text-sm font-medium text-accent-600"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "mt-6 space-y-4"
              }, [
                createVNode("div", null, [
                  createVNode("label", {
                    for: "email",
                    class: "label"
                  }, "Email"),
                  withDirectives(createVNode("input", {
                    id: "email",
                    type: "email",
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username",
                    class: "input"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).email]
                  ]),
                  unref(form).errors.email ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "mt-1 text-xs text-red-600"
                  }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", null, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("label", {
                      for: "password",
                      class: "label"
                    }, "Password"),
                    __props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
                      key: 0,
                      href: _ctx.route("password.request"),
                      class: "text-xs text-primary-600 hover:underline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Forgot? ")
                      ]),
                      _: 1
                    }, 8, ["href"])) : createCommentVNode("", true)
                  ]),
                  withDirectives(createVNode("input", {
                    id: "password",
                    type: "password",
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "current-password",
                    class: "input"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).password]
                  ]),
                  unref(form).errors.password ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "mt-1 text-xs text-red-600"
                  }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "flex items-center" }, [
                  withDirectives(createVNode("input", {
                    id: "remember",
                    type: "checkbox",
                    "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                    class: "h-4 w-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelCheckbox, unref(form).remember]
                  ]),
                  createVNode("label", {
                    for: "remember",
                    class: "ml-2 text-sm text-surface-700 dark:text-surface-300"
                  }, "Remember me")
                ]),
                createVNode("button", {
                  type: "submit",
                  disabled: unref(form).processing,
                  class: "btn-primary w-full"
                }, toDisplayString(unref(form).processing ? "Signing in..." : "Sign in"), 9, ["disabled"]),
                googleEnabled.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "relative my-4"
                }, [
                  createVNode("div", { class: "absolute inset-0 flex items-center" }, [
                    createVNode("div", { class: "w-full border-t border-surface-200 dark:border-surface-800" })
                  ]),
                  createVNode("div", { class: "relative flex justify-center text-xs" }, [
                    createVNode("span", { class: "bg-white dark:bg-surface-900 px-2 text-surface-500" }, "or")
                  ])
                ])) : createCommentVNode("", true),
                googleEnabled.value ? (openBlock(), createBlock("a", {
                  key: 1,
                  href: _ctx.route("auth.google"),
                  class: "btn-secondary w-full"
                }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-5 w-5",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      fill: "#4285F4",
                      d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    }),
                    createVNode("path", {
                      fill: "#34A853",
                      d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z"
                    }),
                    createVNode("path", {
                      fill: "#FBBC05",
                      d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.99 10.99 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
                    }),
                    createVNode("path", {
                      fill: "#EA4335",
                      d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
                    })
                  ])),
                  createTextVNode(" Continue with Google ")
                ], 8, ["href"])) : createCommentVNode("", true)
              ], 32),
              createVNode("p", { class: "mt-6 text-center text-sm text-surface-500" }, [
                createTextVNode(" New here? "),
                createVNode(unref(Link), {
                  href: _ctx.route("register"),
                  class: "font-medium text-primary-600 hover:underline"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Create an account ")
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$v
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$u = {
  __name: "Register",
  __ssrInlineRender: true,
  props: { referralCode: { type: String, default: null } },
  setup(__props) {
    const form = useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone: "",
      country_code: "PK",
      terms: false
    });
    const submit = () => {
      form.post(route("register"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$y, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Sign up" }, null, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-center text-surface-900 dark:text-surface-50"${_scopeId}>Start your 7-day trial</h1><p class="mt-2 text-center text-sm text-surface-500"${_scopeId}>No credit card required.</p>`);
            if (__props.referralCode) {
              _push2(`<div class="mt-4 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-sm text-primary-700 dark:text-primary-300 text-center"${_scopeId}> Referred by <strong${_scopeId}>${ssrInterpolate(__props.referralCode)}</strong></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="mt-6 space-y-4"${_scopeId}><div${_scopeId}><label for="name" class="label"${_scopeId}>Full name</label><input id="name"${ssrRenderAttr("value", unref(form).name)} required autofocus class="input"${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="email" class="label"${_scopeId}>Email</label><input id="email" type="email"${ssrRenderAttr("value", unref(form).email)} required class="input"${_scopeId}>`);
            if (unref(form).errors.email) {
              _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="phone" class="label"${_scopeId}>Phone (optional)</label><input id="phone"${ssrRenderAttr("value", unref(form).phone)} class="input" placeholder="+92 300 1234567"${_scopeId}></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label for="password" class="label"${_scopeId}>Password</label><input id="password" type="password"${ssrRenderAttr("value", unref(form).password)} required class="input"${_scopeId}>`);
            if (unref(form).errors.password) {
              _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="password_confirmation" class="label"${_scopeId}>Confirm</label><input id="password_confirmation" type="password"${ssrRenderAttr("value", unref(form).password_confirmation)} required class="input"${_scopeId}></div></div><div class="flex items-start gap-2"${_scopeId}><input id="terms" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).terms) ? ssrLooseContain(unref(form).terms, null) : unref(form).terms) ? " checked" : ""} required class="mt-0.5 h-4 w-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500"${_scopeId}><label for="terms" class="text-sm text-surface-700 dark:text-surface-300"${_scopeId}> I agree to the `);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/terms",
              class: "text-primary-600 hover:underline"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Terms`);
                } else {
                  return [
                    createTextVNode("Terms")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` and `);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/privacy",
              class: "text-primary-600 hover:underline"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Privacy Policy`);
                } else {
                  return [
                    createTextVNode("Privacy Policy")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</label></div>`);
            if (unref(form).errors.terms) {
              _push2(`<p class="text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.terms)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary w-full"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Creating account..." : "Create account")}</button></form><p class="mt-6 text-center text-sm text-surface-500"${_scopeId}> Already have an account? `);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("login"),
              class: "font-medium text-primary-600 hover:underline"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Sign in `);
                } else {
                  return [
                    createTextVNode(" Sign in ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Sign up" }),
              createVNode("h1", { class: "text-2xl font-bold text-center text-surface-900 dark:text-surface-50" }, "Start your 7-day trial"),
              createVNode("p", { class: "mt-2 text-center text-sm text-surface-500" }, "No credit card required."),
              __props.referralCode ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mt-4 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-sm text-primary-700 dark:text-primary-300 text-center"
              }, [
                createTextVNode(" Referred by "),
                createVNode("strong", null, toDisplayString(__props.referralCode), 1)
              ])) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "mt-6 space-y-4"
              }, [
                createVNode("div", null, [
                  createVNode("label", {
                    for: "name",
                    class: "label"
                  }, "Full name"),
                  withDirectives(createVNode("input", {
                    id: "name",
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    required: "",
                    autofocus: "",
                    class: "input"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).name]
                  ]),
                  unref(form).errors.name ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "mt-1 text-xs text-red-600"
                  }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", null, [
                  createVNode("label", {
                    for: "email",
                    class: "label"
                  }, "Email"),
                  withDirectives(createVNode("input", {
                    id: "email",
                    type: "email",
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    class: "input"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).email]
                  ]),
                  unref(form).errors.email ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "mt-1 text-xs text-red-600"
                  }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", null, [
                  createVNode("label", {
                    for: "phone",
                    class: "label"
                  }, "Phone (optional)"),
                  withDirectives(createVNode("input", {
                    id: "phone",
                    "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                    class: "input",
                    placeholder: "+92 300 1234567"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).phone]
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "password",
                      class: "label"
                    }, "Password"),
                    withDirectives(createVNode("input", {
                      id: "password",
                      type: "password",
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      required: "",
                      class: "input"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).password]
                    ]),
                    unref(form).errors.password ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "mt-1 text-xs text-red-600"
                    }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "password_confirmation",
                      class: "label"
                    }, "Confirm"),
                    withDirectives(createVNode("input", {
                      id: "password_confirmation",
                      type: "password",
                      "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                      required: "",
                      class: "input"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).password_confirmation]
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex items-start gap-2" }, [
                  withDirectives(createVNode("input", {
                    id: "terms",
                    type: "checkbox",
                    "onUpdate:modelValue": ($event) => unref(form).terms = $event,
                    required: "",
                    class: "mt-0.5 h-4 w-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelCheckbox, unref(form).terms]
                  ]),
                  createVNode("label", {
                    for: "terms",
                    class: "text-sm text-surface-700 dark:text-surface-300"
                  }, [
                    createTextVNode(" I agree to the "),
                    createVNode(unref(Link), {
                      href: "/terms",
                      class: "text-primary-600 hover:underline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Terms")
                      ]),
                      _: 1
                    }),
                    createTextVNode(" and "),
                    createVNode(unref(Link), {
                      href: "/privacy",
                      class: "text-primary-600 hover:underline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Privacy Policy")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                unref(form).errors.terms ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "text-xs text-red-600"
                }, toDisplayString(unref(form).errors.terms), 1)) : createCommentVNode("", true),
                createVNode("button", {
                  type: "submit",
                  disabled: unref(form).processing,
                  class: "btn-primary w-full"
                }, toDisplayString(unref(form).processing ? "Creating account..." : "Create account"), 9, ["disabled"])
              ], 32),
              createVNode("p", { class: "mt-6 text-center text-sm text-surface-500" }, [
                createTextVNode(" Already have an account? "),
                createVNode(unref(Link), {
                  href: _ctx.route("login"),
                  class: "font-medium text-primary-600 hover:underline"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Sign in ")
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$u
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$t = {
  __name: "ResetPassword",
  __ssrInlineRender: true,
  props: { email: String, token: String },
  setup(__props) {
    const props = __props;
    const form = useForm({
      token: props.token,
      email: props.email,
      password: "",
      password_confirmation: ""
    });
    const submit = () => form.post(route("password.store"), {
      onFinish: () => form.reset("password", "password_confirmation")
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$y, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Reset Password" }, null, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-center text-surface-900 dark:text-surface-50"${_scopeId}>Set new password</h1><form class="mt-6 space-y-4"${_scopeId}><div${_scopeId}><label for="email" class="label"${_scopeId}>Email</label><input id="email" type="email"${ssrRenderAttr("value", unref(form).email)} required class="input" readonly${_scopeId}></div><div${_scopeId}><label for="password" class="label"${_scopeId}>New password</label><input id="password" type="password"${ssrRenderAttr("value", unref(form).password)} required autofocus class="input"${_scopeId}>`);
            if (unref(form).errors.password) {
              _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="password_confirmation" class="label"${_scopeId}>Confirm password</label><input id="password_confirmation" type="password"${ssrRenderAttr("value", unref(form).password_confirmation)} required class="input"${_scopeId}></div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary w-full"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Updating..." : "Reset password")}</button></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Reset Password" }),
              createVNode("h1", { class: "text-2xl font-bold text-center text-surface-900 dark:text-surface-50" }, "Set new password"),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "mt-6 space-y-4"
              }, [
                createVNode("div", null, [
                  createVNode("label", {
                    for: "email",
                    class: "label"
                  }, "Email"),
                  withDirectives(createVNode("input", {
                    id: "email",
                    type: "email",
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    class: "input",
                    readonly: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).email]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", {
                    for: "password",
                    class: "label"
                  }, "New password"),
                  withDirectives(createVNode("input", {
                    id: "password",
                    type: "password",
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autofocus: "",
                    class: "input"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).password]
                  ]),
                  unref(form).errors.password ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "mt-1 text-xs text-red-600"
                  }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", null, [
                  createVNode("label", {
                    for: "password_confirmation",
                    class: "label"
                  }, "Confirm password"),
                  withDirectives(createVNode("input", {
                    id: "password_confirmation",
                    type: "password",
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    required: "",
                    class: "input"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).password_confirmation]
                  ])
                ]),
                createVNode("button", {
                  type: "submit",
                  disabled: unref(form).processing,
                  class: "btn-primary w-full"
                }, toDisplayString(unref(form).processing ? "Updating..." : "Reset password"), 9, ["disabled"])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ResetPassword.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$t
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$s = {
  __name: "VerifyEmail",
  __ssrInlineRender: true,
  props: { status: String },
  setup(__props) {
    const props = __props;
    const form = useForm({});
    const submit = () => form.post(route("verification.send"));
    const verificationLinkSent = computed(() => props.status === "verification-link-sent");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$y, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Verify Email" }, null, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-center text-surface-900 dark:text-surface-50"${_scopeId}>Verify your email</h1><p class="mt-4 text-sm text-surface-600 dark:text-surface-400"${_scopeId}> Thanks for signing up! Please verify your email by clicking the link we sent you. If you didn&#39;t receive it, we can send you another. </p>`);
            if (verificationLinkSent.value) {
              _push2(`<div class="mt-4 p-3 rounded-lg bg-accent-50 text-accent-700 text-sm text-center"${_scopeId}> A new verification link has been sent. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="mt-6 space-y-4"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary w-full"${_scopeId}> Resend verification email </button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "btn-ghost w-full"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log out `);
                } else {
                  return [
                    createTextVNode(" Log out ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Verify Email" }),
              createVNode("h1", { class: "text-2xl font-bold text-center text-surface-900 dark:text-surface-50" }, "Verify your email"),
              createVNode("p", { class: "mt-4 text-sm text-surface-600 dark:text-surface-400" }, " Thanks for signing up! Please verify your email by clicking the link we sent you. If you didn't receive it, we can send you another. "),
              verificationLinkSent.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mt-4 p-3 rounded-lg bg-accent-50 text-accent-700 text-sm text-center"
              }, " A new verification link has been sent. ")) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "mt-6 space-y-4"
              }, [
                createVNode("button", {
                  type: "submit",
                  disabled: unref(form).processing,
                  class: "btn-primary w-full"
                }, " Resend verification email ", 8, ["disabled"]),
                createVNode(unref(Link), {
                  href: _ctx.route("logout"),
                  method: "post",
                  as: "button",
                  class: "btn-ghost w-full"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Log out ")
                  ]),
                  _: 1
                }, 8, ["href"])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$s
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$r = {
  __name: "Checkout",
  __ssrInlineRender: true,
  props: {
    plan: Object,
    bank: Object,
    reference_code: String
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      plan_id: props.plan.id,
      transaction_id: "",
      sender_name: "",
      sender_account: "",
      bank_name: "",
      screenshot: null
    });
    const preview = ref(null);
    const copied = ref("");
    const onFile = (e2) => {
      const file = e2.target.files[0];
      if (!file) return;
      form.screenshot = file;
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (ev) => preview.value = ev.target.result;
        reader.readAsDataURL(file);
      }
    };
    const copy = (text, key) => {
      navigator.clipboard.writeText(text);
      copied.value = key;
      setTimeout(() => copied.value = "", 1500);
    };
    const submit = () => form.post(route("billing.payment.submit"), {
      forceFormData: true
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Subscribe to ${__props.plan.name}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="max-w-3xl mx-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("billing.index"),
              class: "text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Back to billing `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                    createTextVNode(" Back to billing ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mt-4 card p-6"${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}>Subscribe to ${ssrInterpolate(__props.plan.name)}</h1><p class="mt-2 text-surface-600 dark:text-surface-300"${_scopeId}>${ssrInterpolate(__props.plan.currency)} ${ssrInterpolate(Number(__props.plan.price).toLocaleString())} / ${ssrInterpolate(__props.plan.billing_cycle)}</p></div><div class="mt-6 card p-6"${_scopeId}><h2 class="font-semibold flex items-center gap-2"${_scopeId}><span class="h-6 w-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center"${_scopeId}>1</span> Transfer the amount to our bank </h2><div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm"${_scopeId}><div class="rounded-lg border border-surface-200 dark:border-surface-700 p-3"${_scopeId}><p class="text-xs text-surface-500"${_scopeId}>Bank Name</p><p class="font-medium"${_scopeId}>${ssrInterpolate(__props.bank.name)}</p></div><div class="rounded-lg border border-surface-200 dark:border-surface-700 p-3"${_scopeId}><p class="text-xs text-surface-500"${_scopeId}>Account Title</p><p class="font-medium"${_scopeId}>${ssrInterpolate(__props.bank.account_title)}</p></div><div class="rounded-lg border border-surface-200 dark:border-surface-700 p-3 sm:col-span-2"${_scopeId}><p class="text-xs text-surface-500"${_scopeId}>Account Number</p><div class="flex items-center justify-between"${_scopeId}><p class="font-mono font-medium"${_scopeId}>${ssrInterpolate(__props.bank.account_number)}</p><button class="text-primary-600 hover:text-primary-700"${_scopeId}>`);
            if (copied.value === "acc") {
              _push2(ssrRenderComponent(unref(Check), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Copy), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            }
            _push2(`</button></div></div>`);
            if (__props.bank.iban) {
              _push2(`<div class="rounded-lg border border-surface-200 dark:border-surface-700 p-3 sm:col-span-2"${_scopeId}><p class="text-xs text-surface-500"${_scopeId}>IBAN</p><div class="flex items-center justify-between"${_scopeId}><p class="font-mono font-medium"${_scopeId}>${ssrInterpolate(__props.bank.iban)}</p><button class="text-primary-600 hover:text-primary-700"${_scopeId}>`);
              if (copied.value === "iban") {
                _push2(ssrRenderComponent(unref(Check), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(Copy), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              }
              _push2(`</button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mt-4 p-4 rounded-lg bg-primary-50 dark:bg-primary-900/30"${_scopeId}><p class="text-sm"${_scopeId}><strong${_scopeId}>Amount to transfer:</strong> ${ssrInterpolate(__props.plan.currency)} ${ssrInterpolate(Number(__props.plan.price).toLocaleString())}</p><p class="text-xs mt-1 text-surface-600 dark:text-surface-300"${_scopeId}> Add reference code <code class="font-mono"${_scopeId}>${ssrInterpolate(__props.reference_code)}</code> in the transaction memo to help us match it. </p></div></div><form class="mt-6 card p-6 space-y-4"${_scopeId}><h2 class="font-semibold flex items-center gap-2"${_scopeId}><span class="h-6 w-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center"${_scopeId}>2</span> Submit your payment proof </h2><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="label"${_scopeId}>Transaction ID *</label><input${ssrRenderAttr("value", unref(form).transaction_id)} required class="input" placeholder="From your bank receipt"${_scopeId}>`);
            if (unref(form).errors.transaction_id) {
              _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.transaction_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="label"${_scopeId}>Your bank (optional)</label><input${ssrRenderAttr("value", unref(form).bank_name)} class="input" placeholder="e.g. HBL"${_scopeId}></div><div${_scopeId}><label class="label"${_scopeId}>Sender name *</label><input${ssrRenderAttr("value", unref(form).sender_name)} required class="input" placeholder="Name on the sending account"${_scopeId}>`);
            if (unref(form).errors.sender_name) {
              _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.sender_name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="label"${_scopeId}>Sender account number *</label><input${ssrRenderAttr("value", unref(form).sender_account)} required class="input" placeholder="Last 4 digits OK"${_scopeId}>`);
            if (unref(form).errors.sender_account) {
              _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.sender_account)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div${_scopeId}><label class="label"${_scopeId}>Screenshot of transfer * <span class="text-xs font-normal text-surface-500"${_scopeId}>(JPG/PNG/WEBP, max 5MB)</span></label><label class="block mt-1 cursor-pointer"${_scopeId}><div class="border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-lg p-6 hover:border-primary-500 transition"${_scopeId}>`);
            if (!preview.value) {
              _push2(`<div class="text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Upload), { class: "h-8 w-8 mx-auto text-surface-400" }, null, _parent2, _scopeId));
              _push2(`<p class="mt-2 text-sm text-surface-600 dark:text-surface-300"${_scopeId}>Click to upload screenshot</p></div>`);
            } else {
              _push2(`<div class="text-center"${_scopeId}><img${ssrRenderAttr("src", preview.value)} alt="Preview" class="max-h-48 mx-auto rounded"${_scopeId}><p class="mt-2 text-xs text-surface-500 inline-flex items-center gap-1"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(FileImage), { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate((_a = unref(form).screenshot) == null ? void 0 : _a.name)}</p></div>`);
            }
            _push2(`</div><input type="file" accept="image/*" class="hidden"${_scopeId}></label>`);
            if (unref(form).errors.screenshot) {
              _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.screenshot)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="pt-3 border-t border-surface-200 dark:border-surface-800"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing || !unref(form).screenshot) ? " disabled" : ""} class="btn-primary w-full"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Submitting..." : "Submit payment for review")}</button><p class="mt-2 text-xs text-surface-500 text-center"${_scopeId}> Our team typically reviews payments within 4 hours. </p></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-3xl mx-auto" }, [
                createVNode(unref(Link), {
                  href: _ctx.route("billing.index"),
                  class: "text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                    createTextVNode(" Back to billing ")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("div", { class: "mt-4 card p-6" }, [
                  createVNode("h1", { class: "text-2xl font-bold" }, "Subscribe to " + toDisplayString(__props.plan.name), 1),
                  createVNode("p", { class: "mt-2 text-surface-600 dark:text-surface-300" }, toDisplayString(__props.plan.currency) + " " + toDisplayString(Number(__props.plan.price).toLocaleString()) + " / " + toDisplayString(__props.plan.billing_cycle), 1)
                ]),
                createVNode("div", { class: "mt-6 card p-6" }, [
                  createVNode("h2", { class: "font-semibold flex items-center gap-2" }, [
                    createVNode("span", { class: "h-6 w-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center" }, "1"),
                    createTextVNode(" Transfer the amount to our bank ")
                  ]),
                  createVNode("div", { class: "mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm" }, [
                    createVNode("div", { class: "rounded-lg border border-surface-200 dark:border-surface-700 p-3" }, [
                      createVNode("p", { class: "text-xs text-surface-500" }, "Bank Name"),
                      createVNode("p", { class: "font-medium" }, toDisplayString(__props.bank.name), 1)
                    ]),
                    createVNode("div", { class: "rounded-lg border border-surface-200 dark:border-surface-700 p-3" }, [
                      createVNode("p", { class: "text-xs text-surface-500" }, "Account Title"),
                      createVNode("p", { class: "font-medium" }, toDisplayString(__props.bank.account_title), 1)
                    ]),
                    createVNode("div", { class: "rounded-lg border border-surface-200 dark:border-surface-700 p-3 sm:col-span-2" }, [
                      createVNode("p", { class: "text-xs text-surface-500" }, "Account Number"),
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("p", { class: "font-mono font-medium" }, toDisplayString(__props.bank.account_number), 1),
                        createVNode("button", {
                          onClick: ($event) => copy(__props.bank.account_number, "acc"),
                          class: "text-primary-600 hover:text-primary-700"
                        }, [
                          copied.value === "acc" ? (openBlock(), createBlock(unref(Check), {
                            key: 0,
                            class: "h-4 w-4"
                          })) : (openBlock(), createBlock(unref(Copy), {
                            key: 1,
                            class: "h-4 w-4"
                          }))
                        ], 8, ["onClick"])
                      ])
                    ]),
                    __props.bank.iban ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "rounded-lg border border-surface-200 dark:border-surface-700 p-3 sm:col-span-2"
                    }, [
                      createVNode("p", { class: "text-xs text-surface-500" }, "IBAN"),
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("p", { class: "font-mono font-medium" }, toDisplayString(__props.bank.iban), 1),
                        createVNode("button", {
                          onClick: ($event) => copy(__props.bank.iban, "iban"),
                          class: "text-primary-600 hover:text-primary-700"
                        }, [
                          copied.value === "iban" ? (openBlock(), createBlock(unref(Check), {
                            key: 0,
                            class: "h-4 w-4"
                          })) : (openBlock(), createBlock(unref(Copy), {
                            key: 1,
                            class: "h-4 w-4"
                          }))
                        ], 8, ["onClick"])
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "mt-4 p-4 rounded-lg bg-primary-50 dark:bg-primary-900/30" }, [
                    createVNode("p", { class: "text-sm" }, [
                      createVNode("strong", null, "Amount to transfer:"),
                      createTextVNode(" " + toDisplayString(__props.plan.currency) + " " + toDisplayString(Number(__props.plan.price).toLocaleString()), 1)
                    ]),
                    createVNode("p", { class: "text-xs mt-1 text-surface-600 dark:text-surface-300" }, [
                      createTextVNode(" Add reference code "),
                      createVNode("code", { class: "font-mono" }, toDisplayString(__props.reference_code), 1),
                      createTextVNode(" in the transaction memo to help us match it. ")
                    ])
                  ])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "mt-6 card p-6 space-y-4"
                }, [
                  createVNode("h2", { class: "font-semibold flex items-center gap-2" }, [
                    createVNode("span", { class: "h-6 w-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center" }, "2"),
                    createTextVNode(" Submit your payment proof ")
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "label" }, "Transaction ID *"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).transaction_id = $event,
                        required: "",
                        class: "input",
                        placeholder: "From your bank receipt"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).transaction_id]
                      ]),
                      unref(form).errors.transaction_id ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-xs text-red-600"
                      }, toDisplayString(unref(form).errors.transaction_id), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "label" }, "Your bank (optional)"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).bank_name = $event,
                        class: "input",
                        placeholder: "e.g. HBL"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).bank_name]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "label" }, "Sender name *"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).sender_name = $event,
                        required: "",
                        class: "input",
                        placeholder: "Name on the sending account"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).sender_name]
                      ]),
                      unref(form).errors.sender_name ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-xs text-red-600"
                      }, toDisplayString(unref(form).errors.sender_name), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "label" }, "Sender account number *"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).sender_account = $event,
                        required: "",
                        class: "input",
                        placeholder: "Last 4 digits OK"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).sender_account]
                      ]),
                      unref(form).errors.sender_account ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-xs text-red-600"
                      }, toDisplayString(unref(form).errors.sender_account), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "label" }, [
                      createTextVNode("Screenshot of transfer * "),
                      createVNode("span", { class: "text-xs font-normal text-surface-500" }, "(JPG/PNG/WEBP, max 5MB)")
                    ]),
                    createVNode("label", { class: "block mt-1 cursor-pointer" }, [
                      createVNode("div", { class: "border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-lg p-6 hover:border-primary-500 transition" }, [
                        !preview.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center"
                        }, [
                          createVNode(unref(Upload), { class: "h-8 w-8 mx-auto text-surface-400" }),
                          createVNode("p", { class: "mt-2 text-sm text-surface-600 dark:text-surface-300" }, "Click to upload screenshot")
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-center"
                        }, [
                          createVNode("img", {
                            src: preview.value,
                            alt: "Preview",
                            class: "max-h-48 mx-auto rounded"
                          }, null, 8, ["src"]),
                          createVNode("p", { class: "mt-2 text-xs text-surface-500 inline-flex items-center gap-1" }, [
                            createVNode(unref(FileImage), { class: "h-3.5 w-3.5" }),
                            createTextVNode(" " + toDisplayString((_b = unref(form).screenshot) == null ? void 0 : _b.name), 1)
                          ])
                        ]))
                      ]),
                      createVNode("input", {
                        type: "file",
                        accept: "image/*",
                        onChange: onFile,
                        class: "hidden"
                      }, null, 32)
                    ]),
                    unref(form).errors.screenshot ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "mt-1 text-xs text-red-600"
                    }, toDisplayString(unref(form).errors.screenshot), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "pt-3 border-t border-surface-200 dark:border-surface-800" }, [
                    createVNode("button", {
                      type: "submit",
                      disabled: unref(form).processing || !unref(form).screenshot,
                      class: "btn-primary w-full"
                    }, toDisplayString(unref(form).processing ? "Submitting..." : "Submit payment for review"), 9, ["disabled"]),
                    createVNode("p", { class: "mt-2 text-xs text-surface-500 text-center" }, " Our team typically reviews payments within 4 hours. ")
                  ])
                ], 32)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Billing/Checkout.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$r
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$q = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    subscription: Object,
    is_on_trial: Boolean,
    trial_days_left: Number,
    plans: Array,
    payments: Array,
    bank: Object
  },
  setup(__props) {
    const props = __props;
    const billingCycle = ref("monthly");
    computed(
      () => props.plans.filter(
        (p2) => billingCycle.value === "monthly" ? p2.billing_cycle === "monthly" || p2.billing_cycle === null || p2.is_free : p2.billing_cycle === "yearly" || p2.is_free
      ).length > 0 ? props.plans.filter((p2) => billingCycle.value === "monthly" ? p2.billing_cycle !== "yearly" : p2.billing_cycle !== "monthly" || p2.is_free) : props.plans
    );
    const countdown = ref({ days: 0, hours: 0, mins: 0, secs: 0 });
    let timer = null;
    const pad = (n2) => String(n2).padStart(2, "0");
    onMounted(() => {
      var _a;
      if ((_a = props.subscription) == null ? void 0 : _a.ends_at) {
        const update = () => {
          const diff = Math.max(0, new Date(props.subscription.ends_at).getTime() - Date.now());
          countdown.value = {
            days: Math.floor(diff / 864e5),
            hours: Math.floor(diff % 864e5 / 36e5),
            mins: Math.floor(diff % 36e5 / 6e4),
            secs: Math.floor(diff % 6e4 / 1e3)
          };
        };
        update();
        timer = setInterval(update, 1e3);
      }
    });
    onBeforeUnmount(() => clearInterval(timer));
    const currentPlan = computed(
      () => props.plans.find((p2) => {
        var _a, _b;
        return p2.id === ((_b = (_a = props.subscription) == null ? void 0 : _a.plan) == null ? void 0 : _b.id);
      }) ?? null
    );
    const fmtLimit = (v2) => v2 === null ? "Unlimited" : new Intl.NumberFormat().format(v2);
    const fmtDevices = (n2) => n2 === null ? "Unlimited" : `${n2} Device${n2 !== 1 ? "s" : ""}`;
    const fmtPrice = (p2) => {
      if (p2.price === 0) return "Rs0";
      return `Rs${new Intl.NumberFormat("en-PK", { minimumFractionDigits: 2 }).format(p2.price)}`;
    };
    const FEATURES = [
      { key: "map_scraping", label: "Unlimited Map Scraping", desc: "Scrape as many Google Maps results as you need", type: "bool", getter: (p2) => !p2.is_free },
      { key: "basic_signals", label: "Basic Business Signals", desc: "Name, address, category, rating, total reviews", type: "bool", getter: () => true },
      { key: "contact_ready", label: "Contact-Ready Leads", desc: "Verified phone & website data included", type: "bool", getter: () => true },
      { key: "email_scraping", label: "Email Scraping", desc: "Extract emails from business websites", type: "bool", getter: () => true },
      { key: "social_media", label: "Social Media Scraping", desc: "Facebook, Instagram, Twitter & more", type: "bool", getter: () => true },
      { key: "website_ext", label: "Website Extraction", desc: "Pull full website URLs from listings", type: "bool", getter: () => true },
      { key: "review_insights", label: "Latest Review Insights", desc: "Recent review text & sentiment signals", type: "bool", getter: () => true },
      { key: "review_filters", label: "Advanced Review Filters", desc: "Filter by rating, recency & keywords", type: "bool", getter: () => true },
      { key: "leads_limit", label: "Daily Leads Limit", desc: "Max leads you can collect per day", type: "pill", getter: (p2) => fmtLimit(p2.monthly_lead_limit) },
      { key: "exports", label: "Export Leads", desc: "Download leads as CSV / Excel", type: "pill", getter: (p2) => fmtLimit(p2.monthly_export_limit) },
      { key: "devices", label: "Devices Access", desc: "Number of devices that can access your account", type: "text", getter: (p2) => fmtDevices(p2.max_devices) },
      { key: "priority", label: "Priority Support", desc: "Fast-track support response", type: "bool", getter: (p2) => p2.priority_support }
    ];
    const statusBadge = (status) => ({
      pending_review: { cls: "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", icon: Clock, label: "Pending Review" },
      approved: { cls: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle, label: "Approved" },
      rejected: { cls: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: XCircle, label: "Rejected" }
    })[status] ?? { cls: "bg-surface-100 text-surface-600", icon: Clock, label: status };
    const fmtDate = (d2) => d2 ? new Date(d2).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";
    const showCancelModal = ref(false);
    const cancelling = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Billing & Plans" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
          if (_push2) {
            _push2(`<div class="w-full space-y-6"${_scopeId}>`);
            if (__props.is_on_trial) {
              _push2(`<div class="rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-5"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"${_scopeId}><div class="flex items-start gap-3"${_scopeId}><div class="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center flex-shrink-0"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Clock), { class: "h-5 w-5 text-orange-500" }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><p class="font-bold text-orange-800 dark:text-orange-300 text-base"${_scopeId}>Free Trial Active — Time Remaining</p><p class="text-xs text-orange-600 dark:text-orange-400 mt-0.5"${_scopeId}>Upgrade to a paid plan to keep full access after trial ends.</p></div></div>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("billing.checkout", ((_a = __props.plans.find((p2) => p2.is_featured)) == null ? void 0 : _a.id) ?? ((_b = __props.plans[1]) == null ? void 0 : _b.id) ?? ((_c = __props.plans[0]) == null ? void 0 : _c.id)),
                class: "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors flex-shrink-0 self-start sm:self-auto"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(ArrowUp), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Upgrade Now `);
                  } else {
                    return [
                      createVNode(unref(ArrowUp), { class: "h-4 w-4" }),
                      createTextVNode(" Upgrade Now ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="mt-4 flex items-center gap-3"${_scopeId}><!--[-->`);
              ssrRenderList([
                { val: pad(countdown.value.days), label: "DAYS" },
                { val: pad(countdown.value.hours), label: "HRS" },
                { val: pad(countdown.value.mins), label: "MIN" },
                { val: pad(countdown.value.secs), label: "SEC" }
              ], (unit, key) => {
                _push2(`<div class="text-center"${_scopeId}><div class="w-14 h-14 rounded-xl bg-white dark:bg-surface-900 border border-orange-200 dark:border-orange-800 flex items-center justify-center"${_scopeId}><span class="text-2xl font-black text-orange-600 dark:text-orange-400 tabular-nums"${_scopeId}>${ssrInterpolate(unit.val)}</span></div><p class="text-[10px] font-bold text-orange-500 mt-1 tracking-wider"${_scopeId}>${ssrInterpolate(unit.label)}</p></div>`);
              });
              _push2(`<!--]--><span class="text-2xl font-black text-orange-400 mb-5"${_scopeId}>:</span><div class="text-center"${_scopeId}><div class="w-14 h-14 rounded-xl bg-white dark:bg-surface-900 border border-orange-200 dark:border-orange-800 flex items-center justify-center"${_scopeId}><span class="text-2xl font-black text-orange-600 dark:text-orange-400 tabular-nums"${_scopeId}>${ssrInterpolate(pad(countdown.value.hours))}</span></div><p class="text-[10px] font-bold text-orange-500 mt-1 tracking-wider"${_scopeId}>HRS</p></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.subscription) {
              _push2(`<div class="card overflow-hidden"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-surface-100 dark:border-surface-800"${_scopeId}><div class="flex items-center gap-3 flex-wrap"${_scopeId}><span class="font-bold text-surface-900 dark:text-white text-base"${_scopeId}>Current Plan</span><span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"${_scopeId}><span class="w-1.5 h-1.5 rounded-full bg-green-500"${_scopeId}></span> ${ssrInterpolate(__props.subscription.plan.name)}</span>`);
              if (__props.is_on_trial) {
                _push2(`<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Clock), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(countdown.value.days)}d ${ssrInterpolate(pad(countdown.value.hours))}h ${ssrInterpolate(pad(countdown.value.mins))}m left </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex items-center gap-3"${_scopeId}>`);
              if (__props.subscription.ends_at) {
                _push2(`<span class="text-sm text-surface-500"${_scopeId}> Trial ends ${ssrInterpolate(__props.subscription.ends_at_formatted ?? fmtDate(__props.subscription.ends_at))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.is_on_trial) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("billing.checkout", ((_d = __props.plans.find((p2) => p2.is_featured)) == null ? void 0 : _d.id) ?? ((_e = __props.plans[1]) == null ? void 0 : _e.id) ?? ((_f = __props.plans[0]) == null ? void 0 : _f.id)),
                  class: "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(ArrowUp), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                      _push3(` Upgrade Now `);
                    } else {
                      return [
                        createVNode(unref(ArrowUp), { class: "h-4 w-4" }),
                        createTextVNode(" Upgrade Now ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
              if (currentPlan.value) {
                _push2(`<div class="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-surface-100 dark:divide-surface-800"${_scopeId}><div class="p-5"${_scopeId}><p class="text-[11px] font-semibold text-surface-400 uppercase tracking-wide mb-2"${_scopeId}>Daily Leads Limit</p><div class="flex items-center gap-1.5"${_scopeId}>`);
                if (currentPlan.value.monthly_lead_limit === null) {
                  _push2(ssrRenderComponent(unref(Infinity$1), { class: "h-6 w-6 text-surface-800 dark:text-white" }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<p class="text-xl font-black text-surface-900 dark:text-white"${_scopeId}>${ssrInterpolate(fmtLimit(currentPlan.value.monthly_lead_limit))}</p></div><p class="text-xs text-surface-400 mt-1"${_scopeId}>${ssrInterpolate(currentPlan.value.monthly_lead_limit === null ? "No daily limit on your plan" : "leads per month")}</p></div><div class="p-5"${_scopeId}><p class="text-[11px] font-semibold text-surface-400 uppercase tracking-wide mb-2"${_scopeId}>Export Leads</p><p class="text-xl font-black text-surface-900 dark:text-white"${_scopeId}>${ssrInterpolate(fmtLimit(currentPlan.value.monthly_export_limit))}</p><p class="text-xs text-surface-400 mt-1"${_scopeId}>CSV / Excel downloads</p></div><div class="p-5"${_scopeId}><p class="text-[11px] font-semibold text-surface-400 uppercase tracking-wide mb-2"${_scopeId}>Devices Access</p><p class="text-xl font-black text-surface-900 dark:text-white"${_scopeId}>${ssrInterpolate(fmtDevices(currentPlan.value.max_devices))}</p><p class="text-xs text-surface-400 mt-1"${_scopeId}>Simultaneous logins</p></div><div class="p-5"${_scopeId}><p class="text-[11px] font-semibold text-surface-400 uppercase tracking-wide mb-2"${_scopeId}>Priority Support</p>`);
                if (currentPlan.value.priority_support) {
                  _push2(`<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-semibold border border-green-200 dark:border-green-800"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                  _push2(` Included </span>`);
                } else {
                  _push2(`<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-500 text-sm font-semibold border border-surface-200 dark:border-surface-700"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(X), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                  _push2(` Not included </span>`);
                }
                _push2(`<p class="text-xs text-surface-400 mt-2"${_scopeId}>Fast-track support response</p></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="px-5 py-3 border-t border-surface-100 dark:border-surface-800 flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(["Basic Business Signals", "Contact-Ready Leads", "Email Scraping", "Social Media Scraping", "Website Extraction", "Latest Review Insights", "Advanced Review Filters"], (tag) => {
                _push2(`<span class="inline-flex items-center gap-1 text-xs text-green-700 dark:text-green-400 font-medium"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(tag)}</span>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}><h2 class="text-xl font-bold text-surface-900 dark:text-white mb-5"${_scopeId}>Choose Your Plan</h2><div class="flex items-center justify-center gap-2 mb-6"${_scopeId}><button class="${ssrRenderClass([
              "px-5 py-2 rounded-full text-sm font-semibold transition-colors",
              billingCycle.value === "monthly" ? "bg-primary-600 text-white shadow-sm" : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700"
            ])}"${_scopeId}> Monthly </button><button class="${ssrRenderClass([
              "px-5 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2",
              billingCycle.value === "yearly" ? "bg-primary-600 text-white shadow-sm" : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700"
            ])}"${_scopeId}> Yearly <span class="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold"${_scopeId}>Save 2 months</span></button></div><div class="grid grid-cols-1 md:grid-cols-3 gap-5"${_scopeId}><!--[-->`);
            ssrRenderList(__props.plans, (plan) => {
              var _a2, _b2, _c2, _d2, _e2, _f2;
              _push2(`<div class="${ssrRenderClass([
                "relative rounded-2xl border-2 p-6 flex flex-col transition-all",
                plan.is_featured ? "bg-primary-600 border-primary-600 text-white shadow-xl" : ((_b2 = (_a2 = __props.subscription) == null ? void 0 : _a2.plan) == null ? void 0 : _b2.id) === plan.id ? "border-green-500 bg-white dark:bg-surface-900" : "border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
              ])}"${_scopeId}>`);
              if (((_d2 = (_c2 = __props.subscription) == null ? void 0 : _c2.plan) == null ? void 0 : _d2.id) === plan.id) {
                _push2(`<div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-green-500 text-white text-xs font-bold shadow"${_scopeId}> Your Active Plan </div>`);
              } else if (plan.is_featured) {
                _push2(`<div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-orange-500 text-white text-xs font-bold shadow"${_scopeId}> Popular </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<h3 class="${ssrRenderClass(["text-xl font-bold", plan.is_featured ? "text-white" : "text-surface-900 dark:text-white"])}"${_scopeId}>${ssrInterpolate(plan.name)}</h3><p class="${ssrRenderClass(["text-sm mt-1 mb-4", plan.is_featured ? "text-primary-100" : "text-surface-500"])}"${_scopeId}>${ssrInterpolate(plan.description ?? "Access all features included in this plan.")}</p><div class="mb-5"${_scopeId}><span class="${ssrRenderClass(["text-3xl font-black", plan.is_featured ? "text-white" : "text-surface-900 dark:text-white"])}"${_scopeId}>${ssrInterpolate(fmtPrice(plan))}</span><span class="${ssrRenderClass(["text-sm font-medium", plan.is_featured ? "text-primary-200" : "text-surface-500"])}"${_scopeId}> /month </span></div><ul class="space-y-2.5 flex-1 mb-6"${_scopeId}><li class="flex items-center gap-2 text-sm"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle), {
                class: ["h-4 w-4 flex-shrink-0", plan.is_featured ? "text-primary-200" : "text-green-500"]
              }, null, _parent2, _scopeId));
              _push2(`<span class="${ssrRenderClass(plan.is_featured ? "text-white" : "text-surface-700 dark:text-surface-300")}"${_scopeId}> Daily Leads Limit: <strong${_scopeId}>${ssrInterpolate(fmtLimit(plan.monthly_lead_limit))}</strong></span></li><li class="flex items-center gap-2 text-sm"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle), {
                class: ["h-4 w-4 flex-shrink-0", plan.is_featured ? "text-primary-200" : "text-green-500"]
              }, null, _parent2, _scopeId));
              _push2(`<span class="${ssrRenderClass(plan.is_featured ? "text-white" : "text-surface-700 dark:text-surface-300")}"${_scopeId}> Export Leads: <strong${_scopeId}>${ssrInterpolate(fmtLimit(plan.monthly_export_limit))}</strong></span></li><li class="flex items-center gap-2 text-sm"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle), {
                class: ["h-4 w-4 flex-shrink-0", plan.is_featured ? "text-primary-200" : "text-green-500"]
              }, null, _parent2, _scopeId));
              _push2(`<span class="${ssrRenderClass(plan.is_featured ? "text-white" : "text-surface-700 dark:text-surface-300")}"${_scopeId}> Devices Access: <strong${_scopeId}>${ssrInterpolate(fmtDevices(plan.max_devices))}</strong></span></li><li class="flex items-center gap-2 text-sm"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(plan.priority_support ? unref(CheckCircle) : unref(X)), {
                class: [
                  "h-4 w-4 flex-shrink-0",
                  plan.is_featured ? plan.priority_support ? "text-primary-200" : "text-primary-300" : plan.priority_support ? "text-green-500" : "text-surface-400"
                ]
              }, null), _parent2, _scopeId);
              _push2(`<span class="${ssrRenderClass(plan.is_featured ? "text-white" : plan.priority_support ? "text-surface-700 dark:text-surface-300" : "text-surface-400")}"${_scopeId}> Priority Support </span></li></ul><div${_scopeId}>`);
              if (((_f2 = (_e2 = __props.subscription) == null ? void 0 : _e2.plan) == null ? void 0 : _f2.id) !== plan.id) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("billing.checkout", plan.id),
                  class: [
                    "w-full block text-center py-3 rounded-xl font-bold text-sm transition-colors",
                    plan.is_featured ? "bg-white text-primary-700 hover:bg-primary-50" : "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                  ]
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Get Started `);
                    } else {
                      return [
                        createTextVNode(" Get Started ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<button disabled class="w-full py-3 rounded-xl font-bold text-sm bg-surface-100 dark:bg-surface-800 text-surface-400 cursor-not-allowed"${_scopeId}> Current Plan </button>`);
              }
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div></div><div class="card overflow-hidden"${_scopeId}><div class="px-6 py-8 text-center border-b border-surface-100 dark:border-surface-800"${_scopeId}><p class="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2"${_scopeId}>What&#39;s Included</p><h2 class="text-2xl font-black text-surface-900 dark:text-white"${_scopeId}>Lead Intelligence by Plan</h2><p class="mt-2 text-sm text-surface-500 max-w-md mx-auto"${_scopeId}> Each plan unlocks deeper business data. See exactly what intelligence you get at every tier. </p></div><div class="overflow-x-auto"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead${_scopeId}><tr class="border-b border-surface-100 dark:border-surface-800"${_scopeId}><th class="px-6 py-4 text-left font-semibold text-surface-500 uppercase text-xs tracking-wide w-1/3"${_scopeId}>Feature</th><!--[-->`);
            ssrRenderList(__props.plans, (plan) => {
              _push2(`<th class="${ssrRenderClass(["px-4 py-4 text-center font-bold text-sm", plan.is_featured ? "text-primary-600 dark:text-primary-400" : "text-surface-900 dark:text-white"])}"${_scopeId}>${ssrInterpolate(plan.name)} <div class="${ssrRenderClass(["text-xs font-normal mt-0.5", plan.is_featured ? "text-primary-500" : "text-surface-400"])}"${_scopeId}>${ssrInterpolate(plan.price === 0 ? "Free" : `Rs${new Intl.NumberFormat("en-PK", { minimumFractionDigits: 2 }).format(plan.price)}/mo`)}</div></th>`);
            });
            _push2(`<!--]--></tr></thead><tbody class="divide-y divide-surface-100 dark:divide-surface-800"${_scopeId}><!--[-->`);
            ssrRenderList(FEATURES, (feat) => {
              _push2(`<tr class="hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors"${_scopeId}><td class="px-6 py-4"${_scopeId}><p class="font-medium text-surface-900 dark:text-white"${_scopeId}>${ssrInterpolate(feat.label)}</p><p class="text-xs text-surface-400 mt-0.5"${_scopeId}>${ssrInterpolate(feat.desc)}</p></td><!--[-->`);
              ssrRenderList(__props.plans, (plan) => {
                _push2(`<td class="px-4 py-4 text-center"${_scopeId}>`);
                if (feat.type === "bool") {
                  _push2(`<!--[-->`);
                  if (feat.getter(plan)) {
                    _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-5 w-5 text-green-500 mx-auto" }, null, _parent2, _scopeId));
                  } else {
                    _push2(ssrRenderComponent(unref(X), { class: "h-5 w-5 text-surface-300 mx-auto" }, null, _parent2, _scopeId));
                  }
                  _push2(`<!--]-->`);
                } else if (feat.type === "pill") {
                  _push2(`<span class="inline-block px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold border border-green-200 dark:border-green-800"${_scopeId}>${ssrInterpolate(feat.getter(plan))}</span>`);
                } else {
                  _push2(`<span class="text-sm font-semibold text-surface-700 dark:text-surface-300"${_scopeId}>${ssrInterpolate(feat.getter(plan))}</span>`);
                }
                _push2(`</td>`);
              });
              _push2(`<!--]--></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div><div class="card overflow-hidden"${_scopeId}><div class="flex items-center gap-3 px-6 py-4 border-b border-surface-100 dark:border-surface-800"${_scopeId}><div class="w-7 h-7 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ReceiptText), { class: "h-4 w-4 text-primary-600" }, null, _parent2, _scopeId));
            _push2(`</div><h2 class="font-bold text-surface-900 dark:text-white"${_scopeId}>Billing History</h2></div>`);
            if (__props.payments.length === 0) {
              _push2(`<div class="flex flex-col items-center justify-center py-16 text-center"${_scopeId}><div class="w-14 h-14 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ReceiptText), { class: "h-7 w-7 text-surface-300" }, null, _parent2, _scopeId));
              _push2(`</div><p class="font-semibold text-surface-700 dark:text-surface-300"${_scopeId}>No billing history yet</p><p class="text-sm text-surface-400 mt-1"${_scopeId}>Your payment history will appear here</p></div>`);
            } else {
              _push2(`<table class="w-full text-sm"${_scopeId}><thead class="bg-surface-50 dark:bg-surface-800/50"${_scopeId}><tr class="text-left border-b border-surface-100 dark:border-surface-800"${_scopeId}><th class="px-6 py-3 font-semibold text-surface-500 text-xs uppercase tracking-wide"${_scopeId}>Date</th><th class="px-4 py-3 font-semibold text-surface-500 text-xs uppercase tracking-wide"${_scopeId}>Plan</th><th class="px-4 py-3 font-semibold text-surface-500 text-xs uppercase tracking-wide"${_scopeId}>Amount</th><th class="px-4 py-3 font-semibold text-surface-500 text-xs uppercase tracking-wide"${_scopeId}>Status</th><th class="px-4 py-3 font-semibold text-surface-500 text-xs uppercase tracking-wide"${_scopeId}>Invoice</th></tr></thead><tbody class="divide-y divide-surface-100 dark:divide-surface-800"${_scopeId}><!--[-->`);
              ssrRenderList(__props.payments, (p2) => {
                _push2(`<tr class="hover:bg-surface-50 dark:hover:bg-surface-800/30"${_scopeId}><td class="px-6 py-3.5 text-surface-500"${_scopeId}>${ssrInterpolate(fmtDate(p2.created_at))}</td><td class="px-4 py-3.5 font-medium text-surface-900 dark:text-white"${_scopeId}>${ssrInterpolate(p2.plan_name)}</td><td class="px-4 py-3.5 font-semibold"${_scopeId}>${ssrInterpolate(p2.currency)} ${ssrInterpolate(Number(p2.amount).toLocaleString())}</td><td class="px-4 py-3.5"${_scopeId}><span class="${ssrRenderClass(["inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold", statusBadge(p2.status).cls])}"${_scopeId}>`);
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(statusBadge(p2.status).icon), { class: "h-3.5 w-3.5" }, null), _parent2, _scopeId);
                _push2(` ${ssrInterpolate(statusBadge(p2.status).label)}</span>`);
                if (p2.status === "rejected" && p2.rejection_reason) {
                  _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(p2.rejection_reason)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</td><td class="px-4 py-3.5"${_scopeId}>`);
                if (p2.has_invoice) {
                  _push2(`<a${ssrRenderAttr("href", _ctx.route("billing.invoice.download", p2.id))} class="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-xs font-medium"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Download), { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(p2.invoice_number)}</a>`);
                } else {
                  _push2(`<span class="text-surface-300 text-xs"${_scopeId}>—</span>`);
                }
                _push2(`</td></tr>`);
              });
              _push2(`<!--]--></tbody></table>`);
            }
            _push2(`</div>`);
            if (__props.subscription && !__props.is_on_trial) {
              _push2(`<div${_scopeId}><h2 class="font-bold text-surface-900 dark:text-white mb-4"${_scopeId}>Plan Management</h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("billing.index"),
                class: "flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm transition-colors"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(ArrowUp), { class: "h-5 w-5" }, null, _parent3, _scopeId2));
                    _push3(` Upgrade Plan `);
                  } else {
                    return [
                      createVNode(unref(ArrowUp), { class: "h-5 w-5" }),
                      createTextVNode(" Upgrade Plan ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<button class="flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent2, _scopeId));
              _push2(` Cancel Plan </button></div></div>`);
            } else if (__props.is_on_trial) {
              _push2(`<div${_scopeId}><h2 class="font-bold text-surface-900 dark:text-white mb-4"${_scopeId}>Plan Management</h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("billing.checkout", ((_g = __props.plans.find((p2) => p2.is_featured)) == null ? void 0 : _g.id) ?? ((_h = __props.plans[1]) == null ? void 0 : _h.id) ?? ((_i = __props.plans[0]) == null ? void 0 : _i.id)),
                class: "flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm transition-colors"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(ArrowUp), { class: "h-5 w-5" }, null, _parent3, _scopeId2));
                    _push3(` Upgrade Plan `);
                  } else {
                    return [
                      createVNode(unref(ArrowUp), { class: "h-5 w-5" }),
                      createTextVNode(" Upgrade Plan ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<button disabled class="flex items-center justify-center gap-2 py-4 rounded-2xl bg-surface-200 dark:bg-surface-800 text-surface-400 font-bold text-sm cursor-not-allowed"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent2, _scopeId));
              _push2(` Cancel Plan </button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "w-full space-y-6" }, [
                __props.is_on_trial ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-5"
                }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" }, [
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode("div", { class: "w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center flex-shrink-0" }, [
                        createVNode(unref(Clock), { class: "h-5 w-5 text-orange-500" })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "font-bold text-orange-800 dark:text-orange-300 text-base" }, "Free Trial Active — Time Remaining"),
                        createVNode("p", { class: "text-xs text-orange-600 dark:text-orange-400 mt-0.5" }, "Upgrade to a paid plan to keep full access after trial ends.")
                      ])
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("billing.checkout", ((_j = __props.plans.find((p2) => p2.is_featured)) == null ? void 0 : _j.id) ?? ((_k = __props.plans[1]) == null ? void 0 : _k.id) ?? ((_l = __props.plans[0]) == null ? void 0 : _l.id)),
                      class: "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors flex-shrink-0 self-start sm:self-auto"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowUp), { class: "h-4 w-4" }),
                        createTextVNode(" Upgrade Now ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "mt-4 flex items-center gap-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList([
                      { val: pad(countdown.value.days), label: "DAYS" },
                      { val: pad(countdown.value.hours), label: "HRS" },
                      { val: pad(countdown.value.mins), label: "MIN" },
                      { val: pad(countdown.value.secs), label: "SEC" }
                    ], (unit, key) => {
                      return openBlock(), createBlock("div", {
                        key,
                        class: "text-center"
                      }, [
                        createVNode("div", { class: "w-14 h-14 rounded-xl bg-white dark:bg-surface-900 border border-orange-200 dark:border-orange-800 flex items-center justify-center" }, [
                          createVNode("span", { class: "text-2xl font-black text-orange-600 dark:text-orange-400 tabular-nums" }, toDisplayString(unit.val), 1)
                        ]),
                        createVNode("p", { class: "text-[10px] font-bold text-orange-500 mt-1 tracking-wider" }, toDisplayString(unit.label), 1)
                      ]);
                    }), 128)),
                    createVNode("span", { class: "text-2xl font-black text-orange-400 mb-5" }, ":"),
                    createVNode("div", { class: "text-center" }, [
                      createVNode("div", { class: "w-14 h-14 rounded-xl bg-white dark:bg-surface-900 border border-orange-200 dark:border-orange-800 flex items-center justify-center" }, [
                        createVNode("span", { class: "text-2xl font-black text-orange-600 dark:text-orange-400 tabular-nums" }, toDisplayString(pad(countdown.value.hours)), 1)
                      ]),
                      createVNode("p", { class: "text-[10px] font-bold text-orange-500 mt-1 tracking-wider" }, "HRS")
                    ])
                  ])
                ])) : createCommentVNode("", true),
                __props.subscription ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "card overflow-hidden"
                }, [
                  createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-surface-100 dark:border-surface-800" }, [
                    createVNode("div", { class: "flex items-center gap-3 flex-wrap" }, [
                      createVNode("span", { class: "font-bold text-surface-900 dark:text-white text-base" }, "Current Plan"),
                      createVNode("span", { class: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800" }, [
                        createVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-green-500" }),
                        createTextVNode(" " + toDisplayString(__props.subscription.plan.name), 1)
                      ]),
                      __props.is_on_trial ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800"
                      }, [
                        createVNode(unref(Clock), { class: "h-3 w-3" }),
                        createTextVNode(" " + toDisplayString(countdown.value.days) + "d " + toDisplayString(pad(countdown.value.hours)) + "h " + toDisplayString(pad(countdown.value.mins)) + "m left ", 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      __props.subscription.ends_at ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "text-sm text-surface-500"
                      }, " Trial ends " + toDisplayString(__props.subscription.ends_at_formatted ?? fmtDate(__props.subscription.ends_at)), 1)) : createCommentVNode("", true),
                      __props.is_on_trial ? (openBlock(), createBlock(unref(Link), {
                        key: 1,
                        href: _ctx.route("billing.checkout", ((_m = __props.plans.find((p2) => p2.is_featured)) == null ? void 0 : _m.id) ?? ((_n = __props.plans[1]) == null ? void 0 : _n.id) ?? ((_o = __props.plans[0]) == null ? void 0 : _o.id)),
                        class: "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowUp), { class: "h-4 w-4" }),
                          createTextVNode(" Upgrade Now ")
                        ]),
                        _: 1
                      }, 8, ["href"])) : createCommentVNode("", true)
                    ])
                  ]),
                  currentPlan.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-surface-100 dark:divide-surface-800"
                  }, [
                    createVNode("div", { class: "p-5" }, [
                      createVNode("p", { class: "text-[11px] font-semibold text-surface-400 uppercase tracking-wide mb-2" }, "Daily Leads Limit"),
                      createVNode("div", { class: "flex items-center gap-1.5" }, [
                        currentPlan.value.monthly_lead_limit === null ? (openBlock(), createBlock(unref(Infinity$1), {
                          key: 0,
                          class: "h-6 w-6 text-surface-800 dark:text-white"
                        })) : createCommentVNode("", true),
                        createVNode("p", { class: "text-xl font-black text-surface-900 dark:text-white" }, toDisplayString(fmtLimit(currentPlan.value.monthly_lead_limit)), 1)
                      ]),
                      createVNode("p", { class: "text-xs text-surface-400 mt-1" }, toDisplayString(currentPlan.value.monthly_lead_limit === null ? "No daily limit on your plan" : "leads per month"), 1)
                    ]),
                    createVNode("div", { class: "p-5" }, [
                      createVNode("p", { class: "text-[11px] font-semibold text-surface-400 uppercase tracking-wide mb-2" }, "Export Leads"),
                      createVNode("p", { class: "text-xl font-black text-surface-900 dark:text-white" }, toDisplayString(fmtLimit(currentPlan.value.monthly_export_limit)), 1),
                      createVNode("p", { class: "text-xs text-surface-400 mt-1" }, "CSV / Excel downloads")
                    ]),
                    createVNode("div", { class: "p-5" }, [
                      createVNode("p", { class: "text-[11px] font-semibold text-surface-400 uppercase tracking-wide mb-2" }, "Devices Access"),
                      createVNode("p", { class: "text-xl font-black text-surface-900 dark:text-white" }, toDisplayString(fmtDevices(currentPlan.value.max_devices)), 1),
                      createVNode("p", { class: "text-xs text-surface-400 mt-1" }, "Simultaneous logins")
                    ]),
                    createVNode("div", { class: "p-5" }, [
                      createVNode("p", { class: "text-[11px] font-semibold text-surface-400 uppercase tracking-wide mb-2" }, "Priority Support"),
                      currentPlan.value.priority_support ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-semibold border border-green-200 dark:border-green-800"
                      }, [
                        createVNode(unref(CheckCircle), { class: "h-4 w-4" }),
                        createTextVNode(" Included ")
                      ])) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-500 text-sm font-semibold border border-surface-200 dark:border-surface-700"
                      }, [
                        createVNode(unref(X), { class: "h-4 w-4" }),
                        createTextVNode(" Not included ")
                      ])),
                      createVNode("p", { class: "text-xs text-surface-400 mt-2" }, "Fast-track support response")
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "px-5 py-3 border-t border-surface-100 dark:border-surface-800 flex flex-wrap gap-2" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(["Basic Business Signals", "Contact-Ready Leads", "Email Scraping", "Social Media Scraping", "Website Extraction", "Latest Review Insights", "Advanced Review Filters"], (tag) => {
                      return createVNode("span", {
                        key: tag,
                        class: "inline-flex items-center gap-1 text-xs text-green-700 dark:text-green-400 font-medium"
                      }, [
                        createVNode(unref(CheckCircle), { class: "h-3.5 w-3.5" }),
                        createTextVNode(" " + toDisplayString(tag), 1)
                      ]);
                    }), 64))
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", null, [
                  createVNode("h2", { class: "text-xl font-bold text-surface-900 dark:text-white mb-5" }, "Choose Your Plan"),
                  createVNode("div", { class: "flex items-center justify-center gap-2 mb-6" }, [
                    createVNode("button", {
                      onClick: ($event) => billingCycle.value = "monthly",
                      class: [
                        "px-5 py-2 rounded-full text-sm font-semibold transition-colors",
                        billingCycle.value === "monthly" ? "bg-primary-600 text-white shadow-sm" : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700"
                      ]
                    }, " Monthly ", 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => billingCycle.value = "yearly",
                      class: [
                        "px-5 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2",
                        billingCycle.value === "yearly" ? "bg-primary-600 text-white shadow-sm" : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700"
                      ]
                    }, [
                      createTextVNode(" Yearly "),
                      createVNode("span", { class: "px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold" }, "Save 2 months")
                    ], 10, ["onClick"])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-5" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.plans, (plan) => {
                      var _a2, _b2, _c2, _d2, _e2, _f2;
                      return openBlock(), createBlock("div", {
                        key: plan.id,
                        class: [
                          "relative rounded-2xl border-2 p-6 flex flex-col transition-all",
                          plan.is_featured ? "bg-primary-600 border-primary-600 text-white shadow-xl" : ((_b2 = (_a2 = __props.subscription) == null ? void 0 : _a2.plan) == null ? void 0 : _b2.id) === plan.id ? "border-green-500 bg-white dark:bg-surface-900" : "border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        ]
                      }, [
                        ((_d2 = (_c2 = __props.subscription) == null ? void 0 : _c2.plan) == null ? void 0 : _d2.id) === plan.id ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-green-500 text-white text-xs font-bold shadow"
                        }, " Your Active Plan ")) : plan.is_featured ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-orange-500 text-white text-xs font-bold shadow"
                        }, " Popular ")) : createCommentVNode("", true),
                        createVNode("h3", {
                          class: ["text-xl font-bold", plan.is_featured ? "text-white" : "text-surface-900 dark:text-white"]
                        }, toDisplayString(plan.name), 3),
                        createVNode("p", {
                          class: ["text-sm mt-1 mb-4", plan.is_featured ? "text-primary-100" : "text-surface-500"]
                        }, toDisplayString(plan.description ?? "Access all features included in this plan."), 3),
                        createVNode("div", { class: "mb-5" }, [
                          createVNode("span", {
                            class: ["text-3xl font-black", plan.is_featured ? "text-white" : "text-surface-900 dark:text-white"]
                          }, toDisplayString(fmtPrice(plan)), 3),
                          createVNode("span", {
                            class: ["text-sm font-medium", plan.is_featured ? "text-primary-200" : "text-surface-500"]
                          }, " /month ", 2)
                        ]),
                        createVNode("ul", { class: "space-y-2.5 flex-1 mb-6" }, [
                          createVNode("li", { class: "flex items-center gap-2 text-sm" }, [
                            createVNode(unref(CheckCircle), {
                              class: ["h-4 w-4 flex-shrink-0", plan.is_featured ? "text-primary-200" : "text-green-500"]
                            }, null, 8, ["class"]),
                            createVNode("span", {
                              class: plan.is_featured ? "text-white" : "text-surface-700 dark:text-surface-300"
                            }, [
                              createTextVNode(" Daily Leads Limit: "),
                              createVNode("strong", null, toDisplayString(fmtLimit(plan.monthly_lead_limit)), 1)
                            ], 2)
                          ]),
                          createVNode("li", { class: "flex items-center gap-2 text-sm" }, [
                            createVNode(unref(CheckCircle), {
                              class: ["h-4 w-4 flex-shrink-0", plan.is_featured ? "text-primary-200" : "text-green-500"]
                            }, null, 8, ["class"]),
                            createVNode("span", {
                              class: plan.is_featured ? "text-white" : "text-surface-700 dark:text-surface-300"
                            }, [
                              createTextVNode(" Export Leads: "),
                              createVNode("strong", null, toDisplayString(fmtLimit(plan.monthly_export_limit)), 1)
                            ], 2)
                          ]),
                          createVNode("li", { class: "flex items-center gap-2 text-sm" }, [
                            createVNode(unref(CheckCircle), {
                              class: ["h-4 w-4 flex-shrink-0", plan.is_featured ? "text-primary-200" : "text-green-500"]
                            }, null, 8, ["class"]),
                            createVNode("span", {
                              class: plan.is_featured ? "text-white" : "text-surface-700 dark:text-surface-300"
                            }, [
                              createTextVNode(" Devices Access: "),
                              createVNode("strong", null, toDisplayString(fmtDevices(plan.max_devices)), 1)
                            ], 2)
                          ]),
                          createVNode("li", { class: "flex items-center gap-2 text-sm" }, [
                            (openBlock(), createBlock(resolveDynamicComponent(plan.priority_support ? unref(CheckCircle) : unref(X)), {
                              class: [
                                "h-4 w-4 flex-shrink-0",
                                plan.is_featured ? plan.priority_support ? "text-primary-200" : "text-primary-300" : plan.priority_support ? "text-green-500" : "text-surface-400"
                              ]
                            }, null, 8, ["class"])),
                            createVNode("span", {
                              class: plan.is_featured ? "text-white" : plan.priority_support ? "text-surface-700 dark:text-surface-300" : "text-surface-400"
                            }, " Priority Support ", 2)
                          ])
                        ]),
                        createVNode("div", null, [
                          ((_f2 = (_e2 = __props.subscription) == null ? void 0 : _e2.plan) == null ? void 0 : _f2.id) !== plan.id ? (openBlock(), createBlock(unref(Link), {
                            key: 0,
                            href: _ctx.route("billing.checkout", plan.id),
                            class: [
                              "w-full block text-center py-3 rounded-xl font-bold text-sm transition-colors",
                              plan.is_featured ? "bg-white text-primary-700 hover:bg-primary-50" : "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                            ]
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Get Started ")
                            ]),
                            _: 1
                          }, 8, ["href", "class"])) : (openBlock(), createBlock("button", {
                            key: 1,
                            disabled: "",
                            class: "w-full py-3 rounded-xl font-bold text-sm bg-surface-100 dark:bg-surface-800 text-surface-400 cursor-not-allowed"
                          }, " Current Plan "))
                        ])
                      ], 2);
                    }), 128))
                  ])
                ]),
                createVNode("div", { class: "card overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-8 text-center border-b border-surface-100 dark:border-surface-800" }, [
                    createVNode("p", { class: "text-xs font-bold text-orange-500 uppercase tracking-widest mb-2" }, "What's Included"),
                    createVNode("h2", { class: "text-2xl font-black text-surface-900 dark:text-white" }, "Lead Intelligence by Plan"),
                    createVNode("p", { class: "mt-2 text-sm text-surface-500 max-w-md mx-auto" }, " Each plan unlocks deeper business data. See exactly what intelligence you get at every tier. ")
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full text-sm" }, [
                      createVNode("thead", null, [
                        createVNode("tr", { class: "border-b border-surface-100 dark:border-surface-800" }, [
                          createVNode("th", { class: "px-6 py-4 text-left font-semibold text-surface-500 uppercase text-xs tracking-wide w-1/3" }, "Feature"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.plans, (plan) => {
                            return openBlock(), createBlock("th", {
                              key: plan.id,
                              class: ["px-4 py-4 text-center font-bold text-sm", plan.is_featured ? "text-primary-600 dark:text-primary-400" : "text-surface-900 dark:text-white"]
                            }, [
                              createTextVNode(toDisplayString(plan.name) + " ", 1),
                              createVNode("div", {
                                class: ["text-xs font-normal mt-0.5", plan.is_featured ? "text-primary-500" : "text-surface-400"]
                              }, toDisplayString(plan.price === 0 ? "Free" : `Rs${new Intl.NumberFormat("en-PK", { minimumFractionDigits: 2 }).format(plan.price)}/mo`), 3)
                            ], 2);
                          }), 128))
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-surface-100 dark:divide-surface-800" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(FEATURES, (feat) => {
                          return createVNode("tr", {
                            key: feat.key,
                            class: "hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("p", { class: "font-medium text-surface-900 dark:text-white" }, toDisplayString(feat.label), 1),
                              createVNode("p", { class: "text-xs text-surface-400 mt-0.5" }, toDisplayString(feat.desc), 1)
                            ]),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.plans, (plan) => {
                              return openBlock(), createBlock("td", {
                                key: plan.id,
                                class: "px-4 py-4 text-center"
                              }, [
                                feat.type === "bool" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  feat.getter(plan) ? (openBlock(), createBlock(unref(CheckCircle), {
                                    key: 0,
                                    class: "h-5 w-5 text-green-500 mx-auto"
                                  })) : (openBlock(), createBlock(unref(X), {
                                    key: 1,
                                    class: "h-5 w-5 text-surface-300 mx-auto"
                                  }))
                                ], 64)) : feat.type === "pill" ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "inline-block px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold border border-green-200 dark:border-green-800"
                                }, toDisplayString(feat.getter(plan)), 1)) : (openBlock(), createBlock("span", {
                                  key: 2,
                                  class: "text-sm font-semibold text-surface-700 dark:text-surface-300"
                                }, toDisplayString(feat.getter(plan)), 1))
                              ]);
                            }), 128))
                          ]);
                        }), 64))
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "card overflow-hidden" }, [
                  createVNode("div", { class: "flex items-center gap-3 px-6 py-4 border-b border-surface-100 dark:border-surface-800" }, [
                    createVNode("div", { class: "w-7 h-7 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0" }, [
                      createVNode(unref(ReceiptText), { class: "h-4 w-4 text-primary-600" })
                    ]),
                    createVNode("h2", { class: "font-bold text-surface-900 dark:text-white" }, "Billing History")
                  ]),
                  __props.payments.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex flex-col items-center justify-center py-16 text-center"
                  }, [
                    createVNode("div", { class: "w-14 h-14 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-3" }, [
                      createVNode(unref(ReceiptText), { class: "h-7 w-7 text-surface-300" })
                    ]),
                    createVNode("p", { class: "font-semibold text-surface-700 dark:text-surface-300" }, "No billing history yet"),
                    createVNode("p", { class: "text-sm text-surface-400 mt-1" }, "Your payment history will appear here")
                  ])) : (openBlock(), createBlock("table", {
                    key: 1,
                    class: "w-full text-sm"
                  }, [
                    createVNode("thead", { class: "bg-surface-50 dark:bg-surface-800/50" }, [
                      createVNode("tr", { class: "text-left border-b border-surface-100 dark:border-surface-800" }, [
                        createVNode("th", { class: "px-6 py-3 font-semibold text-surface-500 text-xs uppercase tracking-wide" }, "Date"),
                        createVNode("th", { class: "px-4 py-3 font-semibold text-surface-500 text-xs uppercase tracking-wide" }, "Plan"),
                        createVNode("th", { class: "px-4 py-3 font-semibold text-surface-500 text-xs uppercase tracking-wide" }, "Amount"),
                        createVNode("th", { class: "px-4 py-3 font-semibold text-surface-500 text-xs uppercase tracking-wide" }, "Status"),
                        createVNode("th", { class: "px-4 py-3 font-semibold text-surface-500 text-xs uppercase tracking-wide" }, "Invoice")
                      ])
                    ]),
                    createVNode("tbody", { class: "divide-y divide-surface-100 dark:divide-surface-800" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.payments, (p2) => {
                        return openBlock(), createBlock("tr", {
                          key: p2.id,
                          class: "hover:bg-surface-50 dark:hover:bg-surface-800/30"
                        }, [
                          createVNode("td", { class: "px-6 py-3.5 text-surface-500" }, toDisplayString(fmtDate(p2.created_at)), 1),
                          createVNode("td", { class: "px-4 py-3.5 font-medium text-surface-900 dark:text-white" }, toDisplayString(p2.plan_name), 1),
                          createVNode("td", { class: "px-4 py-3.5 font-semibold" }, toDisplayString(p2.currency) + " " + toDisplayString(Number(p2.amount).toLocaleString()), 1),
                          createVNode("td", { class: "px-4 py-3.5" }, [
                            createVNode("span", {
                              class: ["inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold", statusBadge(p2.status).cls]
                            }, [
                              (openBlock(), createBlock(resolveDynamicComponent(statusBadge(p2.status).icon), { class: "h-3.5 w-3.5" })),
                              createTextVNode(" " + toDisplayString(statusBadge(p2.status).label), 1)
                            ], 2),
                            p2.status === "rejected" && p2.rejection_reason ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 text-xs text-red-600"
                            }, toDisplayString(p2.rejection_reason), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("td", { class: "px-4 py-3.5" }, [
                            p2.has_invoice ? (openBlock(), createBlock("a", {
                              key: 0,
                              href: _ctx.route("billing.invoice.download", p2.id),
                              class: "inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-xs font-medium"
                            }, [
                              createVNode(unref(Download), { class: "h-3.5 w-3.5" }),
                              createTextVNode(" " + toDisplayString(p2.invoice_number), 1)
                            ], 8, ["href"])) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "text-surface-300 text-xs"
                            }, "—"))
                          ])
                        ]);
                      }), 128))
                    ])
                  ]))
                ]),
                __props.subscription && !__props.is_on_trial ? (openBlock(), createBlock("div", { key: 2 }, [
                  createVNode("h2", { class: "font-bold text-surface-900 dark:text-white mb-4" }, "Plan Management"),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("billing.index"),
                      class: "flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm transition-colors"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowUp), { class: "h-5 w-5" }),
                        createTextVNode(" Upgrade Plan ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("button", {
                      onClick: ($event) => showCancelModal.value = true,
                      class: "flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors"
                    }, [
                      createVNode(unref(X), { class: "h-5 w-5" }),
                      createTextVNode(" Cancel Plan ")
                    ], 8, ["onClick"])
                  ])
                ])) : __props.is_on_trial ? (openBlock(), createBlock("div", { key: 3 }, [
                  createVNode("h2", { class: "font-bold text-surface-900 dark:text-white mb-4" }, "Plan Management"),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("billing.checkout", ((_p = __props.plans.find((p2) => p2.is_featured)) == null ? void 0 : _p.id) ?? ((_q = __props.plans[1]) == null ? void 0 : _q.id) ?? ((_r = __props.plans[0]) == null ? void 0 : _r.id)),
                      class: "flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm transition-colors"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowUp), { class: "h-5 w-5" }),
                        createTextVNode(" Upgrade Plan ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("button", {
                      disabled: "",
                      class: "flex items-center justify-center gap-2 py-4 rounded-2xl bg-surface-200 dark:bg-surface-800 text-surface-400 font-bold text-sm cursor-not-allowed"
                    }, [
                      createVNode(unref(X), { class: "h-5 w-5" }),
                      createTextVNode(" Cancel Plan ")
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      ssrRenderTeleport(_push, (_push2) => {
        if (showCancelModal.value) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4"><div class="fixed inset-0 bg-black/50 backdrop-blur-sm"></div><div class="relative bg-white dark:bg-surface-900 rounded-2xl shadow-2xl p-6 w-full max-w-md"><div class="flex items-center gap-3 mb-4"><div class="w-11 h-11 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">`);
          _push2(ssrRenderComponent(unref(X), { class: "h-5 w-5 text-red-600" }, null, _parent));
          _push2(`</div><div><h3 class="font-bold text-surface-900 dark:text-white">Cancel Subscription</h3><p class="text-xs text-surface-500">This action cannot be undone</p></div></div><p class="text-sm text-surface-600 dark:text-surface-300 mb-6"> Are you sure you want to cancel your plan? You&#39;ll lose access to premium features at the end of your current billing period. </p><div class="flex gap-3"><button class="flex-1 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 font-semibold text-sm hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"> Keep Plan </button><button${ssrIncludeBooleanAttr(cancelling.value) ? " disabled" : ""} class="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors disabled:opacity-60">${ssrInterpolate(cancelling.value ? "Cancelling…" : "Yes, Cancel")}</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Billing/Index.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$q
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$p = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    stats: Object,
    plan_info: Object,
    recent_searches: Array,
    recent_leads: Array
  },
  setup(__props) {
    const page = usePage();
    const userName = computed(() => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = page.props.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.name) == null ? void 0 : _c.split(" ")[0]) ?? "there";
    });
    const props = __props;
    const fmt = (n2) => new Intl.NumberFormat().format(n2 ?? 0);
    const leadsLabel = computed(() => {
      if (!props.plan_info) return "—";
      return props.plan_info.monthly_lead_limit === null ? "Unlimited" : fmt(props.plan_info.monthly_lead_limit);
    });
    const exportsLabel = computed(() => {
      if (!props.plan_info) return "—";
      return props.plan_info.monthly_export_limit === null ? "Unlimited" : fmt(props.plan_info.monthly_export_limit);
    });
    computed(() => {
      if (!props.plan_info) return "—";
      const n2 = props.plan_info.max_devices;
      return n2 === null ? "Unlimited" : `${n2} Device${n2 !== 1 ? "s" : ""}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="w-full space-y-6"${_scopeId}><div class="rounded-2xl bg-primary-600 p-6 text-white"${_scopeId}><h1 class="text-2xl font-black"${_scopeId}>Welcome back, ${ssrInterpolate(userName.value)}!</h1><p class="mt-1 text-primary-200 text-sm"${_scopeId}>${ssrInterpolate(((_a = __props.plan_info) == null ? void 0 : _a.monthly_lead_limit) === null ? "You have unlimited leads today." : `You have ${fmt(((_b = __props.plan_info) == null ? void 0 : _b.monthly_lead_limit) ?? 0)} leads available.`)} Start building your business network! </p><div class="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"${_scopeId}><!--[-->`);
            ssrRenderList([
              { num: 1, icon: unref(Search), title: "Search GMB Leads", desc: "Pick your country, state, city, and a search keyword. Set radius, minimum rating, review count, and required contact fields." },
              { num: 2, icon: unref(BookmarkIcon), title: "Filter & Save", desc: "Our scraper pulls fresh GMB listings. Filter further by AI category (Hot, SEO Weak, Inactive) and save the ones you want." },
              { num: 3, icon: unref(ArrowDownToLine), title: "Export Anywhere", desc: "Export to CSV or XLSX with custom column selection. Push directly into your CRM, cold email tool, or outreach sequence." },
              { num: 4, icon: unref(Puzzle), title: "Contact Businesses", desc: "Use the verified phone, email, and website data to reach out. Track status: New → Contacted → Responded → Converted." }
            ], (step) => {
              _push2(`<div class="rounded-xl bg-white/10 hover:bg-white/15 transition-colors p-4 flex items-start gap-3"${_scopeId}><div class="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(step.icon), { class: "h-5 w-5 text-white" }, null), _parent2, _scopeId);
              _push2(`</div><div${_scopeId}><p class="font-bold text-white text-sm"${_scopeId}>${ssrInterpolate(step.num)}. ${ssrInterpolate(step.title)}</p><p class="text-primary-200 text-xs mt-0.5 leading-relaxed"${_scopeId}>${ssrInterpolate(step.desc)}</p></div></div>`);
            });
            _push2(`<!--]--></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("leads.search.create"),
              class: "card p-5 flex items-center gap-4 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 transition-all group"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Search), { class: "h-7 w-7 text-blue-500" }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex-1 min-w-0"${_scopeId2}><p class="font-bold text-surface-900 dark:text-white text-base"${_scopeId2}>Find Leads</p><p class="text-sm text-surface-500"${_scopeId2}>Search for new businesses</p></div>`);
                  _push3(ssrRenderComponent(unref(ChevronRight), { class: "h-5 w-5 text-surface-300 group-hover:text-primary-500 transition-colors flex-shrink-0" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0" }, [
                      createVNode(unref(Search), { class: "h-7 w-7 text-blue-500" })
                    ]),
                    createVNode("div", { class: "flex-1 min-w-0" }, [
                      createVNode("p", { class: "font-bold text-surface-900 dark:text-white text-base" }, "Find Leads"),
                      createVNode("p", { class: "text-sm text-surface-500" }, "Search for new businesses")
                    ]),
                    createVNode(unref(ChevronRight), { class: "h-5 w-5 text-surface-300 group-hover:text-primary-500 transition-colors flex-shrink-0" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("leads.index"),
              class: "card p-5 flex items-center gap-4 hover:shadow-md hover:border-green-200 dark:hover:border-green-700 transition-all group"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Bookmark), { class: "h-7 w-7 text-green-600" }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex-1 min-w-0"${_scopeId2}><p class="font-bold text-surface-900 dark:text-white text-base"${_scopeId2}>My Leads</p><p class="text-sm text-surface-500"${_scopeId2}>View your saved leads</p></div>`);
                  _push3(ssrRenderComponent(unref(ChevronRight), { class: "h-5 w-5 text-surface-300 group-hover:text-green-500 transition-colors flex-shrink-0" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0" }, [
                      createVNode(unref(Bookmark), { class: "h-7 w-7 text-green-600" })
                    ]),
                    createVNode("div", { class: "flex-1 min-w-0" }, [
                      createVNode("p", { class: "font-bold text-surface-900 dark:text-white text-base" }, "My Leads"),
                      createVNode("p", { class: "text-sm text-surface-500" }, "View your saved leads")
                    ]),
                    createVNode(unref(ChevronRight), { class: "h-5 w-5 text-surface-300 group-hover:text-green-500 transition-colors flex-shrink-0" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.plan_info) {
              _push2(`<div class="card overflow-hidden"${_scopeId}><div class="flex items-center justify-between px-5 py-4 border-b border-surface-100 dark:border-surface-800"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Wallet), { class: "h-4 w-4 text-orange-500" }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><p class="font-bold text-surface-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.plan_info.name)}</p>`);
              if (__props.plan_info.expires_at) {
                _push2(`<div class="flex items-center gap-2 mt-0.5"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Calendar), { class: "h-3.5 w-3.5 text-surface-400" }, null, _parent2, _scopeId));
                _push2(`<span class="text-xs text-surface-500"${_scopeId}>Expires:</span><span class="text-xs font-semibold text-orange-500"${_scopeId}>${ssrInterpolate(__props.plan_info.expires_at)}</span><span class="text-xs text-surface-400"${_scopeId}>(${ssrInterpolate(__props.plan_info.expires_human)})</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("billing.index"),
                class: "text-sm font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` View Plan `);
                  } else {
                    return [
                      createTextVNode(" View Plan ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-surface-100 dark:divide-surface-800"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center gap-2 mb-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(MapPin), { class: "h-4 w-4 text-orange-400" }, null, _parent2, _scopeId));
              _push2(`<span class="text-xs font-semibold text-surface-500 uppercase tracking-wide"${_scopeId}>Daily Leads Limit</span></div><p class="text-2xl font-black text-surface-900 dark:text-white"${_scopeId}>${ssrInterpolate(leadsLabel.value)}</p><p class="text-xs text-surface-400 mt-1"${_scopeId}>${ssrInterpolate(__props.plan_info.monthly_lead_limit === null ? "No daily limit on your plan" : "leads per month")}</p></div><div class="p-5"${_scopeId}><div class="flex items-center gap-2 mb-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Download), { class: "h-4 w-4 text-green-500" }, null, _parent2, _scopeId));
              _push2(`<span class="text-xs font-semibold text-surface-500 uppercase tracking-wide"${_scopeId}>Export Leads</span></div><p class="text-2xl font-black text-surface-900 dark:text-white"${_scopeId}>${ssrInterpolate(exportsLabel.value)}</p><p class="text-xs text-surface-400 mt-1"${_scopeId}>CSV / Excel downloads</p></div><div class="p-5"${_scopeId}><div class="flex items-center gap-2 mb-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Monitor), { class: "h-4 w-4 text-blue-500" }, null, _parent2, _scopeId));
              _push2(`<span class="text-xs font-semibold text-surface-500 uppercase tracking-wide"${_scopeId}>Devices Access</span></div><p class="text-2xl font-black text-surface-900 dark:text-white"${_scopeId}><span${_scopeId}>${ssrInterpolate(__props.plan_info.max_devices === null ? "Unlimited" : __props.plan_info.max_devices)}</span>`);
              if (__props.plan_info.max_devices !== null) {
                _push2(`<span class="text-base font-semibold text-surface-600 dark:text-surface-400 ml-1"${_scopeId}> Device${ssrInterpolate(__props.plan_info.max_devices !== 1 ? "s" : "")}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</p><p class="text-xs text-surface-400 mt-1"${_scopeId}>Simultaneous logins</p></div><div class="p-5"${_scopeId}><div class="flex items-center gap-2 mb-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Headphones), { class: "h-4 w-4 text-purple-500" }, null, _parent2, _scopeId));
              _push2(`<span class="text-xs font-semibold text-surface-500 uppercase tracking-wide"${_scopeId}>Priority Support</span></div>`);
              if (__props.plan_info.priority_support) {
                _push2(`<div class="flex items-center gap-2 mt-1"${_scopeId}><span class="inline-flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-semibold px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                _push2(` Included </span></div>`);
              } else {
                _push2(`<div class="flex items-center gap-2 mt-1"${_scopeId}><span class="inline-flex items-center gap-1.5 bg-surface-100 dark:bg-surface-800 text-surface-500 text-sm font-semibold px-3 py-1.5 rounded-full border border-surface-200 dark:border-surface-700"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(X), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                _push2(` Not included </span></div>`);
              }
              _push2(`<p class="text-xs text-surface-400 mt-2"${_scopeId}>Fast-track support response</p></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid grid-cols-2 lg:grid-cols-4 gap-4"${_scopeId}><div class="card p-5"${_scopeId}><div class="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 w-fit"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Users), { class: "h-5 w-5 text-primary-600" }, null, _parent2, _scopeId));
            _push2(`</div><p class="mt-3 text-2xl font-bold"${_scopeId}>${ssrInterpolate(fmt(__props.stats.total_leads))}</p><p class="text-xs text-surface-500 mt-0.5"${_scopeId}>Total Leads</p></div><div class="card p-5"${_scopeId}><div class="p-2 rounded-lg bg-green-50 dark:bg-green-900/30 w-fit"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Calendar), { class: "h-5 w-5 text-green-600" }, null, _parent2, _scopeId));
            _push2(`</div><p class="mt-3 text-2xl font-bold"${_scopeId}>${ssrInterpolate(fmt(__props.stats.today_leads))}</p><p class="text-xs text-surface-500 mt-0.5"${_scopeId}>Today&#39;s Leads</p></div><div class="card p-5"${_scopeId}><div class="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/30 w-fit"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Star), { class: "h-5 w-5 text-orange-500" }, null, _parent2, _scopeId));
            _push2(`</div><p class="mt-3 text-2xl font-bold"${_scopeId}>${ssrInterpolate(fmt(__props.stats.hot_leads))}</p><p class="text-xs text-surface-500 mt-0.5"${_scopeId}>Hot Leads</p></div><div class="card p-5"${_scopeId}><div class="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 w-fit"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Wallet), { class: "h-5 w-5 text-purple-600" }, null, _parent2, _scopeId));
            _push2(`</div><p class="mt-3 text-2xl font-bold"${_scopeId}>PKR ${ssrInterpolate(fmt(__props.stats.affiliate_balance))}</p><p class="text-xs text-surface-500 mt-0.5"${_scopeId}>Affiliate Balance</p></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"${_scopeId}><div class="card p-5"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h2 class="font-semibold text-surface-900 dark:text-white"${_scopeId}>Recent Searches</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("leads.searches.index"),
              class: "text-xs text-primary-600 hover:underline"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`View all`);
                } else {
                  return [
                    createTextVNode("View all")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.recent_searches.length === 0) {
              _push2(`<div class="flex flex-col items-center justify-center py-10 text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Search), { class: "h-8 w-8 text-surface-200 mb-2" }, null, _parent2, _scopeId));
              _push2(`<p class="text-sm text-surface-400"${_scopeId}>No searches yet.</p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("leads.search.create"),
                class: "mt-3 text-xs text-primary-600 hover:underline"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Run your first search →`);
                  } else {
                    return [
                      createTextVNode("Run your first search →")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<ul class="space-y-1"${_scopeId}><!--[-->`);
              ssrRenderList(__props.recent_searches, (s2) => {
                _push2(`<li${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("leads.searches.show", s2.id),
                  class: "flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors group"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="min-w-0"${_scopeId2}><p class="text-sm font-medium text-surface-900 dark:text-white truncate"${_scopeId2}>${ssrInterpolate(s2.query)}</p><p class="text-xs text-surface-400"${_scopeId2}>${ssrInterpolate(s2.city)}, ${ssrInterpolate(s2.country)}</p></div><span class="${ssrRenderClass([
                        "badge text-xs ml-3 flex-shrink-0",
                        s2.status === "completed" ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" : s2.status === "running" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : s2.status === "failed" ? "bg-red-50 text-red-700" : "bg-surface-100 text-surface-600"
                      ])}"${_scopeId2}>${ssrInterpolate(s2.results_count)} · ${ssrInterpolate(s2.status)}</span>`);
                    } else {
                      return [
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode("p", { class: "text-sm font-medium text-surface-900 dark:text-white truncate" }, toDisplayString(s2.query), 1),
                          createVNode("p", { class: "text-xs text-surface-400" }, toDisplayString(s2.city) + ", " + toDisplayString(s2.country), 1)
                        ]),
                        createVNode("span", {
                          class: [
                            "badge text-xs ml-3 flex-shrink-0",
                            s2.status === "completed" ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" : s2.status === "running" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : s2.status === "failed" ? "bg-red-50 text-red-700" : "bg-surface-100 text-surface-600"
                          ]
                        }, toDisplayString(s2.results_count) + " · " + toDisplayString(s2.status), 3)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</li>`);
              });
              _push2(`<!--]--></ul>`);
            }
            _push2(`</div><div class="card p-5"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h2 class="font-semibold text-surface-900 dark:text-white"${_scopeId}>Recent Leads</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("leads.index"),
              class: "text-xs text-primary-600 hover:underline"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`View all`);
                } else {
                  return [
                    createTextVNode("View all")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.recent_leads.length === 0) {
              _push2(`<div class="flex flex-col items-center justify-center py-10 text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Bookmark), { class: "h-8 w-8 text-surface-200 mb-2" }, null, _parent2, _scopeId));
              _push2(`<p class="text-sm text-surface-400"${_scopeId}>No leads yet.</p></div>`);
            } else {
              _push2(`<ul class="space-y-1"${_scopeId}><!--[-->`);
              ssrRenderList(__props.recent_leads, (lead) => {
                _push2(`<li${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("leads.show", lead.id),
                  class: "flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    var _a2, _b2;
                    if (_push3) {
                      _push3(`<div class="min-w-0 flex-1"${_scopeId2}><p class="text-sm font-medium text-surface-900 dark:text-white truncate"${_scopeId2}>${ssrInterpolate(lead.business_name)}</p><p class="text-xs text-surface-400"${_scopeId2}>${ssrInterpolate(lead.city)} · ★ ${ssrInterpolate(lead.rating ?? "—")}</p></div><span class="badge bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 capitalize ml-3 flex-shrink-0 text-xs"${_scopeId2}>${ssrInterpolate(((_a2 = lead.ai_category) == null ? void 0 : _a2.replace("_", " ")) ?? "new")}</span>`);
                    } else {
                      return [
                        createVNode("div", { class: "min-w-0 flex-1" }, [
                          createVNode("p", { class: "text-sm font-medium text-surface-900 dark:text-white truncate" }, toDisplayString(lead.business_name), 1),
                          createVNode("p", { class: "text-xs text-surface-400" }, toDisplayString(lead.city) + " · ★ " + toDisplayString(lead.rating ?? "—"), 1)
                        ]),
                        createVNode("span", { class: "badge bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 capitalize ml-3 flex-shrink-0 text-xs" }, toDisplayString(((_b2 = lead.ai_category) == null ? void 0 : _b2.replace("_", " ")) ?? "new"), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</li>`);
              });
              _push2(`<!--]--></ul>`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full space-y-6" }, [
                createVNode("div", { class: "rounded-2xl bg-primary-600 p-6 text-white" }, [
                  createVNode("h1", { class: "text-2xl font-black" }, "Welcome back, " + toDisplayString(userName.value) + "!", 1),
                  createVNode("p", { class: "mt-1 text-primary-200 text-sm" }, toDisplayString(((_c = __props.plan_info) == null ? void 0 : _c.monthly_lead_limit) === null ? "You have unlimited leads today." : `You have ${fmt(((_d = __props.plan_info) == null ? void 0 : _d.monthly_lead_limit) ?? 0)} leads available.`) + " Start building your business network! ", 1),
                  createVNode("div", { class: "mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList([
                      { num: 1, icon: unref(Search), title: "Search GMB Leads", desc: "Pick your country, state, city, and a search keyword. Set radius, minimum rating, review count, and required contact fields." },
                      { num: 2, icon: unref(BookmarkIcon), title: "Filter & Save", desc: "Our scraper pulls fresh GMB listings. Filter further by AI category (Hot, SEO Weak, Inactive) and save the ones you want." },
                      { num: 3, icon: unref(ArrowDownToLine), title: "Export Anywhere", desc: "Export to CSV or XLSX with custom column selection. Push directly into your CRM, cold email tool, or outreach sequence." },
                      { num: 4, icon: unref(Puzzle), title: "Contact Businesses", desc: "Use the verified phone, email, and website data to reach out. Track status: New → Contacted → Responded → Converted." }
                    ], (step) => {
                      return openBlock(), createBlock("div", {
                        key: step.num,
                        class: "rounded-xl bg-white/10 hover:bg-white/15 transition-colors p-4 flex items-start gap-3"
                      }, [
                        createVNode("div", { class: "w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0" }, [
                          (openBlock(), createBlock(resolveDynamicComponent(step.icon), { class: "h-5 w-5 text-white" }))
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "font-bold text-white text-sm" }, toDisplayString(step.num) + ". " + toDisplayString(step.title), 1),
                          createVNode("p", { class: "text-primary-200 text-xs mt-0.5 leading-relaxed" }, toDisplayString(step.desc), 1)
                        ])
                      ]);
                    }), 128))
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("leads.search.create"),
                    class: "card p-5 flex items-center gap-4 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 transition-all group"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0" }, [
                        createVNode(unref(Search), { class: "h-7 w-7 text-blue-500" })
                      ]),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode("p", { class: "font-bold text-surface-900 dark:text-white text-base" }, "Find Leads"),
                        createVNode("p", { class: "text-sm text-surface-500" }, "Search for new businesses")
                      ]),
                      createVNode(unref(ChevronRight), { class: "h-5 w-5 text-surface-300 group-hover:text-primary-500 transition-colors flex-shrink-0" })
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(unref(Link), {
                    href: _ctx.route("leads.index"),
                    class: "card p-5 flex items-center gap-4 hover:shadow-md hover:border-green-200 dark:hover:border-green-700 transition-all group"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0" }, [
                        createVNode(unref(Bookmark), { class: "h-7 w-7 text-green-600" })
                      ]),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode("p", { class: "font-bold text-surface-900 dark:text-white text-base" }, "My Leads"),
                        createVNode("p", { class: "text-sm text-surface-500" }, "View your saved leads")
                      ]),
                      createVNode(unref(ChevronRight), { class: "h-5 w-5 text-surface-300 group-hover:text-green-500 transition-colors flex-shrink-0" })
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                __props.plan_info ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "card overflow-hidden"
                }, [
                  createVNode("div", { class: "flex items-center justify-between px-5 py-4 border-b border-surface-100 dark:border-surface-800" }, [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode("div", { class: "w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0" }, [
                        createVNode(unref(Wallet), { class: "h-4 w-4 text-orange-500" })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "font-bold text-surface-900 dark:text-white" }, toDisplayString(__props.plan_info.name), 1),
                        __props.plan_info.expires_at ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-2 mt-0.5"
                        }, [
                          createVNode(unref(Calendar), { class: "h-3.5 w-3.5 text-surface-400" }),
                          createVNode("span", { class: "text-xs text-surface-500" }, "Expires:"),
                          createVNode("span", { class: "text-xs font-semibold text-orange-500" }, toDisplayString(__props.plan_info.expires_at), 1),
                          createVNode("span", { class: "text-xs text-surface-400" }, "(" + toDisplayString(__props.plan_info.expires_human) + ")", 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("billing.index"),
                      class: "text-sm font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" View Plan ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-surface-100 dark:divide-surface-800" }, [
                    createVNode("div", { class: "p-5" }, [
                      createVNode("div", { class: "flex items-center gap-2 mb-3" }, [
                        createVNode(unref(MapPin), { class: "h-4 w-4 text-orange-400" }),
                        createVNode("span", { class: "text-xs font-semibold text-surface-500 uppercase tracking-wide" }, "Daily Leads Limit")
                      ]),
                      createVNode("p", { class: "text-2xl font-black text-surface-900 dark:text-white" }, toDisplayString(leadsLabel.value), 1),
                      createVNode("p", { class: "text-xs text-surface-400 mt-1" }, toDisplayString(__props.plan_info.monthly_lead_limit === null ? "No daily limit on your plan" : "leads per month"), 1)
                    ]),
                    createVNode("div", { class: "p-5" }, [
                      createVNode("div", { class: "flex items-center gap-2 mb-3" }, [
                        createVNode(unref(Download), { class: "h-4 w-4 text-green-500" }),
                        createVNode("span", { class: "text-xs font-semibold text-surface-500 uppercase tracking-wide" }, "Export Leads")
                      ]),
                      createVNode("p", { class: "text-2xl font-black text-surface-900 dark:text-white" }, toDisplayString(exportsLabel.value), 1),
                      createVNode("p", { class: "text-xs text-surface-400 mt-1" }, "CSV / Excel downloads")
                    ]),
                    createVNode("div", { class: "p-5" }, [
                      createVNode("div", { class: "flex items-center gap-2 mb-3" }, [
                        createVNode(unref(Monitor), { class: "h-4 w-4 text-blue-500" }),
                        createVNode("span", { class: "text-xs font-semibold text-surface-500 uppercase tracking-wide" }, "Devices Access")
                      ]),
                      createVNode("p", { class: "text-2xl font-black text-surface-900 dark:text-white" }, [
                        createVNode("span", null, toDisplayString(__props.plan_info.max_devices === null ? "Unlimited" : __props.plan_info.max_devices), 1),
                        __props.plan_info.max_devices !== null ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-base font-semibold text-surface-600 dark:text-surface-400 ml-1"
                        }, " Device" + toDisplayString(__props.plan_info.max_devices !== 1 ? "s" : ""), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("p", { class: "text-xs text-surface-400 mt-1" }, "Simultaneous logins")
                    ]),
                    createVNode("div", { class: "p-5" }, [
                      createVNode("div", { class: "flex items-center gap-2 mb-3" }, [
                        createVNode(unref(Headphones), { class: "h-4 w-4 text-purple-500" }),
                        createVNode("span", { class: "text-xs font-semibold text-surface-500 uppercase tracking-wide" }, "Priority Support")
                      ]),
                      __props.plan_info.priority_support ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center gap-2 mt-1"
                      }, [
                        createVNode("span", { class: "inline-flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-semibold px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800" }, [
                          createVNode(unref(CheckCircle), { class: "h-4 w-4" }),
                          createTextVNode(" Included ")
                        ])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center gap-2 mt-1"
                      }, [
                        createVNode("span", { class: "inline-flex items-center gap-1.5 bg-surface-100 dark:bg-surface-800 text-surface-500 text-sm font-semibold px-3 py-1.5 rounded-full border border-surface-200 dark:border-surface-700" }, [
                          createVNode(unref(X), { class: "h-4 w-4" }),
                          createTextVNode(" Not included ")
                        ])
                      ])),
                      createVNode("p", { class: "text-xs text-surface-400 mt-2" }, "Fast-track support response")
                    ])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "grid grid-cols-2 lg:grid-cols-4 gap-4" }, [
                  createVNode("div", { class: "card p-5" }, [
                    createVNode("div", { class: "p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 w-fit" }, [
                      createVNode(unref(Users), { class: "h-5 w-5 text-primary-600" })
                    ]),
                    createVNode("p", { class: "mt-3 text-2xl font-bold" }, toDisplayString(fmt(__props.stats.total_leads)), 1),
                    createVNode("p", { class: "text-xs text-surface-500 mt-0.5" }, "Total Leads")
                  ]),
                  createVNode("div", { class: "card p-5" }, [
                    createVNode("div", { class: "p-2 rounded-lg bg-green-50 dark:bg-green-900/30 w-fit" }, [
                      createVNode(unref(Calendar), { class: "h-5 w-5 text-green-600" })
                    ]),
                    createVNode("p", { class: "mt-3 text-2xl font-bold" }, toDisplayString(fmt(__props.stats.today_leads)), 1),
                    createVNode("p", { class: "text-xs text-surface-500 mt-0.5" }, "Today's Leads")
                  ]),
                  createVNode("div", { class: "card p-5" }, [
                    createVNode("div", { class: "p-2 rounded-lg bg-orange-50 dark:bg-orange-900/30 w-fit" }, [
                      createVNode(unref(Star), { class: "h-5 w-5 text-orange-500" })
                    ]),
                    createVNode("p", { class: "mt-3 text-2xl font-bold" }, toDisplayString(fmt(__props.stats.hot_leads)), 1),
                    createVNode("p", { class: "text-xs text-surface-500 mt-0.5" }, "Hot Leads")
                  ]),
                  createVNode("div", { class: "card p-5" }, [
                    createVNode("div", { class: "p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 w-fit" }, [
                      createVNode(unref(Wallet), { class: "h-5 w-5 text-purple-600" })
                    ]),
                    createVNode("p", { class: "mt-3 text-2xl font-bold" }, "PKR " + toDisplayString(fmt(__props.stats.affiliate_balance)), 1),
                    createVNode("p", { class: "text-xs text-surface-500 mt-0.5" }, "Affiliate Balance")
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                  createVNode("div", { class: "card p-5" }, [
                    createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                      createVNode("h2", { class: "font-semibold text-surface-900 dark:text-white" }, "Recent Searches"),
                      createVNode(unref(Link), {
                        href: _ctx.route("leads.searches.index"),
                        class: "text-xs text-primary-600 hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("View all")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    __props.recent_searches.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-col items-center justify-center py-10 text-center"
                    }, [
                      createVNode(unref(Search), { class: "h-8 w-8 text-surface-200 mb-2" }),
                      createVNode("p", { class: "text-sm text-surface-400" }, "No searches yet."),
                      createVNode(unref(Link), {
                        href: _ctx.route("leads.search.create"),
                        class: "mt-3 text-xs text-primary-600 hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Run your first search →")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])) : (openBlock(), createBlock("ul", {
                      key: 1,
                      class: "space-y-1"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recent_searches, (s2) => {
                        return openBlock(), createBlock("li", {
                          key: s2.id
                        }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("leads.searches.show", s2.id),
                            class: "flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors group"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode("p", { class: "text-sm font-medium text-surface-900 dark:text-white truncate" }, toDisplayString(s2.query), 1),
                                createVNode("p", { class: "text-xs text-surface-400" }, toDisplayString(s2.city) + ", " + toDisplayString(s2.country), 1)
                              ]),
                              createVNode("span", {
                                class: [
                                  "badge text-xs ml-3 flex-shrink-0",
                                  s2.status === "completed" ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" : s2.status === "running" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : s2.status === "failed" ? "bg-red-50 text-red-700" : "bg-surface-100 text-surface-600"
                                ]
                              }, toDisplayString(s2.results_count) + " · " + toDisplayString(s2.status), 3)
                            ]),
                            _: 2
                          }, 1032, ["href"])
                        ]);
                      }), 128))
                    ]))
                  ]),
                  createVNode("div", { class: "card p-5" }, [
                    createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                      createVNode("h2", { class: "font-semibold text-surface-900 dark:text-white" }, "Recent Leads"),
                      createVNode(unref(Link), {
                        href: _ctx.route("leads.index"),
                        class: "text-xs text-primary-600 hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("View all")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    __props.recent_leads.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-col items-center justify-center py-10 text-center"
                    }, [
                      createVNode(unref(Bookmark), { class: "h-8 w-8 text-surface-200 mb-2" }),
                      createVNode("p", { class: "text-sm text-surface-400" }, "No leads yet.")
                    ])) : (openBlock(), createBlock("ul", {
                      key: 1,
                      class: "space-y-1"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recent_leads, (lead) => {
                        return openBlock(), createBlock("li", {
                          key: lead.id
                        }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("leads.show", lead.id),
                            class: "flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors"
                          }, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createVNode("div", { class: "min-w-0 flex-1" }, [
                                  createVNode("p", { class: "text-sm font-medium text-surface-900 dark:text-white truncate" }, toDisplayString(lead.business_name), 1),
                                  createVNode("p", { class: "text-xs text-surface-400" }, toDisplayString(lead.city) + " · ★ " + toDisplayString(lead.rating ?? "—"), 1)
                                ]),
                                createVNode("span", { class: "badge bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 capitalize ml-3 flex-shrink-0 text-xs" }, toDisplayString(((_a2 = lead.ai_category) == null ? void 0 : _a2.replace("_", " ")) ?? "new"), 1)
                              ];
                            }),
                            _: 2
                          }, 1032, ["href"])
                        ]);
                      }), 128))
                    ]))
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Index.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$p
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$o = {
  __name: "403",
  __ssrInlineRender: true,
  props: { status: Number },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Forbidden" }, null, _parent));
      _push(`<div class="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950"><div class="text-center px-4"><p class="text-7xl font-bold text-red-600">403</p><h1 class="mt-2 text-2xl font-bold">Forbidden</h1><p class="mt-2 text-surface-500">You don&#39;t have permission to access this page.</p>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "mt-6 btn-primary inline-flex"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Back to home`);
          } else {
            return [
              createTextVNode("Back to home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Errors/403.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$o
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$n = {
  __name: "404",
  __ssrInlineRender: true,
  props: { status: Number },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Page not found" }, null, _parent));
      _push(`<div class="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950"><div class="text-center px-4"><p class="text-7xl font-bold text-primary-600">404</p><h1 class="mt-2 text-2xl font-bold">Page not found</h1><p class="mt-2 text-surface-500">The page you&#39;re looking for doesn&#39;t exist or has moved.</p>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "mt-6 btn-primary inline-flex"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Back to home`);
          } else {
            return [
              createTextVNode("Back to home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Errors/404.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$n
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$m = {
  __name: "500",
  __ssrInlineRender: true,
  props: { status: Number },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Server error" }, null, _parent));
      _push(`<div class="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950"><div class="text-center px-4"><p class="text-7xl font-bold text-orange-600">500</p><h1 class="mt-2 text-2xl font-bold">Something went wrong</h1><p class="mt-2 text-surface-500">We&#39;ve been notified. Try refreshing or come back in a few minutes.</p>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "mt-6 btn-primary inline-flex"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Back to home`);
          } else {
            return [
              createTextVNode("Back to home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Errors/500.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$m
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$l = {
  __name: "503",
  __ssrInlineRender: true,
  props: { status: Number },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Maintenance" }, null, _parent));
      _push(`<div class="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950"><div class="text-center px-4"><p class="text-7xl font-bold text-blue-600">503</p><h1 class="mt-2 text-2xl font-bold">Be right back</h1><p class="mt-2 text-surface-500">We&#39;re performing scheduled maintenance. This won&#39;t take long.</p></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Errors/503.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$l
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$k = {
  __name: "Exports",
  __ssrInlineRender: true,
  props: { exports: Object },
  setup(__props) {
    const formatBytes = (bytes) => {
      if (!bytes) return "—";
      const k2 = 1024, sizes = ["B", "KB", "MB", "GB"];
      const i2 = Math.floor(Math.log(bytes) / Math.log(k2));
      return parseFloat((bytes / Math.pow(k2, i2)).toFixed(1)) + " " + sizes[i2];
    };
    const remove = (id) => {
      if (confirm("Delete this export?")) {
        router.delete(route("leads.exports.destroy", id), { preserveScroll: true });
      }
    };
    const statusIcon = (s2) => ({ queued: Clock, processing: Loader, completed: CheckCircle, failed: XCircle })[s2] || Clock;
    const statusClass = (s2) => ({
      queued: "text-surface-500",
      processing: "text-primary-600 animate-spin",
      completed: "text-accent-600",
      failed: "text-red-600"
    })[s2] || "text-surface-500";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Exports" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}>Exports</h1><p class="mt-1 text-sm text-surface-500"${_scopeId}>Your generated CSV/XLSX files. Files expire after 30 days.</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("leads.index"),
              class: "btn-secondary text-sm"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Back to Leads`);
                } else {
                  return [
                    createTextVNode("Back to Leads")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-6 card overflow-hidden"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead class="bg-surface-50 dark:bg-surface-800/50 text-left"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 font-semibold"${_scopeId}>File</th><th class="px-4 py-3 font-semibold"${_scopeId}>Format</th><th class="px-4 py-3 font-semibold"${_scopeId}>Leads</th><th class="px-4 py-3 font-semibold"${_scopeId}>Size</th><th class="px-4 py-3 font-semibold"${_scopeId}>Status</th><th class="px-4 py-3 font-semibold"${_scopeId}>Created</th><th class="px-4 py-3 font-semibold w-20"${_scopeId}></th></tr></thead><tbody class="divide-y divide-surface-200 dark:divide-surface-800"${_scopeId}><!--[-->`);
            ssrRenderList(__props.exports.data, (ex) => {
              _push2(`<tr class="hover:bg-surface-50 dark:hover:bg-surface-800/30"${_scopeId}><td class="px-4 py-3 font-mono text-xs"${_scopeId}>${ssrInterpolate(ex.filename)}</td><td class="px-4 py-3 uppercase text-xs"${_scopeId}>${ssrInterpolate(ex.format)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(ex.lead_count.toLocaleString())}</td><td class="px-4 py-3 text-surface-500"${_scopeId}>${ssrInterpolate(formatBytes(ex.file_size))}</td><td class="px-4 py-3"${_scopeId}><span class="inline-flex items-center gap-1.5"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(statusIcon(ex.status)), {
                class: ["h-4 w-4", statusClass(ex.status)]
              }, null), _parent2, _scopeId);
              _push2(`<span class="text-xs"${_scopeId}>${ssrInterpolate(ex.status)}</span></span></td><td class="px-4 py-3 text-surface-500 text-xs"${_scopeId}>${ssrInterpolate(new Date(ex.created_at).toLocaleString())}</td><td class="px-4 py-3"${_scopeId}><div class="flex gap-1"${_scopeId}>`);
              if (ex.status === "completed") {
                _push2(`<a${ssrRenderAttr("href", _ctx.route("leads.exports.download", ex.id))} class="p-1.5 hover:bg-primary-50 dark:hover:bg-primary-900/30 text-primary-600 rounded"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Download), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                _push2(`</a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<button class="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 rounded"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(`</button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table>`);
            if (__props.exports.data.length === 0) {
              _push2(`<div class="p-12 text-center text-sm text-surface-500"${_scopeId}> No exports yet. Filter your leads and click Export to get started. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-2xl font-bold" }, "Exports"),
                    createVNode("p", { class: "mt-1 text-sm text-surface-500" }, "Your generated CSV/XLSX files. Files expire after 30 days.")
                  ]),
                  createVNode(unref(Link), {
                    href: _ctx.route("leads.index"),
                    class: "btn-secondary text-sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Back to Leads")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("div", { class: "mt-6 card overflow-hidden" }, [
                  createVNode("table", { class: "w-full text-sm" }, [
                    createVNode("thead", { class: "bg-surface-50 dark:bg-surface-800/50 text-left" }, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "File"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Format"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Leads"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Size"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Status"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Created"),
                        createVNode("th", { class: "px-4 py-3 font-semibold w-20" })
                      ])
                    ]),
                    createVNode("tbody", { class: "divide-y divide-surface-200 dark:divide-surface-800" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.exports.data, (ex) => {
                        return openBlock(), createBlock("tr", {
                          key: ex.id,
                          class: "hover:bg-surface-50 dark:hover:bg-surface-800/30"
                        }, [
                          createVNode("td", { class: "px-4 py-3 font-mono text-xs" }, toDisplayString(ex.filename), 1),
                          createVNode("td", { class: "px-4 py-3 uppercase text-xs" }, toDisplayString(ex.format), 1),
                          createVNode("td", { class: "px-4 py-3" }, toDisplayString(ex.lead_count.toLocaleString()), 1),
                          createVNode("td", { class: "px-4 py-3 text-surface-500" }, toDisplayString(formatBytes(ex.file_size)), 1),
                          createVNode("td", { class: "px-4 py-3" }, [
                            createVNode("span", { class: "inline-flex items-center gap-1.5" }, [
                              (openBlock(), createBlock(resolveDynamicComponent(statusIcon(ex.status)), {
                                class: ["h-4 w-4", statusClass(ex.status)]
                              }, null, 8, ["class"])),
                              createVNode("span", { class: "text-xs" }, toDisplayString(ex.status), 1)
                            ])
                          ]),
                          createVNode("td", { class: "px-4 py-3 text-surface-500 text-xs" }, toDisplayString(new Date(ex.created_at).toLocaleString()), 1),
                          createVNode("td", { class: "px-4 py-3" }, [
                            createVNode("div", { class: "flex gap-1" }, [
                              ex.status === "completed" ? (openBlock(), createBlock("a", {
                                key: 0,
                                href: _ctx.route("leads.exports.download", ex.id),
                                class: "p-1.5 hover:bg-primary-50 dark:hover:bg-primary-900/30 text-primary-600 rounded"
                              }, [
                                createVNode(unref(Download), { class: "h-4 w-4" })
                              ], 8, ["href"])) : createCommentVNode("", true),
                              createVNode("button", {
                                onClick: ($event) => remove(ex.id),
                                class: "p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 rounded"
                              }, [
                                createVNode(unref(Trash2), { class: "h-4 w-4" })
                              ], 8, ["onClick"])
                            ])
                          ])
                        ]);
                      }), 128))
                    ])
                  ]),
                  __props.exports.data.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-12 text-center text-sm text-surface-500"
                  }, " No exports yet. Filter your leads and click Export to get started. ")) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Leads/Exports.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$k
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$j = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    leads: Object,
    filters: Object,
    stats: Object
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
    const props = __props;
    const filterForm = useForm({
      q: ((_a = props.filters) == null ? void 0 : _a.q) || "",
      country: ((_b = props.filters) == null ? void 0 : _b.country) || "",
      state: ((_c = props.filters) == null ? void 0 : _c.state) || "",
      city: ((_d = props.filters) == null ? void 0 : _d.city) || "",
      status: ((_e = props.filters) == null ? void 0 : _e.status) || "",
      min_rating: ((_f = props.filters) == null ? void 0 : _f.min_rating) || "",
      min_reviews: ((_g = props.filters) == null ? void 0 : _g.min_reviews) || "",
      has_email: !!((_h = props.filters) == null ? void 0 : _h.has_email),
      has_phone: !!((_i = props.filters) == null ? void 0 : _i.has_phone),
      has_website: !!((_j = props.filters) == null ? void 0 : _j.has_website),
      ai_category: ((_k = props.filters) == null ? void 0 : _k.ai_category) || "",
      is_favorite: ((_l = props.filters) == null ? void 0 : _l.is_favorite) || "",
      is_archived: ((_m = props.filters) == null ? void 0 : _m.is_archived) || ""
    });
    const selected = ref(/* @__PURE__ */ new Set());
    const bulkAction = ref("");
    const applyFilters = () => filterForm.get(route("leads.index"), { preserveScroll: true, preserveState: true });
    const reset = () => {
      Object.keys(filterForm.data()).forEach((k2) => {
        filterForm[k2] = typeof filterForm[k2] === "boolean" ? false : "";
      });
      applyFilters();
    };
    const setAiCategory = (key) => {
      filterForm.ai_category = key;
      applyFilters();
    };
    const toggleHas = (field) => {
      filterForm[field] = !filterForm[field];
      applyFilters();
    };
    const toggleAll = () => {
      if (selected.value.size === props.leads.data.length) {
        selected.value.clear();
      } else {
        props.leads.data.forEach((l2) => selected.value.add(l2.id));
      }
    };
    const toggle = (id) => {
      if (selected.value.has(id)) selected.value.delete(id);
      else selected.value.add(id);
    };
    const runBulk = () => {
      if (!bulkAction.value || selected.value.size === 0) return;
      const isStatus = bulkAction.value.startsWith("status:");
      router.post(route("leads.bulk"), {
        lead_ids: Array.from(selected.value),
        action: isStatus ? "set_status" : bulkAction.value,
        value: isStatus ? bulkAction.value.replace("status:", "") : ""
      }, {
        preserveScroll: true,
        onSuccess: () => {
          selected.value.clear();
          bulkAction.value = "";
        }
      });
    };
    const toggleFavorite = (lead) => {
      router.patch(route("leads.update", lead.id), { is_favorite: !lead.is_favorite }, { preserveScroll: true });
    };
    const exportSelected = () => {
      if (selected.value.size === 0) {
        alert("Select at least one lead to export.");
        return;
      }
      router.post(route("leads.exports.store"), {
        format: "csv",
        filters: { lead_ids: Array.from(selected.value) }
      });
    };
    const categoryTypes = [
      { key: "", label: "All Leads", emoji: null, locked: false },
      { key: "seo_weak", label: "SEO Weak", emoji: "📋", locked: true },
      { key: "low_rating", label: "Low Rating", emoji: "⭐", locked: false },
      { key: "hot", label: "Hot", emoji: "🔥", locked: false },
      { key: "good", label: "Good", emoji: "👍", locked: false },
      { key: "competitive", label: "Competitive", emoji: "🧠", locked: false },
      { key: "inactive", label: "Inactive", emoji: null, locked: false }
    ];
    const categoryPillClass = (key) => {
      if (filterForm.ai_category === key) {
        return "bg-gray-900 text-white border-gray-900";
      }
      const map = {
        "": "border-surface-200 text-surface-700 hover:bg-surface-50",
        seo_weak: "border-surface-200 text-surface-500 hover:bg-surface-50",
        low_rating: "border-rose-200 text-rose-600 hover:bg-rose-50",
        hot: "border-orange-200 text-orange-600 hover:bg-orange-50",
        good: "border-amber-200 text-amber-700 hover:bg-amber-50",
        competitive: "border-pink-200 text-pink-600 hover:bg-pink-50",
        inactive: "border-surface-200 text-surface-500 hover:bg-surface-50"
      };
      return map[key] || "border-surface-200 text-surface-700";
    };
    const statusColor = (status) => ({
      new: "bg-surface-100 text-surface-700",
      contacted: "bg-primary-50 text-primary-700",
      responded: "bg-orange-50 text-orange-700",
      converted: "bg-green-50 text-green-700",
      closed: "bg-surface-200 text-surface-500"
    })[status] || "bg-surface-100 text-surface-700";
    const aiCategoryColor = (cat) => ({
      hot: "bg-red-50 text-red-700",
      good: "bg-green-50 text-green-700",
      seo_weak: "bg-orange-50 text-orange-700",
      low_rating: "bg-yellow-50 text-yellow-700",
      inactive: "bg-surface-100 text-surface-500",
      competitive: "bg-primary-50 text-primary-700"
    })[cat] || "bg-surface-100 text-surface-700";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "My Leads" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full space-y-5"${_scopeId}><div class="flex items-center justify-between flex-wrap gap-3"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-surface-900 dark:text-white"${_scopeId}>My Leads</h1><p class="mt-0.5 text-sm text-surface-500"${_scopeId}>Manage and track your saved business leads</p></div><div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("leads.exports.index"),
              class: "btn-secondary text-sm"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Download), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Exports `);
                } else {
                  return [
                    createVNode(unref(Download), { class: "h-4 w-4" }),
                    createTextVNode(" Exports ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("leads.search.create"),
              class: "btn-primary text-sm"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Search), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Find Leads `);
                } else {
                  return [
                    createVNode(unref(Search), { class: "h-4 w-4" }),
                    createTextVNode(" Find Leads ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-2 lg:grid-cols-4 gap-4"${_scopeId}><div class="card p-4 flex items-center gap-4"${_scopeId}><div class="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Bookmark), { class: "h-6 w-6 text-blue-600 dark:text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-xs text-surface-500 font-medium uppercase tracking-wide"${_scopeId}>Total Leads</p><p class="text-2xl font-bold text-surface-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.stats.total)}</p></div></div><div class="card p-4 flex items-center gap-4"${_scopeId}><div class="flex-shrink-0 w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Phone), { class: "h-6 w-6 text-green-600 dark:text-green-400" }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-xs text-surface-500 font-medium uppercase tracking-wide"${_scopeId}>Contacted</p><p class="text-2xl font-bold text-surface-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.stats.contacted)}</p></div></div><div class="card p-4 flex items-center gap-4"${_scopeId}><div class="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Clock), { class: "h-6 w-6 text-orange-500 dark:text-orange-400" }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-xs text-surface-500 font-medium uppercase tracking-wide"${_scopeId}>Pending</p><p class="text-2xl font-bold text-surface-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.stats.new)}</p></div></div><div class="card p-4 flex items-center gap-4"${_scopeId}><div class="flex-shrink-0 w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-6 w-6 text-green-600 dark:text-green-400" }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-xs text-surface-500 font-medium uppercase tracking-wide"${_scopeId}>Converted</p><p class="text-2xl font-bold text-surface-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.stats.converted)}</p></div></div></div><div class="card p-5 space-y-4"${_scopeId}><div class="flex gap-2"${_scopeId}><div class="relative flex-1"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400 pointer-events-none" }, null, _parent2, _scopeId));
            _push2(`<input${ssrRenderAttr("value", unref(filterForm).q)} type="text" placeholder="Search by name, email, phone..." class="input pl-9"${_scopeId}></div><button class="btn-primary px-5"${_scopeId}>Search</button><button class="btn-secondary px-5"${_scopeId}>Clear</button></div><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2"${_scopeId}><input${ssrRenderAttr("value", unref(filterForm).country)} placeholder="Country" class="input text-sm"${_scopeId}><input${ssrRenderAttr("value", unref(filterForm).state)} placeholder="State" class="input text-sm"${_scopeId}><input${ssrRenderAttr("value", unref(filterForm).city)} placeholder="City" class="input text-sm"${_scopeId}><div class="relative"${_scopeId}><select class="input text-sm appearance-none pr-8"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filterForm).status) ? ssrLooseContain(unref(filterForm).status, "") : ssrLooseEqual(unref(filterForm).status, "")) ? " selected" : ""}${_scopeId}>Status</option><option value="new"${ssrIncludeBooleanAttr(Array.isArray(unref(filterForm).status) ? ssrLooseContain(unref(filterForm).status, "new") : ssrLooseEqual(unref(filterForm).status, "new")) ? " selected" : ""}${_scopeId}>New</option><option value="contacted"${ssrIncludeBooleanAttr(Array.isArray(unref(filterForm).status) ? ssrLooseContain(unref(filterForm).status, "contacted") : ssrLooseEqual(unref(filterForm).status, "contacted")) ? " selected" : ""}${_scopeId}>Contacted</option><option value="responded"${ssrIncludeBooleanAttr(Array.isArray(unref(filterForm).status) ? ssrLooseContain(unref(filterForm).status, "responded") : ssrLooseEqual(unref(filterForm).status, "responded")) ? " selected" : ""}${_scopeId}>Responded</option><option value="converted"${ssrIncludeBooleanAttr(Array.isArray(unref(filterForm).status) ? ssrLooseContain(unref(filterForm).status, "converted") : ssrLooseEqual(unref(filterForm).status, "converted")) ? " selected" : ""}${_scopeId}>Converted</option><option value="closed"${ssrIncludeBooleanAttr(Array.isArray(unref(filterForm).status) ? ssrLooseContain(unref(filterForm).status, "closed") : ssrLooseEqual(unref(filterForm).status, "closed")) ? " selected" : ""}${_scopeId}>Closed</option></select>`);
            _push2(ssrRenderComponent(unref(ChevronDown), { class: "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-surface-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="relative"${_scopeId}><select class="input text-sm appearance-none pr-8"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filterForm).min_rating) ? ssrLooseContain(unref(filterForm).min_rating, "") : ssrLooseEqual(unref(filterForm).min_rating, "")) ? " selected" : ""}${_scopeId}>Rating</option><option value="3"${ssrIncludeBooleanAttr(Array.isArray(unref(filterForm).min_rating) ? ssrLooseContain(unref(filterForm).min_rating, "3") : ssrLooseEqual(unref(filterForm).min_rating, "3")) ? " selected" : ""}${_scopeId}>3+ ⭐</option><option value="4"${ssrIncludeBooleanAttr(Array.isArray(unref(filterForm).min_rating) ? ssrLooseContain(unref(filterForm).min_rating, "4") : ssrLooseEqual(unref(filterForm).min_rating, "4")) ? " selected" : ""}${_scopeId}>4+ ⭐</option><option value="4.5"${ssrIncludeBooleanAttr(Array.isArray(unref(filterForm).min_rating) ? ssrLooseContain(unref(filterForm).min_rating, "4.5") : ssrLooseEqual(unref(filterForm).min_rating, "4.5")) ? " selected" : ""}${_scopeId}>4.5+ ⭐</option></select>`);
            _push2(ssrRenderComponent(unref(ChevronDown), { class: "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-surface-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="relative"${_scopeId}><select class="input text-sm appearance-none pr-8"${_scopeId}><option value=""${_scopeId}>Review</option><option value="positive"${_scopeId}>Positive</option><option value="negative"${_scopeId}>Negative</option></select>`);
            _push2(ssrRenderComponent(unref(ChevronDown), { class: "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-surface-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="relative"${_scopeId}><select class="input text-sm appearance-none pr-8"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filterForm).min_reviews) ? ssrLooseContain(unref(filterForm).min_reviews, "") : ssrLooseEqual(unref(filterForm).min_reviews, "")) ? " selected" : ""}${_scopeId}>Reviews #</option><option value="10"${ssrIncludeBooleanAttr(Array.isArray(unref(filterForm).min_reviews) ? ssrLooseContain(unref(filterForm).min_reviews, "10") : ssrLooseEqual(unref(filterForm).min_reviews, "10")) ? " selected" : ""}${_scopeId}>10+</option><option value="50"${ssrIncludeBooleanAttr(Array.isArray(unref(filterForm).min_reviews) ? ssrLooseContain(unref(filterForm).min_reviews, "50") : ssrLooseEqual(unref(filterForm).min_reviews, "50")) ? " selected" : ""}${_scopeId}>50+</option><option value="100"${ssrIncludeBooleanAttr(Array.isArray(unref(filterForm).min_reviews) ? ssrLooseContain(unref(filterForm).min_reviews, "100") : ssrLooseEqual(unref(filterForm).min_reviews, "100")) ? " selected" : ""}${_scopeId}>100+</option><option value="500"${ssrIncludeBooleanAttr(Array.isArray(unref(filterForm).min_reviews) ? ssrLooseContain(unref(filterForm).min_reviews, "500") : ssrLooseEqual(unref(filterForm).min_reviews, "500")) ? " selected" : ""}${_scopeId}>500+</option></select>`);
            _push2(ssrRenderComponent(unref(ChevronDown), { class: "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-surface-400" }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex items-center gap-6 flex-wrap"${_scopeId}><span class="text-xs font-semibold text-surface-400 uppercase tracking-wider"${_scopeId}>HAS:</span><label class="flex items-center gap-2 cursor-pointer select-none"${_scopeId}><button type="button" class="${ssrRenderClass([
              "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",
              unref(filterForm).has_email ? "bg-green-500" : "bg-surface-200 dark:bg-surface-700"
            ])}"${_scopeId}><span class="${ssrRenderClass([
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200",
              unref(filterForm).has_email ? "translate-x-5" : "translate-x-0"
            ])}"${_scopeId}></span></button><span class="text-sm font-medium text-surface-700 dark:text-surface-300"${_scopeId}>Email</span></label><label class="flex items-center gap-2 cursor-pointer select-none"${_scopeId}><button type="button" class="${ssrRenderClass([
              "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",
              unref(filterForm).has_phone ? "bg-green-500" : "bg-surface-200 dark:bg-surface-700"
            ])}"${_scopeId}><span class="${ssrRenderClass([
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200",
              unref(filterForm).has_phone ? "translate-x-5" : "translate-x-0"
            ])}"${_scopeId}></span></button><span class="text-sm font-medium text-surface-700 dark:text-surface-300"${_scopeId}>Phone</span></label><label class="flex items-center gap-2 cursor-pointer select-none"${_scopeId}><button type="button" class="${ssrRenderClass([
              "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",
              unref(filterForm).has_website ? "bg-green-500" : "bg-surface-200 dark:bg-surface-700"
            ])}"${_scopeId}><span class="${ssrRenderClass([
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200",
              unref(filterForm).has_website ? "translate-x-5" : "translate-x-0"
            ])}"${_scopeId}></span></button><span class="text-sm font-medium text-surface-700 dark:text-surface-300"${_scopeId}>Website</span></label></div><div class="flex items-center gap-2 flex-wrap"${_scopeId}><span class="text-xs font-semibold text-surface-400 uppercase tracking-wider mr-1"${_scopeId}>FILTER BY TYPE:</span><!--[-->`);
            ssrRenderList(categoryTypes, (cat) => {
              _push2(`<button class="${ssrRenderClass([
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all",
                categoryPillClass(cat.key)
              ])}"${_scopeId}>`);
              if (cat.emoji) {
                _push2(`<span${_scopeId}>${ssrInterpolate(cat.emoji)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (cat.locked) {
                _push2(ssrRenderComponent(unref(Lock), { class: "h-3 w-3" }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (cat.key === "inactive" && !cat.emoji) {
                _push2(ssrRenderComponent(unref(X), { class: "h-3 w-3" }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(` ${ssrInterpolate(cat.label)} <span class="opacity-60"${_scopeId}>(${ssrInterpolate(cat.key === "" ? __props.stats.total : __props.leads.data.filter((l2) => l2.ai_category === cat.key).length)})</span></button>`);
            });
            _push2(`<!--]--></div></div>`);
            if (selected.value.size > 0) {
              _push2(`<div class="card p-3 flex items-center justify-between bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800"${_scopeId}><span class="text-sm font-semibold text-primary-700 dark:text-primary-300"${_scopeId}>${ssrInterpolate(selected.value.size)} lead${ssrInterpolate(selected.value.size > 1 ? "s" : "")} selected </span><div class="flex items-center gap-2"${_scopeId}><select class="input text-sm py-1.5 w-44"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(bulkAction.value) ? ssrLooseContain(bulkAction.value, "") : ssrLooseEqual(bulkAction.value, "")) ? " selected" : ""}${_scopeId}>Choose action...</option><option value="status:contacted"${ssrIncludeBooleanAttr(Array.isArray(bulkAction.value) ? ssrLooseContain(bulkAction.value, "status:contacted") : ssrLooseEqual(bulkAction.value, "status:contacted")) ? " selected" : ""}${_scopeId}>Mark contacted</option><option value="status:converted"${ssrIncludeBooleanAttr(Array.isArray(bulkAction.value) ? ssrLooseContain(bulkAction.value, "status:converted") : ssrLooseEqual(bulkAction.value, "status:converted")) ? " selected" : ""}${_scopeId}>Mark converted</option><option value="favorite"${ssrIncludeBooleanAttr(Array.isArray(bulkAction.value) ? ssrLooseContain(bulkAction.value, "favorite") : ssrLooseEqual(bulkAction.value, "favorite")) ? " selected" : ""}${_scopeId}>Add to favorites</option><option value="archive"${ssrIncludeBooleanAttr(Array.isArray(bulkAction.value) ? ssrLooseContain(bulkAction.value, "archive") : ssrLooseEqual(bulkAction.value, "archive")) ? " selected" : ""}${_scopeId}>Archive</option><option value="delete"${ssrIncludeBooleanAttr(Array.isArray(bulkAction.value) ? ssrLooseContain(bulkAction.value, "delete") : ssrLooseEqual(bulkAction.value, "delete")) ? " selected" : ""}${_scopeId}>Delete</option></select><button class="btn-primary text-sm py-1.5"${_scopeId}>Apply</button><button class="btn-secondary text-sm py-1.5"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Download), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(` Export </button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="card overflow-hidden"${_scopeId}>`);
            if (__props.leads.data.length > 0) {
              _push2(`<div class="overflow-x-auto"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead class="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 w-10"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(selected.value.size === __props.leads.data.length && __props.leads.data.length > 0) ? " checked" : ""} class="rounded border-surface-300"${_scopeId}></th><th class="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide"${_scopeId}>Business</th><th class="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide hidden md:table-cell"${_scopeId}>Category</th><th class="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide"${_scopeId}>Rating</th><th class="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide"${_scopeId}>Contact</th><th class="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide hidden lg:table-cell"${_scopeId}>AI Score</th><th class="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide"${_scopeId}>Status</th><th class="px-4 py-3 w-10"${_scopeId}></th></tr></thead><tbody class="divide-y divide-surface-100 dark:divide-surface-800"${_scopeId}><!--[-->`);
              ssrRenderList(__props.leads.data, (lead) => {
                _push2(`<tr class="hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors"${_scopeId}><td class="px-4 py-3"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(selected.value.has(lead.id)) ? " checked" : ""} class="rounded border-surface-300"${_scopeId}></td><td class="px-4 py-3 min-w-[180px]"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("leads.show", lead.id),
                  class: "font-semibold text-surface-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(lead.business_name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(lead.business_name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<p class="text-xs text-surface-400 mt-0.5"${_scopeId}>${ssrInterpolate([lead.city, lead.country].filter(Boolean).join(", "))}</p></td><td class="px-4 py-3 hidden md:table-cell"${_scopeId}>`);
                if (lead.category) {
                  _push2(`<span class="text-xs text-surface-600 dark:text-surface-400"${_scopeId}>${ssrInterpolate(lead.category)}</span>`);
                } else {
                  _push2(`<span class="text-surface-300"${_scopeId}>—</span>`);
                }
                _push2(`</td><td class="px-4 py-3"${_scopeId}>`);
                if (lead.rating) {
                  _push2(`<div class="flex items-center gap-1"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Star), { class: "h-3.5 w-3.5 text-yellow-400 fill-yellow-400 flex-shrink-0" }, null, _parent2, _scopeId));
                  _push2(`<span class="text-xs font-medium text-surface-700 dark:text-surface-300"${_scopeId}>${ssrInterpolate(lead.rating)}</span><span class="text-xs text-surface-400"${_scopeId}>(${ssrInterpolate(lead.reviews_count)})</span></div>`);
                } else {
                  _push2(`<span class="text-surface-300 text-xs"${_scopeId}>—</span>`);
                }
                _push2(`</td><td class="px-4 py-3"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
                if (lead.phone) {
                  _push2(`<a${ssrRenderAttr("href", `tel:${lead.phone}`)} class="p-1 rounded-md bg-green-50 hover:bg-green-100 dark:bg-green-900/30 transition-colors"${ssrRenderAttr("title", lead.phone)}${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Phone), { class: "h-3.5 w-3.5 text-green-600 dark:text-green-400" }, null, _parent2, _scopeId));
                  _push2(`</a>`);
                } else {
                  _push2(`<!---->`);
                }
                if (lead.email) {
                  _push2(`<a${ssrRenderAttr("href", `mailto:${lead.email}`)} class="p-1 rounded-md bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/30 transition-colors"${ssrRenderAttr("title", lead.email)}${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Mail), { class: "h-3.5 w-3.5 text-primary-600 dark:text-primary-400" }, null, _parent2, _scopeId));
                  _push2(`</a>`);
                } else {
                  _push2(`<!---->`);
                }
                if (lead.website) {
                  _push2(`<a${ssrRenderAttr("href", lead.website)} target="_blank" rel="noopener" class="p-1 rounded-md bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/30 transition-colors"${ssrRenderAttr("title", lead.website)}${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Globe), { class: "h-3.5 w-3.5 text-orange-600 dark:text-orange-400" }, null, _parent2, _scopeId));
                  _push2(`</a>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></td><td class="px-4 py-3 hidden lg:table-cell"${_scopeId}>`);
                if (lead.ai_category) {
                  _push2(`<span class="${ssrRenderClass(["badge text-xs font-medium", aiCategoryColor(lead.ai_category)])}"${_scopeId}>${ssrInterpolate(lead.ai_category.replace("_", " "))}</span>`);
                } else {
                  _push2(`<span class="text-surface-300 text-xs"${_scopeId}>—</span>`);
                }
                _push2(`</td><td class="px-4 py-3"${_scopeId}><span class="${ssrRenderClass(["badge text-xs font-medium capitalize", statusColor(lead.user_status)])}"${_scopeId}>${ssrInterpolate(lead.user_status)}</span></td><td class="px-4 py-3"${_scopeId}><button class="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Star), {
                  class: [
                    "h-4 w-4 transition-colors",
                    lead.is_favorite ? "fill-yellow-400 text-yellow-400" : "text-surface-300 hover:text-yellow-400"
                  ]
                }, null, _parent2, _scopeId));
                _push2(`</button></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            } else {
              _push2(`<div class="flex flex-col items-center justify-center py-20 px-6 text-center"${_scopeId}><div class="w-16 h-16 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Bookmark), { class: "h-8 w-8 text-surface-400" }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-lg font-semibold text-surface-900 dark:text-white mb-1"${_scopeId}>No Saved Leads</h3><p class="text-sm text-surface-500 max-w-xs mb-6"${_scopeId}> You haven&#39;t saved any leads yet. Start by searching for businesses and saving potential leads. </p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("leads.search.create"),
                class: "btn-primary"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Search), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Search for Leads `);
                  } else {
                    return [
                      createVNode(unref(Search), { class: "h-4 w-4" }),
                      createTextVNode(" Search for Leads ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div>`);
            if (__props.leads.last_page > 1) {
              _push2(`<div class="flex items-center justify-between text-sm"${_scopeId}><p class="text-surface-500"${_scopeId}> Showing ${ssrInterpolate(__props.leads.from)}–${ssrInterpolate(__props.leads.to)} of ${ssrInterpolate(__props.leads.total)} leads </p><div class="flex gap-1"${_scopeId}><!--[-->`);
              ssrRenderList(__props.leads.links, (link) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: link.label,
                  href: link.url ?? "#",
                  class: [
                    "px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors",
                    link.active ? "bg-primary-600 text-white border-primary-600" : link.url ? "border-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800 dark:border-surface-700" : "border-surface-100 text-surface-300 cursor-not-allowed dark:border-surface-800"
                  ],
                  "preserve-scroll": true
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "w-full space-y-5" }, [
                createVNode("div", { class: "flex items-center justify-between flex-wrap gap-3" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-2xl font-bold text-surface-900 dark:text-white" }, "My Leads"),
                    createVNode("p", { class: "mt-0.5 text-sm text-surface-500" }, "Manage and track your saved business leads")
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("leads.exports.index"),
                      class: "btn-secondary text-sm"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Download), { class: "h-4 w-4" }),
                        createTextVNode(" Exports ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(Link), {
                      href: _ctx.route("leads.search.create"),
                      class: "btn-primary text-sm"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Search), { class: "h-4 w-4" }),
                        createTextVNode(" Find Leads ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-2 lg:grid-cols-4 gap-4" }, [
                  createVNode("div", { class: "card p-4 flex items-center gap-4" }, [
                    createVNode("div", { class: "flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center" }, [
                      createVNode(unref(Bookmark), { class: "h-6 w-6 text-blue-600 dark:text-blue-400" })
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs text-surface-500 font-medium uppercase tracking-wide" }, "Total Leads"),
                      createVNode("p", { class: "text-2xl font-bold text-surface-900 dark:text-white" }, toDisplayString(__props.stats.total), 1)
                    ])
                  ]),
                  createVNode("div", { class: "card p-4 flex items-center gap-4" }, [
                    createVNode("div", { class: "flex-shrink-0 w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center" }, [
                      createVNode(unref(Phone), { class: "h-6 w-6 text-green-600 dark:text-green-400" })
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs text-surface-500 font-medium uppercase tracking-wide" }, "Contacted"),
                      createVNode("p", { class: "text-2xl font-bold text-surface-900 dark:text-white" }, toDisplayString(__props.stats.contacted), 1)
                    ])
                  ]),
                  createVNode("div", { class: "card p-4 flex items-center gap-4" }, [
                    createVNode("div", { class: "flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center" }, [
                      createVNode(unref(Clock), { class: "h-6 w-6 text-orange-500 dark:text-orange-400" })
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs text-surface-500 font-medium uppercase tracking-wide" }, "Pending"),
                      createVNode("p", { class: "text-2xl font-bold text-surface-900 dark:text-white" }, toDisplayString(__props.stats.new), 1)
                    ])
                  ]),
                  createVNode("div", { class: "card p-4 flex items-center gap-4" }, [
                    createVNode("div", { class: "flex-shrink-0 w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center" }, [
                      createVNode(unref(CheckCircle), { class: "h-6 w-6 text-green-600 dark:text-green-400" })
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs text-surface-500 font-medium uppercase tracking-wide" }, "Converted"),
                      createVNode("p", { class: "text-2xl font-bold text-surface-900 dark:text-white" }, toDisplayString(__props.stats.converted), 1)
                    ])
                  ])
                ]),
                createVNode("div", { class: "card p-5 space-y-4" }, [
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode("div", { class: "relative flex-1" }, [
                      createVNode(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400 pointer-events-none" }),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(filterForm).q = $event,
                        type: "text",
                        placeholder: "Search by name, email, phone...",
                        class: "input pl-9",
                        onKeydown: withKeys(applyFilters, ["enter"])
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, unref(filterForm).q]
                      ])
                    ]),
                    createVNode("button", {
                      onClick: applyFilters,
                      class: "btn-primary px-5"
                    }, "Search"),
                    createVNode("button", {
                      onClick: reset,
                      class: "btn-secondary px-5"
                    }, "Clear")
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2" }, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(filterForm).country = $event,
                      placeholder: "Country",
                      class: "input text-sm"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(filterForm).country]
                    ]),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(filterForm).state = $event,
                      placeholder: "State",
                      class: "input text-sm"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(filterForm).state]
                    ]),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(filterForm).city = $event,
                      placeholder: "City",
                      class: "input text-sm"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(filterForm).city]
                    ]),
                    createVNode("div", { class: "relative" }, [
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(filterForm).status = $event,
                        class: "input text-sm appearance-none pr-8",
                        onChange: applyFilters
                      }, [
                        createVNode("option", { value: "" }, "Status"),
                        createVNode("option", { value: "new" }, "New"),
                        createVNode("option", { value: "contacted" }, "Contacted"),
                        createVNode("option", { value: "responded" }, "Responded"),
                        createVNode("option", { value: "converted" }, "Converted"),
                        createVNode("option", { value: "closed" }, "Closed")
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(filterForm).status]
                      ]),
                      createVNode(unref(ChevronDown), { class: "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-surface-400" })
                    ]),
                    createVNode("div", { class: "relative" }, [
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(filterForm).min_rating = $event,
                        class: "input text-sm appearance-none pr-8",
                        onChange: applyFilters
                      }, [
                        createVNode("option", { value: "" }, "Rating"),
                        createVNode("option", { value: "3" }, "3+ ⭐"),
                        createVNode("option", { value: "4" }, "4+ ⭐"),
                        createVNode("option", { value: "4.5" }, "4.5+ ⭐")
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(filterForm).min_rating]
                      ]),
                      createVNode(unref(ChevronDown), { class: "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-surface-400" })
                    ]),
                    createVNode("div", { class: "relative" }, [
                      createVNode("select", { class: "input text-sm appearance-none pr-8" }, [
                        createVNode("option", { value: "" }, "Review"),
                        createVNode("option", { value: "positive" }, "Positive"),
                        createVNode("option", { value: "negative" }, "Negative")
                      ]),
                      createVNode(unref(ChevronDown), { class: "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-surface-400" })
                    ]),
                    createVNode("div", { class: "relative" }, [
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(filterForm).min_reviews = $event,
                        class: "input text-sm appearance-none pr-8",
                        onChange: applyFilters
                      }, [
                        createVNode("option", { value: "" }, "Reviews #"),
                        createVNode("option", { value: "10" }, "10+"),
                        createVNode("option", { value: "50" }, "50+"),
                        createVNode("option", { value: "100" }, "100+"),
                        createVNode("option", { value: "500" }, "500+")
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(filterForm).min_reviews]
                      ]),
                      createVNode(unref(ChevronDown), { class: "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-surface-400" })
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center gap-6 flex-wrap" }, [
                    createVNode("span", { class: "text-xs font-semibold text-surface-400 uppercase tracking-wider" }, "HAS:"),
                    createVNode("label", { class: "flex items-center gap-2 cursor-pointer select-none" }, [
                      createVNode("button", {
                        type: "button",
                        onClick: ($event) => toggleHas("has_email"),
                        class: [
                          "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",
                          unref(filterForm).has_email ? "bg-green-500" : "bg-surface-200 dark:bg-surface-700"
                        ]
                      }, [
                        createVNode("span", {
                          class: [
                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200",
                            unref(filterForm).has_email ? "translate-x-5" : "translate-x-0"
                          ]
                        }, null, 2)
                      ], 10, ["onClick"]),
                      createVNode("span", { class: "text-sm font-medium text-surface-700 dark:text-surface-300" }, "Email")
                    ]),
                    createVNode("label", { class: "flex items-center gap-2 cursor-pointer select-none" }, [
                      createVNode("button", {
                        type: "button",
                        onClick: ($event) => toggleHas("has_phone"),
                        class: [
                          "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",
                          unref(filterForm).has_phone ? "bg-green-500" : "bg-surface-200 dark:bg-surface-700"
                        ]
                      }, [
                        createVNode("span", {
                          class: [
                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200",
                            unref(filterForm).has_phone ? "translate-x-5" : "translate-x-0"
                          ]
                        }, null, 2)
                      ], 10, ["onClick"]),
                      createVNode("span", { class: "text-sm font-medium text-surface-700 dark:text-surface-300" }, "Phone")
                    ]),
                    createVNode("label", { class: "flex items-center gap-2 cursor-pointer select-none" }, [
                      createVNode("button", {
                        type: "button",
                        onClick: ($event) => toggleHas("has_website"),
                        class: [
                          "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",
                          unref(filterForm).has_website ? "bg-green-500" : "bg-surface-200 dark:bg-surface-700"
                        ]
                      }, [
                        createVNode("span", {
                          class: [
                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200",
                            unref(filterForm).has_website ? "translate-x-5" : "translate-x-0"
                          ]
                        }, null, 2)
                      ], 10, ["onClick"]),
                      createVNode("span", { class: "text-sm font-medium text-surface-700 dark:text-surface-300" }, "Website")
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center gap-2 flex-wrap" }, [
                    createVNode("span", { class: "text-xs font-semibold text-surface-400 uppercase tracking-wider mr-1" }, "FILTER BY TYPE:"),
                    (openBlock(), createBlock(Fragment, null, renderList(categoryTypes, (cat) => {
                      return createVNode("button", {
                        key: cat.key,
                        onClick: ($event) => setAiCategory(cat.key),
                        class: [
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all",
                          categoryPillClass(cat.key)
                        ]
                      }, [
                        cat.emoji ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(cat.emoji), 1)) : createCommentVNode("", true),
                        cat.locked ? (openBlock(), createBlock(unref(Lock), {
                          key: 1,
                          class: "h-3 w-3"
                        })) : createCommentVNode("", true),
                        cat.key === "inactive" && !cat.emoji ? (openBlock(), createBlock(unref(X), {
                          key: 2,
                          class: "h-3 w-3"
                        })) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(cat.label) + " ", 1),
                        createVNode("span", { class: "opacity-60" }, "(" + toDisplayString(cat.key === "" ? __props.stats.total : __props.leads.data.filter((l2) => l2.ai_category === cat.key).length) + ")", 1)
                      ], 10, ["onClick"]);
                    }), 64))
                  ])
                ]),
                selected.value.size > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "card p-3 flex items-center justify-between bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800"
                }, [
                  createVNode("span", { class: "text-sm font-semibold text-primary-700 dark:text-primary-300" }, toDisplayString(selected.value.size) + " lead" + toDisplayString(selected.value.size > 1 ? "s" : "") + " selected ", 1),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => bulkAction.value = $event,
                      class: "input text-sm py-1.5 w-44"
                    }, [
                      createVNode("option", { value: "" }, "Choose action..."),
                      createVNode("option", { value: "status:contacted" }, "Mark contacted"),
                      createVNode("option", { value: "status:converted" }, "Mark converted"),
                      createVNode("option", { value: "favorite" }, "Add to favorites"),
                      createVNode("option", { value: "archive" }, "Archive"),
                      createVNode("option", { value: "delete" }, "Delete")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, bulkAction.value]
                    ]),
                    createVNode("button", {
                      onClick: runBulk,
                      class: "btn-primary text-sm py-1.5"
                    }, "Apply"),
                    createVNode("button", {
                      onClick: exportSelected,
                      class: "btn-secondary text-sm py-1.5"
                    }, [
                      createVNode(unref(Download), { class: "h-4 w-4" }),
                      createTextVNode(" Export ")
                    ])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "card overflow-hidden" }, [
                  __props.leads.data.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "overflow-x-auto"
                  }, [
                    createVNode("table", { class: "w-full text-sm" }, [
                      createVNode("thead", { class: "bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-4 py-3 w-10" }, [
                            createVNode("input", {
                              type: "checkbox",
                              checked: selected.value.size === __props.leads.data.length && __props.leads.data.length > 0,
                              onChange: toggleAll,
                              class: "rounded border-surface-300"
                            }, null, 40, ["checked"])
                          ]),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide" }, "Business"),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide hidden md:table-cell" }, "Category"),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide" }, "Rating"),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide" }, "Contact"),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide hidden lg:table-cell" }, "AI Score"),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide" }, "Status"),
                          createVNode("th", { class: "px-4 py-3 w-10" })
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-surface-100 dark:divide-surface-800" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.leads.data, (lead) => {
                          return openBlock(), createBlock("tr", {
                            key: lead.id,
                            class: "hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors"
                          }, [
                            createVNode("td", { class: "px-4 py-3" }, [
                              createVNode("input", {
                                type: "checkbox",
                                checked: selected.value.has(lead.id),
                                onChange: ($event) => toggle(lead.id),
                                class: "rounded border-surface-300"
                              }, null, 40, ["checked", "onChange"])
                            ]),
                            createVNode("td", { class: "px-4 py-3 min-w-[180px]" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("leads.show", lead.id),
                                class: "font-semibold text-surface-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(lead.business_name), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"]),
                              createVNode("p", { class: "text-xs text-surface-400 mt-0.5" }, toDisplayString([lead.city, lead.country].filter(Boolean).join(", ")), 1)
                            ]),
                            createVNode("td", { class: "px-4 py-3 hidden md:table-cell" }, [
                              lead.category ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-xs text-surface-600 dark:text-surface-400"
                              }, toDisplayString(lead.category), 1)) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-surface-300"
                              }, "—"))
                            ]),
                            createVNode("td", { class: "px-4 py-3" }, [
                              lead.rating ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex items-center gap-1"
                              }, [
                                createVNode(unref(Star), { class: "h-3.5 w-3.5 text-yellow-400 fill-yellow-400 flex-shrink-0" }),
                                createVNode("span", { class: "text-xs font-medium text-surface-700 dark:text-surface-300" }, toDisplayString(lead.rating), 1),
                                createVNode("span", { class: "text-xs text-surface-400" }, "(" + toDisplayString(lead.reviews_count) + ")", 1)
                              ])) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-surface-300 text-xs"
                              }, "—"))
                            ]),
                            createVNode("td", { class: "px-4 py-3" }, [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                lead.phone ? (openBlock(), createBlock("a", {
                                  key: 0,
                                  href: `tel:${lead.phone}`,
                                  class: "p-1 rounded-md bg-green-50 hover:bg-green-100 dark:bg-green-900/30 transition-colors",
                                  title: lead.phone
                                }, [
                                  createVNode(unref(Phone), { class: "h-3.5 w-3.5 text-green-600 dark:text-green-400" })
                                ], 8, ["href", "title"])) : createCommentVNode("", true),
                                lead.email ? (openBlock(), createBlock("a", {
                                  key: 1,
                                  href: `mailto:${lead.email}`,
                                  class: "p-1 rounded-md bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/30 transition-colors",
                                  title: lead.email
                                }, [
                                  createVNode(unref(Mail), { class: "h-3.5 w-3.5 text-primary-600 dark:text-primary-400" })
                                ], 8, ["href", "title"])) : createCommentVNode("", true),
                                lead.website ? (openBlock(), createBlock("a", {
                                  key: 2,
                                  href: lead.website,
                                  target: "_blank",
                                  rel: "noopener",
                                  class: "p-1 rounded-md bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/30 transition-colors",
                                  title: lead.website
                                }, [
                                  createVNode(unref(Globe), { class: "h-3.5 w-3.5 text-orange-600 dark:text-orange-400" })
                                ], 8, ["href", "title"])) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("td", { class: "px-4 py-3 hidden lg:table-cell" }, [
                              lead.ai_category ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: ["badge text-xs font-medium", aiCategoryColor(lead.ai_category)]
                              }, toDisplayString(lead.ai_category.replace("_", " ")), 3)) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-surface-300 text-xs"
                              }, "—"))
                            ]),
                            createVNode("td", { class: "px-4 py-3" }, [
                              createVNode("span", {
                                class: ["badge text-xs font-medium capitalize", statusColor(lead.user_status)]
                              }, toDisplayString(lead.user_status), 3)
                            ]),
                            createVNode("td", { class: "px-4 py-3" }, [
                              createVNode("button", {
                                onClick: ($event) => toggleFavorite(lead),
                                class: "p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                              }, [
                                createVNode(unref(Star), {
                                  class: [
                                    "h-4 w-4 transition-colors",
                                    lead.is_favorite ? "fill-yellow-400 text-yellow-400" : "text-surface-300 hover:text-yellow-400"
                                  ]
                                }, null, 8, ["class"])
                              ], 8, ["onClick"])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "flex flex-col items-center justify-center py-20 px-6 text-center"
                  }, [
                    createVNode("div", { class: "w-16 h-16 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-4" }, [
                      createVNode(unref(Bookmark), { class: "h-8 w-8 text-surface-400" })
                    ]),
                    createVNode("h3", { class: "text-lg font-semibold text-surface-900 dark:text-white mb-1" }, "No Saved Leads"),
                    createVNode("p", { class: "text-sm text-surface-500 max-w-xs mb-6" }, " You haven't saved any leads yet. Start by searching for businesses and saving potential leads. "),
                    createVNode(unref(Link), {
                      href: _ctx.route("leads.search.create"),
                      class: "btn-primary"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Search), { class: "h-4 w-4" }),
                        createTextVNode(" Search for Leads ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]))
                ]),
                __props.leads.last_page > 1 ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex items-center justify-between text-sm"
                }, [
                  createVNode("p", { class: "text-surface-500" }, " Showing " + toDisplayString(__props.leads.from) + "–" + toDisplayString(__props.leads.to) + " of " + toDisplayString(__props.leads.total) + " leads ", 1),
                  createVNode("div", { class: "flex gap-1" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.leads.links, (link) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: link.label,
                        href: link.url ?? "#",
                        class: [
                          "px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors",
                          link.active ? "bg-primary-600 text-white border-primary-600" : link.url ? "border-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800 dark:border-surface-700" : "border-surface-100 text-surface-300 cursor-not-allowed dark:border-surface-800"
                        ],
                        innerHTML: link.label,
                        "preserve-scroll": true
                      }, null, 8, ["href", "class", "innerHTML"]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Leads/Index.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$j
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$i = {
  __name: "SavedSearches",
  __ssrInlineRender: true,
  props: { saved: Array },
  setup(__props) {
    const run = (id) => router.post(route("leads.saved.run", id));
    const remove = (id) => {
      if (confirm("Delete this saved search?")) {
        router.delete(route("leads.saved.destroy", id), { preserveScroll: true });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Saved Searches" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}>Saved Searches</h1><p class="mt-1 text-sm text-surface-500"${_scopeId}>Re-run searches you&#39;ve saved.</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("leads.search.create"),
              class: "btn-primary text-sm"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`New Search`);
                } else {
                  return [
                    createTextVNode("New Search")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-6 grid gap-3"${_scopeId}><!--[-->`);
            ssrRenderList(__props.saved, (s2) => {
              var _a, _b, _c, _d;
              _push2(`<div class="card p-4 flex items-center justify-between"${_scopeId}><div${_scopeId}><h3 class="font-semibold"${_scopeId}>${ssrInterpolate(s2.name)}</h3><p class="mt-1 text-sm text-surface-500 flex items-center gap-1.5"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(MapPin), { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate((_a = s2.filters) == null ? void 0 : _a.city)}, ${ssrInterpolate((_b = s2.filters) == null ? void 0 : _b.country)} · &quot;${ssrInterpolate((_c = s2.filters) == null ? void 0 : _c.query)}&quot; · ${ssrInterpolate((_d = s2.filters) == null ? void 0 : _d.radius_km)}km </p>`);
              if (s2.last_run_at) {
                _push2(`<p class="text-xs text-surface-400 mt-1"${_scopeId}> Last run: ${ssrInterpolate(new Date(s2.last_run_at).toLocaleString())}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex gap-2"${_scopeId}><button class="btn-primary text-sm"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Play), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(` Run </button><button class="btn-ghost text-sm text-red-600"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(`</button></div></div>`);
            });
            _push2(`<!--]-->`);
            if (__props.saved.length === 0) {
              _push2(`<div class="card p-12 text-center"${_scopeId}><p class="text-surface-500"${_scopeId}>No saved searches yet.</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-2xl font-bold" }, "Saved Searches"),
                    createVNode("p", { class: "mt-1 text-sm text-surface-500" }, "Re-run searches you've saved.")
                  ]),
                  createVNode(unref(Link), {
                    href: _ctx.route("leads.search.create"),
                    class: "btn-primary text-sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("New Search")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("div", { class: "mt-6 grid gap-3" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.saved, (s2) => {
                    var _a, _b, _c, _d;
                    return openBlock(), createBlock("div", {
                      key: s2.id,
                      class: "card p-4 flex items-center justify-between"
                    }, [
                      createVNode("div", null, [
                        createVNode("h3", { class: "font-semibold" }, toDisplayString(s2.name), 1),
                        createVNode("p", { class: "mt-1 text-sm text-surface-500 flex items-center gap-1.5" }, [
                          createVNode(unref(MapPin), { class: "h-3.5 w-3.5" }),
                          createTextVNode(" " + toDisplayString((_a = s2.filters) == null ? void 0 : _a.city) + ", " + toDisplayString((_b = s2.filters) == null ? void 0 : _b.country) + ' · "' + toDisplayString((_c = s2.filters) == null ? void 0 : _c.query) + '" · ' + toDisplayString((_d = s2.filters) == null ? void 0 : _d.radius_km) + "km ", 1)
                        ]),
                        s2.last_run_at ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-surface-400 mt-1"
                        }, " Last run: " + toDisplayString(new Date(s2.last_run_at).toLocaleString()), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode("button", {
                          onClick: ($event) => run(s2.id),
                          class: "btn-primary text-sm"
                        }, [
                          createVNode(unref(Play), { class: "h-4 w-4" }),
                          createTextVNode(" Run ")
                        ], 8, ["onClick"]),
                        createVNode("button", {
                          onClick: ($event) => remove(s2.id),
                          class: "btn-ghost text-sm text-red-600"
                        }, [
                          createVNode(unref(Trash2), { class: "h-4 w-4" })
                        ], 8, ["onClick"])
                      ])
                    ]);
                  }), 128)),
                  __props.saved.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "card p-12 text-center"
                  }, [
                    createVNode("p", { class: "text-surface-500" }, "No saved searches yet.")
                  ])) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Leads/SavedSearches.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$i
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$h = {
  __name: "Search",
  __ssrInlineRender: true,
  props: {
    predefined_categories: { type: Array, default: () => [] },
    australian_states: { type: Array, default: () => [] },
    recent_batches: { type: Array, default: () => [] },
    active_batch_id: { type: Number, default: null },
    recent_searches: { type: Array, default: () => [] },
    saved_searches: { type: Array, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const activeTab = ref("generator");
    const generatorForm = ref({
      keywords: [],
      categoryInput: "",
      selectedStates: [],
      customLocation: "",
      limit: 50
    });
    const isSubmitting = ref(false);
    const submitError = ref(null);
    const activeBatch = ref(null);
    const batchStatus = ref(null);
    const batchLogs = ref([]);
    const batchLeads = ref([]);
    let pollInterval = null;
    const defaultPresets = [
      "Plumber",
      "Electrician",
      "Roofers",
      "Real Estate Agent",
      "Dentist",
      "Accountant",
      "Law Firm",
      "Cleaning Service",
      "HVAC Service",
      "Painter",
      "Car Dealer",
      "Hair Salon",
      "Gym",
      "Restaurant"
    ];
    const availablePresets = computed(() => {
      return props.predefined_categories && props.predefined_categories.length > 0 ? props.predefined_categories : defaultPresets;
    });
    const addKeyword = (kw) => {
      const clean = (kw || "").trim();
      if (!clean) return;
      if (!generatorForm.value.keywords.includes(clean)) {
        generatorForm.value.keywords.push(clean);
      }
      generatorForm.value.categoryInput = "";
    };
    const removeKeyword = (index) => {
      generatorForm.value.keywords.splice(index, 1);
    };
    const onKeywordInputKeydown = (e2) => {
      if (e2.key === "Enter" || e2.key === ",") {
        e2.preventDefault();
        addKeyword(generatorForm.value.categoryInput);
      }
    };
    const togglePreset = (preset) => {
      const idx = generatorForm.value.keywords.indexOf(preset);
      if (idx >= 0) {
        generatorForm.value.keywords.splice(idx, 1);
      } else {
        generatorForm.value.keywords.push(preset);
      }
    };
    const selectAllPresets = () => {
      const top = availablePresets.value.slice(0, 15);
      generatorForm.value.keywords = Array.from(/* @__PURE__ */ new Set([...generatorForm.value.keywords, ...top]));
    };
    const clearAllKeywords = () => {
      generatorForm.value.keywords = [];
    };
    const auStatesList = computed(() => {
      if (props.australian_states && props.australian_states.length > 0) {
        return props.australian_states;
      }
      return [
        { code: "NSW", name: "New South Wales" },
        { code: "VIC", name: "Victoria" },
        { code: "QLD", name: "Queensland" },
        { code: "WA", name: "Western Australia" },
        { code: "SA", name: "South Australia" },
        { code: "TAS", name: "Tasmania" },
        { code: "ACT", name: "Australian Capital Territory" },
        { code: "NT", name: "Northern Territory" }
      ];
    });
    const toggleState = (code) => {
      const idx = generatorForm.value.selectedStates.indexOf(code);
      if (idx >= 0) {
        generatorForm.value.selectedStates.splice(idx, 1);
      } else {
        generatorForm.value.selectedStates.push(code);
      }
    };
    const selectAllStates = () => {
      generatorForm.value.selectedStates = auStatesList.value.map((s2) => s2.code);
    };
    const clearAllStates = () => {
      generatorForm.value.selectedStates = [];
    };
    const startGenerator = async () => {
      var _a;
      submitError.value = null;
      if (generatorForm.value.keywords.length === 0 && generatorForm.value.categoryInput.trim()) {
        addKeyword(generatorForm.value.categoryInput);
      }
      if (generatorForm.value.keywords.length === 0) {
        submitError.value = "Please add at least one keyword or category.";
        return;
      }
      if (generatorForm.value.selectedStates.length === 0 && !generatorForm.value.customLocation.trim()) {
        submitError.value = "Please select at least one Australian state or enter a custom location.";
        return;
      }
      isSubmitting.value = true;
      try {
        const response = await fetch(route("leads.generator.start"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": ((_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content")) || "",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            keywords: generatorForm.value.keywords,
            selected_states: generatorForm.value.selectedStates,
            custom_location: generatorForm.value.customLocation,
            limit: parseInt(generatorForm.value.limit, 10) || 50
          })
        });
        const data = await response.json();
        if (!response.ok) {
          submitError.value = data.message || "Failed to start generator.";
          isSubmitting.value = false;
          return;
        }
        activeBatch.value = { id: data.batch_id };
        startPolling(data.batch_id);
      } catch (err) {
        submitError.value = err.message || "An unexpected error occurred.";
      } finally {
        isSubmitting.value = false;
      }
    };
    const fetchBatchStatus = async (batchId) => {
      try {
        const res = await fetch(route("leads.generator.batches.status", batchId), {
          headers: { "Accept": "application/json" }
        });
        if (!res.ok) return;
        const data = await res.json();
        batchStatus.value = data;
        batchLogs.value = data.logs || [];
        batchLeads.value = data.leads || [];
        if (data.is_finished) {
          stopPolling();
        }
      } catch (e2) {
        console.error("Error polling batch status:", e2);
      }
    };
    const startPolling = (batchId) => {
      stopPolling();
      fetchBatchStatus(batchId);
      pollInterval = setInterval(() => {
        fetchBatchStatus(batchId);
      }, 3e3);
    };
    const stopPolling = () => {
      if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
      }
    };
    const cancelBatch = async () => {
      var _a, _b;
      if (!((_a = batchStatus.value) == null ? void 0 : _a.id)) return;
      try {
        await fetch(route("leads.generator.batches.cancel", batchStatus.value.id), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": ((_b = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _b.getAttribute("content")) || "",
            "Accept": "application/json"
          }
        });
        fetchBatchStatus(batchStatus.value.id);
      } catch (e2) {
        console.error(e2);
      }
    };
    const dismissBatch = () => {
      stopPolling();
      activeBatch.value = null;
      batchStatus.value = null;
      batchLogs.value = [];
      batchLeads.value = [];
    };
    onMounted(() => {
      if (props.active_batch_id) {
        activeBatch.value = { id: props.active_batch_id };
        startPolling(props.active_batch_id);
      }
    });
    onBeforeUnmount(() => {
      stopPolling();
    });
    const locationData = {
      PK: { name: "Pakistan", states: {
        Punjab: ["Lahore", "Faisalabad", "Rawalpindi", "Gujranwala", "Multan", "Sialkot"],
        Sindh: ["Karachi", "Hyderabad", "Sukkur", "Larkana"],
        KPK: ["Peshawar", "Mardan", "Abbottabad"],
        "Islamabad Capital Territory": ["Islamabad"]
      } },
      AU: { name: "Australia", states: {
        "New South Wales": ["Sydney", "Newcastle", "Wollongong", "Parramatta"],
        "Victoria": ["Melbourne", "Geelong", "Ballarat", "Bendigo"],
        "Queensland": ["Brisbane", "Gold Coast", "Sunshine Coast", "Cairns"],
        "Western Australia": ["Perth", "Fremantle", "Mandurah"],
        "South Australia": ["Adelaide", "Mount Gambier"]
      } },
      US: { name: "United States", states: {
        California: ["Los Angeles", "San Francisco", "San Diego", "San Jose"],
        "New York": ["New York City", "Buffalo", "Rochester", "Albany"],
        Texas: ["Houston", "Dallas", "Austin", "San Antonio"],
        Florida: ["Miami", "Orlando", "Tampa", "Jacksonville"]
      } },
      GB: { name: "United Kingdom", states: {
        England: ["London", "Manchester", "Birmingham", "Leeds"],
        Scotland: ["Edinburgh", "Glasgow"]
      } }
    };
    const classicForm = useForm({
      country: "AU",
      state: "",
      city: "",
      query: "",
      category: "",
      radius_km: 10,
      min_rating: "",
      min_reviews: "",
      require_email: false,
      require_phone: false,
      require_website: false,
      save_search: false,
      save_search_name: ""
    });
    const submitClassic = () => classicForm.post(route("leads.search.store"));
    const classicCountries = Object.entries(locationData).map(([code, d2]) => ({ code, name: d2.name }));
    const classicStates = computed(() => classicForm.country && locationData[classicForm.country] ? Object.keys(locationData[classicForm.country].states) : []);
    const classicCities = computed(() => {
      var _a;
      return classicForm.country && classicForm.state && ((_a = locationData[classicForm.country]) == null ? void 0 : _a.states[classicForm.state]) ? locationData[classicForm.country].states[classicForm.state] : [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Google Maps Lead Generator" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="w-full space-y-6"${_scopeId}><div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-primary-600 p-6 md:p-8 text-white shadow-xl"${_scopeId}><div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-inner"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Sparkles), { class: "h-8 w-8 text-white" }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><div class="flex items-center gap-2 flex-wrap"${_scopeId}><h1 class="text-2xl md:text-3xl font-black tracking-tight"${_scopeId}>Google Maps Lead Generator</h1><span class="bg-white/20 backdrop-blur-sm text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider"${_scopeId}> ⚡ Python Playwright Engine </span></div><p class="mt-1 text-orange-100 text-sm md:text-base max-w-2xl"${_scopeId}> Extract verified B2B leads across Australia &amp; worldwide. Scrape phone numbers, websites, emails, ratings, and AI enrichment scores in real time. </p></div></div><div class="flex items-center gap-1.5 bg-black/20 backdrop-blur-md p-1.5 rounded-xl border border-white/10 self-stretch md:self-auto justify-center"${_scopeId}><button type="button" class="${ssrRenderClass([
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
              activeTab.value === "generator" ? "bg-white text-orange-600 shadow-md" : "text-white/80 hover:text-white"
            ])}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Sparkles), { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
            _push2(` Lead Generator </button><button type="button" class="${ssrRenderClass([
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
              activeTab.value === "classic" ? "bg-white text-orange-600 shadow-md" : "text-white/80 hover:text-white"
            ])}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
            _push2(` Classic Search </button><button type="button" class="${ssrRenderClass([
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
              activeTab.value === "history" ? "bg-white text-orange-600 shadow-md" : "text-white/80 hover:text-white"
            ])}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Clock), { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
            _push2(` Batches (${ssrInterpolate(((_a = __props.recent_batches) == null ? void 0 : _a.length) || 0)}) </button></div></div></div>`);
            if (batchStatus.value) {
              _push2(`<div class="card overflow-hidden border-2 border-orange-500/40 dark:border-orange-500/30 shadow-2xl"${_scopeId}><div class="bg-gradient-to-r from-surface-900 to-surface-800 text-white p-5 flex flex-wrap items-center justify-between gap-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="${ssrRenderClass([
                "w-10 h-10 rounded-xl flex items-center justify-center font-bold",
                batchStatus.value.status === "processing" ? "bg-orange-500/20 text-orange-400" : batchStatus.value.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
              ])}"${_scopeId}>`);
              if (batchStatus.value.status === "processing") {
                _push2(ssrRenderComponent(unref(Loader2), { class: "h-5 w-5 animate-spin" }, null, _parent2, _scopeId));
              } else if (batchStatus.value.status === "completed") {
                _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-5 w-5 text-green-400" }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(AlertCircle), { class: "h-5 w-5 text-red-400" }, null, _parent2, _scopeId));
              }
              _push2(`</div><div${_scopeId}><div class="flex items-center gap-2"${_scopeId}><h3 class="font-bold text-lg text-white"${_scopeId}>Scraper Batch #${ssrInterpolate(batchStatus.value.id)}</h3><span class="${ssrRenderClass([
                "text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                batchStatus.value.status === "processing" ? "bg-orange-500 text-white animate-pulse" : batchStatus.value.status === "completed" ? "bg-green-500 text-white" : "bg-surface-700 text-surface-300"
              ])}"${_scopeId}>${ssrInterpolate(batchStatus.value.status)}</span></div><p class="text-xs text-surface-400 mt-0.5"${_scopeId}> Jobs: ${ssrInterpolate(batchStatus.value.completed_jobs)} / ${ssrInterpolate(batchStatus.value.total_jobs)} completed · Found: <strong class="text-orange-400"${_scopeId}>${ssrInterpolate(batchStatus.value.found_leads)} leads</strong></p></div></div><div class="flex items-center gap-2"${_scopeId}>`);
              if (batchStatus.value.found_leads > 0) {
                _push2(`<a${ssrRenderAttr("href", _ctx.route("leads.generator.batches.export", batchStatus.value.id))} target="_blank" class="btn-primary text-xs py-2 px-3.5 bg-green-600 hover:bg-green-500 border-none flex items-center gap-1.5 shadow"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Download), { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
                _push2(` Download CSV (${ssrInterpolate(batchStatus.value.found_leads)}) </a>`);
              } else {
                _push2(`<!---->`);
              }
              if (batchStatus.value.status === "processing") {
                _push2(`<button type="button" class="px-3 py-2 rounded-lg text-xs font-semibold bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition"${_scopeId}> Cancel </button>`);
              } else {
                _push2(`<!---->`);
              }
              if (batchStatus.value.is_finished) {
                _push2(`<button type="button" class="p-2 text-surface-400 hover:text-white rounded-lg"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(X), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="w-full bg-surface-800 h-2"${_scopeId}><div class="bg-gradient-to-r from-orange-500 to-amber-400 h-2 transition-all duration-500" style="${ssrRenderStyle({ width: `${batchStatus.value.progress}%` })}"${_scopeId}></div></div><div class="p-5 bg-surface-950 text-surface-200 border-b border-surface-800"${_scopeId}><div class="flex items-center justify-between mb-2"${_scopeId}><div class="flex items-center gap-2 text-xs font-bold text-surface-400 uppercase tracking-wider"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Terminal), { class: "h-3.5 w-3.5 text-orange-400" }, null, _parent2, _scopeId));
              _push2(` Live Scraper Execution Logs </div><span class="text-xs text-surface-500"${_scopeId}>Auto-refreshing every 3s</span></div><div class="bg-surface-900 rounded-xl p-3 max-h-48 overflow-y-auto font-mono text-xs space-y-1 border border-surface-800"${_scopeId}>`);
              if (batchLogs.value.length === 0) {
                _push2(`<div class="text-surface-500 italic py-2"${_scopeId}> Initializing Playwright browser and queuing scraping requests... </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(batchLogs.value, (log) => {
                _push2(`<div class="${ssrRenderClass([
                  "flex items-start gap-2",
                  log.level === "error" ? "text-red-400 font-semibold" : log.level === "warning" ? "text-amber-400" : log.level === "success" ? "text-green-400 font-semibold" : "text-surface-300"
                ])}"${_scopeId}><span class="text-surface-500 select-none flex-shrink-0"${_scopeId}>[${ssrInterpolate(log.created_at)}]</span><span class="flex-1"${_scopeId}>${ssrInterpolate(log.message)}</span></div>`);
              });
              _push2(`<!--]--></div></div>`);
              if (batchLeads.value.length > 0) {
                _push2(`<div class="p-5 bg-white dark:bg-surface-900"${_scopeId}><div class="flex items-center justify-between mb-3"${_scopeId}><h4 class="font-bold text-sm text-surface-900 dark:text-white flex items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Sparkles), { class: "h-4 w-4 text-orange-500" }, null, _parent2, _scopeId));
                _push2(` Recently Scraped Leads in this Batch (${ssrInterpolate(batchLeads.value.length)}) </h4>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("leads.index"),
                  class: "text-xs text-primary-600 hover:underline"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` View all in My Leads → `);
                    } else {
                      return [
                        createTextVNode(" View all in My Leads → ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div><div class="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800"${_scopeId}><table class="w-full text-xs text-left"${_scopeId}><thead class="bg-surface-50 dark:bg-surface-800/60 text-surface-500 uppercase tracking-wider font-semibold"${_scopeId}><tr${_scopeId}><th class="px-3 py-2.5"${_scopeId}>Business Name</th><th class="px-3 py-2.5"${_scopeId}>Category</th><th class="px-3 py-2.5"${_scopeId}>Phone</th><th class="px-3 py-2.5"${_scopeId}>Location</th><th class="px-3 py-2.5"${_scopeId}>Rating</th><th class="px-3 py-2.5"${_scopeId}>AI Score</th></tr></thead><tbody class="divide-y divide-surface-200 dark:divide-surface-800"${_scopeId}><!--[-->`);
                ssrRenderList(batchLeads.value, (lead) => {
                  _push2(`<tr class="hover:bg-surface-50 dark:hover:bg-surface-800/30"${_scopeId}><td class="px-3 py-2.5 font-semibold text-surface-900 dark:text-white"${_scopeId}><div class="flex items-center gap-1.5"${_scopeId}>`);
                  if (lead.website) {
                    _push2(`<a${ssrRenderAttr("href", lead.website)} target="_blank" rel="noopener" class="hover:text-primary-600 underline"${_scopeId}>${ssrInterpolate(lead.business_name)}</a>`);
                  } else {
                    _push2(`<span${_scopeId}>${ssrInterpolate(lead.business_name)}</span>`);
                  }
                  _push2(`</div></td><td class="px-3 py-2.5 text-surface-500"${_scopeId}>${ssrInterpolate(lead.category || "—")}</td><td class="px-3 py-2.5 font-mono text-surface-700 dark:text-surface-300"${_scopeId}>${ssrInterpolate(lead.phone || "—")}</td><td class="px-3 py-2.5 text-surface-500"${_scopeId}>${ssrInterpolate(lead.city || "Australia")}</td><td class="px-3 py-2.5"${_scopeId}>`);
                  if (lead.rating) {
                    _push2(`<div class="flex items-center gap-1 text-amber-500 font-semibold"${_scopeId}>`);
                    _push2(ssrRenderComponent(unref(Star), { class: "h-3 w-3 fill-amber-400" }, null, _parent2, _scopeId));
                    _push2(`<span${_scopeId}>${ssrInterpolate(lead.rating)}</span><span class="text-surface-400 text-[10px]"${_scopeId}>(${ssrInterpolate(lead.reviews_count)})</span></div>`);
                  } else {
                    _push2(`<span class="text-surface-400"${_scopeId}>—</span>`);
                  }
                  _push2(`</td><td class="px-3 py-2.5"${_scopeId}>`);
                  if (lead.ai_score) {
                    _push2(`<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400"${_scopeId}>${ssrInterpolate(lead.ai_score)}/100 </span>`);
                  } else {
                    _push2(`<span class="text-surface-400"${_scopeId}>—</span>`);
                  }
                  _push2(`</td></tr>`);
                });
                _push2(`<!--]--></tbody></table></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "generator") {
              _push2(`<div class="space-y-6"${_scopeId}><div class="card p-6 space-y-6"${_scopeId}>`);
              if (submitError.value) {
                _push2(`<div class="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-300 flex items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(AlertCircle), { class: "h-4 w-4 flex-shrink-0" }, null, _parent2, _scopeId));
                _push2(`<span${_scopeId}>${ssrInterpolate(submitError.value)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div${_scopeId}><div class="flex items-center justify-between mb-2"${_scopeId}><label class="text-xs font-bold text-surface-600 dark:text-surface-300 uppercase tracking-wider flex items-center gap-1.5"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Sparkles), { class: "h-4 w-4 text-orange-500" }, null, _parent2, _scopeId));
              _push2(` Step 1: Select or Enter Target Keywords / Niches <span class="text-red-500"${_scopeId}>*</span></label><div class="flex items-center gap-2 text-xs"${_scopeId}><button type="button" class="text-primary-600 hover:underline"${_scopeId}>Select Top 15</button><span class="text-surface-300"${_scopeId}>·</span><button type="button" class="text-surface-400 hover:text-surface-600"${_scopeId}>Clear All</button></div></div><div class="mb-3 flex flex-wrap gap-1.5"${_scopeId}><!--[-->`);
              ssrRenderList(availablePresets.value, (preset) => {
                _push2(`<button type="button" class="${ssrRenderClass([
                  "px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 border",
                  generatorForm.value.keywords.includes(preset) ? "bg-orange-500 text-white border-orange-500 shadow-sm" : "bg-surface-50 dark:bg-surface-800/80 text-surface-700 dark:text-surface-300 border-surface-200 dark:border-surface-700 hover:border-orange-300 hover:bg-orange-50/50"
                ])}"${_scopeId}>`);
                if (!generatorForm.value.keywords.includes(preset)) {
                  _push2(ssrRenderComponent(unref(Plus), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                } else {
                  _push2(ssrRenderComponent(unref(X), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                }
                _push2(` ${ssrInterpolate(preset)}</button>`);
              });
              _push2(`<!--]--></div><div class="p-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-900/50"${_scopeId}><div class="flex flex-wrap items-center gap-1.5"${_scopeId}><!--[-->`);
              ssrRenderList(generatorForm.value.keywords, (kw, idx) => {
                _push2(`<span class="inline-flex items-center gap-1 bg-surface-900 dark:bg-surface-100 text-white dark:text-surface-900 px-3 py-1 rounded-full text-xs font-semibold shadow-sm"${_scopeId}>${ssrInterpolate(kw)} <button type="button" class="hover:text-red-400 p-0.5"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(X), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                _push2(`</button></span>`);
              });
              _push2(`<!--]--><input type="text"${ssrRenderAttr("value", generatorForm.value.categoryInput)} placeholder="Type custom niche &amp; press Enter (e.g. Solar Installers)" class="bg-transparent border-none text-xs text-surface-800 dark:text-surface-200 focus:ring-0 flex-1 min-w-[220px] p-1"${_scopeId}></div></div><p class="mt-1 text-[11px] text-surface-400"${_scopeId}> Tip: You can add multiple keywords. The scraper will scrape leads for each keyword across all selected locations. </p></div><div${_scopeId}><div class="flex items-center justify-between mb-2"${_scopeId}><label class="text-xs font-bold text-surface-600 dark:text-surface-300 uppercase tracking-wider flex items-center gap-1.5"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(MapPin), { class: "h-4 w-4 text-orange-500" }, null, _parent2, _scopeId));
              _push2(` Step 2: Choose Target Locations (Australia &amp; Worldwide) <span class="text-red-500"${_scopeId}>*</span></label><div class="flex items-center gap-2 text-xs"${_scopeId}><button type="button" class="text-primary-600 hover:underline"${_scopeId}>Select All States</button><span class="text-surface-300"${_scopeId}>·</span><button type="button" class="text-surface-400 hover:text-surface-600"${_scopeId}>Clear</button></div></div><div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 mb-3"${_scopeId}><!--[-->`);
              ssrRenderList(auStatesList.value, (state) => {
                _push2(`<button type="button" class="${ssrRenderClass([
                  "p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-0.5",
                  generatorForm.value.selectedStates.includes(state.code) ? "bg-primary-50 dark:bg-primary-950/60 border-primary-500 text-primary-700 dark:text-primary-300 font-bold shadow-sm ring-1 ring-primary-500" : "border-surface-200 dark:border-surface-700 hover:border-surface-400 bg-white dark:bg-surface-900 text-surface-600 dark:text-surface-400"
                ])}"${_scopeId}><span class="text-sm font-black"${_scopeId}>${ssrInterpolate(state.code)}</span><span class="text-[10px] truncate max-w-full opacity-80"${_scopeId}>${ssrInterpolate(state.name)}</span></button>`);
              });
              _push2(`<!--]--></div><div class="relative"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(MapPin), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" }, null, _parent2, _scopeId));
              _push2(`<input type="text"${ssrRenderAttr("value", generatorForm.value.customLocation)} placeholder="Or enter specific city / suburb / global region (e.g. Sydney NSW, Melbourne, London UK, Miami FL)" class="input pl-9 text-xs"${_scopeId}></div></div><div class="pt-4 border-t border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4"${_scopeId}><div class="flex items-center gap-3 w-full sm:w-auto"${_scopeId}><label class="text-xs font-bold text-surface-600 dark:text-surface-300 uppercase tracking-wider"${_scopeId}> Max Leads: </label><select class="input py-2 text-xs font-bold w-36"${_scopeId}><option${ssrRenderAttr("value", 10)}${ssrIncludeBooleanAttr(Array.isArray(generatorForm.value.limit) ? ssrLooseContain(generatorForm.value.limit, 10) : ssrLooseEqual(generatorForm.value.limit, 10)) ? " selected" : ""}${_scopeId}>10 leads</option><option${ssrRenderAttr("value", 25)}${ssrIncludeBooleanAttr(Array.isArray(generatorForm.value.limit) ? ssrLooseContain(generatorForm.value.limit, 25) : ssrLooseEqual(generatorForm.value.limit, 25)) ? " selected" : ""}${_scopeId}>25 leads</option><option${ssrRenderAttr("value", 50)}${ssrIncludeBooleanAttr(Array.isArray(generatorForm.value.limit) ? ssrLooseContain(generatorForm.value.limit, 50) : ssrLooseEqual(generatorForm.value.limit, 50)) ? " selected" : ""}${_scopeId}>50 leads (recommended)</option><option${ssrRenderAttr("value", 100)}${ssrIncludeBooleanAttr(Array.isArray(generatorForm.value.limit) ? ssrLooseContain(generatorForm.value.limit, 100) : ssrLooseEqual(generatorForm.value.limit, 100)) ? " selected" : ""}${_scopeId}>100 leads</option><option${ssrRenderAttr("value", 200)}${ssrIncludeBooleanAttr(Array.isArray(generatorForm.value.limit) ? ssrLooseContain(generatorForm.value.limit, 200) : ssrLooseEqual(generatorForm.value.limit, 200)) ? " selected" : ""}${_scopeId}>200 leads</option></select></div><button type="button"${ssrIncludeBooleanAttr(isSubmitting.value || generatorForm.value.keywords.length === 0 && !generatorForm.value.categoryInput.trim()) ? " disabled" : ""} class="btn-primary w-full sm:w-auto px-8 py-3 text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 border-none shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-50"${_scopeId}>`);
              if (isSubmitting.value) {
                _push2(ssrRenderComponent(unref(Loader2), { class: "h-4 w-4 animate-spin" }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(Sparkles), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              }
              _push2(` ${ssrInterpolate(isSubmitting.value ? "Starting Generator..." : "Start Lead Generator")}</button></div></div></div>`);
            } else if (activeTab.value === "classic") {
              _push2(`<div class="card p-6 space-y-6"${_scopeId}><div class="flex items-center gap-3 pb-4 border-b border-surface-200 dark:border-surface-700"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Search), { class: "h-5 w-5 text-orange-500" }, null, _parent2, _scopeId));
              _push2(`<div${_scopeId}><h3 class="font-bold text-surface-900 dark:text-white"${_scopeId}>Single-Area Targeted Search</h3><p class="text-xs text-surface-500"${_scopeId}>Pick Country &gt; State &gt; City for focused local business discovery</p></div></div><form class="space-y-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div${_scopeId}><label class="label"${_scopeId}>Country <span class="text-red-500"${_scopeId}>*</span></label><select class="input font-medium"${_scopeId}><!--[-->`);
              ssrRenderList(unref(classicCountries), (c2) => {
                _push2(`<option${ssrRenderAttr("value", c2.code)}${ssrIncludeBooleanAttr(Array.isArray(unref(classicForm).country) ? ssrLooseContain(unref(classicForm).country, c2.code) : ssrLooseEqual(unref(classicForm).country, c2.code)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(c2.name)}</option>`);
              });
              _push2(`<!--]--></select></div><div${_scopeId}><label class="label"${_scopeId}>State</label><select class="input font-medium"${ssrIncludeBooleanAttr(classicStates.value.length === 0) ? " disabled" : ""}${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(classicForm).state) ? ssrLooseContain(unref(classicForm).state, "") : ssrLooseEqual(unref(classicForm).state, "")) ? " selected" : ""}${_scopeId}>Select State</option><!--[-->`);
              ssrRenderList(classicStates.value, (s2) => {
                _push2(`<option${ssrRenderAttr("value", s2)}${ssrIncludeBooleanAttr(Array.isArray(unref(classicForm).state) ? ssrLooseContain(unref(classicForm).state, s2) : ssrLooseEqual(unref(classicForm).state, s2)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(s2)}</option>`);
              });
              _push2(`<!--]--></select></div><div${_scopeId}><label class="label"${_scopeId}>City</label><select class="input font-medium"${ssrIncludeBooleanAttr(classicCities.value.length === 0) ? " disabled" : ""}${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(classicForm).city) ? ssrLooseContain(unref(classicForm).city, "") : ssrLooseEqual(unref(classicForm).city, "")) ? " selected" : ""}${_scopeId}>Select City</option><!--[-->`);
              ssrRenderList(classicCities.value, (c2) => {
                _push2(`<option${ssrRenderAttr("value", c2)}${ssrIncludeBooleanAttr(Array.isArray(unref(classicForm).city) ? ssrLooseContain(unref(classicForm).city, c2) : ssrLooseEqual(unref(classicForm).city, c2)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(c2)}</option>`);
              });
              _push2(`<!--]--></select></div></div><div${_scopeId}><label class="label"${_scopeId}>Search Query / Keyword <span class="text-red-500"${_scopeId}>*</span></label><input type="text"${ssrRenderAttr("value", unref(classicForm).query)} placeholder="e.g. Plumbing Service, Dentist, Roofing Contractor" class="input font-medium" required${_scopeId}></div><button type="submit"${ssrIncludeBooleanAttr(unref(classicForm).processing || !unref(classicForm).country || !unref(classicForm).query) ? " disabled" : ""} class="btn-primary w-full py-3 font-bold text-sm"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Search), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(unref(classicForm).processing ? "Searching..." : "Run Classic Search")}</button></form></div>`);
            } else if (activeTab.value === "history") {
              _push2(`<div class="card p-6"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h3 class="font-bold text-surface-900 dark:text-white flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Clock), { class: "h-4 w-4 text-orange-500" }, null, _parent2, _scopeId));
              _push2(` Your Lead Generator Batches </h3><button type="button" class="text-xs text-primary-600 hover:underline"${_scopeId}> + New Generator Run </button></div>`);
              if (!__props.recent_batches || __props.recent_batches.length === 0) {
                _push2(`<div class="text-center py-12 text-surface-400"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Sparkles), { class: "h-8 w-8 mx-auto mb-2 opacity-40 text-orange-400" }, null, _parent2, _scopeId));
                _push2(`<p class="text-sm"${_scopeId}>No scraper batches run yet.</p></div>`);
              } else {
                _push2(`<div class="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800"${_scopeId}><table class="w-full text-xs text-left"${_scopeId}><thead class="bg-surface-50 dark:bg-surface-800/60 text-surface-500 uppercase tracking-wider font-semibold"${_scopeId}><tr${_scopeId}><th class="px-4 py-3"${_scopeId}>Batch ID</th><th class="px-4 py-3"${_scopeId}>Keywords</th><th class="px-4 py-3"${_scopeId}>Locations</th><th class="px-4 py-3"${_scopeId}>Status</th><th class="px-4 py-3"${_scopeId}>Leads Found</th><th class="px-4 py-3"${_scopeId}>Created</th><th class="px-4 py-3 text-right"${_scopeId}>Actions</th></tr></thead><tbody class="divide-y divide-surface-200 dark:divide-surface-800"${_scopeId}><!--[-->`);
                ssrRenderList(__props.recent_batches, (b2) => {
                  _push2(`<tr class="hover:bg-surface-50 dark:hover:bg-surface-800/30"${_scopeId}><td class="px-4 py-3 font-bold text-surface-900 dark:text-white"${_scopeId}>#${ssrInterpolate(b2.id)}</td><td class="px-4 py-3"${_scopeId}><span class="font-medium text-surface-800 dark:text-surface-200"${_scopeId}>${ssrInterpolate(Array.isArray(b2.query) ? b2.query.join(", ") : b2.query)}</span></td><td class="px-4 py-3 text-surface-500 truncate max-w-xs"${_scopeId}>${ssrInterpolate(Array.isArray(b2.location) ? b2.location.join(", ") : b2.location)}</td><td class="px-4 py-3"${_scopeId}><span class="${ssrRenderClass([
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                    b2.status === "completed" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : b2.status === "processing" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 animate-pulse" : "bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400"
                  ])}"${_scopeId}>${ssrInterpolate(b2.status)}</span></td><td class="px-4 py-3 font-bold text-orange-600 dark:text-orange-400"${_scopeId}>${ssrInterpolate(b2.leads_count ?? b2.found_leads ?? 0)}</td><td class="px-4 py-3 text-surface-400"${_scopeId}>${ssrInterpolate(b2.created_at)}</td><td class="px-4 py-3 text-right"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}><button type="button" class="p-1 text-surface-500 hover:text-primary-600" title="View Live Logs &amp; Details"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Eye), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                  _push2(`</button><a${ssrRenderAttr("href", _ctx.route("leads.generator.batches.export", b2.id))} target="_blank" class="p-1 text-green-600 hover:text-green-700" title="Download CSV"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Download), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                  _push2(`</a></div></td></tr>`);
                });
                _push2(`<!--]--></tbody></table></div>`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "w-full space-y-6" }, [
                createVNode("div", { class: "relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-primary-600 p-6 md:p-8 text-white shadow-xl" }, [
                  createVNode("div", { class: "relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" }, [
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode("div", { class: "w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-inner" }, [
                        createVNode(unref(Sparkles), { class: "h-8 w-8 text-white" })
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "flex items-center gap-2 flex-wrap" }, [
                          createVNode("h1", { class: "text-2xl md:text-3xl font-black tracking-tight" }, "Google Maps Lead Generator"),
                          createVNode("span", { class: "bg-white/20 backdrop-blur-sm text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider" }, " ⚡ Python Playwright Engine ")
                        ]),
                        createVNode("p", { class: "mt-1 text-orange-100 text-sm md:text-base max-w-2xl" }, " Extract verified B2B leads across Australia & worldwide. Scrape phone numbers, websites, emails, ratings, and AI enrichment scores in real time. ")
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center gap-1.5 bg-black/20 backdrop-blur-md p-1.5 rounded-xl border border-white/10 self-stretch md:self-auto justify-center" }, [
                      createVNode("button", {
                        type: "button",
                        onClick: ($event) => activeTab.value = "generator",
                        class: [
                          "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
                          activeTab.value === "generator" ? "bg-white text-orange-600 shadow-md" : "text-white/80 hover:text-white"
                        ]
                      }, [
                        createVNode(unref(Sparkles), { class: "h-3.5 w-3.5" }),
                        createTextVNode(" Lead Generator ")
                      ], 10, ["onClick"]),
                      createVNode("button", {
                        type: "button",
                        onClick: ($event) => activeTab.value = "classic",
                        class: [
                          "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
                          activeTab.value === "classic" ? "bg-white text-orange-600 shadow-md" : "text-white/80 hover:text-white"
                        ]
                      }, [
                        createVNode(unref(Search), { class: "h-3.5 w-3.5" }),
                        createTextVNode(" Classic Search ")
                      ], 10, ["onClick"]),
                      createVNode("button", {
                        type: "button",
                        onClick: ($event) => activeTab.value = "history",
                        class: [
                          "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
                          activeTab.value === "history" ? "bg-white text-orange-600 shadow-md" : "text-white/80 hover:text-white"
                        ]
                      }, [
                        createVNode(unref(Clock), { class: "h-3.5 w-3.5" }),
                        createTextVNode(" Batches (" + toDisplayString(((_b = __props.recent_batches) == null ? void 0 : _b.length) || 0) + ") ", 1)
                      ], 10, ["onClick"])
                    ])
                  ])
                ]),
                batchStatus.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "card overflow-hidden border-2 border-orange-500/40 dark:border-orange-500/30 shadow-2xl"
                }, [
                  createVNode("div", { class: "bg-gradient-to-r from-surface-900 to-surface-800 text-white p-5 flex flex-wrap items-center justify-between gap-4" }, [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode("div", {
                        class: [
                          "w-10 h-10 rounded-xl flex items-center justify-center font-bold",
                          batchStatus.value.status === "processing" ? "bg-orange-500/20 text-orange-400" : batchStatus.value.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        ]
                      }, [
                        batchStatus.value.status === "processing" ? (openBlock(), createBlock(unref(Loader2), {
                          key: 0,
                          class: "h-5 w-5 animate-spin"
                        })) : batchStatus.value.status === "completed" ? (openBlock(), createBlock(unref(CheckCircle), {
                          key: 1,
                          class: "h-5 w-5 text-green-400"
                        })) : (openBlock(), createBlock(unref(AlertCircle), {
                          key: 2,
                          class: "h-5 w-5 text-red-400"
                        }))
                      ], 2),
                      createVNode("div", null, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("h3", { class: "font-bold text-lg text-white" }, "Scraper Batch #" + toDisplayString(batchStatus.value.id), 1),
                          createVNode("span", {
                            class: [
                              "text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                              batchStatus.value.status === "processing" ? "bg-orange-500 text-white animate-pulse" : batchStatus.value.status === "completed" ? "bg-green-500 text-white" : "bg-surface-700 text-surface-300"
                            ]
                          }, toDisplayString(batchStatus.value.status), 3)
                        ]),
                        createVNode("p", { class: "text-xs text-surface-400 mt-0.5" }, [
                          createTextVNode(" Jobs: " + toDisplayString(batchStatus.value.completed_jobs) + " / " + toDisplayString(batchStatus.value.total_jobs) + " completed · Found: ", 1),
                          createVNode("strong", { class: "text-orange-400" }, toDisplayString(batchStatus.value.found_leads) + " leads", 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      batchStatus.value.found_leads > 0 ? (openBlock(), createBlock("a", {
                        key: 0,
                        href: _ctx.route("leads.generator.batches.export", batchStatus.value.id),
                        target: "_blank",
                        class: "btn-primary text-xs py-2 px-3.5 bg-green-600 hover:bg-green-500 border-none flex items-center gap-1.5 shadow"
                      }, [
                        createVNode(unref(Download), { class: "h-3.5 w-3.5" }),
                        createTextVNode(" Download CSV (" + toDisplayString(batchStatus.value.found_leads) + ") ", 1)
                      ], 8, ["href"])) : createCommentVNode("", true),
                      batchStatus.value.status === "processing" ? (openBlock(), createBlock("button", {
                        key: 1,
                        type: "button",
                        onClick: cancelBatch,
                        class: "px-3 py-2 rounded-lg text-xs font-semibold bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition"
                      }, " Cancel ")) : createCommentVNode("", true),
                      batchStatus.value.is_finished ? (openBlock(), createBlock("button", {
                        key: 2,
                        type: "button",
                        onClick: dismissBatch,
                        class: "p-2 text-surface-400 hover:text-white rounded-lg"
                      }, [
                        createVNode(unref(X), { class: "h-4 w-4" })
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "w-full bg-surface-800 h-2" }, [
                    createVNode("div", {
                      class: "bg-gradient-to-r from-orange-500 to-amber-400 h-2 transition-all duration-500",
                      style: { width: `${batchStatus.value.progress}%` }
                    }, null, 4)
                  ]),
                  createVNode("div", { class: "p-5 bg-surface-950 text-surface-200 border-b border-surface-800" }, [
                    createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                      createVNode("div", { class: "flex items-center gap-2 text-xs font-bold text-surface-400 uppercase tracking-wider" }, [
                        createVNode(unref(Terminal), { class: "h-3.5 w-3.5 text-orange-400" }),
                        createTextVNode(" Live Scraper Execution Logs ")
                      ]),
                      createVNode("span", { class: "text-xs text-surface-500" }, "Auto-refreshing every 3s")
                    ]),
                    createVNode("div", { class: "bg-surface-900 rounded-xl p-3 max-h-48 overflow-y-auto font-mono text-xs space-y-1 border border-surface-800" }, [
                      batchLogs.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-surface-500 italic py-2"
                      }, " Initializing Playwright browser and queuing scraping requests... ")) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(batchLogs.value, (log) => {
                        return openBlock(), createBlock("div", {
                          key: log.id,
                          class: [
                            "flex items-start gap-2",
                            log.level === "error" ? "text-red-400 font-semibold" : log.level === "warning" ? "text-amber-400" : log.level === "success" ? "text-green-400 font-semibold" : "text-surface-300"
                          ]
                        }, [
                          createVNode("span", { class: "text-surface-500 select-none flex-shrink-0" }, "[" + toDisplayString(log.created_at) + "]", 1),
                          createVNode("span", { class: "flex-1" }, toDisplayString(log.message), 1)
                        ], 2);
                      }), 128))
                    ])
                  ]),
                  batchLeads.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-5 bg-white dark:bg-surface-900"
                  }, [
                    createVNode("div", { class: "flex items-center justify-between mb-3" }, [
                      createVNode("h4", { class: "font-bold text-sm text-surface-900 dark:text-white flex items-center gap-2" }, [
                        createVNode(unref(Sparkles), { class: "h-4 w-4 text-orange-500" }),
                        createTextVNode(" Recently Scraped Leads in this Batch (" + toDisplayString(batchLeads.value.length) + ") ", 1)
                      ]),
                      createVNode(unref(Link), {
                        href: _ctx.route("leads.index"),
                        class: "text-xs text-primary-600 hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" View all in My Leads → ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    createVNode("div", { class: "overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800" }, [
                      createVNode("table", { class: "w-full text-xs text-left" }, [
                        createVNode("thead", { class: "bg-surface-50 dark:bg-surface-800/60 text-surface-500 uppercase tracking-wider font-semibold" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-3 py-2.5" }, "Business Name"),
                            createVNode("th", { class: "px-3 py-2.5" }, "Category"),
                            createVNode("th", { class: "px-3 py-2.5" }, "Phone"),
                            createVNode("th", { class: "px-3 py-2.5" }, "Location"),
                            createVNode("th", { class: "px-3 py-2.5" }, "Rating"),
                            createVNode("th", { class: "px-3 py-2.5" }, "AI Score")
                          ])
                        ]),
                        createVNode("tbody", { class: "divide-y divide-surface-200 dark:divide-surface-800" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(batchLeads.value, (lead) => {
                            return openBlock(), createBlock("tr", {
                              key: lead.id,
                              class: "hover:bg-surface-50 dark:hover:bg-surface-800/30"
                            }, [
                              createVNode("td", { class: "px-3 py-2.5 font-semibold text-surface-900 dark:text-white" }, [
                                createVNode("div", { class: "flex items-center gap-1.5" }, [
                                  lead.website ? (openBlock(), createBlock("a", {
                                    key: 0,
                                    href: lead.website,
                                    target: "_blank",
                                    rel: "noopener",
                                    class: "hover:text-primary-600 underline"
                                  }, toDisplayString(lead.business_name), 9, ["href"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(lead.business_name), 1))
                                ])
                              ]),
                              createVNode("td", { class: "px-3 py-2.5 text-surface-500" }, toDisplayString(lead.category || "—"), 1),
                              createVNode("td", { class: "px-3 py-2.5 font-mono text-surface-700 dark:text-surface-300" }, toDisplayString(lead.phone || "—"), 1),
                              createVNode("td", { class: "px-3 py-2.5 text-surface-500" }, toDisplayString(lead.city || "Australia"), 1),
                              createVNode("td", { class: "px-3 py-2.5" }, [
                                lead.rating ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex items-center gap-1 text-amber-500 font-semibold"
                                }, [
                                  createVNode(unref(Star), { class: "h-3 w-3 fill-amber-400" }),
                                  createVNode("span", null, toDisplayString(lead.rating), 1),
                                  createVNode("span", { class: "text-surface-400 text-[10px]" }, "(" + toDisplayString(lead.reviews_count) + ")", 1)
                                ])) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-surface-400"
                                }, "—"))
                              ]),
                              createVNode("td", { class: "px-3 py-2.5" }, [
                                lead.ai_score ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "px-2 py-0.5 rounded text-[10px] font-bold bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400"
                                }, toDisplayString(lead.ai_score) + "/100 ", 1)) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-surface-400"
                                }, "—"))
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                activeTab.value === "generator" ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-6"
                }, [
                  createVNode("div", { class: "card p-6 space-y-6" }, [
                    submitError.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-300 flex items-center gap-2"
                    }, [
                      createVNode(unref(AlertCircle), { class: "h-4 w-4 flex-shrink-0" }),
                      createVNode("span", null, toDisplayString(submitError.value), 1)
                    ])) : createCommentVNode("", true),
                    createVNode("div", null, [
                      createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                        createVNode("label", { class: "text-xs font-bold text-surface-600 dark:text-surface-300 uppercase tracking-wider flex items-center gap-1.5" }, [
                          createVNode(unref(Sparkles), { class: "h-4 w-4 text-orange-500" }),
                          createTextVNode(" Step 1: Select or Enter Target Keywords / Niches "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode("div", { class: "flex items-center gap-2 text-xs" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: selectAllPresets,
                            class: "text-primary-600 hover:underline"
                          }, "Select Top 15"),
                          createVNode("span", { class: "text-surface-300" }, "·"),
                          createVNode("button", {
                            type: "button",
                            onClick: clearAllKeywords,
                            class: "text-surface-400 hover:text-surface-600"
                          }, "Clear All")
                        ])
                      ]),
                      createVNode("div", { class: "mb-3 flex flex-wrap gap-1.5" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(availablePresets.value, (preset) => {
                          return openBlock(), createBlock("button", {
                            key: preset,
                            type: "button",
                            onClick: ($event) => togglePreset(preset),
                            class: [
                              "px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 border",
                              generatorForm.value.keywords.includes(preset) ? "bg-orange-500 text-white border-orange-500 shadow-sm" : "bg-surface-50 dark:bg-surface-800/80 text-surface-700 dark:text-surface-300 border-surface-200 dark:border-surface-700 hover:border-orange-300 hover:bg-orange-50/50"
                            ]
                          }, [
                            !generatorForm.value.keywords.includes(preset) ? (openBlock(), createBlock(unref(Plus), {
                              key: 0,
                              class: "h-3 w-3"
                            })) : (openBlock(), createBlock(unref(X), {
                              key: 1,
                              class: "h-3 w-3"
                            })),
                            createTextVNode(" " + toDisplayString(preset), 1)
                          ], 10, ["onClick"]);
                        }), 128))
                      ]),
                      createVNode("div", { class: "p-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-900/50" }, [
                        createVNode("div", { class: "flex flex-wrap items-center gap-1.5" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(generatorForm.value.keywords, (kw, idx) => {
                            return openBlock(), createBlock("span", {
                              key: idx,
                              class: "inline-flex items-center gap-1 bg-surface-900 dark:bg-surface-100 text-white dark:text-surface-900 px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                            }, [
                              createTextVNode(toDisplayString(kw) + " ", 1),
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => removeKeyword(idx),
                                class: "hover:text-red-400 p-0.5"
                              }, [
                                createVNode(unref(X), { class: "h-3 w-3" })
                              ], 8, ["onClick"])
                            ]);
                          }), 128)),
                          withDirectives(createVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": ($event) => generatorForm.value.categoryInput = $event,
                            onKeydown: onKeywordInputKeydown,
                            placeholder: "Type custom niche & press Enter (e.g. Solar Installers)",
                            class: "bg-transparent border-none text-xs text-surface-800 dark:text-surface-200 focus:ring-0 flex-1 min-w-[220px] p-1"
                          }, null, 40, ["onUpdate:modelValue"]), [
                            [vModelText, generatorForm.value.categoryInput]
                          ])
                        ])
                      ]),
                      createVNode("p", { class: "mt-1 text-[11px] text-surface-400" }, " Tip: You can add multiple keywords. The scraper will scrape leads for each keyword across all selected locations. ")
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                        createVNode("label", { class: "text-xs font-bold text-surface-600 dark:text-surface-300 uppercase tracking-wider flex items-center gap-1.5" }, [
                          createVNode(unref(MapPin), { class: "h-4 w-4 text-orange-500" }),
                          createTextVNode(" Step 2: Choose Target Locations (Australia & Worldwide) "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode("div", { class: "flex items-center gap-2 text-xs" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: selectAllStates,
                            class: "text-primary-600 hover:underline"
                          }, "Select All States"),
                          createVNode("span", { class: "text-surface-300" }, "·"),
                          createVNode("button", {
                            type: "button",
                            onClick: clearAllStates,
                            class: "text-surface-400 hover:text-surface-600"
                          }, "Clear")
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 mb-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(auStatesList.value, (state) => {
                          return openBlock(), createBlock("button", {
                            key: state.code,
                            type: "button",
                            onClick: ($event) => toggleState(state.code),
                            class: [
                              "p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-0.5",
                              generatorForm.value.selectedStates.includes(state.code) ? "bg-primary-50 dark:bg-primary-950/60 border-primary-500 text-primary-700 dark:text-primary-300 font-bold shadow-sm ring-1 ring-primary-500" : "border-surface-200 dark:border-surface-700 hover:border-surface-400 bg-white dark:bg-surface-900 text-surface-600 dark:text-surface-400"
                            ]
                          }, [
                            createVNode("span", { class: "text-sm font-black" }, toDisplayString(state.code), 1),
                            createVNode("span", { class: "text-[10px] truncate max-w-full opacity-80" }, toDisplayString(state.name), 1)
                          ], 10, ["onClick"]);
                        }), 128))
                      ]),
                      createVNode("div", { class: "relative" }, [
                        createVNode(unref(MapPin), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" }),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => generatorForm.value.customLocation = $event,
                          placeholder: "Or enter specific city / suburb / global region (e.g. Sydney NSW, Melbourne, London UK, Miami FL)",
                          class: "input pl-9 text-xs"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, generatorForm.value.customLocation]
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "pt-4 border-t border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4" }, [
                      createVNode("div", { class: "flex items-center gap-3 w-full sm:w-auto" }, [
                        createVNode("label", { class: "text-xs font-bold text-surface-600 dark:text-surface-300 uppercase tracking-wider" }, " Max Leads: "),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => generatorForm.value.limit = $event,
                          class: "input py-2 text-xs font-bold w-36"
                        }, [
                          createVNode("option", { value: 10 }, "10 leads"),
                          createVNode("option", { value: 25 }, "25 leads"),
                          createVNode("option", { value: 50 }, "50 leads (recommended)"),
                          createVNode("option", { value: 100 }, "100 leads"),
                          createVNode("option", { value: 200 }, "200 leads")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, generatorForm.value.limit]
                        ])
                      ]),
                      createVNode("button", {
                        type: "button",
                        onClick: startGenerator,
                        disabled: isSubmitting.value || generatorForm.value.keywords.length === 0 && !generatorForm.value.categoryInput.trim(),
                        class: "btn-primary w-full sm:w-auto px-8 py-3 text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 border-none shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                      }, [
                        isSubmitting.value ? (openBlock(), createBlock(unref(Loader2), {
                          key: 0,
                          class: "h-4 w-4 animate-spin"
                        })) : (openBlock(), createBlock(unref(Sparkles), {
                          key: 1,
                          class: "h-4 w-4"
                        })),
                        createTextVNode(" " + toDisplayString(isSubmitting.value ? "Starting Generator..." : "Start Lead Generator"), 1)
                      ], 8, ["disabled"])
                    ])
                  ])
                ])) : activeTab.value === "classic" ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "card p-6 space-y-6"
                }, [
                  createVNode("div", { class: "flex items-center gap-3 pb-4 border-b border-surface-200 dark:border-surface-700" }, [
                    createVNode(unref(Search), { class: "h-5 w-5 text-orange-500" }),
                    createVNode("div", null, [
                      createVNode("h3", { class: "font-bold text-surface-900 dark:text-white" }, "Single-Area Targeted Search"),
                      createVNode("p", { class: "text-xs text-surface-500" }, "Pick Country > State > City for focused local business discovery")
                    ])
                  ]),
                  createVNode("form", {
                    onSubmit: withModifiers(submitClassic, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "label" }, [
                          createTextVNode("Country "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(classicForm).country = $event,
                          class: "input font-medium"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(classicCountries), (c2) => {
                            return openBlock(), createBlock("option", {
                              key: c2.code,
                              value: c2.code
                            }, toDisplayString(c2.name), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(classicForm).country]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "label" }, "State"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(classicForm).state = $event,
                          class: "input font-medium",
                          disabled: classicStates.value.length === 0
                        }, [
                          createVNode("option", { value: "" }, "Select State"),
                          (openBlock(true), createBlock(Fragment, null, renderList(classicStates.value, (s2) => {
                            return openBlock(), createBlock("option", {
                              key: s2,
                              value: s2
                            }, toDisplayString(s2), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue", "disabled"]), [
                          [vModelSelect, unref(classicForm).state]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "label" }, "City"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(classicForm).city = $event,
                          class: "input font-medium",
                          disabled: classicCities.value.length === 0
                        }, [
                          createVNode("option", { value: "" }, "Select City"),
                          (openBlock(true), createBlock(Fragment, null, renderList(classicCities.value, (c2) => {
                            return openBlock(), createBlock("option", {
                              key: c2,
                              value: c2
                            }, toDisplayString(c2), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue", "disabled"]), [
                          [vModelSelect, unref(classicForm).city]
                        ])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "label" }, [
                        createTextVNode("Search Query / Keyword "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        type: "text",
                        "onUpdate:modelValue": ($event) => unref(classicForm).query = $event,
                        placeholder: "e.g. Plumbing Service, Dentist, Roofing Contractor",
                        class: "input font-medium",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(classicForm).query]
                      ])
                    ]),
                    createVNode("button", {
                      type: "submit",
                      disabled: unref(classicForm).processing || !unref(classicForm).country || !unref(classicForm).query,
                      class: "btn-primary w-full py-3 font-bold text-sm"
                    }, [
                      createVNode(unref(Search), { class: "h-4 w-4" }),
                      createTextVNode(" " + toDisplayString(unref(classicForm).processing ? "Searching..." : "Run Classic Search"), 1)
                    ], 8, ["disabled"])
                  ], 32)
                ])) : activeTab.value === "history" ? (openBlock(), createBlock("div", {
                  key: 3,
                  class: "card p-6"
                }, [
                  createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                    createVNode("h3", { class: "font-bold text-surface-900 dark:text-white flex items-center gap-2" }, [
                      createVNode(unref(Clock), { class: "h-4 w-4 text-orange-500" }),
                      createTextVNode(" Your Lead Generator Batches ")
                    ]),
                    createVNode("button", {
                      type: "button",
                      onClick: ($event) => activeTab.value = "generator",
                      class: "text-xs text-primary-600 hover:underline"
                    }, " + New Generator Run ", 8, ["onClick"])
                  ]),
                  !__props.recent_batches || __props.recent_batches.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-12 text-surface-400"
                  }, [
                    createVNode(unref(Sparkles), { class: "h-8 w-8 mx-auto mb-2 opacity-40 text-orange-400" }),
                    createVNode("p", { class: "text-sm" }, "No scraper batches run yet.")
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800"
                  }, [
                    createVNode("table", { class: "w-full text-xs text-left" }, [
                      createVNode("thead", { class: "bg-surface-50 dark:bg-surface-800/60 text-surface-500 uppercase tracking-wider font-semibold" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-4 py-3" }, "Batch ID"),
                          createVNode("th", { class: "px-4 py-3" }, "Keywords"),
                          createVNode("th", { class: "px-4 py-3" }, "Locations"),
                          createVNode("th", { class: "px-4 py-3" }, "Status"),
                          createVNode("th", { class: "px-4 py-3" }, "Leads Found"),
                          createVNode("th", { class: "px-4 py-3" }, "Created"),
                          createVNode("th", { class: "px-4 py-3 text-right" }, "Actions")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-surface-200 dark:divide-surface-800" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.recent_batches, (b2) => {
                          return openBlock(), createBlock("tr", {
                            key: b2.id,
                            class: "hover:bg-surface-50 dark:hover:bg-surface-800/30"
                          }, [
                            createVNode("td", { class: "px-4 py-3 font-bold text-surface-900 dark:text-white" }, "#" + toDisplayString(b2.id), 1),
                            createVNode("td", { class: "px-4 py-3" }, [
                              createVNode("span", { class: "font-medium text-surface-800 dark:text-surface-200" }, toDisplayString(Array.isArray(b2.query) ? b2.query.join(", ") : b2.query), 1)
                            ]),
                            createVNode("td", { class: "px-4 py-3 text-surface-500 truncate max-w-xs" }, toDisplayString(Array.isArray(b2.location) ? b2.location.join(", ") : b2.location), 1),
                            createVNode("td", { class: "px-4 py-3" }, [
                              createVNode("span", {
                                class: [
                                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                  b2.status === "completed" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : b2.status === "processing" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 animate-pulse" : "bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400"
                                ]
                              }, toDisplayString(b2.status), 3)
                            ]),
                            createVNode("td", { class: "px-4 py-3 font-bold text-orange-600 dark:text-orange-400" }, toDisplayString(b2.leads_count ?? b2.found_leads ?? 0), 1),
                            createVNode("td", { class: "px-4 py-3 text-surface-400" }, toDisplayString(b2.created_at), 1),
                            createVNode("td", { class: "px-4 py-3 text-right" }, [
                              createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => startPolling(b2.id),
                                  class: "p-1 text-surface-500 hover:text-primary-600",
                                  title: "View Live Logs & Details"
                                }, [
                                  createVNode(unref(Eye), { class: "h-4 w-4" })
                                ], 8, ["onClick"]),
                                createVNode("a", {
                                  href: _ctx.route("leads.generator.batches.export", b2.id),
                                  target: "_blank",
                                  class: "p-1 text-green-600 hover:text-green-700",
                                  title: "Download CSV"
                                }, [
                                  createVNode(unref(Download), { class: "h-4 w-4" })
                                ], 8, ["href"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]))
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Leads/Search.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$h
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$g = {
  __name: "SearchDetail",
  __ssrInlineRender: true,
  props: {
    search: Object,
    leads: Object
  },
  setup(__props) {
    const props = __props;
    const status = ref(props.search.status);
    const resultsCount = ref(props.search.results_count);
    const errorMessage = ref(props.search.error_message);
    let pollTimer = null;
    const isActive = computed(() => ["queued", "running"].includes(status.value));
    const poll = async () => {
      try {
        const res = await fetch(route("leads.searches.status", props.search.id));
        const data = await res.json();
        status.value = data.status;
        resultsCount.value = data.results_count;
        errorMessage.value = data.error_message;
        if (!isActive.value) {
          clearInterval(pollTimer);
          router.reload({ preserveScroll: true });
        }
      } catch (e2) {
        console.error(e2);
      }
    };
    onMounted(() => {
      if (isActive.value) {
        pollTimer = setInterval(poll, 4e3);
      }
    });
    onUnmounted(() => {
      if (pollTimer) clearInterval(pollTimer);
    });
    const cancel = () => {
      if (confirm("Cancel this search?")) {
        router.post(route("leads.searches.cancel", props.search.id), {}, { preserveScroll: true });
      }
    };
    const statusBadge = computed(() => ({
      queued: { class: "bg-surface-100 text-surface-700", icon: Clock, label: "Queued" },
      running: { class: "bg-primary-50 text-primary-700", icon: Loader, label: "Running" },
      completed: { class: "bg-accent-50 text-accent-700", icon: CheckCircle, label: "Completed" },
      failed: { class: "bg-red-50 text-red-700", icon: XCircle, label: "Failed" },
      cancelled: { class: "bg-orange-50 text-orange-700", icon: XCircle, label: "Cancelled" }
    })[status.value] || { class: "bg-surface-100", icon: Clock, label: status.value });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `${__props.search.query} — Search Results`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-7xl mx-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("leads.search.create"),
              class: "text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Back to search `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                    createTextVNode(" Back to search ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mt-4 card p-6"${_scopeId}><div class="flex items-start justify-between flex-wrap gap-4"${_scopeId}><div${_scopeId}><h1 class="text-xl font-bold"${_scopeId}>${ssrInterpolate(__props.search.query)}</h1><p class="mt-1 text-sm text-surface-500"${_scopeId}>${ssrInterpolate(__props.search.city)}${ssrInterpolate(__props.search.state ? ", " + __props.search.state : "")}, ${ssrInterpolate(__props.search.country)} · ${ssrInterpolate(__props.search.radius_km)} km radius </p></div><div class="flex items-center gap-2"${_scopeId}><span class="${ssrRenderClass(["badge", statusBadge.value.class, "inline-flex items-center gap-1"])}"${_scopeId}>`);
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(statusBadge.value.icon), {
              class: ["h-3.5 w-3.5", isActive.value ? "animate-spin" : ""]
            }, null), _parent2, _scopeId);
            _push2(` ${ssrInterpolate(statusBadge.value.label)}</span>`);
            if (isActive.value) {
              _push2(`<button class="btn-ghost text-sm text-red-600"${_scopeId}>Cancel</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm"${_scopeId}><div${_scopeId}><p class="text-xs text-surface-500"${_scopeId}>Results found</p><p class="font-bold text-lg"${_scopeId}>${ssrInterpolate(resultsCount.value)}</p></div>`);
            if (__props.search.duration_seconds) {
              _push2(`<div${_scopeId}><p class="text-xs text-surface-500"${_scopeId}>Duration</p><p class="font-bold text-lg"${_scopeId}>${ssrInterpolate(__props.search.duration_seconds)}s</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.search.min_rating) {
              _push2(`<div${_scopeId}><p class="text-xs text-surface-500"${_scopeId}>Min rating</p><p class="font-bold text-lg"${_scopeId}>${ssrInterpolate(__props.search.min_rating)}+</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (errorMessage.value) {
              _push2(`<div class="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-sm text-red-700 dark:text-red-300"${_scopeId}>${ssrInterpolate(errorMessage.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (isActive.value && __props.leads.data.length === 0) {
              _push2(`<div class="mt-6 card p-12 text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Loader), { class: "h-8 w-8 mx-auto text-primary-600 animate-spin" }, null, _parent2, _scopeId));
              _push2(`<p class="mt-3 text-surface-600 dark:text-surface-300"${_scopeId}>Scraping in progress... Leads will appear here.</p><p class="mt-1 text-xs text-surface-400"${_scopeId}>This typically takes 30-90 seconds.</p></div>`);
            } else if (__props.leads.data.length) {
              _push2(`<div class="mt-6 card overflow-hidden"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead class="bg-surface-50 dark:bg-surface-800/50 text-left"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 font-semibold"${_scopeId}>Business</th><th class="px-4 py-3 font-semibold"${_scopeId}>Category</th><th class="px-4 py-3 font-semibold"${_scopeId}>Rating</th><th class="px-4 py-3 font-semibold"${_scopeId}>Contact</th><th class="px-4 py-3 font-semibold"${_scopeId}>Score</th></tr></thead><tbody class="divide-y divide-surface-200 dark:divide-surface-800"${_scopeId}><!--[-->`);
              ssrRenderList(__props.leads.data, (lead) => {
                _push2(`<tr class="hover:bg-surface-50 dark:hover:bg-surface-800/30"${_scopeId}><td class="px-4 py-3"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("leads.show", lead.id),
                  class: "font-medium hover:text-primary-600"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(lead.business_name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(lead.business_name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<p class="text-xs text-surface-500"${_scopeId}>${ssrInterpolate(lead.city)}</p></td><td class="px-4 py-3 text-surface-600 dark:text-surface-300"${_scopeId}>${ssrInterpolate(lead.category || "—")}</td><td class="px-4 py-3"${_scopeId}>`);
                if (lead.rating) {
                  _push2(`<div class="flex items-center gap-1"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Star), { class: "h-3.5 w-3.5 text-yellow-400 fill-yellow-400" }, null, _parent2, _scopeId));
                  _push2(`<span${_scopeId}>${ssrInterpolate(lead.rating)}</span><span class="text-xs text-surface-500"${_scopeId}>(${ssrInterpolate(lead.reviews_count)})</span></div>`);
                } else {
                  _push2(`<span class="text-surface-400"${_scopeId}>—</span>`);
                }
                _push2(`</td><td class="px-4 py-3"${_scopeId}><div class="flex gap-2"${_scopeId}>`);
                if (lead.phone) {
                  _push2(ssrRenderComponent(unref(Phone), {
                    class: "h-4 w-4 text-accent-600",
                    title: lead.phone
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (lead.email) {
                  _push2(ssrRenderComponent(unref(Mail), {
                    class: "h-4 w-4 text-primary-600",
                    title: lead.email
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (lead.website) {
                  _push2(ssrRenderComponent(unref(Globe), {
                    class: "h-4 w-4 text-orange-600",
                    title: lead.website
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></td><td class="px-4 py-3"${_scopeId}>`);
                if (lead.ai_score) {
                  _push2(`<span class="badge bg-primary-50 text-primary-700"${_scopeId}>${ssrInterpolate(lead.ai_score)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div>`);
            } else {
              _push2(`<div class="mt-6 card p-12 text-center"${_scopeId}><p class="text-surface-500"${_scopeId}>No leads found for this search. Try widening your filters.</p></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-7xl mx-auto" }, [
                createVNode(unref(Link), {
                  href: _ctx.route("leads.search.create"),
                  class: "text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                    createTextVNode(" Back to search ")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("div", { class: "mt-4 card p-6" }, [
                  createVNode("div", { class: "flex items-start justify-between flex-wrap gap-4" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-xl font-bold" }, toDisplayString(__props.search.query), 1),
                      createVNode("p", { class: "mt-1 text-sm text-surface-500" }, toDisplayString(__props.search.city) + toDisplayString(__props.search.state ? ", " + __props.search.state : "") + ", " + toDisplayString(__props.search.country) + " · " + toDisplayString(__props.search.radius_km) + " km radius ", 1)
                    ]),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("span", {
                        class: ["badge", statusBadge.value.class, "inline-flex items-center gap-1"]
                      }, [
                        (openBlock(), createBlock(resolveDynamicComponent(statusBadge.value.icon), {
                          class: ["h-3.5 w-3.5", isActive.value ? "animate-spin" : ""]
                        }, null, 8, ["class"])),
                        createTextVNode(" " + toDisplayString(statusBadge.value.label), 1)
                      ], 2),
                      isActive.value ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: cancel,
                        class: "btn-ghost text-sm text-red-600"
                      }, "Cancel")) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs text-surface-500" }, "Results found"),
                      createVNode("p", { class: "font-bold text-lg" }, toDisplayString(resultsCount.value), 1)
                    ]),
                    __props.search.duration_seconds ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("p", { class: "text-xs text-surface-500" }, "Duration"),
                      createVNode("p", { class: "font-bold text-lg" }, toDisplayString(__props.search.duration_seconds) + "s", 1)
                    ])) : createCommentVNode("", true),
                    __props.search.min_rating ? (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode("p", { class: "text-xs text-surface-500" }, "Min rating"),
                      createVNode("p", { class: "font-bold text-lg" }, toDisplayString(__props.search.min_rating) + "+", 1)
                    ])) : createCommentVNode("", true)
                  ]),
                  errorMessage.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-sm text-red-700 dark:text-red-300"
                  }, toDisplayString(errorMessage.value), 1)) : createCommentVNode("", true)
                ]),
                isActive.value && __props.leads.data.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-6 card p-12 text-center"
                }, [
                  createVNode(unref(Loader), { class: "h-8 w-8 mx-auto text-primary-600 animate-spin" }),
                  createVNode("p", { class: "mt-3 text-surface-600 dark:text-surface-300" }, "Scraping in progress... Leads will appear here."),
                  createVNode("p", { class: "mt-1 text-xs text-surface-400" }, "This typically takes 30-90 seconds.")
                ])) : __props.leads.data.length ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "mt-6 card overflow-hidden"
                }, [
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full text-sm" }, [
                      createVNode("thead", { class: "bg-surface-50 dark:bg-surface-800/50 text-left" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-4 py-3 font-semibold" }, "Business"),
                          createVNode("th", { class: "px-4 py-3 font-semibold" }, "Category"),
                          createVNode("th", { class: "px-4 py-3 font-semibold" }, "Rating"),
                          createVNode("th", { class: "px-4 py-3 font-semibold" }, "Contact"),
                          createVNode("th", { class: "px-4 py-3 font-semibold" }, "Score")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-surface-200 dark:divide-surface-800" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.leads.data, (lead) => {
                          return openBlock(), createBlock("tr", {
                            key: lead.id,
                            class: "hover:bg-surface-50 dark:hover:bg-surface-800/30"
                          }, [
                            createVNode("td", { class: "px-4 py-3" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("leads.show", lead.id),
                                class: "font-medium hover:text-primary-600"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(lead.business_name), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"]),
                              createVNode("p", { class: "text-xs text-surface-500" }, toDisplayString(lead.city), 1)
                            ]),
                            createVNode("td", { class: "px-4 py-3 text-surface-600 dark:text-surface-300" }, toDisplayString(lead.category || "—"), 1),
                            createVNode("td", { class: "px-4 py-3" }, [
                              lead.rating ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex items-center gap-1"
                              }, [
                                createVNode(unref(Star), { class: "h-3.5 w-3.5 text-yellow-400 fill-yellow-400" }),
                                createVNode("span", null, toDisplayString(lead.rating), 1),
                                createVNode("span", { class: "text-xs text-surface-500" }, "(" + toDisplayString(lead.reviews_count) + ")", 1)
                              ])) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-surface-400"
                              }, "—"))
                            ]),
                            createVNode("td", { class: "px-4 py-3" }, [
                              createVNode("div", { class: "flex gap-2" }, [
                                lead.phone ? (openBlock(), createBlock(unref(Phone), {
                                  key: 0,
                                  class: "h-4 w-4 text-accent-600",
                                  title: lead.phone
                                }, null, 8, ["title"])) : createCommentVNode("", true),
                                lead.email ? (openBlock(), createBlock(unref(Mail), {
                                  key: 1,
                                  class: "h-4 w-4 text-primary-600",
                                  title: lead.email
                                }, null, 8, ["title"])) : createCommentVNode("", true),
                                lead.website ? (openBlock(), createBlock(unref(Globe), {
                                  key: 2,
                                  class: "h-4 w-4 text-orange-600",
                                  title: lead.website
                                }, null, 8, ["title"])) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("td", { class: "px-4 py-3" }, [
                              lead.ai_score ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "badge bg-primary-50 text-primary-700"
                              }, toDisplayString(lead.ai_score), 1)) : createCommentVNode("", true)
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])
                ])) : (openBlock(), createBlock("div", {
                  key: 2,
                  class: "mt-6 card p-12 text-center"
                }, [
                  createVNode("p", { class: "text-surface-500" }, "No leads found for this search. Try widening your filters.")
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Leads/SearchDetail.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$g
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$f = {
  __name: "SearchHistory",
  __ssrInlineRender: true,
  props: { searches: Object },
  setup(__props) {
    const statusIcon = (s2) => ({ queued: Clock, running: Loader, completed: CheckCircle, failed: XCircle, cancelled: XCircle })[s2] || Clock;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Search History" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-5xl mx-auto"${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}>Search History</h1><div class="mt-6 card overflow-hidden"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead class="bg-surface-50 dark:bg-surface-800/50 text-left"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 font-semibold"${_scopeId}>Query</th><th class="px-4 py-3 font-semibold"${_scopeId}>Location</th><th class="px-4 py-3 font-semibold"${_scopeId}>Results</th><th class="px-4 py-3 font-semibold"${_scopeId}>Duration</th><th class="px-4 py-3 font-semibold"${_scopeId}>Status</th><th class="px-4 py-3 font-semibold"${_scopeId}>Date</th></tr></thead><tbody class="divide-y divide-surface-200 dark:divide-surface-800"${_scopeId}><!--[-->`);
            ssrRenderList(__props.searches.data, (s2) => {
              _push2(`<tr class="hover:bg-surface-50 dark:hover:bg-surface-800/30"${_scopeId}><td class="px-4 py-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("leads.searches.show", s2.id),
                class: "font-medium hover:text-primary-600"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(s2.query)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(s2.query), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</td><td class="px-4 py-3 text-surface-600"${_scopeId}>${ssrInterpolate(s2.city)}, ${ssrInterpolate(s2.country)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(s2.results_count)}</td><td class="px-4 py-3 text-surface-500"${_scopeId}>${ssrInterpolate(s2.duration_seconds || "—")}s</td><td class="px-4 py-3"${_scopeId}><span class="inline-flex items-center gap-1.5 text-xs"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(statusIcon(s2.status)), { class: "h-4 w-4" }, null), _parent2, _scopeId);
              _push2(` ${ssrInterpolate(s2.status)}</span></td><td class="px-4 py-3 text-surface-500 text-xs"${_scopeId}>${ssrInterpolate(new Date(s2.created_at).toLocaleString())}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table>`);
            if (__props.searches.data.length === 0) {
              _push2(`<div class="p-12 text-center text-sm text-surface-500"${_scopeId}> No searches yet. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-5xl mx-auto" }, [
                createVNode("h1", { class: "text-2xl font-bold" }, "Search History"),
                createVNode("div", { class: "mt-6 card overflow-hidden" }, [
                  createVNode("table", { class: "w-full text-sm" }, [
                    createVNode("thead", { class: "bg-surface-50 dark:bg-surface-800/50 text-left" }, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Query"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Location"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Results"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Duration"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Status"),
                        createVNode("th", { class: "px-4 py-3 font-semibold" }, "Date")
                      ])
                    ]),
                    createVNode("tbody", { class: "divide-y divide-surface-200 dark:divide-surface-800" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.searches.data, (s2) => {
                        return openBlock(), createBlock("tr", {
                          key: s2.id,
                          class: "hover:bg-surface-50 dark:hover:bg-surface-800/30"
                        }, [
                          createVNode("td", { class: "px-4 py-3" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("leads.searches.show", s2.id),
                              class: "font-medium hover:text-primary-600"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(s2.query), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ]),
                          createVNode("td", { class: "px-4 py-3 text-surface-600" }, toDisplayString(s2.city) + ", " + toDisplayString(s2.country), 1),
                          createVNode("td", { class: "px-4 py-3" }, toDisplayString(s2.results_count), 1),
                          createVNode("td", { class: "px-4 py-3 text-surface-500" }, toDisplayString(s2.duration_seconds || "—") + "s", 1),
                          createVNode("td", { class: "px-4 py-3" }, [
                            createVNode("span", { class: "inline-flex items-center gap-1.5 text-xs" }, [
                              (openBlock(), createBlock(resolveDynamicComponent(statusIcon(s2.status)), { class: "h-4 w-4" })),
                              createTextVNode(" " + toDisplayString(s2.status), 1)
                            ])
                          ]),
                          createVNode("td", { class: "px-4 py-3 text-surface-500 text-xs" }, toDisplayString(new Date(s2.created_at).toLocaleString()), 1)
                        ]);
                      }), 128))
                    ])
                  ]),
                  __props.searches.data.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-12 text-center text-sm text-surface-500"
                  }, " No searches yet. ")) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Leads/SearchHistory.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$f
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$e = {
  __name: "Show",
  __ssrInlineRender: true,
  props: { lead: Object, pivot: Object },
  setup(__props) {
    const props = __props;
    const form = useForm({
      status: props.pivot.status,
      notes: props.pivot.notes || "",
      tags: props.pivot.tags || [],
      is_favorite: props.pivot.is_favorite,
      is_archived: props.pivot.is_archived
    });
    const newTag = ref("");
    const addTag = () => {
      if (newTag.value && !form.tags.includes(newTag.value)) {
        form.tags.push(newTag.value);
        newTag.value = "";
      }
    };
    const removeTag = (tag) => {
      form.tags = form.tags.filter((t3) => t3 !== tag);
    };
    const save = () => form.patch(route("leads.update", props.lead.id), { preserveScroll: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.lead.business_name
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-5xl mx-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("leads.index"),
              class: "text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Back to leads `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                    createTextVNode(" Back to leads ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6"${_scopeId}><div class="lg:col-span-2 space-y-6"${_scopeId}><div class="card p-6"${_scopeId}><div class="flex items-start justify-between gap-4"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}>${ssrInterpolate(__props.lead.business_name)}</h1>`);
            if (__props.lead.category) {
              _push2(`<p class="mt-1 text-surface-500"${_scopeId}>${ssrInterpolate(__props.lead.category)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button class="p-2 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Star), {
              class: ["h-5 w-5", unref(form).is_favorite ? "fill-yellow-400 text-yellow-400" : "text-surface-400"]
            }, null, _parent2, _scopeId));
            _push2(`</button></div>`);
            if (__props.lead.rating) {
              _push2(`<div class="mt-4 flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Star), { class: "h-4 w-4 text-yellow-400 fill-yellow-400" }, null, _parent2, _scopeId));
              _push2(`<span class="font-semibold"${_scopeId}>${ssrInterpolate(__props.lead.rating)}</span><span class="text-sm text-surface-500"${_scopeId}>(${ssrInterpolate(__props.lead.reviews_count)} reviews)</span>`);
              if (__props.lead.ai_score) {
                _push2(`<span class="ml-3 badge bg-primary-50 text-primary-700"${_scopeId}>AI Score: ${ssrInterpolate(__props.lead.ai_score)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.lead.ai_category) {
                _push2(`<span class="badge bg-surface-100 text-surface-700"${_scopeId}>${ssrInterpolate(__props.lead.ai_category.replace("_", " "))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-6 space-y-3 text-sm"${_scopeId}>`);
            if (__props.lead.phone) {
              _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Phone), { class: "h-4 w-4 text-surface-400" }, null, _parent2, _scopeId));
              _push2(`<a${ssrRenderAttr("href", `tel:${__props.lead.phone}`)} class="hover:text-primary-600"${_scopeId}>${ssrInterpolate(__props.lead.phone)}</a></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.lead.email) {
              _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Mail), { class: "h-4 w-4 text-surface-400" }, null, _parent2, _scopeId));
              _push2(`<a${ssrRenderAttr("href", `mailto:${__props.lead.email}`)} class="hover:text-primary-600"${_scopeId}>${ssrInterpolate(__props.lead.email)}</a></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.lead.website) {
              _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Globe), { class: "h-4 w-4 text-surface-400" }, null, _parent2, _scopeId));
              _push2(`<a${ssrRenderAttr("href", __props.lead.website)} target="_blank" rel="noopener" class="hover:text-primary-600 truncate"${_scopeId}>${ssrInterpolate(__props.lead.website)}</a></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.lead.address) {
              _push2(`<div class="flex items-start gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(MapPin), { class: "h-4 w-4 text-surface-400 mt-0.5 shrink-0" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(__props.lead.address)}, ${ssrInterpolate(__props.lead.city)}, ${ssrInterpolate(__props.lead.country)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="card p-6"${_scopeId}><h2 class="font-semibold mb-3"${_scopeId}>Your notes</h2><textarea rows="4" class="input" placeholder="Add notes about this lead..."${_scopeId}>${ssrInterpolate(unref(form).notes)}</textarea><div class="mt-3 flex justify-end"${_scopeId}><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary text-sm"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Saving..." : "Save notes")}</button></div></div></div><div class="space-y-6"${_scopeId}><div class="card p-5"${_scopeId}><label class="label"${_scopeId}>Status</label><select class="input"${_scopeId}><option value="new"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "new") : ssrLooseEqual(unref(form).status, "new")) ? " selected" : ""}${_scopeId}>New</option><option value="contacted"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "contacted") : ssrLooseEqual(unref(form).status, "contacted")) ? " selected" : ""}${_scopeId}>Contacted</option><option value="responded"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "responded") : ssrLooseEqual(unref(form).status, "responded")) ? " selected" : ""}${_scopeId}>Responded</option><option value="converted"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "converted") : ssrLooseEqual(unref(form).status, "converted")) ? " selected" : ""}${_scopeId}>Converted</option><option value="closed"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "closed") : ssrLooseEqual(unref(form).status, "closed")) ? " selected" : ""}${_scopeId}>Closed</option></select></div><div class="card p-5"${_scopeId}><label class="label"${_scopeId}>Tags</label><div class="flex flex-wrap gap-2 mt-2"${_scopeId}><!--[-->`);
            ssrRenderList(unref(form).tags, (tag) => {
              _push2(`<span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs"${_scopeId}>${ssrInterpolate(tag)} <button class="hover:text-red-600"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(X), { class: "h-3 w-3" }, null, _parent2, _scopeId));
              _push2(`</button></span>`);
            });
            _push2(`<!--]--></div><div class="mt-3 flex gap-2"${_scopeId}><input${ssrRenderAttr("value", newTag.value)} class="input text-sm" placeholder="Add tag..."${_scopeId}><button class="btn-secondary text-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Tag), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(`</button></div></div><div class="card p-5 space-y-2"${_scopeId}><button class="btn-secondary w-full text-sm"${_scopeId}>${ssrInterpolate(unref(form).is_archived ? "Unarchive" : "Archive")}</button></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-5xl mx-auto" }, [
                createVNode(unref(Link), {
                  href: _ctx.route("leads.index"),
                  class: "text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                    createTextVNode(" Back to leads ")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("div", { class: "mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                  createVNode("div", { class: "lg:col-span-2 space-y-6" }, [
                    createVNode("div", { class: "card p-6" }, [
                      createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                        createVNode("div", null, [
                          createVNode("h1", { class: "text-2xl font-bold" }, toDisplayString(__props.lead.business_name), 1),
                          __props.lead.category ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-surface-500"
                          }, toDisplayString(__props.lead.category), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("button", {
                          onClick: ($event) => {
                            unref(form).is_favorite = !unref(form).is_favorite;
                            save();
                          },
                          class: "p-2 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800"
                        }, [
                          createVNode(unref(Star), {
                            class: ["h-5 w-5", unref(form).is_favorite ? "fill-yellow-400 text-yellow-400" : "text-surface-400"]
                          }, null, 8, ["class"])
                        ], 8, ["onClick"])
                      ]),
                      __props.lead.rating ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-4 flex items-center gap-2"
                      }, [
                        createVNode(unref(Star), { class: "h-4 w-4 text-yellow-400 fill-yellow-400" }),
                        createVNode("span", { class: "font-semibold" }, toDisplayString(__props.lead.rating), 1),
                        createVNode("span", { class: "text-sm text-surface-500" }, "(" + toDisplayString(__props.lead.reviews_count) + " reviews)", 1),
                        __props.lead.ai_score ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "ml-3 badge bg-primary-50 text-primary-700"
                        }, "AI Score: " + toDisplayString(__props.lead.ai_score), 1)) : createCommentVNode("", true),
                        __props.lead.ai_category ? (openBlock(), createBlock("span", {
                          key: 1,
                          class: "badge bg-surface-100 text-surface-700"
                        }, toDisplayString(__props.lead.ai_category.replace("_", " ")), 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "mt-6 space-y-3 text-sm" }, [
                        __props.lead.phone ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-3"
                        }, [
                          createVNode(unref(Phone), { class: "h-4 w-4 text-surface-400" }),
                          createVNode("a", {
                            href: `tel:${__props.lead.phone}`,
                            class: "hover:text-primary-600"
                          }, toDisplayString(__props.lead.phone), 9, ["href"])
                        ])) : createCommentVNode("", true),
                        __props.lead.email ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex items-center gap-3"
                        }, [
                          createVNode(unref(Mail), { class: "h-4 w-4 text-surface-400" }),
                          createVNode("a", {
                            href: `mailto:${__props.lead.email}`,
                            class: "hover:text-primary-600"
                          }, toDisplayString(__props.lead.email), 9, ["href"])
                        ])) : createCommentVNode("", true),
                        __props.lead.website ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "flex items-center gap-3"
                        }, [
                          createVNode(unref(Globe), { class: "h-4 w-4 text-surface-400" }),
                          createVNode("a", {
                            href: __props.lead.website,
                            target: "_blank",
                            rel: "noopener",
                            class: "hover:text-primary-600 truncate"
                          }, toDisplayString(__props.lead.website), 9, ["href"])
                        ])) : createCommentVNode("", true),
                        __props.lead.address ? (openBlock(), createBlock("div", {
                          key: 3,
                          class: "flex items-start gap-3"
                        }, [
                          createVNode(unref(MapPin), { class: "h-4 w-4 text-surface-400 mt-0.5 shrink-0" }),
                          createVNode("span", null, toDisplayString(__props.lead.address) + ", " + toDisplayString(__props.lead.city) + ", " + toDisplayString(__props.lead.country), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "card p-6" }, [
                      createVNode("h2", { class: "font-semibold mb-3" }, "Your notes"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                        rows: "4",
                        class: "input",
                        placeholder: "Add notes about this lead..."
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).notes]
                      ]),
                      createVNode("div", { class: "mt-3 flex justify-end" }, [
                        createVNode("button", {
                          onClick: save,
                          disabled: unref(form).processing,
                          class: "btn-primary text-sm"
                        }, toDisplayString(unref(form).processing ? "Saving..." : "Save notes"), 9, ["disabled"])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "card p-5" }, [
                      createVNode("label", { class: "label" }, "Status"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(form).status = $event,
                        onChange: save,
                        class: "input"
                      }, [
                        createVNode("option", { value: "new" }, "New"),
                        createVNode("option", { value: "contacted" }, "Contacted"),
                        createVNode("option", { value: "responded" }, "Responded"),
                        createVNode("option", { value: "converted" }, "Converted"),
                        createVNode("option", { value: "closed" }, "Closed")
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(form).status]
                      ])
                    ]),
                    createVNode("div", { class: "card p-5" }, [
                      createVNode("label", { class: "label" }, "Tags"),
                      createVNode("div", { class: "flex flex-wrap gap-2 mt-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(form).tags, (tag) => {
                          return openBlock(), createBlock("span", {
                            key: tag,
                            class: "inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs"
                          }, [
                            createTextVNode(toDisplayString(tag) + " ", 1),
                            createVNode("button", {
                              onClick: ($event) => {
                                removeTag(tag);
                                save();
                              },
                              class: "hover:text-red-600"
                            }, [
                              createVNode(unref(X), { class: "h-3 w-3" })
                            ], 8, ["onClick"])
                          ]);
                        }), 128))
                      ]),
                      createVNode("div", { class: "mt-3 flex gap-2" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => newTag.value = $event,
                          onKeydown: withKeys(withModifiers(($event) => {
                            addTag();
                            save();
                          }, ["prevent"]), ["enter"]),
                          class: "input text-sm",
                          placeholder: "Add tag..."
                        }, null, 40, ["onUpdate:modelValue", "onKeydown"]), [
                          [vModelText, newTag.value]
                        ]),
                        createVNode("button", {
                          onClick: ($event) => {
                            addTag();
                            save();
                          },
                          class: "btn-secondary text-sm"
                        }, [
                          createVNode(unref(Tag), { class: "h-4 w-4" })
                        ], 8, ["onClick"])
                      ])
                    ]),
                    createVNode("div", { class: "card p-5 space-y-2" }, [
                      createVNode("button", {
                        onClick: ($event) => {
                          unref(form).is_archived = !unref(form).is_archived;
                          save();
                        },
                        class: "btn-secondary w-full text-sm"
                      }, toDisplayString(unref(form).is_archived ? "Unarchive" : "Archive"), 9, ["onClick"])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Leads/Show.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$e
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$d = {
  __name: "PublicLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col" }, _attrs))}><nav class="sticky top-0 z-30 bg-white/80 dark:bg-surface-900/80 backdrop-blur border-b border-surface-200 dark:border-surface-800"><div class="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-9 w-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold"${_scopeId}>C</div><span class="font-bold text-surface-900 dark:text-surface-50"${_scopeId}>CustomerNearMe</span>`);
          } else {
            return [
              createVNode("div", { class: "h-9 w-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold" }, "C"),
              createVNode("span", { class: "font-bold text-surface-900 dark:text-surface-50" }, "CustomerNearMe")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden md:flex items-center gap-6 text-sm">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("how-it-works"),
        class: "hover:text-primary-600 transition"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`How It Works`);
          } else {
            return [
              createTextVNode("How It Works")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("pricing"),
        class: "hover:text-primary-600 transition"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Pricing`);
          } else {
            return [
              createTextVNode("Pricing")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("faq"),
        class: "hover:text-primary-600 transition"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`FAQ`);
          } else {
            return [
              createTextVNode("FAQ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("affiliate-program"),
        class: "hover:text-primary-600 transition"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Affiliate`);
          } else {
            return [
              createTextVNode("Affiliate")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("contact"),
        class: "hover:text-primary-600 transition"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contact`);
          } else {
            return [
              createTextVNode("Contact")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("login"),
        class: "btn-ghost text-sm hidden sm:inline-flex"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Log in`);
          } else {
            return [
              createTextVNode("Log in")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("register"),
        class: "btn-primary text-sm"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Get Started`);
          } else {
            return [
              createTextVNode("Get Started")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="md:hidden p-1">`);
      if (!mobileOpen.value) {
        _push(ssrRenderComponent(unref(Menu), { class: "h-6 w-6" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(X), { class: "h-6 w-6" }, null, _parent));
      }
      _push(`</button></div></div>`);
      if (mobileOpen.value) {
        _push(`<div class="md:hidden border-t border-surface-200 dark:border-surface-800 px-4 py-3 space-y-1 bg-white dark:bg-surface-900">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("how-it-works"),
          class: "block py-2 text-sm"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`How It Works`);
            } else {
              return [
                createTextVNode("How It Works")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("pricing"),
          class: "block py-2 text-sm"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Pricing`);
            } else {
              return [
                createTextVNode("Pricing")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("faq"),
          class: "block py-2 text-sm"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`FAQ`);
            } else {
              return [
                createTextVNode("FAQ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("affiliate-program"),
          class: "block py-2 text-sm"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Affiliate`);
            } else {
              return [
                createTextVNode("Affiliate")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("contact"),
          class: "block py-2 text-sm"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Contact`);
            } else {
              return [
                createTextVNode("Contact")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("login"),
          class: "block py-2 text-sm"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Log in`);
            } else {
              return [
                createTextVNode("Log in")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><main class="flex-1">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="border-t border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 mt-20"><div class="max-w-7xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm"><div class="col-span-2">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm"${_scopeId}>C</div><span class="font-bold"${_scopeId}>CustomerNearMe</span>`);
          } else {
            return [
              createVNode("div", { class: "h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm" }, "C"),
              createVNode("span", { class: "font-bold" }, "CustomerNearMe")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="mt-3 text-surface-500 max-w-sm"> Verified GMB leads, instantly delivered. Generate hyper-targeted local business leads from Google My Business. </p></div><div><h4 class="font-semibold mb-3">Product</h4><ul class="space-y-2 text-surface-500"><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("how-it-works"),
        class: "hover:text-primary-600"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`How It Works`);
          } else {
            return [
              createTextVNode("How It Works")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("pricing"),
        class: "hover:text-primary-600"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Pricing`);
          } else {
            return [
              createTextVNode("Pricing")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("faq"),
        class: "hover:text-primary-600"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`FAQ`);
          } else {
            return [
              createTextVNode("FAQ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("affiliate-program"),
        class: "hover:text-primary-600"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Affiliate`);
          } else {
            return [
              createTextVNode("Affiliate")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div><h4 class="font-semibold mb-3">Legal</h4><ul class="space-y-2 text-surface-500"><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("terms"),
        class: "hover:text-primary-600"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terms`);
          } else {
            return [
              createTextVNode("Terms")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("privacy"),
        class: "hover:text-primary-600"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacy`);
          } else {
            return [
              createTextVNode("Privacy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("contact"),
        class: "hover:text-primary-600"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contact`);
          } else {
            return [
              createTextVNode("Contact")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></div><div class="border-t border-surface-200 dark:border-surface-800 px-4 py-6 text-center text-xs text-surface-500"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Customer Near Me. All rights reserved. </div></footer></div>`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/PublicLayout.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = {
  __name: "Affiliate",
  __ssrInlineRender: true,
  props: {
    commission_percent: { type: Number, default: 30 },
    recurring_percent: { type: Number, default: 20 },
    cookie_days: { type: Number, default: 90 }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Affiliate Program" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$d, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="py-16 lg:py-24"${_scopeId}><div class="max-w-5xl mx-auto px-4 lg:px-8 text-center"${_scopeId}><span class="badge bg-accent-50 text-accent-700"${_scopeId}>💰 Earn passively</span><h1 class="mt-4 text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50"${_scopeId}> Refer once. Earn forever. </h1><p class="mt-4 text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto"${_scopeId}> Earn <strong class="text-surface-900 dark:text-surface-50"${_scopeId}>${ssrInterpolate(__props.commission_percent)}%</strong> on every paid signup, plus <strong class="text-surface-900 dark:text-surface-50"${_scopeId}>${ssrInterpolate(__props.recurring_percent)}%</strong> on every renewal — for as long as they stay subscribed. </p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("register"),
              class: "mt-8 btn-primary inline-flex"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Become an Affiliate `);
                  _push3(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Become an Affiliate "),
                    createVNode(unref(ArrowRight), { class: "h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></section><section class="pb-16"${_scopeId}><div class="max-w-5xl mx-auto px-4 lg:px-8 grid md:grid-cols-3 gap-6"${_scopeId}><div class="card p-6 text-center"${_scopeId}><div class="mx-auto h-12 w-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Users), { class: "h-6 w-6 text-primary-600" }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="mt-4 font-bold"${_scopeId}>Share your link</h3><p class="mt-2 text-sm text-surface-500"${_scopeId}>Every account gets a unique referral link with a ${ssrInterpolate(__props.cookie_days)}-day cookie window.</p></div><div class="card p-6 text-center"${_scopeId}><div class="mx-auto h-12 w-12 rounded-xl bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Wallet), { class: "h-6 w-6 text-accent-600" }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="mt-4 font-bold"${_scopeId}>Earn ${ssrInterpolate(__props.commission_percent)}% upfront</h3><p class="mt-2 text-sm text-surface-500"${_scopeId}>When your referral pays, you earn instantly. Held briefly to clear chargebacks.</p></div><div class="card p-6 text-center"${_scopeId}><div class="mx-auto h-12 w-12 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Repeat), { class: "h-6 w-6 text-orange-600" }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="mt-4 font-bold"${_scopeId}>${ssrInterpolate(__props.recurring_percent)}% recurring</h3><p class="mt-2 text-sm text-surface-500"${_scopeId}>Every time they renew, you earn again. Build truly passive income.</p></div></div></section><section class="pb-20"${_scopeId}><div class="max-w-3xl mx-auto px-4 lg:px-8"${_scopeId}><div class="card p-8"${_scopeId}><h2 class="text-2xl font-bold"${_scopeId}>How it works</h2><ul class="mt-6 space-y-4"${_scopeId}><li class="flex gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Check), { class: "h-6 w-6 text-accent-500 shrink-0" }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}><p class="font-semibold"${_scopeId}>1. Sign up free</p><p class="text-sm text-surface-500"${_scopeId}>Create your account — every user automatically becomes an affiliate.</p></div></li><li class="flex gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Check), { class: "h-6 w-6 text-accent-500 shrink-0" }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}><p class="font-semibold"${_scopeId}>2. Share your link</p><p class="text-sm text-surface-500"${_scopeId}>Find your referral link in the dashboard. Share on social, blog, or email.</p></div></li><li class="flex gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Check), { class: "h-6 w-6 text-accent-500 shrink-0" }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}><p class="font-semibold"${_scopeId}>3. Get paid</p><p class="text-sm text-surface-500"${_scopeId}>Withdraw via bank transfer, JazzCash, or EasyPaisa. Minimum PKR 1,000.</p></div></li></ul></div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "py-16 lg:py-24" }, [
                createVNode("div", { class: "max-w-5xl mx-auto px-4 lg:px-8 text-center" }, [
                  createVNode("span", { class: "badge bg-accent-50 text-accent-700" }, "💰 Earn passively"),
                  createVNode("h1", { class: "mt-4 text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50" }, " Refer once. Earn forever. "),
                  createVNode("p", { class: "mt-4 text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto" }, [
                    createTextVNode(" Earn "),
                    createVNode("strong", { class: "text-surface-900 dark:text-surface-50" }, toDisplayString(__props.commission_percent) + "%", 1),
                    createTextVNode(" on every paid signup, plus "),
                    createVNode("strong", { class: "text-surface-900 dark:text-surface-50" }, toDisplayString(__props.recurring_percent) + "%", 1),
                    createTextVNode(" on every renewal — for as long as they stay subscribed. ")
                  ]),
                  createVNode(unref(Link), {
                    href: _ctx.route("register"),
                    class: "mt-8 btn-primary inline-flex"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Become an Affiliate "),
                      createVNode(unref(ArrowRight), { class: "h-4 w-4" })
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ]),
              createVNode("section", { class: "pb-16" }, [
                createVNode("div", { class: "max-w-5xl mx-auto px-4 lg:px-8 grid md:grid-cols-3 gap-6" }, [
                  createVNode("div", { class: "card p-6 text-center" }, [
                    createVNode("div", { class: "mx-auto h-12 w-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center" }, [
                      createVNode(unref(Users), { class: "h-6 w-6 text-primary-600" })
                    ]),
                    createVNode("h3", { class: "mt-4 font-bold" }, "Share your link"),
                    createVNode("p", { class: "mt-2 text-sm text-surface-500" }, "Every account gets a unique referral link with a " + toDisplayString(__props.cookie_days) + "-day cookie window.", 1)
                  ]),
                  createVNode("div", { class: "card p-6 text-center" }, [
                    createVNode("div", { class: "mx-auto h-12 w-12 rounded-xl bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center" }, [
                      createVNode(unref(Wallet), { class: "h-6 w-6 text-accent-600" })
                    ]),
                    createVNode("h3", { class: "mt-4 font-bold" }, "Earn " + toDisplayString(__props.commission_percent) + "% upfront", 1),
                    createVNode("p", { class: "mt-2 text-sm text-surface-500" }, "When your referral pays, you earn instantly. Held briefly to clear chargebacks.")
                  ]),
                  createVNode("div", { class: "card p-6 text-center" }, [
                    createVNode("div", { class: "mx-auto h-12 w-12 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center" }, [
                      createVNode(unref(Repeat), { class: "h-6 w-6 text-orange-600" })
                    ]),
                    createVNode("h3", { class: "mt-4 font-bold" }, toDisplayString(__props.recurring_percent) + "% recurring", 1),
                    createVNode("p", { class: "mt-2 text-sm text-surface-500" }, "Every time they renew, you earn again. Build truly passive income.")
                  ])
                ])
              ]),
              createVNode("section", { class: "pb-20" }, [
                createVNode("div", { class: "max-w-3xl mx-auto px-4 lg:px-8" }, [
                  createVNode("div", { class: "card p-8" }, [
                    createVNode("h2", { class: "text-2xl font-bold" }, "How it works"),
                    createVNode("ul", { class: "mt-6 space-y-4" }, [
                      createVNode("li", { class: "flex gap-3" }, [
                        createVNode(unref(Check), { class: "h-6 w-6 text-accent-500 shrink-0" }),
                        createVNode("div", null, [
                          createVNode("p", { class: "font-semibold" }, "1. Sign up free"),
                          createVNode("p", { class: "text-sm text-surface-500" }, "Create your account — every user automatically becomes an affiliate.")
                        ])
                      ]),
                      createVNode("li", { class: "flex gap-3" }, [
                        createVNode(unref(Check), { class: "h-6 w-6 text-accent-500 shrink-0" }),
                        createVNode("div", null, [
                          createVNode("p", { class: "font-semibold" }, "2. Share your link"),
                          createVNode("p", { class: "text-sm text-surface-500" }, "Find your referral link in the dashboard. Share on social, blog, or email.")
                        ])
                      ]),
                      createVNode("li", { class: "flex gap-3" }, [
                        createVNode(unref(Check), { class: "h-6 w-6 text-accent-500 shrink-0" }),
                        createVNode("div", null, [
                          createVNode("p", { class: "font-semibold" }, "3. Get paid"),
                          createVNode("p", { class: "text-sm text-surface-500" }, "Withdraw via bank transfer, JazzCash, or EasyPaisa. Minimum PKR 1,000.")
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Affiliate.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$c
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$b = {
  __name: "Blog",
  __ssrInlineRender: true,
  props: { posts: Object },
  setup(__props) {
    const fmtDate = (d2) => new Date(d2).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Blog" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$d, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="py-16 lg:py-20 text-center"${_scopeId}><div class="max-w-3xl mx-auto px-4"${_scopeId}><h1 class="text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50"${_scopeId}>Blog</h1><p class="mt-4 text-lg text-surface-600 dark:text-surface-400"${_scopeId}> Lead generation tips, product updates, and case studies. </p></div></section><section class="pb-20"${_scopeId}><div class="max-w-6xl mx-auto px-4 lg:px-8"${_scopeId}>`);
            if (__props.posts.data.length) {
              _push2(`<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
              ssrRenderList(__props.posts.data, (post) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: post.id,
                  href: _ctx.route("blog.show", post.slug),
                  class: "card overflow-hidden hover:shadow-lg transition group"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    var _a, _b;
                    if (_push3) {
                      if (post.cover_image) {
                        _push3(`<div class="aspect-video bg-surface-100 dark:bg-surface-800"${_scopeId2}><img${ssrRenderAttr("src", post.cover_image)}${ssrRenderAttr("alt", post.title)} class="w-full h-full object-cover"${_scopeId2}></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="p-5"${_scopeId2}><p class="text-xs text-surface-500"${_scopeId2}>${ssrInterpolate(fmtDate(post.published_at))}</p><h3 class="mt-2 font-bold text-lg group-hover:text-primary-600 transition"${_scopeId2}>${ssrInterpolate(post.title)}</h3>`);
                      if (post.excerpt) {
                        _push3(`<p class="mt-2 text-sm text-surface-600 dark:text-surface-300 line-clamp-3"${_scopeId2}>${ssrInterpolate(post.excerpt)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if ((_a = post.tags) == null ? void 0 : _a.length) {
                        _push3(`<div class="mt-3 flex flex-wrap gap-1.5"${_scopeId2}><!--[-->`);
                        ssrRenderList(post.tags.slice(0, 3), (t3) => {
                          _push3(`<span class="badge bg-surface-100 dark:bg-surface-800 text-surface-600"${_scopeId2}>${ssrInterpolate(t3)}</span>`);
                        });
                        _push3(`<!--]--></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    } else {
                      return [
                        post.cover_image ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "aspect-video bg-surface-100 dark:bg-surface-800"
                        }, [
                          createVNode("img", {
                            src: post.cover_image,
                            alt: post.title,
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src", "alt"])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "p-5" }, [
                          createVNode("p", { class: "text-xs text-surface-500" }, toDisplayString(fmtDate(post.published_at)), 1),
                          createVNode("h3", { class: "mt-2 font-bold text-lg group-hover:text-primary-600 transition" }, toDisplayString(post.title), 1),
                          post.excerpt ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-2 text-sm text-surface-600 dark:text-surface-300 line-clamp-3"
                          }, toDisplayString(post.excerpt), 1)) : createCommentVNode("", true),
                          ((_b = post.tags) == null ? void 0 : _b.length) ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "mt-3 flex flex-wrap gap-1.5"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(post.tags.slice(0, 3), (t3) => {
                              return openBlock(), createBlock("span", {
                                key: t3,
                                class: "badge bg-surface-100 dark:bg-surface-800 text-surface-600"
                              }, toDisplayString(t3), 1);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="card p-12 text-center"${_scopeId}><p class="text-surface-500"${_scopeId}>No posts yet. Check back soon!</p></div>`);
            }
            if (__props.posts.last_page > 1) {
              _push2(`<div class="mt-8 flex justify-center gap-1"${_scopeId}><!--[-->`);
              ssrRenderList(__props.posts.links, (link) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: link.label,
                  href: link.url ?? "#",
                  class: [
                    "px-3 py-1 rounded border text-sm",
                    link.active ? "bg-primary-600 text-white border-primary-600" : link.url ? "border-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800" : "border-surface-100 text-surface-300 cursor-not-allowed"
                  ]
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></section>`);
          } else {
            return [
              createVNode("section", { class: "py-16 lg:py-20 text-center" }, [
                createVNode("div", { class: "max-w-3xl mx-auto px-4" }, [
                  createVNode("h1", { class: "text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50" }, "Blog"),
                  createVNode("p", { class: "mt-4 text-lg text-surface-600 dark:text-surface-400" }, " Lead generation tips, product updates, and case studies. ")
                ])
              ]),
              createVNode("section", { class: "pb-20" }, [
                createVNode("div", { class: "max-w-6xl mx-auto px-4 lg:px-8" }, [
                  __props.posts.data.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.posts.data, (post) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: post.id,
                        href: _ctx.route("blog.show", post.slug),
                        class: "card overflow-hidden hover:shadow-lg transition group"
                      }, {
                        default: withCtx(() => {
                          var _a;
                          return [
                            post.cover_image ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "aspect-video bg-surface-100 dark:bg-surface-800"
                            }, [
                              createVNode("img", {
                                src: post.cover_image,
                                alt: post.title,
                                class: "w-full h-full object-cover"
                              }, null, 8, ["src", "alt"])
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "p-5" }, [
                              createVNode("p", { class: "text-xs text-surface-500" }, toDisplayString(fmtDate(post.published_at)), 1),
                              createVNode("h3", { class: "mt-2 font-bold text-lg group-hover:text-primary-600 transition" }, toDisplayString(post.title), 1),
                              post.excerpt ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "mt-2 text-sm text-surface-600 dark:text-surface-300 line-clamp-3"
                              }, toDisplayString(post.excerpt), 1)) : createCommentVNode("", true),
                              ((_a = post.tags) == null ? void 0 : _a.length) ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "mt-3 flex flex-wrap gap-1.5"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(post.tags.slice(0, 3), (t3) => {
                                  return openBlock(), createBlock("span", {
                                    key: t3,
                                    class: "badge bg-surface-100 dark:bg-surface-800 text-surface-600"
                                  }, toDisplayString(t3), 1);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ])
                          ];
                        }),
                        _: 2
                      }, 1032, ["href"]);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "card p-12 text-center"
                  }, [
                    createVNode("p", { class: "text-surface-500" }, "No posts yet. Check back soon!")
                  ])),
                  __props.posts.last_page > 1 ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "mt-8 flex justify-center gap-1"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.posts.links, (link) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: link.label,
                        href: link.url ?? "#",
                        class: [
                          "px-3 py-1 rounded border text-sm",
                          link.active ? "bg-primary-600 text-white border-primary-600" : link.url ? "border-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800" : "border-surface-100 text-surface-300 cursor-not-allowed"
                        ],
                        innerHTML: link.label
                      }, null, 8, ["href", "class", "innerHTML"]);
                    }), 128))
                  ])) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Blog.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$b
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a = {
  __name: "BlogPost",
  __ssrInlineRender: true,
  props: { post: Object, related: Array },
  setup(__props) {
    const fmtDate = (d2) => new Date(d2).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(__props.post.meta_title || __props.post.title)}</title>`);
            if (__props.post.meta_description) {
              _push2(`<meta name="description"${ssrRenderAttr("content", __props.post.meta_description)} head-key="description"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:title"${ssrRenderAttr("content", __props.post.title)}${_scopeId}>`);
            if (__props.post.cover_image) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", __props.post.cover_image)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(__props.post.meta_title || __props.post.title), 1),
              __props.post.meta_description ? (openBlock(), createBlock("meta", {
                key: 0,
                name: "description",
                content: __props.post.meta_description,
                "head-key": "description"
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:title",
                content: __props.post.title
              }, null, 8, ["content"]),
              __props.post.cover_image ? (openBlock(), createBlock("meta", {
                key: 1,
                property: "og:image",
                content: __props.post.cover_image
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$d, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<article class="max-w-3xl mx-auto px-4 lg:px-8 py-16"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("blog.index"),
              class: "text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Back to blog `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                    createTextVNode(" Back to blog ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="mt-6 text-3xl lg:text-4xl font-bold text-surface-900 dark:text-surface-50"${_scopeId}>${ssrInterpolate(__props.post.title)}</h1><p class="mt-3 text-sm text-surface-500"${_scopeId}>${ssrInterpolate(fmtDate(__props.post.published_at))}</p>`);
            if (__props.post.cover_image) {
              _push2(`<img${ssrRenderAttr("src", __props.post.cover_image)}${ssrRenderAttr("alt", __props.post.title)} class="mt-8 w-full rounded-xl"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="prose prose-slate dark:prose-invert max-w-none mt-8"${_scopeId}>${__props.post.content ?? ""}</div>`);
            if ((_a = __props.post.tags) == null ? void 0 : _a.length) {
              _push2(`<div class="mt-8 pt-6 border-t border-surface-200 dark:border-surface-800 flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.post.tags, (t3) => {
                _push2(`<span class="badge bg-surface-100 dark:bg-surface-800 text-surface-600"${_scopeId}>${ssrInterpolate(t3)}</span>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</article>`);
            if (__props.related.length) {
              _push2(`<section class="border-t border-surface-200 dark:border-surface-800 py-16"${_scopeId}><div class="max-w-6xl mx-auto px-4 lg:px-8"${_scopeId}><h2 class="text-2xl font-bold mb-6"${_scopeId}>Related posts</h2><div class="grid gap-6 md:grid-cols-3"${_scopeId}><!--[-->`);
              ssrRenderList(__props.related, (r2) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: r2.id,
                  href: _ctx.route("blog.show", r2.slug),
                  class: "card p-5 hover:shadow-lg transition"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<p class="text-xs text-surface-500"${_scopeId2}>${ssrInterpolate(fmtDate(r2.published_at))}</p><h3 class="mt-2 font-bold"${_scopeId2}>${ssrInterpolate(r2.title)}</h3>`);
                      if (r2.excerpt) {
                        _push3(`<p class="mt-2 text-sm text-surface-600 line-clamp-2"${_scopeId2}>${ssrInterpolate(r2.excerpt)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        createVNode("p", { class: "text-xs text-surface-500" }, toDisplayString(fmtDate(r2.published_at)), 1),
                        createVNode("h3", { class: "mt-2 font-bold" }, toDisplayString(r2.title), 1),
                        r2.excerpt ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-surface-600 line-clamp-2"
                        }, toDisplayString(r2.excerpt), 1)) : createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div></section>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("article", { class: "max-w-3xl mx-auto px-4 lg:px-8 py-16" }, [
                createVNode(unref(Link), {
                  href: _ctx.route("blog.index"),
                  class: "text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                    createTextVNode(" Back to blog ")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("h1", { class: "mt-6 text-3xl lg:text-4xl font-bold text-surface-900 dark:text-surface-50" }, toDisplayString(__props.post.title), 1),
                createVNode("p", { class: "mt-3 text-sm text-surface-500" }, toDisplayString(fmtDate(__props.post.published_at)), 1),
                __props.post.cover_image ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: __props.post.cover_image,
                  alt: __props.post.title,
                  class: "mt-8 w-full rounded-xl"
                }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                createVNode("div", {
                  class: "prose prose-slate dark:prose-invert max-w-none mt-8",
                  innerHTML: __props.post.content
                }, null, 8, ["innerHTML"]),
                ((_b = __props.post.tags) == null ? void 0 : _b.length) ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "mt-8 pt-6 border-t border-surface-200 dark:border-surface-800 flex flex-wrap gap-2"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.post.tags, (t3) => {
                    return openBlock(), createBlock("span", {
                      key: t3,
                      class: "badge bg-surface-100 dark:bg-surface-800 text-surface-600"
                    }, toDisplayString(t3), 1);
                  }), 128))
                ])) : createCommentVNode("", true)
              ]),
              __props.related.length ? (openBlock(), createBlock("section", {
                key: 0,
                class: "border-t border-surface-200 dark:border-surface-800 py-16"
              }, [
                createVNode("div", { class: "max-w-6xl mx-auto px-4 lg:px-8" }, [
                  createVNode("h2", { class: "text-2xl font-bold mb-6" }, "Related posts"),
                  createVNode("div", { class: "grid gap-6 md:grid-cols-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.related, (r2) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: r2.id,
                        href: _ctx.route("blog.show", r2.slug),
                        class: "card p-5 hover:shadow-lg transition"
                      }, {
                        default: withCtx(() => [
                          createVNode("p", { class: "text-xs text-surface-500" }, toDisplayString(fmtDate(r2.published_at)), 1),
                          createVNode("h3", { class: "mt-2 font-bold" }, toDisplayString(r2.title), 1),
                          r2.excerpt ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-2 text-sm text-surface-600 line-clamp-2"
                          }, toDisplayString(r2.excerpt), 1)) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1032, ["href"]);
                    }), 128))
                  ])
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/BlogPost.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$a
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$9 = {
  __name: "Contact",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const flashSuccess = computed(() => {
      var _a;
      return (_a = page.props.flash) == null ? void 0 : _a.success;
    });
    const form = useForm({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    const submit = () => form.post(route("contact.store"), {
      preserveScroll: true,
      onSuccess: () => form.reset()
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Contact" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$d, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="py-16 lg:py-20"${_scopeId}><div class="max-w-5xl mx-auto px-4 lg:px-8"${_scopeId}><div class="text-center max-w-2xl mx-auto"${_scopeId}><h1 class="text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50"${_scopeId}>Get in touch</h1><p class="mt-4 text-lg text-surface-600 dark:text-surface-400"${_scopeId}> Questions, feedback, or partnership ideas — we&#39;d love to hear from you. </p></div><div class="mt-16 grid md:grid-cols-3 gap-6"${_scopeId}><div class="card p-6 text-center"${_scopeId}><div class="mx-auto h-12 w-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Mail), { class: "h-6 w-6 text-primary-600" }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="mt-4 font-bold"${_scopeId}>Email us</h3><a href="mailto:hello@customernearme.com" class="mt-1 text-sm text-primary-600 hover:underline"${_scopeId}>hello@customernearme.com</a></div><div class="card p-6 text-center"${_scopeId}><div class="mx-auto h-12 w-12 rounded-xl bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MessageSquare), { class: "h-6 w-6 text-accent-600" }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="mt-4 font-bold"${_scopeId}>Live support</h3><p class="mt-1 text-sm text-surface-500"${_scopeId}>In-app for paid plans</p></div><div class="card p-6 text-center"${_scopeId}><div class="mx-auto h-12 w-12 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MapPin), { class: "h-6 w-6 text-orange-600" }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="mt-4 font-bold"${_scopeId}>Headquarters</h3><p class="mt-1 text-sm text-surface-500"${_scopeId}>Karachi, Pakistan</p></div></div><div class="mt-12 max-w-xl mx-auto card p-8"${_scopeId}><h2 class="text-xl font-bold mb-6"${_scopeId}>Send us a message</h2>`);
            if (flashSuccess.value) {
              _push2(`<div class="mb-4 p-3 rounded-lg bg-accent-50 text-accent-700 text-sm flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-4 w-4 shrink-0" }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(flashSuccess.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="space-y-4"${_scopeId}><div class="grid sm:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="label"${_scopeId}>Name</label><input${ssrRenderAttr("value", unref(form).name)} required class="input"${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="label"${_scopeId}>Email</label><input type="email"${ssrRenderAttr("value", unref(form).email)} required class="input"${_scopeId}>`);
            if (unref(form).errors.email) {
              _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div${_scopeId}><label class="label"${_scopeId}>Subject</label><input${ssrRenderAttr("value", unref(form).subject)} required class="input"${_scopeId}>`);
            if (unref(form).errors.subject) {
              _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.subject)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="label"${_scopeId}>Message</label><textarea rows="5" required class="input"${_scopeId}>${ssrInterpolate(unref(form).message)}</textarea>`);
            if (unref(form).errors.message) {
              _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.message)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary w-full"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Sending..." : "Send message")}</button></form></div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "py-16 lg:py-20" }, [
                createVNode("div", { class: "max-w-5xl mx-auto px-4 lg:px-8" }, [
                  createVNode("div", { class: "text-center max-w-2xl mx-auto" }, [
                    createVNode("h1", { class: "text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50" }, "Get in touch"),
                    createVNode("p", { class: "mt-4 text-lg text-surface-600 dark:text-surface-400" }, " Questions, feedback, or partnership ideas — we'd love to hear from you. ")
                  ]),
                  createVNode("div", { class: "mt-16 grid md:grid-cols-3 gap-6" }, [
                    createVNode("div", { class: "card p-6 text-center" }, [
                      createVNode("div", { class: "mx-auto h-12 w-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center" }, [
                        createVNode(unref(Mail), { class: "h-6 w-6 text-primary-600" })
                      ]),
                      createVNode("h3", { class: "mt-4 font-bold" }, "Email us"),
                      createVNode("a", {
                        href: "mailto:hello@customernearme.com",
                        class: "mt-1 text-sm text-primary-600 hover:underline"
                      }, "hello@customernearme.com")
                    ]),
                    createVNode("div", { class: "card p-6 text-center" }, [
                      createVNode("div", { class: "mx-auto h-12 w-12 rounded-xl bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center" }, [
                        createVNode(unref(MessageSquare), { class: "h-6 w-6 text-accent-600" })
                      ]),
                      createVNode("h3", { class: "mt-4 font-bold" }, "Live support"),
                      createVNode("p", { class: "mt-1 text-sm text-surface-500" }, "In-app for paid plans")
                    ]),
                    createVNode("div", { class: "card p-6 text-center" }, [
                      createVNode("div", { class: "mx-auto h-12 w-12 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center" }, [
                        createVNode(unref(MapPin), { class: "h-6 w-6 text-orange-600" })
                      ]),
                      createVNode("h3", { class: "mt-4 font-bold" }, "Headquarters"),
                      createVNode("p", { class: "mt-1 text-sm text-surface-500" }, "Karachi, Pakistan")
                    ])
                  ]),
                  createVNode("div", { class: "mt-12 max-w-xl mx-auto card p-8" }, [
                    createVNode("h2", { class: "text-xl font-bold mb-6" }, "Send us a message"),
                    flashSuccess.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-4 p-3 rounded-lg bg-accent-50 text-accent-700 text-sm flex items-center gap-2"
                    }, [
                      createVNode(unref(CheckCircle), { class: "h-4 w-4 shrink-0" }),
                      createTextVNode(" " + toDisplayString(flashSuccess.value), 1)
                    ])) : createCommentVNode("", true),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "grid sm:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "label" }, "Name"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            required: "",
                            class: "input"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).name]
                          ]),
                          unref(form).errors.name ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-xs text-red-600"
                          }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "label" }, "Email"),
                          withDirectives(createVNode("input", {
                            type: "email",
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            required: "",
                            class: "input"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).email]
                          ]),
                          unref(form).errors.email ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-xs text-red-600"
                          }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "label" }, "Subject"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).subject = $event,
                          required: "",
                          class: "input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).subject]
                        ]),
                        unref(form).errors.subject ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-red-600"
                        }, toDisplayString(unref(form).errors.subject), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "label" }, "Message"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).message = $event,
                          rows: "5",
                          required: "",
                          class: "input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).message]
                        ]),
                        unref(form).errors.message ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-red-600"
                        }, toDisplayString(unref(form).errors.message), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(form).processing,
                        class: "btn-primary w-full"
                      }, toDisplayString(unref(form).processing ? "Sending..." : "Send message"), 9, ["disabled"])
                    ], 32)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Contact.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$9
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$8 = {
  __name: "Faq",
  __ssrInlineRender: true,
  props: { faqs: Object },
  setup(__props) {
    const props = __props;
    const openId = ref(null);
    const toggle = (id) => {
      openId.value = openId.value === id ? null : id;
    };
    const fallback = [
      {
        category: "General",
        items: [
          { id: 1, question: "What is Customer Near Me?", answer: "A SaaS platform that lets you generate verified business leads from Google My Business based on country, city, niche, and radius." },
          { id: 2, question: "Do I need a credit card to start?", answer: "No. Your 7-day free trial requires no card. We will only ask for payment if you choose to upgrade." },
          { id: 3, question: "Where does the lead data come from?", answer: "Public Google My Business listings. We extract business names, addresses, phone, email, website, ratings, and social links." }
        ]
      },
      {
        category: "Plans & Billing",
        items: [
          { id: 4, question: "How does payment work?", answer: "We accept manual bank transfers (Pakistan banks). Upload your transaction screenshot, our team approves within hours, and your plan activates automatically." },
          { id: 5, question: "Can I cancel anytime?", answer: "Yes. Plans are month-to-month. Cancel and you keep access until the end of your billing period." },
          { id: 6, question: "What happens after my trial ends?", answer: "Lead generation pauses. Your saved leads stay accessible. Upgrade anytime to resume." }
        ]
      },
      {
        category: "Affiliate",
        items: [
          { id: 7, question: "How much can I earn?", answer: "30% commission on every first payment from your referral, plus 20% on every renewal — for as long as they stay subscribed." },
          { id: 8, question: "When do I get paid?", answer: "Withdrawals are processed manually. Minimum payout: PKR 1,000. Methods: Bank transfer, JazzCash, EasyPaisa." }
        ]
      }
    ];
    const grouped = props.faqs && Object.keys(props.faqs).length ? Object.entries(props.faqs).map(([cat, items]) => ({ category: cat || "General", items })) : fallback;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "FAQ" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$d, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="py-16 lg:py-20 text-center"${_scopeId}><div class="max-w-3xl mx-auto px-4"${_scopeId}><h1 class="text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50"${_scopeId}>Frequently Asked Questions</h1><p class="mt-4 text-lg text-surface-600 dark:text-surface-400"${_scopeId}> Everything you need to know. Can&#39;t find an answer? `);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("contact"),
              class: "text-primary-600 hover:underline"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Contact us`);
                } else {
                  return [
                    createTextVNode("Contact us")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`. </p></div></section><section class="pb-20"${_scopeId}><div class="max-w-3xl mx-auto px-4 lg:px-8 space-y-10"${_scopeId}><!--[-->`);
            ssrRenderList(unref(grouped), (group) => {
              _push2(`<div${_scopeId}><h2 class="text-lg font-bold text-surface-900 dark:text-surface-50 mb-4"${_scopeId}>${ssrInterpolate(group.category)}</h2><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(group.items, (faq) => {
                _push2(`<div class="card overflow-hidden"${_scopeId}><button class="w-full flex items-center justify-between p-5 text-left"${_scopeId}><span class="font-medium"${_scopeId}>${ssrInterpolate(faq.question)}</span>`);
                _push2(ssrRenderComponent(unref(ChevronDown), {
                  class: ["h-5 w-5 transition-transform", openId.value === faq.id ? "rotate-180" : ""]
                }, null, _parent2, _scopeId));
                _push2(`</button><div class="px-5 pb-5 text-surface-600 dark:text-surface-400 text-sm leading-relaxed" style="${ssrRenderStyle(openId.value === faq.id ? null : { display: "none" })}"${_scopeId}>${ssrInterpolate(faq.answer)}</div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            });
            _push2(`<!--]--></div></section>`);
          } else {
            return [
              createVNode("section", { class: "py-16 lg:py-20 text-center" }, [
                createVNode("div", { class: "max-w-3xl mx-auto px-4" }, [
                  createVNode("h1", { class: "text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50" }, "Frequently Asked Questions"),
                  createVNode("p", { class: "mt-4 text-lg text-surface-600 dark:text-surface-400" }, [
                    createTextVNode(" Everything you need to know. Can't find an answer? "),
                    createVNode(unref(Link), {
                      href: _ctx.route("contact"),
                      class: "text-primary-600 hover:underline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Contact us")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createTextVNode(". ")
                  ])
                ])
              ]),
              createVNode("section", { class: "pb-20" }, [
                createVNode("div", { class: "max-w-3xl mx-auto px-4 lg:px-8 space-y-10" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(grouped), (group) => {
                    return openBlock(), createBlock("div", {
                      key: group.category
                    }, [
                      createVNode("h2", { class: "text-lg font-bold text-surface-900 dark:text-surface-50 mb-4" }, toDisplayString(group.category), 1),
                      createVNode("div", { class: "space-y-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(group.items, (faq) => {
                          return openBlock(), createBlock("div", {
                            key: faq.id,
                            class: "card overflow-hidden"
                          }, [
                            createVNode("button", {
                              onClick: ($event) => toggle(faq.id),
                              class: "w-full flex items-center justify-between p-5 text-left"
                            }, [
                              createVNode("span", { class: "font-medium" }, toDisplayString(faq.question), 1),
                              createVNode(unref(ChevronDown), {
                                class: ["h-5 w-5 transition-transform", openId.value === faq.id ? "rotate-180" : ""]
                              }, null, 8, ["class"])
                            ], 8, ["onClick"]),
                            withDirectives(createVNode("div", { class: "px-5 pb-5 text-surface-600 dark:text-surface-400 text-sm leading-relaxed" }, toDisplayString(faq.answer), 513), [
                              [vShow, openId.value === faq.id]
                            ])
                          ]);
                        }), 128))
                      ])
                    ]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Faq.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$8
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = {
  __name: "HowItWorks",
  __ssrInlineRender: true,
  setup(__props) {
    const steps = [
      { icon: Search, title: "Search GMB Leads", desc: "Pick your country, state, city, and a search keyword. Set radius, minimum rating, review count, and required contact fields." },
      { icon: Filter, title: "Filter & Save", desc: "Our scraper pulls fresh GMB listings. Filter further by AI category (Hot, SEO Weak, Inactive) and save the ones you want." },
      { icon: Download, title: "Export Anywhere", desc: "Export to CSV or XLSX with custom column selection. Push directly into your CRM, cold email tool, or outreach sequence." },
      { icon: Mail, title: "Contact Businesses", desc: "Use the verified phone, email, and website data to reach out. Track status: New → Contacted → Responded → Converted." },
      { icon: MousePointerClick, title: "Track in Dashboard", desc: "Tag leads, add notes, mark favorites. Your dashboard shows conversion rates and your hottest opportunities." },
      { icon: Wallet, title: "Earn from Affiliate", desc: "Share your referral link and earn 30% commission on every paid signup, plus 20% on every renewal — for as long as they stay subscribed." }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "How It Works" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$d, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="py-16 lg:py-20 text-center"${_scopeId}><div class="max-w-3xl mx-auto px-4"${_scopeId}><h1 class="text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50"${_scopeId}> How Customer Near Me works </h1><p class="mt-4 text-lg text-surface-600 dark:text-surface-400"${_scopeId}> From search to outreach in under a minute. Here&#39;s the full flow. </p></div></section><section class="pb-20"${_scopeId}><div class="max-w-5xl mx-auto px-4 lg:px-8"${_scopeId}><div class="grid gap-6 md:gap-8"${_scopeId}><!--[-->`);
            ssrRenderList(steps, (step, i2) => {
              _push2(`<div class="card p-6 lg:p-8 flex items-start gap-6"${_scopeId}><div class="shrink-0 h-12 w-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(step.icon), { class: "h-6 w-6" }, null), _parent2, _scopeId);
              _push2(`</div><div${_scopeId}><div class="flex items-center gap-3"${_scopeId}><span class="text-xs font-bold text-surface-400"${_scopeId}>STEP ${ssrInterpolate(i2 + 1)}</span></div><h3 class="mt-1 text-xl font-bold text-surface-900 dark:text-surface-50"${_scopeId}>${ssrInterpolate(step.title)}</h3><p class="mt-2 text-surface-600 dark:text-surface-400"${_scopeId}>${ssrInterpolate(step.desc)}</p></div></div>`);
            });
            _push2(`<!--]--></div><div class="mt-16 card p-10 text-center bg-gradient-to-br from-primary-600 to-primary-800 text-white"${_scopeId}><h2 class="text-2xl lg:text-3xl font-bold"${_scopeId}>Ready to find your next customer?</h2><p class="mt-2 opacity-90"${_scopeId}>Start your 7-day free trial — no credit card required.</p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("register"),
              class: "mt-6 btn bg-white text-primary-700 hover:bg-surface-50 inline-flex"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Start Free Trial `);
                  _push3(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Start Free Trial "),
                    createVNode(unref(ArrowRight), { class: "h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "py-16 lg:py-20 text-center" }, [
                createVNode("div", { class: "max-w-3xl mx-auto px-4" }, [
                  createVNode("h1", { class: "text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50" }, " How Customer Near Me works "),
                  createVNode("p", { class: "mt-4 text-lg text-surface-600 dark:text-surface-400" }, " From search to outreach in under a minute. Here's the full flow. ")
                ])
              ]),
              createVNode("section", { class: "pb-20" }, [
                createVNode("div", { class: "max-w-5xl mx-auto px-4 lg:px-8" }, [
                  createVNode("div", { class: "grid gap-6 md:gap-8" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(steps, (step, i2) => {
                      return createVNode("div", {
                        key: step.title,
                        class: "card p-6 lg:p-8 flex items-start gap-6"
                      }, [
                        createVNode("div", { class: "shrink-0 h-12 w-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600" }, [
                          (openBlock(), createBlock(resolveDynamicComponent(step.icon), { class: "h-6 w-6" }))
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("span", { class: "text-xs font-bold text-surface-400" }, "STEP " + toDisplayString(i2 + 1), 1)
                          ]),
                          createVNode("h3", { class: "mt-1 text-xl font-bold text-surface-900 dark:text-surface-50" }, toDisplayString(step.title), 1),
                          createVNode("p", { class: "mt-2 text-surface-600 dark:text-surface-400" }, toDisplayString(step.desc), 1)
                        ])
                      ]);
                    }), 64))
                  ]),
                  createVNode("div", { class: "mt-16 card p-10 text-center bg-gradient-to-br from-primary-600 to-primary-800 text-white" }, [
                    createVNode("h2", { class: "text-2xl lg:text-3xl font-bold" }, "Ready to find your next customer?"),
                    createVNode("p", { class: "mt-2 opacity-90" }, "Start your 7-day free trial — no credit card required."),
                    createVNode(unref(Link), {
                      href: _ctx.route("register"),
                      class: "mt-6 btn bg-white text-primary-700 hover:bg-surface-50 inline-flex"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Start Free Trial "),
                        createVNode(unref(ArrowRight), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/HowItWorks.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$7
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = {
  __name: "Landing",
  __ssrInlineRender: true,
  props: { plans: Array, testimonials: Array, faqs: Array },
  setup(__props) {
    const features = [
      { icon: MapPin, title: "Geo-targeted leads", desc: "Filter by country, state, city, and radius up to 50km." },
      { icon: Filter, title: "Smart filters", desc: "Min rating, review count, has email/phone/website — get exactly the leads you want." },
      { icon: Zap, title: "AI lead scoring", desc: "Auto-categorized as Hot, SEO Weak, Inactive — focus on the highest-value prospects." },
      { icon: Download, title: "Unlimited exports", desc: "CSV and XLSX exports with custom column selection. No row limits." },
      { icon: Shield, title: "Verified data", desc: "Sourced from public GMB listings, deduplicated, and continuously refreshed." },
      { icon: Globe, title: "Affiliate ready", desc: "Earn 30% on every referral, plus 20% on recurring renewals." }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "GMB Lead Generation Made Simple" }, null, _parent));
      _push(`<div class="min-h-screen bg-surface-50 dark:bg-surface-950"><nav class="sticky top-0 z-30 bg-white/80 dark:bg-surface-900/80 backdrop-blur border-b border-surface-200 dark:border-surface-800"><div class="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-9 w-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold"${_scopeId}>C</div><span class="font-bold"${_scopeId}>CustomerNearMe</span>`);
          } else {
            return [
              createVNode("div", { class: "h-9 w-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold" }, "C"),
              createVNode("span", { class: "font-bold" }, "CustomerNearMe")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden md:flex items-center gap-6 text-sm">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("how-it-works"),
        class: "hover:text-primary-600"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`How It Works`);
          } else {
            return [
              createTextVNode("How It Works")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("pricing"),
        class: "hover:text-primary-600"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Pricing`);
          } else {
            return [
              createTextVNode("Pricing")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("faq"),
        class: "hover:text-primary-600"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`FAQ`);
          } else {
            return [
              createTextVNode("FAQ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("affiliate-program"),
        class: "hover:text-primary-600"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Affiliate`);
          } else {
            return [
              createTextVNode("Affiliate")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("login"),
        class: "btn-ghost text-sm"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Log in`);
          } else {
            return [
              createTextVNode("Log in")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("register"),
        class: "btn-primary text-sm"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Get Started`);
          } else {
            return [
              createTextVNode("Get Started")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></nav><section class="relative overflow-hidden"><div class="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-28"><div class="grid lg:grid-cols-2 gap-12 items-center"><div><span class="badge bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"> ⚡ 7-day free trial · No card required </span><h1 class="mt-4 text-4xl lg:text-5xl font-bold tracking-tight text-surface-900 dark:text-surface-50"> Verified GMB leads,<br><span class="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent"> instantly delivered. </span></h1><p class="mt-4 text-lg text-surface-600 dark:text-surface-300"> Generate hyper-targeted local business leads from Google My Business in seconds. Filter by country, city, niche, and radius. Get verified contact info ready for outreach. </p><div class="mt-8 flex flex-wrap gap-3">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("register"),
        class: "btn-primary"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Start Free Trial `);
            _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Start Free Trial "),
              createVNode(unref(ArrowRight), { class: "h-4 w-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("how-it-works"),
        class: "btn-secondary"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`See how it works`);
          } else {
            return [
              createTextVNode("See how it works")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-8 flex items-center gap-4 text-xs text-surface-500"><div class="flex items-center gap-1">`);
      _push(ssrRenderComponent(unref(Check), { class: "h-4 w-4 text-accent-500" }, null, _parent));
      _push(` 5,000+ users</div><div class="flex items-center gap-1">`);
      _push(ssrRenderComponent(unref(Check), { class: "h-4 w-4 text-accent-500" }, null, _parent));
      _push(` 12M+ leads scraped</div><div class="flex items-center gap-1">`);
      _push(ssrRenderComponent(unref(Star), { class: "h-4 w-4 text-yellow-400 fill-yellow-400" }, null, _parent));
      _push(` 4.8/5 rating</div></div></div><div class="card p-6 shadow-2xl rotate-1"><div class="flex items-center gap-2 mb-4"><div class="h-3 w-3 rounded-full bg-red-400"></div><div class="h-3 w-3 rounded-full bg-yellow-400"></div><div class="h-3 w-3 rounded-full bg-green-400"></div><span class="ml-2 text-xs text-surface-500">customernearme.com/dashboard</span></div><div class="space-y-2"><!--[-->`);
      ssrRenderList(5, (i2) => {
        _push(`<div class="flex items-center justify-between p-2 rounded border border-surface-100 dark:border-surface-800"><div><div class="text-sm font-medium">Business ${ssrInterpolate(i2)}</div><div class="text-xs text-surface-500">Karachi · ★ 4.${ssrInterpolate(9 - i2)}</div></div><span class="badge bg-accent-50 text-accent-700 text-xs">Hot</span></div>`);
      });
      _push(`<!--]--></div></div></div></div></section><section class="py-16 bg-white dark:bg-surface-900 border-y border-surface-200 dark:border-surface-800"><div class="max-w-7xl mx-auto px-4 lg:px-8"><div class="text-center max-w-2xl mx-auto"><h2 class="text-3xl font-bold">Everything you need for local lead gen</h2><p class="mt-3 text-surface-600 dark:text-surface-300">From discovery to outreach, all in one platform.</p></div><div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(features, (f2) => {
        _push(`<div class="card p-6 hover:shadow-lg transition"><div class="h-10 w-10 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-4">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(f2.icon), { class: "h-5 w-5 text-primary-600" }, null), _parent);
        _push(`</div><h3 class="font-semibold">${ssrInterpolate(f2.title)}</h3><p class="mt-1 text-sm text-surface-600 dark:text-surface-400">${ssrInterpolate(f2.desc)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-16"><div class="max-w-7xl mx-auto px-4 lg:px-8"><div class="text-center max-w-2xl mx-auto"><h2 class="text-3xl font-bold">Simple pricing</h2><p class="mt-3 text-surface-600 dark:text-surface-300">Pay in PKR via bank transfer. Cancel anytime.</p></div><div class="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"><!--[-->`);
      ssrRenderList(__props.plans, (plan) => {
        _push(`<div class="${ssrRenderClass([
          "card p-6 relative",
          plan.is_featured ? "ring-2 ring-primary-500 lg:scale-105" : ""
        ])}">`);
        if (plan.is_featured) {
          _push(`<span class="absolute -top-3 left-1/2 -translate-x-1/2 badge bg-primary-600 text-white"> Most Popular </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h3 class="font-bold text-lg">${ssrInterpolate(plan.name)}</h3><p class="text-sm text-surface-500 mt-1">${ssrInterpolate(plan.description)}</p><div class="mt-4 flex items-baseline gap-1"><span class="text-4xl font-bold">PKR ${ssrInterpolate(Number(plan.price).toLocaleString())}</span>`);
        if (plan.price > 0) {
          _push(`<span class="text-sm text-surface-500">/month</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><ul class="mt-6 space-y-2 text-sm"><li class="flex gap-2">`);
        _push(ssrRenderComponent(unref(Check), { class: "h-4 w-4 text-accent-500 shrink-0 mt-0.5" }, null, _parent));
        _push(` ${ssrInterpolate(plan.max_devices)} device(s)</li><li class="flex gap-2">`);
        _push(ssrRenderComponent(unref(Check), { class: "h-4 w-4 text-accent-500 shrink-0 mt-0.5" }, null, _parent));
        _push(` Unlimited leads</li><li class="flex gap-2">`);
        _push(ssrRenderComponent(unref(Check), { class: "h-4 w-4 text-accent-500 shrink-0 mt-0.5" }, null, _parent));
        _push(` Unlimited exports</li><li class="flex gap-2">`);
        _push(ssrRenderComponent(unref(Check), { class: "h-4 w-4 text-accent-500 shrink-0 mt-0.5" }, null, _parent));
        _push(` AI lead scoring</li>`);
        if (plan.priority_support) {
          _push(`<li class="flex gap-2">`);
          _push(ssrRenderComponent(unref(Check), { class: "h-4 w-4 text-accent-500 shrink-0 mt-0.5" }, null, _parent));
          _push(` Priority support</li>`);
        } else {
          _push(`<!---->`);
        }
        if (plan.api_access) {
          _push(`<li class="flex gap-2">`);
          _push(ssrRenderComponent(unref(Check), { class: "h-4 w-4 text-accent-500 shrink-0 mt-0.5" }, null, _parent));
          _push(` API access</li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("register"),
          class: ["mt-6 block text-center", plan.is_featured ? "btn-primary" : "btn-secondary"]
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(plan.price > 0 ? "Choose " + plan.name : "Start Free Trial")}`);
            } else {
              return [
                createTextVNode(toDisplayString(plan.price > 0 ? "Choose " + plan.name : "Start Free Trial"), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-16 bg-white dark:bg-surface-900 border-y border-surface-200 dark:border-surface-800"><div class="max-w-7xl mx-auto px-4 lg:px-8"><div class="text-center"><h2 class="text-3xl font-bold">Loved by lead gen pros</h2></div><div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(__props.testimonials, (t3) => {
        _push(`<div class="card p-6"><div class="flex gap-0.5 text-yellow-400 mb-3"><!--[-->`);
        ssrRenderList(t3.rating, (n2) => {
          _push(ssrRenderComponent(unref(Star), {
            key: n2,
            class: "h-4 w-4 fill-yellow-400"
          }, null, _parent));
        });
        _push(`<!--]--></div><p class="text-sm text-surface-700 dark:text-surface-300">&quot;${ssrInterpolate(t3.content)}&quot;</p><div class="mt-4 flex items-center gap-3"><div class="h-9 w-9 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold">${ssrInterpolate(t3.name.charAt(0))}</div><div><p class="text-sm font-semibold">${ssrInterpolate(t3.name)}</p><p class="text-xs text-surface-500">${ssrInterpolate(t3.title)}${ssrInterpolate(t3.company ? `, ${t3.company}` : "")}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-16"><div class="max-w-3xl mx-auto px-4 lg:px-8"><div class="text-center"><h2 class="text-3xl font-bold">Frequently asked questions</h2></div><div class="mt-10 space-y-4"><!--[-->`);
      ssrRenderList(__props.faqs, (faq) => {
        _push(`<details class="card p-5 group"><summary class="cursor-pointer font-semibold flex justify-between items-center">${ssrInterpolate(faq.question)} `);
        _push(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4 transition group-open:rotate-90" }, null, _parent));
        _push(`</summary><p class="mt-3 text-sm text-surface-600 dark:text-surface-400">${ssrInterpolate(faq.answer)}</p></details>`);
      });
      _push(`<!--]--></div></div></section><section class="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white"><div class="max-w-3xl mx-auto px-4 lg:px-8 text-center"><h2 class="text-3xl lg:text-4xl font-bold">Ready to find your next 1,000 leads?</h2><p class="mt-4 text-primary-100">Start your 7-day free trial. No credit card. No commitment.</p>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("register"),
        class: "mt-8 inline-flex btn bg-white text-primary-700 hover:bg-primary-50"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Get Started Free `);
            _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Get Started Free "),
              createVNode(unref(ArrowRight), { class: "h-4 w-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><footer class="py-12 bg-surface-900 text-surface-400"><div class="max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-4 gap-8"><div><div class="flex items-center gap-2"><div class="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">C</div><span class="font-bold text-white">CustomerNearMe</span></div><p class="mt-3 text-sm">Verified GMB leads, instantly.</p></div><div><h4 class="text-white font-semibold mb-3 text-sm">Product</h4><ul class="space-y-2 text-sm"><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("pricing"),
        class: "hover:text-white"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Pricing`);
          } else {
            return [
              createTextVNode("Pricing")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("how-it-works"),
        class: "hover:text-white"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`How It Works`);
          } else {
            return [
              createTextVNode("How It Works")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("faq"),
        class: "hover:text-white"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`FAQ`);
          } else {
            return [
              createTextVNode("FAQ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div><h4 class="text-white font-semibold mb-3 text-sm">Company</h4><ul class="space-y-2 text-sm"><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("contact"),
        class: "hover:text-white"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contact`);
          } else {
            return [
              createTextVNode("Contact")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("affiliate-program"),
        class: "hover:text-white"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Affiliate Program`);
          } else {
            return [
              createTextVNode("Affiliate Program")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div><h4 class="text-white font-semibold mb-3 text-sm">Legal</h4><ul class="space-y-2 text-sm"><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("terms"),
        class: "hover:text-white"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terms`);
          } else {
            return [
              createTextVNode("Terms")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("privacy"),
        class: "hover:text-white"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacy`);
          } else {
            return [
              createTextVNode("Privacy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></div><div class="max-w-7xl mx-auto px-4 lg:px-8 mt-8 pt-8 border-t border-surface-800 text-xs"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Customer Near Me. All rights reserved. </div></footer></div><!--]-->`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Landing.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$6
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$5 = {
  __name: "Pricing",
  __ssrInlineRender: true,
  props: { plans: Array },
  setup(__props) {
    const features = [
      { key: "leads", label: "Lead generation", free: "Trial only", starter: "Unlimited", growth: "Unlimited" },
      { key: "export", label: "CSV / XLSX export", free: "Trial only", starter: "Unlimited", growth: "Unlimited" },
      { key: "devices", label: "Devices allowed", free: "1", starter: "2", growth: "5" },
      { key: "support", label: "Priority support", free: false, starter: true, growth: true },
      { key: "ai", label: "AI lead scoring", free: true, starter: true, growth: true },
      { key: "api", label: "API access", free: false, starter: false, growth: true },
      { key: "saved", label: "Saved searches", free: "5", starter: "50", growth: "Unlimited" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Pricing" }, null, _parent));
      _push(`<div class="min-h-screen bg-surface-50 dark:bg-surface-950"><nav class="sticky top-0 z-30 bg-white/80 dark:bg-surface-900/80 backdrop-blur border-b border-surface-200 dark:border-surface-800"><div class="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-9 w-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold"${_scopeId}>C</div><span class="font-bold"${_scopeId}>CustomerNearMe</span>`);
          } else {
            return [
              createVNode("div", { class: "h-9 w-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold" }, "C"),
              createVNode("span", { class: "font-bold" }, "CustomerNearMe")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("login"),
        class: "btn-ghost text-sm"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Log in`);
          } else {
            return [
              createTextVNode("Log in")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("register"),
        class: "btn-primary text-sm"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Get Started`);
          } else {
            return [
              createTextVNode("Get Started")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></nav><section class="py-16 lg:py-20 text-center"><div class="max-w-3xl mx-auto px-4"><h1 class="text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50"> Simple, transparent pricing </h1><p class="mt-4 text-lg text-surface-600 dark:text-surface-400"> Start free, upgrade when you&#39;re ready. Cancel anytime. </p></div></section><section class="pb-20"><div class="max-w-6xl mx-auto px-4 lg:px-8"><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(__props.plans, (plan) => {
        _push(`<div class="${ssrRenderClass([
          "card p-8 relative",
          plan.is_featured ? "ring-2 ring-primary-500 shadow-xl scale-105" : ""
        ])}">`);
        if (plan.is_featured) {
          _push(`<span class="absolute -top-3 left-1/2 -translate-x-1/2 badge bg-primary-600 text-white"> Most Popular </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h3 class="text-lg font-bold text-surface-900 dark:text-surface-50">${ssrInterpolate(plan.name)}</h3><p class="mt-1 text-sm text-surface-500">${ssrInterpolate(plan.description)}</p><div class="mt-6"><span class="text-4xl font-bold text-surface-900 dark:text-surface-50">${ssrInterpolate(plan.price > 0 ? `${plan.currency} ${Number(plan.price).toLocaleString()}` : "Free")}</span>`);
        if (plan.price > 0) {
          _push(`<span class="text-sm text-surface-500">/month</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("register"),
          class: ["mt-6 w-full block text-center", plan.is_featured ? "btn-primary" : "btn-secondary"]
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(plan.price > 0 ? "Choose " + plan.name : "Start Free Trial")}`);
            } else {
              return [
                createTextVNode(toDisplayString(plan.price > 0 ? "Choose " + plan.name : "Start Free Trial"), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<ul class="mt-8 space-y-3 text-sm"><li class="flex items-start gap-2">`);
        _push(ssrRenderComponent(unref(Check), { class: "h-5 w-5 text-accent-500 shrink-0" }, null, _parent));
        _push(`<span>${ssrInterpolate(plan.monthly_lead_limit ? `${plan.monthly_lead_limit} leads/mo` : "Unlimited leads")}</span></li><li class="flex items-start gap-2">`);
        _push(ssrRenderComponent(unref(Check), { class: "h-5 w-5 text-accent-500 shrink-0" }, null, _parent));
        _push(`<span>${ssrInterpolate(plan.monthly_export_limit ? `${plan.monthly_export_limit} exports/mo` : "Unlimited exports")}</span></li><li class="flex items-start gap-2">`);
        _push(ssrRenderComponent(unref(Check), { class: "h-5 w-5 text-accent-500 shrink-0" }, null, _parent));
        _push(`<span>${ssrInterpolate(plan.max_devices)} ${ssrInterpolate(plan.max_devices === 1 ? "device" : "devices")}</span></li><li class="${ssrRenderClass([plan.priority_support ? "" : "opacity-40", "flex items-start gap-2"])}">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(plan.priority_support ? unref(Check) : unref(X)), {
          class: ["h-5 w-5 shrink-0", plan.priority_support ? "text-accent-500" : "text-surface-400"]
        }, null), _parent);
        _push(`<span>Priority support</span></li><li class="${ssrRenderClass([plan.api_access ? "" : "opacity-40", "flex items-start gap-2"])}">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(plan.api_access ? unref(Check) : unref(X)), {
          class: ["h-5 w-5 shrink-0", plan.api_access ? "text-accent-500" : "text-surface-400"]
        }, null), _parent);
        _push(`<span>API access</span></li></ul></div>`);
      });
      _push(`<!--]--></div><div class="mt-16 card overflow-hidden"><div class="px-6 py-4 border-b border-surface-200 dark:border-surface-800"><h2 class="text-lg font-bold">Compare features</h2></div><table class="w-full text-sm"><thead class="bg-surface-50 dark:bg-surface-800/50"><tr><th class="px-6 py-3 text-left font-semibold">Feature</th><th class="px-6 py-3 text-center font-semibold">Free</th><th class="px-6 py-3 text-center font-semibold">Starter</th><th class="px-6 py-3 text-center font-semibold">Growth</th></tr></thead><tbody class="divide-y divide-surface-200 dark:divide-surface-800"><!--[-->`);
      ssrRenderList(features, (f2) => {
        _push(`<tr><td class="px-6 py-3 text-surface-700 dark:text-surface-300">${ssrInterpolate(f2.label)}</td><td class="px-6 py-3 text-center">`);
        if (f2.free === true) {
          _push(ssrRenderComponent(unref(Check), { class: "h-5 w-5 text-accent-500 mx-auto" }, null, _parent));
        } else if (f2.free === false) {
          _push(ssrRenderComponent(unref(X), { class: "h-5 w-5 text-surface-300 mx-auto" }, null, _parent));
        } else {
          _push(`<span>${ssrInterpolate(f2.free)}</span>`);
        }
        _push(`</td><td class="px-6 py-3 text-center">`);
        if (f2.starter === true) {
          _push(ssrRenderComponent(unref(Check), { class: "h-5 w-5 text-accent-500 mx-auto" }, null, _parent));
        } else if (f2.starter === false) {
          _push(ssrRenderComponent(unref(X), { class: "h-5 w-5 text-surface-300 mx-auto" }, null, _parent));
        } else {
          _push(`<span>${ssrInterpolate(f2.starter)}</span>`);
        }
        _push(`</td><td class="px-6 py-3 text-center">`);
        if (f2.growth === true) {
          _push(ssrRenderComponent(unref(Check), { class: "h-5 w-5 text-accent-500 mx-auto" }, null, _parent));
        } else if (f2.growth === false) {
          _push(ssrRenderComponent(unref(X), { class: "h-5 w-5 text-surface-300 mx-auto" }, null, _parent));
        } else {
          _push(`<span>${ssrInterpolate(f2.growth)}</span>`);
        }
        _push(`</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="mt-16 text-center"><h2 class="text-2xl font-bold">Have questions?</h2><p class="mt-2 text-surface-600 dark:text-surface-400">Read our FAQ or get in touch.</p><div class="mt-4 flex gap-3 justify-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("faq"),
        class: "btn-secondary"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View FAQ`);
          } else {
            return [
              createTextVNode("View FAQ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("contact"),
        class: "btn-secondary"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contact us`);
          } else {
            return [
              createTextVNode("Contact us")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section></div><!--]-->`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Pricing.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$5
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = {
  __name: "Privacy",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Privacy Policy" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$d, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<article class="max-w-3xl mx-auto px-4 lg:px-8 py-16 prose prose-slate dark:prose-invert"${_scopeId}><h1${_scopeId}>Privacy Policy</h1><p class="text-sm text-surface-500"${_scopeId}><em${_scopeId}>Last updated: ${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString())}</em></p><h2${_scopeId}>1. Information we collect</h2><p${_scopeId}>When you create an account, we collect your name, email address, phone number (optional), and country code. When you make a payment, we collect transaction information including the screenshot of your bank transfer.</p><h2${_scopeId}>2. How we use your information</h2><p${_scopeId}>We use your information to:</p><ul${_scopeId}><li${_scopeId}>Provide and maintain the service</li><li${_scopeId}>Process payments and activate subscriptions</li><li${_scopeId}>Send transactional emails (welcome, payment confirmations, trial expiry, etc.)</li><li${_scopeId}>Track devices on your account for plan limit enforcement</li><li${_scopeId}>Calculate affiliate commissions</li></ul><h2${_scopeId}>3. Lead data</h2><p${_scopeId}>The business leads generated through our platform are sourced from publicly available Google My Business listings. We do not collect personal data of individual consumers — only public business contact information.</p><h2${_scopeId}>4. Cookies</h2><p${_scopeId}>We use cookies for authentication, session management, and affiliate referral tracking (90-day attribution window).</p><h2${_scopeId}>5. Data security</h2><p${_scopeId}>We use industry-standard security: HTTPS everywhere, password hashing (bcrypt), encrypted database backups, and audit logging on admin actions.</p><h2${_scopeId}>6. Your rights</h2><p${_scopeId}>You can export or delete your account data at any time from <em${_scopeId}>Settings → Profile</em>. Account deletion is soft-deleted for 30 days before permanent purge.</p><h2${_scopeId}>7. Contact</h2><p${_scopeId}>For privacy questions: <a href="mailto:privacy@customernearme.com"${_scopeId}>privacy@customernearme.com</a></p></article>`);
          } else {
            return [
              createVNode("article", { class: "max-w-3xl mx-auto px-4 lg:px-8 py-16 prose prose-slate dark:prose-invert" }, [
                createVNode("h1", null, "Privacy Policy"),
                createVNode("p", { class: "text-sm text-surface-500" }, [
                  createVNode("em", null, "Last updated: " + toDisplayString((/* @__PURE__ */ new Date()).toLocaleDateString()), 1)
                ]),
                createVNode("h2", null, "1. Information we collect"),
                createVNode("p", null, "When you create an account, we collect your name, email address, phone number (optional), and country code. When you make a payment, we collect transaction information including the screenshot of your bank transfer."),
                createVNode("h2", null, "2. How we use your information"),
                createVNode("p", null, "We use your information to:"),
                createVNode("ul", null, [
                  createVNode("li", null, "Provide and maintain the service"),
                  createVNode("li", null, "Process payments and activate subscriptions"),
                  createVNode("li", null, "Send transactional emails (welcome, payment confirmations, trial expiry, etc.)"),
                  createVNode("li", null, "Track devices on your account for plan limit enforcement"),
                  createVNode("li", null, "Calculate affiliate commissions")
                ]),
                createVNode("h2", null, "3. Lead data"),
                createVNode("p", null, "The business leads generated through our platform are sourced from publicly available Google My Business listings. We do not collect personal data of individual consumers — only public business contact information."),
                createVNode("h2", null, "4. Cookies"),
                createVNode("p", null, "We use cookies for authentication, session management, and affiliate referral tracking (90-day attribution window)."),
                createVNode("h2", null, "5. Data security"),
                createVNode("p", null, "We use industry-standard security: HTTPS everywhere, password hashing (bcrypt), encrypted database backups, and audit logging on admin actions."),
                createVNode("h2", null, "6. Your rights"),
                createVNode("p", null, [
                  createTextVNode("You can export or delete your account data at any time from "),
                  createVNode("em", null, "Settings → Profile"),
                  createTextVNode(". Account deletion is soft-deleted for 30 days before permanent purge.")
                ]),
                createVNode("h2", null, "7. Contact"),
                createVNode("p", null, [
                  createTextVNode("For privacy questions: "),
                  createVNode("a", { href: "mailto:privacy@customernearme.com" }, "privacy@customernearme.com")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Privacy.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  __name: "Terms",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Terms of Service" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$d, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<article class="max-w-3xl mx-auto px-4 lg:px-8 py-16 prose prose-slate dark:prose-invert"${_scopeId}><h1${_scopeId}>Terms of Service</h1><p class="text-sm text-surface-500"${_scopeId}><em${_scopeId}>Last updated: ${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString())}</em></p><h2${_scopeId}>1. Acceptance of terms</h2><p${_scopeId}>By accessing or using Customer Near Me, you agree to be bound by these Terms. If you disagree, do not use the service.</p><h2${_scopeId}>2. Account responsibility</h2><p${_scopeId}>You are responsible for maintaining the confidentiality of your login credentials. You agree to accept responsibility for all activities that occur under your account.</p><h2${_scopeId}>3. Acceptable use</h2><p${_scopeId}>You agree not to:</p><ul${_scopeId}><li${_scopeId}>Use the service for illegal purposes or to harass others</li><li${_scopeId}>Attempt to bypass plan limits, device restrictions, or security measures</li><li${_scopeId}>Reverse-engineer, scrape, or resell our service or data</li><li${_scopeId}>Send unsolicited bulk email (spam) using lead data from our platform</li><li${_scopeId}>Share your account with unauthorized users or exceed your plan&#39;s device limit</li></ul><h2${_scopeId}>4. Lead data usage</h2><p${_scopeId}>Lead data is provided for legitimate business outreach only. You must comply with all applicable laws governing email marketing, telemarketing, and data privacy in your jurisdiction (CAN-SPAM, GDPR, TCPA, etc.).</p><h2${_scopeId}>5. Subscription &amp; payments</h2><p${_scopeId}>Subscriptions are billed monthly via manual bank transfer. After admin approval, your plan activates for 30 days. We do not auto-renew. No refunds on partially-used subscription periods.</p><h2${_scopeId}>6. Affiliate program</h2><p${_scopeId}>Self-referrals are not permitted. We reserve the right to reverse commissions on fraudulent referrals or chargeback events.</p><h2${_scopeId}>7. Account suspension</h2><p${_scopeId}>We may suspend or terminate accounts that violate these Terms without prior notice.</p><h2${_scopeId}>8. Disclaimer</h2><p${_scopeId}>The service is provided &quot;as is&quot; without warranties. Lead data accuracy depends on Google&#39;s public listings — we do not guarantee any specific number of leads or their conversion rates.</p><h2${_scopeId}>9. Limitation of liability</h2><p${_scopeId}>Our liability is limited to the amount you have paid in the past 12 months.</p><h2${_scopeId}>10. Changes to terms</h2><p${_scopeId}>We may update these terms. Material changes will be communicated via email.</p><h2${_scopeId}>11. Contact</h2><p${_scopeId}>For legal questions: <a href="mailto:legal@customernearme.com"${_scopeId}>legal@customernearme.com</a></p></article>`);
          } else {
            return [
              createVNode("article", { class: "max-w-3xl mx-auto px-4 lg:px-8 py-16 prose prose-slate dark:prose-invert" }, [
                createVNode("h1", null, "Terms of Service"),
                createVNode("p", { class: "text-sm text-surface-500" }, [
                  createVNode("em", null, "Last updated: " + toDisplayString((/* @__PURE__ */ new Date()).toLocaleDateString()), 1)
                ]),
                createVNode("h2", null, "1. Acceptance of terms"),
                createVNode("p", null, "By accessing or using Customer Near Me, you agree to be bound by these Terms. If you disagree, do not use the service."),
                createVNode("h2", null, "2. Account responsibility"),
                createVNode("p", null, "You are responsible for maintaining the confidentiality of your login credentials. You agree to accept responsibility for all activities that occur under your account."),
                createVNode("h2", null, "3. Acceptable use"),
                createVNode("p", null, "You agree not to:"),
                createVNode("ul", null, [
                  createVNode("li", null, "Use the service for illegal purposes or to harass others"),
                  createVNode("li", null, "Attempt to bypass plan limits, device restrictions, or security measures"),
                  createVNode("li", null, "Reverse-engineer, scrape, or resell our service or data"),
                  createVNode("li", null, "Send unsolicited bulk email (spam) using lead data from our platform"),
                  createVNode("li", null, "Share your account with unauthorized users or exceed your plan's device limit")
                ]),
                createVNode("h2", null, "4. Lead data usage"),
                createVNode("p", null, "Lead data is provided for legitimate business outreach only. You must comply with all applicable laws governing email marketing, telemarketing, and data privacy in your jurisdiction (CAN-SPAM, GDPR, TCPA, etc.)."),
                createVNode("h2", null, "5. Subscription & payments"),
                createVNode("p", null, "Subscriptions are billed monthly via manual bank transfer. After admin approval, your plan activates for 30 days. We do not auto-renew. No refunds on partially-used subscription periods."),
                createVNode("h2", null, "6. Affiliate program"),
                createVNode("p", null, "Self-referrals are not permitted. We reserve the right to reverse commissions on fraudulent referrals or chargeback events."),
                createVNode("h2", null, "7. Account suspension"),
                createVNode("p", null, "We may suspend or terminate accounts that violate these Terms without prior notice."),
                createVNode("h2", null, "8. Disclaimer"),
                createVNode("p", null, `The service is provided "as is" without warranties. Lead data accuracy depends on Google's public listings — we do not guarantee any specific number of leads or their conversion rates.`),
                createVNode("h2", null, "9. Limitation of liability"),
                createVNode("p", null, "Our liability is limited to the amount you have paid in the past 12 months."),
                createVNode("h2", null, "10. Changes to terms"),
                createVNode("p", null, "We may update these terms. Material changes will be communicated via email."),
                createVNode("h2", null, "11. Contact"),
                createVNode("p", null, [
                  createTextVNode("For legal questions: "),
                  createVNode("a", { href: "mailto:legal@customernearme.com" }, "legal@customernearme.com")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Terms.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  __name: "Devices",
  __ssrInlineRender: true,
  props: { devices: Array },
  setup(__props) {
    const iconFor = (device) => {
      if (device.device_type === "mobile") return Smartphone;
      if (device.device_type === "tablet") return Tablet;
      return Monitor;
    };
    const revoke = (device) => {
      if (confirm("Revoke this device? You will need to log in again on this device.")) {
        router.delete(route("devices.destroy", device.id), { preserveScroll: true });
      }
    };
    const fmt = (date) => new Date(date).toLocaleString();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Connected Devices" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-3xl mx-auto space-y-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}>Connected devices</h1><p class="mt-1 text-sm text-surface-500"${_scopeId}> Devices that have signed into your account. Revoke any you don&#39;t recognize. </p></div><div class="card divide-y divide-surface-200 dark:divide-surface-800"${_scopeId}><!--[-->`);
            ssrRenderList(__props.devices, (device) => {
              _push2(`<div class="p-5 flex items-center gap-4"${_scopeId}><div class="shrink-0 h-10 w-10 rounded-lg bg-surface-100 dark:bg-surface-800 flex items-center justify-center"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(iconFor(device)), { class: "h-5 w-5 text-surface-600 dark:text-surface-400" }, null), _parent2, _scopeId);
              _push2(`</div><div class="flex-1 min-w-0"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><p class="font-medium truncate"${_scopeId}>${ssrInterpolate(device.browser)} on ${ssrInterpolate(device.os)}</p>`);
              if (device.is_trusted) {
                _push2(`<span class="badge bg-accent-50 text-accent-700"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Shield), { class: "h-3 w-3 mr-1" }, null, _parent2, _scopeId));
                _push2(` Trusted </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><p class="text-xs text-surface-500"${_scopeId}>${ssrInterpolate(device.ip)} · ${ssrInterpolate(device.country || "Unknown location")} · Last seen ${ssrInterpolate(fmt(device.last_seen_at))}</p></div><button class="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(`</button></div>`);
            });
            _push2(`<!--]-->`);
            if (__props.devices.length === 0) {
              _push2(`<div class="p-12 text-center text-sm text-surface-500"${_scopeId}> No active devices. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-3xl mx-auto space-y-6" }, [
                createVNode("div", null, [
                  createVNode("h1", { class: "text-2xl font-bold" }, "Connected devices"),
                  createVNode("p", { class: "mt-1 text-sm text-surface-500" }, " Devices that have signed into your account. Revoke any you don't recognize. ")
                ]),
                createVNode("div", { class: "card divide-y divide-surface-200 dark:divide-surface-800" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.devices, (device) => {
                    return openBlock(), createBlock("div", {
                      key: device.id,
                      class: "p-5 flex items-center gap-4"
                    }, [
                      createVNode("div", { class: "shrink-0 h-10 w-10 rounded-lg bg-surface-100 dark:bg-surface-800 flex items-center justify-center" }, [
                        (openBlock(), createBlock(resolveDynamicComponent(iconFor(device)), { class: "h-5 w-5 text-surface-600 dark:text-surface-400" }))
                      ]),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("p", { class: "font-medium truncate" }, toDisplayString(device.browser) + " on " + toDisplayString(device.os), 1),
                          device.is_trusted ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "badge bg-accent-50 text-accent-700"
                          }, [
                            createVNode(unref(Shield), { class: "h-3 w-3 mr-1" }),
                            createTextVNode(" Trusted ")
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("p", { class: "text-xs text-surface-500" }, toDisplayString(device.ip) + " · " + toDisplayString(device.country || "Unknown location") + " · Last seen " + toDisplayString(fmt(device.last_seen_at)), 1)
                      ]),
                      createVNode("button", {
                        onClick: ($event) => revoke(device),
                        class: "p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                      }, [
                        createVNode(unref(Trash2), { class: "h-4 w-4" })
                      ], 8, ["onClick"])
                    ]);
                  }), 128)),
                  __props.devices.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-12 text-center text-sm text-surface-500"
                  }, " No active devices. ")) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Devices.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = {
  __name: "Notifications",
  __ssrInlineRender: true,
  props: {
    notifications: Object,
    unread_count: Number,
    preferences: Object
  },
  setup(__props) {
    const props = __props;
    const prefs = useForm({ ...props.preferences });
    const savePrefs = () => prefs.patch(route("notifications.preferences"), { preserveScroll: true });
    const markRead = (id) => router.post(route("notifications.read", id), {}, { preserveScroll: true });
    const markAllRead = () => router.post(route("notifications.read-all"), {}, { preserveScroll: true });
    const fmtDate = (d2) => new Date(d2).toLocaleString();
    const typeLabel = (t3) => ({
      payment_received: "Payment received",
      payment_approved: "Payment approved 🎉",
      payment_rejected: "Payment issue",
      new_payment_review: "New payment for review"
    })[t3] || t3;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Notifications" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-3xl mx-auto space-y-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}>Notifications</h1><p class="mt-1 text-sm text-surface-500"${_scopeId}>${ssrInterpolate(__props.unread_count)} unread</p></div><div class="card p-6"${_scopeId}><h2 class="font-semibold mb-4"${_scopeId}>Email preferences</h2><div class="space-y-3"${_scopeId}><label class="flex items-center justify-between p-3 rounded-lg border border-surface-200 dark:border-surface-700"${_scopeId}><div${_scopeId}><p class="font-medium text-sm"${_scopeId}>Lead generation complete</p><p class="text-xs text-surface-500"${_scopeId}>Email me when a lead search finishes</p></div><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(prefs).email_lead_complete) ? ssrLooseContain(unref(prefs).email_lead_complete, null) : unref(prefs).email_lead_complete) ? " checked" : ""} class="rounded text-primary-600"${_scopeId}></label><label class="flex items-center justify-between p-3 rounded-lg border border-surface-200 dark:border-surface-700"${_scopeId}><div${_scopeId}><p class="font-medium text-sm"${_scopeId}>Weekly digest</p><p class="text-xs text-surface-500"${_scopeId}>Summary of your hot leads each Monday</p></div><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(prefs).email_weekly_digest) ? ssrLooseContain(unref(prefs).email_weekly_digest, null) : unref(prefs).email_weekly_digest) ? " checked" : ""} class="rounded text-primary-600"${_scopeId}></label><label class="flex items-center justify-between p-3 rounded-lg border border-surface-200 dark:border-surface-700"${_scopeId}><div${_scopeId}><p class="font-medium text-sm"${_scopeId}>Marketing emails</p><p class="text-xs text-surface-500"${_scopeId}>Product updates, tips, new features</p></div><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(prefs).email_marketing) ? ssrLooseContain(unref(prefs).email_marketing, null) : unref(prefs).email_marketing) ? " checked" : ""} class="rounded text-primary-600"${_scopeId}></label></div></div><div class="card overflow-hidden"${_scopeId}><div class="px-6 py-4 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between"${_scopeId}><h2 class="font-semibold"${_scopeId}>Inbox</h2>`);
            if (__props.unread_count > 0) {
              _push2(`<button class="btn-ghost text-sm"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(` Mark all read </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><ul class="divide-y divide-surface-200 dark:divide-surface-800"${_scopeId}><!--[-->`);
            ssrRenderList(__props.notifications.data, (n2) => {
              var _a;
              _push2(`<li class="${ssrRenderClass(["p-5 flex items-start gap-3", n2.read_at ? "opacity-60" : ""])}"${_scopeId}><div class="shrink-0 mt-0.5"${_scopeId}>`);
              if (!n2.read_at) {
                _push2(ssrRenderComponent(unref(Bell), { class: "h-5 w-5 text-primary-600" }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(BellOff), { class: "h-5 w-5 text-surface-400" }, null, _parent2, _scopeId));
              }
              _push2(`</div><div class="flex-1 min-w-0"${_scopeId}><p class="font-medium text-sm"${_scopeId}>${ssrInterpolate(typeLabel(n2.type))}</p>`);
              if ((_a = n2.data) == null ? void 0 : _a.amount) {
                _push2(`<p class="text-xs text-surface-500 mt-0.5"${_scopeId}> Amount: PKR ${ssrInterpolate(Number(n2.data.amount).toLocaleString())} `);
                if (n2.data.plan) {
                  _push2(`<span${_scopeId}> · ${ssrInterpolate(n2.data.plan)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="text-xs text-surface-400 mt-1"${_scopeId}>${ssrInterpolate(fmtDate(n2.created_at))}</p></div>`);
              if (!n2.read_at) {
                _push2(`<button class="text-xs text-primary-600 hover:underline"${_scopeId}>Mark read</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</li>`);
            });
            _push2(`<!--]-->`);
            if (__props.notifications.data.length === 0) {
              _push2(`<li class="p-12 text-center text-surface-500 text-sm"${_scopeId}> No notifications. </li>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</ul></div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-3xl mx-auto space-y-6" }, [
                createVNode("div", null, [
                  createVNode("h1", { class: "text-2xl font-bold" }, "Notifications"),
                  createVNode("p", { class: "mt-1 text-sm text-surface-500" }, toDisplayString(__props.unread_count) + " unread", 1)
                ]),
                createVNode("div", { class: "card p-6" }, [
                  createVNode("h2", { class: "font-semibold mb-4" }, "Email preferences"),
                  createVNode("div", { class: "space-y-3" }, [
                    createVNode("label", { class: "flex items-center justify-between p-3 rounded-lg border border-surface-200 dark:border-surface-700" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "font-medium text-sm" }, "Lead generation complete"),
                        createVNode("p", { class: "text-xs text-surface-500" }, "Email me when a lead search finishes")
                      ]),
                      withDirectives(createVNode("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": ($event) => unref(prefs).email_lead_complete = $event,
                        onChange: savePrefs,
                        class: "rounded text-primary-600"
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelCheckbox, unref(prefs).email_lead_complete]
                      ])
                    ]),
                    createVNode("label", { class: "flex items-center justify-between p-3 rounded-lg border border-surface-200 dark:border-surface-700" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "font-medium text-sm" }, "Weekly digest"),
                        createVNode("p", { class: "text-xs text-surface-500" }, "Summary of your hot leads each Monday")
                      ]),
                      withDirectives(createVNode("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": ($event) => unref(prefs).email_weekly_digest = $event,
                        onChange: savePrefs,
                        class: "rounded text-primary-600"
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelCheckbox, unref(prefs).email_weekly_digest]
                      ])
                    ]),
                    createVNode("label", { class: "flex items-center justify-between p-3 rounded-lg border border-surface-200 dark:border-surface-700" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "font-medium text-sm" }, "Marketing emails"),
                        createVNode("p", { class: "text-xs text-surface-500" }, "Product updates, tips, new features")
                      ]),
                      withDirectives(createVNode("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": ($event) => unref(prefs).email_marketing = $event,
                        onChange: savePrefs,
                        class: "rounded text-primary-600"
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelCheckbox, unref(prefs).email_marketing]
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "card overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between" }, [
                    createVNode("h2", { class: "font-semibold" }, "Inbox"),
                    __props.unread_count > 0 ? (openBlock(), createBlock("button", {
                      key: 0,
                      onClick: markAllRead,
                      class: "btn-ghost text-sm"
                    }, [
                      createVNode(unref(CheckCircle), { class: "h-4 w-4" }),
                      createTextVNode(" Mark all read ")
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("ul", { class: "divide-y divide-surface-200 dark:divide-surface-800" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.notifications.data, (n2) => {
                      var _a;
                      return openBlock(), createBlock("li", {
                        key: n2.id,
                        class: ["p-5 flex items-start gap-3", n2.read_at ? "opacity-60" : ""]
                      }, [
                        createVNode("div", { class: "shrink-0 mt-0.5" }, [
                          !n2.read_at ? (openBlock(), createBlock(unref(Bell), {
                            key: 0,
                            class: "h-5 w-5 text-primary-600"
                          })) : (openBlock(), createBlock(unref(BellOff), {
                            key: 1,
                            class: "h-5 w-5 text-surface-400"
                          }))
                        ]),
                        createVNode("div", { class: "flex-1 min-w-0" }, [
                          createVNode("p", { class: "font-medium text-sm" }, toDisplayString(typeLabel(n2.type)), 1),
                          ((_a = n2.data) == null ? void 0 : _a.amount) ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-surface-500 mt-0.5"
                          }, [
                            createTextVNode(" Amount: PKR " + toDisplayString(Number(n2.data.amount).toLocaleString()) + " ", 1),
                            n2.data.plan ? (openBlock(), createBlock("span", { key: 0 }, " · " + toDisplayString(n2.data.plan), 1)) : createCommentVNode("", true)
                          ])) : createCommentVNode("", true),
                          createVNode("p", { class: "text-xs text-surface-400 mt-1" }, toDisplayString(fmtDate(n2.created_at)), 1)
                        ]),
                        !n2.read_at ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: ($event) => markRead(n2.id),
                          class: "text-xs text-primary-600 hover:underline"
                        }, "Mark read", 8, ["onClick"])) : createCommentVNode("", true)
                      ], 2);
                    }), 128)),
                    __props.notifications.data.length === 0 ? (openBlock(), createBlock("li", {
                      key: 0,
                      class: "p-12 text-center text-surface-500 text-sm"
                    }, " No notifications. ")) : createCommentVNode("", true)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Notifications.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {
  __name: "Profile",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: Boolean,
    status: String,
    profile: Object
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f;
    const props = __props;
    const activeTab = ref("personal");
    const tabs = [
      { key: "personal", label: "Personal Info", icon: User },
      { key: "security", label: "Security", icon: Shield },
      { key: "preferences", label: "Preferences", icon: Settings2 }
    ];
    const nameParts = (((_a = props.profile) == null ? void 0 : _a.name) || "").split(" ");
    const firstName = ref(nameParts[0] || "");
    const lastName = ref(nameParts.slice(1).join(" ") || "");
    const avatarPreview = ref(((_b = props.profile) == null ? void 0 : _b.avatar_url) || null);
    const avatarFileInput = ref(null);
    const profileForm = useForm({
      name: ((_c = props.profile) == null ? void 0 : _c.name) || "",
      email: ((_d = props.profile) == null ? void 0 : _d.email) || "",
      phone: ((_e = props.profile) == null ? void 0 : _e.phone) || "",
      country_code: ((_f = props.profile) == null ? void 0 : _f.country_code) || "PK",
      avatar: null
    });
    const onAvatarChange = (e2) => {
      const file = e2.target.files[0];
      if (!file) return;
      profileForm.avatar = file;
      avatarPreview.value = URL.createObjectURL(file);
    };
    const updateProfile = () => {
      profileForm.name = [firstName.value, lastName.value].filter(Boolean).join(" ");
      profileForm.post(route("profile.update"), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          profileForm.avatar = null;
        }
      });
    };
    const passwordForm = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    const updatePassword = () => passwordForm.put(route("profile.password"), {
      preserveScroll: true,
      onSuccess: () => passwordForm.reset()
    });
    const showDeleteModal = ref(false);
    const showClearModal = ref(false);
    const deleteForm = useForm({ password: "" });
    const deleteAccount = () => deleteForm.delete(route("profile.destroy"), {
      onSuccess: () => {
        showDeleteModal.value = false;
      }
    });
    const clearData = () => router.delete(route("profile.clear-data"), {
      preserveScroll: true,
      onSuccess: () => {
        showClearModal.value = false;
      }
    });
    const userInitials = computed(() => {
      var _a2;
      const parts = (((_a2 = props.profile) == null ? void 0 : _a2.name) || "").split(" ").filter(Boolean);
      return parts.map((p2) => p2[0].toUpperCase()).slice(0, 2).join("");
    });
    const isVerified = computed(() => {
      var _a2;
      return !!((_a2 = props.profile) == null ? void 0 : _a2.email_verified_at);
    });
    const roleLabel = computed(() => {
      var _a2;
      const roles = ((_a2 = props.profile) == null ? void 0 : _a2.roles) || [];
      if (roles.includes("super_admin")) return "Super Admin";
      if (roles.includes("admin")) return "Admin";
      return "Regular User";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Profile Settings" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h;
          if (_push2) {
            _push2(`<div class="w-full space-y-5"${_scopeId}><div class="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5 flex items-center justify-between gap-4 shadow-lg"${_scopeId}><div class="flex items-center gap-5"${_scopeId}><div class="relative flex-shrink-0"${_scopeId}><div class="w-16 h-16 rounded-full ring-4 ring-white/30 overflow-hidden bg-blue-400 flex items-center justify-center"${_scopeId}>`);
            if (avatarPreview.value) {
              _push2(`<img${ssrRenderAttr("src", avatarPreview.value)} class="w-full h-full object-cover" alt="Avatar"${_scopeId}>`);
            } else {
              _push2(`<span class="text-xl font-bold text-white"${_scopeId}>${ssrInterpolate(userInitials.value)}</span>`);
            }
            _push2(`</div><button type="button" class="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-surface-100 transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Camera), { class: "h-3.5 w-3.5 text-surface-600" }, null, _parent2, _scopeId));
            _push2(`</button><input type="file" accept="image/*" class="hidden"${_scopeId}></div><div${_scopeId}><h2 class="text-lg font-bold text-white leading-tight"${_scopeId}>${ssrInterpolate(((_a2 = __props.profile) == null ? void 0 : _a2.name) || "—")}</h2><p class="text-blue-100 text-sm mb-2"${_scopeId}>${ssrInterpolate((_b2 = __props.profile) == null ? void 0 : _b2.email)}</p><div class="flex flex-wrap items-center gap-2"${_scopeId}><span class="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(User), { class: "h-3 w-3" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(roleLabel.value)}</span>`);
            if (isVerified.value) {
              _push2(`<span class="inline-flex items-center gap-1 bg-green-400/30 text-green-100 text-xs font-medium px-2.5 py-1 rounded-full border border-green-300/30"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-3 w-3" }, null, _parent2, _scopeId));
              _push2(` Email Verified </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(LogIn), { class: "h-3 w-3" }, null, _parent2, _scopeId));
            _push2(` Email Login </span>`);
            if (((_c2 = __props.profile) == null ? void 0 : _c2.status) === "active") {
              _push2(`<span class="inline-flex items-center gap-1 bg-green-400/30 text-green-100 text-xs font-medium px-2.5 py-1 rounded-full border border-green-300/30"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-3 w-3" }, null, _parent2, _scopeId));
              _push2(` Active </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
            if ((_d2 = __props.profile) == null ? void 0 : _d2.last_login_at) {
              _push2(`<div class="hidden md:flex items-center gap-2 text-right text-blue-100 text-sm flex-shrink-0"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Clock), { class: "h-4 w-4 text-blue-200" }, null, _parent2, _scopeId));
              _push2(`<div${_scopeId}><p class="text-xs text-blue-200 font-medium"${_scopeId}>Last Login</p><p${_scopeId}>${ssrInterpolate(__props.profile.last_login_at)}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="card overflow-hidden"${_scopeId}><div class="border-b border-surface-200 dark:border-surface-700 px-6"${_scopeId}><nav class="flex gap-1 -mb-px"${_scopeId}><!--[-->`);
            ssrRenderList(tabs, (tab) => {
              _push2(`<button class="${ssrRenderClass([
                "flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors",
                activeTab.value === tab.key ? "border-primary-600 text-primary-600 dark:text-primary-400" : "border-transparent text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
              ])}"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(tab.icon), { class: "h-4 w-4" }, null), _parent2, _scopeId);
              _push2(` ${ssrInterpolate(tab.label)}</button>`);
            });
            _push2(`<!--]--></nav></div>`);
            if (activeTab.value === "personal") {
              _push2(`<div class="p-6"${_scopeId}>`);
              if (__props.status === "success") {
                _push2(`<div class="mb-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-3 text-sm text-green-700 dark:text-green-300"${_scopeId}> Profile updated successfully. </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<form class="space-y-5"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="label"${_scopeId}>First Name</label><input${ssrRenderAttr("value", firstName.value)} required class="input" placeholder="First name"${_scopeId}></div><div${_scopeId}><label class="label"${_scopeId}>Last Name</label><input${ssrRenderAttr("value", lastName.value)} class="input" placeholder="Last name"${_scopeId}></div></div>`);
              if (unref(profileForm).errors.name) {
                _push2(`<p class="text-xs text-red-600 -mt-3"${_scopeId}>${ssrInterpolate(unref(profileForm).errors.name)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div${_scopeId}><label class="label"${_scopeId}>Email Address</label><div class="relative"${_scopeId}><input type="email"${ssrRenderAttr("value", unref(profileForm).email)} required class="input pr-10"${_scopeId}>`);
              if (isVerified.value) {
                _push2(ssrRenderComponent(unref(CheckCircle), { class: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (isVerified.value) {
                _push2(`<p class="mt-1 text-xs text-green-600 font-medium"${_scopeId}>Email verified</p>`);
              } else {
                _push2(`<p class="mt-1 text-xs text-orange-500"${_scopeId}>Email not verified</p>`);
              }
              if (unref(profileForm).errors.email) {
                _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(profileForm).errors.email)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="label"${_scopeId}>Phone <span class="text-surface-400 font-normal"${_scopeId}>(optional)</span></label><input${ssrRenderAttr("value", unref(profileForm).phone)} class="input" placeholder="+92 300 1234567"${_scopeId}></div><div${_scopeId}><label class="label"${_scopeId}>Avatar</label><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 rounded-full overflow-hidden bg-blue-100 flex-shrink-0 flex items-center justify-center"${_scopeId}>`);
              if (avatarPreview.value) {
                _push2(`<img${ssrRenderAttr("src", avatarPreview.value)} class="w-full h-full object-cover"${_scopeId}>`);
              } else {
                _push2(`<span class="text-sm font-bold text-blue-600"${_scopeId}>${ssrInterpolate(userInitials.value)}</span>`);
              }
              _push2(`</div><input type="file" accept="image/jpeg,image/png,image/gif,image/webp" class="block w-full text-sm text-surface-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-surface-200 file:text-sm file:font-medium file:bg-white dark:file:bg-surface-800 file:cursor-pointer hover:file:bg-surface-50"${_scopeId}></div><p class="mt-1 text-xs text-surface-400"${_scopeId}>JPG, PNG — max 2MB</p></div><div class="flex justify-end gap-3 pt-2 border-t border-surface-100 dark:border-surface-800"${_scopeId}><button type="button" class="btn-secondary"${_scopeId}>Cancel</button><button type="submit"${ssrIncludeBooleanAttr(unref(profileForm).processing) ? " disabled" : ""} class="btn-primary"${_scopeId}>${ssrInterpolate(unref(profileForm).processing ? "Saving..." : "Save Changes")}</button></div></form></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "security") {
              _push2(`<div class="p-6 space-y-6"${_scopeId}><div${_scopeId}><h3 class="font-semibold text-surface-900 dark:text-white mb-1"${_scopeId}>Change Password</h3><p class="text-sm text-surface-500 mb-5"${_scopeId}>Use a strong password with at least 8 characters, mixed case and numbers.</p><form class="space-y-4 max-w-lg"${_scopeId}><div${_scopeId}><label class="label"${_scopeId}>Current Password</label><input type="password"${ssrRenderAttr("value", unref(passwordForm).current_password)} required class="input" autocomplete="current-password"${_scopeId}>`);
              if (unref(passwordForm).errors.current_password) {
                _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(passwordForm).errors.current_password)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="label"${_scopeId}>New Password</label><input type="password"${ssrRenderAttr("value", unref(passwordForm).password)} required class="input" autocomplete="new-password"${_scopeId}>`);
              if (unref(passwordForm).errors.password) {
                _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(passwordForm).errors.password)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="label"${_scopeId}>Confirm New Password</label><input type="password"${ssrRenderAttr("value", unref(passwordForm).password_confirmation)} required class="input" autocomplete="new-password"${_scopeId}></div><div class="flex justify-end gap-3 pt-2 border-t border-surface-100 dark:border-surface-800"${_scopeId}><button type="button" class="btn-secondary"${_scopeId}>Cancel</button><button type="submit"${ssrIncludeBooleanAttr(unref(passwordForm).processing) ? " disabled" : ""} class="btn-primary"${_scopeId}>${ssrInterpolate(unref(passwordForm).processing ? "Updating..." : "Update Password")}</button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "preferences") {
              _push2(`<div class="p-6"${_scopeId}><h3 class="font-semibold text-surface-900 dark:text-white mb-1"${_scopeId}>Preferences</h3><p class="text-sm text-surface-500 mb-5"${_scopeId}>Manage your notification and display preferences.</p><div class="rounded-xl border border-surface-200 dark:border-surface-700 p-4 text-sm text-surface-500 text-center py-10"${_scopeId}> Preferences settings coming soon. </div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 p-5 space-y-3"${_scopeId}><div class="flex items-center gap-2 mb-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertTriangle), { class: "h-5 w-5 text-red-500" }, null, _parent2, _scopeId));
            _push2(`<h3 class="font-bold text-red-600 dark:text-red-400"${_scopeId}>Danger Zone</h3></div><div class="flex items-center justify-between bg-white dark:bg-surface-900 rounded-xl border border-red-100 dark:border-red-900/30 px-4 py-3"${_scopeId}><div${_scopeId}><p class="text-sm font-semibold text-surface-900 dark:text-white"${_scopeId}>Delete Account</p><p class="text-xs text-surface-500 mt-0.5"${_scopeId}>Permanently delete your account and all associated data</p></div><button class="btn bg-red-600 text-white hover:bg-red-700 text-sm flex-shrink-0"${_scopeId}> Delete Account </button></div><div class="flex items-center justify-between bg-white dark:bg-surface-900 rounded-xl border border-red-100 dark:border-red-900/30 px-4 py-3"${_scopeId}><div${_scopeId}><p class="text-sm font-semibold text-surface-900 dark:text-white"${_scopeId}>Clear All Data</p><p class="text-xs text-surface-500 mt-0.5"${_scopeId}>Remove all search history and saved leads</p></div><button class="btn bg-red-600 text-white hover:bg-red-700 text-sm flex-shrink-0"${_scopeId}> Clear Data </button></div></div></div>`);
            ssrRenderTeleport(_push2, (_push3) => {
              if (showDeleteModal.value) {
                _push3(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"${_scopeId}><div class="card p-6 w-full max-w-md shadow-2xl"${_scopeId}><div class="flex items-center gap-3 mb-3"${_scopeId}><div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0"${_scopeId}>`);
                _push3(ssrRenderComponent(unref(AlertTriangle), { class: "h-5 w-5 text-red-600" }, null, _parent2, _scopeId));
                _push3(`</div><h3 class="text-lg font-bold text-surface-900 dark:text-white"${_scopeId}>Delete Account?</h3></div><p class="text-sm text-surface-500 mb-4"${_scopeId}> This will permanently delete your account and all associated data. This action <strong${_scopeId}>cannot be undone</strong>. Please enter your password to confirm. </p><input type="password"${ssrRenderAttr("value", unref(deleteForm).password)} placeholder="Enter your password" class="input mb-1"${_scopeId}>`);
                if (unref(deleteForm).errors.password) {
                  _push3(`<p class="mb-3 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(deleteForm).errors.password)}</p>`);
                } else {
                  _push3(`<!---->`);
                }
                _push3(`<div class="flex justify-end gap-3 mt-4"${_scopeId}><button class="btn-secondary"${_scopeId}>Cancel</button><button${ssrIncludeBooleanAttr(unref(deleteForm).processing) ? " disabled" : ""} class="btn bg-red-600 text-white hover:bg-red-700"${_scopeId}>${ssrInterpolate(unref(deleteForm).processing ? "Deleting..." : "Delete Account")}</button></div></div></div>`);
              } else {
                _push3(`<!---->`);
              }
            }, "body", false, _parent2);
            ssrRenderTeleport(_push2, (_push3) => {
              if (showClearModal.value) {
                _push3(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"${_scopeId}><div class="card p-6 w-full max-w-md shadow-2xl"${_scopeId}><div class="flex items-center gap-3 mb-3"${_scopeId}><div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0"${_scopeId}>`);
                _push3(ssrRenderComponent(unref(AlertTriangle), { class: "h-5 w-5 text-orange-600" }, null, _parent2, _scopeId));
                _push3(`</div><h3 class="text-lg font-bold text-surface-900 dark:text-white"${_scopeId}>Clear All Data?</h3></div><p class="text-sm text-surface-500 mb-4"${_scopeId}> This will permanently remove all your search history and saved leads. Your account will remain active. This action <strong${_scopeId}>cannot be undone</strong>. </p><div class="flex justify-end gap-3"${_scopeId}><button class="btn-secondary"${_scopeId}>Cancel</button><button class="btn bg-red-600 text-white hover:bg-red-700"${_scopeId}> Yes, Clear Data </button></div></div></div>`);
              } else {
                _push3(`<!---->`);
              }
            }, "body", false, _parent2);
          } else {
            return [
              createVNode("div", { class: "w-full space-y-5" }, [
                createVNode("div", { class: "rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5 flex items-center justify-between gap-4 shadow-lg" }, [
                  createVNode("div", { class: "flex items-center gap-5" }, [
                    createVNode("div", { class: "relative flex-shrink-0" }, [
                      createVNode("div", { class: "w-16 h-16 rounded-full ring-4 ring-white/30 overflow-hidden bg-blue-400 flex items-center justify-center" }, [
                        avatarPreview.value ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: avatarPreview.value,
                          class: "w-full h-full object-cover",
                          alt: "Avatar"
                        }, null, 8, ["src"])) : (openBlock(), createBlock("span", {
                          key: 1,
                          class: "text-xl font-bold text-white"
                        }, toDisplayString(userInitials.value), 1))
                      ]),
                      createVNode("button", {
                        type: "button",
                        onClick: ($event) => {
                          var _a3;
                          return (_a3 = avatarFileInput.value) == null ? void 0 : _a3.click();
                        },
                        class: "absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-surface-100 transition-colors"
                      }, [
                        createVNode(unref(Camera), { class: "h-3.5 w-3.5 text-surface-600" })
                      ], 8, ["onClick"]),
                      createVNode("input", {
                        ref_key: "avatarFileInput",
                        ref: avatarFileInput,
                        type: "file",
                        accept: "image/*",
                        class: "hidden",
                        onChange: onAvatarChange
                      }, null, 544)
                    ]),
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-lg font-bold text-white leading-tight" }, toDisplayString(((_e2 = __props.profile) == null ? void 0 : _e2.name) || "—"), 1),
                      createVNode("p", { class: "text-blue-100 text-sm mb-2" }, toDisplayString((_f2 = __props.profile) == null ? void 0 : _f2.email), 1),
                      createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                        createVNode("span", { class: "inline-flex items-center gap-1 bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full" }, [
                          createVNode(unref(User), { class: "h-3 w-3" }),
                          createTextVNode(" " + toDisplayString(roleLabel.value), 1)
                        ]),
                        isVerified.value ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "inline-flex items-center gap-1 bg-green-400/30 text-green-100 text-xs font-medium px-2.5 py-1 rounded-full border border-green-300/30"
                        }, [
                          createVNode(unref(CheckCircle), { class: "h-3 w-3" }),
                          createTextVNode(" Email Verified ")
                        ])) : createCommentVNode("", true),
                        createVNode("span", { class: "inline-flex items-center gap-1 bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full" }, [
                          createVNode(unref(LogIn), { class: "h-3 w-3" }),
                          createTextVNode(" Email Login ")
                        ]),
                        ((_g = __props.profile) == null ? void 0 : _g.status) === "active" ? (openBlock(), createBlock("span", {
                          key: 1,
                          class: "inline-flex items-center gap-1 bg-green-400/30 text-green-100 text-xs font-medium px-2.5 py-1 rounded-full border border-green-300/30"
                        }, [
                          createVNode(unref(CheckCircle), { class: "h-3 w-3" }),
                          createTextVNode(" Active ")
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  ((_h = __props.profile) == null ? void 0 : _h.last_login_at) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "hidden md:flex items-center gap-2 text-right text-blue-100 text-sm flex-shrink-0"
                  }, [
                    createVNode(unref(Clock), { class: "h-4 w-4 text-blue-200" }),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs text-blue-200 font-medium" }, "Last Login"),
                      createVNode("p", null, toDisplayString(__props.profile.last_login_at), 1)
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "card overflow-hidden" }, [
                  createVNode("div", { class: "border-b border-surface-200 dark:border-surface-700 px-6" }, [
                    createVNode("nav", { class: "flex gap-1 -mb-px" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                        return createVNode("button", {
                          key: tab.key,
                          onClick: ($event) => activeTab.value = tab.key,
                          class: [
                            "flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors",
                            activeTab.value === tab.key ? "border-primary-600 text-primary-600 dark:text-primary-400" : "border-transparent text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                          ]
                        }, [
                          (openBlock(), createBlock(resolveDynamicComponent(tab.icon), { class: "h-4 w-4" })),
                          createTextVNode(" " + toDisplayString(tab.label), 1)
                        ], 10, ["onClick"]);
                      }), 64))
                    ])
                  ]),
                  activeTab.value === "personal" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-6"
                  }, [
                    __props.status === "success" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-3 text-sm text-green-700 dark:text-green-300"
                    }, " Profile updated successfully. ")) : createCommentVNode("", true),
                    createVNode("form", {
                      onSubmit: withModifiers(updateProfile, ["prevent"]),
                      class: "space-y-5"
                    }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "label" }, "First Name"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => firstName.value = $event,
                            required: "",
                            class: "input",
                            placeholder: "First name"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, firstName.value]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "label" }, "Last Name"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => lastName.value = $event,
                            class: "input",
                            placeholder: "Last name"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, lastName.value]
                          ])
                        ])
                      ]),
                      unref(profileForm).errors.name ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-red-600 -mt-3"
                      }, toDisplayString(unref(profileForm).errors.name), 1)) : createCommentVNode("", true),
                      createVNode("div", null, [
                        createVNode("label", { class: "label" }, "Email Address"),
                        createVNode("div", { class: "relative" }, [
                          withDirectives(createVNode("input", {
                            type: "email",
                            "onUpdate:modelValue": ($event) => unref(profileForm).email = $event,
                            required: "",
                            class: "input pr-10"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(profileForm).email]
                          ]),
                          isVerified.value ? (openBlock(), createBlock(unref(CheckCircle), {
                            key: 0,
                            class: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500"
                          })) : createCommentVNode("", true)
                        ]),
                        isVerified.value ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-green-600 font-medium"
                        }, "Email verified")) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "mt-1 text-xs text-orange-500"
                        }, "Email not verified")),
                        unref(profileForm).errors.email ? (openBlock(), createBlock("p", {
                          key: 2,
                          class: "mt-1 text-xs text-red-600"
                        }, toDisplayString(unref(profileForm).errors.email), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "label" }, [
                          createTextVNode("Phone "),
                          createVNode("span", { class: "text-surface-400 font-normal" }, "(optional)")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(profileForm).phone = $event,
                          class: "input",
                          placeholder: "+92 300 1234567"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(profileForm).phone]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "label" }, "Avatar"),
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode("div", { class: "w-10 h-10 rounded-full overflow-hidden bg-blue-100 flex-shrink-0 flex items-center justify-center" }, [
                            avatarPreview.value ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: avatarPreview.value,
                              class: "w-full h-full object-cover"
                            }, null, 8, ["src"])) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "text-sm font-bold text-blue-600"
                            }, toDisplayString(userInitials.value), 1))
                          ]),
                          createVNode("input", {
                            type: "file",
                            accept: "image/jpeg,image/png,image/gif,image/webp",
                            class: "block w-full text-sm text-surface-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-surface-200 file:text-sm file:font-medium file:bg-white dark:file:bg-surface-800 file:cursor-pointer hover:file:bg-surface-50",
                            onChange: onAvatarChange
                          }, null, 32)
                        ]),
                        createVNode("p", { class: "mt-1 text-xs text-surface-400" }, "JPG, PNG — max 2MB")
                      ]),
                      createVNode("div", { class: "flex justify-end gap-3 pt-2 border-t border-surface-100 dark:border-surface-800" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: ($event) => {
                            firstName.value = unref(nameParts)[0] || "";
                            lastName.value = unref(nameParts).slice(1).join(" ") || "";
                            unref(profileForm).reset();
                          },
                          class: "btn-secondary"
                        }, "Cancel", 8, ["onClick"]),
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(profileForm).processing,
                          class: "btn-primary"
                        }, toDisplayString(unref(profileForm).processing ? "Saving..." : "Save Changes"), 9, ["disabled"])
                      ])
                    ], 32)
                  ])) : createCommentVNode("", true),
                  activeTab.value === "security" ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "p-6 space-y-6"
                  }, [
                    createVNode("div", null, [
                      createVNode("h3", { class: "font-semibold text-surface-900 dark:text-white mb-1" }, "Change Password"),
                      createVNode("p", { class: "text-sm text-surface-500 mb-5" }, "Use a strong password with at least 8 characters, mixed case and numbers."),
                      createVNode("form", {
                        onSubmit: withModifiers(updatePassword, ["prevent"]),
                        class: "space-y-4 max-w-lg"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "label" }, "Current Password"),
                          withDirectives(createVNode("input", {
                            type: "password",
                            "onUpdate:modelValue": ($event) => unref(passwordForm).current_password = $event,
                            required: "",
                            class: "input",
                            autocomplete: "current-password"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(passwordForm).current_password]
                          ]),
                          unref(passwordForm).errors.current_password ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-xs text-red-600"
                          }, toDisplayString(unref(passwordForm).errors.current_password), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "label" }, "New Password"),
                          withDirectives(createVNode("input", {
                            type: "password",
                            "onUpdate:modelValue": ($event) => unref(passwordForm).password = $event,
                            required: "",
                            class: "input",
                            autocomplete: "new-password"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(passwordForm).password]
                          ]),
                          unref(passwordForm).errors.password ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-xs text-red-600"
                          }, toDisplayString(unref(passwordForm).errors.password), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "label" }, "Confirm New Password"),
                          withDirectives(createVNode("input", {
                            type: "password",
                            "onUpdate:modelValue": ($event) => unref(passwordForm).password_confirmation = $event,
                            required: "",
                            class: "input",
                            autocomplete: "new-password"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(passwordForm).password_confirmation]
                          ])
                        ]),
                        createVNode("div", { class: "flex justify-end gap-3 pt-2 border-t border-surface-100 dark:border-surface-800" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => unref(passwordForm).reset(),
                            class: "btn-secondary"
                          }, "Cancel", 8, ["onClick"]),
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(passwordForm).processing,
                            class: "btn-primary"
                          }, toDisplayString(unref(passwordForm).processing ? "Updating..." : "Update Password"), 9, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ])) : createCommentVNode("", true),
                  activeTab.value === "preferences" ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "p-6"
                  }, [
                    createVNode("h3", { class: "font-semibold text-surface-900 dark:text-white mb-1" }, "Preferences"),
                    createVNode("p", { class: "text-sm text-surface-500 mb-5" }, "Manage your notification and display preferences."),
                    createVNode("div", { class: "rounded-xl border border-surface-200 dark:border-surface-700 p-4 text-sm text-surface-500 text-center py-10" }, " Preferences settings coming soon. ")
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 p-5 space-y-3" }, [
                  createVNode("div", { class: "flex items-center gap-2 mb-4" }, [
                    createVNode(unref(AlertTriangle), { class: "h-5 w-5 text-red-500" }),
                    createVNode("h3", { class: "font-bold text-red-600 dark:text-red-400" }, "Danger Zone")
                  ]),
                  createVNode("div", { class: "flex items-center justify-between bg-white dark:bg-surface-900 rounded-xl border border-red-100 dark:border-red-900/30 px-4 py-3" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "text-sm font-semibold text-surface-900 dark:text-white" }, "Delete Account"),
                      createVNode("p", { class: "text-xs text-surface-500 mt-0.5" }, "Permanently delete your account and all associated data")
                    ]),
                    createVNode("button", {
                      onClick: ($event) => showDeleteModal.value = true,
                      class: "btn bg-red-600 text-white hover:bg-red-700 text-sm flex-shrink-0"
                    }, " Delete Account ", 8, ["onClick"])
                  ]),
                  createVNode("div", { class: "flex items-center justify-between bg-white dark:bg-surface-900 rounded-xl border border-red-100 dark:border-red-900/30 px-4 py-3" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "text-sm font-semibold text-surface-900 dark:text-white" }, "Clear All Data"),
                      createVNode("p", { class: "text-xs text-surface-500 mt-0.5" }, "Remove all search history and saved leads")
                    ]),
                    createVNode("button", {
                      onClick: ($event) => showClearModal.value = true,
                      class: "btn bg-red-600 text-white hover:bg-red-700 text-sm flex-shrink-0"
                    }, " Clear Data ", 8, ["onClick"])
                  ])
                ])
              ]),
              (openBlock(), createBlock(Teleport, { to: "body" }, [
                showDeleteModal.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
                  onClick: withModifiers(($event) => showDeleteModal.value = false, ["self"])
                }, [
                  createVNode("div", { class: "card p-6 w-full max-w-md shadow-2xl" }, [
                    createVNode("div", { class: "flex items-center gap-3 mb-3" }, [
                      createVNode("div", { class: "w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0" }, [
                        createVNode(unref(AlertTriangle), { class: "h-5 w-5 text-red-600" })
                      ]),
                      createVNode("h3", { class: "text-lg font-bold text-surface-900 dark:text-white" }, "Delete Account?")
                    ]),
                    createVNode("p", { class: "text-sm text-surface-500 mb-4" }, [
                      createTextVNode(" This will permanently delete your account and all associated data. This action "),
                      createVNode("strong", null, "cannot be undone"),
                      createTextVNode(". Please enter your password to confirm. ")
                    ]),
                    withDirectives(createVNode("input", {
                      type: "password",
                      "onUpdate:modelValue": ($event) => unref(deleteForm).password = $event,
                      placeholder: "Enter your password",
                      class: "input mb-1"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(deleteForm).password]
                    ]),
                    unref(deleteForm).errors.password ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "mb-3 text-xs text-red-600"
                    }, toDisplayString(unref(deleteForm).errors.password), 1)) : createCommentVNode("", true),
                    createVNode("div", { class: "flex justify-end gap-3 mt-4" }, [
                      createVNode("button", {
                        onClick: ($event) => showDeleteModal.value = false,
                        class: "btn-secondary"
                      }, "Cancel", 8, ["onClick"]),
                      createVNode("button", {
                        onClick: deleteAccount,
                        disabled: unref(deleteForm).processing,
                        class: "btn bg-red-600 text-white hover:bg-red-700"
                      }, toDisplayString(unref(deleteForm).processing ? "Deleting..." : "Delete Account"), 9, ["disabled"])
                    ])
                  ])
                ], 8, ["onClick"])) : createCommentVNode("", true)
              ])),
              (openBlock(), createBlock(Teleport, { to: "body" }, [
                showClearModal.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
                  onClick: withModifiers(($event) => showClearModal.value = false, ["self"])
                }, [
                  createVNode("div", { class: "card p-6 w-full max-w-md shadow-2xl" }, [
                    createVNode("div", { class: "flex items-center gap-3 mb-3" }, [
                      createVNode("div", { class: "w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0" }, [
                        createVNode(unref(AlertTriangle), { class: "h-5 w-5 text-orange-600" })
                      ]),
                      createVNode("h3", { class: "text-lg font-bold text-surface-900 dark:text-white" }, "Clear All Data?")
                    ]),
                    createVNode("p", { class: "text-sm text-surface-500 mb-4" }, [
                      createTextVNode(" This will permanently remove all your search history and saved leads. Your account will remain active. This action "),
                      createVNode("strong", null, "cannot be undone"),
                      createTextVNode(". ")
                    ]),
                    createVNode("div", { class: "flex justify-end gap-3" }, [
                      createVNode("button", {
                        onClick: ($event) => showClearModal.value = false,
                        class: "btn-secondary"
                      }, "Cancel", 8, ["onClick"]),
                      createVNode("button", {
                        onClick: clearData,
                        class: "btn bg-red-600 text-white hover:bg-red-700"
                      }, " Yes, Clear Data ")
                    ])
                  ])
                ], 8, ["onClick"])) : createCommentVNode("", true)
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __vite_glob_0_36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t3) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var o2 = arguments[e2];
      for (var n2 in o2) ({}).hasOwnProperty.call(o2, n2) && (t3[n2] = o2[n2]);
    }
    return t3;
  }, t.apply(null, arguments);
}
const e = String.prototype.replace, o = /%20/g, n = { RFC1738: function(t3) {
  return e.call(t3, o, "+");
}, RFC3986: function(t3) {
  return String(t3);
} };
var r = "RFC3986";
const i = Object.prototype.hasOwnProperty, s = Array.isArray, u = /* @__PURE__ */ new WeakMap();
var l = function(t3, e2) {
  return u.set(t3, e2), t3;
};
function c(t3) {
  return u.has(t3);
}
var a = function(t3) {
  return u.get(t3);
}, f = function(t3, e2) {
  u.set(t3, e2);
};
const p = function() {
  const t3 = [];
  for (let e2 = 0; e2 < 256; ++e2) t3.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t3;
}(), y = function(t3, e2) {
  const o2 = e2 && e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (let e3 = 0; e3 < t3.length; ++e3) void 0 !== t3[e3] && (o2[e3] = t3[e3]);
  return o2;
}, d = function t2(e2, o2, n2) {
  if (!o2) return e2;
  if ("object" != typeof o2) {
    if (s(e2)) e2.push(o2);
    else {
      if (!e2 || "object" != typeof e2) return [e2, o2];
      if (c(e2)) {
        var r2 = a(e2) + 1;
        e2[r2] = o2, f(e2, r2);
      } else (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, o2)) && (e2[o2] = true);
    }
    return e2;
  }
  if (!e2 || "object" != typeof e2) {
    if (c(o2)) {
      for (var u2 = Object.keys(o2), p2 = n2 && n2.plainObjects ? { __proto__: null, 0: e2 } : { 0: e2 }, d2 = 0; d2 < u2.length; d2++) p2[parseInt(u2[d2], 10) + 1] = o2[u2[d2]];
      return l(p2, a(o2) + 1);
    }
    return [e2].concat(o2);
  }
  let h2 = e2;
  return s(e2) && !s(o2) && (h2 = y(e2, n2)), s(e2) && s(o2) ? (o2.forEach(function(o3, r3) {
    if (i.call(e2, r3)) {
      const i2 = e2[r3];
      i2 && "object" == typeof i2 && o3 && "object" == typeof o3 ? e2[r3] = t2(i2, o3, n2) : e2.push(o3);
    } else e2[r3] = o3;
  }), e2) : Object.keys(o2).reduce(function(e3, r3) {
    const s2 = o2[r3];
    return e3[r3] = i.call(e3, r3) ? t2(e3[r3], s2, n2) : s2, e3;
  }, h2);
}, h = 1024, b = function(t3, e2, o2, n2) {
  if (c(t3)) {
    var r2 = a(t3) + 1;
    return t3[r2] = e2, f(t3, r2), t3;
  }
  var i2 = [].concat(t3, e2);
  return i2.length > o2 ? l(y(i2, { plainObjects: n2 }), i2.length - 1) : i2;
}, m = function(t3, e2) {
  if (s(t3)) {
    const o2 = [];
    for (let n2 = 0; n2 < t3.length; n2 += 1) o2.push(e2(t3[n2]));
    return o2;
  }
  return e2(t3);
}, g = Object.prototype.hasOwnProperty, w = { brackets: function(t3) {
  return t3 + "[]";
}, comma: "comma", indices: function(t3, e2) {
  return t3 + "[" + e2 + "]";
}, repeat: function(t3) {
  return t3;
} }, v = Array.isArray, j = Array.prototype.push, $ = function(t3, e2) {
  j.apply(t3, v(e2) ? e2 : [e2]);
}, E = Date.prototype.toISOString, O = { addQueryPrefix: false, allowDots: false, allowEmptyArrays: false, arrayFormat: "indices", charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encodeDotInKeys: false, encoder: function(t3, e2, o2, n2, r2) {
  if (0 === t3.length) return t3;
  let i2 = t3;
  if ("symbol" == typeof t3 ? i2 = Symbol.prototype.toString.call(t3) : "string" != typeof t3 && (i2 = String(t3)), "iso-8859-1" === o2) return escape(i2).replace(/%u[0-9a-f]{4}/gi, function(t4) {
    return "%26%23" + parseInt(t4.slice(2), 16) + "%3B";
  });
  let s2 = "";
  for (let t4 = 0; t4 < i2.length; t4 += h) {
    const e3 = i2.length >= h ? i2.slice(t4, t4 + h) : i2, o3 = [];
    for (let t5 = 0; t5 < e3.length; ++t5) {
      let n3 = e3.charCodeAt(t5);
      45 === n3 || 46 === n3 || 95 === n3 || 126 === n3 || n3 >= 48 && n3 <= 57 || n3 >= 65 && n3 <= 90 || n3 >= 97 && n3 <= 122 || "RFC1738" === r2 && (40 === n3 || 41 === n3) ? o3[o3.length] = e3.charAt(t5) : n3 < 128 ? o3[o3.length] = p[n3] : n3 < 2048 ? o3[o3.length] = p[192 | n3 >> 6] + p[128 | 63 & n3] : n3 < 55296 || n3 >= 57344 ? o3[o3.length] = p[224 | n3 >> 12] + p[128 | n3 >> 6 & 63] + p[128 | 63 & n3] : (t5 += 1, n3 = 65536 + ((1023 & n3) << 10 | 1023 & e3.charCodeAt(t5)), o3[o3.length] = p[240 | n3 >> 18] + p[128 | n3 >> 12 & 63] + p[128 | n3 >> 6 & 63] + p[128 | 63 & n3]);
    }
    s2 += o3.join("");
  }
  return s2;
}, encodeValuesOnly: false, format: r, formatter: n[r], indices: false, serializeDate: function(t3) {
  return E.call(t3);
}, skipNulls: false, strictNullHandling: false }, T = {}, R = function(t3, e2, o2, n2, r2, i2, s2, u2, l2, c2, a2, f2, p2, y2, d2, h2, b2, g2) {
  let w2 = t3, j2 = g2, E2 = 0, _2 = false;
  for (; void 0 !== (j2 = j2.get(T)) && !_2; ) {
    const e3 = j2.get(t3);
    if (E2 += 1, void 0 !== e3) {
      if (e3 === E2) throw new RangeError("Cyclic object value");
      _2 = true;
    }
    void 0 === j2.get(T) && (E2 = 0);
  }
  if ("function" == typeof c2 ? w2 = c2(e2, w2) : w2 instanceof Date ? w2 = p2(w2) : "comma" === o2 && v(w2) && (w2 = m(w2, function(t4) {
    return t4 instanceof Date ? p2(t4) : t4;
  })), null === w2) {
    if (i2) return l2 && !h2 ? l2(e2, O.encoder, b2, "key", y2) : e2;
    w2 = "";
  }
  if ("string" == typeof (I2 = w2) || "number" == typeof I2 || "boolean" == typeof I2 || "symbol" == typeof I2 || "bigint" == typeof I2 || function(t4) {
    return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
  }(w2)) return l2 ? [d2(h2 ? e2 : l2(e2, O.encoder, b2, "key", y2)) + "=" + d2(l2(w2, O.encoder, b2, "value", y2))] : [d2(e2) + "=" + d2(String(w2))];
  var I2;
  const S2 = [];
  if (void 0 === w2) return S2;
  let A2;
  if ("comma" === o2 && v(w2)) h2 && l2 && (w2 = m(w2, l2)), A2 = [{ value: w2.length > 0 ? w2.join(",") || null : void 0 }];
  else if (v(c2)) A2 = c2;
  else {
    const t4 = Object.keys(w2);
    A2 = a2 ? t4.sort(a2) : t4;
  }
  const D2 = u2 ? e2.replace(/\./g, "%2E") : e2, k2 = n2 && v(w2) && 1 === w2.length ? D2 + "[]" : D2;
  if (r2 && v(w2) && 0 === w2.length) return k2 + "[]";
  for (let e3 = 0; e3 < A2.length; ++e3) {
    const m2 = A2[e3], j3 = "object" == typeof m2 && void 0 !== m2.value ? m2.value : w2[m2];
    if (s2 && null === j3) continue;
    const O2 = f2 && u2 ? m2.replace(/\./g, "%2E") : m2, _3 = v(w2) ? "function" == typeof o2 ? o2(k2, O2) : k2 : k2 + (f2 ? "." + O2 : "[" + O2 + "]");
    g2.set(t3, E2);
    const I3 = /* @__PURE__ */ new WeakMap();
    I3.set(T, g2), $(S2, R(j3, _3, o2, n2, r2, i2, s2, u2, "comma" === o2 && h2 && v(w2) ? null : l2, c2, a2, f2, p2, y2, d2, h2, b2, I3));
  }
  return S2;
}, _ = Object.prototype.hasOwnProperty, I = Array.isArray, S = { allowDots: false, allowEmptyArrays: false, allowPrototypes: false, allowSparse: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decodeDotInKeys: false, decoder: function(t3, e2, o2) {
  const n2 = t3.replace(/\+/g, " ");
  if ("iso-8859-1" === o2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t4) {
    return n2;
  }
}, delimiter: "&", depth: 5, duplicates: "combine", ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, A = function(t3) {
  return t3.replace(/&#(\d+);/g, function(t4, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, D = function(t3, e2) {
  return t3 && "string" == typeof t3 && e2.comma && t3.indexOf(",") > -1 ? t3.split(",") : t3;
}, k = function(t3, e2, o2, n2) {
  if (!t3) return;
  const r2 = o2.allowDots ? t3.replace(/\.([^.[]+)/g, "[$1]") : t3, i2 = /(\[[^[\]]*])/g;
  let s2 = o2.depth > 0 && /(\[[^[\]]*])/.exec(r2);
  const u2 = s2 ? r2.slice(0, s2.index) : r2, l2 = [];
  if (u2) {
    if (!o2.plainObjects && _.call(Object.prototype, u2) && !o2.allowPrototypes) return;
    l2.push(u2);
  }
  let a2 = 0;
  for (; o2.depth > 0 && null !== (s2 = i2.exec(r2)) && a2 < o2.depth; ) {
    if (a2 += 1, !o2.plainObjects && _.call(Object.prototype, s2[1].slice(1, -1)) && !o2.allowPrototypes) return;
    l2.push(s2[1]);
  }
  return s2 && l2.push("[" + r2.slice(s2.index) + "]"), function(t4, e3, o3, n3) {
    let r3 = n3 ? e3 : D(e3, o3);
    for (let e4 = t4.length - 1; e4 >= 0; --e4) {
      let n4;
      const i3 = t4[e4];
      if ("[]" === i3 && o3.parseArrays) n4 = c(r3) ? r3 : o3.allowEmptyArrays && ("" === r3 || o3.strictNullHandling && null === r3) ? [] : b([], r3, o3.arrayLimit, o3.plainObjects);
      else {
        n4 = o3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        const t5 = "[" === i3.charAt(0) && "]" === i3.charAt(i3.length - 1) ? i3.slice(1, -1) : i3, e5 = o3.decodeDotInKeys ? t5.replace(/%2E/g, ".") : t5, s3 = parseInt(e5, 10);
        o3.parseArrays || "" !== e5 ? !isNaN(s3) && i3 !== e5 && String(s3) === e5 && s3 >= 0 && o3.parseArrays && s3 <= o3.arrayLimit ? (n4 = [], n4[s3] = r3) : "__proto__" !== e5 && (n4[e5] = r3) : n4 = { 0: r3 };
      }
      r3 = n4;
    }
    return r3;
  }(l2, e2, o2, n2);
};
function N(t3, e2) {
  const o2 = /* @__PURE__ */ function(t4) {
    return S;
  }();
  if ("" === t3 || null == t3) return o2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const n2 = "string" == typeof t3 ? function(t4, e3) {
    const o3 = { __proto__: null }, n3 = (e3.ignoreQueryPrefix ? t4.replace(/^\?/, "") : t4).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit);
    let r3, i3 = -1, s2 = e3.charset;
    if (e3.charsetSentinel) for (r3 = 0; r3 < n3.length; ++r3) 0 === n3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === n3[r3] ? s2 = "utf-8" : "utf8=%26%2310003%3B" === n3[r3] && (s2 = "iso-8859-1"), i3 = r3, r3 = n3.length);
    for (r3 = 0; r3 < n3.length; ++r3) {
      if (r3 === i3) continue;
      const t5 = n3[r3], u2 = t5.indexOf("]="), l2 = -1 === u2 ? t5.indexOf("=") : u2 + 1;
      let c2, a2;
      -1 === l2 ? (c2 = e3.decoder(t5, S.decoder, s2, "key"), a2 = e3.strictNullHandling ? null : "") : (c2 = e3.decoder(t5.slice(0, l2), S.decoder, s2, "key"), a2 = m(D(t5.slice(l2 + 1), e3), function(t6) {
        return e3.decoder(t6, S.decoder, s2, "value");
      })), a2 && e3.interpretNumericEntities && "iso-8859-1" === s2 && (a2 = A(a2)), t5.indexOf("[]=") > -1 && (a2 = I(a2) ? [a2] : a2);
      const f2 = _.call(o3, c2);
      f2 && "combine" === e3.duplicates ? o3[c2] = b(o3[c2], a2, e3.arrayLimit, e3.plainObjects) : f2 && "last" !== e3.duplicates || (o3[c2] = a2);
    }
    return o3;
  }(t3, o2) : t3;
  let r2 = o2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const i2 = Object.keys(n2);
  for (let e3 = 0; e3 < i2.length; ++e3) {
    const s2 = i2[e3], u2 = k(s2, n2[s2], o2, "string" == typeof t3);
    r2 = d(r2, u2, o2);
  }
  return true === o2.allowSparse ? r2 : function(t4) {
    const e3 = [{ obj: { o: t4 }, prop: "o" }], o3 = [];
    for (let t5 = 0; t5 < e3.length; ++t5) {
      const n3 = e3[t5], r3 = n3.obj[n3.prop], i3 = Object.keys(r3);
      for (let t6 = 0; t6 < i3.length; ++t6) {
        const n4 = i3[t6], s2 = r3[n4];
        "object" == typeof s2 && null !== s2 && -1 === o3.indexOf(s2) && (e3.push({ obj: r3, prop: n4 }), o3.push(s2));
      }
    }
    return function(t5) {
      for (; t5.length > 1; ) {
        const e4 = t5.pop(), o4 = e4.obj[e4.prop];
        if (s(o4)) {
          const t6 = [];
          for (let e5 = 0; e5 < o4.length; ++e5) void 0 !== o4[e5] && t6.push(o4[e5]);
          e4.obj[e4.prop] = t6;
        }
      }
    }(e3), t4;
  }(r2);
}
class x {
  constructor(t3, e2, o2) {
    var n2, r2;
    this.name = t3, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (r2 = e2.wheres) ? r2 : {}, this.config = o2;
  }
  get template() {
    const t3 = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t3 ? "/" : t3;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t3, e2;
    return null != (t3 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t4) => ({ name: t4.replace(/{|\??}/g, ""), required: !/\?}$/.test(t4) }))) ? t3 : [];
  }
  matchesUrl(t3) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const o2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t4, e3, o3, n3) => {
      var r3;
      const i3 = `(?<${o3}>${(null == (r3 = this.wheres[o3]) ? void 0 : r3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i3})?` : `${e3}${i3}`;
    }).replace(/^\w+:\/\//, ""), [n2, r2] = t3.replace(/^\w+:\/\//, "").split("?"), i2 = null != (e2 = new RegExp(`^${o2}/?$`).exec(n2)) ? e2 : new RegExp(`^${o2}/?$`).exec(decodeURI(n2));
    if (i2) {
      for (const t4 in i2.groups) i2.groups[t4] = "string" == typeof i2.groups[t4] ? decodeURIComponent(i2.groups[t4]) : i2.groups[t4];
      return { params: i2.groups, query: N(r2) };
    }
    return false;
  }
  compile(t3) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (e2, o2, n2) => {
      var r2, i2;
      if (!n2 && [null, void 0].includes(t3[o2])) throw new Error(`Ziggy error: '${o2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[o2] && !new RegExp(`^${n2 ? `(${this.wheres[o2]})?` : this.wheres[o2]}$`).test(null != (i2 = t3[o2]) ? i2 : "")) throw new Error(`Ziggy error: '${o2}' parameter '${t3[o2]}' does not match required format '${this.wheres[o2]}' for route '${this.name}'.`);
      return encodeURI(null != (r2 = t3[o2]) ? r2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class C extends String {
  constructor(e2, o2, n2 = true, r2) {
    if (super(), this.t = null != r2 ? r2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, !this.t && "undefined" != typeof document && document.getElementById("ziggy-routes-json") && (globalThis.Ziggy = JSON.parse(document.getElementById("ziggy-routes-json").textContent), this.t = globalThis.Ziggy), this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2]) throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new x(e2, this.t.routes[e2], this.t), this.u = this.l(o2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t3) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t3)).filter((t3) => "_query" !== t3).reduce((e3, o2) => t({}, e3, { [o2]: this.u[o2] }), {});
    return this.i.compile(this.u) + function(t3, e3) {
      let o2 = t3;
      const i2 = function(t4) {
        if (!t4) return O;
        if (void 0 !== t4.allowEmptyArrays && "boolean" != typeof t4.allowEmptyArrays) throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
        if (void 0 !== t4.encodeDotInKeys && "boolean" != typeof t4.encodeDotInKeys) throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
        if (null != t4.encoder && "function" != typeof t4.encoder) throw new TypeError("Encoder has to be a function.");
        const e4 = t4.charset || O.charset;
        if (void 0 !== t4.charset && "utf-8" !== t4.charset && "iso-8859-1" !== t4.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        let o3 = r;
        if (void 0 !== t4.format) {
          if (!g.call(n, t4.format)) throw new TypeError("Unknown format option provided.");
          o3 = t4.format;
        }
        const i3 = n[o3];
        let s3, u3 = O.filter;
        if (("function" == typeof t4.filter || v(t4.filter)) && (u3 = t4.filter), s3 = t4.arrayFormat in w ? t4.arrayFormat : "indices" in t4 ? t4.indices ? "indices" : "repeat" : O.arrayFormat, "commaRoundTrip" in t4 && "boolean" != typeof t4.commaRoundTrip) throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
        return { addQueryPrefix: "boolean" == typeof t4.addQueryPrefix ? t4.addQueryPrefix : O.addQueryPrefix, allowDots: void 0 === t4.allowDots ? true === t4.encodeDotInKeys || O.allowDots : !!t4.allowDots, allowEmptyArrays: "boolean" == typeof t4.allowEmptyArrays ? !!t4.allowEmptyArrays : O.allowEmptyArrays, arrayFormat: s3, charset: e4, charsetSentinel: "boolean" == typeof t4.charsetSentinel ? t4.charsetSentinel : O.charsetSentinel, commaRoundTrip: t4.commaRoundTrip, delimiter: void 0 === t4.delimiter ? O.delimiter : t4.delimiter, encode: "boolean" == typeof t4.encode ? t4.encode : O.encode, encodeDotInKeys: "boolean" == typeof t4.encodeDotInKeys ? t4.encodeDotInKeys : O.encodeDotInKeys, encoder: "function" == typeof t4.encoder ? t4.encoder : O.encoder, encodeValuesOnly: "boolean" == typeof t4.encodeValuesOnly ? t4.encodeValuesOnly : O.encodeValuesOnly, filter: u3, format: o3, formatter: i3, serializeDate: "function" == typeof t4.serializeDate ? t4.serializeDate : O.serializeDate, skipNulls: "boolean" == typeof t4.skipNulls ? t4.skipNulls : O.skipNulls, sort: "function" == typeof t4.sort ? t4.sort : null, strictNullHandling: "boolean" == typeof t4.strictNullHandling ? t4.strictNullHandling : O.strictNullHandling };
      }(e3);
      let s2, u2;
      "function" == typeof i2.filter ? (u2 = i2.filter, o2 = u2("", o2)) : v(i2.filter) && (u2 = i2.filter, s2 = u2);
      const l2 = [];
      if ("object" != typeof o2 || null === o2) return "";
      const c2 = w[i2.arrayFormat], a2 = "comma" === c2 && i2.commaRoundTrip;
      s2 || (s2 = Object.keys(o2)), i2.sort && s2.sort(i2.sort);
      const f2 = /* @__PURE__ */ new WeakMap();
      for (let t4 = 0; t4 < s2.length; ++t4) {
        const e4 = s2[t4];
        i2.skipNulls && null === o2[e4] || $(l2, R(o2[e4], e4, c2, a2, i2.allowEmptyArrays, i2.strictNullHandling, i2.skipNulls, i2.encodeDotInKeys, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset, f2));
      }
      const p2 = l2.join(i2.delimiter);
      let y2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (y2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), p2.length > 0 ? y2 + p2 : "";
    }(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t3, e3) => "boolean" == typeof t3 ? Number(t3) : e3(t3) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.m();
    let o2 = {};
    const [n2, r2] = Object.entries(this.t.routes).find(([t3, n3]) => o2 = new x(t3, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, o2, { route: r2 });
  }
  m() {
    const { host: t3, pathname: e2, search: o2 } = this.h();
    return (this.t.absolute ? t3 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + o2;
  }
  current(e2, o2) {
    const { name: n2, params: r2, query: i2, route: s2 } = this.p();
    if (!e2) return n2;
    const u2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(o2) || !u2) return u2;
    const l2 = new x(n2, s2, this.t);
    o2 = this.l(o2, l2);
    const c2 = t({}, r2, i2);
    if (Object.values(o2).every((t3) => !t3) && !Object.values(c2).some((t3) => void 0 !== t3)) return true;
    const a2 = (t3, e3) => Object.entries(t3).every(([t4, o3]) => Array.isArray(o3) && Array.isArray(e3[t4]) ? o3.every((o4) => e3[t4].includes(o4) || e3[t4].includes(decodeURIComponent(o4))) : "object" == typeof o3 && "object" == typeof e3[t4] && null !== o3 && null !== e3[t4] ? a2(o3, e3[t4]) : e3[t4] == o3 || e3[t4] == decodeURIComponent(o3));
    return a2(o2, c2);
  }
  h() {
    var t3, e2, o2, n2, r2, i2;
    const { host: s2 = "", pathname: u2 = "", search: l2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t3 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t3 : s2, pathname: null != (o2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? o2 : u2, search: null != (r2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? r2 : l2 };
  }
  get params() {
    const { params: e2, query: o2 } = this.p();
    return t({}, e2, o2);
  }
  get routeParams() {
    return this.p().params;
  }
  get queryParams() {
    return this.p().query;
  }
  has(t3) {
    return this.t.routes.hasOwnProperty(t3);
  }
  l(e2 = {}, o2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = o2.parameterSegments.filter(({ name: t3 }) => !this.t.defaults[t3]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, o3, r2) => t({}, e3, n2[r2] ? { [n2[r2].name]: o3 } : "object" == typeof o3 ? o3 : { [o3]: "" }), {}) : 1 !== n2.length || e2.hasOwnProperty(n2[0].name) || !e2.hasOwnProperty(Object.values(o2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.v(o2), this.j(e2, o2));
  }
  v(e2) {
    return e2.parameterSegments.filter(({ name: t3 }) => this.t.defaults[t3]).reduce((e3, { name: o2 }, n2) => t({}, e3, { [o2]: this.t.defaults[o2] }), {});
  }
  j(e2, { bindings: o2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [r2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t3 }) => t3 === r2)) return t({}, e3, { [r2]: i2 });
      const s2 = i2.hasOwnProperty(o2[r2]) ? o2[r2] : i2.hasOwnProperty("id") ? "id" : void 0;
      if (void 0 === s2) throw new Error(`Ziggy error: object passed as '${r2}' parameter is missing route model binding key '${o2[r2]}'.`);
      return t({}, e3, { [r2]: i2[s2] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function P(t3, e2, o2, n2) {
  const r2 = new C(t3, e2, o2, n2);
  return t3 ? r2.toString() : r2;
}
const appName = "Customer Near Me";
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    title: (title) => title ? `${title} — ${appName}` : appName,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Affiliate/Commissions.vue": __vite_glob_0_0, "./Pages/Affiliate/Index.vue": __vite_glob_0_1, "./Pages/Affiliate/Referrals.vue": __vite_glob_0_2, "./Pages/Affiliate/Withdrawals.vue": __vite_glob_0_3, "./Pages/Auth/ConfirmPassword.vue": __vite_glob_0_4, "./Pages/Auth/ForgotPassword.vue": __vite_glob_0_5, "./Pages/Auth/Login.vue": __vite_glob_0_6, "./Pages/Auth/Register.vue": __vite_glob_0_7, "./Pages/Auth/ResetPassword.vue": __vite_glob_0_8, "./Pages/Auth/VerifyEmail.vue": __vite_glob_0_9, "./Pages/Billing/Checkout.vue": __vite_glob_0_10, "./Pages/Billing/Index.vue": __vite_glob_0_11, "./Pages/Dashboard/Index.vue": __vite_glob_0_12, "./Pages/Errors/403.vue": __vite_glob_0_13, "./Pages/Errors/404.vue": __vite_glob_0_14, "./Pages/Errors/500.vue": __vite_glob_0_15, "./Pages/Errors/503.vue": __vite_glob_0_16, "./Pages/Leads/Exports.vue": __vite_glob_0_17, "./Pages/Leads/Index.vue": __vite_glob_0_18, "./Pages/Leads/SavedSearches.vue": __vite_glob_0_19, "./Pages/Leads/Search.vue": __vite_glob_0_20, "./Pages/Leads/SearchDetail.vue": __vite_glob_0_21, "./Pages/Leads/SearchHistory.vue": __vite_glob_0_22, "./Pages/Leads/Show.vue": __vite_glob_0_23, "./Pages/Public/Affiliate.vue": __vite_glob_0_24, "./Pages/Public/Blog.vue": __vite_glob_0_25, "./Pages/Public/BlogPost.vue": __vite_glob_0_26, "./Pages/Public/Contact.vue": __vite_glob_0_27, "./Pages/Public/Faq.vue": __vite_glob_0_28, "./Pages/Public/HowItWorks.vue": __vite_glob_0_29, "./Pages/Public/Landing.vue": __vite_glob_0_30, "./Pages/Public/Pricing.vue": __vite_glob_0_31, "./Pages/Public/Privacy.vue": __vite_glob_0_32, "./Pages/Public/Terms.vue": __vite_glob_0_33, "./Pages/Settings/Devices.vue": __vite_glob_0_34, "./Pages/Settings/Notifications.vue": __vite_glob_0_35, "./Pages/Settings/Profile.vue": __vite_glob_0_36 });
      return pages[`./Pages/${name}.vue`];
    },
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h$1(App, props) }).use(plugin).mixin({ methods: { route: P } });
    }
  })
);
