# Prior Art — Vardiya Takası

**Okunan belge:** `00-talep.md` (Selin Aydın, İK İş Ortağı, 12 Ocak)
**Tarih:** 31 Ağustos 2026

## Bu geçiş hakkında iki not

**Öz-inceleme:** Talebi ben yazmadım, bu oturumdan önce yazılmıştı; ben yalnızca okudum. Mekanizmayı seçen kişiyle karşılaştırmayı yapan kişi ayrı olduğu için bu geçiş *compromised* değil.

**Çağıran belli değil.** Normalde üç işten hangisini yaptığımı sormam gerekirdi (mekanizma sapmaları mı, kısıt sapmaları mı, kapasite sapmaları mı). Soramadığım için elimdeki belgeye baktım: bu bir shaped request, mekanizmayı gereksinim gibi yazıyor ve birkaç kararı Plan ile mevzuata dayıyor. Ağırlığı **Mechanism**'e verdim, **Capability**'yi de aldım çünkü bu ikisi bugün kapanabilir. **Constraint** en sonda ve en kısa.

Aşağıdaki her satır açtığım bir sayfaya dayanıyor. Açamadıklarım Faz 4'te.

---

## Kısaca ne çıktı

| # | Kind | Sapma | Sahibi |
|---|---|---|---|
| C1 | Capability | Plan yazma ucunda koşullu yazma var mı, bilinmiyor | Murat Şen (Plan) |
| C2 | Capability | "Gece" 22:00 alınmış; mevzuattaki tanım daha erken başlıyor | İK / hukuk |
| M1 | Mechanism | Vardiya havuza düşüyor; okuduğum ürünler adresli teklif ediyor | Selin Aydın |
| M2 | Mechanism | Ürün "takas" adını taşıyor ama tek yönlü devir | Selin Aydın |
| K1 | Constraint | Müdür onayı zorunlu; alanda bu bir ayar | Selin Aydın / İK |
| K2 | Constraint | Gece postasında 7,5 saat sınırı uygunluk kurallarında yok | İK |

---

## Capability sapmaları

### C1 — Plan'ın yazma ucu çakışmayı nasıl karşılıyor

**Ne yazıyor.** Yazma ucu var, hiç kullanılmamış. Aynı vardiyayı iki kişinin üstlenmesi "muhtemelen ilk gelen alır" diye açık bırakılmış.

**Ne okudum.** Microsoft Graph'ın vardiya değiştirme ucu (`PUT /teams/{teamId}/schedule/shifts/{shiftId}`) istek başlıklarını tek tek sayıyor: `Authorization`, `Content-Type`, `MS-APP-ACTS-AS`. `ETag`, `If-Match` ya da herhangi bir sürüm kontrolü sayfada geçmiyor. Yani olgun bir çizelge platformunun yazma ucu bile koşullu yazmayı belgelendirmiyor; çakışmayı çağıran taraf çözüyor.

**Ne demek.** "İlk gelen alır" bir ürün kararı gibi duruyor, oysa Plan'ın ucu koşullu yazmayı desteklemiyorsa bu bir ürün kararı değil, uygulanamaz bir cümle. İkinci üstlenme sessizce birinciyi ezerse ortaya çizelge–bordro uyuşmazlığı çıkar; yani projenin ikinci başarı ölçütünü ürünün kendisi üretir.

**Soru.** Plan'ın yazma ucu koşullu yazma (sürüm/`If-Match` benzeri) sunuyor mu, çakışmada ne dönüyor? — **Murat Şen**, bugün cevaplanabilir.

**Cevaba göre ne değişir.** Destekliyorsa "ilk gelen alır" yazılabilir bir kural. Desteklemiyorsa üstlenme akışına kilit ya da tek yazıcı gerekir ve bu, tasarımı değil mimariyi ilgilendirir.

### C2 — Gece vardiyası 22:00 diye tanımlanmış

**Ne yazıyor.** "18 yaşından küçükse gece vardiyası (22:00–06:00) üstlenemez."

