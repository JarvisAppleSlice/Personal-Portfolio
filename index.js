// const { comment } = require("postcss");

//Projects List and Initialization
const pItems = [
	{
		title: "Udemy HTML Project",
		url: "https://github.com/JarvisAppleSlice/html-portfolio.git",
		description:
			"My personal introduction project in software dev. This was a Code along/Personal Project I have been working on at Home.",
		viewAt: "-View On GitHub-",
	},
	{
		title: "Static Web App",
		url: "https://mango-forest-05e2a0210.4.azurestaticapps.net",
		description:
			"My First static Web App. It is a Live website using Asure. This project is a current Work in Progress.",
		viewAt: "-View Website-",
	},
	{
		title: "Weather App",
		url: "https://github.com/JarvisAppleSlice/Weather-App.git",
		description:
			"This was a Code along Weather app build. This was lots of fun because there was alot of troubleshooting involved.",
		viewAt: "-View On GitHub-",
	},
	{
		title: "Resume App",
		url: "https://github.com/JarvisAppleSlice/Resume-App.git",
		description:
			"This was another introductory App Made in the introduction of the Software development class at BATC. Lots of fun for me, getting an idea of how software development works.",
		viewAt: "-View On GitHub-",
	},
];

const dragonDiv = document.getElementById("dragon");

pItems.forEach((pitem) => {
	//Declaring Variables. I used 2 breaks in order to create the space on the app.

	const titleText = pitem.title;
	const urlText = pitem.url;
	const descriptionText = pitem.description;
	const viewAttext = pitem.viewAt;
	const br = document.createElement("br");
	const br1 = document.createElement("br");

	//creation of the title element

	const titleDiv = document.createElement("div");
	titleDiv.classList.add("dragon-title");
	titleDiv.textContent = titleText;

	const projectDetailsDiv = document.createElement("div");
	projectDetailsDiv.classList.add("projectdetails");

	//creation of the URL element. Using an anchor and Target _blank

	const urlDiv = document.createElement("a");
	urlDiv.setAttribute("href", urlText);
	urlDiv.target = "_blank";
	urlDiv.classList.add("dragon-url");
	urlDiv.textContent = viewAttext;

	//creation of the description element

	const descriptionDiv = document.createElement("div");
	descriptionDiv.classList.add("dragon-description");
	descriptionDiv.textContent = descriptionText;

	projectDetailsDiv.appendChild(descriptionDiv);

	projectDetailsDiv.appendChild(urlDiv);

	//Methods

	dragonDiv.appendChild(titleDiv);

	// dragonDiv.appendChild(descriptionDiv);

	// dragonDiv.appendChild(urlDiv);

	dragonDiv.appendChild(projectDetailsDiv);

	titleDiv.addEventListener("click", () => {
		titleDiv.classList.toggle("active");
		// projectDetailsDiv.classList.toggle("active");
		descriptionDiv.classList.toggle("active");
		urlDiv.classList.toggle("active");
	});

	// dragonDiv.appendChild(br);

	// dragonDiv.appendChild(br1);
});

class DatabaseObject {
	toString() {
		throw new Error("Not implemented");
	}
}

class Testimonial extends DatabaseObject {
	constructor({ id, comment, rating, rId }) {
		super();
		this.id = id;
		this.comment = comment;
		this.rating = rating;
		this.rId = rId;
	}
	toString() {
		return `"${this.comment}" - ${this.rating}/5`;
	}
}

class Reference extends DatabaseObject {
	constructor({ id, name, email, company = null }) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.company = company;
	}
	toString() {
		// return this.company ? `${this.name} (${this.company})` : this.name;
		return `${this.name} (${this.company})`;
	}
}

class ReferenceDao {
	static seeds = [
		{
			id: 1,
			name: "The Grinch",
			email: "mount.crumpet@whoville.com",
		},
		{
			id: 2,
			name: "James Bond",
			email: "bond.james.bond@mi6.com",
			company: "MI6",
		},
		{
			id: 3,
			name: "Jason Borne",
			email: "jason.b@blackbriar.com",
			company: "Treadstone",
		},
	];
	getAll() {
		throw new Error("Not implemented");
	}
	create(reference) {
		throw new Error("Not implemented");
	}
}
class TestimonialDao {
	static seeds = [
		{
			id: 1,
			comment: "Hate hate hate, DOUBLE hate...... LOATHE ENTIRELY",
			rating: 1,
			rId: 1,
		},
		{
			id: 2,
			comment: "The names Bond, James Bond.",
			rating: 2,
			rId: 2,
		},
		{
			id: 3,
			comment:
				"I can tell you the license plate numbers of all six cars outside. I can tell you that our waitress is left-handed and the guy sitting up at the counter weighs two hundred fifteen pounds and knows how to handle himself. I know the best place to look for a gun is the cab or the gray truck outside, and at this altitude, I can run flat out for a half mile before my hands start shaking. Now why would I know that? How can I know that and not know who I am?",
			rating: 5,
			rId: 3,
		},
	];
	getAll() {
		throw new Error("Not implemented");
	}
	create(testimonial) {
		throw new Error("Not implemented");
	}
}

