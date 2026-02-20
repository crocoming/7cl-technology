// 7CoolLook Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission handling
    const form = document.getElementById('quoteForm');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.phone || !data.address || !data.service) {
                showMessage('請填寫所有必填項目', 'error');
                return;
            }
            
            // Format WhatsApp message
            const message = formatWhatsAppMessage(data);
            
            // Open WhatsApp with pre-filled message
            const whatsappUrl = `https://wa.me/85267767607?text=${encodeURIComponent(message)}`;
            
            // Show success message
            showMessage('正在打開WhatsApp...', 'success');
            
            // Open WhatsApp
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 1000);
        });
    }

    function formatWhatsAppMessage(data) {
        const serviceNames = {
            'network': '網絡佈線工程',
            'cctv': 'CCTV監控系統',
            'wifi': 'WiFi覆蓋方案',
            'av': '音響視聽系統',
            'pabx': 'PABX電話系統',
            'broadband': '商業寬頻服務',
            'package': '開業套餐'
        };
        
        return `【7CoolLook新查詢】\n\n` +
               `聯絡人：${data.name}\n` +
               `電話：${data.phone}\n` +
               `地址：${data.address}\n\n` +
               `服務類型：${serviceNames[data.service] || data.service}\n\n` +
               `項目描述：\n${data.message || '無'}\n\n` +
               `請盡快回覆，謝謝！`;
    }

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Animate stats on scroll
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat, .service-card, .feature').forEach(el => {
        observer.observe(el);
    });
});
