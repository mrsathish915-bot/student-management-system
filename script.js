// ===============================
// Get HTML Elements
// ===============================

const studentForm = document.getElementById("studentForm");

const studentTableBody =
    document.getElementById("studentTableBody");

const searchInput =
    document.getElementById("searchInput");

const emptyMessage =
    document.getElementById("emptyMessage");


// ===============================
// Load Students from Local Storage
// ===============================

let students =
    JSON.parse(localStorage.getItem("students")) || [];


// This stores the student currently being edited.
// -1 means we are adding a new student.
let editingIndex = -1;


// ===============================
// Save Students
// ===============================

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// ===============================
// Display Students
// ===============================

function displayStudents(studentList = students) {

    // Clear existing table rows
    studentTableBody.innerHTML = "";


    // If there are no students
    if (studentList.length === 0) {

        emptyMessage.style.display = "block";

        return;
    }


    emptyMessage.style.display = "none";


    // Create a row for every student
    studentList.forEach(function(student) {

        // Find the original student's index.
        // This is important when search is being used.
        const originalIndex =
            students.indexOf(student);


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${student.id}
            </td>

            <td>
                ${student.name}
            </td>

            <td>
                ${student.email}
            </td>

            <td>
                ${student.phone}
            </td>

            <td>
                ${student.department}
            </td>

            <td>
                ${student.year}
            </td>

            <td>
                ${student.result}
            </td>

            <td>

                <button
                    onclick="editStudent(${originalIndex})"
                >
                    Edit
                </button>


                <button
                    onclick="deleteStudent(${originalIndex})"
                >
                    Delete
                </button>

            </td>

        `;


        studentTableBody.appendChild(row);

    });

}


// ===============================
// Add / Update Student
// ===============================

studentForm.addEventListener(
    "submit",
    function(event) {

        // Prevent page refresh
        event.preventDefault();


        // Get values from the form
        const student = {

            id:
                document
                .getElementById("studentId")
                .value
                .trim(),

            name:
                document
                .getElementById("studentName")
                .value
                .trim(),

            email:
                document
                .getElementById("email")
                .value
                .trim(),

            phone:
                document
                .getElementById("phone")
                .value
                .trim(),

            department:
                document
                .getElementById("department")
                .value,

            year:
                document
                .getElementById("year")
                .value,

            result:
                document
                .getElementById("result")
                .value

        };


        // ===============================
        // UPDATE EXISTING STUDENT
        // ===============================

        if (editingIndex !== -1) {

            students[editingIndex] = student;

            editingIndex = -1;


            // Change button back to Add Student
            document
                .querySelector(
                    "button[type='submit']"
                )
                .textContent = "Add Student";

        }


        // ===============================
        // ADD NEW STUDENT
        // ===============================

        else {

            students.push(student);

        }


        // Save data
        saveStudents();


        // Update table
        displayStudents();


        // Clear form
        studentForm.reset();

    }
);


// ===============================
// Edit Student
// ===============================

function editStudent(index) {

    const student = students[index];


    // Put student information into form

    document
        .getElementById("studentId")
        .value = student.id;


    document
        .getElementById("studentName")
        .value = student.name;


    document
        .getElementById("email")
        .value = student.email;


    document
        .getElementById("phone")
        .value = student.phone;


    document
        .getElementById("department")
        .value = student.department;


    document
        .getElementById("year")
        .value = student.year;


    document
        .getElementById("result")
        .value = student.result;


    // Remember which student we are editing
    editingIndex = index;


    // Change button text
    document
        .querySelector(
            "button[type='submit']"
        )
        .textContent = "Update Student";


    // Scroll to the form
    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ===============================
// Delete Student
// ===============================

function deleteStudent(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {

        return;

    }


    // Remove student
    students.splice(index, 1);


    // Save updated list
    saveStudents();


    // Refresh table
    displayStudents();

}


// ===============================
// Search Students
// ===============================

searchInput.addEventListener(
    "input",
    function() {

        const searchText =
            searchInput.value
            .toLowerCase()
            .trim();


        const filteredStudents =
            students.filter(
                function(student) {

                    return (

                        student.id
                        .toLowerCase()
                        .includes(searchText)

                        ||

                        student.name
                        .toLowerCase()
                        .includes(searchText)

                        ||

                        student.email
                        .toLowerCase()
                        .includes(searchText)

                        ||

                        student.department
                        .toLowerCase()
                        .includes(searchText)

                        ||

                        student.year
                        .toLowerCase()
                        .includes(searchText)

                        ||

                        student.result
                        .toLowerCase()
                        .includes(searchText)

                    );

                }
            );


        // Display filtered results
        displayStudents(filteredStudents);

    }
);


// ===============================
// Display Students on Page Load
// ===============================

displayStudents();
