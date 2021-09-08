// передаем аругменты, селектор кот бдет отображать слайд, как будет двигаться слайдер
// у нас их два вертикальный и горизонтальный 
// кнопки переключающие сам слайдер 

const sliders = (slides, dir, prev, next) => {
    // создаем пер кот будет отображать текущий слайд показывающийся нашему пользователю
    let slideIndex = 1,
        paused = false; // пер. кот будет точно знать нужно ли остановить слайдер

    const items = document.querySelectorAll(slides);


    // функция отвечающая за перемещение слайд индекса=слайдера 
    function showSlides(n) {
        // обрабатываем крайние значения сдайдера
        if (n > items.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = items.length;
        }
        //когда мы показываем определенный слайд нам надо скрыть все остальные 

        items.forEach(slide => {
            // добавляем класс анимации 
            slide.classList.add("animated");
            slide.style.display = "none";
        });
        items[slideIndex - 1].style.display = "block";
    }
    // запустим функция чтобы когда пользователь зашел на страницу у него показывался первый слайд а все остальные были скрыты
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    try {
        const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        });
        nextBtn.addEventListener('click', () => {
            plusSlides(1);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        });

    } catch (err) {};

    function activateAnimation() {
        // условие проверяющее директорию 
        if (dir === 'vertical') {
            paused = setInterval(() => {
                plusSlides(1);
                // добавление анимации
                items[slideIndex - 1].classList.add('slideInDown');
            }, 3000);
        } else {
            paused = setInterval(() => {
                plusSlides(1);
                // добавление анимации
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, 3000);
        }
    }
    activateAnimation();

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });

};

export default sliders;