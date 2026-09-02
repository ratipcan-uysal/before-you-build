# Vardiya Takası — Fikir Grilli (proxy modu)

**Grillenen belge:** `00-talep.md` (Selin Aydın, İK İş Ortağı → Bereket Mobil ürün ekibi)
**Mod:** proxy. Fikir ürün ekibinin değil; ürün müdürü onu Selin adına savunuyor. Çıktı bir hüküm değil, **sahibine götürülecek soru listesi**.
**Kanal:** İK / mağaza operasyonu. Bu kanalın karakteristik kör noktası, yukarıdaki bir sebebin belirtisini onarmak. Grill oradan açılıyor.

> **Koşum notu.** Bu oturum karşısında kimse yokken koştu. Skill'in kuralı gereği savunmayı ben yazmadım: her provokasyonun karşısına **belgenin kendisinin ne dediğini** koydum ve sonucu ona göre işaretledim. `held` = malzeme cevaplıyor. `cracked` = malzeme kendi içinde çelişiyor ya da cevaplayamıyor. `unanswered` = kimse bakmamış. Bir noktada kapanış olduğunda "mevcut en güçlü cevap" yazıldı; açık noktada yazılmadı.

---

## Faz 0 — Tez ve steelman

### Tez, tek cümle

Mağaza çalışanları arasında zaten olan vardiya takasını uygulamanın içine alıp kural motoruyla süzmek, müdürün elle düzeltme mesaisini ve çizelge–bordro uyuşmazlığını üçte birine indirir.

### Steelman (talepte yazandan daha güçlü hali)

Bu talep yeni bir davranış icat etmiyor, var olanı ölçüyor ve yerini değiştiriyor. Davranışın hacmi tahmin değil: Plan'ın değişiklik logundan 3 ay, 480 mağaza, 41.200 kayıt üzerinden çıkarılmış ve takas payı %61 olarak ayrılmış. Bedeli iki yerden ödeniyor. Birincisi müdürün zamanı: mağaza başına haftada 2,3 saat, 480 mağazada haftada yaklaşık 1.100 müdür saati. İkincisi bordro: üç ayda 1.840 vaka, her biri ortalama 9 günde kapanıyor, yani sürekli açık duran birkaç yüz vakalık bir kuyruk.

Benimsenme riski bu iş sınıfının en düşüğünde. Çalışanların %94'ü uygulamayı bordro fişi ve çizelge için zaten açıyor, push altyapısı çalışıyor, çizelge okuma ucu üretimde. İstenen ekran yeni bir alışkanlık değil, açık olan ekrana bir düğme.

Kapsam savunmacı biçimde daraltılmış: mağazalar arası yok, kısmi vardiya yok, otomatik eşleştirme yok, web yok, geriye dönük yok. Bunların her biri talebi küçültüyor, büyütmüyor. Başarı ölçütleri bugünkü ölçümle aynı yöntemle ve aynı kaynaktan tanımlanmış, yani sonradan hedef kaydırmak zor. Bilinmeyenler tahmin ettirilmek yerine beş madde halinde yazılmış, ki bir talep belgesinde nadir görülen bir dürüstlük.

En güçlü haliyle sav şu: **kuralı zaten insan kafasında koşturuyoruz, hatalı koştuğunda bordro ödüyor; kuralı koda alırsak hem hata düşer hem müdür serbest kalır, üstelik davranışın var olduğunu kanıtlamak için pilot koşmamıza gerek yok, log elimizde.**

### Steelman onaylanmadı

Bunu ratifiye edecek kimse yoktu. Skill'in kuralı gereği bu **birinci sahip sorusu** olarak kayda geçiyor: Selin bu özeti kendi talebinin en güçlü hali olarak tanıyor mu, yoksa ekleyeceği bir dayanak var mı. Onaylanmamış bir steelman, sahibinin tanımayacağı bir sürümü grillemek riskini taşır.

---

## Faz 1 — Grill

### Tur 1 — Kanal merceği (operasyon): belirti mi, sebep mi

