
export const domState = {
    update: function(id, obj) {
        this.result[id] = { ...this.result[id], ...obj };
    },
    result: {},
};
