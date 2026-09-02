# Vardiya Takası — Akış Denetimi

## Taşıyıcı

**Bu akışı ben yazmadım.** Bu koşumda bana yalnız dosya yolları verildi; `08-flow-map.md`'yi yazan oturumdan hiçbir bağlam taşımıyorum ve hiçbir `*-feedback.md` açılmadı. İnceleme bu yönden temiz.

**Sayım.** 22 bulgu: **7 Critical · 11 High · 4 Medium.** Altısı sapma (S-1…S-6), on altısı akışın kendi bulgusu (F1…F16).

**Nerede ne var.**

| # | Bölüm | Ne var | Kim alır |
|---|---|---|---|
| 1 | §1 | Ne incelendi, hangi belge ölçüt alındı | Okuyan herkes |
| 2 | §2 | **Sapma: `06` ve `07`'ye karşı, iki yönde** | Selin Aydın, `flow-map` |
| 3 | §3 | Bulgular, yola göre gruplanmış | `flow-map` ilk okuyandır |
| 4 | §4 | Kapsama sayıları, yeniden sayılmış | `readiness-score`, `decision-memo` |
| 5 | §5 | Neyin sağlam olduğu, tek tek | Okuyan herkes |
| 6 | §6 | Değerlendirilemeyenler | `risk-interrogate`, `ux-grill` |

**Önce §2 ve §3'ün Critical satırları.** Sapmaların dördü onaylanmamış bir kapsam hareketidir ve kararı yazılıma değil Selin Aydın'a düşer.

**Sabit sözlük.** `06`, `07` ve `08`'in sözlüğü aynen sürüyor: *takas talebi*, *üstlenme*, *uygunluk kuralı*, *devir*, *sahip*, *dilim*, *adresli teklif*, *dokunma noktası*, *bitiş*, *yüzey*. Bu belgenin eklediği iki kelime: **sapma** = akışın, ölçüt aldığım belgeden sessizce ayrıldığı yer · **bulgu** = akışın kendi içinde kırıldığı yer. `reads` · `acts` · `emits` · `[ASSUMED]` · `[UNVERIFIED]` · `[DECISION NEEDED]` · `Critical` · `High` · `Medium` · `Rejoins at step N` · `Terminates` İngilizce kalır.

**Numaralandırma.** **S-1…S-6** sapmalar · **F1…F16** bulgular. `08`'in `B-n`, `E-n`, `V-n`, `AK-n` kimlikleri ile `06`'nın `D-n`, `KŞ-n`, `DD-n` ve `07`'nin `TB-n`, `H-n`, `E-n`, `B-n` kimlikleri aynen alıntılanıyor. `07`'nin `E-n` (kapsam eklemesi) ile `08`'in `E-n` (hata yolu) çakışıyor; bu belgede hangisi olduğu her seferinde belge adıyla yazıldı.

**Akış yeniden yazılmadı.** Hiçbir bulgu "şu adımı şöyle yaz" demiyor; her biri **kapatan kararı** ve o kararın **nereye gittiğini** söylüyor. Genel bir puan ya da yüzde de yok.

---

## 1. Ne incelendi

**Malzeme.** Adım tablosu ve düzyazı — diyagram değil. Bu iyi tarafa düşüyor: koşullar okunabildiği için beşinci (test edilemez koşul) ve sekizinci (sıra bağımlılığı) mercekler cevaplanabildi; diyagram olsaydı ikisi de cevapsız kalırdı. `08` §3 diyagramın çizilmediğini zaten yazıyor.

**Neye karşı okundu.** `06-slice.md` taşıyıcı, §1, §3, §5, §6 · `07-design-brief.md` taşıyıcı, §0, §1, §2, §7, §8, §9, §10, §11, §12. `00`, `05` ve hiçbir `*-feedback.md` açılmadı.

