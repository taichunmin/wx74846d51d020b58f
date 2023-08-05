Component({
    properties: {
        mode: {
            type: Number,
            value: 0
        },
        cardType: {
            type: String,
            value: ""
        },
        addCard: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        addCard: function() {
            this.triggerEvent("addCard", {
                showModal: !0
            });
        }
    }
});