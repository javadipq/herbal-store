// ========================================================
// Attarbashi Central Data Layer & Store Management (LocalStorage)
// ========================================================

const DEFAULT_PRODUCTS = [
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

const DEFAULT_ORDERS = [
  {
    id: "ATB-98421",
    customerName: "سارا محمدی",
    phone: "09121112233",
    province: "تهران",
    city: "تهران",
    address: "خیابان شریعتی، بالاتر از پل رومی، پلاک ۴۲، واحد ۳",
    date: "۱۴۰۳/۰۷/۲۲ - ۱۶:۴۰",
    status: "delivered", // processing, shipped, delivered, cancelled
    paymentMethod: "online", // online, cod, card_to_card
    paymentStatus: "paid",
    trackingCode: "TRK-49204820",
    discountAmount: 141000,
    couponCode: "NOWRUZ",
    subtotal: 940000,
    shippingFee: 0,
    total: 799000,
    items: [
      { id: 1, title: "پسته اکبری اعلا رفسنجان (دستچین خام)", price: 940000, quantity: 1, unit: "کیلوگرم" }
    ]
  },
  {
    id: "ATB-98315",
    customerName: "علیرضا رضایی",
    phone: "09358887766",
    province: "اصفهان",
    city: "اصفهان",
    address: "خیابان نظر میانی، کوچه کلیسا، مجتمع مهر، طبقه دوم",
    date: "۱۴۰۳/۰۷/۲۳ - ۱۱:۱۵",
    status: "shipped",
    paymentMethod: "card_to_card",
    paymentStatus: "paid",
    trackingCode: "TRK-88192039",
    discountAmount: 0,
    couponCode: null,
    subtotal: 875000,
    shippingFee: 0,
    total: 875000,
    items: [
      { id: 2, title: "زعفران سوپر نگین اعلا صادراتی قائنات", price: 380000, quantity: 1, unit: "یک مثقال" },
      { id: 7, title: "هل اکبر بنفش امپریال درجه یک", price: 495000, quantity: 1, unit: "بسته ۱۰۰ گرمی" }
    ]
  },
  {
    id: "ATB-98104",
    customerName: "مهدی کاظمی",
    phone: "09153334455",
    province: "خراسان رضوی",
    city: "مشهد",
    address: "بلوار سجاد، خیابان بهار، پلاک ۱۵",
    date: "۱۴۰۳/۰۷/۲۴ - ۲۰:۰۵",
    status: "processing",
    paymentMethod: "cod",
    paymentStatus: "pending",
    trackingCode: "TRK-77102934",
    discountAmount: 38000,
    couponCode: "ATTAR10",
    subtotal: 380000,
    shippingFee: 45000,
    total: 387000,
    items: [
      { id: 2, title: "زعفران سوپر نگین اعلا صادراتی قائنات", price: 380000, quantity: 1, unit: "یک مثقال" }
    ]
  }
];

const DEFAULT_COUPONS = [
  { code: "NOWRUZ", type: "percent", value: 15, maxDiscount: 150000, minCart: 500000, title: "جشنواره عیدانه (۱۵٪ تخفیف)" },
  { code: "ATTAR10", type: "percent", value: 10, maxDiscount: 80000, minCart: 200000, title: "تخفیف ویژه مشتریان وفادار (۱۰٪)" },
  { code: "TABESTAN", type: "fixed", value: 50000, minCart: 400000, title: "هدیه خرید تابستانه (۵۰ هزار تومان)" }
];

const StoreDB = {
  // Products
  getProducts() {
    const raw = localStorage.getItem('attar_products');
    if (!raw) {
      this.saveProducts(DEFAULT_PRODUCTS);
      return DEFAULT_PRODUCTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_PRODUCTS;
    }
  },

  saveProducts(products) {
    localStorage.setItem('attar_products', JSON.stringify(products));
    window.dispatchEvent(new CustomEvent('attar_products_updated'));
  },

  addProduct(product) {
    const prods = this.getProducts();
    prods.unshift(product);
    this.saveProducts(prods);
  },

  updateProduct(id, updates) {
    const prods = this.getProducts().map(p => p.id === id ? { ...p, ...updates } : p);
    this.saveProducts(prods);
  },

  deleteProduct(id) {
    const prods = this.getProducts().filter(p => p.id !== id);
    this.saveProducts(prods);
  },

  // Orders
  getOrders() {
    const raw = localStorage.getItem('attar_orders');
    if (!raw) {
      this.saveOrders(DEFAULT_ORDERS);
      return DEFAULT_ORDERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_ORDERS;
    }
  },

  saveOrders(orders) {
    localStorage.setItem('attar_orders', JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('attar_orders_updated'));
  },

  addOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    this.saveOrders(orders);
    return order;
  },

  updateOrderStatus(orderId, newStatus) {
    const orders = this.getOrders().map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    this.saveOrders(orders);
  },

  // Coupons
  getCoupons() {
    const raw = localStorage.getItem('attar_coupons');
    if (!raw) {
      this.saveCoupons(DEFAULT_COUPONS);
      return DEFAULT_COUPONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_COUPONS;
    }
  },

  saveCoupons(coupons) {
    localStorage.setItem('attar_coupons', JSON.stringify(coupons));
  },

  addCoupon(coupon) {
    const coupons = this.getCoupons();
    coupons.unshift(coupon);
    this.saveCoupons(coupons);
  },

  deleteCoupon(code) {
    const coupons = this.getCoupons().filter(c => c.code !== code);
    this.saveCoupons(coupons);
  },

  validateCoupon(code, subtotal) {
    if (!code) return { valid: false, message: "کد تخفیف وارد نشده است" };
    const coupons = this.getCoupons();
    const coupon = coupons.find(c => c.code.trim().toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      return { valid: false, message: "کد تخفیف وارد شده نامعتبر است" };
    }
    if (coupon.minCart && subtotal < coupon.minCart) {
      return { 
        valid: false, 
        message: `حداقل مبلغ خرید برای این کد تخفیف ${StoreDB.formatPrice(coupon.minCart)} می‌باشد.` 
      };
    }
    let discount = 0;
    if (coupon.type === 'percent') {
      discount = Math.round((subtotal * coupon.value) / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.value;
    }
    if (discount > subtotal) discount = subtotal;

    return {
      valid: true,
      coupon,
      discountAmount: discount,
      message: `کد تخفیف اعمال شد (${coupon.title})`
    };
  },

  // User Auth (SMS OTP simulation)
  getCurrentUser() {
    const raw = localStorage.getItem('attar_current_user');
    return raw ? JSON.parse(raw) : null;
  },

  setCurrentUser(user) {
    localStorage.setItem('attar_current_user', JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('attar_user_changed'));
  },

  logoutUser() {
    localStorage.removeItem('attar_current_user');
    window.dispatchEvent(new CustomEvent('attar_user_changed'));
  },

  // Admin Auth
  isAdminLoggedIn() {
    return localStorage.getItem('attar_admin_logged_in') === 'true';
  },

  loginAdmin(username, password) {
    if (username.trim() === 'admin' && password.trim() === 'admin123') {
      localStorage.setItem('attar_admin_logged_in', 'true');
      return true;
    }
    return false;
  },

  logoutAdmin() {
    localStorage.removeItem('attar_admin_logged_in');
  },

  // Reset to default demo data
  resetToDefaults() {
    localStorage.setItem('attar_products', JSON.stringify(DEFAULT_PRODUCTS));
    localStorage.setItem('attar_orders', JSON.stringify(DEFAULT_ORDERS));
    localStorage.setItem('attar_coupons', JSON.stringify(DEFAULT_COUPONS));
    localStorage.removeItem('attar_cart');
    window.dispatchEvent(new CustomEvent('attar_data_reset'));
  },

  // Formatting helpers
  formatPrice(num) {
    if (num === null || num === undefined) return '۰ تومان';
    return new Intl.NumberFormat('fa-IR').format(num) + ' تومان';
  },

  getPersianDate() {
    const now = new Date();
    try {
      return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(now);
    } catch {
      return "۱۴۰۳/۰۷/۲۵ - ۱۲:۰۰";
    }
  }
};

window.StoreDB = StoreDB;

