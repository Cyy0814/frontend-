//promise.all

function promiseAll(promises){
    return new Promise((resolve,reject)=>{
        let results=[];
        let complicatedPromise=0;
        if(!Array.isArray(promises)){
            return;
        }
        promises.forEach((p,index)=>{
            Promise.resolve(p)
            .then(value=>{
                results[index]=value;
                complicatedPromise++;
                if(complicatedPromise===promises.length){
                    resolve(results)
                }

            })
            .catch(err=>{
                reject(err)
            })

        })
        if(promises.length===0){
            resolve([])
        }
    })

}

//手写promise。只用实现基础功能
class MyPromise{
    constructor(executor){
        this.status='pending';
        this.value=undefined;
        this.reason=undefined;
        this.onResolvedCallbacks=[];
        this.onRejectedCallbacks=[];
        const resolve=(value)=>{
            if(this.status==='pending'){
                this.status='fulfilled';
                this.value=value;
                this.onResolvedCallbacks.forEach(fn=>fn())
            }
        }
        const reject=(reason)=>{
            if(this.status==='pending'){
                this.status='rejected';
                this.reason=reason;
                this.onRejectedCallbacks=(fn=>fn());
            }
        }

        try{
            executor(resolve,reject);
        }catch(err){
            reject(err)
        }
    }

    then(onfufilled,onrejected){
        if(this.status==='fulfilled'){
            onfufilled(this.value)
        }
        if(this.status==='rejected'){
            onrejected(this.reason)
        }
        if(this.status==='pending'){
            this.onResolvedCallbacks.push(()=>{
                onfufilled(this.value)
            })
            this.onRejectedCallbacks.push(()=>{
                onrejected(this.reason)
            })
        }
    }

}