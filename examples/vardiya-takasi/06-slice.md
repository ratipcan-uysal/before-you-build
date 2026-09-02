# Vardiya Takası — İlk Dilim

## Taşıyıcı

**Omurga cümlesi:** *Aynı mağazada çalışan iki kişiden biri, yayımlanmış haftasındaki bir vardiyayı diğerine devreder; kurallar sunucuda kontrol edilir, müdür onaylar ve çizelge Plan'da değişmiş olur.*

**Sayım.** Masaya 63 aday kondu. **Dilimde 21 · Kararı şimdi, yapımı sonra 29 · Dilim dışı 11 · Hiç yapılmayacak 7.** Bölüm satırı adaydan çok, çünkü birkaç aday ikiye ayrıldı (kararı bir yere, yapımı başka yere indi). Masadaki 63 satırın hepsi bu dördünden birine iniyor; hiçbiri masada kalmadı.

**Nerede ne var.**

| # | Bölüm | Ne var | Kim alır |
|---|---|---|---|
| 1 | §0 | 63 adayın tek satırlık listesi ve indiği yer | Kendi kontrolüm |
| 2 | §1 | Omurga, mekanizma ve manşet kontrolü | `design-brief`, `flow-map` |
| 3 | §2 | Kesimler, dört testin sonucu | Selin Aydın, `readiness-score` |
| 4 | §3 | Kesilemeyen kararlar (**yapımı erteleniyor, kararı değil**) | `data-model`, `api-needs` |
| 5 | §5 | **Dilim: kapsamın kaydı budur** | `design-brief` ilk okuyandır |
| 6 | §6 | Dışlama cümleleri — alıntılanacak satırlar burada | `readiness-score` |
| 7 | §8 | Hangi açık madde kapandı, listeyi kim yeniden yazar | `request-shaper` ikinci geçiş |

**Ne okudum.** `05-request-shaper.md` tamamı · `04-readiness-score-v1.md`'nin verdict, beş boşluk ve out of scope bölümleri (aritmetiği değil) · `00-talep.md` tamamı. Klasörde ikinci bir puanlama duruyor; zincir dışı tutulduğu için açılmadı. `03-prior-art.md` bu koşumda bana verilmedi; ondan gelen her şey `05`'in alıntıladığı kadarıyla var, ve bunun bir sonucu §2 K-1'de yazılı.

**Sabit sözlük.** `05`'in sözlüğü aynen sürüyor: *takas talebi*, *üstlenme*, *uygunluk kuralı*, *devir*, *sahip*. Bu belgenin eklediği dört kelime: *dilim* = ilk sürüm · *omurga* = çıkarılınca işin bitmediği adımlar · *havuz* = vardiyanın uygun herkesin listesinde görünmesi · *adresli teklif* = vardiyanın ad verilerek tek kişiye teklif edilmesi. Başka ad kullanılmadı.

**Bir uyarı, en başta.** `04-readiness-score-v1.md` §4 *"`slice` gerekmiyor"* diyor ve gerekçesi doğru: bu talep tek sürüm için fazla büyük değil, **tanımsız**. Bu belge o teşhisi çürütmüyor. Aşağıdaki dilim gerçek bir dilimdir, ama kesilerek yapılabilir hale gelmez: dilimin önünde 26 başlamayı engelleyen maddenin 19'u hâlâ duruyor ve bunların hepsi karar, kod değil.

---

## 0. Masadaki her şey

Sıra yok, yargı yok. Sağ sütun: **[D]** dilimde · **[KŞ]** kararı şimdi, yapımı sonra · **[DD]** dilim dışı · **[HY]** hiç yapılmayacak.

