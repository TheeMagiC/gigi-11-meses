document.addEventListener('DOMContentLoaded', () => {
    // Criação das partículas flutuantes
    const particlesContainer = document.querySelector('.floating-particles');
    const numberOfParticles = 150; // Aumentei o número de partículas

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamanho aleatório entre 5px e 15px
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posição inicial aleatória em toda a tela
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Atraso aleatório na animação
        particle.style.animationDelay = `${Math.random() * 20}s`;
        
        // Velocidade aleatória
        const duration = Math.random() * 10 + 15; // Entre 15 e 25 segundos
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }

    // Controles de música
    const audio = document.getElementById('bgMusic');
    const playBtn = document.getElementById('playBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const playIcon = playBtn.querySelector('i');

    // Configuração inicial do volume (10%)
    audio.volume = 0.1;
    volumeSlider.value = 10;

    // Inicia a música automaticamente
    audio.play().then(() => {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
    }).catch(error => {
        console.log("Autoplay prevented:", error);
    });

    // Controle de play/pause
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        } else {
            audio.pause();
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
    });

    // Controle de volume
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value / 100;
    });

    // Efeito de fade-in para os elementos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    document.querySelectorAll('.message, .gallery-item, .final-message, .timeline-item, .message-card').forEach((el) => {
        observer.observe(el);
    });

    // Efeito de parallax suave no hero
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });

    // Adiciona classe para animação de entrada
    document.querySelector('.hero').classList.add('fade-in');

    // Contador regressivo
    function updateCountdown() {
        // Data do início do namoro (10 de maio de 2024)
        const startDate = new Date('2024-05-10');
        const now = new Date();
        
        // Calcula a data do aniversário de 1 ano
        const anniversaryDate = new Date('2025-05-10');
        
        // Calcula a diferença até o aniversário
        const diff = anniversaryDate - now;

        // Se já passou do aniversário, mostra 0
        if (diff < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    // Atualiza o contador a cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Efeito de hover nas mensagens de amor
    const messageCards = document.querySelectorAll('.message-card');
    messageCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Efeito de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Efeito de hover nas fotos da galeria
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.overlay').style.transform = 'translateY(0)';
        });
        item.addEventListener('mouseleave', () => {
            item.querySelector('.overlay').style.transform = 'translateY(100%)';
        });
    });

    // Modal de imagem
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-modal');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            modalImg.src = img.src;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Cartas de Amor
    const envelopes = document.querySelectorAll('.envelope');
    envelopes.forEach(envelope => {
        envelope.addEventListener('click', () => {
            envelope.classList.toggle('opened');
        });
    });

    // Galeria de Recados
    const addPostItBtn = document.querySelector('.add-post-it');
    const messageBoardGrid = document.querySelector('.message-board-grid');

    addPostItBtn.addEventListener('click', () => {
        const newPostIt = document.createElement('div');
        newPostIt.className = 'post-it';
        newPostIt.innerHTML = `
            <p>Novo recado de amor...</p>
            <span class="date">${new Date().toLocaleDateString()}</span>
        `;
        messageBoardGrid.appendChild(newPostIt);
    });
});
