
import json


with open('world110.json') as data_file:    
    world_json = json.load(data_file)
    
for iidx in range(0,len(world_json['features'])):
    arcs = world_json['features'][iidx]['geometry']['coordinates']
    cname = world_json['features'][iidx]['properties']['admin']
    cabbrev = world_json['features'][iidx]['properties']['adm0_a3']

    print 'theStateArray.push( new map_State("'+cabbrev+'","'+cname+'","'+cname+'") );'
    print 'g_map_stateMap["'+cabbrev+'"] = theStateArray['+str(iidx)+'];'
    for iiidx, iii in enumerate(arcs):
        try:
            
            arc = iii[0]


            all_x = []
            all_y = []

            for i in arc:
                all_x.append(int(800+i[0]*5))
                all_y.append(int(500+i[1]*5))
            print 'theStateArray['+str(iidx)+'].myPolygons.push( new map_Polygon() );'
            print 'theStateArray['+str(iidx)+'].myPolygons['+str(iiidx)+'].myXVals=', all_x,';'
            print 'theStateArray['+str(iidx)+'].myPolygons['+str(iiidx)+'].myYVals=',all_y,';'
        except:
            
            arc = iii


            all_x = []
            all_y = []

            for i in arc:
                all_x.append(int(800+i[0]*5))
                all_y.append(int(500+i[1]*5))
            print 'theStateArray['+str(iidx)+'].myPolygons.push( new map_Polygon() );'
            print 'theStateArray['+str(iidx)+'].myPolygons['+str(iiidx)+'].myXVals=', all_x,';'
            print 'theStateArray['+str(iidx)+'].myPolygons['+str(iiidx)+'].myYVals=',all_y,';'


