# Vardiya Takası koşumu — sette bulunan eksikler

Koşum: 2026-08-31, v4.7.0, temiz alt-ajan zinciri. Fikstür Türkçe.
Talep bilerek **sağlam** yazıldı: ölçülmüş problem, üç sayısal başarı ölçütü, altı kurallık uygunluk listesi, beş açık non-goal, ve yazarın kendi "Bilmediklerimiz" bölümü.

**Koşan:** `impact-radar` · `idea-grill` (proxy) · `prior-art` · `readiness-score` ×2 bağımsız · `request-shaper` (otonom). Altı ajan, ~610k token.
Eksen olarak yeni: `transaction` · `mobile-app` — ikisi de hiçbir yayımlanmış örnekte koşmamıştı.

---

## Baş bulgu — rubric ifşayı cezalandırıyor, ve bunu kendi dosyasında biliyor

[`rubric.md:179`](../../skills/readiness-score/references/rubric.md) tuzağı adıyla yazıyor:

> …it charges an honest author who quoted the contradiction and refused to resolve it, because resolving it with an invented `[ASSUMED]` would have scored higher. **Refusing to invent is the behaviour this whole rubric exists to protect.**

Muhakeme doğru ve **tek bir vakaya** uygulanmış: belgenin kendi kuralını çürüttüğü hâl. Aynı ceza en az üç yerde daha çalışıyor, üçü de kapatılmamış. İki bağımsız okuma bunları birbirini görmeden buldu.

| | Dürüst hâl | Puan | Aynı bilginin "temiz" hâli | Puan |
|---|---|---|---|---|
| **H1** | *"muhtemelen ilk gelen alır ama bunu ürün kararı olarak vermedik"* | 0 | `[ASSUMED]` ilk gelen alır | 1 |
| **H2** | *"bunu konuşmadık"* | 0 → **blocker ateşler** | *"handle errors gracefully"* (`scoring.md:65`) | 1 → blocker atlar |
| **H3** | Plan yazma ucunu ve sahibini yazmak → `multi-surface` okuması doğallaşır, 8 madde açılır, 7'si sıfır | **38** | Entegrasyonu hiç anmamak | **44** |

H2 en ağırı: içi boş bir iyimserlik ifadesi blocker'ı atlatıyor, dürüst itiraf NOT READY yapıyor — tek maddede verdictin kendisi dönüyor.

**Sonuç setin en çok koşulan ikilisini vuruyor:** `request-shaper` çıktısı dürüst bir insan talebini yapısal olarak geçiyor. İki skill arasındaki `[ASSUMED]` sözleşmesi tam da gizli anlaşmayı engellemek için kurulmuştu.

---

## Set geneli

### G1 · `Output to chat` / `Never write files unprompted` zincirle çelişiyor
**Bulan:** impact-radar · **Kapsam:** 15 skill
Ajan bir çıktı yolu aldı; görevi bitirmek için kuralı çiğnedi. Aynı skill başka yerde zinciri varsayıyor (*"`build-context` carries it into the handoff"*). Kuralın zincir adımı için şartı yok.

### G2 · Öz-inceleme guard'ı zincirde tanımsız
**Bulan:** impact-radar · **Kapsam:** guard taşıyan 7 skill
*"If the material was produced in this conversation"* — alt ajan koşumunda hangi konuşma? Ajan guard'ın istediği kurulumdaydı (tek girdisi bir dosya yolu) ama bunu bilemedi. Bir cümle yetiyor.

### G3 · Etkileşimsiz koşum üç skill'de aynı yerden kırılıyor
- `idea-grill`: Faz 1 `Fire once. Stop. Wait.` üzerine kurulu; `Never answer a question that is still open` kapanış tanımlarıyla çelişiyor. İkisini ayakta tutan tek okuma "sanık belgenin kendisidir" ve skill bu cümleyi kurmuyor.
- `prior-art` `SKILL.md:55`: *"If the caller is unclear, ask which of the three you are doing"* — dosyadaki tek fallback'siz kural.
- `request-shaper`: aşağıda RS1.

