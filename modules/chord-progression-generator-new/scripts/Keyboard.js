! function(e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Keyboard = t() : e.Keyboard = t()
}(this, function() {
  return function(e) {
    function t(r) {
      if (n[r]) return n[r].exports;
      var i = n[r] = {
        exports: {},
        id: r,
        loaded: !1
      };
      return e[r].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
  }([function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var a = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
        }
      }(),
      u = n(5),
      c = r(u),
      h = n(1),
      l = r(h),
      p = n(2),
      f = n(3),
      d = function(e) {
        function t(e) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 36,
            r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 4;
          i(this, t);
          var s = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return s._lowest = n, s._octaves = r, s._audioKeys = new c.default({
            polyphony: 88,
            rows: 1,
            octaveControls: !1
          }), s._audioKeys.down(function(e) {
            s.keyDown(e.note), s.emit("keyDown", e.note)
          }), s._audioKeys.up(function(e) {
            s.keyUp(e.note), s.emit("keyUp", e.note)
          }), s._keyboardInterface = new p.KeyboardElement(e, 48, 2), s._keyboardInterface.on("keyDown", function(e) {
            s.keyDown(e), s.emit("keyDown", e)
          }), s._keyboardInterface.on("keyUp", function(e) {
            s.keyUp(e), s.emit("keyUp", e)
          }), window.addEventListener("resize", s._resize.bind(s)), s._resize(), s._midi = new f.Midi, s._midi.on("keyDown", function(e) {
            s.keyDown(e), s.emit("keyDown", e)
          }), s._midi.on("keyUp", function(e) {
            s.keyUp(e), s.emit("keyUp", e)
          }), s
        }
        return s(t, e), a(t, [{
          key: "keyDown",
          value: function(e) {
            this._keyboardInterface.keyDown(e)
          }
        }, {
          key: "keyUp",
          value: function(e) {
            this._keyboardInterface.keyUp(e)
          }
        }, {
          key: "_resize",
          value: function() {
            this._keyboardInterface.resize(this._lowest, this._octaves)
          }
        }, {
          key: "octaves",
          get: function() {
            return this._octaves
          },
          set: function(e) {
            this._octaves = e, this._resize()
          }
        }, {
          key: "rootNote",
          get: function() {
            return this._rootNote
          },
          set: function(e) {
            this._lowest = e, this._resize()
          }
        }]), t
      }(l.default.EventEmitter);
    e.exports = d
  }, function(e, t) {
    function n() {
      this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
    }

    function r(e) {
      return "function" == typeof e
    }

    function i(e) {
      return "number" == typeof e
    }

    function o(e) {
      return "object" == typeof e && null !== e
    }

    function s(e) {
      return void 0 === e
    }
    e.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function(e) {
      if (!i(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
      return this._maxListeners = e, this
    }, n.prototype.emit = function(e) {
      var t, n, i, a, u, c;
      if (this._events || (this._events = {}), "error" === e && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
        if (t = arguments[1], t instanceof Error) throw t;
        var h = new Error('Uncaught, unspecified "error" event. (' + t + ")");
        throw h.context = t, h
      }
      if (n = this._events[e], s(n)) return !1;
      if (r(n)) switch (arguments.length) {
        case 1:
          n.call(this);
          break;
        case 2:
          n.call(this, arguments[1]);
          break;
        case 3:
          n.call(this, arguments[1], arguments[2]);
          break;
        default:
          a = Array.prototype.slice.call(arguments, 1), n.apply(this, a)
      } else if (o(n))
        for (a = Array.prototype.slice.call(arguments, 1), c = n.slice(), i = c.length, u = 0; u < i; u++) c[u].apply(this, a);
      return !0
    }, n.prototype.addListener = function(e, t) {
      var i;
      if (!r(t)) throw TypeError("listener must be a function");
      return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, r(t.listener) ? t.listener : t), this._events[e] ? o(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, o(this._events[e]) && !this._events[e].warned && (i = s(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners, i && i > 0 && this._events[e].length > i && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())), this
    }, n.prototype.on = n.prototype.addListener, n.prototype.once = function(e, t) {
      function n() {
        this.removeListener(e, n), i || (i = !0, t.apply(this, arguments))
      }
      if (!r(t)) throw TypeError("listener must be a function");
      var i = !1;
      return n.listener = t, this.on(e, n), this
    }, n.prototype.removeListener = function(e, t) {
      var n, i, s, a;
      if (!r(t)) throw TypeError("listener must be a function");
      if (!this._events || !this._events[e]) return this;
      if (n = this._events[e], s = n.length, i = -1, n === t || r(n.listener) && n.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
      else if (o(n)) {
        for (a = s; a-- > 0;)
          if (n[a] === t || n[a].listener && n[a].listener === t) {
            i = a;
            break
          }
        if (i < 0) return this;
        1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(i, 1), this._events.removeListener && this.emit("removeListener", e, t)
      }
      return this
    }, n.prototype.removeAllListeners = function(e) {
      var t, n;
      if (!this._events) return this;
      if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
      if (0 === arguments.length) {
        for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
        return this.removeAllListeners("removeListener"), this._events = {}, this
      }
      if (n = this._events[e], r(n)) this.removeListener(e, n);
      else if (n)
        for (; n.length;) this.removeListener(e, n[n.length - 1]);
      return delete this._events[e], this
    }, n.prototype.listeners = function(e) {
      var t;
      return t = this._events && this._events[e] ? r(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
    }, n.prototype.listenerCount = function(e) {
      if (this._events) {
        var t = this._events[e];
        if (r(t)) return 1;
        if (t) return t.length
      }
      return 0
    }, n.listenerCount = function(e, t) {
      return e.listenerCount(t)
    }
  }, function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.KeyboardElement = void 0;
    var a = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
        }
      }(),
      u = n(1),
      c = r(u);
    n(10), n(8);
    var h = n(4),
      l = [0, .5, 1, 1.5, 2, 3, 3.5, 4, 4.5, 5, 5.5, 6],
      p = function(e) {
        function t(e) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 36,
            r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 4;
          i(this, t);
          var s = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return s._container = document.createElement("div"), s._container.id = "keyboard", e.setAttribute("touch-action", "none"), e.addEventListener("pointerup", function(e) {
            return s._pointerUp(e.pointerId)
          }), e.addEventListener("pointerout", function(e) {
            return s._pointerUp(e.pointerId)
          }), e.appendChild(s._container), s._keys = {}, s._downPointers = [], s.resize(n, r), s._notes = {}, s
        }
        return s(t, e), a(t, [{
          key: "resize",
          value: function(e, t) {
            this._keys = {}, this._container.innerHTML = "";
            for (var n = 1 / 7 / t, r = e; r < e + 12 * t; r++) {
              var i = document.createElement("div");
              i.classList.add("key");
              var o = [1, 3, 6, 8, 10].indexOf(r % 12) !== -1;
              i.classList.add(o ? "black" : "white"), this._container.appendChild(i);
              var s = Math.floor(r / 12) - Math.floor(e / 12),
                a = l[r % 12] + 7 * s;
              i.style.width = 100 * n + "%", i.style.left = a * n * 100 + "%", i.id = r.toString(), i.setAttribute("touch-action", "none");
              var u = document.createElement("div");
              u.id = "fill", i.appendChild(u), this._bindKeyEvents(i), this._keys[r] = i
            }
          }
        }, {
          key: "_isDown",
          value: function(e) {
            return this._downPointers.indexOf(e) !== -1
          }
        }, {
          key: "_pointerUp",
          value: function(e) {
            if (this._isDown(e)) {
              var t = this._downPointers.indexOf(e);
              this._downPointers.splice(t, 1)
            }
          }
        }, {
          key: "_bindKeyEvents",
          value: function(e) {
            var t = this;
            e.addEventListener("pointerover", function(n) {
              if (n.stopPropagation(), t._isDown(n.pointerId)) {
                var r = parseInt(n.target.id);
                t.emit("keyDown", r)
              } else e.classList.add("hover")
            }), e.addEventListener("pointerout", function(n) {
              if (n.stopPropagation(), t._isDown(n.pointerId)) {
                var r = parseInt(n.target.id);
                t.emit("keyUp", r)
              } else e.classList.remove("hover")
            }), e.addEventListener("pointerdown", function(e) {
              e.preventDefault(), e.stopPropagation();
              var n = parseInt(e.target.id);
              t.emit("keyDown", n), t._isDown(e.pointerId) || t._downPointers.push(e.pointerId)
            }), e.addEventListener("pointerup", function(e) {
              if (e.preventDefault(), e.stopPropagation(), t._isDown(e.pointerId)) {
                var n = parseInt(e.target.id);
                t.emit("keyUp", n), t._pointerUp(e.pointerId)
              }
            })
          }
        }, {
          key: "keyDown",
          value: function(e) {
            if (this._keys.hasOwnProperty(e)) {
              var t = this._keys[e];
              t.classList.remove("hover");
              var n = new h.Note(t.querySelector("#fill"));
              this._notes[e] || (this._notes[e] = []), this._notes[e].push(n)
            }
          }
        }, {
          key: "keyUp",
          value: function(e) {
            if (this._keys.hasOwnProperty(e)) {
              if (!this._notes[e].length) throw new Error("note off without note on");
              this._notes[e].shift().noteOff()
            }
          }
        }]), t
      }(c.default.EventEmitter);
    t.KeyboardElement = p
  }, function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.Midi = void 0;
    var a = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
        }
      }(),
      u = n(1),
      c = r(u),
      h = n(11),
      l = r(h),
      p = function(e) {
        function t() {
          i(this, t);
          var e = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return e._isEnabled = !1, l.default.enable(function(t) {
            t || (e._isEnabled = !0, l.default.inputs && l.default.inputs.forEach(function(t) {
              return e._bindInput(t)
            }), l.default.addListener("connected", function(t) {
              t.input && e._bindInput(t.input)
            }))
          }), e
        }
        return s(t, e), a(t, [{
          key: "_bindInput",
          value: function(e) {
            var t = this;
            this._isEnabled && (l.default.addListener("disconnected", function(e) {
              e.input && (e.input.removeListener("noteOn"), e.input.removeListener("noteOff"))
            }), e.addListener("noteon", "all", function(e) {
              t.emit("keyDown", e.note.number)
            }), e.addListener("noteoff", "all", function(e) {
              t.emit("keyUp", e.note.number)
            }))
          }
        }]), t
      }(c.default.EventEmitter);
    t.Midi = p
  }, function(e, t) {
    "use strict";

    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
      }
      return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
      }
    }();
    t.Note = function() {
      function e(t) {
        n(this, e), this.element = document.createElement("div"), this.element.classList.add("highlight"), this.element.classList.add("active"), t.appendChild(this.element)
      }
      return r(e, [{
        key: "noteOff",
        value: function() {
          var e = this;
          this.element.classList.remove("active"), setTimeout(function() {
            e.element.remove()
          }, 1e3)
        }
      }]), e
    }()
  }, function(e, t, n) {
    "use strict";

    function r(e) {
      var t = this;
      t._setState(e), t._listeners = {}, t._bind()
    }
    e.exports = r, r.prototype._setState = function(e) {
      var t = this;
      e || (e = {}), t._state = {}, t._extendState({
        polyphony: 4,
        rows: 1,
        priority: "last",
        rootNote: 60,
        octaveControls: !0,
        octave: 0,
        velocityControls: !0,
        velocity: 127,
        keys: [],
        buffer: []
      }), t._extendState(e)
    }, r.prototype._extendState = function(e) {
      var t = this;
      for (var n in e) t._state[n] = e[n]
    }, r.prototype.set = function() {
      var e = this;
      return 1 === arguments.length ? e._extendState(arguments[0]) : e._state[arguments[0]] = arguments[1], this
    }, r.prototype.get = function(e) {
      var t = this;
      return t._state[e]
    }, r.prototype.down = function(e) {
      var t = this;
      t._listeners.down = (t._listeners.down || []).concat(e)
    }, r.prototype.up = function(e) {
      var t = this;
      t._listeners.up = (t._listeners.up || []).concat(e)
    }, r.prototype._trigger = function(e) {
      var t = this;
      if (t._listeners[e] && t._listeners[e].length) {
        var n = Array.prototype.slice.call(arguments);
        n.splice(0, 1), t._listeners[e].forEach(function(e) {
          e.apply(t, n)
        })
      }
    }, r.prototype._bind = function() {
      var e = this;
      if ("undefined" != typeof window && window.document) {
        window.document.addEventListener("keydown", function(t) {
          e._addKey(t)
        }), window.document.addEventListener("keyup", function(t) {
          e._removeKey(t)
        });
        var t = !0;
        setInterval(function() {
          window.document.hasFocus() !== t && (t = !t, t || e.clear())
        }, 100)
      }
    }, r.prototype._map = function(e) {
      return this._keyMap[this._state.rows][e] + this._offset()
    }, r.prototype._offset = function() {
      return this._state.rootNote - this._keyMap[this._state.rows].root + 12 * this._state.octave
    }, r.prototype._isNote = function(e) {
      return !!this._keyMap[this._state.rows][e]
    }, r.prototype._toFrequency = function(e) {
      return 440 * Math.pow(2, (e - 69) / 12)
    }, r.prototype._keyMap = {
      1: {
        root: 60,
        65: 60,
        87: 61,
        83: 62,
        69: 63,
        68: 64,
        70: 65,
        84: 66,
        71: 67,
        89: 68,
        72: 69,
        85: 70,
        74: 71,
        75: 72,
        79: 73,
        76: 74,
        80: 75,
        186: 76,
        222: 77
      },
      2: {
        root: 60,
        90: 60,
        83: 61,
        88: 62,
        68: 63,
        67: 64,
        86: 65,
        71: 66,
        66: 67,
        72: 68,
        78: 69,
        74: 70,
        77: 71,
        188: 72,
        76: 73,
        190: 74,
        186: 75,
        191: 76,
        81: 72,
        50: 73,
        87: 74,
        51: 75,
        69: 76,
        82: 77,
        53: 78,
        84: 79,
        54: 80,
        89: 81,
        55: 82,
        85: 83,
        73: 84,
        57: 85,
        79: 86,
        48: 87,
        80: 88,
        219: 89,
        187: 90,
        221: 91
      }
    }, r.prototype._addKey = function(e) {
      var t = this;
      if (t._isNote(e.keyCode) && !t._isPressed(e.keyCode)) {
        var n = t._makeNote(e.keyCode);
        t._state.keys = (t._state.keys || []).concat(n), t._update()
      } else t._isSpecialKey(e.keyCode) && t._specialKey(e.keyCode)
    }, r.prototype._removeKey = function(e) {
      var t = this;
      if (t._isPressed(e.keyCode)) {
        for (var n, r = 0; r < t._state.keys.length; r++)
          if (t._state.keys[r].keyCode === e.keyCode) {
            n = t._state.keys[r];
            break
          }
        t._state.keys.splice(t._state.keys.indexOf(n), 1), t._update()
      }
    }, r.prototype._isPressed = function(e) {
      var t = this;
      if (!t._state.keys || !t._state.keys.length) return !1;
      for (var n = 0; n < t._state.keys.length; n++)
        if (t._state.keys[n].keyCode === e) return !0;
      return !1
    }, r.prototype._makeNote = function(e) {
      var t = this;
      return {
        keyCode: e,
        note: t._map(e),
        frequency: t._toFrequency(t._map(e)),
        velocity: t._state.velocity
      }
    }, r.prototype.clear = function() {
      var e = this;
      e._state.buffer.forEach(function(t) {
        e._trigger("up", t)
      }), e._state.keys = [], e._state.buffer = []
    }, r.prototype._update = function() {
      var e = this,
        t = e._state.buffer;
      e._prioritize(), e._diff(t)
    }, r.prototype._diff = function(e) {
      var t = this,
        n = e.map(function(e) {
          return e.keyCode
        }),
        r = t._state.buffer.map(function(e) {
          return e.keyCode
        }),
        i = [];
      n.forEach(function(e) {
        r.indexOf(e) === -1 && i.push(e)
      });
      var o = [];
      r.forEach(function(e) {
        n.indexOf(e) === -1 && o.push(e)
      }), o.forEach(function(e) {
        for (var n = 0; n < t._state.buffer.length; n++)
          if (t._state.buffer[n].keyCode === e) {
            t._trigger("down", t._state.buffer[n]);
            break
          }
      }), i.forEach(function(n) {
        for (var r = 0; r < e.length; r++)
          if (e[r].keyCode === n) {
            t._trigger("up", e[r]);
            break
          }
      })
    }, r.prototype._prioritize = function() {
      var e = this;
      return e._state.keys.length ? (e._state.polyphony >= e._state.keys.length ? e._state.keys = e._state.keys.map(function(e) {
        return e.isActive = !0, e
      }) : (e._state.keys = e._state.keys.map(function(e) {
        return e.isActive = !1, e
      }), e["_" + e._state.priority]()), e._state.buffer = [], void e._state.keys.forEach(function(t) {
        t.isActive && e._state.buffer.push(t)
      })) : void(e._state.buffer = [])
    }, r.prototype._last = function() {
      for (var e = this, t = e._state.keys.length - e._state.polyphony; t < e._state.keys.length; t++) e._state.keys[t].isActive = !0
    }, r.prototype._first = function() {
      for (var e = this, t = 0; t < e._state.polyphony; t++) e._state.keys[t].isActive = !0
    }, r.prototype._highest = function() {
      var e = this,
        t = e._state.keys.map(function(e) {
          return e.note
        });
      t.sort(function(e, t) {
        return t === e ? 0 : t < e ? -1 : 1
      }), t.splice(e._state.polyphony, Number.MAX_VALUE), e._state.keys.forEach(function(e) {
        t.indexOf(e.note) !== -1 && (e.isActive = !0)
      })
    }, r.prototype._lowest = function() {
      var e = this,
        t = e._state.keys.map(function(e) {
          return e.note
        });
      t.sort(function(e, t) {
        return e === t ? 0 : e < t ? -1 : 1
      }), t.splice(e._state.polyphony, Number.MAX_VALUE), e._state.keys.forEach(function(e) {
        t.indexOf(e.note) !== -1 && (e.isActive = !0)
      })
    }, r.prototype._isSpecialKey = function(e) {
      return 1 === this._state.rows && this._specialKeyMap[e]
    }, r.prototype._specialKey = function(e) {
      var t = this;
      "octave" === t._specialKeyMap[e].type && t._state.octaveControls ? t._state.octave += t._specialKeyMap[e].value : "velocity" === t._specialKeyMap[e].type && t._state.velocityControls && (t._state.velocity = t._specialKeyMap[e].value)
    }, r.prototype._specialKeyMap = {
      90: {
        type: "octave",
        value: -1
      },
      88: {
        type: "octave",
        value: 1
      },
      49: {
        type: "velocity",
        value: 1
      },
      50: {
        type: "velocity",
        value: 14
      },
      51: {
        type: "velocity",
        value: 28
      },
      52: {
        type: "velocity",
        value: 42
      },
      53: {
        type: "velocity",
        value: 56
      },
      54: {
        type: "velocity",
        value: 70
      },
      55: {
        type: "velocity",
        value: 84
      },
      56: {
        type: "velocity",
        value: 98
      },
      57: {
        type: "velocity",
        value: 112
      },
      48: {
        type: "velocity",
        value: 127
      }
    }
  }, function(e, t, n) {
    t = e.exports = n(7)(), t.push([e.id, "#keyboard{position:inherit;height:100%;width:calc(100% - 2 * 2px);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}#keyboard .key{position:absolute;height:calc(100% - 2 * 2px);width:10px;left:0;top:0}#keyboard .key.black{z-index:1;height:50%}#keyboard .key.black #fill{background-color:#000;width:calc(100% - 8px);left:4px}#keyboard .key.white{z-index:0}#keyboard .key.white #fill{background-color:#fff}#keyboard .key.black.hover #fill,#keyboard .key.white.hover #fill{background-color:#ddd}#keyboard .key #fill{border:2px solid #ddd}#keyboard .key #fill,#keyboard .key .highlight{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}#keyboard .key .highlight{opacity:0;-webkit-transition:opacity .5s;transition:opacity .5s}#keyboard .key .highlight.active{opacity:1}#keyboard .key.black .highlight,#keyboard .key.white .highlight{background-color:#777}", ""])
  }, function(e, t) {
    e.exports = function() {
      var e = [];
      return e.toString = function() {
        for (var e = [], t = 0; t < this.length; t++) {
          var n = this[t];
          n[2] ? e.push("@media " + n[2] + "{" + n[1] + "}") : e.push(n[1])
        }
        return e.join("")
      }, e.i = function(t, n) {
        "string" == typeof t && (t = [
          [null, t, ""]
        ]);
        for (var r = {}, i = 0; i < this.length; i++) {
          var o = this[i][0];
          "number" == typeof o && (r[o] = !0)
        }
        for (i = 0; i < t.length; i++) {
          var s = t[i];
          "number" == typeof s[0] && r[s[0]] || (n && !s[2] ? s[2] = n : n && (s[2] = "(" + s[2] + ") and (" + n + ")"), e.push(s))
        }
      }, e
    }
  }, function(e, t, n) {
    /*!
     * PEP v0.4.2 | https://github.com/jquery/PEP
     * Copyright jQuery Foundation and other contributors | http://jquery.org/license
     */
    ! function(t, n) {
      e.exports = n()
    }(this, function() {
      "use strict";

      function e(e, t) {
        t = t || Object.create(null);
        var n = document.createEvent("Event");
        n.initEvent(e, t.bubbles || !1, t.cancelable || !1);
        for (var r, i = 2; i < p.length; i++) r = p[i], n[r] = t[r] || f[i];
        n.buttons = t.buttons || 0;
        var o = 0;
        return o = t.pressure && n.buttons ? t.pressure : n.buttons ? .5 : 0, n.x = n.clientX, n.y = n.clientY, n.pointerId = t.pointerId || 0, n.width = t.width || 0, n.height = t.height || 0, n.pressure = o, n.tiltX = t.tiltX || 0, n.tiltY = t.tiltY || 0, n.pointerType = t.pointerType || "", n.hwTimestamp = t.hwTimestamp || 0, n.isPrimary = t.isPrimary || !1, n
      }

      function t() {
        this.array = [], this.size = 0
      }

      function n(e, t, n, r) {
        this.addCallback = e.bind(r), this.removeCallback = t.bind(r), this.changedCallback = n.bind(r), T && (this.observer = new T(this.mutationWatcher.bind(this)))
      }

      function r(e) {
        return "body /shadow-deep/ " + i(e)
      }

      function i(e) {
        return '[touch-action="' + e + '"]'
      }

      function o(e) {
        return "{ -ms-touch-action: " + e + "; touch-action: " + e + "; }"
      }

      function s() {
        if (O) {
          k.forEach(function(e) {
            String(e) === e ? (P += i(e) + o(e) + "\n", N && (P += r(e) + o(e) + "\n")) : (P += e.selectors.map(i) + o(e.rule) + "\n", N && (P += e.selectors.map(r) + o(e.rule) + "\n"))
          });
          var e = document.createElement("style");
          e.textContent = P, document.head.appendChild(e)
        }
      }

      function a() {
        if (!window.PointerEvent) {
          if (window.PointerEvent = e, window.navigator.msPointerEnabled) {
            var t = window.navigator.msMaxTouchPoints;
            Object.defineProperty(window.navigator, "maxTouchPoints", {
              value: t,
              enumerable: !0
            }), b.registerSource("ms", J)
          } else b.registerSource("mouse", G), void 0 !== window.ontouchstart && b.registerSource("touch", z);
          b.register(document)
        }
      }

      function u(e) {
        if (!b.pointermap.has(e)) {
          var t = new Error("InvalidPointerId");
          throw t.name = "InvalidPointerId", t
        }
      }

      function c(e) {
        if (!e.ownerDocument.contains(e)) {
          var t = new Error("InvalidStateError");
          throw t.name = "InvalidStateError", t
        }
      }

      function h(e) {
        var t = b.pointermap.get(e);
        return 0 !== t.buttons
      }

      function l() {
        window.Element && !Element.prototype.setPointerCapture && Object.defineProperties(Element.prototype, {
          setPointerCapture: {
            value: q
          },
          releasePointerCapture: {
            value: W
          }
        })
      }
      var p = ["bubbles", "cancelable", "view", "detail", "screenX", "screenY", "clientX", "clientY", "ctrlKey", "altKey", "shiftKey", "metaKey", "button", "relatedTarget", "pageX", "pageY"],
        f = [!1, !1, null, null, 0, 0, 0, 0, !1, !1, !1, !1, 0, null, 0, 0],
        d = window.Map && window.Map.prototype.forEach,
        v = d ? Map : t;
      t.prototype = {
        set: function(e, t) {
          return void 0 === t ? this.delete(e) : (this.has(e) || this.size++, void(this.array[e] = t))
        },
        has: function(e) {
          return void 0 !== this.array[e]
        },
        delete: function(e) {
          this.has(e) && (delete this.array[e], this.size--)
        },
        get: function(e) {
          return this.array[e]
        },
        clear: function() {
          this.array.length = 0, this.size = 0
        },
        forEach: function(e, t) {
          return this.array.forEach(function(n, r) {
            e.call(t, n, r, this)
          }, this)
        }
      };
      var y = ["bubbles", "cancelable", "view", "detail", "screenX", "screenY", "clientX", "clientY", "ctrlKey", "altKey", "shiftKey", "metaKey", "button", "relatedTarget", "buttons", "pointerId", "width", "height", "pressure", "tiltX", "tiltY", "pointerType", "hwTimestamp", "isPrimary", "type", "target", "currentTarget", "which", "pageX", "pageY", "timeStamp"],
        m = [!1, !1, null, null, 0, 0, 0, 0, !1, !1, !1, !1, 0, null, 0, 0, 0, 0, 0, 0, 0, "", 0, !1, "", null, null, 0, 0, 0, 0],
        _ = {
          pointerover: 1,
          pointerout: 1,
          pointerenter: 1,
          pointerleave: 1
        },
        E = "undefined" != typeof SVGElementInstance,
        b = {
          pointermap: new v,
          eventMap: Object.create(null),
          captureInfo: Object.create(null),
          eventSources: Object.create(null),
          eventSourceList: [],
          registerSource: function(e, t) {
            var n = t,
              r = n.events;
            r && (r.forEach(function(e) {
              n[e] && (this.eventMap[e] = n[e].bind(n))
            }, this), this.eventSources[e] = n, this.eventSourceList.push(n))
          },
          register: function(e) {
            for (var t, n = this.eventSourceList.length, r = 0; r < n && (t = this.eventSourceList[r]); r++) t.register.call(t, e)
          },
          unregister: function(e) {
            for (var t, n = this.eventSourceList.length, r = 0; r < n && (t = this.eventSourceList[r]); r++) t.unregister.call(t, e)
          },
          contains: function(e, t) {
            try {
              return e.contains(t)
            } catch (e) {
              return !1
            }
          },
          down: function(e) {
            e.bubbles = !0, this.fireEvent("pointerdown", e)
          },
          move: function(e) {
            e.bubbles = !0, this.fireEvent("pointermove", e)
          },
          up: function(e) {
            e.bubbles = !0, this.fireEvent("pointerup", e)
          },
          enter: function(e) {
            e.bubbles = !1, this.fireEvent("pointerenter", e)
          },
          leave: function(e) {
            e.bubbles = !1, this.fireEvent("pointerleave", e)
          },
          over: function(e) {
            e.bubbles = !0, this.fireEvent("pointerover", e)
          },
          out: function(e) {
            e.bubbles = !0, this.fireEvent("pointerout", e)
          },
          cancel: function(e) {
            e.bubbles = !0, this.fireEvent("pointercancel", e)
          },
          leaveOut: function(e) {
            this.out(e), this.propagate(e, this.leave, !1)
          },
          enterOver: function(e) {
            this.over(e), this.propagate(e, this.enter, !0)
          },
          eventHandler: function(e) {
            if (!e._handledByPE) {
              var t = e.type,
                n = this.eventMap && this.eventMap[t];
              n && n(e), e._handledByPE = !0
            }
          },
          listen: function(e, t) {
            t.forEach(function(t) {
              this.addEvent(e, t)
            }, this)
          },
          unlisten: function(e, t) {
            t.forEach(function(t) {
              this.removeEvent(e, t)
            }, this)
          },
          addEvent: function(e, t) {
            e.addEventListener(t, this.boundHandler)
          },
          removeEvent: function(e, t) {
            e.removeEventListener(t, this.boundHandler)
          },
          makeEvent: function(t, n) {
            this.captureInfo[n.pointerId] && (n.relatedTarget = null);
            var r = new e(t, n);
            return n.preventDefault && (r.preventDefault = n.preventDefault), r._target = r._target || n.target, r
          },
          fireEvent: function(e, t) {
            var n = this.makeEvent(e, t);
            return this.dispatchEvent(n)
          },
          cloneEvent: function(e) {
            for (var t, n = Object.create(null), r = 0; r < y.length; r++) t = y[r], n[t] = e[t] || m[r], !E || "target" !== t && "relatedTarget" !== t || n[t] instanceof SVGElementInstance && (n[t] = n[t].correspondingUseElement);
            return e.preventDefault && (n.preventDefault = function() {
              e.preventDefault()
            }), n
          },
          getTarget: function(e) {
            var t = this.captureInfo[e.pointerId];
            return t ? e._target !== t && e.type in _ ? void 0 : t : e._target
          },
          propagate: function(e, t, n) {
            for (var r = e.target, i = []; !r.contains(e.relatedTarget) && r !== document;) i.push(r), r = r.parentNode;
            n && i.reverse(), i.forEach(function(n) {
              e.target = n, t.call(this, e)
            }, this)
          },
          setCapture: function(t, n) {
            this.captureInfo[t] && this.releaseCapture(t), this.captureInfo[t] = n;
            var r = new e("gotpointercapture");
            r.pointerId = t, this.implicitRelease = this.releaseCapture.bind(this, t), document.addEventListener("pointerup", this.implicitRelease), document.addEventListener("pointercancel", this.implicitRelease), r._target = n, this.asyncDispatchEvent(r)
          },
          releaseCapture: function(t) {
            var n = this.captureInfo[t];
            if (n) {
              var r = new e("lostpointercapture");
              r.pointerId = t, this.captureInfo[t] = void 0, document.removeEventListener("pointerup", this.implicitRelease), document.removeEventListener("pointercancel", this.implicitRelease), r._target = n, this.asyncDispatchEvent(r)
            }
          },
          dispatchEvent: function(e) {
            var t = this.getTarget(e);
            if (t) return t.dispatchEvent(e)
          },
          asyncDispatchEvent: function(e) {
            requestAnimationFrame(this.dispatchEvent.bind(this, e))
          }
        };
      b.boundHandler = b.eventHandler.bind(b);
      var g = {
          shadow: function(e) {
            if (e) return e.shadowRoot || e.webkitShadowRoot
          },
          canTarget: function(e) {
            return e && Boolean(e.elementFromPoint)
          },
          targetingShadow: function(e) {
            var t = this.shadow(e);
            if (this.canTarget(t)) return t
          },
          olderShadow: function(e) {
            var t = e.olderShadowRoot;
            if (!t) {
              var n = e.querySelector("shadow");
              n && (t = n.olderShadowRoot)
            }
            return t
          },
          allShadows: function(e) {
            for (var t = [], n = this.shadow(e); n;) t.push(n), n = this.olderShadow(n);
            return t
          },
          searchRoot: function(e, t, n) {
            if (e) {
              var r, i, o = e.elementFromPoint(t, n);
              for (i = this.targetingShadow(o); i;) {
                if (r = i.elementFromPoint(t, n)) {
                  var s = this.targetingShadow(r);
                  return this.searchRoot(s, t, n) || r
                }
                i = this.olderShadow(i)
              }
              return o
            }
          },
          owner: function(e) {
            for (var t = e; t.parentNode;) t = t.parentNode;
            return t.nodeType !== Node.DOCUMENT_NODE && t.nodeType !== Node.DOCUMENT_FRAGMENT_NODE && (t = document), t
          },
          findTarget: function(e) {
            var t = e.clientX,
              n = e.clientY,
              r = this.owner(e.target);
            return r.elementFromPoint(t, n) || (r = document), this.searchRoot(r, t, n)
          }
        },
        w = Array.prototype.forEach.call.bind(Array.prototype.forEach),
        S = Array.prototype.map.call.bind(Array.prototype.map),
        I = Array.prototype.slice.call.bind(Array.prototype.slice),
        M = Array.prototype.filter.call.bind(Array.prototype.filter),
        T = window.MutationObserver || window.WebKitMutationObserver,
        A = "[touch-action]",
        C = {
          subtree: !0,
          childList: !0,
          attributes: !0,
          attributeOldValue: !0,
          attributeFilter: ["touch-action"]
        };
      n.prototype = {
        watchSubtree: function(e) {
          this.observer && g.canTarget(e) && this.observer.observe(e, C)
        },
        enableOnSubtree: function(e) {
          this.watchSubtree(e), e === document && "complete" !== document.readyState ? this.installOnLoad() : this.installNewSubtree(e)
        },
        installNewSubtree: function(e) {
          w(this.findElements(e), this.addElement, this)
        },
        findElements: function(e) {
          return e.querySelectorAll ? e.querySelectorAll(A) : []
        },
        removeElement: function(e) {
          this.removeCallback(e)
        },
        addElement: function(e) {
          this.addCallback(e)
        },
        elementChanged: function(e, t) {
          this.changedCallback(e, t)
        },
        concatLists: function(e, t) {
          return e.concat(I(t))
        },
        installOnLoad: function() {
          document.addEventListener("readystatechange", function() {
            "complete" === document.readyState && this.installNewSubtree(document)
          }.bind(this))
        },
        isElement: function(e) {
          return e.nodeType === Node.ELEMENT_NODE
        },
        flattenMutationTree: function(e) {
          var t = S(e, this.findElements, this);
          return t.push(M(e, this.isElement)), t.reduce(this.concatLists, [])
        },
        mutationWatcher: function(e) {
          e.forEach(this.mutationHandler, this)
        },
        mutationHandler: function(e) {
          if ("childList" === e.type) {
            var t = this.flattenMutationTree(e.addedNodes);
            t.forEach(this.addElement, this);
            var n = this.flattenMutationTree(e.removedNodes);
            n.forEach(this.removeElement, this)
          } else "attributes" === e.type && this.elementChanged(e.target, e.oldValue)
        }
      };
      var k = ["none", "auto", "pan-x", "pan-y", {
          rule: "pan-x pan-y",
          selectors: ["pan-x pan-y", "pan-y pan-x"]
        }],
        P = "",
        O = window.PointerEvent || window.MSPointerEvent,
        N = !window.ShadowDOMPolyfill && document.head.createShadowRoot,
        R = b.pointermap,
        D = 25,
        L = [1, 4, 2, 8, 16],
        x = !1;
      try {
        x = 1 === new MouseEvent("test", {
          buttons: 1
        }).buttons
      } catch (e) {}
      var H, G = {
          POINTER_ID: 1,
          POINTER_TYPE: "mouse",
          events: ["mousedown", "mousemove", "mouseup", "mouseover", "mouseout"],
          register: function(e) {
            b.listen(e, this.events)
          },
          unregister: function(e) {
            b.unlisten(e, this.events)
          },
          lastTouches: [],
          isEventSimulatedFromTouch: function(e) {
            for (var t, n = this.lastTouches, r = e.clientX, i = e.clientY, o = 0, s = n.length; o < s && (t = n[o]); o++) {
              var a = Math.abs(r - t.x),
                u = Math.abs(i - t.y);
              if (a <= D && u <= D) return !0
            }
          },
          prepareEvent: function(e) {
            var t = b.cloneEvent(e),
              n = t.preventDefault;
            return t.preventDefault = function() {
              e.preventDefault(), n()
            }, t.pointerId = this.POINTER_ID, t.isPrimary = !0, t.pointerType = this.POINTER_TYPE, t
          },
          prepareButtonsForMove: function(e, t) {
            var n = R.get(this.POINTER_ID);
            0 !== t.which && n ? e.buttons = n.buttons : e.buttons = 0, t.buttons = e.buttons
          },
          mousedown: function(e) {
            if (!this.isEventSimulatedFromTouch(e)) {
              var t = R.get(this.POINTER_ID),
                n = this.prepareEvent(e);
              x || (n.buttons = L[n.button], t && (n.buttons |= t.buttons), e.buttons = n.buttons), R.set(this.POINTER_ID, e), t && 0 !== t.buttons ? b.move(n) : b.down(n)
            }
          },
          mousemove: function(e) {
            if (!this.isEventSimulatedFromTouch(e)) {
              var t = this.prepareEvent(e);
              x || this.prepareButtonsForMove(t, e), t.button = -1, R.set(this.POINTER_ID, e), b.move(t)
            }
          },
          mouseup: function(e) {
            if (!this.isEventSimulatedFromTouch(e)) {
              var t = R.get(this.POINTER_ID),
                n = this.prepareEvent(e);
              if (!x) {
                var r = L[n.button];
                n.buttons = t ? t.buttons & ~r : 0, e.buttons = n.buttons
              }
              R.set(this.POINTER_ID, e), n.buttons &= ~L[n.button], 0 === n.buttons ? b.up(n) : b.move(n)
            }
          },
          mouseover: function(e) {
            if (!this.isEventSimulatedFromTouch(e)) {
              var t = this.prepareEvent(e);
              x || this.prepareButtonsForMove(t, e), t.button = -1, R.set(this.POINTER_ID, e), b.enterOver(t)
            }
          },
          mouseout: function(e) {
            if (!this.isEventSimulatedFromTouch(e)) {
              var t = this.prepareEvent(e);
              x || this.prepareButtonsForMove(t, e), t.button = -1, b.leaveOut(t)
            }
          },
          cancel: function(e) {
            var t = this.prepareEvent(e);
            b.cancel(t), this.deactivateMouse()
          },
          deactivateMouse: function() {
            R.delete(this.POINTER_ID)
          }
        },
        Y = b.captureInfo,
        U = g.findTarget.bind(g),
        j = g.allShadows.bind(g),
        F = b.pointermap,
        K = 2500,
        B = 200,
        X = "touch-action",
        z = {
          events: ["touchstart", "touchmove", "touchend", "touchcancel"],
          register: function(e) {
            H.enableOnSubtree(e)
          },
          unregister: function() {},
          elementAdded: function(e) {
            var t = e.getAttribute(X),
              n = this.touchActionToScrollType(t);
            n && (e._scrollType = n, b.listen(e, this.events), j(e).forEach(function(e) {
              e._scrollType = n, b.listen(e, this.events)
            }, this))
          },
          elementRemoved: function(e) {
            e._scrollType = void 0, b.unlisten(e, this.events), j(e).forEach(function(e) {
              e._scrollType = void 0, b.unlisten(e, this.events)
            }, this)
          },
          elementChanged: function(e, t) {
            var n = e.getAttribute(X),
              r = this.touchActionToScrollType(n),
              i = this.touchActionToScrollType(t);
            r && i ? (e._scrollType = r, j(e).forEach(function(e) {
              e._scrollType = r
            }, this)) : i ? this.elementRemoved(e) : r && this.elementAdded(e)
          },
          scrollTypes: {
            EMITTER: "none",
            XSCROLLER: "pan-x",
            YSCROLLER: "pan-y",
            SCROLLER: /^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/
          },
          touchActionToScrollType: function(e) {
            var t = e,
              n = this.scrollTypes;
            return "none" === t ? "none" : t === n.XSCROLLER ? "X" : t === n.YSCROLLER ? "Y" : n.SCROLLER.exec(t) ? "XY" : void 0
          },
          POINTER_TYPE: "touch",
          firstTouch: null,
          isPrimaryTouch: function(e) {
            return this.firstTouch === e.identifier
          },
          setPrimaryTouch: function(e) {
            (0 === F.size || 1 === F.size && F.has(1)) && (this.firstTouch = e.identifier, this.firstXY = {
              X: e.clientX,
              Y: e.clientY
            }, this.scrolling = !1, this.cancelResetClickCount())
          },
          removePrimaryPointer: function(e) {
            e.isPrimary && (this.firstTouch = null, this.firstXY = null, this.resetClickCount())
          },
          clickCount: 0,
          resetId: null,
          resetClickCount: function() {
            var e = function() {
              this.clickCount = 0, this.resetId = null
            }.bind(this);
            this.resetId = setTimeout(e, B)
          },
          cancelResetClickCount: function() {
            this.resetId && clearTimeout(this.resetId)
          },
          typeToButtons: function(e) {
            var t = 0;
            return "touchstart" !== e && "touchmove" !== e || (t = 1), t
          },
          touchToPointer: function(e) {
            var t = this.currentTouchEvent,
              n = b.cloneEvent(e),
              r = n.pointerId = e.identifier + 2;
            n.target = Y[r] || U(n), n.bubbles = !0, n.cancelable = !0, n.detail = this.clickCount, n.button = 0, n.buttons = this.typeToButtons(t.type), n.width = e.radiusX || e.webkitRadiusX || 0, n.height = e.radiusY || e.webkitRadiusY || 0, n.pressure = e.force || e.webkitForce || .5, n.isPrimary = this.isPrimaryTouch(e), n.pointerType = this.POINTER_TYPE, n.altKey = t.altKey, n.ctrlKey = t.ctrlKey, n.metaKey = t.metaKey, n.shiftKey = t.shiftKey;
            var i = this;
            return n.preventDefault = function() {
              i.scrolling = !1, i.firstXY = null, t.preventDefault()
            }, n
          },
          processTouches: function(e, t) {
            var n = e.changedTouches;
            this.currentTouchEvent = e;
            for (var r, i = 0; i < n.length; i++) r = n[i], t.call(this, this.touchToPointer(r))
          },
          shouldScroll: function(e) {
            if (this.firstXY) {
              var t, n = e.currentTarget._scrollType;
              if ("none" === n) t = !1;
              else if ("XY" === n) t = !0;
              else {
                var r = e.changedTouches[0],
                  i = n,
                  o = "Y" === n ? "X" : "Y",
                  s = Math.abs(r["client" + i] - this.firstXY[i]),
                  a = Math.abs(r["client" + o] - this.firstXY[o]);
                t = s >= a
              }
              return this.firstXY = null, t
            }
          },
          findTouch: function(e, t) {
            for (var n, r = 0, i = e.length; r < i && (n = e[r]); r++)
              if (n.identifier === t) return !0
          },
          vacuumTouches: function(e) {
            var t = e.touches;
            if (F.size >= t.length) {
              var n = [];
              F.forEach(function(e, r) {
                if (1 !== r && !this.findTouch(t, r - 2)) {
                  var i = e.out;
                  n.push(i)
                }
              }, this), n.forEach(this.cancelOut, this)
            }
          },
          touchstart: function(e) {
            this.vacuumTouches(e), this.setPrimaryTouch(e.changedTouches[0]), this.dedupSynthMouse(e), this.scrolling || (this.clickCount++, this.processTouches(e, this.overDown))
          },
          overDown: function(e) {
            F.set(e.pointerId, {
              target: e.target,
              out: e,
              outTarget: e.target
            }), b.enterOver(e), b.down(e)
          },
          touchmove: function(e) {
            this.scrolling || (this.shouldScroll(e) ? (this.scrolling = !0, this.touchcancel(e)) : (e.preventDefault(), this.processTouches(e, this.moveOverOut)))
          },
          moveOverOut: function(e) {
            var t = e,
              n = F.get(t.pointerId);
            if (n) {
              var r = n.out,
                i = n.outTarget;
              b.move(t), r && i !== t.target && (r.relatedTarget = t.target, t.relatedTarget = i, r.target = i, t.target ? (b.leaveOut(r), b.enterOver(t)) : (t.target = i, t.relatedTarget = null, this.cancelOut(t))), n.out = t, n.outTarget = t.target
            }
          },
          touchend: function(e) {
            this.dedupSynthMouse(e), this.processTouches(e, this.upOut)
          },
          upOut: function(e) {
            this.scrolling || (b.up(e), b.leaveOut(e)), this.cleanUpPointer(e)
          },
          touchcancel: function(e) {
            this.processTouches(e, this.cancelOut)
          },
          cancelOut: function(e) {
            b.cancel(e), b.leaveOut(e), this.cleanUpPointer(e)
          },
          cleanUpPointer: function(e) {
            F.delete(e.pointerId), this.removePrimaryPointer(e)
          },
          dedupSynthMouse: function(e) {
            var t = G.lastTouches,
              n = e.changedTouches[0];
            if (this.isPrimaryTouch(n)) {
              var r = {
                x: n.clientX,
                y: n.clientY
              };
              t.push(r);
              var i = function(e, t) {
                var n = e.indexOf(t);
                n > -1 && e.splice(n, 1)
              }.bind(null, t, r);
              setTimeout(i, K)
            }
          }
        };
      H = new n(z.elementAdded, z.elementRemoved, z.elementChanged, z);
      var q, W, V = b.pointermap,
        Q = window.MSPointerEvent && "number" == typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE,
        J = {
          events: ["MSPointerDown", "MSPointerMove", "MSPointerUp", "MSPointerOut", "MSPointerOver", "MSPointerCancel", "MSGotPointerCapture", "MSLostPointerCapture"],
          register: function(e) {
            b.listen(e, this.events)
          },
          unregister: function(e) {
            b.unlisten(e, this.events)
          },
          POINTER_TYPES: ["", "unavailable", "touch", "pen", "mouse"],
          prepareEvent: function(e) {
            var t = e;
            return Q && (t = b.cloneEvent(e), t.pointerType = this.POINTER_TYPES[e.pointerType]), t
          },
          cleanup: function(e) {
            V.delete(e)
          },
          MSPointerDown: function(e) {
            V.set(e.pointerId, e);
            var t = this.prepareEvent(e);
            b.down(t)
          },
          MSPointerMove: function(e) {
            var t = this.prepareEvent(e);
            b.move(t)
          },
          MSPointerUp: function(e) {
            var t = this.prepareEvent(e);
            b.up(t), this.cleanup(e.pointerId)
          },
          MSPointerOut: function(e) {
            var t = this.prepareEvent(e);
            b.leaveOut(t)
          },
          MSPointerOver: function(e) {
            var t = this.prepareEvent(e);
            b.enterOver(t)
          },
          MSPointerCancel: function(e) {
            var t = this.prepareEvent(e);
            b.cancel(t), this.cleanup(e.pointerId)
          },
          MSLostPointerCapture: function(e) {
            var t = b.makeEvent("lostpointercapture", e);
            b.dispatchEvent(t)
          },
          MSGotPointerCapture: function(e) {
            var t = b.makeEvent("gotpointercapture", e);
            b.dispatchEvent(t)
          }
        },
        $ = window.navigator;
      $.msPointerEnabled ? (q = function(e) {
        u(e), c(this), h(e) && this.msSetPointerCapture(e)
      }, W = function(e) {
        u(e), this.msReleasePointerCapture(e)
      }) : (q = function(e) {
        u(e), c(this), h(e) && b.setCapture(e, this)
      }, W = function(e) {
        u(e), b.releaseCapture(e, this)
      }), s(), a(), l();
      var Z = {
        dispatcher: b,
        Installer: n,
        PointerEvent: e,
        PointerMap: v,
        targetFinding: g
      };
      return Z
    })
  }, function(e, t, n) {
    function r(e, t) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n],
          i = f[r.id];
        if (i) {
          i.refs++;
          for (var o = 0; o < i.parts.length; o++) i.parts[o](r.parts[o]);
          for (; o < r.parts.length; o++) i.parts.push(c(r.parts[o], t))
        } else {
          for (var s = [], o = 0; o < r.parts.length; o++) s.push(c(r.parts[o], t));
          f[r.id] = {
            id: r.id,
            refs: 1,
            parts: s
          }
        }
      }
    }

    function i(e) {
      for (var t = [], n = {}, r = 0; r < e.length; r++) {
        var i = e[r],
          o = i[0],
          s = i[1],
          a = i[2],
          u = i[3],
          c = {
            css: s,
            media: a,
            sourceMap: u
          };
        n[o] ? n[o].parts.push(c) : t.push(n[o] = {
          id: o,
          parts: [c]
        })
      }
      return t
    }

    function o(e, t) {
      var n = y(),
        r = E[E.length - 1];
      if ("top" === e.insertAt) r ? r.nextSibling ? n.insertBefore(t, r.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), E.push(t);
      else {
        if ("bottom" !== e.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
        n.appendChild(t)
      }
    }

    function s(e) {
      e.parentNode.removeChild(e);
      var t = E.indexOf(e);
      t >= 0 && E.splice(t, 1)
    }

    function a(e) {
      var t = document.createElement("style");
      return t.type = "text/css", o(e, t), t
    }

    function u(e) {
      var t = document.createElement("link");
      return t.rel = "stylesheet", o(e, t), t
    }

    function c(e, t) {
      var n, r, i;
      if (t.singleton) {
        var o = _++;
        n = m || (m = a(t)), r = h.bind(null, n, o, !1), i = h.bind(null, n, o, !0)
      } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = u(t), r = p.bind(null, n), i = function() {
        s(n), n.href && URL.revokeObjectURL(n.href)
      }) : (n = a(t), r = l.bind(null, n), i = function() {
        s(n)
      });
      return r(e),
        function(t) {
          if (t) {
            if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
            r(e = t)
          } else i()
        }
    }

    function h(e, t, n, r) {
      var i = n ? "" : r.css;
      if (e.styleSheet) e.styleSheet.cssText = b(t, i);
      else {
        var o = document.createTextNode(i),
          s = e.childNodes;
        s[t] && e.removeChild(s[t]), s.length ? e.insertBefore(o, s[t]) : e.appendChild(o)
      }
    }

    function l(e, t) {
      var n = t.css,
        r = t.media;
      if (r && e.setAttribute("media", r), e.styleSheet) e.styleSheet.cssText = n;
      else {
        for (; e.firstChild;) e.removeChild(e.firstChild);
        e.appendChild(document.createTextNode(n))
      }
    }

    function p(e, t) {
      var n = t.css,
        r = t.sourceMap;
      r && (n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");
      var i = new Blob([n], {
          type: "text/css"
        }),
        o = e.href;
      e.href = URL.createObjectURL(i), o && URL.revokeObjectURL(o)
    }
    var f = {},
      d = function(e) {
        var t;
        return function() {
          return "undefined" == typeof t && (t = e.apply(this, arguments)), t
        }
      },
      v = d(function() {
        return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())
      }),
      y = d(function() {
        return document.head || document.getElementsByTagName("head")[0]
      }),
      m = null,
      _ = 0,
      E = [];
    e.exports = function(e, t) {
      t = t || {}, "undefined" == typeof t.singleton && (t.singleton = v()), "undefined" == typeof t.insertAt && (t.insertAt = "bottom");
      var n = i(e);
      return r(n, t),
        function(e) {
          for (var o = [], s = 0; s < n.length; s++) {
            var a = n[s],
              u = f[a.id];
            u.refs--, o.push(u)
          }
          if (e) {
            var c = i(e);
            r(c, t)
          }
          for (var s = 0; s < o.length; s++) {
            var u = o[s];
            if (0 === u.refs) {
              for (var h = 0; h < u.parts.length; h++) u.parts[h]();
              delete f[u.id]
            }
          }
        }
    };
    var b = function() {
      var e = [];
      return function(t, n) {
        return e[t] = n, e.filter(Boolean).join("\n")
      }
    }()
  }, function(e, t, n) {
    var r = n(6);
    "string" == typeof r && (r = [
      [e.id, r, ""]
    ]), n(9)(r, {}), r.locals && (e.exports = r.locals)
  }, function(e, t, n) {
    var r, i;
    ! function(n) {
      "use strict";

      function o() {
        if (o.prototype._singleton) throw new Error("WebMidi is a singleton, it cannot be instantiated directly.");
        o.prototype._singleton = this, this._inputs = [], this._outputs = [], this._userHandlers = {}, this._stateChangeQueue = [], this._processingStateChange = !1, this._midiInterfaceEvents = ["connected", "disconnected"], this._notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], this._semitones = {
          C: 0,
          D: 2,
          E: 4,
          F: 5,
          G: 7,
          A: 9,
          B: 11
        }, Object.defineProperties(this, {
          MIDI_SYSTEM_MESSAGES: {
            value: {
              sysex: 240,
              timecode: 241,
              songposition: 242,
              songselect: 243,
              tuningrequest: 246,
              sysexend: 247,
              clock: 248,
              start: 250,
              continue: 251,
              stop: 252,
              activesensing: 254,
              reset: 255,
              unknownsystemmessage: -1
            },
            writable: !1,
            enumerable: !0,
            configurable: !1
          },
          MIDI_CHANNEL_MESSAGES: {
            value: {
              noteoff: 8,
              noteon: 9,
              keyaftertouch: 10,
              controlchange: 11,
              channelmode: 11,
              programchange: 12,
              channelaftertouch: 13,
              pitchbend: 14
            },
            writable: !1,
            enumerable: !0,
            configurable: !1
          },
          MIDI_REGISTERED_PARAMETER: {
            value: {
              pitchbendrange: [0, 0],
              channelfinetuning: [0, 1],
              channelcoarsetuning: [0, 2],
              tuningprogram: [0, 3],
              tuningbank: [0, 4],
              modulationrange: [0, 5],
              azimuthangle: [61, 0],
              elevationangle: [61, 1],
              gain: [61, 2],
              distanceratio: [61, 3],
              maximumdistance: [61, 4],
              maximumdistancegain: [61, 5],
              referencedistanceratio: [61, 6],
              panspreadangle: [61, 7],
              rollangle: [61, 8]
            },
            writable: !1,
            enumerable: !0,
            configurable: !1
          },
          MIDI_CONTROL_CHANGE_MESSAGES: {
            value: {
              bankselectcoarse: 0,
              modulationwheelcoarse: 1,
              breathcontrollercoarse: 2,
              footcontrollercoarse: 4,
              portamentotimecoarse: 5,
              dataentrycoarse: 6,
              volumecoarse: 7,
              balancecoarse: 8,
              pancoarse: 10,
              expressioncoarse: 11,
              effectcontrol1coarse: 12,
              effectcontrol2coarse: 13,
              generalpurposeslider1: 16,
              generalpurposeslider2: 17,
              generalpurposeslider3: 18,
              generalpurposeslider4: 19,
              bankselectfine: 32,
              modulationwheelfine: 33,
              breathcontrollerfine: 34,
              footcontrollerfine: 36,
              portamentotimefine: 37,
              dataentryfine: 38,
              volumefine: 39,
              balancefine: 40,
              panfine: 42,
              expressionfine: 43,
              effectcontrol1fine: 44,
              effectcontrol2fine: 45,
              holdpedal: 64,
              portamento: 65,
              sustenutopedal: 66,
              softpedal: 67,
              legatopedal: 68,
              hold2pedal: 69,
              soundvariation: 70,
              resonance: 71,
              soundreleasetime: 72,
              soundattacktime: 73,
              brightness: 74,
              soundcontrol6: 75,
              soundcontrol7: 76,
              soundcontrol8: 77,
              soundcontrol9: 78,
              soundcontrol10: 79,
              generalpurposebutton1: 80,
              generalpurposebutton2: 81,
              generalpurposebutton3: 82,
              generalpurposebutton4: 83,
              reverblevel: 91,
              tremololevel: 92,
              choruslevel: 93,
              celestelevel: 94,
              phaserlevel: 95,
              databuttonincrement: 96,
              databuttondecrement: 97,
              nonregisteredparametercoarse: 98,
              nonregisteredparameterfine: 99,
              registeredparametercoarse: 100,
              registeredparameterfine: 101
            },
            writable: !1,
            enumerable: !0,
            configurable: !1
          },
          MIDI_CHANNEL_MODE_MESSAGES: {
            value: {
              allsoundoff: 120,
              resetallcontrollers: 121,
              localcontrol: 122,
              allnotesoff: 123,
              omnimodeoff: 124,
              omnimodeon: 125,
              monomodeon: 126,
              polymodeon: 127
            },
            writable: !1,
            enumerable: !0,
            configurable: !1
          }
        }), Object.defineProperties(this, {
          supported: {
            enumerable: !0,
            get: function() {
              return "requestMIDIAccess" in navigator
            }
          },
          enabled: {
            enumerable: !0,
            get: function() {
              return void 0 !== this.interface
            }.bind(this)
          },
          inputs: {
            enumerable: !0,
            get: function() {
              return this._inputs
            }.bind(this)
          },
          outputs: {
            enumerable: !0,
            get: function() {
              return this._outputs
            }.bind(this)
          },
          sysexEnabled: {
            enumerable: !0,
            get: function() {
              return !(!this.interface || !this.interface.sysexEnabled)
            }.bind(this)
          },
          time: {
            enumerable: !0,
            get: function() {
              return window.performance.now()
            }
          }
        })
      }

      function s(e) {
        var t = this;
        this._userHandlers = {
          channel: {},
          system: {}
        }, this._midiInput = e, Object.defineProperties(this, {
          connection: {
            enumerable: !0,
            get: function() {
              return t._midiInput.connection
            }
          },
          id: {
            enumerable: !0,
            get: function() {
              return t._midiInput.id
            }
          },
          manufacturer: {
            enumerable: !0,
            get: function() {
              return t._midiInput.manufacturer
            }
          },
          name: {
            enumerable: !0,
            get: function() {
              return t._midiInput.name
            }
          },
          state: {
            enumerable: !0,
            get: function() {
              return t._midiInput.state
            }
          }
        }), this._initializeUserHandlers()
      }

      function a(e) {
        var t = this;
        this._midiOutput = e, Object.defineProperties(this, {
          connection: {
            enumerable: !0,
            get: function() {
              return t._midiOutput.connection
            }
          },
          id: {
            enumerable: !0,
            get: function() {
              return t._midiOutput.id
            }
          },
          manufacturer: {
            enumerable: !0,
            get: function() {
              return t._midiOutput.manufacturer
            }
          },
          name: {
            enumerable: !0,
            get: function() {
              return t._midiOutput.name
            }
          },
          state: {
            enumerable: !0,
            get: function() {
              return t._midiOutput.state
            }
          }
        })
      }
      var u = new o;
      o.prototype.enable = function(e, t) {
        return this.enabled ? void 0 : this.supported ? void navigator.requestMIDIAccess({
          sysex: t
        }).then(function(t) {
          this.interface = t, this._resetInterfaceUserHandlers(), this.interface.onstatechange = this._onInterfaceStateChange.bind(this), this._onInterfaceStateChange(null), "function" == typeof e && e.call(this)
        }.bind(this), function(t) {
          "function" == typeof e && e.call(this, t)
        }.bind(this)) : void("function" == typeof e && e(new Error("The Web MIDI API is not supported by your browser.")))
      }, o.prototype.disable = function() {
        if (!this.supported) throw new Error("The Web MIDI API is not supported by your browser.");
        this.interface = void 0, this._inputs = [], this._outputs = [], this._resetInterfaceUserHandlers()
      }, o.prototype.addListener = function(e, t) {
        if (!this.enabled) throw new Error("WebMidi must be enabled before adding event listeners.");
        if ("function" != typeof t) throw new TypeError("The 'listener' parameter must be a function.");
        if (!(this._midiInterfaceEvents.indexOf(e) >= 0)) throw new TypeError("The specified event type is not supported.");
        return this._userHandlers[e].push(t), this
      }, o.prototype.hasListener = function(e, t) {
        if (!this.enabled) throw new Error("WebMidi must be enabled before checking event listeners.");
        if ("function" != typeof t) throw new TypeError("The 'listener' parameter must be a function.");
        if (!(this._midiInterfaceEvents.indexOf(e) >= 0)) throw new TypeError("The specified event type is not supported.");
        for (var n = 0; n < this._userHandlers[e].length; n++)
          if (this._userHandlers[e][n] === t) return !0;
        return !1
      }, o.prototype.removeListener = function(e, t) {
        if (!this.enabled) throw new Error("WebMidi must be enabled before removing event listeners.");
        if (void 0 !== t && "function" != typeof t) throw new TypeError("The 'listener' parameter must be a function.");
        if (this._midiInterfaceEvents.indexOf(e) >= 0)
          if (t)
            for (var n = 0; n < this._userHandlers[e].length; n++) this._userHandlers[e][n] === t && this._userHandlers[e].splice(n, 1);
          else this._userHandlers[e] = [];
        else {
          if (void 0 !== e) throw new TypeError("The specified event type is not supported.");
          this._resetInterfaceUserHandlers()
        }
        return this
      }, o.prototype.getInputById = function(e) {
        if (!this.enabled) throw new Error("WebMidi is not enabled.");
        for (var t = 0; t < this.inputs.length; t++)
          if (this.inputs[t].id === e) return this.inputs[t];
        return !1
      }, o.prototype.getOutputById = function(e) {
        if (!this.enabled) throw new Error("WebMidi is not enabled.");
        for (var t = 0; t < this.outputs.length; t++)
          if (this.outputs[t].id === e) return this.outputs[t];
        return !1
      }, o.prototype.getInputByName = function(e) {
        if (!this.enabled) throw new Error("WebMidi is not enabled.");
        for (var t = 0; t < this.inputs.length; t++)
          if (~this.inputs[t].name.indexOf(e)) return this.inputs[t];
        return !1
      }, o.prototype.getOutputByName = function(e) {
        if (!this.enabled) throw new Error("WebMidi is not enabled.");
        for (var t = 0; t < this.outputs.length; t++)
          if (~this.outputs[t].name.indexOf(e)) return this.outputs[t];
        return !1
      }, o.prototype.guessNoteNumber = function(e) {
        var t = !1;
        if (e && e.toFixed && e >= 0 && 127 >= e ? t = Math.round(e) : parseInt(e) >= 0 && parseInt(e) <= 127 ? t = parseInt(e) : ("string" == typeof e || e instanceof String) && (t = this.noteNameToNumber(e)), t === !1) throw new Error("Invalid note number (" + e + ").");
        return t
      }, o.prototype.noteNameToNumber = function(e) {
        "string" != typeof e && (e = "");
        var t = e.match(/([CDEFGAB])(#{0,2}|b{0,2})(-?\d+)/i);
        if (!t) throw new RangeError("Invalid note name.");
        var n = u._semitones[t[1].toUpperCase()],
          r = parseInt(t[3]),
          i = 12 * (r + 2) + n;
        if (t[2].toLowerCase().indexOf("b") > -1 ? i -= t[2].length : t[2].toLowerCase().indexOf("#") > -1 && (i += t[2].length), 0 > n || -2 > r || r > 8 || 0 > i || i > 127) throw new RangeError("Invalid note name or note outside valid range.");
        return i
      }, o.prototype._updateInputsAndOutputs = function() {
        this._updateInputs(), this._updateOutputs()
      }, o.prototype._updateInputs = function() {
        for (var e = 0; e < this._inputs.length; e++) {
          for (var t = !0, n = this.interface.inputs.values(), r = n.next(); r && !r.done; r = n.next())
            if (this._inputs[e]._midiInput === r.value) {
              t = !1;
              break
            }
          t && this._inputs.splice(e, 1)
        }
        this.interface.inputs.forEach(function(e) {
          for (var t = !0, n = 0; n < this._inputs.length; n++) this._inputs[n]._midiInput === e && (t = !1);
          t && this._inputs.push(this._createInput(e))
        }.bind(this))
      }, o.prototype._updateOutputs = function() {
        for (var e = 0; e < this._outputs.length; e++) {
          for (var t = !0, n = this.interface.outputs.values(), r = n.next(); r && !r.done; r = n.next())
            if (this._outputs[e]._midiOutput === r.value) {
              t = !1;
              break
            }
          t && this._outputs.splice(e, 1)
        }
        this.interface.outputs.forEach(function(e) {
          for (var t = !0, n = 0; n < this._outputs.length; n++) this._outputs[n]._midiOutput === e && (t = !1);
          t && this._outputs.push(this._createOutput(e))
        }.bind(this))
      }, o.prototype._createInput = function(e) {
        var t = new s(e);
        return t._midiInput.onmidimessage = t._onMidiMessage.bind(t), t
      }, o.prototype._createOutput = function(e) {
        var t = new a(e);
        return t._midiOutput.onmidimessage = t._onMidiMessage.bind(t), t
      }, o.prototype._onInterfaceStateChange = function(e) {
        if (this._stateChangeQueue.push(e), !this._processingStateChange) {
          for (this._processingStateChange = !0; this._stateChangeQueue.length > 0;) this._processStateChange(this._stateChangeQueue.shift());
          this._processingStateChange = !1
        }
      }, o.prototype._processStateChange = function(e) {
        if (this._updateInputsAndOutputs(), null !== e) {
          var t = {
            timestamp: e.timeStamp,
            type: e.port.state,
            id: e.port.id,
            manufacturer: e.port.manufacturer,
            name: e.port.name
          };
          "connected" === e.port.state && ("output" === e.port.type ? t.output = this.getOutputById(e.port.id) : "input" === e.port.type && (t.input = this.getInputById(e.port.id))), this._userHandlers[e.port.state].forEach(function(e) {
            e(t)
          })
        }
      }, o.prototype._resetInterfaceUserHandlers = function() {
        for (var e = 0; e < this._midiInterfaceEvents.length; e++) this._userHandlers[this._midiInterfaceEvents[e]] = []
      }, s.prototype.addListener = function(e, t, n) {
        var r = this;
        if (void 0 === t && (t = "all"), Array.isArray(t) || (t = [t]), t.forEach(function(e) {
            if ("all" !== e && !(e >= 1 && 16 >= e)) throw new RangeError("The 'channel' parameter is invalid.")
          }), "function" != typeof n) throw new TypeError("The 'listener' parameter must be a function.");
        if (u.MIDI_SYSTEM_MESSAGES[e]) this._userHandlers.system[e] || (this._userHandlers.system[e] = []), this._userHandlers.system[e].push(n);
        else {
          if (!u.MIDI_CHANNEL_MESSAGES[e]) throw new TypeError("The specified event type is not supported.");
          if (t.indexOf("all") > -1) {
            t = [];
            for (var i = 1; 16 >= i; i++) t.push(i)
          }
          this._userHandlers.channel[e] || (this._userHandlers.channel[e] = []), t.forEach(function(t) {
            r._userHandlers.channel[e][t] || (r._userHandlers.channel[e][t] = []), r._userHandlers.channel[e][t].push(n)
          })
        }
        return this
      }, s.prototype.on = s.prototype.addListener, s.prototype.hasListener = function(e, t, n) {
        var r = this;
        if ("function" != typeof n) throw new TypeError("The 'listener' parameter must be a function.");
        if (void 0 === t && (t = "all"), t.constructor !== Array && (t = [t]), u.MIDI_SYSTEM_MESSAGES[e]) {
          for (var i = 0; i < this._userHandlers.system[e].length; i++)
            if (this._userHandlers.system[e][i] === n) return !0
        } else if (u.MIDI_CHANNEL_MESSAGES[e]) {
          if (t.indexOf("all") > -1) {
            t = [];
            for (var o = 1; 16 >= o; o++) t.push(o)
          }
          return !!this._userHandlers.channel[e] && t.every(function(t) {
            var i = r._userHandlers.channel[e][t];
            return i && i.indexOf(n) > -1
          })
        }
        return !1
      }, s.prototype.removeListener = function(e, t, n) {
        var r = this;
        if (void 0 !== n && "function" != typeof n) throw new TypeError("The 'listener' parameter must be a function.");
        if (void 0 === t && (t = "all"), t.constructor !== Array && (t = [t]), u.MIDI_SYSTEM_MESSAGES[e])
          if (void 0 === n) this._userHandlers.system[e] = [];
          else
            for (var i = 0; i < this._userHandlers.system[e].length; i++) this._userHandlers.system[e][i] === n && this._userHandlers.system[e].splice(i, 1);
        else if (u.MIDI_CHANNEL_MESSAGES[e]) {
          if (t.indexOf("all") > -1) {
            t = [];
            for (var o = 1; 16 >= o; o++) t.push(o)
          }
          if (!this._userHandlers.channel[e]) return this;
          t.forEach(function(t) {
            var i = r._userHandlers.channel[e][t];
            if (i)
              if (void 0 === n) r._userHandlers.channel[e][t] = [];
              else
                for (var o = 0; o < i.length; o++) i[o] === n && i.splice(o, 1)
          })
        } else {
          if (void 0 !== e) throw new TypeError("The specified event type is not supported.");
          this._initializeUserHandlers()
        }
        return this
      }, s.prototype._initializeUserHandlers = function() {
        for (var e in u.MIDI_CHANNEL_MESSAGES) u.MIDI_CHANNEL_MESSAGES.hasOwnProperty(e) && (this._userHandlers.channel[e] = {});
        for (var t in u.MIDI_SYSTEM_MESSAGES) u.MIDI_SYSTEM_MESSAGES.hasOwnProperty(t) && (this._userHandlers.system[t] = [])
      }, s.prototype._onMidiMessage = function(e) {
        e.data[0] < 240 ? this._parseChannelEvent(e) : e.data[0] <= 255 && this._parseSystemEvent(e)
      }, s.prototype._parseChannelEvent = function(e) {
        var t, n, r = e.data[0] >> 4,
          i = (15 & e.data[0]) + 1;
        e.data.length > 1 && (t = e.data[1], n = e.data.length > 2 ? e.data[2] : void 0);
        var o = {
          target: this,
          data: e.data,
          timestamp: e.timeStamp,
          channel: i
        };
        r === u.MIDI_CHANNEL_MESSAGES.noteoff || r === u.MIDI_CHANNEL_MESSAGES.noteon && 0 === n ? (o.type = "noteoff", o.note = {
          number: t,
          name: u._notes[t % 12],
          octave: Math.floor(t / 12 - 1) - 3
        }, o.velocity = n / 127, o.rawVelocity = n) : r === u.MIDI_CHANNEL_MESSAGES.noteon ? (o.type = "noteon", o.note = {
          number: t,
          name: u._notes[t % 12],
          octave: Math.floor(t / 12 - 1) - 3
        }, o.velocity = n / 127, o.rawVelocity = n) : r === u.MIDI_CHANNEL_MESSAGES.keyaftertouch ? (o.type = "keyaftertouch", o.note = {
          number: t,
          name: u._notes[t % 12],
          octave: Math.floor(t / 12 - 1) - 3
        }, o.value = n / 127) : r === u.MIDI_CHANNEL_MESSAGES.controlchange && t >= 0 && 119 >= t ? (o.type = "controlchange", o.controller = {
          number: t,
          name: this.getCcNameByNumber(t)
        }, o.value = n) : r === u.MIDI_CHANNEL_MESSAGES.channelmode && t >= 120 && 127 >= t ? (o.type = "channelmode", o.controller = {
          number: t,
          name: this.getChannelModeByNumber(t)
        }, o.value = n) : r === u.MIDI_CHANNEL_MESSAGES.programchange ? (o.type = "programchange", o.value = t) : r === u.MIDI_CHANNEL_MESSAGES.channelaftertouch ? (o.type = "channelaftertouch", o.value = t / 127) : r === u.MIDI_CHANNEL_MESSAGES.pitchbend ? (o.type = "pitchbend", o.value = ((n << 7) + t - 8192) / 8192) : o.type = "unknownchannelmessage", this._userHandlers.channel[o.type] && this._userHandlers.channel[o.type][i] && this._userHandlers.channel[o.type][i].forEach(function(e) {
          e(o)
        })
      }, s.prototype.getCcNameByNumber = function(e) {
        if (e = parseInt(e), !(e >= 0 && 119 >= e)) throw new RangeError("The control change number must be between 0 and 119.");
        for (var t in u.MIDI_CONTROL_CHANGE_MESSAGES)
          if (e === u.MIDI_CONTROL_CHANGE_MESSAGES[t]) return t
      }, s.prototype.getChannelModeByNumber = function(e) {
        if (e = parseInt(e), !(e >= 120 && status <= 127)) throw new RangeError("The control change number must be between 120 and 127.");
        for (var t in u.MIDI_CHANNEL_MODE_MESSAGES)
          if (e === u.MIDI_CHANNEL_MODE_MESSAGES[t]) return t
      }, s.prototype._parseSystemEvent = function(e) {
        var t = e.data[0],
          n = {
            target: this,
            data: e.data,
            timestamp: e.timeStamp
          };
        t === u.MIDI_SYSTEM_MESSAGES.sysex ? n.type = "sysex" : t === u.MIDI_SYSTEM_MESSAGES.timecode ? n.type = "timecode" : t === u.MIDI_SYSTEM_MESSAGES.songposition ? n.type = "songposition" : t === u.MIDI_SYSTEM_MESSAGES.songselect ? (n.type = "songselect", n.song = e.data[1]) : t === u.MIDI_SYSTEM_MESSAGES.tuningrequest ? n.type = "tuningrequest" : t === u.MIDI_SYSTEM_MESSAGES.clock ? n.type = "clock" : t === u.MIDI_SYSTEM_MESSAGES.start ? n.type = "start" : t === u.MIDI_SYSTEM_MESSAGES.continue ? n.type = "continue" : t === u.MIDI_SYSTEM_MESSAGES.stop ? n.type = "stop" : t === u.MIDI_SYSTEM_MESSAGES.activesensing ? n.type = "activesensing" : t === u.MIDI_SYSTEM_MESSAGES.reset ? n.type = "reset" : n.type = "unknownsystemmessage", this._userHandlers.system[n.type] && this._userHandlers.system[n.type].forEach(function(e) {
          e(n)
        })
      }, a.prototype.send = function(e, t, n) {
        if (!(e >= 128 && 255 >= e)) throw new RangeError("The status byte must be an integer between 128 (0x80) and 255 (0xFF).");
        Array.isArray(t) || (t = parseInt(t) >= 0 && parseInt(t) <= 127 ? [parseInt(t)] : []);
        var r = [e];
        return t.forEach(function(e) {
          if (!(e >= 0 && 255 >= e)) throw new RangeError("The data bytes must be integers between 0 (0x00) and 255 (0xFF).");
          r.push(e)
        }), this._midiOutput.send(r, parseFloat(n) || 0), this
      }, a.prototype.sendSysex = function(e, t, n) {
        if (!u.sysexEnabled) throw new Error("SysEx message support must first be activated.");
        return n = n || {}, e = [].concat(e), t.forEach(function(e) {
          if (0 > e || e > 127) throw new RangeError("The data bytes of a SysEx message must be integers between 0 (0x00) and 127 (0x7F).")
        }), t = e.concat(t, u.MIDI_SYSTEM_MESSAGES.sysexend), this.send(u.MIDI_SYSTEM_MESSAGES.sysex, t, n.time), this
      }, a.prototype.sendTimecodeQuarterFrame = function(e, t) {
        return t = t || {}, this.send(u.MIDI_SYSTEM_MESSAGES.timecode, e, t.time), this
      }, a.prototype.sendSongPosition = function(e, t) {
        e = parseInt(e) || 0, t = t || {};
        var n = e >> 7 & 127,
          r = 127 & e;
        return this.send(u.MIDI_SYSTEM_MESSAGES.songposition, [n, r], t.time), this
      }, a.prototype.sendSongSelect = function(e, t) {
        if (e = parseInt(e), t = t || {}, !(e >= 0 && 127 >= e)) throw new RangeError("The song number must be between 0 and 127.");
        return this.send(u.MIDI_SYSTEM_MESSAGES.songselect, [e], t.time), this
      }, a.prototype.sendTuningRequest = function(e) {
        return e = e || {}, this.send(u.MIDI_SYSTEM_MESSAGES.tuningrequest, void 0, e.time), this
      }, a.prototype.sendClock = function(e) {
        return e = e || {}, this.send(u.MIDI_SYSTEM_MESSAGES.clock, void 0, e.time), this
      }, a.prototype.sendStart = function(e) {
        return e = e || {}, this.send(u.MIDI_SYSTEM_MESSAGES.start, void 0, e.time), this
      }, a.prototype.sendContinue = function(e) {
        return e = e || {}, this.send(u.MIDI_SYSTEM_MESSAGES.continue, void 0, e.time), this
      }, a.prototype.sendStop = function(e) {
        return e = e || {}, this.send(u.MIDI_SYSTEM_MESSAGES.stop, void 0, e.time), this
      }, a.prototype.sendActiveSensing = function(e) {
        return e = e || {}, this.send(u.MIDI_SYSTEM_MESSAGES.activesensing, void 0, e.time), this
      }, a.prototype.sendReset = function(e) {
        return e = e || {}, this.send(u.MIDI_SYSTEM_MESSAGES.reset, void 0, e.time), this
      }, a.prototype.stopNote = function(e, t, n) {
        if ("all" === e) return this.sendChannelMode("allnotesoff", 0, t, n);
        var r = 64;
        return n = n || {}, n.velocity = parseFloat(n.velocity), n.rawVelocity ? !isNaN(n.velocity) && n.velocity >= 0 && n.velocity <= 127 && (r = n.velocity) : !isNaN(n.velocity) && n.velocity >= 0 && n.velocity <= 1 && (r = 127 * n.velocity), this._convertNoteToArray(e).forEach(function(e) {
          this._convertChannelToArray(t).forEach(function(t) {
            this.send((u.MIDI_CHANNEL_MESSAGES.noteoff << 4) + (t - 1), [e, Math.round(r)], this._parseTimeParameter(n.time))
          }.bind(this))
        }.bind(this)), this
      }, a.prototype.playNote = function(e, t, n) {
        var r = 64;
        if (n = n || {}, n.velocity = parseFloat(n.velocity), n.rawVelocity ? !isNaN(n.velocity) && n.velocity >= 0 && n.velocity <= 127 && (r = n.velocity) : !isNaN(n.velocity) && n.velocity >= 0 && n.velocity <= 1 && (r = 127 * n.velocity), n.time = this._parseTimeParameter(n.time) || 0, this._convertNoteToArray(e).forEach(function(e) {
            this._convertChannelToArray(t).forEach(function(t) {
              this.send((u.MIDI_CHANNEL_MESSAGES.noteon << 4) + (t - 1), [e, Math.round(r)], n.time)
            }.bind(this))
          }.bind(this)), void 0 !== n.duration) {
          var i = 64;
          n.release = parseFloat(n.release), n.rawVelocity ? !isNaN(n.release) && n.release >= 0 && n.release <= 127 && (i = n.release) : !isNaN(n.release) && n.release >= 0 && n.release <= 1 && (i = 127 * n.release), this._convertNoteToArray(e).forEach(function(e) {
            this._convertChannelToArray(t).forEach(function(t) {
              this.send((u.MIDI_CHANNEL_MESSAGES.noteoff << 4) + (t - 1), [e, Math.round(i)], n.time + n.duration)
            }.bind(this))
          }.bind(this))
        }
        return this
      }, a.prototype.sendKeyAftertouch = function(e, t, n, r) {
        var i = this;
        if (r = r || {}, 1 > t || t > 16) throw new RangeError("The channel must be between 1 and 16.");
        n = parseFloat(n), (isNaN(n) || 0 > n || n > 1) && (n = .5);
        var o = Math.round(127 * n);
        return this._convertNoteToArray(e).forEach(function(e) {
          i._convertChannelToArray(t).forEach(function(t) {
            i.send((u.MIDI_CHANNEL_MESSAGES.keyaftertouch << 4) + (t - 1), [e, o], i._parseTimeParameter(r.time))
          })
        }), this
      }, a.prototype.sendControlChange = function(e, t, n, r) {
        if (r = r || {}, "string" == typeof e) {
          if (e = u.MIDI_CONTROL_CHANGE_MESSAGES[e], !e) throw new TypeError("Invalid controller name.")
        } else if (e = parseInt(e), !(e >= 0 && 119 >= e)) throw new RangeError("Controller numbers must be between 0 and 119.");
        if (t = parseInt(t) || 0, !(t >= 0 && 127 >= t)) throw new RangeError("Controller value must be between 0 and 127.");
        return this._convertChannelToArray(n).forEach(function(n) {
          this.send((u.MIDI_CHANNEL_MESSAGES.controlchange << 4) + (n - 1), [e, t], this._parseTimeParameter(r.time))
        }.bind(this)), this
      }, a.prototype._selectRegisteredParameter = function(e, t, n) {
        var r = this;
        if (e[0] = parseInt(e[0]), !(e[0] >= 0 && e[0] <= 127)) throw new RangeError("The control65 value must be between 0 and 127");
        if (e[1] = parseInt(e[1]), !(e[1] >= 0 && e[1] <= 127)) throw new RangeError("The control64 value must be between 0 and 127");
        return this._convertChannelToArray(t).forEach(function(i) {
          r.sendControlChange(101, e[0], t, {
            time: n
          }), r.sendControlChange(100, e[1], t, {
            time: n
          })
        }), this
      }, a.prototype._selectNonRegisteredParameter = function(e, t, n) {
        var r = this;
        if (e[0] = parseInt(e[0]), !(e[0] >= 0 && e[0] <= 127)) throw new RangeError("The control63 value must be between 0 and 127");
        if (e[1] = parseInt(e[1]), !(e[1] >= 0 && e[1] <= 127)) throw new RangeError("The control62 value must be between 0 and 127");
        return this._convertChannelToArray(t).forEach(function(i) {
          r.sendControlChange(99, e[0], t, {
            time: n
          }), r.sendControlChange(98, e[1], t, {
            time: n
          })
        }), this
      }, a.prototype._setCurrentRegisteredParameter = function(e, t, n) {
        var r = this;
        if (e = [].concat(e), e[0] = parseInt(e[0]), !(e[0] >= 0 && e[0] <= 127)) throw new RangeError("The msb value must be between 0 and 127");
        return this._convertChannelToArray(t).forEach(function(i) {
          r.sendControlChange(6, e[0], t, {
            time: n
          })
        }), e[1] = parseInt(e[1]), e[1] >= 0 && e[1] <= 127 && this._convertChannelToArray(t).forEach(function(i) {
          r.sendControlChange(38, e[1], t, {
            time: n
          })
        }), this
      }, a.prototype._deselectRegisteredParameter = function(e, t) {
        var n = this;
        return this._convertChannelToArray(e).forEach(function(r) {
          n.sendControlChange(101, 127, e, {
            time: t
          }), n.sendControlChange(100, 127, e, {
            time: t
          })
        }), this
      }, a.prototype.setRegisteredParameter = function(e, t, n, r) {
        var i = this;
        if (r = r || {}, !Array.isArray(e)) {
          if (!u.MIDI_REGISTERED_PARAMETER[e]) throw new Error("The specified parameter is not available.");
          e = u.MIDI_REGISTERED_PARAMETER[e]
        }
        return this._convertChannelToArray(n).forEach(function(o) {
          i._selectRegisteredParameter(e, n, r.time), i._setCurrentRegisteredParameter(t, n, r.time), i._deselectRegisteredParameter(n, r.time)
        }), this
      }, a.prototype.setNonRegisteredParameter = function(e, t, n, r) {
        var i = this;
        if (r = r || {}, !(e[0] >= 0 && e[0] <= 127 && e[1] >= 0 && e[1] <= 127)) throw new Error("Position 0 and 1 of the 2-position parameter array must both be between 0 and 127.");
        return t = [].concat(t), this._convertChannelToArray(n).forEach(function(o) {
          i._selectNonRegisteredParameter(e, n, r.time), i._setCurrentRegisteredParameter(t, n, r.time), i._deselectRegisteredParameter(n, r.time)
        }), this
      }, a.prototype.incrementRegisteredParameter = function(e, t, n) {
        var r = this;
        if (n = n || {}, !Array.isArray(e)) {
          if (!u.MIDI_REGISTERED_PARAMETER[e]) throw new Error("The specified parameter is not available.");
          e = u.MIDI_REGISTERED_PARAMETER[e]
        }
        return this._convertChannelToArray(t).forEach(function(i) {
          r._selectRegisteredParameter(e, t, n.time), r.sendControlChange(96, 0, t, {
            time: n.time
          }), r._deselectRegisteredParameter(t, n.time)
        }), this
      }, a.prototype.decrementRegisteredParameter = function(e, t, n) {
        if (n = n || {}, !Array.isArray(e)) {
          if (!u.MIDI_REGISTERED_PARAMETER[e]) throw new TypeError("The specified parameter is not available.");
          e = u.MIDI_REGISTERED_PARAMETER[e]
        }
        return this._convertChannelToArray(t).forEach(function(r) {
          this._selectRegisteredParameter(e, t, n.time), this.sendControlChange(97, 0, t, {
            time: n.time
          }), this._deselectRegisteredParameter(t, n.time)
        }.bind(this)), this
      }, a.prototype.setPitchBendRange = function(e, t, n, r) {
        var i = this;
        if (r = r || {}, e = parseInt(e) || 0, !(e >= 0 && 127 >= e)) throw new RangeError("The semitones value must be between 0 and 127");
        if (t = parseInt(t) || 0, !(t >= 0 && 127 >= t)) throw new RangeError("The cents value must be between 0 and 127");
        return this._convertChannelToArray(n).forEach(function(o) {
          i.setRegisteredParameter("pitchbendrange", [e, t], n, {
            time: r.time
          })
        }), this
      }, a.prototype.setModulationRange = function(e, t, n, r) {
        var i = this;
        if (r = r || {}, e = parseInt(e) || 0, !(e >= 0 && 127 >= e)) throw new RangeError("The semitones value must be between 0 and 127");
        if (t = parseInt(t) || 0, !(t >= 0 && 127 >= t)) throw new RangeError("The cents value must be between 0 and 127");
        return this._convertChannelToArray(n).forEach(function(o) {
          i.setRegisteredParameter("modulationrange", [e, t], n, {
            time: r.time
          })
        }), this
      }, a.prototype.setMasterTuning = function(e, t, n) {
        var r = this;
        if (n = n || {}, e = parseFloat(e) || 0, -65 >= e || e >= 64) throw new RangeError("The value must be a decimal number larger than -65 and smaller than 64.");
        var i = parseInt(e) + 64,
          o = e - parseInt(e);
        o = Math.round((o + 1) / 2 * 16383);
        var s = o >> 7 & 127,
          a = 127 & o;
        return this._convertChannelToArray(t).forEach(function(e) {
          r.setRegisteredParameter("channelcoarsetuning", i, t, {
            time: n.time
          }), r.setRegisteredParameter("channelfinetuning", [s, a], t, {
            time: n.time
          })
        }), this
      }, a.prototype.setTuningProgram = function(e, t, n) {
        var r = this;
        if (n = n || {}, e = parseInt(e) || 0, !(e >= 0 && 127 >= e)) throw new RangeError("The program value must be between 0 and 127");
        return this._convertChannelToArray(t).forEach(function(i) {
          r.setRegisteredParameter("tuningprogram", e, t, {
            time: n.time
          })
        }), this
      }, a.prototype.setTuningBank = function(e, t, n) {
        var r = this;
        if (n = n || {}, e = parseInt(e) || 0, !(e >= 0 && 127 >= e)) throw new RangeError("The bank value must be between 0 and 127");
        return this._convertChannelToArray(t).forEach(function(i) {
          r.setRegisteredParameter("tuningbank", e, t, {
            time: n.time
          })
        }), this
      }, a.prototype.sendChannelMode = function(e, t, n, r) {
        var i = this;
        if (r = r || {}, "string" == typeof e) {
          if (e = u.MIDI_CHANNEL_MODE_MESSAGES[e], !e) throw new TypeError("Invalid channel mode message name.")
        } else if (e = parseInt(e), !(e >= 120 && 127 >= e)) throw new RangeError("Channel mode numerical identifiers must be between 120 and 127.");
        if (t = parseInt(t), isNaN(t) || 0 > t || t > 127) throw new RangeError("Value must be integers between 0 and 127.");
        return this._convertChannelToArray(n).forEach(function(n) {
          i.send((u.MIDI_CHANNEL_MESSAGES.channelmode << 4) + (n - 1), [e, t], i._parseTimeParameter(r.time))
        }), this
      }, a.prototype.sendProgramChange = function(e, t, n) {
        var r = this;
        if (n = n || {}, e = parseInt(e), isNaN(e) || 0 > e || e > 127) throw new RangeError("Program numbers must be between 0 and 127.");
        return this._convertChannelToArray(t).forEach(function(t) {
          r.send((u.MIDI_CHANNEL_MESSAGES.programchange << 4) + (t - 1), [e], r._parseTimeParameter(n.time))
        }), this
      }, a.prototype.sendChannelAftertouch = function(e, t, n) {
        var r = this;
        n = n || {}, e = parseFloat(e), (isNaN(e) || 0 > e || e > 1) && (e = .5);
        var i = Math.round(127 * e);
        return this._convertChannelToArray(t).forEach(function(e) {
          r.send((u.MIDI_CHANNEL_MESSAGES.channelaftertouch << 4) + (e - 1), [i], r._parseTimeParameter(n.time))
        }), this
      }, a.prototype.sendPitchBend = function(e, t, n) {
        var r = this;
        if (n = n || {}, e = parseFloat(e), isNaN(e) || -1 > e || e > 1) throw new RangeError("Pitch bend value must be between -1 and 1.");
        var i = Math.round((e + 1) / 2 * 16383),
          o = i >> 7 & 127,
          s = 127 & i;
        return this._convertChannelToArray(t).forEach(function(e) {
          r.send((u.MIDI_CHANNEL_MESSAGES.pitchbend << 4) + (e - 1), [s, o], r._parseTimeParameter(n.time))
        }), this
      }, a.prototype._parseTimeParameter = function(e) {
        var t;
        if (void 0 === e) return 0;
        if (e && e.substring && "+" === e.substring(0, 1)) {
          if (t = parseFloat(e), !t) throw new TypeError("Invalid relative time format.");
          return t + u.time
        }
        if (t = parseFloat(e), !t) throw new TypeError("Invalid absolute time format.");
        return t
      }, a.prototype._convertNoteToArray = function(e) {
        var t = [];
        return Array.isArray(e) || (e = [e]), e.forEach(function(e) {
          t.push(u.guessNoteNumber(e))
        }), t
      }, a.prototype._convertChannelToArray = function(e) {
        if (("all" === e || void 0 === e) && (e = ["all"]), Array.isArray(e) || (e = [e]), e.indexOf("all") > -1) {
          e = [];
          for (var t = 1; 16 >= t; t++) e.push(t)
        }
        return e.forEach(function(e) {
          if (!(e >= 1 && 16 >= e)) throw new RangeError("MIDI channels must be between 1 and 16.")
        }), e
      }, a.prototype._onMidiMessage = function(e) {}, r = [], i = function() {
        return u
      }.apply(t, r), !(void 0 !== i && (e.exports = i))
    }(this)
  }])
});
