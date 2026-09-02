# Vardiya Takası — Veri Modeli (ilk dilim)

## Taşıyıcı

**Bu belge ürün kararıdır, şema değildir.** Tip, uzunluk, dizin, motor, göç, tablo adı yok. Bunları yazan kişi bir kararı uyguluyor olsun diye yazıldı, kararı kendisi versin diye değil.

**Kapsam `06-slice.md` §5'tir.** Havuz, red sebebi listesi, otomatik onay, iki bacaklı takas, uygulama içi iptal yok.

**Sayım.** 10 varlık · 5'i akış içinde doğuyor, 5'i dışarıdan geliyor · Phase 4'ün dört süpürmesinde **11 uyuşmazlık** (U-1…U-11) · süpürme dışı **4 bulgu** (B-1…B-4) · dilimin dışına çıkan **6 alan** (EK-1…EK-6) · **9 `[DECISION NEEDED]`**.

**Nerede ne var.**

| # | Bölüm | Ne var | Kim alır |
|---|---|---|---|
| 1 | §1 | 10 varlık, beşer soruyla | `api-needs` ilk okuyandır |
| 2 | §1 başı | Kimlik kuralları, tek tabloda | `api-needs`, `build-context` |
| 3 | §2 | Kural taşıyan bağlar ve **yasakladıkları** | `api-needs`, `risk-interrogate` |
| 4 | §3 | Saklanan mı hesaplanan mı | `api-needs`, `build-context` |
| 5 | §4 | Akışa karşı kontrol, 11 uyuşmazlık | `flow-grill`, `api-needs` |
| 6 | §5 | **Dilimin dışına çıkan alanlar, onaylayanlarıyla** | Selin Aydın, `readiness-score` |
| 7 | §7 | Açık kararlar, sahipleriyle | `decision-memo`, `readiness-score` |

**`api-needs` için kestirme:** §1 başındaki kimlik tablosu, §3 ve §4. Beş sorunun gövdesi (§1) sözleşme yazmak için gerekmiyor.

**Ne okudum.** `08-flow-map.md` tamamı · `06-slice.md`'nin taşıyıcısı, §0 aday listesi, §3 kesilemeyenler, §5 dilim, §6 dilim dışı · `05-request-shaper.md`'nin taşıyıcısı, §2 kullanıcılar, §3 davranış ve kurallar, §4 veri ve bağımlılıklar, §5 durumlar. `*-feedback.md` dosyaları ve `04b-*` bu koşumda verilmedi, açılmadı. `BULGULAR.md` verilmedi, açılmadı.

**Sabit sözlük.** `05`, `06` ve `08`'in sözlüğü aynen sürüyor: *takas talebi*, *üstlenme*, *uygunluk kuralı*, *devir*, *sahip*, *dilim*, *adresli teklif*, *dokunma noktası*, *bitiş*. Bu belgenin eklediği dört kelime:

- **varlık** = sistemin hatırlamak zorunda olduğu, akıştan uzun yaşayan şey
- **kimlik kuralı** = iki kaydın aynı şey sayılmasını belirleyen cümle
- **dışarıdan gelen** = bu akışta hiçbir adımın yaratmadığı, başka sistemden alınan varlık
- **ek** = akıştan çıkan ama `06` §5'te yazmayan alan; onaylayanı yazılı

`reads` · `acts` · `emits` · `[ASSUMED]` · `[UNVERIFIED]` · `[DECISION NEEDED]` işaretleri İngilizce kalır.

**Numaralandırma.** Bu belgenin kendi kimlikleri: **U-1…U-11** uyuşmazlıklar · **B-1…B-4** süpürme dışı bulgular · **EK-1…EK-6** dilim dışına çıkan alanlar · **VK-1…VK-9** bu belgenin açtığı kararlar. Varlıklar numaralandırılmadı; adlarıyla anılıyorlar (`08`'in `E-n` ve `B-n`'leriyle çakışmasın diye).

**Bir uyarı, en başta.** Bu modelin en sert bulgusu bir alanın eksikliği değil, bir adın fazlalığı: **çekirdek kayıt malzemede dört ayrı adla geçiyor** (*takas talebi*, *takas*, *teklif*, *devir*) ve bu özensizlik bir modelleme kararını saklıyor. `08` B4'ün açık kararı (`AK-1`) teklifin düşüp düşmediğini soruyor; cevap "düşmez, başkasına yönlendirilebilir" olursa *teklif* ile *takas talebi* iki ayrı varlıktır ve dört ad rastgele değil, iki şeyin karışmasıdır. Kod yazılmadan önce bu ad seçilmeli — VK-1.

**İkinci uyarı.** `06` KŞ-3'te geçen *on sekiz ay* bir soruyu örneklemek için yazılmış, saklama süresi olarak kararlaştırılmamış. Bu belge onu süre saymadı ve bir süre uydurmadı. **Onay anı kaydının** saklama süresini ürün belirlemez; 4857, TİS ve bordro denetimi belirler. Sahibi İK / hukuk (VK-4).

---

## 0. İsimler nereden geldi

Beyin fırtınası yapılmadı. `08` §7'nin işaretli adımları tek tek okundu: **10 `reads` · 14 `acts` · 6 `emits`**, artı `08` §6'nın olay yükleri. Bir adımın dokunduğu isim alan, birkaç adımın dokunduğu ve akıştan uzun yaşayan isim varlık sayıldı.

