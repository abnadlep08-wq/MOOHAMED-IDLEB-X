// ============================================
// ملف script.js - الموقع الشخصي الاحترافي
// يحتوي على جميع وظائف الموقع العام
// ============================================

// ========== 1. إعدادات المتغيرات العامة ==========
let currentSection = '';
let isMenuOpen = false;

// ========== 2. القائمة المتنقلة (Mobile Menu) ==========
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        navLinks.classList.toggle('active');
        // تغيير شكل الأيقونة
        const icon = menuToggle.querySelector('i');
        if (icon) {
            if (isMenuOpen) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// إغلاق القائمة عند النقر على أي رابط
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            isMenuOpen = false;
            const icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// ========== 3. إغلاق القائمة عند النقر خارجها ==========
document.addEventListener('click', (e) => {
    if (isMenuOpen && menuToggle && navLinks) {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            isMenuOpen = false;
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
});

// ========== 4. إدارة البيانات من Local Storage ==========

/**
 * الحصول على بيانات الأعمال من Local Storage
 * @param {string} section - اسم القسم (whatsapp, instagram, telegram, apps)
 * @returns {Array} - مصفوفة تحتوي على الأعمال
 */
function getWorksFromStorage(section) {
    const key = `works_${section}`;
    const stored = localStorage.getItem(key);
    
    if (stored) {
        return JSON.parse(stored);
    }
    
    // إذا لم توجد بيانات، نستخدم البيانات الافتراضية
    const defaultData = getDefaultData(section);
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
}

/**
 * البيانات الافتراضية للموقع
 * @param {string} section - اسم القسم
 * @returns {Array} - البيانات الافتراضية
 */
function getDefaultData(section) {
    const defaults = {
        whatsapp: [
            { 
                image: "https://via.placeholder.com/400x300/25D366/ffffff?text=قالب+واتساب+1", 
                description: "📱 قالب رسائل تسويقية احترافي لمنتج جديد - تصميم جذاب مع أزرار تفاعلية وحالة عرض متقدمة" 
            },
            { 
                image: "https://via.placeholder.com/400x300/25D366/ffffff?text=قالب+واتساب+2", 
                description: "🤖 بوت واتساب أوتوماتيكي للرد على العملاء - خدمة عملاء 24/7 مع ردود ذكية" 
            },
            { 
                image: "https://via.placeholder.com/400x300/25D366/ffffff?text=قالب+واتساب+3", 
                description: "🛍️ تصميم قائمة منتجات متكاملة مع صور وأسعار لخدمة التوصيل السريع" 
            },
            { 
                image: "https://via.placeholder.com/400x300/25D366/ffffff?text=قالب+واتساب+4", 
                description: "📊 حملة تسويقية عبر الواتساب حققت نسبة تحويل 40% - دراسة حالة كاملة" 
            }
        ],
        instagram: [
            { 
                image: "https://via.placeholder.com/400x300/E4405F/ffffff?text=منشور+انستغرام+1", 
                description: "🎨 منشور إعلاني لمنتج جديد - تصميم عصري بألوان جذابة وتأثيرات حركية" 
            },
            { 
                image: "https://via.placeholder.com/400x300/E4405F/ffffff?text=منشور+انستغرام+2", 
                description: "📸 ستوري تفاعلية مع مؤثرات حركية - زيادة التفاعل بنسبة 200% خلال أسبوع" 
            },
            { 
                image: "https://via.placeholder.com/400x300/E4405F/ffffff?text=منشور+انستغرام+3", 
                description: "🎯 تصميم هوية بصرية متكاملة للحساب - ألوان وخطوط متناسقة مع العلامة التجارية" 
            },
            { 
                image: "https://via.placeholder.com/400x300/E4405F/ffffff?text=منشور+انستغرام+4", 
                description: "📊 قالب قصص تفاعلي مع استبيانات وروابط مباشرة - زيادة المبيعات بنسبة 35%" 
            }
        ],
        telegram: [
            { 
                image: "https://via.placeholder.com/400x300/26A5E4/ffffff?text=قناة+تيليجرام+1", 
                description: "🤖 بوت تيليجرام آلي لإدارة القناة - جدولة منشورات وإحصائيات متقدمة" 
            },
            { 
                image: "https://via.placeholder.com/400x300/26A5E4/ffffff?text=قناة+تيليجرام+2", 
                description: "📢 قناة متخصصة في المحتوى التقني - أكثر من 10,000 مشترك وتفاعل يومي" 
            },
            { 
                image: "https://via.placeholder.com/400x300/26A5E4/ffffff?text=قناة+تيليجرام+3", 
                description: "💬 بوت استعلامات لخدمة العملاء مع ردود تلقائية ذكية ودعم متعدد اللغات" 
            },
            { 
                image: "https://via.placeholder.com/400x300/26A5E4/ffffff?text=قناة+تيليجرام+4", 
                description: "🎨 تصميم قنوات متخصصة مع واجهة تفاعلية وأزرار تحكم مخصصة" 
            }
        ],
        apps: [
            { 
                image: "https://via.placeholder.com/400x300/6c5ce7/ffffff?text=تطبيق+1", 
                description: "📱 تطبيق إدارة مهام متكامل - واجهة مستخدم سلسة وتجربة ممتازة مع إشعارات فورية" 
            },
            { 
                image: "https://via.placeholder.com/400x300/6c5ce7/ffffff?text=تطبيق+2", 
                description: "🚗 تطبيق توصيل طلبات - خرائط وتتبع مباشر للطلبات وتقييم السائقين" 
            },
            { 
                image: "https://via.placeholder.com/400x300/6c5ce7/ffffff?text=تطبيق+3", 
                description: "📚 تطبيق تعليمي تفاعلي - دروس فيديو واختبارات وشهادات إنجاز" 
            },
            { 
                image: "https://via.placeholder.com/400x300/6c5ce7/ffffff?text=تطبيق+4", 
                description: "🎨 تصميم واجهات تطبيق جوال بنظام iOS و Android - متوافق مع أحدث المعايير" 
            },
            { 
                image: "https://via.placeholder.com/400x300/6c5ce7/ffffff?text=تطبيق+5", 
                description: "💰 تطبيق مالي لإدارة الميزانية - تحليلات وإحصائيات دقيقة للمصروفات" 
            }
        ]
    };
    
    return defaults[section] || [];
}

// ========== 5. عرض المعارض حسب الصفحة ==========
function loadGallery() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    let galleryId = '';
    let section = '';

    // تحديد القسم بناءً على اسم الصفحة
    switch(currentPage) {
        case 'whatsapp':
            galleryId = 'whatsapp-gallery';
            section = 'whatsapp';
            break;
        case 'instagram':
            galleryId = 'instagram-gallery';
            section = 'instagram';
            break;
        case 'telegram':
            galleryId = 'telegram-gallery';
            section = 'telegram';
            break;
        case 'apps':
            galleryId = 'apps-gallery';
            section = 'apps';
            break;
        default:
            return; // ليس صفحة معرض
    }

    const gallery = document.getElementById(galleryId);
    if (!gallery) return;

    const data = getWorksFromStorage(section);
    
    if (!data || data.length === 0) {
        // عرض رسالة عند عدم وجود أعمال
        gallery.innerHTML = `
            <div class="empty-state" style="text-align: center; padding: 60px; color: #a0a0a0;">
                <i class="fas fa-folder-open" style="font-size: 4rem; margin-bottom: 15px;"></i>
                <p style="font-size: 1.2rem; margin-bottom: 10px;">لا توجد أعمال في هذا القسم حالياً</p>
                <p style="font-size: 0.9rem;">سيتم إضافة أعمال جديدة قريباً</p>
            </div>
        `;
        return;
    }
    
    // عرض الأعمال مع تأثير متحرك
    gallery.innerHTML = data.map((item, index) => `
        <div class="gallery-item" style="animation: fadeInUp 0.5s ease ${index * 0.1}s forwards;">
            <div class="gallery-image-container">
                <img src="${item.image}" alt="عمل" class="gallery-image" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300/6c5ce7/ffffff?text=صورة+غير+متوفرة'">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
            <div class="gallery-description">
                <p>${escapeHtml(item.description)}</p>
            </div>
        </div>
    `).join('');
    
    // إضافة خاصية النقر لتكبير الصورة
    addImageZoomFeature();
}

/**
 * منع هجمات XSS عن طريق ترميز النص
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * إضافة خاصية تكبير الصورة عند النقر
 */
function addImageZoomFeature() {
    const images = document.querySelectorAll('.gallery-image');
    images.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            showImageModal(this.src);
        });
    });
}