**Provokasyon.** Belgedeki sayıyı kendi tabanına bölelim. 41.200 düzeltmenin %61'i takas, 13 hafta, 480 mağaza: mağaza başına **haftada ~4 takas**. Mağaza başına ortalama 19 çalışan var. Yani her hafta kadronun yaklaşık sekiz kişilik bir dilimi, yayımlanmış çizelgeyi yayımlandığı haliyle çalışmıyor. Bu bir hayat payı değil, bu çizelgenin kendisinin yanlış çıktığının ölçüsü. Cuma 16:00'da yayımlanan çizelgeyi kim, hangi girdiyle kuruyor ve çalışanın müsaitliği o girdinin neresinde?

**Malzeme ne diyor.** Hiçbir şey. Belge takası bir veri olarak ele alıyor ("takas zaten oluyor, biz sadece görmüyoruz") ve neden o hacimde olduğunu bir kez bile sormuyor. Plan'ın çizelgeyi nasıl ürettiği, çalışan tercihinin sisteme girip girmediği, cuma 16:00'ın neden cuma 16:00 olduğu belgede yok.

**Sonuç: `cracked`.**

**Mevcut en güçlü cevap.** "Sebebi biliyoruz ve dokunamıyoruz" cevabı bu noktayı kapatırdı: çizelge talep tahmininden kuruluyor, müsaitlik girdisi zaten alınıyor, takasın kaynağı planlama hatası değil hayatın kendisi, ve bunu şu kırılımla gösterebiliriz. Ya da tersi, ve daha güçlüsü: "haklısın, çizelge kalitesi ayrı bir iş; ama o iş Plan ekibinde ve 18 ay sürer, biz o arada ödenen bordro faturasını durduruyoruz." İkincisi bu talebi öldürmez, **konumlandırmasını değiştirir**: kalıcı çözüm değil, bilinçli bir pansuman. Bu ayrım Q2'den sonra bu ekibin ne yapacağını belirler.

---

### Tur 2 — Tanım denetimi: "takas" mı, "devir" mi

**Provokasyon.** Belge boyunca "takas" yazıyor ama tarif edilen mekanizma tek yönlü bir devir: A vardiyasını açar, B üstlenir, biter. WhatsApp'ta olan bu mu? Perakende vardiya pazarlığının olağan hali karşılıklıdır: "salıyı sen al, cumayı ben alayım." Bu iki bacaklı bir işlem ve **bölünemez** olması gerekir. Tasarımda iki ayrı talep, iki ayrı müdür onayı var ve aralarında hiçbir bağ yok. Müdür birinci bacağı onaylayıp ikinciyi reddederse A vardiyasını vermiş, karşılığını alamamıştır. Bu durumda A ne yapar?

**Malzeme ne diyor.** Belge bunu görmüyor. "Kısmi vardiya takası yok. Vardiya bölünmez, tamamı devredilir" cümlesi bir vardiyanın saat olarak bölünmesini yasaklıyor; iki vardiyalık bir değişimin yarım kalabilmesine değinmiyor. Q4 analizinde takasların kaçının eşleşmiş çift olduğu ölçülmemiş, en azından belgede yok.

**Sonuç: `cracked`.** Bu, steelman'in taşıyıcı ayağına doğrudan değiyor: "var olan davranışı sisteme alıyoruz" savı, ancak sisteme alınan şey var olan davranışsa geçerli.

**Mevcut en güçlü cevap.** "Çift bacaklı takas gerçek hacmin küçük bir payı; log'da aynı hafta içinde ters yönlü ikinci düzeltme oranı %X" cevabı bunu kapatır ve ölçülebilir. Kapatmıyorsa da tasarım ucuz: açan kişi "karşılığında şu vardiyamı almanı istiyorum" diye bir koşul iliştirebilir ve iki bacak tek onay olarak müdüre düşer. Bu, otomatik eşleştirme değil, atomiklik. Belgenin "otomatik eşleştirme yok" kısıtı bunu yasaklamıyor.

**Tez şu an.** Tek yönlü devir için değil, **var olan takas davranışının hangi payı tek yönlüyse o pay için** doğru bir ürün.

---

### Tur 3 — Varsayım kazısı: uygun devralan havuzu kaç kişi

**Provokasyon.** Altı kural birden sağlanacak: aynı mağaza, rol yetkinliği, 45 saat, 11 saat dinlenme, o gün başka vardiya yok, 18 altına gece yok. 19 kişilik bir kadroda, dört yetkinliğe bölünmüş, çoğu zaten haftanın o gününde çalışıyor. Bir kasa vardiyası açıldığında **listede kaç isim görünüyor**? Ve daha sert olanı: bugün WhatsApp'ta olan takaslar bu altı kuraldan geçiyor mu? Geçmiyorsa, sistem bugün gerçekleşen takasların bir kısmını reddedecek, o kısım WhatsApp'a dönecek ve müdür yine Plan'a elle girecek.

