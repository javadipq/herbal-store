// ========================================================
// Attarbashi Main Application Script (PWA & Client Logic)
// ========================================================

// 1. Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('PWA ServiceWorker registered:', reg.scope))
      .catch(err => console.warn('PWA ServiceWorker registration failed:', err));
  });
}

// 2. Blog Data
const INITIAL_BLOGS = [
  {
    id: 1,
    title: "۷ خاصیت شگفت‌انگیز دمنوش گل‌گاوزبان برای کاهش استرس و سلامت قلب",
    slug: "benefits-of-borage-tea",
    category: "طب سنتی",
    readTime: "۵ دقیقه",
    date: "۲۲ شهریور ۱۴۰۳",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    excerpt: "گل‌گاوزبان یکی از کهن‌ترین گیاهان دارویی ایرانی است که در کنترل اضطراب، تپش قلب و بهبود خواب شبانه تأثیرات معجزه‌آسایی دارد...",
    content: "گل‌گاوزبان با نام علمی Echium amoenum گیاهی خودرو در دامنه‌های البرز است. در طب سنتی ایرانی، این گیاه دارای طبع گرم و تر بوده و مقوی روح و اعضا رئیسه بدن شناخته می‌شود. مصرف منظم دمنوش آن با کمی لیمو عمانی باعث رقیق شدن خون، تقویت اعصاب و پاکسازی سموم کبد می‌شود."
  },
  {
    id: 2,
    title: "راهنمای تشخیص زعفران اصل از تقلبی؛ فریب سودجویان را نخورید!",
    slug: "how-to-spot-fake-saffron",
    category: "راهنمای خرید",
    readTime: "۴ دقیقه",
    date: "۱۵ مهر ۱۴۰۳",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    excerpt: "با توجه به قیمت بالای طلای سرخ، تقلب در آن رو به افزایش است. در این مقاله ۴ آزمون خانگی سریع برای تست خلوص زعفران را یاد می‌گیرید...",
    content: "یکی از مطمئن‌ترین روش‌ها آزمون آب سرد است: سرگل زعفران اصل در آب سرد رنگ طلایی مایل به نارنجی ملایم آزاد می‌کند و روند رنگ‌دهی آن آرام است؛ در حالی که زعفران رنگ‌شده بلافاصله آب را قرمز تیره و رنگ‌آمیزی شیمیایی می‌کند."
  },
  {
    id: 3,
    title: "معجزه مصرف روزانه مغز گردو و بادام در تقویت حافظه و کاهش چربی خون",
    slug: "nuts-health-benefits",
    category: "سلامت و تغذیه",
    readTime: "۶ دقیقه",
    date: "۱۰ مهر ۱۴۰۳",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&q=80",
    excerpt: "آجیل‌ها بمب انرژی، اسیدهای چرب امگا۳ و آنتی‌اکسیدان هستند. بهترین ساعت مصرف خشکبار برای جذب حداکثری چه زمانی است؟",
    content: "مصرف روزانه ۵ الی ۷ عدد بادام و ۲ عدد گردوی کامل در وعده صبحانه یا میان‌وعده، سطح کلسترول بد (LDL) را کاهش داده و سوخت‌وساز مغز را به اوج می‌رساند."
  }
];

// 3. Application State
class StoreState {
  constructor() {
    this.products = StoreDB.getProducts();
    this.blogs = INITIAL_BLOGS;
    this.cart = JSON.parse(localStorage.getItem('attar_cart')) || [];
    this.currentPage = 'home';
    this.selectedCategory = 'all';
    this.appliedCoupon = null;
    this.discountAmount = 0;
    this.pendingCheckoutData = null;
  }

  reloadProducts() {
    this.products = StoreDB.getProducts();
    navigate(this.currentPage);
  }

  saveCart() {
    localStorage.setItem('attar_cart', JSON.stringify(this.cart));
    updateCartUI();
  }

  addToCart(productId, count = 1) {
    const prod = this.products.find(p => p.id === productId);
    if (!prod) return;

    if (prod.stock <= 0) {
      alert("متاسفانه موجودی این محصول در انبار به اتمام رسیده است.");
      return;
    }

    const existing = this.cart.find(item => item.id === productId);
    if (existing) {
      if (existing.quantity + count > prod.stock) {
        alert(`حداکثر موجودی قابل سفارش برای این کالا ${prod.stock} ${prod.unit} می‌باشد.`);
        return;
      }
      existing.quantity += count;
    } else {
      this.cart.push({
        id: prod.id,
        title: prod.title,
        price: prod.price,
        unit: prod.unit,
        image: prod.image,
        quantity: count
      });
    }
    this.saveCart();
    showToast(`«${prod.title}» به سبد خرید اضافه شد ✨`);
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId, delta) {
    const item = this.cart.find(i => i.id === productId);
    if (!item) return;

    const prod = this.products.find(p => p.id === productId);
    if (delta > 0 && prod && item.quantity + delta > prod.stock) {
      alert(`حداکثر موجودی در انبار ${prod.stock} عدد است.`);
      return;
    }

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.saveCart();
    }
  }

  getCartTotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  clearCart() {
    this.cart = [];
    this.appliedCoupon = null;
    this.discountAmount = 0;
    this.saveCart();
  }
}

const state = new StoreState();

// Listen to storage sync events
window.addEventListener('attar_products_updated', () => state.reloadProducts());
window.addEventListener('attar_data_reset', () => {
  state.reloadProducts();
  state.clearCart();
  updateUserUI();
});
window.addEventListener('attar_user_changed', () => updateUserUI());

