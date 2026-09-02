# Vardiya Takası — Ekran Eleştirisi

## 1. Ne incelendi

**Bu çizimi ben üretmedim.** Kareler başka bir bağlamda, bu oturumun görmediği bir koşumda çizildi; incelemeyi bozan üretici-kendini-inceler durumu burada yok.

İncelenen: `12-ekranlar.html` — **33 telefon karesi**, 360 × 640 dp, tek dosya, tel çerçeve seviyesinde. Yedi yüzeyin altısı çizilmiş (Y-1 ödünç, tek kare), Y-7 kilit ekranı olarak. Karşısına tutulan kayıt `07-design-brief.md`; kapsamın kaydı `06-slice.md` §5.

**Çizim neyi görmüş.** Sayfa başlığı §14 üretici bloğunu kaynak gösteriyor, ama karelerin altyazıları B-3, B-5, B-6, B-9, D-13, H-01, H-07, KŞ-12 diye numara veriyor — yani çizen taraf yalnız bloğu değil kaydın tamamını görmüş. Bunun sonucu şu: aşağıdaki eksik durumların hiçbiri "bloğa girmemişti" ile açıklanamaz, hepsi gözden kaçmadır.

**Kayıt kendini kısmî ilan ediyor** ve tasarım sistemi verilmediği için çıktının "düzen çalışması, tasarım değil" olduğunu hem kayıt (§13.4) hem sayfanın kendi başlığı yazıyor. Bu, aşağıdaki bulguların hangisinin geçerli olduğunu değiştirir: tipografi ölçeği, renk rolü, ikon dili ve bileşen seçimi **eleştirilmedi**. Ölçülebilen şey ölçüldü — HTML kaynak olduğu için kontrast, hedef boyutu ve metin bütçesi tahmin değil, hesap.

Değerlendirilemeyenler §5'te.

---

## 2. Kayda uygunluk

Bu bölüm başta duruyor çünkü kimsenin koşmadığı geçiş budur: kendi kaydıyla çelişen bir ekran incelemeden geçer, hiçbir şey bozuk görünmez.

| # | Kaydın kararı | Çizimin yaptığı | Severity | Bulgu |
|---|---|---|---|---|
| K-1 | §1: "devreden ve üstlenen çalışanın takası izlediği tek yer" | Y-3'ün dokuz karesi de devreden çalışanın tarafı | Critical | F6 |
| K-2 | §4: "kişi Y-1'den bulur; tasarım bu ihtimali karşılamak zorunda" | Teklif edilenin Y-1'i çizilmemiş, teklif oraya düşmüyor | Critical | F1 |
| K-3 | §3: durum cümlesi "başlık ağırlığındaki tek metin" | Durum 21 px, vardiya saati 24 px; üç karede durum 19 px | High | F7 |
| K-4 | §13.3-6: "gece vardiyası iki tarihiyle yazılır" | Y-5 satırı "28 Şubat · 23:00 – 07:00" | High | F10 |
| K-5 | §14 Y-4 ve Y-6: "loading / error: standart" | İki yüzeyde de çizilmedi | High | F16 |
| K-6 | §14 Y-5: "loading / error: standart" | İkisi tek karede birleştirilmiş | High | F12 |
| K-7 | §13.1: "Onaylanmamış metin ekran görüntüsüne girerse onaylanmış metin olur" | Taslakta olmayan yirmi civarı metin karelere girmiş | High | F17 |
| K-8 | §5: not alanı "gizlenirse ekran seçimden sonra sıçrar" | Y-2'nin üç durumunda alan tamamen yok | Medium | F4 |
| K-9 | §13.3-5: "tarih ve saat hiçbir koşulda kırpılmaz" | Y-5'in tarihi `white-space:nowrap` | Medium | F21 |

**Ölçütlerin geçtiği yer.** B-1 geçiyor: Y-2'de vardiya bloğunun etrafındaki boşluk (14+22+14 = 50 px) ekrandaki en geniş boşluk ve en büyük dokunulabilir öğe kişi seçicisi (80 px). B-2, B-3, B-7, B-8, B-9 geçiyor. B-5 ölçüldü: Ö-3 karesinde içerik 540 px alanın 478'ini kullanıyor, "Teklif et" kaydırmasız. B-10 Y-2, Y-3, Y-4 ve Y-6'da geçiyor, Y-5'te düşüyor (K-4).

**B-4 geçiyor ve yine de dört durum eksik.** §7'nin 24 durumunun 23'ü kendi karesine sahip; ikincisi ("kuruldu → Y-3'e iner") Y-3 durum 7'ye devrediyor ki bu doğru. Ölçüt bu yüzden yeşil dönüyor. Ama §14 aynı yüzeyler için §7'de numarası olmayan durumlar da istiyor ve dördü çizilmemiş. **Ölçüt, kaydın kendi istediğinden dar sayıyor.** Bu bir çizim hatası değil; B-4'ü yazan cümlenin hatası ve düzeltmesi kayda ait.

