# ملخص مشروع Ekhdemli — منصة الخدمات والمنتجات الرقمية

> هذا الملف مرجع شامل يشرح كيف بُني الموقع، ما التقنيات المستخدمة، ما الخدمات الخارجية المربوطة، وكيف يمكنك أنت أيضاً بناء موقع مماثل من الصفر.

---

## فكرة المشروع

**Ekhdemli** هي منصة جزائرية متكاملة للسوق متعدد البائعين (Multi-vendor Marketplace). تتيح للبائعين نشر خدماتهم ومنتجاتهم الرقمية، وللمشترين تصفحها وطلبها بأمان عبر نظام الضمان (Escrow) والدفع المحلي عبر Chargily Pay (Edahabia & CIB).

### من يستخدم المنصة؟

| المستخدم | ماذا يفعل |
|----------|----------|
| **البائع** | ينشئ حساباً، ينشر خدمات/منتجات رقمية، يحدد الأسعار ومدة التسليم، يستلم الأرباح بعد تأكيد التسليم |
| **المشتري** | يصفح الخدمات والمنتجات، يطلبها بأمان، يدفع عبر Chargily، يقيم البائع بعد التسليم |
| **الإدارة** | تدير المنصة، تراجع طلبات الضمان، تدير الأعضاء، تطّلع على المحادثات والطلبات |

### التصنيفات المدعومة

**7 تصنيفات للخدمات:** تصميم، تعليق صوتي، تصميم وتطوير المواقع، مونتاج فيديو، كتابة وترجمة، إدارة سوشيال ميديا، SEO وتسويق.

**6 تصنيفات للمنتجات:** اشتراكات، قوالب مواقع جاهزة، ألعاب ومفاتيح، حسابات رقمية، برامج وتراخيص، كتب ودورات.

---

## التقنيات المستخدمة

### لغة البرمجة
- **TypeScript** — لغة البرمجة الرئيسية لكامل المشروع (واجهة + دوال الخادم)

### الواجهة الأمامية (Frontend)
| التقنية | الإصدار | الاستخدام |
|---------|---------|-----------|
| **React** | 19 | إطار واجهة المستخدم |
| **Vite** | 7 | أداة البناء والتطوير السريع |
| **TypeScript** | ~5.9 | كتابة كود آمن من أخطاء الأنواع |
| **Tailwind CSS** | v4 | تصميم الواجهة بنظام CSS Variables و OKLCH |
| **shadcn/ui (Radix UI)** | new-york style | مكتبة المكونات (أزرار، نوافذ، جداول، نماذج...) |
| **Lucide React** | 1.6 | أيقونات الموقع |
| **React Router** | v7 | التنقل بين الصفحات |
| **React Hook Form + Zod** | 7.72 / 4.3 | النماذج والتحقق من المدخلات |
| **Recharts** | 3.8 | الرسوم البيانية في لوحة التحكم |
| **Sonner** | 2.0 | إشعارات Toast |
| **next-themes** | 0.4 | الوضع الليلي/النهاري |

### الخلفية (Backend)
| التقنية | الاستخدام |
|---------|-----------|
| **Supabase (PostgreSQL)** | قاعدة البيانات + المصادقة + التخزين + Edge Functions |
| **Supabase Auth** | تسجيل الدخول والتسجيل (Email/Password) |
| **Supabase Storage** | تخزين الصور والملفات (مجلدات portfolio-images و product-files) |
| **Supabase Edge Functions (Deno)** | دوال الخادم: الدفع واستقبال Webhooks |
| **RLS (Row Level Security)** | حماية كل جدول على مستوى الصفوف |

### الدفع
| التقنية | الاستخدام |
|---------|-----------|
| **Chargily Pay** | بوابة الدفع الجزائرية (Edahabia & CIB) |
| **HMAC-SHA256** | التحقق من توقيع Webhook |

### الاستضافة والنشر
| التقنية | الاستخدام |
|---------|-----------|
| **Netlify** | استضافة الواجهة الأمامية (Frontend) مجاناً |
| **Supabase Cloud** | استضافة قاعدة البيانات والدوال في السحابة |

