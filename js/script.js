let arr=[]
let promiseExecution = async ()=>{
    let response  = await Promise.all([
        fetch('http://localhost:3000/customers'),
        fetch('http://localhost:3000/transactions')
    ]).then(response=>Promise.all(response.map(data=>data.json())))
    let customerArr = response[0];
    let transactionArr = response[1];
    customerArr.forEach(cus => {
        transactionArr.forEach(tra => {
            if(cus.id == tra.customer_id){
           arr.push({...cus , tra} );
            }
        });
    });
display(arr)
chrats()
}
function display(data){
    let catrona =''
    for (let i = 0; i < data.length; i++) {
        catrona += `
         <tr>
      <td>${i+1}</td>
      <td>${data[i].name}</td>
      <td>${data[i].tra.date}</td>
      <td>${data[i].tra.amount.toFixed(2)}</td>
      <td ><button onclick="getid(${data[i].tra.customer_id})" type="button" class="button btn btn-outline-success">Get My Transactions</button>
</td>
    </tr>
        `
        
    }
    document.querySelector('.tbody').innerHTML = catrona
}
 async function getid(id){
    let response = await fetch(`http://localhost:3000/transactions?customer_id=${id}`)
    response = await response.json()
    console.log(response);
    displayTrans(response)
}
function displayTrans(response){
    let catrona =''
    let total = ''
    let totalamount =0 ;
    for (let i = 0; i < response.length; i++) {
        totalamount += response[i].amount
        catrona += `
     <div class="col-md-5 mx-2 p-3 bg-light rounded-3 text-center ">
            <h6>${response[i].date}</h6>
            <p>${response[i].amount}</p>
          </div>
          
        `
    }
      total = `
            <div class="col-md-12  p-3 bg-dark text-white rounded-3 text-center  btn-outline-dark">
              <p>Total Transactions</p>
            <h6>${totalamount}</h6>
          </div>
        `
    console.log(totalamount);
    document.getElementById('rowData').innerHTML = catrona
    document.getElementById('total').innerHTML = total
}
function chrats(){
const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'line',
    data: {
        labels:arr.map(pollOption => pollOption.name),
      datasets: [{
        label: 'Transcations Analyst',
        data: arr.map(pollOption => pollOption.tra.amount),
        backgroundColor:[
'#5752D1','#F4C145','#9E9E9E', '#9E9D24','#0097A7','#D81B60','#CC9900','#00FFCC','#FF9999'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
 
}
promiseExecution()
console.log(arr);

function search(term){
    console.log(typeof(term));
    serchBox = ''
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.toLowerCase().includes(term.toLowerCase()) || arr[i].tra.amount == term) {
            serchBox +=`
                    <tr>
      <td>${i+1}</td>
      <td>${arr[i].name}</td>
      <td>${arr[i].tra.date}</td>
      <td>${arr[i].tra?.amount.toFixed(2)}</td>
      <td ><button onclick="getid(${arr[i].tra.customer_id})" type="button" class="button btn btn-outline-success">Get My Transactions</button>
</td>
    </tr>
            `
    }
}
    document.querySelector('.tbody').innerHTML = serchBox

}
//  function filterByAmount(amount){
//     let api = await fetch(`http://localhost:3000/transactions?amount=${amount}`)
//     let response = await api.json()
//     console.log(response);
// }
// filterByAmount(550)



// async function filterByName(name){
//     let api = await fetch(`http://localhost:3000/customers?name=${name}`)
//     let response = await api.json()
//     console.log(response);
// }
// filterByName('Aya Elsayed')


// fetch('db.json')
//     .then(response => response.json())
//     .then(data => {
//         const tableBody = document.getElementById('tableBody');
//         const customers = data.customers;
//         const transactions = data.transactions;

//         const customerTotals = {};

//         transactions.forEach(transaction => {
//             const customer = customers.find(ca => ca.id === transaction.customer_id);
            
//             tableBody.innerHTML += `
//                 <tr>
//                     <td>${customer.name}</td>
//                     <td>${transaction.date}</td>
//                     <td>${transaction.amount.toFixed(2)}</td>
//                 </tr>
//             `;
            
//             customerTotals[customer.id] = (customerTotals[customer.id] || 0) + transaction.amount;
//         });

//         Object.entries(customerTotals).forEach(([customerId, total]) => {
//             const customer = customers.find(ca => ca.id === parseInt(customerId));
            
//             tableBody.innerHTML += `
//                 <tr>
//                     <td><strong>${customer.name} (Total)</strong></td>
//                     <td></td>
//                     <td><strong>${total.toFixed(2)}</strong></td>
//                 </tr>
//             `;
//         });
//     })
//     .catch(error => console.error('Error:', error));

