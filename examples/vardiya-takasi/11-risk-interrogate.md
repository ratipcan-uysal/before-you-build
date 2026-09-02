# Vardiya Takası — Risk Sorgusu (ilk dilim)

## 1. Ne değerlendirildi

**Okunanlar.** `06-slice.md` §1–§9 · `08-flow-map.md` §1–§9 · `05-request-shaper.md` §1.6–§7 ve açık madde listeleri · `01-impact-radar.md` Faz 0–4. Başka belge açılmadı; `*-feedback.md` dosyaları ve `04b-*` bu koşumun dışında tutuldu.

**Sınıf.** `transaction` · `multi-surface`. Para dolaylı hareket ediyor (çizelge → bordro), yüzeyler ise üç tane: çalışanın mobil ekranı, müdürün mobil kuyruğu ve **kapatılmayan** Plan arayüzü (`01` S4). Bu sınıf, eşzamanlılık · veri bütünlüğü · geri alınabilirlik boyutlarını en öne alır; erişilebilirlik ve çok dilli metin gibi boyutlar bu koşumda hiç ısırmadı.

**Ne yoktu.** Tasarım ve ekran yok (`05` §5) · API sözleşmesi yok · kod tabanı yok (`01` Erişim) · kural motorunun hangi servise oturduğu ve hangi ucu okuduğu hiçbir belgede yazılı değil · Plan yazma ucunun sözleşmesi hâlâ `[UNVERIFIED]`. Aşağıdaki soruların üçü, mimariyi uydurmak yerine mimariyi sormakla başlıyor.

**Öz-inceleme.** Bu dört belgenin hiçbiri bu oturumda üretilmedi; bu koşumun girdisi yalnızca dosya yollarıydı ve zincirin önceki halkalarından hiçbir bağlam taşınmadı. Skill'in "kendi yazdığını denetleme" uyarısının istediği ayrı koşum biçimi budur; geçiş kompromize değildir.

**Malzemenin tipi.** Bu, Phase 0'ın üçüncü satırı: şekillendirilmiş **ve** puanlanmış malzeme, üstelik **dört** ayrı açık listeyle. `05`'in A01–A26 · G01–G21 · "hiç değinilmemiş" listesi · `06`'nın KŞ-12–KŞ-29 `[DECISION NEEDED]` tablosu · `08`'in V-1–V-6 ve AK-1–AK-9 tabloları · `01`'in kırk satırlık `[UNVERIFIED]` tablosu ve Faz 3'ün S1–S9'u. Hepsi tek tek tarandı.

**Çizilenler.** Ürettiğim ham sorulardan **26'sı** yukarıdaki dört listede zaten adı geçtiği için çizildi, **12'si** kaldı. Çizilen aileler, bir kere: Plan yazma ucunun koşullu yazma sunup sunmadığı (A02 / KŞ-18 / AK-8) · aynı vardiyayı iki kişinin üstlenmesi (A01, zaten DD-1 ile kesildi) · müdürün cevapsızlığı ve yokluğu (A04, A23) · yeniden yayım (A05) · bordro kesimi (A07) · elle düzeltme çakışması (A08) · onay beklerken başlayan vardiya (A09) · kural listesinin tamlığı ve gece eşiği (A11–A13) · komşu hafta (A15) · yetkinlik ve doğum tarihi verisinin kalitesi (A16, A17) · izin kayıtları (A18) · eski sürüm ve minimum sürüm (A24) · kural motorunun sorumluluğu (A26) · Plan logu atfı (G01) · ölçüt 3'ün bazı (G02) · olay parametreleri (G04) · red kaydının saklanması (G05) · push kotası ve Plan hız sınırı (G08) · yazmanın Plan tarafında ne tetiklediği (G09) · sendika bilgilendirmesi (G10) · 45 saatin ikinci hesaplayıcısı (G14) · runbook ve duyuru (G06, G07, G12) · üretim alarmı, izleme kimliği, çalıştırma maliyeti, veri yerleşimi, çevrimdışı ve erişilebilirlik (DD-10, DD-11 ve "hiç değinilmemiş" listesi). Bunlar tamlık boşluğudur, kırılma biçimi değil; burada tekrarlanmaları kalan on ikiyi gömerdi.

**Boşluk mu, sonuç mu — çizginin üstünde duran üç soru.** Q5, Q8 ve Q10 bu çizgide. Üçünde de üstteki liste bir soruyu **genel** haliyle taşıyor (G05 yalnız red metnini, G21 "geri alma planı ne" diye, DD-11 alarm eşiğini erteleyerek), verilmiş cümlenin kendisinden çıkan kırılma ise adı konmadan duruyor. Boşluğu değil, kırılmayı yazdım; okuyucu isterse üçünü de üstteki maddeye iliştirebilir.

