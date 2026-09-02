# Hazırlık Puanı — Vardiya Takası talebi (bağımsız ölçüm)

## Taşıyıcı

| | |
|---|---|
| Verdict | **NOT READY** |
| Puan | **44 / 100** |
| Fırlayan blocker | **B3 — hata yolları** (0 puan) |
| Kapsamdaki madde | 56 |
| Hiç kanıtı olmayan madde | 27 |
| N/A (denominatörden çıkan) | 2 — T7, D5 |
| Cap uygulanan madde | yok; belgede `[ASSUMED]` / `[UNVERIFIED]` işareti hiç geçmiyor |
| Out of scope bölümü | §6 — **boş**, tek bir muafiyet verilmedi |
| Sınıflandırma | Eksen 1 `transaction` · Eksen 2 `mobile-app` |
| Alternatif okumalarda puan | 43 · 42 · 38 (§5) |

**Bu ölçüm bu belgeyi yazmayan bir okuyucu tarafından yapıldı.** Belge dışarıdan geldi, kendi kendini puanlama sorunu yok.

### Dizin — hangi okuyucu neyi alır

| # | Okuyucu | Buradan aldığı |
|---|---|---|
| 1 | `request-shaper` | §3'teki beş boşluk cümlesi, boşlukları doldurulacak yerler |
| 2 | `decision-memo` | §3.1, §3.3, §3.5 — sahibi belli, kararı yok |
| 3 | `api-needs` | §2 K4 satırı ve D4 kanıtı — Plan yazma ucu |
| 4 | `risk-interrogate` | §2 K6 satırı, R1/R2/R5/R6 sıfırları |
| 5 | Selin Aydın | §1 ve §4; puanın gerekçesi §5'te |

**Sözlük (belge boyunca tek karşılık):** *madde* = rubric item · *boşluk* = gap · *kanıt* = alıntılanabilir metin · *taşıyıcı* = carrier.

---

## 1. Verdict ve kapsam

**NOT READY.** İki ayrı sebeple, ikisi de tek başına yeterli:

1. **B3 (hata yolları) sıfır aldı.** Blocker fırladı.
2. Toplam 44, eşik 60.

Kapsam, olgu olarak: 6 sayfalık bir talep belgesine karşı ölçüldü. 56 madde kapsamda, bunların **27'sinde hiçbir yönde kanıt yok**. 2 madde N/A olarak denominatörden çıktı. Alıntıyla muaf tutulan madde yok.

**B3 hakkında söylenmesi gereken şey.** Bu belge hata yollarını fark etmemiş bir belge değil. Tam tersi: hepsini isimlendirip bir başlık altında topluyor.

> "Bunları açıkça yazıyorum, tahmin etmenizi istemiyorum: Müdür 48 saatte cevap vermezse ne olur. Yeniden yayım açık bir takası ne yapar. Bordro kesim tarihinden sonraki takas."

Skill'in kuralı burada acımasız ve uygulandı: boşluğu isimlendirmek dürüstlüktür, içerik değildir. Yazılmamış bir karar, sessizlikle aynı puanı alır. Yani 44 puan **yazarın özensizliğinin değil, kararların henüz verilmemiş olmasının** ölçüsü. Bu ayrım §4'te ne yapılacağını belirliyor.

---

## 2. Puan tablosu

| # | Kategori | Alınan | Mevcut | Ağırlık | Katkı |
|---|---|---|---|---|---|
| K1 | Problem ve kapsam | 19 | 24 | 20 | 15,83 |
| K2 | Kullanıcı ve tetikleyici | 12 | 18 | 12 | 8,00 |
| K3 | Davranış ve kurallar | 9 | 45 | 25 | 5,00 |
| K4 | Veri ve bağımlılıklar | 8 | 15 | 13 | 6,93 |
| K5 | Tasarım ve durumlar | 9 | 18 | 12 | 6,00 |
| K6 | Risk ve fonksiyonel olmayan | 5 | 27 | 8 | 1,48 |
| K7 | Ölçümleme ve aşağı akış | 2 | 21 | 10 | 0,95 |
| | **Toplam** | | | 100 | **44** |

Hiçbir kategori tamamen düşmedi, ağırlık yeniden dağıtılmadı.