**Kaydın kendisiyle çeliştiği üç yer** — bunlar tasarım kusuru olarak raporlanırsa iş yanlış ekibe gider: F7 (B-9 ile Y-3 rütbesi aynı anda tutmuyor), F11 (§14'ün istediği üç özdeş satırı KŞ-1 imkânsız kılıyor), F9 (E-4'ün dışlanması karşı tarafı habersiz bırakıyor). Üçünün de sahibi `design-brief`, çizen taraf değil.

---

## 3. Bulgular

| | | Bulgu |
|---|---|---|
| **F1** | **Critical** | Teklif edilen çalışanın bildirim dışında teklife ulaşacağı yol yok |
| **F2** | **Medium** | Y-1'de başlamış vardiya ile açılabilir vardiya aynı görünüyor |
| **F3** | **High** | Kişi seçicinin yükleniyor, boş ve hata hâli çizilmemiş |
| **F4** | **Medium** | Not alanı Y-2'nin üç durumunda ekrandan siliniyor |
| **F5** | **Medium** | Vardiya değiştirilemez ve nereden değiştirileceği hiçbir yerde yazmıyor |
| **F6** | **Critical** | İki taraflı ilan edilen Y-3'ün dokuz karesi de tek tarafın dili |
| **F7** | **High** | Y-3'te vardiya bloğu durum cümlesini görsel olarak yeniyor |
| **F8** | **High** | Ekran açıkken bayatlayan takasın ne olacağı kararlaştırılmamış |
| **F9** | **Medium** | Teklif geri çekilince karşı taraf hiçbir kanaldan haber almıyor |
| **F10** | **High** | Kuyrukta gece vardiyası tek tarihle yazılmış |
| **F11** | **High** | Kuyruktaki üç özdeş satır KŞ-1'e göre imkânsız; gerçek stres denenmemiş |
| **F12** | **High** | Kuyruğun yükleniyor ve hata hâli tek karede, ikisi de tanımsız |
| **F13** | **High** | Reddetme yazılırken ekrandaki tek etkin eylem onay |
| **F14** | **Medium** | İşaretli yer tutucu Y-6'da rütbe 1'in üstünde duruyor |
| **F15** | **High** | Dördüncü bildirimin metni uydurulmuş ve iki alıcıdan birine yanlış okuyor |
| **F16** | **High** | Y-4 ve Y-6'nın yükleniyor ve hata hâli yok |
| **F17** | **High** | Taslakta olmayan yirmi civarı metin karelere girmiş |
| **F18** | **Medium** | Boş hâl ile hata hâli aynı bileşenle çizilmiş |
| **F19** | **Medium** | Aynı adlı iki kişi üç yüzeyde üç ayrı mekanizmayla ayrılıyor |
| **F20** | **Medium** | Sekiz yüzeyin tek çıkışı 20 px genişliğinde etiketsiz bir ikon |
| **F21** | **Medium** | En büyük yazı ayarı yalnız Y-6'da denenmiş; Y-5'in tarihi kırpılır |
| **F22** | **Medium** | Anlam taşıyan gri metin 3,36:1, satır ayıracı 1,30:1 |

### Y-1 · Haftalık çizelge (giriş)

> **F1 · Critical — teklif edilen çalışanın bildirim dışında teklife ulaşacağı yol yok.**
> Kayıt Y-4'ün girişini iki yoldan tarif ediyor: bildirim, "ya da çizelge ekranındaki işaret" (§4). Çizilen tek Y-1 karesi devreden çalışanın haftası ve üzerinde tek bir işaret var: kendi açtığı takası gösteren "Takasta". Teklif edilen çalışanın haftasında o vardiya **hiç yok** — devrettiği gün onun günü değil. Yani kaydın yedek yolu çizilemez bir yol ve çizilmemiş. Aynı §4 push yönlendirmesi için "TB-7 açık" diyor ve arkasından "tasarım bu ihtimali karşılamak zorunda" diye bağlıyor.
> **Kullanıcı ne yapar:** bildirimi kaydıran, sessize alan ya da push'u kapatmış çalışan teklifi bir daha bulamaz; teklif zaman aşımı olmadığı için (DD-9) açık kalır, devreden çalışan cevap bekler, ikisi de WhatsApp'a döner. Akışın tek girişinin `[ASSUMED]` bir altyapıya bağlı olduğu yer burası.
> **Kapatan karar:** teklif edilen çalışanın uygulamada bekleyen bir teklifi nereden gördüğü. Kayıt bu yüzeyi hiç açmadı — `design-brief`.