**Hangi belgeyi ölçüt aldım.** `06` §5 kapsamın kaydıdır; kapsam sorularında onu ölçüt aldım. `07` dilim içindeki tasarım kararlarının kaydıdır; karar sorularında onu ölçüt aldım. `07` kendini **kısmî** ilan ediyor: *"Haritalanmış bir akış olmadan yazıldı… `flow-map` koşturulduğunda bu belgenin en çok büyüyecek bölümü §7 sistem geri bildirimidir."* İlan ettiği boşluklar sapma sayılmadı — §7'nin akıştan sonra büyüyecek olması bu akışın kusuru değil, işidir. Aşağıdaki sapmaların hepsi `07`'nin **verdiği** kararlara ya da `06`'nın verilmiş `KŞ` maddelerine karşıdır. `07`'nin kendi ilan ettiği kapsam eklemeleri (`07` E-1, E-2, E-3) onaylanmamıştır ve burada kapsam olarak değil, onaysız ekleme olarak ele alındı.

---

## 2. Sapma

İki yön ayrı ayrı arandı: akışın sessizce **kapsadığı** ve sessizce **düşürdüğü**. İkincisi diyagramda boşluk bırakmaz, bu yüzden tek tek arandı.

| # | Ne yazıyordu | Akış ne yapıyor | |
|---|---|---|---|
| **S-1** | `07` E-4: dördüncü bildirim *"alınmadı"* | B2.3 geri çekme bildirimi gönderiyor | **High** — dışlananı kapsıyor |
| **S-2** | `06` KŞ-1: *"ikincisi kurulmaz"* | Bu dal ya da hata yolu hiç yok | **High** — kapsanmışı düşürüyor |
| **S-3** | `07` B-7: *"hiçbir ekranda karşı tarafın yaşı, doğum tarihi… görünmüyor"* | B1, E4, E5 düşen kuralı devredene gösteriyor | **High** — açık kararı sessizce kapatıyor |
| **S-4** | `07` E-1: çizelge ekranı girişi bir **kapsam eklemesi** | V-1'de `[ASSUMED]`, sahibi "ürün ekibi" | **High** — onay şartını düşürüyor |
| **S-5** | `07` E-3: kişi listesi ucu **onaysız ekleme** | Adım 3 `reads`, §7'den `api-needs`'e işaretsiz gidiyor | **High** — onay şartını düşürüyor |
| **S-6** | `07` H-03: *"Müdür reddi gibi sonuçlanır"* | B6 aynı soruyu `[DECISION NEEDED]` açıyor | **High** — kapalı kararı yeniden açıyor |

**S-1 · Geri çekme bildirimi.** `07` §11 bunu tartıp **almadı**: *"D-11 üç bildirim sayıyor; dördüncüsü bir ekleme olurdu… Bunun yerine teklif edilen çalışan Y-4'ü açtığında kapalı hâli görür (durum 18)."* `08` B2.3 onu bir `acts` adımı olarak akışa koyuyor ve `[ASSUMED]` ile "sonuçlandı"nın içine sayıyor (V-3). Sonuç: `api-needs` dördüncü bir bildirim ucu boyutlandırır ve kimsenin onaylamadığı bir ekleme kapsama yerleşir. Kapatan karar: dördüncü bildirim alınıyor mu — Selin Aydın.

**S-2 · İkinci açık takas.** `06` KŞ-1 verilmiş bir karardır ve `07` §8 kısıt 5'te bağlayıcı kısıt olarak, §7 durum 4'te ekran hâli olarak duruyor (*"yüzey içinde, engelleyici, mevcut takasa çıkış verir"*). `08`'de bu ne bir dal, ne bir hata yolu, ne de adım 6'nın altı kuralından biri — altı kural uygunluk kuralıdır, kimlik kuralı değil. Sonuç: kontrolü yazan kişi onu ya adım 6'ya yamalar ya hiç yazmaz; ikincisinde aynı vardiya için iki açık takas kurulur ve KŞ-1 kâğıtta kalır. Bu, düşürülmüş kapsamın tipik hâli: eksik olan şey diyagramda boşluk bırakmıyor.

**S-3 · Sebep metni ve karşı tarafın verisi.** `07` B-7 bir bitti ölçütüdür ve kesindir. `07` E-2 ise altı sebep metninden ikisinin karşı tarafın kişisel verisine dokunduğunu ve ne kadar açık yazılabileceğinin `[DECISION NEEDED]` TB-4 (İK / hukuk) olduğunu yazıyor. `08` B1 *"hangi kuralın düştüğünü devreden çalışana gösterir"* diyor, E5 aynı şeyi doğum tarihi kuralı için tekrarlıyor ve hiçbirinde işaret yok. Sonuç: metni yazan kişi "arkadaşın 18 yaşından küçük" ya da "haftalık saati doldu" cümlesini kurar ve B-7 ilk ekranda düşer. Kapatan karar: TB-4.

