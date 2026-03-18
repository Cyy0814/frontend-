import {useState, useEffect} from 'react'

function CountDown({start=10}){
    const [count, setCount] = useState(start);
   
    useEffect(() => {
         const timer=setTimeout(() => {
        setCount(count - 1);
    }, 1000);
        
            return ()=>clearTimeout(timer);
    }, [count]);
    return <div>`倒计时${count}秒`</div>
}
export default CountDown;