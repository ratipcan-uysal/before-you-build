# Hazırlık Skoru — Vardiya Takası talebi (v1)

## Taşıyıcı

| | |
|---|---|
| Ölçülen belge | `00-talep.md` — İK'dan ürün ekibine vardiya takası talebi |
| Verdict | **NOT READY** |
| Skor | **44 / 100** |
| Tetiklenen blocker | **B3 — hata yolları** (0 puan). P1 ve P2 tam puan, blocker vermedi. |
| Kapsam | 57 madde in scope · 27'si 0 puan · 1 madde N/A · 1 quote'lu out-of-scope |
| Capped madde | Yok. Belgede `[ASSUMED]` / `[UNVERIFIED]` işareti geçmiyor; doğrulanmamış tek dış dünya iddiası aşağıda adlandırıldı. |
| Out of scope bölümü | Belgenin sonunda, "Out of scope" başlığı altında, quote'uyla. |

**Sonraki okuyucu bunu alsın:**

| Okuyucu | Bu belgeden alacağı bölüm |
|---|---|
| `request-shaper` | "En kritik beş boşluk" — her biri kararı boş bırakılmış cümle olarak yazıldı |
| `decision-memo` | "Belgenin kendi adlandırdığı beş açık karar" tablosu — sahibi Selin Aydın |
| `api-needs` | D-serisi satırları ve Plan yazma ucu maddesi |
| `impact-radar` | Bordro 25'i kesimi ve yeniden yayım satırları |
| Tekrar skorlayan | "Aritmetik" — sınıflandırma, payda ve alternatif okumanın toplamı |

**Terim sabiti:** bu belgede *madde* = rubric satırı, *boşluk* = 0 veya 1 puan almış madde, *açık karar* = talebin kendi yazdığı karara bağlanmamış konu.

---

## 1. Verdict ve skor

**NOT READY — 44/100.**

İki ayrı sebeple: **B3 (hata yolları) 0 puan aldığı için blocker tetiklendi**, ve toplam 60'ın altında. Blocker tek başına yeterliydi; skor 84 olsaydı da verdict aynı olacaktı.

Bu düşük skor belgenin kötü yazıldığı anlamına gelmiyor ve öyle okunmamalı. Ölçülen tek şey **bir ekibin soru sormadan başlayabilmesi**. Belge problem tanımı, başarı ölçütü ve kural tablosu tarafında setin gördüğü en iyi örneklerden biri: P1, P2, P3, P5, P6, B4, U4 tam puan aldı. Puanı düşüren, sistemin bozulduğu anlarda ne olacağının hiçbir yerde yazmaması.

**Kapsam, hedge'siz:** 3 sayfalık bir belgeye karşı ölçüldü. 57 madde in scope, bunların 27'si 0 puan aldı. 1 madde N/A (T7), 1 yüzey quote ile out of scope (`web`). 0 alan 27 maddenin 5'ini belge kendisi "bunu bilmiyoruz" diye adlandırıyor — bu 5'i, hiç fark edilmemiş 22'den ayrı raporlanıyor, çünkü okuyucunun elinde hangi belgenin durduğunu bilmesi gerekiyor.

**Evidence gate hatırlatması:** "Bilmediklerimiz" bölümü dürüstlüktür, içerik değildir. Bir boşluğu adlandırmak o maddeyi 0'dan çıkarmaz. Bu skoru okurken en çok yanlış anlaşılacak satır budur: belge açık kararlarını sakladığı için değil, açtığı için puan kaybetmiyor — o kararlar verilmediği için kaybediyor.

---

## 2. Kategori skor tablosu

| # | Kategori | Kazanılan | Mümkün | Ağırlık | Puan |
|---|---|---|---|---|---|
| K1 | Problem ve kapsam | 19 | 24 | 20 | 15,83 |
| K2 | Kullanıcı ve tetikleyici | 13 | 18 | 12 | 8,67 |
| K3 | Davranış ve kurallar | 10 | 45 | 25 | 5,56 |
| K4 | Veri ve bağımlılıklar | 8 | 18 | 13 | 5,78 |
| K5 | Tasarım ve durumlar | 9 | 18 | 12 | 6,00 |
| K6 | Risk ve fonksiyonel olmayan | 5 | 27 | 8 | 1,48 |
| K7 | Ölçüm ve aşağı akış | 2 | 21 | 10 | 0,95 |
| | **Toplam** | | | **100** | **44,27 → 44** |

Hiçbir kategori düşmedi, ağırlık dağıtımı yapılmadı.

