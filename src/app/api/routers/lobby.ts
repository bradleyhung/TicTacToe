import { createLobby } from '../../lib/database/database'

export async function POST(req: Request, res: Response) {
    const body = await req.json();
    const {name} = body;

    const query = `
        INSERT INTO lobby (name)
        VALUES ( ?)
    `;
    const values = [name];

    let status, respBody;
    await createLobby(name)
    .then(() => {
        status = 200;
        respBody = { message : "Lobby successfully created"};
    })
    .catch((err) => {
        status = 400;
        respBody = { message : "Lobby already exists"};
    });
    return Response.json(respBody, {status});
}