// class for the graph of possible knight moves with function for traversal

class KnightGraph {
  constructor(graph) {
    this.graph = graph;
    this.root = this.graph[3][3];
  }

  levelOrder([i, j], endCoordsArray) {
    const endCoords = endCoordsArray.toString();
    const startNode = graph[i][j];

    this.root = startNode;

    const queue = [];

    if (this.root.coords === endCoords) {
    }

    const moves = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (var idx in moves) {
      const move = moves[idx];
      if (this.root[move] != null) {
        queue.push([this.root[move], [this.root.coords]]);
      }
    }

    while (queue.length > 0) {
      let nextInQueue = queue.shift();
      let node = nextInQueue[0];
      let path = nextInQueue[1];

      if (node.coords === endCoords) {
        path.push(endCoords);
        console.log(
          `You made it in ${path.length - 1} moves! Here's your path:`
        );
        path.forEach((move) => {
          console.log(`[${move}]`);
        });

        return;
      }

      for (var idx in moves) {
        let currentMove = moves[idx];
        if (node[currentMove] != null) {
          if (node[currentMove].coords != path.at(-1)) {
            let newPath = path.slice();
            newPath.push(node.coords);
            queue.push([node[currentMove], newPath]);
          } else {
          }
        }
      }
    }
  }
}

class Node {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.coords = [i, j].toString();
    this.a = null;
    this.b = null;
    this.c = null;
    this.d = null;
    this.e = null;
    this.f = null;
    this.g = null;
    this.h = null;
  }
}

// creating an 8x8 of Nodes where each Node points to all possible moves from that node

const createKnightGraph = () => {
  const xArray = [0, 1, 2, 3, 4, 5, 6, 7];
  const yArray = [0, 1, 2, 3, 4, 5, 6, 7];

  const graph = new Array(8).fill(null).map(() => new Array(8).fill(null));

  const possibleMoves = {
    a: [-1, -2],
    b: [-2, -1],
    c: [-2, 1],
    d: [-1, 2],
    e: [1, 2],
    f: [2, 1],
    g: [2, -1],
    h: [1, -2],
  };

  for (var i = 0; i < graph.length; i++) {
    for (var j = 0; j < graph[i].length; j++) {
      graph[i][j] = new Node(i, j);
    }
  }

  for (var i = 0; i < graph.length; i++) {
    for (var j = 0; j < graph[i].length; j++) {
      for (var move in possibleMoves) {
        const deltaI = possibleMoves[move][0];
        const deltaJ = possibleMoves[move][1];

        if (graph[i + deltaI]) {
          if (graph[i + deltaI][j + deltaJ]) {
            graph[i][j][move] = graph[i + deltaI][j + deltaJ];
          }
        }
      }
    }
  }

  return graph;
};

// Create new graph
const graph = createKnightGraph();
// initialise knight class
const knight = new KnightGraph(graph);
//find path
const solution = knight.levelOrder([3, 3], [4, 7]);
