# Vardiya Takası — Sistem İhtiyaçları (ilk dilim)

## Taşıyıcı

**Bu belge HTTP hakkında değildir.** Bir ihtiyacı bir uç nokta da karşılayabilir, bir önbellek de, bir push da, cihazdaki bir kayıt da. Burada ihtiyaç yazılı; nasıl karşılanacağına sistemi sahiplenen karar verir.

**Kapsam `06-slice.md` §5'tir.** Havuz, red sebebi listesi, otomatik onay, iki bacaklı takas, uygulama içi iptal yok.

**Sayım.** **32 ihtiyaç** (N1–N32) · **11 varsayılan yetenek** (AC1–AC11) · **8 karşı-ihtiyaç** (KI-1–KI-8) · adımı olmayan **4** ihtiyaç · dilimin dışına çıkan **3** ihtiyaç, beyanlarıyla.

**Yapılabilirlik, tek satırda.** 19 ihtiyaç bugün var olan bir sisteme iniyor ve sütunu hak ediyor: **1 `Supported` · 8 `Unconfirmed` · 8 `Unconfirmed — no owner` · 2 `Gap`.** Kalan 13 ihtiyaç bu dilimde sıfırdan kurulacak takas servisine iniyor; orada sütun bilgi taşımıyor, düşürüldü ve yerine §7'nin sorusu cevaplandı: hangisi sıradan, hangisi bu ürünün asıl yapıldığı şey.

**Nerede ne var.**

| # | Bölüm | Ne var | Kim alır |
|---|---|---|---|
| 1 | §0 | Ne verildi, ne verilmedi, neye mal oldu | `build-context` |
| 2 | §1 | 13 okuma ihtiyacı, blok blok | Backend'i yazan, `build-context` |
| 3 | §2 | 9 yazma ihtiyacı; **N16 ve N17 en pahalı ikisi** | Murat Şen, backend'i yazan |
| 4 | §3 | 6 olay ihtiyacı, **ne taşıyacaklarıyla** | Ölçümlemeyi kuran, Selin Aydın |
| 5 | §4 | **Adımı olmayan dört ihtiyaç** — kimse aramazsa kaybolurlar | Ürün ekibi |
| 6 | §5 | Karşı-ihtiyaçlar: istemcinin yapmak zorunda olmadıkları | Backend'i yazan, `design-brief` |
| 7 | §6 | **Varsayılan yetenekler** — tasarımın var saydığı, kimsenin doğrulamadığı | Murat Şen, Selin Aydın |
| 8 | §7 | Yapılabilirlik sayımı ve beş düzlem | `build-context`, Selin Aydın |
| 9 | §8 | `[DRAFT]` taslak sözleşme, **yalnız şekil katmanı** | Murat Şen ve backend ekibi |

**Kestirme.** Backend ekibi §8'den başlayıp §1–§3'e dönebilir. Selin Aydın'ın alacağı iki bölüm §3 ve §6'dır; ikisi de karar istiyor, iş değil.

**Ne okudum.** `08-flow-map.md`'nin taşıyıcısı, §1 sınırlar, §2 mutlu yol, §3 dallar, §4 hata yolları, §5 ayırt edilmesi zorunlu hatalar, §6 olay yükleri, §7 işaret sayımı, §8 bitişler, §9 varsayımlar · `10-data-model.md`'nin taşıyıcısı, §0, §1 kimlik tablosu ve ilk iki varlık, §2 kural taşıyan bağlar, §3 saklanan mı hesaplanan mı, §4 dört süpürme, §5 dilim dışına çıkan alanlar, §7 kararlar · `06-slice.md`'nin taşıyıcısı, §0'ın başı, §3 kesilemeyenler, §5 dilim, §6 dilim dışı, §7 hiç yapılmayacak. Başka belge açılmadı; §0 hangisinin açılmadığını ve neye mal olduğunu yazıyor.

**Sabit sözlük.** `05`, `06`, `08` ve `10`'un sözlüğü aynen sürüyor: *takas talebi*, *üstlenme*, *uygunluk kuralı*, *devir*, *sahip*, *dilim*, *adresli teklif*, *dokunma noktası*, *bitiş*, *varlık*, *kimlik kuralı*, *dışarıdan gelen*, *ek*. Bu belgenin eklediği üç kelime:

- **ihtiyaç** = bir dokunma noktasının çalışması için sistemin sağlamak zorunda olduğu veri ya da işlem
- **karşı-ihtiyaç** = istemcinin yapmak zorunda **bırakılmaması** gereken iş
- **varsayılan yetenek** = akışın tükettiği, hiçbir adımın üretmediği ve hiçbir belgenin doğruladığı yazmadığı kabiliyet

`reads` · `acts` · `emits` · `[ASSUMED]` · `[UNVERIFIED]` · `[DECISION NEEDED]` · `[DRAFT]` · `Supported` · `Unconfirmed` · `Gap` işaretleri İngilizce kalır; zincirin sonraki halkası bunları eşleştiriyor.

**Numaralandırma.** Bu belgenin kendi kimlikleri: **N1–N32** ihtiyaçlar · **AC1–AC11** varsayılan yetenekler · **KI-1–KI-8** karşı-ihtiyaçlar. `08`'in `B`, `E`, `V`, `AK`'sı ve `10`'un `U`, `B-`, `EK`, `VK`'sı ile `06`'nın `D`, `K`, `KŞ`, `DD`, `HY`'si aynen alıntılanıyor; bu belge o harflerden hiçbirini kendi maddelerine vermedi.

**Bir uyarı, en başta.** Bu listenin en pahalı satırı N16 değil, N16'nın altındaki boşluktur: **Plan'ın yazma ucu var, bu uygulama tarafından hiç çağrılmamış, ve koşullu ya da tekrarlanabilir yazma sunup sunmadığı yazılı değil** (KŞ-18 / AK-8, Murat Şen). Bu tek soru dört şeyi birden kilitliyor: adım 17'nin tekrar denenip denemeyeceği (E1), sonucun bilinmediği hâlin çıkışı (E2), müdürün çift onayı (E10) ve N17'nin sıralaması. Cevap gelmeden yazılan her uygulama bir tercih yapmış olur ve o tercihi yapan, kodu yazan kişidir.

**İkinci uyarı.** Bu belge bir ad üzerine yazıldı ve o ad kararlaştırılmadı. `10` VK-1 çekirdek kaydın *takas talebi* mi *teklif* mi olduğunu Selin Aydın'a bırakıyor. §8'in taslağı ikisini tek kayıt sayan hâli çiziyor; cevap "ayrı" gelirse taslağın üç satırı ikiye bölünür. Uydurmadım, işaretledim.

---

## 0. Ne verildi, ne verilmedi

**Verilen:** `08-flow-map.md`, `10-data-model.md`, `06-slice.md`. **Erişim:** hiçbir sisteme erişim yok, soracak kimse yok.

**Bunun tek bir sonucu var ve bütün belgeyi belirliyor.** `Supported` demek "bugün nerede çalıştığını gösterebiliyorum" demektir. Sistemi göremeyen biri bunu bir belgeye dayanarak söyleyemez: bir belgenin bir şeyin var olduğunu yazması, o şeyin akışın istediği biçimde çalıştığını göstermez. Bu yüzden aşağıda **tek bir `Supported`** var (N1) ve onun bile kaynağı belge değil, koşumun kendi brifingidir: *Plan'ın okuma uçları bugün kullanımda.* Geri kalan her şey `Unconfirmed`'dır ve bu bir yumuşak evet değildir.

