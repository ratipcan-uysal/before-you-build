# Vardiya Takası — Şekillendirilmiş Talep

## Taşıyıcı

**Kaynak:** `00-talep.md` (Selin Aydın, İK İş Ortağı, 12 Ocak) · `01-impact-radar.md` · `02-idea-grill.md` (proxy) · `03-prior-art.md`.
**Mod:** otonom. Görüşülecek kimse yoktu; Selin bu hafta müsait değil. Hiçbir cevap ona sorulmadı.

**Sayım.** Rubrikteki 55 maddenin **18'i cevaplı · 25'i açık · 12'sine hiç değinilmemiş**.
Açık maddeler satır olarak: **26 başlamayı engelleyen · 21 canlıya çıkışı engelleyen · 12 alanda kalan artık** (artıklar tek satıra toplandı, madde madde yazılmadı).
Üstteki üç belgeden gelen ve hâlâ cevapsız **39 soru** bu listeye taşındı; **6 madde** ilk kez burada açılıyor (° ile işaretli); **5 madde** talebin kendi "Bilmediklerimiz" listesinden geliyor.

**İşaret envanteri:** `[ASSUMED]` ×7 · `[UNVERIFIED]` ×9. Otonom modda tahmin etmek yerine açık bırakmak varsayılan; 25 açık maddenin hiçbirine cevap uydurulmadı.

**Nerede ne var.**

| Bölüm | Ne var | Kim alır |
|---|---|---|
| §1.6 Gereksinim ve mekanizma | 7 satırlık mekanizma tablosu | `slice`, `design-brief` |
| §1.7 Çelişkiler | Ç1–Ç3, ikisi ölçütlerde | `readiness-score`, karar sahibi |
| §3 | Ana akış, dallar, hata yolları, limitler | `flow-map`, `design-brief` |
| §4 | Plan uçları, veri kaynakları, bağımlılar | `api-needs`, `data-model` |
| §6 | Yasal ve operasyonel risk | `risk-interrogate` |
| Açık maddeler | A01–A26, G01–G21, sahipleriyle | `readiness-score`, `decision-memo` |

**Sabit sözlük.** *takas talebi* = açan çalışanın oluşturduğu kayıt. *üstlenme* = devralanın "ben alırım" demesi. *uygunluk kuralı* = altı sert kuraldan biri. *devir* = tek yönlü aktarım (karşılığında vardiya gelmiyor). *sahip* = maddeyi kapatabilecek kişi. Bu belgede başka ad kullanılmadı.

---

## 1. Sorun ve kapsam

### 1.1 Bugün ne oluyor

Bereket Market'te 480 mağazada 9.100 mağaza çalışanı var. Haftalık çizelge Plan sisteminden her cuma 16:00'da yayımlanıyor ve ertesi pazartesi başlayan haftayı kapsıyor. Yayımdan sonra çalışanlar vardiyalarını birbirleriyle değiştiriyor; bu tamamen sistem dışında oluyor. Mağazanın WhatsApp grubunda konuşuluyor, anlaşan iki kişi mağaza müdürüne söylüyor, müdür Plan'a girip çizelgeyi elle düzeltiyor.

Sorun cümlesi, çözümü içermeden: **yayımlanmış çizelge ile fiilen çalışılan vardiya arasındaki fark, hiçbir sistemde kayıtlı olmadan mağaza müdürünün elinde kapanıyor; kapanmadığında bordro yanlış ödüyor.**

Ölçüsü:

- 2025 Q4'te müdürlerin Plan üzerinde yaptığı elle düzeltmelerin **%61'i takas kaynaklı** (Plan değişiklik logu, 3 ay, 480 mağaza, 41.200 düzeltme → 25.132 takas kaynaklı düzeltme).
- Mağaza müdürü başına **haftada ortalama 2,3 saat**.
- Üç ayda **çizelge–bordro arasında 1.840 uyuşmazlık**; her biri bir İK vakası, ortalama kapanma süresi 9 gün.

### 1.2 Başarı neyle ölçülecek

Çıkıştan 3 ay sonra, üçü birden:

1. Takas kaynaklı elle düzeltme oranı %61'den **%15'in altına** insin. Plan değişiklik logundan, bugünkü yöntemle.
2. Çizelge–bordro uyuşmazlığı üç ayda 1.840'tan **500'ün altına** insin. İK vaka sisteminden.
3. Takasların **%70'i müdür onayına 24 saat içinde ulaşsın**.

Üç ölçütün ikisi bugünkü haliyle ölçülemez durumda: 1'in bazını bu değişikliğin kendisi bozuyor (G01), 3'ün bugün bir bazı yok ve tanımı kendisiyle çelişiyor (G02, Ç2). Bu bir ürün kararı değil, ölçüm kararı; çıkmadan önce düzeltilebilir. Kaynak: `01-impact-radar.md` B05, B24.