**S-4 · Çizelge ekranı girişi.** `07` E-1 bunu kapsam eklemesi ilan edip iki onaylayan adı yazıyor: *"Bereket Mobil çizelge ekranının sahibi + Murat Şen."* `08` §1 aynı şeyi `[ASSUMED]` yapıyor ve V-1'in sahibini "ürün ekibi" olarak veriyor. Bir varsayımın sahibi onu çürütecek kişidir; bir kapsam eklemesinin sahibi onu onaylayacak kişidir. İkincisi birinciye indirildiğinde onay şartı kaybolur ve mevcut ekrana dokunma kararı sessizce verilmiş olur.

**S-5 · Kişi seçicinin ucu.** `07` E-3: *"o adların hangi uçtan geleceği dilimde yok ve Plan'dan okunuyorsa yeni bir bağımlılıktır. Onaylayacak: Murat Şen."* `08` adım 3'ü `reads` işaretliyor, §7 bu okumayı `api-needs`'e gönderiyor ve hiçbir yerde onaysız olduğu yazmıyor. `08` §7 kendi ifadesiyle iş listesidir; oraya işaretsiz giren bir okuma, onaylanmış bir gereksinim gibi sözleşmeye yazılır.

**S-6 · Onay anında düşen kural.** `07` §0 H-03 bu satıra bir sonuç yazmış: *"Müdür reddi gibi sonuçlanır."* Bu, `07`'nin kararsız bıraktığı beş satırdan biri değil — H-02 `[DECISION NEEDED]` TB-2 taşıyor, H-03 taşımıyor. `08` B6 aynı soruyu *"Takas kuyrukta kalır mı düşer mi — yazılı değil"* diye yeniden açıyor. Karar sorularında ölçüt aldığım belge `07` olduğu için: cevap yazılı, akış onu ya kullanmalı ya gerekçesiyle reddetmeli. Bugünkü hâlinde `08`'i okuyan kişi cevabı olan bir soruda bloke olur.

---

## 3. Bulgular

| | | Bulgu |
|---|---|---|
| **F1** | **Critical** | Adım 19'un düşme yolu yok; kayıt sessizce oluşmayabilir |
| **F2** | **High** | Adım 6, 11, 16'nın koşulu bu belgeden test edilemez |
| **F3** | **High** | 14 `acts` adımının 12'sinde çift koşum sorusu sorulmadı |
| **F4** | **Medium** | Adım 2–5 sıralı yazılmış; sırayı dayatan bir şey yazılı değil |
| **F5** | **Medium** | Bitiş 1 bir kullanıcı okumasına (adım 21) bağlanmış |
| **F6** | **Critical** | B4 bitmiyor: adayları tanımlı adım değil, sonuçları yazılı değil |
| **F7** | **Critical** | B6'nın "kuyrukta kalır" adayı çıkışsız döngü |
| **F8** | **High** | Geri çekme ile üstlenme aynı anda gelirse ne olduğu yazılı değil |
| **F9** | **Critical** | E11 hiçbir bitişe ve hiçbir adıma bağlanmıyor |
| **F10** | **Critical** | E14, E15, E16: ne çıkış, ne bitiş, ne §8'de satır |
| **F11** | **Critical** | E12 ve E13, belgenin kendi *bitiş* tanımına göre bitiş değil |
| **F12** | **High** | Taşıyıcının "en sert bulgu" dediği madde §9'un karar tablosunda yok |
| **F13** | **Critical** | E1'in iki farklı sonu var; elle giriş çıkışı takası hiç kapatmıyor |
| **F14** | **High** | E18'in çıkışı tam da `[UNVERIFIED]` olan şeye dayanıyor |
| **F15** | **Medium** | §5 satır 4'ün veri şartını §6'nın olay yükü karşılayamıyor |
| **F16** | **Medium** | E8'in çıkışı `07` TB-7'ye bağlı; varsayım tablosunda yok |

### Mutlu yol

