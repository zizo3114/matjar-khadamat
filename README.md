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
