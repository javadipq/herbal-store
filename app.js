// Initial Default Data (Preserved in LocalStorage)
const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: "پسته اکبری اعلا رفسنجان (دستچین خام)",
    category: "خشکبار و مغزیجات",
    price: 940000,
    oldPrice: 1100000,
    rating: 4.9,
    reviewsCount: 142,
    stock: 25,
    unit: "کیلوگرم",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80",
    badge: "فروش ویژه",
    description: "پسته اکبری خندان، دستچین باغات رفسنجان. بدون نمک، تازه و سرشار از آهن و ویتامین E."
  },
  {
    id: 2,
    title: "زعفران سوپر نگین اعلا صادراتی قائنات",
    category: "زعفران و هل",
    price: 380000,
    oldPrice: 420000,
    rating: 5.0,
    reviewsCount: 230,
    stock: 50,
    unit: "یک مثقال (۴.۶ گرم)",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    badge: "پرفروش",
    description: "زعفران سرگل قلم درشت صادراتی قائنات با عطر، رنگ‌دهی فوق‌العاده و تضمین آزمایشگاهی خلوص."
  },
  {
    id: 3,
    title: "بادام درختی پوست کاغذی ایرانی",
    category: "خشکبار و مغزیجات",
    price: 650000,
    oldPrice: null,
    rating: 4.8,
    reviewsCount: 88,
    stock: 40,
    unit: "کیلوگرم",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&q=80",
    badge: "تازه",
    description: "بادام شیرین با پوست بسیار نازک کاغذی، بدون دانه تلخ، سرشار از کلسیم و منیزیم."
  },
  {
    id: 4,
    title: "دمنوش گل گاوزبان اصل کوهی همراه لیمو عمانی",
    category: "دمنوش و گیاهان دارویی",
    price: 185000,
    oldPrice: 210000,
    rating: 4.7,
    reviewsCount: 64,
    stock: 30,
    unit: "بسته ۲۵۰ گرمی",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    badge: "آرامش‌بخش",
    description: "دستچین شده از ارتفاعات الموت و اشکورات، آرامش‌بخش طبیعی اعصاب و تقویت‌کننده سیستم ایمنی."
  },
  {
    id: 5,
    title: "غنچه گل محمدی ارگانیک داراب و کاشان",
    category: "دمنوش و گیاهان دارویی",
    price: 140000,
    oldPrice: null,
    rating: 4.9,
    reviewsCount: 110,
    stock: 35,
    unit: "بسته ۳۰۰ گرمی",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    badge: "معطر",
    description: "غنچه‌های صورتی خشک شده با عطر طبیعی شگفت‌انگیز، عالی برای ترکیب با چای سیاه و دمنوش‌های سلامت."
  },
  {
    id: 6,
    title: "گردو تویسرکان پوست کاغذی مغز سفید",
    category: "خشکبار و مغزیجات",
    price: 590000,
    oldPrice: 650000,
    rating: 4.8,
    reviewsCount: 95,
    stock: 20,
    unit: "کیلوگرم",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
    badge: "برگزیده",
    description: "گردوی روغنی و لذیذ باغ‌های تویسرکان با مغز سفید و چربی طبیعی امگا ۳ بالا."
  },
  {
    id: 7,
    title: "هل اکبر بنفش امپریال درجه یک",
    category: "زعفران و هل",
    price: 495000,
    oldPrice: 530000,
    rating: 5.0,
    reviewsCount: 175,
    stock: 60,
    unit: "بسته ۱۰۰ گرمی",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    badge: "هندی اصل",
    description: "دانه‌های درشت هل سبز هندی، بسته‌بندی پلمپ کارخانه با نهایت عطر و ماندگاری."
  },
  {
    id: 8,
    title: "روغن آرگان خالص مراکشی اصل (پرس سرد)",
    category: "روغن‌ها و عرقیات",
    price: 360000,
    oldPrice: 450000,
    rating: 4.9,
    reviewsCount: 78,
    stock: 18,
    unit: "شیشه ۵۰ میلی‌لیتر",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    badge: "ارگانیک",
    description: "روغن صد در صد خالص آرگان برای جوانسازی پوست، آبرسانی مو و ترمیم ساقه موهای آسیب‌دیده."
  }
];

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