> **F2 · Medium — başlamış vardiya ile açılabilir vardiya aynı görünüyor.**
> HY-5 kesin: "Başlamış ya da geçmiş bir vardiya takasa açılamaz." Çizilen hafta 10–16 Mart, saat 09:41 ve yedi satırın hepsi aynı biçimde. Hangisinin geçtiği, hangisinin bugün olduğu ekranda yok; "Takasa aç" yalnız seçili satırın altında beliriyor, dolayısıyla kullanıcı ancak dokunduktan sonra öğrenebilir — ve dokunduğunda ne göreceği de çizilmemiş.
> **Kullanıcı ne yapar:** bu sabahki vardiyasını devretmeye çalışır, cevap alamaz ya da sebebi yazılmamış bir engelle karşılaşır. Vardiyanın başlamasına saatler kalmışken.
> **Kapatan karar:** geçmiş ve başlamış vardiyanın çizelgede takas açısından ne olduğu. `design-brief`.

### Y-2 · Takas kurma

> **F3 · High — kişi seçicinin yükleniyor, boş ve hata hâli çizilmemiş.**
> Seçici tek karede var: yedi kişilik dolu liste. Oysa bu listenin kaynağı kaydın kendi ilan ettiği yeni bir bağımlılık — E-3, "o adların hangi uçtan geleceği dilimde yok", onaylayacak kişi Murat Şen. Uç cevap vermezse, mağaza listesi boş dönerse ya da tek kişilik bir mağazada açılırsa ekranda ne olduğu hiçbir karede yok. Y-2'nin diğer beş bağımlılığının (kural motoru, sürüm kontrolü, ağ) hepsinin durumu çizilmiş; en yenisininki çizilmemiş.
> **Kullanıcı ne yapar:** boş beyaz bir listeye bakar, mağazada kimse yokmuş gibi okur, geri çıkar ve WhatsApp'a döner. Talebin ölçüt 3'ünün bozulduğu ikinci yer.
> **Kapatan karar:** seçici listesi gelmediğinde yüzeyin ne göstereceği. `design-brief` §7'ye satır.

> **F4 · Medium — not alanı Y-2'nin üç durumunda ekrandan siliniyor.**
> §5 kararı gerekçesiyle yazılı: alan "kişi seçilmeden **görünür ama etkin değildir**; gizlenirse ekran seçimden sonra sıçrar". Durum 3 (kural geçmedi), durum 4 (açık takas var) ve durum 5 (eski sürüm) karelerinde alan hiç yok. Bu üç durumun ikisinde kişi zaten seçili, yani alan etkin olmalıydı ve içinde yazılmış bir not olabilirdi. Durum 6'da (ağ hatası) not korunuyor ve altyazı bunu övünerek söylüyor — aynı korumanın kural hatasında neden geçmediği yazılı değil.
> **Kullanıcı ne yapar:** 140 karakter yazar, "Teklif et"e basar, kural düşer, notu gider; ikinci kişiyi seçtiğinde baştan yazar ya da hiç yazmaz.
> **Kapatan karar:** yazılmış notun hangi hatalarda korunduğu. `design-brief`.

> **F5 · Medium — vardiya değiştirilemez ve nereden değiştirileceği hiçbir yerde yazmıyor.**
> Karar bilinçli ve gerekçeli: "Y-2'nin içinde vardiya değiştirilemez... vardiya değiştiricisi rütbe 1'i düzenlenebilir bir alana çevirir." Düzeltme yolu da §5'te var: "Y-2'den çıkıp başka vardiyaya dokunmak." O cümle ekranın hiçbir yerinde geçmiyor ve blok, çerçevesiyle birlikte ekrandaki en ağır öğe. Aynı kayıt yanlış vardiyayı devretmeyi "düzeltilemez ve kimse fark etmez" diye tarif ediyor.
> **Kullanıcı ne yapar:** yanlış günü fark eder, dokunulmaz bloğa bakar, tek çıkış olan 20 px'lik ‹ işaretini bulamazsa devam eder.
> **Kapatan karar:** yanlış vardiya fark edildiğinde yüzeyin ne sunduğu. `design-brief`.

### Y-3 · Takas durum

