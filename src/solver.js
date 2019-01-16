/**
 * DP : Matrix for Dynamic Programing
 * - Prevent access outside the range of array.
 * - Easy arrangement to accommodate array reuse in DP including Markov process.
 */
class DP{
	constructor(X,Y){
		this.array= Array(X).fill().map(e=>Array(Y).fill(Infinity)); 
		//In the case of TSP initialize with infinity
		this.X=X; this.Y=Y;
	}
	_(x,y){ //setter
		const s = this; 
		return (x<0||y<0||x>=this.X||y>=this.Y) ? {set _(value){}}:{set _(value){s.array[x][y] = value;}} ;
	}
	$(x,y){ //getter
		return (x<0||y<0||x>=this.X||y>=this.Y) ? 0 : this.array[x][y];
	}
}

/**
 *  TSP : When the departure node is not decided
 */
function TSP(cost){
	const n = cost.length;
	const d = new DP(1<<n,n);
   
	for(var s=0; s<(1<<n); s++){       //A set of visited nodes s
		for(var i=0; i<n; i++){        //Full search for the last visited node i
			if(!(s&(1<<i))) continue;  //It can not be yet visited to the last visited node
			d._(1<<i,i)._ = 0;         //When starting from node i, the binary representation of the subset is 1<<i.
			for(var j=0; j<n; j++){    //Full search for the next visited node j 
				if(s&(1<<j)) continue; //It can not have already visited the next node to visit
				d._(s|(1<<j),j)._ = Math.min(d.$(s|(1<<j),j), d.$(s,i)+cost[i][j]);
			}
		}
	}
	return Math.min(...Array(n).fill().map((e,i)=> d.$((1<<n)-1, i))); 
    //Search for the minimum value from the state of visiting all nodes (s = 1111 ...)
}


/**
 *  TSPfromStartNode : When the departure node is decided
 */
function TSPfromStartNode(cost,startNode){
	const n = cost.length;
	const d = new DP(1<<n,n);

	d._(1<<startNode,startNode)._ = 0; //When starting from node startNode, the binary representation of the subset is 1 << startNode.
   
	for(var s=0; s<(1<<n); s++){       //A set of visited nodes s
		for(var i=0; i<n; i++){        //Full search for the last visited node i
			if(!(s&(1<<i))) continue;  //It can not be yet visited to the last visited node
			for(var j=0; j<n; j++){    //Full search for the next visited node j 
				if(s&(1<<j)) continue; //It can not have already visited the next node to visit
				d._(s|(1<<j),j)._ = Math.min(d.$(s|(1<<j),j), d.$(s,i)+cost[i][j]);
			}
		}
	}
	return Math.min(...Array(n).fill().map((e,i)=> d.$((1<<n)-1, i))); 
    //Search for the minimum value from the state of visiting all nodes (s = 1111 ...)
}



var src = {
	TSP: function(cost){return TSP(cost);},
	TSPfromStartNode: function(cost,startNode){return TSPfromStartNode(cost,startNode);}
};
module.exports = src;