---

## الخدمات الخارجية المربوطة

### 1. Supabase (قاعدة البيانات + المصادقة + التخزين + الدوال)

**ما هو؟** منصة سحابية توفر قاعدة بيانات PostgreSQL + مصادقة مستخدمين + تخزين ملفات + دوال خادم (Edge Functions)، كلها في مكان واحد.

**كيف ربطناه؟**
1. أنشأنا حساباً على [supabase.com](https://supabase.com)
2. أنشأنا مشروعاً جديداً
3. نسخنا `Project URL` و `anon public key` من Project Settings → API
4. وضعناهما في ملف `.env`:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
   ```
5. طبّقنا هجرات قاعدة البيانات (SQL Migrations) لإنشاء الجداول والسياسات والدوال
6. نشّرنا Edge Functions (دوال الدفع) على Supabase

**الخطة المجانية ($0.00):**
| المورد | الحد المجاني |
|--------|-------------|
| مساحة قاعدة البيانات | 500 ميجابايت |
| مستخدمون نشطون شهرياً | 50,000 |
| تخزين الملفات | 1 جيجابايت |
| نقل البيانات | 5 جيجابايت شهرياً |

> هذه الأرقام كافية جداً لمرحلة البداية والانتشار.

### 2. Chargily Pay (بوابة الدفع)

**ما هو؟** بوابة دفع جزائرية تدعم بطاقات Edahabia (بريد الجزائر) و CIB (البنوك الجزائرية).

**كيف ربطناه؟**
1. أنشأنا حساباً على [epay.chargily.com](https://epay.chargily.com)
2. حصلنا على المفتاح السري `CHARGILY_SECRET_KEY`
3. أضفنا المفتاح في Supabase → Edge Functions → Secrets
4. وضعنا رابط Webhook في لوحة Chargily:
   ```
   https://[PROJECT_ID].supabase.co/functions/v1/chargily-webhook
   ```

**ماذا يعالج الـ Webhook؟**
- دفع الطلبات (الضمان/Escrow)
- دفع الاشتراكات (basic / pro)

### 3. Netlify (الاستضافة)

**ما هو؟** منصة استضافة مجانية للمواقع الثابتة (Static Sites) وتطبيقات الصفحة الواحدة (SPA).

**كيف ربطناه؟**
1. أنشأنا حساباً على [netlify.com](https://app.netlify.com)
2. ربطنا مستودع GitHub
3. ضبطنا:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. أضفنا متغيرات البيئة في لوحة Netlify:
   - `VITE_SUPABASE_URL` = رابط Supabase
   - `VITE_SUPABASE_ANON_KEY` = المفتاح العام
5. ضبطنا إعادة توجيه المسارات عبر ملف `public/_redirects` وملف `netlify.toml`

**حل مشكلة المسارات (SPA Routing):**
مواقع React التي تستخدم React Router تواجه مشكلة خطأ 404 عند تحديث صفحة فرعية (مثل `/login`). الحل هو توجيه كل المسارات إلى `index.html`:

ملف `public/_redirects`:
```
/*    /index.html   200
```

ملف `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**إزالة شارة "Powered by Netlify":**
في لوحة Netlify → Site settings → General → Badge → عطّل "Display Netlify badge".

---

## بنية المشروع — كيف بُني الموقع

### مخطط المعمارية

```
                    ┌─────────────┐
                    │   المستخدم   │
                    │  (المتصفح)   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   Netlify    │  ← استضافة الواجهة (HTML/CSS/JS ثابت)
                    │  (Frontend)  │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────────┐
        │ Supabase │ │ Supabase │ │   Chargily   │
        │   Auth   │ │PostgreSQL│ │     Pay      │
        │(تسجيل    │ │(قاعدة    │ │  (Edahabia   │
        │ دخول)    │ │ البيانات)│ │   & CIB)     │
        └──────────┘ └────┬─────┘ └──────┬───────┘
                           │              │
                    ┌──────▼─────┐  ┌─────▼──────┐
                    │ Supabase   │  │  Edge      │
                    │  Storage   │  │  Function  │
                    │ (صور/ملفات)│  │ (webhook)  │
                    └────────────┘  └────────────┘
```

### كيف يتدفق البيانات

1. المستخدم يفتح الموقع على Netlify → يحصل على ملفات HTML/CSS/JS الثابتة
2. الموقع يتصل بـ Supabase (عبر `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY`)
3. المصادقة: تسجيل الدخول/التسجيل يتم عبر Supabase Auth
4. البيانات: قراءة/كتابة الخدمات والمنتجات والطلبات من PostgreSQL
5. الصور: تُرفع مباشرة من المتصفح إلى Supabase Storage
6. الدفع: الموقع يستدعي Edge Function → تستدعي Chargily → المستخدم يدفع → Chargily ترسل Webhook → Edge Function تحدّث قاعدة البيانات

---

## هيكل المجلدات

```
project/
├── src/                         ← كود الموقع (كل ما يراه الزائر)
│   ├── App.tsx                  ← التطبيق الرئيسي + تعريف المسارات
│   ├── main.tsx                 ← نقطة الدخول
│   ├── index.css                ← ألوان وتصميم Tailwind (OKLCH)
│   ├── components/
│   │   ├── ui/                  ← مكونات shadcn/ui الجاهزة (لا تُعدّل)
│   │   ├── marketplace-layout   ← شريط التنقل + التذييل
│   │   ├── listing-card         ← بطاقة خدمة/منتج
│   │   ├── category-icon        ← أيقونات التصنيفات
│   │   ├── rating-stars         ← نجوم التقييم
│   │   ├── admin-route          ← حماية مسار الإدارة
│   │   ├── route-guards         ← حماية المسارات (مسجل/زائر)
│   │   ├── mode-toggle          ← زر الوضع الليلي/النهاري
│   │   └── theme-provider       ← مزود السمة
│   ├── contexts/
│   │   └── auth-context         ← سياق المصادقة (تسجيل دخول/خروج)
│   ├── lib/
│   │   ├── supabase.ts          ← عميل Supabase + دوال مساعدة
│   │   ├── marketplace.ts       ← التصنيفات + دوال جلب الإعلانات + خطط الاشتراك
│   │   ├── utils.ts             ← دوال مساعدة عامة
│   │   ├── use-seo-meta.ts      ← تحديث وسوم SEO
│   │   └── sitemap.ts           ← مولد الخريطة الموقعية
│   └── pages/                   ← كل صفحة = ملف واحد
│       ├── home                 ← الصفحة الرئيسية
│       ├── browse-services      ← تصفح الخدمات
│       ├── browse-products      ← تصفح المنتجات
│       ├── service-detail       ← تفاصيل الخدمة
│       ├── product-detail       ← تفاصيل المنتج
│       ├── seller-profile       ← الملف العام للبائع
│       ├── login / register     ← تسجيل الدخول / إنشاء حساب
│       ├── seller-dashboard     ← لوحة تحكم البائع
│       ├── publish-service      ← نشر خدمة
│       ├── publish-product      ← نشر منتج
│       ├── my-orders            ← طلباتي
│       ├── messages             ← الرسائل
│       ├── admin                ← لوحة الإدارة
│       ├── pricing              ← صفحة الاشتراكات
│       ├── edit-profile         ← تعديل الملف الشخصي
│       ├── payment-success      ← نجاح الدفع
│       └── payment-failed       ← فشل الدفع
├── supabase/
│   ├── config.toml              ← إعدادات Edge Functions
│   ├── setup_database.sql       ← ★ ملف موحد: كل الجداول بضغطة زر
│   ├── migrations/              ← هجرات قاعدة البيانات (12 ملف SQL)
│   └── functions/
│       ├── chargily-checkout/   ← إنشاء جلسة دفع Chargily
│       └── chargily-webhook/    ← استقبال إشعارات الدفع + تحديث الحالات
├── public/
│   ├── _redirects               ← توجيه مسارات Netlify
│   ├── hero-bg.webp             ← صورة خلفية الصفحة الرئيسية
│   ├── robots.txt               ← توجيه محركات البحث
│   └── vite.svg                 ← أيقونة افتراضية
├── .env                         ← ★ متغيرات البيئة (الأهم)
├── index.html                   ← صفحة الموقع + وسوم SEO
├── netlify.toml                 ← إعدادات بناء وتوجيه Netlify
├── vite.config.ts               ← إعدادات البناء + تقسيم الكود
├── components.json              ← إعدادات shadcn/ui
└── package.json                 ← قائمة المكتبات
```

---

## قاعدة البيانات — الجداول

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
| `subscription_payments` | مدفوعات الاشتراكات (الباقة، المبلغ، الحالة، فترة الاشتراك) |
| `withdrawal_requests` | طلبات سحب الأرباح (CCP/RIP، حالة) |
| `portfolio_items` | أعمال البائع (صور + روابط) |
| `digital_products` | المنتجات الرقمية (ملفات قابلة للتحميل) |

### الهجرات (Migrations)

طبّقنا 12 هجرة SQL بالترتيب الزمني:

| # | الملف | ماذا يفعل |
|---|-------|----------|
| 1 | `creator_platform_phase1` | الجداول الأساسية + المصادقة + الملفات الشخصية |
| 2 | `creator_platform_phase3` | المنتجات الرقمية + المعاملات المالية |
| 3 | `creator_platform_phase4` | بوابات الدفع + webhook الأساسي |
| 4 | `creator_platform_phase5` | طلبات السحب |
| 5 | `phase5_increment_balance` | دالة زيادة الرصيد بشكل آمن |
| 6 | `phase5_security_fix` | إصلاح أمني على دالة الرصيد |
| 7 | `phase5_security_fix_v2` | إصلاح أمني إضافي |
| 8 | `ekhdemli_marketplace_schema` | سوق Ekhdemli: إعلانات، طلبات، رسائل، تقييمات |
| 9 | `ekhdemli_escrow_messaging_admin` | نظام الضمان + المراسلة + لوحة الإدارة |
| 10 | `ekhdemli_escrow_chargily_integration` | تكامل Chargily مع الضمان |
| 11 | `add_stock_to_listings` | إضافة عمود المخزون للإعلانات |
| 12 | `create_subscription_payments` | جدول مدفوعات الاشتراكات |

> **الأسهل:** استخدم ملف `supabase/setup_database.sql` الموحد — انسخه والصقه في Supabase SQL Editor واضغط Run. هذا يطبّق كل الهجرات دفعة واحدة بالترتيب الصحيح.

---

## Edge Functions (دوال الخادم)

### 1. chargily-checkout
- **الوظيفة:** تنشئ جلسة دفع على Chargily Pay
- **تعالج نوعين:**
  - **طلب ضمان (Escrow):** تستقبل `order_id` و `payer_email`، تنشئ جلسة دفع، تخزّن `checkout_id` على الطلب
  - **اشتراك (Subscription):** تستقبل `tier` و `amount` و `user_id`، تنشئ جلسة دفع، تسجّل دفعة pending في `subscription_payments`
- **CORS:** مُفعّل للسماح بالطلبات من المتصفح
- **verify_jwt:** false (دالة عامة)

### 2. chargily-webhook
- **الوظيفة:** تستقبل إشعارات الدفع من Chargily
- **التحقق:** تتحقق من توقيع HMAC-SHA256 لكل طلب — أي طلب بتوقيع غير صحيح يُرفض
- **تعالج:**
  - `checkout.paid` → تحدّث حالة الطلب/الاشتراك إلى "مدفوع"
  - `checkout.failed` → تحدّث الحالة إلى "فشل"
  - `checkout.canceled` → تحدّث الحالة إلى "ملغى"
- **verify_jwt:** false (دالة عامة — تستقبل طلبات من Chargily)

### المفاتيح السرية المطلوبة في Supabase
| الاسم | الوصف |
|------|-------|
| `SUPABASE_URL` | رابط مشروع Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | المفتاح السري (Service Role) |
| `CHARGILY_SECRET_KEY` | مفتاح Chargily Pay السري |
| `APP_URL` | رابط الموقع المنشور (لإعادة التوجيه بعد الدفع) |

---

## نظام الضمان (Escrow)

نظام الضمان يحمي المشتري والبائع معاً:

```
شراء → in_escrow (في الضمان) → delivered (تم التسليم) → confirmed (مؤكد) → اكتمال
                                    ↓
                              refunded (استرجاع)
```

| الحالة | المعنى |
|--------|--------|
| `in_escrow` | المال محجوز في الضمان بعد الدفع |
| `delivered` | البائع سلّم العمل/المنتج |
| `confirmed` | المشتري أكمل الاستلام → المال يُحوّل للبائع |
| `refunded` | الإدارة وافقت على استرجاع المال للمشتري |
| `auto_canceled` | الطلب يُلغى تلقائياً إذا لم يُسلّم في الوقت المحدد |

---

## نظام الاشتراكات

ثلاث باقات:

| الباقة | السعر | الحد الأقصى للإعلانات | العمولة |
|--------|-------|----------------------|---------|
| مجاني | 0 د.ج | 2 | 10% |
| أساسي | 1,500 د.ج/شهر | 10 | 7% |
| احترافي | 3,500 د.ج/شهر | غير محدود | 5% |

> أموال الاشتراك تُدفع مباشرة إلى حساب مالك المنصة في Chargily (وليس إلى الضمان).

---

## الأمان

### حماية الصفوف (RLS — Row Level Security)
كل جدول لديه RLS مُفعّل:
- **profiles**: قراءة عامة، تعديل للمالك فقط
- **listings**: قراءة عامة (الإعلانات النشطة)، إدارة للبائع فقط
- **orders**: قراءة للمشتري والبائع فقط
- **reviews**: قراءة عامة، إدراج بعد إتمام الطلب
- **messages**: قراءة لأطراف المحادثة فقط

### دوال آمنة (SECURITY DEFINER)
- `increment_balance`: لا تُستدعى إلا عبر Service Role
- `request_withdrawal`: تتطلب جلسة مستخدم مسجّل، تتحقق ذرياً من الرصيد
- `handle_new_user()`: إنشاء ملف تلقائياً عند التسجيل (دالة مشغل Trigger)

### التحقق من Webhook
Edge Function `chargily-webhook` تتحقق من توقيع HMAC-SHA256 لكل طلب.

---

## تقسيم الكود (Code Splitting)

ملف `vite.config.ts` يقسّم الكود إلى حزم (chunks) منفصلة لتسريع التحميل:

| الحزمة | المحتوى |
|--------|---------|
| `react-vendor` | React + React DOM + React Router |
| `supabase` | عميل Supabase |
| `charts` | Recharts (الرسوم البيانية) |
| `forms` | React Hook Form + Zod |
| `ui-primitives` | Radix UI + Lucide + أدوات CSS |

---

## متغيرات البيئة

### في ملف `.env` (الواجهة الأمامية)
| المتغير | الوصف |
|---------|-------|
| `VITE_SUPABASE_URL` | رابط مشروع Supabase |
| `VITE_SUPABASE_ANON_KEY` | المفتاح العام (آمن للعرض — صلاحياته محدودة بـ RLS) |

### في Supabase → Edge Functions → Secrets
| المتغير | الوصف |
|---------|-------|
| `SUPABASE_URL` | رابط Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | المفتاح السري (لا يظهر في الواجهة أبداً) |
| `CHARGILY_SECRET_KEY` | مفتاح Chargily Pay السري |
| `APP_URL` | رابط الموقع المنشور |

> **مهم:** ملف `.env` لا يُرفع إلى Netlify (مستثنى عبر `.gitignore`). يجب إضافة المتغيرات في لوحة تحكم Netlify نفسها.

---

## كيف تبني موقعاً مماثلاً من الصفر — خطوة بخطوة

### المرحلة 1: إعداد المشروع المحلي

1. **ثبّت Node.js** (إصدار 18+، يُفضّل 20+) من [nodejs.org](https://nodejs.org)
2. **أنشئ مشروع Vite + React + TypeScript:**
   ```bash
   npm create vite@latest my-marketplace -- --template react-ts
   cd my-marketplace
   npm install
   ```
3. **ثبّت shadcn/ui:**
   ```bash
   npx shadcn@latest init -t vite -d -y
   npx shadcn@latest add button card dialog input textarea select badge avatar tabs --all
   ```
4. **ثبّت المكتبات:**
   ```bash
   npm install @supabase/supabase-js react-router-dom lucide-react recharts react-hook-form @hookform/resolvers zod sonner next-themes
   ```

### المرحلة 2: ربط Supabase

1. اذهب إلى [supabase.com](https://supabase.com) وأنشئ مشروعاً جديداً
2. انسخ `Project URL` و `anon public key` من Settings → API
3. أنشئ ملف `.env` في جذر المشروع:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
   ```
4. أنشئ عميل Supabase في `src/lib/supabase.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js'
   export const supabase = createClient(
     import.meta.env.VITE_SUPABASE_URL,
     import.meta.env.VITE_SUPABASE_ANON_KEY
   )
   ```
5. طبّق هجرات قاعدة البيانات: انسخ محتوى `supabase/setup_database.sql` والصقه في SQL Editor واضغط Run
6. عطّل "Confirm email" في Authentication → Providers → Email

### المرحلة 3: إنشاء مجلدات التخزين

في Supabase → Storage، أنشئ مجلدين:
- `portfolio-images` (Public)
- `product-files` (Public)

### المرحلة 4: ربط Chargily Pay

1. أنشئ حساباً على [epay.chargily.com](https://epay.chargily.com)
2. احصل على المفتاح السري
3. في Supabase → Edge Functions → Secrets، أضف:
   - `CHARGILY_SECRET_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `APP_URL`
4. انشر Edge Functions (chargily-checkout و chargily-webhook)
5. في لوحة Chargily → Webhook Settings، ضع:
   ```
   https://[PROJECT_ID].supabase.co/functions/v1/chargily-webhook
   ```

### المرحلة 5: النشر على Netlify

1. ارفع المشروع إلى GitHub
2. في [netlify.com](https://app.netlify.com)، اضغط Add new site ← Import an existing project
3. اضبط:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. أضف متغيرات البيئة:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. اضغط Deploy
6. تأكد أن ملف `public/_redirects` موجود (لتوجيه المسارات)
7. (اختياري) اربط دومين خاص من Site settings → Domain management
8. (اختياري) عطّل شارة Netlify من Site settings → Badge

### المرحلة 6: إنشاء حساب الإدارة

1. سجّل حساباً في الموقع (صفحة `/register`)
2. في Supabase → Table Editor → `profiles`، اضبط `is_admin = true` لحسابك
3. الآن يمكنك الدخول إلى `/admin`

---

## مسارات التطبيق

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

## خلاصة

| الجانب | ما استخدمنا |
|--------|------------|
| **اللغة** | TypeScript |
| **الواجهة** | React 19 + Vite 7 + Tailwind CSS v4 + shadcn/ui |
| **القاعدة** | Supabase (PostgreSQL) |
| **المصادقة** | Supabase Auth (Email/Password) |
| **التخزين** | Supabase Storage |
| **الدفع** | Chargily Pay (Edahabia & CIB) |
| **دوال الخادم** | Supabase Edge Functions (Deno) |
| **الاستضافة** | Netlify (Frontend) + Supabase Cloud (Backend) |
| **التنقل** | React Router v7 |
| **النماذج** | React Hook Form + Zod |
| **الرسوم البيانية** | Recharts |
| **الأيقونات** | Lucide React |
| **الإشعارات** | Sonner |
| **الوضع الليلي** | next-themes |
| **الأمان** | RLS + SECURITY DEFINER + HMAC-SHA256 Webhook |

> هذا المشروع مثال كامل على كيفية بناء منصة سوق رقمية (Marketplace) مع نظام ضمان (Escrow)، دفع محلي جزائري (Chargily)، اشتراكات، مراسلة، ولوحة إدارة — كل ذلك باستخدام تقنيات مجانية بالكامل في مرحلة البداية.
