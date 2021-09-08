const modals = () => {
    //создаем переменную кот будет следить была ли нажата хотя бы одна кнопка при нахождении на странице
    let btnPressed = false;
    // аргументы: чем открываем, какое окно открываем, как закрываем
    // overlay - пер. наложениеб перекрытие; destroy - функция уничтожающая тригер 
    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'), // переменная со всеми модальными окнами
            scroll = calcScroll();

        trigger.forEach(elem => {
            elem.addEventListener('click', (event) => {
                if (event.target) {
                    event.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    elem.remove();
                }
                windows.forEach(item => {
                    item.style.display = "none";
                    // добавляем анимацию из animate css библиотеки
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
                //document.body.classList.add('modal-open');
            });
        });

        close.addEventListener('click', (event) => {
            windows.forEach(item => {
                item.style.display = "none";
            });
            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
            // document.body.classList.remove('modal-open');
        });
        modal.addEventListener('click', (event) => {
            if (event.target == modal) {
                windows.forEach(item => {
                    item.style.display = "none";
                });
                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
                //document.body.classList.remove('modal-open');
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display;
            // получаем все модальные окна, т.к. к пер windows из этой функции доступа не имеем
            // сразу над псевдомассивом выполняем действия по вычислению  открыто какое нить модальное окно или нет
            // смотрим применил ли браузер стили 
            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = "block";
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
                let scroll = calcScroll();

            }
        }, time);
    }

    // пишем функцию считающую сколько пикселей занимает скролл

    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    // функция кот высчитывает когда пользователь пролистал в конец страницы и открывает автоматически модальное окно
    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            if (!btnPressed && window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                // навешивание событий вручную
                document.querySelector(selector).click();
                // решение для старых бразеров 
                // let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                // if (!btnPressed && window.pageYOffset + document.documentElement.clientHeight >= scrollHeight) 
            }
        });
    }




    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.pulse', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.pulse');
    showModalByTime('.popup-consultation', 60000);


};

export default modals;