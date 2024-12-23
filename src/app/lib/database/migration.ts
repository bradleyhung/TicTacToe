import { db } from "./database";

export const player = () => {
    db.serialize(() => {
        db.run(
            `
            CREATE TABLE IF NOT EXISTS players (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                );
            `,
            (err: Error) => {
                if (err) {
                    console.error(err.message);
                }
                console.log("Created players table successfully");
            }
        )
    })
}

export const middleman = () => {
    db.serialize(() => {
        db.run (
            `
            CREATE TABLE IF NOT EXISTS middleman (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                playerID INT NOT NULL,
                lobbyID INT NOT NULL,
                PRIMARY KEY (playerID, lobbyID),
                FOREIGN KEY playerID REFERENCES players(id),
                FOREIGN KEY lobbyID REFERENCES lobbies(id) ON DELETE CASCADE,
            );
            `,
            (err: Error) => {
                if (err) {
                    console.error(err.message);
                }
                console.log("Created middleman table successfully");
            }
        )
    })
}

export const lobby = () => {
    db.serialize(() => {
        db.run (
            `
            CREATE TABLE IF NOT EXISTS lobbies (
                id INTEGER PRIMARY KEY AUTOINCREMEBT,
                name TEXT NOT NULL UNIQUE,
                FOREIGN KEY games INT REFERENCES games(id),
                );
            `,
            (err: Error) => {
                if (err) {
                    console.error(err.message);
                }
                console.log("Created lobbies table successfully");
            }
        )
    })
}   

export const game = () => {
    db.serialize(() => {
        db.run(
            `
            CREATE TABLE IF NOT EXISTS games (
                id INTEGER PRIMARY KEY AUTOINCREMEBT,
                FOREIGN KEY winner INT REFERENCES players(id),
                FOREIGN KEY lobby INT REFERENCES lobbies(id) ON DELETE CASCADE,
            );
            `,
            (err: Error) => {
                if (err) {
                    console.error(err.message);
                }
                console.log("Created games table successfully");
            }
        )
    })
}