**Nouns adlandırılmış.** `10-data-model.md` koştu; sözleşme adı konmuş şeyler üzerine yazıldı. Bedeli yine de sıfır değil: VK-1 çekirdek kaydın adını açık bırakıyor (yukarıdaki ikinci uyarı) ve VK-2 Vardiya kimliğinin yeniden yayımda korunup korunmadığını. İkincisi N1'in ve KŞ-1'in altındaki zemindir.

**Verilmeyen: `09-flow-grill.md`.** Klasörde duruyor, `08`'den sonra yazılmış, ve bu koşumda bana verilmedi. `08` kendi §9'unda denetlenmeyi bekleyen yerleri işaret ediyor (*"`flow-grill` bu belgeyi §5 ve §8'den tutarak kırabilir"*), yani akış denetlendi ve bu belge denetimin sonucunu görmeden akıştan türetiliyor.

**Bunun maliyeti, açıkça.** Bir grill bulgularını adıyla skillere yazar ve `api-needs` onlardan biridir. Görülmeyen bulgunun iki tür etkisi olurdu: bir dokunma noktasının yanlış işaretlendiğini söyleyen bulgu (o ihtiyaç yanlış yerde duruyor) ve bir bitişin ya da dalın eksik olduğunu söyleyen bulgu (o ihtiyaç hiç yok). **Aşağıdaki hiçbir satır grill bulgusu taşımıyor, çünkü hiçbiri okunmadı.** Kaynağı tartışmalı diye satır düşürülmedi; `08`'in kendi beyan ettiği açıklar (V-1…V-6, AK-1…AK-9) satırların içinde taşınıyor. Grill'i okuyan kişi bu belgeyi §7'nin düzlem tablosundan tutarak kontrol etmelidir.

**`08`'in kendi en sert bulgusu buraya taşınıyor.** Üstlenildikten sonra, müdür onaylamadan önce hiçbir tarafın çıkışı yok (E12, E13; D-6 geri çekmeyi yalnız üstlenmeden önce veriyor, DD-9 teklife süre koymuyor). Bu belgede karşılığı bir eksik ihtiyaçtır: **o pencerede bir şeyi kapatan hiçbir yazma yok**, ve bu yüzden aşağıda öyle bir N yok. Kapanırsa yeni bir yazma ihtiyacı doğar; sahibi Selin Aydın (KŞ-13, KŞ-12).

---

## 1. Okuma ihtiyaçları

Onüç ihtiyaç, `08` §7'nin on `reads` işaretinden. Bir işaret birden çok ihtiyaç doğurabiliyor: adım 6, 11 ve 16 tek bir "kural koş" işareti taşıyor ama koşmak için altı ayrı yerden veri istiyor, ve o altı yerin yapılabilirliği aynı değil.

> **N1 · Adımlar 1, 21, E3, E18 — çalışanın yayımlanmış haftasının çizelgesi.**
> **Ne zaman:** ekran açılışında, kişi bir şey yapmadan önce.
> **Tazelik:** son yayımı göstermeli. Bir gün eski çizelge yanlış vardiyayı takasa açtırır ve hata adım 6'da değil, kişinin kafasında oluşur.
> **Şununla atomik:** hiçbir şeyle.
> **Tekrarlanabilir mi:** evet.
> **Yapılabilirlik:** **`Supported`** — mevcut haftalık çizelge ekranı bugün Plan'dan okuyor (kaynak: bu koşumun brifingi, *Plan'ın okuma uçları bugün kullanımda*; belge değil). **Açık:** hangi yayımın okunduğunu söyleyen bir alan yok (`10` U-2) ve AC11'e dayanıyor.

> **N2 · Adım 3 — aynı mağazadan, ad verilerek seçilebilecek çalışanların listesi.**
> **Ne zaman:** kişi vardiyayı takasa açtıktan sonra, seçim ekranında.
> **Tazelik:** güncel mağaza üyeliği olmalı. Dün ayrılmış ya da taşınmış bir çalışanın listede durması, adım 6'da düşen bir teklif ve kişinin anlamadığı bir hatadır (`10` R-6).
> **Şununla atomik:** hiçbir şeyle.
> **Tekrarlanabilir mi:** evet.
> **Yapılabilirlik:** **`Unconfirmed`** — Murat Şen. Neyi çözer: Plan bir mağazanın güncel çalışan listesini, kişiyi kendisi hariç tutacak biçimde (`10` R-3) verebiliyor mu.

> **N3 · Adımlar 6, 11, 16 — altı uygunluk kuralının sunucuda koşması ve düşen kuralın adının dönmesi.**
> **Ne zaman:** üçünde de eylem anında; adım 6 teklif gönderilirken, 11 üstlenilirken, 16 onaylanırken.
> **Tazelik:** kararın verildiği andaki veriyle. Adım 6'nın sonucu adım 11'de yeniden kullanılamaz — `08` bunu özellikle yazıyor, arada çizelge değişir.
> **Şununla atomik:** 11 üstlenmenin yazılmasıyla (N15), 16 onayla (N16, N17). Adım 6 hiçbir şeyle: teklif kurulmuyorsa yazma da yok.
> **Tekrarlanabilir mi:** evet; kural koşumu bir kapıdır, bir yan etki değil (`10` §3 satır 12: sonuç saklanmıyor).
> **Yapılabilirlik:** sütun yok, düzlem 5. **Bu üçlü bu ürünün asıl yapıldığı şeydir** (KŞ-4: yetki sunucuda ve iki anda).

> **N4 · Adımlar 6, 11, 16 (E4) — teklif edilen çalışanın rol yetkinliği.**
> **Ne zaman:** kural koşumu içinde, eylem anında.
> **Tazelik:** güncel. Eski yetkinlik, yetkin olmayan birine vardiya devrettirir.
> **Şununla atomik:** hiçbir şeyle.
> **Tekrarlanabilir mi:** evet.
> **Yapılabilirlik:** **`Unconfirmed`** — Murat Şen (KŞ-22). Neyi çözer: bu veri dolu ve güncel mi. **Dolu değilse ihtiyaç karşılanmıyor demektir, kural sessizce "yetkinlik yetersiz" der** (E4) ve sebep yanlıştır.

> **N5 · Adımlar 6, 11, 16 (E5) — teklif edilen çalışanın doğum tarihi, yalnız gece vardiyası kapısı için.**
> **Ne zaman:** kural koşumu içinde, eylem anında.
> **Tazelik:** değişmeyen bir veri; tazelik sorunu yok, **varlık** sorunu var.
> **Şununla atomik:** hiçbir şeyle.
> **Tekrarlanabilir mi:** evet.
> **Yapılabilirlik:** **`Unconfirmed`** — Murat Şen (A17: verinin kaynağı açık). Boşsa kapı kapalı tarafa düşer (KŞ-9), yani ihtiyacın karşılanmaması bir hata değil bir karar olarak yazılı. **Ayrı bir soru İK / hukuka ait:** doğum tarihini bir uygunluk kapısında okumak bu amaçla meşru mu; hiçbir belge bunu sormamış.

> **N6 · Adımlar 6, 11, 16 (E6, D-14) — komşu haftanın vardiyaları, 11 saatlik dinlenme kuralı için.**
> **Ne zaman:** kural koşumu içinde, eylem anında; iki taraf için de.
> **Tazelik:** eylem anındaki hâliyle. Eski komşu hafta, kuralı yanlış hesaplar.
> **Şununla atomik:** hiçbir şeyle.
> **Tekrarlanabilir mi:** evet.
> **Yapılabilirlik:** **`Unconfirmed`** — Murat Şen (A15). Neyi çözer: Plan bir çalışanın **hafta sınırının ötesindeki** vardiyalarını verebiliyor mu, ve veremediğinde bunu bir hata olarak söylüyor mu. **İkincisi birincisinden önemli:** `08` E6 çekilemeyen komşu haftanın alternatifinin bir hata yolu değil *sessiz yanlış hesap* olduğunu yazıyor.