**Malzeme ne diyor.** Havuz büyüklüğüne dair tek bir sayı yok. Belge kuralları müzakere edilemez ilan ediyor ve "kural ihlali olan bir takas hiç teklif edilmemeli" diyor, ama bugünkü 25.132 takasın kaçının bu kuralları hâlihazırda ihlal ettiğini sormuyor. 1.840 bordro uyuşmazlığının varlığı, bugünkü sürecin kural denetimi olmadan yürüdüğünün kanıtı.

**Sonuç: `cracked`.** Ampirik duvar değil: bu sayı bugün elde. Q4 düzeltme dosyası artı Plan'ın yetkinlik ve saat verisi, bu altı kuralı geçmişe koşturmaya yeter.

**Mevcut en güçlü cevap.** Doğru savunma ölçümdür, argüman değil: "Q4'ün 25.132 takasını altı kurala geçmişe doğru koşturduk, %N'i geçiyor." N %80 ise talep sağlam. N %40 ise ürün, bugün olanın çoğunu reddedip WhatsApp'a geri gönderiyor ve ilk iki başarı ölçütü aritmetik olarak ulaşılamaz. Bu tek koşum, bu belgedeki her şeyden daha fazla bilgi taşıyor.

---

### Tur 4 — Tanım denetimi: 2,3 saatin içinde ne var

**Provokasyon.** Mağaza başına haftada ~4 takas düzeltmesi ve haftada 2,3 saat. Bu, düzeltme başına yarım saat demek. Bir çizelge satırını Plan'da değiştirmek yarım saat sürmüyor. O halde 2,3 saatin büyük kısmı veri girişi değil: WhatsApp'ı takip etmek, kimin kiminle anlaştığını çözmek, kuralı kafadan kontrol etmek, unutulanı kovalamak. Ürün bunun hangi dilimini siliyor?

**Malzeme ne diyor.** 2,3 saatin neyi kapsadığı tanımlanmamış. Ölçümün kaynağı da belirsiz: %61 ve 41.200 Plan logundan geliyor, 2,3 saat ise log'dan çıkmaz. Bir gözlem mi, müdür beyanı mı, hesap mı, yazmıyor.

**Sonuç: `cracked`.**

**Mevcut en güçlü cevap.** Ürünün sildiği dilim aslında büyük olabilir ve savunulabilir: takip ve kovalama tamamen kayboluyor, kural kontrolü koda geçiyor, geriye tek dokunuş kalıyor (onay). Bunu söylemek için 2,3 saati üçe bölmek yeter: keşif, kural, giriş. Bölünmeden, ROI'nin paydası bilinmiyor ve "müdürün mesaisi" iddiası ölçülemez bir gerekçe olarak kalıyor.

---

### Tur 5 — Ölçüt denetimi: 500 hedefi aritmetik olarak mümkün mü

**Provokasyon.** İkinci ölçüt, bordro uyuşmazlığını 1.840'tan 500'ün altına indirmek. Bu %73'lük bir düşüş. Peki 1.840'ın **kaçı takas kaynaklı**? Hastalık, izin, fazla mesai, geç giriş, hepsi aynı kuyruğa düşen kaynaklar. Takas payı %60 ise, ürün takas kaynaklı olanın tamamını sıfırlasa bile taban 736'da kalır ve hedef tanım gereği tutturulamaz.

**Malzeme ne diyor.** Belge 1.840'ı takasa bağlar gibi yazıyor ("takas yapıldı, müdür girmeyi unuttu ya da geç girdi") ama payı vermiyor. Birinci ölçütte takas payını titizlikle ayırmış (%61), ikincide ayırmamış.

**Sonuç: `cracked`.** Aynı analizin ikinci ölçüte uygulanmaması, ölçütün hedefini havada bırakıyor.

**Mevcut en güçlü cevap.** İK vaka sisteminde sebep alanı zaten var olabilir; varsa bir sorgu bu hedefi yarım günde sağlamlaştırır ya da düşürür. Yoksa doğru hamle hedefi mutlak sayıdan orana çevirmek: "takas kaynaklı uyuşmazlık, takas kaynaklı olanların %X'ine insin." Ulaşılamayacağı baştan belli bir hedef, üç ay sonra çalışan bir ürünü başarısız gösterir.

