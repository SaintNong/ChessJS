var SelectedSqs = [];
var hisFrom, hisTo = SQUARES.NO_SQ;

$("#SetFen").click(function () {
	var fenStr = $("#fenIn").val();	
	NewGame(fenStr);
});

$("#TakeButton").click( function () {
	if (GameBoard.hisPly > 0) {
		DeselectLastMove();
		TakeMove();
		GameBoard.ply = 0;
		SetInitialBoardPieces();

		sound = document.getElementById("MoveAudio");
		sound.play();
	}
});

$("#NewGameButton").click( function () {
	NewGame(START_FEN);
});

function NewGame(fenStr) {
	DeselectLastMove();
	DeSelectSq(UserMove.from);
	DeSelectSq(UserMove.to);
	ParseFen(fenStr);
	PrintBoard();
	SetInitialBoardPieces();
	CheckAndSet();
}

function ClearAllPieces() {
	$(".Piece").remove();
}

function SetInitialBoardPieces() {

	var sq;
	var sq120;
	var pce;
	
	ClearAllPieces();
	
	for(sq = 0; sq < 64; ++sq) {
		sq120 = SQ120(sq);
		pce = GameBoard.pieces[sq120];
		if(pce >= PIECES.wP && pce <= PIECES.bK) {
			AddGUIPiece(sq120, pce);
		}
	}
	UpdateFenSpan();
}

function DeSelectSq(sq) {
	$(".dot").remove()
	$('.Square').each( function(index) {
		if(PieceIsOnSq(sq, $(this).position().top, $(this).position().left) == BOOL.TRUE) {
			if ($(this).hasClass('SqSelectedDark')) {
				$(this).removeClass('SqSelectedDark');
			} else {
				$(this).removeClass('SqSelectedLight');
			}
		}
		for (var i=0; i<SelectedSqs.length; i++) {
			if (PieceIsOnSq(SelectedSqs[i], $(this).position().top, $(this).position().left) == BOOL.TRUE) {
				if ($(this).hasClass('PossibleMove')) {
					$(this).removeClass('PossibleMove')
				} else if ($(this).hasClass('PreviousMove')) {
					$(this).removeClass('PreviousMove')
				} else {
					AddPossibleCapture(SelectedSqs[i], false);
				}
			}
		}
	} );
}

function isEven(n) {
	if (n == 0) {
		return true;
	} else if (n % 2 == 0) {
		return true;
	}
	return false;
}

function DeselectLastMove() {
	$('.Square').each( function(index) {
		if(PieceIsOnSq(hisFrom, $(this).position().top, $(this).position().left) == BOOL.TRUE || PieceIsOnSq(hisTo, $(this).position().top, $(this).position().left) == BOOL.TRUE) {
			$(this).removeClass('PreviousMove')
		}
	} );
}

function HighlightMoves(sq) {

	hisFrom, hisTo = SQUARES.NO_SQ;

	GenerateMoves();
	SelectedSqs = [];

	var MoveNum = 0;
	for (MoveNum = GameBoard.moveListStart[GameBoard.ply]; MoveNum < GameBoard.moveListStart[GameBoard.ply + 1]; ++MoveNum) {
		if (ParseMove(FROMSQ(GameBoard.moveList[MoveNum]), TOSQ(GameBoard.moveList[MoveNum])) != NOMOVE) {
			if (FROMSQ(GameBoard.moveList[MoveNum]) == sq) {
				SelectedSqs.push(TOSQ(GameBoard.moveList[MoveNum]));
			}
		}
	}

	if (GameBoard.hisPly > 0) {
		hisFrom = FROMSQ(GameBoard.history[GameBoard.hisPly-1].move);
		hisTo = TOSQ(GameBoard.history[GameBoard.hisPly-1].move);
	}

	$('.Square').each( function(index) {
		if (hisFrom != SQUARES.NO_SQ) {
			if (PieceIsOnSq(hisFrom, $(this).position().top, $(this).position().left) == BOOL.TRUE || PieceIsOnSq(hisTo, $(this).position().top, $(this).position().left) == BOOL.TRUE) {
				$(this).addClass('PreviousMove');
			}
		}

		for (var i=0; i<SelectedSqs.length; i++) {
			if (PieceIsOnSq(SelectedSqs[i], $(this).position().top, $(this).position().left) == BOOL.TRUE) {
				if (GameBoard.pieces[SelectedSqs[i]] == PIECES.EMPTY) {
					$(this).addClass('PossibleMove')
					if ($(this).find("span.dot").length == 0) {
						$(this).append('<span class="dot"></span>');
					}
				} else {
					AddPossibleCapture(SelectedSqs[i], true);
				}
			}
		}
	});
}