**Ne okudum.** Postalar Halinde İşçi Çalıştırılarak Yürütülen İşlerde Çalışmalara İlişkin Özel Usul ve Esaslar Hakkında Yönetmelik'in konsolide metninde madde 5: *"18 yaşını doldurmamış çocuk ve genç işçilerin çalıştırılmaları yasaktır"* — gece postaları için. Yönetmelik gece postasını 4857'nin tanımına bağlıyor. 4857 madde 69'un gece tanımı ise *"en geç saat 20.00'de başlayarak en erken saat 06.00'ya kadar geçen ve her halde en fazla 11 saat süren dönem"* — bu cümleyi bir hukuk bürosunun sayfasından okudum, resmî metni açamadım, o yüzden bu satır `[UNVERIFIED]`.

**Ne demek.** 20:00–02:00 arası bir vardiya, talepteki kuralı geçer; mevzuattaki gece penceresinin içindeyse geçmemesi gerekir. Uygunluk kurallarının tamamı "müzakere edilebilir değil" diye yazılmış, dolayısıyla bu bir tolerans değil, yanlış eşik.

**Soru.** Gece eşiği neden 22:00; 4857'nin tanımıyla mı hizalandı, yoksa mağaza pratiğinden mi geldi? — **İK / hukuk**, tek sayfada kapanır.

**Cevaba göre ne değişir.** Eşik 20:00'ye çekilirse 18 yaş altı için uygun vardiya kümesi daralır ve akşam postalarında kapsama etkisi doğar; bu, çıkmadan önce bilinmesi gereken bir şey.

---

## Mechanism sapmaları

### M1 — Vardiya havuza düşüyor, kimseye teklif edilmiyor

**Ne yazıyor.** Çalışan vardiyayı takasa açar, vardiya aynı mağazadaki uygun çalışanların listesinde görünür, biri "ben alırım" der. Otomatik eşleştirme yok, kime uygun olduğu gösterilmiyor.

**Ne okudum.** İki ürün de akışı ters kuruyor. Microsoft Shifts'te başlatan kişi karşı tarafı seçiyor: takas için kendi vardiyasını ve bir takım arkadaşının vardiyasını, devir için kendi vardiyasını ve alıcıyı; *"Your teammate can choose to accept or decline your swap request."* When I Work'te de teklif adresli: *"The app shows employees that are qualified (based on position and location) and available to take your shift."* Havuz modeli de var, ama okuduğum yerde başka bir bağlamda: Gap'te koşulan saha deneyinde uygulama üzerinden vardiya havuza atılıyordu ve müdür devrede değildi.

**Ne demek.** Havuz, talebin "bilmiyoruz" listesindeki iki soruyu *kendi eliyle üretiyor.* Adresli teklifte "aynı anda iki kişi üstlenirse ne olur" sorusu yoktur, çünkü alıcı tektir. Müdür onayının 48 saatte gelmemesi de adresli akışta daha küçük bir sorundur, çünkü ortada bekleyen bir liste değil, bekleyen tek bir kişi vardır. Havuzun karşılığında elde edilen şey de gerçek: 9.100 kişilik bir işletmede kimin uygun olduğunu bilmek çalışanın işi olmaktan çıkıyor.

**Soru.** Havuz, adresli teklife karşı bilerek mi seçildi; seçildiyse eşzamanlı üstlenme maliyeti hesaba katılmış mıydı? — **Selin Aydın**.

**Cevaba göre ne değişir.** Bu sapma `slice` için adı konmuş bir alternatif üretiyor: **adresli teklif** ilk sürüm olarak kesilirse, kesilen şey bir özellik değil, iki açık sorunun tamamı. Alternatifi olmayan bir kesme çıkarma işlemidir; bu bir tercih.

### M2 — Ürünün adı "takas", yaptığı iş devir

**Ne yazıyor.** "Vardiya bölünmez, tamamı devredilir." Karşılığında bir vardiya geri gelmiyor; kimse kendi vardiyasını vermiyor.

**Ne okudum.** İki ürün de bu ikisini ayrı isimlerle ayrı akışlar olarak belgeliyor. Microsoft: *"Want to swap a shift?"* karşısında *"Need a shift covered? Here's how to offer a shift to someone else on your team."* When I Work aynı ayrımı swap ve drop diye yapıyor. Graph'ın veri modelinde de ayrım taşıyor: `swapShiftsChangeRequest`, `offerShiftRequest`'ten türüyor ve üstüne yalnızca `recipientShiftId` alanını ekliyor.

