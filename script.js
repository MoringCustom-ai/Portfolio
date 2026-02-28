// Класс для печатающегося текста
class TypingAnimation {
    constructor(elementId, words, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000) {
        this.element = document.getElementById(elementId);
        this.words = words;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentWord = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.charIndex === currentWord.length) {
            speed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            speed = 500;
        }

        setTimeout(() => this.type(), speed);
    }
}

// Класс для счетчиков
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-item h2');
        this.started = false;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const heroSection = document.querySelector('#home');
            const sectionPos = heroSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;
            if (sectionPos < screenPos && !this.started) {
                this.startCounters();
                this.started = true;
            }
        });
    }

    startCounters() {
        this.counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 50;
            const updateCounter = () => {
                const c = +counter.innerText;
                if (c < target) {
                    counter.innerText = Math.ceil(c + increment);
                    setTimeout(updateCounter, 40);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCounter();
        });
    }
}

// Класс для навигации
class Navigation {
    constructor() {
        this.links = document.querySelectorAll('.nav-links a');
        this.sections = document.querySelectorAll('section');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({ top: targetSection.offsetTop - 80, behavior: 'smooth' });
                }
            });
        });

        window.addEventListener('scroll', () => {
            let current = '';
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            this.links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Класс для мобильного меню
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navLinks = document.querySelector('.nav-links');
        this.init();
    }

    init() {
        this.hamburger.addEventListener('click', () => {
            this.navLinks.classList.toggle('active');
            const icon = this.hamburger.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                this.navLinks.classList.remove('active');
                this.hamburger.querySelector('i').classList.add('fa-bars');
                this.hamburger.querySelector('i').classList.remove('fa-times');
            });
        });
    }
}

// Класс для анимации появления при скролле
class ScrollObserver {
    constructor() {
        this.elements = document.querySelectorAll('.service-card, .project-card, .skill-card, .about-content, .contact-container');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        this.elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }
}

// Класс для анимации проектов
class ProjectAnimation {
    constructor() {
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(card);
        });
    }
}
class VideoOptimizer {
    constructor() {
        this.videos = document.querySelectorAll('video');
        this.init();
    }

    init() {
        this.videos.forEach(video => {
            // Остановка видео когда не видно (экономия ресурсов)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(video);

            // Принудительное включение аппаратного декодирования
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
        });
    }
}

// Главный класс приложения
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        new TypingAnimation('typing-text', ['Hello Everyone Im Shamil-Ginko '], 150, 80, 3000);
        new CounterAnimation();
        new Navigation();
        new MobileMenu();
        new ScrollObserver();
        new ProjectAnimation();
        new VideoOptimizer(); 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});