### G4 · CI'ın principle 11 kontrolü kavramı değil, cümleyi tanıyor
`scripts/validate.py` → `NEEDS_A_PERSON` bir ifade listesi: *"their call, every time"*, *"let the user choose"*, *"ask the user which"*. `prior-art`'ınki *"ask which of the three you are doing"* diye yazıldığı için eşleşmiyor, CI yeşil geçiyor. Kontrolün var olma sebebi tam buydu; ilk yeni koşumda ilk yeni ifadeyle kaçtı.

### G5 · Aynı kontrol `references/` dosyalarını hiç okumuyor
Döngü `skills/*/SKILL.md` üzerinde. Cevap bekleyen bir kural referans dosyasına yazılırsa görünmez. (`build-context/references/crosscheck.md:55` cevap bekliyor ama fallback'i var — kör nokta henüz ısırmamış, kör nokta gerçek.)

### G6 · Fallback'in varlığı kontrol ediliyor, dosyanın kendisiyle çelişmediği kontrol edilmiyor
RS1 tam olarak bu: doğru kural dosyada var, CI onu görüyor ve geçiyor, ama otuz satır yukarıdaki eski tarif onu geçersiz kılıyor.

---

## Skill bazında

### RS1 · `request-shaper` — Faz 1 ile Faz 2 otonom mod için zıt kural veriyor
- `SKILL.md:43` (Faz 1): *"you write the whole document from the input alone, **marking every inferred line `[ASSUMED]`**"*
- `SKILL.md:66` (Faz 2): *"In autonomous mode nobody makes that call, so **the default is to leave it open**"*

İkisi aynı belgeyi üretmez; fark readiness puanında ~30 puan. Sırayla okuyan Faz 1'i önce görür ve kırk satırı `[ASSUMED]` olan, dolu görünen, hiçbir şey bilmeyen bir belge yazar — setin engellemek için var olduğu ürün. Faz 2 sonradan yazılmış principle 11 düzeltmesi; Faz 1'in tarifi süpürülmemiş.

### RS2 · `request-shaper` — zincirden çalışmanın üç kararı belgede yok
1. Üst belgenin bir satırı **kaç soru sayılır** yazmıyor, oysa *"Say how many you took in"* diye bir sayı isteniyor. Sayı eşleştirmeye bağlı; ikinci koşum farklı rapor eder.
2. Yukarıdan gelen `[DECISION NEEDED]` jetonuna ne olacağı yazmıyor; sözlük iki jetonla sınırlı.
3. **İki üst belgenin birbiriyle çelişmesi için hiçbir yer yok.** (`prior-art` K1 otomatik onayı savunuyor, `idea-grill` Tur 7 müdür takdirinin gerçek olduğunu.) `build-context`'e *"name every place two of them disagree"* deniyor ama zincirde yazmaya izni olan tek skill bu.

### RS3 · `request-shaper` — sayma kuralı yok, belge kendiyle çelişiyor
Taşıyıcı envanteri `[ASSUMED]` sayısını 7 yazdı, gövdede 10 satır var. Sayma kuralı olmadığı için oluşan sapma.

### R2 · `readiness-score` — K3'ün paydası sınıflandırmayla şişiyor, ağırlığı sabit
`transaction` (7 madde) + `mobile-app` (4 madde) K3'e 11 koşullu madde ekliyor: 5 → 16. Ağırlık 25'te kalıyor. Omurga maddelerinin (`B1`–`B5`) hepsinden 3 alan belge 25'in ~7.8'ini kazanıyor. Yayımlanan ağırlık tablosu aritmetiğin yaptığı şeyi tarif etmiyor.

### R3 · Sınıflandırma oynaklığı rubric'in değil, ince belgenin özelliği olabilir
İki bağımsız okuma, birbirini görmeden: aynı sınıflandırma, **aynı 44/100**, aynı blocker, `multi-surface` alternatifinde aynı 38. Banka koşumunda dört okuma 18/17/20/22 vermişti. Fark talebin kalitesi. `docs/decisions.md`'deki açık maddeyi daraltan kanıt.

### I1 · `idea-grill` — "Merit only" sınırı, uygunluğun kendisi değer önerisiyse yanlış tarafa sürüyor
Koşumun en pahalı bulgusu (uygunluk kural listesi eksik: hafta tatili, gece süre sınırı) `lenses.md`'nin "Merit only" kuralıyla `risk-interrogate`'e sürgün ediliyor. Ürünün varlık sebebi uygunluk hesabıysa, uygunluk bir merit sorusudur. Ajan maddeyi ancak "fatal rather than merely hard" istisnasını zorlayarak tuttu.

### I2 · `idea-grill` — iddia sahibinin sayısını kendi paydasına bölme tekniği yazılı değil
Koşumun keskin bulgularının tamamı bu işlemden çıktı: 41.200 × %61 ÷ 13 hafta ÷ 480 mağaza = mağaza başına haftada ~4 takas; 2,3 saat ÷ 4 = düzeltme başına yarım saat. Ajan bunu lens 4 (definition audit) altında yaptı — **mercek var, teknik yazılı değil.** Eksik mercek değil, eksik cümle.

### P1 · `prior-art` — kanıt kapısı, kaynak gerektirmeyen soruyu kaynak gerektiren iddiadan ayırmıyor
mevzuat.gov.tr ve resmigazete.gov.tr TLS'te düştü; ajan *"45 saat yasal tavan mı işveren politikası mı"* sorusunu düşürdü. Bu soru hiç kaynak istemiyor ve skill'in kendi kuralı (*"if nobody can be named, that is the finding"*) ters yönü gösteriyor.

### IR1 · `impact-radar` — Faz 0, henüz üretilmemiş sayıyı istiyor
Loud/Silent/Deferred sayımı Faz 0'da isteniyor, sayıyı Faz 1–2 üretiyor. Belge sırasının çalışma sırasından farklı olduğu söylenmiyor. Dikkatsiz okuyucu ya sayımı sona atıyor (Faz 0'ın gerekçesi ölüyor) ya sayıyı uydurup bulguları ona uyduruyor.