> **F6 · Critical — iki taraflı ilan edilen yüzeyin dokuz karesi de tek tarafın dili.**
> Kayıt bu yüzeyi iki kere iki taraflı ilan ediyor: taşıyıcı tablosunda "Takas durum yüzeyi (iki taraf)", §1'de "devreden ve üstlenen çalışanın takası izlediği tek yer". Çizilen dokuz karenin altısı ikinci tekil şahısla devreden çalışana yazılmış: "Vardiya sende", "Teklifi geri çektin", "Müdür reddetti. Vardiya sende". Üstlenen çalışan aynı takas için aynı yüzeyi açtığında bu cümleleri okuyacak. Metinler §13.1'den geldiği için sorumluluğun bir yarısı kayda ait; diğer yarısı çizime, çünkü ikinci taraf tek karede bile denenmemiş.
> **Kullanıcı ne yapar:** teklifi üstlenen çalışan, müdür reddettikten sonra Y-3'ü açar, "Vardiya sende" okur ve o gün işe gelir — ya da onaylandığında aynı cümleyi ters okur ve gelmez. İki durumda da mağaza boş kalır ve kimse yanlış bir şey yaptığını fark etmez.
> **Kapatan karar:** her durum cümlesinin üstlenen çalışan tarafındaki karşılığı. `design-brief` §13.1'e ikinci sütun.

> **F7 · High — vardiya bloğu durum cümlesini görsel olarak yeniyor.**
> Y-3'ün rütbe 1'i durum cümlesi ve mekanizması yazılı: "yüzeyin ilk okunan satırıdır ve **başlık ağırlığındaki tek metin**". Kaynakta durum cümlesi 21 px/700, üç karede (9, 11, 13) 19 px/700; hemen altındaki vardiya saati 24 px/700 ve 1,5 px'lik siyah çerçevenin içinde. Griye çevirince kazanan blok. Bu, çizimin hatası değil: B-9 aynı bloğun Y-2, Y-3 ve Y-4'te **aynı** kalmasını şart koşuyor, Y-2 ve Y-4'te vardiya rütbe 1, Y-3'te rütbe 2. İki karar aynı anda tutamaz ve çizen taraf B-9'u tutmayı seçmiş.
> **Kullanıcı ne yapar:** "oldu mu, kimde bekliyor" sorusuyla açan çalışan önce tarihi okur, cevabı ikinci okumada bulur; acelesi varsa bulamaz ve karşı tarafa yazar.
> **Kapatan karar:** aynı bloğun rütbesi değişen bir yüzeyde nasıl bastırılacağı — ya da B-9'un Y-3 için gevşetilmesi. **Kayda ait**, `design-brief`.

> **F8 · High — ekran açıkken bayatlayan takasın ne olacağı kararlaştırılmamış.**
> Hiçbir çizim iki davranıştan hangisinin seçildiğini gösteremez, dolayısıyla bu değerlendirilemeyen bir davranış değil, **verilmemiş bir karar**. Y-3 açıkken müdür onaylarsa, Y-4 açıkken teklif geri çekilirse ekran yerinde tazelenir mi, yoksa kişi bir sonraki açışta mı öğrenir? §7 durum 12 "teklif edilen **açtığında** bunu görür" diyor — yani yeniden açış varsayılıyor ama açık ekran için bir şey söylenmiyor. Y-5 kuyruğu için de aynı soru: başka bir müdür karara açtıysa.
> **Kullanıcı ne yapar:** teklif edilen çalışan on saniye önce geri çekilmiş bir teklifte "Üstleniyorum"a basar; en iyi ihtimalle durum 18'e düşer, en kötüsünde metni yazılmamış bir hataya.
> **Kapatan karar:** açık yüzeylerin tazelenme davranışı. `design-brief` — üç yüzeyde de aynı cevabı verir.

### Y-4 · Gelen teklif

> **F9 · Medium — teklif geri çekilince karşı taraf hiçbir kanaldan haber almıyor.**
> Kayıt bunu biliyor ve kabul ediyor: H-06 "Teklif kapanır, **karşı taraf haber almaz**", E-4 dördüncü bildirimi bir kapsam eklemesi sayıp almıyor, yerine durum 18'i koyuyor. Durum 18 doğru çizilmiş. Ama kişinin o ekranı açması için bir sebebi yok: hiçbir şey ona haber vermiyor, işaret de düşmüyor (F1).
> **Kullanıcı ne yapar:** WhatsApp'ta "tamam ben alırım" demiş çalışan, teklifin geri çekildiğini hiç öğrenmez; devreden çalışan başkasına teklif eder, ikisi de o günü kendi bildiğince planlar.
> **Kapatan karar:** E-4'ün onaylanması ya da reddedilmesi — **kayda ait**, sahibi Selin Aydın.

### Y-5 · Müdürün kuyruğu

