# Impact Radar — Vardiya Takası

Kaynak: `00-talep.md` (Selin Aydın, İK İş Ortağı, 12 Ocak).

**Öz-inceleme notu.** Bu belgenin girdisi bu oturumda üretilmedi; dışarıdan gelen bir
talep dokümanı. Skill'in "kendi yazdığını denetleme" uyarısı bu koşum için geçerli değil.

---

## Faz 0 — Değişikliğin sınırı

### Ne değişiyor

Yayımlanmış bir haftanın çizelgesindeki **vardiya–çalışan eşlemesi**, mağaza müdürünün
Plan oturumu dışında bir yoldan değişebilir hale geliyor. Bugün bu eşlemeyi yalnızca müdür,
Plan arayüzünde, elle değiştiriyor. Bundan sonra Bereket Mobil, Plan'ın **hiç kullanılmamış
yazma ucu** üzerinden aynı alanı yazacak; kaydı tetikleyen çalışan, onaylayan müdür olacak.

İkinci ve daha az görünen değişiklik: bugün yalnız insanın okuduğu üç veri kümesi
(**rol yetkinliği, doğum tarihi, izin/rapor kayıtları**) makine kapısına dönüşüyor. Bunları
kimse "değişiklik" saymıyor, çünkü bir satırları bile yazılmıyor.

### Ne değişmiyor

Vardiya tanımları, saatleri, mağaza kadro ihtiyacı, bordro hesap kuralları, çizelge okuma
uçları, müdürün Plan'da elle düzeltme yeteneği. Mağazalar arası hareket, kısmi vardiya ve
web tarafı bu sürümün dışında (talepte yazılı). Bunların hiçbiri doğrulanmadı — Faz 3'e bakın.

### Erişim

Kod tabanı yok, Plan API dokümanı yok, analitik tanımları yok, mevcut rapor envanteri yok.
**Bu belge cevap değil, soru listesidir.** Kırk satırın kırkı `[UNVERIFIED]`; her satırın
yanında kontrolü kimin yapacağı yazıyor. Sahibi bilinmeyen yerlerde sahibin kendisi
`[DECISION NEEDED]`. Bu tabloyu "haritası çıkarıldı" diye aktaran biri yanlış aktarmış olur.

### Sınıf dağılımı

| Sınıf | Adet |
|---|---|
| Loud | 9 |
| Silent | 20 |
| Deferred | 11 |
| **Toplam** | **40** |

**Kırk bağımlının otuz biri çıkış günü hiçbir şey göstermez.** Dokuz tanesi patlar ve bir
günde düzeltilir; kalanı ya sessizce yanlış çalışır ya da ay sonunu, bordro gününü, denetimi
bekler.

### Belgenin şekli

Tek tablo. Sütunlar: `#` · `Boyut` · `Bağımlı` · `Sınıf` · `Kim fark eder / nasıl / süre` ·
`Sahip` · `Durum`. Satırlar `B01`–`B40` diye numaralı; sonraki fazlar ve sonraki belgeler
tek satıra işaret edebilsin diye. Gerekçesi hücreye sığmayan altı satır, tablodan sonra
blok halinde açıldı.

---

## Faz 1 ve 2 — On boyut, sınıflandırılmış