// ========================================================
// Navigation and Page Renderers
// ========================================================
function navigate(pageId, extraParam = null) {
  state.currentPage = pageId;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update desktop navigation
  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.dataset.page === pageId) {
      btn.classList.add('text-brand-600', 'font-extrabold');
      btn.classList.remove('text-stone-600');
    } else {
      btn.classList.remove('text-brand-600', 'font-extrabold');
      btn.classList.add('text-stone-600');
    }
  });

  // Update mobile bottom bar
  document.querySelectorAll('.mobile-nav-item').forEach(btn => {
    if (btn.dataset.page === pageId) {
      btn.classList.add('mobile-nav-active');
    } else {
      btn.classList.remove('mobile-nav-active');
    }
  });

  const app = document.getElementById('appContent');
  switch (pageId) {
    case 'home':
      app.innerHTML = renderHomePage();
      break;
    case 'shop':
      app.innerHTML = renderShopPage();
      break;
    case 'blog':
      app.innerHTML = renderBlogPage();
      break;
    case 'blog-detail':
      app.innerHTML = renderBlogDetailPage(extraParam);
      break;
    case 'about':
      app.innerHTML = renderAboutPage();
      break;
    case 'contact':
      app.innerHTML = renderContactPage();
      break;
    default:
      app.innerHTML = renderHomePage();
  }
  lucide.createIcons();
}

function toggleMobileMenu() {
  const m = document.getElementById('mobileMenu');
  m.classList.toggle('hidden');
}

// ========================
// PAGE 1: HOME LANDING
// ========================
function renderHomePage() {
  const featured = state.products.slice(0, 4);
  const blogs = state.blogs.slice(0, 3);

  return `
    <!-- Hero Banner -->
    <section class="relative hero-pattern pt-8 sm:pt-14 pb-20 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div class="lg:col-span-7 space-y-6 text-center lg:text-right">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 text-brand-600 text-xs font-bold shadow-sm">
              <span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              <span>برداشت تازه امسال مزارع ایران • ضمانت اصالت ۱۰۰٪</span>
            </div>

            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 leading-tight">
              عطر اصیل مزارع، <br class="hidden sm:inline">
              <span class="text-transparent bg-clip-text bg-gradient-to-l from-brand-600 via-brand-500 to-brand-amber">طراوت بی‌پیرایه طبیعت</span>
            </h1>

            <p class="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              از پسته دستچین باغات رفسنجان تا طلای سرخ قائنات و دمنوش‌های کوهی اشکورات؛ مستقیم از دستان کشاورز با استانداردهای بهداشتی روز در سفره شما.
            </p>

            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button onclick="navigate('shop')" class="px-7 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-2xl shadow-xl shadow-brand-600/25 transition-all flex items-center gap-2 text-sm">
                <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                <span>مشاهده محصولات و خرید</span>
              </button>
              <button onclick="navigate('about')" class="px-6 py-3.5 bg-white hover:bg-stone-100 text-stone-700 font-bold rounded-2xl border border-stone-200 transition-all text-sm">
                داستان عطارباشی
              </button>
            </div>

            <!-- Features Pill List -->
            <div class="grid grid-cols-3 gap-3 pt-6 border-t border-stone-200/60 max-w-lg mx-auto lg:mx-0 text-right">
              <div>
                <span class="font-black text-lg text-brand-600 block">۱۰۰٪</span>
                <span class="text-[11px] text-stone-500 font-bold">ارگانیک و آزمایشگاهی</span>
              </div>
              <div>
                <span class="font-black text-lg text-brand-600 block">۷ روز</span>
                <span class="text-[11px] text-stone-500 font-bold">ضمانت بازگشت وجه</span>
              </div>
              <div>
                <span class="font-black text-lg text-brand-600 block">پست پیشتاز</span>
                <span class="text-[11px] text-stone-500 font-bold">ارسال امن سراسر ایران</span>
              </div>
            </div>
          </div>

          <!-- Hero Image Collage -->
          <div class="lg:col-span-5 relative">
            <div class="relative mx-auto max-w-sm sm:max-w-md">
              <div class="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-stone-100">
                <img src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80" alt="پسته اکبری اعلا" class="w-full h-full object-cover">
              </div>

              <!-- Floating Card 1 -->
              <div class="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">
                  <i data-lucide="award" class="w-5 h-5"></i>
                </div>
                <div>
                  <span class="font-black text-xs text-stone-900 block">زعفران سوپر نگین</span>
                  <span class="text-[10px] text-stone-400">تضمین رنگ‌دهی و خلوص</span>
                </div>
              </div>

              <!-- Floating Card 2 -->
              <div class="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                  <i data-lucide="check-check" class="w-5 h-5"></i>
                </div>
                <div>
                  <span class="font-black text-xs text-stone-900 block">بسته‌بندی زیپ‌کیپ و بهداشتی</span>
                  <span class="text-[10px] text-stone-400">حفظ ماندگاری عطر گیاهان</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Category Quick Links -->
    <section class="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-stone-900">دسته‌بندی‌های محبوب عطاری</h2>
          <p class="text-xs text-stone-500 mt-1">تنوع بی‌نظیر خشکبار اعلا و گیاهان سنتی</p>
        </div>
        <button onclick="navigate('shop')" class="text-xs font-bold text-brand-600 hover:text-brand-500 flex items-center gap-1">
          <span>مشاهده همه</span>
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
        </button>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div onclick="filterShopCategory('خشکبار و مغزیجات')" class="group cursor-pointer p-4 bg-white rounded-2xl border border-stone-200/80 hover:border-brand-300 hover:shadow-lg transition-all text-center">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            🥜
          </div>
          <h3 class="font-bold text-sm text-stone-900 group-hover:text-brand-600 transition-colors">خشکبار و مغزیجات</h3>
          <span class="text-[11px] text-stone-400">پسته، بادام، گردو تویسرکان</span>
        </div>

        <div onclick="filterShopCategory('زعفران و هل')" class="group cursor-pointer p-4 bg-white rounded-2xl border border-stone-200/80 hover:border-brand-300 hover:shadow-lg transition-all text-center">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            🌸
          </div>
          <h3 class="font-bold text-sm text-stone-900 group-hover:text-brand-600 transition-colors">زعفران و هل</h3>
          <span class="text-[11px] text-stone-400">زعفران نگین قائنات، هل اکبر</span>
        </div>

        <div onclick="filterShopCategory('دمنوش و گیاهان دارویی')" class="group cursor-pointer p-4 bg-white rounded-2xl border border-stone-200/80 hover:border-brand-300 hover:shadow-lg transition-all text-center">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            🍵
          </div>
          <h3 class="font-bold text-sm text-stone-900 group-hover:text-brand-600 transition-colors">دمنوش و گیاهان دارویی</h3>
          <span class="text-[11px] text-stone-400">گل گاوزبان، گل محمدی، بابونه</span>
        </div>

        <div onclick="filterShopCategory('روغن‌ها و عرقیات')" class="group cursor-pointer p-4 bg-white rounded-2xl border border-stone-200/80 hover:border-brand-300 hover:shadow-lg transition-all text-center">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            🌿
          </div>
          <h3 class="font-bold text-sm text-stone-900 group-hover:text-brand-600 transition-colors">روغن‌ها و عرقیات</h3>
          <span class="text-[11px] text-stone-400">روغن آرگان، سیاهدانه، گلاب</span>
        </div>
      </div>
    </section>

    <!-- Featured Products Grid -->
    <section class="py-12 bg-white border-y border-stone-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <span class="text-xs font-bold text-brand-amber">دستچین ویژه عطارباشی</span>
            <h2 class="text-2xl sm:text-3xl font-black text-stone-900">محصولات منتخب و پرفروش</h2>
          </div>
          <button onclick="navigate('shop')" class="text-xs font-bold text-brand-600 hover:text-brand-500 flex items-center gap-1">
            <span>دیدن تمام کالاها</span>
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${featured.map(renderProductCard).join('')}
        </div>
      </div>
    </section>

    <!-- Trust Banner -->
    <section class="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div class="relative z-10 max-w-xl space-y-4">
          <span class="bg-brand-gold text-stone-900 text-[10px] font-black px-3 py-1 rounded-full uppercase">تخفیف ویژه سفارش اول</span>
          <h3 class="text-2xl sm:text-3xl font-black leading-tight">با خیال راحت، دستچین باغ را به خانه ببرید</h3>
          <p class="text-xs sm:text-sm text-brand-100 leading-relaxed">
            کد تخفیف <code class="bg-white/20 px-2 py-0.5 rounded font-mono font-bold text-white">ATTAR10</code> را در بخش تسویه حساب وارد کنید و ۱۰٪ تخفیف بدون محدودیت روی سفارش خود دریافت کنید.
          </p>
          <div class="pt-2">
            <button onclick="navigate('shop')" class="px-6 py-3 bg-white text-brand-700 hover:bg-brand-50 font-black rounded-xl text-xs shadow transition-all">
              شروع خرید آنلاین
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Health Journal / Blogs -->
    <section class="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-8">
        <div>
          <span class="text-xs font-bold text-brand-amber">دانش عطاری سنتی</span>
          <h2 class="text-2xl sm:text-3xl font-black text-stone-900">مجله سلامت و خواص گیاهان</h2>
        </div>
        <button onclick="navigate('blog')" class="text-xs font-bold text-brand-600 hover:text-brand-500 flex items-center gap-1">
          <span>آرشیو مقالات</span>
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${blogs.map(renderBlogCard).join('')}
      </div>
    </section>
  `;
}