---

### Tur 6 — Prior art: kural motoru kimin evinde duracak

**Provokasyon.** Uygunluk kurallarının hepsi Plan'ın verisiyle koşuyor: yetkinlik Plan'da tanımlı, haftalık saat Plan'da, dinlenme aralığı Plan'daki komşu vardiyalardan, o günkü diğer vardiya Plan'da. Yani kural motoru Plan'ın verisini okuyup Plan'ın kararını veriyor, ama Plan'ın dışında, mobil tarafta duruyor. Plan'ın kendisinde bir takas modülü var mı, yol haritasında var mı? Çizelgeleme sistemlerinin çoğunda bu modül standart olarak bulunur.

**Malzeme ne diyor.** Sorulmamış. Belge Plan'ı yalnızca bir API olarak ele alıyor: okuma uçları kullanımda, yazma ucu var ama hiç denenmemiş, sahibi Murat Şen. Murat Şen'in bu işten haberi olup olmadığı, yazma ucunun bu senaryoyu destekleyip desteklemediği belgede yok. Bütçe onaylı ve Q2 sözü verilmiş durumda, ama en kritik teknik bağımlılığın sahibiyle konuşulduğuna dair bir iz yok.

**Sonuç: `unanswered`.** Kimse bakmamış. Bu bir sahip sorusu ve cevabı iki gün içinde alınabilir.

---

### Tur 7 — İç çelişki ve paydaş rotasyonu (müdür koltuğu): onay ekranı neyi onaylıyor

**Provokasyon.** Red sebeplerine bakalım. `yetkinlik yetersiz` seçeneği, uygunluk kuralı "vardiyanın gerektirdiği rol yetkinliğine sahip olmalı" ise **hiçbir zaman ulaşılabilir değil**: sistem yetkinliği olmayanı zaten teklif etmiyor. `mağaza doluluğu` de öyle; birebir devirde vardiyadaki kişi sayısı değişmiyor. Geriye `disiplin` ve `diğer` kalıyor. Yani ya bu ekran bir kauçuk damga, ya da müdür kural setinin yakalamadığı bir şeye bakıyor. İkincisiyse: sistemin "uygun" dediği listede müdürün reddedeceği isimler var demektir ve o liste çalışanın gözünde ilk haftada güvenilirliğini kaybeder.

**Malzeme ne diyor.** Belge iki seçeneği de kapatmıyor. `yetkinlik yetersiz` sebebinin varlığı, Plan'daki yetkinlik bayrağının gerçek yetkinlikle aynı şey olmadığını ima ediyor: "kasada tanımlı ama ben onu cumartesi kasaya koymam." Öyleyse "kural ihlali olan takas hiç teklif edilmemeli" ilkesi, teklif edilen her takasın da kabul edileceği anlamına gelmiyor ve arada kalan boşluk müdürün takdiri.

**Sonuç: `cracked`.** Buna bağlı ikinci bulgu: üçüncü ölçüt "takasların %70'i müdür onayına 24 saat içinde **ulaşsın**" diyor. Ulaşmak tamamlanmak değil. Reddedilen takas WhatsApp'a döner, müdür Plan'a elle girer, birinci ölçüt bozulur, ama üçüncü ölçüt yeşil görünür. Ölçüt, ölçmek istediği şeyin yanından geçiyor.

**Mevcut en güçlü cevap.** Müdür takdirini yok saymak yerine adını koymak: onay ekranı yasallık onayı değil, işletme onayı. Öyleyse ölçüt de "onaya ulaşan" değil "**onaylanarak Plan'a yazılan**" takas oranı olmalı ve red oranı ayrıca izlenmeli. Yüksek red oranı, kural setinin eksik olduğunun en erken sinyalidir.

---

### Tur 8 — İkinci mertebe etki: kural motoru delil üretir