| # | Adım | Çıkan isim | Alan mı varlık mı |
|---|---|---|---|
| 1 | 1, 21, E18 | Vardiya, hafta yayımı | Varlık (ikisi de dışarıdan) |
| 2 | 3 | Çalışan, mağaza | Varlık (ikisi de dışarıdan) |
| 3 | 6, 11, 16 | Uygunluk kural seti sürümü | Varlık (dışarıdan, İK sahipli) |
| 4 | 6, 11, 16 | Rol yetkinliği, doğum tarihi | Alan — Çalışan'ın |
| 5 | 4, 9, 14 | Not (140 karakter) | Alan — Takas talebi'nin |
| 6 | 7 | Takas talebi, teklif | Varlık; ayrı mı değil mi VK-1 |
| 7 | 7, 12, 18, B2.2, B3.2, B5.3 | Denetim izi kaydı | Varlık (KŞ-6) |
| 8 | 12 | Üstlenme | Alan — Takas talebi'nin |
| 9 | 19 | Onay anı kaydı | Varlık (KŞ-2, KŞ-3) |
| 10 | B5.3 | Red kaydı, zorunlu serbest metin | Varlık; ayrı mı değil mi VK-5 |
| 11 | 8, 13, 20, B2.3, B3.3, B5.4 | Bildirim | **Varlık değil** |
| 12 | 17 | Plan'daki vardiya–çalışan eşlemesi | Varlık değil; Vardiya'nın alanı, Plan'da |

**11. satır bilerek boş.** `08`'in bildirim adımları `acts` işaretli, ama yazdıkları bir şey yok: push altyapısına söylüyorlar. Söylemek de bir `acts`'tir ve içine yazacak bir varlık **icat edilmedi**. Gönderim kaydı, açılma oranı, yeniden gönderme kuyruğu bu dilimde yoktur; D-11 bildirimlerin gitmesini istiyor, kaydedilmesini değil.

**12. satır da öyle.** Adım 17 Plan'a yazar. Yazdığı yer bu sistemin varlığı değil, Plan'ın vardiya kaydıdır. Bu akış onun bir alanını değiştirir ve o alanın sahibi Murat Şen'dir.

---

## 1. Varlıklar

**Kimlik kuralları, tek tabloda.** `api-needs` bu tabloyu alır; altındaki gövdeyi almak zorunda değil.

| # | Varlık | İki kayıt ne zaman aynı şeydir | Durum |
|---|---|---|---|
| 1 | Takas talebi | Kendi kimliğiyle; aynı vardiya için aynı anda tek açık kayıt | KŞ-1 |
| 2 | Teklif | Takas talebiyle bire bir; ayrılırsa kendi kimliğiyle | `[DECISION NEEDED]` VK-1 |
| 3 | Onay anı kaydı | Onaylanmış takas talebiyle bire bir | Bu belge |
| 4 | Denetim izi kaydı | Kendi kimliğiyle; hiçbir iki kayıt birleşmez | KŞ-6 |
| 5 | Red kaydı | Reddedilmiş takas talebiyle bire bir | Bu belge |
| 6 | Vardiya | Plan'daki vardiya kimliği | KŞ-1, ama VK-2 |
| 7 | Çalışan | Plan / İK'daki çalışan kimliği | `[ASSUMED]`, VK-3 |
| 8 | Mağaza | Plan'daki mağaza kimliği | `[ASSUMED]` |
| 9 | Hafta yayımı | Mağaza + hafta + yayım sırası | `[DECISION NEEDED]` VK-2 |
| 10 | Uygunluk kural seti sürümü | Sürüm etiketi; sürüm yerinde değişmez | KŞ-3, KŞ-11 |

---

### Takas talebi

**Kimlik:** Kendi kimliğiyle tekildir. KŞ-1 bir tekillik kuralı veriyor, kimlik kuralı değil: *bir vardiya için aynı anda yalnız bir **açık** takas talebi bulunabilir.* Kapanmış bir takasın ardından aynı vardiya için yenisi kurulabilir ve o **yeni bir kayıttır** — `08` B3 bunu açıkça yazıyor ("bu akışın yeniden başlaması, buraya dönüş değil"). Sonuç, ölçüm tarafına düşüyor: bir vardiya için üç deneme, ölçüt 1'de üç takas talebidir, bir tane değil.

**Sahiplik:** Devreden çalışanın. Üstlenen çalışan ve müdür kayıtta görünür ama sahibi değildir. Çalışan işten ayrılınca kaydın ne olacağı yazılı değil — `[DECISION NEEDED]` VK-4, İK / hukuk. Onay anı kaydıyla çatışıyor: biri silinmeyi, diğeri saklanmayı istiyor (§2, R-8).

**Yaşam döngüsü:** adım 7 kurar · adım 12 (üstlenme), adım 18 (onay), B2.2, B3.2, B5.3 durumunu değiştirir · bitişi sekiz yoldan biri (`08` §8). **Bitiş 7 — terk — bir durum değil, durumun hiç değişmemesidir.** DD-9 teklife süre koymuyor; bu kayıt kendiliğinden kapanmaz.

**Kopya mı referans mı:** Vardiya referans · devreden ve üstlenen çalışan referans · mağaza referans (Vardiya üzerinden) · **not (140 karakter) kopya** — yazıldığı andaki metindir, sonradan değişmez, çünkü üstlenen çalışan onu okuyup karar verdi (adım 9). İki tarafın **adı** için cevap yazılı değil; adımlar 9 ve 14 adı ekranda gösteriyor, KŞ-2 adı saklananlar listesine koymuyor — EK-2.