> **N7 · Adımlar 6, 11, 16 — iki tarafın o haftaki toplam çalışma saati.**
> **Ne zaman:** kural koşumu içinde, eylem anında.
> **Tazelik:** eylem anındaki hâliyle; onay anında saklanır (KŞ-2, `10` §3 satır 2).
> **Şununla atomik:** hiçbir şeyle okumada; onay anında N17'nin yazdığı değerlerin içinde.
> **Tekrarlanabilir mi:** evet.
> **Yapılabilirlik:** **`Unconfirmed`** — Murat Şen. **Açık, ve bordroya bakıyor:** KŞ-27 bu 45 saat hesabının bordronunkiyle aynı sonucu verip vermediğini soruyor. İki farklı sayı, iki farklı doğru cevap demektir.

> **N8 · Adımlar 6, 11, 16 — yürürlükteki kural seti sürümü ve eşikleri.**
> **Ne zaman:** her kural koşumunda; onay anında değeriyle birlikte saklanır (KŞ-3).
> **Tazelik:** yürürlükteki sürüm. Eski eşiklerle koşan bir kapı, bir uygunluk iddiasını yanlış yerden imzalar.
> **Şununla atomik:** onay anı kaydının yazılmasıyla (N17): sürüm ve eşikler kararla birlikte donar.
> **Tekrarlanabilir mi:** evet.
> **Yapılabilirlik:** **`Unconfirmed — no owner`** — eşiklerin *içeriği* İK'nın (KŞ-11), ama bunları tutan ve sürümleyen sistemi hiçbir belge kimseye vermiyor. `10` U-11 kural seti sürümünü yaratan adımın olmadığını yazıyor. VK-6 sürümün yerinde değişmeyeceğini soruyor; değişirse KŞ-3'ün sözü tutulamaz.

> **N9 · Adım 6 (E7, KŞ-10) — teklif edilen çalışanın uygulama sürümünün takas ekranını taşıyıp taşımadığı.**
> **Ne zaman:** teklif gönderilirken, sunucuda, teklif kurulmadan önce.
> **Tazelik:** dünkü bir sürüm bilgisi kabul edilebilir; kişi arada güncellemişse en fazla gereksiz bir ret üretir.
> **Şununla atomik:** hiçbir şeyle.
> **Tekrarlanabilir mi:** evet.
> **Yapılabilirlik:** **`Unconfirmed — no owner`** — `10` U-1 bu veriyi tutan hiçbir varlık olmadığını yazıyor, EK-1 alanı dilimin dışına çıkan bir ek olarak beyan ediyor ve onaylayanı ürün ekibi. **Ama alanı onaylamak veriyi üretmez:** başka bir çalışanın sürümünü sunucu tarafında okuyabilen bir sistem hiçbir belgede adı geçen kimseye ait değil.

> **N10 · Adım 9 — tek bir teklifin içeriği: vardiya, not, devreden çalışanın adı.**
> **Ne zaman:** bildirimden gelen kişi ekranı açtığında.
> **Tazelik:** anlık; teklif arada geri çekilmiş olabilir (B2) ve kişi kapalı bir teklifi üstlenmemeli.
> **Şununla atomik:** hiçbir şeyle.
> **Tekrarlanabilir mi:** evet.
> **Yapılabilirlik:** sütun yok, düzlem 5. **Açık:** gösterilen ad nereden gelir. `10` U-3 saklanan bir ad olmadığını, EK-2 adı saklamanın hem geçmişi doğru tuttuğunu hem kişisel veriyi çoğalttığını yazıyor; karar Selin Aydın + İK / hukuk.

> **N11 · Adım 14 — müdürün bekleyen takas kuyruğu: her satırda iki ad, vardiya ve not, tek okumada.**
> **Ne zaman:** müdür kuyruğu açtığında.
> **Tazelik:** anlık. Arada geri çekilmiş ya da düşmüş bir takas kuyrukta durursa müdür onaylayamayacağı bir şeyi onaylamaya çalışır.
> **Şununla atomik:** hiçbir şeyle.
> **Tekrarlanabilir mi:** evet.
> **Yapılabilirlik:** sütun yok, düzlem 5. **Ama tanımsız:** kuyruk kime ait sorusu R-7 / VK-8 çözülmeden cevaplanamaz (`10` U-4). Bir mağazada birden çok müdür varsa kuyruk paylaşılan bir liste mi, kişiye ait bir liste mi — ve E10'un çift onayı bunun doğal sonucu.

> **N12 · Adımlar 21, E18 — onaydan sonra çizelge ekranının vardiyayı yeni sahibinde göstermesi.**
> **Ne zaman:** onay bildirimi geldikten hemen sonra, kişi ekranı açtığında.
> **Tazelik:** **bu ihtiyacın tamamı tazeliktir.** "Onaylandı" bildirimi gelip çizelgede eski vardiya duruyorsa kişi takasın olmadığını sanır (E18).
> **Şununla atomik:** hiçbir şeyle.
> **Tekrarlanabilir mi:** evet.
> **Yapılabilirlik:** **`Unconfirmed`** — ürün ekibi. `[UNVERIFIED]` Mevcut çizelge ekranının önbelleğinin Plan'daki bu yazmayı ne zaman gördüğü doğrulanmadı (`08` E18, `05` §3.1'e ve `01-impact-radar.md` B01'e dayanıyor). Bu belge o kaynakları açmadı; işareti taşıyor.

> **N13 · E9 — üstlenme isteği geldiğinde takasın güncel durumunun okunması.**
> **Ne zaman:** üstlenme yazılmadan hemen önce, sunucuda.
> **Tazelik:** anlık olmak zorunda; bu okuma yarışın kendisini kapatan şey.
> **Şununla atomik:** N15 ile — okuma ve yazma arasında ikinci bir üstlenme geçmemeli.
> **Tekrarlanabilir mi:** evet.
> **Yapılabilirlik:** sütun yok, düzlem 5. `[ASSUMED]` `08` V-5 sunucunun ikinci üstlenmeyi kabul etmeyeceğini varsayıyor, sahibi ürün ekibi. KŞ-1 aynı **vardiya** için tek açık takas diyor, aynı **teklifin** iki kez üstlenilmesini kapsamıyor (`10` R-1).

---

## 2. Yazma ihtiyaçları

Dokuz ihtiyaç, `08` §7'nin ondört `acts` işaretinden. Bildirim gönderen altı adım tek bir ihtiyaçta toplandı (N21): altısı da aynı altyapıya, aynı soruyla iniyor.

> **N14 · Adım 7 — takas talebinin ve teklifin kurulması.**
> **Ne zaman:** kişi teklifi gönderdiğinde, adım 6 geçtikten sonra.
> **Tazelik:** —
> **Şununla atomik:** adım 6'nın kural sonucuyla ve tekillik kuralıyla. **Kural geçti ile kayıt kuruldu arasında ikinci bir takas talebi araya girmemeli** (KŞ-1, `10` R-1: bu yasak tek yerde uygulanıyor, burada).
> **Tekrarlanabilir mi:** **hayır** — aynı gönderimin ikinci kez gelmesi ikinci bir takas talebi kurmamalı, tanınıp reddedilmeli. İstemci butonu iki kez basılabilir bir şeydir ve bu bir sunucu sorunudur.
> **Yapılabilirlik:** sütun yok, düzlem 5. Sıradan.