// App State Management
class StoreState {
  constructor() {
    this.products = JSON.parse(localStorage.getItem('attar_products')) || INITIAL_PRODUCTS;
    this.blogs = JSON.parse(localStorage.getItem('attar_blogs')) || INITIAL_BLOGS;
    this.cart = JSON.parse(localStorage.getItem('attar_cart')) || [];
    this.currentPage = 'home';
    this.selectedCategory = 'all';
    this.searchQuery = '';
  }

  saveProducts() {
    localStorage.setItem('attar_products', JSON.stringify(this.products));
  }

  saveBlogs() {
    localStorage.setItem('attar_blogs', JSON.stringify(this.blogs));
  }

  saveCart() {
    localStorage.setItem('attar_cart', JSON.stringify(this.cart));
    updateCartUI();
  }

  addToCart(productId, count = 1) {
    const prod = this.products.find(p => p.id === productId);
    if (!prod) return;

    const existing = this.cart.find(item => item.id === productId);
    if (existing) {
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
}

const state = new StoreState();

// Utility Formatters
function formatPrice(num) {
  return new Intl.NumberFormat('fa-IR').format(num) + ' تومان';
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-6 left-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-stone-700 animate-bounce text-sm font-medium transition-all';
  toast.innerHTML = `<i data-lucide="check-circle" class="w-5 h-5 text-emerald-400"></i><span>${message}</span>`;
  document.body.appendChild(toast);
  lucide.createIcons();
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 2600);
}

// Router and Pages Renderers
function navigate(pageId, extraParam = null) {
  state.currentPage = pageId;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update navigation styling
  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.dataset.page === pageId) {
      btn.classList.add('text-brand-600', 'font-bold');
      btn.classList.remove('text-stone-600');
    } else {
      btn.classList.remove('text-brand-600', 'font-bold');
      btn.classList.add('text-stone-600');
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
    case 'admin':
      app.innerHTML = renderAdminPage();
      break;
    case 'about':
      app.innerHTML = renderAboutPage();
      break;
    default:
      app.innerHTML = renderHomePage();
  }
  lucide.createIcons();
}

