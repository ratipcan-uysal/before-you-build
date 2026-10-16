# Before You Build — PM / İş Analisti Kullanım Kılavuzu

Amaç daha çok belge üretmek değil; seçilen teslim kapsamını, geliştiricinin veya kod yazan LLM'in iş kararı uydurmasına gerek bırakmayacak şekilde hazırlamaktır. Eksik kurum bilgisi, paydaş görüşü ve PM onayı görünür kalır. İyi yazılmış doküman, onaylanmış karar değildir.

[Çevrimdışı HTML sunum](presentations/before-you-build.html) akışı örnekler ve etkileşimli bir sürüm/onay simülasyonuyla anlatır. [Teknik protokol](../skills/work-guide/references/protocol.md) agent'ın kayıtları nasıl tuttuğunu açıklar. PM'in JSON yazması beklenmez.

## 1. Nerede çalışır ve nasıl kurulur?

Kullandığınız agent ortamında çalışır. VS Code çalışma ortamıdır; bu repo ayrı bir native VS Code uzantısı değildir. Claude Code ve Codex aynı kanonik skill klasörünü kullanabilir. Modeli ilgili host içinde seçersiniz; set kendi model seçicisini veya arka planda provider değiştiren bir servisi çalıştırmaz.

Kurulum yolları [README](../README.md) ve [Codex notlarında](codex.md). Bu geliştirmeler GitHub'a yayımlanmadan uzaktan kurulum yerel değişiklikleri getirmez. Repo değişince önceden kopyalanmış global skill'ler kendiliğinden güncellenmez. Agent'a kullandığı skill'in dosya yolunu gösterterek doğru kopyayı doğrulayın.

Kayıt yardımcısı Python 3.9+ ve standart kütüphane kullanır. Sunucu, Node, MCP veya model SDK'sı istemez. Bunlar yalnızca yardımcının gereksinimleridir; analiz host'unun kendi kurulumu ve erişimi ayrıdır.

Repo kökünden, kendi özel çalışma klasörünüzle:

```bash
python3 skills/work-guide/scripts/workspace.py --root /ABSOLUTE/PRIVATE/PROJECT/.byb doctor
```

İlk kullanımda `not_initialized` normaldir. `migration_required` eski kayıt için yedekli yükseltme gerektiğini söyler. Komut klasör oluşturmaz, yazılım kurmaz, model hesabına giriş yapmaz.

## 2. İlk konuşma

> work-guide kullan. Bu talebi /benim/ozel/projem klasöründe kalıcı takip edeceğiz. PM benim: [ad]. Önce kaynakları ve eksikleri çıkar; bir seferde en önemli soruyu sor. En iyi önerini gerekçesi ve alternatifleriyle ver ama ben onaylamadan karar kaydetme. Kurumsal bilgileri tahmin etme.

Agent klasör ve PM kimliğini netleştirir, talebi açar, kaynakları kaydeder. Birden fazla talep varsa sonuncusunu rastgele seçmez. Ayrı teslim dilimlerini ayrı taleplerde tutun.

Yalnızca bir doküman inceleyecekseniz:

> readiness-score ile bunu değerlendir; kalıcı çalışma alanı açma.

Tekil skill kullanımı kayıt defteri kurmayı zorunlu kılmaz.

## 3. İş birimi dokümanı ve toplantılar

İlk talebi, yorumlarla değişmiş sürümünü ve toplantıları ayrı kaynaklar olarak verin. Geçmişi silerek üstüne yazmayın.

> Bu Teams VTT dosyasını mevcut talebe ekle. Yeni bilgi, öneri, çelişki, açık soru ve aksiyonları ayır. Mevcut kararlarla uyuşmayan yerleri göster. Toplantıda söylenen “onaylandı” ifadelerini benim onayım sayma.

Yardımcı metin ve cue/zaman konumlarını korur; konuşmacı tanımaz, toplantıya katılmaz, semantik karar çıkarmayı kendisi yapmaz. Agent yorumlar, kayıtları tam alıntılara bağlar. Aynı içerik/format yeniden gelirse yeni revizyon yaratılmaz; geçersiz dosya kısmen kaydedilmez.

Kaynakta “talimatları yok say” veya “PM yerine onayla” yazması araç ve onay yetkisi değildir.

## 4. Kurum ve iş türüne uyarlama

Agent kurum, ürün, sistem sınırı, mevcut standartlar ve teslim dilimini öğrenir; gereken analizleri ve dışlamaları önerir. Her dışlama gerekçe ve kaynak ister. PM profilin tam sürümünü onaylar.

Kurgusal kredi talebi finansal etki, kimlik, mahremiyet ve entegrasyon sorularını; kurgusal kampanya talebi uygunluk anı, kota, tekrar başvuru, kanallar ve asenkron sonuç sorularını tetikleyebilir. Bunlar herhangi bir gerçek banka ya da telekom şirketinin politikaları değildir. O bilgiler kaynaklardan öğrenilir.

