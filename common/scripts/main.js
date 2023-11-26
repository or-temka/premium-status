
class MainPageScripts {

  changedNumber(input){
    phone.phoneNumber = input;
    input.value = phone.phoneNumber;
  }

  changedFio(input){

    let inputVal = input.value;

    let lastInputSimbol = inputVal[inputVal.length - 1];
    if (Number.isInteger(+lastInputSimbol) && lastInputSimbol != " "){
      inputVal = inputVal.replace(lastInputSimbol, "")
    }
    if (["!","@","#","$","%","^","&","*","(",")",
      "_","+","=","-","?",":","№","}","{","[","]",
      "<",">","/","\\","|",".",",","`","~"]
      .includes(lastInputSimbol)){
        inputVal = inputVal.replace(lastInputSimbol, "")
      }

    input.value = inputVal;
  }

  showPopUp(msg){
    const popUp = document.querySelector('.pop-up');
    popUp.querySelector('.pop-up__msg-text').textContent = msg;
    popUp.style.display = "block";
  }

  closePopUp(){
    const popUp = document.querySelector('.pop-up');
    popUp.style.display = "none";
  }

  clickBtnSendFormTrue(){
    this.showPopUp('Данные успешно отправлены!')
  }
  
  clickBtnSendFormBad(){
    this.showPopUp('Упс.. Поля формы незаполнены или заполненны неправильно.')
  }

}

class ChangeInputNumber {
  number = '';
  lastValue = 0;

  trueInput(input){
    input.style.boxShadow = "0px 3px green";
  }

  badInput(input){
    input.style.boxShadow = "0px 3px red";
  }

  get phoneNumber() {
    let strongNumber = this.number;

    if (this.number.length > 0) {
      strongNumber = "+7 (" + strongNumber;
    }
    if (this.number.length > 2){
      strongNumber = strongNumber.slice(0, 7) + ") " + strongNumber.slice(7);
    }
    if (this.number.length > 6){
      strongNumber = strongNumber.slice(0, 12) + "-" + strongNumber.slice(12);
    }
    if (this.number.length > 8){
      strongNumber = strongNumber.slice(0, 15) + "-" + strongNumber.slice(15);
    }

    return strongNumber;
  }

  set phoneNumber(input) {

    let phone = input.value;

    let easyNumber = phone
      .replace('+7 ', '')
      .replace('(', '')
      .replace(')', '')
      .replace(' ', '')
      .replace('-', '')
      .replace('-', '')
      .replace('+', '')

    for (let i of easyNumber){
      if (Number.isNaN(+i)){
        easyNumber = easyNumber.replace(i, "")
        return;
      }
    }

    if (this.lastValue >= phone.length && phone.length > 1){
      this.number = this.number.slice(0, -1);
      this.lastValue = this.lastValue - 3;
    } else if (easyNumber.length < 11){
      this.number = easyNumber;
      this.lastValue = phone.length;
    }

    if (this.number.length == 10){
      this.trueInput(input);
    } else {
      this.badInput(input);
    }
  }
}

let phone = new ChangeInputNumber();

let main = new MainPageScripts();