| # | Aday | Nereden | İner |
|---|---|---|---|
| P01 | Vardiyayı takasa açma | Talep, ana akış 1 | [D] |
| P02 | 140 karakterlik not | Talep, ana akış 1 | [D] |
| P03 | Havuz: uygun herkesin gördüğü liste | M1 | [DD] |
| P04 | Adresli teklif: ad vererek tek kişiye | Bu belge, M1'in yerine | [D] |
| P05 | Altı uygunluk kuralı, sunucuda | §3.2 | [D] |
| P06 | Kuralların hangi anda koşacağı | A14 | [KŞ] |
| P07 | Üstlenme (kabul) | Ana akış 3 | [D] |
| P08 | Müdür onayı, istisnasız | M2 | [D] |
| P09 | Red + zorunlu serbest metin | §3.3 | [D] |
| P10 | Dört maddelik red sebebi listesi | §3.3, Ç1 | [DD] |
| P11 | Kurallardan geçene otomatik onay | A10 | [DD] |
| P12 | Plan'a yazma | M5 | [D] |
| P13 | Plan yazması düşerse kullanıcı ne görür | A02, skor B-2 | [D] |
| P14 | Bildirim: teklif, onaya düşme, sonuç | M7 | [D] |
| P15 | Aynı vardiyayı iki kişi üstlenirse | A01 | [DD] |
| P16 | Müdür 48 saat cevap vermezse | A04 | [KŞ] |
| P17 | Onaylanmış takasın iptali | A06 | [KŞ] + [DD] |
| P18 | Haftanın yeniden yayımı | A05 | [KŞ] |
| P19 | Müdürün elle düzeltmesiyle çakışma | A08 | [KŞ] |
| P20 | Bordro kesiminden sonraki onay | A07 | [KŞ] |
| P21 | Vardiya onay beklerken başlarsa | A09 | [KŞ] |
| P22 | Müdür izinliyse onayı kim verir | A23 | [KŞ] |
| P23 | Kaç takas açılır, kaç üstlenilir, ne kadar açık kalır | A25 | [KŞ] + [DD] |
| P24 | Komşu haftanın vardiyalarını çekmek | A15 | [D] |
| P25 | İzin ve rapor kayıtlarının uygunlukta kullanımı | A18 | [KŞ] |
| P26 | Doğum tarihi kaynağı ve boş davranışı | A17 | [KŞ] |
| P27 | Rol yetkinliği verisinin kalitesi | A16 | [KŞ] |
| P28 | Eksik kurallar: hafta tatili, gece 7,5 saat, 20:00 | A11, A12, A13 | [KŞ] |
| P29 | Kural motoru yanılırsa sorumluluk | A26 | [KŞ] |
| P30 | Akışın ürettiği olaylar | G04, G02 | [D] |
| P31 | Plan logunda yazmanın kime atfedileceği | G01 | [KŞ] |
| P32 | Red kaydının saklanması ve erişimi | G05 | [KŞ] |
| P33 | Denetim izi: hangi kural sürümüyle geçti | Bu belge, §6 riski | [KŞ] |
| P34 | Boş, yükleniyor, hata ekranları ve metinleri | A22 | [D] |
| P35 | Eski uygulama sürümü, zorunlu güncelleme | A24 | [KŞ] |
| P36 | Karşılıklı, iki bacaklı takas | A20 | [DD] |
| P37 | İK vaka sistemine yeni vaka tipi | G06 | [DD] |
| P38 | 480 müdürün runbook'u ve eğitimi | G07 | [DD] |
| P39 | Hukuk ve sendika bilgilendirmesi | G10 | [KŞ] |
| P40 | Doluluk ve işgücü maliyeti raporları | G13 | [DD] |
| P41 | 45 saatin bordroyla mutabakatı | G14 | [KŞ] |
| P42 | Erişilebilirlik seviyesi | Değinilmemiş tier | [DD] |
| P43 | Tablet, büyük ekran, on binlik liste | Değinilmemiş tier | [DD] |
| P44 | Çevrimdışı davranış, akış ortasında kapanma | Değinilmemiş tier | [DD] |
| P45 | Vekâleten işlem, yarı zamanlı farkı | Değinilmemiş tier | [DD] |
| P46 | Veri yerleşimi, çalıştırma maliyeti | Değinilmemiş tier | [DD] |
| P47 | Mağazalar arası takas | Talebin kendi dışlaması | [HY] |
| P48 | Kısmi vardiya takası | Talebin kendi dışlaması | [HY] |
| P49 | Otomatik eşleştirme önerisi | Talebin kendi dışlaması | [HY] |
| P50 | Web arayüzü ve back-office | Talebin kendi dışlaması | [HY] |
| P51 | Geriye dönük takas | Talebin kendi dışlaması | [HY] |
| P52 | Müdürün kendi vardiyası | Talebin kendi dışlaması | [HY] |
| P53 | WhatsApp yolunun kapatılması | §2, "ücretsiz rakip" | [HY] |
| P54 | Pilot mağaza kümesi ve geri dönüş | G21 | [D] |
| P55 | İki tarafın takasın durumunu görmesi | Örtük yüzey | [D] |
| P56 | Üstlenilmeden önce teklifi geri çekme | Skor B-5 | [D] |
| P57 | Müdürün bekleyen takas kuyruğu | Örtük yüzey | [D] |
| P58 | Push kotası ve Plan API sınırının ölçülmesi | G08 | [D] |
| P59 | Ölçüt 3'ün tanımı ve bazı | Ç2, G02 | [KŞ] |
| P60 | Ç1: onay ekranı neyi onaylıyor | Ç1 | [KŞ] |
| P61 | Ç3: müdür mesaisi mi, elle düzeltme mi ölçülüyor | Ç3 | [KŞ] |
| P62 | Duyuru tarihi | G12 | [DD] |
| P63 | Kural setinin sahipliği | G20 | [KŞ] |

---

## 1. Omurga

**Bir kişi, bir iş, baştan sona.** İşi bitiren kişi *devreden çalışan*: yayımlanmış haftasında çalışamayacağı bir vardiya var ve elinde o vardiyayı üstlenecek bir arkadaşı var. İş, o vardiyanın artık ona ait olmamasıyla biter — ve **çizelgede öyle görünmesiyle**, çünkü bitmezse müdür Plan'a girer ve bugünkü durumdayız.

**Adımı çıkar, iş bitmesin testi.** Omurgada yedi adım kaldı: vardiyayı seçmek · teklif etmek · kuralların koşması · üstlenme · müdür onayı · Plan'a yazma · iki tarafın sonucu öğrenmesi. Yedisinden herhangi biri düştüğünde vardiya ya sahipsiz kalır ya çizelgede yanlış görünür.