> **N15 · Adım 12 — üstlenmenin yazılması ve takasın onaya düşmesi.**
> **Ne zaman:** üstlenen çalışan "üstleniyorum" dediğinde, adım 11 geçtikten sonra.
> **Tazelik:** —
> **Şununla atomik:** adım 11'in kural sonucuyla ve N13'ün durum okumasıyla. Üçü tek bir şeydir; kural geçti ile üstlenme yazıldı arasında durum değişmemeli.
> **Tekrarlanabilir mi:** **hayır** — E9'un tarif ettiği ikinci istek etkisiz kalmalı, ikinci bir üstlenme yazmamalı.
> **Yapılabilirlik:** sütun yok, düzlem 5. Sıradan.

> **N16 · Adım 17 — Plan'a vardiya–çalışan eşlemesinin yazılması.**
> **Ne zaman:** müdür onayladıktan ve adım 16 geçtikten sonra, eylem anında.
> **Tazelik:** yazma anında Plan'daki hâlin, kuralın koştuğu hâlle aynı olması gerekir; arada yeniden yayım geçmişse yazma yanlış şeyin üstüne yazar (E14).
> **Şununla atomik:** **N17 ile aynı işlemde olamaz** — Plan başka bir ekibin sistemi. `08` adım 18'i özellikle Plan olumlu döndükten sonraya koyuyor (D-10). Yani atomiklik yok, **sıra var**, ve sıranın kırıldığı yerde E1 ve E2 yaşıyor.
> **Tekrarlanabilir mi:** **bilinmiyor, ve bu dilimin en pahalı bilinmezi.** E2 zaman aşımında tekrar denemenin çift yazma riski taşıdığını, E10 müdürün çift onayının aynı boşluğun ikinci yüzü olduğunu yazıyor.
> **Yapılabilirlik:** **`Unconfirmed`** — Murat Şen (KŞ-18 / AK-8). Neyi çözer: uç koşullu yazma sunuyor mu, aynı yazma iki kez gelirse ne dönüyor, çakışmada ne dönüyor. **Uç var ve bu uygulama tarafından hiç çağrılmadı** (kaynak: bu koşumun brifingi). **Dilim başlamadan cevaplanmalı;** cevapsız hâlde Bitiş 8 (`08` §8) yazılamaz bir bitiştir.

> **N17 · Adımlar 18, 19 — takasın "onaylandı" işaretlenmesi ve onay anı kaydının yazılması.**
> **Ne zaman:** N16 olumlu döndükten sonra, eylem anında.
> **Tazelik:** kaydın değerleri o anda saptanır; KŞ-2 ve KŞ-3'ün alanları (saatler, mağaza, rol, haftalık toplam, dinlenme aralığı, yürürlükteki eşikler, kural seti sürümü) sonradan Plan'dan yeniden hesaplanamaz.
> **Şununla atomik:** **ikisi tek şey olmalı.** `10` B-4 aralığı adıyla koyuyor ve kararı buraya bırakıyor: 19 düşerse geride onaylanmış ama neye dayandığı yazılı olmayan bir takas kalır, yani onsekiz ay sonra cevaplanamayacak tam da o soru. **Bu belgenin verdiği cevap: kayıt önce yazılır, işaret sonra konur.** Ters sıra bir kaydı kaybeder; bu sıra en fazla, kaydı olan ama işareti konmamış bir takas bırakır — o hâl görülebilir ve düzeltilebilir.
> **Tekrarlanabilir mi:** **hayır** — ikinci bir onay ikinci bir onay anı kaydı yazmamalı (`10` R-4: bir takas talebine 0..1 kayıt).
> **Yapılabilirlik:** sütun yok, düzlem 5. **Bu ürünün asıl yapıldığı şeylerden biri:** KŞ-3'ün onsekiz ay sonraki sorusu bu kayda dayanıyor.

> **N18 · B2.2, B3.2 — teklifin kapanması: geri çekme ve geri çevirme.**
> **Ne zaman:** eylem anında.
> **Tazelik:** —
> **Şununla atomik:** hiçbir şeyle; ama kapanma **nasıl** kapandığını da yazmalı.
> **Tekrarlanabilir mi:** evet, sonuç aynı kalır: kapalı bir teklif tekrar kapatılınca değişmez.
> **Yapılabilirlik:** sütun yok, düzlem 5. **Dilim dışına çıkan bir ihtiyaç taşıyor:** takasın nasıl bittiğini saklamak `10` EK-4'tür, `06` §5'te yazmaz, onaylayanı Selin Aydın. Beyan ediyorum: **bu ihtiyacın "nasıl bittiği" parçası kesimin dışında bir eklemedir.** Olmazsa N27 iki bitişi ayıramaz ve `08` §6'nın ilk boşluğu kapanmaz.

> **N19 · B5.3 — reddin ve müdürün zorunlu serbest metninin kaydedilmesi.**
> **Ne zaman:** müdür reddettiğinde, eylem anında.
> **Tazelik:** —
> **Şununla atomik:** red kaydı ile serbest metin tek şeydir; metinsiz bir red D-8'i tutmaz.
> **Tekrarlanabilir mi:** **hayır** — bir takas iki kez reddedilmemeli.
> **Yapılabilirlik:** sütun yok, düzlem 5. **Açık:** metnin saklama süresi ve kimin göreceği KŞ-23 / VK-5, İK / hukuk, dilim başlamadan.

> **N20 · Adımlar 7, 12, 18, B2.2, B3.2, B5.3 — her durum değişiminin denetim izine yazılması: kim, ne zaman, hangi kural sürümüyle.**
> **Ne zaman:** durumu değiştiren her yazmayla birlikte, eylem anında.
> **Tazelik:** —
> **Şununla atomik:** **durum değişiminin kendisiyle.** Bir takas durum değiştirip iz bırakmıyorsa KŞ-6 sağlanmıyor demektir ve eksikliği ancak denetimde fark edilir.
> **Tekrarlanabilir mi:** kayıtlar birleşmez (`10` §1, kimlik kuralı 4); aynı olayın iki kez yazılması iki kayıt üretir ve bu bir hata olarak görünmelidir.
> **Yapılabilirlik:** sütun yok, düzlem 5. Sıradan, ama gün birinde olması gerekiyor (KŞ-6).

> **N21 · Adımlar 8, 13, 20, B2.3, B3.3, B5.4 — bildirimin doğru alıcıya gitmesi.**
> **Ne zaman:** durum değişiminden sonra, eylem anında.
> **Tazelik:** gecikme kabul edilebilir, kaybolma değil — ve ikisi bugün ayırt edilemiyor (E8).
> **Şununla atomik:** **hiçbir şeyle, ve bu bilerek.** Bildirim düşerse takasın durumu değişmiş kalmalı; kişi uygulamayı açıp görebilmeli (D-12, N29).
> **Tekrarlanabilir mi:** evet; ikinci bir bildirim rahatsız eder, veriyi bozmaz.
> **Yapılabilirlik:** **`Unconfirmed`** — Murat Şen (`08` V-2). Neyi çözer: mevcut push altyapısı **tek bir çalışana** ve **bir mağazanın müdürüne** adresli bildirim gönderebiliyor mu. İkincisi R-7 / VK-8'e bağlı: müdür tekil değilse alıcı tanımsız. D-20 pilotta hacmi ölçüyor, ama hacim adreslenebilirlik değildir.

