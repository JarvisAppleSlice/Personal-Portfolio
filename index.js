// ================================
// Projects Data
// ================================

const projects = [
	{
		title: "Udemy HTML Project",
		url: "https://github.com/JarvisAppleSlice/html-portfolio.git",
		description:
			"My introductory software development project built as part of my early training in HTML, CSS, and JavaScript.",
		viewAt: "View Project",
	},
	{
		title: "Static Web App",
		url: "https://mango-forest-05e2a0210.4.azurestaticapps.net",
		description: "My first deployed static web application using Azure Static Web Apps.",
		viewAt: "View Website",
	},
	{
		title: "Weather App",
		url: "https://github.com/JarvisAppleSlice/Weather-App.git",
		description:
			"A frontend weather application built as a guided project with API integration and DOM manipulation.",
		viewAt: "View Project",
	},
	{
		title: "Resume App",
		url: "https://github.com/JarvisAppleSlice/Resume-App.git",
		description:
			"An introductory application built during my foundational software development coursework.",
		viewAt: "View Project",
	},
	{
		title: "Music Management App",
		url: "https://github.com/JarvisAppleSlice/musiclibrarymanager.git",
		description:
			"ASP.NET Core Razor Pages application for managing songs, albums, and artists using Entity Framework Core.",
		viewAt: "View Project",
	},
];

// ================================
// Render Projects (Accordion UI)
// ================================

const projectContainer = document.getElementById("dragon");

projects.forEach((project) => {
	// Wrapper
	const projectItem = document.createElement("div");
	projectItem.classList.add("project-item");

	// Title Button (Accordion Header)
	const titleButton = document.createElement("button");
	titleButton.classList.add("project-title");
	titleButton.textContent = project.title;

	// Details Container
	const details = document.createElement("div");
	details.classList.add("project-details");

	// Description
	const description = document.createElement("p");
	description.textContent = project.description;

	// Link
	const link = document.createElement("a");
	link.href = project.url;
	link.target = "_blank";
	link.rel = "noopener noreferrer";
	link.classList.add("project-link");
	link.textContent = project.viewAt;

	// Assemble
	details.appendChild(description);
	details.appendChild(link);

	projectItem.appendChild(titleButton);
	projectItem.appendChild(details);
	projectContainer.appendChild(projectItem);

	// Accordion behavior
	titleButton.addEventListener("click", () => {
		projectItem.classList.toggle("active");
	});
});

// ================================
// References (NOW CLEAN)
// ================================

const referencesSection = document.getElementById("references-list");

if (referencesSection) {
	referencesSection.innerHTML = `
        <li>Professional references available upon request</li>
    `;
}

// ================================
// Contact Form (optional safe handling)
// ================================

const contactForm = document.getElementById("contact-form");

if (contactForm) {
	contactForm.addEventListener("submit", (event) => {
		event.preventDefault();

		// For now just simple UX feedback
		alert("Message sent! I will get back to you soon.");

		contactForm.reset();
	});
}