// ========================
// PAGE 2: SHOP CATALOG
// ========================
function renderShopPage() {
  const categories = ['all', 'خشکبار و مغزیجات', 'زعفران و هل', 'دمنوش و گیاهان دارویی', 'روغن‌ها و عرقیات'];
  let list = state.products;

  if (state.selectedCategory !== 'all') {
    list = list.filter(p => p.category === state.selectedCategory);
  }

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Title -->
      <div class="text-center space-y-3 mb-8">
        <h1 class="text-2xl sm:text-4xl font-black text-stone-900">فروشگاه جامع خشکبار و عطاری</h1>
        <p class="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto">تمام محصولات با ضمانت تازگی، عدم استفاده از مواد نگهدارنده و ارسال با بسته‌بندی پلمپ به دست شما می‌رسد.</p>
      </div>

      <!-- Filter Buttons (Scrollable on mobile) -->
      <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-8 justify-start sm:justify-center custom-scroll">
        ${categories.map(cat => `
          <button onclick="filterShopCategory('${cat}')" class="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${state.selectedCategory === cat ? 'bg-brand-600 text-white shadow-md' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}">
            ${cat === 'all' ? 'همه محصولات' : cat}
          </button>
        `).join('')}
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${list.map(renderProductCard).join('')}
      </div>
    </div>
  `;
}

function filterShopCategory(category) {
  state.selectedCategory = category;
  navigate('shop');
}

// ========================
// PAGE 3: BLOGS & DETAIL
// ========================
function renderBlogPage() {
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center space-y-3 mb-10">
        <h1 class="text-3xl sm:text-4xl font-black text-stone-900">مجله خواص درمانی و سلامت عطارباشی</h1>
        <p class="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto">مقالات کاربردی بر پایه طب سنتی و تحقیقات علمی روز پیرامون دمنوش‌ها، مغزیجات و عرقیات اصیل.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${state.blogs.map(renderBlogCard).join('')}
      </div>
    </div>
  `;
}

