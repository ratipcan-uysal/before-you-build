> Independent trial output, preserved with paths normalized. ASK FIRST is not an implementation authorization. See the example README for subsequent instruction corrections.

ASK FIRST

# [DRAFT] Uygunluk sorgusu — kodlama LLM'ine devir paketi

Bu bağımsız kontrol, kaynakları yazmadığım ayrı bağlamda yapıldı. Kurmaca başlangıç talebi ve içindeki akış, acceptance-spec çıktısının Markdown/JSON çifti, contract-spec çıktısının Markdown/JSON çifti ve girdi manifesti okundu. Gerçek PM onayı yoktur; bu paket kod yazma yetkisi değildir. Güven: high — aşağıdaki bulgular açılan kaynaklara dayanır; kurum arayüzlerinin gerçekte varlığı unknown.

Sayım: başlamadan önce 3 soru, 1 çözülmemiş belge uyuşmazlığı; başlangıcı durduran önceki grill bulgusu 0. Bu kontrolde ayrıca 1 kabul kapsamı bulgusu bulundu; yayın öncesi kapanmalıdır. Critical bulgu saptanmadı. Bir soru aynı sorumlu rolün tek bir teslim veya karar cümlesiyle kapatacağı konudur; CQ2'nin koşullu ek davranış kararları henüz tek tek uydurulmadı. Aynı konu soru ve uyuşmazlık olarak görünür; toplamlar benzersiz iş sayısı olarak toplanmaz.

Kaynak kısaltmaları ve durumları:

- S: `../../../evals/fixtures/eligibility-brief.md`; kurmaca talep/akış. SHA-256 `ecc4d2c30ea3f30c4cea4f73aa609afb7cf210ad84b9efcdd56c5b7862da8a8d`.
- A `[DRAFT]`: `acceptance.md`, AC-v1; yanında `acceptance.json`. C1–C4 yalnız A içindeki yerel kaynak eşleme kimlikleridir.
- C `[DRAFT]`: `contract.md`; yanında `contract.json`.
- M `[DRAFT]`: `input-manifest.json`; kaynak hash'i doğrulandı, `approval: null`.

Ayrı slice, data-model, api-needs, design-brief ve grill belgeleri yoktur. S:7 kesiti zaten sınırlar; ayrı slice eksikliği burada kapsamı genişletmez. Yeni depolama açıkça kapsam dışıdır; eksik data-model nedeniyle yeni şema tasarlanmaz. Mevcut hesap/kimlik arayüzü tanımları ise eksiktir ve aşağıdaki HQ1/HQ2'yi doğurur. UI açıkça kapsam dışıdır; tasarım ve ekran akışı üretilmez. Gerçek inceleme/onay geçmişi ile yönetilen uygulanabilirlik profili sağlanmamıştır. Kaynaklar denetim izi olarak tutulur; çözülmemiş çelişkilerini kodlama ajanı kendisi uzlaştıramaz.

## 1. Başlamadan önce sorulacaklar

Üç soru da başlangıç katmanındadır. İndeks: HQ1 arayüz teslimi; HQ2 hesabın/aktiflik değerinin geçerlilik garantisi; HQ3 beklenmeyen girdinin karşılığı. Üçü de blok olarak açıldı: cevabı doğrudan uygulama davranışını değiştirir. İsim verilmediği için gerçek bir kişi veya onaycı atanmadı.

### HQ1 — [UNVERIFIED] Mevcut entegrasyon arayüzleri

Soru: Kullanılacak middleware ve hesap kaynağının kesin revizyonları ile kimlik/aktiflik arayüzlerini hangi bağlayıcı mevcut tanımlar belirliyor?

Sorumlu: entegrasyon sahibi; kişi adı unknown. Kapatacak teslim: her iki mevcut arayüzün revizyonlu tanımı ve kimlik/aktiflik değerinin nasıl sağlandığı. Tahmin edilirse yasaklanan kimlik doğrulama veya depolama tasarımı yapılır. Kaynak C:41, contract-spec CQ1: “Integration owner must provide exact middleware and account-source interface revisions and identity/flag interfaces.” Yanıt gelmezse Open kalır; mevcut bileşenlerin yerine arayüz icat edilmez.

