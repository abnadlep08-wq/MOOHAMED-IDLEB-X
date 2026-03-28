// ========== القائمة المتنقلة ==========
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ========== بيانات الأعمال ==========
// يمكنك تعديل هذه البيانات وإضافة صورك الخاصة

const worksData = {
    whatsapp: [
        {
            image: "https://via.placeholder.com/400x300/25D366/ffffff?text=قالب+واتساب+1",
            description: "قالب رسائل تسويقية احترافي لمنتج جديد - تصميم جذاب مع أزرار تفاعلية"
        },
        {
            image: "https://via.placeholder.com/400x300/25D366/ffffff?text=قالب+واتساب+2",
            description: "بوت واتساب أوتوماتيكي للرد على العملاء - خدمة عملاء 24/7"
        },
        {
            image: "https://via.placeholder.com/400x300/25D366/ffffff?text=قالب+واتساب+3",
            description: "تصميم قائمة منتجات متكاملة مع صور وأسعار لخدمة التوصيل"
        },
        {
            image: "https://via.placeholder.com/400x300/25D366/ffffff?text=قالب+واتساب+4",
            description: "حملة تسويقية عبر الواتساب حققت نسبة تحويل 40%"
        }
    ],
    instagram: [
        {
            image: "https://via.placeholder.com/400x300/E4405F/ffffff?text=منشور+انستغرام+1",
            description: "منشور إعلاني لمنتج جديد - تصميم عصري بألوان جذابة"
        },
        {
            image: "https://via.placeholder.com/400x300/E4405F/ffffff?text=منشور+انستغرام+2",
            description: "ستوري تفاعلية مع مؤثرات حركية - زيادة التفاعل بنسبة 200%"
        },
        {
            image: "https://via.placeholder.com/400x300/E4405F/ffffff?text=منشور+انستغرام+3",
            description: "تصميم هوية بصرية متكاملة للحساب - ألوان وخطوط متناسقة"
        },
        {
            image: "https://via.placeholder.com/400x300/E4405F/ffffff?text=منشور+انستغرام+4",
            description: "قالب قصص تفاعلي مع استبيانات وروابط مباشرة"
        }
    ],
    telegram: [
        {
            image: "https://via.placeholder.com/400x300/26A5E4/ffffff?text=قناة+تيليجرام+1",
            description: "بوت تيليجرام آلي لإدارة القناة - جدولة منشورات وإحصائيات"
        },
        {
            image: "https://via.placeholder.com/400x300/26A5E4/ffffff?text=قناة+تيليجرام+2",
            description: "قناة متخصصة في المحتوى التقني - أكثر من 10,000 مشترك"
        },
        {
            image: "https://via.placeholder.com/400x300/26A5E4/ffffff?text=قناة+تيليجرام+3",
            description: "بوت استعلامات لخدمة العملاء مع ردود تلقائية ذكية"
        },
        {
            image: "https://via.placeholder.com/400x300/26A5E4/ffffff?text=قناة+تيليجرام+4",
            description: "تصميم قنوات متخصصة مع واجهة تفاعلية وأزرار تحكم"
        }
    ],
    apps: [
        {
            image: "https://via.placeholder.com/400x300/6c5ce7/ffffff?text=تطبيق+1",
            description: "تطبيق إدارة مهام متكامل - واجهة مستخدم سلسة وتجربة ممتازة"
        },
        {
            image: "https://via.placeholder.com/400x300/6c5ce7/ffffff?text=تطبيق+2",
            description: "تطبيق توصيل طلبات - خرائط وتتبع مباشر للطلبات"
        },
        {
            image: "https://via.placeholder.com/400x300/6c5ce7/ffffff?text=تطبيق+3",
            description: "تطبيق تعليمي تفاعلي - دروس فيديو واختبارات"
        },
        {
            image: "https://via.placeholder.com/400x300/6c5ce7/ffffff?text=تطبيق+4",
            description: "تصميم واجهات تطبيق جوال بنظام iOS و Android"
        }
    ]
};

// ========== عرض الصور في الصفحات ==========
function loadGallery() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    let galleryId = '';
    let data = [];

    switch(currentPage) {
        case 'whatsapp':
            galleryId = 'whatsapp-gallery';
            data = worksData.whatsapp;
            break;
        case 'instagram':
            galleryId = 'instagram-gallery';
            data = worksData.instagram;
            break;
        case 'telegram':
            galleryId = 'telegram-gallery';
            data = worksData.telegram;
            break;
        case 'apps':
            galleryId = 'apps-gallery';
            data = worksData.apps;
            break;
        default:
            return;
    }

    const gallery = document.getElementById(galleryId);
    if (gallery) {
        gallery.innerHTML = data.map(item => `
            <div class="gallery-item">
                <img src="${item.image}" alt="عمل" class="gallery-image">
                <div class="gallery-description">
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');
    }
}

// ========== تأثيرات التمرير ==========
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 16, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 16, 0.95)';
    }
});

// ========== تحميل البيانات عند فتح الصفحة ==========
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    
    // تأثير ظهور العناصر عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.work-card, .gallery-item, .social-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.5s ease';
        observer.observe(el);
    });
});