> **F10 · High — kuyrukta gece vardiyası tek tarihle yazılmış.**
> Satır "28 Şubat · 23:00 – 07:00" diyor. §13.3-6 proje geneli kısıt olarak "gece vardiyası **iki tarihiyle** yazılır" diyor ve B-10 bunu ölçüt yapıyor. Kaydın gerekçesi de yazılı: "kırpılan bir saat yanlış güne gelinmesine yol açar". Aynı gece vardiyası Y-2, Y-3, Y-4'te "Gece · 1 Mart Pazar sabahı biter" satırıyla, Y-6'da cümlenin içinde iki tarihle geçiyor; yalnız kuyrukta tek tarihli. `.qrow .date` `white-space:nowrap` olduğu için ikinci tarih zaten sığmıyor.
> **Kullanıcı ne yapar:** kuyruğu vardiya başlangıcına göre okuyan müdür, 28 Şubat gecesi başlayıp 1 Mart sabahı biten bir vardiyayı 28 Şubat işi sanır; hangi takasın önce düzeltilemez hale geldiğini yanlış sıralar — ki bu sıralamanın tek varlık sebebi o.
> **Kapatan karar:** satırda iki tarihin nasıl taşınacağı, tarihi kırpmadan. `design-brief`.

> **F11 · High — üç özdeş satır KŞ-1'e göre imkânsız; gerçek stres denenmemiş.**
> §14 açıkça "Ö-3'ün üç kopyası da çizilsin" diyor, çizim de aynı tarih, aynı saat, aynı iki adla üç satır çizmiş. Bağlayıcı kısıt 5 bunu imkânsız kılıyor: "Bir vardiya için tek açık takas." Yani kare hiç oluşamayacak bir kuyruk gösteriyor ve karşılığında **gerçek zor durum denenmemiş oluyor**: birbirinden farklı ama satırda ayırt edilemeyen takaslar. Satırlarda takas kimliği yok, ayıraç 1,30:1 kontrastta bir tel çizgi.
> **Kullanıcı ne yapar:** müdür bir satırı açar, karar verir, kuyruğa döner ve neredeyse aynı görünen kalanlar arasında hangisini hallettiğini satırdan çıkaramaz; yanlış satırı açar, ya da bittiğini sanıp bekleyeni bırakır.
> **Kapatan karar:** iki kuyruk satırını birbirinden ayıran şeyin ne olduğu ve içerik stresi örneğinin KŞ-1'e uydurulması. **Kayda ait**, `design-brief`.

> **F12 · High — kuyruğun yükleniyor ve hata hâli tek karede, ikisi de tanımsız.**
> Durum 24 karesi üstte iskelet satırlar ve "Yükleniyor", altında "Bağlanamadık. Tekrar dene" kutusu ve bir düğme gösteriyor; altyazı bunu kendi ifade ediyor. Gerçek bir ekran ikisinden biridir. §14 Y-5 için "loading / error: standart" diye iki ayrı durum istiyor; sonuçta ikisi de çizilmemiş sayılır.
> **Kullanıcı ne yapar:** çizim bu hâliyle koda dönerse müdür hem dönen iskeleti hem hata kutusunu aynı anda görür ve tekrar denemenin işe yarayıp yaramadığını anlamaz.
> **Kapatan karar:** yok — bu iki durumun ayrı ayrı çizilmesi gerekiyor, karar zaten verilmiş.

### Y-6 · Müdürün karar yüzeyi

> **F13 · High — reddetme yazılırken ekrandaki tek etkin eylem onay.**
> Durum 23'te serbest metin alanı açılmış, "Reddet" boş alan yüzünden etkisiz (doğru, D-8), "Onayla" ise etkin duruyor — yalnız dolgusu birincilden ikincile düşmüş. Yani müdür reddetme sebebini yazarken ekranda basılabilir tek düğme, geri alınamaz olan. Üstünde de onun uyarısı duruyor. Metin yazıldıktan sonraki hâl (Reddet etkin) hiç çizilmemiş, çünkü §7 yalnız "Red, metin boş" durumunu sayıyor.
> **Kullanıcı ne yapar:** sebebi yazan müdür alışkanlıkla üstteki düğmeye uzanır ve reddetmek istediği takası onaylar; onay Plan'a yazar, uygulamadan geri alınamaz (KŞ-8).
> **Kapatan karar:** red yazılırken onayın etkin kalıp kalmadığı ve red-hazır hâlin nasıl göründüğü. `design-brief`.

> **F14 · Medium — işaretli yer tutucu rütbe 1'in üstünde duruyor.**
> KŞ-12 yer tutucusu doğru bir karar (§6: "Bu yüzey işaretli yer tutucuyla çizilir"), ama Y-6'nın beş karesinin üçünde ve Y-5'in iki karesinde ekranın en üstüne, taralı dolgu ve kesikli çerçeveyle konmuş. Rütbe 1'in mekanizması "ekranın en üstünde ve en büyük metin" olmak; ilk okunan şey artık o değil.
> **Kullanıcı ne yapar:** bu kareler paydaşa gösterildiğinde ilk okunan şey karar boşluğu olur, devir cümlesi ikinci sıraya düşer; B-2'yi "en büyük metin" diye kontrol eden gözden geçiren yeşil işaretler, ekranın gerçek okuma sırası başkadır.
> **Kapatan karar:** işaretli yer tutucuların rütbeye göre nereye konacağı — çizim düzeni kuralı, `design-brief` §13'e bir satır.

