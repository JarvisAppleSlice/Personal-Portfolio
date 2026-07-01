const projects = [
	{
		title: "React Recipe Database App",
		url: "https://react-final-chi-one.vercel.app/",
		description:
			"React app with Registration/Login, Recipe creation and storage, verification and integrated database. Hosted through Vercel",
		viewAt: "View Project",
	},
	{
		title: "React Portfolio App",
		url: "https://react-final-chi-one.vercel.app/",
		description:
			"React app with Registration/Login, basic messaging, verification and article sharing. Hosted through Vercel",
		viewAt: "View Project",
	},
	{
		title: "Udemy HTML Project",
		url: "https://github.com/JarvisAppleSlice/html-portfolio.git",
		description: "Intro HTML/CSS/JS project.",
		viewAt: "View Project",
	},
	{
		title: "Static Web App",
		url: "https://mango-forest-05e2a0210.4.azurestaticapps.net",
		description: "First Azure deployment.",
		viewAt: "View Website",
	},
	{
		title: "Weather App",
		url: "https://github.com/JarvisAppleSlice/Weather-App.git",
		description: "API-based weather app.",
		viewAt: "View Project",
	},
	{
		title: "Resume App",
		url: "https://github.com/JarvisAppleSlice/Resume-App.git",
		description: "Intro C# app.",
		viewAt: "View Project",
	},
	{
		title: "Music Management App",
		url: "https://github.com/JarvisAppleSlice/musiclibrarymanager.git",
		description: "ASP.NET Core + EF Core CRUD app.",
		viewAt: "View Project",
	},
];

const container = document.getElementById("dragon");

if (container) {
	projects.forEach((p) => {
		const card = document.createElement("div");
		card.classList.add("project-item");

		const title = document.createElement("button");
		title.classList.add("project-title");
		title.textContent = p.title;

		const details = document.createElement("div");
		details.classList.add("project-details");

		const desc = document.createElement("p");
		desc.textContent = p.description;

		const link = document.createElement("a");
		link.href = p.url;
		link.target = "_blank";
		link.classList.add("project-link");
		link.textContent = p.viewAt;

		details.appendChild(desc);
		details.appendChild(link);

		card.appendChild(title);
		card.appendChild(details);
		container.appendChild(card);

		title.addEventListener("click", () => {
			card.classList.toggle("active");
		});
	});
}

// Clean references
const refList = document.getElementById("references-list");
if (refList) {
	refList.innerHTML = "<li>Professional references available upon request</li>";
}

// Contact form UX only
const contactForm = document.getElementById("contact-form");

if (contactForm) {
	contactForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const formData = {
			name: document.getElementById("name").value,
			email: document.getElementById("email").value,
			message: document.getElementById("message").value,
		};

		try {
			const res = await fetch(
				"https://portfoliofunction-dwgkftdfeybtaba3.westus2-01.azurewebsites.net/api/Contact",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				},
			);

			if (!res.ok) {
				throw new Error("Request failed");
			}

			alert("Message sent successfully!");
			contactForm.reset();
		} catch (err) {
			console.error(err);
			alert("Failed to send message.");
		}
	});
}