function renderBlogDetailPage(id) {
  const article = state.blogs.find(b => b.id === Number(id)) || state.blogs[0];
  return `
    <article class="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <button onclick="navigate('blog')" class="text-xs font-bold text-stone-500 hover:text-brand-600 flex items-center gap-1.5 mb-4">
        <i data-lucide="arrow-right" class="w-4 h-4"></i>
        <span>بازگشت به لیست مقالات</span>
      </button>

      <div class="space-y-3">
        <div class="flex items-center gap-2 text-xs text-brand-amber font-bold">
          <span>${article.category}</span>
          <span>•</span>
          <span>زمان مطالعه: ${article.readTime}</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-stone-900 leading-snug">${article.title}</h1>
        <p class="text-xs text-stone-400">تاریخ انتشار: ${article.date}</p>
      </div>

      <div class="rounded-3xl overflow-hidden aspect-video bg-stone-100 shadow-xl">
        <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover">
      </div>

      <div class="prose prose-stone max-w-none text-stone-700 text-sm leading-relaxed space-y-4 pt-4">
        <p class="font-bold text-stone-800 text-base leading-relaxed">${article.excerpt}</p>
        <p>${article.content}</p>
        <p>مصرف گیاهان دارویی اگرچه منشاء طبیعی دارند اما استفاده منظم و هدفمند از آن‌ها بر اساس طبع فردی نیازمند آگاهی است. عطارباشی می‌کوشد بهترین کیفیت گیاهان دارویی را بدون اسانس مصنوعی در اختیار شما قرار دهد.</p>
      </div>

      <div class="p-6 bg-brand-50 rounded-3xl border border-brand-100 flex items-center justify-between mt-8">
        <div>
          <h4 class="font-bold text-sm text-brand-700">علاقه‌مند به تهیه این گیاه دارویی هستید؟</h4>
          <p class="text-xs text-stone-600 mt-1">گیاهان کوهی دستچین شده را از فروشگاه عطارباشی سفارش دهید.</p>
        </div>
        <button onclick="navigate('shop')" class="px-4 py-2 bg-brand-600 text-white font-bold rounded-xl text-xs hover:bg-brand-500 transition-all">
          مشاهده در فروشگاه
        </button>
      </div>
    </article>
  `;
}

// ========================
// PAGE 4: ABOUT & CONTACT
// ========================
function renderAboutPage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div class="text-center space-y-4 mb-12">
        <span class="text-xs font-bold text-brand-amber">داستان ما</span>
        <h1 class="text-3xl sm:text-4xl font-black text-stone-900">سفر از دل باغات تا خانه شما</h1>
        <p class="text-stone-500 text-sm max-w-xl mx-auto">
          عطارباشی با بیش از دو دهه تجربه در زمینه کشت و عرضه خشکبار اصیل ایرانی، پلی میان کیفیت بی‌پیرایه روستا و سفره خانواده‌های ایرانی است.
        </p>
      </div>

      <div class="rounded-3xl overflow-hidden shadow-2xl mb-12">
        <img src="https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=80" class="w-full h-80 object-cover" alt="باغ پسته و کشاورزی">
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
          <div class="w-12 h-12 bg-brand-50 rounded-xl text-brand-600 flex items-center justify-center mx-auto mb-3"><i data-lucide="check-check" class="w-6 h-6"></i></div>
          <h3 class="font-bold text-sm text-stone-900">تست آزمایشگاهی</h3>
          <p class="text-xs text-stone-500 mt-1">تست عدم استفاده از سموم غیرمجاز و کنترل آفلاتوکسین مغزیجات.</p>
        </div>
        <div class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
          <div class="w-12 h-12 bg-brand-50 rounded-xl text-brand-600 flex items-center justify-center mx-auto mb-3"><i data-lucide="heart-handshake" class="w-6 h-6"></i></div>
          <h3 class="font-bold text-sm text-stone-900">حمایت از کشاورز بومی</h3>
          <p class="text-xs text-stone-500 mt-1">خرید نقدی و مستقیم با بالاترین نرخ از کشاورزان زحمتکش محلی.</p>
        </div>
        <div class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
          <div class="w-12 h-12 bg-brand-50 rounded-xl text-brand-600 flex items-center justify-center mx-auto mb-3"><i data-lucide="sparkles" class="w-6 h-6"></i></div>
          <h3 class="font-bold text-sm text-stone-900">بسته‌بندی پاک و بهداشتی</h3>
          <p class="text-xs text-stone-500 mt-1">ظروف دوستدار محیط زیست با ماندگاری حداکثری طعم و عطر گیاهان.</p>
        </div>
      </div>
    </div>
  `;
}

function renderContactPage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div class="text-center space-y-4 mb-12">
        <h1 class="text-3xl sm:text-4xl font-black text-stone-900">تماس و پشتیبانی عطارباشی</h1>
        <p class="text-stone-500 text-sm max-w-xl mx-auto">همکاران ما در بخش پشتیبانی و مشاوره خرید، آماده پاسخگویی به پرسش‌های شما هستند.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
        <div class="space-y-6 text-xs">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0"><i data-lucide="phone" class="w-5 h-5"></i></div>
            <div>
              <span class="font-bold text-stone-800 text-sm block">شماره تلفن ثابت:</span>
              <span class="text-stone-500">۰۲۱-۸۸۸۸۹۹۹۹ (شنبه تا پنج‌شنبه ۹ تا ۱۹)</span>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0"><i data-lucide="map-pin" class="w-5 h-5"></i></div>
            <div>
              <span class="font-bold text-stone-800 text-sm block">آدرس دفتر مرکزی و انبار:</span>
              <span class="text-stone-500">تهران، خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۲۳۰</span>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0"><i data-lucide="mail" class="w-5 h-5"></i></div>
            <div>
              <span class="font-bold text-stone-800 text-sm block">ایمیل پشتیبانی:</span>
              <span class="text-stone-500 font-mono">support@attarbashi.ir</span>
            </div>
          </div>
        </div>

        <form onsubmit="alert('پیام شما ثبت گردید. با شما تماس گرفته خواهد شد.'); event.preventDefault();" class="space-y-3 text-xs">
          <input type="text" required placeholder="نام شما" class="w-full p-3 rounded-xl border border-stone-200 focus:border-brand-500 focus:outline-none">
          <input type="tel" required placeholder="شماره موبایل" class="w-full p-3 rounded-xl border border-stone-200 focus:border-brand-500 focus:outline-none">
          <textarea rows="3" required placeholder="متن پیام یا پرسش..." class="w-full p-3 rounded-xl border border-stone-200 focus:border-brand-500 focus:outline-none"></textarea>
          <button type="submit" class="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow transition-all">ارسال پیام</button>
        </form>
      </div>
    </div>
  `;
}

