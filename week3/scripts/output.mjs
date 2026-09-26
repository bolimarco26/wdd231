export function setTitle(course) {
    const title = document.querySelector("#title");

    title.textContent = `${course.code} - ${course.name}`;
}

export function renderSections(sections) {
    const output = document.querySelector("#sections");

    output.innerHTML = "";

    sections.forEach((section) => {
        const sectionElement = document.createElement("div");

        sectionElement.classList.add("section-card");

        sectionElement.innerHTML = `
            <h3>Section ${section.sectionNum}</h3>
            <p><strong>Instructor:</strong> ${section.instructor}</p>
            <p><strong>Days:</strong> ${section.days}</p>
            <p><strong>Enrolled:</strong> ${section.enrolled}</p>
        `;

        output.appendChild(sectionElement);
    });
}