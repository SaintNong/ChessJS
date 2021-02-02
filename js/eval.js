var RookOpenFile = 15;
var RookSemiOpenFile = 10;
var QueenOpenFile = 10;
var QueenSemiOpenFile = 5;
var BishopPair = 15;

var PawnRanksWhite = new Array(10);
var PawnRanksBlack = new Array(10);

var PawnIsolated = -20;
var PawnPassed = [ 0, 5, 10, 20, 35, 60, 100, 200 ]; 

var PawnShield = 10;
var TropismValue = 8;


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
	5	,	10	,	5	,	-10	,	-10	,	0	,	20	,	10	,
	-5	,	-5	,	-20	,	-30	,	-30	,	-20	,	-5	,	-5	,
	-50	,	-50	,	-50	,	-50	,	-50	,	-50	,	-50	,	-50	,
	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,
	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,
	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,
	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,
	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70		
];

var PawnTable = [
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0	,
    15	,	15	,	5	,	-15	,	-15	,	5	,	15	,	15	,
    5	,	0	,	0	,	5	,	5	,	0	,	0	,	5	,
    0	,	0	,	10	,	20	,	20	,	10	,	0	,	0	,
    5	,	5	,	5	,	10	,	10	,	5	,	5	,	5	,
    10	,	10	,	10	,	20	,	20	,	10	,	10	,	10	,
    50	,	50	,	50	,	50	,	50	,	50	,	50	,	50	,
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0	
];
    
    
var KnightTable = [
    -20	,	-15	,	0	,	0	,	0	,	0	,	-15	,	-20	,
    -5	,	0	,	0	,	5	,	5	,	0	,	0	,	0	,
    -10	,	0	,	10	,	10	,	10	,	10	,	0	,	-10	,
    -10	,	0	,	10	,	20	,	20	,	10	,	5	,	-10	,
    5	,	10	,	15	,	20	,	20	,	15	,	10	,	5	,
    5	,	10	,	10	,	20	,	20	,	10	,	10	,	5	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0		
];
    
var BishopTable = [
    0	,	0	,	-10	,	0	,	0	,	-10	,	0	,	0	,
    0	,	5	,	0	,	10	,	10	,	0	,	5	,	0	,
    0	,	0	,	10	,	15	,	15	,	10	,	0	,	0	,
    0	,	10	,	15	,	20	,	20	,	15	,	10	,	0	,
    0	,	10	,	15	,	20	,	20	,	15	,	10	,	0	,
    0	,	0	,	15	,	15	,	15	,	15	,	0	,	0	,
    0	,	20	,	0	,	10	,	10	,	0	,	20	,	0	,
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

var ENDGAME_MAT = 1 * PieceVal[PIECES.wR] + 2 * PieceVal[PIECES.wN] + 2 * PieceVal[PIECES.wP] + PieceVal[PIECES.wK];


function Distance(sq1, sq2) {
	var file1, file2, rank1, rank2, rankDist, fileDist;
	file1 = FilesBrd[sq1];
	file2 = FilesBrd[sq2];
	rank1 = RanksBrd[sq1];
	rank2 = RanksBrd[sq2];
	rankDist = Math.abs(rank2 - rank1);
	fileDist = Math.abs(file2 - file1);
	return Math.max(rankDist, fileDist)
}

function PawnsInit() {
	var index = 0;
	
	for(index = 0; index < 10; ++index) {				
		PawnRanksWhite[index] = RANKS.RANK_8;			
		PawnRanksBlack[index] = RANKS.RANK_1;
	}
	
	pce = PIECES.wP;	
	for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
		if(RanksBrd[sq] < PawnRanksWhite[FilesBrd[sq]+1]) {
			PawnRanksWhite[FilesBrd[sq]+1] = RanksBrd[sq];
		}
	}	

	pce = PIECES.bP;	
	for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
		if(RanksBrd[sq] > PawnRanksBlack[FilesBrd[sq]+1]) {
			PawnRanksBlack[FilesBrd[sq]+1] = RanksBrd[sq];
		}			
	}	
}

function KingSafety() {
	var kingSafetyScore = 0;

	// White king
	pce = PIECES.wK;
	sq = GameBoard.pList[PCEINDEX(pce,0)];
	if (GameBoard.pieces[sq+10] == PIECES.wP) {
		kingSafetyScore += PawnShield;
	}
	if (GameBoard.pieces[sq+9] == PIECES.wP) {
		kingSafetyScore += PawnShield/5;
	}
	if (GameBoard.pieces[sq+11] == PIECES.wP) {
		kingSafetyScore += PawnShield/5;
	}

	// Black king
	pce = PIECES.bK;
	sq = GameBoard.pList[PCEINDEX(pce,0)];
	if (GameBoard.pieces[sq-10] == PIECES.bP) {
		kingSafetyScore -= PawnShield;
	}
	if (GameBoard.pieces[sq-9] == PIECES.bP) {
		kingSafetyScore -= PawnShield/5;
	}
	if (GameBoard.pieces[sq-11] == PIECES.bP) {
		kingSafetyScore -= PawnShield/5;
	}

	return kingSafetyScore;
}