Katman boyunca çizilmiş bir omurga (*"önce arka uç"*) burada özellikle cazip, çünkü tek gerçek bağımlılık arka uçta. Yine de kimsenin işini bitirmiyor ve hiçbir sinyal üretmiyor; bu yüzden yapılmadı.

### Mekanizma kontrolü

`05` §1.6'daki yedi mekanizmayı omurga cümlesine tuttum.

| # | Mekanizma | İş onsuz biter mi | Sonuç |
|---|---|---|---|
| 1 | M1 havuz | **Biter.** Ad verilerek teklif edilebilir | Kesildi, yerine adresli teklif (K-1) |
| 2 | M2 istisnasız müdür onayı | Bitmez; çizelgeyi değiştiren tek yetki müdürde | Kalır |
| 3 | M3 tek yönlü devir | Bitmez; işin tanımı bu | Kalır |
| 4 | M4 ihlalliye hiç teklif etmemek | Kanun kuralı; kalır, şekli K-1 ile değişir | Kalır |
| 5 | M5 Plan yazma ucu | **Bitmez.** Aşağıda ayrıca | Kalır, omurga |
| 6 | M6 gece 22:00–06:00 | Kanun kuralı, eşiği tartışmalı (A12) | Kalır, eşik [DECISION NEEDED] |
| 7 | M7 push bildirimi | Bitmez; teklif edilen kişi başka türlü öğrenmiyor | Kalır |

### Manşet kontrolü

Talebin adı *takas*, riskli yarısı ise **çizelgenin Plan'da kendiliğinden güncellenmesi** (M5). Bloke eden onay (G16), en sert bağımlılık (Murat Şen), en geniş yıkım alanı (bordro, yeniden yayım, elle düzeltme, doluluk raporları) hep onun arkasında. Kontrolü koşturdum ve **kesim çıkmadı**: Plan'a yazılmayan takas, müdürün Plan'a elle girmesini gerektirir; o zaman ölçüt 1 kıpırdamaz, 1.840 uyuşmazlık aynen kalır ve dilim kimsenin işini bitirmez.

Bunu açıkça yazıyorum çünkü buradaki en büyük kesim adayı buydu ve tutmadı. **Bu talebin riskli yarısı taşıyıcıdır.** Dilim küçüldü, ama Murat Şen'in ucu kadar küçüldü.

---

## 2. Kesimler ve dört test

Her kesim dört soruya cevap veriyor: (1) biri hâlâ bütün değer alıyor mu · (2) işe yaradığını anlar mıydınız · (3) ucuza mı geri gelir, göç olarak mı · (4) eksikliğini kim, nasıl fark eder. Ayrıca her kesimin **ne kazandırdığı** yazılı.

**Sinyal testi hakkında, bir kere.** Okuduğum puanlama `04-readiness-score-v1.md`'dir ve o puanlama `00-talep.md`'yi ölçtü, kestiğim belgeyi (`05`) değil. O puanlamada ölçümleme maddeleri N1 = 0, N4 = 1; K7 kategorisi 21 üzerinden 2. Yani **ölçüt 3'e dayanan her kesim testi 2'den kalır** ve kesim yine de yapılır, bunu söyleyerek. Ölçüt 1 ve 2'nin bugünkü değeri ve hedefi var (%61 → %15, 1.840 → 500), o yüzden onlara dayanan kesimler testi geçer — ama ölçüt 1'in bazını G01 sessizce yok edebilir.

### K-1 · Havuz yerine adresli teklif

**Bu bir kesim değil, bir yer değiştirme.** Vardiya, uygun herkesin listesine düşmek yerine, devreden çalışanın aynı mağazadan **ad vererek** seçtiği tek kişiye teklif edilir. Uygunluk kuralları o kişi üzerinde koşar; geçmiyorsa teklif kurulmaz ve devreden çalışan sebebini görür.