/**
 * عرض الصورة في نافذة منبثقة مكبرة
 */
function showImageModal(imageSrc) {
    // إزالة أي مودال موجود مسبقاً
    const existingModal = document.getElementById('image-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // إنشاء مودال جديد
    const modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="image-modal-content">
            <span class="image-modal-close">&times;</span>
            <img src="${imageSrc}" alt="صورة مكبرة">
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // إظهار المودال بتأثير
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // إغلاق المودال
    const closeBtn = modal.querySelector('.image-modal-close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    });
    
    // إغلاق عند النقر خارج الصورة
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    // إغلاق بالضغط على ESC
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            if (modal && document.body.contains(modal)) {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
                document.removeEventListener('keydown', escHandler);
            }
        }
    });
}

// ========== 6. تأثيرات التمرير (Scroll Effects) ==========
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (navbar) {
        // تغيير خلفية النافبار عند التمرير
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 16, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 16, 0.95)';
        }
        
        // إخفاء/إظهار النافبار عند التمرير (اختياري)
        if (currentScroll > lastScrollTop && currentScroll > 200) {
            // التمرير للأسفل - إخفاء
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // التمرير للأعلى - إظهار
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = currentScroll;
    }
    
    // إضافة تأثير للعناوين عند التمرير
    const sectionTitles = document.querySelectorAll('.section-title, .page-header');
    sectionTitles.forEach(title => {
        const rect = title.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            title.classList.add('visible');
        }
    });
});