// ========================
// PAGE 1: LANDING PAGE
// ========================
function renderHomePage() {
  const featured = state.products.slice(0, 4);
  const blogs = state.blogs.slice(0, 3);

  return `
    <!-- Hero Section -->
    <section class="relative hero-pattern pt-12 pb-24 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Text Content -->
          <div class="lg:col-span-7 space-y-6 text-center lg:text-right">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100 text-brand-600 text-xs font-bold">
              <span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              تازه‌ترین بار فصل رسید؛ برداشت امسال با ضمانت تست
            </div>
            
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-tight sm:leading-snug">
              طعم اصیل طبیعت، <br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-amber">خشکبار و گیاهان دارویی اعلا</span>
            </h1>

            <p class="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              مستقیماً از باغداران رفسنجان و مزارع زعفران قائنات بدون واسطه. دستچین شده با وسواس بالا، بسته‌بندی بهداشتی ضد رطوبت و ارسال فوری به تمام ایران.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button onclick="navigate('shop')" class="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-2xl shadow-xl shadow-brand-600/30 transition-all flex items-center justify-center gap-3 group">
                <span>مشاهده فروشگاه و خرید</span>
                <i data-lucide="arrow-left" class="w-5 h-5 group-hover:-translate-x-1 transition-transform"></i>
              </button>
              <button onclick="navigate('blog')" class="w-full sm:w-auto px-7 py-4 bg-white hover:bg-stone-100 text-stone-800 font-bold rounded-2xl border border-stone-200 shadow-sm transition-all flex items-center justify-center gap-2">
                <i data-lucide="book-open" class="w-5 h-5 text-brand-amber"></i>
                <span>دانشنامه خواص گیاهی</span>
              </button>
            </div>

            <!-- Stats Bar -->
            <div class="grid grid-cols-3 gap-4 pt-8 border-t border-stone-200/80">
              <div>
                <span class="block text-2xl font-black text-stone-900">+۱۲,۰۰۰</span>
                <span class="text-xs text-stone-500">مشتری وفادار</span>
              </div>
              <div>
                <span class="block text-2xl font-black text-stone-900">۱۰۰٪</span>
                <span class="text-xs text-stone-500">تضمین تازگی و اصالت</span>
              </div>
              <div>
                <span class="block text-2xl font-black text-stone-900">+۱۵۰</span>
                <span class="text-xs text-stone-500">قلم محصول ارگانیک</span>
              </div>
            </div>

          </div>

          <!-- Hero Visual & Cards -->
          <div class="lg:col-span-5 relative">
            <div class="relative mx-auto max-w-md lg:max-w-none">
              <!-- Glow background -->
              <div class="absolute -inset-4 bg-gradient-to-tr from-brand-accent/30 to-brand-500/20 rounded-3xl blur-2xl"></div>
              
              <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=80" 
                  alt="خشکبار و پسته اعلا" 
                  class="w-full h-[430px] object-cover hover:scale-105 transition-transform duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div class="flex items-center gap-2 text-brand-gold text-xs font-semibold mb-1">
                    <i data-lucide="sparkles" class="w-4 h-4"></i>
                    <span>برگزیده این هفته</span>
                  </div>
                  <h3 class="text-xl font-bold">پسته اکبری خندان رفسنجان</h3>
                  <p class="text-xs text-stone-200 mt-1">تضمین بالاترین انس و کیفیت با تایید کارشناس آزمایشگاه</p>
                  <div class="mt-4 flex items-center justify-between">
                    <span class="text-lg font-black text-brand-gold">۹۴۰,۰۰۰ تومان</span>
                    <button onclick="state.addToCart(1)" class="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-xl transition-all shadow-md">
                      افزودن به سبد
                    </button>
                  </div>
                </div>
              </div>

              <!-- Floating highlight cards -->
              <div class="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-3 hidden sm:flex">
                <div class="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <i data-lucide="award" class="w-6 h-6"></i>
                </div>
                <div>
                  <h5 class="text-xs font-bold text-stone-900">نشان درجه ۱ استاندارد</h5>
                  <p class="text-[11px] text-stone-400">بدون مواد نگهدارنده و آفلاتوکسین</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Categories Strip -->
    <section class="py-12 bg-white border-y border-stone-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-xl font-bold text-stone-900 mb-8 text-center sm:text-right">دسته‌بندی‌های محبوب عطارباشی</h2>
        
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div onclick="filterShopCategory('خشکبار و مغزیجات')" class="p-6 rounded-2xl bg-stone-50 hover:bg-brand-50 border border-stone-100 hover:border-brand-200 cursor-pointer transition-all text-center group">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-amber-100/70 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
              <i data-lucide="nut" class="w-8 h-8"></i>
            </div>
            <h4 class="font-bold text-sm text-stone-800">خشکبار و مغزیجات</h4>
            <span class="text-[11px] text-stone-400">پسته، بادام، گردو، فندق</span>
          </div>

          <div onclick="filterShopCategory('زعفران و هل')" class="p-6 rounded-2xl bg-stone-50 hover:bg-brand-50 border border-stone-100 hover:border-brand-200 cursor-pointer transition-all text-center group">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-rose-100/70 text-rose-700 flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
              <i data-lucide="flower-2" class="w-8 h-8"></i>
            </div>
            <h4 class="font-bold text-sm text-stone-800">زعفران و هل</h4>
            <span class="text-[11px] text-stone-400">سوپر نگین قائنات و هل اکبر</span>
          </div>

          <div onclick="filterShopCategory('دمنوش و گیاهان دارویی')" class="p-6 rounded-2xl bg-stone-50 hover:bg-brand-50 border border-stone-100 hover:border-brand-200 cursor-pointer transition-all text-center group">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
              <i data-lucide="coffee" class="w-8 h-8"></i>
            </div>
            <h4 class="font-bold text-sm text-stone-800">دمنوش‌های ارگانیک</h4>
            <span class="text-[11px] text-stone-400">گل‌گاوزبان، بابونه، آویشن</span>
          </div>

          <div onclick="filterShopCategory('روغن‌ها و عرقیات')" class="p-6 rounded-2xl bg-stone-50 hover:bg-brand-50 border border-stone-100 hover:border-brand-200 cursor-pointer transition-all text-center group">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-indigo-100/70 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
              <i data-lucide="droplet" class="w-8 h-8"></i>
            </div>
            <h4 class="font-bold text-sm text-stone-800">روغن‌ها و عرقیات</h4>
            <span class="text-[11px] text-stone-400">روغن آرگان، سیاه‌دانه، گلاب</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
        <div>
          <span class="text-xs font-bold text-brand-amber uppercase tracking-wider">دستچین تازه</span>
          <h2 class="text-3xl font-black text-stone-900 mt-1">محصولات منتخب و پرفروش</h2>
        </div>
        <button onclick="navigate('shop')" class="text-sm font-bold text-brand-600 hover:text-brand-500 flex items-center gap-1">
          <span>مشاهده همه محصولات</span>
          <i data-lucide="chevron-left" class="w-4 h-4"></i>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${featured.map(product => renderProductCard(product)).join('')}
      </div>
    </section>

    <!-- Value Proposition Banner -->
    <section class="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-right">
          <div class="flex items-center gap-4 justify-center md:justify-start">
            <div class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-brand-gold">
              <i data-lucide="package-check" class="w-7 h-7"></i>
            </div>
            <div>
              <h4 class="font-bold text-base">بسته‌بندی زیپ‌کیپ وکیوم</h4>
              <p class="text-xs text-brand-100/80">حفظ ۱۰۰٪ تازگی، تردی و بوی عطر</p>
            </div>
          </div>
          <div class="flex items-center gap-4 justify-center md:justify-start">
            <div class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-brand-gold">
              <i data-lucide="badge-percent" class="w-7 h-7"></i>
            </div>
            <div>
              <h4 class="font-bold text-base">قیمت منصفانه و بی‌واسطه</h4>
              <p class="text-xs text-brand-100/80">ارتباط مستقیم با کشاورزان بومی</p>
            </div>
          </div>
          <div class="flex items-center gap-4 justify-center md:justify-start">
            <div class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-brand-gold">
              <i data-lucide="clock" class="w-7 h-7"></i>
            </div>
            <div>
              <h4 class="font-bold text-base">تحویل سریع ۲۴ تا ۴۸ ساعته</h4>
              <p class="text-xs text-brand-100/80">ارسال با پست پیشتاز و تیپاکس به سراسر ایران</p>
            </div>
          </div>
          <div class="flex items-center gap-4 justify-center md:justify-start">
            <div class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-brand-gold">
              <i data-lucide="phone-call" class="w-7 h-7"></i>
            </div>
            <div>
              <h4 class="font-bold text-base">مشاوره تخصصی عطاری</h4>
              <p class="text-xs text-brand-100/80">پاسخگویی به سوالات طبع و مزاج شناسی</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Blogs Section -->
    <section class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
        <div>
          <span class="text-xs font-bold text-brand-amber uppercase tracking-wider">دانشنامه سلامت</span>
          <h2 class="text-3xl font-black text-stone-900 mt-1">تازه‌ترین مقالات طب سنتی و تغذیه</h2>
        </div>
        <button onclick="navigate('blog')" class="text-sm font-bold text-brand-600 hover:text-brand-500 flex items-center gap-1">
          <span>مشاهده همه مقالات</span>
          <i data-lucide="chevron-left" class="w-4 h-4"></i>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${blogs.map(blog => renderBlogCard(blog)).join('')}
      </div>
    </section>
  `;
}

