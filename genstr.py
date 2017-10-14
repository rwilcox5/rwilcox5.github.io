import random

istr = 'int gamedata[] = {'
dstr = 'double namedata[] = {'
ngames = 256
for i in range(0,ngames):
	istr += str(random.randint(0,31))+","+str(random.randint(10,31))+","+str(random.randint(5,15))+","+str(random.randint(50,431))+","+str(random.randint(0,3))+","+str(random.randint(0,2))+","+str(2017)
	if i ==ngames-1:
		istr += "};"
	else:
		istr += ","
	dstr += str(random.randint(0,310000000000000000))
	if i ==ngames-1:
		dstr += "};"
	else:
		dstr += ","


print istr
print dstr