> **F1 · Critical — adım 19'un düşme yolu yok.**
> Adım 18 takası "onaylandı" işaretliyor, adım 19 onay anındaki değerleri ve kural sürümünü yazıyor. 19'a giden tek yol 18'den geçiyor ve 19'un düştüğü bir yol yazılmamış. §2'nin kendi cümlesi: bu değerler *"on sekiz ay sonra Plan'dan yeniden türetilemez"*.
> **Ne ters gider:** yazma düşer, takas herkese "onaylandı" görünür, KŞ-2/KŞ-3/KŞ-6 kaydı hiç oluşmaz. Kimse o gün bir hata görmez; soru on sekiz ay sonra sorulur ve cevapsızdır.
> **Kapatan karar:** 19 düştüğünde takas onaylı sayılır mı, yoksa 18 ile 19 tek yazma mı.
> **Nereye:** `flow-map`.

> **F2 · High — adım 6, 11 ve 16'nın koşulu test edilemez.**
> Üç adım da "altı uygunluk kuralını" koşuyor. Altı kuralın ne olduğu bu belgenin hiçbir yerinde yazılı değil; AK-9 listenin tam olup olmadığını ve gece penceresinin nerede başladığını zaten açık bırakıyor.
> **Ne ters gider:** B1, B4, B6 ve E4–E7'yi yazan kişi kuralları başka bir belgeden kendi okumasıyla türetir. Eşik seçimleri (22:00 mı 20:00 mi) koda AK-9 cevaplanmadan girer ve bir daha görünmez.
> **Kapatan karar:** yok — bu belgeye altı kuralın kimliklendirilmiş listesi eklenmeli, eşikleri `[UNVERIFIED]` kalsa bile.
> **Nereye:** liste `flow-map`'e, eşikler AK-9 sahibine (İK / hukuk).

> **F3 · High — çift koşum sorusu 14 `acts` adımının ikisinde soruldu.**
> E9 adım 12'yi, E10 adım 15–17'yi kapsıyor. Kalan on iki `acts` adımı sorulmadı. En sert olanı adım 7: adım 5'te gönderim sırasında bağlantı düşerse E19'un çıkışı *"bağlantı gelince tekrar denemek"* — ama istemci sunucunun takası kurup kurmadığını bilmiyor.
> **Ne ters gider:** iki hızlı basış ya da zaman aşımı sonrası tekrar, aynı vardiya için iki takas talebi kurar. S-2 ile birleşince kimse bunu durdurmuyor: iki kayıt, iki bildirim, müdürün kuyruğunda iki satır.
> **Kapatan karar:** adım 7'nin tekrar edilebilir olup olmadığı ve tekrarın neyi anahtar aldığı. Aynı soru 8, 13, 17, 19, 20 için de cevapsız; Plan tarafı zaten AK-8'de.
> **Nereye:** `flow-map`, sonra `api-needs`.

> **F4 · Medium — adım 2'den 5'e sıra yazılı, dayatan bir şey yazılı değil.**
> `07` §2 Y-2'yi tek yüzey ilan ediyor: *"adresli teklifte ikisi tek bir eylemdir"*. Bu belge aynı işi dört sıralı adım olarak yazıyor ve sıranın zorunlu olup olmadığını söylemiyor.
> **Ne ters gider:** dört adımı okuyan kişi üç ekranlık bir sihirbaz çizer; `07` B-5 ölçütü ("Teklif et hâlâ kaydırmasız görünüyor") o düzende ölçülemez hâle gelir.
> **Kapatan karar:** 2–5'in tek yüzeyde toplandığının burada yazılması; sıra bir gereklilik değilse öyle denmesi.
> **Nereye:** `flow-map`.

> **F5 · Medium — Bitiş 1 bir kullanıcı okumasına bağlanmış.**
> §8, Bitiş 1'i "adım 21"e bağlıyor. Adım 21 iki çalışanın çizelgeyi açmasıdır; onay adım 18'de bitiyor, bildirim 20'de gidiyor.
> **Ne ters gider:** "takas tamamlandı" durumunu yazan kişinin iki aday anı olur ve uygulamayı hiç açmayan çalışan için ikisi farklı sonuç verir. Huni ölçümünde de iki farklı payda çıkar (§6, ölçüt 3).
> **Kapatan karar:** Bitiş 1'in tetikleyicisi adım 18 mi, 21 mi.
> **Nereye:** `flow-map`.

### Dallar