// ========================================================
// Component: Product Card & Blog Card
// ========================================================
function renderProductCard(product) {
  const isOutOfStock = product.stock <= 0;
  return `
    <div class="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 flex flex-col justify-between">
      <div class="relative overflow-hidden bg-stone-100 aspect-square">
        <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        
        ${product.badge ? `
          <span class="absolute top-3 right-3 bg-brand-gold text-stone-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            ${product.badge}
          </span>
        ` : ''}

        <div class="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[11px] font-bold text-stone-700 shadow-sm">
          <i data-lucide="star" class="w-3.5 h-3.5 text-amber-500 fill-amber-500"></i>
          <span>${product.rating}</span>
        </div>
      </div>

      <div class="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span class="text-[11px] font-medium text-stone-400 block mb-1">${product.category}</span>
          <h3 class="font-bold text-sm text-stone-900 line-clamp-2 group-hover:text-brand-600 transition-colors">${product.title}</h3>
          <p class="text-[11px] text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">${product.description}</p>
        </div>

        <div class="pt-4 border-t border-stone-100 mt-4 flex items-center justify-between">
          <div>
            ${product.oldPrice ? `<span class="block text-[11px] text-stone-400 line-through">${new Intl.NumberFormat('fa-IR').format(product.oldPrice)}</span>` : ''}
            <span class="text-sm font-black text-brand-600">${StoreDB.formatPrice(product.price)}</span>
            <span class="text-[10px] text-stone-400 block">هر ${product.unit}</span>
          </div>

          <button onclick="state.addToCart(${product.id})" ${isOutOfStock ? 'disabled' : ''} 
            class="p-2.5 rounded-xl ${isOutOfStock ? 'bg-stone-200 text-stone-400 cursor-not-allowed' : 'bg-brand-50 hover:bg-brand-600 text-brand-600 hover:text-white'} transition-all shadow-sm" 
            title="${isOutOfStock ? 'اتمام موجودی' : 'افزودن به سبد خرید'}">
            <i data-lucide="${isOutOfStock ? 'slash' : 'shopping-bag'}" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderBlogCard(blog) {
  return `
    <div onclick="navigate('blog-detail', ${blog.id})" class="group cursor-pointer bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
      <div class="overflow-hidden aspect-video bg-stone-100">
        <img src="${blog.image}" alt="${blog.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
      </div>
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 text-[11px] text-stone-400 mb-2">
            <span class="text-brand-amber font-bold">${blog.category}</span>
            <span>•</span>
            <span>${blog.date}</span>
          </div>
          <h3 class="font-bold text-sm text-stone-900 group-hover:text-brand-600 transition-colors leading-snug line-clamp-2">${blog.title}</h3>
          <p class="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">${blog.excerpt}</p>
        </div>
        <div class="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-brand-600">
          <span>ادامه مطلب</span>
          <i data-lucide="arrow-left" class="w-4 h-4 group-hover:-translate-x-1 transition-transform"></i>
        </div>
      </div>
    </div>
  `;
}

// ========================================================
// Cart Drawer Logic
// ========================================================
function toggleCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  drawer.classList.toggle('hidden');
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById('cartBadge');
  const mobileBadge = document.getElementById('mobileCartBadge');
  const count = state.getCartCount();
  if (badge) badge.innerText = count;
  if (mobileBadge) mobileBadge.innerText = count;

  const list = document.getElementById('cartItemsList');
  const total = document.getElementById('cartTotalPrice');

  if (total) total.innerText = StoreDB.formatPrice(state.getCartTotal());

  if (!list) return;

  if (state.cart.length === 0) {
    list.innerHTML = `
      <div class="py-16 text-center text-stone-400 flex flex-col items-center justify-center">
        <i data-lucide="shopping-bag" class="w-12 h-12 mb-3 opacity-40"></i>
        <p class="font-bold text-sm text-stone-600">سبد خرید شما خالی است</p>
        <p class="text-xs text-stone-400 mt-1">محصولات ارگانیک و تازه را به سبد اضافه کنید.</p>
        <button onclick="toggleCartDrawer(); navigate('shop');" class="mt-4 px-4 py-2 bg-brand-50 text-brand-600 font-bold text-xs rounded-xl hover:bg-brand-100">مشاهده محصولات</button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  list.innerHTML = state.cart.map(item => `
    <div class="flex items-center gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-100">
      <img src="${item.image}" class="w-16 h-16 object-cover rounded-xl border border-stone-200">
      <div class="flex-1">
        <h4 class="font-bold text-xs text-stone-900 line-clamp-1">${item.title}</h4>
        <span class="text-[11px] font-bold text-brand-600">${StoreDB.formatPrice(item.price)}</span>
        <div class="flex items-center gap-2 mt-2">
          <button onclick="state.updateQuantity(${item.id}, -1)" class="w-6 h-6 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-xs font-bold hover:bg-stone-100">-</button>
          <span class="text-xs font-bold text-stone-800">${item.quantity}</span>
          <button onclick="state.updateQuantity(${item.id}, 1)" class="w-6 h-6 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-xs font-bold hover:bg-stone-100">+</button>
        </div>
      </div>
      <button onclick="state.removeFromCart(${item.id})" class="text-stone-400 hover:text-rose-500 p-1">
        <i data-lucide="trash-2" class="w-4 h-4"></i>
      </button>
    </div>
  `).join('');
  lucide.createIcons();
}

// ========================================================
// Checkout Modal & Coupon Logic
// ========================================================
function openCheckoutModal() {
  if (state.cart.length === 0) {
    alert("سبد خرید شما خالی است!");
    return;
  }
  toggleCartDrawer();

  // Pre-fill user data if logged in
  const user = StoreDB.getCurrentUser();
  if (user) {
    if (user.name) document.getElementById('orderName').value = user.name;
    if (user.phone) document.getElementById('orderPhone').value = user.phone;
    if (user.address) document.getElementById('orderAddress').value = user.address;
  }

  updateCheckoutPrices();
  document.getElementById('checkoutModal').classList.remove('hidden');
  lucide.createIcons();
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal').classList.add('hidden');
}