### IR2 · `impact-radar` — kaynak belgenin kendi açık soruları ne olacak, yazmıyor
Talebin "Bilmediklerimiz" bölümü beş soru sıralıyor. Radar bunları yeniden yazarsa bulmadığını bulmuş görünüyor; yazmazsa gerçek bir Silent bağımlı düşüyor. Skill durumu anmıyor.

---

## v4.7.0'da dün eklenen kural hakkında

### Y1 · "Bir hücre bir satırdır" ilk koşumda tuttu
Beş belgede en uzun hücre **13 kelime**, en uzun satır **180 karakter**. Aynı skill'lerin yayımlanmış örneklerinde bu 39–84 kelime / 409–748 karakterdi. Yarım çeviri yok, marker'lar İngilizce kaldı.

### Y2 · Ama kaç satırın bloğa dönebileceğine dair eşik yok
> *On beş kelimeye üç olgu sığdırmak, olgu başına beş kelime demek… Kırkı da blok olursa belge okunmaz; sıfırı olursa bulgular kırpılır. **Altıyı seçtim. Bu sayı bende oluştu, skill'de değil.***

`impact-radar` Faz 2'nin kendi talebi (*"one line: who finds out, how, and after how long"*) artı boyut, sınıf, sahip, durum ve bağımlının kendisi — on beş kelimeye sığmıyor.

### Y3 · Sözlük kuralı ateşledi, ek mekaniği ateşlemedi
"Bir şeye bir kelime, bir kez seç" beş belgenin üçünde görünür bir **Terim sabiti** satırı üretti. Kesme + ek mekaniği ise hiç gerekmedi: belgeler İngilizce token'ı hep etiket konumunda kullandı (`Sınıf: Silent.`). Kural yanlış değil, **bu koşum onu sınamadı.**

---

## Meta-bulgu — set kendi tuzağını adlandırıyor, boşaltmıyor

Dört skill'de aynı şekil çıktı: tuzak dosyada adıyla yazılı, ne yapılacağı yazılı değil.

