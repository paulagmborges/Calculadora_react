
import { useState } from "react";
import "./Calculator.css"


const Calculator = () =>{
    const [currentValue, setCurrentValue] = useState('0')
    const [pendingOperation, setPedingOperation] = useState(null)
    const[pendingValue, setPedingvalue] = useState(null)
    const [completeOperation, setCompleteOperation] = useState("")

    const keypadNumbers = ['1','2','3','4','5','6','7','8','9']
    const operations =['+','-','*','/']

    const handleClick = (val) =>{
        setCurrentValue ((prevValue) => {
            if(prevValue ==='0'){
                return val;
            }else{
                return prevValue + val
            }
        })
        setCompleteOperation((prevOperation)=> prevOperation + val)
    }
    const handleOperation =(operation) =>{
        setCompleteOperation(currentValue + " "+operation)
        setPedingOperation(operation)
        setPedingvalue(currentValue)
        setCurrentValue('0')
    }
    const handleClear =() =>{
        setCurrentValue('0')
        setPedingOperation(null)
        setPedingvalue(null)
        setPedingOperation('')
    }
    const handleCalculate =() => {
        if (!pendingOperation||!pendingValue){
            return
        }
        const num1=parseFloat(pendingValue)
        const num2=parseFloat(currentValue)

        let result

        switch(pendingOperation){
            case '+':
                result =num1+num2
                break
            case '*':
                result =num1*num2
                break
            case '-':
                result =num1-num2
                break
                case '/':
                    if(num2!=0){
                       result =num1/num2  
                    } else{
                        setCurrentValue("Error")
                        setCompleteOperation("Error")
                        setPedingOperation(null)
                        setPedingvalue(null)
                        return
                    }                
                    break
                default:
                    break
        }
        setCompleteOperation(pendingValue+ 
            " "+pendingOperation+
            " "+currentValue+
            "="+
            result
        )
            setCurrentValue(result.toString());
            setPedingOperation(null)
            setPedingvalue(null)
    }
    return  (
    <div className="calculator">
        <div className="complete-operation">{completeOperation}</div>
        <div className="display">{currentValue}</div>
        <div className="buttons">
            <button onClick={handleClear}>AC</button>
            {keypadNumbers.map((num) => (
               <button key={num} onClick={() => handleClick(num)}>
                {num}
               </button> 
              
            )) }  
             {operations.map((operation) =>(
               <button key={operation}onClick={() => handleOperation(operation)}>{operation}</button> 
            )) }  
        <button onClick={handleCalculate}>=</button>
        </div>     
    </div>
    )
}

export default Calculator