function updateCheckoutPrices() {
  const subtotal = state.getCartTotal();
  const discount = state.discountAmount;
  const shipping = subtotal >= 800000 || subtotal === 0 ? 0 : 45000;
  const finalPrice = Math.max(0, subtotal - discount + shipping);

  document.getElementById('checkoutSubtotal').innerText = StoreDB.formatPrice(subtotal);
  
  const discountRow = document.getElementById('checkoutDiscountRow');
  const discountAmountEl = document.getElementById('checkoutDiscountAmount');
  if (discount > 0) {
    discountRow.classList.remove('hidden');
    discountAmountEl.innerText = `- ${StoreDB.formatPrice(discount)}`;
  } else {
    discountRow.classList.add('hidden');
  }

  const shippingEl = document.getElementById('checkoutShippingFee');
  if (shipping === 0) {
    shippingEl.innerText = 'رایگان';
    shippingEl.className = 'text-emerald-600 font-bold';
  } else {
    shippingEl.innerText = StoreDB.formatPrice(shipping);
    shippingEl.className = 'text-stone-700 font-bold';
  }

  document.getElementById('checkoutFinalPrice').innerText = StoreDB.formatPrice(finalPrice);
}

function applyCouponCode() {
  const code = document.getElementById('couponInput').value.trim();
  const subtotal = state.getCartTotal();
  const msgEl = document.getElementById('couponStatusMessage');

  const res = StoreDB.validateCoupon(code, subtotal);
  if (res.valid) {
    state.appliedCoupon = res.coupon;
    state.discountAmount = res.discountAmount;
    msgEl.innerText = `✓ ${res.message} - کسر مبلغ: ${StoreDB.formatPrice(res.discountAmount)}`;
    msgEl.className = 'text-[11px] font-bold text-emerald-600';
    updateCheckoutPrices();
  } else {
    state.appliedCoupon = null;
    state.discountAmount = 0;
    msgEl.innerText = `✕ ${res.message}`;
    msgEl.className = 'text-[11px] font-bold text-rose-600';
    updateCheckoutPrices();
  }
}

let selectedPaymentMethod = 'online';
function handlePaymentMethodChange(method) {
  selectedPaymentMethod = method;
  const cardBox = document.getElementById('cardToCardDetailsBox');
  const submitText = document.getElementById('checkoutSubmitText');

  ['online', 'cod', 'card'].forEach(m => {
    const lbl = document.getElementById(`label-method-${m}`);
    if (lbl) {
      if ((m === 'online' && method === 'online') || 
          (m === 'cod' && method === 'cod') || 
          (m === 'card' && method === 'card_to_card')) {
        lbl.className = 'flex items-center justify-between p-3.5 rounded-xl border border-brand-500 bg-brand-50/50 cursor-pointer transition-all';
      } else {
        lbl.className = 'flex items-center justify-between p-3.5 rounded-xl border border-stone-200 hover:border-brand-300 cursor-pointer transition-all';
      }
    }
  });

  if (method === 'card_to_card') {
    cardBox.classList.remove('hidden');
    submitText.innerText = 'ثبت فیش و نهایی‌سازی سفارش';
  } else if (method === 'cod') {
    cardBox.classList.add('hidden');
    submitText.innerText = 'ثبت نهایی سفارش (پرداخت در محل)';
  } else {
    cardBox.classList.add('hidden');
    submitText.innerText = 'انتقال به درگاه امن شاپرک';
  }
}

function handlePlaceOrder(e) {
  e.preventDefault();
  const customerName = document.getElementById('orderName').value.trim();
  const phone = document.getElementById('orderPhone').value.trim();
  const province = document.getElementById('orderProvince').value.trim();
  const city = document.getElementById('orderCity').value.trim();
  const address = document.getElementById('orderAddress').value.trim();

  if (selectedPaymentMethod === 'card_to_card') {
    const receipt = document.getElementById('cardReceiptCode').value.trim();
    if (!receipt) {
      alert("لطفاً شماره پیگیری فیش کارت به کارت را وارد فرمایید.");
      return;
    }
  }

  const subtotal = state.getCartTotal();
  const discount = state.discountAmount;
  const shipping = subtotal >= 800000 || subtotal === 0 ? 0 : 45000;
  const finalPrice = Math.max(0, subtotal - discount + shipping);

  const orderData = {
    id: `ATB-${Math.floor(10000 + Math.random() * 90000)}`,
    customerName,
    phone,
    province,
    city,
    address,
    date: StoreDB.getPersianDate(),
    paymentMethod: selectedPaymentMethod,
    paymentStatus: selectedPaymentMethod === 'online' ? 'paid' : (selectedPaymentMethod === 'card_to_card' ? 'paid' : 'pending'),
    status: 'processing',
    trackingCode: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
    subtotal,
    discountAmount: discount,
    couponCode: state.appliedCoupon ? state.appliedCoupon.code : null,
    shippingFee: shipping,
    total: finalPrice,
    items: [...state.cart]
  };

  // If user is logged in without saved details, save them
  const currentUser = StoreDB.getCurrentUser();
  if (currentUser) {
    StoreDB.setCurrentUser({ ...currentUser, name: customerName, phone, address });
  }

  if (selectedPaymentMethod === 'online') {
    state.pendingCheckoutData = orderData;
    closeCheckoutModal();
    openGatewayModal(finalPrice);
  } else {
    // Process COD or Card-to-Card immediately
    finalizeCompletedOrder(orderData);
  }
}

// ========================================================
// Simulated Shaparak Gateway Logic
// ========================================================
let gatewayTimerInterval = null;

