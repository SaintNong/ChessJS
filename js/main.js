$(document).ajaxComplete(function() {
  	
});

$(function() {
	init();
	console.log("Main Initialization Called");	
	NewGame(START_FEN);

	$.ajax({
		url : "book.xml",
		cache : false,
		dataType: "xml",
		success: function (xml) {				
			console.log("Read success");
			$(xml).find('line').each(function() {
				var trimmed = $(this).text();
				trimmed = $.trim(trimmed);						
				GameBoard.bookLines.push(trimmed);
			});
			BookLoaded = BOOL.TRUE;
			$('#LoadingBook').remove();
			console.log("Book length: " + GameBoard.bookLines.length + " entries");
	
		}
	});

});

function InitFilesRanksBrd() {
	
	var index = 0;
	var file = FILES.FILE_A;
	var rank = RANKS.RANK_1;
	var sq = SQUARES.A1;
	
	for(index = 0; index < BRD_SQ_NUM; ++index) {
		FilesBrd[index] = SQUARES.OFFBOARD;
		RanksBrd[index] = SQUARES.OFFBOARD;
	}
	
	for(rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
		for(file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
			sq = FR2SQ(file,rank);
			FilesBrd[sq] = file;
			RanksBrd[sq] = rank;
		}
	}
}

function EvalInit() {
	var index = 0;
	
	for(index = 0; index < 10; ++index) {				
		PawnRanksWhite[index] = 0;			
		PawnRanksBlack[index] = 0;
	}
}

function InitHashKeys() {
    var index = 0;
	
	for(index = 0; index < 14 * 120; ++index) {				
		PieceKeys[index] = RAND_32();
	}
	
	SideKey = RAND_32();
	
	for(index = 0; index < 16; ++index) {
		CastleKeys[index] = RAND_32();
	}
}

function InitSq120To64() {

	var index = 0;
	var file = FILES.FILE_A;
	var rank = RANKS.RANK_1;
	var sq = SQUARES.A1;
	var sq64 = 0;

	for(index = 0; index < BRD_SQ_NUM; ++index) {
		Sq120ToSq64[index] = 65;
	}
	
	for(index = 0; index < 64; ++index) {
		Sq64ToSq120[index] = 120;
	}
	
	for(rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
		for(file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
			sq = FR2SQ(file,rank);
			Sq64ToSq120[sq64] = sq;
			Sq120ToSq64[sq] = sq64;
			sq64++;
		}
	}
}

function InitBoardVars() {

	var index = 0;
	for(index = 0; index < MAXGAMEMOVES; ++index) {
		GameBoard.history.push( {
			move : NOMOVE,
			castlePerm : 0,
			enPas : 0,
			fiftyMove : 0,
			posKey : 0
		});
	}

	for ( index = 0; index < PVENTRIES; ++index ) {
		GameBoard.PvTable.push({
			move : NOMOVE,
			posKey : 0	
		});
	}
}

function InitBoardSquares() {
	var light = 1;
	var rankName;
	var fileName;
	var divString;
	var rankIter;
	var fileIter;
	var lightString;
	
	for(rankIter = RANKS.RANK_8; rankIter >= RANKS.RANK_1; rankIter--) {
		light ^= 1;
		rankName = "rank" + (rankIter + 1);
		for(fileIter = FILES.FILE_A; fileIter <= FILES.FILE_H; fileIter++) {
			fileName = "file" + (fileIter + 1);
			if(light == 0) lightString="Light";
			else lightString = "Dark";
			light^=1;
			divString = "<div class=\"Square " + rankName + " " + fileName + " " + lightString + "\"/>";
			$("#Board").append(divString);
		}
	}
	
}

function init() {
	var using_book = BOOL.FALSE;

	InitFilesRanksBrd();
	InitHashKeys();
	EvalInit();
	InitSq120To64();
	InitBoardVars();
	InitMvvLva();
	InitBoardSquares();
}