### Y-7 · Bildirimler

> **F15 · High — dördüncü bildirimin metni uydurulmuş ve iki alıcıdan birine yanlış okuyor.**
> §13.1 Y-7 için üç metin veriyor (27, 28, 29). §14 dört durum istiyor; dördüncüsünün, Plan yazması düştüğünde gidenin metni taslakta yok. Çizim onu kendi yazmış: "14 Mart Cuma 09:00 – 17:00 vardiyası hâlâ Ayşe Demir'de". Bu bildirim iki tarafa birden gidiyor ve Ayşe Demir kendi kilit ekranında kendi adını üçüncü şahısta okuyor.
> **Kullanıcı ne yapar:** devreden çalışan bildirimi başkasına ait sanıp geçer; vardiyanın hâlâ kendisinde olduğunu öğrenmesi gereken tek an buydu ve H-07 kaydın "bu dilimin en olası kötü anı" dediği durum.
> **Kapatan karar:** dördüncü bildirimin metni, her iki alıcı için ayrı. `design-brief` §13.1.

### Yüzeyler arası

> **F16 · High — Y-4 ve Y-6'nın yükleniyor ve hata hâli yok.**
> §14 her iki yüzey için de "loading / error: standart" istiyor. Y-3 ikisini de aldı (14a, 14b), Y-5 birleştirdi (F12), Y-4 ve Y-6 hiç almadı. Y-6 önemli olan: müdür kuyruktan bir satıra dokunduğunda karar yüzeyi veriyi çekiyor ve o an ağ yoksa ekranda ne olduğu tanımsız. Aynı şekilde bildirimden Y-4'e giren çalışan.
> **Kullanıcı ne yapar:** müdür boş bir karar ekranına bakar; ne bekleyeceğini, ne tekrar deneyeceğini bilmez, geri çıkar ve kuyruk satırı yerinde durduğu için işlemin yapıldığını mı yapılmadığını mı anlamaz.
> **Kapatan karar:** yok — durumlar zaten istenmiş, çizilmemiş.

> **F17 · High — taslakta olmayan yirmi civarı metin karelere girmiş.**
> §13.1 kendi riskini yazıyor: "Onaylanmamış metin ekran görüntüsüne girerse onaylanmış metin olur." §14'ün son tablosu da birinci sırada bunu öngörüyor. Taslakta karşılığı olmayanlar: "Açık takası gör", "Teklifi geri çektin. Vardiya sende", "Çizelgeme dön", "Gönderiliyor", "Tekrar dene", "Ada göre ara", "Takasta", "Takas", "Gelen teklif", "Karar", "Onay çizelgeye işlenemedi. Takas onaylanmış değil, satır kuyrukta kalıyor", dördüncü bildirimin gövdesi (F15), `Teklif edilen` / `Üstlenen` / `Not` etiketleri ve altı büyük harfli mesaj etiketi: `Kurulamaz`, `Seçilemez`, `Hata`, `Kapalı`, `Geri alınamaz`, `İşlenemedi`. Bunlardan ikisi metin değil **karar**: "Ada göre ara" mağaza listesinin aranacak kadar uzun olduğunu varsayıyor (E-3 henüz onaylanmadı), altı etiketli mesaj dili ise ürüne yeni bir sınıflandırma sokuyor.
> **Kullanıcı ne yapar:** paydaş bu kareleri onaylar, metinler yerleşir, İK ve hukuk hiç görmeden yayına gider — kaydın on dakikada kapanacağını söylediği boşluk tam olarak buydu.
> **Kapatan karar:** bu yirmi satırın yazarı ve onaylayanı. `design-brief` §13.1'in ikinci sürümü.

> **F18 · Medium — boş hâl ile hata hâli aynı bileşenle çizilmiş.**
> `.empty` bileşeni (56 px kesikli kare + ortalanmış tek satır) hem Y-5'in boş kuyruğunda hem Y-3'ün hata hâlinde kullanılıyor. Griye çevirince "Şu an onay bekleyen takas yok" ile "Bağlanamadık. Tekrar dene" ayırt edilemiyor. Y-2 ve Y-5'te aynı hata `.msg` kutusuyla, Y-3'te tam ekran olarak çıkıyor — tek bir hatanın üç sunumu var.
> **Kullanıcı ne yapar:** müdür yüklenemeyen bir kuyruğu boş kuyruk sanar, bekleyen takasa hiç bakmaz; kaydın "bu yüzeyin en sık görülen hâli" dediği boş hâl, hatanın kılığına giriyor.
> **Kapatan karar:** boş hâl ile hata hâlinin görsel olarak neyle ayrıldığı. `design-brief`.

