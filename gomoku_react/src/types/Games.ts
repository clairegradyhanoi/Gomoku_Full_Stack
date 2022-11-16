export type Games = {
    _id: string
    userId: string
    gameId: number
    boardsize: number
    result: string
    whiteMoves: number[]
    blackMoves: number[]
    status: any[]
    date: string
    createdAt: Date
}