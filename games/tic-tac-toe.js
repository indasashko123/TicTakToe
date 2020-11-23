
    /////////////variables///
var canvas = document.getElementById('field');
var ctx = canvas.getContext('2d');
var turn = 0;
var f1,f2,f3,f4,f5,f6,f7,f8,f9;
let FieldArray = new Array();
FieldArray = [f1,f2,f3,f4,f5,f6,f7,f8,f9];
var overGame = false;
    /////////////end vars///

function CreatTable() {
  
  if (canvas.getContext) {
	  var num = 0;
	var minx = 0;
	var miny = 0;
	var realX = 0;
	var realY = 0;
	for (var i=0; i<3;i++) {
	    for (var k=0; k<3; k++) {
	        	FieldArray[num] = {
			    index : num,
		     	minPositionx : minx,
		    	maxPositionx : minx + 100,
			    minPositiony : miny,
		     	maxPositiony : miny + 100,
			    fieldImage : "clear", 
				
		    };
			    ///////////////console.log(FieldArray[num].RMinX + "  " +FieldArray[num].RMinY +"__"+FieldArray[num].RMaxX + "  " +FieldArray[num].RMaxY);
			      ////////////if (FieldArray[i].fieldImage=="clear") 
                    DrawClear(ctx,FieldArray[num].minPositionx,FieldArray[num].minPositiony);
		minx += 100;
		num++;
		}
		minx = 0;
		miny +=100;
	}	
    ctx.fillRect(100,0,2,300);
    ctx.fillRect(200,0,2,300);
    ctx.fillRect(0,100,300,2);
	ctx.fillRect(0,200,300,2);

	
  }
canvas.onclick = function(e){
	var position = 0;	
    var rect = canvas.getBoundingClientRect()
    var x = event.clientX - rect.left
    var y = event.clientY - rect.top
    ///console.log("x: " + x + " y: " + y)
   if (overGame) {
     return;
    }
	for (var i=0; i<9;i++) {
	  if (FieldArray[i].minPositionx < x && FieldArray[i].minPositiony< y && FieldArray[i].maxPositionx > x && FieldArray[i].maxPositiony >y) {
	    position = FieldArray[i].index;
		///console.log(position);
	  }
	}
        if (FieldArray[position].fieldImage == "clear" && turn%2==0){
			console.log("chet");
			FieldArray[position].fieldImage = "krest";
			turn++;
	     DrawKrest (ctx,FieldArray[position].minPositionx,FieldArray[position].minPositiony);
            CheckWin(position);
            if (turn >= 9 && !overGame ){
           alert("Ничья" );
           return;
           } 
            
        }
		if (FieldArray[position].fieldImage == "clear" &&turn%2==1){
			console.log("nechet");
			FieldArray[position].fieldImage = "zero";
			turn++;
	     DrawZero (ctx,FieldArray[position].minPositionx,FieldArray[position].minPositiony);
	        CheckWin(position);
	        
	        
	        
        }	
		console.log(turn);
	}
	
	/////////   game logic ///
	function CheckWin(position) {
	switch (position ) {
	case 0 : 
	            CheckLine (0,4,8);
            	CheckLine (0,1,2);
            	CheckLine (0,3,6);
  	break;
	case 1 : 
     		     CheckLine (1,4,7);
             	CheckLine (0,1,2);
	break;
	case 2 : 
	           CheckLine (2,4,6);
            	CheckLine (0,1,2);
            	CheckLine (2,6,8);
	break;  
  	case 3 :    
  	                
  	            CheckLine (3,4,5);
             	CheckLine (0,3,6);
	break;          
	case 4 : 
	            CheckLine (0,4,8);
            	CheckLine (2,4,6);
            	CheckLine (1,4,7);
	            CheckLine (3,4,5);
	break;       
	case 5 : 
	            CheckLine (2,5,8);
              	CheckLine (3,4,5);
	break;  
	case 6 :
	            CheckLine (6,7,8);
            	CheckLine (0,3,6);
            	CheckLine (2,4,6);
	break;  
	case 7 : 
	            CheckLine (6,7,8);
             	CheckLine (1,4,7);
 	break;
	case 8 : 
	            CheckLine (0,4,8);
            	CheckLine (2,5,8);
             	CheckLine (6,7,8);
	break;          
	}       
	}
	
	function CheckLine (l1,l2,l3)  {
	   if (!overGame) {
	console.log (l1+""+l2+""+l3) ;
	console.log (FieldArray [l1].fieldImage +" " + FieldArray [l2].fieldImage) ;
	if (FieldArray[l1].fieldImage == FieldArray[l2].fieldImage && FieldArray[l2].fieldImage == FieldArray[l3].fieldImage) {
	DrawLine(ctx,FieldArray[l1].minPositionx, FieldArray[l1].minPositiony ,FieldArray[l3].minPositionx,FieldArray[l3].minPositiony);
	alert("won");
	overGame =true;
	return;
	}
	}
	} 
	
	
	
	
	///////// DRAW  ////
	function DrawLine (context, minx, miny, maxx, maxy) {
	console.log (minx+" " +miny+" "+maxx+" " + maxy) ;
	     context.beginPath() ;
	     context.lineWidth = 4;
	     context.moveTo(minx+50,miny+50);
	     context.lineTo(maxx+50,maxy+50);
	     context.stroke();
	} 
	
	function DrawKrest (context,minx,miny){   
	    
	    context.beginPath();
		context.moveTo(minx+10,miny+10);
		context.lineTo(minx+90,miny+90);
		context.moveTo(minx+10,miny+90);
		context.lineTo(minx+90,miny+10);
		context.stroke();

	}
	function DrawZero (context,minx,miny) {
	    context.beginPath();
        context.arc(minx+50,miny+50,30,0,Math.PI*2,true);
		context.stroke();

	}
	function DrawClear (context,minx,miny) {
		 ctx.clearRect(minx+5,miny+5,70,30);	
	}
    ///////// DRAW  ////
}