| # | Boyut | Bağımlı | Sınıf | Kim fark eder / nasıl / süre | Sahip | Durum |
|---|---|---|---|---|---|---|
| B01 | 1 | Bereket Mobil çizelge ekranında bayat önbellek | Silent | Çalışan, yanlış vardiyaya gelerek; günler | Ürün ekibi | [UNVERIFIED] |
| B02 | 1 | Plan müdür arayüzü ve mağaza back-office ekranı | Silent | Müdür, tanımadığı çizelgeyi görerek; gün | Murat Şen | [UNVERIFIED] |
| B03 | 1 | Plan yazma ucu — bu ekip hiç kullanmadı | Loud | Geliştirici, ilk entegrasyonda; saatler | Murat Şen | [UNVERIFIED] |
| B04 | 1 | Okuma uçları: "yayımlanmış hafta sabittir" anlamı düşüyor | Silent | Kimse; okuyan varsayımı sürdürür | Murat Şen | [UNVERIFIED] |
| B05 | 2 | Plan değişiklik logu — takas artık müdür düzeltmesi görünmeyebilir | Silent | Analitik, çeyrek ölçümünde; 3 ay | Selin Aydın | [UNVERIFIED] |
| B06 | 2 | Haftalık 45 saat: uygunluk motoru ikinci hesaplayıcı doğurur | Silent | Bordro, fazla mesai farkıyla; 1 ay | Bordro ekibi [DECISION NEEDED: sahip] | [UNVERIFIED] |
| B07 | 2 | PDKS/puantaj: planlanan–gerçekleşen karşılaştırması | Deferred | Bordro, ay sonu mutabakatta; 1 ay | Bordro ekibi | [UNVERIFIED] |
| B08 | 2 | Gece zammı ve fazla mesai — kim çalıştı değişiyor | Deferred | Çalışan, bordro fişinde; 1 ay | Bordro ekibi | [UNVERIFIED] |
| B09 | 3 | Yazma ucunun sözleşmesi ve yazmanın yan etkileri | Loud | Geliştirici, entegrasyon testinde; saatler | Murat Şen | [UNVERIFIED] |
| B10 | 3 | Bordronun 25'inde çektiği değer artık sonradan değişebilir | Deferred | İK, vaka olarak; 1–2 ay | Bordro ekibi | [DECISION NEEDED] |
| B11 | 3 | Push yükü: eski sürümde takas ekranı yok, derin bağlantı düşer | Loud | Çalışan, bildirime dokununca; saatler | Ürün ekibi | [UNVERIFIED] |
| B12 | 4 | Geçmiş takaslar logda "müdür elle düzeltmesi" olarak duruyor | Silent | Analitik, baz karşılaştırmasında; 3 ay | Selin Aydın | [UNVERIFIED] |
| B13 | 4 | Açık 1.840 uyuşmazlık vakası ve mevcut vaka tipleri | Deferred | İK, çeyrek raporunda; 3 ay | Selin Aydın | [UNVERIFIED] |
| B14 | 4b | Rol yetkinliği verisi gösterimken uygunluk kapısı oluyor | Silent | Müdür, yanlış kişiyi onaylayarak; hafta | Murat Şen | [UNVERIFIED] |
| B15 | 4b | Doğum tarihi: 18 yaş gece kapısı bu alana dayanıyor | Silent | Kimse; denetimde çıkar; aylar | [DECISION NEEDED: sahip] | [UNVERIFIED] |
| B16 | 4b | 11 saat dinlenme hafta sınırını aşar; önceki haftanın vardiyası gerekir | Silent | Müfettiş ya da sendika; aylar | Murat Şen | [UNVERIFIED] |
| B17 | 4b | İzin, rapor, ücretsiz izin kayıtları iki kural için de gerekli | Silent | Çalışan, izinliyken vardiya alarak; gün | Murat Şen | [UNVERIFIED] |
| B18 | 4b | Gece 22:00–06:00 tanımı Plan'daki vardiya tipleriyle eşleşiyor mu | Silent | Kimse; denetimde; aylar | Murat Şen | [UNVERIFIED] |
| B19 | 5 | Müdür Plan'da elle düzeltirken o vardiyada açık takas var | Silent | Mağaza, kimse gelmeyince; o gün | Ürün ekibi | [UNVERIFIED] |
| B20 | 5 | Yeniden yayım açık ya da onaylanmış takası siliyor olabilir | Silent | Çalışan, vardiyası geri gelince; gün | Murat Şen | [DECISION NEEDED] |
| B21 | 5 | Aynı vardiyayı iki kişinin üstlenmesi | Loud | Çalışan, hata ekranında; anında | Ürün ekibi | [DECISION NEEDED] |
| B22 | 5 | Vardiya, müdür onayı beklerken başlıyor | Silent | Mağaza, eksik kadroyla; o gün | Selin Aydın | [DECISION NEEDED] |
| B23 | 5 | Bordro kesiminden sonra onaylanan takas | Deferred | Çalışan, sonraki bordroda; 1 ay | Bordro ekibi | [DECISION NEEDED] |
| B24 | 6 | Başarı ölçütü 3'ün bugün bazı yok | Silent | Kimse; 3 ay sonra ölçülemez | Selin Aydın | [UNVERIFIED] |
| B25 | 6 | "Müdür başına 2,3 saat/hafta" ölçümünün yöntemi | Deferred | Selin, çeyrek raporunda; 3 ay | Selin Aydın | [UNVERIFIED] |
| B26 | 6 | Mağaza doluluk ve işgücü maliyeti raporları kişi bazlıysa kayar | Silent | Finans, ay sonu; 1 ay | [DECISION NEEDED: sahip] | [UNVERIFIED] |
| B27 | 7 | Plan'da yazma sonrası tetiklenen işler (bildirim, yeniden hesap) | Loud | Müdür, beklenmedik bildirimle; gün | Murat Şen | [UNVERIFIED] |
| B28 | 7 | 1.840 uyuşmazlığı bulan çizelge–bordro mutabakat kontrolü | Silent | İK, vaka sayısı düşünce; 3 ay | Selin Aydın | [UNVERIFIED] |
| B29 | 7 | Push hacmi: günde ~280 takas × 3–4 bildirim | Loud | Altyapı, kota ya da uyarıyla; gün | Ürün ekibi | [UNVERIFIED] |
| B30 | 7 | Plan API hız sınırı ve kotası | Loud | Geliştirici, 429 ile; saatler | Murat Şen | [UNVERIFIED] |
| B31 | 8 | 480 müdürün runbook'u: artık iki ayrı düzeltme yolu var | Silent | İK, tutarsız uygulamayla; hafta | Selin Aydın | [UNVERIFIED] |
| B32 | 8 | İK vaka tipleri: "takas onaylandı, bordro yanlış" karşılığı yok | Deferred | İK, sınıflanamayan vakayla; 1 ay | Selin Aydın | [UNVERIFIED] |
| B33 | 8 | Red sebebi `disiplin` sözlü uygulamadan yazılı kayda dönüyor | Deferred | Hukuk ya da sendika, ihtilafta; aylar | Selin Aydın | [UNVERIFIED] |
| B34 | 8 | Eşleştirme yok: anlaşma WhatsApp'ta kalır, uygulama kayıt olur | Silent | Selin, ölçüt 3 tutmayınca; 3 ay | Selin Aydın | [UNVERIFIED] |
| B35 | 9 | Plan ekibi: yazmalar müdürden ve düşük hacimden gelir varsayımı | Loud | Murat, hacim ya da kimlik itirazıyla; gün | Murat Şen | [UNVERIFIED] |
| B36 | 9 | Bordro ekibi: 25'ten sonra çizelge sabittir varsayımı | Deferred | Bordro, ay sonu; 1 ay | Bordro ekibi | [UNVERIFIED] |
| B37 | 9 | İK/hukuk: 45 ve 11 saat kuralı artık makine kararı ve TİS kaydı | Deferred | Hukuk, ilk ihtilafta; aylar | Selin Aydın | [UNVERIFIED] |
| B38 | 9 | Sendika: kimin çalışabileceğine karar veren bir sistem | Deferred | Sendika, TİS görüşmesinde; aylar | Selin Aydın | [UNVERIFIED] |
| B39 | 10 | Eski uygulama sürümü: uygun listede görünür, üstlenemez | Silent | Çalışan, teklifi hiç görmeyerek; hafta | Ürün ekibi | [UNVERIFIED] |
| B40 | 10 | Zorunlu güncelleme mekanizması var mı | Loud | Ürün, kurulum dağılımına bakınca; gün | Ürün ekibi | [UNVERIFIED] |

