# 📰 Ege Ajans Haber Asistanı (News Editor AI)

![Version](https://img.shields.io/badge/version-11.0-blue.svg) 
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-googlechrome.svg) 
![Powered By](https://img.shields.io/badge/Powered%20By-Gemini--3--Flash--Preview-orange) 
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Ege Ajans Haber Asistanı**, Ege Üniversitesi Haber Ajansı (Ege Ajans) yayın standartlarına uygun, profesyonel haber metinleri oluşturmak için tasarlanmış, yapay zeka destekli bir Google Chrome eklentisidir. 

Muhabirlerin ve editörlerin etkinlik notlarından, ham bilgilerden veya görsellerden saniyeler içinde kurumsal dilde haber üretmesini sağlar.

---

## 🌟 Öne Çıkan Özellikler

### 🧠 Akıllı Haber Yazım Motoru
*   **Google Gemini 3 Flash Preview:** En güncel ve hızlı dil modeli entegrasyonu.
*   **Ege Ajans Kurumsal Kimliği:** `euegeajans.com` üslubunda, akıcı ve profesyonel yazım dili.
*   **Dinamik Rektör Demeci:** Haber içeriğine göre **Rektör Prof. Dr. Musa ALCI** adına kurumsal görüşler kurgular.
*   **Multimodal Analiz:** Fotoğrafları analiz ederek metne doğal bir akışla yedirir.

### 🎨 Profesyonel UX/UI Tasarımı
*   **Yüzer & Taşınabilir (Draggable):** Pencereyi ekranın istediğiniz yerine taşıyın, çalışma alanınızı kapatmasın.
*   **Boyutlandırılabilir (Resizable):** Sağ alt köşeden çekerek pencereyi dilediğiniz genişliğe ve yüksekliğe getirin.
*   **Kusursuz Kaydırma (Sticky Footer):** İçerik ne kadar uzun olursa olsun, "Kopyala" ve "Haberi Oluştur" butonları her zaman altta sabit kalır.
*   **Minimize Özelliği:** Pencereyi kapatmadan arka plana (üst bar moduna) alarak çalışmaya devam edebilirsiniz.
*   **Koyu Renkli Ergonomik Scrollbar:** Göz yormayan, modern kaydırma çubuğu.

---

## 🛠️ Kurulum (Geliştirici Modu)

Bu eklenti henüz Chrome Web Mağazası'nda yayınlanmadığı için manuel olarak yüklenmelidir:

1.  **Dosyaları İndirin:** Bu depoyu klonlayın veya `.zip` olarak indirip bir klasöre çıkartın.
2.  **Uzantıları Açın:** Google Chrome'da adres çubuğuna `chrome://extensions/` yazın.
3.  **Geliştirici Modunu Aktif Edin:** Sağ üst köşedeki anahtarı açık konuma getirin.
4.  **Eklentiyi Yükleyin:** Sol üstteki **"Paketlenmemiş öğe yükle" (Load unpacked)** butonuna tıklayın ve klasörü seçin.
5.  **İkon Sabitleme:** Sağ üstteki yapboz ikonuna tıklayarak eklentiyi pinleyin (sabitleyin).

---

## 🚀 Kullanım Adımları

1.  Herhangi bir web sitesindeyken sağ taraftaki **Yüzer Bar** üzerinde bulunan "Haber" ikonuna tıklayın.
2.  **API Anahtarı:** İlk kullanımda **Anahtar İkonuna** tıklayarak Google Gemini API anahtarınızı girin. (Ücretsiz anahtar için: [Google AI Studio](https://aistudio.google.com/))
3.  **Veri Girişi:**
    *   Haberin ham notlarını ilgili alana yapıştırın.
    *   (Opsiyonel) Referans alınacak haber URL'sini ekleyin.
    *   (Opsiyonel) Görsel alanına tıklayın ve `CTRL+V` ile panodaki resmi ekleyin.
4.  **Oluştur:** "Haberi Oluştur" butonuna tıklayın.
5.  **Kopyala:** Oluşan metni inceleyin ve tek tuşla kopyalayarak CMS veya Word belgenize aktarın.

---

## 📂 Proje Dosya Yapısı

```text
EgeAjans-Assistant/
├── manifest.json      # Eklenti kimliği ve izin tanımları
├── content.js         # UI, Flexbox mimarisi ve API motoru
├── icon.png           # Uygulama logosu
└── README.md          # Dokümantasyon