Tablonun söylediği şey tek cümlede: **ağırlığın %55'i K3 + K6 + K7'de ve belge oralardan 100 üzerinden 8 puan alıyor.** K1 ve K2 neredeyse dolu. Boşluk kapsamda değil, işleyişte.

---

## 3. En kritik beş boşluk

Her biri, belgeye eklenmesi gereken cümle olarak yazıldı — **kararın kendisi boş bırakıldı**, çünkü o kararı vermek bu skilin işi değil.

### B-1 · Hiçbir hata yolu yok — blocker budur
**Madde:** B3 ⚑ · **Puan:** 0

Belgede sistemin bozulduğu tek bir an tarif edilmiyor. Ret bir hata değil, bir daldır; kural ihlalinin hiç teklif edilmemesi bir önlemdir, hata yolu değildir.

Gereken cümleler:
- "Plan'a yazma çağrısı başarısız olursa takas ___ durumuna geçer, çalışanlara ___ gösterilir, müdüre ___ yapılır."
- "Bildirim gönderilemezse ___ olur."
- "Onay bekleyen bir takasın vardiyası başlarsa ___ olur."

### B-2 · Onay ile Plan yazımı arasındaki yarım kalma
**Madde:** T2 (kısmi başarısızlık) · **Puan:** 0 · İlgili: D4 (1 puan)

Bu boşluk, belgenin çözmek için yazıldığı problemin geri geldiği yer. Bugünkü 1.840 çizelge–bordro uyuşmazlığının sebebi "müdür girmeyi unuttu"; onay alınıp Plan yazımı düşerse sistem aynı uyuşmazlığı bu kez sessizce üretir.

Ayrıca belgenin kendi cümlesi: *"Yazma ucu var ama biz hiç kullanmadık"*. Bu, dış dünya hakkında doğrulanmamış bir yetenek iddiasıdır. Kapatan skill `prior-art` değil — **`api-needs`**, muhatabı **Murat Şen (Plan ekibi)**.

Gereken cümle: "Müdür onayladıktan sonra Plan yazımı başarısız olursa takas ___ sayılır; yeniden deneme ___ kere/___ aralıkla yapılır; ___ süre sonunda ___ olur."

### B-3 · Uygunluk nerede ve ne zaman doğrulanıyor
**Maddeler:** T5 (sunucu tarafı yetki doğrulaması), T6 (bayat veri) · **Puan:** 0, 0

Belge uygunluğu bir **listeleme filtresi** olarak tarif ediyor: *"aynı mağazadaki uygun çalışanların takas listesinde görünür"*. Listede görünmemek bir izin mekanizması değildir. Aradan geçen sürede çalışanın kendi çizelgesi değişirse (45 saat, 11 saat dinlenme) liste bayatlar, ve bu kurallar belgenin kendi ifadesiyle *"müzakere edilebilir değiller"* — yani ihlali kabul edilebilir bir hata değil, kanun ihlali.

Gereken cümleler:
- "Uygunluk ___ anında yeniden hesaplanır (üstlenme / müdür onayı / Plan yazımı)."
- "Üstlenme anında kural artık sağlanmıyorsa çalışan ___ görür, takas ___ olur."
- "Aynı vardiyayı iki kişi üstlenmeye kalkarsa ___ kazanır, kaybeden ___ görür."

