import Popup from "./Popup.js";

export default class PopupWithInfo extends Popup{
    constructor(selector, closeButtonSelector){
        super(selector);
        this._closeButton = closeButtonSelector;
    }

    open() {
        super.open();
        this._closeButton.classList.add('header__burger_close');
        document.querySelector('.page').classList.add('page_overflow');
    }

    close() {
        super.close();
        this._closeButton.classList.remove('header__burger_close');
        document.querySelector('.page').classList.remove('page_overflow');
    }

    toggle() {
        if (this._closeButton.classList.contains('header__burger_close')) {
            this.close();
        } else {
            this.open();
        }
    }
}