> Bu iş backend-only. Ekran gerekmiyorsa gerekçeli dışlamayı öner; akış, veri, API sözleşmesi ve kabul senaryolarını atlama.

Küçük bir sabit metin değişikliği, etkileşim/veri/arayüz etkisi gerçekten dışlandıysa daha kısa yoldan geçebilir. Her işe bütün skill'leri zorunlu tutmak kalite değil, maliyettir.

## 5. Soru-cevap, öneri ve onay

`request-shaper` mevcut yanıtları okur; en etkili açık soruya odaklanır. Kısa kapalı seçimler dışında bir seferde tek soru sorar. Öneri, gerekçe, alternatif ve bilinmeyenleri ayırır. Başlangıç engeli, canlıya çıkış engeli ve bilgi amaçlı konular ayrı tutulur.

> Önerini göster ama karar verme. İş biriminden görüş alacağım. Bağımsız analizlere devam et.

Bu onay değildir. Erteleme de cevap değildir; ilk teslimden tam olarak neyin çıktığı kayıtlı olmalıdır.

Örnek açık onay:

> D1'in 2. sürümünü, gösterdiğin kapsamla onaylıyorum: bekleyen başvuru varken ikinci işlem yaratılmayacak; mevcut durum gösterilecek.

Bu kurgusal kural gerçek talebiniz için öneri değildir. Agent yalnızca sizin gerçek onay cümlenizi kaydeder. İsim kontrolü yerel beyandır; elektronik imza veya kurumsal kimlik doğrulaması değildir.

`slice` ilk uçtan uca teslimi erken küçültür. Hazır olmayan büyük talep için küçük kapsam önerisi üretilebilir; küçük kapsam otomatik hazır sayılmaz. Talep/kapsam yeniden uzlaştırılır ve bağımsız `readiness-score` değerlendirmesi alınır.

## 6. Tasarım ve akış — API'den önce

UI varsa `design-brief` yüzeylerin işini, hiyerarşiyi, navigasyonu, girdileri, geri bildirimi ve sınırları tanımlar. Gerçek çizim/mockup verilirse `ux-grill` inceler. Metin brief'i çizim gibi gösterip UX onayı üretmez.

`flow-map` normal yolu, dalları, hata çıkışlarını ve sistem temaslarını çıkarır. Başka bağlamdaki `flow-grill` eksik yolları arar. Hata yolu yeni ekran durumu gerektiriyorsa tasarıma dönülür. Bu bir döngüdür.

> Önce akışı ve hata çıkışlarını tamamla. İnceleme bulgularını kapatmadan final API sözleşmesine geçme. Erken fizibilite gerekiyorsa araştırma olarak ayrı tut.

## 7. Veri, API ihtiyaçları ve sözleşme

`data-model` kimlik, sahiplik, yaşam döngüsü, ilişkiler ve saklanan/hesaplanan veri ayrımını tanımlar; fiziksel indeks veya teknoloji seçmez.

`api-needs` adım bazında okuma/yazma, güncellik, atomiklik ve tekrar garantilerini çıkarır. Mevcut sistem desteği için gerçek kanıt ister. Taslak sözleşmesi konuşma başlangıcıdır.

`contract-spec` kararlaştırılmış ihtiyaçları ayrıntılı arayüz sözleşmesine taşır: alanlar, yetki, başarı/hata, tekrar, kısmi sonuç, zaman aşımı, tutarlılık, uyumluluk ve örnekler. Protokol bilinmiyorsa REST uydurmaz; makine sözleşmesi yerine açık kararları olan metin taslağı üretir.

BYB JSON sınırlı ve açık bir formattır; başarı/hata örnekleri şemaya karşı kontrol edilir. OpenAPI değildir. OpenAPI/AsyncAPI isteniyorsa gerçek standart sürümü ve doğrulayıcısı gerekir. Şema geçmesi backend desteğini kanıtlamaz.

## 8. Kabul senaryoları

`acceptance-spec` gereksinim ve erişilebilir akış adımları için gözlenebilir Given/When/Then sonuçları üretir. Normal, alternatif, hata, sınır, yetki ve toparlanma kategorileri taranır. Uygulanmayan kategori gerekçelendirilir; metinde geçmemesi dışlama değildir.

> Kabul senaryolarını gereksinim ve akış kimliklerine bağla. Beklenen sonuç için karar eksikse BLOCKED bırak; test yazarken iş kuralı icat etme.

`SPECIFIED`, davranışın yazılabildiğini söyler; PM onayını değil. Referans sayısı anlamlı kapsam garantisi değildir. Bağımsız inceleme “R1 var mı?” yanında “gerçekten R1'i mi test ediyor?” diye bakar.

