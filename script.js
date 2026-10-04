const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");

let students = JSON.parse(localStorage.getItem("students")) || [];

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

function displayStudents(studentList = students) {

    studentTableBody.innerHTML = "";

    if (studentList.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    studentList.forEach((student, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.department}</td>
            <td>${student.year}</td>
            <td>
                <button onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });
}

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const student = {
        id: document.getElementById("studentId").value.trim(),
        name: document.getElementById("studentName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        department: document.getElementById("department").value,
        year: document.getElementById("year").value
    };

    students.push(student);

    saveStudents();

    displayStudents();

    studentForm.reset();
});

function deleteStudent(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
        return;
    }

    students.splice(index, 1);

    saveStudents();

    displayStudents();
}

searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase();

    const filteredStudents = students.filter(student =>
        student.id.toLowerCase().includes(searchText) ||
        student.name.toLowerCase().includes(searchText) ||
        student.email.toLowerCase().includes(searchText) ||
        student.department.toLowerCase().includes(searchText)
    );

    displayStudents(filteredStudents);
});

displayStudents();
