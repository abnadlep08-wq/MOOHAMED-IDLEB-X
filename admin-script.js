// كلمة المرور للدخول إلى لوحة التحكم (يمكنك تغييرها)
const ADMIN_PASSWORD = "chmod +x Check.sh";

let currentSection = "whatsapp";
let currentDeleteId = null;

// التحقق من كلمة المرور
function checkPassword() {
    const password = document.getElementById('admin-password').value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'block';
        loadWorks(currentSection);
    } else {
        document.getElementById('login-error').innerText = 'كلمة المرور غير صحيحة';
    }
}

// تسجيل الخروج
function logout() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('admin-password').value = '';
    document.getElementById('login-error').innerText = '';
}

// تبديل الأقسام
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentSection = item.dataset.section;
        document.getElementById('section-title').innerText = getSectionTitle(currentSection);
        loadWorks(currentSection);
    });
});

function getSectionTitle(section) {
    const titles = {
        whatsapp: 'أعمال واتساب',
        instagram: 'أعمال إنستغرام',
        telegram: 'أعمال تيليجرام',
        apps: 'أعمال التطبيقات'
    };
    return titles[section];
}

// تحميل الأعمال
function loadWorks(section) {
    const works = getWorksFromStorage(section);
    const container = document.getElementById('works-list');
    
    if (works.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-folder-open"></i>
                <p>لا توجد أعمال في هذا القسم</p>
                <p style="font-size: 0.9rem;">اضغط على "إضافة عمل جديد" لإضافة أول عمل</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = works.map((work, index) => `
        <div class="work-card-admin">
            <img src="${work.image}" alt="عمل" class="work-image-admin" onerror="this.src='https://via.placeholder.com/400x300/6c5ce7/ffffff?text=صورة+غير+متوفرة'">
            <div class="work-info-admin">
                <p>${work.description}</p>
            </div>
            <div class="work-actions">
                <button onclick="openEditModal(${index})" class="edit-btn">
                    <i class="fas fa-edit"></i>
                    تعديل
                </button>
                <button onclick="openDeleteModal(${index})" class="delete-btn-admin">
                    <i class="fas fa-trash"></i>
                    حذف
                </button>
            </div>
        </div>
    `).join('');
}

// الحصول على البيانات من Local Storage
function getWorksFromStorage(section) {
    const key = `works_${section}`;
    const stored = localStorage.getItem(key);
    if (stored) {
        return JSON.parse(stored);
    }
    // البيانات الافتراضية
    const defaultData = getDefaultData(section);
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
}

// البيانات الافتراضية
function getDefaultData(section) {
    const defaults = {
        whatsapp: [
            { image: "https://via.placeholder.com/400x300/25D366/ffffff?text=قالب+واتساب+1", description: "قالب رسائل تسويقية احترافي لمنتج جديد - تصميم جذاب مع أزرار تفاعلية" },
            { image: "https://via.placeholder.com/400x300/25D366/ffffff?text=قالب+واتساب+2", description: "بوت واتساب أوتوماتيكي للرد على العملاء - خدمة عملاء 24/7" }
        ],
        instagram: [
            { image: "https://via.placeholder.com/400x300/E4405F/ffffff?text=منشور+انستغرام+1", description: "منشور إعلاني لمنتج جديد - تصميم عصري بألوان جذابة" },
            { image: "https://via.placeholder.com/400x300/E4405F/ffffff?text=منشور+انستغرام+2", description: "ستوري تفاعلية مع مؤثرات حركية - زيادة التفاعل بنسبة 200%" }
        ],
        telegram: [
            { image: "https://via.placeholder.com/400x300/26A5E4/ffffff?text=قناة+تيليجرام+1", description: "بوت تيليجرام آلي لإدارة القناة - جدولة منشورات وإحصائيات" },
            { image: "https://via.placeholder.com/400x300/26A5E4/ffffff?text=قناة+تيليجرام+2", description: "قناة متخصصة في المحتوى التقني - أكثر من 10,000 مشترك" }
        ],
        apps: [
            { image: "https://via.placeholder.com/400x300/6c5ce7/ffffff?text=تطبيق+1", description: "تطبيق إدارة مهام متكامل - واجهة مستخدم سلسة وتجربة ممتازة" },
            { image: "https://via.placeholder.com/400x300/6c5ce7/ffffff?text=تطبيق+2", description: "تطبيق توصيل طلبات - خرائط وتتبع مباشر للطلبات" }
        ]
    };
    return defaults[section] || [];
}

// حفظ البيانات في Local Storage
function saveWorksToStorage(section, works) {
    localStorage.setItem(`works_${section}`, JSON.stringify(works));
}

// فتح نافذة الإضافة
function openAddModal() {
    document.getElementById('modal-title').innerText = 'إضافة عمل جديد';
    document.getElementById('work-id').value = '';
    document.getElementById('work-image').value = '';
    document.getElementById('work-description').value = '';
    document.getElementById('work-section').value = currentSection;
    document.getElementById('work-modal').style.display = 'flex';
}

// فتح نافذة التعديل
function openEditModal(index) {
    const works = getWorksFromStorage(currentSection);
    const work = works[index];
    
    document.getElementById('modal-title').innerText = 'تعديل العمل';
    document.getElementById('work-id').value = index;
    document.getElementById('work-image').value = work.image;
    document.getElementById('work-description').value = work.description;
    document.getElementById('work-section').value = currentSection;
    document.getElementById('work-modal').style.display = 'flex';
}

// حفظ العمل (إضافة أو تعديل)
function saveWork() {
    const id = document.getElementById('work-id').value;
    const section = document.getElementById('work-section').value;
    const image = document.getElementById('work-image').value.trim();
    const description = document.getElementById('work-description').value.trim();
    
    if (!image || !description) {
        alert('الرجاء تعبئة جميع الحقول');
        return;
    }
    
    const works = getWorksFromStorage(section);
    
    if (id === '') {
        // إضافة جديد
        works.push({ image, description });
    } else {
        // تعديل
        works[parseInt(id)] = { image, description };
    }
    
    saveWorksToStorage(section, works);
    closeModal();
    loadWorks(currentSection);
}

// فتح نافذة الحذف
function openDeleteModal(index) {
    currentDeleteId = index;
    document.getElementById('delete-modal').style.display = 'flex';
}

// تأكيد الحذف
function confirmDelete() {
    const works = getWorksFromStorage(currentSection);
    works.splice(currentDeleteId, 1);
    saveWorksToStorage(currentSection, works);
    closeDeleteModal();
    loadWorks(currentSection);
}

// إغلاق النوافذ
function closeModal() {
    document.getElementById('work-modal').style.display = 'none';
}

function closeDeleteModal() {
    document.getElementById('delete-modal').style.display = 'none';
    currentDeleteId = null;
}

// إغلاق النوافذ عند النقر خارجها
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// تحديث الملفات العامة لقراءة البيانات من Local Storage
function updatePublicData() {
    // هذه الوظيفة ستُستخدم لتحديث البيانات في الصفحات العامة
    // سيتم استدعاؤها عند تغيير أي بيانات
    localStorage.setItem('lastUpdate', new Date().toISOString());
}