`[UNVERIFIED]` Ölçüt 2'nin hedefi, 1.840 vakanın büyük kısmının takas kaynaklı olduğunu varsayıyor. Pay ölçülmedi. Kontrol: İK vaka sisteminde takas kaynaklı vaka sayısı — Selin Aydın (G03).

### 1.3 Kapsam dışı (talebin kendi yazdığı)

- Mağazalar arası takas yok; mağaza değişikliği ayrı bir İK süreci.
- Kısmi vardiya takası yok; vardiya bölünmez, tamamı devredilir.
- Otomatik eşleştirme yok; sistem "şu kişiyle takas et" önermiyor.
- Web arayüzü yok; hem çalışan hem müdür yalnızca mobil uygulamada. Müdürün mağaza back-office ekranına girilmiyor.
- Geriye dönük takas yok; başlamış ya da geçmiş vardiya takasa açılamaz.
- Müdürün kendi vardiyası akışın dışında.

### 1.4 Platform ve kanal

Bereket Mobil, **iOS ve Android**, React Native. Web yok, back-office yok, masaüstü yok. Mağaza çalışanlarının %94'ü uygulamayı bordro fişi ve çizelge için zaten kullanıyor. Tek dil: Türkçe.

### 1.5 Kararın sahibi

Talep İK'dan (Selin Aydın, Mağaza Operasyonları) geliyor, bütçe onaylı, Q2 sonu bekleniyor. Ramazan öncesi (mart) yetişmesi tercih, zorunluluk değil.
**Kararı kimin değiştirebileceği talepte yazılı değil** (A-sahipsiz; açık maddelerde G18). Taşıyıcı bağımlılık olan Plan yazma ucunun sahibi Murat Şen'in bu takvime evet dediğine dair malzemede iz yok (G16).

### 1.6 Gereksinim ve mekanizma

Talep birkaç yerde *nasıl* yapılacağını *ne gerektiğinin* yerine yazıyor. Aşağıdaki tabloda üstteki satır gereksinim, alttaki mekanizmadır. Mekanizmayı tartışmak bu belgenin işi değil; görünür kılmak öyle. Her mekanizmanın bilerek mi seçildiği `03-prior-art.md`'nin sorduğu sorudur.

| # | Gereksinim | Seçilen mekanizma | Talepte karar verildi mi |
|---|---|---|---|
| M1 | Uygun bir çalışan vardiyayı devralsın | Vardiya havuza düşer, uygun olanların listesinde görünür | Yazılı, gerekçesi yok (prior-art M1) |
| M2 | Takas kurala ve işletme düzenine uysun | Her takas müdür onayından geçer, istisna yok | Yazılı, gerekçesi yok (prior-art K1) |
| M3 | Çalışan çalışamayacağı vardiyadan kurtulsun | Tek yönlü devir; karşılıklı bacak yok | Adı "takas", işi devir (prior-art M2) |
| M4 | İhlalli vardiya çalışılmasın | Uygun olmayana hiç teklif edilmez, uyarı yok | Açıkça karar verilmiş |
| M5 | Çizelge tek kaynak olarak güncel kalsın | Plan'ın hiç kullanılmamış yazma ucuna yazılır | Yazılı, alternatif değerlendirilmemiş |
| M6 | 18 yaş altı gece çalışmasın | Gece = sabit 22:00–06:00 penceresi | Eşiğin kaynağı yazılı değil (prior-art C2) |
| M7 | İki taraf sonucu öğrensin | Mevcut push altyapısıyla bildirim | `[ASSUMED]` kanal yazılı değil, push'un varlığı yazılı |

### 1.7 Çelişkiler

Aşağıdaki üçü boşluk değil, malzemenin kendi içinde çakışması. Hiçbirine taraf tutulmadı; ikisi de aynen alıntılandı. **Üçü de başlamayı engelliyor** ve `[ASSUMED]` taşıyamazlar, yani "en yanlış olma ihtimali yüksek varsayımlar" listesi bunları yakalayamaz.

**Ç1 — Onay ekranı neyi onaylıyor.** Sahip: Selin Aydın.
> "Kural ihlali olan bir takas **hiç teklif edilmemeli**, uyarıyla geçilmemeli."
> "Reddederse sebep seçmek zorunda: `yetkinlik yetersiz` · `mağaza doluluğu` · `disiplin` · `diğer`"

