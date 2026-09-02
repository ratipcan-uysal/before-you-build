# 12-ekranlar.html — çizim notu

Kaynak: `07-design-brief.md` (yalnız o). 33 artboard, tek sayfa, 360 × 640 dp.
Çıktı bir düzen çalışmasıdır; §13.4 gereği tasarım sistemi verilmedi.

## Çizilen yüzeyler ve durumlar

| Yüzey | Artboard | Kapsanan durumlar |
|---|---|---|
| Y-1 | 1 | Giriş: vardiya seçili + "Takasa aç", başka bir vardiyada takas işareti (E-1) |
| Y-2 | 8 | default · kişi seçici (Ö-2) · kişi seçildi (Ö-3, B-5) · durum 1, 3, 4, 5, 6 |
| Y-3 | 10 | durum 7, 8, 9, 10, 11, 12, 13 · TB-2 yer tutucusu · 14a yükleniyor · 14b hata |
| Y-4 | 4 | durum 15, 16, 17, 18 |
| Y-5 | 4 | default (artan sıralı, 3 × Ö-3 + Ö-1 + Ö-2) · durum 19 boş · durum 21 · durum 24 |
| Y-6 | 5 | default (Ö-2) · durum 23 · durum 20 · durum 22 · en büyük yazı ayarı (B-6) |
| Y-7 | 1 | Dört bildirim tek karede: teklif geldi, onaya düştü, sonuçlandı, Plan yazması düştü |

§7'deki 24 durumun 23'ünün kendi karesi var. Altı `[DECISION NEEDED]` noktası
işaretli yer tutucu olarak çizildi (TB-1, TB-2 iki yüzeyde, TB-3, TB-4/E-2, TB-8, KŞ-12);
yer tutucu içeriği uydurulmadı, kararın sahibi karenin içinde yazılı.

## Çizilmeyenler ve sebebi

- **Durum 2 ("Kuruldu")** — kendi karesi yok. §7 onu "Y-3'e iner, durum 'cevap bekleniyor'"
  diye tanımlıyor; o kare Y-3 durum 7'dir. İki kere çizmek iki ekran varmış gibi okunurdu.
- **Y-2, Y-3, Y-4, Y-6 boş hâlleri** — üretici bloğu dördü için de `empty: NONE` diyor ve
  Y-2 için ayrıca "MUST NOT: boş hâl uydurma".
- **Y-4 ve Y-6'nın kendi yükleniyor/hata kareleri** — blok ikisi için de yalnız
  "loading / error: standart" diyor. Ortak örüntü Y-3 14a ve 14b'de bir kere çizildi;
  aynı iskelet ve aynı hata kutusu bu iki yüzeyde de geçerli. Ayrı kare açmak
  aynı iki kareyi üç kere çizmek olurdu.
- **§9'daki 14 dışlamanın hepsi** — havuz, red sebebi listesi, iki bacaklı takas, iptal yüzeyi,
  "Takaslarım", denetim izi, öneri/eşleştirme, rehber ve avatar, toplu onay, geri sayım ve son tarih,
  onboarding, web/back-office. Hiçbiri hiçbir karede yok.
- **E-4 ("teklif geri çekildi" bildirimi)** — dilime alınmadı; onun yerine teklif edilen
  Y-4 durum 18'i görür. Y-7'de üç değil dört kart var, ama dördüncüsü blokta
  `REQUIRED STATES` altında sayılan "Plan yazması düştü"dür, yasaklanan dördüncü bildirim değil.
- **E-5 (iki tarafın haftalık toplam saati)** — Y-6 MUST NOT'unda açıkça yasak.
- **Y-1 dışındaki mevcut ekranlar**, uygulamanın müdür bölümü, D-19'daki pilot müdür yönergesi —
  §1 bunları yüzey saymıyor.
- **Karşı tarafın yaşı, doğum tarihi, izni, raporu** — hiçbir karede yok (B-7).

## Brief'in açık bıraktığı ve benim kapattığım yerler

Sıra, sonucu en çok değiştirenden en aza.

**1. Bütün görsel dil.** §13.4: "Tasarım sistemi **verilmedi ve uydurulmadı**" ve
"Üçünden hiçbiri gelmezse üretilen şey **düzen çalışmasıdır ve tasarım diye gösterilmemelidir**".
Üçünden hiçbiri gelmedi. Tipografi ölçeği, boşluk ritmi, çerçeve kalınlıkları, gri tonları,
dokunma hedefi boyutları, `‹` ve `›` dışında ikon olmaması, bildirim kartındaki köşe yarıçapı —
hepsi benim. Hiçbiri Bereket Mobil'in dili değil ve TB-6 çözüldüğünde hepsi atılır.

**2. Kişi seçicinin biçimi.** Blok onun "en büyük dokunulabilir öğe" olduğunu ve listenin
"mağazanın tamamı, süzülmeden" olduğunu söylüyor; ekran mı, alt sayfa mı, satır içi liste mi
olduğunu söylemiyor. Y-2'nin üstüne açılan tam ekran liste seçtim, başlığına §13.1'in
3. satırını koydum. Listeyi ada göre alfabetik sıraladım: sıralama kararı brief'te yok,
"en uygun" işareti yasak olduğu için tek nötr sıra alfabetikti.