**Varoluş:** Bir takas talebi vardiya, devreden çalışan ve teklif edilen çalışan olmadan var olamaz. Üstlenen olmadan var olabilir (henüz üstlenilmemiştir), müdür kararı olmadan var olabilir. **Var olamayacağı bir hâl daha:** `05` §3.3 *"Müdürün kendi vardiyası takasa girmiyor"* diyor, ama altı uygunluk kuralının hiçbiri bunu kontrol etmiyor ve `08`'de bunu koşan bir adım yok — B-2.

---

### Teklif

**Kimlik:** Bu dilimde takas talebiyle bire birdir; adresli teklif tek kişiye gidiyor (D-2, DD-1). Ayrı bir kimliği olması gerekip gerekmediği `08` B4'ün açık kararına bağlı: kural kapısında düşen üstlenmeden sonra teklif kapanıp takas talebi açık kalırsa, bir takas talebi zaman içinde **birden çok teklif** taşır ve teklif ayrı bir varlıktır. `[DECISION NEEDED]` **VK-1 · Selin Aydın · dilim başlamadan.** Bu bir isimlendirme tartışması değil: cevabı, `08` §6'daki `teklif_edildi` olayının hangi şeyi işaret ettiğini de belirliyor (bugün yalnız takas kimliği taşıyor, yani ikinci teklif ölçümde birinciden ayırt edilemez).

**Sahiplik:** Devreden çalışanın; teklif edilen çalışan alıcıdır, sahibi değil.

**Yaşam döngüsü:** adım 7 kurar · adım 12 (üstlenildi), B2.2 (geri çekildi), B3.2 (geri çevrildi) kapatır · B4 sonrası ne olduğu VK-1'e bağlı.

**Kopya mı referans mı:** Teklif edilen çalışan referans. Ayrı varlık olursa teklif anındaki kural sonucu kopya olmalı, yoksa "neden bu kişiye teklif edildi" sorusu cevapsız kalır.

**Varoluş:** Bir teklif tek bir kişiye gider. Havuz olmadığı için alıcısız teklif yoktur (DD-1).

---

### Onay anı kaydı

Dilimin en pahalı ve en kolay kaçırılan varlığı. `08` adım 19 bunu ayrı bir `acts` olarak yazıyor ve gerekçesini de veriyor: *"on sekiz ay sonra Plan'dan yeniden türetilemez."*

**Kimlik:** Onaylanmış bir takas talebiyle bire birdir. Bir takas talebi en fazla bir onay anı kaydı taşır; onaylanmamış takasın kaydı yoktur.

**Sahiplik:** Kimsenin değil — kurumun. Devreden çalışan ayrılsa da bu kayıt bir uygunluk kanıtıdır. **Saklama süresini ürün belirlemez.** `06` KŞ-3'te geçen *on sekiz ay* bir soruyu örnekliyor, bir süreyi kararlaştırmıyor; gerçek süreyi 4857, TİS ve bordro denetimi belirler. `[DECISION NEEDED]` **VK-4 · İK / hukuk · dilim başlamadan.** Çalışanın silinme talebiyle bu saklama yükümlülüğü çarpışır ve çarpışmayı bu belge çözemez.

**Yaşam döngüsü:** adım 19 yaratır · **hiçbir şey değiştirmez** · sonu yalnız saklama süresidir. Değiştireni olmadığı için bu bir kayıt değil, bir kütüktür; ikisi farklı şeyler ister.

**Kopya mı referans mı — burası alan alan cevaplanır, çünkü varlığın bütün anlamı burada:**

| # | Alan | Kopya / referans | Neden |
|---|---|---|---|
| 1 | Vardiyanın başlangıç–bitiş saati | Kopya | Vardiya sonradan kaydırılabilir |
| 2 | Mağaza | Kopya | Çalışan mağaza değiştirebilir |
| 3 | Rol | Kopya | Yetkinlik verisi düzeltilebilir (KŞ-22) |
| 4 | İki tarafın o haftaki toplam saati | Kopya | Hesaplanmış değer, kaynağı değişir |
| 5 | Hesaplanan dinlenme aralığı | Kopya | Aynı gerekçe; komşu hafta değişebilir |
| 6 | Kural setinin sürümü | **Referans** — değişmez sürüme | KŞ-3; sürüm yerinde değişmiyorsa güvenli |
| 7 | Yürürlükteki eşikler | Kopya | KŞ-3'ün açık talebi |
| 8 | Takas talebi | Referans | Aynı kaydın iki yüzü |
| 9 | İki tarafın adı | **Yazılı değil** | EK-2 |

6. satır bir koşula bağlı: İK bir kural setini yerinde düzeltirse referans sessizce geçmişi yeniden yazar. KŞ-11 sahipliği İK'ya veriyor, sürümlerin değişmezliğini yazmıyor — VK-6.

**Varoluş:** Yukarıdaki 1–7 olmadan var olamaz. **Ama bir sıra sorunu var:** adım 18 takası "onaylandı" işaretliyor, adım 19 kaydı yazıyor. Aradaki aralıkta onaylanmış ama kaydı olmayan bir takas vardır — B-4.

---

### Denetim izi kaydı

**Kimlik:** Kendi kimliğiyle. Hiçbir iki giriş birleştirilmez, hiçbiri güncellenmez. Aynı takas için birden çok giriş normaldir ve beklenendir.

**Sahiplik:** Kurumun. Kişiyi işaret eder ama kişinin değildir. Saklama süresi VK-4'ün içinde.

**Yaşam döngüsü:** adımlar 7, 12, 18 ve B2.2, B3.2, B5.3 yaratır · **değiştiren yok** · sonu saklama. Bu bir kütüktür, `08` §2'nin de dediği gibi ayrı bir adım değil, her `acts`'in yanında.

