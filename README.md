# تقویم شمسی Moonshid

**`moonshid-jalali-datepicker`** یک پکیج جاوااسکریپت سبک و ساده برای ایجاد تقویم شمسی در وب‌سایت شماست. این تقویم بدون نیاز به هیچ وابستگی خارجی، امکان انتخاب تاریخ را با رابط کاربری فارسی فراهم می‌کند.

---

### **ویژگی‌ها**

- **کاملاً شمسی**: بر اساس تاریخ جلالی (شمسی) طراحی شده است.
- **بسیار سبک**: حجم کمی دارد و به هیچ کتابخانه دیگری (مانند jQuery) وابسته نیست.
- **استفاده آسان**: فقط با یک خط کد جاوااسکریپت می‌توانید آن را در هر پروژه‌ای پیاده‌سازی کنید.
- **پشتیبانی از زبان فارسی**: شامل نام ماه‌ها و روزهای هفته به زبان فارسی است.
- **سازگار با مرورگرها**: در مرورگرهای مدرن به خوبی کار می‌کند.

---

### **نصب و استفاده**

شما می‌توانید از این تقویم به دو روش زیر استفاده کنید:

#### **۱. نصب از طریق CDN (برای استفاده سریع و آسان)**

این روش برای وب‌سایت‌های ساده که نیاز به نصب پکیج ندارند ایده‌آل است. کافی است لینک زیر را در فایل HTML خود قرار دهید:

1.  **کد HTML:**

    یک تگ `<input>` با `id` دلخواه ایجاد کنید و سپس کد زیر را به انتهای تگ `<body>` اضافه کنید.

    ```html
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <title>تقویم شمسی</title>
        <style>
          body {
            font-family: "Tahoma", sans-serif;
            direction: rtl;
            text-align: right;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 400px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          #myDatePicker {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 6px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>انتخاب تاریخ</h1>
          <p>لطفاً تاریخ مورد نظر خود را انتخاب کنید.</p>
          <input
            type="text"
            id="myDatePicker"
            placeholder="تاریخ را انتخاب کنید"
          />
        </div>

        <script src="[https://cdn.jsdelivr.net/gh/](https://cdn.jsdelivr.net/gh/)<نام کاربری گیت‌هاب شما>/moonshid-jalali-datepicker@1.0.0/dist/moonshid-jalali-datepicker.min.js"></script>

        <script>
          document.addEventListener("DOMContentLoaded", () => {
            new JalaliDatePicker("myDatePicker");
          });
        </script>
      </body>
    </html>
    ```

#### **۲. نصب از طریق NPM (برای توسعه‌دهندگان فرانت‌اند)**

اگر در حال کار بر روی یک پروژه جاوااسکریپت با NPM هستید، می‌توانید پکیج را به راحتی نصب کنید.

1.  **دستور نصب:**

    ```bash
    npm install moonshid-jalali-datepicker
    ```

2.  **استفاده در کد جاوااسکریپت:**
    پس از نصب، پکیج را در فایل جاوااسکریپت خود `import` کرده و استفاده کنید.

    ```javascript
    import JalaliDatePicker from "moonshid-jalali-datepicker";

    document.addEventListener("DOMContentLoaded", () => {
      new JalaliDatePicker("myDatePicker");
    });
    ```

---

### **توسعه و همکاری**

از اینکه به این پروژه علاقه‌مندید متشکریم! اگر تمایل به همکاری دارید، لطفاً مراحل زیر را دنبال کنید:

1.  ریپازیتوری را **Fork** کنید.
2.  ویژگی‌های جدید را در یک شاخه (Branch) جدید توسعه دهید: `git checkout -b feature/new-feature-name`
3.  تغییرات خود را **Commit** کنید: `git commit -m 'Add a new feature'`
4.  شاخه را به ریپازیتوری خود **Push** کنید: `git push origin feature/new-feature-name`
5.  یک **Pull Request** ایجاد کنید.

---

### **مجوز (License)**

این پروژه تحت مجوز ISC منتشر شده است.

---

**ساخته شده با ❤️ توسط moonshid.ir**