`[DECISION NEEDED]` işaretli beş satır (B10, B20, B21, B22, B23) talebin kendi
"Bilmediklerimiz" bölümünden geliyor; bu radar onları bulmadı, yerlerini gösterdi.
B19 ve B22 listede yoktu.

### Boş boyut yok, ama iki yerde az çıktı

Boyut 3'te dışa açık dosya, webhook ya da ortak veritabanı görünümü bulunamadı — talep
hiçbirinden söz etmiyor, yokluğu doğrulanmadı. Boyut 10'da web yok: talep web arayüzünü
açıkça dışarıda bırakıyor, o yüzden burada tek istemci mobil.

---

### Gerekçesi hücreye sığmayan satırlar

**B05 — Plan değişiklik logu, ölçüm yöntemini taşıyan yer**
Bağımlı: Q4 elle düzeltme analizi ve başarı ölçütü 1'in tamamı bu logdan üretiliyor.
Ne oluyor: bugün takas, müdürün elle düzeltmesi olarak loga düşüyor; %61 buradan çıktı.
Yeni akışta yazmayı entegrasyon yapıyor. Log satırının kime atfedildiği bilinmiyor.
Sonuç: yazma servis hesabına atfedilirse ölçüt kendiliğinden %0'a düşer ve hiçbir şey
kanıtlamaz; müdüre atfedilirse hiç düşmez ve başarılı bir çıkış başarısız görünür.
Sınıf: Silent. Kim fark eder: analitik, çeyrek ölçümünde, üç ay sonra.
Sahip: Selin Aydın, Murat Şen ile birlikte. Durum: [UNVERIFIED].