### HQ2 — [DECISION NEEDED] Hesap ve aktiflik garantisi

Soru: Mevcut hesap sözleşmesi her doğrulanmış müşteri için mevcut hesap ve geçerli aktiflik değeri garantiliyor mu?

Sorumlu: ürün/API karar sahibi; kişi adı unknown; kanıtı entegrasyon sahibi sağlar. Kapatacak cümle: garantinin revizyonlu kanıtı veya garantisiz durumların açıkça kararlaştırılmış davranışı. Kaynak C:42, contract-spec CQ2: “If that is not guaranteed, product/API decision owner must decide missing-account or invalid-data behavior.” Tahmin edilirse eksik hesap veya bozuk veri yanlışlıkla INACTIVE ya da UNAVAILABLE yapılır. Yanıt gelmezse Open kalır; iki sonuçtan biri seçilmez. HD1 bu konunun iki belgede farklı ele alındığını kaydeder. Cevap sahibi birden fazla belge boyunca yanıt vermezse decision-memo ilgili karar sahibine başvuruyu düzenler; onun yerine karar vermez.

### HQ3 — [DECISION NEEDED] Kabul edilen şekil dışındaki istek

Soru: GET /v1/eligibility'ye query/body girdisi gönderilirse hangi mevcut bağlayıcı kuralın belirlediği wire yanıt uygulanır?

Sorumlu: API standartları sahibi; kural yoksa ürün/API karar sahibi; kişi adları unknown. Kapatacak teslim: mevcut kuralın referansı veya açık davranış kararı. Kaynak C:43, contract-spec CQ3: “Neither silent ignore nor a new error is assumed.” Tahmin edilirse sessiz yok sayma veya yeni bir HTTP hata sözleşmesi icat edilir. Yanıt gelmezse Open kalır. Mantıksal `{}` şeması tek başına wire davranışını kararlaştırmaz.

Bu maddeler cevaplanacak sorulardır, doldurulacak boşluklar değildir. Cevaplanmamış bir maddeye bağlı kodu yazmadan önce dur ve sor; makul görünen seçeneği kendin seçme. Yetki sınırı ayrıca S:3'te açıktır: “The exercise may produce draft artifacts only”.

### HD1 — Open: Eksik hesap/bozuk veri kapsamının ele alınışı

A:102: “These are not declared reachable branches of the supplied active-flag flow.” Devamı: “If the source owner adds these behaviors to scope, request-shaper must carry the decisions before this acceptance package is revised.”

C:42: “Verify that each authenticated customer always has a present account and valid active flag. If that is not guaranteed, product/API decision owner must decide missing-account or invalid-data behavior.”

Bu bir HTTP sonuç çelişkisi değil, neyin doğrulanmadan ertelenebileceği konusunda belge uyuşmazlığıdır. A eklenmesini beklerken C mevcut garanti kontrolünü açık karar olarak taşır. S:7'nin kapsam kesintisi eksik hesap veya bozuk aktiflik verisini açıkça dışlamaz. Her iki alıntı korunmuştur; sonraki tarihli belgeyi seçmedim. HQ2 yanıtlanmalı ve acceptance-spec kendi kapsam notunu kaynak kararla uyumlu yeni revizyonda taşımalıdır. Sorumlu: ürün/API karar sahibi. Bağımsız kontrol sonucu bu uyuşmazlık çözülmüş sayılmaz.

### HF1 — Open: Genel sır yasağının dar kabul gözlemi

S:15: “Authentication secrets must not appear in examples or logs.” A:84, acceptance-spec AC12 ise “when the supplied middleware rejects the invocation” koşulunda gözlem yapar; JSON'da da aynı dar kapsam vardır. Başarılı kimlik doğrulama, kaynak hatası ve timeout gibi diğer yollarda sır yasağının kabul kanıtı bulunmaz. Genel yasak Decided/Must not içinde korunur; yeni iş kararı gerektirmeyen bu kabul kapsamı düzeltmesi yayın öncesidir. Sorumlu: acceptance-spec yazarı; kapatma: genel yasağı ilgili yolları kapsayan gözlenebilir kabul beklentisine taşıyan revizyon ve bağımsız tekrar kontrol. Başlangıçta genel kural zaten belli olduğu için bunu yeni ürün sorusu olarak saymadım.

