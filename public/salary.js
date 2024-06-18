// console.log('admin page js');
(function () {
  if (!localStorage.getItem("token")) window.location.href = "/login";
  //   $('#setName').text(`Hi ${localStorage.getItem('name')}`);
  //  showToastMessage('Welcome to Client Page','info',true);

  getSalaryList();
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
    if (error) console.log(error);
    console.log({ "data received from": result });
    $("#register-loader").css("visibility", "hidden");
    showToastMessage(result.message, "success");
    $("#registerClient").trigger("reset");
    $("#myModal").modal("hide");
    // getSalaryList();
    setTimeout(() => {
      getSalaryList();
    }, 2000);
  });
}
function getSalaryList() {
  $("#tableList").html("");

  $("#show-main-loader").css("display", "block");
  $("#showTableDesc").html("Employee Salary List");
  getDataList("salaries", null, null, function (result, error) {
    if (error) console.log(error);

    showToastMessage(result.message, "success");
    let str = "";
    let count = 0;
    for (let it of result.data) {
      count = count + 1;
      str += `
                <tr>
                   <td>${it.salariesPaidId}</td>
                   <td>${it.userId.firstName} ${it.userId.lastName}</td>
                   <td>
                   ${it.userName}</td>
                   <td>${it.userId.salary}</td>
                   <td>${it.type}</td>
                   <td>${it.amount.food}</td>
           <td>${it.amount.rent}</td>
           <td>${it.amount.living}</td>
           
           <td>${it.month}</td>
           <td>${it.totalAmount}</td>
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
               ? `<span style="cursor:pointer;color:#FF4949;padding:5px;margin:5px; font-size:16px;"onclick="showToastConfirmMessage('Are you sure want to delete ?','error','${it.userName}');"><i class="fa fa-eraser" aria-hidden="true"></i></span>`
               : `<span style="cursor:pointer;color:#48bf36;padding:5px;margin:5px; font-size:16px;visibility:hidden" onclick=""><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span>`
           }<span style="cursor:pointer;color:#48bf36;padding:5px;margin:5px;font-size:16px;" onclick="showData('${
        it.firstName
      }','${it.lastName}','${it.userName}','${it.email}','${it.phone}','${
        it.address
      }',${it.active})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          </span></td>
               </tr>
                `;
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
    if (error) console.log(error);
    console.log({ "data received from": result });
    $("#delete-loader").css("visibility", "hidden");
    hideConfirmToast();
    showToastMessage(result.message, "success");

    // getSalaryList();
    setTimeout(() => {
      getSalaryList();
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
    if (error) console.log(error);
    console.log({ "data received from": result });
    $("#register-loader").css("visibility", "hidden");
    showToastMessage(result.message, "success");
    $("#registerClient").trigger("reset");
    $("#myModal").modal("hide");
    // getSalaryList();
    setTimeout(() => {
      getSalaryList();
    }, 2000);
  });
}

let empList = [];
function showModalWithSelect(data) {
  for (let i of data) {
    $(`#${i}`).css("border-left", "3px #434242 solid");
  }
  $("#addbtn").css("display", "block");
  $("#updatebtn").css("display", "none");
  $("#show-main-loader").css("display", "block");

  getDataList("employees", null, null, function (result, error) {
    if (error) console.log(error);
    $("#getSelectList").empty();
    $("#type").empty();
    $("#year").empty();
    $("#month").empty();
    $("#day").empty();
    $("#employeeData").html("");
    // showToastMessage(result.message,'success');
    empList = result.data;
    $("#getSelectList").append(
      $('<option style="display:none">').val("").text("Select Employee")
    );
    //  let optionList =[{name:'john', age:23, userName:'abc123'},{name:'harry', age:23, userName:'def234'}]
    for (let i of result.data) {
      optionText = i.firstName + " " + i.lastName;
      optionValue = i.userName;
      $("#getSelectList").append(
        $("<option>").val(optionValue).text(optionText)
      );
    }

    let typeList = ["NORMAL", "ADVANCE"];
    $("#type").append(
      $('<option style="display:none">').val("").text("Select Salary Type")
    );
    for (let item of typeList) {
      $("#type").append($("<option>").val(item).text(item));
    }
    $("#type").val(typeList[0]);

    let todayDate = new Date()
      .toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .replace(",", "")
      .split(" ");
    console.log(todayDate);

    let monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    $("#month").append(
      $('<option style="display:none">').val("").text("Select Month")
    );
    for (let item of monthList) {
      $("#month").append($(`<option>`).val(item).text(item));
    }
    $("#month").val(todayDate[0]);

    let yearList = [
      "2023",
      "2024",
      "2025",
      "2026",
      "2027",
      "2028",
      "2029",
      "2030",
      "2031",
      "2032",
      "2033",
      "2034",
      "2035",
      "2036",
      "2037",
      "2038",
      "2039",
      "2040",
    ];
    $("#year").append(
      $('<option style="display:none">').val("").text("Select Year")
    );
    for (let item of yearList) {
      let selectedYear = item == todayDate[2] ? true : false;
      $("#year").append($(`<option>`).val(item).text(item));
    }
    $("#year").val(todayDate[2]);

    let dayList = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ];
    $("#day").append(
      $('<option style="display:none">').val("").text("Select Day")
    );
    for (let item of dayList) {
      let option = item < 10 ? `0${item}` : item;

      $("#day").append($(`<option>`).val(option).text(option));
    }
    $("#day").val(todayDate[1]);

    // str +=`<tr><td>Total Amount</td><td>${response.data.totalAmount}</tr>`
    // $('#tableList').append(str);
    $("#show-main-loader").css("display", "none");
  });

  $("#getSelectList").on("change", function () {
    let data = $("#getSelectList").val();
    let empData = empList.find((item) => item.userName == data);
    console.log(empData);
    $("#employeeData").html("");
    $("#employeeData").append(`<tr>
                   
                   <td>${empData.firstName} ${empData.lastName}</td>
                   <td>
                   ${empData.userName}</td>
                   <td>${empData.email}</td>
                   <td>${empData.salary}</td>
           <td>${empData.phone}</td>
           <td>${empData.address}</td>
           <td>${
             empData.active
               ? '<span style="color:#48bf36; font-size:16px;text-align:center;"onclick=""><i class="fa fa-circle" aria-hidden="true"></i></span>'
               : '<span style="color:#FF4949; font-size:16px;text-align:center;" onclick=""><i class="fa fa-circle" aria-hidden="true"></i></span>'
           }</td>
             
               </tr>`);
  });
}
