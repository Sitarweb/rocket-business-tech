import './index.css';
import Slider from '../components/Slider.js';
import PopupWithInfo from '../components/PopupWithInfo.js';
import {infoOpenButton} from '../utils/elements.js';

const popupWithInfo = new PopupWithInfo('.popup_info', infoOpenButton);

infoOpenButton.addEventListener('click', () => {
    popupWithInfo.toggle();
});

popupWithInfo.setEventListeners();


const slider = new Slider('.slider', '.switches__prev', '.switches__next', '.switches__text');

document.addEventListener('DOMContentLoaded', function() {

    // Получаем форму и добавляем обработчик события отправки формы
    const form = document.querySelector('.form');
    form.addEventListener('submit', formSend);

    // Функция обработки отправки формы
    async function formSend(e) {
        e.preventDefault();

        // Проверяем форму на наличие ошибок
        let error = formValidate(form);

        // Создаем объект FormData для отправки данных формы
        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);

        // Если нет ошибок, отправляем данные на сервер
        if (error === 0) {
            form.classList.add('_sending');
            /* Пока нет никакой отправки
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('Ошибка');
                form.classList.remove('_sending');
            } */
        } else {
            alert('Заполните обязательные поля');
        }
    }

    // Функция валидации формы
    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index]
            formRemoveError(input);

            // Проверяем каждое поле на соответствие условиям валидации
            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    // Функции добавления и удаления класса ошибки
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    // Функция тестирования почты
    function emailTest(input) {
        return !/^[a-zA-Z0-9+\._\-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}$/.test(input.value);
    }

    // Получаем элементы формы для загрузки изображения и его предпросмотра
    const formImage = document.getElementById('formImage');
    const formPreview = document.getElementById('formPreview');

    // Добавляем обработчик изменения значения в поле загрузки изображения
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    })

    // Функция загрузки изображения и предпросмотра
    function uploadFile(file) {
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert ('Разрешены только изображения.');
            formImage.value = '';
            return;
        }
        // Проверяем размер файла (<2 Мб)
        if (file.size > 2 * 1024 * 1024) {
            alert('Файл должен быть менее 2 МБ.');
            return;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
        };

        reader.onerror = function (e) {
            alert('Ошибка');
        };
        reader.readAsDataURL(file);
    }

    // Находим все ссылки на странице и устанавливаем атрибут target в '_blank'
    var links = document.querySelectorAll('a');
    links.forEach(function(link) {
        link.setAttribute('target', '_blank');
    });

});
