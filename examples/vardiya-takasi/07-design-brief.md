# Vardiya Takası — Tasarım Kararları

## Taşıyıcı

**Bu kayıt kısmî.** Haritalanmış bir akış olmadan yazıldı; aşağıdaki durumlar malzemenin adını koyduğu durumlardır, hepsi değil. `05-request-shaper.md` §3.4 dokuz dal sayıyor ve **dokuzunun da kararı "Yok"**. `flow-map` koşturulduğunda bu belgenin en çok büyüyecek bölümü §7 sistem geri bildirimidir; ikinci bir sürüm gerekecek. Otonom koşum, soracak kimse yoktu, seçim bana bırakıldı ve devam etmeyi seçtim.

**Kapsam.** Tasarlanan şey `06-slice.md` §5'teki dilimdir (D-1…D-21). O listeye eklenen her şey **kapsam eklemesi** olarak satırında yazılı ve onaylayacak kişi adıyla duruyor; §11'de toplandı.

**Sayım.** 7 yüzey · 24 durum · 14 `[DECISION NEEDED]` (8'i bu belgenin açtığı, 6'sı `06`'dan taşındı) · 3 alınan kapsam eklemesi, 2 alınmayan · 14 dışlama. Üretici bloğu §14'te.

**Nerede ne var.**

| # | Bölüm | Ne var | Kim alır |
|---|---|---|---|
| 1 | §1–§2 | Yüzey envanteri ve her yüzeyin tek işi | Tasarımcı, `ux-grill` |
| 2 | §3 | Rütbe sırası ve rütbeyi taşıyan mekanizma | Tasarımcı, `ux-grill` |
| 3 | §7 | Durumlar ve durum başına geri bildirim | `flow-map`, `ux-grill` |
| 4 | §9 | Dışlamalar — üreticiye ve paydaşa karşı | `build-context`, `ux-grill` |
| 5 | §10 | Yes/no olarak kontrol edilebilir bitti ölçütleri | `ux-grill` tek başına bunu alır |
| 6 | §11 | Dilime yapılan eklemeler ve onaylayacak kişiler | Selin Aydın, `build-context` |
| 7 | §12 | Toplanmış `[DECISION NEEDED]` tablosu | `build-context`, `decision-memo` |
| 8 | §13 | Taslak metin, örnek içerik, proje geneli kısıtlar | Tasarımcı, üretici |
| 9 | §14 | Üretici bloğu | Ekran çizecek kişi ya da araç |

**Ne okudum.** `06-slice.md` taşıyıcı, §1, §2, §3, §5, §6, §7, §8, §9 · `05-request-shaper.md` taşıyıcı, §1.3, §1.4, §1.5, §1.6, §1.7, §3 tamamı, §5, §6. `00`, `01`, `02`, `03`, `04`, `04b` ve hiçbir `*-feedback.md` açılmadı.

**Sabit sözlük.** `05` ve `06`'nın sözlüğü aynen sürüyor: *takas talebi* · *üstlenme* · *uygunluk kuralı* · *devir* · *sahip* · *dilim* · *adresli teklif* · *havuz*. Bu belgenin eklediği dört kelime: **yüzey** = tasarlanacak ekran ya da ekran bölgesi · **rütbe** = bir yüzeyde neyin kaçıncı okunacağı · **kapsam eklemesi** = dilimde olmayan, birinin onaylaması gereken gereksinim · **dönüşü olmayan an** = uygulamadan geri alınamayan adım. Başka ad kullanılmadı.

**Yüzeyler ve durumları.**

| # | Yüzey | Durum |
|---|---|---|
| Y-1 | Haftalık çizelge ekranı (mevcut, ödünç) | Karar verildi · girişi bir kapsam eklemesi (E-1) |
| Y-2 | Takas kurma yüzeyi | Karar verildi |
| Y-3 | Takas durum yüzeyi (iki taraf) | Karar verildi · iki durumu `[DECISION NEEDED]` |
| Y-4 | Gelen teklif yüzeyi | Karar verildi · dönüşü olmayan anı `[DECISION NEEDED]` |
| Y-5 | Müdürün bekleyen takas kuyruğu | Karar verildi |
| Y-6 | Müdürün karar yüzeyi | Karar verildi |
| Y-7 | Bildirimler (ödünç, mevcut push) | `[ASSUMED]` altyapı · `[UNVERIFIED]` kota ve yönlendirme |

Tasarım sistemi **verilmedi ve uydurulmadı**: §13.4'e bakın. Bu, bir çizim adımının önündeki tek sert engeldir.

---

## 0. Sınıflandırma ve hata yolları

**İş ne yapıyor.** Mevcut bir mobil uygulamaya, iki çalışan ve bir müdür arasında geçen, sonunda başka bir ekibin sistemine yazan bir onay akışı ekliyor. Yeni ürün değil, canlı ürüne yeni akış.

**Nerede koşuyor.** Bereket Mobil, iOS + Android, React Native, telefon. Web yok, back-office yok, tablet dilim dışı (DD-10). Tek dil Türkçe. Bu tek satır aşağıdaki her kararı biçimlendiriyor: her şey tek elle, tek sütunda, dar bir ekranda ve çoğu zaman mağaza zemininde okunuyor.

**Davranış karar verilmiş mi.** Ana akış evet (`05` §3.1 + `06` §5). Hata yolları hayır. Bu yüzden bu kayıt kısmî ilan edildi ve ana akış tahmin edilmedi.

### Malzemenin adını koyduğu hata yolları

Her satır: ne olur · kişi elinde neyle kalır · nasıl çıkar.

| # | Hata yolu | Kişi elinde ne kalır | Kaynak |
|---|---|---|---|
| H-01 | Uygunluk kuralı geçmez, teklif kurulmaz | Vardiya hâlâ devreden çalışanda | D-4 |
| H-02 | Üstlenme anında kural artık geçmiyor | `[DECISION NEEDED]` TB-2 | KŞ-4 |
| H-03 | Onay anında kural artık geçmiyor | Müdür reddi gibi sonuçlanır | KŞ-4 |
| H-04 | Müdür reddeder | Vardiya devredende, serbest metin sebep | D-8 |
| H-05 | Teklif edilen geri çevirir | Vardiya devredende, sebep yok | D-5 |
| H-06 | Devreden çalışan teklifi geri çeker | Teklif kapanır, karşı taraf haber almaz | D-6 |
| H-07 | Plan yazması düşer | Takas onaylanmış sayılmaz | D-10 |
| H-08 | İkinci bir açık takas kurulmak istenir | Kurulmaz | KŞ-1 |
| H-09 | Doğum tarihi boş, gece vardiyası | Kapalı taraf: üstlenemez | KŞ-9 |
| H-10 | Teklif edilenin uygulaması eski sürüm | Teklif kurulmaz, bildirim gitmez | KŞ-10 |
| H-11 | Ağ yok ya da uç cevap vermiyor | Yükleniyor / hata durumu | D-13 |
| H-12 | Müdür 48 saat cevap vermez | `[DECISION NEEDED]` KŞ-13 | A04 |
| H-13 | Vardiya onay beklerken başlar | `[DECISION NEEDED]` KŞ-14 | A09 |
| H-14 | Müdür izinli ya da mağazada değil | `[DECISION NEEDED]` KŞ-12 | A23 |
| H-15 | Müdürün elle düzeltmesi açık takasla çakışır | `[DECISION NEEDED]` KŞ-16 | A08 |
| H-16 | Hafta yeniden yayımlanır | `[DECISION NEEDED]` KŞ-15 | A05 |

Onaltı satırın **beşi kararsız**. Bu, kısmî ilanın sayısal karşılığıdır.

---

## 1. Yüzeyler

**Y-1 · Haftalık çizelge ekranı (mevcut)** — takasın giriş noktası; bu akışın sahibi olmadığı tek yüzey.
**Y-2 · Takas kurma yüzeyi** — bu akışın eklediği ilk yüzey; vardiya, kişi ve not burada birleşir.
**Y-3 · Takas durum yüzeyi** — devreden ve üstlenen çalışanın takası izlediği tek yer.
**Y-4 · Gelen teklif yüzeyi** — teklif edilen çalışanın cevabını verdiği yüzey.
**Y-5 · Müdürün bekleyen takas kuyruğu** — müdürün bu akışa girdiği tek kapı.
**Y-6 · Müdürün karar yüzeyi** — çizelgeyi değiştiren tek eylem burada.
**Y-7 · Bildirimler** — ödünç yüzey; mevcut push altyapısı `[ASSUMED]` (M7, D-11).

Yedi yüzey, üç ayrı rol. Y-1 dışında hepsi bu akışın.

**Yüzey sayılmayanlar, bir kere.** D-19'daki pilot müdür yönergesi bir belge, ekran değil. Denetim izini (KŞ-6), saklanan değerleri (KŞ-2) ve kural sürümünü (KŞ-3) gösteren ekranlar dilimin dışında; bu belge onları yüzey saymadı.

---

## 2. Her yüzeyin tek işi

| # | Yüzey | Tek iş |
|---|---|---|
| 1 | Y-1 | Kendi haftasını görmek — takas bu ekranın işi değil |
| 2 | Y-2 | Bu vardiyayı bir arkadaşına teklif etmek |
| 3 | Y-3 | Takasın nerede olduğunu ve sıranın kimde olduğunu görmek |
| 4 | Y-4 | Teklifi üstlenmek ya da geri çevirmek |
| 5 | Y-5 | Bekleyenler arasından birini karara açmak |
| 6 | Y-6 | Takası onaylamak ya da gerekçesiyle reddetmek |
| 7 | Y-7 | Kişiyi takasın sıradaki adımına götürmek |

**İkinci işi olan iki yüzey var, ikisi de ikincil ilan edildi.**

Y-3'te teklifi geri çekmek (D-6) ikincil iştir: yalnız devreden çalışanda ve yalnız üstlenilmeden önce vardır, kalan sürenin çoğunda yoktur. Y-5'te boş kuyruğu görmek ikincil değil, aynı işin boş hâlidir — müdürlerin çoğu çoğu gün burayı boş görecek ve boş hâl bu yüzeyin asıl karşılaşılan hâlidir.

Y-2 iki iş gibi görünüyor (vardiyayı açmak, kişiyi seçmek) ve değil: **adresli teklifte** (K-1) ikisi tek bir eylemdir, çünkü kimseye teklif edilmemiş bir açık takas bu dilimde diye bir şey yoktur. Havuz geri gelirse (DD-1'in reddi) Y-2 ikiye ayrılır; bu, kesimin tasarım tarafındaki bedelidir.

---

## 3. Bilgi rütbesi

Her yüzey için 1'den n'e sıra, en üst rütbenin gerekçesi ve **rütbeyi taşıyan mekanizma**.

### Y-2 · Takas kurma

1 vardiya (gün, tarih, saat aralığı) · 2 teklif edilecek kişi · 3 uygunluk sonucu · 4 birincil eylem · 5 not alanı · 6 çıkış

**Neden vardiya birinci.** Yanlış kişiye teklif düzeltilebilir: üstlenilmeden önce geri çekilir (D-6) ve karşı taraf zaten WhatsApp'ta konuşulan kişidir. Yanlış vardiyayı devretmek düzeltilemez ve **kimse fark etmez**: kurallardan geçer, müdür onaylar, çizelge güncellenir, herkes doğru çalışan bir takas görür — yanlış günü devreden kişi hariç.

**Mekanizma.** Vardiya bloğu yüzeyin en üstünde, kendi çerçevesinde, yalnız başına durur; ekrandaki tek tarih odur ve tek başınalık rütbeyi taşır. **Rütbe 1 ekranın en büyük öğesi değildir**: en büyük dokunulabilir öğe kişi seçicidir, çünkü tek etkileşim odur. Telafi: vardiya bloğu kişi seçicinin üstünde ve onunla arasında ekrandaki en geniş boşluk vardır; blok hiçbir durumda kaydırma altında kalmaz. Gözden geçiren nasıl kontrol eder: §10, ölçüt B-1.

### Y-3 · Takas durum

1 durum cümlesi (ne oldu, sıra kimde) · 2 vardiya · 3 karşı taraf · 4 not · 5 geri çekme · 6 çıkış

**Neden durum birinci.** Bu yüzeyi açan iki kişinin de tek sorusu "oldu mu, kimde bekliyor". Cevabı bulamayan çalışan WhatsApp'a döner ve talebin ölçüt 3'ünün bozulduğu yer tam olarak burasıdır.

**Mekanizma.** Durum tek cümledir, eylemi yapacak kişiyi adıyla anar, yüzeyin ilk okunan satırıdır ve başlık ağırlığındaki tek metindir. Geri çekme kontrol gibi görünmek zorundadır ama durum cümlesiyle yarışmaz: eylem sırasında en altta, tek başına.

### Y-4 · Gelen teklif

1 vardiya · 2 teklif eden kişi · 3 not · 4 "üstlenirsen ne olur" cümlesi · 5 Üstlen · 6 Geri çevir · 7 çıkış

**Neden vardiya birinci.** Üstlenmek, o gün çalışmayı kabul etmektir. Kişi ikinci, çünkü teklifi kimin gönderdiği kabul kararını değiştirmez; hangi gün ve hangi saat değiştirir.

**Mekanizma.** Vardiya bloğu Y-2'dekiyle aynı bloktur — aynı sıra, aynı çerçeve — ve tekrar bilinçlidir: iki taraf aynı şeye baktığını bloğun aynılığından anlar. Rütbe 4, eylemin hemen üstünde ve eylemle aynı görsel kutunun içinde durur; ayrı bir bilgi kutusu olarak çizilirse okunmaz.

### Y-5 · Müdür kuyruğu

1 satırdaki vardiya tarihi ve saati · 2 iki ad · 3 ne zamandır beklediği · 4 not var/yok işareti · 5 çıkış

**Neden vardiya tarihi birinci.** Müdürün kuyruktaki sırası zamana bağlıdır: en yakın başlayan vardiya, cevapsız kaldığında ilk düzeltilemez hale gelen vardiyadır. **Sıralama vardiya başlangıcına göre artan**, talebin geliş sırasına göre değil.

**Mekanizma.** Tarih satırın en büyük ve en solunda okunan öğesidir; adlar onun altında ikinci satırdadır. Bekleme süresi geçmiş zaman olarak yazılır (*"2 gündür bekliyor"*), **geri sayım ya da son tarih olarak değil** — KŞ-13 açık olduğu için bir son tarih göstermek kimsenin vermediği bir kararı ekrana yazmaktır.

### Y-6 · Müdür karar

1 devir cümlesi (kim, kimin hangi vardiyasını üstleniyor) · 2 dönüşü olmayan an uyarısı · 3 not · 4 Onayla · 5 Reddet · 6 çıkış

**Neden devir cümlesi birinci.** Müdürün verdiği tek karar "bu kişi o gün çalışsın mı". İki adı ve vardiyayı ayrı ayrı alanlara dağıtmak, müdürü cümleyi kafasında kurmaya bırakır; onlarca onayı arka arkaya yapan biri bunu bir kere yanlış kurar.

**Mekanizma.** Tek cümle, tek blok, yüzeyin en üstünde ve ekrandaki en büyük metin. İki ad da o cümlenin içindedir, ayrı satırlarda değil. Bu, rütbe 1'in aynı zamanda en büyük öğe olduğu tek yüzeydir.

### Y-7 · Bildirim

1 ne oldu · 2 hangi vardiya · 3 ne yapması gerektiği

**Mekanizma.** Push başlığı "ne oldu"dur; gövde vardiyayı taşır. Kişi adı gövdeye girer, başlığa değil: kilit ekranında görünen ilk satır bir iş arkadaşının adını taşımak zorunda değil.

---

## 4. Gezinme modeli

| # | Yüzey | Giriş | Çıkışlar | Kesintide |
|---|---|---|---|---|
| 1 | Y-2 | Y-1'de vardiya → "Takasa aç" | Geri = vazgeç, hiçbir şey kurulmaz | Uygulama kapanırsa kayıt yok |
| 2 | Y-3 | Y-1'deki işaretli vardiya · Y-7 | Geri = Y-1 | Durum sunucuda, kayıp yok |
| 3 | Y-4 | Y-7 bildirimi · Y-1'deki işaret | Geri = cevapsız; teklif açık kalır | Teklif açık kalır |
| 4 | Y-5 | Uygulamanın müdür bölümü | Geri = müdür bölümü | Kuyruk sunucuda |
| 5 | Y-6 | Y-5'te bir satır | Geri = karar verilmedi, kuyruğa döner | Karar verilmemiş sayılır |

**Çıkışlar tek tek.** Y-2, Y-4 ve Y-6'da **geri hareketi ile ekrandaki vazgeçme kontrolü aynı şeyi yapar**: hiçbir şey kurulmaz, hiçbir şey gönderilmez. İkisi aynı sonucu verdiği için ikisi de vardır ve ikincisi telefonda kaydırma hareketiyle geri gidemeyen kullanıcı için durur. Y-4'te "Geri çevir" bir çıkış değil, bir cevaptır; geri hareketiyle karıştırılmayacak şekilde eylem alanında durur.

**Eylem havadayken.** Teklif kurulurken, üstlenirken ve onaylarken **çıkışlar kapanmaz, birincil eylem kapanır**. Bir kullanıcı ağır ağdayken ekranda kilitli kalmamalı; ama geri çıkması isteği iptal etmez, çünkü istek sunucuya gitmiştir. Bu, Y-3'ün neden bu dilimde zorunlu olduğunun cevabıdır: çıkan kişi sonucu orada bulur.

**Y-7'nin uygulamayı ilgili yüzeye açması** `[DECISION NEEDED]` TB-7 · `[UNVERIFIED]` — mevcut uygulamanın yönlendirme yeteneği doğrulanmadı. Açamıyorsa bildirim metni vardiyayı adıyla taşır ve kişi Y-1'den bulur; tasarım bu ihtimali karşılamak zorunda.

---

## 5. Girdi modeli

| # | Yüzey | Zorunlu | Sıra | Ertelenebilir | Ön dolu |
|---|---|---|---|---|---|
| 1 | Y-2 | Vardiya, kişi | Vardiya Y-1'den gelir; kişi seçilmeden not yazılamaz | Not (140 karakter) | Vardiya, Y-1'deki seçimden |
| 2 | Y-4 | Cevap | Tek adım | Yok | Yok |
| 3 | Y-6 | Karar; redde serbest metin | Reddet seçilmeden metin alanı yok | Yok | Yok |

**Not alanı neden kişiden sonra.** Sıra, kararın sırasıdır: kime teklif ettiğini bilmeden ne yazacağını bilemezsin. Alan kişi seçilmeden **görünür ama etkin değildir**; gizlenirse ekran seçimden sonra sıçrar.

**Ön dolu tek değer: vardiya.** Kaynağı Y-1'deki dokunuş. Düzeltmesi: Y-2'den çıkıp başka vardiyaya dokunmak. Y-2'nin içinde vardiya değiştirilemez ve bu bilinçli — vardiya değiştiricisi, rütbe 1'i düzenlenebilir bir alana çevirir ve yanlış gün riskini büyütür.

**Ne dokunulabilir görünmeli, ne görünmemeli.**

| # | Yüzey | Kontrol gibi görünmeli | Sabit kalmalı |
|---|---|---|---|
| 1 | Y-2 | Kişi seçici, not alanı, "Teklif et" | Vardiya bloğu, uygunluk sonucu |
| 2 | Y-3 | Geri çekme (yalnız varken) | Durum cümlesi, vardiya, karşı taraf |
| 3 | Y-4 | Üstlen, Geri çevir | Vardiya bloğu, not, uyarı cümlesi |
| 4 | Y-5 | Kuyruk satırları | Bekleme süresi, not işareti |
| 5 | Y-6 | Onayla, Reddet, serbest metin | Devir cümlesi, uyarı, not |

Y-5'in satırları bu listedeki en kırılgan maddedir: bir kuyruk satırı bilgi kartı gibi çizilirse müdür kuyruğa bakar ve hiçbir şeye dokunmaz.

---

## 6. Varsayılanlar ve karar noktaları

| # | Yer | Varsayılan | Yanlışsa bedeli |
|---|---|---|---|
| 1 | Y-2 kişi seçimi | **Yok, kimse önerilmez** | Ön seçim yanlış kişiye teklif gönderir; HY-3 zaten öneriyi yasaklıyor |
| 2 | Y-2 not | Boş | Bedeli yok; isteğe bağlı (D-1) |
| 3 | Y-2 kişi listesi | Mağazanın **tamamı**, süzülmeden | Süzmek, uygunsuz kişiyi görünmez yapar ve sebebi de yok eder |
| 4 | Y-5 sıralama | Vardiya başlangıcına göre artan | Yanlışsa yarınki vardiya, gelecek aykine gömülür |
| 5 | Y-5 bekleme | Geçmiş zaman, son tarih yok | Son tarih göstermek KŞ-13'ü ekranda kapatır |
| 6 | Y-6 karar | Hiçbiri ön seçili değil | Ön seçili onay, dönüşü olmayan anı kazara geçirir |
| 7 | Y-7 kanal | Push `[ASSUMED]` | Push yoksa akış sessizce durur; G08 doğrulanmadı |

**3. satır bir karardır ve bedeli vardır.** Mağazanın tamamını göstermek, uygunsuz bir kişi seçildiğinde sebebi göstermeyi zorunlu kılar, sebep de kişisel veriye dokunur (E-2, TB-4). Süzülmüş liste bu sorunu ortadan kaldırır ama devreden çalışana *"arkadaşım neden listede yok"* sorusunu bırakır ve o soru WhatsApp'ta cevaplanır. Kural motorunun yetkisi zaten listede değil (KŞ-4), yani süzmek bir yetki kazandırmıyor, yalnız bilgi saklıyor.

**Açık kararlar görsele kapattırılmaz.** KŞ-12 (müdür yoksa kim onaylar) çözülmeden Y-5 ve Y-6'nın hangi müdürün önüne düştüğü çizilmiş sayılmaz: tek bir müdür varsayıp başlığa ad yazmak, kimsenin vermediği kararı düzen olarak üretime sokar. Bu yüzey işaretli yer tutucuyla çizilir.

---

## 7. Sistem geri bildirimi

**Kısmî bölüm.** Aşağıdakiler malzemenin adını koyduğu durumlardır; `flow-map` sonrası bu tablo büyür.

### Y-2 · Takas kurma

| # | An | Ne görünür |
|---|---|---|
| 1 | Kurulurken | Yüzey içinde, ilerleme eylemin yerinde; yüzey kapanmaz |
| 2 | Kuruldu | Y-3'e iner, durum "cevap bekleniyor" |
| 3 | Kural geçmedi (H-01) | Yüzey içinde, teklif kurulmaz, sebep kişi seçicinin altında |
| 4 | Bu vardiyada açık takas var (H-08) | Yüzey içinde, engelleyici, mevcut takasa çıkış verir |
| 5 | Eski sürüm (H-10) | Kişi seçilemez, sebebiyle |
| 6 | Ağ hatası (H-11) | Yüzey içinde, tekrar denenebilir, girilen not kaybolmaz |

**Uygunluk sonucu bir söz değildir.** Kural yetkisi üstlenme ve onay anındadır (KŞ-4); Y-2'de gösterilen sonuç o anın fotoğrafıdır. Metin bunu söylemek zorunda, çünkü *"kurallardan geçti"* okuyan çalışan iki gün sonra düşen bir takası sistemin hatası sayar.

### Y-3 · Takas durum

| # | Durum | Ne görünür |
|---|---|---|
| 7 | Cevap bekleniyor | Karşı tarafın adıyla; geri çekme açık |
| 8 | Üstlenildi, onay bekliyor | Müdürde; **geri çekme kapanır** |
| 9 | Onaylandı | Bitti; vardiya artık üstlenende |
| 10 | Reddedildi | Müdürün serbest metniyle · `[DECISION NEEDED]` TB-3 |
| 11 | Geri çevrildi | Sebepsiz; vardiya devredende |
| 12 | Geri çekildi | Kapalı; teklif edilen açtığında da bunu görür |
| 13 | Plan yazması düştü (H-07) | **Takas onaylanmış değil**, vardiya devredende |
| 14 | Yükleniyor / hata | D-13 |

**13. satır bu dilimin en olası kötü anıdır** ve üç kişiyi birden ilgilendirir. Müdür düğmeye bastığı için kesintiyle öğrenir; iki çalışan bildirimle öğrenir. Ekranda yazan şey **"vardiya hâlâ sende"** olmak zorunda, çünkü belirsiz bırakılırsa iki kişi de o gün geleceğini ya da gelmeyeceğini varsayar ve biri gelmez. Yeniden denemenin kullanıcıya mı sisteme mi ait olduğu `[DECISION NEEDED]` TB-8, KŞ-18'e bağlı.

### Y-4 · Gelen teklif

| # | Durum | Ne görünür |
|---|---|---|
| 15 | Açık teklif | Üstlen / Geri çevir |
| 16 | Üstlenilirken | Eylem yerinde ilerleme; yüzey kapanmaz |
| 17 | Üstlenme anında kural düştü (H-02) | Sebep gösterilir · `[DECISION NEEDED]` TB-2 |
| 18 | Teklif artık yok (geri çekildi ya da düştü) | Kapalı hâl, eylemler yok, tek çıkış |

### Y-5 ve Y-6 · Müdür

| # | Durum | Ne görünür |
|---|---|---|
| 19 | Kuyruk boş | Boş hâl; **bu yüzeyin en sık görülen hâli** |
| 20 | Onaylanırken | Y-6 içinde ilerleme; kuyruğa dönmez |
| 21 | Onaylandı | Kuyruğa döner, satır düşer |
| 22 | Onay Plan'a yazılamadı (H-07) | Y-6 içinde kesinti; satır kuyrukta kalır |
| 23 | Red, metin boş | Reddet etkin değil; alan zorunlu (D-8) |
| 24 | Kuyruk yüklenemedi | D-13 |

### Dönüşü olmayan an — nerede duyurulur

Bu akışta **iki tane** var ve ikisi de bugün ekranda duyurulmuyor.

**Birincisi, müdürün onayı (Y-6).** Onay Plan'a yazar ve onaylanmış takas uygulamadan iptal edilemez (KŞ-8); geri alma yalnız Plan'da elle düzeltmedir. Y-6, uyarıyı **eylemin üstünde**, eylemden önce taşır. **Onaydan sonra ikinci bir onay ekranı yoktur**: uyarı okunmuşken bir kez daha sorulması, uyarıyı bir formalite hâline getirir ve müdür üçüncü onaydan sonra ikisini de okumaz.

**İkincisi, üstlenme (Y-4).** Üstlenildiği anda devreden çalışanın geri çekme hakkı biter (D-6) ve dilimde iptal yoktur (DD-5). Yani iki çalışanın da geri dönüşü orada kapanıyor, oysa vardiya henüz devredilmiş değil. Bu anın ne olduğu malzemede yazılı değil: **`[DECISION NEEDED]` TB-1**. Karar verilene kadar Y-4 bu cümleyi taşır ve cümle işaretli yer tutucudur.

**İlerleme göstergesi.** Bu akışta bir kullanıcının gördüğü adım sayısı sabit değil (müdür ne zaman bakarsa o zaman), dolayısıyla **adım sayacı ya da "3/4" göstergesi yoktur**. Y-3'ün durum cümlesi bu işi yapar.

---

## 8. Bağlayıcı kısıtlar

| # | Kısıt | Kaynak |
|---|---|---|
| 1 | Telefon; iOS + Android, React Native | Malzeme, `05` §1.4 |
| 2 | Web, back-office, masaüstü yok | Malzeme, HY-4 |
| 3 | Tek dil Türkçe; çeviri işi yok | Malzeme, `05` §5 |
| 4 | Yalnız pilot mağaza kümesi | Malzeme, D-18 |
| 5 | Bir vardiya için tek açık takas | Malzeme, KŞ-1 |
| 6 | Uygunluk yetkisi sunucuda, iki anda | Malzeme, KŞ-4 |
| 7 | Onaylanmış takas uygulamadan iptal edilemez | Malzeme, KŞ-8 |
| 8 | Kural eşikleri İK sahipliğinde, ürün değiştiremez | Malzeme, KŞ-11 |
| 9 | Kural eşikleri (22:00, 45 saat, 7,5 saat) `[UNVERIFIED]` | Hukuk kontrolü, KŞ-19 |
| 10 | Karşı tarafın kişisel verisi ekranda gösterilmez | Varsayım — kaynak `05` §6, karar TB-4 |
| 11 | Erişilebilirlik seviyesi yok | Boşluk — DD-10 dilim dışı bıraktı, `[DECISION NEEDED]` TB-5 |
| 12 | Çevrimdışı çalışma tasarlanmaz | Malzeme, DD-10; ağ yoksa hata durumu |
| 13 | Tablet ve büyük ekran düzeni yok | Malzeme, DD-10 |
| 14 | Tasarım sistemi: mevcut Bereket Mobil'inki | Varsayım — erişim yok, §13.4 |
| 15 | Push altyapısı var `[ASSUMED]`, kotası `[UNVERIFIED]` | M7, G08 |
| 16 | Mevcut çizelge ekranının önbelleği `[UNVERIFIED]` | `05` §3.1 |

**9., 15. ve 16. satırlar dış dünyaya yaslanıyor** ve hiçbiri bu belgeden kontrol edilemez. 9'un kontrolü hukukta, 15'inki push sağlayıcısının panosunda, 16'nınki Murat Şen'in ekibinde.

**Alışılmışın dışına çıkan tek kısıt 6. satırdır**: uygunluğun listeleme anında değil, üstlenme ve onay anında bağlaması. Bunun bilinçli bir içgörü mü yoksa kaza mı olduğunu içeriden söyleyemem; `prior-art` bunu kıyaslanabilir ürünlerin ne yaptığına tutup sahibine sormalı.

---

## 9. Dışlamalar

Bu tasarımın **yapmayacağı** şeyler. Paydaş bir şey daha eklemek istediğinde ve üretici boşluk doldurduğunda ayakta kalan bölüm budur.

1. **Havuz yok.** Vardiya, uygun çalışanların listesinde görünmez; tek kişiye adresli teklif edilir (DD-1).
2. **Red sebebi listesi yok.** Müdür seçim yapmaz, serbest metin yazar (DD-2).
3. **Otomatik onay yok.** Her takas müdürden geçer (DD-3).
4. **İki bacaklı takas yok.** Karşılığında vardiya alma yüzeyi yok (DD-4).
5. **İptal yüzeyi yok.** Onaylanmış takas uygulamadan geri alınmaz (DD-5).
6. **"Takaslarım" listesi yok.** Bir çalışanın geçmiş ve açık takaslarını topluca gördüğü ekran dilimde yok; her takasa kendi vardiyasından ya da bildiriminden gidilir. *(Bu dışlamayı bu belge koydu; dilim sessizdi.)*
7. **Denetim izi ekranı yok** (KŞ-6). **Saklanan değerleri gösteren ekran yok** (KŞ-2, KŞ-3).
8. **Otomatik eşleştirme, öneri, "şununla takas et" yok** (HY-3).
9. **Rehber, kişi içe aktarma, avatar, fotoğraf yok.** Kişi seçici mağaza listesinden okur, telefonun rehberinden değil.
10. **Toplu işlem yok.** Müdür kuyrukta çoklu seçip hepsini onaylayamaz; onay tek tek verilir, çünkü onay dönüşü olmayan andır.
11. **Geri sayım, son tarih, süre uyarısı yok** (KŞ-13 açık).
12. **Karşı tarafın yaşı, doğum tarihi, izin ya da rapor kaydı hiçbir ekranda görünmez.**
13. **Onboarding turu, tanıtım kartı, kampanya alanı yok.**
14. **Web ekranı, müdür back-office'i, masaüstü düzeni yok** (HY-4).

---

## 10. Bitti ölçütleri

Okunup onaylanacak cümleler değil; ekrana tutulup saniyeler içinde evet/hayır denecek gözlemler.

| # | Ölçüt |
|---|---|
| B-1 | Y-2 griye çevrildiğinde en yalnız duran öğe vardiya bloğudur; en büyük dokunulabilir öğe kişi seçicidir |
| B-2 | Y-6'da en büyük metin devir cümlesidir ve iki ad o cümlenin içindedir |
| B-3 | Y-6'da "geri alınamaz" cümlesi eylemin üstündedir; eylemden sonra ikinci bir onay ekranı çizilmemiştir |
| B-4 | §7'deki 24 durumun her birinin çizilmiş bir ekranı var; `[DECISION NEEDED]` olanlar işaretli yer tutucu olarak |
| B-5 | Ö-3 kaydı (34 karakterlik ad + 140 karakterlik not) çizildiğinde "Teklif et" hâlâ kaydırmasız görünüyor |
| B-6 | En büyük sistem yazı ayarında Y-6'da iki ad ve tarih aynı ekranda, kırpılmadan okunuyor |
| B-7 | Hiçbir ekranda karşı tarafın yaşı, doğum tarihi, izni ya da raporu görünmüyor |
| B-8 | Y-5'in boş hâli çizilmiş; hiçbir yerde geri sayım ya da son tarih yok |
| B-9 | Y-2 ve Y-4'teki vardiya bloğu aynı sırayı ve aynı çerçeveyi taşıyor |
| B-10 | Gece vardiyası (23:00–07:00) çizildiğinde iki tarihli olduğu ekranda anlaşılıyor |
| B-11 | WhatsApp'ta zaten anlaşmış bir çalışan, hiçbir şey okumadan teklifi gönderebiliyor |
| B-12 | Onaya bakan müdür, "kim kimin yerine" sorusunu ekrandaki tek bir satırdan cevaplayabiliyor |

B-11 ve B-12 davranış iddiasıdır, kareye tutularak kontrol edilemez; en sonda duruyorlar ve listeden çıkarılmadılar, çünkü ürünü tarif eden satırlar onlar.

---

## 11. Dilime yapılan eklemeler

`06` §5 kapsamın kaydıdır. Aşağıdaki üçü o listede yok ve bu belge onları gerektirdi. **Hiçbiri onaylanmadı.**

**E-1 · Mevcut çizelge ekranına giriş ve takas işareti.**
Y-1'de her vardiyanın "takasa aç" girişi olmalı ve açık takası olan vardiya işaretli görünmeli. D-1 takasın çizelgeden başladığını yazıyor ama mevcut ekranın değişeceğini yazmıyor; ekran bu akışın değil.
Onaylayacak: Bereket Mobil çizelge ekranının sahibi + Murat Şen (önbellek davranışı `[UNVERIFIED]`).

**E-2 · Uygunluk sebebi metinleri ve kişisel veri sınırı.**
D-4 sebebin devreden çalışana gösterileceğini yazıyor. Altı kuralın sebebi altı metindir ve ikisi karşı tarafın kişisel verisine dokunur (18 yaş / gece, haftalık saat). Metinleri kimin yazacağı ve nereye kadar açık yazılabileceği kararı dilimde yok.
Onaylayacak: İK / hukuk (KŞ-23 ve G05'in ekran tarafı) · karar TB-4.

**E-3 · Kişi seçicinin okuyacağı mağaza çalışan listesi.**
D-2 "aynı mağazadan ad vererek" diyor; o adların hangi uçtan geleceği dilimde yok ve Plan'dan okunuyorsa yeni bir bağımlılıktır.
Onaylayacak: Murat Şen.

### Yapılmayan iki ekleme

Bu ikisi tasarım sırasında makul göründü, dilimde olmadıkları için **alınmadı** ve yalnız görünür kalsınlar diye yazıldılar.

**E-4 · "Teklif geri çekildi" bildirimi.** D-11 üç bildirim sayıyor; dördüncüsü bir ekleme olurdu. Bunun yerine teklif edilen çalışan Y-4'ü açtığında kapalı hâli görür (durum 18). Selin dördüncü bildirimi isterse bu bir ekleme olarak onaylanmalı.

**E-5 · Müdür karar yüzeyinde iki tarafın haftalık toplam saati.** Müdürün ilk isteyeceği şey budur ve KŞ-2 bu değerlerin **onay anında yazıldığını** söylüyor, onaydan önce gösterildiğini değil. Ekrana konması yeni bir okuma ve yeni bir uç demektir. Alınmadı.

---

## 12. Verilemeyen kararlar

| # | Karar | Sahip | Neyi engelliyor |
|---|---|---|---|
| TB-1 | Üstlenme ile onay arasında iki taraftan biri vazgeçebilir mi | Selin Aydın | Y-4'ün uyarı cümlesi, Y-3'ün 8. durumu |
| TB-2 | Üstlenme anında kural düşerse takas kapanır mı, açık kalır mı | Selin Aydın | Y-4 durum 17, Y-3 akışı |
| TB-3 | Müdürün red serbest metnini devreden çalışan görüyor mu | İK / hukuk | Y-3 durum 10 |
| TB-4 | Uygunluk sebebi ekranda ne kadar açık yazılabilir | İK / hukuk | Y-2 durum 3, E-2, altı metin |
| TB-5 | Erişilebilirlik seviyesi | Ürün ekibi | Hedef boyutu, kontrast, yazı ölçeği tavanı |
| TB-6 | Tasarım sistemine erişimi kim verecek | Bereket Mobil mobil ekibi | **Her yüzeyin çizimi** |
| TB-7 | Bildirim uygulamayı ilgili yüzeye açabiliyor mu | Mobil ekip | Y-7 metinleri, Y-3 ve Y-4'ün girişi |
| TB-8 | Plan yazması düşünce yeniden deneme kimin işi | Murat Şen | Y-3 durum 13, Y-6 durum 22 |
| KŞ-12 | Müdür izinliyse onayı kim verir | Selin Aydın | Y-5 ve Y-6 kime düşer |
| KŞ-13 | Müdür 48 saat cevap vermezse | Selin Aydın | Y-5 bekleme göstergesi, Y-3 durumu |
| KŞ-14 | Vardiya onay beklerken başlarsa | Selin Aydın | Y-3 ve Y-6'da bir durum daha |
| KŞ-16 | Elle düzeltme açık takasla çakışırsa | Ürün + Murat Şen | Y-3'te bir durum daha |
| KŞ-18 | Yazma ucu koşullu yazma sunuyor mu | Murat Şen | Y-3 durum 13'ün metni, TB-8 |
| KŞ-23 | Red kaydı ne kadar saklanır, kim görür | İK / hukuk | TB-3 |

**TB-6 tek başına engelleyicidir.** Kalan on üçü işaretli yer tutucuyla çizilebilir; TB-6 çözülmeden çıkan şey tasarım değil, düzen çalışmasıdır.

`06` §3'teki kalan `[DECISION NEEDED]` maddeleri (KŞ-15, KŞ-17, KŞ-19…KŞ-29) bu belgeye taşınmadı: hiçbiri bir yüzeyi ya da durumu değiştirmiyor. Sahipleri `06`'da duruyor.

---

## 13. Taslak — üreticinin aksi hâlde uyduracakları

### 13.1 Ekran metinleri `[DRAFT]`

**Onaylanmamış metin ekran görüntüsüne girerse onaylanmış metin olur.** Aşağıdakiler on dakikada okunup düzeltilmek için yazıldı.

| # | Yer | Metin |
|---|---|---|
| 1 | Y-1 eylem | Takasa aç |
| 2 | Y-2 başlık | Bu vardiyayı devret |
| 3 | Y-2 kişi seçici, boş | Kime teklif ediyorsun? |
| 4 | Y-2 not alanı ipucu | İstersen kısa bir not ekle (140 karakter) |
| 5 | Y-2 birincil eylem | Teklif et |
| 6 | Y-2 uygunluk uyarısı | Kurallar üstlenme ve onay anında yeniden kontrol edilir |
| 7 | Y-2 açık takas var | Bu vardiya için zaten açık bir takas var |
| 8 | Y-2 eski sürüm | Bu arkadaşının uygulaması takası desteklemiyor |
| 9 | Y-3 durum: cevap bekleniyor | {Ad} cevabını bekliyor |
| 10 | Y-3 durum: onay bekliyor | Müdür onayı bekleniyor |
| 11 | Y-3 durum: onaylandı | Onaylandı. Vardiya artık {Ad}'da |
| 12 | Y-3 durum: reddedildi | Müdür reddetti. Vardiya sende |
| 13 | Y-3 durum: geri çevrildi | {Ad} teklifi geri çevirdi. Vardiya sende |
| 14 | Y-3 geri çekme | Teklifi geri çek |
| 15 | Y-3 Plan yazması düştü | Onay çizelgeye işlenemedi. **Vardiya hâlâ sende** |
| 16 | Y-4 başlık | {Ad} sana bir vardiya devretmek istiyor |
| 17 | Y-4 dönüşü olmayan an | `[DECISION NEEDED]` TB-1 — yer tutucu, 90–120 karakter |
| 18 | Y-4 eylemler | Üstleniyorum · Geri çeviriyorum |
| 19 | Y-4 kapalı teklif | Bu teklif artık geçerli değil |
| 20 | Y-5 başlık | Onay bekleyen takaslar |
| 21 | Y-5 boş hâl | Şu an onay bekleyen takas yok |
| 22 | Y-5 bekleme | {n} gündür bekliyor |
| 23 | Y-6 devir cümlesi | {Ad-1}'in {tarih} {saat} vardiyasını {Ad-2} üstleniyor |
| 24 | Y-6 uyarı | Onayladığında çizelge güncellenir ve bu işlem uygulamadan geri alınamaz |
| 25 | Y-6 eylemler | Onayla · Reddet |
| 26 | Y-6 red metni ipucu | Reddetme sebebini yaz (zorunlu) |
| 27 | Y-7 teklif geldi | {Ad} sana {tarih} vardiyasını devretmek istiyor |
| 28 | Y-7 onaya düştü | {Ad-1} → {Ad-2}, {tarih} vardiyası onayını bekliyor |
| 29 | Y-7 sonuçlandı | {tarih} vardiyası için takas {sonuç} |
| 30 | Ortak hata | Bağlanamadık. Tekrar dene |
| 31 | Ortak yükleniyor | Yükleniyor |

**Yazılmayan metinler ve sebebi.** Altı uygunluk kuralının red sebebi metinleri **burada taslak yazılmadı**: kural setinin sahibi İK'dır (KŞ-11) ve iki metin kişisel veriye dokunur (TB-4). Yer tutucu ve bütçe: **kural başına tek cümle, en fazla 80 karakter, karşı tarafı tanımlayan hiçbir veri geçmeden.** Üretici bunları kendi yazmayacak; §14'te yasak olarak duruyor. Aynısı 17. satır için geçerli: TB-1 kararına bağlı.

### 13.2 Örnek içerik `[DRAFT]`

Üç kayıt; üçüncüsü bu alan için bilerek zor.

**Ö-1 · sıradan.** Ayşe Demir → Burak Koç · 14 Mart Cuma 09:00–17:00 · kasa · not yok.

**Ö-2 · ayırt edilemeyen iki ad.** Mehmet Yılmaz → Mehmet Yılmaz (aynı mağazada iki kişi) · 3 Nisan Perşembe 12:00–20:00 · reyon · not: "Doktor randevum var." Kişi seçici bu ikisini ayırt edebilmeli ve Y-6'daki devir cümlesi iki Mehmet Yılmaz'ı karıştırmadan kurulabilmeli.

**Ö-3 · her yerden taşan.** Hatice Nur Çelikkanat-Öztürkoğlu → Ali Rıza Süleymanoğlu · 28 Şubat Cumartesi **23:00 – 1 Mart 07:00** (gece, iki tarihe yayılan) · kasap · not tam 140 karakter: "Kardeşimin düğünü var, cumartesi akşam İzmir'e gitmem gerekiyor, pazar akşamı dönerim, gece vardiyasını üstlenirsen çok minnettar olurum ya."

**İçerik stresi.** En büyük sistem yazı ayarı, en dar telefon, ve Y-5'te art arda üç Ö-3 satırı.

### 13.3 Proje geneli kısıtlar `[DRAFT]`

Altı karar, her yüzeyde geçerli, bir kere veriliyor. **Hiçbiri erişilebilirlik seviyesi belirlemiyor** — DD-10 o kararı Ürün ekibine bıraktı ve bu satırlar onu açmıyor; taban çiziyor.

| # | Kısıt | Taslak |
|---|---|---|
| 1 | Tema | Uygulama neyi destekliyorsa o; bu tasarımda hiçbir anlam yalnız renkle taşınmaz |
| 2 | Yazı ölçeği | En büyük sistem ayarında Y-6'nın devir cümlesi ve eylemleri okunur kalır |
| 3 | En küçük ekran | 360 × 640 dp; bu ölçüde Y-2'de vardiya bloğu ve "Teklif et" birlikte görünür |
| 4 | Hareket | Azaltılmış hareket ayarında geçişler kapanır; hiçbir durum yalnız animasyonla anlatılmaz |
| 5 | Kırpma | Adlar iki satıra sarar sonra kırpılır; **tarih ve saat hiçbir koşulda kırpılmaz** |
| 6 | Sayı ve zaman | 24 saat biçimi · gece vardiyası iki tarihiyle yazılır · süre gün olarak, geri sayımsız |

5. ve 6. satırlar bu alanın kendi kararlarıdır: kırpılan bir ad rahatsız eder, kırpılan bir saat yanlış güne gelinmesine yol açar.

### 13.4 Tasarım sistemi — **uydurulmadı**

Bereket Mobil canlıda, mağaza çalışanlarının %94'ü kullanıyor ve bu belgenin ona hiçbir erişimi yok: token yok, bileşen listesi yok, ekran görüntüsü yok, soracak kimse yok.

**Bu boşluk doldurulmadı.** Var olan bir ürün için tip ölçeği, boşluk ritmi ya da renk rolü taslamak, o ürünün kendi diline aykırı bir ikinci dil üretir; iki ekran sonra fark edilir ve bütün belge çöpe atılır. Yeşil alan kuralı burada geçerli değil, çünkü ortada yeşil alan yok.

**Çizim başlamadan önce şunlardan biri gelmeli** (TB-6):

1. Dışa aktarılmış token seti (tip, boşluk, renk rolleri, yarıçap), ya da
2. Mevcut iki ekranın görüntüsü — bordro fişi ve haftalık çizelge, ki ikisi de bu akışın komşusu — ya da
3. Bu akışın ihtiyaç duyduğu bileşenlerin adları: liste satırı, kişi seçici, birincil/ikincil eylem, çok satırlı metin alanı, durum rozeti, boş hâl, hata hâli.

Üçünden hiçbiri gelmezse üretilen şey **düzen çalışmasıdır ve tasarım diye gösterilmemelidir.**

---

## 14. Üretici bloğu

Bu blok, ekran çizecek araca verilecek olandır. `05` §5 *"Tasarım yok; ekranlar kararlaştırılmadı"* diyor — yani bu belgeden sonra bir çizim adımı geliyor ve blok bu yüzden üretildi. Blok yukarıdaki kayda tek tek tutuldu: içindeki her sıra, her yasak ve her durum yukarıda yazılı.

```
SURFACE: Y-2 Takas kurma
PRIMARY JOB: Bu vardiyayı bir arkadaşına teklif etmek

ELEMENTS, IN RANK ORDER:
1. Vardiya bloğu (gün, tarih, saat aralığı) — yanlış vardiyayı devretmek düzeltilemez ve kimse fark etmez.
   Rütbeyi taşıyan: yalnız başınalık ve en üstte olmak. En büyük öğe DEĞİL; en büyük dokunulabilir öğe kişi seçicidir.
2. Kişi seçici — bu yüzeydeki tek gerçek seçim. Rütbeyi taşıyan: tek etkileşimli öğe olmak.
3. Uygunluk sonucu — kişi seçildikten sonra, seçicinin hemen altında
4. Birincil eylem "Teklif et"
5. Not alanı, 140 karakter, isteğe bağlı
6. Çıkış

REQUIRED STATES:
- default: vardiya bloğu dolu, kişi seçilmemiş, not alanı görünür ama etkin değil
- empty: NONE — bu yüzeyin boş hâli yoktur. MUST NOT: boş hâl uydurma.
- loading: eylem yerinde ilerleme; yüzey kapanmaz, çıkışlar açık kalır
- error: yüzey içinde, kesintili, girilen not korunur
- rule-failed: teklif kurulmaz, sebep kişi seçicinin altında, kişi seçili kalır
- duplicate: bu vardiya için zaten açık takas var; mevcut takasa çıkış verir
- old-version: seçilen kişi seçilemez, sebebiyle

NAVIGATION:
- Giriş: haftalık çizelge ekranında bir vardiya → "Takasa aç"
- Çıkış: geri hareketi ve ekrandaki vazgeçme kontrolü AYNI şeyi yapar: hiçbir şey kurulmaz
- Teklif gönderilirken çıkışlar açık kalır, yalnız birincil eylem kapanır

INPUT:
- required: vardiya (önceki ekrandan), kişi
- order: kişi seçilmeden not alanı etkin değil
- pre-filled: vardiya, çizelge ekranındaki seçimden. Bu yüzeyde DEĞİŞTİRİLEMEZ.

MUST NOT:
- Uygun çalışan listesi, havuz, "sana uygun kişiler" bölümü çizme
- Kişi önerme, sıralama, "en uygun" işareti koyma
- Rehberden kişi içe aktarma, avatar, profil fotoğrafı
- Kişi listesini uygunluğa göre süzme (liste mağazanın tamamıdır)
- Vardiyayı bu yüzeyde değiştirilebilir bir alan yapma
- Uygunluk sonucunu garanti gibi yazma
- Altı kuralın red sebebi metinlerini KENDİN YAZMA — sahibi İK, yer tutucu bırak, kural başına en fazla 80 karakter
- Gerçek marka, gerçek mağaza zinciri, gerçek kurum adı kullanma

CONSTRAINTS:
- surface: telefon, iOS + Android
- accessibility: belirtilmedi — varsayma. Taban: en büyük yazı ayarında vardiya bloğu ve birincil eylem okunur
- design system: verilmedi — çıktı bir düzen çalışmasıdır, tasarım değil

CONTENT:
- copy: §13.1'deki 1–8 numaralı satırlar, hepsi [DRAFT]
- example data: Ö-1, Ö-2, Ö-3 (§13.2)
```

```
SURFACE: Y-3 Takas durum
PRIMARY JOB: Takasın nerede olduğunu ve sıranın kimde olduğunu görmek

ELEMENTS, IN RANK ORDER:
1. Durum cümlesi — sıradaki kişiyi adıyla anar. Rütbeyi taşıyan: ilk okunan satır ve başlık ağırlığındaki tek metin
2. Vardiya bloğu — Y-2 ve Y-4'tekiyle AYNI blok, aynı sıra
3. Karşı taraf
4. Not
5. Geri çekme (yalnız devreden çalışanda ve yalnız üstlenilmeden önce)
6. Çıkış

REQUIRED STATES:
- default: cevap bekleniyor
- accepted-awaiting-approval: müdürde; geri çekme KAYBOLUR, devre dışı görünmez
- approved / rejected / declined / withdrawn: dört ayrı bitmiş hâl
- write-failed: "Onay çizelgeye işlenemedi. Vardiya hâlâ sende" — kesintili
- rule-failed-on-accept: NOT DECIDED (TB-2) — işaretli yer tutucu olarak çiz, gerçek bir sonuç uydurma
- loading / error: standart
- empty: NONE — bu yüzey her zaman tek bir takası gösterir

NAVIGATION:
- Giriş: çizelge ekranındaki işaretli vardiya, ya da bildirim
- Çıkış: geri → çizelge

INPUT:
- required: yok
- pre-filled: yok

MUST NOT:
- "Takaslarım" listesi ya da geçmiş takaslar bölümü çizme
- İptal, geri alma ya da "müdüre hatırlat" eylemi ekleme
- Geri sayım, son tarih, süre uyarısı gösterme
- Denetim izi, kural sürümü, saklanan saat değerleri gösterme

CONSTRAINTS:
- surface: telefon
- accessibility: belirtilmedi — varsayma
- design system: verilmedi

CONTENT:
- copy: §13.1, 9–15 [DRAFT]
- example data: Ö-1, Ö-2, Ö-3
```

```
SURFACE: Y-4 Gelen teklif
PRIMARY JOB: Teklifi üstlenmek ya da geri çevirmek

ELEMENTS, IN RANK ORDER:
1. Vardiya bloğu — üstlenmek o gün çalışmayı kabul etmektir. Rütbeyi taşıyan: en üstte, yalnız, ekrandaki tek tarih
2. Teklif eden kişi
3. Not
4. "Üstlenirsen ne olur" cümlesi — eylemlerle AYNI kutunun içinde, hemen üstlerinde
5. Üstleniyorum
6. Geri çeviriyorum
7. Çıkış

REQUIRED STATES:
- default: açık teklif
- submitting: eylem yerinde ilerleme; yüzey kapanmaz
- rule-failed-on-accept: NOT DECIDED (TB-2) — işaretli yer tutucu
- closed: "Bu teklif artık geçerli değil" — eylemler yok, tek çıkış
- loading / error: standart
- empty: NONE

NAVIGATION:
- Giriş: bildirim, ya da çizelge ekranındaki işaret
- Çıkış: geri = cevap verilmedi, teklif açık kalır. "Geri çevir" bir çıkış değil, bir cevaptır

INPUT:
- required: cevap
- order: tek adım
- pre-filled: yok

MUST NOT:
- Karşı teklif, pazarlık, "başkasına yönlendir" eylemi ekleme
- Üstlenmeden sonra geri alma eylemi çizme — bu karar verilmedi (TB-1)
- 4 numaralı cümleyi kendin yazma: TB-1 kararına bağlı, işaretli yer tutucu, 90–120 karakter
- Karşı tarafın yaşı, doğum tarihi, izni ya da raporu gösterme

CONSTRAINTS:
- surface: telefon
- accessibility: belirtilmedi — varsayma
- design system: verilmedi

CONTENT:
- copy: §13.1, 16–19 [DRAFT]
- example data: Ö-1, Ö-2, Ö-3
```

```
SURFACE: Y-5 Müdürün bekleyen takas kuyruğu
PRIMARY JOB: Bekleyenler arasından birini karara açmak

ELEMENTS, IN RANK ORDER:
1. Satırdaki vardiya tarihi ve saati — en yakın başlayan vardiya ilk düzeltilemez hale gelir.
   Rütbeyi taşıyan: satırın en solunda ve en büyük metni olmak
2. İki ad, tarihin altında ikinci satırda
3. Ne zamandır beklediği — geçmiş zaman
4. Not var/yok işareti
5. Çıkış

REQUIRED STATES:
- default: vardiya başlangıcına göre ARTAN sıralı liste
- empty: "Şu an onay bekleyen takas yok" — bu yüzeyin en sık görülen hâlidir, gerçekten çiz
- loading / error: standart

NAVIGATION:
- Giriş: uygulamanın müdür bölümü
- Çıkış: geri
- Bir satıra dokunmak Y-6'yı açar. Satırın kendisinde onay/red eylemi YOKTUR

INPUT:
- required: yok

MUST NOT:
- Çoklu seçim, toplu onay, kaydırarak onaylama
- Geri sayım, son tarih, gecikme rozeti
- Sıralamayı talep geliş sırasına çevirme
- Süzme, arama, sekme ekleme
- Satırı bilgi kartı gibi çizme: satır dokunulabilir görünmeli

CONSTRAINTS:
- surface: telefon
- accessibility: belirtilmedi — varsayma
- design system: verilmedi

CONTENT:
- copy: §13.1, 20–22 [DRAFT]
- example data: Ö-1, Ö-2, Ö-3 art arda; Ö-3'ün üç kopyası da çizilsin
```

```
SURFACE: Y-6 Müdürün karar yüzeyi
PRIMARY JOB: Takası onaylamak ya da gerekçesiyle reddetmek

ELEMENTS, IN RANK ORDER:
1. Devir cümlesi: "{Ad-1}'in {tarih} {saat} vardiyasını {Ad-2} üstleniyor" — tek cümle, iki ad cümlenin içinde.
   Rütbeyi taşıyan: ekrandaki en büyük metin olmak. Bu, rütbe 1'in en büyük öğe olduğu tek yüzey
2. Dönüşü olmayan an uyarısı — eylemlerin ÜSTÜNDE
3. Not
4. Onayla
5. Reddet
6. Çıkış

REQUIRED STATES:
- default: karar verilmemiş, hiçbir eylem ön seçili değil
- reject-open: serbest metin alanı görünür; boşken "Reddet" etkin değil
- submitting: yüzey içinde ilerleme; kuyruğa dönmez
- approved: kuyruğa döner, satır düşer
- write-failed: yüzey içinde kesinti, satır kuyrukta kalır, "çizelgeye işlenemedi"
- loading / error: standart
- empty: NONE

NAVIGATION:
- Giriş: kuyruktaki bir satır
- Çıkış: geri = karar verilmedi, satır kuyrukta kalır
- Onaydan sonra İKİNCİ BİR ONAY EKRANI YOKTUR

INPUT:
- required: karar; reddetmede serbest metin zorunlu
- order: "Reddet" seçilmeden metin alanı yok
- pre-filled: yok

MUST NOT:
- Onaydan sonra ikinci bir onay penceresi ya da alt sayfa ekleme
- Dört maddelik red sebebi listesi ya da herhangi bir sebep seçimi çizme
- "Kurallardan geçti" damgasını onay yerine geçirme
- İki tarafın haftalık toplam saatini gösterme — bu bir kapsam eklemesidir, alınmadı (E-5)
- Karşı tarafın yaşı, doğum tarihi, izni ya da raporu gösterme
- Onay eylemini birincil, reddi görünmez yapma: ikisi de görünür kalır
- Hangi müdüre düştüğünü varsayma: KŞ-12 açık, işaretli yer tutucu bırak

CONSTRAINTS:
- surface: telefon
- accessibility: belirtilmedi — varsayma. Taban: en büyük yazı ayarında devir cümlesi kırpılmadan okunur
- design system: verilmedi

CONTENT:
- copy: §13.1, 23–26 [DRAFT]
- example data: Ö-1, Ö-2, Ö-3
```

```
SURFACE: Y-7 Bildirimler
PRIMARY JOB: Kişiyi takasın sıradaki adımına götürmek

ELEMENTS, IN RANK ORDER:
1. Ne oldu — başlık
2. Hangi vardiya — gövde
3. Ne yapması gerektiği

REQUIRED STATES:
- teklif geldi (üstlenene) → Y-4
- onaya düştü (müdüre) → Y-6
- sonuçlandı (iki tarafa) → Y-3
- Plan yazması düştü (iki tarafa) → Y-3, durum 13

MUST NOT:
- Dördüncü bir bildirim ekleme; "geri çekildi" bildirimi bu dilimde YOK (E-4)
- Kişi adını başlığa koyma; ad gövdeye girer
- Geri sayım, hatırlatma, tekrar gönderme
- Yönlendirmenin çalıştığını varsayma: TB-7 açık, bildirim metni vardiyayı adıyla taşır

CONSTRAINTS:
- surface: telefon, mevcut push altyapısı [ASSUMED]
- design system: verilmedi

CONTENT:
- copy: §13.1, 27–29 [DRAFT]
```

### Bu bloğun kontrol edemedikleri

Kararlar gerekli, yeterli değil. Aşağıdaki dördü verilmezse üretici dördünü de kendi uydurur ve sonuç **bitmiş gibi okunur**.

| # | Eksik | Verilmezse ne olur |
|---|---|---|
| 1 | Gerçek metin | §13.1 taslak; onaylanmazsa taslak metin ekran görüntüsüyle onaylanmış olur |
| 2 | Zor örnek içerik | Ö-3 verilmezse kısa ad ve tam saat çizilir; taşan hiçbir şey görülmez |
| 3 | Tam durum seti | §7'deki 24 durum ada ada istenmezse yalnız varsayılan hâl çizilir |
| 4 | Tasarım sistemi | Erişim yok (TB-6); üretici kendi görsel dilini kurar ve o dil ürünün dili değildir |

1 ve 2 için gereken toplam süre on dakikadır ve çıktıyı diğer her şeyden fazla değiştirir. Kullanıcılar bu ikisini güvenilir biçimde atlar.

**Üreticinin çıktısı tasarım değildir.** Kararlara saygı gösteren bir düzen taslağıdır; eleştirilmemiştir, durumları taranmamıştır, kimse gerçek bir kullanıcıya tutmamıştır. Onu yapan `ux-grill`'dir ve bu belgeyi üretmemiş bir bağlamda koşturulmalıdır.

---

## Nereye gidiyor

Bu kayıt tek bir belgedir ve kimse belgelerden inşa etmez. Zincir bir akış, bir veri modeli ya da bir ihtiyaç listesi de ürettiğinde `build-context` hepsini tek pakete toplar ve birbirlerine tutar — bu tasarımın kendi akışıyla sessizce çeliştiği yer orada yakalanır. Ayrıca §0'da yazılı: `flow-map` koşturulduğunda §7 büyüyecek ve bu belgenin ikinci sürümü gerekecek.
