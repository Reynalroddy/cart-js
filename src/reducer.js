const reducer = (state,action)=>{
// console.log(state,action)
if(action.type === "CLEAR_CART"){
return {
...state,
cart:[]
}

}

if(action.type === "REMOVE_ITEM"){
 const id = action.payload;
return {
...state,
cart:state.cart.filter((item)=>item.id !== id),
}
}



if(action.type === "LOADING"){
return {
...state,
loading:true
}
}

if(action.type === "FETCH_DATA"){
return {
...state,
cart:action.payload,
loading:false
}
}


if(action.type === "INCREASE_ITEM"){
const newArr = state.cart.map((item)=>{

if(item.id === action.payload){
return {...item,amount:item.amount + 1}

}
return item
})
return {
...state,
cart:newArr
}
}

if(action.type === "DECREASE_ITEM"){
const itemId = action.payload
const newCart = state.cart.map((item)=>{
    if(item.id === itemId){
return {...item,amount:item.amount - 1}
    }
return item

    }).filter((item=>item.amount>0))
return {
...state,
cart:newCart
}


}



if(action.type === "CALC_TOTAL"){
let {cartTotal,totalAmount} = state.cart.reduce((acc,curr)=>{

acc.cartTotal += curr.amount
acc.totalAmount += curr.price * curr.amount;
return acc //must return the acc(total)
},{cartTotal:0,totalAmount:0})

totalAmount = parseFloat(totalAmount.toFixed(2))
return {
...state,
amount:cartTotal,
total:totalAmount
}
}




return state;

}

export default reducer;