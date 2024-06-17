let backgrndColor ={
    error:'#FF4949',
    success:'#48bf36',
    info:'#2793dc',
    warning:'#d7dd27'
}
let api_url_list={
  get:{
    clients:'/clients/getClientList',
    employees:'/users/getEmployeeList',
    bills:'',
    expenses:'/expenses/getExpensesByCondition',
    investments:'/investments/getInvestmentsByCondition',
    salaries:'/salaries/getSalariesByUserName'
  },
  post: {
    clients:'/clients/register',
    employees:'/users/register',
    bills:'/client-bills/addBill',
    expenses:'/expenses/expenseAdd',
    investments:'/investments/investmentAdd',
    salaries:'/salaries/salaryPaid'
  }
    
}
function hideToast(){
  $('#toast').css('animation', 'slideOut 0.6s forwards');
}
function showToastMessage(message, color){
        $('#toast').css('background-color',backgrndColor[color]);
        $('#toast').css('visibility', 'visible');
        $('#toast-message').text(message);
  
        $('#toast').css('animation', '');
        $('#toast').css('animation', 'slideIn 0.6s forwards');

        setTimeout(function(){
          hideToast();
        },2000)
        
        
}
function closeModal(){
  $('#registerClient').trigger('reset');
}


// function getDataList(){

// }
function getDataList(url,params,query,callback) {
  $.ajax({
    method: 'GET',
    url:api_url_list.get[url],
    contentType: 'application/json',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'application/json',
      contentType: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    dataType: 'json',
    success: function (response) {
      //if request if made successfully then the response represent the data

      console.log('response', response);
      if (response.status == 200) {
        return callback(response,null);

        // if(response.data && response.data.items && response.data.items.length>0){
        // items = response.data;
       
        // $('#totalAmount').val(response.data.totalAmount)

        // localStorage.setItem('token',response.token);
      }
    },
    error: function (error) {
      console.log('error', error);
      callback(null,error);
      //let data = JSON.stringify(error.responseJSON.message.message));
      
    },
  });
}
function formValidation(data){
  // let obj = {
  //   firstName: document.getElementById('firstName').value,
  //   lastName: document.getElementById('lastName').value,
  //   email: document.getElementById('email').value,
  //   role: document.getElementById('role').value,
  //   password: document.getElementById('password').value,
  //   phone: document.getElementById('phone').value,
  //   pincode: document.getElementById('pincode').value,
  //   address: document.getElementById('address').value,
  //   profilePic: profilepic,
  //   // skills: skillList,
  //   ...(document.getElementById('role').value == 'TECHNICIAN' && {
  //     skills: skillList,
  //   }),
  // };
  for (let i in data) {
    if (!data[i]) {
      $(`#${i}`).css('border', '1px red solid');
      $('#message').css('color', 'red');

      $('#showMessage').css('display', 'block');
      $('#showMessage').css('background', '#f2dede');

      let key = i[0].toUpperCase() + i.slice(1);
      $('#message').text(`${key} is Required.`);

      setTimeout(() => {
        $('#showMessage').css('display', 'none');
        $(`#${i}`).css('border', 'none');
        $('#message').css('color', '#1e81b0');

        // window.location.href = '/register';
      }, 3000);
      return;
    } else {
      $(`#${i}`).css('border', 'none');
    }
  }
   
}

function postData(url,body,query,params,callback) {
  $.ajax({
    method: 'POST',
    url:api_url_list.post[url],
    contentType: 'application/json',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'application/json',
      contentType: 'application/json'
    },
    dataType: 'json',
    data:JSON.stringify(body),
    success: function (response) {
      //if request if made successfully then the response represent the data

      console.log('response', response);
      if (response.status == 201) {
        return callback(response,null);

        // if(response.data && response.data.items && response.data.items.length>0){
        // items = response.data;
       
        // $('#totalAmount').val(response.data.totalAmount)

        // localStorage.setItem('token',response.token);
      }
    },
    error: function (error) {
      console.log('error', error);
      callback(null,error);
      //let data = JSON.stringify(error.responseJSON.message.message));
      
    },
  });
}