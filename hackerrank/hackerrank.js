
function printLinkedList(head) {
    console.log(head);
    while(head.next) {
        console.log(head.next);
        head = head.next;
    }
}
































// const place = document.getElementById('res');
// const btns = document.querySelectorAll('button');
// let firstOperand = '';
// let secondOperand = '';
// let sign = '';
// let signed = false;

// function print(text, newLine = false) {
//     if (newLine) {
//         place.textContent = text;
//     } else  {
//         place.textContent += text;
//     }
// }

// btns[0].addEventListener('click', (e) => {
//     if (signed) {
//         secondOperand += e.target.textContent;
//     } else {
//         firstOperand += e.target.textContent;
//     }
//     print(e.target.textContent);
// })

// btns[1].addEventListener('click', (e) => {
//     if (signed) {
//         secondOperand += e.target.textContent;
//     } else {
//         firstOperand += e.target.textContent;
//     }
//     print(e.target.textContent);
// })

// btns[2].addEventListener('click', (e) => {
//     sign = '';
//     secondOperand = '';
//     firstOperand = '';
//     signed = false;
    
//     print('', true);
// })

// btns[3].addEventListener('click', (e) => {
//     let a = parseInt( firstOperand, 2 );
//     let b = parseInt( secondOperand, 2 );

//     let rez = eval(`${a}${sign}${b}`)
//     console.log(`${a}${sign}${b}`, rez)
//     firstOperand = '';
//     secondOperand = '';
//     sign = '';
//     signed = false;

//     let reversedRez = '';
//     let binaryRez = (rez >>> 0).toString(2);
//     for (let i = binaryRez.length - 1; i >= 0; i--) {
//         reversedRez += binaryRez[i];
//     }

//     print(reversedRez, true);
// })




// btns[4].addEventListener('click', (e) => {
    
//     sign += e.target.textContent;
//     signed = true;
    
//     print(e.target.textContent);
// })
// btns[5].addEventListener('click', (e) => {
    
//     sign += e.target.textContent;
//     signed = true;
    
//     print(e.target.textContent);
// })
// btns[6].addEventListener('click', (e) => {
    
//     sign += e.target.textContent;
//     signed = true;
    
//     print(e.target.textContent);
// })
// btns[7].addEventListener('click', (e) => {
    
//     sign += e.target.textContent;
//     signed = true;
    
//     print(e.target.textContent);
// })



































// let button = document.createElement('button');
// button.textContent = 0;
// button.id = 'btn';
// button.addEventListener('click', (e) => {
//     e.target.textContent = +e.target.textContent + 1;  
// })

// document.body.appendChild(button);


// function sides(literals, ...expressions) {
//     let array = [];
//     array[0] = (expressions[0] + Math.sqrt(expressions[0] * expressions[0] - 16 * expressions[1])) / 4;
//     array[0] = (expressions[0] - Math.sqrt(expressions[0] * expressions[0] - 16 * expressions[1])) / 4;

//     return array.sort((a, b) => {
//         return a - b
//     });
// }

// let s1 = 10;
// let s2 = 14;

// const [x, y] = sides`The area is: ${s1 * s2}.\nThe perimeter is: ${2 * (s1 + s2)}.`;
// console.log(x, y);


// function regexVar() {

//     let re = /^[a, e, i, o, u].*[a, e, i, o, u]$/;

//     return re;
// }