// ========================
// PAGE 2: SHOP PAGE
// ========================
function renderShopPage() {
  const categories = ['همه', 'خشکبار و مغزیجات', 'زعفران و هل', 'دمنوش و گیاهان دارویی', 'روغن‌ها و عرقیات'];
  
  const filteredProducts = state.selectedCategory === 'all' || state.selectedCategory === 'همه'
    ? state.products
    : state.products.filter(p => p.category === state.selectedCategory);

  return `
    <div class="bg-stone-100/60 py-10 border-b border-stone-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-black text-stone-900">فروشگاه عطارباشی</h1>
        <p class="text-sm text-stone-500 mt-1">مشاهده، بررسی و خرید آنلاین محصولات اصیل و تازه</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Filter and categories strip -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <!-- Categories tabs -->
        <div class="flex flex-wrap gap-2">
          ${categories.map(cat => `
            <button onclick="filterShopCategory('${cat}')" 
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                (state.selectedCategory === cat || (cat === 'همه' && state.selectedCategory === 'all'))
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }">
              ${cat}
            </button>
          `).join('')}
        </div>

        <!-- Counter info -->
        <div class="text-xs text-stone-500 font-medium">
          نمایش ${filteredProducts.length} محصول
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${filteredProducts.length > 0 
          ? filteredProducts.map(p => renderProductCard(p)).join('')
          : `<div class="col-span-full py-16 text-center text-stone-400">
               <i data-lucide="package-x" class="w-12 h-12 mx-auto mb-2 opacity-50"></i>
               محصولی در این دسته‌بندی یافت نشد.
             </div>`
        }
      </div>
    </div>
  `;
}