> **F19 · Medium — aynı adlı iki kişi üç yüzeyde üç ayrı mekanizmayla ayrılıyor.**
> Ö-2 kaydın bilerek zorlayan örneği ve üçünde de çözülmüş — ama farklı şekilde: seçicide adın altında etiket (`Reyon` / `Kasap`), kuyrukta parantez ("Mehmet Yılmaz (Reyon)"), Y-6'da cümlenin içinde ek ("Reyon'dan Mehmet Yılmaz'ın"). Üçüncüsü §13.1'in 23 numaralı şablonunda yok, çizim eklemiş ve yalnız Ö-2 karesinde uygulamış; diğer Y-6 kareleri düz şablonu kullanıyor.
> **Kullanıcı ne yapar:** müdür kuyruktaki "(Reyon)" ile karar ekranındaki "Reyon'dan" arasında aynı şeyi mi okuduğunu bir an sorgular; kural yalnız çakışma anında devreye giriyorsa iki adı özdeş gördüğü ilk kare hangisiyse orada durur.
> **Kapatan karar:** aynı adı ayırt eden şeyin ne olduğu ve her zaman mı yoksa yalnız çakışmada mı görüneceği. `design-brief`.

> **F20 · Medium — sekiz yüzeyin tek çıkışı 20 px genişliğinde etiketsiz bir ikon.**
> Kaynakta `.nav .back` 20 px genişliğinde bir ‹ karakteri; 44 px'lik hedefin altında ve etiketsiz. §4 Y-2, Y-4 ve Y-6 için geri hareketi ile ekrandaki vazgeçme kontrolünün ikisinin de bulunmasını istiyor; bu ikon o rolü tek başına üstleniyor. Y-2'de aynı ikon yazılmış notu uyarısız atar (§4: "Uygulama kapanırsa kayıt yok"), Y-6'da kararı kuyruğa geri bırakır, Y-3'te çizelgeye döner — üç ayrı sonuç, tek görünüm.
> **Kullanıcı ne yapar:** 140 karakter yazmış çalışan yanlışlıkla ikona basar ve notu uyarısız kaybeder.
> **Kapatan karar:** çıkışın etiketlenip etiketlenmeyeceği ve yarım girdiyle çıkışta ne olacağı. `design-brief`.

> **F21 · Medium — en büyük yazı ayarı yalnız Y-6'da denenmiş.**
> B-6 karesi doğru çizilmiş ve geçiyor: 29 px'lik devir cümlesi, uyarı ve iki eylem 532 px'lik alana sığıyor (ölçüldü: ~512 px). Ama aynı karenin altyazısı notun kaydırma altında kaldığını söylüyor ve karede kaydırılabilir bir şey olduğunu gösteren hiçbir işaret yok. Diğer yüzeyler hiç denenmemiş; Y-5'in `.qrow .date` alanı `white-space:nowrap` ile sabitlenmiş, yani büyük yazı ayarında sarmak yerine kırpılır — §13.3-5 "tarih ve saat hiçbir koşulda kırpılmaz" diyor.
> **Kullanıcı ne yapar:** büyük yazı kullanan müdür notu hiç görmeden onaylar; kuyruğu okuyan müdür ise vardiya saatinin sonunu göremez.
> **Kapatan karar:** en büyük yazı ayarının Y-5 ve Y-2 için de ölçüt olup olmadığı. `design-brief` §10.

