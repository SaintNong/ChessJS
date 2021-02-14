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
var TropismValue = 4;


// Pce square tables
var KingE = [	
	-50, -40, -30, -20, -20, -30, -40, -50,
	-30, -18, -15,   6,   3,  -6, -24, -30,
	-35, -16,  20,  32,  34,  14, -11, -30,
	-34,  -5,  24,  35,  34,  35, -16, -35,
	-36,  -7,  31,  34,  34,  34, -12, -31,
	-30,  -7,  14,  33,  36,  16, -13, -33,
	-36, -27,   5,   2,   5,  -1, -31, -33,
	-48, -26, -26, -26, -28, -25, -30, -51
].reverse();

var KingO = [	
	-30, -40, -40, -50, -50, -40, -40, -30,
	-30, -37, -43, -49, -50, -39, -40, -30,
	-32, -41, -40, -46, -49, -40, -46, -30,
	-32, -38, -39, -52, -54, -39, -39, -30,
	-20, -33, -29, -42, -44, -29, -30, -19,
	-10, -18, -17, -20, -22, -21, -20, -13,
	14,  18,  -1,  -1,   4,  -1,  15,  14,
	21,  35,  11,   -15,   -5, 14,  32,  22	
].reverse();

var PawnTable = [
    0,   0,   0,   0,   0,   0,   0,   0,
	54, 174, 120,  94,  85,  98,  148,   47,
	6,  48,  44,  45,  31,  38,  37,  -6,
	0,  -1,   9,  28,  20,   8,  -1,  11,
	6,   4,   6,  18,  18,  -5,   6,  -6,
	-1,  -8,  -4,   4,   2, -12,  -1,   5,
	5,  16,  16, -19, -20,  13,  15,   8,
	0,   0,   0,   0,   0,   0,   0,   0	
].reverse();
    
    
var KnightTable = [
    -55, -40, -30, -28, -26, -30, -40, -50,
	-37, -15,   0,  -6,   4,   3, -17, -40,
	-25,   5,  16,  12,  11,   6,   6, -29,
	-24,   5,  21,  14,  18,   9,  11, -26,
	-36,  -5,   9,  23,  24,  21,   2, -24,
	-32,  -1,   4,  19,  20,   4,  11, -25,
	-38, -22,   4,  -1,   8,  -5, -18, -34,
	-50, -16, -32, -24, -36, -25, -14, -50		
].reverse();
    
var BishopTable = [
    -16, -15, -12,  -5, -10, -12, -10, -20,
	-13,   5,   6,   1,  -6,  -5,   3,  -6,
	-16,   20,  -1,  16,   7,  -1,  15,  -5,
	-14,  -1,  23,  14,   4,  19,  11, -13,
	-4,   5,  12,  16,   4,   6,   2, -16,
	-15,   4, 15,   8,  16,   15,  16, -15,
	-5,   20,   6,   6,   3,   6,   20,  -7,
	-14,  -4, -15,  -4,  -9,  -4, -12, -14	
].reverse();
    
var RookTable = [
    5,  -2,   6,   2,  -2,  -6,   4,  -2,
	8,  13,  11,  15,  11,  15,  16,   4,
	-6,   3,   3,   6,   1,  -2,   3,  -5,
	-10,   5,  -4,  -4,  -1,  -6,   3,  -2,
	-4,   3,   5,  -2,   4,   1,  -5,   1,
	0,   1,   1,  -3,   5,   6,   1,  -9,
	-10,  -1,  -4,   0,   5,  -6,  -6,  -9,
	-1,  -2,  -6,   9,   9,   5,   -5,  -5	
].reverse();

var QueenTable = [
	-25,  -9, -11,  -3,  -7, -13, -10, -17,
	-4,  -6,   4,  -5,  -1,   6,   4,  -5,
	-8,  -5,   2,   0,   -2,   6,  -4,  -5,
	0,  -4,   7,  -1,   7,  -3,   0,   1,
	-6,   4,   7,   1,  -1,   2,  -6,  -2,
	-15,  11,  11,  11,   4,  11,   6, -15,
	-5,  -6,   7,  17,   9,  -3,   3, -10,
	-15,  -4, -13,  15,  -3, -16,  -8, -24
].reverse();

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
	if (GameBoard.pieces[sq+20] == PIECES.wP) {
		kingSafetyScore += PawnShield/2;
	}
	if (GameBoard.pieces[sq+9] == PIECES.wP) {
		kingSafetyScore += PawnShield/2;
	}
	if (GameBoard.pieces[sq+11] == PIECES.wP) {
		kingSafetyScore += PawnShield/2;
	}

	// Black king
	pce = PIECES.bK;
	sq = GameBoard.pList[PCEINDEX(pce,0)];
	if (GameBoard.pieces[sq-10] == PIECES.bP) {
		kingSafetyScore -= PawnShield;
	}
	if (GameBoard.pieces[sq-20] == PIECES.bP) {
		kingSafetyScore -= PawnShield/2;
	}
	if (GameBoard.pieces[sq-9] == PIECES.bP) {
		kingSafetyScore -= PawnShield/2;
	}
	if (GameBoard.pieces[sq-11] == PIECES.bP) {
		kingSafetyScore -= PawnShield/2;
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

		score += (7 - Distance(sq, bKsq)) * TropismValue;
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

		score -= (7 - Distance(sq, wKsq)) * TropismValue;
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

		score += (7 - Distance(sq, bKsq)) * TropismValue;
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

		score -= (7 - Distance(sq, wKsq)) * TropismValue;
	}
	
	pce = PIECES.wQ;	
	for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
		score += QueenTable[SQ64(sq)];	
		file = FilesBrd[sq]+1;
		if(PawnRanksWhite[file]==RANKS.RANK_8) {
			if(PawnRanksBlack[file]==RANKS.RANK_1) {
				score += QueenOpenFile;
			} else  {
				score += QueenSemiOpenFile;
			}
		}

		score += (7 - Distance(sq, bKsq)) * TropismValue;
	}	

	pce = PIECES.bQ;	
	for(pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
		sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
		score -= QueenTable[MIRROR64(SQ64(sq))];	
		file = FilesBrd[sq]+1;
		if(PawnRanksBlack[file]==RANKS.RANK_1) {
			if(PawnRanksWhite[file]==RANKS.RANK_8) {
				score -= QueenOpenFile;
			} else  {
				score -= QueenSemiOpenFile;
			}
		}

		score -= (7 - Distance(sq, wKsq)) * TropismValue;
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

        