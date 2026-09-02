# Vardiya Takası — İK'dan ürün ekibine talep

**Kimden:** Selin Aydın, İnsan Kaynakları İş Ortağı (Mağaza Operasyonları)
**Kime:** Bereket Mobil ürün ekibi
**Tarih:** 12 Ocak
**Durum:** Bütçe onaylı, Q2'de çıkması bekleniyor

---

## Neden

Bereket Market'te 480 mağazada 9.100 mağaza çalışanı var. Haftalık vardiya çizelgesi **Plan** sisteminden her cuma 16:00'da yayımlanıyor ve ertesi pazartesi başlayan haftayı kapsıyor.

Çizelge yayımlandıktan sonra çalışanlar vardiyalarını birbirleriyle değiştiriyor. Bu bugün tamamen sistem dışında oluyor: mağazanın WhatsApp grubunda konuşuluyor, anlaşan iki kişi mağaza müdürüne söylüyor, müdür Plan'a girip çizelgeyi elle düzeltiyor.

Ölçtüğümüz şey şu: 2025'in son çeyreğinde **müdürlerin Plan üzerinde yaptığı elle düzeltmelerin %61'i takas kaynaklıydı** (Plan'ın değişiklik logundan çıkardık, 3 ay, 480 mağaza, 41.200 düzeltme). Mağaza müdürü başına haftada ortalama 2,3 saat. Ayrıca üç ayda **çizelge ile bordro arasında 1.840 uyuşmazlık** çıktı — takas yapıldı, müdür girmeyi unuttu ya da geç girdi, bordro yanlış vardiyayı ödedi. Bunların her biri bir İK vakası ve ortalama kapanma süresi 9 gün.

İşin özü: takas zaten oluyor, biz sadece görmüyoruz ve müdürün mesaisini yiyor.

## Ne istiyoruz

Çalışan, yayımlanmış çizelgesindeki bir vardiyayı **uygulama içinden** takasa açabilsin; uygun bir başka çalışan üstlenebilsin; müdür onaylasın; çizelge Plan'da kendiliğinden güncellensin.

### Ana akış

1. Çalışan kendi haftalık çizelgesinde bir vardiyayı seçer, "takasa aç" der. İsterse kısa bir not yazar (serbest metin, 140 karakter).
2. Vardiya, **aynı mağazadaki uygun çalışanların** takas listesinde görünür.
3. Uygun bir çalışan "ben alırım" der.
4. Müdüre onay düşer. Müdür onaylar ya da reddeder; reddederse sebep seçer.
5. Onaylanınca çizelge Plan'da güncellenir, iki tarafa da bildirim gider.

### Uygunluk kuralları

Bir çalışanın bir vardiyayı üstlenebilmesi için, **hepsi birden** sağlanmalı:

- Aynı mağazada çalışıyor olmalı.
- Vardiyanın gerektirdiği **rol yetkinliğine** sahip olmalı (kasa, reyon, kasap, fırın — Plan'da tanımlı).
- Üstlendiğinde **haftalık 45 saati** aşmamalı.
- Üstlendiğinde iki vardiya arasında **11 saat kesintisiz dinlenme** kuralı bozulmamalı.
- O gün başka bir vardiyası olmamalı.
- 18 yaşından küçükse gece vardiyası (22:00–06:00) üstlenemez.

Bu kuralların hepsi 4857 sayılı İş Kanunu ve bizim toplu iş sözleşmemizden geliyor; müzakere edilebilir değiller. Kural ihlali olan bir takas **hiç teklif edilmemeli**, uyarıyla geçilmemeli.

### Müdür onayı

- Müdür onay ekranında iki çalışanın adını, vardiyayı ve varsa notu görür.
- Reddederse sebep seçmek zorunda: `yetkinlik yetersiz` · `mağaza doluluğu` · `disiplin` · `diğer` (diğer seçilirse serbest metin zorunlu).
- Müdür 48 saat içinde cevap vermezse ne olacağına karar veremedik. Bu açık.
- Müdürün kendi vardiyası takasa girmiyor; müdürler bu akışın dışında.

### Ne olmayacak (bu sürümde)

- **Mağazalar arası takas yok.** Bereket'te mağaza değişikliği ayrı bir İK süreci; buraya bağlamıyoruz.
- **Kısmi vardiya takası yok.** Vardiya bölünmez, tamamı devredilir.
- **Otomatik eşleştirme yok.** Sistem kime uygun olduğunu göstermez, sadece uygun olanların listesinde vardiyayı gösterir. "Şu kişiyle takas et" önerisi kurmuyoruz.
- **Web arayüzü yok.** Hem çalışan hem müdür yalnızca mobil uygulamada. Müdürlerin mağaza back-office ekranı var ama oraya girmiyoruz.
- **Geriye dönük takas yok.** Başlamış ya da geçmiş bir vardiya takasa açılamaz.

## Kısıtlar

- **Plan sistemi.** Çizelge Plan'da yaşıyor. Plan'ın bir REST API'si var, çizelge okuma uçları kullanımda (uygulamada çizelgeyi zaten oradan gösteriyoruz). **Yazma ucu var ama biz hiç kullanmadık**; Plan ekibinden Murat Şen sahibi.
- **Bordro.** Bordro her ayın 25'inde kesiliyor ve o gün Plan'dan çizelgeyi çekiyor. 25'inden sonra o ayın vardiyasında yapılan değişikliğin bordroya nasıl yansıyacağını bilmiyoruz.
- **Çizelge yeniden yayımı.** Plan'da müdür haftayı yeniden yayımlayabiliyor (talep patlaması, hastalık). Yeniden yayım açık bir takas talebini ne yapar, konuşmadık.
- **Uygulama.** Bereket Mobil, iOS ve Android, React Native. Mağaza çalışanlarının %94'ü uygulamayı zaten kullanıyor (bordro fişi ve çizelge için).
- **Bildirim.** Push altyapısı var, kullanımda.
- **Dil.** Tek dil, Türkçe.
- **Tarih.** Q2 sonu. Ramazan öncesi (mart) yetişmesi çok işimize yarar ama zorunlu değil.

## Nasıl anlarız işe yaradığını

Çıktıktan 3 ay sonra:

1. **Müdürün takas kaynaklı elle düzeltmesi %61'den %15'in altına insin.** Plan'ın değişiklik logundan aynı yöntemle ölçülür, bugünkü ölçüm baz.
2. **Çizelge–bordro uyuşmazlığı üç ayda 1.840'tan 500'ün altına insin.** İK vaka sisteminden ölçülür.
3. Takasların **%70'i müdür onayına 24 saat içinde ulaşsın** — yani sistem içinde tamamlansın, WhatsApp'a düşmesin.

Üçünü birden istiyoruz. İlk ikisi işin gerekçesi, üçüncüsü akışın çalışıp çalışmadığı.

## Bilmediklerimiz

Bunları açıkça yazıyorum, tahmin etmenizi istemiyorum:

- Müdür 48 saatte cevap vermezse ne olur.
- Yeniden yayım açık bir takası ne yapar.
- Bordro kesim tarihinden sonraki takas.
- Bir vardiyayı aynı anda iki kişi üstlenmeye kalkarsa ne olur — muhtemelen ilk gelen alır ama bunu ürün kararı olarak vermedik.
- Takas onaylandıktan sonra iptal edilebilir mi. Bence edilemez ama emin değilim.

## Ekler

- Plan API dokümanı (okuma uçları): iç wiki, Plan/API/v3
- 4857 sayılı kanunun ilgili maddeleri ve TİS'in vardiya bölümü: İK ortak klasör
- Q4 elle düzeltme analizi (Excel): İK ortak klasör