- **Neden.** `05` §1.6 M1 için *"Yazılı, gerekçesi yok"* diyor. Bugünkü davranış zaten önce anlaşmak: WhatsApp'ta konuşuluyor, sonra müdüre söyleniyor. Adresli teklif bugünkü işi olduğu gibi sisteme alır.
- **Test 1 — bütün değer.** Devreden çalışan işini bitirir, üstlenen bitirir, müdür kaydı görür. Eksilen tek şey *keşif*: kiminle anlaşacağını sistemden bulmak.
- **Test 2 — sinyal.** Ölçüt 1 ve 2 aynen ölçülür ve ikisi de akışın taşıyıcısı. **Ölçüt 3 bu kesimi ölçemez** (yukarıdaki not).
- **Test 3 — geri geliş.** Havuz sonradan bir ekran ve bir listeleme ucudur; §3'teki kimlik ve saklama kararları bugün verildiği için **göç değil**. Ama A01 (eşzamanlılık) ve bayat liste sorunu onunla birlikte geri gelir.
- **Test 4 — kim fark eder.** Anlaşacak kimse bulamayan çalışan fark eder ve WhatsApp'a döner. Bu yol zaten kapanmıyor.
- **Ne kazandırır.** Bir yüzey (takas listesi), eşzamanlılık (A01), bayat liste (skor B-3'ün yarısı), kural motorunun mağazadaki herkes için koşması ve on binlik liste davranışı. Dört açık madde ve bir ekran.
- **Yer değiştirmenin kendi sorusu — kime ulaşıyor.** Adresli teklif kimseye yeni ulaşmıyor, **daha aza** ulaşıyor: vardiya artık üçüncü kişilerin listesinde görünmüyor. Yeni bir görünürlük açmıyor.
- **Rıza.** `[DECISION NEEDED]` **Bir kesim için sahibin sessizliği yeter, bir yer değiştirme için yetmez.** M1 talepte yazılı; Selin Aydın açıkça evet demeden bu dilim başlamaz. Hayır derse havuz geri gelir, A01 ve A03 onunla döner, dilim büyür.
- `[UNVERIFIED]` `03-prior-art.md` M1'i sorguluyor ama bu koşumda o belge bana verilmedi; adlandırdığı alternatifin bu olup olmadığını doğrulayamadım. Selin'e giderken o belgenin M1 bölümü de gitmeli.
- **Ölçüt 3'le gerilim, açıkça.** Talep *"WhatsApp'a düşmesin"* diyor; adresli teklif eşleşmeyi WhatsApp'ta bırakır, yalnız kaydı ve onayı içeri alır. Talebin kendi problem cümlesi kaydı işaret ediyor (*"hiçbir sistemde kayıtlı olmadan"*), eşleşmeyi değil. Yine de bu gerilim Selin'in önüne bu cümleyle gitmeli.

### K-2 · Dört maddelik red sebebi listesi

Müdür reddeder ve zorunlu serbest metin yazar; `yetkinlik yetersiz` · `mağaza doluluğu` · `disiplin` · `diğer` seçimi bu dilimde yok.

- **Test 1.** Müdür reddedebilir, çalışan sebebi okur. Bütün değer duruyor.
- **Test 2.** Ölçüt 1 ve 2 red sebebine bakmıyor. Geçer.
- **Test 3.** Enum sonradan bir alan ve bir ekran. Ucuz — ama pilot dönemindeki red sebepleri **geri getirilemez**, çünkü kodlanmadan yazılmış olurlar.
- **Test 4.** Selin fark eder: müdürlerin neden reddettiğini sayamaz. Serbest metin okunabilir, sayılamaz.
- **Ne kazandırır.** Ç1'i beklemeden başlamayı. Ç1 karara bağlanmadan enum'u yapmak, iki ölü seçeneği koda yazmak demek.
- **Ayrıca:** `disiplin` bugün sözlü olan bir değerlendirmeyi delile çeviriyor ve saklama kararı yok (G05). Bu dilimde toplanmıyor olması, o kararın verilmesini beklemiyor değil — §3 KŞ-8'e bakın.

### K-3 · Otomatik onay (A10)

Kurallardan geçen takasın müdürsüz geçmesi bu dilimde yok.

- **Test 1.** Müdür onayı akışın içinde; kimse yarım kalmıyor.
- **Test 2.** Ölçüt 1 üzerinden ölçülür.
- **Test 3.** Sonradan bir dal; göç değil.
- **Test 4.** Kimse fark etmez, çünkü bugün de böyle.
- **Ne kazandırır.** Hiçbir yapım tasarrufu. **Kazandırdığı şey Ç3'ün açık kalması:** müdür mesaisini gerçekten düşüren tasarım budur ve karar verilmeden koda girmemeli.

### K-4 · Karşılıklı, iki bacaklı takas (A20)

- **Test 1.** Tek yönlü devir tek başına bir iş bitiriyor.
- **Test 2.** Ölçüt 1 ölçer.
- **Test 3.** İki bacaklı takas, iki vardiyanın atomik yazılmasını gerektirir; Plan yazma ucunun koşullu yazma sunup sunmadığı bilinmiyor (A02). **Ucuz geri gelmez; yazma ucuna bağlıdır.**
- **Test 4.** Karşılığında vardiya isteyen çalışan fark eder ve WhatsApp'a döner.
- **Ne kazandırır.** Sonradan gelen bir yapımı değil, bir soruyu öne alır: hacmi bilinmiyor. `02-idea-grill.md`'nin önerdiği Q4 sorgusu bunu bir günde ölçer (A20 + A21).

### K-5 · 480 mağaza yerine pilot küme

- **Test 1.** Pilot mağazadaki çalışan işini baştan sona bitirir. Diğer mağazalarda bugünkü yol aynen sürüyor.
- **Test 2.** Ölçüt 1 ve 2 mağaza kırılımında ölçülebilir; pilot kümesi kontrol grubunu da verir. Bu, kesimin **ölçümü iyileştirdiği** tek yer.
- **Test 3.** Yayılma teknik olarak ucuz, örgütsel olarak değil: G07 (480 runbook), G12 (duyuru) o zaman ödenir.
- **Test 4.** Pilot dışındaki müdür fark etmez; ona hiçbir şey değişmemiştir.
- **Ne kazandırır.** İlk cuma tepe yükünü ölçülebilir hale getirir ve `[ASSUMED]` push hacmi varsayımını (en yanlış olma ihtimali yüksek 1. madde) 480 mağaza yerine bir avuç mağazada yanlışlar.
- **Not.** Bu bir yüzey ya da özellik kesimi değil, **kitle kesimi.** Bunu bir dilim sayıp saymayacağı `slice`'ta yazmıyor; kapsam beyanı olarak yazdım, onayı Selin + Ürün ekibi.

### K-6 · Canlıya çıkış işleri (G06, G07, G12, G13)

İK vaka tipi, 480 müdürün runbook'u, duyuru takvimi ve raporlara takas kırılımı bu dilimde yok.

- **Test 1–2.** Pilottaki hiçbir kullanıcı bunlara dokunmuyor; ölçütler pilot kümesinde ölçülüyor.
- **Test 3.** Hiçbiri göç değil; hepsi genel çıkışın önkoşulu.
- **Test 4.** Pilot mağazanın müdürü fark eder — onun için tek sayfalık yönerge dilimin içinde.
- **Dikkat.** Bu maddeler açık listeden **düşmüyor**, tier değiştiriyor: dilimi engellemiyorlar, genel çıkışı engelliyorlar.

### K-7 · Kimsenin istemediği şeyler (P42–P46)

Erişilebilirlik seviyesi, tablet düzeni, çevrimdışı davranış, vekâleten işlem, veri yerleşimi.

**Bunlar benim kesimim değil; talep bunları hiç istemedi.** Buraya yazılmalarının tek sebebi, kimsenin kararını vermediği bir şeyin dilime sessizce girmemesi. Kesim gibi görünen bu satırlar, aslında "karar verilmedi" etiketidir ve onaylayacak kişi Ürün ekibidir.

---

## 3. Kesilemeyenler — kararı şimdi, yapımı sonra

Aşağıdakiler özellik gibi görünüp karar olan şeyler. **Yapımı ertelenebilir, kararı ertelenemez:** ertelenirse kodu yazan verir, ve model yazıyorsa anında ve sessizce verir.

İkiye ayrılıyorlar. **Verilebilenler** burada verilmiş: tek satırdan okuyup uygulayabilecek biri için yeterli olmalı. **Verilemeyenler** `[DECISION NEEDED]` taşıyor ve sahibi yazılı — bunlar kesim değil, dilimin önündeki blok. Otonom koşumda hukuk ve İK kararı uydurulmadı.

### Verilenler

**KŞ-1 · Kimlik.** Bir vardiya, Plan'daki vardiya kimliğiyle tekildir. Aynı vardiya için aynı anda yalnız **bir** açık takas talebi bulunabilir; ikincisi kurulmaz. Birleştirme aracı bu dilimin dışında.

**KŞ-2 · Saklanan mı, hesaplanan mı.** Takas kaydı, onay anında geçerli olan değerleri **yazar**: vardiyanın başlangıç–bitiş saati, mağaza ve rol, iki tarafın o haftaki toplam saati, hesaplanan dinlenme aralığı ve kural setinin sürümü. Hiçbiri sonradan Plan'dan yeniden hesaplanmaz. Bunları gösteren ekran dilimin dışında.

**KŞ-3 · Söz verilen kural.** Bir takasın *"kurallardan geçti"* damgası, **o anda yürürlükte olan eşiklerle** birlikte saklanır (gece penceresi, haftalık tavan, dinlenme süresi). Eşikler değiştiğinde geçmiş takaslar yeniden yorumlanmaz. On sekiz ay sonra "bu devir o gün kurala uygun muydu" sorusunun cevabı buradan çıkar.

**KŞ-4 · Yetki nerede duruyor.** Uygunluk kontrolü **sunucuda** yapılır ve **iki anda** koşar: üstlenme anında ve müdür onayı anında. Listeleme ya da teklif kurulmaması bir yetki mekanizması değildir (skor B-3). Bu, A14'ün cevabıdır ve dilimin şeklidir, uygulama detayı değil.

**KŞ-5 · Onaylayan kim.** Onayı, takasın geçtiği mağazanın müdürü verir. Müdürün yokluğu hâli KŞ-12'de.

**KŞ-6 · Denetim izi.** Her takas talebinin açılması, teklifi, üstlenilmesi, onayı ya da reddi; kim, ne zaman, hangi kural sürümüyle — gün birinden kayıt altındadır. Bunu okuyan rapor ya da ekran dilimin dışında.

**KŞ-7 · Ölçümün ham maddesi.** Akış şu olayları üretir: `takas_açıldı` · `teklif_edildi` · `üstlenildi` · `onaya_düştü` · `onaylandı` · `reddedildi` · `düştü`. Her biri takas kimliği ve zaman damgası taşır. Bunlar gün birinde atılmazsa pilot **geriye dönük ölçülemez**; ölçüt 3'ün paydası ürünün kendisi (G02).

**KŞ-8 · Geri alma kesinliği.** Onaylanmış takas uygulamadan iptal edilemez; geri alma yalnız müdürün Plan'daki elle düzeltmesiyle olur. Bu A06'nın cevabıdır ve dilimde bir yapım gerektirmez.

**KŞ-9 · Doğum tarihi boşsa.** Doğum tarihi okunamıyor ya da boşsa çalışan gece vardiyası üstlenemez. Kapı kapalı tarafa düşer. Verinin kaynağı hâlâ açık (A17).

**KŞ-10 · Eski sürüm.** Pilot yalnız takas ekranını taşıyan sürümde açılır; taşımayan sürümdeki çalışana teklif kurulmaz ve bildirim gönderilmez. Genel çıkışın minimum sürüm ve zorunlu güncelleme kararı hâlâ açık (A24).

**KŞ-11 · Kural setinin sahibi.** Kural seti ve eşikleri İK'nın yazılı sahipliğindedir; değiştirmek bir ürün kararı değil, İK kararıdır (G20).

### `[DECISION NEEDED]` — verilemeyenler

| # | Karar | Sahip | Madde |
|---|---|---|---|
| KŞ-12 | Müdür izinliyse ya da mağazada yoksa onayı kim verir | Selin Aydın | A23 |
| KŞ-13 | Müdür 48 saat cevap vermezse takas ne olur | Selin Aydın | A04 |
| KŞ-14 | Vardiya onay beklerken başlarsa ne olur | Selin Aydın | A09 |
| KŞ-15 | Yeniden yayım açık ve onaylanmış takası ne yapar | Murat Şen + Selin Aydın | A05 |
| KŞ-16 | Müdürün elle düzeltmesi açık takasla çarpışırsa | Ürün ekibi + Murat Şen | A08 |
| KŞ-17 | Bordro kesiminden sonra onaylanan takas | Bordro ekibi | A07 |
| KŞ-18 | Yazma ucu koşullu yazma sunuyor mu, çakışmada ne döner | Murat Şen | A02 |
| KŞ-19 | Kural listesi tam mı: hafta tatili, gece 7,5 saat, 20:00 eşiği | İK / hukuk | A11, A12, A13 |
| KŞ-20 | Kural motoru yanılırsa sorumluluk kimde | İK / hukuk | A26 |
| KŞ-21 | İzin ve rapor kayıtları uygunlukta kullanılacak mı | Murat Şen | A18 |
| KŞ-22 | Rol yetkinliği verisi dolu ve güncel mi | Murat Şen | A16 |
| KŞ-23 | Red kaydı ve serbest metin ne kadar saklanır, kim görür | İK / hukuk | G05 |
| KŞ-24 | Plan logunda yeni yazma kime atfedilecek | Selin + Murat Şen | G01 |
| KŞ-25 | Ölçüt 3'ün tanımı ve bazı ne olacak | Selin Aydın | Ç2, G02 |
| KŞ-26 | Hukuk ve sendika ne zaman bilgilendirilecek | Selin Aydın | G10 |
| KŞ-27 | 45 saat hesabı bordronunkiyle aynı sonucu veriyor mu | Bordro ekibi | G14 |
| KŞ-28 | Red sebebi listesi ne olacak (Ç1) | Selin Aydın | Ç1 |
| KŞ-29 | Ölçüt hangi işi ölçüyor: müdür mesaisi mi, elle düzeltme mi (Ç3) | Selin Aydın | Ç3 |

KŞ-12'den KŞ-20'ye kadarki dokuzu **dilim başlamadan** cevaplanmalı; kalanı pilot çıkmadan.

---

## 4. Kesmesi yapımından pahalı olanlar

Dilimleme, yapımın pahalı yarı olduğunu varsayar. Burada iki yerde tutmuyor.

**F-1 · Hata ekranları ve metinleri (A22) kesilmedi.** Boş, yükleniyor ve hata durumlarını üretmek bugün bir öğleden sonra; altı ay sonra aynı işi yapmak, akışın bağlamını yeniden kurmayı ve ikinci bir tasarım geçişini gerektirir. Üstelik dilimin en olası hatası Plan yazmasının düşmesi ve o an kullanıcının ne gördüğü **skorun blocker'ı** (B-1, B-2). Kesilmesi yapımından pahalı.

**F-2 · Havuzun geri gelişi (K-1) ucuz, ama koşullu.** KŞ-1 ve KŞ-2 bugün verildiği için havuz sonradan bir ekran olarak eklenebilir. O kararlar verilmezse aynı ekleme bir göç olur: takas kayıtları havuzun ihtiyaç duyduğu alanları taşımaz. Kesimin ucuzluğu §3'e bağlıdır, kendi başına ucuz değildir.

**F-3 · Pilottan yayılma (K-5) teknik değil, örgütsel bir borç.** 480 mağazaya çıkmak G07 ve G12'yi aynı anda ödemeyi gerektirir ve o iş yazılım ekibinde değil.

---

## 5. Dilim

**Bu liste kapsamın kaydıdır.** Aşağı akıştaki hiçbir belge burayı öneri olarak okumaz. Bir ekranın ihtiyaç duyduğu bir alan, bir sözleşmenin döndürdüğü bir değer, bir modelin istediği bir bağ — her biri tek başına makul, hiçbiri bu kesimi onaylayan kişi tarafından onaylanmış değil. Bu listeye ekleme yapan belge, eklediğini **açıkça beyan eder**. İlk okuyan `design-brief`'tir.

| # | Dilimde olan | Not |
|---|---|---|
| D-1 | Çalışan yayımlanmış haftasından bir vardiya seçer, devretmek üzere açar | 140 karakter not isteğe bağlı |
| D-2 | Aynı mağazadan ad vererek tek kişiye teklif eder | K-1, Selin'in onayına bağlı |
| D-3 | Altı uygunluk kuralı sunucuda koşar | Üstlenme ve onay anında (KŞ-4) |
| D-4 | Kural geçmezse teklif kurulmaz, sebebi devreden çalışana gösterilir | M4'ün adresli teklifteki şekli |
| D-5 | Teklif edilen çalışan üstlenir ya da geri çevirir | |
| D-6 | Devreden çalışan, üstlenilmeden önce teklifi geri çekebilir | Skor B-5 |
| D-7 | Müdürün bekleyen takas kuyruğu | İki ad, vardiya, not |
| D-8 | Müdür onaylar ya da reddeder; redde zorunlu serbest metin | Sebep listesi yok (K-2) |
| D-9 | Onaylanınca çizelge Plan'da güncellenir | Omurga, M5 |
| D-10 | Plan yazması düşerse takas onaylanmış sayılmaz | Kullanıcı metniyle birlikte (D-13) |
| D-11 | Bildirim: teklif geldi · onaya düştü · sonuçlandı | Mevcut push altyapısı `[ASSUMED]` |
| D-12 | İki taraf takasın durumunu uygulamada görür | |
| D-13 | Boş, yükleniyor ve hata durumları, ekran metinleriyle | F-1 |
| D-14 | 11 saat kuralı için komşu haftanın vardiyaları çekilir | A15 çözülmeden kural sessizce yanlış hesaplar |
| D-15 | KŞ-7'deki yedi olay | Gün birinde |
| D-16 | KŞ-2 ve KŞ-3'teki alanların yazılması | |
| D-17 | KŞ-6 denetim izi | |
| D-18 | Sınırlı pilot mağaza kümesi | K-5 |
| D-19 | Pilot müdürleri için tek sayfalık yönerge | |
| D-20 | Pilotta push hacmi ve Plan API cevapları ölçülür | G08'in cevabı buradan çıkar |
| D-21 | Geri dönüş: pilot kapatılır, WhatsApp yolu zaten açık | G21'in dilim tarafı |

---

## 6. Dilim dışı

Her satır alıntılanacak bir cümledir. **Hepsini bu belge önerdi; hiçbiri onaylanmadı.** Onaylanmamış olmak normal durumdur ve yazılması bedavadır; yazılmaması, kimsenin kabul etmediği bir kesimin dört belge sonra yerleşmiş kapsam olarak görünmesidir.

**DD-1.** *"Bu dilimde takas havuzu ve uygun çalışanların gördüğü liste yoktur; vardiya, aynı mağazadan adı verilen tek bir çalışana teklif edilir."*
Onaylayacak: Selin Aydın · Onaylandı mı: **hayır** · Geri getiren: Selin'in havuzu koruma kararı; A01 ve A03 onunla döner.

**DD-2.** *"Bu dilimde red sebebi listesi yoktur; müdür reddederken zorunlu serbest metin yazar."*
Onaylayacak: Selin Aydın · Onaylandı mı: **hayır** · Geri getiren: Ç1'in karara bağlanması (KŞ-28) ve KŞ-23.

**DD-3.** *"Kurallardan geçen takasa otomatik onay bu dilimde yoktur; her takas müdür onayından geçer."*
Onaylayacak: Selin Aydın · Onaylandı mı: **hayır** · Geri getiren: Ç3'ün karara bağlanması (KŞ-29).

**DD-4.** *"Karşılıklı, iki bacaklı takas bu dilimde yoktur; yalnız tek yönlü devir vardır."*
Onaylayacak: Selin Aydın · Onaylandı mı: **hayır** · Geri getiren: Q4 sorgusu iki bacaklı takasın hacmini anlamlı gösterirse (A20, A21) ve A02 cevaplanırsa.

**DD-5.** *"Onaylanmış takasın uygulama içinden iptali bu dilimde yapılmaz."*
Onaylayacak: Selin Aydın · Onaylandı mı: **hayır** · Geri getiren: KŞ-8'in değişmesi.

**DD-6.** *"Bu dilim 480 mağazanın tamamına çıkmaz; sınırlı bir pilot mağaza kümesinde çalışır."*
Onaylayacak: Selin Aydın + Ürün ekibi · Onaylandı mı: **hayır** · Geri getiren: pilotun ölçüt 1 ve 2'de sonuç göstermesi.

**DD-7.** *"480 müdürün runbook'u, eğitimi, İK vaka tipi ve duyuru planı bu dilimin dışındadır; pilot için tek sayfalık yönerge yeterlidir."*
Onaylayacak: Selin Aydın · Onaylandı mı: **hayır** · Geri getiren: genel çıkış kararı. G06, G07, G12 listeden düşmez, genel çıkış tier'ına geçer.

**DD-8.** *"Doluluk ve işgücü maliyeti raporlarına takas kırılımı bu dilimde eklenmez."*
Onaylayacak: sahibi yazılı değil (G13) · Onaylandı mı: **hayır** · Geri getiren: raporun kişi bazlı olduğunun doğrulanması.

**DD-9.** *"Bir çalışanın aynı anda kaç takas yürütebileceği ve bir teklifin ne kadar açık kalacağı bu dilimde sınırlanmaz; yalnız bir vardiya için tek açık takas kuralı geçerlidir."*
Onaylayacak: Selin Aydın · Onaylandı mı: **hayır** · Geri getiren: A25'in kalanının karara bağlanması.

**DD-10.** *"Erişilebilirlik seviyesi, tablet ve büyük ekran düzeni, çevrimdışı çalışma, vekâleten işlem ve yarı zamanlı çalışan farkı bu dilimin kapsamında değildir."*
Onaylayacak: Ürün ekibi · Onaylandı mı: **hayır** · **Bunlar kesim değildir: kimse istemedi.** Yazılmalarının sebebi, karar verilmeden içeri girmemeleri.

**DD-11.** *"Uçtan uca izleme kimliği, üretimde alarm eşiği ve çalıştırma maliyeti hesabı bu dilimde ele alınmaz; pilotun gözlemi elle yapılır."*
Onaylayacak: Ürün ekibi · Onaylandı mı: **hayır** · Geri getiren: genel çıkış.

---

## 7. Hiç yapılmayacak

Bunlar bu dilimin kesimi değil; talebin kendi kararları, sahibi yazılı ve onaylı. Bir daha teklif edilmemeleri için bir kere yazılıyorlar.

| # | Yapılmayacak | Alıntı | Sahip |
|---|---|---|---|
| HY-1 | Mağazalar arası takas | *"Mağazalar arası takas yok."* | Selin Aydın |
| HY-2 | Kısmi vardiya takası | *"Vardiya bölünmez, tamamı devredilir."* | Selin Aydın |
| HY-3 | Otomatik eşleştirme önerisi | *"Şu kişiyle takas et önerisi kurmuyoruz."* | Selin Aydın |
| HY-4 | Web arayüzü ve back-office | *"Hem çalışan hem müdür yalnızca mobil uygulamada."* | Selin Aydın |
| HY-5 | Geriye dönük takas | *"Başlamış ya da geçmiş bir vardiya takasa açılamaz."* | Selin Aydın |
| HY-6 | Müdürün kendi vardiyası | *"Müdürler bu akışın dışında."* | Selin Aydın |
| HY-7 | WhatsApp yolunun kapatılması | `05` §2: yol kapanmıyor, ücretsiz rakip olarak duruyor | Selin Aydın |

---

## 8. Hangi açık madde kapanıyor, listeyi kim yeniden yazar

**Bu belge `05-request-shaper.md`'yi değiştirmiyor.** Açık madde listesi hâlâ kestiğim parçaların maddelerini taşıyor, ve dört belge sonraki okuyucu 26 engelleyen madde sayacak. Listeyi yeniden yazacak olan **`request-shaper`'ın ikinci geçişi**; dışlama cümleleri oraya taşınmadan hiçbir madde kapanmaz.

**Onaya bağlı olarak düşen yedi madde:** A01 (havuzla birlikte) · A03 (K-1'in konusu) · A06 (KŞ-8) · A10 (DD-3) · A14 (KŞ-4) · A20 (DD-4) · A24 (KŞ-10, pilot için).
**Kısmen cevaplananlar, listede kalır:** A17 (boş davranış verildi, kaynak açık) · A25 (tek açık takas verildi, kalanı DD-9).
**Tier değiştirenler, düşmeyenler:** G06, G07, G12, G13 — dilimi değil, genel çıkışı engelliyorlar.

Kalan: **19 başlamayı engelleyen madde**, artı Ç1, Ç2, Ç3. Bunların dokuzu (KŞ-12…KŞ-20) dilimin ilk satırından önce cevaplanmalı.

---

## 9. Q2 sorusunun cevabı

Bu dilim tarihe göre kesilmedi. İşe göre kesildi, ve şimdi işin ne gerektirdiği yazılı:

1. Selin Aydın'ın K-1'e evet ya da hayır demesi. Hayır, dilimi büyütür ama durdurmaz.
2. KŞ-12'den KŞ-20'ye dokuz kararın verilmesi. Bunların altısı tek bir onay masasında kapanabilir; `05` §Sonraki adım aynısını söylüyor.
3. **Murat Şen'in yazma ucu.** A02 cevaplanmadan ve Q2 taahhüdü alınmadan bu dilimin omurgası yoktur (G16). Manşet kontrolü bunu kesmeyi denedi ve kesemedi.

Üçüncüsü kesilerek küçülmez. Dilim yapımı küçültür; **bu talebin darboğazı yapım değil, karar ve bir başka ekibin takvimi.** Q2 sonuna yetişip yetişmeyeceği, aşağıdaki hiçbir satırın değil, o üç maddenin cevabıdır — ve bu, dilimlemenin verebileceği en dürüst cevaptır.
