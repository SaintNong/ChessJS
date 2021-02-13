
function GetPvLine(depth) {
	
	var hashOutput = [NOMOVE, 0];
	ProbeHashTable(hashOutput, 0, 0, -1);
	var move = hashOutput[0];

	var count = 0;
	
	while(move != NOMOVE && count < depth) {
	
		if( MoveExists(move) == BOOL.TRUE) {
			MakeMove(move);
			GameBoard.PvArray[count++] = move;			
		} else {
			break;
		}

		hashOutput = [NOMOVE, 0];
		ProbeHashTable(hashOutput, 0, 0, -1);
		move = hashOutput[0];
	}
	
	while(GameBoard.ply > 0) {
		TakeMove();
	}
	
	return count;
	
}

function InitHashTable() {
	for ( index = 0; index < HASHENTRIES; ++index ) {
		GameBoard.HashTable.push({
			move : NOMOVE,
			score : 0,
			depth : null,
			flags : -2,
			posKey : 0
		});
	}
}

function ClearHashTable() {
	
	for(index = 0; index < HASHENTRIES; index++) {
		GameBoard.HashTable[index].move = NOMOVE;
		GameBoard.HashTable[index].posKey = 0;
		GameBoard.HashTable[index].score = 0;
		GameBoard.HashTable[index].depth = null;
		GameBoard.HashTable[index].flags = -2;
		
	}
}

function ProbeHashTable(output, alpha, beta, depth) {
	var index = GameBoard.posKey % HASHENTRIES;
	
	if(GameBoard.HashTable[index].posKey == GameBoard.posKey) {
		output[0] = GameBoard.HashTable[index].move;

		if(GameBoard.HashTable[index].depth >= depth) {
			output[1] = GameBoard.HashTable[index].score;
			if (output[1] > MATE) output[1] -= GameBoard.ply;
			else if (output[1] < -MATE) output[1] += GameBoard.ply;

			switch (GameBoard.HashTable[index].flags) {
				case HFLAGALPHA:
					if (output[1] <= alpha) {
						output[1] = alpha;
						return BOOL.TRUE;
					}
					break;
				case HFLAGBETA:
					if (output[1] >= beta) {

					}
					break;
				case HFLAGEXACT:
					return BOOL.TRUE;
					break;
				default: console.log("Fuck something went very wrong..."); break;
			}
		}
	}
	
	return BOOL.FALSE;
}

function StoreHashEntry(move, score, flags, depth) {
	var index = GameBoard.posKey % HASHENTRIES;
	var storedScore = score;

	if (score > MATE) storedScore += GameBoard.ply;
	if (score < -MATE) storedScore -= GameBoard.ply;

	GameBoard.HashTable[index].posKey = GameBoard.posKey;
	GameBoard.HashTable[index].move = move;
	GameBoard.HashTable[index].flags = flags;
	GameBoard.HashTable[index].depth = depth;
	GameBoard.HashTable[index].score = storedScore;
}