| | Adlandırılan tuzak | Verilen prosedür |
|---|---|---|
| `readiness-score` | Dürüst yazarı cezalandırma (`rubric.md:179`) | Dört vakadan **birine** uygulanmış |
| `slice` | Bayat puana karşı kesme (Faz 2) | **Yok** — uzlaştırmayı ajan kendi yazdı |
| `idea-grill` | Gözetimsiz koşum | **Yarım** — steelman ve kapanış görüyor, Faz 1 görmüyor |
| `impact-radar` | Faz 0'ın sayımı | **Yok** — belge sırası ile çalışma sırası ayrımı yazılmamış |

Reponun 11. ilkesi bunun dar hâli: *cevap bekleyen kural, cevap gelmezse ne olacağını yazmalı.* Geniş hâli yazılmamış: **adlandırılan tuzak, ne yapılacağını da yazmalı.** CI şu an yalnız dar hâli, o da ifade listesiyle kontrol ediyor (G4).

## `slice`

### S1 · Kesicinin yetkisi olmayan ertelenemez karar için dört bölümde yer yok
*"Cut the build, never the decision"* artı `undeferrable.md`'nin para/hukuk kategorisi, gözetimsiz koşumda çakışıyor: hukuki kararlar İK ve hukuka ait. *"Every row ends in one of these four"* kuralı **18 `[DECISION NEEDED]` satırını "Decided now, built later" bölümüne** doldurdu. Dikkatsiz okuyucunun çözme yolu hukuki kararı kendi vermek — burada bu, yasadışı devri "kontrol edildi" diye damgalayan bir kural motoru demek.

### S2 · Bayat puan tuzağı adlandırılmış, prosedürü yok
Elde tek puan `00-talep.md`'yi puanlamış; kesilen belge `05`. Faz 2 tuzağı tarif ediyor (*"slicing the second version against the first version's score is a measurement of a document you are not cutting"*) ve ne yapılacağını söylemiyor.

**Kesilen dilim:** bir vardiya, A'dan aynı mağazadaki **adı verilmiş** bir meslektaşa; kurallar hem üstlenmede hem onayda sunucuda kontrol ediliyor; müdür onaylıyor; Plan yazılıyor; iki tarafa bildirim. Pilot mağaza kümesi.
**Düşenler:** vardiya havuzu ve liste yüzeyi (yerine yönlendirilmiş teklif — Selin'in onayını gerektiriyor ve A01 eşzamanlılığıyla B-3 blocker'ının yarısını da beraberinde götürüyor), dört maddelik red sebebi enum'u (`disiplin` dahil), otomatik onay, iki bacaklı takas, onaylanmış takasın uygulama içi iptali, 480 mağazaya yayılım.
**Bulgu:** Q2 iş hacmine değil, **Murat Şen'in yazma ucuna ve 19 açık blocker karara** bağlı.

---

## İkinci meta-bulgu — kural sıkıldı, örnek süpürülmedi

Üç skill'de doğrulandı. Her üçünde de **okuyucunun kopyaladığı satır**, aynı dosyanın kuralını çiğniyor. Hiçbiri için kontrol yok.

| | Kural | Onu çiğneyen örnek |
|---|---|---|
| `readiness-score` | *"bunu konuşmadık" sıfırdır* | `scoring.md:65` → *"handle errors gracefully"* = **1** |
| `request-shaper` | Faz 2: otonom modda varsayılan **açık bırakmak** | `SKILL.md:43` → *"marking every inferred line `[ASSUMED]`"* |
| `flow-map` | Faz 4: *"report marks and steps as separate numbers… mixing them is the most common error in this document"* | `SKILL.md:108` → `· 11 system touchpoints ·` |

`flow-map`'inki en pahalısı: o satır **taşıyıcıya konacak satır**, ve `api-needs` iş listesini ondan kuruyor. Skill'i harfiyen izleyen okuyucu yasakladığı sayıyı yayımlıyor.

## `flow-map`

### FM1 · Faz 6'nın örnek satırı Faz 4'ün kuralını çiğniyor
Yukarıdaki tabloda. Doğrulandı: `SKILL.md:80–82` ile `SKILL.md:108`.

