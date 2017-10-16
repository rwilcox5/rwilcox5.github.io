
int dosomething(int attempts, int completions, int yards, int tds, int ints, int compr, int yardr, int tdr, int intr){
	return yards*yardr/attempts+completions*compr/attempts+tds*tdr/attempts+ints*intr/attempts;
}

int gamedata[] = {9,13,12,165,3,0,2017,21,15,10,426,3,1,2017,19,29,8,426,2,0,2017,17,19,10,152,3,0,2017,21,27,10,250,2,0,2017,11,11,6,59,1,1,2017,19,14,10,201,1,1,2017,17,29,10,362,2,0,2017,2,10,5,403,1,2,2017,6,31,15,67,1,2,2017,5,17,7,118,3,1,2017,17,26,12,304,3,1,2017,29,13,11,372,2,0,2017,17,29,6,369,3,0,2017,3,26,8,322,3,2,2017,7,19,9,60,2,2,2017,22,14,5,133,0,1,2017,7,28,14,350,0,0,2017,0,18,8,326,0,2,2017,30,25,5,334,3,1,2017,0,22,14,159,1,0,2017,21,25,7,164,0,1,2017,17,24,15,188,3,1,2017,16,10,8,275,0,0,2017,28,16,11,222,1,1,2017,22,29,13,405,3,1,2017,25,16,11,109,3,0,2017,1,21,10,250,0,2,2017,2,25,14,223,3,1,2017,11,14,12,123,1,2,2017,10,10,15,220,1,0,2017,30,19,12,327,2,1,2017,17,29,14,383,0,2,2017,10,17,9,315,1,2,2017,22,16,15,209,3,2,2017,8,28,11,165,2,1,2017,3,15,11,245,0,0,2017,7,13,9,431,1,0,2017,17,16,15,132,0,2,2017,4,25,7,182,0,2,2017,12,24,7,355,3,0,2017,8,23,8,208,1,0,2017,10,25,12,156,3,0,2017,4,21,8,204,2,0,2017,1,31,9,54,0,2,2017,4,21,11,258,1,1,2017,23,17,5,250,2,1,2017,5,20,12,229,3,1,2017,9,10,7,83,0,1,2017,15,14,5,352,1,1,2017,20,27,14,398,1,2,2017,30,29,13,137,0,2,2017,10,27,9,371,0,0,2017,17,18,13,403,0,0,2017,14,18,9,110,1,0,2017,0,20,13,62,2,1,2017,30,10,11,308,3,2,2017,28,26,8,141,2,1,2017,26,13,13,314,2,0,2017,3,15,12,52,3,1,2017,27,29,8,375,2,2,2017,7,20,8,289,0,2,2017,11,20,8,403,1,2,2017,3,24,5,223,0,2,2017,25,27,5,87,2,1,2017,30,10,9,62,0,1,2017,18,14,6,111,2,1,2017,12,16,5,286,1,2,2017,31,10,9,417,3,2,2017,13,22,14,171,1,2,2017,22,18,8,400,1,2,2017,22,31,15,342,1,0,2017,5,11,8,295,1,2,2017,4,13,13,199,2,0,2017,18,29,7,252,0,0,2017,4,11,14,85,2,2,2017,14,12,14,377,0,2,2017,10,24,7,302,3,2,2017,3,30,9,362,1,1,2017,17,22,6,193,0,1,2017,2,16,12,252,2,0,2017,27,22,10,59,3,2,2017,29,12,8,388,3,1,2017,22,24,14,276,1,1,2017,2,24,8,75,2,2,2017,22,20,5,92,1,2,2017,27,25,5,431,2,2,2017,14,23,7,288,1,2,2017,20,31,12,216,2,1,2017,10,22,8,85,1,0,2017,3,27,9,85,3,1,2017,21,22,10,388,0,1,2017,8,23,15,61,0,0,2017,27,17,7,222,2,0,2017,13,15,5,129,2,0,2017,9,18,15,61,3,1,2017,18,22,12,211,0,1,2017,3,26,13,382,1,0,2017,3,11,6,125,0,1,2017,24,27,13,139,1,1,2017,20,15,13,182,1,1,2017,24,26,6,204,2,1,2017,28,25,9,357,0,2,2017,14,28,8,286,0,0,2017,18,31,14,89,1,1,2017,2,20,11,316,1,2,2017,28,25,5,87,2,1,2017,29,26,5,101,1,2,2017,26,18,9,261,1,0,2017,8,19,10,214,0,0,2017,8,16,14,94,3,1,2017,19,12,15,218,3,1,2017,5,27,8,159,3,2,2017,15,28,14,106,2,1,2017,1,11,8,112,2,0,2017,19,27,12,256,3,1,2017,27,11,8,97,1,1,2017,31,15,10,135,0,2,2017,20,31,7,213,0,1,2017,31,28,8,212,3,1,2017,17,28,9,97,1,0,2017,12,27,8,238,3,0,2017,28,15,13,295,0,2,2017,0,18,7,412,1,1,2017,30,21,9,99,3,1,2017,4,23,13,265,1,1,2017,2,10,7,123,2,0,2017,27,14,5,137,0,2,2017,18,10,14,153,3,1,2017,9,23,8,287,2,0,2017,24,31,6,314,2,1,2017,26,12,6,387,2,1,2017,16,18,5,293,3,1,2017,23,17,9,295,3,2,2017,18,26,13,140,2,0,2017,19,29,6,209,0,2,2017,22,15,5,302,1,1,2017,25,26,5,205,2,1,2017,14,27,15,247,3,1,2017,10,18,7,82,2,0,2017,26,30,7,68,0,1,2017,6,14,7,211,2,0,2017,12,14,12,277,2,1,2017,14,18,14,193,0,2,2017,13,28,13,290,3,0,2017,26,21,9,415,2,2,2017,14,30,11,413,0,0,2017,15,11,10,261,2,0,2017,28,17,6,324,0,1,2017,4,23,10,207,2,2,2017,0,14,11,376,3,2,2017,14,19,6,121,1,1,2017,1,24,7,161,3,1,2017,25,14,11,254,0,0,2017,1,31,15,348,2,0,2017,6,30,9,254,0,2,2017,18,18,7,173,1,1,2017,3,19,5,189,1,1,2017,5,12,12,241,1,0,2017,1,25,8,335,3,2,2017,15,28,7,90,0,2,2017,5,29,14,415,1,1,2017,14,23,6,386,2,1,2017,23,10,12,386,2,0,2017,3,28,6,305,3,2,2017,29,10,12,144,1,0,2017,1,23,12,277,1,1,2017,16,12,10,120,0,0,2017,8,16,15,286,3,0,2017,26,13,9,99,0,2,2017,0,23,7,187,2,1,2017,26,26,10,387,2,1,2017,21,13,10,139,2,1,2017,20,21,10,371,3,2,2017,28,14,15,250,1,1,2017,23,11,9,392,0,0,2017,19,26,10,73,3,1,2017,31,25,15,67,0,1,2017,1,20,10,218,1,2,2017,18,30,8,315,0,1,2017,7,22,12,68,1,0,2017,9,27,10,416,3,2,2017,8,25,14,99,3,1,2017,29,25,6,252,1,2,2017,21,19,10,296,2,1,2017,17,13,9,136,3,1,2017,17,19,11,184,2,2,2017,3,30,10,166,0,0,2017,21,27,14,138,2,2,2017,7,25,12,128,0,2,2017,19,14,11,344,3,0,2017,17,22,6,411,3,0,2017,1,18,10,349,2,2,2017,3,26,11,375,3,2,2017,2,21,8,244,1,0,2017,29,20,14,408,2,2,2017,29,27,9,261,1,0,2017,8,14,9,57,3,2,2017,7,26,6,372,2,0,2017,30,12,10,243,1,1,2017,31,29,8,256,3,1,2017,31,19,6,227,2,0,2017,1,11,8,327,0,1,2017,25,19,12,298,0,2,2017,22,30,8,320,2,1,2017,3,29,6,174,1,2,2017,23,27,6,341,3,2,2017,25,21,6,228,3,0,2017,29,21,7,267,3,2,2017,17,12,14,74,0,1,2017,1,23,5,218,1,1,2017,17,15,11,259,1,0,2017,2,19,13,302,1,2,2017,20,24,8,331,2,1,2017,16,14,12,97,0,1,2017,23,12,12,293,2,1,2017,23,18,7,93,3,0,2017,13,24,11,256,0,2,2017,29,19,12,312,3,1,2017,2,31,9,81,2,1,2017,27,25,15,189,0,1,2017,0,13,10,78,3,0,2017,18,31,8,412,1,2,2017,8,23,12,428,0,1,2017,19,17,15,65,0,0,2017,20,30,12,408,1,0,2017,25,26,12,80,3,2,2017,28,14,10,110,1,2,2017,27,12,8,387,1,0,2017,26,17,9,252,1,2,2017,1,26,7,209,3,1,2017,13,24,9,110,1,1,2017,24,23,9,406,0,2,2017,30,10,7,405,0,1,2017,14,16,12,256,2,1,2017,5,18,7,174,1,2,2017,12,12,15,117,2,1,2017,14,16,9,430,3,1,2017,10,24,9,308,2,1,2017,18,30,12,166,0,1,2017,15,26,13,127,2,2,2017,26,14,10,267,1,0,2017,12,14,14,422,0,2,2017,7,18,14,137,2,0,2017,24,20,7,82,2,2,2017,28,31,12,333,2,1,2017,27,12,14,366,3,0,2017,13,18,9,172,1,2,2017,21,13,12,119,2,1,2017,27,22,5,392,1,1,2017,27,15,8,166,3,2,2017,4,25,14,181,0,1,2017,16,18,8,164,0,2,2017,28,31,11,97,0,0,2017,30,30,11,95,2,2,2017,8,29,14,85,0,1,2017};
double namedata[] = {101135311636039834,218222633104638284,2453716976856783,277384382757851384,72539189618555237,232798286312038821,47188243789990398,136901523851310086,177063724105166337,216967278062519084,99872938157240274,283135224883053927,167079224331607109,43773326581911411,308922854718618766,178902791245651531,92084491157832183,8263666977947125,144010133182180042,285509159725180566,67212858270897773,187777866156468976,267943151080778168,163794350496015844,208122317358963465,83555531591695164,203463032608428396,237569052615160080,150335473609186338,168178584523992996,142573583595481795,306543676510671860,234587641813036027,285423505927345022,92208896889932920,163570340406420240,282118542653371108,137664936616060763,105843884859253541,114275238253904191,160635224471430423,262860713986644078,220219411264740901,293096558435877970,138068088827538138,157179944809286046,180586419189435461,140209336101584857,50270551564731830,27254708023351724,263357312268655583,110487540775911886,210415411396098086,192904835779092984,178890997393537876,63760689939028699,224659950589527706,41620630423702183,299605661981471688,43530249748372222,102941853400971939,121567781196890337,35601289330441712,46094852811015510,207390644473604405,297319418177498642,285894476490250383,85231394814074986,110421605605629994,76392163088975552,162276205952398791,257817669516961943,237408724351876699,281352050478552156,112007618273137629,254943989782037452,223291481679691768,207842865577452544,306435358100780415,50486530110857957,229309683365096242,65721548611489013,66303784877163210,286726157353960455,207835431642288889,129671427474882436,209846920541983418,58564875545627653,96367581965402486,243143411704911718,55198283877908925,192649034208386314,225461183478467384,31982138553814349,123130127353417673,281758084602178819,60049083162113211,96478889172040238,40274040558440781,151720533182858413,254907129958324521,171005922053926980,183963314617329905,198531200708925153,203040743235626135,165590472148144191,173723524990692870,181218638447135166,1312635029339033,230796705738850459,168128748941447419,291405562449290546,103891954020603228,155594195074054939,136893157558437692,208626147826934898,112656732924670836,256414910693779575,271306145616824056,177117488010455177,27227717735459998,301151361877220745,286290606584586100,159947224581386921,93782677253810578,293268664423551466,46431498601285127,153582876395066247,62626043063035700,142190180068528104,273982157874749946,9061928327840692,287861055267388281,8327847845877595,33847398467651392,188533452782600750,48228090895866990,53998464778769968,172554972723956523,11276215602491042,13975532390539692,221281604778492503,276921872104906895,266668007967581035,50282954368261047,180853511950790937,210955349647637362,73752941314403149,83483584496702601,173965951738405584,246848492326970199,140892922428794226,110400283096696881,86173428946110089,226616957496649249,182589003138598217,82423914591290273,153565379950422210,282329970565660426,55422648473100045,93707350618366957,27151698067232803,147672261782242291,252416039824782508,70294031266716395,215990256649937397,111125986641365069,150454815966191217,10493437744028044,189265756826312931,226935450687414967,263623724025290383,34697821049704428,91373799619213124,300691564018857335,188591767983693316,144752101219521290,127373105289587794,153203266631461053,238260191392129238,119549018440871459,8274996660645252,237797948722060015,10923655307248966,283527429072994412,283554571523366346,166940355066566910,74507927967142767,305909601814268186,221063881826763053,173313580552414237,113402499242899258,156741666436045770,245403197943724326,15428563887380469,261888173060626972,260653442565265818,117662061603265663,259841538419353613,109428393935251634,120786741268067670,307504069380206881,209371474466855611,37047684364273193,233533532155142723,111938500305189501,24207997321621287,249603396678429611,73210081786599326,200715784562081779,58628479578778845,123918030407113959,53810641008344080,281806957176953263,12699614911146942,18579010568924531,275978664822518420,6036582967677642,36347412320387847,18837259328346409,74970720571856427,63360035486092067,159265228359753730,219599040529124865,303852291629953879,222433743998949325,213677029619242223,243097285750568688,34087421043849930,169476552977352543,71138632094005031,289418365309204069,112075274911538637,81984771320369963,45964795641040214,272014427450376644,106054147810269809,61613508161404066,308861265957996495,12080039355155871,235917222734724834,168545839531889477,177861989116199470,162549246566032671,165563209385178875,262929104608853450,79528424342850201,68551791650985073,61981960501548324,57532579910349096,121266730258236523,271675646340816391,306949793980325535,81331300444681994,246445839551633260,209407706014919607};
int topqbs[100] = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
int maxpr[100] = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};	

int makeTable(int compr, int yardr, int tdr, int intr, int nrows) {
	int i = 0; int ii = 0; int iii = 0;
	int retpr;
	for (i=0;i<256;i++){retpr = dosomething(gamedata[i*7+1],gamedata[i*7+2],gamedata[i*7+3],gamedata[i*7+4],gamedata[i*7+5],compr,yardr,tdr,intr); for (ii=0;ii<nrows;ii++){if (retpr>maxpr[ii]) {for (iii=nrows-1;iii>ii;iii--){topqbs[iii] = topqbs[iii-1]; maxpr[iii] = maxpr[iii-1];} topqbs[ii]=i;maxpr[ii]=retpr;break;}}}
    return 0;
}

int sendTen(int i){
	int ii = 0;
	ii = topqbs[i]*9+1;
	return gamedata[ii];
}

