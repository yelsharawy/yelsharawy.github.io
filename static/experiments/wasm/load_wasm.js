// const terminal = ttty.initTerminal({
//     host: document.querySelector("#terminal"),
//     prompt: "user@ttty:~$ ",
//     commands: {},
// })

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// function nulTermToString(ptr) {
//     let dec = new TextDecoder("utf-8");
//     let buffer = inst_src.instance.exports.memory.buffer;
//     let u8arr = new Uint8Array(buffer, ptr, buffer.length);
    
//     // console.log(u8arr);
//     // var nulTerm = 0;
//     // while (u8arr[nulTerm] != 0) nulTerm++;
//     const len = u8arr.findIndex((x,i) => x == 0);
//     console.log(len);
    
//     return String.fromCodePoint.apply(null, u8arr.subarray(0, len));
// }

const importObject = {
    env: {
        display(ptr, len) {
            let buffer = inst_src.instance.exports.memory.buffer;
            let u8arr = new Uint8Array(buffer, ptr, len);
            let str = String.fromCodePoint.apply(null, u8arr.subarray(0, len));
            document.getElementById("output").textContent += str;
        },
    },
};

WebAssembly.instantiateStreaming(fetch(document.currentScript.getAttribute("data-url")), importObject)
    .then((inst_src) => {
        console.log(inst_src);
        globalThis.inst_src = inst_src;
        inst_src.instance.exports._start();
    })
    .catch((reason) => {
        console.error(reason);
    });