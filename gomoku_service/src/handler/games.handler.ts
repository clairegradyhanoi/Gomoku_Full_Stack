import { deserializeUser } from './../middleware/deserializeUser';
import express, { Request, Response } from 'express'; 
import mongoose from 'mongoose';
import validateSchema from '../middleware/validateSchema';
import { createGames, getGamesByUserId, updateGames, getOne, deleteGameByGameAndUserId } from '../service/games.service';
import { createGamesSchema, updateGamesSchema, getGamesByIdSchema } from '../schema/games.schema';
const gamesHandler = express.Router();
gamesHandler.use(deserializeUser)
let gameId: number;

gamesHandler.get("/:userId", validateSchema(getGamesByIdSchema), async (req: Request, res: Response) => {
    const userId = req.params.userId
    try{
        const userGames = await getGamesByUserId(userId);
        return res.status(200).send(userGames);
    }catch (err) {
        return res.status(500).send(err);
    }
});

gamesHandler.get("/", validateSchema(getGamesByIdSchema), async (req: Request, res: Response) => {
    const userId = req.userId
    try{
        const userGames = await getGamesByUserId(userId);
        return res.status(200).send(userGames);
    }catch (err) {
        return res.status(500).send(err);
    }
});

gamesHandler.get("/:userId/:gameId", validateSchema(getGamesByIdSchema), async (req: Request, res: Response) => {
    const g_Id = req.params.gameId
    const userId = req.params.userId
    try{
        const oneGame = await getOne({ gameId: { $eq: g_Id }, userId: { $eq: userId }} );
        return res.status(200).send(oneGame);
    }catch (err) {
        return res.status(500).send(err);
    }
});


gamesHandler.post("/", validateSchema(createGamesSchema), async (req: Request, res: Response) => {
     const game = req.body
     currentPlayer = game.result
     const userId = new mongoose.Types.ObjectId(req.userId)
     const newGame = await createGames({ ...game, userId})
     return res.status(200).json({"message":`${currentPlayer}`})
 })


  gamesHandler.delete("/:userId/:gameId", validateSchema(updateGamesSchema), async (req: Request, res: Response) => {
     const gameId = req.params.gameId as unknown as number
     const userId = req.params.userId
     const deleteGameUpdate = await deleteGameByGameAndUserId({gameId: { $eq: gameId}, userId: {$eq: userId}})
     return res.status(200).send(deleteGameUpdate)
 })

 gamesHandler.put("/", validateSchema(updateGamesSchema), async (req: Request, res: Response) => {
     const gameUpdate = req.body
     const userId = new mongoose.Types.ObjectId(req.userId)
     gameId = gameUpdate.gameId
     currentPlayer = gameUpdate.result
     whiteState = gameUpdate.whiteMoves
     blackState = gameUpdate.blackMoves
     if (currentPlayer === "Current Player: White" || currentPlayer === "White was the winner"){
        currentPlayer = CheckForWinner(gameUpdate.whiteMoves, "White", gameUpdate.boardsize)
        gameUpdate.result = currentPlayer
        await updateGames(gameId, userId, { ...gameUpdate})
        return res.status(200).json({"message":`${currentPlayer}`})
     }
    else if (currentPlayer === "Current Player: Black" || currentPlayer === "Black was the winner"){
        currentPlayer = CheckForWinner(gameUpdate.blackMoves, "Black", gameUpdate.boardsize) 
        gameUpdate.result = currentPlayer
        gameUpdate.blackMoves = req.body.blackMoves
        await updateGames(gameId, userId, { ...gameUpdate})
        return res.status(200).json({"message":`${currentPlayer}`})
    }
 })


let whiteState: number[] = []
let blackState: number[] = []
let currentPlayer: string
function CheckForWinner(unsortedState: number [] = [], colour: string, bs: number){
  let state = unsortedState
  if (colour === "Black"){
    currentPlayer = "Current Player: White"
    blackState = state
  }
   
  else if (colour === "White"){
    currentPlayer = "Current Player: Black"
    whiteState = state
  }
  let boardSize = bs
  let rowLength = boardSize
  let rowMinus = boardSize - 1
  let rowPlus = boardSize + 1
      for (let i = 0; i < state.length; i++){
        
        //horizontal
        if (state.length >= 5 && (state[i+4] - state[i]) === 4){
          if (state.length === 5){
            currentPlayer = colour + " is the WINNER!"
            return currentPlayer
          } else if (state.length > 5 && state[i+5] - state[i+4] !== 1 && state[i] - state[i-1] !== 1){
            currentPlayer = colour + " is the WINNER!"
            return currentPlayer
          } 
        }
        //diagonal NE - SW
        else if(state.includes(state[i] + (rowMinus)) && state[i]%boardSize !== (state[i] + rowMinus)%boardSize){
          if (state.includes(state[i] + (rowMinus * 2)) && state[i]%boardSize !== (state[i] + rowMinus*2)%boardSize) {
            if (state.includes(state[i] + (rowMinus * 3)) && state[i]%boardSize !== (state[i] + rowMinus*3)%boardSize){
              if (state.includes(state[i] + (rowMinus * 4)) && state[i]%boardSize !== (state[i] + rowMinus*4)%boardSize){
                if (!state.includes(state[i] + (rowMinus * 5)) && !state.includes(state[i] - rowMinus) && state[i] - rowMinus >= 0){
                  currentPlayer = colour + " is the WINNER!"
                  return currentPlayer
                  
                }
              }
            }
          }  
        }
        //diagonal NW - SE
        else if(state.includes(state[i] + rowPlus) && state[i]%boardSize !== (state[i] + rowPlus)%boardSize){
          if (state.includes(state[i] + (rowPlus * 2)) && state[i]%boardSize !== (state[i] + rowPlus*2)%boardSize) {
            if (state.includes(state[i] + (rowPlus * 3))&& state[i]%boardSize !== (state[i] + rowPlus*3)%boardSize){
              if (state.includes(state[i] + (rowPlus * 4))&& state[i]%boardSize !== (state[i] + rowPlus*4)%boardSize){
                if (!state.includes(state[i] + (rowPlus * 5)) && !state.includes(state[i] - rowPlus)){
                  currentPlayer = colour + " is the WINNER!"
                  return currentPlayer
                }
              }
            }
          }  
        }
        //vertical
          else if (state.includes(state[i] + rowLength)){
            if (state.includes(state[i] + (rowLength * 2))) {
              if (state.includes(state[i] + (rowLength * 3))){
                if (state.includes(state[i] + (rowLength * 4))){
                  if (!state.includes(state[i] + (rowLength * 5)) && !state.includes(state[i] - rowLength)){
                    currentPlayer = colour + " is the WINNER!"
                    return currentPlayer
                  }
                }
              } 
            }  
          }
      }
     //draw
      if ((blackState.length + whiteState.length) === (boardSize * boardSize)){
          currentPlayer = "Game is a DRAW!" 
          return currentPlayer
        }
    return currentPlayer
  }

export default gamesHandler;