## 2. İş

Kimliği mevcut bearer middleware ile doğrulanan müşteri, GET /v1/eligibility üzerinden yalnız kendi hesabının okuma anındaki aktifliğini öğrenir. İş salt okunur; mevcut hesap kaynağı kullanılır. Başarı, kimlik doğrulama hatası ve kaynak hatası sunucu yanıtları; en fazla 2000 ms bekleme ve bilinmeyen sonuç ise çağıran davranışıdır.

## 3. Kararlaştırılanlar

Davranış ve veri: S:9 R1 — “it returns eligible=true and reason=ACTIVE when active, otherwise eligible=false and reason=INACTIVE.” S:20 F2 — “Read the authenticated customer's account active flag once.” A:AC1/AC2/AC11 ve C:CT1/CT2 aynı ayrımı taşır. Karışık true/INACTIVE veya false/ACTIVE çiftleri geçerli değildir; C JSON'undaki nesne düzeyindeki enum bunu korur.

Girdi/çıktı: S:15 — “The endpoint name is decided: GET /v1/eligibility. The customer identity comes exclusively from the middleware; there are no query/body inputs and the portable request object is {}.” Aynı satır: “A 200 response has exactly eligible (boolean) and reason (ACTIVE or INACTIVE); both are required. Error bodies have exactly code.” Başarılı iki gövde: `{"eligible":true,"reason":"ACTIVE"}` ve `{"eligible":false,"reason":"INACTIVE"}`. Yeni endpoint mevcut yanıt şekillerini değiştirmez.

Hatalar: S:10 R2 — “Missing or invalid authentication returns HTTP 401 with JSON {"code":"AUTH_REQUIRED"}; no account read occurs and there is no automatic retry.” S:11 R3 — “Unavailable account source returns HTTP 503 with JSON {"code":"UNAVAILABLE"}; no eligibility value is returned. A manual retry is permitted, never automatic.” C:CT3 ve A:AC3–AC5/AC7 bunları taşır.

Zaman ve tutarlılık: S:12 R4 — “The caller waits at most 2000 milliseconds, then treats the result as unknown and may retry manually.” Bu bir üst sınırdır; sunucuya 2000 ms tamamlanma garantisi, timeout HTTP kodu veya iptal protokolü eklenmez. S:13 R5 — “The response reflects the account state at the lookup read. A later account state change does not rewrite an earlier response. No cache is used in this slice.” A:AC6/AC8–AC10 ve C:CT2/CT3 uyumludur. C JSON'undaki UNAVAILABLE `retryable=true` otomatik retry anlamına gelmez; açıklamalar açıkça yalnız manuel yeniden denemeyi belirtir.

Akışın tamamı: S:F1 middleware → S:F2 tek hesap okuması → S:F3 uygun alan çifti; S:E1 doğrulama başarısızlığı F2'yi atlar; S:E2 kaynak başarısızlığı uygunluk değeri içermez; S:E3 çağıran timeout'u bilinmeyen sonuçtur. Bu, mevcut altı adımın mekanik birleştirmesidir; yeni akış dalı eklenmedi.

## 4. Yapılmayacaklar

- HP1 — S:7: “No UI, money movement, stored write, migration or third-party call is part of this slice.”
- HP2 — S:7: “The coding agent must not redesign authentication or storage.”
- HP3 — S:10: Kimlik doğrulama hatasında “no account read occurs”.
- HP4 — S:10–12/S:24: R2 “there is no automatic retry”; R3 “never automatic”; E3 “manual retry only”. Bu kaynakların mekanik birleşimidir; otomatik retry eklenmez.
- HP5 — S:13: “No cache is used in this slice.”
- HP6 — S:15: “there are no query/body inputs”; müşteri seçimi yalnız middleware kimliğinden gelir. Şekil dışı isteğin wire karşılığı HQ3'tür.
- HP7 — S:15: “No response adds customer identifiers or balances.” Başarı/hata alanları S:15'in kesin şekilleriyle sınırlıdır.
- HP8 — S:15: “Authentication secrets must not appear in examples or logs.”