> **F6 · Critical — B4 bitmiyor.**
> Uyguladığım kural: `[DECISION NEEDED]` taşıyan bir bitiş, adayları akışın tanımladığı adımlar olduğunda, her adayın sonucu yazıldığında ve sahibi adlandırıldığında tamamdır; üçünden biri eksikse dal sarkar. B4'te sahip yazılı (Selin Aydın), diğer ikisi eksik: *"teklif açık kalıp devreden çalışanın başka birine yönlendirmesi"* bu akışta tanımlı bir adım değil — yönlendirme adımı hiçbir yerde yok — ve iki adayın sonucu yazılmamış.
> **Ne ters gider:** üstlenen çalışan kural kapısında düşer ve ekranda kalır; teklifin hâlâ açık olup olmadığını iki taraf da bilmez. Teklif açık kalıyorsa aynı kişi her basışta aynı kuralla düşer ve D-6'nın geri çekme hakkının hâlâ geçerli olup olmadığı yazılı değil.
> **Kapatan karar:** kural kapısında düşen üstlenmede teklif kapanıyor mu; kapanmıyorsa geri çekme açık kalıyor mu.
> **Nereye:** AK-1 sahibi (Selin Aydın), karar gelince `flow-map`.

> **F7 · Critical — B6'nın iki adayından biri çıkışsız döngü.**
> B6'da da sahip yazılı, adayların ("kuyrukta kalır" / "düşer") sonucu yazılı değil. "Kuyrukta kalır" alınırsa müdür aynı satırı tekrar açar, adım 16 aynı kuralı tekrar koşar, aynı yere düşer; kuyruktan çıkaran hiçbir yol yazılı değil.
> **Ne ters gider:** kuyrukta hiç kapanmayan satırlar birikir ve müdür her gün aynı takası dener. E12'nin ürettiği süresiz açıklığın ikinci kaynağı budur.
> **Kapatan karar:** AK-1. Not: S-6, `07` H-03'ün bu soruya zaten *"müdür reddi gibi sonuçlanır"* cevabını yazdığını gösteriyor; karar açılmadan önce oraya bakılmalı.
> **Nereye:** AK-1 sahibi; çelişki S-6'da.

> **F8 · High — geri çekme ile üstlenme aynı anda gelirse ne olur, yazılı değil.**
> B2 geri çekmeyi *"adım 8 ile 10 arasında"* veriyor, D-6 *"üstlenilmeden önce"* diyor. Üstlenme adım 10'da başlıyor, adım 12'de yazılıyor. Aradaki aralıkta iki aktör aynı teklife aynı anda davranıyor; kimin kazandığı ve iki tarafın ne gördüğü yazılı değil. E9 yalnız aynı teklifin iki kez **üstlenilmesini** kapsıyor, geri çekme ile çarpışmayı değil.
> **Ne ters gider:** devreden çalışan "geri çektim" ekranını görürken üstlenen çalışan "üstlendin" ekranını görür; müdürün kuyruğuna sahibi geri çekmiş olduğu bir takas düşer.
> **Kapatan karar:** geri çekme hakkının kapandığı an — adım 10'un basılması mı, adım 12'nin yazılması mı.
> **Nereye:** `flow-map`; ekran tarafı `design-brief` ikinci sürümüne (`07` §7 durum 12 yalnız sakin hâli çiziyor).

### Hata yolları

> **F9 · Critical — E11 hiçbir bitişe ve hiçbir adıma bağlanmıyor.**
> *"Bitişi belirsiz"* yazıyor, §8'in sekiz satırının hiçbirinde geçmiyor ve aday bitiş yazılmamış. Sahibi yazılı (Selin Aydın, AK-2).
> **Ne ters gider:** vardiya başlamış, takas hâlâ onay bekliyor, çizelge kimin çalıştığını yanlış gösteriyor. Bu kaydın ne olacağını akış söylemediği için kodu yazan kişi ya satırı kuyrukta bırakır ya sessizce düşürür; ikisi de bir ürün kararıdır ve en sonda, tek başına verilir.
> **Kapatan karar:** AK-2.
> **Nereye:** Selin Aydın; karar gelince `flow-map`.

