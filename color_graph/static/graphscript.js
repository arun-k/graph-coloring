var x,y,node_lst=[],vertex=false,edge=false,node_id=0,edge_started=false,beg_node_id,end_node_id,beg_x,beg_y;
		var color_set=['red','blue','green','yellow','magenta','maroon','pink','purple','orange','aqua'];
    	var canvas=document.getElementById("mycanvas");
    	var ctx=canvas.getContext("2d");
		function toggle(act_x,act_y){
			if(edge_started){
				ctx.fillStyle="#808080";
			}
			if(!edge_started){
				ctx.fillStyle="#000000";
			}
			ctx.beginPath();
			ctx.arc(act_x,act_y,10,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();
		}
		function color_vertices(pt,clr){
			ctx.fillStyle=color_set[clr];
			ctx.beginPath();
			ctx.arc(pt.x,pt.y,10,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();
		}
		
		$(document).ready(function(){
  			$("#vertex").click(function(){
			    vertex=true;
				edge=false;
  			});
  			$("#edge").click(function(){
    			vertex=false;
				edge=true;
  			});
  			$("#clears").click(function(){
    			ctx.clearRect(0,0,canvas.width,canvas.height);
				node_id=0;
				edge=false;
				vertex=false;
				node_lst=[];
				edge_started=false;
  			});
			$("#post_graph").click(function(){
				var node_adj_lst={};
				for(var i=0;i<node_lst.length;i++){
					node_adj_lst[i]=node_lst[i].adj_lst;
				}
				$.post("/",{adj_list:JSON.stringify(node_adj_lst)},function(data,status){
						clr_lst=JSON.parse(data);
                  if(status=='success'){
							for(var i=0;i<node_lst.length;i++){
								color_vertices(node_lst[i],clr_lst[i]);
							}
						}
						else{
							alert("Sorry.....Try again!!!!")
						}
				});
			});
		
			$("#mycanvas").click(function(event){
				x=event.pageX-this.offsetLeft;
				y=event.pageY-this.offsetTop;
				if(vertex){
					ctx.fillStyle="#000000";
					ctx.beginPath();
					ctx.arc(x,y,10,0,2*Math.PI);
					ctx.fill();
					ctx.closePath();
					node_lst.push({"x":x,"y":y,adj_lst:[]});
					ctx.font="10px Arial";
					ctx.fillText(node_id,x,y+22);
					node_id+=1;
					
				}
				if(edge){
					for(var i=0;i<node_lst.length;i++){
						if(!edge_started){
							if(x>node_lst[i].x-10 && x<node_lst[i].x+10 && y>node_lst[i].y-10 && y<node_lst[i].y+10){
								beg_node_id=i;
								edge_started=true;
								beg_x=node_lst[i].x;
								beg_y=node_lst[i].y;
								toggle(beg_x,beg_y);
								break;
								
								
							}
						}
						else{
							if(x>node_lst[i].x-10 && x<node_lst[i].x+10 && y>node_lst[i].y-10 && y<node_lst[i].y+10){
								ctx.strokeStyle="#000000";
								ctx.beginPath();
								ctx.moveTo(beg_x,beg_y);
								ctx.lineTo(node_lst[i].x,node_lst[i].y);
								ctx.stroke();
								ctx.closePath();
								node_lst[i].adj_lst.push(beg_node_id);
								node_lst[beg_node_id].adj_lst.push(i);
								end_node_id=i;
								edge_started=false;
								toggle(beg_x,beg_y);
								break;
							}
						}
					}
				}
			});
		});
		
