const resultForm = document.getElementById("resultForm");
const message = document.getElementById("message");
const result = document.getElementById("result");
// Form submit hone par result calculate hoga
resultForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("studentName").value.trim();
    // Sab subjects ke marks Number mein convert karna
    const english = Number(document.getElementById("english").value);
    const math = Number(document.getElementById("math").value);
    const computer = Number(document.getElementById("computer").value);
    const science = Number(document.getElementById("science").value);
    const urdu = Number(document.getElementById("urdu").value);

    // Check karna ke koi field empty to nahi
    const inputs = [
        document.getElementById("english"),
        document.getElementById("math"),
        document.getElementById("computer"),
        document.getElementById("science"),
        document.getElementById("urdu")
    ];
    for (let input of inputs) {
        if (input.value.trim() === "") {
            message.textContent = "Please enter marks for all subjects.";
            result.style.display = "none";
            return;
        }
    }
    // Student name validate karna
    if (name === "") {
        message.textContent = "Please enter student name.";
        result.style.display = "none";
        return;
    }
    // Marks validate karna
    const marks = [english, math, computer, science, urdu];

    for (let mark of marks) {
        if (mark < 0 || mark > 100) {
            message.textContent = "Marks must be between 0 and 100.";
            result.style.display = "none";
            return;
        }
    }
    // Total aur obtained marks calculate karna
    const totalMarks = 500;
    const obtainedMarks = english + math + computer + science + urdu;
    // Percentage calculate karna
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
    // Pass ya Fail check karna
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
    // Result webpage par display karna
    document.getElementById("showName").textContent = name;
    document.getElementById("totalMarks").textContent = totalMarks;
    document.getElementById("obtainedMarks").textContent = obtainedMarks;
    document.getElementById("percentage").textContent =
     percentage.toFixed(2) + "%";
    document.getElementById("grade").textContent = grade;
    document.getElementById("status").textContent = status;
    // Pass aur Fail ke colors
    document.getElementById("status").style.color =
        status === "Pass" ? "green" : "red";
    message.textContent = "";
    result.style.display = "block";
});