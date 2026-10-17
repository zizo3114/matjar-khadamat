# Ekhdemli — منصة الخدمات والمنتجات الرقمية

منصة جزائرية متكاملة للسوق متعدد البائعين (Multi-vendor Marketplace) تتيح للبائعين نشر خدماتهم ومنتجاتهم الرقمية، وللمشترين تصفحها وطلبها بأمان عبر نظام الضمان (Escrow) والدفع المحلي عبر Chargily Pay (Edahabia & CIB).

---

## المحتويات

- [نظرة عامة](#نظرة-عامة)
- [الميزات الرئيسية](#الميزات-الرئيسية)
- [التقنيات المستخدمة](#التقنيات-المستخدمة)
- [هيكل المشروع](#هيكل-المشروع)
- [المتطلبات](#المتطلبات)
- [التشغيل على حاسوبك (Windows)](#التشغيل-على-حاسوبك-windows)
- [التشغيل على خادم (Server) وربطه بدومين](#التشغيل-على-خادم-server-وربطه-بدومين)
- [متغيرات البيئة](#متغيرات-البيئة)
- [قاعدة البيانات](#قاعدة-البيانات)
- [الدفع عبر Chargily](#الدفع-عبر-chargily)
- [نظام الضمان (Escrow)](#نظام-الضمان-escrow)
- [نظام التقييمات والمراجعات](#نظام-التقييمات-والمراجعات)
- [تخزين الصور والملفات (Storage)](#تخزين-الصور-والملفات-storage)
- [كيف تنشئ Supabase خاص بك من الصفر](#كيف-تنشئ-supabase-خاص-بك-من-الصفر)
- [قائمة التحقق قبل الإطلاق](#قائمة-التحقق-قبل-الإطلاق)
- [دليل هيكل المجلدات (ماذا يفعل كل مجلد؟)](#دليل-هيكل-المجلدات-ماذا-يفعل-كل-مجلد)
- [الأمان](#الأمان)
- [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## نظرة عامة

Ekhdemli هي منصة تجمع البائعين والمشترين في سوق رقمي واحد:

**للبائعين (Sellers):**
- إنشاء حساب وبدء البيع مجاناً
- نشر خدمات رقمية في 7 تصنيفات معتمدة
- نشر منتجات رقمية في 6 تصنيفات معتمدة
- تحديد الأسعار، مدة التسليم، والمخزون
- لوحة تحكم لإدارة الإعلانات والطلبات
- استلام الأرباح بعد تأكيد التسليم عبر الضمان
- نظام اشتراكات (مجاني، أساسي، احترافي)

**للمشترين (Buyers):**
- تصفح الخدمات والمنتجات حسب التصنيف والسعر والتقييم
- طلب الخدمات أو شراء المنتجات بأمان
- الدفع عبر Chargily (Edahabia & CIB)
- نظام ضمان: أموالك محجوزة حتى يتم تسليم العمل
- مراجعة وتقييم البائعين بعد إتمام الطلب
- تبادل الرسائل مع البائعين

**للإدارة (Admin):**
- لوحة تحكم كاملة لإدارة المنصة
- مراجعة الطلبات في الضمان وتأكيدها أو رفضها
- إدارة الأعضاء والصلاحيات
- الاطلاع على جميع المحادثات
- متابعة كل الطلبات وحالاتها

---

## الميزات الرئيسية

### سوق الخدمات (`/services`)

7 تصنيفات معتمدة للخدمات الرقمية:

| التصنيف | أمثلة |
|---------|-------|
| تصميم | شعار، هوية بصرية، UI/UX، سوشيال ميديا، مطبوعات |
| تعليق صوتي و Audio | تعليق عربي/فرنسي، تحرير بودكاست، موسيقى |
| تصميم وتطوير المواقع | تصميم موقع، تطوير واجهات، متاجر إلكترونية |
| مونتاج فيديو | مونتاج، موشن جرافيك، ريلز، إعلانات |
| كتابة وترجمة | كتابة إعلانية، محتوى، ترجمة، تدقيق |
| إدارة سوشيال ميديا | إدارة حسابات، تصميم منشورات، استراتيجية |
| SEO وتسويق | تحسين محركات البحث، تسويق رقمي، حملات |

### سوق المنتجات (`/products`)

6 تصنيفات معتمدة للمنتجات الرقمية:

| التصنيف | أمثلة |
|---------|-------|
| اشتراكات | Netflix، Spotify، YouTube Premium |
| قوالب مواقع جاهزة | HTML/CSS، WordPress، React، Shopify |
| ألعاب ومفاتيح | مفاتيح Steam، Epic Games، بطاقات هدايا |
| حسابات رقمية | حسابات أدوات، منصات، تواصل |
| برامج وتراخيص | مفاتيح تفعيل، تراخيص، أدوات احترافية |
| كتب ودورات | كتب إلكترونية، دورات فيديو، أدلة PDF |

### بطاقات العرض

كل بطاقة خدمة أو منتج تعرض:
- اسم البائع + صورته
- عنوان الخدمة/المنتج + وصف مختصر
- السعر (يبدأ من)
- شارة التصنيف
- تقييم نجوم + عدد المراجعات
- مؤشر التوفر (للمنتجات)
- زر "عرض التفاصيل" أو "شراء الآن"

### تصفية وبحث

- بحث نصي في العنوان والوصف
- تصفية حسب التصنيف والتصنيف الفرعي
- تصفية حسب نطاق السعر
- تصفية حسب الحد الأدنى للتقييم (3+، 4+، 4.5+)
- حالة فارغة عند عدم وجود نتائج

---

## التقنيات المستخدمة

| التقنية | الاستخدام |
|---------|-----------|
| **React 19** | واجهة المستخدم |
| **Vite 7** | أداة البناء والتطوير |
| **TypeScript** | لغة البرمجة |
| **Tailwind CSS v4** | التصميم |
| **shadcn/ui (Radix UI)** | مكتبة المكونات |
| **Supabase** | قاعدة البيانات + المصادقة + التخزين + Edge Functions |
| **Chargily Pay** | بوابة الدفع (Edahabia & CIB) |
| **React Router v7** | التنقل بين الصفحات |
| **Recharts** | الرسوم البيانية |
| **React Hook Form + Zod** | النماذج والتحقق |

---

## هيكل المشروع

```
project/
├── src/
│   ├── App.tsx                        # التطبيق الرئيسي + المسارات
│   ├── main.tsx                       # نقطة الدخول
│   ├── index.css                      # ألوان وتصميم Tailwind
│   ├── components/
│   │   ├── ui/                        # مكونات shadcn/ui
│   │   ├── marketplace-layout.tsx     # شريط التنقل + التذييل
│   │   ├── listing-card.tsx           # بطاقة خدمة/منتج
│   │   ├── category-icon.tsx          # أيقونات التصنيفات
│   │   ├── rating-stars.tsx           # نجوم التقييم
│   │   ├── admin-route.tsx            # حماية مسار الإدارة
│   │   ├── route-guards.tsx           # حماية المسارات
│   │   ├── mode-toggle.tsx            # زر الوضع الليلي/النهاري
│   │   └── theme-provider.tsx         # مزود السمة
│   ├── contexts/
│   │   └── auth-context.tsx           # سياق المصادقة
│   ├── lib/
│   │   ├── supabase.ts                # عميل Supabase + دوال مساعدة
│   │   ├── marketplace.ts             # التصنيفات + دوال جلب الإعلانات
│   │   ├── utils.ts                   # دوال مساعدة عامة
│   │   ├── use-seo-meta.ts            # تحديث وسوم SEO
│   │   └── sitemap.ts                 # مولد الخريطة الموقعية
│   └── pages/
│       ├── home.tsx                   # الصفحة الرئيسية
│       ├── browse-services.tsx        # تصفح الخدمات
│       ├── browse-products.tsx        # تصفح المنتجات
│       ├── service-detail.tsx         # تفاصيل الخدمة
│       ├── product-detail.tsx         # تفاصيل المنتج
│       ├── seller-profile.tsx         # الملف العام للبائع
│       ├── login.tsx                  # تسجيل الدخول
│       ├── register.tsx               # إنشاء حساب
│       ├── seller-dashboard.tsx       # لوحة تحكم البائع
│       ├── publish-service.tsx        # نشر خدمة جديدة
│       ├── publish-product.tsx        # نشر منتج جديد
│       ├── my-orders.tsx              # طلباتي
│       ├── messages.tsx               # الرسائل
│       ├── admin.tsx                  # لوحة الإدارة
│       ├── pricing.tsx                # صفحة الاشتراكات
│       ├── edit-profile.tsx           # تعديل الملف الشخصي
│       ├── payment-success.tsx        # نجاح الدفع
│       └── payment-failed.tsx         # فشل الدفع
├── supabase/
│   ├── config.toml                    # إعدادات Edge Functions
│   ├── setup_database.sql             # ★ ملف موحد: كل الجداول بضغطة زر
│   ├── migrations/                    # هجرات قاعدة البيانات (منفصلة)
│   └── functions/
│       ├── chargily-checkout/         # إنشاء جلسة دفع
│       └── chargily-webhook/          # استقبال إشعارات الدفع
├── public/
│   ├── hero-bg.webp                   # صورة الخلفية
│   ├── robots.txt                     # توجيه محركات البحث
│   └── _redirects                     # توجيه مسارات Netlify (لا تلمسه)
├── index.html                         # وسوم SEO و Open Graph
├── vite.config.ts                     # إعدادات البناء + تقسيم الكود
└── package.json
```

### مسارات التطبيق

| المسار | الصفحة | الصلاحية |
|--------|--------|----------|
| `/` | الصفحة الرئيسية | عام |
| `/services` | تصفح الخدمات | عام |
| `/products` | تصفح المنتجات | عام |
| `/services/:id` | تفاصيل الخدمة | عام |
| `/products/:id` | تفاصيل المنتج | عام |
| `/seller/:id` | الملف العام للبائع | عام |
| `/pricing` | الاشتراكات | عام |
| `/login` | تسجيل الدخول | زوار فقط |
| `/register` | إنشاء حساب | زوار فقط |
| `/dashboard` | لوحة البائع | مسجلون |
| `/dashboard/profile` | تعديل الملف | مسجلون |
| `/publish-service` | نشر خدمة | مسجلون |
| `/publish-product` | نشر منتج | مسجلون |
| `/my-orders` | طلباتي | مسجلون |
| `/messages` | الرسائل | مسجلون |
| `/admin` | لوحة الإدارة | الإدارة فقط |

---

## المتطلبات

- **Node.js** إصدار 18 أو أحدث (يُفضّل 20+) — [تحميل](https://nodejs.org)
- **npm** (يأتي مع Node.js)
- حساب **Supabase** — [supabase.com](https://supabase.com)
- حساب **Chargily Pay** — [epay.chargily.com](https://epay.chargily.com)

---

## التشغيل على حاسوبك (Windows)

### الخطوة 1: تثبيت Node.js

1. اذهب إلى [nodejs.org](https://nodejs.org)
2. حمّل نسخة LTS (الأكثر استقراراً)
3. شغّل المُثبّت واتبع الخطوات (Next → Next → Install)
4. للتأكد من التثبيت، افتح **Command Prompt** أو **PowerShell** واكتب:
   ```
   node --version
   npm --version
   ```
   يجب أن ترى أرقام إصدارات.

### الخطوة 2: تحميل المشروع

إذا كان المشروع في ملف مضغوط (ZIP):
1. افك الضغط في مجلد، مثلاً: `C:\ekhdemli`
2. افتح **Command Prompt** في هذا المجلد (اكتب `cmd` في شريط العنوان في مستكشف Windows واضغط Enter)

أو إذا كان على GitHub:
```
git clone https://github.com/your-username/ekhdemli.git
cd ekhdemli
```

### الخطوة 3: تثبيت الحزم

في موجه الأوامر، اكتب:
```
npm install
```

هذا سيُحمّل كل المكتبات المطلوبة. قد يستغرق دقيقتين تقريباً.

### الخطوة 4: إعداد ملف البيئة

ملف `.env` موجود ومُعبأ مسبقاً ببيانات Supabase. إذا أردت ربط مشروع Supabase خاص بك، استبدل القيم:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

تجد هذه القيم في لوحة تحكم Supabase: **Project Settings → API**.

### الخطوة 5: تشغيل الموقع محلياً

```
npm run dev
```

الموقع سيعمل على `http://localhost:5173`. افتح هذا الرابط في متصفحك.

> الموقع سيُعاد تحميله تلقائياً عند كل تعديل في الكود.

### الخطوة 6: بناء المشروع للإنتاج (اختياري)

```
npm run build
```

الملفات الجاهزة للنشر ستكون في مجلد `dist/`.

لمعاينة البناء محلياً:
```
npm run preview
```

---

## التشغيل على خادم (Server) وربطه بدومين

### نظرة عامة

الموقع يتكون من جزأين:

1. **الواجهة الأمامية (Frontend)**: ملفات ثابتة (HTML/CSS/JS) ننتجها عبر `npm run build` — تُرفع على أي خادم ويب.

2. **الخلفية (Backend)**: قاعدة بيانات Supabase + Edge Functions — تعمل على خوادم Supabase السحابية، لا تحتاج لإعداد خادم خاص.

> **ملاحظة مهمة:** Supabase يعمل في السحابة (Cloud) ولا تحتاج لتثبيته على خادمك. فقط الواجهة الأمامية تحتاج لخادم.

### الطريقة الأولى: النشر على Vercel (الأسهل والمجاني)

#### 1. أنشئ حساب على Vercel

اذهب إلى [vercel.com](https://vercel.com) وسجّل حساباً (يمكنك التسجيل بـ GitHub).

#### 2. ارفع المشروع إلى GitHub

```
git init
git add .
git commit -m "Ekhdemli marketplace"
git branch -M main
git remote add origin https://github.com/your-username/ekhdemli.git
git push -u origin main
```

#### 3. اربط Vercel بـ GitHub

1. في لوحة Vercel، اضغط **New Project**
2. اختر مستودع المشروع من GitHub
3. أضف متغيرات البيئة:
   - `VITE_SUPABASE_URL` = رابط Supabase
   - `VITE_SUPABASE_ANON_KEY` = مفتاح Supabase العام
4. اضغط **Deploy**

Vercel سيبني المشروع تلقائياً ويعطيك رابطاً مثل `ekhdemli.vercel.app`.

#### 4. اربط دومين خاص

1. في لوحة Vercel → **Settings → Domains**
2. أضف دومينك، مثلاً `ekhdemli.dz`
3. في لوحة تحكم دومينك، وجّه DNS:
   - **Type:** CNAME
   - **Name:** @ أو www
   - **Value:** cname.vercel-dns.com

### الطريقة الثانية: النشر على Netlify (موصى بها — الأسهل والمجاني)

> **لماذا Netlify؟** بعد دراسة البدائل، تم اختيار Netlify نظراً لسهولتها الكبيرة في استضافة مواقع تطبيقات الصفحة الواحدة (Single Page Applications) المبنية بـ Vite و React، فضلاً عن توفيرها خطة مجانية ممتازة ومستقرة.

> **ملف إعادة التوجيه جاهز مسبقاً:** الملف `public/_redirects` موجود في المشروع ويحتوي على السطر `/* /index.html 200` — هذا يضمن أن جميع المسارات (مثل `/login` و `/services`) تعمل بدون خطأ 404 عند تحديث الصفحة. بدون هذا الملف، عند تحديث صفحة مثل `/login` سيظهر خطأ 404 الشهير. الملف جاهز ولا تحتاج لإضافته.

#### الطريقة أ: عبر موقع Netlify (بدون تثبيت أي شيء)

1. اذهب إلى [netlify.com](https://app.netlify.com) وسجّل حساباً (يمكنك التسجيل بـ GitHub)
2. اضغط **Add new site** ← **Import an existing project**
3. اربط مستودع GitHub الخاص بالمشروع
4. اضبط الإعدادات:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. **قبل الضغط على Deploy، اضغط "Show advanced" أو "Environment variables"**
6. أضف متغيرين:
   - **المتغير الأول:** `VITE_SUPABASE_URL` — قيمته: رابط مشروع Supabase الخاص بك (مثل `https://xxxxx.supabase.co`)
   - **المتغير الثاني:** `VITE_SUPABASE_ANON_KEY` — قيمته: المفتاح العام من Supabase (يبدأ بـ `eyJ...`)
7. اضغط **Deploy site**

سيقوم Netlify ببناء الموقع ورفعه فوراً. ستحصل على رابط مثل `ekhdemli.netlify.app`.

> **ملاحظة هامة عن متغيرات البيئة:** ملف `.env` الموجود في حاسوبك لا يُرفع إلى Netlify (مستثنى عبر `.gitignore`). لذلك **يجب** إضافة متغيرات البيئة في لوحة تحكم Netlify نفسها (Site settings → Environment variables) لكي يتم تضمينها أثناء البناء.

#### إزالة شارة "Powered by Netlify" من واجهة الموقع

1. في لوحة Netlify ← **Site settings** ← **General**
2. ابحث عن قسم **Badge**
3. عطّل الخيار **"Display Netlify badge"**
4. ستصبح واجهة الموقع نظيفة واحترافية بدون أي شارة

#### الطريقة ب: عبر سطر الأوامر (Netlify CLI)

```
npm i -g netlify-cli
netlify login
netlify deploy --build --prod
```

عند asked عن build command اكتب: `npm run build`
وعند asked عن publish directory اكتب: `dist`

#### ربط دومين خاص على Netlify

1. في لوحة Netlify ← **Site settings** ← **Domain management** ← **Add custom domain**
2. أضف دومينك، مثلاً `ekhdemli.com`
3. في لوحة تحكم دومينك، وجّه DNS:
   - **Type:** CNAME
   - **Name:** @ أو www
   - **Value:** `[your-site-name].netlify.app`
4. Netlify يوفّر شهادة SSL (HTTPS) تلقائياً ومجاناً

> **ملاحظة بخصوص المسارات:** ملف `public/_redirects` موجود في المشروع ويخبر Netlify بتوجيه جميع المسارات إلى `index.html`. بدون هذا الملف، عند تحديث صفحة مثل `/login` سيظهر خطأ 404. الملف جاهز ولا تحتاج لإضافته.

### الطريقة الثالثة: خادم VPS (Ubuntu/Linux)

هذه الطريقة تمنحك تحكماً كاملاً وتصلح للإنتاج.

#### 1. اشترِ خادم VPS

من أي مزوّد (DigitalOcean، Hetzner، OVH، إلخ). مواصفات مقترحة:
- 1 GB RAM على الأقل
- Ubuntu 22.04 أو 24.04

#### 2. اتصل بالخادم

```
ssh root@your-server-ip
```

#### 3. تثبيت Node.js و Nginx

```
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs nginx
```

#### 4. رفع المشروع للخادم

من حاسوبك:
```
scp -r dist/ root@your-server-ip:/var/www/ekhdemli/
```

أو استخدم Git:
```
cd /var/www
git clone https://github.com/your-username/ekhdemli.git
cd ekhdemli
npm install
npm run build
```

#### 5. إعداد Nginx

أنشئ ملف إعداد:
```
nano /etc/nginx/sites-available/ekhdemli
```

بالمحتوى التالي:
```nginx
server {
    listen 80;
    server_name ekhdemli.dz www.ekhdemli.dz;
    root /var/www/ekhdemli/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff2|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/css application/javascript application/json;
}
```

فعّل الموقع:
```
ln -s /etc/nginx/sites-available/ekhdemli /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### 6. شهادة SSL (HTTPS)

```
apt install -y certbot python3-certbot-nginx
certbot --nginx -d ekhdemli.dz -d www.ekhdemli.dz
```

Certbot سيثبت الشهادة تلقائياً ويُعد Nginx لإعادة توجيه HTTP إلى HTTPS.

#### 7. وجّه الدومين إلى الخادم

في لوحة تحكم الدومين، أضف سجل DNS:
- **Type:** A
- **Name:** @
- **Value:** عنوان IP الخاص بخادمك

انتظر انتشار DNS (قد يستغرق من دقائق إلى ساعات).

#### 8. تأكد أن كل شيء يعمل

افتح `https://ekhdemli.dz` في متصفحك — يجب أن يعمل الموقع.

---

## متغيرات البيئة

### ملف `.env` (الواجهة الأمامية)

| المتغير | الوصف | مكان الإيجاد |
|---------|-------|-------------|
| `VITE_SUPABASE_URL` | رابط مشروع Supabase | Supabase Dashboard → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | مفتاح Supabase العام | Supabase Dashboard → Project Settings → API |

> **ملاحظة أمان:** المفتاح العام (Anon Key) آمن للعرض في الواجهة الأمامية — صلاحياته محدودة بسياسات RLS. المفتاح السري (Service Role Key) يُستخدم فقط في Edge Functions ولا يظهر في كود الواجهة أبداً.

### أسرار Edge Functions

تُعدّ على خادم Supabase ولا تحتاج لإضافتها في ملف `.env`:

| الاسم | الوصف |
|-------|-------|
| `SUPABASE_URL` | رابط Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | مفتاح Supabase السري |
| `CHARGILY_SECRET_KEY` | مفتاح Chargily Pay السري |

### لإضافة مفتاح Chargily

1. سجّل دخولك في [Chargily Pay](https://epay.chargily.com)
2. اذهب إلى إعدادات API واحصل على المفتاح السري
3. في لوحة Supabase: **Project Settings → Edge Functions → Secrets**
4. أضف: `CHARGILY_SECRET_KEY` = `sk_test_xxxxxx` (للاختبار) أو `sk_live_xxxxxx` (للإنتاج)

---

## قاعدة البيانات

### الجداول

| الجدول | الوصف |
|--------|-------|
| `profiles` | ملفات المستخدمين (اسم، دور، صورة، رصيد، اشتراك، is_admin) |
| `listings` | الإعلانات (خدمات + منتجات: عنوان، وصف، تصنيف، سعر، مخزون، تقييم) |
| `listing_tiers` | باقات الخدمة (اسم، سعر، مدة التسليم، مميزات) |
| `orders` | الطلبات (مشتري، بائع، إعلان، مبلغ، حالة، حالة الضمان) |
| `reviews` | التقييمات (تقييم 1-5، تعليق، مراجع، تاريخ) |
| `conversations` | محادثات بين المشتري والبائع |
| `messages` | الرسائل الفردية في كل محادثة |
| `transactions` | المعاملات المالية (دعم/شراء، حالة، مبلغ) |
| `withdrawal_requests` | طلبات سحب الأرباح (CCP/RIP، حالة) |
| `portfolio_items` | أعمال البائع (صور + روابط) |
| `digital_products` | المنتجات الرقمية القديمة (ملفات قابلة للتحميل) |

### الهجرات (Migrations)

> **الأسهل:** استخدم ملف `supabase/setup_database.sql` الموحد — انسخ محتواه والصقه في Supabase SQL Editor واضغط Run. هذا يطبّق كل الهجرات دفعة واحدة بالترتيب الصحيح.

إذا فضّلت تطبيقها منفصلة، الهجرات في مجلد `supabase/migrations/`:

```
supabase/
├── setup_database.sql                             # ★ ملف موحد — كل الجداول بضغطة زر
└── migrations/
    ├── ..._creator_platform_phase1.sql             # الجداول الأساسية + المصادقة
    ├── ..._creator_platform_phase3.sql             # المنتجات الرقمية + المعاملات
    ├── ..._creator_platform_phase4.sql             # بوابات الدفع + webhook
    ├── ..._creator_platform_phase5.sql             # طلبات السحب
    ├── ..._ekhdemli_marketplace_schema.sql         # سوق Ekhdemli (إعلانات، طلبات، رسائل)
    ├── ..._ekhdemli_escrow_messaging_admin.sql     # الضمان + المراسلة + الإدارة
    ├── ..._ekhdemli_escrow_chargily_integration.sql # تكامل Chargily مع الضمان
    └── ..._add_stock_to_listings.sql               # عمود المخزون
```

---

## الدفع عبر Chargily

### كيف يعمل الدفع

1. **المشتري** يضغط "شراء" أو "اطلب الخدمة"
2. **Edge Function** `chargily-checkout` تنشئ جلسة دفع في Chargily وتسجّل طلباً
3. **المشتري** يُوجَّه إلى صفحة دفع Chargily (Edahabia أو CIB)
4. بعد الدفع، **Chargily** يرسل webhook إلى `chargily-webhook`
5. **Edge Function** تتحقق من التوقيع، تحدّث حالة الطلب، وتضع المال في الضمان
6. **المشتري** يُوجَّه إلى صفحة النجاح

### إعداد Webhook في Chargily

1. سجّل دخولك في [Chargily Pay](https://epay.chargily.com)
2. اذهب إلى إعدادات Webhook
3. ضع الرابط التالي:
   ```
   https://[YOUR_SUPABASE_PROJECT_ID].supabase.co/functions/v1/chargily-webhook
   ```
4. تأكد من تفعيل webhook لأحداث `checkout.paid`، `checkout.failed`، `checkout.canceled`

---

## نظام الاشتراكات (Subscriptions)

### كيف يعمل الاشتراك

الموقع يوفر ثلاث باقات: **مجاني**، **أساسي (1500 د.ج/شهر)**، و **احترافي (3500 د.ج/شهر)**.

عندما يضغط المستخدم "اشترك الآن" في صفحة `/pricing`:

1. إذا لم يكن مسجلاً → يُوجَّه لصفحة تسجيل الدخول
2. إذا كان مسجلاً → يتم إنشاء جلسة دفع عبر Chargily Pay
3. يُوجَّه المستخدم إلى صفحة دفع Chargily (Edahabia أو CIB)
4. بعد نجاح الدفع، يرسل Chargily إشعاراً (webhook) إلى `chargily-webhook`
5. الـ webhook يحدّث حالة الدفع إلى "مدفوع" ويُرقّي باقة المستخدم تلقائياً في جدول `profiles` (عمود `subscription_tier`)
6. يُوجَّه المستخدم إلى صفحة نجاح الدفع

### جدول `subscription_payments`

| العمود | الوصف |
|--------|-------|
| `id` | معرّف فريد |
| `user_id` | المستخدم المشترك |
| `tier` | الباقة (`basic` أو `pro`) |
| `amount` | المبلغ بالدينار |
| `status` | الحالة (`pending`, `paid`, `failed`, `canceled`) |
| `chargily_checkout_id` | معرّف جلسة Chargily |
| `period_start` | بداية فترة الاشتراك |
| `period_end` | نهاية فترة الاشتراك (بعد 30 يوم) |

### كيف تعدّل أسعار الباقات

1. افتح ملف `src/lib/marketplace.ts` في محرر نصوص
2. ابحث عن `SUBSCRIPTION_PLANS`
3. غيّر القيم في `price`:
   ```typescript
   { id: 'basic', price: 1500, ... }   // غيّر 1500 لسعرك
   { id: 'pro', price: 3500, ... }     // غيّر 3500 لسعرك
   ```
4. احفظ الملف وأعد البناء بـ `npm run build`

> **مهم:** الأسعار في الكود هي ما يُرسل إلى Chargily. إذا غيّرت السعر في الكود فقط دون إعادة البناء والنشر، لن يتغير المبلغ المطلوب.

### كيف تعدّل مدة الاشتراك

مدة الاشتراك الافتراضية 30 يوماً. لتغييرها، افتح `supabase/functions/chargily-checkout/index.ts` وابحث عن:
```typescript
period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
```
غيّر `30` إلى عدد الأيام التي تريدها، ثم أعد نشر الـ Edge Function.

### أين تذهب أموال الاشتراك؟

أموال الاشتراك تُدفع مباشرة إلى حسابك في Chargily Pay (وليس إلى حساب البائع). هذا يعني:
- أنت (مالك المنصة) تستلم أموال الاشتراكات مباشرة
- الاشتراك ليس مرتبطاً بنظام الضمان — هو دفع مباشر للمنصة
- يمكنك متابعة المدفوعات من لوحة Chargily أو من جدول `subscription_payments` في Supabase

### المتطلبات لعمل الاشتراك

1. **مفتاح Chargily** مُعد في Supabase → Edge Functions → Secrets (`CHARGILY_SECRET_KEY`)
2. **رابط Webhook** مُعد في لوحة Chargily:
   ```
   https://[YOUR_PROJECT_ID].supabase.co/functions/v1/chargily-webhook
   ```
3. **Edge Functions** منشورة (`chargily-checkout` و `chargily-webhook`)
4. **جدول `subscription_payments`** مُنشأ (يُطبق تلقائياً عبر الهجرة)

> الـ webhook نفسه يعالج كلا النوعين: دفع الطلبات (الضمان) ودفع الاشتراكات. لا حاجة لإعداد webhook منفصل.

---

## نظام الضمان (Escrow)

نظام الضمان يحمي المشتري والبائع معاً:

### مراحل الطلب

```
شراء → in_escrow (في الضمان) → delivered (تم التسليم) → confirmed (مؤكد) → اكتمال
                                    ↓
                              refunded (استرجاع)
```

1. **in_escrow**: المال محجوز في الضمان بعد الدفع
2. **delivered**: البائع سلّم العمل/المنتج
3. **confirmed**: المشتري أكمل الاستلام → المال يُحوّل للبائع
4. **refunded**: الإدارة توافق على استرجاع المال للمشتري
5. **auto_canceled**: الطلب يُلغى تلقائياً إذا لم يُسلّم في الوقت المحدد

### مدة التسليم

- البائع يحدد مدة التسليم عند نشر الخدمة (بالأيام)
- إذا تجاوز الطلب المدة دون تسليم، يُلغى تلقائياً ويُسترجع المال

---

## نظام التقييمات والمراجعات

- تقييم بالنجوم من 1 إلى 5
- تعليق نصي مكتوب
- اسم المراجع + تاريخ المراجعة
- المتوسط يُعرض على البطاقات وصفحات التفاصيل
- التقييمات تُعرض فقط بعد إتمام الطلب

---

## تخزين الصور والملفات (Storage)

### كيف يعمل التخزين في هذا المشروع؟

الموقع يستخدم **Supabase Storage** لتخزين جميع الصور والملفات المرفوعة. هذا يعني أن:

- الصور والملفات تُرفع مباشرة من متصفح المستخدم إلى خوادم Supabase السحابية
- **لا تمر عبر خادمك إطلاقاً** — خادمك يقدّم ملفات الموقع (HTML/CSS/JS) فقط
- الصور تُخزّن في Supabase وتُعرض عبر روابط مباشرة منها

> هذه ميزة جيدة جداً: خادمك لا يتأثر بحجم الصور أو عدد الملفات المرفوعة لأنها كلها على Supabase. خادمك يبقى سريعاً لأنه يقدّم فقط ملفات الموقع الثابتة (بضع ميجابايتات).

### مجلدات التخزين (Buckets)

يحتاج المشروع إلى مجلدين (Buckets) في Supabase Storage:

| اسم المجلد | محتواه | الحالة |
|-----------|--------|--------|
| `portfolio-images` | صور معرض الأعمال (صور البائعين) | عام (Public) |
| `product-files` | ملفات المنتجات الرقمية + صور الغلاف | عام (Public) |

### إنشاء مجلدات التخزين

> **ملاحظة:** إذا طبّقت ملف `supabase/setup_database.sql` الكامل، يتم إنشاء المجلدات تلقائياً ولا تحتاج لإنشائها يدوياً. تأكد فقط من أن السياسات مُطبقة (مضمونة في الملف الموحد).

1. اذهب إلى لوحة Supabase → **Storage**
2. اضغط **New Bucket**
3. أنشئ مجلداً باسم `portfolio-images`:
   - **Public bucket**: ✓ (فعّل هذا الخيار)
   - اضغط **Save**
4. كرّر العملية وأنشئ مجلداً باسم `product-files`:
   - **Public bucket**: ✓ (فعّل هذا الخيار)
   - اضغط **Save**

> **لماذا "Public"؟** لأن الصور يجب أن تظهر للزوار بدون تسجيل دخول. المجلد العام يسمح بقراءة الصور للجميع، لكن الرفع والتعديل يبقى محمياً بسياسات RLS — لا يمكن لأي شخص رفع ملفات إلا إذا كان مسجلاً.

### خطة Supabase المجانية ($0.00) — هل تكفي؟

الخطة المجانية كافية جداً لمشروعك الناشئ، فهي توفر:

| المورد | الحد المجاني |
|--------|-------------|
| مساحة قاعدة البيانات | 500 ميجابايت (تتسع لمئات الآلاف من السجلات والنصوص) |
| مستخدمون نشطون شهرياً (MAU) | حتى 50,000 مستخدم |
| تخزين الملفات والصور | 1 جيجابايت |
| نقل البيانات (Egress) | 5 جيجابايت شهرياً |

> هذه الأرقام ممتازة لمرحلة البدايات والانتشار. عندما تتجاوزها، يمكنك الترقية إلى خطة Pro ($25/شهر).

### سياسات التخزين (Storage Policies)

بعد إنشاء المجلدات، تحتاج لإضافة سياسات تحدد من يمكنه الرفع. في لوحة Supabase → Storage → اختر المجلد → **Policies**:

**للمجلد `portfolio-images`:**

- **قراءة (SELECT):** عام للجميع — أي زائر يمكنه رؤية الصور
- **رفع (INSERT):** المستخدم المسجّل فقط — يمكنه الرفع في مجلده الخاص
- **تعديل/حذف (UPDATE/DELETE):** المالك فقط — يمكنه حذف صوره فقط

**للمجلد `product-files`:**

- نفس السياسات أعلاه

> إذا لم تُضف السياسات، لن يتمكن البائعون من رفع الصور وستظهر رسالة خطأ.

### حدود التخزين في Supabase

| الخطة | حجم التخزين | عدد الملفات |
|-------|------------|-------------|
| مجانية (Free) | 1 GB | غير محدود |
| Pro ($25/شهر) | 100 GB | غير محدود |

> إذا توقعّت رفع مئات الصور والملفات، الخطة المجانية قد تكفي في البداية. عندما تتجاوز 1 GB، انتقل إلى خطة Pro.

### هل أحتاج لخادم تخزين منفصل (CDN)؟

**في معظم الحالات: لا.** Supabase Storage يقدّم روابط مباشرة سريعة عبر شبكة عالمية (CDN مدمج). الصور تُحمّل بسرعة من أقرب خادم للمستخدم.

**متى تحتاج لخادم تخزين خارجي؟**
- إذا تجاوزت حدود Supabase وكنت تريد توفير التكلفة
- إذا أردت تخزيناً دائماً غير مرتبط بـ Supabase

**بدائل مدعومة في الكود الحالي:**
الموقع يقبل أيضاً **روابط خارجية** لصور الغلاف. عند نشر خدمة أو منتج، بدلاً من رفع صورة، يمكن للبائع لصق رابط من أي خدمة صور مثل:
- [Imgur](https://imgur.com) (مجاني)
- [Cloudinary](https://cloudinary.com) (مجاني حتى حدود معينة)
- [ImgBB](https://imgbb.com) (مجاني)

هذا مفيد إذا أردت تقليل استهلاك مساحة Supabase.

---

## كيف تنشئ Supabase خاص بك من الصفر

> **السؤال الذي يطرحه الكثيرون:** "أنا نزّلت المشروع على حاسوبي وأريد ربطه بـ Supabase خاص بي لأن لا أعرف أي حساب استخدم. هل أكتفي بتغيير `.env`؟"
>
> **الجواب: لا.** تغيير `.env` فقط يجعل الموقع يتصل بقاعدة جديدة فارغة. القاعدة الجديدة لا تحتوي على أي جداول أو بيانات أو دوال — فالموقع سيظهر صفحات فارغة وأخطاء. تحتاج لإنشاء القاعدة كاملة ثم ربطها.

### ما هي متغيرات البيئة (.env)؟

ملف `.env` هو ملف سري وخاص يتم وضعه في مجلد المشروع المحلي، ويحتوي على بيانات حساسة لا يجب مشاركتها علناً، مثل:
- `VITE_SUPABASE_URL` — رابط مشروع قاعدة البيانات
- `VITE_SUPABASE_ANON_KEY` — مفتاح المصادقة العام

تكمن أهمية هذه المتغيرات في أنها تمثل **"جسر الاتصال"** الذي يسمح لواجهة موقعك بالتحدث مع خوادم Supabase لجلب البيانات أو حفظها (تسجيل الدخول، عرض الخدمات، إدارة الطلبات).

### Bolt مقابل امتلاك حسابك الخاص

عندما تبدأ بعض المشاريع عبر أدوات مثل Bolt.new، فإنها تقوم تلقائياً بإنشاء مشروع مؤقت على Supabase نيابة عنك لتسريع عملية التشغيل الفوري.

ولكن لضمان السيطرة الكاملة، وتجنب ضياع البيانات، وامتلاك لوحة التحكم بالكامل، يجب:
1. إنشاء حساب مجاني شخصي على [supabase.com](https://supabase.com)
2. إنشاء مشروع جديد خاص بك
3. نقل الجداول (عبر الـ Migrations أو الـ SQL)
4. استبدال المفاتيح القديمة بالمفاتيح الجديدة في ملف `.env`

### لماذا تحتاج Supabase خاص بك؟

المشروع قد يبدأ مربوطاً بـ Supabase جاهز (أُنشئ أثناء التطوير). إذا أردت تحكماً كاملاً — رؤية البيانات، تعديل الجداول، إدارة المستخدمين — يجب أن تنشئ Supabase خاص بك وتربط المشروع به.

### الخطوة 1: إنشاء حساب و مشروع على Supabase

1. اذهب إلى [supabase.com](https://supabase.com) واضغط **Start your project**
2. سجّل حساباً (بـ GitHub أو الإيميل)
3. اضغط **New Project**
4. اختر اسماً للمشروع (مثلاً `ekhdemli`)
5. أدخل كلمة مرور قوية لقاعدة البيانات — **احفظها جيداً** (لن تظهر مرة أخرى)
6. اختر المنطقة الأقرب (مثلاً `Frankfurt` لأوروبا أو `Singapore` لآسيا)
7. اضغط **Create new project** وانتظر دقيقتين حتى يجهّز

### الخطوة 2: نسخ بيانات الاتصال

1. في لوحة مشروعك الجديد، اذهب إلى **Project Settings** (أيقونة الترس أسفل اليسار)
2. اضغط **API**
3. ستجد قسمين مهمين:
   - **Project URL** — انسخه (مثل `https://xxxxx.supabase.co`)
   - **anon public key** — انسخه (سلسلة طويلة تبدأ بـ `eyJ...`)

### الخطوة 3: تحديث ملف `.env` في حاسوبك

افتح ملف `.env` الموجود في جذر المشروع بمحرر نصوص (Notepad أو VS Code) واستبدل القيمتين:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

> احتفظ بالقيمتين القديمتين في ملف نصي جانبي كنسخة احتياطية — قد تحتاجها إذا أردت الرجوع.

### الخطوة 4: تطبيق هجرات قاعدة البيانات (مهم جداً)

القاعدة الجديدة فارغة تماماً. يجب إنشاء كل الجداول والعلاقات والدوال.

**الطريقة الأسهل — ملف واحد بضغطة زر (مُوصى بها):**

أنشأنا لك ملفاً موحداً يحتوي على كل الهجرات بالترتيب الصحيح في ملف واحد:

1. افتح ملف `supabase/setup_database.sql` على حاسوبك بمحرر نصوص (Notepad أو VS Code)
2. انسخ محتواه بالكامل (`Ctrl+A` ثم `Ctrl+C`)
3. في لوحة Supabase، اذهب إلى **SQL Editor** ← **New query**
4. الصق المحتوى في المحرر (`Ctrl+V`)
5. اضغط **Run** (أو `Ctrl+Enter`)
6. انتظر حتى تظهر رسالة `Success. No rows returned.`
7. مبروك! قاعدة البيانات جاهزة — كل الجداول والسياسات والدوال منشأة

> هذا الملف آمن للتشغيل أكثر من مرة — يستخدم `IF NOT EXISTS` و `DROP IF EXISTS` فلا يحذف أي بيانات موجودة. كما ينشئ مجلدات التخزين (Storage Buckets) تلقائياً فلا تحتاج لإنشائها يدوياً.

**الطريقة البديلة — تطبيق الهجرات واحدة تلو الأخرى:**

إذا فضّلت تطبيق كل هجرة على حدة، افتح كل ملف في مجلد `supabase/migrations/` بمحرر نصوص على حاسوبك وانسخ محتواه والصقه في SQL Editor واضغط Run. كرّر ذلك مع كل ملف **بالترتيب** (من الأقدم للأحدث حسب التاريخ في اسم الملف):

```
supabase/migrations/
├── 20261016194021_creator_platform_phase1.sql              ← ابدأ بهذا
├── 20261016201113_creator_platform_phase3.sql
├── 20261016201906_creator_platform_phase4.sql
├── 20261016204122_creator_platform_phase5.sql
├── 20261016204143_creator_platform_phase5_increment_balance.sql
├── 20261016205201_creator_platform_phase5_security_fix.sql
├── 20261016205227_creator_platform_phase5_security_fix_v2.sql
├── 20261016225003_ekhdemli_marketplace_schema.sql
├── 20261016231447_ekhdemli_escrow_messaging_admin.sql
├── 20261016234510_ekhdemli_escrow_chargily_integration.sql
├── 20261017003412_add_stock_to_listings.sql
└── 20261017033022_create_subscription_payments.sql.sql    ← انتهِ بهذا
```

> **تنبيه:** الترتيب مهم! كل هجرة تعتمد على التي قبلها. إذا طبقتها بترتيب خاطئ ستحصل على أخطاء. الطريقة الأسهل (الملف الموحد) تضمن الترتيب الصحيح تلقائياً.

#### عبر Supabase MCP (تلقائياً)

إذا كنت تستخدم بيئة تطوير تدعم Supabase MCP (مثل Bolt)، تُطبق الهجرات تلقائياً عند إضافتها — لا حاجة لنسخها يدوياً.

### الخطوة 5: إعداد المصادقة

1. في لوحة Supabase → **Authentication** → **Providers**
2. فعّل **Email** (مفعّل افتراضياً)
3. اذهب إلى **Authentication** → **Sign In / Up**
4. عطّل **"Confirm email"** — حتى يتمكن المستخدمون من التسجيل بدون تأكيد الإيميل (مهم لموقع عربي محلي)

### الخطوة 6: إنشاء مجلدات التخزين

اتبع الخطوات في قسم [تخزين الصور والملفات (Storage)](#تخزين-الصور-والملفات-storage) أعلاه. أنشئ المجلدين:
- `portfolio-images` (Public)
- `product-files` (Public)

### الخطوة 7: إضافة دوال الدفع (Edge Functions)

دوال الدفع (`chargily-checkout` و `chargily-webhook`) موجودة في المشروع في:
```
supabase/functions/
├── chargily-checkout/index.ts
└── chargily-webhook/index.ts
```

لنشرها على Supabase الجديد:
1. في لوحة Supabase → **Edge Functions**
2. اضغط **New Function**
3. أنشئ دالة باسم `chargily-checkout` والصق محتوى الملف المقابل
4. كرّر مع `chargily-webhook`

ثم أضف المفاتيح السرية:
- في **Edge Functions → Secrets**:
  - `SUPABASE_URL` = رابط مشروعك
  - `SUPABASE_SERVICE_ROLE_KEY` = تجده في Project Settings → API → `service_role`
  - `CHARGILY_SECRET_KEY` = مفتاحك من [Chargily Pay](https://epay.chargily.com)

### الخطوة 8: إنشاء حساب إدارة

بعد تطبيق الهجرات وتسجيل أول مستخدم:
1. سجّل حساباً في الموقع (صفحة `/register`)
2. اذهب إلى Supabase → **Table Editor** → `profiles`
3. ابحث عن صفك واضبط `is_admin = true`
4. الآن يمكنك الدخول إلى `/admin`

### الخطوة 9: رابط Webhook في Chargily

في لوحة [Chargily Pay](https://epay.chargily.com) → Webhook Settings، ضع:
```
https://[YOUR_PROJECT_ID].supabase.co/functions/v1/chargily-webhook
```
استبدل `[YOUR_PROJECT_ID]` بمعرّف مشروعك (تجده في رابط Supabase).

### ملخص: ماذا يحدث عند تغيير Supabase؟

| الخطوة | ماذا تفعل | أين |
|--------|----------|-----|
| 1 | أنشئ مشروع Supabase جديد | [supabase.com](https://supabase.com) |
| 2 | انسخ URL و Anon Key | Supabase Dashboard → Project Settings → API |
| 3 | استبدل القيم في `.env` | حاسوبك |
| 4 | طبّق كل الهجرات (ملف واحد بضغطة زر) | Supabase SQL Editor — الصق محتوى `supabase/setup_database.sql` واضغط Run |
| 5 | عطّل "Confirm email" | Supabase → Authentication |
| 6 | أنشئ مجلدات التخزين | Supabase → Storage |
| 7 | انشر دوال الدفع + المفاتيح | Supabase → Edge Functions |
| 8 | اضبط `is_admin = true` لحسابك | Supabase → Table Editor |
| 9 | حدّث رابط Webhook | لوحة Chargily |

> **بدون الخطوات 1-6 لن يعمل الموقع إطلاقاً.** الخطوات 7-9 ضرورية لعمل الدفع والإدارة.

---

## قائمة التحقق قبل الإطلاق

قبل أن يصبح موقعك جاهزاً للعمل بشكل كامل، تأكد من إعداد كل العناصر التالية. كل عنصر مشروح بالتفصيل في أقسامه الخاصة:

### إعدادات ضرورية (بدونها لن يعمل الموقع)

| # | العنصر | مكان الإعداد | الشرح |
|---|--------|-------------|-------|
| 1 | **رابط ومفتاح Supabase** | ملف `.env` | `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY` — تجدها في Supabase Dashboard → Project Settings → API |
| 2 | **مصادقة Email/Password** | Supabase Dashboard → Authentication → Providers | فعّل Email، وعطّل "Confirm email" ليتمكن المستخدمون من التسجيل مباشرة |
| 3 | **مجلدات التخزين** | Supabase Dashboard → Storage | أنشئ `portfolio-images` و `product-files` كـ Public — [شرح كامل](#تخزين-الصور-والملفات-storage) |
| 4 | **سياسات التخزين** | Supabase Dashboard → Storage → Policies | أضف سياسات القراءة العامة والرفع للمستخدمين المسجلين |
| 5 | **هجرات قاعدة البيانات** | Supabase MCP | جميع الهجرات في مجلد `supabase/migrations/` يجب أن تكون مُطبقة — [شرح كامل](#قاعدة-البيانات) |

### إعدادات الدفع (بدونها لا تكت عمليات البيع)

| # | العنصر | مكان الإعداد | الشرح |
|---|--------|-------------|-------|
| 6 | **مفتاح Chargily السري** | Supabase Dashboard → Edge Functions → Secrets | أضف `CHARGILY_SECRET_KEY` بقيمتك من [Chargily Pay](https://epay.chargily.com) |
| 7 | **رابط Webhook في Chargily** | لوحة Chargily → Webhook Settings | ضع `https://[PROJECT_ID].supabase.co/functions/v1/chargily-webhook` |
| 8 | **نشر Edge Functions** | Supabase MCP | تأكد أن `chargily-checkout` و `chargily-webhook` منشورتان — [شرح كامل](#الدفع-عبر-chargily) |

### إعدادات النشر والدومين

| # | العنصر | مكان الإعداد | الشرح |
|---|--------|-------------|-------|
| 9 | **بناء المشروع** | موجه الأوامر | شغّل `npm run build` لإنتاج ملفات `dist/` |
| 10 | **رفع الملفات للخادم** | Vercel / Netlify / VPS | انسخ محتويات `dist/` — [شرح كامل](#التشغيل-على-خادم-server-وربطه-بدومين) |
| 11 | **إعادة توجيه SPA** | إعداد الخادم (Nginx/Vercel/Netlify) | كل المسارات يجب توجيهها إلى `index.html` وإلا ستظهر صفحة بيضاء |
| 12 | **شهادة SSL** | Certbot (على VPS) أو تلقائي (Vercel/Netlify) | الموقع يجب أن يعمل بـ HTTPS — [شرح كامل](#التشغيل-على-خادم-server-وربطه-بدومين) |
| 13 | **توجيه DNS للدومين** | لوحة تحكم الدومين | سجل A (لـ VPS) أو CNAME (لـ Vercel/Netlify) يشير إلى خادمك |

### إعدادات اختيارية (للتحسين)

| # | العنصر | مكان الإعداد | الشرح |
|---|--------|-------------|-------|
| 14 | **حساب الإدارة** | Supabase Dashboard → Table Editor → profiles | اضبط `is_admin = true` لحسابك للوصول إلى `/admin` |
| 15 | **روابط استرجاع بعد الدفع** | صفحة نجاح الدفع | تأكد أن `payment/success` و `payment/failed` تعمل بعد رجوع المستخدم من Chargily |

### ماذا تعدّل في ملفات حاسوبك مقابل ماذا تعدّه على مواقع أونلاين

المشروع فيه مئات الملفات، لكن **معظمها لا يحتاج أي تعديل**. إليك التمييز بوضوح:

#### (أ) ملفات على حاسوبك — تعدّلها بمحرر نصوص

> "محرر نصوص" يعني برنامج مثل **Notepad** (موجود في Windows) أو **VS Code** (مجاني، الأفضل). تفتح الملف، تعدّل النص، تحفظ. هذه الملفات معدّلة مسبقاً وتعمل كما هي — عدّلها فقط إذا أردت تغيير شيء.

| ماذا تريد تغييره | أي ملف تفتحه | أين تجده في حاسوبك | ماذا تعدّل بالضبط |
|------------------|-------------|-------------------|------------------|
| **ربط قاعدة بياناتك** | `.env` | جذر المشروع (المجلد الرئيسي) | استبدل `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY` بقيم مشروعك من لوحة Supabase |
| **ألوان الموقع** | `src/index.css` | `src` ← `index.css` | في أعلى الملف ستجد متغيرات ألوان مثل `--primary`، `--background` — غيّر القيم |
| **الوضع الليلي** | `src/index.css` | `src` ← `index.css` | ابحث عن `.dark` — غيّر الألوان تحتها |
| **اسم الموقع "Ekhdemli"** | `src/components/marketplace-layout.tsx` | `src` ← `components` ← `marketplace-layout.tsx` | ابحث عن كلمة "Ekhdemli" وغيّرها لاسمك |
| **التصنيفات (إضافة/حذف)** | `src/lib/marketplace.ts` | `src` ← `lib` ← `marketplace.ts` | ستجد قائمة بأسماء التصنيفات — أضف أو احذف |
| **نص الصفحة الرئيسية** | `src/pages/home.tsx` | `src` ← `pages` ← `home.tsx` | العناوين والأوصاف — عدّل النصوص العربية |
| **أسعار الاشتراكات** | `src/lib/marketplace.ts` | `src` ← `lib` ← `marketplace.ts` | ابحث عن `SUBSCRIPTION_PLANS` وغيّر قيم `price` — انظر قسم [نظام الاشتراكات](#نظام-الاشتراكات-subscriptions) |
| **وصف الموقع لمحركات البحث** | `index.html` | جذر المشروع | وسوم `<title>` و `<meta name="description">` |
| **صورة الخلفية للرئيسية** | `public/hero-bg.webp` | `public` ← `hero-bg.webp` | استبدل بصورتك مع الحفاظ على نفس الاسم والامتداد |
| **توجيه محركات البحث** | `public/robots.txt` | `public` ← `robots.txt` | عدّل القيم حسب حاجتك |
| **توجيه المسارات لـ Netlify** | `public/_redirects` | `public` ← `_redirects` | جاهز مسبقاً — لا تلمسه. يضمن عمل كل المسارات بدون خطأ 404 |
| **رسوم عمولة المنصة** | `supabase/functions/chargily-checkout/index.ts` | `supabase` ← `functions` ← `chargily-checkout` ← `index.ts` | ابحث عن نسبة العمولة وغيّرها |
| **مدة التسليم القصوى** | `src/pages/publish-service.tsx` | `src` ← `pages` ← `publish-service.tsx` | الحد الأقصى لعدد الأيام |

#### (ب) إعدادات على مواقع أونلاين — لا تعدّلها في ملفات حاسوبك

> هذه الإعدادات موجودة على مواقع خارجية (Supabase، Chargily). لا توجد في ملفات حاسوبك — تعدّلها من متصفحك عبر الدخول للمواقع.

| ماذا تريد إعداده | أين تذهب | كيف |
|------------------|---------|-----|
| **إنشاء حساب Supabase** | [supabase.com](https://supabase.com) | سجّل حساباً، أنشئ مشروعاً جديداً، انسخ URL و Anon Key إلى ملف `.env` |
| **تعطيل تأكيد الإيميل** | Supabase Dashboard → Authentication → Providers → Email | عطّل "Confirm email" ليسجل المستخدمون مباشرة |
| **إنشاء مجلدات التخزين** | Supabase Dashboard → Storage | أنشئ `portfolio-images` و `product-files` كـ Public — [شرح كامل](#تخزين-الصور-والملفات-storage) |
| **سياسات التخزين** | Supabase Dashboard → Storage → Policies | أضف سياسات القراءة والرفع |
| **مفتاح Chargily السري** | Supabase Dashboard → Edge Functions → Secrets | أضف `CHARGILY_SECRET_KEY` بقيمتك من Chargily |
| **رابط Webhook في Chargily** | [epay.chargily.com](https://epay.chargily.com) → Webhook Settings | ضع رابط الـ webhook الخاص بمشروعك |
| **صلاحية الإدارة** | Supabase Dashboard → Table Editor → profiles | اضبط `is_admin = true` لحسابك |
| **نطاق قاعدة البيانات** | Supabase Dashboard — عبر أدوات MCP | الهجرات في `supabase/migrations/` تُطبق عبر Supabase MCP، لا يدوياً |

#### (ج) ملفات لا تلمسها إطلاقاً

هذه الملفات تعمل تلقائياً ولا تحتاج لأي تعديل:

- `src/components/ui/` — كل المكونات (أزرار، نوافذ، جداول...) — تعمل كما هي
- `src/lib/utils.ts` — دوال مساعدة عامة
- `src/lib/supabase.ts` — عميل قاعدة البيانات — يعمل تلقائياً ببيانات `.env`
- `src/contexts/auth-context.tsx` — نظام المصادقة
- `src/components/route-guards.tsx` — حماية الصفحات
- `src/components/theme-provider.tsx` — الوضع الليلي/النهاري
- `package.json` و `package-lock.json` — قائمة المكتبات
- `tsconfig*.json` — إعدادات TypeScript
- `vite.config.ts` — إعدادات البناء
- `supabase/config.toml` — إعدادات Edge Functions
- كل ملفات `supabase/migrations/` — هجرات قاعدة البيانات (تُطبق تلقائياً)

---

## دليل هيكل المجلدات (ماذا يفعل كل مجلد؟)

عندما تفتح المشروع في حاسوبك سترى هذه المجلدات الرئيسية:

```
project/
├── src/                    ← هنا كود الموقع (كل ما يراه الزائر)
│   ├── pages/              ← كل صفحة في الموقع = ملف واحد هنا
│   ├── components/         ← قطع واجهة قابلة لإعادة الاستخدام
│   │   └── ui/             ← مكونات جاهزة (لا تلمسها)
│   ├── lib/                ← منطق التطبيق + الاتصال بقاعدة البيانات
│   └── contexts/           ← حالة المستخدم (تسجيل الدخول/الخروج)
├── public/                 ← ملفات ثابتة (صور، robots.txt، _redirects لـ Netlify)
├── supabase/               ← كل ما يخص الخلفية (قاعدة البيانات + الدوال)
│   ├── setup_database.sql  ← ★ ملف موحد: انسخه والصقه في SQL Editor لإنشاء كل الجداول
│   ├── migrations/         ← أوامر إنشاء الجداول (منفصلة — لا تلمسها)
│   └── functions/          ← دوال الدفع (تحتاج تعديل المفتاح فقط)
├── .env                    ← ★ ملف البيانات (الأهم — عدّله أول شيء)
├── index.html              ← صفحة الموقع الأولى + وسوم SEO
├── package.json            ← قائمة المكتبات (لا تلمسه)
└── vite.config.ts          ← إعدادات البناء (لا تلمسه)
```

### ترتيب أولوياتك عند التعديل

1. **ابدأ بـ `.env`** — ضع بيانات Supabase الخاصة بك (أهم خطوة)
2. **عدّل اسم الموقع** — في `marketplace-layout.tsx`
3. **عدّل نص الصفحة الرئيسية** — في `home.tsx`
4. **عدّل الألوان** — في `index.css` (إن أردت)
5. **اضبط الإعدادات على Supabase** — من المتصفح (مجلدات التخزين، المصادقة، الدفع)
6. **ابنِ وانشر** — `npm run build` ثم ارفع `dist/`

> **القاعدة الذهبية:** إذا لم تكن متأكداً من ملف — لا تلمسه. معظم الملفات تعمل تلقائياً والمشروع جاهز كما هو. فقط `.env` ضروري للتشغيل، وباقي التعديلات اختيارية.

---

## الأمان

### حماية الصفوف (RLS)

جميع الجداول لديها RLS مُفعّل:

- **profiles**: قراءة عامة، تعديل للمالك فقط
- **listings**: قراءة عامة (الإعلانات النشطة)، إدارة للبائع فقط
- **orders**: قراءة للمشتري والبائع فقط
- **reviews**: قراءة عامة، إدراج بعد إتمام الطلب
- **messages**: قراءة لأطراف المحادثة فقط

### دوال آمنة (SECURITY DEFINER)

- `increment_balance`: لا تُستدعى إلا عبر Service Role
- `request_withdrawal`: تتطلب جلسة مستخدم مسجّل، تتحقق ذرياً من الرصيد
- `handle_new_user()`: إنشاء ملف تلقائياً عند التسجيل (دالة مشغل)

### التحقق من Webhook

Edge Function `chargily-webhook` تتحقق من توقيع HMAC-SHA256 لكل طلب. أي طلب بدون توقيه صحيح يُرفض فوراً.

---

## استكشاف الأخطاء

### المشكلة: صفحة بيضاء بعد النشر

**السبب:** إعادة توجيه المسارات غير مُعدة للـ SPA.

**الحل:** تأكد من وجود قاعدة إعادة كتابة لترسل كل الطلبات إلى `index.html`:
- **Netlify:** ملف `public/_redirects` موجود في المشروع بمحتوى `/* /index.html 200` — لا تحتاج لإضافته
- **Nginx:** `try_files $uri $uri/ /index.html;`
- **Vercel:** تتم تلقائياً

### المشكلة: خطأ 404 عند تحديث صفحة على Netlify

**السبب:** ملف `_redirects` غير موجود أو لم يُرفع مع الموقع.

**الحل:** تأكد أن ملف `public/_redirects` موجود في المشروع ويحتوي على `/* /index.html 200`. عند البناء بـ `npm run build`، سيُنسخ تلقائياً إلى مجلد `dist/`.

### المشكلة: الموقع يعمل لكن لا تظهر بيانات (صفحات فارغة)

**السبب:** متغيرات Supabase غير مضافة في Netlify، أو قاعدة البيانات فارغة (لم تُطبّق الهجرات).

**الحل:**
1. في لوحة Netlify ← **Site settings** ← **Environment variables**، أضف:
   - `VITE_SUPABASE_URL` = رابط مشروع Supabase
   - `VITE_SUPABASE_ANON_KEY` = المفتاح العام
2. أعد النشر (Redeploy)
3. تأكد أنك طبّقت ملف `supabase/setup_database.sql` في Supabase SQL Editor

### المشكلة: "Invalid signature" في Webhook

**السبب:** `CHARGILY_SECRET_KEY` غير مُعد أو غير صحيح.

**الحل:** أضف المفتاح السري الصحيح من Chargily في Supabase → Edge Functions → Secrets.

### المشكلة: المعاملات لا تتحدث

**السبب:** رابط webhook في Chargily غير صحيح.

**الحل:** حدّث رابط webhook في لوحة Chargily إلى:
```
https://[PROJECT_ID].supabase.co/functions/v1/chargily-webhook
```

### المشكلة: لا يمكن رفع الصور أو الملفات

**السبب:** buckets التخزين غير مُنشأة أو غير عامة.

**الحل:** في لوحة Supabase → Storage، أنشئ buckets:
- `portfolio-images` (Public)
- `product-files` (Public)

### المشكلة: تسجيل الدخول لا يعمل

**السبب:** Email Confirmation مُفعّل في Supabase.

**الحل:** في لوحة Supabase → Authentication → Providers → Email، عطّل "Confirm email".

### المشكلة: لوحة الإدارة لا تظهر

**السبب:** حسابك لا يملك صلاحية `is_admin`.

**الحل:** في Supabase → Table Editor → profiles، اضبط `is_admin = true` لحسابك.

---

## الترخيص

هذا المشروع مُرخّص للاستخدام الخاص. جميع الحقوق محفوظة.
