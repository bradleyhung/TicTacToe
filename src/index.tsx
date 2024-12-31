import { Hono } from "hono";
import { Database } from "bun:sqlite";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use(logger());
app.use("/public/*", serveStatic({ root: "./" }));

const db = new Database();

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  ) 
`);

db.exec(`
	CREATE TABLE IF NOT EXISTS lobbies (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL UNIQUE,
		isAvailable BOOLEAN NOT NULL,
		user_id INTEGER NOT NULL,
		FOREIGN KEY (user_id) REFERENCES user (id)
	)
`);

db.exec(`
	CREATE TABLE IF NOT EXISTS users_lobbies (
		user_id INTEGER NOT NULL,
		lobby_id INTEGER NOT NULL,
		PRIMARY KEY (user_id, lobby_id),
		FOREIGN KEY (lobby_id) REFERENCES lobby (id) ON DELETE CASCADE,
		FOREIGN KEY (user_id) REFERENCES user (id)
	)
`);

// request method => PUT => add 2nd player w/ Join button
// Put table for also leaving the lobby
// have an app.get("/lobbies:id") and retrieving that lobby using param

app.get("/lobbies", async (c) => {
	const lobbies = db.query("SELECT * FROM lobbies").all() as {
		id: number;
		name: string;
		whoCreated: string;
	}[];

	return c.html(
		<html>
			<head>
				<script src="https://cdn.tailwindcss.com"></script>
			</head>
			<body>
				<div>
					{lobbies.length > 0 ? (
						lobbies.map((lobby) => (
							<div>
								{lobby.id}. {lobby.name} created By{" "}
								{lobby.whoCreated}
							</div>
						))
					) : (
						<div class="text-slate-400">Empty</div>
					)}
				</div>
				<h1>Creating Form</h1>
				<CreateLobbyForm />
				<script type="/javascript" src="/public/lobbies.js"></script>
			</body>
		</html>
	);
});

app.post("/lobbies", async (c) => {
	const data = await c.req.formData();
	const lobbyNameFormData = data.get("lobby_name");

	if (lobbyNameFormData == null) {
		return c.body(null, {
			status: 404,
		});
	}

	const name = lobbyNameFormData.toString();

	db.query(
		`INSERT INTO lobbies (name, isAvailable, user_id) VALUES (?, ?, ?)`
	).run(name, true, 1);
	// db.query(`INSERT INTO users_lobbies (user_id, lobby_id) VALUES (?, ?)`).run(user_id, lobby_id)

	return c.html(
		<html>
			<body>Lobby created.</body>
		</html>
	);
});

function CreateLobbyForm() {
	return (
		<>
			<form action="/lobbies" method="post" id="lobby-name-form">
				<div>
					<label>Lobby Name</label>
					<input type="text" name="lobby_name" />
				</div>
				<button type="submit">Submit</button>
			</form>
		</>
	);
}

function CreateUserForm() {
	return (
		<form action="/users" method="post" id="name-form" class="mb-8">
			<div>
				<label>Name</label>
				<input type="text" name="name" />
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}

function UpdateUserForm() {
	return (
		<form action="/users" method="post" id="update-name-form">
			<div>
				<label>Id</label>
				<input type="number" name="id" />
			</div>
			<div>
				<label>Name</label>
				<input type="text" name="name" />
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}

app.get("/", (c) => {
	const users = db.query("SELECT * FROM users").all() as {
		id: number;
		name: string;
	}[];

	return c.html(
		<html>
			<head>
				<meta charset="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<script src="https://cdn.tailwindcss.com"></script>
				<title>TicTacToe</title>
			</head>
			<body>
				<h3 class="text-2xl">Users</h3>
				<div class="mb-8">
					{users.length > 0 ? (
						users.map((user) => (
							<div>
								{user.id}. {user.name}
							</div>
						))
					) : (
						<span class="text-stone-400">Empty</span>
					)}
				</div>
				<h3 class="text-2xl">Create User</h3>
				<CreateUserForm />
				<h3 class="text-2xl">Update User</h3>
				<UpdateUserForm />
				<script type="text/javascript" src="/public/users.js"></script>
			</body>
		</html>
	);
});

app.post("/users", async (c) => {
	const data = await c.req.formData();

	const nameFormData = data.get("name");
	if (nameFormData == null) {
		return c.body(null, {
			status: 500,
		});
	}

	const name = nameFormData.toString();
	db.query(`INSERT INTO users (name) VALUES (?)`).run(name);

	return c.html(
		<html>
			<head>
				<title>TicTacToe</title>
			</head>
			<body>
				<h1>User saved!</h1>
			</body>
		</html>
	);
});

app.put("/users/:id", (c) => {
	const id = c.req.param("id");
	const newName = c.req.query("name");

	const user = db.query("SELECT * FROM users WHERE id = ?").get(id) as {
		id: number;
		name: string;
	} | null;

	if (!user) return c.body(null, { status: 400 });

	if (id && newName) {
		db.query(`UPDATE users SET name = ? WHERE id = ?`).run(newName, id);
		return c.json({ message: "name was updated" });
	} else {
		return c.json({ message: "update failed" });
	}
});

export default app;