//Storage

class LocalStorageReferenceDao extends ReferenceDao {
	constructor() {
		super();
		this.database = localStorage;
	}
	getAll() {
		const json = this.database.getItem("references");
		const data = json ? JSON.parse(json) : ReferenceDao.seeds;
		return data.map((r) => new Reference(r));
	}
	create(reference) {
		const refs = this.getAll();
		refs.push(reference);
		this.database.setItem("references", JSON.stringify(refs));
	}
}

class LocalStorageTestimonialDao extends TestimonialDao {
	constructor() {
		super();
		this.database = localStorage;
	}
	getAll() {
		const json = this.database.getItem("testimonials");
		const data = json ? JSON.parse(json) : TestimonialDao.seeds;
		return data.map((t) => new Testimonial(t));
	}
	create(testimonial) {
		const testimonials = this.getAll();
		console.log("testimonials");
		console.log(testimonials);
		testimonials.push(testimonial);
		this.database.setItem("testimonials", JSON.stringify(testimonials));
	}
}

//Cookies

class CookiesReferenceDao extends ReferenceDao {
	getAll() {
		const cookie = document.cookie
			.split("; ")
			.find((c) => c.startsWith("references="))
			?.split("=")[1];

		const data = cookie ? JSON.parse(cookie) : ReferenceDao.seeds;
		return data.map((r) => new Reference(r));
	}
	create(reference) {
		const refs = this.getAll();
		refs.push(reference);
		document.cookie = `references=${JSON.stringify(refs)}; max-age=100`;
	}
}

class CookiesTestimonialDao extends TestimonialDao {
	getAll() {
		const cookie = document.cookie
			.split("; ")
			.find((c) => c.startsWith("testimonials="))
			?.split("=")[1];

		const data = cookie ? JSON.parse(cookie) : TestimonialDao.seeds;
		return data.map((t) => new Testimonial(t));
	}
	create(testimonial) {
		const refs = this.getAll();
		testimonials.push(testimonial);
		document.cookie = `testimonials=${JSON.stringify(testimonials)}; max-age=100`;
	}
}

class CreateTestimonial {
	constructor(referenceDao, testimonialDao) {
		this.referenceDao = referenceDao;
		this.testimonialDao = testimonialDao;
	}
	createReferenceWithOptionalTestimonial(referenceData, testimonialData = null) {
		const reference = new Reference(referenceData);
		this.referenceDao.create(reference);

		if (testimonialData) {
			const testimonial = new Testimonial({ ...testimonialData, rId: reference.id });
			this.testimonialDao.create(testimonial);
		}
	}
}

// References List

const referenceList = document.getElementById("references-list");
const references = referenceDao.getAll();
for (let i = 0; i < references.length; i++) {
	const reference = references[i];
	const referenceLi = document.createElement("li");
	referenceLi.textContent = reference.toString();
	referenceList.appendChild(referenceLi);
}

//Switch between Session Storage and Cookies

//Session
const referenceDao = new LocalStorageReferenceDao();
const testimonialDao = new LocalStorageTestimonialDao();

//Cookies
// const referenceDao = new CookiesReferenceDao();
// const testimonialDao = new CookiesTestimonialDao();

const CreateTestimonialService = new CreateTestimonial(referenceDao, testimonialDao);

const testimonials = testimonialDao.getAll();

const average = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

document.querySelector("h3").textContent = `Average Rating: ${average.toFixed(1)}`;

//Form submission
const form = document.getElementById("create-reference-form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const formData = new FormData(form);
	const referenceData = {
		id: Date.now(),
		name: formData.get("name"),
		email: formData.get("email"),
		company: formData.get("company") || null,
	};
	const comment = formData.get("comment");
	const rating = formData.get("rating");

	let testimonialData = null;

	if (comment && rating) {
		testimonialData = {
			id: Date.now(),
			comment,
			rating: Number(rating),
		};
	}
	CreateTestimonialService.createReferenceWithOptionalTestimonial(
		referenceData,
		testimonialData,
	);

	form.reset();
});
