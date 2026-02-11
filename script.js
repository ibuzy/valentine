function getHeaderBounds() {
    const header = document.querySelector('.question-header');
    const rect = header.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, height: rect.height };
}
function getContainerBounds() {
    const container = document.querySelector('.container');
    const rect = container.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right };
}
function getYesBtnBounds() {
    const yesBox = document.getElementById('yesBtnBox');
    const rect = yesBox.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, width: rect.width, height: rect.height };
}
function getMiddleSectionBounds() {
    const middle = document.querySelector('.middle-section');
    const rect = middle.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right };
}

function createFloatingBackgroundElements() {
    const container = document.getElementById('floatingHeartsContainer');
    const hearts = ['❤️', '💕', '💗'];

    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-bg';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = Math.random() * 100 - 10 + '%';
        const duration = 8 + Math.random() * 6;
        heart.style.setProperty('--duration', duration + 's');
        const tx = (Math.random() * 200 - 100);
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--delay', Math.random() * 2 + 's');
        container.appendChild(heart);
    }

    for (let i = 0; i < 3; i++) {
        const line = document.createElement('div');
        line.className = 'line-bg';
        line.style.left = Math.random() * 100 + '%';
        line.style.bottom = Math.random() * 80 - 10 + '%';
        line.style.width = (40 + Math.random() * 100) + 'px';
        line.style.height = (2 + Math.random() * 2) + 'px';
        const duration = 10 + Math.random() * 8;
        line.style.setProperty('--duration', duration + 's');
        const tx = (Math.random() * 300 - 150);
        line.style.setProperty('--tx', tx + 'px');
        container.appendChild(line);
    }

    for (let i = 0; i < 5; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble-bg';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.bottom = Math.random() * 100 - 10 + '%';
        const size = 30 + Math.random() * 80;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        const duration = 12 + Math.random() * 8;
        bubble.style.setProperty('--duration', duration + 's');
        const tx = (Math.random() * 200 - 100);
        bubble.style.setProperty('--tx', tx + 'px');
        container.appendChild(bubble);
    }
}

function startParticleStream() {
    const container = document.getElementById('particlesContainer');
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 10;
        const size = 4 + Math.random() * 4;
        const translateX = (Math.random() * 560 - 280);
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.setProperty('--tx', translateX + 'px');
        const duration = 4.5 + Math.random() * 1;
        particle.style.animationDuration = duration + 's';
        container.appendChild(particle);
        setTimeout(() => particle.remove(), duration * 1000);
    }, 200);
}

function handleYes() {
    const catImage = document.getElementById('catImage');
    const catImageWrapper = document.getElementById('catImageWrapper');
    const questionText = document.getElementById('questionText');

    if (catImage) catImage.src = 'img/cat.gif';
    if (catImageWrapper) catImageWrapper.classList.add('static');
    if (questionText) {
        questionText.innerHTML = 'УРАА! Теперь ТЫ<br>МОЯ валентинка';
    }

    if (!document.getElementById('lovePhrase')) {
        const container = document.querySelector('.container');

        const wrapper = document.createElement('div');
        wrapper.id = 'lovePhraseWrapper';

        wrapper.style.position = 'absolute';
        wrapper.style.left = '0';
        wrapper.style.width = '100%';
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'center';
        wrapper.style.alignItems = 'center';
        wrapper.style.pointerEvents = 'none';
        wrapper.style.zIndex = '12';

        const love = document.createElement('div');
        love.id = 'lovePhrase';
        love.className = 'gradient-number';
        love.textContent = 'киса, я безумно люблю тебя';
        love.style.pointerEvents = 'none';

        wrapper.appendChild(love);

        const header = document.querySelector('.question-header');
        const cat = document.querySelector('.cat-image-wrapper');
        const containerRect = container.getBoundingClientRect();

        if (header && cat) {
            const headerRect = header.getBoundingClientRect();
            const catRect = cat.getBoundingClientRect();
            const midYWindow = (headerRect.bottom + catRect.top) / 2;
            const topWithinContainer = midYWindow - containerRect.top;

            wrapper.style.top = topWithinContainer + 'px';
            wrapper.style.transform = 'translateY(-50%)';
        } else {
            const middleSection = document.querySelector('.middle-section');
            if (middleSection && middleSection.parentNode) {
                middleSection.parentNode.insertBefore(wrapper, middleSection);
            }
        }

        container.appendChild(wrapper);

        function positionLovePhrase() {
            const hdr = document.querySelector('.question-header');
            const ct = document.querySelector('.cat-image-wrapper');
            const contRect = container.getBoundingClientRect();
            if (!hdr || !ct) return;

            const hdrRect = hdr.getBoundingClientRect();
            const ctRect = ct.getBoundingClientRect();
            const mid = (hdrRect.bottom + ctRect.top) / 2;
            const topRel = mid - contRect.top;
            wrapper.style.top = topRel + 'px';
        }

        window.addEventListener('resize', positionLovePhrase);
        setTimeout(positionLovePhrase, 120);
        setTimeout(positionLovePhrase, 400);
    }

    const buttonsContainer = document.querySelector('.buttons');
    if (buttonsContainer) {
        buttonsContainer.style.display = 'none';
    }

    const noBtnBox = document.getElementById('noBtnBox');
    const yesBtnBox = document.getElementById('yesBtnBox');
    if (noBtnBox) {
        noBtnBox.classList.add('hidden');
    }
    if (yesBtnBox) {
        yesBtnBox.classList.add('hidden');
    }
}

