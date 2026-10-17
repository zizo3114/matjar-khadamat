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
│   ├── migrations/                    # هجرات قاعدة البيانات
│   └── functions/
│       ├── chargily-checkout/         # إنشاء جلسة دفع
│       └── chargily-webhook/          # استقبال إشعارات الدفع
├── public/
│   ├── hero-bg.webp                   # صورة الخلفية
│   └── robots.txt                     # توجيه محركات البحث
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

### الطريقة الثانية: النشر على Netlify

```
npm i -g netlify-cli
npm run build
netlify deploy --prod
```

أضف ملف `public/_redirects` بمحتوى:
```
/*    /index.html   200
```

> هذا الملف ضروري لأن الموقع SPA (صفحة واحدة) — كل المسارات يجب أن توجّه إلى `index.html`.

أضف متغيرات البيئة في لوحة Netlify:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

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

الهجرات تُطبق عبر Supabase MCP ولا تُطبق بكتابتها في المجلد يدوياً:

```
supabase/migrations/
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

1. اذهب إلى لوحة Supabase → **Storage**
2. اضغط **New Bucket**
3. أنشئ مجلداً باسم `portfolio-images`:
   - **Public bucket**: ✓ (فعّل هذا الخيار)
   - اضغط **Save**
4. كرّر العملية وأنشئ مجلداً باسم `product-files`:
   - **Public bucket**: ✓ (فعّل هذا الخيار)
   - اضغط **Save**

> **لماذا "Public"؟** لأن الصور يجب أن تظهر للزوار بدون تسجيل دخول. المجلد العام يسمح بقراءة الصور للجميع، لكن الرفع والتعديل يبقى محمياً بسياسات RLS — لا يمكن لأي شخص رفع ملفات إلا إذا كان مسجلاً.

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

### لماذا تحتاج Supabase خاص بك؟

المشروع الحالي مربوط بـ Supabase جاهز (أُنشئ أثناء التطوير). أنت لا تملك الوصول لحسابه. إذا أردت تحكماً كاملاً — رؤية البيانات، تعديل الجداول، إدارة المستخدمين — يجب أن تنشئ Supabase خاص بك وتربط المشروع به.

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

القاعدة الجديدة فارغة تماماً. يجب إنشاء كل الجداول والعلاقات والدوال. الهجرات موجودة في المشروع في مجلد `supabase/migrations/` — لكنها لا تُطبق تلقائياً بمجرد نسخ الملفات.

**كيف تُطبق الهجرات؟**

هذا الجزء يحتاج تطبيقها على Supabase. هناك طريقتان:

#### الطريقة الأولى: عبر Supabase SQL Editor (يدوياً)

1. في لوحة Supabase، اذهب إلى **SQL Editor**
2. اضغط **New query**
3. افتح كل ملف في مجلد `supabase/migrations/` بمحرر نصوص على حاسوبك
4. انسخ محتواه بالكامل والصقه في SQL Editor
5. اضغط **Run**
6. كرّر ذلك مع كل ملف **بالترتيب** (من الأقدم للأحدث حسب التاريخ في اسم الملف):

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
└── 20261017003412_add_stock_to_listings.sql               ← انتهِ بهذا
```

> **تنبيه:** الترتيب مهم! كل هجرة تعتمد على التي قبلها. إذا طبقتها بترتيب خاطئ ستحصل على أخطاء.

#### الطريقة الثانية: عبر Supabase MCP (تلقائياً)

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
| 4 | طبّق كل الهجرات بالترتيب | Supabase SQL Editor |
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
| **أسعار الاشتراكات** | `src/pages/pricing.tsx` | `src` ← `pages` ← `pricing.tsx` | الأسعار والمميزات |
| **وصف الموقع لمحركات البحث** | `index.html` | جذر المشروع | وسوم `<title>` و `<meta name="description">` |
| **صورة الخلفية للرئيسية** | `public/hero-bg.webp` | `public` ← `hero-bg.webp` | استبدل بصورتك مع الحفاظ على نفس الاسم والامتداد |
| **توجيه محركات البحث** | `public/robots.txt` | `public` ← `robots.txt` | عدّل القيم حسب حاجتك |
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
├── public/                 ← ملفات ثابتة (صور، robots.txt)
├── supabase/               ← كل ما يخص الخلفية (قاعدة البيانات + الدوال)
│   ├── migrations/         ← أوامر إنشاء الجداول (لا تلمسها)
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
- **Nginx:** `try_files $uri $uri/ /index.html;`
- **Netlify:** ملف `public/_redirects` بمحتوى `/* /index.html 200`
- **Vercel:** تتم تلقائياً

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