**Ne demek.** İki sonuç var. Birincisi, uygunluk kuralları yalnızca alan kişiye çalışıyor: veren kişinin haftalık saati düşüyor ve düşmesinin bir alt sınırı olup olmadığına kimse bakmıyor. TİS'te asgari saat taahhüdü varsa devir onu sessizce bozabilir. İkincisi, gerçek takas ileride istenirse Graph'ın modelindeki tek alanlık fark, burada bir veri modeli değişikliği olarak geri gelir.

**Soru.** Karşılıklı takas bilerek mi kapsam dışı bırakıldı; TİS'te vardiya vermeyi sınırlayan bir asgari saat taahhüdü var mı? — **Selin Aydın**.

**Cevaba göre ne değişir.** Asgari saat taahhüdü varsa uygunluk kuralları listesi eksik: veren tarafa da bir kural gerekiyor.

---

## Constraint sapmaları

### K1 — Müdür onayı zorunlu ve kapatılamaz

**Ne yazıyor.** Her takas müdür onayından geçer. Onayın atlanabileceği bir hâl tarif edilmemiş.

**Ne okudum.** When I Work bunu doğrudan bir ayar olarak belgeliyor: *"Swap and drop requests do not require approval if Require Manager Review for Swaps and Drops is turned off in the Scheduling Settings."* Aynı yardım metni ayarı açıkken isteğin çalışanlara görünmeden önce "Pending Approval" durumuna düştüğünü söylüyor. Microsoft'un takım çizelgesi ayarları sayfasında ise "Swap shifts" ve "Offer shifts" açılıp kapatılabiliyor, onayı kapatan bir ayar geçmiyor; yani alanda iki uygulama var ve biri bunu yapılandırılabilir tutuyor.

**Ne demek.** Birinci başarı ölçütü müdürün elle düzeltme mesaisini %61'den %15'e indirmek. Onay da müdür işidir. Tasarım, düzeltme işini onay işine çeviriyor; süre kısalabilir ama ölçüt "düzeltme" üzerinden tanımlandığı için ölçüt yeşile döner, müdürün takvimi dönmeyebilir. Uygunluk kurallarının hepsi sert blok olduğu için, onaya gelen her takas zaten kuralları geçmiş bir takastır: müdürün elinde kalan gerekçe `mağaza doluluğu` ve `disiplin`, yani dördün ikisi.

**Soru.** Kuralların tamamını geçen bir takas için otomatik onay değerlendirildi mi; onay istisna için mi, her vaka için mi? — **Selin Aydın / İK**.

**Cevaba göre ne değişir.** Otomatik onay masadaysa 48 saat sorusu büyük ölçüde ortadan kalkar ve birinci ölçüt gerçekten ölçtüğü şeyi ölçer.

### K2 — Gece postasında 7,5 saat sınırı listede yok

**Ne yazıyor.** Uygunluk kuralları: aynı mağaza, rol yetkinliği, haftalık 45 saat, 11 saat dinlenme, o gün başka vardiya yok, 18 yaş altı gece yok.

**Ne okudum.** Aynı yönetmeliğin madde 7'si gece postalarında 7,5 saatten çok çalıştırmayı yasaklıyor (turizm, özel güvenlik, sağlık ve petrol arama için işçinin yazılı onayıyla istisna tanıyor; perakende bu listede geçmiyor). Madde 9 ise talepteki 11 saat kuralının kaynağı: *"Posta değişiminde işçiler sürekli olarak en az onbir saat dinlendirilmeden çalıştırılamaz."*

**Ne demek.** Talep 11 saati aynı yönetmelikten almış ama 7,5 saati almamış. Sekiz saatlik bir gece vardiyasını devralmak, listedeki altı kuralın hepsini geçer. Kural ihlali olan bir takasın "hiç teklif edilmemesi" isteniyorsa, bu kural listede olmalı ya da neden olmadığı yazılı olmalı.

**Soru.** 7,5 saat sınırı bilerek mi dışarıda bırakıldı, yoksa Bereket'te gece postası zaten 7,5 saati aşmıyor mu? — **İK**.

