# Vardiya Takası — Akış Haritası (ilk dilim)

## Taşıyıcı

**Kapsam bu belgede `06-slice.md` §5'tir, talebin tamamı değil.** Havuz yok, red sebebi listesi yok, otomatik onay yok, iki bacaklı takas yok, onaylanmış takasın uygulama içi iptali yok. Bunlar kesildi; kesenin adı ve onaylanıp onaylanmadığı `06` §6'da.

**Sayım.** 21 mutlu yol adımı · 6 dal · 19 hata yolu · **30 dokunma noktası işareti, 24 işaretli adımda** · 8 bitiş.

**Nerede ne var.**

| # | Bölüm | Ne var | Kim alır |
|---|---|---|---|
| 1 | §2 | Mutlu yol, işaret sütunuyla | `data-model`, `api-needs` |
| 2 | §3 | Dallar, koşulları ve bitişleri | `design-brief`, `flow-grill` |
| 3 | §4 | Hata yolları, elde kalan ve çıkış | `design-brief`, `risk-interrogate` |
| 4 | §5 | **Ayırt edilmesi zorunlu hatalar** | `design-brief`, ekran metnini yazan |
| 5 | §6 | **Her `emits` adımının yükü, tek yerde** | `api-needs`, ölçümlemeyi kuran |
| 6 | §7 | İşaret sayımı, adım numaralarıyla | `data-model`, `api-needs` |
| 7 | §8 | Sekiz bitiş; ikisi açık karara bağlı | `flow-grill`, Selin Aydın |
| 8 | §9 | Varsayımlar ve açık kalanlar, sahipleriyle | `readiness-score`, `decision-memo` |

**Önce §6 ve §7.** `data-model` ile `api-needs` iş listesini bu ikisinden kurar; ikisi de düzyazıyı atlayabilir. §5 ise düzyazıda değil, tabloda: hangi iki hatanın kullanıcıya farklı görünmek **zorunda** olduğu bir ürün kararıdır ve başka sahibi yoktur.

**Ne okudum.** `06-slice.md`'nin taşıyıcısı, §1 omurga, §3 kesilemeyenler, §5 dilim, §6 dilim dışı · `05-request-shaper.md`'nin taşıyıcısı, §2 kullanıcılar, §3 davranış ve kurallar (hata tablosu dahil), §5 durumlar. Başka belge açılmadı.

**Sabit sözlük.** `05` ve `06`'nın sözlüğü aynen sürüyor: *takas talebi*, *üstlenme*, *uygunluk kuralı*, *devir*, *sahip*, *dilim*, *adresli teklif*. Bu belgenin eklediği iki kelime: **dokunma noktası** = sistemin okumak, yazmak ya da olay atmak zorunda olduğu adım · **bitiş** = akışın bittiği ve kimsenin sırada beklemediği yer. `reads` · `acts` · `emits` · `[ASSUMED]` · `[UNVERIFIED]` · `[DECISION NEEDED]` işaretleri İngilizce kalır; zincirin sonraki halkası bunları eşleştiriyor.

**Numaralandırma.** Bu belgenin kendi kimlikleri: **B1–B6** dallar · **E1–E19** hata yolları · **V-1–V-6** varsayımlar · **AK-1–AK-9** açık kararlar. `06`'nın `D-n` (dilim maddesi), `K-n` (kesim), `KŞ-n` (kararı şimdi) ve `DD-n` (dilim dışı) kimlikleri aynen alıntılanıyor; karıştırmamak için bu belge o harfleri kendi maddelerine vermedi.

**Bir uyarı, en başta.** Bu akışın en sert bulgusu §4'te değil, §4'ün yokluğunda: **üstlenildikten sonra, müdür onaylamadan önce hiçbir tarafın çıkışı yok.** D-6 geri çekmeyi yalnız üstlenmeden önce veriyor, KŞ-8 onaylanmışın iptalini kapatıyor, DD-9 teklife süre koymuyor. Aradaki pencerede takas ne ilerliyor ne düşüyor (E12, E13). Bu bir tuzaktır ve dilim başlamadan kapanmalıdır.

