import path from "path";
import sqlite3 from "sqlite3";

const dbPath = path.join(process.cwd(), "player.db");
export const db = new sqlite3.Database(
 dbPath,
 sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
 (err) => {
  if (err) {
   console.error(err.message);
  }
  console.log("Connected to the player database.");
 }
);

export const getPlayer = async (name: string) => {
    return await new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM players WHERE name = ?`,
            [name],
            (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            }
        );
    })
}

export const createPlayer = async (name: string) => {
    return await new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO players (name) VALUES (?)`,
            [name],
            function(err) {
                if (err) {
                    reject(err);
                }
                resolve(this);
            }
        );
    });
}

export const createMiddleman = async (playerID: number, lobbyID: number) => {
    return await new Promise((resolve, reject) => {
        db.run (
            `INSERT INTO middleman (playerID, lobbyID) VALUES (?, ?)`,
            [playerID, lobbyID],
            function(err) {
                if (err) {
                    reject(err);
                }
                resolve(this);
            }
        )
    });
}

// Not using this function because of ON DELETE CASCADE from the migration file
// export const deleteMiddleman = async (lobbyID: number) => {
//     return await new Promise((resolve, reject) => {
//         db.run(
//             `
//             DELETE FROM middleman WHERE lobbyID = ?`,
//             [lobbyID],
//             function(err) {
//                 if (err) {
//                     reject(err);
//                 }
//             resolve(this);
//             }
//         )
//     });
// }

export const createLobby = async (lobby_name: string) => {
    return await new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO lobbies (name) VALUES (?)`,
            [lobby_name],
            function(err) {
                if (err) {
                    reject(err);
                }
                resolve(this);
            }
        );
    });
}

export const deleteLobby = async (lobby_name: string) => {
    return await new Promise((resolve, reject) => {
        db.run(
            `DELETE FROM lobbies WHERE name = ?`,
            [lobby_name],
            function(err) {
                if (err) {
                    reject(err);
                }
                resolve(this);
            }
        )
    })
}

export const createGame = async () => {
    return await new Promise((resolve, reject) => {
        db.run (
            `INSERT INTO games DEFAULT VALUES`,
            function(err) {
                if (err) {
                    reject(err);
                }
                resolve(this);
            }
        )
    })
}