> **N22 · B1, B4, B6 — kural kapısında düşen denemenin kaydedilmesi. `[DECISION NEEDED]`**
> **Ne zaman:** kapı kapandığı anda.
> **Tazelik:** —
> **Şununla atomik:** hiçbir şeyle.
> **Tekrarlanabilir mi:** evet.
> **Yapılabilirlik:** sütun yok, düzlem 5. **Bu bir eklemedir ve beyan ediyorum:** `06` §5'te yok, `10` EK-5'te dilim dışına çıkan alan olarak duruyor, onaylayanı İK / hukuk + Selin Aydın. B1, B4 ve B6 `08`'de işaretsiz adımlardır — yazmıyor, söylemiyor, olay atmıyorlar (`10` B-3). Olmazsa KŞ-20'nin sorusu — *kural motoru yanılırsa sorumluluk kimde* — cevaplanamaz, çünkü bakılacak kayıt yok.

---

## 3. Olay ihtiyaçları

Altı ihtiyaç, `08` §7'nin altı `emits` işaretinden. **Olayların adları bu belgede seçilmedi:** yedisini de KŞ-7 adlandırmış, taksonomi ürünün kendisinin. Burada yazılan tek şey her olayın **hangi soruyu cevaplayabilir kılması gerektiği** ve o soruyu cevaplayan alanlar.

**Bugünkü yük, tek cümlede:** yedi olayın hepsi yalnız takas kimliği ve zaman damgası taşıyor (`08` §6, KŞ-7). Aşağıdaki her "taşıması gereken" satırı, bu iki alanın üstüne bir şey ekliyorsa **kesimin dışında bir eklemedir** ve öyle işaretlendi. Onaylayacak: Selin Aydın (KŞ-25, VK-9).

> **N23 · Adım 7 — `takas_açıldı` ve `teklif_edildi`.**
> **Cevaplaması gereken:** üç ay sonra biri soracak — *pilot mağazalarda kaç vardiya takasa açıldı, hangi mağazada, hangi rolde, ve açılanların kaçı teklife dönüştü.*
> **Bugün taşıdığı:** takas kimliği, zaman.
> **Taşıması gereken:** yukarıdakine ek olarak mağaza ve rol. `[EKLEME]` — `10` U-6 alternatifini yazıyor: mağaza canlı okunursa çalışan taşındığında geçmiş aylar yeni mağazasına kayar. Karar VK-9, Selin Aydın.
> **Ne zaman:** yazma ile aynı anda.
> **Tekrarlanabilir mi:** aynı olayın iki kez düşmesi ölçütü şişirir; tekil olmalı.
> **Yapılabilirlik:** **`Unconfirmed — no owner`.** Olayları alan, saklayan ve sorgulanabilir kılan hattı hiçbir belge kimseye vermiyor. Selin Aydın olayın **ne taşıyacağına** karar verir; hattın **var olduğunu** kimse söylemedi.

> **N24 · Adım 12 — `üstlenildi` ve `onaya_düştü`.**
> **Cevaplaması gereken:** *teklif edilenlerin kaçı üstlenildi, ve üstlenme ile onaya düşme arasında ne kadar geçti.*
> **Bugün taşıdığı:** takas kimliği, zaman.
> **Taşıması gereken:** aynısı, artı mağaza ve rol (N23 ile aynı ekleme). İki olayın adım 12'de birlikte düşmesi süre ölçümünü anlamsız kılıyor: ikisinin arası her zaman sıfır.
> **Ne zaman:** yazma ile aynı anda.
> **Tekrarlanabilir mi:** tekil olmalı.
> **Yapılabilirlik:** **`Unconfirmed — no owner`.**

> **N25 · Adım 18 — `onaylandı`.**
> **Cevaplaması gereken:** *kaç takas tamamlandı — ölçüt 1'in payı — ve müdür kuyruğa düştüğünden onaya kadar ne kadar bekledi.*
> **Bugün taşıdığı:** takas kimliği, zaman.
> **Taşıması gereken:** aynısı, artı mağaza ve rol.
> **Ne zaman:** Plan olumlu döndükten ve N17 yazdıktan sonra. **Erken atılırsa ölçüm E1'de düşen takasları başarı sayar.**
> **Tekrarlanabilir mi:** tekil olmalı.
> **Yapılabilirlik:** **`Unconfirmed — no owner`.**

> **N26 · B5.3 — `reddedildi`.**
> **Cevaplaması gereken:** *müdürler kaç takası reddediyor, hangi mağazada.*
> **Bugün taşıdığı:** takas kimliği, zaman.
> **Taşıması gereken:** aynısı, artı mağaza. **Serbest metin taşımamalı** — `10` §4 bunun bugün tesadüfen doğru olduğunu ve bilerek onaylanması gerektiğini yazıyor (VK-5, İK / hukuk). Sebep kırılımı isteniyorsa yolu serbest metin değil, KŞ-28'in red sebebi listesidir ve o DD-2 ile kesildi.
> **Ne zaman:** yazma ile aynı anda.
> **Tekrarlanabilir mi:** tekil olmalı.
> **Yapılabilirlik:** **`Unconfirmed — no owner`.**

> **N27 · B2.2, B3.2 — `düştü`.**
> **Cevaplaması gereken:** *takaslar nerede kaybediliyor — devreden vazgeçtiği için mi, teklif edilen geri çevirdiği için mi.* İkisi iki farklı ürün sorunudur ve iki farklı iş gerektirir.
> **Bugün taşıdığı:** takas kimliği, zaman — **ve iki bitişi birbirinden ayırmıyor** (`10` U-5).
> **Taşıması gereken:** hangi bitişe düştüğünü söyleyen bir ayrım. `[EKLEME]` — N18'in taşıdığı EK-4 ile aynı karar; ayrı ayrı değil birlikte verilmeli.
> **Ne zaman:** yazma ile aynı anda.
> **Tekrarlanabilir mi:** tekil olmalı.
> **Yapılabilirlik:** **`Unconfirmed — no owner`.**

