const Constant = {
  DATABASE_NAME: "avtsl-acc-db",
  COLLECTION_NAME: {
    USER: "users",
    CLIENT: "clients",
    CLIENT_BILL: "client-bills",
    DISH: "dishes",
    SALARIES: "salaries",
    EXPENSES: "expenses",
    INVESTMENT: "investments",
    SERVICE_REQ: "service-req",
    ORDER: "orders",
  },
  PORT: 4100,
  SECRET_KEY: "avtslsiva@vasu123",
  MESSAGE: {
    USER: {
      REGISTERED: "User Registered Successfully",
      LOGIN: "User LoggedIn Successfully",
      ISEXIST: "User already registered with the User Name",
      NOT_EXIST: "User not registered with User Name",
      INVALID_OTP: "Invalid OTP",
      INVALID_CREDENTIALS:
        "Password is incorrect. Please check your password...",
      UNAUTHORIZED: "You are not authorized to use this service.",
      APPROVAL: "You profile is under process. Please contact Admin..",
    },
    CLIENT: {
      REGISTERED: "Client added Successfully",
      ISEXIST: "Client already added with the same email and phone",
    },
    CLIENT_BILL: {
      ADDED: "Client bill added Successfully",
      FOUND: "Bills Found",
    },
    SALARIES: {
      PAID: "Employee salary paid Successfully",
      FOUND: "Salary Data Found",
    },
    EXPENSE: {
      ADD: "Expense added Successfully",
      FOUND: "Expenses Data Found",
    },
    INVESTMENT: {
      ADD: "Investment added Successfully",
      FOUND: "Investment data found.",
    },
    COMMON: {
      FAILED: "Query Failed",
      BAD_REQUEST: "Invalid Payload",
      UPDATED: "Updated Successfull",
      SUCCESS: "Data Found",
    },
    DISH: {
      CREATED: "Dish has created sccessfully",
      DELETED: "Dish deleted successfully",
      UPDATED: "Dish updated Successfully",
    },
    CART: {
      CREATED: "Item added in cart sccessfully",
      DELETED: "Item removed from cart successfully",
      UPDATED: "Item updated Successfully",
    },
    ORDER: {
      PLACED: "Order placed successfully",
      BILL: "Bill is getting ready..",
    },
  },
};
module.exports = Constant;