function filterShopCategory(cat) {
  state.selectedCategory = (cat === 'همه') ? 'all' : cat;
  navigate('shop');
}

// ========================
// PAGE 3: BLOG PAGE
// ========================
function renderBlogPage() {
  return `
    <div class="bg-stone-100/60 py-10 border-b border-stone-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-black text-stone-900">مجله تندرستی و عطاری</h1>
        <p class="text-sm text-stone-500 mt-1">آموزش‌ها و مقالات علمی درباره گیاهان دارویی، تغذیه سالم و رازهای طب سنتی</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${state.blogs.map(blog => renderBlogCard(blog)).join('')}
      </div>
    </div>
  `;
}

function renderBlogDetailPage(blogId) {
  const blog = state.blogs.find(b => b.id === Number(blogId)) || state.blogs[0];
  return `
    <article class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <button onclick="navigate('blog')" class="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-500 mb-6">
        <i data-lucide="arrow-right" class="w-4 h-4"></i>
        <span>بازگشت به مجله مقالات</span>
      </button>

      <span class="inline-block px-3 py-1 bg-brand-100 text-brand-700 text-xs font-bold rounded-full mb-4">${blog.category}</span>
      <h1 class="text-3xl sm:text-4xl font-black text-stone-900 leading-tight mb-4">${blog.title}</h1>
      
      <div class="flex items-center gap-4 text-xs text-stone-400 pb-8 border-b border-stone-200 mb-8">
        <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${blog.date}</span>
        <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i> زمان مطالعه: ${blog.readTime}</span>
      </div>

      <div class="rounded-3xl overflow-hidden shadow-xl mb-10">
        <img src="${blog.image}" alt="${blog.title}" class="w-full h-[400px] object-cover">
      </div>

      <div class="prose prose-stone max-w-none text-stone-700 leading-loose text-base space-y-6">
        <p class="text-lg font-medium text-stone-900 leading-relaxed bg-brand-50/60 p-6 rounded-2xl border-r-4 border-brand-500">
          ${blog.excerpt}
        </p>
        <p>${blog.content}</p>
        <p>
          گیاهان دارویی از گذشته‌های دور رکن اصلی درمان و تندرستی نیاکان ما بوده‌اند. با شناخت دقیق مزاج و استفاده از محصولات خالص و باکیفیت می‌توانید سلامتی پایدار را به جسم و روان خود هدیه دهید. تمام محصولات ذکر شده در این مقاله را می‌توانید با بالاترین خلوص از عطارباشی تهیه کنید.
        </p>
      </div>

      <div class="mt-12 p-6 bg-stone-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 class="font-bold text-stone-900">سوالی در مورد این مقاله یا گیاه دارویی دارید؟</h4>
          <p class="text-xs text-stone-500">کارشناسان عطارباشی آماده پاسخگویی و مشاوره رایگان به شما هستند.</p>
        </div>
        <button onclick="navigate('shop')" class="px-5 py-2.5 bg-brand-600 text-white text-xs font-bold rounded-xl shadow-md">
          خرید گیاهان این مقاله
        </button>
      </div>
    </article>
  `;
}