function AddPossibleCapture(sq, isAdd) {
	$(".Piece").each( function(index) {
		if (PieceIsOnSq(sq, $(this).position().top, $(this).position().left) == BOOL.TRUE) {
			if (isAdd) {
				$(this).addClass('PossibleCapture');
			} else {
				$(this).removeClass('PossibleCapture')
			}
		}
	});
}

function SetSqSelected(sq) {
	$('.Square').each( function(index) {
		if (PieceIsOnSq(sq, $(this).position().top, $(this).position().left) == BOOL.TRUE) {
			if ((GameBoard.side == COLOURS.WHITE && PieceCol[GameBoard.pieces[sq]] == COLOURS.WHITE) || (GameBoard.side == COLOURS.BLACK && PieceCol[GameBoard.pieces[sq]] == COLOURS.BLACK)) {

				// Check if the selected square is light/dark
				if (isEven(FilesBrd[sq])) {
					if (!isEven(RanksBrd[sq])) {
						$(this).addClass('SqSelectedLight');
					} else {
						$(this).addClass('SqSelectedDark');
					}
				} else {
					if (!isEven(RanksBrd[sq])) {
						$(this).addClass('SqSelectedDark');
					} else {
						$(this).addClass('SqSelectedLight');
					}
				}
				
				// Highlight Possible Moves
				HighlightMoves(sq)

			}
		}
	});
}

function ClickedSquare(pageX, pageY) {
	var position = $('#Board').position();
	
	var workedX = Math.floor(position.left);
	var workedY = Math.floor(position.top);
	
	pageX = Math.floor(pageX);
	pageY = Math.floor(pageY);
	
	var file = Math.floor((pageX-workedX) / 60);
	var rank = 7 - Math.floor((pageY-workedY) / 60);
	
	var sq = FR2SQ(file,rank);
	
	SetSqSelected(sq);
	
	return sq;
}

$(document).on('click','.Piece', function (e) {
	
	if(UserMove.from == SQUARES.NO_SQ) {
		UserMove.from = ClickedSquare(e.pageX, e.pageY);
	} else {
		DeSelectSq(UserMove.from)
		UserMove.to = ClickedSquare(e.pageX, e.pageY);
	}
	
	if (!MakeUserMove()) {
		UserMove.from = ClickedSquare(e.pageX, e.pageY);
	}
});

$(document).on('click','.Square', function (e) {
	if(UserMove.from != SQUARES.NO_SQ) {
		UserMove.to = ClickedSquare(e.pageX, e.pageY);
		MakeUserMove();
	}

});

function MakeUserMove() {

	if(UserMove.from != SQUARES.NO_SQ && UserMove.to != SQUARES.NO_SQ) {
	
		
		var parsed = ParseMove(UserMove.from,UserMove.to);
		
		if(parsed != NOMOVE) {
			MakeMove(parsed);
			MoveGUIPiece(parsed);
			CheckAndSet();
			PlayMoveAudio(parsed);
			UpdateFenSpan();
			PreSearch();
			PrintBoard();
		}
	
		DeSelectSq(UserMove.from);
		DeSelectSq(UserMove.to);
		
		UserMove.from = SQUARES.NO_SQ;
		UserMove.to = SQUARES.NO_SQ;

		if (parsed != NOMOVE) {
			DeselectLastMove();
			return true;
		}
	}

	return false;
}

function PieceIsOnSq(sq, top, left) {

	if( (RanksBrd[sq] == 7 - Math.round(top/60) ) && 
		FilesBrd[sq] == Math.round(left/60) ) {
		return BOOL.TRUE;
	}
		
	return BOOL.FALSE;

}

function RemoveGUIPiece(sq) {

	$('.Piece').each( function(index) {
		if(PieceIsOnSq(sq, $(this).position().top, $(this).position().left) == BOOL.TRUE) {
			$(this).remove();
		}
	} );
	
}

function AddGUIPiece(sq, pce) {

	var file = FilesBrd[sq];
	var rank = RanksBrd[sq];
	var rankName = "rank" + (rank+1);
	var	fileName = "file" + (file+1);
	var pieceFileName = "images/" + SideChar[PieceCol[pce]] + PceChar[pce].toUpperCase() + ".svg";
	var	imageString = "<img src=\"" + pieceFileName + "\" class=\"Piece " + rankName + " " + fileName + "\"/>";
	$("#Board").append(imageString);
}

