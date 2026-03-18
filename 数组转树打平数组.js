const arr = [
  { id: 1, parentId: null, name: "根节点1" },
  { id: 2, parentId: 1, name: "子节点1-1" },
  { id: 3, parentId: 1, name: "子节点1-2" },
  { id: 4, parentId: 2, name: "子节点1-1-1" },
  { id: 5, parentId: null, name: "根节点2" }
];

function arrToTree(arr){
    const tree=[];
    //map防止每次都遍历数组
    const map={};
    //给每个节点加上children字段，用id作为key
    arr.forEach(item=>{
        map[item.id]={...item,children:[]};
    })

//判断是不是根节点，是的话就添加到tree
    arr.forEach(item=>{
        const node = map[item.id];
        if(item.parentId===null){
            tree.push(node);
        }else{
            if(map[item.parentId]){
                map[item.parentId].children.push(node)
            }
        }
    })
    return tree;
}
const tree=JSON.stringify(arrToTree(arr), null, 2);
console.log(tree,'tree');

//树转数组
function flattenTree(tree) {
    const res=[];
    //递归，没有children，删掉children直接添加，有children，递归children添加
    function traverse(nodes){
        nodes.forEach(item=>{
            const {children,...rest}=item;
            res.push(rest);
            if(children&&children.length){
                traverse(children)
            }

        })
    }
    traverse(tree)
    return res;
}
console.log(flattenTree(arrToTree(arr)),'flattenTree')