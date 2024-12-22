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

export const lobby = () => {
    db.serialize(() => {
        db.run (
            `
            CREATE TABLE IF NOT EXISTS lobbies (
                id INTEGER PRIMARY KEY AUTOINCREMEBT,
                name TEXT NOT NULL UNIQUE,
                player_One_ID INT NOT NULL,
                FOREIGN KEY player_Two_ID INT REFERENCES players(id),
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
                Player_One_ID INT NOT NULL
                Player_Two_ID INT NOT NULL,
                FOREIGN KEY lobby_ID INT REFERENCES lobbies(id),
                )`
        )
    })
}