function MoveGUIPiece(move) {
	
	var from = FROMSQ(move);
	var to = TOSQ(move);	
	
	if(move & MFLAGEP) {
		var epRemove;
		if(GameBoard.side == COLOURS.BLACK) {
			epRemove = to - 10;
		} else {
			epRemove = to + 10;
		}
		RemoveGUIPiece(epRemove);
	} else if(CAPTURED(move)) {
		RemoveGUIPiece(to);
	}
	
	var file = FilesBrd[to];
	var rank = RanksBrd[to];
	var rankName = "rank" + (rank+1);
	var	fileName = "file" + (file+1);
	
	$('.Piece').each( function(index) {
		if(PieceIsOnSq(from, $(this).position().top, $(this).position().left) == BOOL.TRUE) {
			$(this).removeClass();
			$(this).addClass("Piece " + rankName + " " + fileName);
		}
	} );
	
	if(move & MFLAGCA) {
		switch(to) {
			case SQUARES.G1: RemoveGUIPiece(SQUARES.H1); AddGUIPiece(SQUARES.F1, PIECES.wR); break;
			case SQUARES.C1: RemoveGUIPiece(SQUARES.A1); AddGUIPiece(SQUARES.D1, PIECES.wR); break;
			case SQUARES.G8: RemoveGUIPiece(SQUARES.H8); AddGUIPiece(SQUARES.F8, PIECES.bR); break;
			case SQUARES.C8: RemoveGUIPiece(SQUARES.A8); AddGUIPiece(SQUARES.D8, PIECES.bR); break;
		}
	} else if (PROMOTED(move)) {
		RemoveGUIPiece(to);
		AddGUIPiece(to, PROMOTED(move));
	}
	
}

function DrawMaterial() {

	if (GameBoard.pceNum[PIECES.wP]!=0 || GameBoard.pceNum[PIECES.bP]!=0) return BOOL.FALSE;
	if (GameBoard.pceNum[PIECES.wQ]!=0 || GameBoard.pceNum[PIECES.bQ]!=0 ||
					GameBoard.pceNum[PIECES.wR]!=0 || GameBoard.pceNum[PIECES.bR]!=0) return BOOL.FALSE;
	if (GameBoard.pceNum[PIECES.wB] > 1 || GameBoard.pceNum[PIECES.bB] > 1) {return BOOL.FALSE;}
    if (GameBoard.pceNum[PIECES.wN] > 1 || GameBoard.pceNum[PIECES.bN] > 1) {return BOOL.FALSE;}
	
	if (GameBoard.pceNum[PIECES.wN]!=0 && GameBoard.pceNum[PIECES.wB]!=0) {return BOOL.FALSE;}
	if (GameBoard.pceNum[PIECES.bN]!=0 && GameBoard.pceNum[PIECES.bB]!=0) {return BOOL.FALSE;}
	 
	return BOOL.TRUE;
}

function ThreeFoldRep() {
	var i = 0, r = 0;
	
	for(i = 0; i < GameBoard.hisPly; ++i) {
		if (GameBoard.history[i].posKey == GameBoard.posKey) {
		    r++;
		}
	}
	return r;
}

function CheckResult() {
	if(GameBoard.fiftyMove >= 100) {
		 $("#GameStatus").text("GAME DRAWN {50 move rule}"); 
		 return BOOL.TRUE;
	}
	
	if (ThreeFoldRep() >= 2) {
     	$("#GameStatus").text("GAME DRAWN {3-fold repetition}"); 
     	return BOOL.TRUE;
    }
	
	if (DrawMaterial() == BOOL.TRUE) {
     	$("#GameStatus").text("GAME DRAWN {insufficient material}"); 
     	return BOOL.TRUE;
    }
    
    GenerateMoves();
      
    var MoveNum = 0;
	var found = 0;
	
	for(MoveNum = GameBoard.moveListStart[GameBoard.ply]; MoveNum < GameBoard.moveListStart[GameBoard.ply + 1]; ++MoveNum)  {	
       
        if ( MakeMove(GameBoard.moveList[MoveNum]) == BOOL.FALSE)  {
            continue;
        }
        found++;
		TakeMove();
		break;
    }
	
	if(found != 0) return BOOL.FALSE;
	
	var InCheck = SqAttacked(GameBoard.pList[PCEINDEX(Kings[GameBoard.side],0)], GameBoard.side^1);
	
	if(InCheck == BOOL.TRUE) {
		if(GameBoard.side == COLOURS.WHITE) {
	      $("#GameStatus").text("GAME OVER {Black Wins}");
	      return BOOL.TRUE;
        } else {
	      $("#GameStatus").text("GAME OVER {White Wins}");
	      return BOOL.TRUE;
        }
	} else {
		$("#GameStatus").text("GAME DRAWN {Stalemate}");
		return BOOL.TRUE;
	}
	
	return BOOL.FALSE;	
}