> **N28 · B1, B4, B6, E1, E2, E17 — hiç olay atılmayan altı yer. `Gap`**
> **Cevaplaması gereken:** *huninin ilk kaybı ne kadar* (B1: teklif hiç kurulmadı), *kural kapısı kaç üstlenmeyi ve kaç onayı düşürüyor* (B4, B6), *Plan yazması ne sıklıkla düşüyor* (E1, E2 — D-20'nin ölçmek istediği şeyin ta kendisi), *kaç kişi göndermeden vazgeçiyor* (E17).
> **Bugün taşıdığı:** hiçbir şey; bu altı yerde olay yok (`08` §6, `10` B-3).
> **Ne zaman:** kapı kapandığı ya da yazma düştüğü anda.
> **Tekrarlanabilir mi:** —
> **Yapılabilirlik:** **`Gap`** — `08` §6 bu altısında olay olmadığını açıkça listeliyor. **Bu bir eklemedir:** KŞ-7'nin yedi olayı `06` §5'in kaydıdır, sekizinci olay orada yok. Onaylayacak: Selin Aydın. Olmazsa pilot geriye dönük ölçülemez ve ölçüt 3'ün paydası (G02) hiç kurulamaz.

---

## 4. Adımı olmayan ihtiyaçlar

Dört ihtiyaç. **Hiçbirini akıştaki bir adım gerçekleştirmiyor**, ama akış ya da dilim dördünü de tüketiyor. Adımı olmayan ihtiyaç, kimse aramadığı için kaybolan ihtiyaçtır: kimse reddetmez, kimse onaylamaz, ve yapılmadığı yapıldıktan sonra fark edilir.

> **N29 · D-12 (adımı yok) — iki tarafın takasın durumunu uygulamada görmesi.**
> **Ne zaman:** kişi uygulamayı açtığında, tetikleyicisiz.
> **Tazelik:** anlık. **Bu ekran E8'in tek çıkışıdır** (`08` E8: *"Uygulamayı açıp takas durumunu görmek"*), ve `08` §5 satır 3 E8 ile E12'nin ayırt edilmesini **zorunlu** ilan ediyor. Yani bu ekran "onay bekliyor" demekle yetinemez; bildirimin gitmemesi ile müdürün cevap vermemesi farklı görünmeli.
> **Şununla atomik:** hiçbir şeyle.
> **Tekrarlanabilir mi:** evet.
> **Yapılabilirlik:** sütun yok, düzlem 5. **Kimin uzlaştıracağı:** `06` D-12 dilimde, `08`'de bu ekranı okuyan işaretli bir adım yok. Ürün ekibi + akışı yazan; `build-context` bu farkı yakalamalı.

> **N30 · D-18, V-6, KŞ-10 (adımı yok) — mağazanın pilot kümesine ait olup olmadığı. `Gap`**
> **Ne zaman:** akış başlamadan önce; adım 1'den önce ve adım 6'da yeniden.
> **Tazelik:** günlük yeterli; pilot kümesi sık değişmez.
> **Şununla atomik:** hiçbir şeyle.
> **Tekrarlanabilir mi:** evet.
> **Yapılabilirlik:** **`Gap`** — `10` EK-6 tek cümlede söylüyor: *pilot sınırı okunabilir bir veri değil.* Onaylayacak: ürün ekibi. **Bu, akışın tükettiği ve hiçbir adımın gerçekleştirmediği bir yetenektir**, ve olmadığında pilot sınırı bir yapılandırma dosyasında ya da daha kötüsü istemcide bir listede yaşar (KI-6).

> **N31 · D-21 (adımı yok) — pilotu durduran anahtar.**
> **Ne zaman:** her an, akış koşarken.
> **Tazelik:** anlık; geri dönüş kararının değeri hızındadır.
> **Şununla atomik:** hiçbir şeyle. **Ama iki farklı şey demek:** yeni takas açılmasını durdurmak ile açık takasları düşürmek aynı şey değil, ve `06` D-21 hangisini kastettiğini yazmıyor.
> **Tekrarlanabilir mi:** evet.
> **Yapılabilirlik:** sütun yok, düzlem 5. Onay bekleyen takaslar varken anahtar çevrilirse ne olacağı yazılı değil; sahibi ürün ekibi.

> **N32 · D-20 (adımı yok) — push hacminin ve Plan cevaplarının ölçülmesi.**
> **Ne zaman:** pilot boyunca, sürekli, arka planda.
> **Tazelik:** günlük yeterli.
> **Şununla atomik:** hiçbir şeyle.
> **Tekrarlanabilir mi:** evet.
> **Yapılabilirlik:** **`Unconfirmed — no owner`.** `06` D-20 bunu dilime koyuyor ve G08'in cevabının buradan çıkacağını yazıyor, ama **akışta bunu üreten hiçbir adım yok ve ölçen hiçbir sistem adlandırılmadı.** N28 bu ölçümün bir yarısını (Plan yazmasının düşmesi) olay tarafında da istiyor; ikisi aynı boşluğun iki yüzü.

---

## 5. Karşı-ihtiyaçlar

İstemcinin yapmak zorunda **bırakılmaması** gerekenler. Kısa liste, ve genellikle ihtiyaç listesinden daha çok işe yarayan yarı.

**KI-1 · İstemci altı uygunluk kuralından hiçbirini tek başına uygulamaz.** KŞ-4 yetkiyi sunucuya ve iki ana koyuyor. Bir kuralı istemcide çalıştırmak yalnızca hızlıdır; **yetki değildir** ve sunucu aynı konuda kendi fikrini söylediği anda ikisi ayrışır. Adım 3'te listeyi süzmek bile bir yetki mekanizması sayılmaz (`04` skor B-3'ün `06`'ya taşınmış hâli).

**KI-2 · İstemci müdürün kuyruğunu satır satır kurmaz.** Adım 14 her satırda iki ad, vardiya ve not istiyor. Kuyruğu alıp her takas için ayrı ayrı ad ve vardiya çekmek, on takaslı bir kuyrukta yirmibir istek demektir ve mağaza müdürünün elindeki telefonda bekleme olarak görünür.

**KI-3 · İstemci Plan'ın çizelgesi ile takas servisinin durumunu birleştirip "bu vardiyayı şimdi kim çalışıyor" cümlesini kurmaz.** Tek bir kaynak bu soruyu cevaplamalı. Birleştirme istemcide yapılırsa E18'in eski önbelleği ile onaylanmış takas yan yana gelir ve kişi iki farklı doğru görür.

**KI-4 · İstemci Plan yazmasını kendi tekrar denemez.** Adım 17 başka bir ekibin sistemine yazıyor ve KŞ-18 cevaplanmadan tekrar denemenin çift yazma riski taşıdığı yazılı (E2). Tekrar deneme kararı sunucunun; istemci yalnız müdüre ne olduğunu söyler.

**KI-5 · İstemci uygunluk eşiklerini ve kural seti sürümünü taşımaz.** KŞ-11 eşikleri İK'nın yazılı sahipliğine veriyor. Cihazdaki bir eşik, bir sürüm çıkışına bağlanmış bir hukuki iddiadır: İK eşiği değiştirir, kullanıcıların bir kısmı eski eşikle koşmaya devam eder ve kimse fark etmez.

**KI-6 · Pilot mağaza listesi uygulamanın içinde bir sabit olarak yaşamaz.** N30 bu verinin bugün okunabilir olmadığını söylüyor; en kolay çözüm listeyi istemciye gömmektir ve o çözüm pilot kümesi her değiştiğinde bir sürüm çıkışı gerektirir (DD-6 kümenin değişeceğini varsayıyor).

**KI-7 · İstemci E8 ile E12'yi tahmin ederek ayırmaz.** `08` §5 satır 3 ayrımı zorunlu kılıyor. "Onay bekliyor" ekranında geçen süreye bakıp bildirimin gitmediğine karar vermek bir tahmindir; bildirimin gidip gitmediğini yalnız gönderen taraf bilir ve söylemelidir.

**KI-8 · İstemci onay anında saklanacak değerleri hesaplamaz.** KŞ-2'nin alanları (haftalık toplam, dinlenme aralığı, yürürlükteki eşikler) onay anında sunucuda saptanır. İstemcide hesaplanan bir dinlenme aralığı, onsekiz ay sonra bir uygunluk kanıtı olarak okunacak bir sayının kaynağını telefona bağlar.

---

## 6. Varsayılan yetenekler

Akışta görünmezler: adım kusursuz okunur, sırada yanlış bir şey yoktur. Bir tasarımın backend ekibi okuduktan sonra yeniden yazılmasının en sık sebebi bunlardır.

> **AC1 — Plan'ın yazma ucunun koşullu ya da tekrarlanabilir yazma sunduğu** varsayılıyor (adım 17, N16).
> **Neyi çözer:** Murat Şen. Uç var, bu uygulama tarafından hiç çağrılmadı. KŞ-18 / AK-8, **dilim başlamadan.**

> **AC2 — Plan'ın bir çalışanın komşu haftasındaki vardiyalarını verebildiği** varsayılıyor (adım 6, 11, 16; D-14).
> **Neyi çözer:** Murat Şen (A15). Veremiyorsa kural sessizce yanlış hesaplar; `08` E6 bunu bir hata yolu olarak değil, sessiz yanlış olarak yazıyor.

> **AC3 — rol yetkinliği verisinin dolu ve güncel olduğu** varsayılıyor (N4).
> **Neyi çözer:** Murat Şen (KŞ-22).

> **AC4 — doğum tarihinin okunabildiği ve bu amaçla okunmasının meşru olduğu** varsayılıyor (N5).
> **Neyi çözer:** okunabilirliği Murat Şen (A17); **meşruluğunu hiçbir belge sormamış** — İK / hukuk.

> **AC5 — başka bir çalışanın uygulama sürümünün sunucu tarafında okunabildiği** varsayılıyor (adım 6, KŞ-10, E7).
> **Neyi çözer:** kimse. `10` U-1 bu veriyi tutan varlık olmadığını yazıyor; onu üreten sistemin sahibi hiçbir belgede yok. **Bu listedeki en sessiz satır.**

> **AC6 — pilot kümesi üyeliğinin okunabilir bir veri olduğu** varsayılıyor (N30).
> **Neyi çözer:** ürün ekibi. `10` EK-6 bugün olmadığını yazıyor.

> **AC7 — mevcut push altyapısının tek bir çalışana adresli bildirim gönderebildiği** varsayılıyor (D-11, `08` V-2).
> **Neyi çözer:** Murat Şen.

> **AC8 — "takasın geçtiği mağazanın müdürü" ifadesinin tek bir alıcıya çözüldüğü** varsayılıyor (KŞ-5, adım 13, 14).
> **Neyi çözer:** Selin Aydın (R-7 / VK-8). Çözülmüyorsa N11'in kuyruğu tanımsız ve E10'un çift onayı bir kaza değil, bağın doğal sonucu.

> **AC9 — olayları alan, saklayan ve mağaza kırılımıyla sorgulanabilir kılan bir ölçüm hattının var olduğu** varsayılıyor (KŞ-7, D-15, ölçüt 1–3).
> **Neyi çözer:** kimse. Yedi olay üç belgede geçiyor ve **hiçbiri olayların nereye aktığını yazmıyor.** `Unconfirmed — no owner`'ların sekizinin altısı bu satırdan geliyor.

> **AC10 — bir çalışanın haftalık toplam saatinin çekilebildiği ve bordronun hesabıyla aynı sonucu verdiği** varsayılıyor (N7).
> **Neyi çözer:** çekilebilirliği Murat Şen, eşitliği bordro ekibi (KŞ-27).

> **AC11 — Vardiya kimliğinin hafta yeniden yayımlandığında korunduğu** varsayılıyor (N1, N16).
> **Neyi çözer:** Murat Şen (`10` VK-2 / U-7, **dilim başlamadan**). **KŞ-1'in tamamı buna dayanıyor:** kimlik korunmuyorsa "aynı vardiya için tek açık takas" kuralının işaret ettiği şey yeniden yayımdan sonra başka bir vardiyadır ve E14 fark edilmez.

---

## 7. Yapılabilirlik: sayım ve beş düzlem

**Üç durum, üçü de bir sahibi olduğunu varsayar.** Bir ihtiyacın sahibi yoksa o ihtiyaç zayıf desteklenmiş değildir: **sahipsizdir**, hiç onaylanmaz, hiç reddedilmez, ve yapılmadığı yapıldıktan sonra fark edilir. Bu belgede sekiz tane var ve altısı aynı yerden geliyor — akışın ima ettiği, hiçbir belgenin kimseye vermediği ölçüm düzlemi.

**32 ihtiyaç, beş düzleme iniyor.**

| # | Düzlem | Bugün var mı | İhtiyaçlar | Sayı |
|---|---|---|---|---|
| 1 | Plan | Var; okuma uçları kullanımda, yazma ucu hiç çağrılmadı | N1, N2, N4, N5, N6, N7, N16 | 7 |
| 2 | Mevcut uygulama ve önbelleği | Var | N12 | 1 |
| 3 | Push altyapısı | Var `[ASSUMED]` | N21 | 1 |
| 4 | Sahibi yazılı olmayan veri düzlemleri | **Belirsiz** | N8, N9, N23, N24, N25, N26, N27, N28, N30, N32 | 10 |
| 5 | Bu dilimde kurulacak takas servisi ve kural motoru | Yok; yapılacak | N3, N10, N11, N13, N14, N15, N17, N18, N19, N20, N22, N29, N31 | 13 |

**Düzlem 1–4 için sütun geçerli. 19 ihtiyaç:**

| Değer | Sayı | Hangileri |
|---|---|---|
| `Supported` | 1 | N1 |
| `Unconfirmed` | 8 | N2, N4, N5, N6, N7, N12, N16, N21 |
| `Unconfirmed — no owner` | 8 | N8, N9, N23, N24, N25, N26, N27, N32 |
| `Gap` | 2 | N28, N30 |

**Düzlem 5 için sütun düşürüldü.** Onüç ihtiyacın hepsini `Gap` işaretlemek teknik olarak doğru ve hiçbir bilgi taşımıyor: sıfırdan kurulan bir servis için "yok" demek, "yapılacak" demenin uzun hâli. Yerine sorulması gereken soru şu: **hangisi sıradan, hangisi bu ürünün asıl yapıldığı şey.**

**Sıradan olan on:** N10, N11, N13, N14, N15, N18, N19, N20, N29, N31. Kayıt kur, durum değiştir, liste göster, iz bırak. Bunlar bir tahmin satırıdır, bir risk satırı değil.

**Ürünün asıl yapıldığı üç:**

- **N3 — altı kuralın sunucuda, üç ayrı anda koşması.** Kuralların kendisi henüz tam değil (KŞ-19, İK / hukuk, dilim başlamadan) ve motorun yanılması hâlinde sorumluluğun kimde olduğu açık (KŞ-20). **Bir uygunluk motoru yazmak bir ekran yazmak değildir**, ve bu üründe uygunluk motoru ürünün kendisidir.
- **N17 — onay anı kaydının, onay işaretiyle birlikte durması.** KŞ-3'ün onsekiz ay sonraki sorusunun tek cevabı bu kayıttır; `10` B-4 iki adımın arasındaki aralığı bir bulgu olarak yazıyor.
- **N22 — düşen denemenin kaydı.** Bugün dilimde yok, ve olmadığında KŞ-20'nin sorumluluk sorusu yapısal olarak cevapsız kalıyor.

**Bu ayrım bir tahmin farkıdır.** Onüç sıradan ihtiyaçlı bir servis ile onüçünün üçü uygunluk ve kanıt olan bir servis aynı iş değildir; ikincisi bir ürün kararı, bir hukuk sorusu ve bir denetim izi taşıyor.

**Dilim başlamadan cevaplanması gerekenler, bu belgeden.** AC1 (KŞ-18, Murat Şen) · AC11 (VK-2, Murat Şen) · AC8 (VK-8, Selin Aydın) · N28 ve N27'nin taşıdığı ölçüm kararı (VK-9 + KŞ-25, Selin Aydın) · N18'in taşıdığı EK-4 (Selin Aydın). Beşi de `06` §3 ile `10` §7'nin listelerinin üstüne biniyor, onların yerine geçmiyor.

**Kesimin dışına çıkan üç ihtiyaç, beyan.** `06` §5 kapsamın kaydıdır ve ekleme yapan belge eklediğini açıkça beyan eder. Bu belgenin eklediği üç şey: **N18'in "nasıl bittiği" parçası** (EK-4, Selin Aydın) · **N22'nin tamamı** (EK-5, İK / hukuk + Selin Aydın) · **N23–N28'in olay yüküne mağaza ve rol eklenmesi ve sekizinci olayların açılması** (KŞ-7'nin yedisi ve iki alanı kapsamın kaydıdır; fazlası ekleme, Selin Aydın). Hiçbiri onaylanmadı.

