//函数柯里化，实现分批次处理参数
//把一个多参数函数，拆成多个单参数函数，每次只接受一个参数，返回一个新函数来接收剩余参数

function curring(fn,...args1){
    return (...args2)=>{
        const args=[...args1,...args2];
        if(args.length>=fn.length){
            return fn.call(this,...args)

        }
        else{
            return curring.call(this,fn,...args)
        }
    }

}