**3. Seçicideki arama alanı.** "Süzme, arama, sekme ekleme" yasağı Y-5'in MUST NOT'unda,
Y-2'nin değil. Y-2'ye "Ada göre ara" koydum. Metin §13.1'de yok, uydurdum. Kırk kişilik bir
mağaza listesinde aramasız çalışmayacağını varsaydım; bu varsayım doğrulanmadı ve arama,
"mağazanın tamamı görünsün" niyetiyle gerilebilir.

**4. Aynı adlı iki kişiyi ayırt etmek.** §13.2 Ö-2: "Kişi seçici bu ikisini ayırt edebilmeli".
Nasıl ayırt edileceği yazılı değil, kişisel veri ise 8. kısıtla yasak. Reyon / Kasap yani
bölümü kullandım. Bölüm brief'in eleman listesinde yok, örnek içerikten aldım. Aynı bölümde
aynı adlı iki kişi olursa bu çözüm çöker.

**5. Y-6 devir cümlesinin şablonunu değiştirdim.** §13.1 satır 23 şunu veriyor:
"{Ad-1}'in {tarih} {saat} vardiyasını {Ad-2} üstleniyor". Ö-2 ile bu cümle aynı adı iki kere
söylüyor ve B-12 tam olarak bunu sınıyor. Yazdığım: "Reyon'dan Mehmet Yılmaz'ın 3 Nisan Perşembe
12:00 – 20:00 vardiyasını Kasap'tan Mehmet Yılmaz üstleniyor". Onaylanmamış bir metin değişikliği;
üstelik §13.1'in başındaki uyarı tam bunun için duruyor.

**6. Not alanı ile birincil eylemin dikey sırası (Y-2).** Blok sırayı "4. Birincil eylem /
5. Not alanı" diye veriyor. Ben notu düğmenin üstüne, düğmeyi ekranın altına koydum: forma
son noktayı koyan kontrolün altında bir metin alanı bırakmak, alanı görünmez yapar.
Rütbeyi konumla değil ağırlıkla taşıdım. Listenin harfine aykırı.

**7. Uyarı ile notun sırası (Y-6).** Aynı çelişkinin ikinci hâli: blok "2. uyarı / 3. not"
diyor, mekanizma ise uyarının "eylemlerin ÜSTÜNDE" durmasını istiyor. Not'u cümlenin altına,
uyarıyı eylemlerin hemen üstüne koydum (1-3-2-4-5).

**8. Y-4 başlığının yeri.** §13.1 satır 16, "{Ad} sana bir vardiya devretmek istiyor" cümlesini
"Y-4 başlık" diye etiketliyor; oysa rütbe 1 vardiya bloğu, rütbe 2 kişi. Cümleyi bloğun altına
indirdim ve nav çubuğuna brief'te hiç geçmeyen "Gelen teklif" başlığını koydum.

**9. Ekran adları.** §13.1 yalnız Y-2 ve Y-5'in başlığını veriyor. Uydurduklarım:
"Takas" (Y-3), "Gelen teklif" (Y-4), "Karar" (Y-6), "Haftam · 10–16 Mart" (Y-1),
"Kime teklif ediyorsun?" (seçici).

**10. Y-3 durum 12'nin metni.** §13.1'de 9–13 ve 15 var, "geri çekildi" için satır yok.
"Teklifi geri çektin. Vardiya sende" yazdım.

**11. Y-3'ün hangi tarafı gösterdiği.** Yüzey "iki taraf" ama brief yalnız geri çekmenin
devredende olduğunu söylüyor; kalan durumların iki taraftaki metni ayrışıyor mu, yazılı değil.
Her kare için bir taraf seçtim ve seçimi karenin altındaki etikete yazdım. Üstlenen çalışanın
9–13 arası görünümü çizilmedi.