Birincisi doğruysa `yetkinlik yetersiz` hiçbir zaman ulaşılabilir bir sebep değil; birebir devirde vardiyadaki kişi sayısı değişmediği için `mağaza doluluğu` da öyle. Dördün ikisi ölü, ya da kural motoru müdürün baktığı şeyi kapsamıyor. (`02-idea-grill.md` Tur 7)

**Ç2 — Ölçüt 3 kendi cümlesinde çelişiyor.** Sahip: Selin Aydın.
> "Takasların %70'i müdür onayına 24 saat içinde **ulaşsın** — yani sistem içinde **tamamlansın**, WhatsApp'a düşmesin."

Onaya ulaşmak tamamlanmak değil. Reddedilen takas cümlenin ilk yarısını sağlar, ikinci yarısını bozar: WhatsApp'a döner, müdür Plan'a elle girer, ölçüt 1 bozulur, ölçüt 3 yeşil kalır. (`02-idea-grill.md` Tur 7)

**Ç3 — Gerekçe müdür mesaisi, ölçüt yalnız elle düzeltme.** Sahip: Selin Aydın.
> "Mağaza müdürü başına haftada ortalama 2,3 saat."
> "Müdüre onay düşer. Müdür onaylar ya da reddeder."

Tasarım düzeltme işini onay işine çeviriyor. Ölçüt "elle düzeltme" üzerinden tanımlı olduğu için müdürün takvimi değişmese bile yeşile döner. (`03-prior-art.md` K1)

---

## 2. Kullanıcılar ve tetikleyici

**Vardiyayı açan çalışan.** Mağaza çalışanı. Cuma 16:00'da yayımlanan çizelgesini uygulamada görüyor ve bir vardiyayı çalışamayacağını fark ediyor. Bugün WhatsApp grubuna yazıyor.

**Üstlenen çalışan.** Aynı mağazada çalışan, altı uygunluk kuralının hepsini geçen bir çalışan. Bugün WhatsApp grubunda görüp cevap veriyor.

**Mağaza müdürü.** Bugün anlaşmayı sözlü duyup Plan'a giriyor. Yeni akışta uygulamada onaylıyor. Kendi vardiyası akışa girmiyor.

**Segmentler.** 18 yaşından küçük çalışanda gece vardiyası kapalı. Rol yetkinliği (kasa, reyon, kasap, fırın) kimin neyi üstlenebileceğini belirliyor. Bunun dışında bir plan/kademe farkı talepte geçmiyor.
`[UNVERIFIED]` Devreden tarafta bir asgari saat taahhüdü olup olmadığı bilinmiyor; varsa devir onu sessizce bozar. Kontrol: TİS'in vardiya bölümü — İK (A19).

**Bugün ne yapıyorlar.** WhatsApp grubunda konuşuyorlar, müdüre söylüyorlar, müdür Plan'a elle giriyor. Bu yol kapanmıyor; ürün çıktıktan sonra da açık kalıyor ve ücretsiz bir rakip olarak duruyor.

**Hacim.** `[ASSUMED]` Günde yaklaşık 280 takas. Talebin kendi sayılarından türetildi: 25.132 takas kaynaklı düzeltme ÷ 91 gün. Cuma 16:00 yayımından sonra tepe yapması beklenir.

---

## 3. Davranış ve kurallar

### 3.1 Ana akış

1. Çalışan kendi haftalık çizelgesinde bir vardiyayı seçer, "takasa aç" der. İsterse kısa bir not yazar (serbest metin, 140 karakter).
2. Vardiya, aynı mağazadaki uygun çalışanların takas listesinde görünür.
3. Uygun bir çalışan "ben alırım" der.
4. Müdüre onay düşer. Müdür onaylar ya da reddeder; reddederse sebep seçer.
5. Onaylanınca çizelge Plan'da güncellenir, iki tarafa da bildirim gider.

`[ASSUMED]` Devreden çalışanın vardiyası çizelgeden düşer, üstlenen çalışanın haftasına eklenir; Plan'a yazılan tek şey vardiya–çalışan eşlemesidir.
`[ASSUMED]` Onaydan sonra her iki tarafın uygulamadaki çizelge ekranı güncel değeri gösterir. Mevcut ekranın önbelleğinin bu yazmayı nasıl gördüğü doğrulanmadı (`01-impact-radar.md` B01).
`[ASSUMED]` Bildirimler mevcut push altyapısıyla gider.

### 3.2 Uygunluk kuralları

Bir çalışanın bir vardiyayı üstlenebilmesi için **hepsi birden** sağlanmalı:

1. Aynı mağazada çalışıyor olmalı.
2. Vardiyanın gerektirdiği rol yetkinliğine sahip olmalı (kasa, reyon, kasap, fırın — Plan'da tanımlı).
3. Üstlendiğinde haftalık 45 saati aşmamalı.
4. Üstlendiğinde iki vardiya arasında 11 saat kesintisiz dinlenme kuralı bozulmamalı.
5. O gün başka bir vardiyası olmamalı.
6. 18 yaşından küçükse gece vardiyası (22:00–06:00) üstlenemez.

Talep bunları 4857 sayılı İş Kanunu ve toplu iş sözleşmesine dayandırıyor ve müzakere edilebilir saymıyor. Kural ihlali olan bir takas hiç teklif edilmemeli.

**Listenin tamlığı doğrulanmadı.** Üç ayrı yerden itiraz geldi:

- `[UNVERIFIED]` Haftalık kesintisiz 24 saat dinlenme (hafta tatili) listede yok; altı kural, takasla yedi gün üst üste çalışmayı engellemiyor. Kontrol: 4857 ilgili maddesi — İK / hukuk (A11).
- `[UNVERIFIED]` Gece postasında 7,5 saat üst sınırı listede yok. Kaynak: Postalar Halinde İşçi Çalıştırılması Yönetmeliği m.7, konsolide metinden okundu, resmî nüsha açılamadı. Kontrol: hukuk (A11).
- `[UNVERIFIED]` Gece penceresi 22:00 alınmış; 4857 m.69'un tanımı en geç 20:00'de başlıyor. Kaynak ikincil (hukuk bürosu sayfası), resmî metin açılamadı. Kontrol: hukuk, tek sayfa (A12).
- `[UNVERIFIED]` 45 saatin kanun tavanı mı işveren politikası mı olduğu kontrol edilemedi. Kontrol: 4857 fazla çalışma maddeleri — İK / hukuk (A13).

Kuralların **hangi anda** değerlendirileceği hiçbir belgede yazılı değil: üstlenme anında mı, müdür onayı anında mı, ikisinde de mi (A14 °). Onay beklerken çizelge değişebildiği için bu bir akış kararı, bir uygulama detayı değil.

### 3.3 Müdür onayı

- Müdür onay ekranında iki çalışanın adını, vardiyayı ve varsa notu görür.
- Reddederse sebep seçmek zorunda: `yetkinlik yetersiz` · `mağaza doluluğu` · `disiplin` · `diğer` (diğer seçilirse serbest metin zorunlu).
- Müdürün kendi vardiyası takasa girmiyor.
- Red sebeplerinin ikisiyle uygunluk kuralları çakışıyor; bkz. Ç1.
- Müdür izinliyse ya da mağazada yoksa onayı kimin verdiği hiçbir yerde yazılı değil (A23 °).

### 3.4 Dallar ve hata yolları

Talebin yazdığı tek dal: müdürün reddi. Aşağıdaki yolların hiçbirine karar verilmedi ve hiçbiri bu belgede tahmin edilmedi. Her biri açık madde olarak listede:

| # | Durum | Karar | Madde |
|---|---|---|---|
| 1 | Müdür 48 saat cevap vermezse | Yok | A04 |
| 2 | Aynı vardiyayı iki kişi üstlenirse | Yok ("muhtemelen ilk gelen alır", ürün kararı değil) | A01 |
| 3 | Onaylanmış takas iptal edilebilir mi | Yok | A06 |
| 4 | Müdür haftayı yeniden yayımlarsa | Yok | A05 |
| 5 | Müdür Plan'da elle düzeltirken açık takas varsa | Yok, hiç düşünülmemiş | A08 |
| 6 | Vardiya onay beklerken başlarsa | Yok | A09 |
| 7 | Bordro kesiminden (ayın 25'i) sonra onaylanırsa | Yok | A07 |
| 8 | Plan yazması başarısız olursa, kullanıcı ne görür | Yok | A02 |
| 9 | Eski uygulama sürümünde takas ekranı yoksa | Yok | A24 |

Kullanıcının hata anında ne gördüğü, ekran metinleri dahil, hiç yazılmadı (A22 °).

### 3.5 Limitler

- Not alanı: 140 karakter, serbest metin, isteğe bağlı.
- Haftalık 45 saat, 11 saat dinlenme, günde tek vardiya, gece 22:00–06:00 (18 yaş altı).
- Bir çalışanın aynı anda kaç vardiyayı takasa açabileceği, kaç takas üstlenebileceği ve bir takas talebinin ne kadar açık kalacağı yazılı değil (A25 °).
- Geriye dönük takas yok: başlamış ya da geçmiş vardiya takasa açılamaz.

### 3.6 Yetki

Aynı mağazanın çalışanları kendi vardiyalarını açabilir, uygun olanlar üstlenebilir. `[ASSUMED]` Onayı veren, takasın geçtiği mağazanın müdürüdür. Uygun olmayan çalışan vardiyayı listede hiç görmez; ayrı bir "yetkiniz yok" durumu tarif edilmemiş.

---

## 4. Veri ve bağımlılıklar

### 4.1 Sistemler

| # | Sistem | Rol | Sahip |
|---|---|---|---|
| 1 | Plan | Çizelgenin yaşadığı yer; okuma uçları üretimde | Murat Şen |
| 2 | Plan yazma ucu | Var, bu ekip hiç kullanmadı | Murat Şen |
| 3 | Bereket Mobil | Çalışan ve müdür arayüzü, React Native | Ürün ekibi |
| 4 | Push altyapısı | Bildirim, üretimde | Ürün ekibi |
| 5 | Bordro | Her ayın 25'inde Plan'dan çizelgeyi çeker | Bordro ekibi (sahip adı yazılı değil) |
| 6 | İK vaka sistemi | Uyuşmazlık vakaları, ölçüt 2'nin kaynağı | Selin Aydın |

`[UNVERIFIED]` Yazma ucunun koşullu yazma (sürüm / `If-Match` benzeri) sunup sunmadığı bilinmiyor. Olgun bir emsalde bile (Microsoft Graph `PUT .../shifts/{shiftId}`) belgelenmiş bir sürüm kontrolü yok; çakışmayı çağıran taraf çözüyor. Kontrol: Murat Şen, bugün cevaplanabilir (A02). Kaynak: `03-prior-art.md` C1.
`[UNVERIFIED]` Yazmanın Plan tarafında ne tetiklediği (kendiliğinden bildirim, haftanın yeniden hesabı) bilinmiyor. Kontrol: Murat Şen (G09).
`[UNVERIFIED]` Plan API'sinin hız sınırı ve kotası bilinmiyor; günde ~280 yazma ve cuma tepe yükü var. Kontrol: Murat Şen (G08).

### 4.2 Uygunluk kuralının okuyacağı veri

Talep altı kural yazıyor ama bunların hangi veriden hesaplanacağını yazmıyor. Üç veri kümesi bugüne kadar yalnız insanın okuduğu alandı, yeni akışta makine kapısına dönüşüyor (`01-impact-radar.md` Boyut 4b):

| # | Veri | Ne için | Durum |
|---|---|---|---|
| 1 | Rol yetkinliği (kasa/reyon/kasap/fırın) | Kural 2 | Plan'da var, kalite kontrolünden geçmemiş (A16) |
| 2 | Doğum tarihi | Kural 6 | Kaynağı ve boş olma davranışı yazılı değil (A17) |
| 3 | İzin, rapor, ücretsiz izin kayıtları | Kural 3 ve 5 | Kaynağı yazılı değil, kural listesinde de yok (A18) |
| 4 | Komşu haftanın vardiyaları | Kural 4 | Uygulama bugün tek hafta çekiyor (A15) |

4. satır sessiz bir hata üretir: pazartesi 06:00 vardiyasının dinlenme hesabı önceki pazar gecesine bakmayı gerektirir, o vardiya başka bir haftanın çizelgesindedir. Kural eksik veriyle hesaplanır ve sistem "uygun" der.

### 4.3 Değişen sözleşme ve bağımlılar

`01-impact-radar.md` kırk bağımlı sayıyor: 9 loud, 20 silent, 11 deferred. **Kırkının kırkı `[UNVERIFIED]`;** o belge kod tabanına, Plan dokümanına ve rapor envanterine erişemeden yazıldı. Buradan "şu taraf etkilenmiyor" diye bir satır alıntılamak yanlış alıntıdır.

Bu talep açısından taşıyıcı olanlar:

- Yayımlanmış haftanın sabit olduğu varsayımı düşüyor; okuma uçlarını kullanan herkes bunu bilmiyor (B04).
- Bordronun 25'inde çektiği değer artık sonradan değişebiliyor (B10, B36).
- Plan değişiklik logunda takas artık "müdür düzeltmesi" görünmeyebilir; ölçüt 1'in bazı buradan geliyor (B05, B12).
- Haftalık 45 saat için ikinci bir hesaplayıcı doğuyor; bordronunkiyle aynı sonucu verdiği doğrulanmadı (B06).
- Müdürün Plan'da elle düzeltme yetkisi kaldırılmıyor; iki yazma yolu aynı alana bakıyor (B19, B31).

---

## 5. Tasarım ve durumlar

**Tasarım yok; ekranlar kararlaştırılmadı.** Talep hiçbir ekran, akış görseli ya da metin taslağı içermiyor.

Malzemeden çıkan yüzeyler:

1. Mevcut haftalık çizelge ekranı — `[ASSUMED]` takasa açma buradan başlıyor.
2. `[ASSUMED]` Takas listesi — aynı mağazadaki uygun çalışanların gördüğü liste. Talep listenin varlığını yazıyor, yerini yazmıyor.
3. `[ASSUMED]` Müdür onay ekranı — iki ad, vardiya, not ve red sebebi seçimi bu ekranda.

Boş, yükleniyor ve hata durumları hiç konuşulmadı (A22). Ekran metinleri yazılmadı; yazılı olan tek metin dört red sebebinin etiketi. Erişilebilirlik seviyesi konuşulmadı. Dil tek: Türkçe, çeviri işi yok.

---

## 6. Risk ve işlevsel olmayan gereksinimler

**Yasal.** Uygunluk kuralları 4857 ve TİS'ten geliyor. Bugün kuralı insan uyguluyor ve hata bireysel; yeni akışta kuralı sistem uyguluyor ve hata sistemik oluyor. Kural motoru yanılırsa sorumluluğun kimde olduğu yazılı değil (A26). Kural seti eksikse sistem ihlalli takası "kurallardan geçti" damgasıyla teklif eder.

**Kişisel veri.** Doğum tarihi, izin ve rapor kayıtları uygunluk kapısında kullanılıyor. Red sebebi `disiplin` bugün sözlü olan bir değerlendirmeyi yazılı kayda çeviriyor; bu kayıt bir ihtilafta delil olur. Saklama süresi ve erişim kararı yok (G05).

**Sendika ve hukuk.** Kimin çalışabileceğine karar veren bir sistem, TİS görüşmesinde konu olur. Bilgilendirme ve imza planı yok (G10).

**Hacim ve maliyet.** `[ASSUMED]` Günde ~280 takas, takas başına 3–4 push. Cuma 16:00 sonrası tepe. Push kotası ve Plan API sınırı doğrulanmadı (G08). Çalıştırma maliyeti konuşulmadı.

**Geri alma.** Malzemede yazılı bir geri alma planı yok. `02-idea-grill.md` geri dönülebilirliği güçlü buluyor: veri göçü yok, dışa açık yüzey yok, WhatsApp yerinde duruyor. Pilot mağaza kümesiyle çıkmanın önünde engel görünmüyor. Bu bir değerlendirme, alınmış bir karar değil (G21 °).

**Ne zaman öğrenilir.** Kırk bağımlının otuz biri çıkış günü hiçbir şey göstermez. Dokuzu saatler içinde patlar; kalanı ay sonunu, bordro gününü ya da denetimi bekler.

---

## 7. Ölçümleme ve alt taraf

Bu bölümün tamamı açık. Hiçbir olay, log, rapor ya da destek aracı kararı verilmedi.

- Hangi olayların hangi parametrelerle atılacağı yazılmadı (G04 °).
- Plan değişiklik logunda yeni yazmanın kime atfedileceği kararı verilmedi. Servis hesabına atfedilirse ölçüt 1 kendiliğinden %0'a düşer ve hiçbir şey kanıtlamaz; müdüre atfedilirse hiç düşmez ve başarılı bir çıkış başarısız görünür (G01).
- Ölçüt 3'ün bugün bir bazı yok: bir takasın "başladığı an" hiçbir yerde kayıtlı değil. Ölçülecek oranın paydası ürünün kendisi olur (G02).
- Red kayıtlarının saklama süresi ve denetim izi kararı yok (G05).
- İK vaka sisteminde yeni akıştan doğan uyuşmazlığın karşılığı bir vaka tipi yok (G06).
- 480 müdürün runbook'u güncellenmeli: artık iki ayrı düzeltme yolu var (G07).
- Üretimde çalıştığını neyin göstereceği ve durduğunda kimin uyarılacağı konuşulmadı.

`01-impact-radar.md` on dört maddelik bir regresyon yüzeyi bırakıyor (değiştirdiğinizi sanmadığınız şeylerin listesi). O liste testleri yazan kişiye ulaşmak zorunda; yönlendirecek kişi Selin Aydın.

---

## Açık maddeler

° işareti, maddeyi ne talebin ne de üstteki üç belgenin açtığını, ilk kez burada açıldığını gösterir.

### Başlamayı engelleyen

| # | Soru | Sahip | Nereden geldi |
|---|---|---|---|
| A01 | Aynı vardiyayı iki kişi üstlenirse ne olur | Selin Aydın | Talep + impact-radar B21 |
| A02 | Plan yazma ucu koşullu yazma sunuyor mu, çakışmada ne döner | Murat Şen | prior-art C1 + B03/B09 |
| A03 | Havuz mu, adresli teklif mi; eşzamanlılık maliyeti hesaba katıldı mı | Selin Aydın | prior-art M1 |
| A04 | Müdür 48 saat cevap vermezse ne olur | Selin Aydın | Talep |
| A05 | Yeniden yayım, açık ve onaylanmış takası ne yapar | Murat Şen + Selin Aydın | Talep + B20 |
| A06 | Onaylanmış takas iptal edilebilir mi | Selin Aydın | Talep |
| A07 | Bordro kesiminden sonra onaylanan takas ne olur | Bordro ekibi (sahip adsız) | Talep + B10/B23 |
| A08 | Müdürün elle düzeltmesi açık takasla çarpışırsa | Ürün ekibi + Murat Şen | impact-radar B19 |
| A09 | Vardiya onay beklerken başlarsa | Selin Aydın | impact-radar B22 |
| A10 | Kuralların hepsini geçen takasa otomatik onay masada mı | Selin Aydın / İK | prior-art K1 |
| A11 | Kural listesi tam mı: hafta tatili, gece 7,5 saat | İK / hukuk | idea-grill 6 + prior-art K2 |
| A12 | Gece eşiği neden 22:00; 4857 tanımı 20:00 | İK / hukuk | prior-art C2 |
| A13 | 45 saat kanun tavanı mı, işveren politikası mı | İK / hukuk | prior-art Faz 4 |
| A14 | ° Kurallar hangi anda değerlendirilir: üstlenmede mi, onayda mı | Selin Aydın + Ürün ekibi | Bu belge |
| A15 | 11 saat hesabı komşu haftanın vardiyalarını nasıl görecek | Murat Şen | impact-radar B16 |
| A16 | Rol yetkinliği verisi güncel ve dolu mu | Murat Şen | impact-radar B14 |
| A17 | Doğum tarihi nereden gelir, boşsa davranış ne | Sahip adsız | impact-radar B15 |
| A18 | İzin ve rapor kayıtları uygunlukta kullanılacak mı, kaynağı ne | Murat Şen | impact-radar B17 |
| A19 | Devreden tarafta asgari saat taahhüdü var mı | Selin Aydın / İK | prior-art M2 |
| A20 | Karşılıklı takas bilerek mi dışarıda; hacmi ne | Selin Aydın | idea-grill 3 + prior-art M2 |
| A21 | Bugünkü takasların yüzde kaçı altı kuraldan geçiyor | Selin Aydın + Plan verisi | idea-grill 2 |
| A22 | ° Boş, yükleniyor, hata durumları ve ekran metinleri | Ürün ekibi / tasarım | Bu belge |
| A23 | ° Müdür yoksa ya da izinliyse onayı kim verir | Selin Aydın | Bu belge |
| A24 | Eski uygulama sürümünde davranış, minimum sürüm, zorunlu güncelleme | Ürün ekibi | impact-radar B11/B39/B40 |
| A25 | ° Kaç takas açılabilir, kaç üstlenilebilir, talep ne kadar açık kalır | Selin Aydın | Bu belge |
| A26 | Kural motoru yanılırsa sorumluluk kimde | İK / hukuk | idea-grill 7 |

Ayrıca **Ç1, Ç2 ve Ç3** (§1.7) bu tiere aittir: çelişki, cevapsız soru değil, karara bağlanmamış iki cümledir.

### Canlıya çıkışı engelleyen

| # | Soru | Sahip | Nereden geldi |
|---|---|---|---|
| G01 | Yeni yazma Plan logunda kime atfedilecek | Selin Aydın + Murat Şen | impact-radar B05/B12 |
| G02 | Ölçüt 3'ün bazı ve tanımı ne olacak | Selin Aydın | impact-radar B24 + idea-grill 7 |
| G03 | 1.840 uyuşmazlığın yüzde kaçı takas kaynaklı | Selin Aydın | idea-grill 5 |
| G04 | ° Hangi olaylar, hangi parametrelerle atılacak | Ürün ekibi + analitik | Bu belge |
| G05 | Red kaydı ve `disiplin` sebebi ne kadar saklanacak, kim görecek | İK / hukuk | impact-radar B33 + idea-grill 8 |
| G06 | İK vaka tiplerine yeni akışın karşılığı eklenecek mi | Selin Aydın | impact-radar B32 |
| G07 | 480 müdürün runbook'u ve eğitimi kim yazacak | Selin Aydın | impact-radar B31 |
| G08 | Push hacmi ve Plan API kotası yetiyor mu | Ürün ekibi + Murat Şen | impact-radar B29/B30 |
| G09 | Plan'a yazma neyi tetikliyor | Murat Şen | impact-radar B27 |
| G10 | Hukuk ve sendika ne zaman bilgilendirilecek | Selin Aydın | impact-radar B37/B38 |
| G11 | Bordronun "25'ten sonra çizelge sabittir" varsayımı doğrulanacak mı | Bordro ekibi | impact-radar B36 |
| G12 | Duyuru hangi tarihte yapılacak (tasarım kilidinden 10 iş günü önce) | Selin Aydın | impact-radar Faz 4 |
| G13 | Doluluk ve işgücü maliyeti raporları kişi bazlı mı | Sahip adsız | impact-radar B26 |
| G14 | 45 saatin ikinci hesaplayıcısı bordroyla aynı sonucu veriyor mu | Bordro ekibi | impact-radar B06 |
| G15 | Plan'ın kendi takas modülü ya da yol haritası var mı | Murat Şen | idea-grill 9 |
| G16 | Yazma ucu ne zaman hazır; Q2 taahhüdü verildi mi | Murat Şen | idea-grill 10 |
| G17 | Talebin en güçlü özeti Selin tarafından tanınıyor mu | Selin Aydın | idea-grill 0 |
| G18 | Beş açık maddeyi kim, hangi tarihte kapatacak | Selin Aydın | idea-grill 12 |
| G19 | Haftada 2,3 saatin içinde ne var | Selin Aydın | idea-grill 4 |
| G20 | Kural setinin sahipliği yazılı olarak İK'da mı kalıyor | Selin Aydın / İK | idea-grill kapanışı |
| G21 | ° Geri alma ve pilot planı ne | Ürün ekibi + Selin Aydın | Bu belge |

### Hiç değinilmemiş, engellemeyen

> **Kullanıcılar** — vekâleten işlem, yarı zamanlı çalışanın farkı *(2)*
> **Tasarım ve durumlar** — erişilebilirlik seviyesi, tablet ve büyük ekran, on binlik liste davranışı *(3)*
> **Risk** — veri yerleşimi, çalıştırma maliyeti, çevrimdışı davranış, akış ortasında uygulamanın kapanması *(4)*
> **Ölçümleme** — uçtan uca izleme kimliği, üretimde alarm eşiği *(2)*
> **Arka uç** — istemci mi sunucu mu önce çıkar, sürümler birbirinin eskisiyle çalışır mı *(1)*

**18 cevaplı · 25 açık · 12 hiç değinilmemiş.**

---

## En yanlış olma ihtimali yüksek varsayımlar

1. **`[ASSUMED]` Bildirimlerin mevcut push altyapısıyla gitmesi ve hacmin taşınması.** Günde ~280 takas × 3–4 bildirim, üstelik cuma akşamı tepe yaparak. Yanlışsa çıkışın ilk cuması bildirim kuyruğu tıkanır ve akışın tamamı bildirime bağlıdır.
2. **`[ASSUMED]` Günde ~280 takas hacmi.** Talebin kendi sayılarından bölünerek çıkarıldı; sistem içine alınan bir davranışın hacmi genellikle artar. Yanlışsa Plan yazma ucu ve kota tahminlerinin tamamı yanlış boyutlanır.
3. **`[ASSUMED]` Plan'a yazılan tek şeyin vardiya–çalışan eşlemesi olması.** Yazmanın Plan tarafında ne tetiklediği bilinmiyor (G09). Yanlışsa müdürlere beklenmedik bildirim gider ya da hafta yeniden hesaplanır.

Bu üçünün hiçbiri §1.7'deki çelişkileri kapsamıyor: **Ç1, Ç2 ve Ç3 varsayım değil, karara bağlanmamış iki cümledir** ve bu listeyle değil, sahibiyle kapanır.

---

## Sonraki adım

Açık maddelerin çoğu tek bir kişiye bakıyor: **26 başlamayı engelleyen maddenin 12'si Selin Aydın'da, 6'sı Murat Şen'de, 5'i İK/hukukta.** Bunlar soru değil karar olduğu için, tek tek sormak yerine `decision-memo` ile tek bir onay masasına konması daha hızlı kapanır — özellikle A02, A03 ve A10, çünkü üçü de akışın şeklini değiştirir.

`02-idea-grill.md`'nin önerdiği en ucuz adım hâlâ geçerli ve A20 ile A21'i aynı anda kapatır: Q4'ün 25.132 takas kaynaklı düzeltmesini altı uygunluk kuralına geriye doğru koşturmak ve aynı sorguda ters yönlü ikinci bacağı olan takasların oranını çıkarmak.

Bu belgeyi `readiness-score` ile puanlamamı ister misiniz? Kendi taslağımı tarafsızmışım gibi puanlamadım.
