//Projects List and Initialization
const pItems = [
	{
		title: "Udemy HTML Project",
		url: "https://github.com/JarvisAppleSlice/html-portfolio.git",
		description:
			"My personal introduction project in software dev. This was a Code along/Personal Project I have been working on at Home.",
	},
	{
		title: "Static Web App",
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
			"This was another introductory App Made in the introduction of the Software development class at BATC. Lots of fun for me, getting an idea of how software development works.",
	},
];

const dragonDiv = document.getElementById("dragon");

pItems.forEach((pitem) => {
	//Declaring Variables. I used 2 breaks in order to create the space on the app.

	const titleText = pitem.title;
	const urlText = pitem.url;
	const descriptionText = pitem.description;
	const br = document.createElement("br");
	const br1 = document.createElement("br");

	//creation of the title element

	const titleDiv = document.createElement("div");
	titleDiv.classList.add("dragon-title");
	titleDiv.textContent = titleText;

	//creation of the URL element. Using an anchor and Target _blank

	const urlDiv = document.createElement("a");
	urlDiv.setAttribute("href", urlText);
	urlDiv.target = "_blank";
	urlDiv.classList.add("dragon-url");
	urlDiv.textContent = urlText;

	//creation of the description element

	const descriptionDiv = document.createElement("div");
	descriptionDiv.classList.add("dragon-description");
	descriptionDiv.textContent = descriptionText;

	//Methods

	dragonDiv.appendChild(titleDiv);

	dragonDiv.appendChild(urlDiv);

	dragonDiv.appendChild(descriptionDiv);

	dragonDiv.appendChild(br);

	dragonDiv.appendChild(br1);
});