function openGatewayModal(amount) {
  document.getElementById('gatewayAmount').innerText = StoreDB.formatPrice(amount);
  document.getElementById('gatewayModal').classList.remove('hidden');

  let remaining = 600; // 10 minutes
  clearInterval(gatewayTimerInterval);
  gatewayTimerInterval = setInterval(() => {
    remaining--;
    const mins = String(Math.floor(remaining / 60)).padStart(2, '0');
    const secs = String(remaining % 60).padStart(2, '0');
    const timerEl = document.getElementById('gatewayTimer');
    if (timerEl) timerEl.innerText = `${mins}:${secs}`;
    if (remaining <= 0) {
      clearInterval(gatewayTimerInterval);
      alert("مهلت پرداخت منقضی شد.");
      cancelGatewayPayment();
    }
  }, 1000);

  lucide.createIcons();
}

function requestDynamicBankOtp() {
  const bankCode = Math.floor(10000 + Math.random() * 90000);
  triggerSmsBanner(`بانک مرکزی (رمز پویا): رمز یک‌بار مصرف شما: ${bankCode} (معتبر تا ۲ دقیقه)`);
  document.getElementById('gatewayOtp').value = bankCode;
}

function simulateSuccessfulPayment() {
  clearInterval(gatewayTimerInterval);
  document.getElementById('gatewayModal').classList.add('hidden');
  if (state.pendingCheckoutData) {
    finalizeCompletedOrder(state.pendingCheckoutData);
    state.pendingCheckoutData = null;
  }
}

function cancelGatewayPayment() {
  clearInterval(gatewayTimerInterval);
  document.getElementById('gatewayModal').classList.add('hidden');
  alert("پرداخت لغو شد. سفارش شما ثبت نگردید.");
}

function finalizeCompletedOrder(orderData) {
  closeCheckoutModal();
  StoreDB.addOrder(orderData);

  // Decrement stock in store
  orderData.items.forEach(item => {
    const prod = StoreDB.getProducts().find(p => p.id === item.id);
    if (prod) {
      const newStock = Math.max(0, prod.stock - item.quantity);
      StoreDB.updateProduct(prod.id, { stock: newStock });
    }
  });

  state.clearCart();

  // Show order confirmation modal
  document.getElementById('successOrderId').innerText = orderData.id;
  document.getElementById('successTrackingCode').innerText = orderData.trackingCode;
  document.getElementById('successTotalAmount').innerText = StoreDB.formatPrice(orderData.total);
  document.getElementById('successPaymentMethod').innerText = 
    orderData.paymentMethod === 'online' ? 'درگاه آنلاین شاپرک (موفق)' : 
    (orderData.paymentMethod === 'card_to_card' ? 'کارت به کارت' : 'پرداخت در محل');

  document.getElementById('orderSuccessModal').classList.remove('hidden');
  lucide.createIcons();
}

function closeSuccessModal() {
  document.getElementById('orderSuccessModal').classList.add('hidden');
  navigate('home');
}

function closeSuccessModalAndOpenProfile() {
  document.getElementById('orderSuccessModal').classList.add('hidden');
  openUserModal();
}

// ========================================================
// User Authentication & SMS OTP Simulation
// ========================================================
let otpTimerInterval = null;
let simulatedOtpCode = null;

function openUserModal() {
  const user = StoreDB.getCurrentUser();
  const loginView = document.getElementById('userLoginView');
  const profileView = document.getElementById('userProfileView');

  if (user) {
    loginView.classList.add('hidden');
    profileView.classList.remove('hidden');
    document.getElementById('profileUserName').innerText = user.name || 'کاربر گرامی عطارباشی';
    document.getElementById('profileUserPhone').innerText = user.phone;
    renderUserOrders(user.phone);
  } else {
    loginView.classList.remove('hidden');
    profileView.classList.add('hidden');
    document.getElementById('otpStepPhone').classList.remove('hidden');
    document.getElementById('otpStepVerify').classList.add('hidden');
  }

  document.getElementById('userModal').classList.remove('hidden');
  lucide.createIcons();
}

function closeUserModal() {
  document.getElementById('userModal').classList.add('hidden');
  clearInterval(otpTimerInterval);
}

function handleSendOtp() {
  const phone = document.getElementById('otpPhoneInput').value.trim();
  if (!phone || phone.length < 10) {
    alert("لطفاً شماره موبایل معتبر وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹)");
    return;
  }

  simulatedOtpCode = String(Math.floor(1000 + Math.random() * 9000));
  document.getElementById('displayOtpPhone').innerText = phone;
  document.getElementById('otpStepPhone').classList.add('hidden');
  document.getElementById('otpStepVerify').classList.remove('hidden');

  // Trigger simulated incoming phone SMS banner
  triggerSmsBanner(`کد تایید ورود شما به عطارباشی: ${simulatedOtpCode}`);
  document.getElementById('otpCodeInput').value = simulatedOtpCode; // Auto-fill for friendly testing

  // Countdown timer
  let seconds = 60;
  const timerEl = document.getElementById('otpTimer');
  const resendBtn = document.getElementById('otpResendBtn');
  resendBtn.classList.add('cursor-not-allowed', 'text-stone-400');
  resendBtn.classList.remove('text-brand-600', 'font-bold');

  clearInterval(otpTimerInterval);
  otpTimerInterval = setInterval(() => {
    seconds--;
    timerEl.innerText = `00:${String(seconds).padStart(2, '0')}`;
    if (seconds <= 0) {
      clearInterval(otpTimerInterval);
      resendBtn.classList.remove('cursor-not-allowed', 'text-stone-400');
      resendBtn.classList.add('text-brand-600', 'font-bold', 'cursor-pointer');
    }
  }, 1000);
}

