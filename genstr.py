import random
import csv

def readcsv(filen):
        allgamesa  =[]
        with open(filen, 'rb') as csvfile:
                spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
                for row in spamreader:
                        allgamesa.append(row)
        return allgamesa

alldata = readcsv('Game_Logs_Quarterback.csv')

allgames = []
for i in alldata[1:40]:
    if i[14]!= '--':
        if i[0].find('/')>-1:
            qbid = i[0][i[0].find('/')+1:]
        else:
            qbid = i[0]
        try:
            passcomp = int(i[13])
        except:
            passcomp = 0
        try:
            passatt = int(i[14])
        except:
            passatt = 0
        try:
            passyard = int(i[16])
        except:
            passyard = 0
        try:
            passtd = int(i[18])
        except:
            passtd = 0
        try:
            passint = int(i[19])
        except:
            passint = 0
        try:
            year = int(i[3])
        except:
            year = 1900
        try:
            opponent = i[8]
        except:
            opponent = ''
        try:
            week = int(i[5])
        except:
            week = 0
        try:
            gametype = i[4]
        except:
            gametype = 'Preseason'
            
        allgames.append([qbid,passatt,passcomp,passyard,passtd,passint,year,opponent,week,gametype])


istr = 'int gamedata[] = {'
dstr = 'double namedata[] = {'
ngames = 5
for i in range(0,ngames):
	istr += str(allgames[i][7])+","+str(allgames[i][1])+","+str(allgames[i][2])+","+str(allgames[i][3])+","+str(allgames[i][4])+","+str(allgames[i][5])+","+str(allgames[i][6])+","+str(allgames[i][8])+","+str(allgames[i][9])
	if i ==ngames-1:
		istr += "};"
	else:
		istr += ","
	dstr += str(allgames[i][0])
	if i ==ngames-1:
		dstr += "};"
	else:
		dstr += ","


print istr
print dstr