**Kopya mı referans mı:** Aktör referans, zaman kopya, **kural seti sürümü kopya** (KŞ-6 "hangi kural sürümüyle" diyor), takas talebi referans. Aktörün o anki adı ve rolü yazılı değil; on sekiz ay sonra "kim onayladı" sorusunun cevabı bugünkü ada bakıyorsa geçmiş yeniden yazılıyor — EK-2 bunu da kapsıyor.

**Varoluş:** Aktör, zaman, olay türü ve kural sürümü olmadan var olamaz. KŞ-6'nın saydığı olaylar: açılma, teklif, üstlenilme, onay, red. **Saymadığı:** kural kapısında düşen deneme (B1, B4, B6). Bu bir eksik değil, bir karar boşluğu — B-3.

---

### Red kaydı

**Kimlik:** Reddedilmiş takas talebiyle bire bir. Red bir bitiştir (`08` Bitiş 5), tekrarlanmaz.

**Sahiplik:** Müdürün yazdığı metin, ama sahibi müdür değil. `06` KŞ-23 açık: *ne kadar saklanır, kim görür.* `[DECISION NEEDED]` **VK-5 · İK / hukuk.** Bu, red kaydının takas talebinin bir alanı mı ayrı bir varlık mı olduğunu da belirler: serbest metin takasın geri kalanından **farklı bir süre** saklanacaksa ayrı tutulmak zorundadır. Bu belge ayrı varlık sayıp kararı açık bıraktı; birleştirme her zaman mümkün, ayırma sonradan bir göç.

**Yaşam döngüsü:** B5.3 yaratır · değiştiren yok · sonu VK-5'e bağlı.

**Kopya mı referans mı:** Müdür referans, serbest metin kopya (yazıldığı hâliyle), zaman kopya.

**Varoluş:** Zorunlu serbest metin olmadan var olamaz (D-8, K-2 sebep listesini kesti). Boş metinle red kabul edilmez — bu bir `NOT NULL` değil, müdürün gerekçe yazmasını zorunlu kılan bir ürün kararıdır ve tartışılabilir.

---

### Vardiya — dışarıdan gelen