// ========================
// PAGE 4: ADMIN DASHBOARD
// ========================
function renderAdminPage() {
  const totalStock = state.products.reduce((acc, p) => acc + p.stock, 0);
  const totalValue = state.products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  return `
    <div class="bg-stone-900 text-white py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span class="text-xs text-stone-400 font-medium">سیستم مدیریت محتوا و فروشگاه</span>
          </div>
          <h1 class="text-2xl font-black text-white mt-1">پیشخوان مدیریت عطارباشی</h1>
        </div>
        <button onclick="openAddProductModal()" class="px-5 py-2.5 bg-brand-gold hover:bg-amber-400 text-stone-900 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>افزودن محصول جدید</span>
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <!-- KPI Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <i data-lucide="boxes" class="w-6 h-6"></i>
          </div>
          <div>
            <span class="text-xs text-stone-400 font-medium">تنوع محصولات</span>
            <h3 class="text-2xl font-black text-stone-900 mt-0.5">${state.products.length} قلم</h3>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-amber-50 text-brand-amber flex items-center justify-center">
            <i data-lucide="archive" class="w-6 h-6"></i>
          </div>
          <div>
            <span class="text-xs text-stone-400 font-medium">کل موجودی انبار</span>
            <h3 class="text-2xl font-black text-stone-900 mt-0.5">${totalStock} واحد</h3>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <i data-lucide="coins" class="w-6 h-6"></i>
          </div>
          <div>
            <span class="text-xs text-stone-400 font-medium">ارزش موجودی کالا</span>
            <h3 class="text-xl font-black text-stone-900 mt-0.5">${formatPrice(totalValue)}</h3>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <i data-lucide="file-text" class="w-6 h-6"></i>
          </div>
          <div>
            <span class="text-xs text-stone-400 font-medium">تعداد مقالات منتشر شده</span>
            <h3 class="text-2xl font-black text-stone-900 mt-0.5">${state.blogs.length} مقاله</h3>
          </div>
        </div>
      </div>

      <!-- Products Management Table -->
      <div class="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 class="text-lg font-bold text-stone-900">لیست محصولات و انبارداری</h2>
          <span class="text-xs text-stone-400">امکان ویرایش و حذف آنی</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-right text-xs">
            <thead class="bg-stone-50 text-stone-500 font-bold border-b border-stone-200">
              <tr>
                <th class="p-4">تصویر</th>
                <th class="p-4">عنوان محصول</th>
                <th class="p-4">دسته‌بندی</th>
                <th class="p-4">قیمت واحد</th>
                <th class="p-4">موجودی انبار</th>
                <th class="p-4 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-100">
              ${state.products.map(p => `
                <tr class="hover:bg-stone-50/70 transition-colors">
                  <td class="p-4">
                    <img src="${p.image}" class="w-12 h-12 object-cover rounded-xl border border-stone-200">
                  </td>
                  <td class="p-4 font-bold text-stone-900">${p.title}</td>
                  <td class="p-4">
                    <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700">${p.category}</span>
                  </td>
                  <td class="p-4 font-bold text-brand-600">${formatPrice(p.price)}</td>
                  <td class="p-4">
                    <span class="font-bold ${p.stock < 10 ? 'text-rose-600' : 'text-stone-700'}">${p.stock} ${p.unit}</span>
                  </td>
                  <td class="p-4 text-center">
                    <button onclick="deleteProduct(${p.id})" class="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="حذف کالا">
                      <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <!-- ADD PRODUCT MODAL -->
    <div id="addProductModal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onclick="closeAddProductModal()"></div>
      <div class="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 overflow-hidden">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
          <h3 class="font-bold text-base text-stone-900">تعریف محصول جدید عطاری و خشکبار</h3>
          <button onclick="closeAddProductModal()" class="text-stone-400 hover:text-stone-700"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>

        <form id="addProductForm" onsubmit="handleCreateProduct(event)" class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-stone-700 mb-1">نام محصول</label>
            <input type="text" id="newTitle" required placeholder="مثال: فندق دستچین طارم" class="w-full p-3 rounded-xl border border-stone-200 focus:border-brand-500 focus:outline-none">
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-stone-700 mb-1">دسته‌بندی</label>
              <select id="newCategory" class="w-full p-3 rounded-xl border border-stone-200 focus:border-brand-500 focus:outline-none">
                <option value="خشکبار و مغزیجات">خشکبار و مغزیجات</option>
                <option value="زعفران و هل">زعفران و هل</option>
                <option value="دمنوش و گیاهان دارویی">دمنوش و گیاهان دارویی</option>
                <option value="روغن‌ها و عرقیات">روغن‌ها و عرقیات</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-stone-700 mb-1">واحد اندازه‌گیری</label>
              <input type="text" id="newUnit" required placeholder="مثال: کیلوگرم یا بسته" class="w-full p-3 rounded-xl border border-stone-200 focus:border-brand-500 focus:outline-none">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-stone-700 mb-1">قیمت (تومان)</label>
              <input type="number" id="newPrice" required placeholder="450000" class="w-full p-3 rounded-xl border border-stone-200 focus:border-brand-500 focus:outline-none">
            </div>
            <div>
              <label class="block font-bold text-stone-700 mb-1">موجودی اولیه</label>
              <input type="number" id="newStock" required placeholder="30" class="w-full p-3 rounded-xl border border-stone-200 focus:border-brand-500 focus:outline-none">
            </div>
          </div>

          <div>
            <label class="block font-bold text-stone-700 mb-1">آدرس عکس اینترنتی (Image URL)</label>
            <input type="url" id="newImage" required placeholder="https://images.unsplash.com/..." value="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80" class="w-full p-3 rounded-xl border border-stone-200 focus:border-brand-500 focus:outline-none">
          </div>

          <div>
            <label class="block font-bold text-stone-700 mb-1">توضیحات مختصر و خواص</label>
            <textarea id="newDesc" rows="2" placeholder="توضیح کیفیت، محل برداشت و خواص گیاهی..." class="w-full p-3 rounded-xl border border-stone-200 focus:border-brand-500 focus:outline-none"></textarea>
          </div>

          <div class="pt-2">
            <button type="submit" class="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-lg transition-all">
              ثبت و انتشار محصول در فروشگاه
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

// ========================
// PAGE 5: ABOUT PAGE
// ========================
function renderAboutPage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div class="text-center space-y-4 mb-12">
        <span class="text-xs font-bold text-brand-amber">داستان ما</span>
        <h1 class="text-3xl sm:text-4xl font-black text-stone-900">سفر از دل باغات تا خانه شما</h1>
        <p class="text-stone-500 text-sm max-w-xl mx-auto">
          عطارباشی با بیش از دو دهه تجربه خانواده در زمینه کشت و عرضه خشکبار اصیل ایرانی، پلی میان کیفیت بی‌پیرایه روستا و سفره خانواده‌های ایرانی است.
        </p>
      </div>

      <div class="rounded-3xl overflow-hidden shadow-2xl mb-12">
        <img src="https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=80" class="w-full h-80 object-cover" alt="باغ پسته و کشاورزی">
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
          <div class="w-12 h-12 bg-brand-50 rounded-xl text-brand-600 flex items-center justify-center mx-auto mb-3">
            <i data-lucide="check-check" class="w-6 h-6"></i>
          </div>
          <h3 class="font-bold text-sm text-stone-900">تست آزمایشگاهی</h3>
          <p class="text-xs text-stone-500 mt-1">تست عدم استفاده از سموم غیرمجاز و کنترل آفلاتوکسین مغزیجات.</p>
        </div>
        <div class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
          <div class="w-12 h-12 bg-brand-50 rounded-xl text-brand-600 flex items-center justify-center mx-auto mb-3">
            <i data-lucide="heart-handshake" class="w-6 h-6"></i>
          </div>
          <h3 class="font-bold text-sm text-stone-900">حمایت از کشاورز بومی</h3>
          <p class="text-xs text-stone-500 mt-1">خرید نقدی و مستقیم با بالاترین نرخ از کشاورزان زحمتکش محلی.</p>
        </div>
        <div class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
          <div class="w-12 h-12 bg-brand-50 rounded-xl text-brand-600 flex items-center justify-center mx-auto mb-3">
            <i data-lucide="sparkles" class="w-6 h-6"></i>
          </div>
          <h3 class="font-bold text-sm text-stone-900">بسته‌بندی پاک و بهداشتی</h3>
          <p class="text-xs text-stone-500 mt-1">ظروف دوستدار محیط زیست با ماندگاری حداکثری طعم و عطر گیاهان.</p>
        </div>
      </div>
    </div>
  `;
}

// Component: Product Card
function renderProductCard(product) {
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
            <span class="text-sm font-black text-brand-600">${formatPrice(product.price)}</span>
            <span class="text-[10px] text-stone-400 block">هر ${product.unit}</span>
          </div>

          <button onclick="state.addToCart(${product.id})" class="p-2.5 rounded-xl bg-brand-50 hover:bg-brand-600 text-brand-600 hover:text-white transition-all shadow-sm" title="افزودن به سبد خرید">
            <i data-lucide="shopping-bag" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Component: Blog Card
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

// ========================
// Cart Drawer & Modals UI
// ========================
function toggleCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  drawer.classList.toggle('hidden');
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById('cartBadge');
  const count = state.getCartCount();
  if (badge) badge.innerText = count;

  const list = document.getElementById('cartItemsList');
  const total = document.getElementById('cartTotalPrice');

  if (total) total.innerText = formatPrice(state.getCartTotal());

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
        <span class="text-[11px] font-bold text-brand-600">${formatPrice(item.price)}</span>
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

function checkoutCart() {
  if (state.cart.length === 0) {
    alert("سبد خرید شما خالی است!");
    return;
  }
  alert("سفارش شما با موفقیت ثبت شد! به درگاه پرداخت آزمایشی منتقل می‌شوید.");
  state.cart = [];
  state.saveCart();
  toggleCartDrawer();
}

// Search Modal
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
      <span class="text-xs font-bold text-brand-600">${formatPrice(p.price)}</span>
    </div>
  `).join('');
}

