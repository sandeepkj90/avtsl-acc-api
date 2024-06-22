// console.log('admin page js');
let selectedEmp = {};
let empList = [];
let typeList = ["NORMAL", "ADVANCE"];
let todayDate = new Date()
  .toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  .replace(",", "")
  .split(" ");
let dayList = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];
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
// console.log(todayDate);
(function () {
  if (!localStorage.getItem("token")) window.location.href = "/login";
  //   $('#setName').text(`Hi ${localStorage.getItem('name')}`);
  //  showToastMessage('Welcome to Client Page','info',true);

  getSalaryList();
})();

function showData(...data) {
  console.log("data to view ", data);
  let [
    firstName,
    lastName,
    userName,
    email,
    phone,
    salary,
    role,
    address,
    active,
    type,
    food,
    rent,
    living,
    month,
    year,
    day,
    salaryPaidId,
  ] = data;
  selectedEmp = {
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    email: email,
    phone: phone,
    address: address,
    role: role,
    salary: salary,
    active: active,
  };
  if (!active) {
    showToastMessage(
      `Employee profile is inactive. You cannot update the record.`,
      "error"
    );
    return false;
  }
  for (let i of ["type", "food", "rent", "living", "month", "year", "day"]) {
    $(`#${i}`).css("border-left", "3px #434242 solid");
  }
  $("#myModal").modal("show");
  $("#addbtn").css("display", "none");
  $("#dataToDelete").html(salaryPaidId);
  $("#updatebtn").css("display", "block");
  $("#rent").prop("readonly", false);
  $("#living").prop("readonly", false);
  $("#food").prop("readonly", false);
  document.getElementById("food").value = food;
  document.getElementById("living").value = living;
  document.getElementById("rent").value = rent;

  // let color= (active)?'#c3fabb':'#f8b5b5';

  // showToastMessage(result.message,'success');

  //  let optionList =[{name:'john', age:23, userName:'abc123'},{name:'harry', age:23, userName:'def234'}]
  // for (let i of result.data) {
  let optionText = firstName + " " + lastName + " - " + role;
  let optionValue = userName;
  // empList = [];
  $("#selectEmployee")
    .empty()
    .append(
      `<option selected="selected" value="${optionValue}" readonly>${optionText}</option>`
    );
  $("#selectEmployee").attr("disabled", true);
  // $("#selectEmployee").append(
  //   $("<option readonly>").val(optionValue).text(optionText)
  // );
  $("#employeeData").html(`<tr>
                   
      <td>${firstName} ${lastName}</td>
      <td>
      ${userName}</td>
      <td>${email}</td>
      <td>${salary}</td>
<td>${phone}</td>
<td>${address}</td>
<td>${
    active
      ? '<span style="color:#48bf36; font-size:16px;text-align:center;"onclick=""><i class="fa fa-circle" aria-hidden="true"></i></span>'
      : '<span style="color:#FF4949; font-size:16px;text-align:center;" onclick=""><i class="fa fa-circle" aria-hidden="true"></i></span>'
  }</td>

  </tr>`);
  // }
  $("#type").empty();
  $("#year").empty();
  $("#month").empty();
  $("#day").empty();
  for (let item of typeList) {
    $("#type").append($("<option>").val(item).text(item));
  }

  for (let item of monthList) {
    $("#month").append($(`<option>`).val(item).text(item));
  }

  for (let item of yearList) {
    let selectedYear = item == todayDate[2] ? true : false;
    $("#year").append($(`<option>`).val(item).text(item));
  }

  for (let item of dayList) {
    let option = item < 10 ? `0${item}` : item;

    $("#day").append($(`<option>`).val(option).text(option));
  }
  $("#type").val(type);

  $("#month").val(month);

  $("#year").val(year);

  $("#day").val(day);

  // str +=`<tr><td>Total Amount</td><td>${response.data.totalAmount}</tr>`
  // $('#tableList').append(str);
  // $("#show-main-loader").css("display", "none");
}
function updateData() {
  let obj = {
    living: document.getElementById("living").value,
    food: document.getElementById("food").value,
    rent: document.getElementById("rent").value,
    // userId: selectedEmp._id,
    // userName: selectedEmp.userName,
  };
  let isFormValid = formValidation(obj);
  if (!isFormValid) return false;

  $("#register-loader").css("visibility", "visible");
  let payload = {
    amount: {
      living: document.getElementById("living").value,
      food: document.getElementById("food").value,
      rent: document.getElementById("rent").value,
    },
    year: document.getElementById("year").value,
    month: document.getElementById("month").value,
    day: document.getElementById("day").value,
    type: document.getElementById("type").value,
  };
  // let obj = {
  //   firstName: document.getElementById("firstName").value,
  //   lastName: document.getElementById("lastName").value,
  //   email: document.getElementById("email").value,
  //   phone: document.getElementById("phone").value,
  //   address: document.getElementById("address").value,
  //   active,
  // };
  // let isFormValid = formValidation(obj);
  // if (!isFormValid) return false;
  // let params = document.getElementById("userName").value;
  let params = $("#dataToDelete").html();
  $("#register-loader").css("visibility", "visible");
  patchData("update_salaries", payload, null, params, function (result, error) {
    if (error) console.log(error);
    console.log({ "data received from": result });
    $("#register-loader").css("visibility", "hidden");
    showToastMessage(result.message, "success");
    $("#salaryPaid").trigger("reset");
    selectedEmp = {};
    $("#type").val("NORMAL");
    $("#month").val(todayDate[0]);
    $("#year").val(todayDate[2]);
    $("#day").val(todayDate[1]);
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

    if (result.data.length == 0) showToastMessage(result.message, "info");

    let str = "";
    let count = 0;
    for (let it of result.data) {
      count = count + 1;
      str += `
                <tr>
                   <td>${it.salariesPaidId}</td>
                   <td>${it.userId.firstName} ${it.userId.lastName} ${
        it.userId.active
          ? '<span style="color:#48bf36; font-size:16px;text-align:center;"onclick=""><i class="fa fa-circle" aria-hidden="true"></i></span>'
          : '<span style="color:#FF4949; font-size:16px;text-align:center;" onclick=""><i class="fa fa-circle" aria-hidden="true"></i></span>'
      }</td>
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
               ? `<span style="cursor:pointer;color:#FF4949;padding:5px;margin:5px; font-size:16px;"onclick="showToastConfirmMessage('Are you sure want to delete ?','error','${it.salariesPaidId}');"><i class="fa fa-trash-o" aria-hidden="true"></i></span>`
               : `<span style="cursor:pointer;color:#48bf36;padding:5px;margin:5px; font-size:16px;visibility:hidden" onclick=""><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span>`
           }<span style="cursor:pointer;color:#48bf36;padding:5px;margin:5px;font-size:16px;" onclick="showData('${
        it.userId.firstName
      }','${it.userId.lastName}','${it.userId.userName}','${
        it.userId.email
      }','${it.userId.phone}','${it.userId.salary}','${it.userId.role}','${
        it.userId.address
      }',${it.userId.active},'${it.type}','${it.amount.food}','${
        it.amount.rent
      }','${it.amount.living}','${it.month}','${it.year}','${it.day}','${
        it.salariesPaidId
      }')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>
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
  patchData("delete_salaries", obj, null, params, function (result, error) {
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
  let obj = {
    selectEmployee: selectedEmp?.userName || "",
    living: document.getElementById("living").value,
    food: document.getElementById("food").value,
    rent: document.getElementById("rent").value,
    // userId: selectedEmp._id,
    // userName: selectedEmp.userName,
  };
  let isFormValid = formValidation(obj);
  if (!isFormValid) return false;

  $("#register-loader").css("visibility", "visible");
  let payload = {
    amount: {
      living: document.getElementById("living").value,
      food: document.getElementById("food").value,
      rent: document.getElementById("rent").value,
    },
    year: document.getElementById("year").value,
    month: document.getElementById("month").value,
    day: document.getElementById("day").value,
    type: document.getElementById("type").value,
    userId: selectedEmp._id,
    userName: selectedEmp.userName,
  };
  postData("salaries", payload, null, null, function (result, error) {
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

$("#living").on("keyup", function (e) {
  console.log(selectedEmp.salary);
  calcSalaryRemaining(
    $("#living").val(),
    $("#food").val(),
    $("#rent").val(),
    e,
    selectedEmp.salary
  );
  // let totalPaid =
  //   parseInt($("#living").val() || 0) +
  //   parseInt($("#food").val() || 0) +
  //   parseInt($("#rent").val() || 0);
  // console.log("totalpaid--", totalPaid);
  // if (e.keyCode != 8) {
  //   setTimeout(() => {
  //     let leftAmount = selectedEmp.salary - totalPaid;
  //     if (leftAmount != selectedEmp.salary)
  //       showErrorMessage(
  //         `${leftAmount} out of ${selectedEmp.salary} remaining.`,
  //         "info"
  //       );
  //   }, 1200);
  // }
});
$("#rent").on("keyup", function (e) {
  calcSalaryRemaining(
    $("#living").val(),
    $("#food").val(),
    $("#rent").val(),
    e,
    selectedEmp.salary
  );

  // let totalPaid =
  //   parseInt($("#living").val() || 0) +
  //   parseInt($("#food").val() || 0) +
  //   parseInt($("#rent").val() || 0);
  // console.log("totalpaid--", totalPaid);
  // if (e.keyCode != 8) {
  //   setTimeout(() => {
  //     let leftAmount = selectedEmp.salary - totalPaid;
  //     if (leftAmount != selectedEmp.salary)
  //       showErrorMessage(
  //         `${leftAmount} out of ${selectedEmp.salary} remaining.`,
  //         "info"
  //       );
  //   }, 1200);
  // }
});
$("#food").on("keyup", function (e) {
  calcSalaryRemaining(
    $("#living").val(),
    $("#food").val(),
    $("#rent").val(),
    e,
    selectedEmp.salary
  );
  // let totalPaid =
  //   parseInt($("#living").val() || 0) +
  //   parseInt($("#food").val() || 0) +
  //   parseInt($("#rent").val() || 0);
  // console.log("totalpaid--", totalPaid);
  // if (e.keyCode != 8) {
  //   setTimeout(() => {
  //     let leftAmount = selectedEmp.salary - totalPaid;
  //     if (leftAmount != selectedEmp.salary)
  //       showErrorMessage(
  //         `${leftAmount} out of ${selectedEmp.salary} remaining.`,
  //         "info"
  //       );
  //   }, 1200);
  // }
});

function showModalWithSelect(data) {
  for (let i of data) {
    $(`#${i}`).css("border-left", "3px #434242 solid");
  }
  $("#addbtn").css("display", "block");
  $("#updatebtn").css("display", "none");
  $("#show-main-loader").css("display", "block");
  $("#selectEmployee").attr("disabled", false);
  selectedEmp = {};
  getDataList(
    "employees",
    null,
    { role: "OPERATOR", active: true },
    function (result, error) {
      if (error) console.log(error);
      $("#selectEmployee").empty();
      $("#type").empty();
      $("#year").empty();
      $("#month").empty();
      $("#day").empty();
      $("#employeeData").html("");
      $("#employeeData").html(`<tr>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>`);
      // showToastMessage(result.message,'success');
      empList = result.data;
      $("#selectEmployee").append(
        $('<option style="display:none">').val("").text("Select Employee")
      );
      //  let optionList =[{name:'john', age:23, userName:'abc123'},{name:'harry', age:23, userName:'def234'}]
      for (let i of result.data) {
        optionText = i.firstName + " " + i.lastName + " - " + i.role;
        optionValue = i.userName;
        $("#selectEmployee").append(
          $("<option>").val(optionValue).text(optionText)
        );
      }
      $("#rent").prop("readonly", true);
      $("#living").prop("readonly", true);
      $("#food").prop("readonly", true);
      $("#type").append(
        $('<option style="display:none">').val("").text("Select Salary Type")
      );
      for (let item of typeList) {
        $("#type").append($("<option>").val(item).text(item));
      }
      $("#type").val(typeList[0]);

      $("#month").append(
        $('<option style="display:none">').val("").text("Select Month")
      );
      for (let item of monthList) {
        $("#month").append($(`<option>`).val(item).text(item));
      }
      $("#month").val(todayDate[0]);

      $("#year").append(
        $('<option style="display:none">').val("").text("Select Year")
      );
      for (let item of yearList) {
        let selectedYear = item == todayDate[2] ? true : false;
        $("#year").append($(`<option>`).val(item).text(item));
      }
      $("#year").val(todayDate[2]);

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
    }
  );

  $("#selectEmployee").on("change", function () {
    let data = $("#selectEmployee").val();
    selectedEmp = empList.find((item) => item.userName == data);
    // console.log(selectedEmp);
    $("#employeeData").html("");
    $("#employeeData").append(`<tr>
                   
                   <td>${selectedEmp.firstName} ${selectedEmp.lastName}</td>
                   <td>
                   ${selectedEmp.userName}</td>
                   <td>${selectedEmp.email}</td>
                   <td>${selectedEmp.salary}</td>
           <td>${selectedEmp.phone}</td>
           <td>${selectedEmp.address}</td>
           <td>${
             selectedEmp.active
               ? '<span style="color:#48bf36; font-size:16px;text-align:center;"onclick=""><i class="fa fa-circle" aria-hidden="true"></i></span>'
               : '<span style="color:#FF4949; font-size:16px;text-align:center;" onclick=""><i class="fa fa-circle" aria-hidden="true"></i></span>'
           }</td>
             
               </tr>`);
    $("#rent").prop("readonly", false);
    $("#living").prop("readonly", false);
    $("#food").prop("readonly", false);
  });
}

function closeSalaryModal() {
  $("#salaryPaid").trigger("reset");
  $("#display-message").css("visibility", "hidden");
  $("#display-calc-message").css("visibility", "hidden");
  selectedEmp = {};
  $("#type").val("NORMAL");
  $("#month").val(todayDate[0]);
  $("#year").val(todayDate[2]);
  $("#day").val(todayDate[1]);
}

// console.log()