function handleVerifyOtp() {
  const entered = document.getElementById('otpCodeInput').value.trim();
  const phone = document.getElementById('otpPhoneInput').value.trim();

  if (entered === simulatedOtpCode || entered === '1234') {
    clearInterval(otpTimerInterval);
    const user = {
      phone,
      name: phone === '09123456789' ? 'علی رضایی' : 'مشتری عطارباشی',
      address: 'تهران، خیابان ولیعصر'
    };
    StoreDB.setCurrentUser(user);
    showToast("با موفقیت وارد حساب شدید ✨");
    openUserModal(); // refresh view
  } else {
    alert("کد تایید وارد شده نامعتبر است!");
  }
}

function handleUserLogout() {
  StoreDB.logoutUser();
  closeUserModal();
  showToast("از حساب کاربری خارج شدید.");
}

function updateUserUI() {
  const user = StoreDB.getCurrentUser();
  const label = document.getElementById('userAuthLabel');
  const mobileLabel = document.getElementById('mobileUserLabel');
  if (user) {
    if (label) label.innerText = user.name ? user.name.split(' ')[0] : 'پروفایل';
    if (mobileLabel) mobileLabel.innerText = 'پروفایل';
  } else {
    if (label) label.innerText = 'ورود پیامکی';
    if (mobileLabel) mobileLabel.innerText = 'حساب من';
  }
}

function renderUserOrders(phone) {
  const orders = StoreDB.getOrders();
  // Filter by user phone, or show recent orders if user just placed them
  const myOrders = orders.filter(o => o.phone === phone || o.phone.replace(/[^0-9]/g, '') === phone.replace(/[^0-9]/g, ''));
  const container = document.getElementById('userOrdersList');
  const countEl = document.getElementById('userOrdersCount');

  const statusBadges = {
    processing: '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">در حال پردازش</span>',
    shipped: '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">ارسال با پست</span>',
    delivered: '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">تحویل شده</span>',
    cancelled: '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">لغو شده</span>'
  };

  if (myOrders.length === 0) {
    countEl.innerText = '۰ سفارش';
    container.innerHTML = `
      <div class="py-8 text-center text-stone-400 bg-stone-50 rounded-2xl border border-stone-100">
        <p class="font-bold">سفارشی برای این شماره ثبت نشده است.</p>
        <p class="text-[11px] mt-1">با ثبت اولین سفارش، سوابق در اینجا ثبت می‌گردد.</p>
      </div>
    `;
    return;
  }

  countEl.innerText = `${myOrders.length} سفارش`;
  container.innerHTML = myOrders.map(o => `
    <div class="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
      <div class="flex items-center justify-between">
        <span class="font-bold font-mono text-stone-800">${o.id}</span>
        ${statusBadges[o.status] || o.status}
      </div>
      <div class="text-[11px] text-stone-500 line-clamp-1">
        ${(o.items || []).map(i => `${i.title} (${i.quantity})`).join('، ')}
      </div>
      <div class="flex items-center justify-between pt-2 border-t border-stone-200/60 text-[11px]">
        <span class="text-stone-400">${o.date}</span>
        <span class="font-black text-brand-600">${StoreDB.formatPrice(o.total)}</span>
      </div>
      <div class="text-[10px] text-stone-400 font-mono">
        کد رهگیری: ${o.trackingCode || 'ندارد'}
      </div>
    </div>
  `).join('');
}

// ========================================================
// Simulated Phone SMS Banner UI
// ========================================================
let smsBannerTimeout = null;

function triggerSmsBanner(text) {
  const banner = document.getElementById('smsNotificationBanner');
  const textEl = document.getElementById('smsBannerText');
  textEl.innerText = text;

  banner.classList.remove('hidden');
  setTimeout(() => {
    banner.classList.remove('-translate-y-24');
    banner.classList.add('translate-y-0');
  }, 10);

  clearTimeout(smsBannerTimeout);
  smsBannerTimeout = setTimeout(() => {
    dismissSmsBanner();
  }, 6000);
  lucide.createIcons();
}

function dismissSmsBanner() {
  const banner = document.getElementById('smsNotificationBanner');
  banner.classList.remove('translate-y-0');
  banner.classList.add('-translate-y-24');
  setTimeout(() => banner.classList.add('hidden'), 500);
}

// Toast
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-20 md:bottom-6 left-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-stone-700 text-xs sm:text-sm font-medium transition-all';
  toast.innerHTML = `<i data-lucide="check-circle" class="w-5 h-5 text-emerald-400"></i><span>${message}</span>`;
  document.body.appendChild(toast);
  lucide.createIcons();
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 2600);
}

// ========================================================
// Search Modal Logic
// ========================================================
function openSearchModal() {
  document.getElementById('searchModal').classList.remove('hidden');
  document.getElementById('searchInput').focus();
}

function closeSearchModal() {
  document.getElementById('searchModal').classList.add('hidden');
}

function handleSearch(query) {
  const container = document.getElementById('searchResults');
  if (!query || query.trim() === '') {
    container.innerHTML = `<p class="text-xs text-stone-400 text-center py-6">کلمه مورد نظر خود را تایپ کنید...</p>`;
    return;
  }

  const results = state.products.filter(p => 
    p.title.includes(query) || p.description.includes(query) || p.category.includes(query)
  );

  if (results.length === 0) {
    container.innerHTML = `<p class="text-xs text-stone-400 text-center py-6">موردی برای «${query}» یافت نشد.</p>`;
    return;
  }

  container.innerHTML = results.map(p => `
    <div onclick="closeSearchModal(); state.addToCart(${p.id});" class="flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 cursor-pointer border-b border-stone-100">
      <div class="flex items-center gap-3">
        <img src="${p.image}" class="w-10 h-10 object-cover rounded-lg">
        <div>
          <h5 class="text-xs font-bold text-stone-900">${p.title}</h5>
          <span class="text-[10px] text-stone-400">${p.category}</span>
        </div>
      </div>
      <span class="text-xs font-bold text-brand-600">${StoreDB.formatPrice(p.price)}</span>
    </div>
  `).join('');
}

// Global App Initialization
window.addEventListener('DOMContentLoaded', () => {
  navigate('home');
  updateCartUI();
  updateUserUI();
});