---

## 2. Sorular, sahibine göre

### Murat Şen (Plan) + Ürün ekibi

> **Q1 · Critical — kural motoru, henüz Plan'a yazılmamış üstlenmeleri sayıyor mu?**
> KŞ-1 tekliği **vardiya** başına veriyor; DD-9 bir çalışanın kaç takas yürütebileceğini bilerek sınırlamıyor. Adım 11 ve 16'daki kontrol Plan'ı okuyor, oysa üstlenme adım 17'ye kadar Plan'a yazılmıyor.
> **Prevents:** aynı çalışanın üç ayrı vardiyayı üstlenip üçünde de "uygun" damgası alması. 45 saat tavanı ve 11 saat dinlenme kuralı tek tek geçilir, toplamda ihlal edilir — ve KŞ-3 gereği kayda *"kurallardan geçti"* diye yazılır. Bu, ürünün kapatmak için kurulduğu şeyin tersidir: ihlal artık bireysel değil, damgalı.

> **Q6 · High — kural motorunun okuması, çizelge ekranının okuduğu uçla aynı mı, ve cuma 16:00'da ne oluyor?**
> Bir takas için kural üç kez koşuyor (adım 6, 11, 16) ve D-14 gereği her koşumda **komşu haftanın** vardiyaları da çekiliyor. Yayım cuma 16:00; 9.100 çalışan çizelgesini o saatte açıyor ve `05` §2 tepe beklendiğini yazıyor.
> **Prevents:** takas özelliğinin okuma yükünün, bugün çalışan çizelge ekranını yayım dakikasında yavaşlatması. G08 yazma kotasını soruyor; buradaki yük yazma değil okuma ve takas başına yazmanın katı. Yıkım alanı takasla sınırlı kalmaz, çizelgeyi açan herkese yayılır.

### Ürün ekibi

> **Q4 · Critical — Plan olumlu döndükten sonra adım 18, 19 ya da 20 düşerse ne oluyor?**
> `08` §2 üçünün tek adım olmadığını açıkça yazıyor ve E1 ile E2'yi adım 17'ye yerleştiriyor. 17 başarılı olduktan **sonrası** için hata yolu yok. Adım 19'un yazdığı değerler (KŞ-2, KŞ-3) o an saptanır, sonradan Plan'dan türetilemez.
> **Prevents:** çizelgesi Plan'da değişmiş ama kaydı "onay bekliyor"da kalmış takas; iki tarafa bildirim gitmez, kimse bir hata görmez. Adım 19 düşerse vardiya devredilmiş olur ama hangi eşiklerle geçtiği hiçbir yerde durmaz — KŞ-3'ün on sekiz ay sonrası için kurduğu cevap, tam da denetimin bakacağı kayıtlarda boş çıkar.

> **Q7 · High — pilot mağazanın müdürü eski sürümdeyse teklif yine kuruluyor mu?**
> KŞ-10 sürüm kapısını yalnız **teklif edilen çalışan** için koyuyor. Müdürün sürümü hiçbir belgede geçmiyor; kural motoru üstlenen üzerinde koşuyor, müdürün istemcisine bakmıyor.
> **Prevents:** E13'ün ("kuyruğu kimse açmıyor") kimsenin izinli olmadığı hâli. Takas üstlenilir, onaya düşer, müdürün uygulamasında öyle bir ekran yoktur; bitiş 7'ye — süresiz açık — düşer ve pilotun ilk haftası sebebini kimse anlamadan böyle geçer.

> **Q8 · High — pilot kapatıldığında yolda olan takaslar ne oluyor?**
> D-21 geri dönüşü *"pilot kapatılır, WhatsApp yolu zaten açık"* diye veriyor. KŞ-8 ise onaylanmış takasın geri alınmasını yalnız müdürün Plan'daki elle düzeltmesine bırakıyor.
> **Prevents:** bayrağın yeni vakaları durdurup bozukları bırakması. Kapatma anında üstlenilmiş ama onaylanmamış takasların tek çıkışı kapanan ekrandır; onaylanmış olanlar Plan'da yazılı kalır ve onları geri almanın yolu, kapattığınız akışın dışındadır. G21 planın varlığını soruyor, bu satır planın **verilmiş** halinden çıkan kırılmayı soruyor.