## 5. Şimdi kararlaştırılıp sonra yapılacaklar

Kaynakta ertelenmiş bir özellik için bugün uygulanacak ayrı kimlik, saklama, izin veya retention kararı verilmemiştir. Bu liste boştur. Yukarıdaki kapsam dışı işler daha sonraki bir sürüme taahhüt olarak çevrilmez.

## 6. Tamamlanmış sayılması

Kaynak davranışlarının gözlenebilir sonuçları A'nın 13 senaryosunda taşınır: AC1/AC2 aktif/pasif; AC3/AC4 kimlik doğrulama; AC5 kaynak hatası; AC6 bekleme sınırı; AC7/AC8 manuel retry; AC9/AC10 okuma anı ve taze okuma; AC11 müşteri izolasyonu; AC12 sır yasağının mevcut dar gözlemi; AC13 salt okunur sınır. Altı akış adımının tümü referans alır. Bu referans kapsamıdır; HF1 nedeniyle eksiksiz semantik kabul kanıtı değildir.

E1: 401 AUTH_REQUIRED, hesap okunmaz, otomatik retry yok. E2: 503 UNAVAILABLE, uygunluk değeri yok, çıkış manuel yeniden deneme. E3: çağıran en fazla 2000 ms bekler, sonuç unknown, çıkış manuel yeniden deneme. Başka hata kodu, otomatik recovery veya gecikmiş yanıt protokolü eklenmez.

Yayın öncesi açık iş: HF1 için acceptance-spec revizyonu ve bağımsız kontrol. Başlangıç soruları HQ1–HQ3 ve HD1 kapanmadan paket BUILDABLE sayılamaz. Kaynak iş başarısı için bir metrik hedefi vermiyor; hedef veya yüzde üretilmedi. Mevcut response şekillerinin değişmemesi S:15'ten gelen regresyon sınırıdır.

Doğrulama: her iki JSON için portable doğrulayıcı yeniden çalıştırıldı, `valid: true`, süreç çıkış kodu 0. JSON ve okunabilir belgelerin senaryo/operasyon, gövde, hata ve açık soru eşlemeleri kontrol edildi. 13 SPECIFIED, 0 BLOCKED; kategoriler happy 2, alternative 2, error 1, boundary 2, permission 4, recovery 2. Bu sayılar ve kaynak hash'i yeniden hesaplandı. Gerçek backend testi, OpenAPI doğrulaması, PM onayı veya yönetilen final teslim kontrolü yapılmadı.

Montaj geri kontrolü: HP1–HP8'in 8 yasak kaydı tek tek S:7/10–15/24 ile karşılaştırıldı; kapsam genişletilmedi. Kaynak varsayılanı 0; 2000 ms sınırı bir varsayılan olarak sunulmadı. Altı kaynak marker kaydının denetimi: A/C/M için [DRAFT], CQ1 için [UNVERIFIED], CQ2/CQ3 için [DECISION NEEDED] biçimleri korundu; kaynakta [ASSUMED] yok. Bu sayı aynı işaretin paketteki her tekrarını değil, taşınan altı farklı kaynak kaydını sayar. HQ/HD/HF/HP kimlikleri yalnız bu belgeye aittir. Bu montaj geri kontrolü kendi ürettiğim paket üzerindedir; kaynak belgelerin bağımsız incelemesiyle aynı bağımsızlık iddiasını taşımaz.

## 7. Bu paketin kontrol edemediği şeyler

Gerçek metin: HTTP code/reason değerleri mevcut; UI metni S:7 nedeniyle kapsam dışı. Bilerek zor örnek veri: kısmen mevcut; A:AC9/AC10 durum değişimi ve AC11 iki müşteriyi ayırıyor, CQ2'nin eksik/bozuk hesap örnekleri ve davranışı sağlanmamış. Tasarım sistemi: verilmedi, UI dışlandığı için bu kesitte uygulanmaz. Gerçek stack kısıtları: eksik; yalnız mevcut middleware/kaynak kullanma sınırı var, kesin entegrasyon tanımları HQ1'de açık. Kodlama ajanı bu eksiklerden stack, kurum standardı, UI veya örnek hata davranışı türetmemelidir.