### FM2 · "Üçüncü seçenek yok" ile "kararı sen verme" bağdaşmıyor
Kural kapısında düşen üstlenme/onay dallarında (B4, B6) teklifin açık kalıp kalmadığı hiçbir belgede yazılı değil. `Terminates` yazmak Selin'in vermediği kararı gömmek; boş bırakmak skill'in "bulgu" dediği şey. Skill bu çıkışı vermiyor — oysa kendi taşıyıcı bölümü *"any ending that is conditional on an open decision"* isteyerek üçüncü seçeneğin varlığını kabul ediyor.

### FM3 · Kimlik uzayı için set genelinde kural yok
Ajan, `06-slice.md`'nin `D-n` ve `K-n` kimlikleriyle çakışmamak için dalları `B1–B6`, açık kararları `AK-1–AK-9` diye adlandırmak zorunda kaldı ve bunu taşıyıcıya yazdı. Dün eklenen kimlik kuralı (`F1`, `Q1`, `N1`) skill başına harf seçiyor, **zincir boyunca çakışmayacağını garanti etmiyor.** Entity'leri numaralandırmama kararı bu problemin yalnız bir örneğiydi.

**Kapsam:** 21 mutlu yol adımı · 6 dal · 19 hata yolu · 8 bitiş · 24 işaretli adım (30 işaret: `reads` 10, `acts` 14, `emits` 6).

## `design-brief`

### DB1 · "Var ama sana görünmüyor" dalı yok
Skill'in tam iki dalı var: *"Never draft the design system for an app that already exists"* ve greenfield tersine çevirmesi *"When nothing exists yet, draft the minimum set."* Bereket Mobil canlı ve %94 kullanımda; ajanın hiçbirine erişimi yok. **Yasak geçerli, kurtarma geçerli değil**, ve yasağın çaresi (*"say what the generator needs and how to supply it"*) sorulacak bir insan varsayıyor. Gözetimsiz koşumda zincir, greenfield paragrafının durmamalı dediği yerde duruyor.

Vakayı çözen tek cümle `generator.md`'de gömülü bir alan etiketi (`design system: … "none supplied — output is a layout study"`) — skill'in **en son ve koşullu** açmayı söylediği referansta. Ajan yasağı korudu, belgenin kendi iddiasını "düzen çalışması"na indirdi ve tasarım sistemi erişimini tek blocker karar yaptı; ama bu onun kararıydı, skill'in değil.

v4.6.0 var/yok diye dallandı; **var-ama-erişilemez** hâli atlandı ve zincir koşumunda en yaygın hâl bu.

### DB2 · `record.md` §8 ile `SKILL.md`'nin ekleme kuralı birbirini kesiyor
`06-slice.md` DD-10 ile erişilebilirlik seviyesini, tablet düzenini ve çevrimdışını alıntılanabilir bir dışlamayla kapsam dışına aldı (onaylayan Ürün ekibi, gerekçe *"kimse istemedi"*). §8 metin ölçekleme ve asgari viewport'u **taslakla** diyor; ekleme kuralı ise kapsam listesinde olmayan her şey için adlandırılmış onaylayan istiyor. Hangisi kazanır yazmıyor. Dikkatsiz okuyucu ya altısını sessizce taslaklıyor — skill'in kendi ekleme paragrafının uyardığı kapsam büyümesi — ya hiçbirini yazmıyor ve kırpılma dördüncü ekranda icat ediliyor.