function MaterialDraw() {
    if (0 == GameBoard.pceNum[PIECES.wR] && 0 == GameBoard.pceNum[PIECES.bR] && 0 == GameBoard.pceNum[PIECES.wQ] && 0 == GameBoard.pceNum[PIECES.bQ]) {
	  if (0 == GameBoard.pceNum[PIECES.bB] && 0 == GameBoard.pceNum[PIECES.wB]) {
	      if (GameBoard.pceNum[PIECES.wN] < 3 && GameBoard.pceNum[PIECES.bN] < 3) {  return BOOL.TRUE; }
	  } else if (0 == GameBoard.pceNum[PIECES.wN] && 0 == GameBoard.pceNum[PIECES.bN]) {
	     if (Math.abs(GameBoard.pceNum[PIECES.wB] - GameBoard.pceNum[PIECES.bB]) < 2) { return BOOL.TRUE; }
	  } else if ((GameBoard.pceNum[PIECES.wN] < 3 && 0 == GameBoard.pceNum[PIECES.wB]) || (GameBoard.pceNum[PIECES.wB] == 1 && 0 == GameBoard.pceNum[PIECES.wN])) {
	    if ((GameBoard.pceNum[PIECES.bN] < 3 && 0 == GameBoard.pceNum[PIECES.bB]) || (GameBoard.pceNum[PIECES.bB] == 1 && 0 == GameBoard.pceNum[PIECES.bN]))  { return BOOL.TRUE; }
	  }
	} else if (0 == GameBoard.pceNum[PIECES.wQ] && 0 == GameBoard.pceNum[PIECES.bQ]) {
        if (GameBoard.pceNum[PIECES.wR] == 1 && GameBoard.pceNum[PIECES.bR] == 1) {
            if ((GameBoard.pceNum[PIECES.wN] + GameBoard.pceNum[PIECES.wB]) < 2 && (GameBoard.pceNum[PIECES.bN] + GameBoard.pceNum[PIECES.bB]) < 2)	{ return BOOL.TRUE; }
        } else if (GameBoard.pceNum[PIECES.wR] == 1 && 0 == GameBoard.pceNum[PIECES.bR]) {
            if ((GameBoard.pceNum[PIECES.wN] + GameBoard.pceNum[PIECES.wB] == 0) && (((GameBoard.pceNum[PIECES.bN] + GameBoard.pceNum[PIECES.bB]) == 1) || ((GameBoard.pceNum[PIECES.bN] + GameBoard.pceNum[PIECES.bB]) == 2))) { return BOOL.TRUE; }
        } else if (GameBoard.pceNum[PIECES.bR] == 1 && 0 == GameBoard.pceNum[PIECES.wR]) {
            if ((GameBoard.pceNum[PIECES.bN] + GameBoard.pceNum[PIECES.bB] == 0) && (((GameBoard.pceNum[PIECES.wN] + GameBoard.pceNum[PIECES.wB]) == 1) || ((GameBoard.pceNum[PIECES.wN] + GameBoard.pceNum[PIECES.wB]) == 2))) { return BOOL.TRUE; }
        }
    }
  return BOOL.FALSE;
}

    
function EvalPosition() {
	
	var wKsq = GameBoard.pList[PCEINDEX(PIECES.wK, 0)];
	var bKsq = GameBoard.pList[PCEINDEX(PIECES.bK, 0)];
	
    var pce;
	var pceNum;
	var sq;
	var score = GameBoard.material[COLOURS.WHITE] - GameBoard.material[COLOURS.BLACK];
	var file;
	var rank;
	if(0 == GameBoard.pceNum[PIECES.wP] && 0 == GameBoard.pceNum[PIECES.bP] && MaterialDraw() == BOOL.TRUE) {
		return 0;
	}
	
	PawnsInit();
	
	pce = PIECES.wP;	
	for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
		score += PawnTable[SQ64(sq)];
		file = FilesBrd[sq]+1;
		rank = RanksBrd[sq];
		if(PawnRanksWhite[file-1]==RANKS.RANK_8 && PawnRanksWhite[file+1]==RANKS.RANK_8) {
			score += PawnIsolated;
		}
		
		if(PawnRanksBlack[file-1]<=rank && PawnRanksBlack[file]<=rank && PawnRanksBlack[file+1]<=rank) {
			score += PawnPassed[rank];
		}

		score += (7 - Distance(sq, bKsq)) * (TropismValue/2);
	}	

	pce = PIECES.bP;
	for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
		score -= PawnTable[MIRROR64(SQ64(sq))];	
		file = FilesBrd[sq]+1;
		rank = RanksBrd[sq];
		if(PawnRanksBlack[file-1]==RANKS.RANK_1 && PawnRanksBlack[file+1]==RANKS.RANK_1) {
			score -= PawnIsolated;
		}	
		
		if(PawnRanksWhite[file-1]>=rank && PawnRanksWhite[file]>=rank && PawnRanksWhite[file+1]>=rank) {
			score -= PawnPassed[7-rank];
		}

		score -= (7 - Distance(sq, wKsq)) * (TropismValue/2);
	}	
	
	pce = PIECES.wN;	
	for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
		score += KnightTable[SQ64(sq)];

		score += (7 - Distance(sq, bKsq)) * TropismValue;
	}	

	pce = PIECES.bN;	
	for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
		score -= KnightTable[MIRROR64(SQ64(sq))];

		score -= (7 - Distance(sq, wKsq)) * TropismValue;
	}			
	
	pce = PIECES.wB;	
	for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
		score += BishopTable[SQ64(sq)];

		score += (7 - Distance(sq, bKsq)) * TropismValue;
	}	

	pce = PIECES.bB;	
	for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
		score -= BishopTable[MIRROR64(SQ64(sq))];
		
		score -= (7 - Distance(sq, wKsq)) * TropismValue;
	}	

	pce = PIECES.wR;	
	for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
		score += RookTable[SQ64(sq)];	
		file = FilesBrd[sq]+1;
		if(PawnRanksWhite[file]==RANKS.RANK_8) {
			if(PawnRanksBlack[file]==RANKS.RANK_1) {
				score += RookOpenFile;
			} else  {
				score += RookSemiOpenFile;
			}
		}

		score += (7 - Distance(sq, bKsq)) * TropismValue * 1.5;
	}	

	pce = PIECES.bR;	
	for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
		score -= RookTable[MIRROR64(SQ64(sq))];	
		file = FilesBrd[sq]+1;
		if(PawnRanksBlack[file]==RANKS.RANK_1) {
			if(PawnRanksWhite[file]==RANKS.RANK_8) {
				score -= RookOpenFile;
			} else  {
				score -= RookSemiOpenFile;
			}
		}

		score -= (7 - Distance(sq, wKsq)) * TropismValue * 1.5;
	}
	
	pce = PIECES.wQ;	
	for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
		score += BishopTable[SQ64(sq)];	
		file = FilesBrd[sq]+1;
		if(PawnRanksWhite[file]==RANKS.RANK_8) {
			if(PawnRanksBlack[file]==RANKS.RANK_1) {
				score += QueenOpenFile;
			} else  {
				score += QueenSemiOpenFile;
			}
		}

		score += (7 - Distance(sq, bKsq)) * TropismValue * 1.5;
	}	

	pce = PIECES.bQ;	
	for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
		score -= BishopTable[MIRROR64(SQ64(sq))];	
		file = FilesBrd[sq]+1;
		if(PawnRanksBlack[file]==RANKS.RANK_1) {
			if(PawnRanksWhite[file]==RANKS.RANK_8) {
				score -= QueenOpenFile;
			} else  {
				score -= QueenSemiOpenFile;
			}
		}

		score -= (7 - Distance(sq, wKsq)) * TropismValue * 1.5;
	}


    if( (GameBoard.material[COLOURS.BLACK] <= ENDGAME_MAT) ) {
        score += KingE[SQ64(wKsq)];
    } else {
        score += KingO[SQ64(wKsq)];
    }

    if( (GameBoard.material[COLOURS.WHITE] <= ENDGAME_MAT) ) {
        score -= KingE[MIRROR64(SQ64(bKsq))];
    } else {
        score -= KingO[MIRROR64(SQ64(bKsq))];
	}
	
	score += KingSafety();
    
    if(GameBoard.pceNum[PIECES.wB] >= 2) score += BishopPair;
    if(GameBoard.pceNum[PIECES.bB] >= 2) score -= BishopPair;
    
    if(GameBoard.side == COLOURS.WHITE) {
        return score;
    } else {
        return -score;
    }

}

        