// Admin Modal Actions
function openAddProductModal() {
  document.getElementById('addProductModal').classList.remove('hidden');
}

function closeAddProductModal() {
  document.getElementById('addProductModal').classList.add('hidden');
}

function handleCreateProduct(e) {
  e.preventDefault();
  const title = document.getElementById('newTitle').value;
  const category = document.getElementById('newCategory').value;
  const unit = document.getElementById('newUnit').value;
  const price = Number(document.getElementById('newPrice').value);
  const stock = Number(document.getElementById('newStock').value);
  const image = document.getElementById('newImage').value;
  const description = document.getElementById('newDesc').value;

  const newProd = {
    id: Date.now(),
    title,
    category,
    unit,
    price,
    oldPrice: null,
    stock,
    rating: 5.0,
    reviewsCount: 1,
    image,
    badge: "جدید",
    description: description || "محصول تازه و ارگانیک اعلا"
  };

  state.products.unshift(newProd);
  state.saveProducts();
  closeAddProductModal();
  showToast(`محصول «${title}» با موفقیت افزوده شد`);
  navigate('admin');
}

function deleteProduct(id) {
  if (confirm("آیا از حذف این محصول از فروشگاه مطمئن هستید؟")) {
    state.products = state.products.filter(p => p.id !== id);
    state.saveProducts();
    navigate('admin');
    showToast("محصول با موفقیت حذف گردید.");
  }
}

// Global App Initialization
window.addEventListener('DOMContentLoaded', () => {
  navigate('home');
  updateCartUI();
});