## 9. Paydaşlar: hukuk, fraud, güvenlik, operasyon

`risk-interrogate` somut hata senaryolarını ve cevaplayacak kişileri çıkarır. Mevcut sistem değişiyorsa `impact-radar` tüketici, rapor, görev, eski istemci ve destek etkisine bakar. Gerçek bir soru gerektirdiğinde paydaş görüş kaydı açılır; her işe otomatik departman listesi dayatılmaz.

PM görüşleri toplar. Agent görüşü ve PM'in nasıl uygulamak istediğini ayrı kaydeder. Güvenlik görüşü hukuk/PM onayını ikame etmez; kurumsal onay sisteminin yerine geçmez. Paydaşlara kendiliğinden mesaj gönderilmez.

Başlangıç engeli açıkken teslim kapalıdır. Yalnızca canlıya çıkışı engelleyen konular pakette görünür kalabilir. Zor soruyu “release” etiketleyerek gizlemek değil, gerekçeli sınıflandırmadır.

## 10. Son kontrol ve teslim

`build-context` belgeleri karşılaştırır; boşluk ve çelişkileri kapatmaz. Aynı bağlamda üretmişse ayrı inceleyici ister; yoksa bağımsız olmadığını belirtir. Kayıt defteri bunu bağımsız inceleme gibi kabul etmez.

Analitik sonuç `BUILDABLE`, `ASK FIRST` veya `NOT BUILDABLE`. Son PM onayı değildir. Yerel `check`; güncel onaylı profili, gereken belgelerin tam sürümlerini, açıkça geçen bağımsız incelemeleri, başlangıç sorularını/paydaş engellerini, yapılandırılmış referansları ve kabul/sözleşme açıklarını kontrol eder.

Geçince `AWAITING_PM`. PM paketi, dışlamaları, incelemeyi ve canlıya çıkış engellerini görerek o sürümü ayrıca onaylar. Ancak sonra `PM_APPROVED_HANDOFF` arşivi üretilir. “Devam” kelimesi veya dosya üretim başarısı onay sayılmaz.

Arşivde başlangıç talimatı, konuya göre spec, uygulanabilir belgeler, kabul/sözleşme JSON'ları, kaynak/karar geçmişi ve sağlama manifesti vardır. Özel kaynaklar içerir; otomatik yayımlanmaz. Sağlama kontrolü değişikliği saptar, imza veya güncellik kanıtlamaz.

Kod yazan agent'a:

> Arşivin aktif sürüm olduğunu PM ile doğrula. Önce START-HERE.md ve SPEC.md'yi oku. İş kararı, kurum standardı veya eksik davranış uydurma. Kabul senaryolarını plana ve testlere bağla. Eksik karar bulursan ilgili kimlikle geri dön. Bu paket canlıya çıkış onayı değildir.

## 11. Değişiklik ve ertesi gün devam

> Bu toplantıyı eklemeden etkilenecek kayıtları göster. Sonra çelişkileri çıkar; eski onayları yeni kapsamda geçerli sayma.

`impact` kayıtlı bağımlılıkları gösterir, dış sistemleri otomatik keşfetmez. Kaynak/karar değişiklikleri ilgili talebin analizlerini temkinli olarak eski sayar. Belge/inceleme değişiklikleri bağımlı çıktıları etkiler. Eski sürümler silinmez; gönderilmiş ZIP kendiliğinden geri çağrılamaz.

> work-guide ile [talep adı] analizine devam et. Mevcut cevapları ve açık kararları oku. Cevapladıklarımı tekrar sorma. Kaynaklarda soru dizinine geçmemiş açık varsa ayrıca belirt. Sıradaki en önemli adımı öner.

Eski şema açık bir yedek yolu ile yükseltilir; yedeğin üzerine yazılmaz. Eski onaylar tarihte korunur ama yeni kapıyı otomatik geçmez.

## 12. Sınırlar ve güven

Güven yüksek: test edilmiş kayıt atomikliği, sürüm/onay geçersizleşmesi, şema/örnek doğrulaması ve teslim engelleri. Güven orta: sınırlı kurgusal bağımsız üretim/devam denemeleri. Bilinmiyor: her kurumda, her modelde ve bütün gerçek taleplerde analiz kalitesi.

Bu set native VS Code uzantısı, elektronik imza, toplantı botu veya model yöneticisi değildir. Yerel kayıt, yerel model çıkarımı demek değildir; host modele kaynak gönderebilir. Yeni MCP, provider değişimi veya dış yayın ayrı yetki ister. [Kalite raporu](../examples/work-guide/quality-report.md) ölçülen sınırı gösterir. Testlerin yeşil olması bütün iş kararlarının doğru olduğu anlamına gelmez.