> **F10 · Critical — E14, E15 ve E16'nın ne çıkışı, ne bitişi, ne de §8'de satırı var.**
> Üçü de *"Çıkış: Yok"* diyor ve üçü de §8'in dışında kalıyor. Bunlar akışın içine yazılmış yollardır; sonuçları başka bir belgeye devredilmiş değil, hiç yazılmamış.
> **Ne ters gider:** üçü de takası, kaydı ve çizelgeyi tutarsız bırakıyor ve hiçbirinde kaydın son hâli belli değil. E16'da sonuç bordronun yanlış ödemesidir — ürünün kapatmak için kurulduğu şeyin ta kendisi.
> **Kapatan karar:** AK-5, AK-6, AK-7. Kararlar gelene kadar §8'e "bitişi yazılmamış" satırı eklenmeli: bugün sekiz bitiş tam kapsama gibi okunuyor.
> **Nereye:** karar sahipleri (Murat Şen + Selin Aydın, ürün ekibi, bordro ekibi). Çarpışmanın üretimdeki şekli — hangi sıklıkta, hangi hacimde — `risk-interrogate`'in sorusudur, burada cevaplanmadı.

> **F11 · Critical — E12 ve E13, belgenin kendi tanımına göre bitiş değil.**
> Taşıyıcı *bitiş*i tanımlıyor: *"akışın bittiği ve kimsenin sırada beklemediği yer"*. E12 ve E13'te müdür sıradadır: kuyrukta bekleyen bir satır ve cevap bekleyen iki çalışan vardır. §8 ikisini de Bitiş 7'ye ("terk") yazıyor. Bitiş 7 yalnız E17 için doğrudur; orada gerçekten kimse beklemiyor.
> **Ne ters gider:** üstlenme ile onay arasındaki pencerenin bir bitişi olduğu sanılır. Yoktur — takas ne ilerler ne düşer, D-6 geri çekmeyi çoktan kapatmıştır ve iki çalışan vardiyayı kimin çalışacağını bilmeden kalır. Bu, akışın en sık karşılaşılacak hâli olabilir.
> **Kapatan karar:** AK-3 ve AK-4; ayrıca `07` TB-1 — üstlenme ile onay arasında taraflardan biri vazgeçebilir mi.
> **Nereye:** Selin Aydın; §8'in Bitiş 7 satırı da düzeltilmeli (`flow-map`).

> **F12 · High — taşıyıcının "en sert bulgu" dediği madde §9'un karar tablosunda yok.**
> Taşıyıcı şunu yazıyor: *"üstlenildikten sonra, müdür onaylamadan önce hiçbir tarafın çıkışı yok… Bu bir tuzaktır ve dilim başlamadan kapanmalıdır."* AK-1'den AK-9'a kadar bu soruyu taşıyan satır yok. AK-3 ve AK-4 müdürün cevapsızlığını soruyor, tarafların çıkışını değil.
> **Ne ters gider:** §9'u alan `readiness-score` ve `decision-memo` bu maddeyi hiç görmez. Uyarı düzyazıda kalır, karar listesine girmez ve dilim onunla başlar.
> **Kapatan karar:** yok, sahibi zaten yazılı: `07` §12 TB-1, Selin Aydın. §9'a bir satır olarak eklenmesi yeterli.
> **Nereye:** `flow-map`.

> **F13 · Critical — E1'in iki farklı sonu var, ve elle giriş çıkışı takası hiç kapatmıyor.**
> §4, E1 için *"Rejoins at step 15"* diyor; §8 aynı yolu Bitiş 6 olarak sayıyor. İkisi aynı anda doğru olamaz. Dahası E1'in ikinci çıkışı *"olmuyorsa bugünkü yol — Plan'a elle giriş"*: müdür çizelgeyi Plan'da elle düzeltir, ama takas kaydı uygulamada "onay bekliyor" olarak durur ve onu kapatan hiçbir adım yazılı değil.
> **Ne ters gider:** vardiya Plan'da el değiştirmiş, uygulamada takas hâlâ açık. İki çalışan durumu yanlış okur, müdürün kuyruğunda kapanmayan bir satır kalır ve kayıt E15'in tanımsız çarpışmasına düşer.
> **Kapatan karar:** E1 bir bitiş mi, 15'e dönüş mü; ve müdür elle girdiğinde açık takasın ne olduğu (AK-6).
> **Nereye:** çelişki `flow-map`'e, elle giriş AK-6 sahibine.

