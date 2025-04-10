var t = function() {
    return (t = Object.assign || function(t) {
        for (var e, a = 1, i = arguments.length; a < i; a++) for (var n in e = arguments[a]) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t;
    }).apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../common/component"), a = require("../common/validator");

function i(t, e) {
    return String(t) === String(e);
}

(0, e.VantComponent)({
    field: !0,
    classes: [ "input-class", "plus-class", "minus-class" ],
    props: {
        value: {
            type: null,
            observer: "observeValue"
        },
        integer: {
            type: Boolean,
            observer: "check"
        },
        disabled: Boolean,
        inputWidth: String,
        buttonSize: String,
        asyncChange: Boolean,
        disableInput: Boolean,
        decimalLength: {
            type: Number,
            value: null,
            observer: "check"
        },
        min: {
            type: null,
            value: 1,
            observer: "check"
        },
        max: {
            type: null,
            value: Number.MAX_SAFE_INTEGER,
            observer: "check"
        },
        step: {
            type: null,
            value: 1
        },
        showPlus: {
            type: Boolean,
            value: !0
        },
        showMinus: {
            type: Boolean,
            value: !0
        },
        disablePlus: Boolean,
        disableMinus: Boolean,
        longPress: {
            type: Boolean,
            value: !0
        },
        theme: String,
        alwaysEmbed: Boolean
    },
    data: {
        currentValue: ""
    },
    created: function() {
        this.setData({
            currentValue: this.format(this.data.value)
        });
    },
    methods: {
        observeValue: function() {
            var t = this.data, e = t.value;
            i(e, t.currentValue) || this.setData({
                currentValue: this.format(e)
            });
        },
        check: function() {
            var t = this.format(this.data.currentValue);
            i(t, this.data.currentValue) || this.setData({
                currentValue: t
            });
        },
        isDisabled: function(t) {
            var e = this.data, a = e.disabled, i = e.disablePlus, n = e.disableMinus, s = e.currentValue, r = e.max, o = e.min;
            return "plus" === t ? a || i || s >= r : a || n || s <= o;
        },
        onFocus: function(t) {
            this.$emit("focus", t.detail);
        },
        onBlur: function(e) {
            var a = this.format(e.detail.value);
            this.$emit("blur", t(t({}, e.detail), {
                value: a
            }));
        },
        filter: function(t) {
            return t = String(t).replace(/[^0-9.-]/g, ""), this.data.integer && -1 !== t.indexOf(".") && (t = t.split(".")[0]), 
            t;
        },
        format: function(t) {
            return t = "" === (t = this.filter(t)) ? 0 : +t, t = Math.max(Math.min(this.data.max, t), this.data.min), 
            (0, a.isDef)(this.data.decimalLength) && (t = t.toFixed(this.data.decimalLength)), 
            t;
        },
        onInput: function(t) {
            var e = (t.detail || {}).value, i = void 0 === e ? "" : e;
            if ("" !== i) {
                var n = this.filter(i);
                if ((0, a.isDef)(this.data.decimalLength) && -1 !== n.indexOf(".")) {
                    var s = n.split(".");
                    n = "".concat(s[0], ".").concat(s[1].slice(0, this.data.decimalLength));
                }
                this.emitChange(n);
            }
        },
        emitChange: function(t) {
            this.data.asyncChange || this.setData({
                currentValue: t
            }), this.$emit("change", t);
        },
        onChange: function() {
            var t = this.type;
            if (this.isDisabled(t)) this.$emit("overlimit", t); else {
                var e, a, i, n = "minus" === t ? -this.data.step : +this.data.step, s = this.format((e = +this.data.currentValue, 
                a = n, i = Math.pow(10, 10), Math.round((e + a) * i) / i));
                this.emitChange(s), this.$emit(t);
            }
        },
        longPressStep: function() {
            var t = this;
            this.longPressTimer = setTimeout(function() {
                t.onChange(), t.longPressStep();
            }, 200);
        },
        onTap: function(t) {
            var e = t.currentTarget.dataset.type;
            this.type = e, this.onChange();
        },
        onTouchStart: function(t) {
            var e = this;
            if (this.data.longPress) {
                clearTimeout(this.longPressTimer);
                var a = t.currentTarget.dataset.type;
                this.type = a, this.isLongPress = !1, this.longPressTimer = setTimeout(function() {
                    e.isLongPress = !0, e.onChange(), e.longPressStep();
                }, 600);
            }
        },
        onTouchEnd: function() {
            this.data.longPress && clearTimeout(this.longPressTimer);
        }
    }
});