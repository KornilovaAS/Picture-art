// import checkNumInputs from './checkNumInputs';
// import closeModalWindow from './closeModalWindow';
// import { data } from 'jquery';

const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name=upload]');

    //  checkNumInputs('input[name="user_phone"]');



    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы скоро с вами свяжемся!',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    }

    // переменные отвещающие за пути по кот мы будем отправлять наши данные 
    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'

    };

    // функция отвечающая за отправку запроса 
    const postData = async(url, data) => {

        let res = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = "";
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = "Файл не выбран";
        });
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            // переменная кот будет содержать ... тк наименования файлов могут быть очень большими 
            let dots;
            const arr = item.files[0].name.split('.');
            arr[0].length > 5 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (event) => {
            event.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);
            // добавляем из анимайт цсс два класса позволяющие скрыть форму 
            item.classList.add('animated', 'fadeOutUp');
            // т.к. форма станет толькопрозрачной после применения анимайтед, 
            // используем сеттаймаут чтобы форму скрыть вообще для того чтобы при замене контента не поехала верстка
            setTimeout(() => {
                item.style.display = "none";
            }, 400);

            // отображение статуса сообщения 
            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            // добавляем текст

            let statusTextMessage = document.createElement('div');
            statusTextMessage.textContent = message.loading;
            statusMessage.appendChild(statusTextMessage);


            const formData = new FormData(item); //создаем конструктов который соберет все данные с импутов и поместит в переменную formData
            // создаем переменную чтобы сформировать динамический путь куда будем отправлять данные 
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;


            postData(api, formData) //тк здесь возвращается промис прописываем цепочку
                .then(res => {
                    statusImg.setAttribute('src', message.ok);
                    statusTextMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    statusTextMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = "block";
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                });
        });
    });
};

export default forms;