**Kapsam:** 7 yüzey · 24 adlandırılmış durum · 16 hata yolu · 14 non-goal · **14 `[DECISION NEEDED]`** (8'i bu belgenin açtığı, 6'sı slice'tan taşınan).

**İşe yarayanlar, ajanın kendi ifadesiyle:** rank-mekanizma kuralı Y-2'de telafi ve squint kontrolünü zorladı · dönüşü olmayan nokta testi **beş belgenin adlandırmadığı ikinci bir geri dönüşsüz anı** (üstlenme) çıkardı · *"draft the copy except any string with a named approver"* tam tahmin edildiği yerde işe yaradı: İK'nın sahibi olduğu altı kural-ihlali metni.

## `risk-interrogate`

### RI1 · Skill tek bir açık liste varsayıyor; zincirin sonunda dört tane var
Faz 3'ün 4. testi (*"its own open list already names it"*) **"adlandırmak"tan ne kastettiğini söylemiyor** — konuyu mu, kırılmayı mı. Konu okuması geçerli sayılsaydı 12 sorunun 3'ü silinirdi. Çıktının dörtte biri okuyucunun yorumuna bağlı.

**Ve setin maliyet kuralı bu işle çarpışıyor.** *"Taşıyıcıyı oku, sonra parçayı"* diyor; oysa bir adayın dört listeden birinde olup olmadığını **dördünü birden elinde tutmadan** bilemiyorsun. İki mekanizma birbirini yiyor.

### RI2 · Kuralı kanundan gelen iş için hiçbir mercek yok
Tek düzenleyici mercek (5) tamamen kişisel veri etrafında kurulu. Buradaki asıl risk maruz kalma değil: **sistemin hukuki bir kararı hesaplayıp damgalaması ve damgayı saklaması.** Malzeme bunu kendi cümlesiyle söylüyordu; skill'de karşılığı yok, ajan Q1/Q3/Q10'a eşzamanlılık ve insan hatası merceklerinden uzun yoldan vardı.

Severity tablosu da ayırmıyor: *"a rule is broken"* burada işin **konusunun kendisi**, o yüzden ürünün kendi kuralının ihlali ile 4857'nin ihlali aynı kutuya düşüyor.

**Sayım:** 26 ham sorudan 12'si kaldı, 14'ü dört üst listede adı geçtiği için çizildi. Sınıf `transaction` · `multi-surface`. 5 Critical · 6 High · 1 Medium.

## `data-model`

### DM1 · Devretme kuralı, savunulamayacak bir "entity yok" yazdırdı
Faz 0: *"a hand-off writes nothing here and is still an act, so do not invent an entity for it to write into."* Ama akışta **E8** var: push devretmesinin sessizce başarısız olduğu, yazılı bir hata yolu. Kendi hata yolu olan bir devretmenin **durumu vardır** ve o durumu bir şey tutmalıdır. Skill'de bu maddeye dair hiçbir cümle yok, dolayısıyla iki kural da geçti ve **gerçek bir boşluk temiz diye kaydedildi.** Dikkatsiz okuyucu E8'i hiç fark etmiyor, çünkü kural güvence gibi okunuyor.

Bu, hatanın en kötü türü: skill'in ürettiği, kapsama benzeyen yanlış negatif.

### DM2 · Üst belge alt skill'e görev veriyor, ve bunun bağlayıcı olup olmadığı yazmıyor
`08-flow-map.md` §7 `data-model`'e **adıyla sesleniyor**: *"Önce `data-model`: adım 19, KŞ-1, KŞ-2, KŞ-3, KŞ-6."* Skill bunun bir brief mi ipucu mu olduğunu söylemiyor. Harfiyen alınırsa dört entity çıkıyor ve **beş beyan edilmemiş içe aktarılmış bağımlılık kaçıyor** — koşumun en büyük bulgusu.

Skill'in *"kaynak zaten bir denetimden kalmışsa"* bölümü ayrı bir grill belgesi varsayıyor; kendi bulgularını taşıyan ve alt skill'in işini önceden dağıtan bir akış için hiçbir şeyi yok.

**Not:** bu tehlikeyi taşıyıcı mekanizması yarattı. "Okuyucularını adlandır, her birinin ne alacağını yaz" kuralı, üst belgeye alt skill'i **yönlendirme** imkânı veriyor ve yönlendirmenin bağlayıcılığı hiçbir yerde tanımlı değil.

### DM3 · Kuralı kanundan gelen entity için beş sorunun dördü boş dönüyor
Uygunluk kural kümesi sürümü için beş sorudan dördü boş; asıl önemli soru — **kaynak sürümlerinin değişmezliğini garanti ediyor mu** — beşinin arasında yok, ajan onu icat etmek zorunda kaldı.

`risk-interrogate`'in RI2'siyle aynı aile. **İki bağımsız geçiş aynı boşluğu buldu:** kuralı kanundan gelen iş, sette hiçbir yere ait değil.

**Kapsam:** 10 entity (5'i akış içinde oluşuyor, 5'i yaratıcı adımı olmadan içe aktarılıyor) · Faz 4'ün dört taramasında **11 uyuşmazlık** · tarama dışı 4 bulgu · slice kapsamının ötesinde 6 beyan edilmiş ekleme · sahipleriyle 9 yeni `[DECISION NEEDED]`. Diyagram çizilmedi (Faz 5'in gözetimsiz kuralı).

