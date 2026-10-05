# GitHub’ga joylash

Loyiha `Behruzvibecoder/anatomio` bo‘sh public repoga yuborish uchun tayyorlangan. `anatomio-source.zip` arxivini oching, terminalda `index.html` turgan papkaga kiring va quyidagilarni bajaring:

```bash
git init -b main
git add .gitignore README.md PUSH_TO_GITHUB.md index.html assets
git commit -m "Add Duolingo homepage recreation"
git remote add origin https://github.com/Behruzvibecoder/anatomio.git
git push -u origin main
```

GitHub’га login qilish uchun o‘z kompyuteringizda GitHub CLI bo‘lsa, avval `gh auth login` ni ishga tushiring. Token yoki parolni chatga yubormang. Agar `origin` allaqachon mavjud bo‘lsa:

```bash
git remote set-url origin https://github.com/Behruzvibecoder/anatomio.git
```
