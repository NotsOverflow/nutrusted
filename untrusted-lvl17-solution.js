/***************
 * pointers.js *
 ***************
 *
 * You! How are you still alive?
 *
 * Well, no matter. Good luck getting through this
 * maze of rooms - you'll never see me or the Algorithm again!
 */

function startLevel(map) {
    function shuffle(o){ //v1.0 [http://bit.ly/1l6LGQT]
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    map.createFromGrid(
        ['+++++++++++++++++++++++++++++++++++++++++++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+* @ o++*   o++*   o++*   o++*   o++*   o++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+++++++++++++++++++++++++++++++++++++++++++++',
         '+++++* o++++* o++++* o++++* o++++* o++++* o++',
         '++++o   *++o   *++o   *++o   *++o   *++o   *+',
         '+++++* o++++* o++++* o++++* o++++* o++++* o++',
         '+++++++++++++++++++++++++++++++++++++++++++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+*   o++*   o++*   o++*   o++*   o++*   o++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+++++++++++++++++++++++++++++++++++++++++++++',
         '+++++* o++++* o++++* o++++* o++++* o++++* o++',
         '++++o   *++o   *++o   *++o   *++o   *++o   *+',
         '+++++* o++++* o++++* o++++* o++++* o++++* o++',
         '+++++++++++++++++++++++++++++++++++++++++++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+*   o++*   o++*   o++*   o++*   o++* E o++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+++++++++++++++++++++++++++++++++++++++++++++'],
        {
            '@': 'player',
            'E': 'exit',
            '+': 'block',
            'o': 'teleporter',
            '*': 'trap',
        }, 2, 2);

    var canvas = map.getCanvasContext();

    var teleportersAndTraps = map.getDynamicObjects();
    teleportersAndTraps = shuffle(teleportersAndTraps);

    for (i = 0; i < teleportersAndTraps.length; i+=2) {
        var t1 = teleportersAndTraps[i];
        var t2 = teleportersAndTraps[i+1];

        // Point each teleporter to either another teleporter
        // or a trap
        if (t1.getType() == 'teleporter') {
            t1.setTarget(t2);
        }
        if (t2.getType() == 'teleporter') {
            t2.setTarget(t1);
        }

        // TODO find a way to remove the API docs
        // wouldn't want the 'good doctor' to find
        // out about map.getCanvasCoords()...
        var player = map.getPlayer();
        var maxX = 0;
        var maxY = 0;
        var maxobj = t1;
        //alert(player.getY());
        // x = 39
        // y = 19
        for (j = 0; j < teleportersAndTraps.length; j++) {
        	var obj = teleportersAndTraps[j];
        	var coords = map.getCanvasCoords(obj);
            if( maxX < coords['x']
            && maxY < coords['y']
            && obj.getType() == 'teleporter'){
            	maxX = coords['x'];
                maxY = coords['y'];
                maxobj = obj ;
            }
        
        }
        var t1Coords = map.getCanvasCoords(t1);
        var t2Coords = map.getCanvasCoords(t2);
        if (t1.getType() == 'teleporter'
        && maxX != t1Coords['x']
        && maxY != t1Coords['y']) {
            t1.setTarget(maxobj);
        }
        if (t2.getType() == 'teleporter'
        && maxX != t2Coords['x']
        && maxY != t2Coords['y']) {
            t2.setTarget(maxobj);
        }
        
    }
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
}
 	
