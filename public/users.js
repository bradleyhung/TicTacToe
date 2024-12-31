const formElement = document.getElementById("update-name-form");

formElement.addEventListener("submit", (event) => {
	event.preventDefault();

	const formData = new FormData(formElement);

	const id = formData.get("id");
	const name = formData.get("name");

	fetch("/users/" + id + "?name=" + name, {
		method: "PUT",
	}).then(() => {
		window.location.reload();
	});
});

const nameformElement = document.getElementById("name-form");

nameformElement.addEventListener("submit", (event) => {
	event.preventDefault();

	const formData = new FormData(nameformElement);

	fetch("/users", {
		method: "POST",
		body: formData,
	}).then(() => {
		window.location.reload();
	});
});
