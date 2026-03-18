function myPromiseAll(promises) {
    return new Promise((resolve,reject)=>{
        const res=[];
        let count=0;

        promises.forEach((p,index)=>{
            Promise.resolve(p)
            .then(value=>{
                res[index]=value;
                count++;
                if(count===promises.length){
                    resolve(res);
                }
            })
            .catch(err=>{
                reject(err)
            })
        })
    })
}

const p1 = Promise.resolve(1);
const p2 = new Promise(res => setTimeout(() => res(2), 1000));
const p3 = Promise.resolve(3);

myPromiseAll([p1, p2, p3]).then(console.log); // [1,2,3]