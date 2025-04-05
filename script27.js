function showNotification(message, type) {
    let notificationContainer = document.getElementById('notificationContainer');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notificationContainer';
        document.body.appendChild(notificationContainer);
    }
    let notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    notificationContainer.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}
function register() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('mail').value;
    let password = document.getElementById('registerpassword').value;
    let register_error = document.getElementById('register_error');
    const regname = /^[a-zA-Z0-9_]+$/;
    const regemail = /^[a-zA-Z]+\.?\d+@gmail\.com$/;
    const regpassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(name=="")
    {
        register_error.innerHTML="Enter name";
        register_error.style.color = "red";
        return;
    }
    if(email=="")
    {
        register_error.innerHTML="Enter email id";
        register_error.style.color = "red";
        return;
    }
    if(password=="")
    {
        register_error.innerHTML="Enter password";
        register_error.style.color = "red";
        return;
    }
    if (!regname.test(name)) {
        register_error.innerHTML = "Enter a valid username";
        register_error.style.color = "red";
        return;
    }
    if (!regemail.test(email)) {
        register_error.innerHTML = "Enter a valid email";
        register_error.style.color = "red";
        return;
    }
    if (!regpassword.test(password)) {
        register_error.innerHTML = "Enter a valid password";
        register_error.style.color = "red";
        return;
    }
    register_error.innerHTML = "Registration Successful";
    register_error.style.color = "green";
    showNotification("Registration Successful", "success");
    document.getElementById('name').value = "";
    document.getElementById('mail').value = "";
    document.getElementById('registerpassword').value = "";
}
function login() {
    let username = document.getElementById('username').value.toLowerCase();
    let password = document.getElementById('loginpassword').value;
    let login_error = document.getElementById('login_error');
    const regname = /^[a-zA-Z0-9_]+$/;
    const regpassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(username=="")
    {
        login_error.innerHTML="Enter name";
        login_error.style.display="red";
        return;
    }
    if(password=="")
    {
        login_error.innerHTML="Enter password";
        login_error.style.display="red";
        return;
    }
    if (!regname.test(username)) {
        login_error.innerHTML = "Invalid username";
        login_error.style.color = "red";
        return;
    }
    if (!regpassword.test(password)) {
        login_error.innerHTML = "Invalid password";
        login_error.style.color = "red";
        return;
    }
    login_error.innerHTML = "Login Successful";
    login_error.style.color = "green";
    showNotification("Login Successful", "success");
    document.getElementById('username').value = "";
    document.getElementById('loginpassword').value = "";
    setTimeout(function () {
        window.location.href = "dashboard.html";
    }, 1500);
}
function searchBook(){
    let searchBook = document.getElementById('searchtitle').value;
    let searchMessage = document.getElementById('search_message');
    let bookList=[
        "data structures and algorithms",
        "introduction to algorithms",
        "artificial intelligence: a modern approach",
        "the c programming language",
        "operating system concepts",
        "computer networking: a top-down approach",
        "design patterns: elements of reusable object-oriented software",
        "database system concepts",
        "clean code: a handbook of agile software craftsmanship",
        "the pragmatic programmer"
    ];
    if (searchBook == "") {
        searchMessage.innerHTML = "Enter the title of the book";
        searchMessage.style.color = "red";
        return;
    }
    if(bookList.includes(searchBook))
    {
        searchMessage.innerHTML="Book '"+searchBook+"' is available";
        searchMessage.style.color="green";
        showNotification("Book '"+searchBook+"' is available","success");
    }
    else{
        searchMessage.innerHTML="Book '"+searchBook+"' is not available";
        searchMessage.style.color="red";
    }
    document.getElementById('searchtitle').value="";
}
function returnBook(){
    let bookTitle=document.getElementById('booktitle').value;
    let returndate=document.getElementById('returndate').value;
    let returnMessage=document.getElementById('return_message');
    if (bookTitle==""){
        returnMessage.innerHTML="Enter the title of the book";
        returnMessage.style.display="block";
        return;
    }
    if (returndate == ""){
        returnMessage.innerHTML = "Enter the return date";
        returnMessage.style.display = "block";
        return;
    }
    returnMessage.innerHTML = "Book " + bookTitle + " returned on " + returndate;
    returnMessage.style.color = "green";
    showNotification("Book " + bookTitle + " returned successfully", "success");
    document.getElementById('booktitle').value = "";
    document.getElementById('returndate').value = "";
}
function calculateFine() {
    let duedate = document.getElementById('duedate').value;
    let actualReturnDate = document.getElementById('actualreturndate').value;
    let amount = document.getElementById('amount');
    if (duedate == "" || actualReturnDate == "") {
        amount.innerHTML = "Enter the dates";
        amount.style.color = "red";
        return;
    }
    let delayDate = new Date(duedate);
    let newReturnDate = new Date(actualReturnDate);
    if (isNaN(delayDate) || isNaN(newReturnDate)) {
        amount.innerHTML = "Invalid date format";
        amount.style.color = "red";
        return;
    }
    if (newReturnDate > delayDate) {
        let delaydays = Math.ceil((newReturnDate - delayDate) / (1000 * 60 * 60 * 24));
        let fine = delaydays * 5;
        amount.innerHTML = "Late by: " + delaydays + " days. Fine: &#8377;" + fine;
        amount.style.color = "red";
        showNotification("Fine calculated: &#8377;" + fine, "error");
    } 
    else {
        amount.innerHTML = "No Fine. Book returned on time.";
        amount.style.color = "green";
        showNotification("Book returned on time. No fine.", "success");
    }
    document.getElementById('duedate').value="";
    document.getElementById('actualreturndate').value="";
}
function processPayment() {
    let paymentMode = document.getElementById('paymentMode').value;
    if (paymentMode === "") {
        showNotification("Please select a valid payment mode.", "error");
        return;
    }
    showNotification("Payment of &#8377;" + fineAmount + " completed successfully via " + paymentMode + ".", "success");
}
function feedback() {
    let feedback = document.getElementById('feedback').value;
    let feedbackmessage = document.getElementById('feedback_message');
    if (feedback == "") {
        feedbackmessage.innerHTML = "Enter your feedback";
        feedbackmessage.style.color = "red";
        return;
    }
    feedbackmessage.innerHTML = "Thank you for your feedback!";
    feedbackmessage.style.color = "green";
    showNotification("Feedback submitted successfully", "success");
    document.getElementById('feedback').value="";
}