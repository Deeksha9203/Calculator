const numbersDiv = document.getElementById("calc-numbers")
const actionsDiv = document.getElementById("calc-actions")
const resultBox = document.getElementById("result-box")
// let initialValue = document.getElementById("result-box")
let initialValue = resultBox.getAttribute("value")
let resFn = null


/*
    calc operations --> curried (function returning another function)
*/
const times = (y) => (x) => y * x
const plus = (y) => (x) => y + x
const subtract = (y) => (x) => y - x
const divide = (y) => (x) => y / x
const equals = () => {
    // your code here
}

/*
    all possible operations that calc can handle
*/
const calcMap = {
    '+': plus,
    '-': subtract,
    '*': times,
    '/': divide,
    '=': equals
}


/*
    creating buttons based on configurations (params) passed
*/
const createButton = (text, id, className) => {
    const button = document.createElement("button")
    button.setAttribute("id", id)
    button.setAttribute("class", className)
    button.innerHTML = text
    return button
}

/*
    click handler for numbers
*/
const handleNumberClick = (event) => {
    let updatedValue
    

    updatedValue = (initialValue < 1) ? event.target.innerText : initialValue + event.target.innerText
    initialValue = updatedValue
    
    resultBox.setAttribute("value", updatedValue)
}

/*
    creating numbers div and attaching click event handlers
*/
for (let i = 9; i >= 0; i--) {
    const button = createButton(i, `button-${i}`, "calc-number")
    numbersDiv.appendChild(button)
    button.addEventListener('click', handleNumberClick)
    
}

/*
    click handler for operators
*/
const onOperationclick = (event) => {
    currentValue = resultBox.getAttribute("value")
    if (!resFn) {
        const operator = event.target.innerText
        resFn = calcMap[operator](+currentValue)
    } else {
        const value = resultBox.getAttribute("value")
        const updatedValue = resFn(+value)
        resFn = null
        resultBox.setAttribute("value", updatedValue)
    }
}

/*
    attaching click event handlers to all the operators
*/
Object.keys(calcMap).forEach(item => {
    const button = createButton(item, `button-${item}`, "calc-action")
    button.addEventListener('click', onOperationclick)
    actionsDiv.appendChild(button)
})