> **Q10 · High — kural kapısının sessizce açıldığını ne gösterir?**
> DD-11 üretim alarmını erteliyor ve *"pilotun gözlemi elle yapılır"* diyor. Elle gözlemin malzemesi KŞ-7'nin yedi olayı; hepsi yalnız takas kimliği ve zaman damgası taşıyor, sebep taşımıyor.
> **Prevents:** E4'ün büyüğü. Yetkinlik verisi boş dönmeye başlar ya da kural motoru bir uçtan boş cevap alır; her takas "uygun" çıkar, hepsi onaya düşer, olay akışı sakin bir haftadan ayırt edilemez. Bu, ihlalli devrin **damgalı** olarak akmasıdır ve bulunması denetime kalır.

> **Q11 · Medium — pilot mağaza kümesini kim tanımlıyor ve yanlış mağazayı ne durduruyor?**
> D-18 kümeyi sınırlı tutuyor, DD-7 tek sayfalık yönergeyi yalnız **pilot** müdürlerine veriyor, `06` §3 dokuz kararın dilim başlamadan cevaplanmasını şart koşuyor.
> **Prevents:** kümenin, yayılma kararı verilmeden genişlemesi. Pilot kümesi bu dilimde yalnız bir kapsam değil; cevaplanmamış her kararın yıkım alanını tutan tek şey o. Yanlış yazılmış bir mağaza listesi, dokuz açık kararı aynı anda ve sessizce 480 mağazaya taşır.

### İK / hukuk

> **Q2 · Critical — teklif kurulmadığında devreden çalışana gösterilen sebep, arkadaşının hangi verisini söylüyor?**
> D-4 sebebi devreden çalışana gösteriyor; E4 ve E5 sebebi somutlaştırıyor (*"yetkinlik yetersiz"*, gece kapısı). K-1 ile teklif artık **ad verilerek** kuruluyor, yani hedef kişiyi soran belirliyor.
> **Prevents:** bir çalışanın, arkadaşının rol yetkinliğini, o hafta 45 saate ne kadar yaklaştığını, o gün vardiyası olup olmadığını ve gece kapısından — dolayısıyla 18 yaşından küçük olup olmadığını — teklif deneyerek öğrenmesi. Adresli teklifte bu tek seferlik bir kaza değil, tekrarlanabilir bir sorgudur: aynı mağazadaki herkes tek tek denenebilir.

> **Q3 · Critical — eşikleri üretimde kim değiştiriyor ve açık teklifler o an ne oluyor?**
> KŞ-11 kural setini ve eşiklerini yazılı olarak İK'nın sahipliğine veriyor; KŞ-3 damgayı *"o anda yürürlükte olan eşiklerle"* saklıyor. Değiştirme mekanizması, ikinci göz ve yürürlük anı hiçbir belgede yok.
> **Prevents:** gece penceresi ya da haftalık tavan yanlış yazıldığında ne olacağını kimsenin bilmemesi. A12 eşiğin **doğru** olup olmadığını soruyor; bu satır eşiğin **değiştirilmesini** soruyor. Adım 6'da bir eşikle kurulmuş, adım 16'da başka bir eşikle onaylanmış takas, KŞ-3'ün cevabını da kendi içinde çelişkili yapar.

> **Q5 · Critical — KŞ-2, KŞ-3 ve KŞ-6'nın yazdığı kayıt ne kadar saklanıyor ve kim okuyor?**
> KŞ-2 iki çalışanın **o haftaki toplam saatini** ve hesaplanan dinlenme aralığını yazıyor; KŞ-6 her adımı kim, ne zaman, hangi kural sürümüyle diye kayda alıyor; KŞ-3 kaydın amacını *"on sekiz ay sonra"* sorulacak soru olarak tanımlıyor.
> **Prevents:** ihtilafta delil olmak üzere kurulmuş, çalışma süresi içeren bir kişisel veri kümesinin saklama ve erişim kararı verilmeden gün birinde dolmaya başlaması. G05 ve KŞ-23 yalnız **red kaydını ve serbest metni** kapsıyor; bu kayıt ondan büyük, iki kişiyi birden kapsıyor ve reddedilmemiş takaslarda da yazılıyor.

### Selin Aydın (operasyon ve İK tarafı)

> **Q9 · High — yanlış onaylanmış bir takası kim, hangi araçla düzeltiyor?**
> KŞ-8 geri almayı yalnız müdürün Plan'daki elle düzeltmesine bırakıyor. `06` §5'te destek aracı, `01` Faz 4'te İK vaka tipi dilimin dışında; DD-7 pilot müdürüne tek sayfa veriyor.
> **Prevents:** tek çare olarak gösterilen işlemin, `08` E15'te çözülmemiş çakışmanın ta kendisi olması. Yetkinlik verisi yanlış olduğu için onaylanmış bir devri düzeltmek isteyen müdür, akışın hâlâ karara bağlanmamış tek yolunu kullanmak zorunda — ve bunu ona anlatan bir yönerge de yok.

