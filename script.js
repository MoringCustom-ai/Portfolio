// Typing Animation Class
class TypingAnimation {
    constructor(elementId, words, typeSpeed = 150, deleteSpeed = 80, pauseTime = 3000) {
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

// Counter Animation Class
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
                    counter.innerText = target;
                }
            };

            updateCounter();
        });
    }
}

// Navigation Class
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
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
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

// Mobile Menu Class
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

// Scroll Observer Class
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

// Project Animation Class
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

// Video Optimizer Class
class VideoOptimizer {
    constructor() {
        this.videos = document.querySelectorAll('video');
        this.init();
    }

    init() {
        this.videos.forEach(video => {
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
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
        });
    }
}

// Calculator Modal Class - iOS Style
class CalculatorModal {
    constructor() {
        this.modal = document.getElementById('calculatorModal');
        this.modalClose = document.getElementById('modalClose');
        this.expression = document.getElementById('calcExpression');
        this.result = document.getElementById('calcResult');
        this.buttons = document.querySelectorAll('.calc-btn');
        this.viewButtons = document.querySelectorAll('.view-btn[data-project="calculator"]');
        
        this.currentValue = '0';
        this.previousValue = null;
        this.operator = null;
        this.waitingForOperand = false;
        this.expressionText = '';

        if (this.modal) {
            this.init();
        }
    }

    init() {
        // Открытие модального окна
        this.viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        });

        // Закрытие модального окна
        this.modalClose.addEventListener('click', () => this.close());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });

        // Обработчики кнопок калькулятора
        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                const value = btn.dataset.value;

                this.handleButton(action, value);
                this.updateOperatorHighlight(value);
            });
        });

        // Поддержка клавиатуры
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;

            if (e.key >= '0' && e.key <= '9') this.handleButton('number', e.key);
            if (e.key === '.') this.handleButton('decimal', '.');
            if (e.key === '+') this.handleButton('operator', '+');
            if (e.key === '-') this.handleButton('operator', '-');
            if (e.key === '*') this.handleButton('operator', '*');
            if (e.key === '/') this.handleButton('operator', '/');
            if (e.key === 'Enter' || e.key === '=') this.handleButton('equals', '=');
            if (e.key === 'Escape') this.handleButton('clear', 'AC');
            if (e.key === 'Backspace') this.handleButton('backspace', '⌫');
            if (e.key === '%') this.handleButton('percent', '%');
        });
    }

    open() {
        this.modal.classList.add('active');
        this.reset();
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    reset() {
        this.currentValue = '0';
        this.previousValue = null;
        this.operator = null;
        this.waitingForOperand = false;
        this.expressionText = '';
        this.updateDisplay();
        this.clearOperatorHighlight();
    }

    handleButton(action, value) {
        switch (action) {
            case 'number':
                this.inputNumber(value);
                break;
            case 'operator':
                this.inputOperator(value);
                break;
            case 'equals':
                this.calculate();
                break;
            case 'clear':
                this.reset();
                break;
            case 'decimal':
                this.inputDecimal();
                break;
            case 'negate':
                this.negate();
                break;
            case 'percent':
                this.percent();
                break;
        }

        this.updateDisplay();
    }

    inputNumber(num) {
        if (this.waitingForOperand) {
            this.currentValue = num;
            this.waitingForOperand = false;
        } else {
            this.currentValue = this.currentValue === '0' ? num : this.currentValue + num;
        }

        // Ограничение длины
        if (this.currentValue.length > 12) {
            this.currentValue = this.currentValue.slice(0, 12);
        }
    }

    inputOperator(nextOperator) {
        const inputValue = parseFloat(this.currentValue);

        if (this.previousValue === null) {
            this.previousValue = inputValue;
        } else if (this.operator && !this.waitingForOperand) {
            const result = this.performCalculation(this.operator, this.previousValue, inputValue);
            this.currentValue = String(result);
            this.previousValue = result;
            this.expressionText = `${this.formatNumber(result)} ${this.getOperatorSymbol(nextOperator)}`;
        } else {
            this.expressionText = `${this.expressionText} ${this.getOperatorSymbol(nextOperator)}`;
        }

        this.waitingForOperand = true;
        this.operator = nextOperator;
    }

    getOperatorSymbol(op) {
        const symbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
        return symbols[op] || op;
    }

    performCalculation(op, first, second) {
        switch (op) {
            case '+': return first + second;
            case '-': return first - second;
            case '*': return first * second;
            case '/': return second !== 0 ? first / second : 'Error';
            default: return second;
        }
    }

    calculate() {
        if (!this.operator || this.previousValue === null) return;

        const inputValue = parseFloat(this.currentValue);
        const result = this.performCalculation(this.operator, this.previousValue, inputValue);

        this.expressionText = `${this.formatNumber(this.previousValue)} ${this.getOperatorSymbol(this.operator)} ${this.formatNumber(inputValue)} =`;
        this.currentValue = String(result);
        this.previousValue = null;
        this.operator = null;
        this.waitingForOperand = true;
        this.clearOperatorHighlight();
    }

    inputDecimal() {
        if (this.waitingForOperand) {
            this.currentValue = '0.';
            this.waitingForOperand = false;
            return;
        }

        if (!this.currentValue.includes('.')) {
            this.currentValue += '.';
        }
    }

    negate() {
        this.currentValue = String(parseFloat(this.currentValue) * -1);
    }

    percent() {
        this.currentValue = String(parseFloat(this.currentValue) / 100);
    }

    formatNumber(num) {
        const str = String(num);
        if (str.length > 10) {
            return num.toExponential(4);
        }
        return str;
    }

    updateDisplay() {
        this.expression.textContent = this.expressionText;
        
        let displayValue = this.formatNumber(parseFloat(this.currentValue));
        if (this.currentValue.includes('.')) {
            displayValue = this.currentValue;
        }

        this.result.textContent = displayValue;

        // Анимация результата
        this.result.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.result.style.transform = 'scale(1)';
        }, 100);
    }

    updateOperatorHighlight(value) {
        this.clearOperatorHighlight();
        
        if (['+', '-', '*', '/'].includes(value)) {
            const btn = document.querySelector(`.calc-btn.operator[data-value="${value}"]`);
            if (btn) {
                btn.classList.add('active');
            }
        }
    }

    clearOperatorHighlight() {
        document.querySelectorAll('.calc-btn.operator').forEach(btn => {
            btn.classList.remove('active');
        });
    }
}
// Email Form Handler Class - EmailJS
class EmailFormHandler {
    constructor() {
        this.form = document.getElementById('emailForm');
        this.sendBtn = document.getElementById('sendBtn');
        this.formStatus = document.getElementById('formStatus');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.messageInput = document.getElementById('message');
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();

        const formData = {
            name: this.nameInput.value.trim(),
            email: this.emailInput.value.trim(),
            message: this.messageInput.value.trim()
        };

        if (!this.validateForm(formData)) {
            return;
        }

        this.setLoading(true);

        try {
            await this.sendEmail(formData);
            this.showSuccess();
            this.form.reset();
        } catch (error) {
            console.error('Email Error:', error);
            this.showError(error.message);
        } finally {
            this.setLoading(false);
        }
    }