---

## 8. Taslak sözleşme — şekil katmanı `[DRAFT]`

> **Bu bölüm backend ekibi için bir başlangıç noktasıdır, bir spesifikasyon değil.** Bu sistemi sahiplenmeyen birinin şekil hakkındaki tahminidir. Tartışın, değiştirin, ya da silin — yukarıdaki ihtiyaçlar bu bölüm olmadan da ayakta durur.

**Yalnız şekil katmanı var, ve sebebi şu:** somut katman — gerçek yollar, alan adları, fiiller — hangi paradigmanın kullanıldığını, adlandırmanın nasıl olduğunu ve sürümlemenin nerede durduğunu bilmeyi gerektirir. Bu koşumda soracak kimse yoktu. **Cevapsızlık "bilmiyorum" ile aynı şey değildir**, ama sonucu aynıdır: yanlış paradigmada yazılmış bir öneri, yalnız kullanılamaz olmakla kalmaz, yazanın yığını bilmediğini söyler ve üstündeki her şey o gözle okunur. REST varsayılmadı.

**Aşağıdaki her satır bir N'ye bağlıdır.** Hiçbir alan, hiçbir işlem, hiçbir parametre akıştaki bir adımın istemediği bir şey için eklenmedi.

```
[DRAFT] Haftanın çizelgesi
  Karşıladığı: N1, N12
  İster: çalışan, hafta
  Döner: o haftanın vardiyaları, her birinde onu şu an kimin
         çalıştığı, ve vardiyanın açık bir takası olup olmadığı
  Açık:  hangi yayımdan okunduğu söylenecek mi (U-2, AC11)

[DRAFT] Teklif edilebilecek çalışanlar
  Karşıladığı: N2
  İster: vardiya
  Döner: aynı mağazadaki çalışanlar, insana gösterilecek adlarıyla;
         isteyen kişinin kendisi listede değil
  Açık:  ad kopya mı referans mı (EK-2) — sözleşmenin değil,
         Selin Aydın + İK / hukukun kararı

[DRAFT] Takasa aç ve tek kişiye teklif et
  Karşıladığı: N3 (adım 6), N14, N20, N23
  İster: vardiya, teklif edilen çalışan, isteğe bağlı not,
         ve aynı gönderimin ikincisini tanıtan bir şey
  Döner: kurulan takas talebi; ya da kurulmadıysa hangi kuralın
         düştüğü ve bunun kural mı sürüm mü olduğu (E7 ↔ E4/E5 ayrımı,
         `08` §5 satır 6 zorunlu kılıyor)
  Açık:  VK-1 — takas talebi ile teklif tek kayıt mı iki kayıt mı;
         cevap "iki" olursa bu tek işlem ikiye bölünür

[DRAFT] Bir teklifin içeriği
  Karşıladığı: N10
  İster: teklif
  Döner: vardiya, not (yazıldığı hâliyle), devreden çalışanın adı,
         ve teklifin hâlâ açık olup olmadığı

[DRAFT] Üstlen
  Karşıladığı: N3 (adım 11), N13, N15, N20, N24
  İster: teklif
  Döner: üstlenildi; ya da düşen kural; ya da teklifin artık açık
         olmadığı
  Açık:  kural kapısında düşen üstlenmeden sonra teklif açık kalır mı
         (AK-1 / VK-1, Selin Aydın) — bu sözleşmenin değil, ürünün kararı

[DRAFT] Geri çek / geri çevir
  Karşıladığı: N18, N20, N27
  İster: teklif, ve hangi taraf olduğu
  Döner: kapandı
  Açık:  kapanma sebebinin saklanıp saklanmayacağı (EK-4) — bu
         sözleşmenin dışında bir kapsam kararı

[DRAFT] Müdürün bekleyen kuyruğu
  Karşıladığı: N11
  İster: müdür
  Döner: bekleyen takaslar; her satırda iki ad, vardiya ve not,
         ikinci bir istek gerektirmeden (KI-2)
  Açık:  kuyruk kime ait — VK-8 cevaplanmadan bu işlemin girdisi
         "müdür" mü "mağaza" mı bilinmiyor

[DRAFT] Onayla
  Karşıladığı: N3 (adım 16), N16, N17, N20, N25
  İster: takas
  Döner: onaylandı; ya da düşen kural; ya da Plan yazmasının
         durumu
  Açık:  **bu belgenin en büyük açığı.** Çağıranın sonucu aynı anda
         mı öğrendiği, yoksa sonra mı söylendiği KŞ-18'e bağlı ve
         `08` E2'nin çıkışsız hâli tam buradan doğuyor. Şekil
         verilmedi çünkü şekli belirleyen cevap yok.

[DRAFT] Reddet
  Karşıladığı: N19, N20, N26
  İster: takas, zorunlu serbest metin
  Döner: reddedildi
  Açık:  metnin saklama süresi ve kimin göreceği (KŞ-23 / VK-5)

[DRAFT] Takasın durumu
  Karşıladığı: N29
  İster: takas
  Döner: takasın durumu, ve bildirimin gidip gitmediğini E8 ile
         E12'yi ayıracak kadar (`08` §5 satır 3, KI-7)
  Açık:  bu ayrımın nasıl ifade edileceği; şekil verilmedi çünkü
         bildirimin gönderildiğini bilen sistem N21'in altındaki
         doğrulanmamış altyapı

[DRAFT] Şekli verilemeyen üç ihtiyaç
  N28 — atılmayan altı olay: adları taksonominin sahibinindir,
        icat edilmedi
  N30 — pilot kümesi: bugün okunabilir bir veri değil (`Gap`),
        şekil vermek onu var saymak olurdu
  N31 — durdurma anahtarı: neyi durdurduğu (yeni takaslar mı,
        açık takaslar mı) karara bağlı
```