---

## 1. Sınırlar

**Başlar:** Devreden çalışan, cuma 16:00'da yayımlanmış haftasının çizelgesini uygulamada açar; o haftada çalışamayacağı bir vardiyası ve aklında aynı mağazadan bir arkadaşı vardır.
**Biter:** Sekiz bitişten biriyle; tam liste §8'de. Kısaca: onaylandı · teklif kurulmadı · geri çevrildi · geri çekildi · reddedildi · Plan yazması düştü · terk · sonucu belirsiz.
**Aktörler:** devreden çalışan · üstlenen çalışan · mağaza müdürü · uygulama (istemci) · takas servisi ve kural motoru (sunucu) · **Plan** · **push bildirim altyapısı**.

Plan ve push altyapısı birer aktördür, ayrıntı değil: ikisi de düşebilir ve düştüklerinde akışın gidişi değişir.

**Sınırlarda varsayılan üç şey.** Otonom koşum; soracak kimse yoktu.

- `[ASSUMED]` Takasa açma mevcut haftalık çizelge ekranından başlar (`05` §5, yüzey 1).
- `[ASSUMED]` Bildirimler mevcut push altyapısıyla gider (`05` §3.1, D-11).
- `[ASSUMED]` Akış yalnız pilot mağaza kümesinde ve takas ekranını taşıyan uygulama sürümünde koşar (DD-6, KŞ-10).

---

## 2. Mutlu yol

| # | Aktör | Ne olur | Sistem |
|---|---|---|---|
| 1 | Devreden çalışan | Yayımlanmış haftasının çizelgesini açar | **reads** |
| 2 | Devreden çalışan | Çalışamayacağı vardiyayı seçip "takasa aç" der | |
| 3 | Devreden çalışan | Aynı mağazadan tek bir çalışanı ad vererek seçer | **reads** |
| 4 | Devreden çalışan | İsteğe bağlı notu yazar (140 karakter) | |
| 5 | Devreden çalışan | Teklifi gönderir | |
| 6 | Sistem | Altı uygunluk kuralını sunucuda koşar | **reads** |
| 7 | Sistem | Takas talebini kurar ve teklifi kaydeder | **acts** · **emits** |
| 8 | Sistem | Teklif edilen çalışana bildirim gönderir | **acts** |
| 9 | Üstlenen çalışan | Teklifi açar: vardiya, not, devreden adı | **reads** |
| 10 | Üstlenen çalışan | "Üstleniyorum" der | |
| 11 | Sistem | Altı kuralı üstlenme anında yeniden koşar | **reads** |
| 12 | Sistem | Üstlenmeyi yazar, takası onaya düşürür | **acts** · **emits** |
| 13 | Sistem | Mağaza müdürüne bildirim gönderir | **acts** |
| 14 | Müdür | Bekleyen takas kuyruğunu açar: iki ad, vardiya, not | **reads** |
| 15 | Müdür | Onaylar | |
| 16 | Sistem | Altı kuralı onay anında yeniden koşar | **reads** |
| 17 | Sistem | Plan'a vardiya–çalışan eşlemesini yazar | **acts** |
| 18 | Sistem | Plan olumlu döndükten sonra takası "onaylandı" işaretler | **acts** · **emits** |
| 19 | Sistem | Onay anındaki değerleri ve kural sürümünü kayda yazar | **acts** |
| 20 | Sistem | İki tarafa sonuç bildirimi gönderir | **acts** |
| 21 | İki çalışan | Çizelgede vardiyayı yeni sahibinde görür | **reads** |

