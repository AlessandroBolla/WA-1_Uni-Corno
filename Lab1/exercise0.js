'use strict'

let s = ['do', 'giovanni', 'giacomo'];

let ar = s.map(el => el.split(""));
console.log(ar);
ar.forEach((el, i, vet) => {
    if(el.length > 2)
        el.splice(2, el.length - 4);
    else vet[i] = []; 
});
ar.forEach(a => console.log(a.join('')));