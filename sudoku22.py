def getBlock(idx):
	if idx in [0,1,4,5]:
		return 0
	elif idx in [2,3,6,7]:
		return 1
	elif idx in [8,9,12,13]:
		return 2
	elif idx in [10,11,14,15]:
		return 3
def getAllBlocked(num,sudokuGame):
	rows = []
	cols = []
	blocks = []
	for i in range(0,16):
		if sudokuGame[i]==num:
			rows.append(i/4)
			cols.append(i%4)
			blocks.append(getBlock(i))
	return [rows, cols, blocks]

def isPossible(num,idx,sudokuGame):
	if sudokuGame[idx]>0:
		return False
	[rows,cols,blocks]=getAllBlocked(num,sudokuGame)
	if idx%4 in cols:
		return False
	if idx/4 in rows:
		return False
	if getBlock(idx) in blocks:
		return False
	return True

def checkRow(num,rowi,sudokuGame):
	nposs = 0
	for i in range(0,4):
		if isPossible(num,rowi*4+i,sudokuGame):
			nposs+=1
			idxposs = rowi*4+i
	if nposs==1:
		return [True,idxposs]
	else:
		return [False] 

def checkCol(num,rowi,sudokuGame):
	nposs = 0
	for i in range(0,4):
		if isPossible(num,rowi%4+i*4,sudokuGame):
			nposs+=1
			idxposs = rowi%4+i*4
	if nposs==1:
		return [True,idxposs]
	else:
		return [False]

def checkBlock(num,rowi,sudokuGame):
	nposs = 0
	for i in [0,1,4,5]:
		if isPossible(num,(rowi/2)*8+(rowi%2)*2+i,sudokuGame):
			nposs+=1
			idxposs = (rowi/2)*8+(rowi%2)*2+i
	if nposs==1:
		return [True,idxposs]
	else:
		return [False]

def checkPuzzle(num,sudokuGame):
	changeIt = False
	for i in range(0,4):
		retArr = checkRow(num,i,sudokuGame)
		if retArr[0]:
			sudokuGame[retArr[1]]=num
			changeIt = True
	for i in range(0,4):
		retArr = checkCol(num,i,sudokuGame)
		if retArr[0]:
			sudokuGame[retArr[1]]=num
			changeIt = True
	for i in range(0,4):
		retArr = checkBlock(num,i,sudokuGame)
		if retArr[0]:
			sudokuGame[retArr[1]]=num
			changeIt = True
	for idx in range(0,16):
		if sudokuGame[idx]==0:
			nposs = 0
			for i in range(1,5):
				if isPossible(i,idx,sudokuGame):
					nposs+=1
					iSave = i
			if nposs==1:
				sudokuGame[idx]=iSave
				changeIt = True


	return [changeIt,sudokuGame]

def gameStrategy(sudokuGame):
	changePuzzle = True
	while changePuzzle:
		changePuzzle = False
		for i in range(1,5):
			retGame = checkPuzzle(i,sudokuGame)
			if retGame[0]:
				sudokuGame = retGame[1]
				changePuzzle = True
	return sudokuGame

def bothGames(game1,game2):
	playedPieces = []
	for idx in range(0,16):
		if game1[idx]!=0 and game2[idx]!=0:
			playedPieces.append([game1[idx],game2[idx]])
	for idx in range(0,16):
		if game1[idx]==0 or game2[idx]==0:
			game1Poss = []
			if game1[idx]!=0:
				game1Poss = [game1[idx]]
			else:
				for i in range(1,5):
					if isPossible(i,idx,game1):
						game1Poss.append(i)
			game2Poss = []
			if game2[idx]!=0:
				game2Poss = [game2[idx]]
			else:
				for i in range(1,5):
					if isPossible(i,idx,game2):
						game2Poss.append(i)

			doublePlays = []
			for i in game1Poss:
				for ii in game2Poss:
					if [i,ii] not in playedPieces:
						doublePlays.append([i,ii])
			nGame1Poss = [0,0,0,0]
			nGame2Poss = [0,0,0,0]
			for i in doublePlays:
				nGame1Poss[i[0]-1]+=1
				nGame2Poss[i[1]-1]+=1

			nPossNums = 0
			for i in range(0,4):
				if nGame1Poss[i]>0:
					nPossNums +=1
					thatNum = i+1
			if nPossNums ==1 and game1[idx]==0:
				game1[idx]=thatNum
			nPossNums = 0
			for i in range(0,4):
				if nGame2Poss[i]>0:
					nPossNums +=1
					thatNum = i+1
			if nPossNums ==1 and game2[idx]==0:
				game2[idx]=thatNum
	return game1,game2


sudokuGame1 = [2,0,3,1,0,0,0,0,0,0,0,0,1,0,0,0]
sudokuGame2 = [0,0,0,0,3,1,0,0,0,3,2,0,0,0,0,0]

for i in range(0,10):
	sudokuGame1 = gameStrategy(sudokuGame1)
	sudokuGame2 = gameStrategy(sudokuGame2)
	if 0 in sudokuGame1 or 0 in sudokuGame2:
		print "combo"
	sudokuGame1,sudokuGame2 = bothGames(sudokuGame1,sudokuGame2)
	if 0 in sudokuGame1 or 0 in sudokuGame2:
		print "again"
print sudokuGame1
print sudokuGame2
allPieces = []
for i in range(0,16):
	if [sudokuGame1[i],sudokuGame2[i]] not in allPieces:
		allPieces.append([sudokuGame1[i],sudokuGame2[i]])
print len(allPieces)
    