Tablonun söylediği şey tek cümlede: **belge "ne" ve "neden" konusunda çok güçlü, "bozulunca ne olur" konusunda boş.** K1 mevcut puanının %79'unu, K7 %10'unu alıyor.

---

## 3. En kritik beş boşluk

Her boşluğun altında **belgede eksik olan cümle, kararı boş bırakılmış** halde. Kararı ben vermiyorum.

### 3.1 — Plan'a yazma başarısız olursa takas nerede kalır (B3, blocker)

Kanıt: yazma ucu hiç kullanılmamış, sahibi başka ekipte.

> "Yazma ucu var ama biz hiç kullanmadık; Plan ekibinden Murat Şen sahibi."

Akışın son adımı bu uca bağlı ("Onaylanınca çizelge Plan'da güncellenir") ve o adım başarısız olduğunda ne olacağı hiçbir yerde yazmıyor. Reddedilme yolu da yarım: müdürün ekranı tarif edilmiş, iki çalışanın ne gördüğü yazılmamış — bildirim yalnızca "onaylanınca" gidiyor.

**Eksik cümleler:**
- "Müdür onayladıktan sonra Plan'ın yazma ucu hata dönerse takas ___ durumunda kalır; çalışanlar ___ görür; müdür ___ görür; sistem ___ kez yeniden dener."
- "Müdür reddettiğinde vardiya ___ olur (takasa açık kalır / kapanır / sahibine döner) ve iki çalışana ___ bildirimi gider."

### 3.2 — Bordro kesiminden sonraki takas

Bu, projenin var oluş sebebini yeni sistemin içinde yeniden üretebilecek tek boşluk. Başarı ölçütü 2 doğrudan buna bağlı: çizelge–bordro uyuşmazlığını 1.840'tan 500'ün altına indirmek.

> "Bordro her ayın 25'inde kesiliyor ve o gün Plan'dan çizelgeyi çekiyor. 25'inden sonra o ayın vardiyasında yapılan değişikliğin bordroya nasıl yansıyacağını bilmiyoruz."

Sistem içine alınmış ama bordroya yansımayan bir takas, bugün müdürün girmeyi unuttuğu takasla aynı vakayı üretir — üstelik bu kez sistem "tamamlandı" demiş olur.

**Eksik cümle:** "Ayın 25'inden sonra, o ay içindeki bir vardiya için onaylanan takas ___ (reddedilir / onaylanır ve ___ düzeltmesi tetiklenir / ___ tarihine kadar askıya alınır)."

### 3.3 — Eşzamanlılık, bayatlama ve yeniden yayım

Üç ayrı soru, tek kök: liste gösterildiği an ile devrin gerçekleştiği an arasında dünya değişiyor.

> "Bir vardiyayı aynı anda iki kişi üstlenmeye kalkarsa ne olur — muhtemelen ilk gelen alır ama bunu ürün kararı olarak vermedik."

> "Yeniden yayım açık bir takas talebini ne yapar, konuşmadık."

Buna bir üçüncüsü ekleniyor ve belgede hiç geçmiyor: uygunluk, liste gösterildiğinde mi yoksa müdür onayladığında mı değerlendiriliyor? Araya giren bir vardiya 45 saat kuralını veya 11 saat dinlenmeyi bozabilir. Kurallar "müzakere edilebilir değiller" deniyorsa, onay anında yeniden kontrol edilmeleri gerekir; belge bunu söylemiyor.

**Eksik cümleler:**
- "İki çalışan aynı vardiyayı üstlenmeye kalktığında ___ kazanır, diğeri ___ görür."
- "Uygunluk kuralları ___ anında ve ayrıca ___ anında yeniden değerlendirilir; onay anında kural bozulmuşsa ___ olur."
- "Müdür haftayı yeniden yayımladığında açık takas talepleri ___ olur; onaylanmış ama Plan'a işlenmiş takaslar ___ olur."

### 3.4 — Ölçümleme yok: üçüncü başarı ölçütü ölçülemez durumda

Ölçüt 1 ve 2'nin kaynağı ve yöntemi yazılmış ("Plan'ın değişiklik logundan aynı yöntemle ölçülür, bugünkü ölçüm baz" · "İK vaka sisteminden ölçülür"). Ölçüt 3'ün kaynağı yok:

> "Takasların %70'i müdür onayına 24 saat içinde ulaşsın"

Bu veriyi hiçbir mevcut sistem üretmiyor; yalnızca yeni akış üretebilir ve belge hiçbir olay, alan veya tablo tanımlamıyor. K7'nin yedi maddesinden beşi sıfır. Buna denetim izi de dahil: bu, iş kanununa bağlı bir çalışma saati akışı ve kimin hangi takası ne zaman onayladığının saklanacağı hiçbir yerde yazmıyor.

**Eksik cümleler:**
- "Takasın müdür onayına ulaşma süresi ___ olayı ile ___ olayı arasındaki fark olarak ölçülür; olaylar ___ alanlarını taşır."
- "Her takas için ___ alanları ___ süreyle saklanır; bunlara ___ erişebilir."

### 3.5 — 48 saatlik sessizlik ve onaylayanın yokluğu

> "Müdür 48 saat içinde cevap vermezse ne olacağına karar veremedik. Bu açık."

Buna belgenin hiç sormadığı bir soru ekleniyor: müdür izinli, raporlu veya ayrılmışsa kim onaylar. Tek onaylayan tanımlı ve yedeği yok. Bu doğrudan ölçüt 3'ü tehdit ediyor — cevapsız kalan takas WhatsApp'a döner, ki sistemin var oluş sebebi tam olarak oradan çıkarmak.

**Eksik cümleler:**
- "Müdür 48 saat içinde cevap vermezse takas ___ olur ve ___ bilgilendirilir."
- "Mağaza müdürü yoksa onay yetkisi ___ rolüne geçer."

