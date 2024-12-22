import path from "path";
import sqlite3 from "sqlite3";
import { player } from "./migration";

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

export const joinLobby = async (lobby_name: string, player_Two_ID: string) => {
    return await new Promise((resolve, reject) => {
        db.get(
            `SELECT name from players, name from lobbies FROM players 
            JOIN lobbies as lobbies ON players.id = player_Two_ID`,
            [player_Two_ID],
            (err, row) => {
                if(err) {
                    reject(err);
                }
                resolve(row);
            }
        )
    })
}

export const createLobby = async (playerOneId: number) => {
    return await new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO lobbies (player_One_ID, player_Two_ID) VALUES (?, ?)`,
            [playerOneId, null],
            function(err) {
                if (err) {
                    reject(err);
                }
                resolve(this);
            }
        );
    });
}