**Kimlik:** Plan'daki vardiya kimliği (KŞ-1). **Bu kimliğin yeniden yayımda korunup korunmadığı doğrulanmadı.** Korunmuyorsa KŞ-1'in bütün tekillik kuralı çöker: yeniden yayımlanan hafta, açık takasların işaret ettiği vardiyaları yeni kimliklerle üretir ve takaslar hiçbir yere bağlı kalmaz. `[DECISION NEEDED]` **VK-2 · Murat Şen · dilim başlamadan** (`08` AK-5 / E14'ün modeldeki yüzü).

**Sahiplik:** Plan'ın, Murat Şen'in. Bu sistem onu yaratmaz, silmez, sahiplenmez.

**Yaşam döngüsü:** **Yaratanı bu akışta yok** — dışarıdan gelen bir bağımlılık. Adım 17 tek bir alanını değiştirir: vardiya–çalışan eşlemesi. Sonu Plan'ın.

**Kopya mı referans mı:** Bu modelde referans. Kopyaları yalnız Onay anı kaydında yaşar ve orada bilerek donmuştur.

**Varoluş:** Bu sistemin sözü yok. Ama bir kısıt var: `05` §3.5 geriye dönük takası kapatıyor, yani takasa açılabilen vardiya **henüz başlamamış** olmalı. Bu bir okuma anı kuralıdır ve `08` E11 onay beklerken başlayan vardiyayı açık bırakıyor (AK-2).

---

### Çalışan — dışarıdan gelen

**Kimlik:** `[ASSUMED]` Plan / İK'daki çalışan kimliği. Ayrılıp geri dönen bir çalışanın aynı kimliği alıp almadığı yazılı değil; almıyorsa geçmiş takaslar iki farklı kişiye dağılır. `[DECISION NEEDED]` **VK-3 · İK.**

**Sahiplik:** İK'nın. Ayrılma, silme ve saklama VK-4'te.

**Yaşam döngüsü:** Yaratanı bu akışta yok. Bu akış hiçbir alanını değiştirmez; yalnız okur.

**Kopya mı referans mı:** Referans. Okunan alanlar ve durumları:

| # | Alan | Hangi kural | Durum |
|---|---|---|---|
| 1 | Mağaza | Kural 1 | Anlık okunur; devir sırasında değişebilir (R-6) |
| 2 | Rol yetkinliği | Kural 2 | Kalitesi doğrulanmamış — KŞ-22, `08` E4 |
| 3 | Doğum tarihi | Kural 6 | Kaynağı yazılı değil — A17; boşsa kapı kapalı (KŞ-9) |
| 4 | Haftalık toplam saat | Kural 3 | Hesaplanır, saklanmaz (§3) |
| 5 | Uygulama sürümü | KŞ-10 | **Hiçbir varlıkta yok** — U-1, EK-1 |

**Varoluş:** Bu sistemin sözü yok. Ama 3. satır bir varoluş kuralını ortaya çıkarıyor: bir Çalışan **doğum tarihi olmadan var olabilir** ve KŞ-9 bunu bir hata değil, bir kapı olarak ele alıyor. Model tarafındaki sonuç: doğum tarihinin boşluğu bir eksik veri değil, bir sonuçtur.

---

### Mağaza — dışarıdan gelen

**Kimlik:** `[ASSUMED]` Plan'daki mağaza kimliği.

**Sahiplik:** Plan'ın. Bu akış hiçbir alanını değiştirmez.

**Yaşam döngüsü:** Yaratanı bu akışta yok.

**Kopya mı referans mı:** Referans; Onay anı kaydında kopya (§1, alan 2).

**Varoluş:** Bu sistemin sözü yok. **İki alanı bu akışın okuması gerekiyor ve ikisi de yazılı değil:** pilot kümesine üyelik (D-18, V-6) ve müdürü kim (KŞ-5). İkincisi bir bağ ve §2 R-7'de. Birincisi EK-6.

---

### Hafta yayımı — dışarıdan gelen

Bu belgenin en tartışmalı varlığı ve **tidy olsun diye eklenmedi.** Adım 1 *"yayımlanmış haftasının çizelgesini"* okuyor ve `08` E14 haftanın yeniden yayımlanmasını bir hata yolu olarak yazıyor. Bugünkü modelde bir takas talebi **hangi yayıma karşı kurulduğunu söylemiyor**; söylemediği için E14 tespit bile edilemez. `08` E14'ün kendi cümlesi bunu zaten söylüyor: *"kimse bir hata görmüyor."*

**Kimlik:** Mağaza, hafta ve yayım sırası. Sıra numarasının Plan'da var olup olmadığı doğrulanmadı — VK-2'nin ikinci yarısı.

**Sahiplik:** Plan'ın, Murat Şen'in.

**Yaşam döngüsü:** Yaratanı bu akışta yok. Cuma 16:00 yayımıyla doğar; yeniden yayım yenisini mi doğurur, eskisini mi değiştirir — bu da VK-2.

**Kopya mı referans mı:** Takas talebinin buna bir referans taşıması gerekir. **Bu alan `06` §5'te yok** — EK-3.

**Varoluş:** Bu sistemin sözü yok.

---

### Uygunluk kural seti sürümü — dışarıdan gelen

Kuralları ürün yazmıyor. Altı kural 4857 ve toplu iş sözleşmesinden geliyor ve `05` §3.2 bunları müzakere edilemez sayıyor. Modelin buradaki tek işi, **hangi metnin hangi anda yürürlükte olduğunu geriye dönük söyleyebilmek.**

**Kimlik:** Sürüm etiketi. Bir sürüm yayımlandıktan sonra **yerinde değişmez**; eşik değişirse yeni sürümdür. Bu cümle KŞ-3'ün gerektirdiği şey ama KŞ-11'de yazılı değil — `[DECISION NEEDED]` **VK-6 · İK / hukuk.**

**Sahiplik:** İK'nın, yazılı olarak (KŞ-11). Değiştirmek bir ürün kararı değil.

**Yaşam döngüsü:** Yaratanı bu akışta yok. Bu akış onu yalnız okur (adım 6, 11, 16) ve sürümüne referans yazar (adım 19, KŞ-6).

**Kopya mı referans mı:** Takas talebi ve denetim izi ona referans verir; Onay anı kaydı **eşik değerlerini kopyalar** (KŞ-3). Referans ve kopya birlikte duruyor ve bu bilerek: sürüm hangi metin olduğunu söyler, kopya o metnin ne dediğini söyler. Sürüm listesi bir gün taşınırsa kopya ayakta kalır.

**Varoluş:** Eşikleri olmadan var olamaz. **Kural listesinin tam olup olmadığı açık** (KŞ-19: hafta tatili, gece 7,5 saat, 20:00 eşiği) ve bu modelin şeklini değiştirmez, içeriğini değiştirir: liste büyürse Onay anı kaydının kopyaladığı eşik kümesi büyür.

---

## 2. Kural taşıyan bağlar

Düz bağlar tek satır. Aşağıdakiler bir şeyi **yasaklıyor** ve yasaklamayan bir izin hiçbir şeyi kısıtlamaz.

**R-1 · Vardiya 1 — 0..1 açık Takas talebi (KŞ-1).**
Yasakladığı: aynı vardiya için ikinci bir açık takas talebi kurulması. Yasaklamadığı: kapanmış takasların ardı ardına gelmesi. Tek yerde uygulanır — adım 7. `08` E9 ikinci **üstlenmeyi** kapatıyor ama o ayrı bir kapıdır ve `[ASSUMED]`'dır (V-5).

**R-2 · Takas talebi 1 — 1 Teklif (bu dilimde).**
Yasakladığı: bir vardiyanın aynı anda iki kişiye teklif edilmesi. Havuz kesildiği için (DD-1) bu bağ dilimin şeklidir. VK-1 cevabı "teklif düşmez" olursa 1 — N'e döner ve **yasak kalkmaz, taşınır**: aynı anda bir açık teklif, zaman içinde birkaç.

**R-3 · Takas talebi — Çalışan, iki rolde.**
Yasakladığı: devreden ile üstlenenin aynı kişi olması. Ekrana ulaşıyor: adım 3'te devreden çalışan kendisini seçememeli. Yazılı değil, ama uygunluk kuralı 5 ("o gün başka bir vardiyası olmamalı") bunu tesadüfen yakalar. Tesadüfe bırakılmış bir yasak, yasak değildir.

**R-4 · Takas talebi 1 — 0..1 Onay anı kaydı.**
Yasakladığı: onaylanmamış bir takasın kaydı olması. **Yasaklaması gereken ama bugün yasaklamadığı:** kaydı olmayan bir takasın "onaylandı" görünmesi (adım 18 ile 19 arası, B-4).

**R-5 · Takas talebi — Uygunluk kural seti sürümü, çok — bir.**
Yasakladığı: geçmiş takasların yeni eşiklerle yeniden yorumlanması (KŞ-3). VK-6 çözülmezse bu yasak uygulanamaz.

**R-6 · Çalışan — Mağaza: bir tane, ama "şu anki".**
Bu bir koleksiyon değil, bir durumdur: bir güncel mağaza ve bir geçmiş. Kural 1 güncel olanı okuyor, Onay anı kaydı o anki olanı donduruyor. **Teklif ile onay arasında çalışan mağaza değiştirirse ne olur yazılı değil** — adım 16 kuralı yeniden koştuğu için takas düşer, ama düşme sebebi kullanıcıya "aynı mağazada değil" der ve kimse taşınmayı hatırlamaz. Yasaklanan bir şey yok; yasaklanması gerekip gerekmediği VK-7 · Selin Aydın.

**R-7 · Mağaza — Müdür: kaç tane?**
KŞ-5 *"takasın geçtiği mağazanın müdürü"* diyor ve tekil yazıyor. Bir mağazada birden çok müdür ya da müdür yardımcısı varsa adım 13'ün bildirimi ve adım 14'ün kuyruğu **kime** ait olur, ve `08` E10'un çift onayı bir kaza değil, bağın doğal sonucu olur. Ekrana ulaşan bir kardinalite ve cevabı yok. `[DECISION NEEDED]` **VK-8 · Selin Aydın** — KŞ-12'nin (müdür izinli) aynı sorunun ikinci yüzü olduğunu da not etmek gerekir.

**R-8 · Çalışan — Takas talebi ve Onay anı kaydı: ayrılınca çatışan iki bağ.**
Çalışan ayrılınca Takas talebi silinebilir gibi görünüyor. Onay anı kaydı silinemez, çünkü bir uygunluk kanıtıdır ve ona referans veren bir takas talebi olmadan neyi kanıtladığı okunamaz. Yasakladığı: takas talebini onay anı kaydından önce ya da ondan bağımsız silmek. VK-4'ün gerçek zorluğu bu.

**Düz bağlar, tek satır.** Takas talebi — Vardiya (bir) · Takas talebi — Denetim izi kaydı (çok) · Takas talebi — Red kaydı (0..1) · Vardiya — Mağaza (bir) · Vardiya — Hafta yayımı (bir).

---

## 3. Saklanan mı, hesaplanan mı

Ucuz kural önce: türetilebilen her şey hesaplanır. Sonra onu geçen kural: **bir insana gösterilmiş ve tekrar gösterilebilecek her şey saklanır.**

| # | Değer | Karar | Neden |
|---|---|---|---|
| 1 | Vardiya saatleri, mağaza, rol | Onay anında **saklanır** | KŞ-2; Plan sonradan değişir |
| 2 | Haftalık toplam saat | Onay anında **saklanır** | KŞ-2; anlık hesap geçmişi bozar |
| 3 | Hesaplanan dinlenme aralığı | Onay anında **saklanır** | KŞ-2; komşu hafta değişir (A15) |
| 4 | Yürürlükteki eşikler | Onay anında **saklanır** | KŞ-3'ün açık talebi |
| 5 | Kural seti sürümü | Her denetim izi kaydında **saklanır** | KŞ-6 |
| 6 | Not (140 karakter) | **Saklanır**, yazıldığı hâliyle | Üstlenen onu okuyup karar verdi |
| 7 | Red serbest metni | **Saklanır** | B5.2; süresi VK-5 |
| 8 | Takasın durumu | **Saklanır** | D-12 iki tarafa gösteriyor |
| 9 | Takasın nasıl bittiği | **Yazılı değil** | EK-4 |
| 10 | Kural kapısı sebebi (B1, B4, B6) | **Yazılı değil** | EK-5 |
| 11 | Müdürün bekleyen kuyruğu | Hesaplanır | Durumdan türetilir; okuma anı yeter |
| 12 | Uygunluk sonucu (adım 6, 11) | Hesaplanır, saklanmaz | Anlık kapı; onaya kadar bağlayıcı değil |
| 13 | Ölçüt 1, 2, 3 sayıları | Hesaplanır | Olaylardan; ama §4 U-6'yı okuyun |
| 14 | Bildirim gönderimi | Ne saklanır ne hesaplanır | Push altyapısının; varlık icat edilmedi |

**9. ve 10. satır bu tablonun asıl bulgusu.** İkisi de kullanıcıya gösterilmiş bilgidir ve ikisi de bugün hiçbir yerde durmuyor. 10. satır ayrıca KŞ-20'yi imkânsız kılıyor: *"kural motoru yanılırsa sorumluluk kimde"* sorusunun cevabı bir kayda bakmayı gerektirir ve bakılacak kayıt yok.

---

## 4. Akışa karşı kontrol

Model akıştan türetildi, o yüzden akışa karşı madde madde kontrol edildi. `08` §7'nin sayımı temel alındı.

### Süpürme 1 — her `reads` okuyacak bir şey buluyor mu

**10 `reads` adımı · 6 temiz · 4 uyuşmazlık.**

| # | Adım | Durum |
|---|---|---|
| 1 | 1 | **U-2** — "yayımlanmış hafta" okunuyor, hangi yayım olduğunu tutan alan yok |
| 2 | 3 | Temiz — Çalışan, Mağaza |
| 3 | 6 | **U-1** — uygulama sürümü okunuyor (KŞ-10, E7), hiçbir varlıkta yok |
| 4 | 9 | **U-3** — devreden adı gösteriliyor, saklanan bir ad yok, kopya/referans kararı yok |
| 5 | 11 | Temiz — Çalışan, Vardiya, kural seti |
| 6 | 14 | **U-4** — "bekleyen takas kuyruğu" kime ait, R-7 çözülmeden tanımsız |
| 7 | 16 | Temiz |
| 8 | 21 | Temiz — Vardiya (Plan) |
| 9 | E9 | Temiz — Takas talebi durumu |
| 10 | E18 | Temiz — Vardiya |

**Bir koşullu bağımlılık, uyuşmazlık değil.** KŞ-21 (izin ve rapor kayıtları uygunlukta kullanılacak mı) "evet" gelirse **yeni bir dışarıdan gelen varlık** doğar: İzin kaydı. Bugün altı kural onu okumuyor, o yüzden model onu içermiyor. Sahibi Murat Şen.

### Süpürme 2 — her `acts` ya yazıyor ya söylüyor mu

**14 `acts` adımı · 14 temiz · 0 uyuşmazlık.**

Yazanlar: 7, 12, 18, 19, B2.2, B3.2, B5.3 (yedi adım, yedi varlığa). Söyleyenler: 8, 13, 20, B2.3, B3.3, B5.4 (altı adım, push altyapısına) ve 17 (Plan'a). **Ne yazan ne söyleyen bir `acts` yok** — kovalanacak uyuşmazlık buydu ve çıkmadı.

### Süpürme 3 — her `emits` kopya mı referans mı taşıyor

**6 `emits` adımı, 7 olay türü · hepsi referans · 2 uyuşmazlık.**

| # | Olay | Taşıdığı | Durum |
|---|---|---|---|
| 1–5 | `takas_açıldı` … `onaylandı` | Takas kimliği + zaman | Referans |
| 6 | `reddedildi` | Takas kimliği + zaman | Referans; serbest metin **yok** ve bu doğru |
| 7 | `düştü` | Takas kimliği + zaman | **U-5** |

**U-5 — `düştü` iki bitişi birbirine karıştırıyor.** B2 (geri çekildi) ve B3 (geri çevrildi) aynı olayı atıyor. Ölçüm tarafında ayırmanın tek yolu takas talebinin **nasıl bittiğini** saklaması; o alan yazılı değil (§3, satır 9 · EK-4).

**U-6 — yedi olayın hepsi referans, ve kırılım geçmişi yeniden yazıyor.** `08` §6 mağaza ve rolün yükte olmadığını yazıyor. Sonucu bu belgeye düşüyor: ölçüt 1 ve 2 mağaza kırılımıyla okunacaksa mağaza **canlı** okunur, yani bir çalışan mağaza değiştirdiğinde geçmiş aylarının takasları yeni mağazasına taşınır. Bu bir ölçüm hatası değil, bir kopya/referans kararının kazara verilmiş hâlidir. Karar: **olay yükü mü genişler, ölçüm Onay anı kaydından mı okur.** İkincisi bedava ve onaylanmamış takasları kaçırır. `[DECISION NEEDED]` **VK-9 · Selin Aydın** (KŞ-25'in yanında durur).

**6. satır tesadüfen doğru düştü ve doğrulanmalı:** red serbest metni olay yükünde yok, yani ölçüm sistemine gitmiyor. VK-5 bunu bilerek onaylasın.

### Süpürme 4 — her varlığın onu yaratan bir adımı var mı

**10 varlık · 5 yaratılıyor · 5 dışarıdan geliyor.**

| # | Varlık | Yaratan | Durum |
|---|---|---|---|
| 1 | Takas talebi | adım 7 | Temiz |
| 2 | Teklif | adım 7 | Temiz |
| 3 | Onay anı kaydı | adım 19 | Temiz |
| 4 | Denetim izi kaydı | 7, 12, 18, B2.2, B3.2, B5.3 | Temiz |
| 5 | Red kaydı | B5.3 | Temiz |
| 6 | Vardiya | **yok** | **U-7** — Plan, Murat Şen |
| 7 | Çalışan | **yok** | **U-8** — Plan / İK |
| 8 | Mağaza | **yok** | **U-9** — Plan |
| 9 | Hafta yayımı | **yok** | **U-10** — Plan; ayrıca hiç adlandırılmamıştı |
| 10 | Kural seti sürümü | **yok** | **U-11** — İK, KŞ-11 |

Beş satır beyan edilmemiş bağımlılık. `05` §4.1 Plan'ı bir sistem olarak sayıyor, ama **hangi varlıkları ondan aldığımızı** hiçbir belge listelemiyordu; listesi budur. U-7 ayrı numaralandı çünkü tek fark ediliyor: Vardiya'nın kimliğinin yeniden yayımda korunması KŞ-1'in dayandığı varsayımdır (VK-2).

### Süpürme dışı dört bulgu

**B-1 · Çekirdek kaydın dört adı var.** *takas talebi* (`05` sözlük, KŞ-1) · *takas* (`08` adım 12, 18) · *teklif* (`08` adım 7, B2.2, B3.2) · *devir* (`05` sözlük, ayrı bir kavram olarak). Bu belge hepsini taşıdı ve **tek şey** saydı, ama karar veren o değil: VK-1.

**B-2 · Müdürün kendi vardiyası akışa girmiyor, ve bunu koşan adım yok.** `05` §2 ve §3.3 bunu iki kez yazıyor. Altı uygunluk kuralında yok, `08`'in 21 adımında yok. Modelde bir varoluş kuralı olarak durması gerekir, ama nerede uygulanacağı akışın kararıdır.

**B-3 · Kural kapısında düşen deneme hiçbir yerde durmuyor.** B1, B4 ve B6 işaretsiz adımlardır: yazmıyorlar, söylemiyorlar, olay atmıyorlar. KŞ-6'nın denetim izi listesi de onları saymıyor. Sonuç ikili: huninin ilk kaybı ölçülemez (`08` §6 bunu zaten yazdı) ve KŞ-20'nin sorumluluk sorusu cevaplanamaz, çünkü motorun ne dediğine dair kayıt yok. EK-5.

**B-4 · "Onaylandı" ile onayın kaydı arasında bir aralık var.** `08` adım 18 takası onaylandı işaretliyor, adım 19 KŞ-2 ve KŞ-3'ün değerlerini yazıyor, ve `08` bu ikisinin tek adım olmadığını özellikle söylüyor. 19 düşerse geride onaylanmış ama neye dayanarak onaylandığı yazılı olmayan bir takas kalır — on sekiz ay sonra cevaplanamayacak tam da o soru. Sıra ters çevrilebilir mi, yoksa ikisi birlikte mi durur: bu bir yazma kararıdır ve `api-needs`'in işidir, ama sebebi burada.

---

## 5. Dilimin dışına çıkan alanlar

**Bu bölüm bir istek listesi değil, bir beyandır.** `06` §5 kapsamın kaydıdır ve *"bu listeye ekleme yapan belge, eklediğini açıkça beyan eder"* diyor. Aşağıdaki altı alan akıştan çıkıyor, gerekçeleri sağlam, ve **hiçbiri onaylanmadı.** Saklama kararları kapsamın en sessiz büyüdüğü yerdir: alan küçüktür, gerekçe doğrudur, ve başkasının verdiği bir karara dayanarak gelir.

| # | Alan | Nereden | Olmazsa ne olur | Onaylayacak |
|---|---|---|---|---|
| EK-1 | Çalışanın uygulama sürümü | adım 6, KŞ-10, E7 | Teklif kurulmadan önce sürüm kontrol edilemez | Ürün ekibi |
| EK-2 | İki tarafın adı, o anki hâliyle | adım 9, 14; §3 | Geçmiş takaslar bugünkü adı gösterir | Selin Aydın + İK / hukuk |
| EK-3 | Takasın bağlı olduğu hafta yayımı | E14, AK-5 | E14 tespit edilemez, kimse hata görmez | Murat Şen + Selin Aydın |
| EK-4 | Takasın nasıl bittiği | §6 `düştü`, Bitiş 2–7 | Geri çekme ile geri çevirme ayrılmaz | Selin Aydın |
| EK-5 | Kural kapısında düşen denemenin kaydı | B1, B4, B6; KŞ-20 | Motor yanıldığında bakılacak kayıt yok | İK / hukuk + Selin Aydın |
| EK-6 | Mağazanın pilot kümesine üyeliği | D-18, V-6, KŞ-10 | Pilot sınırı okunabilir bir veri değil | Ürün ekibi |

**EK-2 ikisi birden.** Ad saklamak geçmişi doğru tutar ve aynı anda kişisel veriyi çoğaltır; VK-4 ile birlikte karara bağlanmalı, ayrı ayrı değil.

---

## 6. Diyagram

**Çizilmedi.** Dört varlığın üstünde diyagram teklif edilir; burada on tane var, yani okunabilir olurdu. Ama okunabilir olması istendiği anlamına gelmiyor: bu koşumda soracak kimse yoktu ve bu belgenin bilinen okuyucusu `api-needs`, yani bir diyagram okumayan bir halka. Bir paket toplanıyorsa ya da bu insanlara sunulacaksa istensin, §1 ve §2'den türetilir. Türetilirken §2'nin **yasakları** taşınmalı; bir çizimde kardinalite kolayca yaşar, ona bağlı yasak kolayca düşer.

---

## 7. Bu belgenin açtığı kararlar

Hiçbiri uydurulmadı; otonom koşumda hukuk ve İK kararı verilmez.

| # | Karar | Nereden | Sahip | Ne zaman |
|---|---|---|---|---|
| VK-1 | Teklif ayrı bir varlık mı, çekirdek kaydın adı ne | B-1, AK-1 | Selin Aydın | Dilim başlamadan |
| VK-2 | Vardiya kimliği yeniden yayımda korunuyor mu | U-7, E14 | Murat Şen | Dilim başlamadan |
| VK-3 | Ayrılıp dönen çalışan aynı kimliği alıyor mu | Çalışan | İK | Pilot çıkmadan |
| VK-4 | Onay anı kaydı ve denetim izi ne kadar saklanır | R-8, KŞ-3 | İK / hukuk | Dilim başlamadan |
| VK-5 | Red kaydı ayrı mı saklanır, kim görür | KŞ-23 | İK / hukuk | Dilim başlamadan |
| VK-6 | Kural seti sürümü yerinde değişmez mi | KŞ-11, KŞ-3 | İK / hukuk | Dilim başlamadan |
| VK-7 | Mağaza değişimi açık takası ne yapar | R-6 | Selin Aydın | Pilot çıkmadan |
| VK-8 | Bir mağazada kaç müdür onaylayabilir | R-7, E10, KŞ-12 | Selin Aydın | Dilim başlamadan |
| VK-9 | Ölçüm kırılımı olaydan mı kayıttan mı okunur | U-6, KŞ-25 | Selin Aydın | Pilot çıkmadan |

**Altısı dilim başlamadan.** `06` §3'ün dokuzunun üstüne biniyorlar, onların yerine geçmiyorlar.

---

## Sonraki adım

`api-needs`, §1'in kimlik tablosu, §3 ve §4 üzerinden. Bu belge isimleri koydu; sözleşme artık adı konmuş şeyler üzerine yazılabilir. `flow-grill` bu belgeyi §4'ün dört süpürmesinden tutarak kırabilir: U-1'den U-11'e kadar her satır akıştaki bir adıma bağlı ve o adım yanlışsa satır da yanlıştır.