// ========== 7. تأثير ظهور العناصر عند التمرير (Intersection Observer) ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// تطبيق التأثير على العناصر المختلفة
document.addEventListener('DOMContentLoaded', () => {
    // العناصر التي نريد تطبيق التأثير عليها
    const elementsToAnimate = [
        '.work-card', 
        '.gallery-item', 
        '.social-card',
        '.hero-content',
        '.profile-image'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    });
});

// ========== 8. تأثيرات كتابة النص (Typing Effect) للصفحة الرئيسية ==========
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle && !heroTitle.hasAttribute('data-typed')) {
        const originalText = heroTitle.innerHTML;
        const highlightText = heroTitle.querySelector('.highlight')?.innerHTML || '';
        
        // نطبق التأثير فقط إذا لم يكن قد طبق من قبل
        heroTitle.setAttribute('data-typed', 'true');
        
        // يمكن إضافة تأثير كتابة هنا إذا أردت
    }
}

// ========== 9. أزرار المشاركة الاجتماعية ==========
function addShareButtons() {
    const shareContainer = document.querySelector('.share-buttons');
    if (!shareContainer) return;
    
    const currentUrl = encodeURIComponent(window.location.href);
    const currentTitle = encodeURIComponent(document.title);
    
    shareContainer.innerHTML = `
        <button onclick="shareOnFacebook()" class="share-btn facebook">
            <i class="fab fa-facebook-f"></i>
        </button>
        <button onclick="shareOnTwitter()" class="share-btn twitter">
            <i class="fab fa-twitter"></i>
        </button>
        <button onclick="shareOnWhatsapp()" class="share-btn whatsapp">
            <i class="fab fa-whatsapp"></i>
        </button>
        <button onclick="copyLink()" class="share-btn copy">
            <i class="fas fa-link"></i>
        </button>
    `;
}

// دوال المشاركة
window.shareOnFacebook = function() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
};

window.shareOnTwitter = function() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
};

