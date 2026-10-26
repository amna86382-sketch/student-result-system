const resultForm = document.getElementById("resultForm");
const message = document.getElementById("message");
const resultList = document.getElementById("resultList");
// LocalStorage se saved results lena
let savedResults = [];
try {
    savedResults = JSON.parse(
        localStorage.getItem("studentResults")
    ) || [];

    if (!Array.isArray(savedResults)) {
        savedResults = [];
    }
} catch (error) {
    savedResults = [];
}
// Saare students ke results display karna
function displayResults() {
    resultList.innerHTML = "";
    for (let student of savedResults) {
        const card = document.createElement("div");
        card.className = "student-card";

        const heading = document.createElement("h3");
        heading.textContent = "Student Result";

        const name = document.createElement("p");
        name.textContent = "Student Name: " + student.name;

        const total = document.createElement("p");
        total.textContent = "Total Marks: " + student.totalMarks;

        const obtained = document.createElement("p");
        obtained.textContent = "Obtained Marks: " + student.obtainedMarks;

        const percentage = document.createElement("p");
        percentage.textContent = "Percentage: " + student.percentage + "%";

        const grade = document.createElement("p");
        grade.textContent = "Grade: " + student.grade;

        const status = document.createElement("p");
        status.textContent = "Status: " + student.status;
        status.className = student.status === "Pass" ? "pass" : "fail";
        card.append(
            heading,
            name,
            total,
            obtained,
            percentage,
            grade,
            status
        );
        resultList.appendChild(card);
    }
}
// Page load par results show karna
displayResults();
// Form submit hone par result calculate karna
resultForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("studentName").value.trim();
    const inputs = [
        document.getElementById("english"),
        document.getElementById("math"),
        document.getElementById("computer"),
        document.getElementById("science"),
        document.getElementById("urdu")
    ];
    // Student name validate karna
    if (name === "") {
        message.textContent = "Please enter student name.";
        return;
    }
    // Check karna ke saare marks enter hue hain
    for (let input of inputs) {
        if (input.value.trim() === "") {
            message.textContent =
            "Please enter marks for all subjects.";
            return;
        }
    }
    // String values ko numbers mein convert karna
    const marks = inputs.map(input => Number(input.value));
    // Marks ki validation
    for (let mark of marks) {
        if (!Number.isFinite(mark) || mark < 0 || mark > 100) {
            message.textContent =
            "Marks must be between 0 and 100.";
            return;
        }
    }
    const english = marks[0];
    const math = marks[1];
    const computer = marks[2];
    const science = marks[3];
    const urdu = marks[4];
    const totalMarks = 500;
    const obtainedMarks =
    english + math + computer + science + urdu;
    const percentage = (obtainedMarks / totalMarks) * 100;
    // Grade calculate karna
    let grade;
    if (percentage >= 80) {
        grade = "A+";
    } else if (percentage >= 70) {
        grade = "A";
    } else if (percentage >= 60) {
        grade = "B";
    } else if (percentage >= 50) {
        grade = "C";
    } else if (percentage >= 33) {
        grade = "D";
    } else {
        grade = "F";
    }
    // Pass ya fail check karna
    let status;
    if (
        english >= 33 &&
        math >= 33 &&
        computer >= 33 &&
        science >= 33 &&
        urdu >= 33
    ) {
        status = "Pass";
    } else {
        status = "Fail";
    }
    // Student ka complete result
    const studentResult = {
        name: name,
        totalMarks: totalMarks,
        obtainedMarks: obtainedMarks,
        percentage: percentage.toFixed(2),
        grade: grade,
        status: status
    };
    // Naye student ko array mein add karna
    savedResults.push(studentResult);
    // Updated results show karna
    displayResults();
    message.style.color = "green";
    message.textContent = "Result saved successfully!";
    // Form clear karna
    resultForm.reset();
});