**B10 — Bordronun 25'inde çektiği çizelge**
Bağımlı: bordro kesimi. Ne oluyor: bugün 25'inde çekilen değer pratikte sabit, çünkü
değiştirmek için müdürün Plan'a girmesi gerekiyor. Yeni akışta 9.100 çalışan aynı alanı
değiştirebiliyor. Kesim tarihinden sonra onaylanan takas, bordronun okuduğu gerçeği geriye
dönük bozar. Sınıf: Deferred. Kim fark eder: çalışan, bir ay sonra fişinde; sonra İK vakası,
ortalama 9 gün. Sahip: Bordro ekibi. Durum: [DECISION NEEDED] — talepte açık soru.

**B14 — Rol yetkinliği verisi**
Bağımlı: uygunluk kuralının ikinci maddesi. Ne oluyor: kasa/reyon/kasap/fırın yetkinlikleri
Plan'da bugün de duruyor, ama bugüne kadar insanın baktığı bir alandı; yanlışsa müdür
düzeltiyordu. Şimdi kimin vardiyayı görebileceğine karar veren kapı oluyor. Bu veri hiç
kalite kontrolünden geçmedi: ayrılmış çalışan, eski yetkinlik, hiç girilmemiş alan.
Sınıf: Silent — sistem doğru çalışır, yanlış kişiye teklif eder ya da doğru kişiyi gizler.
Kim fark eder: müdür, yetkin olmayan birini onaylayınca; haftalar. Sahip: Murat Şen.
Durum: [UNVERIFIED].

**B16 — 11 saat dinlenme kuralı hafta sınırını aşar**
Bağımlı: uygunluk kuralının dördüncü maddesi. Ne oluyor: takas yayımlanmış hafta üzerinde
yapılıyor, ama pazartesi sabah 06:00 vardiyasının dinlenme hesabı önceki pazar gecesinin
vardiyasına bakmayı gerektiriyor — o vardiya başka bir haftanın çizelgesinde. Aynısı hafta
sonunda tersine. Uygulama bugün tek haftalık çizelge çekiyor. Sınıf: Silent — kural
hesaplanır, eksik veriyle hesaplanır, sistem "uygun" der. Kim fark eder: iş müfettişi ya da
sendika; aylar. Sahip: Murat Şen. Durum: [UNVERIFIED].

**B19 — Müdürün elle düzeltmesiyle açık takasın çarpışması**
Bağımlı: müdürün Plan'daki mevcut düzeltme yetkisi, ki kaldırılmıyor. Ne oluyor: bir vardiya
takasa açık dururken müdür aynı vardiyayı Plan'da başkasına veriyor. Takas hâlâ açık, hâlâ
üstlenilebilir, artık başka bir vardiyayı devrediyor. Ya da onaylanmış takasın üstüne
yazıyor. Sınıf: Silent. Kim fark eder: mağaza, o gün kimse gelmeyince. Sahip: Ürün ekibi ile
Murat Şen. Durum: [UNVERIFIED]. **Talebin "Bilmediklerimiz" listesinde yok**; yeniden yayım
düşünülmüş, elle düzeltme düşünülmemiş — oysa bugün olan şey elle düzeltme.

**B24 — Başarı ölçütü 3'ün bazı yok**
Bağımlı: "takasların %70'i müdür onayına 24 saat içinde ulaşsın" ölçütü. Ne oluyor: bugün
takas WhatsApp'ta konuşuluyor; bir takasın "başladığı an" hiçbir yerde kayıtlı değil.
Çıkıştan sonra ölçülecek şey, yalnızca sistemin içinde başlayan takasların içindeki süre —
yani paydası kendi ürününüz olan bir oran. WhatsApp'a düşen takas paydaya hiç girmez.
Sınıf: Silent. Kim fark eder: kimse; ölçüt %90 çıkar ve hiçbir şey söylemez. Sahip: Selin
Aydın. Durum: [UNVERIFIED].

---

## Faz 3 — Değişmediği söylenen sınırlar

**Kontrol edebildiğim sınır sayısı: 0.** Kod tabanı, Plan dokümanı ve rapor envanteri yok.
Aşağıdaki hiçbir satır güvence değildir; her biri, adı yazan kişinin doğrulaması gereken bir
iddiadır. **Bu tablodan bir satırın başka bir belgede "şu taraf etkilenmiyor" diye
alıntılanması yanlış alıntıdır.**

