import { getPlayer } from './database'
import { createPlayer } from './database'

export async function GET(req: Response, res: Response) {
    const query = `
    SELECT * from players
    `;

    let status, body;
    try {
        await getPlayer(query)
        .then((res) => {
            status = 200;
            body = res;
        })
        .catch((err: Error) => {
            status = 400;
            body = { error: err};
        })
        return Response.json(body, {status});
    }
    catch (error: any) {
        console.error((error as Error).message);
        return Response.json(
            {error: error},
            { status: 400 }            
        )
    }
}

export async function POST(req: Request, res: Response) {
    const body = await req.json();
    const {name} = body;

    const query = `
        INSERT INTO players (name)
    `;
    const values = [name];

    let status, respBody;
    await createPlayer(name)
    .then((player) => {
        status = 200;
        respBody = { message : "Player successfully created"};
    })
    .catch((err) => {
        status = 400;
        respBody = { message : "Player already exists"};
    })
    return Response.json(respBody, {status});
}