**Provokasyon.** Bugün kuralı müdür kafadan kontrol ediyor ve yanlış kontrol ettiğinde geriye bir WhatsApp mesajı kalıyor. Yarın sistem her reddedilen takası sebebiyle birlikte kayda geçirecek. Aynı anda müdür, sistemin reddettiği takası Plan'a elle girmeye devam edebilecek, çünkü yazma yolu kapatılmıyor. O andan itibaren şirketin elinde şu ikili duruyor: "sistem bu takasın 11 saat dinlenmeyi ihlal ettiğini söyledi" ve "takas yine de yapıldı." Bu kayıt bir denetimde, bir davada ya da bir sendika görüşmesinde ne anlama gelir ve kime sorulur?

**Malzeme ne diyor.** Değinilmiyor. Belge kural motorunu tek yönlü bir kazanç olarak ele alıyor. Müdürün Plan üzerindeki elle yazma yetkisinin bu akıştan sonra da duracağı zımnen kabul ediliyor ama sonucu düşünülmemiş.

**Sonuç: `unanswered`.** Bu bir İK ve hukuk sorusu, ürün sorusu değil, ama cevabı ürünün ne loglayacağını belirler ve sonradan değiştirilmesi pahalıdır.

---

### Tur 9 — Baz oran: iç araç benimsenir mi

**Provokasyon.** Kurumsal iç araçların çoğu, çözdüğü sorun gerçek olduğu halde benimsenmez; insanlar var olan kanalda kalır. WhatsApp burada rakip ve bedava, hızlı, esnek, herkes zaten orada. Sizi ortalamadan ayıran ne?

**Malzeme ne diyor.** Bu noktada belge sağlam. Uygulama %94 penetrasyona sahip ve çizelgenin kendisi zaten orada görülüyor, yani takas düğmesi çalışanı yeni bir yere götürmüyor, baktığı ekrana ekleniyor. İkincisi, WhatsApp anlaşmayı sağlasa da **müdürün Plan'a girmesini** sağlamıyor; sonucu sisteme yazan tek yol bu akış. Üçüncüsü, bordro doğru ödensin diye çalışanın kendi çıkarı bu akışta.

**Sonuç: `held`.** Benimsenme, bu talebin en az riskli tarafı. WhatsApp'ın tamamen yok olması gerekmiyor; pazarlık orada kalıp kayıt burada olabilir ve üçüncü ölçüt zaten bunu ölçüyor.

---

### Tur 10 — İşletme izni: kural listesi tam mı

**Provokasyon.** Belge altı kuralı sayıyor ve "hepsi 4857 ve TİS'ten geliyor, müzakere edilebilir değiller" diyor. Soru kuralların müzakere edilebilirliği değil, **listenin tamlığı**. Listede hafta tatili yok: 4857'nin haftalık kesintisiz 24 saat dinlenme hükmü, bir çalışanın takasla yedi gün üst üste çalışmasını engeller, ama altı kuralın hiçbiri bunu yakalamaz. Gece çalışmasının süre sınırı da yok; listede gece kısıtı yalnızca 18 yaş altı için var. Bu iki örnek doğruysa, sistem "kural ihlali olan takası hiç teklif etmiyoruz" diyerek **ihlalli takası teklif edecek** ve üstüne yasallık damgası basacak.

Kritik olan şu: bugün kuralı bir insan uyguluyor ve hata bireysel. Yarın kuralı tasarlanmış bir süreç uygulayacak ve hata sistemik olacak. Sorumluluk müdürden şirkete geçiyor. Bu, ürünün risk profilini değiştiren tek maddedir.

**Malzeme ne diyor.** Liste kapalı bir küme gibi sunulmuş, kim tarafından ve hangi tarihte doğrulandığı yazılmamış. Ekte "4857'nin ilgili maddeleri ve TİS'in vardiya bölümü" var, yani kaynak duruyor, ama listenin o kaynağın tamamını temsil ettiğine dair bir imza yok.

**Sonuç: `cracked`.** Faz 1'in en ağır bulgusu ve fatal değil, çünkü çaresi listeyi tamamlamak. Fatal olan sürüm şudur: listenin eksik olduğu ürün canlıya çıktıktan sonra anlaşılırsa, geriye dönük her onaylı takas sorgulanabilir hale gelir.

---

### Tur 11 — Geri dönülebilirlik: yanlışsak bedeli ne

**Provokasyon.** Bu yanlışsa ne zaman öğrenirsiniz ve geri almak neye mal olur?