**Devri açıkça yapıyorum:** yukarıdaki ihtiyaçlar ürün tarafınındır, bu bölüm backend ekibinindir. Bu konuşmanın en hızlı hâli, iki tarafın da hangisinin hangisi olduğunu başlamadan bilmesidir.

---

## 9. Sonraki adım

**Bir ihtiyaç listesi bir devir değildir.** `build-context` bu belgeyi zincirin geri kalanıyla birlikte, kodu yazan kişinin — insan ya da model — çalışabileceği tek bir pakete toplar ve belgeler arasındaki çelişkileri adıyla yazar. Burada hiçbir paket toplanmadı.

`build-context` koşulacaksa bu belgeden üç şeyi mutlaka taşımalı: **§7'nin sekiz `Unconfirmed — no owner`'ı** (sahibi olmayan ihtiyaç, reddedilmeyen ihtiyaçtır), **§7'nin sonundaki üç kesim dışı beyan** (onaylanmamış kapsam), ve **§8'in "Onayla" satırındaki açık** (KŞ-18 cevaplanmadan o işlemin şekli yazılamaz).

**Ve bir şeyi kontrol etmeli:** `09-flow-grill.md` bu koşumda açılmadı (§0). Grill'in bulguları bu belgenin hiçbir satırında taşınmıyor.
