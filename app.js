const form = document.querySelector('#calc-form');
const input = document.querySelector('#input');
const equation = document.querySelector('#eq');
let eq = '';
let currentVal = '';
let result = '';
const opers = /[x/+-]/;

// Load button event listeners
buttonEventListeners();

function buttonEventListeners(){
    form.querySelectorAll('button').forEach(function(btn){
        if(btn.classList.contains('num')){
            btn.addEventListener('click', numInput);
        } else if(btn.classList.contains('oper')){
            btn.addEventListener('click', operInput);
        } else if(btn.id == 'sign'){
            btn.addEventListener('click', signInput);
        } else if(btn.id == 'percent'){
            btn.addEventListener('click', percInput);
        } else if(btn.id == 'clear'){
            btn.addEventListener('click', clearInput);
        }
    })
}

function calculate(){
    if(eq.match(opers) == ''){
        equation.innerHTML = eq;
        input.innerHTML = currentVal;
    } else if(eq == '' && currentVal == ''){
        input.innerHTML = '0';
    } else if(result != ''){
        eq = result;
        equation.innerHTML = eq;
    } else {
        result = eval(eq);
        eq += '=';
        eq += result;
        equation.innerHTML = eq;
        input.innerHTML = result;
        currentVal = '';
    }
}

function numInput(e){
    if(currentVal === '' && e.target.value === '0'){
        input.innerHTML = e.target.value;
    } else if(currentVal.includes('.') && e.target.value === '.'){
        input.innerHTML = currentVal;
    } else if(eq.match(opers) != '' && result != ''){
        eq = '';
        result = '';
        currentVal += e.target.value;
        input.innerHTML = currentVal;
        eq = currentVal;
        equation.innerHTML = eq;
    } else if(eq.match(opers) != ''){
        currentVal += e.target.value;
        input.innerHTML = currentVal;
        eq += e.target.value;
        equation.innerHTML = eq;
    } else {
        currentVal += e.target.value;
        input.innerHTML = currentVal;
        eq = currentVal;
        equation.innerHTML = eq;
    }
}

function operInput(e){
    if(e.target.id == 'equals'){
        calculate();
    } else if(isNaN(eq[eq.length-1]) && eq != ''){
        eq = eq.substring(0, (eq.length-1));
        eq += e.target.value;
        equation.innerHTML = eq;
    } else if((currentVal == '' && result != '') || result == '0'){
        eq = '';
        eq = result;
        eq += e.target.value;
        equation.innerHTML = eq;
        result = '';
    } else if(currentVal != ''){
        eq += e.target.value;
        equation.innerHTML = eq;
        currentVal = '';
    }
}

function signInput(e){
    console.log(`This will change the sign: ${e.target.value}.`);
}

function percInput(e){
    console.log(`This will change the current value to a decimal.`);
}

function clearInput(){
    input.innerHTML = '0';
    currentVal = '';
    eq = '';
    result = '';
    equation.innerHTML = eq;
}
