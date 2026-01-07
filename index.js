//Projects List and Initialization
const pItems = [
	{
		title: "Udemy HTML Project",
		url: "https://github.com/JarvisAppleSlice/html-portfolio.git",
		description:
			"My personal introduction project in software dev. This was a Code along/Personal Project I have been working on at Home.",
	},
	{
		title: "Personal Portfolio Static Web App",
		url: "https://mango-forest-05e2a0210.4.azurestaticapps.net",
		description: "My First static Web App. It is a Live website using Asure.",
	},
	{
		title: "Weather App",
		url: "https://github.com/JarvisAppleSlice/Weather-App.git",
		description:
			"This was a Code along Weather app build. This was lots of fun because there was alot of troubleshooting involved.",
	},
	{
		title: "Resume App",
		url: "https://github.com/JarvisAppleSlice/Resume-App.git",
		description:
			"This was another introductory App Made in the introduction of the Software development class at BATC.",
	},
];

const dragonDiv = document.getElementById("dragon");

pItems.forEach((pitem) => {
	const titleText = pitem.title;
	const urlText = pitem.url;
	const descriptionText = pitem.description;
	const br = document.createElement("br");

	const titleDiv = document.createElement("div");
	titleDiv.classList.add("dragon-title");
	titleDiv.textContent = titleText;

	const urlDiv = document.createElement("a");
	urlDiv.setAttribute("href", urlText);
	urlDiv.classList.add("dragon-url");
	urlDiv.textContent = urlText;

	const descriptionDiv = document.createElement("div");
	descriptionDiv.classList.add("dragon-description");
	descriptionDiv.textContent = descriptionText;

	titleDiv.appendChild(urlDiv);

	dragonDiv.appendChild(titleDiv);

	dragonDiv.appendChild(descriptionDiv);

	dragonDiv.appendChild(br);
});