function handleNo() {
    const noBtnBox = document.getElementById('noBtnBox');
    const headerBounds = getHeaderBounds();
    const containerBounds = getContainerBounds();
    const yesBtnBounds = getYesBtnBounds();
    const middleBounds = getMiddleSectionBounds();

    let randomX, randomY;
    let validPosition = false;
    let attempts = 0;

    const btnWidth = Math.max(noBtnBox.offsetWidth, 100);
    const btnHeight = Math.max(noBtnBox.offsetHeight, 60);

    if (!noBtnBox.classList.contains('no-btn-box')) {
        const rect = noBtnBox.getBoundingClientRect();

        const placeholder = document.createElement('div');
        placeholder.className = 'btn-placeholder';
        placeholder.style.width = rect.width + 'px';
        placeholder.style.height = rect.height + 'px';
        noBtnBox.parentNode.insertBefore(placeholder, noBtnBox);

        noBtnBox.style.position = 'fixed';
        noBtnBox.style.left = rect.left + 'px';
        noBtnBox.style.top = rect.top + 'px';
        noBtnBox.style.width = rect.width + 'px';
        noBtnBox.style.height = rect.height + 'px';

        noBtnBox.classList.add('no-btn-box');
        noBtnBox.classList.remove('btn-box');

        document.body.appendChild(noBtnBox);

        noBtnBox.style.zIndex = '2147483647';

        void noBtnBox.offsetWidth;
    }

    while (!validPosition && attempts < 50) {
        randomX = Math.random() * (window.innerWidth - btnWidth);
        randomY = Math.random() * (window.innerHeight - btnHeight);

        const btnRect = { left: randomX, right: randomX + btnWidth, top: randomY, bottom: randomY + btnHeight };

        const headerOverlap = !(btnRect.bottom < headerBounds.top - 20 || btnRect.top > headerBounds.bottom + 20);
        const bottomOverlap = !(btnRect.bottom < containerBounds.top - 20 || btnRect.top > containerBounds.bottom + 80);
        const footerOverlap = btnRect.bottom > window.innerHeight - 60;
        const yesOverlap = !(btnRect.bottom < yesBtnBounds.top - 20 || btnRect.top > yesBtnBounds.bottom + 20 ||
            btnRect.right < yesBtnBounds.left - 20 || btnRect.left > yesBtnBounds.right + 20);

        if (!headerOverlap && !bottomOverlap && !footerOverlap && !yesOverlap) {
            validPosition = true;
        }
        attempts++;
    }

    if (typeof randomX === 'undefined' || typeof randomY === 'undefined') {
        randomX = Math.random() * (window.innerWidth - btnWidth);
        randomY = Math.random() * (window.innerHeight - btnHeight);
    }

    noBtnBox.style.left = randomX + 'px';
    noBtnBox.style.top = randomY + 'px';
}

function setupButtonPressBehavior() {
    document.addEventListener('touchstart', function onceTouch() {
        document.body.classList.add('no-hover');
        document.removeEventListener('touchstart', onceTouch);
    }, { passive: true });

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', (e) => {
            btn.classList.add('pressed');
        }, { passive: true });

        btn.addEventListener('touchend', (e) => {
            btn.classList.remove('pressed');
        }, { passive: true });

        btn.addEventListener('touchcancel', () => {
            btn.classList.remove('pressed');
        }, { passive: true });

        btn.addEventListener('mousedown', () => {
            btn.classList.add('pressed');
        });
        document.addEventListener('mouseup', () => {
            buttons.forEach(b => b.classList.remove('pressed'));
        });
    });
}

class TypewriterAnimation {
    constructor(textElement, jsonFile = 'reasons.json') {
        this.textElement = textElement;
        this.jsonFile = jsonFile;
        this.allReasons = [];
        this.shuffledReasons = [];
        this.currentIndex = 0;
        this.isTyping = false;
        this.isDeleting = false;
        
        this.typingSpeed = 40;
        this.deletingSpeed = 20;
        this.pauseDuration = 2000;
        
        this.loadReasons();
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    async loadReasons() {
        try {
            const response = await fetch(this.jsonFile);
            if (!response.ok) throw new Error(`Ошибка HTTP! статус: ${response.status}`);
            const data = await response.json();
            this.allReasons = data.reasons || [];
            if (this.allReasons.length > 0) {
                this.shuffledReasons = this.shuffleArray(this.allReasons);
                this.startAnimation();
            }
        } catch (error) {
            console.error('Ошибка загрузки reasons.json:', error);
        }
    }

    startAnimation() {
        this.typeNextReason();
    }

    typeNextReason() {
        if (this.shuffledReasons.length === 0) return;

        if (this.currentIndex >= this.shuffledReasons.length) {
            this.currentIndex = 0;
            this.shuffledReasons = this.shuffleArray(this.allReasons);
        }

        const currentReason = this.shuffledReasons[this.currentIndex];
        this.typeText(currentReason);
    }

    typeText(text) {
        this.isTyping = true;
        this.isDeleting = false;
        let index = 0;

        const typeInterval = setInterval(() => {
            if (index < text.length) {
                this.textElement.textContent += text[index];
                index++;
            } else {
                clearInterval(typeInterval);
                this.isTyping = false;
                setTimeout(() => this.deleteText(text), this.pauseDuration);
            }
        }, this.typingSpeed);
    }

    deleteText(text) {
        this.isDeleting = true;
        this.isTyping = false;
        let index = this.textElement.textContent.length;

        const deleteInterval = setInterval(() => {
            if (index > 0) {
                this.textElement.textContent = this.textElement.textContent.slice(0, -1);
                index--;
            } else {
                clearInterval(deleteInterval);
                this.isDeleting = false;
                this.currentIndex++;
                this.typeNextReason();
            }
        }, this.deletingSpeed);
    }
}

window.addEventListener('load', () => {
    createFloatingBackgroundElements();
    startParticleStream();
    setupButtonPressBehavior();
    
    const textElement = document.getElementById('typewriterText');
    new TypewriterAnimation(textElement);
});