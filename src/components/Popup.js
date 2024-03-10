export default class Popup{
    constructor(selector){
        this._popupSelector = selector;
        this._popup = document.querySelector(this._popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    /** Метод "открывает" нужный попап, также накидывает на esp слушатель, при нажатии на него попап закроется */
    open(){
        this._popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    /** Метод закрывает попап, также снимает слушатель с esp */
    close(){
        this._popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    /** Метод отвечает за закрытии попапа при нажатии на esp */
    _handleEscClose(evt){
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    /** Метод закрывает попап при клике на его фон */
    setEventListeners(){
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_is-opened')) {
                this.close();
            }
        });
    }
}