**Adım 6 ile 11 ve 16 aynı kontrol değildir.** KŞ-4 yetkiyi iki ana koyuyor: üstlenme (11) ve onay (16). Adım 6, teklifin hiç kurulmaması içindir (D-4, M4'ün adresli teklifteki şekli) ve **yetki mekanizması değildir** — arada çizelge değişebildiği için 11 ve 16 kaldırılamaz.

**Adım 17, 18 ve 19 tek adım değildir.** D-10 takası ancak Plan yazdıktan sonra onaylanmış sayıyor. Üçünü birleştiren her uygulama, Plan düşerken kullanıcıya "onaylandı" gösterir; E1 ve E2 tam bu aralıkta yaşıyor.

**Adım 19 sonradan hesaplanamaz.** KŞ-2 ve KŞ-3'ün yazdırdığı değerler (saatler, mağaza, rol, haftalık toplam, dinlenme aralığı, kural seti sürümü) o anda saptanır; on sekiz ay sonra Plan'dan yeniden türetilemez.

**KŞ-6 denetim izi ayrı bir adım değil.** 7, 12, 18 ve dallardaki her `acts` adımının yanında yazılır: kim, ne zaman, hangi kural sürümüyle.

**Karar veren, dokunmayan adım.** Adım 15 müdürün kararıdır ve hiçbir işaret taşımaz — elindeki ekranı okuyup evet der. Bu dilimin döndüğü nokta odur (M2, KŞ-5): çizelgeyi değiştiren tek yetki orada duruyor, ama bir okuma ya da yazma değil.

---

## 3. Dallar

**B1 — teklif anındaki kural kontrolü geçmez** *(adım 6'dan)*
1. Sistem teklifi kurmaz, hangi kuralın düştüğünü devreden çalışana gösterir
→ **Rejoins at step 3.** Devreden çalışan başka bir arkadaş seçebilir.
*Bu dal hiçbir olay atmıyor: KŞ-7'de "teklif kurulmadı" yok, huninin ilk kaybı ölçülemez (§6).*

**B2 — devreden çalışan teklifi geri çeker** *(adım 8 ile 10 arasında, D-6)*
1. Devreden çalışan takas ekranından "geri çek" der
2. Sistem teklifi kapatır · **acts** · **emits** (`düştü`)
3. Sistem teklif edilen çalışanı bilgilendirir · **acts**
→ **Terminates.** Bitiş 4.
*`[ASSUMED]` Geri çekme bildirimi D-11'in üç bildiriminde yok; "sonuçlandı" sayıldı. Sahibi: ürün ekibi.*

**B3 — üstlenen çalışan geri çevirir** *(adım 10'dan, D-5)*
1. Üstlenen çalışan "geri çeviriyorum" der
2. Sistem teklifi kapatır · **acts** · **emits** (`düştü`)
3. Sistem devreden çalışana bildirim gönderir · **acts**
→ **Terminates.** Bitiş 3. Devreden çalışan yeni bir teklif kurabilir; bu akışın yeniden başlaması, buraya dönüş değil.

**B4 — üstlenme anındaki kural kontrolü geçmez** *(adım 11'den)*
1. Sistem üstlenmeyi kabul etmez, düşen kuralı üstlenen çalışana gösterir
→ **Terminates.** Bitiş 2.
*`[DECISION NEEDED]` Teklif açık kalıp devreden çalışanın başka birine yönlendirebileceği bir hâle mi düşer, yoksa tümden düşer mi — yazılı değil. Sahibi: Selin Aydın. Yukarıdaki bitiş yazılı karar değil, boşluğun işaretidir.*

**B5 — müdür reddeder** *(adım 15'ten, D-8)*
1. Müdür "reddet" der
2. Müdür zorunlu serbest metni yazar (sebep listesi yok, K-2)
3. Sistem reddi kaydeder · **acts** · **emits** (`reddedildi`)
4. Sistem iki tarafa bildirim gönderir · **acts**
→ **Terminates.** Bitiş 5. Vardiya devreden çalışanda kalır.
*KŞ-23 açık: serbest metin ne kadar saklanır, kim görür. Sahibi: İK / hukuk.*

**B6 — onay anındaki kural kontrolü geçmez** *(adım 16'dan)*
1. Sistem onayı kabul etmez, düşen kuralı müdüre gösterir
→ **Terminates.** Bitiş 2.
*`[DECISION NEEDED]` Takas kuyrukta kalır mı düşer mi — yazılı değil. Sahibi: Selin Aydın. B4 ile aynı boşluk, farklı aktörün ekranında.*

**Dört ve üstü dal var; diyagram teklif ediliyor.** Otonom koşumda cevap veren olmadığı için çizilmedi. Çizilseydi Phase 5'in düğüm işaretlemesi tek bir şey söylerdi: **hiçbir düğüm tasarlanmış değil** — `05` §5 "tasarım yok, ekranlar kararlaştırılmadı" diyor. Metin bu belgenin aslıdır; diyagram istenirse §2–§4'ten türetilir.

---

## 4. Hata yolları

Her yol iki soruya cevap veriyor: **elde kalan** ve **çıkış**. `references/completeness.md`'in yedi sorusu 21 adımın hepsine tek tek koşuldu.

**E1 — Plan yazması hata döner** *(adım 17'de)*
- **Elde kalan:** Müdürün onay ekranı; takas onaylanmamış, çizelge değişmemiş, iki çalışan hâlâ "onay bekliyor" görüyor.
- **Çıkış:** Müdür tekrar dener; olmuyorsa bugünkü yol — Plan'a elle giriş.
→ **Rejoins at step 15.** D-10 ve D-13 bu yolun metnini kapsıyor. KŞ-18 açık (Murat Şen): uç koşullu yazma sunuyor mu, çakışmada ne dönüyor.

**E2 — Plan yazması zaman aşımına uğrar, sonuç bilinmiyor** *(adım 17'de)*
- **Elde kalan:** Çizelgenin değişip değişmediği belirsiz. Takas onaylanmamış, ama Plan yazmış olabilir.
- **Çıkış:** **Yok.** Tekrar deneme çift yazma riski taşır; KŞ-18 cevaplanmadan yazılabilecek bir çıkış yok.
→ **Bitiş 8, açık karara bağlı.** `[DECISION NEEDED]` Murat Şen (A02 / KŞ-18) — dilim başlamadan.

**E3 — çizelge yüklenemiyor** *(adım 1, 14, 21'de)*
- **Elde kalan:** Boş ya da eski çizelge ekranı.
- **Çıkış:** Yeniden dene (D-13).
→ **Rejoins at step 1.**

**E4 — rol yetkinliği verisi boş ya da güncel değil** *(adım 6, 11, 16'da)*
- **Elde kalan:** Teklif kurulmadı; sebep "yetkinlik yetersiz" diyor, oysa veri yok.
- **Çıkış:** Başka arkadaş seçmek. Veriyi düzeltmek akışın dışında.
→ **Rejoins at step 3.** KŞ-22 açık (Murat Şen).

**E5 — doğum tarihi okunamıyor ya da boş, gece vardiyası** *(adım 6, 11, 16'da)*
- **Elde kalan:** Teklif kurulmadı; KŞ-9 gereği kapı kapalı tarafa düştü.
- **Çıkış:** Gündüz vardiyası ya da başka arkadaş.
→ **Rejoins at step 3.** Verinin kaynağı hâlâ açık (A17).

**E6 — komşu haftanın vardiyaları çekilemiyor** *(adım 6, 11, 16'da, D-14)*
- **Elde kalan:** Teklif kurulmadı; 11 saat kuralı hesaplanamadı.
- **Çıkış:** Sonra tekrar denemek.
→ **Rejoins at step 3.** `[ASSUMED]` KŞ-9'un kıyasıyla kapı kapalı tarafa düşer. **Alternatifi bir hata yolu değil, sessiz yanlış hesaptır** ve A15 çözülmeden ayırt edilemez. Sahibi: Murat Şen.

**E7 — teklif edilen çalışanın sürümü takas ekranını taşımıyor** *(adım 6'da, KŞ-10)*
- **Elde kalan:** Teklif kurulmadı; devreden çalışan sebebi görüyor.
- **Çıkış:** Başka arkadaş ya da bugünkü WhatsApp yolu.
→ **Rejoins at step 3.** Bu durumun ekran metni yazılmadı; D-13 kapsamında, sahibi `design-brief`.

**E8 — push bildirimi gitmez ya da gecikir** *(adım 8, 13, 20'de)*
- **Elde kalan:** Teklif edilen çalışan ya da müdür teklifi hiç öğrenmiyor; takas sessizce açık duruyor.
- **Çıkış:** Uygulamayı açıp takas durumunu görmek (D-12). Tek tetikleyici yok.
→ **Rejoins at step 9 ya da 14.** Altyapı `[ASSUMED]`; D-20 pilotta hacmi ölçüyor.

**E9 — aynı teklif iki kez ya da iki cihazdan üstlenilir** *(adım 10–12'de)*
- **Elde kalan:** Tek üstlenme; ikinci istek etkisiz.
- **Çıkış:** Gerekmiyor.
→ **Rejoins at step 12.** · **reads** (sunucu takasın güncel durumunu okur). `[ASSUMED]` Kontrol ilk basıştan sonra kaldırılır ve sunucu ikinci üstlenmeyi kabul etmez. KŞ-1 aynı **vardiya** için tek açık takas diyor; aynı **teklifin** iki kez üstlenilmesini kapsamıyor. Sahibi: ürün ekibi.
*Havuz kesildiği için A01 — aynı vardiyayı iki kişinin üstlenmesi — bu dilimde oluşamaz (DD-1). Havuz geri gelirse bu yol yeniden yazılır.*

**E10 — müdür aynı takası iki kez onaylar** *(adım 15–17'de)*
- **Elde kalan:** Plan'a iki yazma riski; çizelgede ne olduğu belirsiz.
- **Çıkış:** KŞ-18 cevaplanmadan yazılamaz.
→ **Bitiş 8'e bağlı.** `[DECISION NEEDED]` Murat Şen. E2 ile aynı boşluğun ikinci yüzü.

**E11 — vardiya onay beklerken başlar** *(adım 12 ile 18 arasında)*
- **Elde kalan:** Geçmiş bir vardiya için açık takas; çizelge kimin çalıştığını yanlış gösteriyor.
- **Çıkış:** Yazılı değil.
→ `[DECISION NEEDED]` **Selin Aydın (KŞ-14 / A09) — dilim başlamadan.** Bitişi belirsiz.

**E12 — müdür cevap vermez** *(adım 14'te)*
- **Elde kalan:** İki çalışan da vardiyayı kimin çalışacağını bilmiyor. DD-9 gereği teklif kendiliğinden kapanmıyor.
- **Çıkış:** **Yok.** D-6 geri çekmeyi yalnız üstlenmeden önce veriyor.
→ `[DECISION NEEDED]` **Selin Aydın (KŞ-13 / A04) — dilim başlamadan.** Bugünkü yazılı davranış Bitiş 7'dir: süresiz açık.

**E13 — müdür izinli ya da mağazada yok** *(adım 14'te)*
- **Elde kalan:** Kuyruğu kimse açmıyor; E12 ile aynı yere düşüyor.
- **Çıkış:** Yok.
→ `[DECISION NEEDED]` **Selin Aydın (KŞ-12 / A23) — dilim başlamadan.**

**E14 — hafta yeniden yayımlanır** *(adım 18'den sonra ya da takas açıkken)*
- **Elde kalan:** Uygulamada "onaylandı" yazıyor; Plan'daki çizelge yeni yayımla başka bir şey söylüyor olabilir.
- **Çıkış:** Yok.
→ `[DECISION NEEDED]` **Murat Şen + Selin Aydın (KŞ-15 / A05) — dilim başlamadan.** Bu akışın en sessiz hatası: kimse bir hata görmüyor.

**E15 — müdür Plan'da elle düzeltirken açık takas var** *(akışın herhangi bir anında)*
- **Elde kalan:** Elle düzeltme ile takasın yazması aynı vardiyayı farklı kişilere veriyor olabilir.
- **Çıkış:** Yok.
→ `[DECISION NEEDED]` **Ürün ekibi + Murat Şen (KŞ-16 / A08) — dilim başlamadan.**

**E16 — onay bordro kesiminden (ayın 25'i) sonra düşer** *(adım 18'de)*
- **Elde kalan:** Bordro yanlış ödüyor — ürünün kapatmak için kurulduğu şeyin ta kendisi.
- **Çıkış:** Yok.
→ `[DECISION NEEDED]` **Bordro ekibi (KŞ-17 / A07) — dilim başlamadan.**

**E17 — devreden çalışan teklifi göndermeden çıkar** *(adım 2–5'te)*
- **Elde kalan:** Hiçbir şey; kayıt kurulmadı.
- **Çıkış:** Gerekmiyor.
→ **Bitiş 7.** Ölçümde görünmez: KŞ-7'de gönderilmeden terk için olay yok.

**E18 — çizelge ekranı onaydan sonra eski değeri gösterir** *(adım 21'de)*
- **Elde kalan:** "Onaylandı" bildirimi geldi, çizelgede eski vardiya duruyor; çalışan takasın olmadığını sanıyor.
- **Çıkış:** Ekranı yenilemek.
→ **Rejoins at step 21.** · **reads** · `[UNVERIFIED]` Mevcut ekranın önbelleğinin bu yazmayı nasıl gördüğü doğrulanmadı (`05` §3.1; `01-impact-radar.md` B01).

**E19 — bağlantı yok ya da sunucuya erişilemiyor** *(kullanıcının hareket ettiği her adımda)*
- **Elde kalan:** D-13'ün hata durumu; çevrimdışı çalışma kapsam dışı (DD-10).
- **Çıkış:** Bağlantı gelince tekrar denemek.
→ **Rejoins at the step it left.**

---

## 5. Hangi hataları kişi birbirinden ayırt edebilmeli

Sütunu aşağı okudum. Bu bir ürün kararıdır ve başka sahibi yoktur: yazılmazsa hata işleyicisini yazan kişi, en sonda, tek başına verir.

| # | Ayrım | Zorunlu mu | Neden |
|---|---|---|---|
| 1 | E1 ↔ E2 | **Zorunlu** | "Olmadı" ile "bilinmiyor" farklı şeyler; E2'nin çıkışı yok |
| 2 | E6 ↔ E4, E5 | **Zorunlu** | E6 geçici, tekrar denenir; E4 ve E5 o kişi için kalıcı |
| 3 | E8 ↔ E12 | **Zorunlu** | E8 uygulamayı açınca çözülür; E12'nin çıkışı yok |
| 4 | E4 ↔ E5 | Gerekmiyor | Devreden çalışan için aynı elde kalan, aynı çıkış |
| 5 | E3 ↔ E19 | Gerekmiyor | Ekran yüklenmedi, tekrar dene; ikisi de aynı |
| 6 | E7 ↔ E4, E5 | **Zorunlu** | E7 arkadaşın sürümüyle ilgili; kural ihlali değil |
| 7 | E14 ↔ E1 | **Zorunlu** | E1'de kimse "onaylandı" görmedi; E14'te iki taraf da gördü |

**Satır 3 bugün sağlanmıyor.** Uygulama E8'de de E12'de de "onay bekliyor" gösteriyor. İkisi ayrılmazsa E12'nin çıkışı ulaşılamaz kalır — çalışan bekler, çünkü bekleneceğini sanır.

**Satır 4 kişi için gerekmiyor, veri için gerekiyor.** E4 ile E5 aynı ekranı gösterebilir, ama denetim izinde ve olay verisinde ayrılmalı: biri veri kalitesi sorunudur (KŞ-22), diğeri kuralın kendisi.

---

## 6. `emits` adımlarının yükü

KŞ-7'nin yedi olayı, aktıkları yerle birlikte. **Hepsi aynı iki alanı taşıyor ve başka alan yazılı değil.**

| # | Olay | Nerede | Taşıdığı |
|---|---|---|---|
| 1 | `takas_açıldı` | adım 7 | takas kimliği · zaman damgası |
| 2 | `teklif_edildi` | adım 7 | takas kimliği · zaman damgası |
| 3 | `üstlenildi` | adım 12 | takas kimliği · zaman damgası |
| 4 | `onaya_düştü` | adım 12 | takas kimliği · zaman damgası |
| 5 | `onaylandı` | adım 18 | takas kimliği · zaman damgası |
| 6 | `reddedildi` | B5.3 | takas kimliği · zaman damgası |
| 7 | `düştü` | B2.2, B3.2 | takas kimliği · zaman damgası |

**Bu tablonun boşlukları, dolu satırlarından önemli.**

- `düştü` geri çekmeyi geri çevirmeden ayırmıyor. İki farklı bitiş, tek olay.
- Olay yok: teklifin hiç kurulmaması (B1) · kural kapısında düşen üstlenme (B4) · kural kapısında düşen onay (B6) · Plan yazmasının düşmesi (E1, E2) · gönderilmeden terk (E17).
- Yük yalnız kimlik ve zaman. Mağaza, rol, aktör ve sebep yok; **ölçüt 1 ve ölçüt 2 mağaza kırılımıyla okunamaz.**
- KŞ-25 hâlâ açık (Selin Aydın): ölçüt 3'ün tanımı ve bazı yazılmadan bu yedi olay neyi ölçtüğünü söylemiyor.

Bunların hiçbiri burada karara bağlanmadı. Yeni olay ya da yeni alan **icat edilmedi**; eksik oldukları yazıldı.

---

## 7. İşaret sayımı

**Sayım, adım numaralarıyla.** Toplam tek başına doğrulanamaz; numaralar tabloyla birlikte yanlış olmadıkça kayamaz.

- **reads** — 1, 3, 6, 9, 11, 14, 16, 21, E9, E18 = **10**
- **acts** — 7, 8, 12, 13, 17, 18, 19, 20, B2.2, B2.3, B3.2, B3.3, B5.3, B5.4 = **14**
- **emits** — 7, 12, 18, B2.2, B3.2, B5.3 = **6**

**30 işaret · 24 işaretli adım.** İkisi farklı sayıdır: 7, 12, 18, B2.2, B3.2 ve B5.3 ikişer işaret taşıyor. İşaretsiz mutlu yol adımları: 2, 4, 5, 10, 15.

**Nerede duruyorlar:** mutlu yolda 19 işaret / 16 adım · dallarda 9 işaret / 6 adım · hata yollarında 2 işaret / 2 adım.

**Hata yollarının payı bilerek düşük.** Bu akışta hata yolları çoğunlukla sistemin **yapmadığı** yerler: düşen `acts` zaten mutlu yolda sayılı, tekrar saymak çift sayım olur. Yalnız E9 ve E18 mutlu yolda olmayan bir okuma ekliyor.

**Ne sayıldı:** dokunma noktası **işaretleri** ve bunları taşıyan **adımlar**. Yazma yeri sayısı değil — adım 17 ile 19 ayrı `acts`'tir ama farklı sistemlere yazar, ve bu ayrım `api-needs`'in işidir.

**Bu işaretler iki skile gidiyor, bir skile değil.** Önce `data-model`: adım 19'un yazdığı değerler (KŞ-2, KŞ-3), takas kaydının kimliği (KŞ-1) ve denetim izi (KŞ-6) tanımlanmadan yazılan sözleşme, adı konmamış isimler üzerine yazılmış olur. Sonra `api-needs`.

---

## 8. Bitişler

| # | Bitiş | Nereden | Durum |
|---|---|---|---|
| 1 | Takas onaylandı, Plan güncellendi | adım 21 | Yazılı |
| 2 | Teklif kurulmadı ya da kabul edilmedi | B1, B4, B6 | B4 ve B6 açık karara bağlı |
| 3 | Teklif edilen çalışan geri çevirdi | B3 | Yazılı |
| 4 | Devreden çalışan geri çekti | B2 | Yazılı |
| 5 | Müdür reddetti | B5 | Yazılı |
| 6 | Plan yazması düştü, takas onaylanmadı | E1 | Yazılı (D-10) |
| 7 | Terk: kimse ilerletmedi, teklif süresiz açık | E12, E13, E17 | **Kaza sonucu bitiş** (DD-9) |
| 8 | Sonucu belirsiz: Plan cevap vermedi | E2, E10 | `[DECISION NEEDED]` KŞ-18 |

**Bitiş 7 kimsenin seçtiği bir bitiş değil.** DD-9 teklife süre koymamayı yazıyor ve bunun sonucu, hiç kapanmayan takaslardır. Terk bir bitiştir ve bu akışta muhtemelen en sık görülenidir; bugün onu üreten şey bir karar değil, bir eksik.

**Oran.** 21 mutlu adım, 6 dal, 19 hata yolu. Bir onay adımı ve üçüncü bir sisteme yazma taşıyan akışta beklenen şekil bu. Hata yollarının 8'i `[DECISION NEEDED]` taşıyor; bu, akışın kötü haritalandığını değil, **dilimin önünde hâlâ karar durduğunu** gösteriyor (`06` §3: KŞ-12'den KŞ-20'ye dokuzu dilim başlamadan).

---

## 9. Varsayımlar ve açık kalanlar

**Bu belgede varsayılanlar.** Hiçbiri karar değildir; her biri tek satırda çürütülebilir.

| # | Varsayım | Nerede | Sahibi |
|---|---|---|---|
| V-1 | Takasa açma çizelge ekranından başlar | §1 | Ürün ekibi |
| V-2 | Bildirimler mevcut push altyapısıyla gider | §1, E8 | Murat Şen |
| V-3 | Geri çekme bildirimi "sonuçlandı"nın içinde | B2 | Ürün ekibi |
| V-4 | Komşu hafta çekilemezse kapı kapalı tarafa düşer | E6 | Murat Şen (A15) |
| V-5 | İkinci üstlenme sunucuda kabul edilmez | E9 | Ürün ekibi |
| V-6 | Akış pilot kümede ve yeni sürümde koşar | §1 | Selin Aydın |

**Bu akışın çözemediği, dilim başlamadan cevaplanması gereken kararlar.** Hepsi `06` §3'ten geliyor; burada yalnız akıştaki yerleri eklendi.

| # | Karar | Akıştaki yeri | Sahip |
|---|---|---|---|
| AK-1 | Kural kapısında düşen üstlenme/onay ne olur | B4, B6 | Selin Aydın |
| AK-2 | Vardiya onay beklerken başlarsa | E11 | Selin Aydın |
| AK-3 | Müdür cevap vermezse | E12 | Selin Aydın |
| AK-4 | Müdür izinliyse onayı kim verir | E13 | Selin Aydın |
| AK-5 | Yeniden yayım onaylanmış takası ne yapar | E14 | Murat Şen + Selin Aydın |
| AK-6 | Elle düzeltme açık takasla çarpışırsa | E15 | Ürün ekibi + Murat Şen |
| AK-7 | Bordro kesiminden sonraki onay | E16 | Bordro ekibi |
| AK-8 | Plan ucu koşullu/idempotent yazma sunuyor mu | E1, E2, E10 | Murat Şen |
| AK-9 | Kural listesi tam mı, gece penceresi nerede başlıyor | adım 6, 11, 16 | İK / hukuk |

**Sonraki adım.** Önce `data-model` (adım 19, KŞ-1, KŞ-2, KŞ-3, KŞ-6 üzerinden), sonra `api-needs` (§7'nin işaretleri üzerinden). `flow-grill` bu belgeyi §5 ve §8'den tutarak kırabilir.
