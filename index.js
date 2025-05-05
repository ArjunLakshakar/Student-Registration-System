
const studentForm = document.getElementById("studentForm");
const students = JSON.parse(localStorage.getItem("students")) || [];
const editIndex = localStorage.getItem("editIndex");

// set data in the form if editIndex is not null
if (editIndex !== null) {
    const student = students[editIndex];
    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;
}

studentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const studentId = document.getElementById("studentId").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    const newStudent = { name, studentId, email, contact };

    // Validation
    const nameRegex = /^[a-zA-Z\s]+$/;
    const idRegex = /^[0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name)) {
        alert("Name should contain only alphabets and spaces.");
        return;
    }
    if (!idRegex.test(studentId)) {
        alert("Student ID should contain only numbers.");
        return;
    }
    if (!idRegex.test(contact) || contact.length !== 10) {
        alert("Contact number should be 10 digits long and contain only numbers.");
        return;
    }
    if (!emailRegex.test(email)) {
        alert("Invalid email format.");
        return;
    }

    // remove the editIndex 
    if (editIndex !== null) {
        students[editIndex] = newStudent;
        localStorage.removeItem("editIndex");
    } else {
        students.push(newStudent);
    }

    localStorage.setItem("students", JSON.stringify(students));
    studentForm.reset();

    window.location.href = "students.html";
});
