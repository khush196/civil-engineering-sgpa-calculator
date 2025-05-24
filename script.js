  // Grade points mapping
        const gradePoints = {
            "A++": 10,
            "A+": 9,
            "A": 8.5,
            "B+": 8,
            "B": 7.5,
            "C+": 7,
            "C": 6.5,
            "D+": 6,
            "D": 5.5,
            "E+": 5,
            "E": 4,
            "F": 0,
        };

        // Civil Engineering subjects and their credits
        const civilSubjects = {
            "Technical Communication": 2,
            "Advance Engineering Mathematics": 3,
            "Engineering Mechanics": 2,
            "Surveying": 3,
            "Fluid Mechanics": 2,
            "Building Materials & Construction": 3,
            "Engineering Geology": 2,
            "Surveying Lab": 1.5,
            "Fluid Mechanics Lab": 1,
            "Computer Aided Civil Engineering Drawing": 1.5,
            "Civil Engineering Materials Lab": 1,
            "Geology Lab": 1,
            "Financial Literacy": 0.5,
            "Industrial Training": 1,
        };

        // Calculate total credits
        const totalCredits = Object.values(civilSubjects).reduce((sum, credit) => sum + credit, 0);

        // DOM elements
        const subjectInputsContainer = document.getElementById("subjectInputs");
        const calculateButton = document.getElementById("calculate");
        const resultDiv = document.getElementById("result");

        // Initialize the calculator
        function initializeCalculator() {
            renderSubjectInputs();
            calculateButton.addEventListener("click", calculateSGPA);
        }

        // Render subject input fields
        function renderSubjectInputs() {
            subjectInputsContainer.innerHTML = "";

            for (const [subject, credits] of Object.entries(civilSubjects)) {
                const div = document.createElement("div");
                div.classList.add("input-container");

                const label = document.createElement("label");
                label.setAttribute("for", subject.replace(/\s+/g, "_"));
                label.textContent = `${subject} (Credits: ${credits})`;

                const select = document.createElement("select");
                select.id = subject.replace(/\s+/g, "_");
                select.setAttribute("data-subject", subject);

                // Add default option
                const defaultOption = document.createElement("option");
                defaultOption.value = "";
                defaultOption.textContent = "Select Grade";
                defaultOption.disabled = true;
                defaultOption.selected = true;
                select.appendChild(defaultOption);

                // Populate grade options
                for (const [grade, points] of Object.entries(gradePoints)) {
                    const option = document.createElement("option");
                    option.value = grade;
                    option.textContent = `${grade} (${points})`;
                    select.appendChild(option);
                }

                div.appendChild(label);
                div.appendChild(select);
                subjectInputsContainer.appendChild(div);
            }
        }

        // Calculate SGPA
        function calculateSGPA() {
            let totalGradePoints = 0;
            let allGradesSelected = true;
            const selectedGrades = [];

            // Loop through each subject
            for (const [subject, credits] of Object.entries(civilSubjects)) {
                const selectElement = document.getElementById(subject.replace(/\s+/g, "_"));
                const selectedGrade = selectElement.value;

                if (!selectedGrade) {
                    allGradesSelected = false;
                    selectElement.style.borderColor = "#ff4444";
                    continue;
                } else {
                    selectElement.style.borderColor = "#ccc";
                }

                const gradePoint = gradePoints[selectedGrade];
                totalGradePoints += gradePoint * credits;
                selectedGrades.push({
                    subject: subject,
                    grade: selectedGrade,
                    points: gradePoint,
                    credits: credits,
                    weightedPoints: gradePoint * credits
                });
            }

            if (!allGradesSelected) {
                alert("Please select grades for all subjects!");
                return;
            }

            const sgpa = totalGradePoints / totalCredits;
            
            // Display result
            resultDiv.style.display = "block";
            resultDiv.innerHTML = `
                            <div>Your SGPA is: <span style="color: #1b263bff; font-size: 24px;">${sgpa.toFixed(2)}</span></div>
                <div style="font-size: 14px; margin-top: 10px; color: #778da9ff;">
                    Total Grade Points: ${totalGradePoints.toFixed(2)} | Total Credits: ${totalCredits}
                </div>
            `;

            // Scroll to result
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Console log for verification
            console.log("SGPA Calculation Details:");
            console.log("========================");
            selectedGrades.forEach(item => {
                console.log(`${item.subject}: ${item.grade} (${item.points}) × ${item.credits} = ${item.weightedPoints.toFixed(2)}`);
            });
            console.log(`Total Grade Points: ${totalGradePoints.toFixed(2)}`);
            console.log(`Total Credits: ${totalCredits}`);
            console.log(`SGPA: ${sgpa.toFixed(2)}`);
        }

        // Initialize when page loads
        window.addEventListener("load", initializeCalculator);