export type Game = {
    _id: string
    userId: string
    gameId: number
    boardSize: number
    result: string
    whiteMoves: number[]
    blackMoves: number[]
    status: any[]
    date: string
    createdAt: Date
}