**Malzeme ne diyor.** Cevap malzemeden çıkıyor ve iyi. Yanlış giderse öğrenme süresi kısa: birinci ölçüt Plan logundan haftalık okunabilir, üçüncüsü ürünün kendi verisinden anlık. Geri alma maliyeti düşük: düğme kapatılır, WhatsApp zaten yerinde durur, kimse bir süreçten mahrum kalmaz. Yarıçap tek mağazanın tek haftasıyla sınırlı, veri göçü yok, dışa açık yüzey yok. Pilot bir mağaza kümesiyle çıkmanın önünde hiçbir engel yok.

**Sonuç: `held`.** Bu, tüm belgede kaydedilmiş en güçlü taraf. Yukarıdaki cracked maddelerin çoğu, kararı vermeden önce cevaplanmak zorunda değil; kontrollü bir pilotla **ölçülerek** cevaplanabilir.

---

## Faz 2 — Kapanış (proxy)

### İsteğin en güçlü hali

Ölçülmüş hacimde ve sistem dışında zaten gerçekleşen bir davranışı, uygulamanın içine alıp kurala bağlamak; kazancı müdürün haftada 2,3 saatinden ve üç ayda 1.840 bordro vakasından çıkarmak. **Bu özet Selin tarafından onaylanmadı; toplantı bununla açılmalı.**

### Onlarsız duran kısımlar

Bunlar Selin'in zamanını harcamadan kapanmış sayılabilir. Toplantıda tekrar açılmasınlar.

1. Sorunun gerçekliği ve büyüklüğü. Yöntem belli, kaynak belli, baz ölçülmüş, tahmin yok.
2. Benimsenme. %94 penetrasyon, davranış zaten var, çalışanın kendi çıkarı akışta.
3. Geri dönülebilirlik ve yarıçap. Pilot mümkün, geri alma ucuz, veri göçü yok.
4. Kapsam dışı bırakmalar. Beş dışlama net yazılmış ve gerekçeli; genişletme baskısına karşı belge kendi kendini savunuyor.

### Sahibine sorular

| # | Soru | Kim cevaplar | Neden önemli |
|---|---|---|---|
| 1 | Yukarıdaki steelman talebin en güçlü hali mi | Selin Aydın | Onaylanmamış özetle toplantı yanlış yerden başlar |
| 2 | Q4'ün 25.132 takasının yüzde kaçı altı kuraldan geçiyor | Selin + Plan verisi | Düşükse ilk iki ölçüt aritmetik olarak ulaşılamaz |
| 3 | Takasların kaçı karşılıklı çift, kaçı tek yönlü devir | Selin + Plan logu | Çoğu çiftse tasarım var olan davranışı karşılamıyor |
| 4 | 2,3 saatin içinde ne var: keşif, kural kontrolü, giriş | Selin | ROI'nin paydası; ürün yalnız bir dilimi siliyor |
| 5 | 1.840 uyuşmazlığın yüzde kaçı takas kaynaklı | Selin (İK vaka sistemi) | Takas payı %60 ise 500 hedefi tanım gereği tutmaz |
| 6 | Altı kural listesi tam mı: hafta tatili, gece süre sınırı | İK + hukuk / TİS sahibi | Eksikse sistem ihlalli takası onaylı diye teklif eder |
| 7 | Kural motoru yanılırsa sorumluluk kimde | İK + hukuk | Bireysel hata sistemik hataya dönüşüyor |
| 8 | Reddedilen ama elle girilen takasın kaydı ne anlama gelir | İK + hukuk | Denetimde delil olur; loglama kararı sonradan pahalı |
| 9 | Plan'da takas modülü ya da yol haritasında var mı | Murat Şen (Plan) | Varsa bu iş çöp; yoksa kural motoru bizim evimizde |
| 10 | Yazma ucu bu senaryoyu destekliyor mu, ne zaman hazır | Murat Şen (Plan) | Hiç kullanılmamış bir uç Q2'nin tek taşıyıcı bağımlılığı |
| 11 | Müdür neyi onaylıyor: yasallık mı, işletme takdiri mi | Selin + mağaza operasyon | İki red sebebi kural motoruyla çelişiyor, biri ölü |
| 12 | Beş açık madde ne zaman ve kim tarafından kapanacak | Selin | Kapanmazsa kararı kodu yazan sessizce verir |