**12. Metni olmayan üç kontrol.** "Açık takası gör" (Y-2 durum 4'ün "mevcut takasa çıkışı"),
"Çizelgeme dön" (Y-4 durum 18'in tek çıkışı), "Tekrar dene" (Y-3 14b ve Y-5 durum 24).
Üçü de §13.1'de yok.

**13. "Gönderiliyor".** §7 "ilerleme eylemin yerinde" diyor, ne yazacağını demiyor.
Düğmeyi etkisiz "Gönderiliyor" hâline çevirip altına ince bir çubuk koydum. Metin uydurma;
§13.1'in 31. satırı yalnız "Yükleniyor" veriyor ve o kelime iskelet ekranında kullanıldı.

**14. Yükleniyor'un görüntüsü.** Gri iskelet blokları seçtim. Dönen gösterge, çubuk ya da
hiçbir şey de brief'i aynı ölçüde karşılardı.

**15. Gece vardiyasının yazımı.** B-10 iki tarihin anlaşılmasını istiyor, §13.3 satır 6
"gece vardiyası iki tarihiyle yazılır" diyor, cümleyi vermiyor. Bloğa ikinci satır olarak
"Gece · 1 Mart Pazar sabahı biter" yazdım. "Pazar"ı ben türettim: brief yalnız
"28 Şubat Cumartesi 23:00 – 1 Mart 07:00" diyor, 1 Mart'ın günü yazılı değil.

**16. Vardiya bloğunun içinde bölüm satırı.** Blok "gün, tarih, saat aralığı" diye tanımlı;
örnek içerik ise kasa / reyon / kasap taşıyor. Bölümü bloğun içine üçüncü ve en sessiz satır
olarak koydum, üç yüzeyde de aynı (B-9). Blok tanımının dışına çıkıyor.

**17. Y-5 satırının tarih biçimi.** Satırda "28 Şubat · 23:00 – 07:00" yazıyor, gün adı yok:
§13.3 satır 5 "tarih ve saat hiçbir koşulda kırpılmaz" diyor ve gün adı eklendiğinde uzun
adlarla birlikte satır sarıyordu. Vardiya bloğunda gün adı duruyor, kuyrukta durmuyor;
bu tutarsızlığı bilerek bıraktım.

**18. Bekleme süreleri.** "{n} gündür bekliyor" bir n istiyor. 1, 2 ve 3 gün yazdım.
Ö-3'ün üç kopyası aynı tarihi ve aynı bekleme süresini taşıdığı için kuyrukta birbirinden
ayırt edilemez üç satır oluşuyor; kopyalar istendiği için öyle bıraktım, gerçek üründe
bu üç satırın ayrışması gerekir.

**19. Y-5 durum 21'de onay sonrası hiçbir doğrulama yok.** §7 yalnız "Kuyruğa döner, satır düşer"
diyor. Normalde buraya bir doğrulama şeridi konur; dönüşü olmayan bir andan sonra sessizlik
tasarım hatası gibi durur. Brief bir metin vermediği ve bu an geri alınamaz olduğu için
uydurmak yerine sessizliği görünür bıraktım.

**20. Y-5'in not işareti.** Rütbe 4 "not var/yok işareti" diyor; ikon seti yok. Çerçeveli küçük
"Not" etiketi kullandım ve yalnız not varken gösterdim.

**21. KŞ-12 yer tutucusunun yeri.** §6 "Bu yüzey işaretli yer tutucuyla çizilir" diyor, nereye
demiyor. Y-5 ve Y-6'nın en üstüne şerit olarak koydum. Y-6'da bu, rütbe 1 olan devir cümlesinin
önüne bir şey geçirmek demek; bedeli görünür olsun diye böyle bıraktım.

**22. E-1'in görünüşü.** "Takasa aç girişi olmalı" ve açık takaslı vardiya "işaretli görünmeli"
diyor, ikisinin de biçimi yok. Seçili satırın altında açılan satır içi "Takasa aç" ve çerçeveli
"Takasta" etiketi seçtim. Ayşe'nin haftasındaki diğer vardiyalar, saatler ve izin günleri
tamamen benim uydurduğum dolgu içeriktir.

**23. Y-7'nin sunumu.** Brief metinleri veriyor, yüzeyi vermiyor. Kilit ekranı ve dört kart
seçtim. Kartların başlıkları (`Vardiya teklifi geldi`, `Onay bekleyen takas`, `Takas sonuçlandı`,
`Onay çizelgeye işlenemedi`) benim: §13.1'in 27–29. satırları ad taşıyor, rütbe ise
"1 ne oldu — başlık" diyor ve ad başlığa giremiyor. Yani verilen üç satırı gövdeye koydum,
başlıkları yazdım. 29. satırdaki `{sonuç}` yerine "onaylandı" koydum. Dördüncü kartın gövdesi
§13.1'de hiç yok. Uygulama adı olarak "Bereket Mobil" kullandım; malzemenin kendi kurgusal adı
olduğu için gerçek marka yasağına girmediğini varsaydım.

**24. Küçük kararlar.** 140 karakter sayacı ("140 / 140") ve biçimi · notu olmayan takasta
not bloğunu hiç göstermemek (boş "Not yok" yerine) · durum çubuğundaki saatler ve tarihler ·
Y-2 durum 5'te kişinin seçilmiş ama etkisiz görünmesi (listede mi engelleniyor, seçildikten
sonra mı, brief söylemiyor; seçim sonrası hâli çizdim) · notun yalnız Y-3 durum 8'de görünüp
sonuçlanmış durumlarda görünmemesi.

## Kendi çizimime iki itiraz

- **Yer tutucular yüzeyi ele geçiriyor.** Y-4 durum 15'te kutunun içindeki taralı blok,
  eylemlerden daha çok yer kaplıyor. Gerçek cümle 90–120 karakter olduğunda o kutu küçülecek
  ve düzen değişecek; yani TB-1 çözülene kadar Y-4'ün oranları güvenilmez.
- **En zayıf iddiam 6 ve 7 numaralı sıralama kararları.** Blok bir sıra veriyor, ben başka bir
  sıra çizdim ve gerekçem "form böyle okunur"dan ibaret. Brief'in sırasını harfiyen isteyen biri
  ikisini de reddedebilir; itiraz gelirse düzeltilecek yer burası.