> **F14 · High — E18'in çıkışı tam da `[UNVERIFIED]` olan şeye dayanıyor.**
> Çıkış *"ekranı yenilemek"*. Aynı satır mevcut ekranın önbelleğinin bu yazmayı nasıl gördüğünün doğrulanmadığını söylüyor; `07` §8 kısıt 16 aynı şeyi `[UNVERIFIED]` işaretliyor.
> **Ne ters gider:** önbellek yazmayı görmüyorsa yenileme eski değeri getirir ve *"Rejoins at step 21"* çıkışsız bir döngüye döner. Çalışan "onaylandı" bildirimini almışken çizelgede eski vardiyayı görür ve takasın olmadığını sanır — yani vardiyaya gelir ya da gelmez, ikisi de yanlış olabilir.
> **Kapatan karar:** önbellek davranışının doğrulanması (Murat Şen). Doğrulanana kadar E18'in çıkışı çıkış sayılmamalı.
> **Nereye:** doğrulama Murat Şen'e; işaretleme `flow-map`'e.

> **F15 · Medium — §5 satır 4'ün veri şartını §6'nın olay yükü karşılayamıyor.**
> §5, E4 ile E5'in *"denetim izinde ve olay verisinde"* ayrılmasını şart koşuyor. §6'daki yedi olayın hepsi yalnız takas kimliği ve zaman damgası taşıyor, sebep alanı yok, ve teklifin hiç kurulmaması için (B1) hiç olay atılmıyor. İki bölüm birbirini görmüyor.
> **Ne ters gider:** şartı okuyan kişi olay şemasına bir sebep alanı ekler ya da eklemez; ikisi de bu belgeden savunulabilir. KŞ-22'nin veri kalitesi sorusu ölçülemeden kalır.
> **Kapatan karar:** ayrımın nerede tutulacağı — olay yükünde mi, denetim izinde mi.
> **Nereye:** `data-model` ve `api-needs`; ölçümün tanımı KŞ-25 sahibine (Selin Aydın).

> **F16 · Medium — E8'in çıkışı `07` TB-7'ye bağlı ve varsayım tablosunda yok.**
> E8'in çıkışı *"uygulamayı açıp takas durumunu görmek"*. `07` §12 TB-7 bildirimin uygulamayı ilgili yüzeye açıp açamadığını açık bırakıyor; §9'un V-2'si yalnız push altyapısının varlığını varsayıyor, yönlendirmeyi değil.
> **Ne ters gider:** bildirim uygulamayı ana ekrana atarsa çalışan teklifi bulmak için nereye gideceğini bilmez. `07` §9 dışlama 6 "Takaslarım listesi yok" diyor ve her takasa kendi vardiyasından ya da bildiriminden gidiliyor; bildirim yönlendirmiyorsa iki girişten biri yok demektir.
> **Kapatan karar:** TB-7 (mobil ekip).
> **Nereye:** `design-brief` ikinci sürümü.

---

## 4. Kapsama

Aşağıdaki sayılar tablolardan tek tek yeniden sayıldı, üstlerindeki iddiadan alınmadı.

- **21 mutlu yol adımı · 6 dal · 19 hata yolu · 8 bitiş satırı** — dördü de tutuyor.
- **İşaretler:** `reads` 10 · `acts` 14 · `emits` 6 = **30 işaret, 24 adımda**. Bağımsız sayımda birebir çıktı; mutlu yolda 19/16, dallarda 9/6, hata yollarında 2/2 dağılımı da doğru.
- **14 `acts` adımının 2'sinde** çift koşum sorusu soruldu (E9 → adım 12, E10 → adım 15–17). Kalan 12'sinde sorulmadı (F3).
- **19 hata yolunun 13'ü** bir çıkış veriyor; **6'sı** çıkışı "yok" ya da "yazılı değil" diyor (E11, E12, E13, E14, E15, E16).
- **19 hata yolunun 4'ü** (E11, E14, E15, E16) hiçbir bitişe ve hiçbir adıma bağlanmıyor. §8'in sekiz bitişi bu dördünü kapsamıyor.
- **8 hata yolu `[DECISION NEEDED]` taşıyor** — §8'in iddiası doğru. Bitişlerden ikisinin açık karara bağlı olduğu iddiası da doğru (Bitiş 2 ve 8).

