import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  squares!: string[];
  xIsNext!: boolean;
  winner!: string;
  nextPlayer!: string;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.xIsNext = true;
    this.nextPlayer = this.player;
  }

  get player() {
    if(this.winner != '') {
      return '';
    }
    else {
      return this.xIsNext ? 'X' : 'O';
    }
  }

  move(squarePosition: number) {
    if(!this.squares[squarePosition] && this.winner == '') {
      this.squares.splice(squarePosition, 1, this.player);
      this.xIsNext = !this.xIsNext;
      this.nextPlayer = this.player;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2], // première ligne
      [3, 4, 5], // deuxième ligne
      [6, 7, 8], // troisième ligne
      [0, 3, 6], // première colonne
      [1, 4, 7], // deuxième colonne
      [2, 5, 8], // troisième colonne
      [0, 4, 8], // première diagonale
      [2, 4, 6]  // deuxième diagonale
    ];

    for (let i = 0; i < lines.length; i++) {
      const[a, b, c] = lines[i];
      if(this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        return this.squares[a];
      }
    }

    return '';
  }

}
