const [num1, setNum1] = useState(0);
const [num2, setNum2] = useState(0);
const [result, setResult] = useState(0);

function sum(){
    setResult(num1 + num2);
}

function sub(){
    setResult(num1 - num2);
}

function mult(){
    setResult(num1 * num2);
}

function div(){
    setResult(num1 / num2);
}

function clear(){
    setResult(0);
    setNum2(0);
    setNum1(0);
}