import bodyParser from "body-parser";
import express from "express";
import { CardFace } from "../Business/Card";
import { Player } from "../Business/Player";
import { Round } from "../Business/Round";

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

Object.keys(CardFace)
  .reverse()
  .forEach(face => {
    // tslint:disable-next-line:no-console
    console.log(face);
  });

app.listen(80, () => {
  // tslint:disable-next-line:no-console
  console.log("Listening on port 80 ...");
});

app.post("/solveround", (req, res, next) => {
  // res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
  // tslint:disable-next-line:no-console
  console.log(req.body);

  const players = new Map<string, string>();

  req.body.players.forEach((p: { name: string; cards: string; }) => {
    players.set(p.name, p.cards);
  });

  const round: Round = new Round(players, req.body.community_cards);

  const response: any = {};
  let i = 0;
  round.OrderedPlayers.forEach((p: Player) => {
    response[p.name] = {
      combinations: p.hand.BestFiveCards,
      rank: i
    };
    i++;
  });

  res.json(response);
});
