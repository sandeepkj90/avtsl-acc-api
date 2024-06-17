let backgrndColor ={
    error:'#FF4949',
    success:'#48bf36',
    info:'#2793dc',
    warning:'#d7dd27'
}
let API_URL_LIST={
    clients:'/clients/getClientList',
    employees:'/users/getEmployeeList',
    bills:'',
    expenses:'/expenses/getExpensesByCondition',
    investments:'/investments/getInvestmentsByCondition',
    salaries:'/salaries/getSalariesByUserName'
}
function showToastMessage(message, color){
        $('#toast-message').text(message);
        $('#toast').css('display', 'block');
        $('#toast').css('animation', 'slideIn 0.6s forwards,slideOut 1s forwards 2s');
        $('#toast').css('background-color',backgrndColor[color]);
        
}

// function getDataList(){

// }
function getDataList(url,params,query,callback) {
  
  
  
  $.ajax({
    method: 'GET',
    url:API_URL_LIST[url],
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