| # | Değişmediği iddia edilen | Kaynak | Kim doğrular |
|---|---|---|---|
| S1 | Vardiya tanımları, saatleri, kadro ihtiyacı | Talep | Murat Şen |
| S2 | Bordro hesap kuralları | [ASSUMED] | Bordro ekibi |
| S3 | Çizelge okuma uçları ve mevcut çizelge ekranı | Talep | Murat Şen |
| S4 | Müdürün Plan'da elle düzeltme yetkisi | [ASSUMED] | Murat Şen |
| S5 | Mağazalar arası hareket süreci | Talep | Selin Aydın |
| S6 | Müdür vardiyaları — akışın tamamen dışında | Talep | Selin Aydın |
| S7 | Web ve back-office arayüzleri | Talep | Selin Aydın |
| S8 | Rol yetkinliği tanımlarının kaynağı — bu proje yazmaz | [ASSUMED] | Murat Şen |
| S9 | Vardiya bölünmezliği, kısmi devir yok | Talep | Selin Aydın |

S2, S4 ve S8 talepte hiç geçmiyor; bu satırlarda `[ASSUMED]` işareti benim varsayımım.

---

## Faz 4 — Regresyon yüzeyi

Değiştirdiğiniz şey zaten test edilecek. Bu liste, değiştirmediğinizi sandığınız şeylerin
listesi. Silent ve Deferred satırlardan çıkarıldı.

1. Takas onayından sonra **Plan değişiklik logu satırının kime atfedildiği** — ölçüm
   yönteminin hâlâ çalıştığını, kod değil ölçüm kanıtlar. (B05, B12)
2. **Bordro kesim günü akışı**: 25'inde çekim yapıldıktan sonra aynı aya ait onaylanmış bir
   takasın bordroda ne yaptığı. (B10, B23, B36)
3. **Müdürün Plan'da elle düzeltmesi**, üzerinde açık ve onaylanmış takas varken. (B19)
4. **Yeniden yayım**, açık takas ve onaylanmış takas varken. (B20)
5. **Hafta sınırını aşan dinlenme hesabı**: pazartesi ilk vardiya, cumartesi son vardiya.
   (B16)
6. **Eksik ya da bayat yetkinlik verisiyle** uygunluk listesi; ayrılmış çalışan; boş alan.
   (B14)
7. **İzinli, raporlu, ücretsiz izinli çalışanın** uygun listede çıkmadığı. (B17)
8. **18 yaşından küçük çalışan** için gece vardiyası kapısı; doğum tarihi boşsa davranış.
   (B15, B18)
9. **Eski uygulama sürümü**: uygun listede görünen ama üstlenemeyen çalışan; eski sürüme
   düşen push bildirimi. (B11, B39)
10. **Vardiya, onay beklerken başlarsa** çizelgenin ve mağazanın hali. (B22)
11. **Mevcut çizelge ekranının tazeliği**: onay sonrası her iki tarafta. (B01)
12. **Plan yazmasının yan etkileri**: yazma sonrası Plan'ın kendiliğinden bildirim atıp
    atmadığı, haftayı yeniden hesaplayıp hesaplamadığı. (B27)
13. **Hacim altında Plan API'si**: günde ~280 yazma, cuma 16:00 yayımı sonrası tepe. (B29,
    B30, B35)
14. **İK vaka sınıflandırması**: yeni akıştan doğan uyuşmazlık hangi tipe düşüyor. (B28,
    B32)

**Bu liste nereye gidiyor.** Bu koşumda bir `build-context` paketi toplanmıyor. O yüzden
düz söylüyorum: bu on dört madde **testleri yazan kişiye** ulaşmak zorunda, ve onu yönlendirecek
kişi **Selin Aydın**. Ayrı bir belge olarak dolaşırsa bir kez okunur ve kaybolur.

### Duyuru, bir izleme aracı olarak

Boyut 8, 9 ve 10 aramayla değil, haber vererek bulunur. Plan ekibi, bordro ekibi, İK
operasyon, hukuk ve sendika ilişkileri tarafına "yayımlanmış çizelgeyi mağaza çalışanının
tetiklediği bir yazma değiştirecek" cümlesini yazılı gönderin ve bir hafta bekleyin.
Tasarım kilitlenmeden en az **10 iş günü önce** yapılmalı. Kesin tarih: [DECISION NEEDED] —
Selin Aydın.

---

Son bir cümle, bir kez: talebin üç başarı ölçütünden ikisinin bazı bu değişikliğin kendisi
tarafından bozuluyor (B05, B24), ve bu bir ürün kararı değil ölçüm kararı — çıkmadan önce
düzeltilebilir. Değişikliğin yapılıp yapılmayacağı tartışması bu belgenin işi değil.
