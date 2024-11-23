// define items
let empty;
let placeHolder1;

function defineItems(){
  empty = new item("Empty", 0, 0, []);
  placeHolder1 = new item("PH 1", 100, 1, ["placeholder"]);
}


class item {
  constructor(name, stackSize, itemID, tags){
    this.name = name;
    this.stackSize = stackSize;
    this.itemID = itemID;
    this.tags = tags;
  }
}