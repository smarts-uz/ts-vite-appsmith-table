function Be(R) {
  return R && R.__esModule && Object.prototype.hasOwnProperty.call(R, "default") ? R.default : R;
}
var me = { exports: {} }, ie = {};
var Le;
function Qe() {
  if (Le) return ie;
  Le = 1;
  var R = Symbol.for("react.transitional.element"), c = Symbol.for("react.fragment");
  function I(U, O, w) {
    var M = null;
    if (w !== void 0 && (M = "" + w), O.key !== void 0 && (M = "" + O.key), "key" in O) {
      w = {};
      for (var C in O)
        C !== "key" && (w[C] = O[C]);
    } else w = O;
    return O = w.ref, {
      $$typeof: R,
      type: U,
      key: M,
      ref: O !== void 0 ? O : null,
      props: w
    };
  }
  return ie.Fragment = c, ie.jsx = I, ie.jsxs = I, ie;
}
var ce = {}, Ee = { exports: {} }, l = {};
var De;
function Xe() {
  if (De) return l;
  De = 1;
  var R = Symbol.for("react.transitional.element"), c = Symbol.for("react.portal"), I = Symbol.for("react.fragment"), U = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), w = Symbol.for("react.consumer"), M = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), Z = Symbol.for("react.suspense"), oe = Symbol.for("react.memo"), Y = Symbol.for("react.lazy"), H = Symbol.for("react.activity"), z = Symbol.iterator;
  function q(t) {
    return t === null || typeof t != "object" ? null : (t = z && t[z] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var $ = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, J = Object.assign, G = {};
  function L(t, n, s) {
    this.props = t, this.context = n, this.refs = G, this.updater = s || $;
  }
  L.prototype.isReactComponent = {}, L.prototype.setState = function(t, n) {
    if (typeof t != "object" && typeof t != "function" && t != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, t, n, "setState");
  }, L.prototype.forceUpdate = function(t) {
    this.updater.enqueueForceUpdate(this, t, "forceUpdate");
  };
  function F() {
  }
  F.prototype = L.prototype;
  function ee(t, n, s) {
    this.props = t, this.context = n, this.refs = G, this.updater = s || $;
  }
  var B = ee.prototype = new F();
  B.constructor = ee, J(B, L.prototype), B.isPureReactComponent = !0;
  var P = Array.isArray;
  function te() {
  }
  var y = { H: null, A: null, T: null, S: null }, ue = Object.prototype.hasOwnProperty;
  function k(t, n, s) {
    var a = s.ref;
    return {
      $$typeof: R,
      type: t,
      key: n,
      ref: a !== void 0 ? a : null,
      props: s
    };
  }
  function Q(t, n) {
    return k(t.type, n, t.props);
  }
  function re(t) {
    return typeof t == "object" && t !== null && t.$$typeof === R;
  }
  function h(t) {
    var n = { "=": "=0", ":": "=2" };
    return "$" + t.replace(/[=:]/g, function(s) {
      return n[s];
    });
  }
  var X = /\/+/g;
  function D(t, n) {
    return typeof t == "object" && t !== null && t.key != null ? h("" + t.key) : n.toString(36);
  }
  function j(t) {
    switch (t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw t.reason;
      default:
        switch (typeof t.status == "string" ? t.then(te, te) : (t.status = "pending", t.then(
          function(n) {
            t.status === "pending" && (t.status = "fulfilled", t.value = n);
          },
          function(n) {
            t.status === "pending" && (t.status = "rejected", t.reason = n);
          }
        )), t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw t.reason;
        }
    }
    throw t;
  }
  function A(t, n, s, a, d) {
    var v = typeof t;
    (v === "undefined" || v === "boolean") && (t = null);
    var f = !1;
    if (t === null) f = !0;
    else
      switch (v) {
        case "bigint":
        case "string":
        case "number":
          f = !0;
          break;
        case "object":
          switch (t.$$typeof) {
            case R:
            case c:
              f = !0;
              break;
            case Y:
              return f = t._init, A(
                f(t._payload),
                n,
                s,
                a,
                d
              );
          }
      }
    if (f)
      return d = d(t), f = a === "" ? "." + D(t, 0) : a, P(d) ? (s = "", f != null && (s = f.replace(X, "$&/") + "/"), A(d, n, s, "", function(x) {
        return x;
      })) : d != null && (re(d) && (d = Q(
        d,
        s + (d.key == null || t && t.key === d.key ? "" : ("" + d.key).replace(
          X,
          "$&/"
        ) + "/") + f
      )), n.push(d)), 1;
    f = 0;
    var b = a === "" ? "." : a + ":";
    if (P(t))
      for (var T = 0; T < t.length; T++)
        a = t[T], v = b + D(a, T), f += A(
          a,
          n,
          s,
          v,
          d
        );
    else if (T = q(t), typeof T == "function")
      for (t = T.call(t), T = 0; !(a = t.next()).done; )
        a = a.value, v = b + D(a, T++), f += A(
          a,
          n,
          s,
          v,
          d
        );
    else if (v === "object") {
      if (typeof t.then == "function")
        return A(
          j(t),
          n,
          s,
          a,
          d
        );
      throw n = String(t), Error(
        "Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return f;
  }
  function N(t, n, s) {
    if (t == null) return t;
    var a = [], d = 0;
    return A(t, a, "", "", function(v) {
      return n.call(s, v, d++);
    }), a;
  }
  function K(t) {
    if (t._status === -1) {
      var n = t._result;
      n = n(), n.then(
        function(s) {
          (t._status === 0 || t._status === -1) && (t._status = 1, t._result = s);
        },
        function(s) {
          (t._status === 0 || t._status === -1) && (t._status = 2, t._result = s);
        }
      ), t._status === -1 && (t._status = 0, t._result = n);
    }
    if (t._status === 1) return t._result.default;
    throw t._result;
  }
  var W = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, ne = {
    map: N,
    forEach: function(t, n, s) {
      N(
        t,
        function() {
          n.apply(this, arguments);
        },
        s
      );
    },
    count: function(t) {
      var n = 0;
      return N(t, function() {
        n++;
      }), n;
    },
    toArray: function(t) {
      return N(t, function(n) {
        return n;
      }) || [];
    },
    only: function(t) {
      if (!re(t))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return t;
    }
  };
  return l.Activity = H, l.Children = ne, l.Component = L, l.Fragment = I, l.Profiler = O, l.PureComponent = ee, l.StrictMode = U, l.Suspense = Z, l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = y, l.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(t) {
      return y.H.useMemoCache(t);
    }
  }, l.cache = function(t) {
    return function() {
      return t.apply(null, arguments);
    };
  }, l.cacheSignal = function() {
    return null;
  }, l.cloneElement = function(t, n, s) {
    if (t == null)
      throw Error(
        "The argument must be a React element, but you passed " + t + "."
      );
    var a = J({}, t.props), d = t.key;
    if (n != null)
      for (v in n.key !== void 0 && (d = "" + n.key), n)
        !ue.call(n, v) || v === "key" || v === "__self" || v === "__source" || v === "ref" && n.ref === void 0 || (a[v] = n[v]);
    var v = arguments.length - 2;
    if (v === 1) a.children = s;
    else if (1 < v) {
      for (var f = Array(v), b = 0; b < v; b++)
        f[b] = arguments[b + 2];
      a.children = f;
    }
    return k(t.type, d, a);
  }, l.createContext = function(t) {
    return t = {
      $$typeof: M,
      _currentValue: t,
      _currentValue2: t,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, t.Provider = t, t.Consumer = {
      $$typeof: w,
      _context: t
    }, t;
  }, l.createElement = function(t, n, s) {
    var a, d = {}, v = null;
    if (n != null)
      for (a in n.key !== void 0 && (v = "" + n.key), n)
        ue.call(n, a) && a !== "key" && a !== "__self" && a !== "__source" && (d[a] = n[a]);
    var f = arguments.length - 2;
    if (f === 1) d.children = s;
    else if (1 < f) {
      for (var b = Array(f), T = 0; T < f; T++)
        b[T] = arguments[T + 2];
      d.children = b;
    }
    if (t && t.defaultProps)
      for (a in f = t.defaultProps, f)
        d[a] === void 0 && (d[a] = f[a]);
    return k(t, v, d);
  }, l.createRef = function() {
    return { current: null };
  }, l.forwardRef = function(t) {
    return { $$typeof: C, render: t };
  }, l.isValidElement = re, l.lazy = function(t) {
    return {
      $$typeof: Y,
      _payload: { _status: -1, _result: t },
      _init: K
    };
  }, l.memo = function(t, n) {
    return {
      $$typeof: oe,
      type: t,
      compare: n === void 0 ? null : n
    };
  }, l.startTransition = function(t) {
    var n = y.T, s = {};
    y.T = s;
    try {
      var a = t(), d = y.S;
      d !== null && d(s, a), typeof a == "object" && a !== null && typeof a.then == "function" && a.then(te, W);
    } catch (v) {
      W(v);
    } finally {
      n !== null && s.types !== null && (n.types = s.types), y.T = n;
    }
  }, l.unstable_useCacheRefresh = function() {
    return y.H.useCacheRefresh();
  }, l.use = function(t) {
    return y.H.use(t);
  }, l.useActionState = function(t, n, s) {
    return y.H.useActionState(t, n, s);
  }, l.useCallback = function(t, n) {
    return y.H.useCallback(t, n);
  }, l.useContext = function(t) {
    return y.H.useContext(t);
  }, l.useDebugValue = function() {
  }, l.useDeferredValue = function(t, n) {
    return y.H.useDeferredValue(t, n);
  }, l.useEffect = function(t, n) {
    return y.H.useEffect(t, n);
  }, l.useEffectEvent = function(t) {
    return y.H.useEffectEvent(t);
  }, l.useId = function() {
    return y.H.useId();
  }, l.useImperativeHandle = function(t, n, s) {
    return y.H.useImperativeHandle(t, n, s);
  }, l.useInsertionEffect = function(t, n) {
    return y.H.useInsertionEffect(t, n);
  }, l.useLayoutEffect = function(t, n) {
    return y.H.useLayoutEffect(t, n);
  }, l.useMemo = function(t, n) {
    return y.H.useMemo(t, n);
  }, l.useOptimistic = function(t, n) {
    return y.H.useOptimistic(t, n);
  }, l.useReducer = function(t, n, s) {
    return y.H.useReducer(t, n, s);
  }, l.useRef = function(t) {
    return y.H.useRef(t);
  }, l.useState = function(t) {
    return y.H.useState(t);
  }, l.useSyncExternalStore = function(t, n, s) {
    return y.H.useSyncExternalStore(
      t,
      n,
      s
    );
  }, l.useTransition = function() {
    return y.H.useTransition();
  }, l.version = "19.2.0", l;
}
var fe = { exports: {} };
fe.exports;
var Ie;
function Ke() {
  return Ie || (Ie = 1, (function(R, c) {
    process.env.NODE_ENV !== "production" && (function() {
      function I(e, r) {
        Object.defineProperty(w.prototype, e, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              r[0],
              r[1]
            );
          }
        });
      }
      function U(e) {
        return e === null || typeof e != "object" ? null : (e = Re && e[Re] || e["@@iterator"], typeof e == "function" ? e : null);
      }
      function O(e, r) {
        e = (e = e.constructor) && (e.displayName || e.name) || "ReactClass";
        var o = e + "." + r;
        Te[o] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          r,
          e
        ), Te[o] = !0);
      }
      function w(e, r, o) {
        this.props = e, this.context = r, this.refs = ve, this.updater = o || we;
      }
      function M() {
      }
      function C(e, r, o) {
        this.props = e, this.context = r, this.refs = ve, this.updater = o || we;
      }
      function Z() {
      }
      function oe(e) {
        return "" + e;
      }
      function Y(e) {
        try {
          oe(e);
          var r = !1;
        } catch {
          r = !0;
        }
        if (r) {
          r = console;
          var o = r.error, u = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return o.call(
            r,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            u
          ), oe(e);
        }
      }
      function H(e) {
        if (e == null) return null;
        if (typeof e == "function")
          return e.$$typeof === xe ? null : e.displayName || e.name || null;
        if (typeof e == "string") return e;
        switch (e) {
          case t:
            return "Fragment";
          case s:
            return "Profiler";
          case n:
            return "StrictMode";
          case f:
            return "Suspense";
          case b:
            return "SuspenseList";
          case ge:
            return "Activity";
        }
        if (typeof e == "object")
          switch (typeof e.tag == "number" && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), e.$$typeof) {
            case ne:
              return "Portal";
            case d:
              return e.displayName || "Context";
            case a:
              return (e._context.displayName || "Context") + ".Consumer";
            case v:
              var r = e.render;
              return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
            case T:
              return r = e.displayName || null, r !== null ? r : H(e.type) || "Memo";
            case x:
              r = e._payload, e = e._init;
              try {
                return H(e(r));
              } catch {
              }
          }
        return null;
      }
      function z(e) {
        if (e === t) return "<>";
        if (typeof e == "object" && e !== null && e.$$typeof === x)
          return "<...>";
        try {
          var r = H(e);
          return r ? "<" + r + ">" : "<...>";
        } catch {
          return "<...>";
        }
      }
      function q() {
        var e = _.A;
        return e === null ? null : e.getOwner();
      }
      function $() {
        return Error("react-stack-top-frame");
      }
      function J(e) {
        if (le.call(e, "key")) {
          var r = Object.getOwnPropertyDescriptor(e, "key").get;
          if (r && r.isReactWarning) return !1;
        }
        return e.key !== void 0;
      }
      function G(e, r) {
        function o() {
          Ae || (Ae = !0, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            r
          ));
        }
        o.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: o,
          configurable: !0
        });
      }
      function L() {
        var e = H(this.type);
        return Ce[e] || (Ce[e] = !0, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        )), e = this.props.ref, e !== void 0 ? e : null;
      }
      function F(e, r, o, u, i, m) {
        var p = o.ref;
        return e = {
          $$typeof: W,
          type: e,
          key: r,
          props: o,
          _owner: u
        }, (p !== void 0 ? p : null) !== null ? Object.defineProperty(e, "ref", {
          enumerable: !1,
          get: L
        }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: 0
        }), Object.defineProperty(e, "_debugInfo", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: null
        }), Object.defineProperty(e, "_debugStack", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: i
        }), Object.defineProperty(e, "_debugTask", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: m
        }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
      }
      function ee(e, r) {
        return r = F(
          e.type,
          r,
          e.props,
          e._owner,
          e._debugStack,
          e._debugTask
        ), e._store && (r._store.validated = e._store.validated), r;
      }
      function B(e) {
        P(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e !== null && e.$$typeof === x && (e._payload.status === "fulfilled" ? P(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
      }
      function P(e) {
        return typeof e == "object" && e !== null && e.$$typeof === W;
      }
      function te(e) {
        var r = { "=": "=0", ":": "=2" };
        return "$" + e.replace(/[=:]/g, function(o) {
          return r[o];
        });
      }
      function y(e, r) {
        return typeof e == "object" && e !== null && e.key != null ? (Y(e.key), te("" + e.key)) : r.toString(36);
      }
      function ue(e) {
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw e.reason;
          default:
            switch (typeof e.status == "string" ? e.then(Z, Z) : (e.status = "pending", e.then(
              function(r) {
                e.status === "pending" && (e.status = "fulfilled", e.value = r);
              },
              function(r) {
                e.status === "pending" && (e.status = "rejected", e.reason = r);
              }
            )), e.status) {
              case "fulfilled":
                return e.value;
              case "rejected":
                throw e.reason;
            }
        }
        throw e;
      }
      function k(e, r, o, u, i) {
        var m = typeof e;
        (m === "undefined" || m === "boolean") && (e = null);
        var p = !1;
        if (e === null) p = !0;
        else
          switch (m) {
            case "bigint":
            case "string":
            case "number":
              p = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case W:
                case ne:
                  p = !0;
                  break;
                case x:
                  return p = e._init, k(
                    p(e._payload),
                    r,
                    o,
                    u,
                    i
                  );
              }
          }
        if (p) {
          p = e, i = i(p);
          var g = u === "" ? "." + y(p, 0) : u;
          return Oe(i) ? (o = "", g != null && (o = g.replace(je, "$&/") + "/"), k(i, r, o, "", function(V) {
            return V;
          })) : i != null && (P(i) && (i.key != null && (p && p.key === i.key || Y(i.key)), o = ee(
            i,
            o + (i.key == null || p && p.key === i.key ? "" : ("" + i.key).replace(
              je,
              "$&/"
            ) + "/") + g
          ), u !== "" && p != null && P(p) && p.key == null && p._store && !p._store.validated && (o._store.validated = 2), i = o), r.push(i)), 1;
        }
        if (p = 0, g = u === "" ? "." : u + ":", Oe(e))
          for (var E = 0; E < e.length; E++)
            u = e[E], m = g + y(u, E), p += k(
              u,
              r,
              o,
              m,
              i
            );
        else if (E = U(e), typeof E == "function")
          for (E === e.entries && (Pe || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), Pe = !0), e = E.call(e), E = 0; !(u = e.next()).done; )
            u = u.value, m = g + y(u, E++), p += k(
              u,
              r,
              o,
              m,
              i
            );
        else if (m === "object") {
          if (typeof e.then == "function")
            return k(
              ue(e),
              r,
              o,
              u,
              i
            );
          throw r = String(e), Error(
            "Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return p;
      }
      function Q(e, r, o) {
        if (e == null) return e;
        var u = [], i = 0;
        return k(e, u, "", "", function(m) {
          return r.call(o, m, i++);
        }), u;
      }
      function re(e) {
        if (e._status === -1) {
          var r = e._ioInfo;
          r != null && (r.start = r.end = performance.now()), r = e._result;
          var o = r();
          if (o.then(
            function(i) {
              if (e._status === 0 || e._status === -1) {
                e._status = 1, e._result = i;
                var m = e._ioInfo;
                m != null && (m.end = performance.now()), o.status === void 0 && (o.status = "fulfilled", o.value = i);
              }
            },
            function(i) {
              if (e._status === 0 || e._status === -1) {
                e._status = 2, e._result = i;
                var m = e._ioInfo;
                m != null && (m.end = performance.now()), o.status === void 0 && (o.status = "rejected", o.reason = i);
              }
            }
          ), r = e._ioInfo, r != null) {
            r.value = o;
            var u = o.displayName;
            typeof u == "string" && (r.name = u);
          }
          e._status === -1 && (e._status = 0, e._result = o);
        }
        if (e._status === 1)
          return r = e._result, r === void 0 && console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,
            r
          ), "default" in r || console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,
            r
          ), r.default;
        throw e._result;
      }
      function h() {
        var e = _.H;
        return e === null && console.error(
          `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
        ), e;
      }
      function X() {
        _.asyncTransitions--;
      }
      function D(e) {
        if (pe === null)
          try {
            var r = ("require" + Math.random()).slice(0, 7);
            pe = (R && R[r]).call(
              R,
              "timers"
            ).setImmediate;
          } catch {
            pe = function(u) {
              Me === !1 && (Me = !0, typeof MessageChannel > "u" && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var i = new MessageChannel();
              i.port1.onmessage = u, i.port2.postMessage(void 0);
            };
          }
        return pe(e);
      }
      function j(e) {
        return 1 < e.length && typeof AggregateError == "function" ? new AggregateError(e) : e[0];
      }
      function A(e, r) {
        r !== de - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        ), de = r;
      }
      function N(e, r, o) {
        var u = _.actQueue;
        if (u !== null)
          if (u.length !== 0)
            try {
              K(u), D(function() {
                return N(e, r, o);
              });
              return;
            } catch (i) {
              _.thrownErrors.push(i);
            }
          else _.actQueue = null;
        0 < _.thrownErrors.length ? (u = j(_.thrownErrors), _.thrownErrors.length = 0, o(u)) : r(e);
      }
      function K(e) {
        if (!ye) {
          ye = !0;
          var r = 0;
          try {
            for (; r < e.length; r++) {
              var o = e[r];
              do {
                _.didUsePromise = !1;
                var u = o(!1);
                if (u !== null) {
                  if (_.didUsePromise) {
                    e[r] = o, e.splice(0, r);
                    return;
                  }
                  o = u;
                } else break;
              } while (!0);
            }
            e.length = 0;
          } catch (i) {
            e.splice(0, r + 1), _.thrownErrors.push(i);
          } finally {
            ye = !1;
          }
        }
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var W = Symbol.for("react.transitional.element"), ne = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), a = Symbol.for("react.consumer"), d = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), T = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), ge = Symbol.for("react.activity"), Re = Symbol.iterator, Te = {}, we = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function(e) {
          O(e, "forceUpdate");
        },
        enqueueReplaceState: function(e) {
          O(e, "replaceState");
        },
        enqueueSetState: function(e) {
          O(e, "setState");
        }
      }, be = Object.assign, ve = {};
      Object.freeze(ve), w.prototype.isReactComponent = {}, w.prototype.setState = function(e, r) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, e, r, "setState");
      }, w.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      };
      var S = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      };
      for (ae in S)
        S.hasOwnProperty(ae) && I(ae, S[ae]);
      M.prototype = w.prototype, S = C.prototype = new M(), S.constructor = C, be(S, w.prototype), S.isPureReactComponent = !0;
      var Oe = Array.isArray, xe = Symbol.for("react.client.reference"), _ = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        asyncTransitions: 0,
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1,
        didUsePromise: !1,
        thrownErrors: [],
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
      }, le = Object.prototype.hasOwnProperty, ke = console.createTask ? console.createTask : function() {
        return null;
      };
      S = {
        react_stack_bottom_frame: function(e) {
          return e();
        }
      };
      var Ae, Se, Ce = {}, ze = S.react_stack_bottom_frame.bind(
        S,
        $
      )(), $e = ke(z($)), Pe = !1, je = /\/+/g, Ne = typeof reportError == "function" ? reportError : function(e) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var r = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
            error: e
          });
          if (!window.dispatchEvent(r)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", e);
          return;
        }
        console.error(e);
      }, Me = !1, pe = null, de = 0, _e = !1, ye = !1, Ye = typeof queueMicrotask == "function" ? function(e) {
        queueMicrotask(function() {
          return queueMicrotask(e);
        });
      } : D;
      S = Object.freeze({
        __proto__: null,
        c: function(e) {
          return h().useMemoCache(e);
        }
      });
      var ae = {
        map: Q,
        forEach: function(e, r, o) {
          Q(
            e,
            function() {
              r.apply(this, arguments);
            },
            o
          );
        },
        count: function(e) {
          var r = 0;
          return Q(e, function() {
            r++;
          }), r;
        },
        toArray: function(e) {
          return Q(e, function(r) {
            return r;
          }) || [];
        },
        only: function(e) {
          if (!P(e))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return e;
        }
      };
      c.Activity = ge, c.Children = ae, c.Component = w, c.Fragment = t, c.Profiler = s, c.PureComponent = C, c.StrictMode = n, c.Suspense = f, c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = _, c.__COMPILER_RUNTIME = S, c.act = function(e) {
        var r = _.actQueue, o = de;
        de++;
        var u = _.actQueue = r !== null ? r : [], i = !1;
        try {
          var m = e();
        } catch (E) {
          _.thrownErrors.push(E);
        }
        if (0 < _.thrownErrors.length)
          throw A(r, o), e = j(_.thrownErrors), _.thrownErrors.length = 0, e;
        if (m !== null && typeof m == "object" && typeof m.then == "function") {
          var p = m;
          return Ye(function() {
            i || _e || (_e = !0, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          }), {
            then: function(E, V) {
              i = !0, p.then(
                function(se) {
                  if (A(r, o), o === 0) {
                    try {
                      K(u), D(function() {
                        return N(
                          se,
                          E,
                          V
                        );
                      });
                    } catch (Fe) {
                      _.thrownErrors.push(Fe);
                    }
                    if (0 < _.thrownErrors.length) {
                      var Ge = j(
                        _.thrownErrors
                      );
                      _.thrownErrors.length = 0, V(Ge);
                    }
                  } else E(se);
                },
                function(se) {
                  A(r, o), 0 < _.thrownErrors.length && (se = j(
                    _.thrownErrors
                  ), _.thrownErrors.length = 0), V(se);
                }
              );
            }
          };
        }
        var g = m;
        if (A(r, o), o === 0 && (K(u), u.length !== 0 && Ye(function() {
          i || _e || (_e = !0, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), _.actQueue = null), 0 < _.thrownErrors.length)
          throw e = j(_.thrownErrors), _.thrownErrors.length = 0, e;
        return {
          then: function(E, V) {
            i = !0, o === 0 ? (_.actQueue = u, D(function() {
              return N(
                g,
                E,
                V
              );
            })) : E(g);
          }
        };
      }, c.cache = function(e) {
        return function() {
          return e.apply(null, arguments);
        };
      }, c.cacheSignal = function() {
        return null;
      }, c.captureOwnerStack = function() {
        var e = _.getCurrentStack;
        return e === null ? null : e();
      }, c.cloneElement = function(e, r, o) {
        if (e == null)
          throw Error(
            "The argument must be a React element, but you passed " + e + "."
          );
        var u = be({}, e.props), i = e.key, m = e._owner;
        if (r != null) {
          var p;
          e: {
            if (le.call(r, "ref") && (p = Object.getOwnPropertyDescriptor(
              r,
              "ref"
            ).get) && p.isReactWarning) {
              p = !1;
              break e;
            }
            p = r.ref !== void 0;
          }
          p && (m = q()), J(r) && (Y(r.key), i = "" + r.key);
          for (g in r)
            !le.call(r, g) || g === "key" || g === "__self" || g === "__source" || g === "ref" && r.ref === void 0 || (u[g] = r[g]);
        }
        var g = arguments.length - 2;
        if (g === 1) u.children = o;
        else if (1 < g) {
          p = Array(g);
          for (var E = 0; E < g; E++)
            p[E] = arguments[E + 2];
          u.children = p;
        }
        for (u = F(
          e.type,
          i,
          u,
          m,
          e._debugStack,
          e._debugTask
        ), i = 2; i < arguments.length; i++)
          B(arguments[i]);
        return u;
      }, c.createContext = function(e) {
        return e = {
          $$typeof: d,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        }, e.Provider = e, e.Consumer = {
          $$typeof: a,
          _context: e
        }, e._currentRenderer = null, e._currentRenderer2 = null, e;
      }, c.createElement = function(e, r, o) {
        for (var u = 2; u < arguments.length; u++)
          B(arguments[u]);
        u = {};
        var i = null;
        if (r != null)
          for (E in Se || !("__self" in r) || "key" in r || (Se = !0, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), J(r) && (Y(r.key), i = "" + r.key), r)
            le.call(r, E) && E !== "key" && E !== "__self" && E !== "__source" && (u[E] = r[E]);
        var m = arguments.length - 2;
        if (m === 1) u.children = o;
        else if (1 < m) {
          for (var p = Array(m), g = 0; g < m; g++)
            p[g] = arguments[g + 2];
          Object.freeze && Object.freeze(p), u.children = p;
        }
        if (e && e.defaultProps)
          for (E in m = e.defaultProps, m)
            u[E] === void 0 && (u[E] = m[E]);
        i && G(
          u,
          typeof e == "function" ? e.displayName || e.name || "Unknown" : e
        );
        var E = 1e4 > _.recentlyCreatedOwnerStacks++;
        return F(
          e,
          i,
          u,
          q(),
          E ? Error("react-stack-top-frame") : ze,
          E ? ke(z(e)) : $e
        );
      }, c.createRef = function() {
        var e = { current: null };
        return Object.seal(e), e;
      }, c.forwardRef = function(e) {
        e != null && e.$$typeof === T ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : typeof e != "function" ? console.error(
          "forwardRef requires a render function but was given %s.",
          e === null ? "null" : typeof e
        ) : e.length !== 0 && e.length !== 2 && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        ), e != null && e.defaultProps != null && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var r = { $$typeof: v, render: e }, o;
        return Object.defineProperty(r, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return o;
          },
          set: function(u) {
            o = u, e.name || e.displayName || (Object.defineProperty(e, "name", { value: u }), e.displayName = u);
          }
        }), r;
      }, c.isValidElement = P, c.lazy = function(e) {
        e = { _status: -1, _result: e };
        var r = {
          $$typeof: x,
          _payload: e,
          _init: re
        }, o = {
          name: "lazy",
          start: -1,
          end: -1,
          value: null,
          owner: null,
          debugStack: Error("react-stack-top-frame"),
          debugTask: console.createTask ? console.createTask("lazy()") : null
        };
        return e._ioInfo = o, r._debugInfo = [{ awaited: o }], r;
      }, c.memo = function(e, r) {
        e == null && console.error(
          "memo: The first argument must be a component. Instead received: %s",
          e === null ? "null" : typeof e
        ), r = {
          $$typeof: T,
          type: e,
          compare: r === void 0 ? null : r
        };
        var o;
        return Object.defineProperty(r, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return o;
          },
          set: function(u) {
            o = u, e.name || e.displayName || (Object.defineProperty(e, "name", { value: u }), e.displayName = u);
          }
        }), r;
      }, c.startTransition = function(e) {
        var r = _.T, o = {};
        o._updatedFibers = /* @__PURE__ */ new Set(), _.T = o;
        try {
          var u = e(), i = _.S;
          i !== null && i(o, u), typeof u == "object" && u !== null && typeof u.then == "function" && (_.asyncTransitions++, u.then(X, X), u.then(Z, Ne));
        } catch (m) {
          Ne(m);
        } finally {
          r === null && o._updatedFibers && (e = o._updatedFibers.size, o._updatedFibers.clear(), 10 < e && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), r !== null && o.types !== null && (r.types !== null && r.types !== o.types && console.error(
            "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
          ), r.types = o.types), _.T = r;
        }
      }, c.unstable_useCacheRefresh = function() {
        return h().useCacheRefresh();
      }, c.use = function(e) {
        return h().use(e);
      }, c.useActionState = function(e, r, o) {
        return h().useActionState(
          e,
          r,
          o
        );
      }, c.useCallback = function(e, r) {
        return h().useCallback(e, r);
      }, c.useContext = function(e) {
        var r = h();
        return e.$$typeof === a && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        ), r.useContext(e);
      }, c.useDebugValue = function(e, r) {
        return h().useDebugValue(e, r);
      }, c.useDeferredValue = function(e, r) {
        return h().useDeferredValue(e, r);
      }, c.useEffect = function(e, r) {
        return e == null && console.warn(
          "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        ), h().useEffect(e, r);
      }, c.useEffectEvent = function(e) {
        return h().useEffectEvent(e);
      }, c.useId = function() {
        return h().useId();
      }, c.useImperativeHandle = function(e, r, o) {
        return h().useImperativeHandle(e, r, o);
      }, c.useInsertionEffect = function(e, r) {
        return e == null && console.warn(
          "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        ), h().useInsertionEffect(e, r);
      }, c.useLayoutEffect = function(e, r) {
        return e == null && console.warn(
          "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        ), h().useLayoutEffect(e, r);
      }, c.useMemo = function(e, r) {
        return h().useMemo(e, r);
      }, c.useOptimistic = function(e, r) {
        return h().useOptimistic(e, r);
      }, c.useReducer = function(e, r, o) {
        return h().useReducer(e, r, o);
      }, c.useRef = function(e) {
        return h().useRef(e);
      }, c.useState = function(e) {
        return h().useState(e);
      }, c.useSyncExternalStore = function(e, r, o) {
        return h().useSyncExternalStore(
          e,
          r,
          o
        );
      }, c.useTransition = function() {
        return h().useTransition();
      }, c.version = "19.2.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  })(fe, fe.exports)), fe.exports;
}
var Ue;
function We() {
  return Ue || (Ue = 1, process.env.NODE_ENV === "production" ? Ee.exports = Xe() : Ee.exports = Ke()), Ee.exports;
}
var He;
function Ve() {
  return He || (He = 1, process.env.NODE_ENV !== "production" && (function() {
    function R(t) {
      if (t == null) return null;
      if (typeof t == "function")
        return t.$$typeof === re ? null : t.displayName || t.name || null;
      if (typeof t == "string") return t;
      switch (t) {
        case G:
          return "Fragment";
        case F:
          return "Profiler";
        case L:
          return "StrictMode";
        case te:
          return "Suspense";
        case y:
          return "SuspenseList";
        case Q:
          return "Activity";
      }
      if (typeof t == "object")
        switch (typeof t.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), t.$$typeof) {
          case J:
            return "Portal";
          case B:
            return t.displayName || "Context";
          case ee:
            return (t._context.displayName || "Context") + ".Consumer";
          case P:
            var n = t.render;
            return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
          case ue:
            return n = t.displayName || null, n !== null ? n : R(t.type) || "Memo";
          case k:
            n = t._payload, t = t._init;
            try {
              return R(t(n));
            } catch {
            }
        }
      return null;
    }
    function c(t) {
      return "" + t;
    }
    function I(t) {
      try {
        c(t);
        var n = !1;
      } catch {
        n = !0;
      }
      if (n) {
        n = console;
        var s = n.error, a = typeof Symbol == "function" && Symbol.toStringTag && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return s.call(
          n,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          a
        ), c(t);
      }
    }
    function U(t) {
      if (t === G) return "<>";
      if (typeof t == "object" && t !== null && t.$$typeof === k)
        return "<...>";
      try {
        var n = R(t);
        return n ? "<" + n + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function O() {
      var t = h.A;
      return t === null ? null : t.getOwner();
    }
    function w() {
      return Error("react-stack-top-frame");
    }
    function M(t) {
      if (X.call(t, "key")) {
        var n = Object.getOwnPropertyDescriptor(t, "key").get;
        if (n && n.isReactWarning) return !1;
      }
      return t.key !== void 0;
    }
    function C(t, n) {
      function s() {
        A || (A = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          n
        ));
      }
      s.isReactWarning = !0, Object.defineProperty(t, "key", {
        get: s,
        configurable: !0
      });
    }
    function Z() {
      var t = R(this.type);
      return N[t] || (N[t] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), t = this.props.ref, t !== void 0 ? t : null;
    }
    function oe(t, n, s, a, d, v) {
      var f = s.ref;
      return t = {
        $$typeof: $,
        type: t,
        key: n,
        props: s,
        _owner: a
      }, (f !== void 0 ? f : null) !== null ? Object.defineProperty(t, "ref", {
        enumerable: !1,
        get: Z
      }) : Object.defineProperty(t, "ref", { enumerable: !1, value: null }), t._store = {}, Object.defineProperty(t._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(t, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(t, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: d
      }), Object.defineProperty(t, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: v
      }), Object.freeze && (Object.freeze(t.props), Object.freeze(t)), t;
    }
    function Y(t, n, s, a, d, v) {
      var f = n.children;
      if (f !== void 0)
        if (a)
          if (D(f)) {
            for (a = 0; a < f.length; a++)
              H(f[a]);
            Object.freeze && Object.freeze(f);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else H(f);
      if (X.call(n, "key")) {
        f = R(t);
        var b = Object.keys(n).filter(function(x) {
          return x !== "key";
        });
        a = 0 < b.length ? "{key: someKey, " + b.join(": ..., ") + ": ...}" : "{key: someKey}", ne[f + a] || (b = 0 < b.length ? "{" + b.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          a,
          f,
          b,
          f
        ), ne[f + a] = !0);
      }
      if (f = null, s !== void 0 && (I(s), f = "" + s), M(n) && (I(n.key), f = "" + n.key), "key" in n) {
        s = {};
        for (var T in n)
          T !== "key" && (s[T] = n[T]);
      } else s = n;
      return f && C(
        s,
        typeof t == "function" ? t.displayName || t.name || "Unknown" : t
      ), oe(
        t,
        f,
        s,
        O(),
        d,
        v
      );
    }
    function H(t) {
      z(t) ? t._store && (t._store.validated = 1) : typeof t == "object" && t !== null && t.$$typeof === k && (t._payload.status === "fulfilled" ? z(t._payload.value) && t._payload.value._store && (t._payload.value._store.validated = 1) : t._store && (t._store.validated = 1));
    }
    function z(t) {
      return typeof t == "object" && t !== null && t.$$typeof === $;
    }
    var q = We(), $ = Symbol.for("react.transitional.element"), J = Symbol.for("react.portal"), G = Symbol.for("react.fragment"), L = Symbol.for("react.strict_mode"), F = Symbol.for("react.profiler"), ee = Symbol.for("react.consumer"), B = Symbol.for("react.context"), P = Symbol.for("react.forward_ref"), te = Symbol.for("react.suspense"), y = Symbol.for("react.suspense_list"), ue = Symbol.for("react.memo"), k = Symbol.for("react.lazy"), Q = Symbol.for("react.activity"), re = Symbol.for("react.client.reference"), h = q.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, X = Object.prototype.hasOwnProperty, D = Array.isArray, j = console.createTask ? console.createTask : function() {
      return null;
    };
    q = {
      react_stack_bottom_frame: function(t) {
        return t();
      }
    };
    var A, N = {}, K = q.react_stack_bottom_frame.bind(
      q,
      w
    )(), W = j(U(w)), ne = {};
    ce.Fragment = G, ce.jsx = function(t, n, s) {
      var a = 1e4 > h.recentlyCreatedOwnerStacks++;
      return Y(
        t,
        n,
        s,
        !1,
        a ? Error("react-stack-top-frame") : K,
        a ? j(U(t)) : W
      );
    }, ce.jsxs = function(t, n, s) {
      var a = 1e4 > h.recentlyCreatedOwnerStacks++;
      return Y(
        t,
        n,
        s,
        !0,
        a ? Error("react-stack-top-frame") : K,
        a ? j(U(t)) : W
      );
    };
  })()), ce;
}
var qe;
function Ze() {
  return qe || (qe = 1, process.env.NODE_ENV === "production" ? me.exports = Qe() : me.exports = Ve()), me.exports;
}
var he = Ze(), Je = We();
const et = /* @__PURE__ */ Be(Je);
function tt({ updateModel: R = () => null }) {
  return et.useEffect(() => {
    R({ data: [{ id: "hello", data: "smurfs" }] });
  }, []), console.log("hello from CDN"), /* @__PURE__ */ he.jsx(he.Fragment, { children: /* @__PURE__ */ he.jsx("div", { className: "font-bold  bg-red-400", children: "Blah" }) });
}
export {
  tt as default
};
