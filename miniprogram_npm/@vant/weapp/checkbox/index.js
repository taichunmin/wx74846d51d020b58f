Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../common/relation");

function a(e, a) {
    e.$emit("input", a), e.$emit("change", a);
}

(0, require("../common/component").VantComponent)({
    field: !0,
    relation: (0, e.useParent)("checkbox-group"),
    classes: [ "icon-class", "label-class" ],
    props: {
        value: Boolean,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: {
            type: String,
            value: "right"
        },
        labelDisabled: Boolean,
        shape: {
            type: String,
            value: "round"
        },
        iconSize: {
            type: null,
            value: 20
        }
    },
    data: {
        parentDisabled: !1,
        direction: "vertical"
    },
    methods: {
        emitChange: function(e) {
            this.parent ? this.setParentValue(this.parent, e) : a(this, e);
        },
        toggle: function() {
            var e = this.data, a = e.parentDisabled, t = e.disabled, i = e.value;
            t || a || this.emitChange(!i);
        },
        onClickLabel: function() {
            var e = this.data, a = e.labelDisabled, t = e.parentDisabled, i = e.disabled, n = e.value;
            i || a || t || this.emitChange(!n);
        },
        setParentValue: function(e, t) {
            var i = e.data.value.slice(), n = this.data.name, l = e.data.max;
            if (t) {
                if (l && i.length >= l) return;
                -1 === i.indexOf(n) && (i.push(n), a(e, i));
            } else {
                var o = i.indexOf(n);
                -1 !== o && (i.splice(o, 1), a(e, i));
            }
        }
    }
});