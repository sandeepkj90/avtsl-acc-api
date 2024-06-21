// console.log('admin page js');
(function () {
  if (!localStorage.getItem("token")) window.location.href = "/login";
  //   $('#setName').text(`Hi ${localStorage.getItem('name')}`);
  //  showToastMessage('Welcome to Client Page','info',true);
  getClientList();
})();

function showData(...data) {
  console.log("data to view ", data);
  let [firstName, lastName, userName, email, phone, address, active] = data;
  for (let i of [
    "firstName",
    "lastName",
    "userName",
    "email",
    "phone",
    "address",
  ]) {
    $(`#${i}`).css("border-left", "3px #434242 solid");
  }
  $("#myModal").modal("show");
  $("#addbtn").css("display", "none");
  $("#updatebtn").css("display", "block");
  document.getElementById("firstName").value = firstName;
  document.getElementById("lastName").value = lastName;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;
  document.getElementById("address").value = address;
  document.getElementById("userName").value = userName;
  // let color= (active)?'#c3fabb':'#f8b5b5';
  let textColor = active ? "#48bf36" : "#FF4949";
  let status = active ? "T" : "F";
  // $('#status').css('background-color',color);
  $("#status").css("color", textColor);
  document.getElementById("status").value = status;
}
function updateData() {
  let status = document.getElementById("status").value;
  let active = "";
  if (status == "T" || status == "t") {
    active = true;
  } else if (status == "F" || status == "f") {
    active = false;
  } else {
    active = true;
  }
  let obj = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    active,
  };
  let isFormValid = formValidation(obj);
  if (!isFormValid) return false;
  let params = document.getElementById("userName").value;
  $("#register-loader").css("visibility", "visible");
  patchData("update_clients", obj, null, params, function (result, error) {
    if (error) {
      showToastMessage(error?.responseJSON?.message, "error");

      $("#register-loader").css("visibility", "hidden");
      setTimeout(() => {
        $("#toast").css("display", "none");
      }, 3000);
    }
    console.log({ "data received from": result });
    $("#register-loader").css("visibility", "hidden");
    showToastMessage(result.message, "success");
    $("#registerClient").trigger("reset");
    $("#myModal").modal("hide");
    // getClientList();
    setTimeout(() => {
      getClientList();
    }, 2000);
  });
}
function getClientList() {
  $("#tableList").html("");

  $("#show-main-loader").css("display", "block");
  $("#showTableDesc").html("Client List");
  getDataList("clients", null, null, function (result, error) {
    if (error) {
      showToastMessage(error?.responseJSON?.message, "error");

      $("#show-main-loader").css("visibility", "hidden");
      setTimeout(() => {
        $("#toast").css("display", "none");
      }, 3000);
    }

    if (result.data.length == 0) showToastMessage(result.message, "info");
    let str = "";
    let count = 0;
    for (let it of result.data) {
      count = count + 1;
      str += `<tr>
    <td>${count}</td>
                  
                  <td>${it.firstName} ${it.lastName}</td>
                  <td>
                  ${it.userName}</td>
                  <td>${it.email}</td>
          <td>${it.phone}</td>
          <td>${it.address}</td>
          <td>${
            it.active
              ? '<span style="color:#48bf36; font-size:16px;text-align:center;"onclick=""><i class="fa fa-circle" aria-hidden="true"></i></span>'
              : '<span style="color:#FF4949; font-size:16px;text-align:center;" onclick=""><i class="fa fa-circle" aria-hidden="true"></i></span>'
          }</td>
          <td>${new Date(it.date).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}</td>
                  
                  
              <td>${
                it.active
                  ? `<span style="cursor:pointer;color:#FF4949;padding:5px;margin:5px; font-size:16px;"onclick="showToastConfirmMessage('Are you sure want to delete ?','error','${it.userName}');"><i class="fa fa-trash-o" aria-hidden="true"></i>
                  </span>`
                  : `<span style="cursor:pointer;color:#48bf36;padding:5px;margin:5px; font-size:16px;visibility:hidden" onclick=""><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span>`
              }<span style="cursor:pointer;color:#48bf36;padding:5px;margin:5px;font-size:16px;" onclick="showData('${
        it.firstName
      }','${it.lastName}','${it.userName}','${it.email}','${it.phone}','${
        it.address
      }',${it.active})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </span></td></tr>`;
    }
    // str +=`<tr><td>Total Amount</td><td>${response.data.totalAmount}</tr>`
    $("#tableList").append(str);
    $("#show-main-loader").css("display", "none");
  });
}
function deleteData() {
  $("#delete-loader").css("visibility", "visible");
  let params = $("#dataToDelete").html();
  let obj = {
    active: false,
  };
  // $('#register-loader').css('visibility','visible');
  patchData("delete_client", obj, null, params, function (result, error) {
    if (error) {
      console.log(error);
      showToastMessage(error?.responseJSON?.message, "error");

      $("#delete-loader").css("visibility", "hidden");
      setTimeout(() => {
        $("#toast").css("display", "none");
      }, 3000);
    }
    console.log({ "data received from": result });
    $("#delete-loader").css("visibility", "hidden");
    hideConfirmToast();
    showToastMessage(result.message, "success");

    // getClientList();
    setTimeout(() => {
      getClientList();
    }, 2000);
  });
}
function register() {
  // showToastMessage('Good Morning','success');
  let status = document.getElementById("status").value;
  let active = "";
  if (status == "T" || status == "t") {
    active = true;
  } else if (status == "F" || status == "f") {
    active = false;
  } else {
    active = true;
  }
  let obj = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    active,
  };
  let isFormValid = formValidation(obj);
  if (!isFormValid) return false;

  $("#register-loader").css("visibility", "visible");

  postData("clients", obj, null, null, function (result, error) {
    if (error) {
      console.log(error);
      showToastMessage(error?.responseJSON?.message, "error");

      $("#register-loader").css("visibility", "hidden");
      setTimeout(() => {
        $("#toast").css("display", "none");
      }, 3000);
    }
    console.log({ "data received from": result });
    $("#register-loader").css("visibility", "hidden");
    showToastMessage(result.message, "success");
    $("#registerClient").trigger("reset");
    $("#myModal").modal("hide");
    // getClientList();
    setTimeout(() => {
      getClientList();
    }, 2000);
  });
}

function closeClientModal() {
  $("#registerClient").trigger("reset");
  $("#status").css("color", backgrndColor["success"]);
  $("#status").val("T");
  $("#display-message").css("visibility", "hidden");
}