### B-4 · Üçüncü başarı ölçütünü besleyen hiçbir veri kaynağı yok
**Maddeler:** N1 (event'ler), N4 (üretimde görünürlük) · **Puan:** 0, 1

İlk iki ölçütün kaynağı yazılı: Plan değişiklik logu ve İK vaka sistemi. Üçüncüsü — *"Takasların %70'i müdür onayına 24 saat içinde ulaşsın"* — yalnızca uygulamanın kendi ürettiği veriden ölçülebilir ve belge tek bir event, log ya da tablo tanımlamıyor. Bu ölçüt bugünkü haliyle ölçülemez.

Gereken cümleler: "Takas akışı şu event'leri üretir: ___ , ___ , ___ ; her biri ___ parametrelerini taşır." · "Bu event'ler ___ sistemine yazılır ve ___ ekranından okunur."

### B-5 · Onaydan sonra geri dönüş ve dönülmez nokta
**Maddeler:** T4 (geri alma), T8 (vazgeçme ve dönülmez nokta) · **Puan:** 0, 0

Belge bunu açık bırakıyor: *"Takas onaylandıktan sonra iptal edilebilir mi. Bence edilemez ama emin değilim."* Bir kanaat karar değildir. Ayrıca üstlenilmeden önce çalışanın takası listeden geri çekmesi hiç konuşulmamış.

Gereken cümleler: "Çalışan takasa açtığı vardiyayı ___ aşamasına kadar geri çekebilir." · "Onaylanmış takas ___ koşulunda, ___ tarafından iptal edilebilir; iptal edilirse çizelge ___ olur."

---

## 4. Sırada ne var

**Tek en ucuz hamle:** B3 için beş sistem adımının (liste yazma, üstlenme, onay, Plan yazımı, bildirim) her birine "başarısız olursa" cümlesini yazmak — blocker'ı kaldıran ve verdict'i CONDITIONAL'a taşıyabilecek tek iş bu.

Ardından, sırayla:

| # | İş | Skill / kişi |
|---|---|---|
| 1 | B-1'den B-5'e boşlukları belgeye yazdır | `request-shaper` |
| 2 | Beş açık kararı tek sayfada karara bağlat | `decision-memo` → Selin Aydın |
| 3 | Plan yazma ucunun gerçekten ne verdiğini doğrula | `api-needs` → Murat Şen |
| 4 | Bordro 25'i kesimi ve yeniden yayımın kırdığı yerler | `impact-radar` |
| 5 | K6 ve K7 boşlukları (rollout, izin, eğitim, denetim izi) | `request-shaper` |

**`slice` gerekmiyor.** Kapsam zaten kesilmiş: "Ne olmayacak" bölümü beş dışlamayı sahipli bir talep belgesinde yazıyor. Bu talep tek sürüm için fazla büyük değil; tanımsız.

### Belgenin kendi adlandırdığı beş açık karar

Bunlar 0 puan aldı — ama hiç fark edilmemiş boşluklardan ayrı duruyorlar ve hepsi `decision-memo`'nun konusu:

| # | Açık karar | Etkilediği madde |
|---|---|---|
| A-1 | Müdür 48 saatte cevap vermezse ne olur | B2, B3 |
| A-2 | Yeniden yayım açık takası ne yapar | B3, T6 |
| A-3 | Bordro kesim tarihinden sonraki takas | D3, R4 |
| A-4 | Aynı vardiyayı iki kişi üstlenirse | T6, B3 |
| A-5 | Onaylanmış takas iptal edilebilir mi | T4, T8 |

---

## 5. Aritmetik

### Alınan sınıflandırma

**Axis 1 — ne yapıyor:** `transaction`
Gerekçe: geri alması pahalı bir durum değişikliği yazıyor — çizelge Plan'da güncelleniyor, bordroya akıyor. "onaylar", "üstlenir", "güncellenir" sinyalleri.

**Axis 2 — nerede koşuyor:** `mobile-app`
Gerekçe: *"Bereket Mobil, iOS ve Android, React Native"*, *"Hem çalışan hem müdür yalnızca mobil uygulamada"*.

Her iki eksende de **dar okuma** alındı. Belgenin işaret ettiği ama taahhüt etmediği değerler (`backend`, `data-display`, `personalization`) paydaya alınmadı; alternatif toplamları aşağıda.

### Alternatif okumalar

| # | Okuma | Payda | Toplam | Verdict |
|---|---|---|---|---|
| 1 | `transaction` + `mobile-app` *(alınan)* | 57 | **44** | NOT READY |
| 2 | \+ `backend` (→ `multi-surface`) | 65 | **38** | NOT READY |
| 3 | \+ `data-display` (takas listesi) | 61 | **42** | NOT READY |

2 numaralı okuma savunulabilir: Plan'a yazan, uygunluğu hesaplayan ve onayı yönlendiren bir sunucu tarafı zorunlu. Belge bunu hiç tarif etmediği için taahhüt saymadım — ama E1–E5 ve X1–X3'ün tamamı 0 alacağı için tek etkisi skoru 6 puan düşürmek olurdu. Üç okumanın hiçbiri verdict'i değiştirmiyor; gerçek aralık **38–44**.

### K1 — Problem ve kapsam · 19/24 · ağırlık 20

| # | Madde | Puan | Dayanak |
|---|---|---|---|
| 1 | P1 ⚑ problem | 3 | %61 elle düzeltme, 2,3 saat/hafta, 1.840 uyuşmazlık, 9 gün |
| 2 | P2 ⚑ başarı ölçütü | 3 | Üç ölçüt, baz değer, kaynak, süre; 3. ölçüt bypass'ı ayırt ediyor |
| 3 | P3 kapsam dışı | 3 | "Ne olmayacak" — beş dışlama, açık yazılmış |
| 4 | P4 kararın sahibi | 2 | Selin Aydın ve "Bütçe onaylı" var; onaylayan kişi yok |
| 5 | P5 platform kapsamı | 3 | iOS + Android açık, web açıkça dışarıda |
| 6 | P6 iç yüzey | 3 | Back-office ekranı açıkça dışarıda, müdür onayı mobilde |
| 7 | P7 mekanizma neden bu | 0 | Mekanizma tarif edilmiş, seçildiğine dair tek cümle yok |
| 8 | M1 iOS/Android sırası | 2 | İkisi de yazılı; birlikte mi çıkacağı yazılı değil |

P7 için not: belge mekanizmayı bugünkü WhatsApp + müdür akışından devralıyor (*"takas zaten oluyor"*) ve devralınmış bir mekanizma seçilmiş sayılmaz. Kapatan skill `prior-art`.

### K2 — Kullanıcı ve tetikleyici · 13/18 · ağırlık 12

| # | Madde | Puan | Dayanak |
|---|---|---|---|
| 9 | U1 kim kullanıyor | 3 | 9.100 mağaza çalışanı, 480 mağaza müdürü, roller ayrık |
| 10 | U2 giriş noktası | 2 | Çalışan tarafı yazılı; üstlenen kişi listeye nereden giriyor, yok |
| 11 | U3 segment/izin farkı | 3 | Altı uygunluk kuralı + müdürlerin akış dışı olması |
| 12 | U4 bugün ne yapıyorlar | 3 | WhatsApp → müdüre söyleme → Plan'da elle düzeltme |
| 13 | U5 hangi rolle davranıyor | 1 | Müdür ayrımı var; çok mağazalı çalışan ve vekil onaycı yok |
| 14 | M5 push/deep link erişimi | 1 | Push var ve kullanılıyor; ekrana götürüp götürmediği yazılmamış |

### K3 — Davranış ve kurallar · 10/45 · ağırlık 25

| # | Madde | Puan | Dayanak |
|---|---|---|---|
| 15 | B1 ana akış | 3 | Beş numaralı adım, her birinde aktör ve eylem |
| 16 | B2 dallar | 2 | Onay/ret ve ret sebepleri yazılı; üç dal karara bağlanmamış |
| 17 | **B3 ⚑ hata yolları** | **0** | Sistem hatası anlatan tek cümle yok — blocker |
| 18 | B4 kurallar ve sınırlar | 3 | 45 saat, 11 saat, 22:00–06:00, 18 yaş, 140 karakter, "hepsi birden" |
| 19 | B5 kim yetkili | 2 | Roller yazılı; yetkisiz denemede ne olduğu yazılı değil |
| 20 | T1 idempotency | 0 | Yok |
| 21 | T2 kısmi başarısızlık | 0 | Yok |
| 22 | T4 geri alma | 0 | "emin değilim" — kanaat, karar değil |
| 23 | T5 sunucu tarafı yetki | 0 | Yok; uygunluk yalnızca liste filtresi olarak tarif edilmiş |
| 24 | T6 bayat veri | 0 | Belge açık bırakıyor |
| 25 | T8 dönülmez nokta | 0 | Yok |
| 26 | M2 minimum sürüm | 0 | Yok |
| 27 | M4 bağlantısız davranış | 0 | Yok |
| 28 | M6 cihaz izni | 0 | Push izni reddedilirse ne olur, yok |
| 29 | M8 uygulama arka plana atılırsa | 0 | Yok |

**T7 (fiyat/vergi/ücret sırası) — N/A.** Bu akışta para hesabı yapılmıyor; ücret hesabı bordroda, ayrı sistemde. Konusu olmayan madde paydadan çıkarıldı.

### K4 — Veri ve bağımlılıklar · 8/18 · ağırlık 13

| # | Madde | Puan | Dayanak |
|---|---|---|---|
| 30 | D1 veri nereden | 2 | Çizelge ve yetkinlik Plan'da; yaş ve dinlenme hesabının kaynağı yok |
| 31 | D2 hangi sistemler | 3 | Plan, Bordro, push, Bereket Mobil, İK vaka sistemi + sahip adı |
| 32 | D3 kim bağımlı | 2 | Bordro her ayın 25'inde çekiyor — bağımlılık adlandırılmış, sonucu değil |
| 33 | D4 sözleşme değişiyor mu | 1 | Yazma ucu adlandırılmış; değişip değişmediği karara bağlanmamış |
| 34 | D5 tedarikçi bağımlılığı | 0 | Plan'ın ve push altyapısının iç mi dış mı olduğu yazılmamış |
| 35 | M3 store sürümü olmadan kapatma | 0 | Yok; kuralların istemcide mi sunucuda mı olduğu da yok |

### K5 — Tasarım ve durumlar · 9/18 · ağırlık 12

| # | Madde | Puan | Dayanak |
|---|---|---|---|
| 36 | S1 yüzeyler | 2 | Üç ekran anılıyor; takas listesinin nerede yaşadığı yok |
| 37 | S2 boş/yükleniyor/hata | 0 | Yok |
| 38 | S3 ekrandaki kelimeler | 2 | "takasa aç", "ben alırım", dört ret sebebi; hata metni yok |
| 39 | S4 erişilebilirlik seviyesi | 0 | Yok |
| 40 | S5 dil | 3 | "Tek dil, Türkçe" — çeviri konusu doğmuyor |
| 41 | T3 tamamlanma teyidi | 2 | Onay sonrası bildirim var; üstlenme anındaki teyit yok |

### K6 — Risk ve fonksiyonel olmayan · 5/27 · ağırlık 8

| # | Madde | Puan | Dayanak |
|---|---|---|---|
| 42 | R1 çıktıktan sonra ne bozulur | 0 | Yok |
| 43 | R2 nasıl geri alınır | 0 | Yok |
| 44 | R3 performans/ölçek | 1 | Hacimler var; beklenti yok — cuma 16:00 yığılması hiç anılmıyor |
| 45 | R4 mevzuat/gizlilik/güvenlik | 2 | 4857 ve TİS açık ve bağlayıcı; KVKK ve güvenlik yok |
| 46 | R5 go-live onayı | 0 | Yok; sendika/TİS onayı da yok |
| 47 | R6 veri nerede tutuluyor | 0 | Yok |
| 48 | R7 işletme maliyeti | 0 | Yok |
| 49 | R8 tarih ve neyin sabit olduğu | 2 | Q2 sonu, mart tercih; dışarıdan kim ne taahhüt etti, yok |
| 50 | M7 store incelemesi / kademeli çıkış | 0 | Yok |

### K7 — Ölçüm ve aşağı akış · 2/21 · ağırlık 10

| # | Madde | Puan | Dayanak |
|---|---|---|---|
| 51 | N1 event'ler | 0 | Tek bir event adı yok |
| 52 | N2 log ve denetim izi | 0 | Yok — kanun ve bordro ihtilafı olan bir akışta |
| 53 | N3 raporlama işi | 1 | İki mevcut kaynak anılmış; yeni tablo/alan konuşulmamış |
| 54 | N4 üretimde görünürlük | 1 | Üç aylık iş ölçütü var; alarm, eşik, operasyonel görünürlük yok |
| 55 | N5 destek/operasyon ne görüyor | 0 | Yok |
| 56 | N6 uçtan uca izlenebilirlik | 0 | Yok — uygulama, Plan ve Bordro arasında ortak kimlik yok |
| 57 | N7 ekip dışına eğitim/doküman | 0 | Yok — 480 mağaza WhatsApp'tan çıkarılacak, geçiş planı yok |

### Toplam

```
K1 = 19/24 × 20 = 15,8333
K2 = 13/18 × 12 =  8,6667
K3 = 10/45 × 25 =  5,5556
K4 =  8/18 × 13 =  5,7778
K5 =  9/18 × 12 =  6,0000
K6 =  5/27 ×  8 =  1,4815
K7 =  2/21 × 10 =  0,9524
                 --------
                  44,2672  →  44
```

Ara değerler yuvarlanmadı; yuvarlama yalnızca sonda bir kez yapıldı.

---

## 6. Out of scope

Tek dışlama quote ile kayıtlı:

| # | Dışlanan | Quote | Sahibi |
|---|---|---|---|
| 1 | `web` yüzeyi ve W1–W5 maddeleri | *"Web arayüzü yok. Hem çalışan hem müdür yalnızca mobil uygulamada."* | Selin Aydın, talebin yazarı; "Bütçe onaylı" |

Sahiplik notu: bu belgedeki dışlamalar `slice` çıktısı değil, sahibi adı yazılı bir talep belgesinin kendi kararları. Bu yüzden exemption olarak geçerli sayıldı.

**Muafiyet sayılmayan dışlamalar.** "Ne olmayacak" bölümündeki diğer dört madde (mağazalar arası takas, kısmi takas, otomatik eşleştirme, geriye dönük takas) rubric'te bir maddenin karşılığı değil; kapsam kararı olarak P3'ü tam puana taşıdılar, ama hiçbir maddeyi paydadan çıkarmadılar.

**N/A ile out of scope aynı şey değil.** Paydadan çıkan tek madde T7'ydi ve gerekçesi quote değil, konusunun bulunmaması.
