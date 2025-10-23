// script.js

// Criar corações flutuantes
function createHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartCount = 30;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-float');
        heart.innerHTML = '❤';
        
        // Posição e animação aleatórias
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.opacity = Math.random() * 0.7 + 0.3;
        
        heartsContainer.appendChild(heart);
    }
}

// Contador de memórias
function setupMemoryCounter() {
    const memoryItems = document.querySelectorAll('.media-item');
    const memoryCount = document.getElementById('memoryCount');
    
    memoryCount.textContent = memoryItems.length;
    
    // Animação de contagem
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentCount = parseInt(memoryCount.textContent);
                if (currentCount < memoryItems.length) {
                    memoryCount.textContent = currentCount + 1;
                    
                    if (currentCount + 1 === memoryItems.length) {
                        showFloatingMessage("Todas as nossas memórias são especiais! ❤");
                    }
                }
            }
        });
    }, { threshold: 0.5 });
    
    memoryItems.forEach(item => {
        observer.observe(item);
    });
}

// Mostrar mensagem flutuante
function showFloatingMessage(message) {
    const floatingMessage = document.getElementById('floatingMessage');
    floatingMessage.textContent = message;
    floatingMessage.style.display = 'block';
    
    setTimeout(() => {
        floatingMessage.style.display = 'none';
    }, 4000);
}

// Modal para visualização de mídia
function setupMediaModal() {
    const modal = document.getElementById('mediaModal');
    const modalContent = document.getElementById('modalContent');
    const modalMemoryText = document.getElementById('modalMemoryText');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const videoControls = document.getElementById('videoControls');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    
    const mediaItems = document.querySelectorAll('.media-item');
    let currentMediaIndex = 0;
    let currentVideo = null;
    
    // Abrir modal ao clicar em uma mídia
    mediaItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            modal.style.display = 'block';
            currentMediaIndex = index;
            updateModalContent();
        });
    });
    
    // Fechar modal
    closeBtn.addEventListener('click', () => {
        closeModal();
    });
    
    // Navegação entre mídias
    prevBtn.addEventListener('click', () => {
        currentMediaIndex = (currentMediaIndex - 1 + mediaItems.length) % mediaItems.length;
        updateModalContent();
    });
    
    nextBtn.addEventListener('click', () => {
        currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
        updateModalContent();
    });
    
    // Controles de vídeo
    playPauseBtn.addEventListener('click', () => {
        if (currentVideo) {
            if (currentVideo.paused) {
                currentVideo.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                currentVideo.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
    });
    
    muteBtn.addEventListener('click', () => {
        if (currentVideo) {
            currentVideo.muted = !currentVideo.muted;
            muteBtn.innerHTML = currentVideo.muted ? 
                '<i class="fas fa-volume-mute"></i>' : 
                '<i class="fas fa-volume-up"></i>';
        }
    });
    
    function updateModalContent() {
        const item = mediaItems[currentMediaIndex];
        const mediaType = item.getAttribute('data-type');
        modalMemoryText.textContent = item.getAttribute('data-memory');
        
        // Limpar conteúdo anterior
        modalContent.innerHTML = '';
        
        if (mediaType === 'image') {
            const img = item.querySelector('img').cloneNode();
            img.classList.add('modal-content');
            modalContent.appendChild(img);
            videoControls.style.display = 'none';
            if (currentVideo) {
                currentVideo.pause();
                currentVideo = null;
            }
        } else if (mediaType === 'video') {
            const video = item.querySelector('video').cloneNode(true);
            video.classList.add('modal-content');
            video.controls = false;
            video.muted = true;
            modalContent.appendChild(video);
            videoControls.style.display = 'flex';
            currentVideo = video;
            
            // Configurar eventos do vídeo
            video.addEventListener('play', () => {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            });
            
            video.addEventListener('pause', () => {
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            });
            
            video.addEventListener('ended', () => {
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            });
            
            // Tentar reproduzir automaticamente
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Reprodução automática prevenida:", error);
                    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                });
            }
        }
    }
    
    function closeModal() {
        modal.style.display = 'none';
        if (currentVideo) {
            currentVideo.pause();
            currentVideo = null;
        }
        videoControls.style.display = 'none';
    }
    
    // Fechar modal ao clicar fora da mídia
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Fechar modal com tecla ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

// Interações com os botões
function setupButtons() {
    const forgiveBtn = document.getElementById('forgiveBtn');
    const maybeBtn = document.getElementById('maybeBtn');
    
    forgiveBtn.addEventListener('click', () => {
        createHearts(); // Mais corações
        showFloatingMessage("Obrigado amor! Você me faz a pessoa mais feliz do mundo!");
        forgiveBtn.innerHTML = 'Obrigado amor! Eu te amo minha princesa! ';
        forgiveBtn.style.background = 'linear-gradient(135deg, #4CAF50, #8BC34A)';
        
        // Efeito de confete
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createConfetti();
            }, i * 50);
        }
    });
    
    maybeBtn.addEventListener('click', () => {
        showFloatingMessage("Eu entendo... vou esperar o tempo que for necessário ❤");
        maybeBtn.innerHTML = 'Estou aqui por você <i class="fas fa-heart"></i>';
        
        // Mover o botão "talvez" de forma aleatória
        let moveCount = 0;
        const moveInterval = setInterval(() => {
            if (moveCount < 10) {
                const x = Math.random() * 200 - 100;
                const y = Math.random() * 100 - 50;
                maybeBtn.style.transform = `translate(${x}px, ${y}px)`;
                moveCount++;
            } else {
                clearInterval(moveInterval);
                maybeBtn.style.transform = 'translate(0, 0)';
                maybeBtn.innerHTML = 'Obrigado por considerar ❤';
            }
        }, 300);
    });
}

// Criar efeito de confete
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '15px';
    confetti.style.height = '15px';
    confetti.style.background = getRandomColor();
    confetti.style.borderRadius = '50%';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-20px';
    confetti.style.zIndex = '1000';
    confetti.style.opacity = '0.9';
    confetti.style.boxShadow = '0 0 5px rgba(255,255,255,0.5)';
    document.body.appendChild(confetti);
    
    // Animação do confete
    const animation = confetti.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
        duration: 2000 + Math.random() * 2000,
        easing: 'cubic-bezier(0.1, 0.8, 0.9, 0.1)'
    });
    
    animation.onfinish = () => {
        document.body.removeChild(confetti);
    };
}

function getRandomColor() {
    const colors = ['#e91e63', '#ff9800', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Barra de progresso da música
function setupMusicPlayer() {
    const audio = document.getElementById('loveSong');
    const progressBar = document.getElementById('songProgress');
    
    if (audio) {
        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = progress + '%';
            }
        });
    }
}

// Inicializar tudo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    setupMemoryCounter();
    setupMediaModal();
    setupButtons();
    setupMusicPlayer();
    
    // Mostrar mensagem de boas-vindas
    setTimeout(() => {
        showFloatingMessage("Bem-vinda ao nosso site de memórias! ❤");
    }, 2000);
});