**Düşen iddia.** §4'ün başlığı *"yedi soru 21 adımın hepsine tek tek koşuldu"* diyor. Adım 19'un düşme yolu yok (F1) ve adım 7'nin çift koşum sorusu sorulmamış (F3); ikisi de o yedi sorunun içinde. İddia toplamda değil, süpürmenin kendisinde düşüyor.

---

## 5. Neyin sağlam olduğu

Aşağıdakiler uygulanıp temiz çıkan merceklerdir; uygulanamayanlar §6'da, ve ikisi aynı şey değil.

1. **Sayım doğrulanabilir kurulmuş.** İşaretler adım numaralarıyla verildiği için 30/24 bağımsız olarak yeniden hesaplanabildi ve tuttu. Çoğu akış yalnız toplamı yazar ve toplam kontrol edilemez.
2. **Adım 17, 18, 19 ayrı tutulmuş** ve neden ayrı tutulduğu yazılmış. Birleştirilmiş tek bir adım E1 ile E2'yi görünmez yapardı; bu, dördüncü merceğin (varsayılan başarı) en sık düştüğü yerdir ve burada düşmemiş.
3. **Adım 6 ile 11/16 ayrımı KŞ-4'e sadık.** Teklif kapısının bir yetki mekanizması olmadığı açıkça yazılmış; bu ayrımı kaybeden bir akış kural kontrolünü tek yere indirirdi.
4. **§5 tablosu (ayırt edilmesi zorunlu hatalar) mevcut** ve satır 3 kendi aleyhine yazılmış: *"Satır 3 bugün sağlanmıyor."* Bu tabloyu taşıyan akış azdır.
5. **§6 eksik olayları yazmış, yeni olay icat etmemiş.** `düştü`nün iki bitişi ayırmadığı ve yükün mağaza kırılımını taşımadığı açıkça duruyor.
6. **E17 dokuzuncu merceği kapatıyor:** teklif gönderilmeden terk edildiğinde elde ne kaldığı yazılı ("hiçbir şey; kayıt kurulmadı").
7. **E9, DD-1'in sonucunu hata yoluna kadar taşımış** — A01'in bu dilimde oluşamayacağını ve havuz geri gelirse yolun yeniden yazılacağını söylüyor. Kesimin sonucunu bu kadar aşağı taşıyan belge az.
8. **Her dal `Rejoins at step N` ya da `Terminates` ile bitiyor.** Parmak testi bu yüzden dakikalar sürdü; sarkan dalların tespiti de bu sayede kesin.
9. **B4, `07` TB-2 ile aynı yeri açık bırakıyor.** İki belge burada çelişmiyor; aynı boşluğu aynı sahiple işaretliyorlar.
10. **Oran sağlam:** 21 mutlu adıma karşı 19 hata yolu. Huninin ilk kaybının ölçülemediği de (§3 B1 notu) ayrıca yazılmış.

---

## 6. Değerlendirilemeyenler

- **Altı uygunluk kuralının içeriği.** Bu belgede yok; `05-request-shaper.md` bu koşumda bana verilmedi. F2 sorunun akış tarafını yazıyor, kuralların doğruluğunu ya da tamlığını değerlendirmedim.
- **Talebin kendisinden sapma.** `00-talep.md` açılmadı. Sapma yalnız `06` §5 kapsamına ve `07`'nin verilmiş kararlarına karşı arandı; talebin `06`'da temsil edilmeyen bir maddesi varsa bu belge onu göremez.
- **Plan ucunun koşullu yazma sunup sunmadığı** (AK-8 / KŞ-18). Belgeden cevaplanamaz; Murat Şen ve `risk-interrogate`.
- **E14, E15, E16'nın üretimdeki sıklığı ve hacmi.** Bunların bitişsiz olduğunu burada yazdım; dünyada ne sıklıkta olduklarını `risk-interrogate` sorar.
- **Ekran metinleri, rütbe, tasarım sistemi.** `ux-grill` ve `design-brief`'in işi; bu belge yalnız akışın onlara ne bıraktığını söyledi (F4, F8, F16).
- **Diyagram yok.** `08` §3 çizilmediğini yazıyor. Bu bir eksiklik olarak sayılmadı: adım tablosu koşulları okunabilir kıldığı için beşinci ve sekizinci mercekler cevaplanabildi, diyagramla cevaplanamazdı.
