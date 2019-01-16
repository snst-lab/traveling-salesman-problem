/**
 * DP   Dynamic Programing用の２次元配列を用意しておく
 * 配列の範囲外へのアクセスを防止 ＆ 簡単なアレンジでマルコフ過程を含むDPでの配列再利用に対応できる
 */
class DP{
	constructor(X,Y){
		this.array= Array(X).fill().map(e=>Array(Y).fill(Infinity)); //TSPの場合は十分大きな数で初期化
		this.X=X; this.Y=Y;
	}
	_(x,y){ //セッター
		const s = this; 
		return (x<0||y<0||x>=this.X||y>=this.Y) ? {set _(value){}}:{set _(value){s.array[x][y] = value;}} ;
	}
	$(x,y){ //ゲッター
		return (x<0||y<0||x>=this.X||y>=this.Y) ? 0 : this.array[x][y];
	}
}

/**
 *  TSP スタート地点の指定が無い場合
 */
function TSP(cost){
	const n = cost.length;
	const d = new DP(1<<n,n);
   
	for(var s=0; s<(1<<n); s++){       //訪問済みノードの集合s
		for(var i=0; i<n; i++){        //最後に訪れた(今いる）ノードiについて全探索
			if(!(s&(1<<i))) continue;  //最後に訪れたノードに、まだ訪れていないはずがないので除外
			d._(1<<i,i)._ = 0;         //ノードi上にいて辿った経路が0(=ノードiからスタート)の場合、部分集合の2進数表現は1<<iとなる。
			for(var j=0; j<n; j++){    //次に訪れるノードjについて全探索
				if(s&(1<<j)) continue; //次に訪れる予定のノードに、既に訪れているはずがないので除外
				d._(s|(1<<j),j)._ = Math.min(d.$(s|(1<<j),j), d.$(s,i)+cost[i][j]);
			}
		}
	}
	return Math.min(...Array(n).fill().map((e,i)=> d.$((1<<n)-1, i))); //全部訪れた状態(s=1111...)の中から、最小値を探す
}


/**
 *  TSPfromStartNode スタート地点の指定がある場合
 */
function TSPfromStartNode(cost,startNode){
	const n = cost.length;
	const d = new DP(1<<n,n);

	d._(1<<startNode,startNode)._ = 0; //現在startNode上にいて辿った経路が0(=startNodeからスタート)の場合、部分集合の2進数表現は1<<startNodeとなる。
   
	for(var s=0; s<(1<<n); s++){       //訪問済みノードの集合s
		for(var i=0; i<n; i++){        //最後に訪れた(今いる）ノードiについて全探索
			if(!(s&(1<<i))) continue;  //最後に訪れたノードに、まだ訪れていないはずがないので除外
			for(var j=0; j<n; j++){    //次に訪れるノードjについて全探索
				if(s&(1<<j)) continue; //次に訪れる予定のノードに、既に訪れているはずがないので除外
				d._(s|(1<<j),j)._ = Math.min(d.$(s|(1<<j),j), d.$(s,i)+cost[i][j]);
			}
		}
	}
	return Math.min(...Array(n).fill().map((e,i)=> d.$((1<<n)-1, i))); //全部訪れた状態(s=1111...)の中から、最小値を探す
}



var src = {
	TSP: function(cost){return TSP(cost);},
	TSPfromStartNode: function(cost,startNode){return TSPfromStartNode(cost,startNode);}
};
module.exports = src;
