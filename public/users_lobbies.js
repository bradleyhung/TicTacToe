const usersLobbyNameFormElement = document.getElementById("users-lobby-name-form");

usersLobbyNameFormElement.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(usersLobbyNameFormElement);

	fetch("/users_lobbies", {
		method: "POST",
		body: formData,
	}).then(() => {
		window.location.reload();
	})
});