---

## Sapma çıkmayan yerler

Üç seçim okuduğum belgelerle örtüşüyor, bunları soru olarak yazmıyorum. Uygun olmayanı listede hiç göstermemek: When I Work aynısını yapıyor (*"qualified (based on position and location) and available"*). Reddederken gerekçe taşımak: Graph'ta bunun için ayrı bir alan var (`managerActionMessage`). Onaydan sonra çizelgenin kendiliğinden güncellenmesi: Microsoft'un metni *"your shift and your teammate's shift are updated in the schedule"* diyor.

---

## Bu tür bir mekanizma işe yarıyor mu — yayımlanmış kayıt

Talebin üçüncü ölçütü bir davranış iddiası: takasların %70'i sistem içinde tamamlanacak, WhatsApp'a düşmeyecek. Birinci ölçüt de öyle: uygulama içi akış müdürün elle düzeltmesini yerinden edecek.

**Ne okudum.** WorkLife Law'ın Stable Scheduling Study raporu, Gap'in 28 mağazasında koşulmuş rastgeleleştirilmiş bir saha deneyi (19 uygulama, 9 kontrol, Kasım 2015–Ağustos 2016). Müdahalenin dört bileşeninden biri uygulama üzerinden takastı: *"Through an app called Shift Messenger, associates could swap shifts without requiring manager involvement."* Mağaza sonuçları: satışta %7, işgücü verimliliğinde %5 artış.

**Kayıt neyi söylüyor, neyi söylemiyor.** Dört bileşen birlikte uygulanmış; rapor sayfasında takas uygulamasının kendi etkisi ayrıştırılmıyor. Yani elimizdeki en güçlü kanıt, **müdürün devrede olmadığı** bir takas mekanizmasının içinde bulunduğu bir paketi destekliyor. Bereket'in tasarımı tam tersini yapıyor: müdürü zorunlu kılıyor. Kanıt bu tasarıma karşı değil, ama bu tasarımı da desteklemiyor.

**Kayıt nerede yok.** Uygulamanın benimsenme oranını, kaç takasın uygulama içinde kaldığını, müdür mesaisine etkisini arayıp bulamadım: raporun PDF'i taranmış görüntü olarak geldi, HBR'nin makale gövdesi açılmadı. Aramada bunun dışında çıkan her şey satıcı pazarlama sayfasıydı. **Konuşmanın WhatsApp'tan uygulamaya taşınmasını ölçen bir yayın bulamadım.** %70 hedefi, ölçülmüş bir emsale değil, bir umuda dayanıyor. Bu hedefin yanlış olduğunu söylemiyorum; kanıtla desteklenmediğini söylüyorum.

**Bu bölüm bir sapma değil**, dolayısıyla talebe sapma olarak yazılmamalı. Liyakat sorusunu kim sorduysa (idea-grill koştuysa o, koşmadıysa talebi yazan) ona gider.

---

## Şekli değiştirecek üç soru

1. **K1 — Kuralları geçen takas için otomatik onay masada mı?** Cevap "hayır" ise birinci başarı ölçütü, ürünün kendi tasarımıyla çelişiyor demektir. Her şeyden önce bu.
2. **C1 — Plan'ın yazma ucu koşullu yazma sunuyor mu?** Bugün, tek e-postayla kapanır ve cevabı "hayır" ise akışın ortasına kilit girer.
3. **M1 — Havuz mu, adresli teklif mi?** Adresli teklif, talebin kendi açık sorularından ikisini birden kapatıyor.

---

## Bunları kim yazacak

- M1, M2, C1: talebe geri gider, **`request-shaper`'ın ikinci geçişi** yazar (ben yazmam), "Bilmediklerimiz" bölümüne. Sonra belge yeniden puanlanır: M1'in cevabı iki maddeyi kapsam dışına çıkarabilir.
- C2, K1, K2: `[DECISION NEEDED]`, sahibi yukarıda yazılı. Bunlar tasarımı değil kuralı ilgilendirdiği için talebe değil, kısıtları kim tutuyorsa ona gider.
- Davranış bölümü: liyakat sorusunun sahibine.
- `slice` için: **adresli teklif**, adı konmuş alternatif (M1).