> **Q12 · High — pilotun "işe yaradı" kararı, en sık bitişi göremeyen bir ölçümle mi veriliyor?**
> `08` §8 bitiş 7'yi *"muhtemelen en sık görülen"* diye yazıyor. KŞ-7'nin yedi olayında o bitişe karşılık gelen bir olay yok: takas `onaya_düştü`de kalır, kapanmaz, hiçbir şey atılmaz.
> **Prevents:** ölçüt 1 ve 2 yeşilken pilotun yayılma kararının verilmesi. Terk edilen takaslar paydada görünmez; süresiz açık kalan her takas, veri tarafında "onay bekliyor"dan ayırt edilemez. `08` §5 satır 3 bu ayrımı **kullanıcı** için zorunlu sayıyor; burada sorulan, aynı ayrımın **karar veren** için hiç kurulmamış olması.

---

## 3. Önce şu beşi

1. **Q1** — cevabı bir tasarım kararı ve bir sorgu; bugün bir cümle, kural motoru yazıldıktan sonra bir yeniden yazım. Yanlış olursa kanun ihlali damgalı akar.
2. **Q2** — cevabı bir ürün cümlesidir (sebep metni ne söyler), ekranlar çizilmeden bedavadır; K-1 onaya giderken Selin'in önüne aynı zarfla gitmeli.
3. **Q4** — Murat Şen'e zaten AK-8 soruluyor; bu soru aynı görüşmeye biniyor ve E1, E2, E10'un cevabıyla birlikte kapanır.
4. **Q3** — İK'nın tek masada verebileceği bir karar; verilmeden KŞ-3'ün sakladığı damga hiçbir şey kanıtlamıyor.
5. **Q7** — bir öğleden sonra ve pilot tanımında tek satır; cevaplanmazsa pilotun ilk haftası sebebi anlaşılmayan bir sessizlikle geçer.

---

## 4. Değerlendirilemeyenler

**Yıkım alanı — kısmen.** Kural motorunun hangi servise oturduğu ve okumayı hangi uçtan yaptığı hiçbir belgede yazılı değil. Q6 bu yüzden bulgu değil soru; ucun paylaşıldığı doğrulanana kadar çizelge ekranının etkilenip etkilenmediği bilinemez.

**Yetki ve kötüye kullanım — kısmen.** Müdürün kuyruğunu hangi verinin mağazasına bağladığı, oturumun nerede doğrulandığı ve istemci–sunucu yetki ayrımının Bereket Mobil'de bugün nasıl kurulduğu malzemede yok. Q2 dışında bu boyuttan somut bir şey çıkarılamadı; çalınmış cihaz senaryosu için tek bir cümle bile yok.

**Ölçek ve maliyet.** Çalıştırma maliyeti `05`'in "hiç değinilmemiş" listesinde, DD-11 onu dilim dışında bırakıyor ve hiçbir belgede çağrı başına fiyat yok. Push ve Plan kotası G08'de duruyor. Bu boyuttan Q6 dışında bir şey üretilemedi.

**Gizlilik — veri yerleşimi.** Verinin fiziksel olarak nerede durduğu, KVKK açısından hangi hukuki sebebe dayanıldığı ve bir aydınlatma metni gerekip gerekmediği hiçbir belgede geçmiyor. Q2, Q5 ve KŞ-23 bu boyutun yalnız görünen ucu; hukuki dayanağın kendisi değerlendirilemedi.

**Tespit.** DD-11 alarmı bilerek erteliyor, yani bu boyutta değerlendirilecek bir karar yok. Q10 tam olarak o ertelemenin sonucudur; ondan ötesi ölçülemedi.

**Göç ve birlikte yaşama — kısmen.** Sürüm dağılımı, minimum sürüm ve zorunlu güncelleme mekanizması `01` B39/B40'ta `[UNVERIFIED]` duruyor. Q7 yalnız KŞ-10'un **yazılı** tarafındaki deliği gösteriyor; sürümlerin gerçek dağılımına bakmadan pilotun kaç çalışanı dışarıda bıraktığı bilinemez.

---

Son bir cümle, bir kez: bu on iki sorunun hiçbiri dilimin küçültülmesini ya da işin yapılmamasını önermiyor; dokuzu, `06` §3'ün zaten "dilim başlamadan" dediği masaya bir zarf daha koyar.