**Eşiğin altında kalan ama yine sıfır alan maddeler:** T4 (onaylı takasın iptali), S2 (boş/yükleniyor/hata durumları), S4 (erişilebilirlik), R2 (geri alma), R5 (canlıya çıkış onayı — TİS'e bağlı bir akışta sendika/hukuk tarafında kimsenin adı yok), R6 (kişisel verinin nerede işlendiği), M2/M4/M6/M8 (sürüm tabanı, bağlantısızlık, bildirim izni, uygulama arka plana atılınca), N5/N7 (destek ve 480 mağazanın eğitimi).

---

## 4. Sırada ne var

Beş boşluğun tamamı **yazma işi değil karar işi**, ve dördünün sahibi belli: Selin Aydın ile Murat Şen'i aynı masaya oturtup §3'teki dokuz boş cümleyi doldurmak tek başına B3'ü sıfırdan çıkarır ve K3'ü en çok hareket ettiren adımdır. Kararlar çıktıktan sonra belgeyi `request-shaper` olgunlaştırır; karar tıkanırsa (özellikle §3.2, bordro tarafında sahibi belge dışında) `decision-memo` o kararı isimlendirilmiş bir kişiden çıkarmak için doğru araç.

`slice` gerekmiyor: kapsam zaten kesilmiş. Belgede beş açık dışlama var ("Mağazalar arası takas yok", "Kısmi vardiya takası yok", "Otomatik eşleştirme yok", "Web arayüzü yok", "Geriye dönük takas yok") ve bunlar bir sürümlük işi tarif ediyor. Sorun büyüklük değil, tanımsızlık.

---

## 5. Aritmetik

### Sınıflandırma

**Eksen 1 — `transaction`.** Takas, geri alınması zor bir durum değişikliği: vardiya devrediliyor, çizelge Plan'da güncelleniyor, bordroya kadar iniyor, ve belge onay sonrası iptalin mümkün olup olmadığını bile bilmiyor. Onay/ret, devir, bildirim — hepsi transaction sinyali.

**Eksen 2 — `mobile-app`.** Belge yüzeyi açıkça taahhüt ediyor ve alternatifini açıkça reddediyor: "Bereket Mobil, iOS ve Android, React Native" · "Web arayüzü yok. Hem çalışan hem müdür yalnızca mobil uygulamada."

Rubric'in kuralı gereği iki okuma da savunulabilir olduğunda dar olanı alınır; geniş olanların toplamı yanına yazılır:

| # | Alternatif okuma | Neden savunulabilir | Puan |
|---|---|---|---|
| 1 | `transaction` · `mobile-app` **(alınan)** | Belgenin taahhüt ettiği tek yüzey mobil | **44** |
| 2 | + `personalization` | "Uygunluk kuralları" eligibility sinyali; G1–G3 açılır | 43 |
| 3 | + `data-display` | Takas listesi bir liste; L1–L3 açılır | 42 |
| 4 | `multi-surface` (mobil + backend) | Plan REST API, yazma ucu, bordro entegrasyonu; E1–E5, X1–X3 açılır | 38 |

Dördü de sıfır alan madde ithal ettiği için puan yalnızca aşağı gidiyor. Aralık **38–44**; hiçbir okumada verdict değişmiyor.

### Kategori hesapları

```
K1 = 19 / (3×8)  × 20 = 15,833333
K2 = 12 / (3×6)  × 12 =  8,000000
K3 =  9 / (3×15) × 25 =  5,000000
K4 =  8 / (3×5)  × 13 =  6,933333
K5 =  9 / (3×6)  × 12 =  6,000000
K6 =  5 / (3×9)  ×  8 =  1,481481
K7 =  2 / (3×7)  × 10 =  0,952381
                        ----------
                         44,200529  → 44
```

### Madde madde

**K1 — Problem ve kapsam (8 madde, 19/24)**

| # | Madde | Puan | Gerekçe |
|---|---|---|---|
| 1 | P1 ⚑ problem | 3 | %61 takas kaynaklı düzeltme, 1.840 uyuşmazlık, kaynağı belli |
| 2 | P2 ⚑ başarı | 3 | Üç ölçüt, baz değer, kaynak, süre; 3. ölçüt bypass'ı ayırt ediyor |
| 3 | P3 kapsam dışı | 3 | Beş açık dışlama, her biri gerekçeli |
| 4 | P4 karar sahibi | 2 | Talep sahibi isimli; "bütçe onaylı" ama onaylayan isimsiz |
| 5 | P5 platform | 3 | iOS + Android içeride, web açıkça dışarıda |
| 6 | P6 iç yüzey | 3 | Back-office ekranı isimlendirilip dışarıda bırakılmış |
| 7 | P7 neden bu mekanizma | 0 | Müdür onayı ve açık liste seçilmiş, gerekçesi hiç yok |
| 8 | M1 iOS/Android sırası | 2 | İkisi de yazılı; hangisi önce çıkar yazılmamış |

P7 hakkında: kurallar makinece kontrol edilebilir ve "müzakere edilebilir değiller" deniyor. O halde bir insanın neden onaylaması gerektiği belgenin en pahalı sorgulanmamış varsayımı. Ret sebepleri arasındaki "mağaza doluluğu" ve "disiplin" bir cevap ima ediyor ama hiçbir yerde söylenmiyor.

**K2 — Kullanıcı ve tetikleyici (6 madde, 12/18)**

| # | Madde | Puan | Gerekçe |
|---|---|---|---|
| 9 | U1 kim kullanır | 3 | 9.100 çalışan, 480 mağaza, müdür rolü ayrı |
| 10 | U2 tetikleyici | 2 | Cuma 16:00 yayın var; takas listesine giriş noktası yok |
| 11 | U3 segment/yetki farkı | 3 | Altı uygunluk kuralı, müdür akış dışı |
| 12 | U4 bugün ne yapıyorlar | 3 | WhatsApp → müdür → Plan, tam tarif |
| 13 | U5 hangi rolle davranıyor | 0 | Müdür hem çalışan hem onaylayan; bağlam geçişi yok |
| 14 | M5 push/deep link erişimi | 1 | Push var ve kullanılıyor; bildirimden ekrana gidiş yazılmamış |

**K3 — Davranış ve kurallar (15 madde, 9/45)**

| # | Madde | Puan | Gerekçe |
|---|---|---|---|
| 15 | B1 ana akış | 2 | Beş adım, aktör ve eylem var; ekran adı yok |
| 16 | B2 dallar | 2 | Onay/ret koşullu; ret sonrası vardiyanın kaderi yok |
| 17 | B3 ⚑ hata yolları | **0** | Her hata yolu "karar veremedik" olarak yazılı; karar yok |
| 18 | B4 kurallar ve sınırlar | 3 | Altı kural, sayısal sınırlar, 22:00–06:00 penceresi, "hepsi birden" |
| 19 | B5 yetki | 2 | Uygunluk tam; onaylayanın yokluğu ve devri yok |
| 20 | T1 idempotency | 0 | Hiç geçmiyor |
| 21 | T2 kısmi başarısızlık | 0 | Onay geçti Plan yazması düştü hali yok |
| 22 | T4 geri alma | 0 | "Bence edilemez ama emin değilim" — karar değil |
| 23 | T5 sunucu tarafı yetki | 0 | Kurallar liste filtresi olarak yazılmış, submit'te kontrol yok |
| 24 | T6 bayat veri | 0 | Yeniden yayım ve çift üstlenme açıkça karara bağlanmamış |
| 25 | T7 ücret/vergi sırası | **N/A** | Takasta para yok; fiyat, indirim, vergi, ücret kalemi bulunmuyor |
| 26 | T8 vazgeçme / dönüşü olmayan nokta | 0 | Açtıktan sonra geri çekme, üstlendikten sonra vazgeçme yok |
| 27 | M2 minimum sürüm | 0 | %94 kullanım oranı var, sürüm tabanı yok |
| 28 | M4 bağlantısızlık | 0 | Hiç geçmiyor |
| 29 | M6 cihaz izinleri | 0 | Akış bildirime bağlı; bildirim izni reddedilirse yok |
| 30 | M8 uygulama yaşam döngüsü | 0 | Hiç geçmiyor |

B3 ⚑ satırı 0 ve blocker fırlıyor. Toplam zaten 60'ın altında olduğu için verdict değişmezdi; ama rapor edilen **sebep** değişirdi ve ekibin ne yapacağını sebep belirliyor.

**K4 — Veri ve bağımlılıklar (5 madde, 8/15)**

| # | Madde | Puan | Gerekçe |
|---|---|---|---|
| 31 | D1 veri nereden | 2 | Plan isimli ve okuma uçları kullanımda; yaş ve saat kaynağı yok |
| 32 | D2 hangi sistemler | 3 | Plan, Bordro, Bereket Mobil, push, İK vaka sistemi |
| 33 | D3 kim bağımlı | 2 | Bordro bağımlılığı tarih ve mekanizmayla; diğerleri sayılmamış |
| 34 | D4 sözleşme değişiyor mu | 1 | Yazma ucu ve sahibi isimli; değişip değişmeyeceği yok |
| 35 | D5 üçüncü taraf | **N/A** | Belgede geçen her sistem şirket içi; hiçbir dış taraf veya anlaşma yok |
| 36 | M3 store sürümü olmadan değişebilir mi | 0 | Feature flag, remote config hiç geçmiyor |

**K5 — Tasarım ve durumlar (6 madde, 9/18)**

| # | Madde | Puan | Gerekçe |
|---|---|---|---|
| 37 | S1 yüzeyler | 2 | Üç ekran çıkarılabiliyor; navigasyon ve sahiplik yok |
| 38 | S2 boş/yükleniyor/hata | 0 | Hiçbiri geçmiyor |
| 39 | S3 ekrandaki kelimeler | 2 | Dört ret sebebi ve iki eylem etiketi gerçek; bildirim ve hata metni yok |
| 40 | S4 erişilebilirlik | 0 | Hiç geçmiyor |
| 41 | S5 dil | 3 | "Tek dil, Türkçe" — karar verilmiş, çeviri sorusunu ortadan kaldırıyor |
| 42 | T3 tamamlandı teyidi | 2 | "iki tarafa da bildirim gider"; üstlenme anı ve ret için teyit yok |

**K6 — Risk ve fonksiyonel olmayan (9 madde, 5/27)**

| # | Madde | Puan | Gerekçe |
|---|---|---|---|
| 43 | R1 yayın sonrası ne bozulur | 0 | "Bilmediklerimiz" tasarım boşluğu, yayın riski değil |
| 44 | R2 geri alma | 0 | Kill switch, rollback yok |
| 45 | R3 performans/ölçek | 1 | 9.100 kişi ve cuma 16:00 yığılması veri olarak var, beklenti olarak yok |
| 46 | R4 mevzuat / gizlilik | 2 | 4857 ve TİS somut kurallara bağlanmış; kişisel veri tarafı boş |
| 47 | R5 canlıya çıkış onayı | 0 | TİS'e dayanan akışta hukuk, sendika, uyum tarafında kimse isimli değil |
| 48 | R6 veri nerede işleniyor | 0 | Hiç geçmiyor |
| 49 | R7 işletme maliyeti | 0 | Hiç geçmiyor |
| 50 | R8 tarih ve sertliği | 2 | Q2 sonu, mart tercih; dışarıdan taahhüt eden yok |
| 51 | M7 store incelemesi ve kademeli çıkış | 0 | Hiç geçmiyor |

R4 hakkında: bir maddenin iki yarısı var ve belge birinde 3, diğerinde 0. `disiplin` ret sebebi kimin göreceği yazılmamış bir kişisel veri sorusu.

**K7 — Ölçümleme ve aşağı akış (7 madde, 2/21)**

| # | Madde | Puan | Gerekçe |
|---|---|---|---|
| 52 | N1 olaylar | 0 | Tek bir olay adı veya parametresi yok |
| 53 | N2 log ve denetim izi | 0 | Ret sebebi girdi olarak isteniyor; saklandığını söyleyen cümle yok |
| 54 | N3 raporlama işi | 1 | İki ölçütün kaynağı mevcut sistemler; üçüncüsünün kaynağı yok |
| 55 | N4 üretimde nasıl görülür | 1 | Üç aylık iş ölçütü var; alarm, eşik, işletme metriği yok |
| 56 | N5 destek ve operasyon | 0 | Back-office açıkça dışarıda; yerine ne geçtiği yazılmamış |
| 57 | N6 uçtan uca izlenebilirlik | 0 | Uygulama → takas → Plan → Bordro zinciri var, ortak kimlik yok |
| 58 | N7 ekip dışının ihtiyacı | 0 | 480 mağaza alışkanlık değiştirecek; eğitim ve iletişim yok |

### Cap uygulanan madde

Yok. Belgede `[ASSUMED]` veya `[UNVERIFIED]` işareti geçmiyor. Buna karşılık iki yerde sahiplenilmemiş eğilim var — "muhtemelen ilk gelen alır ama bunu ürün kararı olarak vermedik" ve "Bence edilemez ama emin değilim". Yazar ikisini de açıkça karar saymıyor, dolayısıyla 0 aldılar; cap kuralı olsa 1 verirdi. Bu asimetri geri bildirim dosyasında ayrıca ele alındı.

---

## 6. Out of scope

**Boş. Tek bir madde muafiyetle denominatörden çıkarılmadı.**

Belgede beş açık dışlama var ve hepsi gerçek kararlar, ama hiçbiri bir rubric maddesini muaf tutmuyor:

| # | Dışlama cümlesi | Neyi yapar |
|---|---|---|
| 1 | "Web arayüzü yok" | `web` maddelerini zaten sınıflandırmaya sokmuyor, P5'i 3 yapıyor |
| 2 | "Müdürlerin mağaza back-office ekranı var ama oraya girmiyoruz" | P6'yı 3 yapıyor; N5'i muaf tutmuyor |
| 3 | "Mağazalar arası takas yok" | Uygunluk kuralını daraltıyor, madde muaf etmiyor |
| 4 | "Kısmi vardiya takası yok" | B4'ü besliyor |
| 5 | "Geriye dönük takas yok" | B4'ü besliyor |

Ayrı olarak: N/A verilen iki madde muafiyet değil, konusu olmayan madde. T7 için gerekçe — takasta hiçbir para kalemi yok. D5 için gerekçe — belgede geçen her sistem şirket içi, dış taraf yok.

---

**Bu belge, ekiplerin gerçekte aldığı taleplerin çok üstünde bir belge.** Ölçülmüş bir problem, üç sahici başarı ölçütü, sayısal sınırlarıyla altı kural ve beş açık dışlama taşıyor. 44 puan bunu değil, kararların henüz verilmemiş olmasını ölçüyor. Puanın 44'ten yukarı çıkması için yeni metin değil, dokuz cümlelik dokuz karar gerekiyor.