function UpdateFenSpan() {
	var fen = BoardToFen();
	$("#currentFenSpan").text(fen);
}

function CheckAndSet() {
	if(CheckResult() == BOOL.TRUE) {
		GameController.GameOver = BOOL.TRUE;
	} else {
		GameController.GameOver = BOOL.FALSE;
		$("#GameStatus").text('');
	}
}

function PreSearch() {
	if(GameController.GameOver == BOOL.FALSE) {
		SearchController.thinking = BOOL.TRUE;
		setTimeout( function() { StartSearch(); }, 100 );
	}
}


$('#SearchButton').click( function () {	
	GameController.PlayerSide = GameController.side ^ 1;
	DeselectLastMove();
	PreSearch();
});

function StartSearch() {
	DeSelectSq(UserMove.from);

	SearchController.depth = MAXDEPTH;
	var t = $.now();
	var tt = $('#ThinkTimeChoice').val();
	
	SearchController.time = parseInt(tt) * 1000;
	SearchPosition();
	
	MakeMove(SearchController.best);
	MoveGUIPiece(SearchController.best);
	PlayMoveAudio(SearchController.best);

	CheckAndSet();
	UpdateFenSpan();

	HighlightMoves(SQUARES.NO_SQ);
}

function PlayMoveAudio(move) {

	if (CAPTURED(move) != PIECES.EMPTY) {
		CAPTURE_AUDIO.currentTime = 0;
		CAPTURE_AUDIO.play();
	} else {
		MOVE_AUDIO.currentTime = 0;
		MOVE_AUDIO.play();
	}
}

function PrSq(sq) {
	return (FileChar[FilesBrd[sq]] + RankChar[RanksBrd[sq]]);
}

function PrMove(move) {	
	var MvStr;
	
	var ff = FilesBrd[FROMSQ(move)];
	var rf = RanksBrd[FROMSQ(move)];
	var ft = FilesBrd[TOSQ(move)];
	var rt = RanksBrd[TOSQ(move)];
	
	MvStr = FileChar[ff] + RankChar[rf] + FileChar[ft] + RankChar[rt];
	
	var promoted = PROMOTED(move);

	if(promoted != PIECES.EMPTY) {
		var pchar = 'q';
		if(PieceKnight[promoted] == BOOL.TRUE) {
			pchar = 'n';
		} else if(PieceRookQueen[promoted] == BOOL.TRUE && PieceBishopQueen[promoted] == BOOL.FALSE)  {
			pchar = 'r';
		} else if(PieceRookQueen[promoted] == BOOL.FALSE && PieceBishopQueen[promoted] == BOOL.TRUE)   {
			pchar = 'b';
		}
		MvStr += pchar;
	}
	return MvStr;
}

function PrintMoveList() {

	var index;
	var move;
	var num = 1;
	console.log('MoveList:');

	for(index = GameBoard.moveListStart[GameBoard.ply]; index < GameBoard.moveListStart[GameBoard.ply+1]; ++index) {
		move = GameBoard.moveList[index];
		console.log('Move:' + num + ':' + PrMove(move));
		num++;
	}
	console.log('End MoveList');
}

function ParseMove(from, to) {

	GenerateMoves();

	var Move = NOMOVE;
	var PromPce = PIECES.EMPTY;
	var found = BOOL.FALSE;

	for (index = GameBoard.moveListStart[GameBoard.ply]; index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {
		Move = GameBoard.moveList[index]
		if (FROMSQ(Move) == from && TOSQ(Move) == to) {
			PromPce = PROMOTED(Move);
			if (PromPce != PIECES.EMPTY) {
				if ( (PromPce == PIECES.wQ && GameBoard.side == COLOURS.WHITE) || (PromPce == PIECES.bQ && GameBoard.side == COLOURS.BLACK) ) {
					found = BOOL.TRUE;
					break;
				}
				continue;
			}
			found = BOOL.TRUE;
			break;
		}
	}

	if (found != BOOL.FALSE) {
		if (MakeMove(Move) == BOOL.FALSE) {
			return NOMOVE;
		}
		TakeMove();
		return Move;
	}
	return NOMOVE;
}