> **F22 · Medium — anlam taşıyan gri metin 3,36:1, satır ayıracı 1,30:1.**
> Erişilebilirlik seviyesi verilmedi (TB-5, §8-11), dolayısıyla bu bir eşiğe karşı ölçüm değil, **eşiksiz bir ölçüm** — hangi hedefin tutturulacağı kararlaştırılmadan bu satır bir öneri olarak kalır. Kaynaktan hesaplanan: `--ink3` (#8c8c8c) beyaz üstünde 3,36:1 ve şunları taşıyor — Y-1'de vardiya tarihleri ve "İzin günü" (11–13 px), kuyrukta "2 gündür bekliyor", karakter sayacı, tüm `Teklif edilen`/`Üstlenen`/`Not` etiketleri (10 px, büyük harf, harf aralığı açık). `--line2` (#e2e2e2) satır ayıracı olarak 1,30:1 ve kuyrukta iki takası birbirinden ayıran tek şey o.
> **Kullanıcı ne yapar:** mağaza zemininde, gün ışığında telefona bakan çalışan çizelgedeki tarihi en zor okunan öğe olarak bulur.
> **Kapatan karar:** TB-5 — erişilebilirlik seviyesi. Sahibi Ürün ekibi, `design-brief` bunu zaten açık madde olarak taşıyor.

---

## 4. İşleyenler

**Yer tutucular gerçekten yer tutucu.** TB-1'in "üstlenirsen ne olur" cümlesi, Y-4'ün eylem kutusunun içinde taralı bir blok olarak duruyor; üstünde sahibin adı ve 90–120 karakterlik bütçe yazılı. Bir üreticinin yapacağı en pahalı şey — verilmemiş kararın yerine makul bir cümle yazmak — beş ayrı yer tutucuda beş kere yapılmamış. Bu, düzen çalışmalarında nadir.

**Anlam hiçbir yerde yalnız renkle taşınmıyor.** Sayfanın tamamı gri tonlarda ve her mesaj kutusu büyük harfli bir sözcükle etiketli (`Kurulamaz`, `Seçilemez`, `Kapalı`). §13.3-1 bunu istiyordu; uygulanmış ve tel çerçeveyi renk olmadan okunur kılan şey bu. (Etiketlerin kendileri onaysız metin — F17.)

**Y-6'nın devir cümlesi Ö-2'yi tek satırda çözüyor.** "Reyon'dan Mehmet Yılmaz'ın 3 Nisan Perşembe 12:00 – 20:00 vardiyasını Kasap'tan Mehmet Yılmaz üstleniyor" — B-12'nin istediği tek satır, aynı adlı iki kişiyle birlikte, kırpılmadan. Şablona yapılan ekleme kayıtsız (F19) ama çözüm doğru.

**B-5 gerçekten ölçülmüş.** Ö-3 karesinde 32 karakterlik ad, iki tarihe yayılan gece vardiyası ve tam 140 karakterlik not birlikte çizilmiş; 540 px'lik alanın 478'i dolu, "Teklif et" kaydırmasız duruyor. Zor içerik istendiği için çizilmiş, kolayı çizilip geçilmemiş.

---

## 5. Değerlendirilemeyenler

- **Ürüne ait olup olmadığı (tutarlılık merceği).** Tasarım sistemi verilmedi (TB-6) ve Bereket Mobil'in hiçbir ekranı görülmedi. "Bu ekran uygulamaya bırakılsa kullanıcı neyi yabancı bulur" sorusu cevaplanamaz. Sayfanın kendi başlığı da bunu söylüyor. Tipografi ölçeği, bileşen seçimi, boşluk ritmi ve ikon dili bu yüzden **eleştirilmedi**; TB-6 kapanmadan bunları eleştirmek olmayan bir dile karşı ölçmek olur.
- **Kontrast ve hedef boyutu için eşik yok.** TB-5 açık. F22 ve F20'deki sayılar ölçüm; hangi seviyeye karşı geçtikleri ya da kaldıkları kararlaştırılmadı.
- **Statik kareden görülemeyenler:** geçiş, animasyon, azaltılmış hareket davranışı, kaydırma, dokunma geri bildirimi, klavye açıkken düzenin ne yaptığı (Y-6'nın red alanı ve Y-2'nin notu için önemli).
- **Altyapı iddiaları:** push var mı (`[ASSUMED]`, M7), kotası (`[UNVERIFIED]`, G08), bildirimin uygulamayı ilgili yüzeye açıp açamadığı (TB-7), mağaza çalışan listesinin ucu (E-3). Dördü de F1 ve F3'ün arkasında duruyor.
- **B-11 ve B-12 davranış iddiası.** B-12 kareden kontrol edilebildi ve geçiyor. B-11 ("hiçbir şey okumadan teklifi gönderebiliyor") kareye tutulamaz; çizilen yol iki dokunuş ve bir seçim, ama bunun doğrulaması kullanıcıyla yapılır.
- **Y-5'in gerçek uzun kuyruğu.** Kırk satırlık bir kuyruğun ne yaptığı çizilmedi; §14 uzunluk istemedi, bu yüzden bulgu değil, boşluk.

**Karar gerektirenler `design-brief`'e gider.** F1, F3, F4, F5, F8, F13, F18, F19, F20, F21 yeni karar istiyor; F7, F9, F11 ve B-4'ün dar sayımı kaydın kendi içindeki çelişkiler ve düzeltmeleri de orada. Bu belge hiçbirini kendi kapatmadı: eleştirinin tasarıma dönüştüğü yer, incelemenin bittiği yerdir.

Zincir bir akış, bir veri modeli ve bir ihtiyaç listesi de ürettiyse, bu bulguların o belgelerle çeliştiği yeri kimse tek başına görmez; onları tek pakete toplayıp birbirine tutan `build-context`'tir.
