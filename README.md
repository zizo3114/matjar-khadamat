# SupportLocal — منصة دعم المبدعين الجزائريين

منصة متكاملة تتيح للمبدعين الجزائريين إنشاء صفحاتهم الخاصة، استقبال الدعم المالي (Tips)، وبيع المنتجات الرقمية. تستخدم الدفع المحلي عبر Chargily Pay (Edahabia & CIB).

## المحتويات

- [نظرة عامة](#نظرة-عامة)
- [التقنيات المستخدمة](#التقنيات-المستخدمة)
- [هيكل المشروع](#هيكل-المشروع)
- [المتطلبات](#المتطلبات)
- [التشغيل المحلي](#التشغيل-المحلي)
- [متغيرات البيئة](#متغيرات-البيئة)
- [قاعدة البيانات](#قاعدة-البيانات)
- [الدفع عبر Chargily](#الدفع-عبر-chargily)
- [الأمان](#الأمان)
- [النشر والإنتاج](#النشر-والإنتاج)
- [SEO والأداء](#seo-والأداء)
- [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## نظرة عامة

SupportLocal هي منصة تجمع المبدعين والداعمين في مكان واحد:

**للمبدعين (Creators):**
- إنشاء صفحة عامة برابط مخصص (`/u/username`)
- استقبال الدعم المالي المباشر (Tips)
- بيع المنتجات الرقمية (PDF, ZIP, صور, فيديو, صوت)
- عرض أعمالهم في معرض (Portfolio)
- لوحة تحكم بالإحصائيات والأرباح
- طلب سحب الأرباح إلى حساب CCP/RIP

**للداعمين (Supporters):**
- تصفح صفحات المبدعين
- إرسال الدعم المالي
- شراء المنتجات الرقمية
- تحميل المنتجات بعد الدفع

---

## التقنيات المستخدمة

| التقنية | الاستخدام |
|---------|-----------|
| **React 19** | واجهة المستخدم |
| **Vite 7** | أداة البناء والتطوير |
| **TypeScript** | لغة البرمجة |
| **Tailwind CSS v4** | التصميم |
| **shadcn/ui** | مكتبة المكونات |
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
│   ├── App.tsx                    # التطبيق الرئيسي + المسارات
│   ├── main.tsx                   # نقطة الدخول
│   ├── index.css                  # ألوان وتصميم Tailwind
│   ├── components/
│   │   ├── ui/                    # مكونات shadcn/ui
│   │   ├── mode-toggle.tsx        # زر تبديل الوضع الليلي/النهاري
│   │   ├── route-guards.tsx       # حماية المسارات
│   │   └── theme-provider.tsx     # مزود السمة
│   ├── contexts/
│   │   └── auth-context.tsx       # سياق المصادقة
│   ├── lib/
│   │   ├── supabase.ts            # عميل Supabase + دوال مساعدة
│   │   ├── utils.ts               # دوال مساعدة عامة
│   │   ├── use-seo-meta.ts        # تحديث وسوم SEO ديناميكياً
│   │   └── sitemap.ts             # مولد الخريطة الموقعية
│   └── pages/
│       ├── login.tsx              # تسجيل الدخول
│       ├── register.tsx           # إنشاء حساب
│       ├── dashboard.tsx          # لوحة التحكم
│       ├── edit-profile.tsx       # تعديل الملف الشخصي
│       ├── portfolio.tsx          # إدارة معرض الأعمال
│       ├── products.tsx           # إدارة المنتجات الرقمية
│       ├── analytics.tsx          # الإحصائيات والأرباح
│       ├── withdraw.tsx           # طلبات السحب
│       ├── link-in-bio.tsx        # الصفحة العامة للمبدع
│       ├── payment-success.tsx    # صفحة نجاح الدفع
│       ├── payment-failed.tsx     # صفحة فشل الدفع
│       └── download.tsx           # تحميل المنتج بعد الدفع
├── supabase/
│   ├── config.toml                # إعدادات Edge Functions
│   ├── migrations/                # هجرات قاعدة البيانات
│   └── functions/
│       ├── chargily-checkout/     # إنشاء جلسة دفع
│       └── chargily-webhook/      # استقبال إشعارات الدفع
├── public/
│   └── robots.txt                 # توجيه محركات البحث
├── index.html                     # وسوم SEO و Open Graph
├── vite.config.ts                 # إعدادات البناء + تقسيم الكود
└── package.json
```

---

## المتطلبات

- **Node.js** 18+ (يُفضّل 20+)
- **npm** 10+
- حساب **Supabase** (مُجهز مسبقاً في هذا المشروع)
- حساب **Chargily Pay** للحصول على مفتاح API سري

---

## التشغيل المحلي

### 1. تثبيت الحزم

```bash
npm install
```

### 2. متغيرات البيئة

ملف `.env` موجود ومُعبأ مسبقاً ببيانات Supabase. تحتاج فقط لإضافة مفتاح Chargily السري كـ Edge Function Secret (انظر قسم [الدفع عبر Chargily](#الدفع-عبر-chargily)).

### 3. تشغيل بيئة التطوير

```bash
npm run dev
```

الموقع سيعمل على `http://localhost:5173`

### 4. بناء المشروع للإنتاج

```bash
npm run build
```

الملفات الجاهزة للنشر ستكون في مجلد `dist/`.

### 5. معاينة بناء الإنتاج محلياً

```bash
npm run preview
```

### 6. فحص الأنواع (TypeScript)

```bash
npm run typecheck
```

---

## متغيرات البيئة

### ملف `.env` (الواجهة الأمامية)

| المتغير | الوصف |
|---------|-------|
| `VITE_SUPABASE_URL` | رابط مشروع Supabase |
| `VITE_SUPABASE_ANON_KEY` | مفتاح Supabase العام (Anon Key) |

> **ملاحظة:** المفتاح العام (Anon Key) آمن للاستخدام في الواجهة الأمامية. المفتاح السري (Service Role Key) يُستخدم فقط في Edge Functions ولا يظهر في كود الواجهة.

### أسرار Edge Functions

هذه الأسرار مُعدة على خادم Supabase ولا تحتاج لإضافتها يدوياً:

| الاسم | الوصف |
|-------|-------|
| `SUPABASE_URL` | رابط Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | مفتاح Supabase السري (Service Role) |
| `CHARGILY_SECRET_KEY` | مفتاح Chargily Pay السري |

### لإضافة مفتاح Chargily الخاص بك

استبدل `CHARGILY_SECRET_KEY` بقيمتك من لوحة تحكم Chargily:

```bash
supabase secrets set CHARGILY_SECRET_KEY=sk_test_xxxxxx
```

أو من خلال لوحة تحكم Supabase: **Project Settings → Edge Functions → Secrets**.

---

## قاعدة البيانات

### الجداول

| الجدول | الوصف |
|--------|-------|
| `profiles` | ملفات المستخدمين (اسم، دور، صورة، روابط، رصيد) |
| `portfolio_items` | أعمال المبدع (صور + روابط) |
| `digital_products` | المنتجات الرقمية (عنوان، سعر، ملف) |
| `transactions` | المعاملات المالية (دعم/شراء، الحالة، المبلغ) |
| `withdrawal_requests` | طلبات سحب الأرباح (CCP/RIP، الحالة) |

### الهجرات (Migrations)

الهجرات تُطبق تلقائياً. لمراجعتها:

```
supabase/migrations/
├── 20261016194021_creator_platform_phase1.sql          # الجداول الأساسية + المصادقة
├── 20261016201113_creator_platform_phase3.sql          # المنتجات الرقمية + المعاملات
├── 20261016201906_creator_platform_phase4.sql          # بوابات الدفع + webhook
├── 20261016204122_creator_platform_phase5.sql          # طلبات السحب + دالة request_withdrawal
├── 20261016204143_creator_platform_phase5_increment_balance.sql  # دالة increment_balance
├── 20261016205201_creator_platform_phase5_security_fix.sql       # إصلاح أمني (1)
└── 20261016205227_creator_platform_phase5_security_fix_v2.sql    # إصلاح أمني (2)
```

### دوال قاعدة البيانات

| الدالة | الوصف | الصلاحيات |
|-------|-------|-----------|
| `increment_balance(profile_id, amount)` | زيادة رصيد المبدع عند نجاح الدفع | Service Role فقط |
| `request_withdrawal(amount, ccp_rip, full_name)` | طلب سحب آمن (يتحقق من الرصيد ذرياً) | المستخدمون المسجلون فقط |
| `handle_new_user()` | إنشاء ملف تلقائياً عند التسجيل | دالة مشغل (غير قابلة للاستدعاء عبر API) |
| `set_updated_at()` | تحديث `updated_at` تلقائياً | دالة مشغل (غير قابلة للاستدعاء عبر API) |

---

## الدفع عبر Chargily

### كيف يعمل الدفع

1. **المستخدم** يضغط "دعم" أو "شراء" على صفحة المبدع
2. **Edge Function** `chargily-checkout` تنشئ جلسة دفع في Chargily وتسجّل معاملة بحالة `pending`
3. **المستخدم** يُوجَّه إلى صفحة دفع Chargily (Edahabia أو CIB)
4. بعد الدفع، **Chargily** يرسل webhook إلى `chargily-webhook`
5. **Edge Function** `chargily-webhook` تتحقق من التوقيع (HMAC-SHA256)، تحدّث حالة المعاملة إلى `paid`، وتزيد رصيد المبدع
6. **المستخدم** يُوجَّه إلى صفحة النجاح مع رابط التحميل (للمنتجات)

### إعداد Webhook في Chargily

1. سجّل دخولك في [Chargily Pay](https://epay.chargily.com)
2. اذهب إلى إعدادات Webhook
3. ضع الرابط التالي:
   ```
   https://[YOUR_SUPABASE_PROJECT_ID].supabase.co/functions/v1/chargily-webhook
   ```
4. تأكد من تفعيل webhook لأحداث `checkout.paid`, `checkout.failed`, `checkout.canceled`

### نشر Edge Functions

Edge Functions مُنشأة ومُعدة في `supabase/config.toml`. لإعادة النشر بعد تعديلها:

```bash
# من خلال أداة Bolt أو Supabase MCP
deploy_edge_functions
```

> **ملاحظة:** لا تستخدم `npx supabase` CLI — غير مدعوم في بيئة Bolt. استخدم أدوات MCP.

---

## الأمان

### حماية الصفوف (RLS)

جميع الجداول لديها RLS مُفعّل. لا يمكن الوصول للبيانات بدون سياسات صريحة:

- **profiles**: قراءة عامة، تعديل/حذف للمالك فقط
- **portfolio_items**: قراءة عامة، تعديل/حذف للمالك فقط
- **digital_products**: قراءة عامة، تعديل/حذف للمالك فقط
- **transactions**: قراءة للمالك، إدراج عام (للدفع)
- **withdrawal_requests**: قراءة وإدراج للمالك فقط

### حماية الدوال (SECURITY DEFINER)

- `increment_balance`: لا يمكن استدعاؤها إلا عبر Service Role (Edge Functions)
- `request_withdrawal`: تتطلب جلسة مستخدم مسجّل (`auth.uid()`)
- دوال المشغلات: غير قابلة للاستدعاء عبر REST API إطلاقاً

### التحقق من توقيع Webhook

Edge Function `chargily-webhook` تتحقق من توقيع HMAC-SHA256 لكل طلب باستخدام `CHARGILY_SECRET_KEY`. أي طلب بدون توقيع صحيح يُرفض فوراً.

### السحب الآمن

دالة `request_withdrawal`:
- تتحقق ذرياً (atomic) من الرصيد قبل الخصم — لا يمكن سحب أكثر من المتاح
- الحد الأدنى للسحب: 2,000 DZD
- رقم CCP/RIP يجب أن يكون 20 رقماً بالضبط
- تمنع حالات السباق (race conditions) باستخدام `FOR UPDATE` lock

---

## النشر والإنتاج

### نشر الواجهة الأمامية (Vite SPA)

#### الخيار 1: Bolt (الأسهل)

استخدم زر النشر في واجهة Bolt — سيقوم بنشر المشروع تلقائياً مع تكوين المسارات.

#### الخيار 2: Vercel

```bash
npm i -g vercel
vercel
```

أضف متغيرات البيئة في لوحة تحكم Vercel:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

أضف قاعدة إعادة كتابة (Rewrite) في `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

#### الخيار 3: Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

أضف ملف `public/_redirects`:
```
/*    /index.html   200
```

#### الخيار 4: أي خادم ثابت (Nginx, Apache)

```bash
npm run build
# انسخ محتويات dist/ إلى خادمك
```

إعداد Nginx للـ SPA:
```nginx
server {
    listen 80;
    server_name supportlocal.dz;
    root /var/www/supportlocal/dist;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|svg|ico|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### نشر البنية التحتية (Supabase)

Supabase مُجهز ومُعد مسبقاً. للإنتاج:

1. **اعد URL الويبوك** في Chargily ليشير إلى رابط الإنتاج:
   ```
   https://[PROJECT_ID].supabase.co/functions/v1/chargily-webhook
   ```

2. **أضف مفاتيح Chargily** كـ Edge Function Secrets في Supabase

3. **إعدادات المصادقة**: في لوحة Supabase → Authentication:
   - فعّل Email/Password
   - عطّل Email Confirmation (للتسجيل المباشر)

4. **إعدادات التخزين**: تأكد أن buckets التالية عامة (Public):
   - `portfolio-images`
   - `product-files`

### شهادة SSL (Let's Encrypt)

```bash
sudo certbot --nginx -d supportlocal.dz
```

---

## SEO والأداء

### وسوم Open Graph

ملف `index.html` يحتوي على وسوم OG افتراضية. عند زيارة صفحة مبدع (`/u/username`)، تتحدث الوسوم ديناميكياً لتعرض:
- اسم المبدع في العنوان
- النبذة (bio) في الوصف
- صورة المبدع (avatar) في صورة المعاينة

### robots.txt

يسمح لمحركات البحث بفهرسة الصفحات العامة ويمنع الوصول للصفحات الخاصة.

### الخريطة الموقعية (Sitemap)

ملف `src/lib/sitemap.ts` يولّد خريطة موقع XML ديناميكية من جميع المبدعين المسجلين.

### تحسينات الأداء

- **تقسيم الكود (Code Splitting)**: البناء مقسّم إلى 6 حزم منفصلة (React, Supabase, Charts, Forms, UI, App) لتحميل أسرع
- **التخزين المؤقت للموارد الثابتة**: إعدادات Nginx تضع `Cache-Control: immutable` للملفات الثابتة
- **التحميل الكسول**: React Router يقسّم الصفحات تلقائياً

---

## استكشاف الأخطاء

### المشكلة: صفحة بيضاء بعد النشر

**السبب:** إعادة توجيه المسارات غير مُعدة للـ SPA.

**الحل:** أضف قاعدة إعادة كتابة (rewrite) لترسل كل الطلبات إلى `index.html` (انظر قسم النشر).

### المشكلة: "Invalid signature" في Webhook

**السبب:** `CHARGILY_SECRET_KEY` غير مُعد أو غير صحيح.

**الحل:** تأكد من إضافة المفتاح السري الصحيح من Chargily كـ Edge Function Secret.

### المشكلة: المعاملات لا تتحدث

**السبب:** webhook URL في Chargily لا يشير إلى الرابط الصحيح.

**الحل:** حدّث رابط webhook في لوحة Chargily ليشير إلى:
```
https://[PROJECT_ID].supabase.co/functions/v1/chargily-webhook
```

### المشكلة: "Failed to increment balance"

**السبب:** دالة `increment_balance` لا تملك صلاحيات، أو `profile_id` غير صحيح.

**الحل:** تأكد أن Service Role Key مُعد كـ Edge Function Secret، وأن المعاملة تملك `profile_id` صحيح.

### المشكلة: لا يمكن رفع الصور

**السبب:** buckets التخزين غير مُنشأة أو غير عامة.

**الحل:** في لوحة Supabase → Storage، أنشئ buckets:
- `portfolio-images` (Public)
- `product-files` (Public)

### المشكلة: تسجيل الدخول لا يعمل

**السبب:** Email Confirmation مُفعّل في Supabase.

**الحل:** في لوحة Supabase → Authentication → Providers → Email، عطّل "Confirm email".

---

## الترخيص

هذا المشروع مُرخّص للاستخدام الخاص. جميع الحقوق محفوظة.
