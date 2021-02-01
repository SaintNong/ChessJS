// Pce square tables
var KingE = [	
	-50	,	-10	,	0	,	0	,	0	,	0	,	-10	,	-50	,
	-10,	0	,	10	,	10	,	10	,	10	,	0	,	-10	,
	0	,	10	,	20	,	20	,	20	,	20	,	10	,	0	,
	0	,	10	,	20	,	40	,	40	,	20	,	10	,	0	,
	0	,	10	,	20	,	40	,	40	,	20	,	10	,	0	,
	0	,	10	,	20	,	20	,	20	,	20	,	10	,	0	,
	-10,	0	,	10	,	10	,	10	,	10	,	0	,	-10	,
	-50	,	-10	,	0	,	0	,	0	,	0	,	-10	,	-50	
];

var KingO = [	
	0	,	5	,	5	,	-10	,	-10	,	0	,	10	,	5	,
	-30	,	-30	,	-30	,	-30	,	-30	,	-30	,	-30	,	-30	,
	-50	,	-50	,	-50	,	-50	,	-50	,	-50	,	-50	,	-50	,
	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,
	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,
	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,
	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,
	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70		
];

var PawnTable = [
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0	,
    15	,	15	,	5	,	-10	,	-10	,	5	,	15	,	15	,
    5	,	0	,	0	,	5	,	5	,	0	,	0	,	5	,
    0	,	0	,	10	,	20	,	20	,	10	,	0	,	0	,
    5	,	5	,	5	,	10	,	10	,	5	,	5	,	5	,
    10	,	10	,	10	,	20	,	20	,	10	,	10	,	10	,
    50	,	50	,	50	,	50	,	50	,	50	,	50	,	50	,
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0	
    ];
    
    
    var KnightTable = [
    0	,	-10	,	0	,	0	,	0	,	0	,	-10	,	0	,
    0	,	0	,	0	,	5	,	5	,	0	,	0	,	0	,
    0	,	0	,	10	,	10	,	10	,	10	,	0	,	0	,
    0	,	0	,	10	,	20	,	20	,	10	,	5	,	0	,
    5	,	10	,	15	,	20	,	20	,	15	,	10	,	5	,
    5	,	10	,	10	,	20	,	20	,	10	,	10	,	5	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0		
    ];
    
    var BishopTable = [
    0	,	0	,	-10	,	0	,	0	,	-10	,	0	,	0	,
    0	,	0	,	0	,	10	,	10	,	0	,	0	,	0	,
    0	,	0	,	10	,	15	,	15	,	10	,	0	,	0	,
    0	,	10	,	15	,	20	,	20	,	15	,	10	,	0	,
    0	,	10	,	15	,	20	,	20	,	15	,	10	,	0	,
    0	,	0	,	10	,	15	,	15	,	10	,	0	,	0	,
    0	,	0	,	0	,	10	,	10	,	0	,	0	,	0	,
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0	
    ];
    
    var RookTable = [
    0	,	0	,	15	,	16	,	16	,	15	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    25	,	25	,	25	,	25	,	25	,	25	,	25	,	25	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0		
    ];
    
    var BishopPair = 20;
    var ENDGAME_MAT = 1 * PieceVal[PIECES.wR] + 2 * PieceVal[PIECES.wN] + 2 * PieceVal[PIECES.wP] + PieceVal[PIECES.wK];
    
    
    function EvalPosition() {
        
        var score = GameBoard.material[COLOURS.WHITE] - GameBoard.material[COLOURS.BLACK];
        
        var pce;
        var sq;
        var pceNum;
        
        pce = PIECES.wP;
        for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
            sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
            score += PawnTable[SQ64(sq)];
        }
        
        pce = PIECES.bP;
        for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
            sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
            score -= PawnTable[MIRROR64(SQ64(sq))];
        }
        
        pce = PIECES.wN;	
        for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
            sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
            score += KnightTable[SQ64(sq)];
        }	
    
        pce = PIECES.bN;	
        for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
            sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
            score -= KnightTable[MIRROR64(SQ64(sq))];
        }			
        
        pce = PIECES.wB;	
        for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
            sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
            score += BishopTable[SQ64(sq)];
        }	
    
        pce = PIECES.bB;	
        for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
            sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
            score -= BishopTable[MIRROR64(SQ64(sq))];
        }
        
        pce = PIECES.wR;	
        for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
            sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
            score += RookTable[SQ64(sq)];
        }	
    
        pce = PIECES.bR;	
        for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
            sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
            score -= RookTable[MIRROR64(SQ64(sq))];
        }
        
        pce = PIECES.wQ;	
        for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
            sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
            score += RookTable[SQ64(sq)];
            score += BishopTable[SQ64(sq)];
        }	
    
        pce = PIECES.bQ;	
        for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
            sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
            score -= RookTable[MIRROR64(SQ64(sq))];
            score -= BishopTable[MIRROR64(SQ64(sq))];
        }

        pce = PIECES.wK;
        sq = GameBoard.pList[PCEINDEX(pce,0)];
        
        if( (GameBoard.material[COLOURS.BLACK] <= ENDGAME_MAT) ) {
            score += KingE[SQ64(sq)];
        } else {
            score += KingO[SQ64(sq)];
        }
        
        pce = PIECES.bK;
        sq = GameBoard.pList[PCEINDEX(pce,0)];
        
        if( (GameBoard.material[COLOURS.WHITE] <= ENDGAME_MAT) ) {
            score -= KingE[MIRROR64(SQ64(sq))];
        } else {
            score -= KingO[MIRROR64(SQ64(sq))];
        }
        
        if(GameBoard.pceNum[PIECES.wB] >= 2) {
            score += BishopPair;
        }
        
        if(GameBoard.pceNum[PIECES.bB] >= 2) {
            score -= BishopPair;
        }
        
        if(GameBoard.side == COLOURS.WHITE) {
            return score;
        } else {
            return -score;
        }
    
    }
    
        