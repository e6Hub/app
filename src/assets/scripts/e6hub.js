class Main {
    onload() {
        Array.prototype.so = function(cb) {
            return new Promise((res, rej) => {
                try {
                    let c = 0;
                    for (;c<this.length;) {
                        cb(this[c]);
                        if (c == this.length - 1) return res();
                        ++c;
                    }
                } catch (e) {
                    return rej(e);
                }
            })
        }
    }
}