const lobbyNameFormElement = document.getElementById("lobby-name-form");

lobbyNameFormElement.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(lobbyNameFormElement);

	fetch("/lobbies", {
		method: "POST",
		body: formData,
	}).then(() => {
		window.location.reload();
	});
});