### DB3 · Generator bloğunun sıra listesi, brief'in kendi mekanizma cümlesiyle çelişiyor
Brief'ten çizen ajan (ayrı bağlam, `12-ekranlar.html`) şunu bildirdi: generator bloğu Y-6'yı `2. uyarı / 3. not` diye sıralıyor, ama aynı yüzeyin mekanizma cümlesi uyarının **eylemlerin ÜSTÜNDE** durmasını şart koşuyor. İkisi aynı belgede ve birbirini kesiyor. `design-brief`'te sıra listesini mekanizma cümlelerine karşı kontrol eden hiçbir şey yok; çizen kişi ikisinden birini seçmek zorunda kalıyor ve seçimi görünmez oluyor.

Çizen ajanın brief'in vermediğini söylediği diğer iki karar — bütün görsel dil (tasarım sistemi verilmediği için) ve kişi seçicinin çalışması artı iki aynı ismin nasıl ayrıldığı — DB1'in doğrudan sonucu.

---

## Üçüncü meta-bulgu — zincirin yetki sırası yok

Üç skill, üç ayrı yerde aynı duvara tosladı. Hiçbirinde kural yok; üçünde de ajan sırayı kendi kurdu.

| | Çelişen belgeler | Skill ne diyor |
|---|---|---|
| `request-shaper` | `prior-art` K1 otomatik onayı savunuyor · `idea-grill` Tur 7 müdür takdirini | Hiçbir şey. Yazacak bölüm yok |
| `design-brief` | `slice` DD-10 kapsam dışı bırakıyor · `record.md` §8 taslaklamayı emrediyor | Hangisinin kazandığı yazmıyor |
| `flow-grill` | Kapsam belgesi · kapsam-içi-karar belgesi · okunmamış orijinal talep | *"scope and decisions-within-scope are different kinds of document"* — ayrımı adlandırıp duruyor |

`build-context`'e *"name every place two of them disagree"* deniyor, ama o zincirin sonunda. **Çelişki dört adım önce doğuyor ve orada kimsenin onu yazacak yeri yok.**

## `flow-grill`

### FG1 · Dışlamaları onaylanmamış bir slice'tan kesilmiş akış için kural yok
`06-slice.md` kendi dışlamaları için *"Hepsini bu belge önerdi; hiçbiri onaylanmadı"* diyor. Conformance bölümü tek bir kayıt hayal ediyor. Ve ajanın gerçekten çarptığı vaka hiç yok: **sonraki kayıt, öncekinin açık bıraktığı soruyu cevaplamış; akış onu `[DECISION NEEDED]` diye yeniden açmış** — ve bu tamamlanmış gibi okunuyor.

### FG2 · Kısmi-kayıt guard'ı tek yönlü kablolanmış
Beyan edilmiş boşluklar için akışı cezalandırmayı doğru şekilde engelliyor, ama dikkati beyan edilmiş boşluklara çekip **kısmi kaydın verip gömdüğü kararlardan** uzaklaştırıyor. Koşumun en keskin drift bulgusu *"Yapılmayan iki ekleme"* başlığının altındaydı: alınmış kararlar, "yapılmadı" diye dosyalanmış.

### FG3 · *"Report drift as High at minimum"* altı farklı drifti aynı yere çiviledi
Biri skill'in kendi Critical tanımını karşılıyor. Drift, **sebep olduğu şeyin severity'sini miras almalı.**

**Sayım:** 22 bulgu — 7 Critical · 11 High · 4 Medium (6 drift satırı S-1…S-6, hepsi High; 16 akış bulgusu F1…F16).