window.shareOnWhatsapp = function() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${url}`, '_blank');
};

window.copyLink = function() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showNotification('تم نسخ الرابط بنجاح!', 'success');
    }).catch(() => {
        showNotification('فشل نسخ الرابط', 'error');
    });
};

// ========== 10. إشعارات منبثقة (Toast Notifications) ==========
function showNotification(message, type = 'info') {
    // إزالة أي إشعار موجود
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // إنشاء عنصر الإشعار
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${getIconForType(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // إظهار الإشعار
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // إخفاء وإزالة الإشعار بعد 3 ثوان
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function getIconForType(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// ========== 11. إحصائيات الزوار (بسيطة) ==========
function updateVisitorCount() {
    let count = localStorage.getItem('visitorCount');
    if (count === null) {
        count = 0;
    }
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    
    const counterElement = document.getElementById('visitor-count');
    if (counterElement) {
        counterElement.textContent = count;
    }
}

// ========== 12. البحث في الأعمال (Live Search) ==========
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            const description = item.querySelector('.gallery-description p')?.textContent.toLowerCase() || '';
            if (description.includes(searchTerm)) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.3s ease';
            } else {
                item.style.display = 'none';
            }
        });
        
        // عرض رسالة إذا لم تكن هناك نتائج
        const visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
        const noResultsMsg = document.getElementById('no-results');
        
        if (visibleItems.length === 0 && galleryItems.length > 0) {
            if (!noResultsMsg) {
                const msg = document.createElement('div');
                msg.id = 'no-results';
                msg.className = 'no-results';
                msg.innerHTML = '<i class="fas fa-search"></i><p>لا توجد نتائج مطابقة للبحث</p>';
                searchInput.parentNode.insertAdjacentElement('afterend', msg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    });
}

// ========== 13. زر العودة للأعلى (Back to Top) ==========
function initBackToTop() {
    const button = document.createElement('button');
    button.id = 'back-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== 14. تحديث البيانات من Local Storage ==========
// الاستماع للتغييرات في Local Storage لتحديث الصفحة
window.addEventListener('storage', function(e) {
    if (e.key && e.key.startsWith('works_')) {
        loadGallery();
        showNotification('تم تحديث المحتوى!', 'success');
    }
});

// ========== 15. تحميل الروابط الاجتماعية ديناميكياً ==========
function loadSocialLinks() {
    const socialLinks = localStorage.getItem('socialLinks');
    if (socialLinks) {
        const links = JSON.parse(socialLinks);
        // تحديث روابط التواصل إذا وجدت
        Object.keys(links).forEach(platform => {
            const linkElement = document.querySelector(`.social-card.${platform}-card`);
            if (linkElement) {
                linkElement.href = links[platform];
            }
        });
    }
}

// ========== 16. إضافة تأثيرات CSS إضافية ==========
function addExtraStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* تأثيرات التحميل */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* نافذة عرض الصورة المكبرة */
        .image-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        
        .image-modal.show {
            display: flex;
            animation: fadeIn 0.3s ease;
        }
        
        .image-modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .image-modal-content img {
            width: 100%;
            height: auto;
            max-height: 90vh;
            object-fit: contain;
            border-radius: 8px;
        }
        
        .image-modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: #fff;
            font-size: 30px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .image-modal-close:hover {
            color: #6c5ce7;
        }
        
        /* تأثير hover على الصور */
        .gallery-image-container {
            position: relative;
            overflow: hidden;
        }
        
        .gallery-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(108, 92, 231, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: all 0.3s;
            cursor: pointer;
        }
        
        .gallery-overlay i {
            color: #fff;
            font-size: 2rem;
            transform: scale(0.5);
            transition: all 0.3s;
        }
        
        .gallery-image-container:hover .gallery-overlay {
            opacity: 1;
        }
        
        .gallery-image-container:hover .gallery-overlay i {
            transform: scale(1);
        }
        
        /* إشعارات منبثقة */
        .toast-notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #1a1a2e;
            color: #fff;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 10000;
            border-right: 4px solid #6c5ce7;
        }
        
        .toast-notification.show {
            transform: translateX(0);
        }
        
        .toast-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .toast-success {
            border-right-color: #25D366;
        }
        
        .toast-error {
            border-right-color: #e74c3c;
        }
        
        .toast-warning {
            border-right-color: #f39c12;
        }
        
        /* زر العودة للأعلى */
        .back-to-top {
            position: fixed;
            bottom: 30px;
            left: 30px;
            width: 45px;
            height: 45px;
            background: #6c5ce7;
            color: #fff;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            z-index: 999;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background: #5649c0;
            transform: translateY(-3px);
        }
        
        /* رسالة عدم وجود نتائج بحث */
        .no-results {
            text-align: center;
            padding: 60px;
            color: #a0a0a0;
        }
        
        .no-results i {
            font-size: 3rem;
            margin-bottom: 15px;
        }
        
        /* تأثير ظهور العناوين */
        .section-title, .page-header {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        .section-title.visible, .page-header.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* تحسينات إضافية */
        .gallery-image {
            cursor: pointer;
            transition: transform 0.3s;
        }
        
        .gallery-image:hover {
            transform: scale(1.05);
        }
        
        /* تصميم متجاوب */
        @media (max-width: 768px) {
            .toast-notification {
                left: 20px;
                right: 20px;
                bottom: 20px;
                transform: translateY(100px);
                text-align: center;
            }
            
            .toast-notification.show {
                transform: translateY(0);
            }
            
            .back-to-top {
                left: 20px;
                bottom: 20px;
                width: 40px;
                height: 40px;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// ========== 17. تحميل البيانات وتفعيل الميزات عند تحميل الصفحة ==========
document.addEventListener('DOMContentLoaded', () => {
    // تحميل المعارض
    loadGallery();
    
    // تفعيل ميزات إضافية
    addTypingEffect();
    addShareButtons();
    initSearch();
    initBackToTop();
    addExtraStyles();
    loadSocialLinks();
    
    // تحديث عدد الزوار (مرة واحدة فقط لكل جلسة)
    if (!sessionStorage.getItem('visitorCounted')) {
        updateVisitorCount();
        sessionStorage.setItem('visitorCounted', 'true');
    }
    
    // إضافة تأثيرات للروابط الخارجية
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    console.log('✅ تم تحميل الموقع بنجاح!');
});

// ========== 18. معالجة الأخطاء العامة ==========
window.addEventListener('error', (e) => {
    console.error('خطأ في الموقع:', e.error);
    // يمكن إضافة تسجيل الأخطاء هنا إذا أردت
});

// ========== 19. تصدير الدوال للاستخدام العالمي ==========
window.showNotification = showNotification;
window.loadGallery = loadGallery;
window.getWorksFromStorage = getWorksFromStorage;
