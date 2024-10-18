let stocks = [];
let stockUpdateTimer = 0;
let stockUpdateWait = 100;

class stock {
  constructor(name, value, pressValue){
    this.name = name;
    // initial and curent values vars
    this.initialValue = value;
    this.currentValue = value;
    // array holding the past values of the stock
    this.pastValues = [this.value];
    // variable describing the public perception of the stock
    this.pressValue = pressValue;
  }
  updatePastValues(){
    this.pastValues.push(this.currentValue);
  }
}