---

## Faz 4 — Kontrol edemediklerim

**Açtığım kaynaklar.**

1. Microsoft Support — Request open shifts, swap or offer shifts in Shifts: https://support.microsoft.com/en-us/office/request-open-shifts-swap-or-offer-shifts-in-shifts-50920ad2-a0e7-4f4a-aeb8-adf57d3b0c88
2. Microsoft Support — Configure settings for your team's schedule in Shifts: https://support.microsoft.com/en-gb/office/configure-settings-for-your-team-s-schedule-in-shifts-1aef353d-e2df-4661-abdd-4014cb57f17b
3. Microsoft Graph — swapShiftsChangeRequest resource type (beta): https://learn.microsoft.com/en-us/graph/api/resources/swapshiftschangerequest?view=graph-rest-beta
4. Microsoft Graph — Replace shift (v1.0): https://learn.microsoft.com/en-us/graph/api/shift-put?view=graph-rest-1.0
5. When I Work — Getting Your Shifts Covered: https://help.wheniwork.com/articles/getting-your-shifts-covered/
6. When I Work — Processing Shift Requests: https://help.wheniwork.com/articles/processing-shift-requests-computer/
7. Lexpera — Postalar Halinde İşçi Çalıştırılarak Yürütülen İşlerde... Yönetmelik, konsolide metin (m.5, m.7, m.9): https://www.lexpera.com.tr/mevzuat/yonetmelikler/postalar-halinde-isci-calistirilarak-yurutulen-islerde-calismalara-iliskin-ozel-usul-ve-esaslar
8. WorkLife Law — Stable Scheduling Study, rapor sayfası: https://worklifelaw.org/projects/stable-scheduling-study/report/
9. Özdipi — Gece çalışması ve saatleri (4857 m.69 metnini aktarıyor, ikincil kaynak): https://www.ozdipi.av.tr/gece-calismasi-ve-saatleri/

**Açamadıklarım.**

- **mevzuat.gov.tr ve resmigazete.gov.tr:** ikisi de TLS sertifika hatasıyla açılmadı. Mevzuat metinlerinin *resmî* nüshasına hiç ulaşamadım. Yönetmelik maddelerini Lexpera'nın konsolide metninden, 4857 madde 69'u bir hukuk bürosunun sayfasından okudum. **C2'deki 20:00 eşiği bu yüzden `[UNVERIFIED]`.** Karar vermeden önce resmî metinden doğrulanmalı; bu, hukuk için beş dakikalık iş.
- **Adalet Bakanlığı ve OGÜ'deki yönetmelik PDF'leri:** indi, metin katmanı çıkarılamadı.
- **Deputy yardım merkezi:** HTTP 403. Üçüncü bağımsız ürün kaynağı olacaktı; iki ürünle yetindim. "İki bağımsız kaynak bir örüntüdür" eşiğini geçiyor ama üçüncüsü M1'i güçlendirirdi.
- **Stable Scheduling Study raporunun PDF'i:** taranmış görüntü, metin yok. **HBR'nin 2017 tarihli "How The Gap Used an App..." yazısı:** gövde servis edilmedi. Takas uygulamasının benimsenme oranı bu iki yerdeydi ve elde edemedim.
- **45 saat sınırının hukuki niteliği:** talep bunu sert blok yazıyor. 4857'nin fazla çalışmaya izin verip vermediğini, dolayısıyla bunun kanun tavanı mı işveren politikası mı olduğunu resmî metne ulaşamadığım için kontrol edemedim. Kaynağı olmayan satırı yazmadım; soru olarak da yazmadım. **Bu, açıkta kalan bir kontroldür.**

**Arama boş dönen tek yer:** vardiya konuşmasının gayriresmî kanaldan (WhatsApp benzeri) uygulamaya taşınmasını ölçen bir yayın. İki farklı arama denedim; dönen her şey satıcı pazarlamasıydı. İki okuması var: ya kimse ölçmemiş, ya da doğru terimi bulamadım. Perakende iş gücü yönetimi literatüründe "kanal göçü" başka bir adla anılıyor olabilir.