    validateForm(data) {
        if (!data.name || data.name.length < 2) {
            this.showError('Please enter your name (min 2 characters)');
            return false;
        }

        if (!data.email || !this.isValidEmail(data.email)) {
            this.showError('Please enter a valid email address');
            return false;
        }

        if (!data.message || data.message.length < 5) {
            this.showError('Please enter a message (min 5 characters)');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    sendEmail(data) {
        return new Promise((resolve, reject) => {
            if (typeof emailjs === 'undefined') {
                reject(new Error('EmailJS not loaded. Check your internet connection.'));
                return;
            }

            emailjs.send(
                'service_asdfginko322',
                'template_7aseeoj',
                {
                    from_name: data.name,
                    from_email: data.email,
                    message: data.message,
                    to_email: 'shamil1057@gmail.com'
                }
            )
            .then((response) => {
                console.log('✅ SUCCESS!', response.status, response.text);
                resolve(response);
            })
            .catch((error) => {
                console.error('❌ FAILED...', error);
                reject(new Error('Failed to send message. Check Console (F12) for details.'));
            });
        });
    }

    setLoading(isLoading) {
        if (isLoading) {
            this.sendBtn.disabled = true;
            this.sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        } else {
            this.sendBtn.disabled = false;
            this.sendBtn.innerHTML = 'Kirim';
        }
    }

    showSuccess() {
        this.formStatus.className = 'form-status success';
        this.formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I will get back to you soon.';
        
        setTimeout(() => {
            this.formStatus.className = 'form-status';
            this.formStatus.innerHTML = '';
        }, 5000);
    }

    showError(message) {
        this.formStatus.className = 'form-status error';
        this.formStatus.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        setTimeout(() => {
            this.formStatus.className = 'form-status';
            this.formStatus.innerHTML = '';
        }, 5000);
    }
}

// Main Portfolio App Class
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        new TypingAnimation('typing-text', ['Hello Everyone Im Shamil-Ginko'], 150, 80, 3000);
        new CounterAnimation();
        new Navigation();
        new MobileMenu();
        new ScrollObserver();
        new ProjectAnimation();
        new VideoOptimizer();
        new CalculatorModal();
        new EmailFormHandler();
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});