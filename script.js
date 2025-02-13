document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("bgCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    class Particle {
        constructor(x, y, size, speedX, speedY) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speedX = speedX;
            this.speedY = speedY;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) {
                this.speedX *= -1;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY *= -1;
            }
        }

        draw() {
            ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < 50; i++) {
            const size = Math.random() * 3 + 2;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const speedX = (Math.random() - 0.5) * 2;
            const speedY = (Math.random() - 0.5) * 2;

            particles.push(new Particle(x, y, size, speedX, speedY));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
            particle.update();
            particle.draw();

            // Динамическое изменение размера (ограничение минимального и максимального размера)
            particle.size += Math.sin(Date.now() * 0.002) * 0.15; // Плавное пульсирование

            // Ограничиваем размер частиц, чтобы не исчезали
            if (particle.size < 1.5) particle.size = 1.5;
            if (particle.size > 4) particle.size = 4;
        });

        requestAnimationFrame(animate);
    }


    init();
    animate();

    // Добавляем плавный скролл к секции "About Us"
    document.querySelector('a[href="#about"]').addEventListener("click", function (event) {
        event.preventDefault();

        const target = document.querySelector("#about");
        const offset = 50; // Можно менять, чтобы настроить лучшее положение

        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: "smooth"
        });
    });

    // Добавляем плавный скролл к секции "Services"
    document.querySelector('a[href="#services"]').addEventListener("click", function (event) {
        event.preventDefault();

        const target = document.querySelector("#services");
        const offset = 170; // Можно менять для точного выравнивания

        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: "smooth"
        });
    });

    // Добавляем плавный скролл к секции "Contact"
    document.querySelector('a[href="#contact"]').addEventListener("click", function (event) {
        event.preventDefault(); // Отменяем стандартное поведение ссылки

        const target = document.querySelector("#contact");
        const offset = 100; // Регулируемый отступ

        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: "smooth" // Плавная прокрутка
        });
    });



    // Добавляем плавный скролл к секции "Home"
    document.querySelector('a[href="#home"]').addEventListener("click", function (event) {
        event.preventDefault();

        const target = document.querySelector(".hero"); // Секция "We create next-gen mobile solutions"
        const offset = 80; // Отступ сверху, чтобы не прилипало

        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: "smooth"
        });
    });


    // Добавляем анимацию появления раздела About при скролле
    const aboutSection = document.querySelector(".about");

    function revealAbout() {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            aboutSection.classList.add("show");
        }
    }

    window.addEventListener("scroll", revealAbout);
    revealAbout(); // Проверяем при загрузке

    // 🔹 Скрытие/появление навигационной панели при скролле
    const navbar = document.querySelector(".navbar");
    let lastScrollY = window.scrollY;
    let isScrolling;

    window.addEventListener("scroll", () => {
        clearTimeout(isScrolling);

        if (window.scrollY > lastScrollY) {
            navbar.classList.add("hidden"); // Прячем навбар при прокрутке вниз
        } else {
            navbar.classList.remove("hidden"); // Показываем при прокрутке вверх
        }

        lastScrollY = window.scrollY;

        // Если пользователь остановился, показываем навбар
        isScrolling = setTimeout(() => {
            navbar.classList.remove("hidden");
        }, 300); // 300 мс задержка
    });

});
