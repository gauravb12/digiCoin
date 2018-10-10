import { Component, OnInit } from '@angular/core';
import { Block } from '../blocks';
import * as sha from 'crypto-js/sha256';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent implements OnInit {

	blocks: Block[] = [
		{ index: 0, timestamp: 1539022792, data: "{sender: 'A', receiver: 'B', amount: 1000}", prevHash: "0", hash: "a1e9d0e91c8b26a97822487e571325b16f81c215f4384ce4f11580a1ffb548f9" }
	];

	nBlock = new Block;
	incorrect = false;

  constructor() { }

  ngOnInit() {
  	this.startNewBlock();
  }

  startNewBlock(): void {
  	this.nBlock.index = this.blocks.length;
  	this.nBlock.timestamp = Date.now();
  	this.nBlock.data = '';
  	this.nBlock.prevHash = this.blocks[this.blocks.length-1].hash;
  	this.nBlock.hash = sha(this.nBlock.index+this.nBlock.timestamp+this.nBlock.data+this.nBlock.prevHash).toString();
  }

  calcHash(): void {
  	this.nBlock.hash = sha(this.nBlock.index+this.nBlock.timestamp+this.nBlock.data+this.nBlock.prevHash);	
  }

  checkBlock(block: Block): void {
  	var hash = sha(block.index+block.timestamp+block.data+block.prevHash).toString();
  	var blockBox = document.getElementById('blck'+block.index);
  	if(hash == block.hash){
  		blockBox.classList.remove('panel-danger');
  		blockBox.classList.add('panel-success');
  		this.incorrect = false;
  		if(block.index+1 != this.blocks.length){
	  		this.checkBlock(this.blocks[block.index+1]);
  		}
  	}	
  	else {
  		for(var i=block.index; i<this.blocks.length; i++){
  			var blockBox = document.getElementById('blck'+i);
  			blockBox.classList.remove('panel-success');
  			blockBox.classList.add('panel-danger');
  		}
  		this.incorrect = true;
  	}
  		
  }

  addBlock(): void {
  	this.blocks.push(this.nBlock);
  	this.nBlock = new Block;
  	this.startNewBlock();
  }

  select(block: Block): void {
  	this.nBlock = block;
  }

}