Belgede zaten açık ilan edilen beş madde (48 saat sessizlik, yeniden yayım, bordro kesimi sonrası, eşzamanlı üstlenme, onay sonrası iptal) bu listeye tekrar yazılmadı. Onlar sahibinin zaten kabul ettiği borç; sorulacak tek şey **tarih ve sahip**, ki 12. satır odur.

### Neyi üstlenmiş olursunuz

İki şey. Birincisi, hiç kullanılmamış bir Plan yazma ucu ve onun sahibi olmayan bir ekipte Q2 taahhüdü: bugün itibarıyla Murat Şen'in bu takvime evet dediğine dair belgede hiçbir iz yok, ama bütçe onaylı ve tarih verilmiş. İkincisi ve daha kalıcısı, **4857 ve TİS'in vardiya kurallarının hesaplandığı yer mobil ekip olur.** Kanun değişince, TİS yenilenince, yeni bir yetkinlik eklenince kural motorunu güncelleyen sizsiniz ve yanlış hesaplanırsa ortaya çıkan şey bir bug değil, bir uygunsuzluk kaydıdır. Bunu üstlenmeden önce, kural setinin sahibinin İK olarak yazılı biçimde kalması pazarlık edilmeye değer.

### Verdict

**UNRESOLVED.**

Proxy modunda beklenen sonuç budur ve bir başarısızlık değil: toplantının gündemi var demektir. Taşıyıcı üç öncül cevapsız duruyor. **Talep tarafında** gerçek davranışın hangi payının tek yönlü devir olduğu (Tur 2), **arz tarafında** Plan'ın yazma ucu ve sahibinin taahhüdü (Tur 6), **yasallık tarafında** kural listesinin tamlığı (Tur 10). Bunlardan biri bile cevapsızken verdict `SURVIVES, NARROWED` olamaz; kapanış kuralı böyle diyor ve haklı diyor.

Bu bir kırmızı ışık değil. Sorunun gerçekliği, benimsenme ve geri dönülebilirlik ayakta kaldı, ki bunlar bir fikri genellikle öldüren üç şeydir. Kalan boşlukların tamamı **ölçümle ya da bir toplantıyla** kapanacak cinsten, tasarımı yeniden düşünmeyi gerektiren cinsten değil.

### En ucuz sonraki adım

Tek bir sorgu: Q4'ün 25.132 takas kaynaklı düzeltmesini altı uygunluk kuralına geçmişe doğru koşturmak, ve aynı sorguda ters yönlü ikinci bacağı olan takasların oranını çıkarmak. Bir gün sürer, elinizdeki veriyle yapılır, ve 2 ile 3 numaralı soruları aynı anda kapatır. Bu iki sayı gelmeden yazılacak her tasarım kararı tahmindir.

### Savunma defteri

| # | Provokasyon (mercek) | Sonuç |
|---|---|---|
| 0 | Steelman onaylanmadı, ratifiye edecek kimse yoktu | owner-question |
| 1 | Belirti mi sebep mi: haftada 4 takas, 19 kişilik kadro (kanal / çerçeve) | cracked |
| 2 | "Takas" mı "devir" mi; çift bacaklı işlemde atomiklik yok (tanım denetimi) | cracked |
| 3 | Uygun devralan havuzu kaç kişi; bugünkü takaslar kuraldan geçiyor mu (varsayım kazısı) | cracked |
| 4 | 2,3 saatin içinde ne var, ürün hangi dilimini siliyor (tanım denetimi) | cracked |
| 5 | 1.840'ın kaçı takas kaynaklı; 500 hedefi mümkün mü (tanım denetimi) | cracked |
| 6 | Plan'da takas modülü var mı, kural motoru kimin evinde (prior art) | unanswered |
| 7 | Red sebeplerinin ikisi ulaşılamaz; müdür neyi onaylıyor (paydaş rotasyonu) | cracked |
| 8 | Reddedilen takas kaydı denetimde delil olur (ikinci mertebe etki) | unanswered |
| 9 | İç araç benimsenir mi, WhatsApp bedava rakip (baz oran) | held |
| 10 | Kural listesi tam mı; sistemik uygunsuzluk riski (işletme izni) | cracked |
| 11 | Yanlışsa ne zaman öğrenirsiniz, geri alma neye mal olur (geri dönülebilirlik) | held |

Fatal flaw: yok. Hiçbir bulgu makul bir çalışmayla giderilemez değil.
