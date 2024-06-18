let backgrndColor = {
  error: "#FF4949",
  success: "#48bf36",
  info: "#2793dc",
  warning: "#d7dd27",
};
let borderLeftColor = {
  error: "4px #b70c0c solid;",
  success: "4px #208211 solid",
  info: "4px #0f5787 solid",
  warning: "4px #a2a718 solid",
};
let api_url_list = {
  get: {
    clients: "/clients/getClientList",
    employees: "/users/getEmployeeList",
    bills: "",
    expenses: "/expenses/getExpensesByCondition",
    investments: "/investments/getInvestmentsByCondition",
    salaries: "/salaries/getSalariesByUserName",
  },
  post: {
    clients: "/clients/register",
    employees: "/users/register",
    bills: "/client-bills/addBill",
    expenses: "/expenses/expenseAdd",
    investments: "/investments/investmentAdd",
    salaries: "/salaries/salaryPaid",
  },
  patch: {
    delete_client: "/clients/deleteData",
    update_clients: "/clients/updateData",
    update_employees: "/users/updateData",
    delete_employees: "/users/deleteData",
    employees: "/users/register",
    bills: "/client-bills/addBill",
    expenses: "/expenses/expenseAdd",
    investments: "/investments/investmentAdd",
    salaries: "/salaries/salaryPaid",
  },
};
function hideToast() {
  $("#toast").css("animation", "slideOut 0.6s forwards");
}
function showToastMessage(message, color) {
  $("#toast").css("background-color", backgrndColor[color]);
  $("#toast").css("border-left", borderLeftColor[color]);
  $("#toast").css("visibility", "visible");
  $("#toast-message").text(message);

  $("#toast").css("animation", "");
  $("#toast").css("animation", "slideIn 0.6s forwards");

  setTimeout(function () {
    hideToast();
  }, 2000);
}
function hideErrorMessage() {
  $("#display-message").css("animation", "slideOutError 0.6s forwards");
}
function showErrorMessage(message, color) {
  $("#display-message").css("visibility", "visible");
  $("#display-message").text(message);

  $("#display-message").css("animation", "");
  $("#display-message").css("animation", "slideInError 0.6s forwards");

  setTimeout(function () {
    hideErrorMessage();
  }, 2000);
}
function hideConfirmToast() {
  $("#toast-confirm").css("animation", "slideOut 0.6s forwards");
}

function showToastConfirmMessage(message, color, userId) {
  $("#toast-confirm").css("background-color", "#FFF");
  $("#toast-confirm").css("color", backgrndColor[color]);
  $("#toast-confirm").css("border-left", borderLeftColor[color]);

  $("#dataToDelete").html(userId);
  $("#toast-confirm").css("visibility", "visible");
  $("#toast-confirm-message").text(message);

  $("#toast-confirm").css("animation", "");
  $("#toast-confirm").css("animation", "slideIn 0.6s forwards");

  setTimeout(function () {
    hideToast();
  }, 2000);
}
function closeModal() {
  $("#registerClient").trigger("reset");
  $("#status").css("color", backgrndColor["success"]);
  $("#status").val("T");
  $("#display-message").css("visibility", "hidden");
}

// function getDataList(){

// }
function getDataList(url, params, query, callback) {
  $.ajax({
    method: "GET",
    url: api_url_list.get[url],
    contentType: "application/json",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "application/json",
      contentType: "application/json",
      Authorization: localStorage.getItem("token"),
    },
    dataType: "json",
    success: function (response) {
      //if request if made successfully then the response represent the data

      console.log("response", response);
      if (response.status == 200) {
        return callback(response, null);

        // if(response.data && response.data.items && response.data.items.length>0){
        // items = response.data;

        // $('#totalAmount').val(response.data.totalAmount)

        // localStorage.setItem('token',response.token);
      }
    },
    error: function (error) {
      console.log("error", error);
      callback(null, error);
      //let data = JSON.stringify(error.responseJSON.message.message));
    },
  });
}
$("input").focus(function () {
  $(this).css("border-left", "3px #36d874 solid");
});
function formValidation(data) {
  let message = "";
  for (let i in data) {
    $(`#${i}`).css("border-left", "3px #434242 solid");
  }

  for (let i in data) {
    if (!data[i] && typeof data[i] != "boolean") {
      $(`#${i}`).css("border-left", "3px #FF4949 solid");
      message = `${i.toUpperCase()} is required.`;

      showErrorMessage(message, "error");

      return false;
    } else {
      $(`#${i}`).css("border-left", "3px #434242 solid");
    }
  }
  return true;
}

function postData(url, body, query, params, callback) {
  $.ajax({
    method: "POST",
    url: api_url_list.post[url],
    contentType: "application/json",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "application/json",
      contentType: "application/json",
    },
    dataType: "json",
    data: JSON.stringify(body),
    success: function (response) {
      //if request if made successfully then the response represent the data

      console.log("response", response);
      if (response.status == 201) {
        return callback(response, null);

        // if(response.data && response.data.items && response.data.items.length>0){
        // items = response.data;

        // $('#totalAmount').val(response.data.totalAmount)

        // localStorage.setItem('token',response.token);
      }
    },
    error: function (error) {
      console.log("error", error);
      callback(null, error);
      //let data = JSON.stringify(error.responseJSON.message.message));
    },
  });
}

function patchData(url, body, query, params, callback) {
  let url_path = api_url_list.patch[url];
  if (params) {
    url_path = `${url_path}/${params}`;
  }
  $.ajax({
    method: "PATCH",
    url: url_path,
    contentType: "application/json",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PATCH",
      "Access-Control-Allow-Headers": "application/json",
      contentType: "application/json",
    },
    dataType: "json",
    data: JSON.stringify(body),
    success: function (response) {
      //if request if made successfully then the response represent the data

      console.log("response", response);
      if (response.status == 200) {
        return callback(response, null);

        // if(response.data && response.data.items && response.data.items.length>0){
        // items = response.data;

        // $('#totalAmount').val(response.data.totalAmount)

        // localStorage.setItem('token',response.token);
      }
    },
    error: function (error) {
      console.log("error", error);
      callback(null, error);
      //let data = JSON.stringify(error.responseJSON.message.message));
    },
  });
}
function showModal(data) {
  for (let i of data) {
    $(`#${i}`).css("border-left", "3px #434242 solid");
  }
  $("#addbtn").css("display", "block");
  $("#updatebtn").css("display", "none");
  $("#status").css("color", backgrndColor["success"]);
  $("#status").val("T");
}
