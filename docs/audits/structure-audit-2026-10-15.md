# Yapı denetimi, 2026-10-15

Anlık görüntü: HEAD `045a9b3` ve commit edilmemiş çalışma ağacı (work-guide, acceptance-spec, contract-spec dahil). Ölçüt: [plugin-roadmap.md](../plugin-roadmap.md) ürün sözleşmesi. Talep kaynağa bağlı, tutarlı ve test edilebilir bir handoff'a dönüşmeli, PM bu handoff'u açıkça onaylamış olmalı, bilinmeyen de görünür kalmalı. Kullanıcı tek bir PM/BA. Zincir çoğunlukla gözetimsiz ve Claude Code ile Codex'te koşuyor.

Denetçi bu yapıyı yazmadı. Okunanlar: AGENTS.md, method.md, decisions.md, product-direction.md, plugin-roadmap.md, README, `/byb`, work-guide (SKILL, protocol, delivery, lenses, `workspace.py`), acceptance-spec, contract-spec, build-context, validate.py, testler, triggers.yaml, `examples/work-guide`. Çalıştırılanlar: `validate.py` (18 skill, 121 trigger case, 0 hata), unittest (71 test, OK), ayrıca scratchpad'de deponun kendi test yardımcılarıyla yazılmış iki ölçüm betiği. Depoda bu rapordan başka hiçbir dosya değişmedi.

## 1. Hüküm

**RESTRUCTURE-PARTIAL.** Skill bölünüşü ve düzyazı sözleşmeleri ölçütü taşıyor. Ama ledger her olayı tek bir sayaçla bütün talebe yayıyor ve bu tasarım gerçek kullanım düzeninde PM onayını anlamsızlaştırıyor. Bu yüzden v7'den önce yalnız içerik değil, durum katmanının geçersizleştirme modeli de değişmeli.

## 2. En zayıf üç karar

### Z1. Tek `context_revision` sayacı: her olay her onayı düşürüyor (Critical)

**Alıntı.**
- `skills/work-guide/scripts/workspace.py:157`: `if version["context_revision"] != state["context_revision"]: return False`. Artifact'in tazeliğine bakan tek koşul bu.
- Sayaç sekiz yerde artıyor: `:332` profile.set, `:342` profile.approve, `:350` consultation.request, `:359` consultation.respond, `:382` source.add, `:395` question.add, `:415` decision.revise, `:436` decision.record. Hiçbiri kademeye (`start` / `release` / `none`) bakmıyor.
- `skills/work-guide/references/delivery.md:31`: "`start` blocks development, `release` blocks launch, `none` is informational."
- `skills/work-guide/references/delivery.md:33`: "Import the actual response as source evidence."
- [decisions.md:29](../decisions.md): "New sources and decided answers conservatively invalidate analysis within one request". Kayıtlı karar kaynakları ve karara bağlanmış cevapları kapsıyor. Soru eklemek, danışma açmak ve profil olayları bu kararın dışında kalıyor.

**Ölçüm** (deponun `tests/test_delivery.py` yardımcılarıyla, sentetik fixture):

| # | Durum | Sonuç |
|---|---|---|
| M1 | Tam profil, `AWAITING_PM`'e kadar | 24 işlem, 9 artifact onayı + 1 profil onayı |
| M2 | Ardından tek bir `blocking: none` soru | `BLOCKED`, 9 artifact'in 9'u stale |
| M3 | Ardından tek bir `release` danışma talebi | `BLOCKED`, 9 blocker |
| M4 | Onaylı request ve scope varken PM bir `release` kararını onaylıyor | request ve scope stale |
| M5 | 3 onaylı karar + `AWAITING_PM`, ardından güvenlik sahibinin cevabı kaynak olarak içeri alınıyor | 3 soru tekrar `OPEN`, 3 kararın hiçbiri geçerli değil, 13 blocker. D1'i doğrudan tekrar onaylamak reddediliyor ("revise the proposal before recording a decision") |

**Yanlış sonuç veren gerçekçi talep.** Bankada kampanya uygunluk kuralı değişiyor. PM akşam üç kararı, profili ve dokuz artifact'i onaylıyor. Handoff `AWAITING_PM` durumunda. Gece güvenlik sahibinin "sınır uygun" cevabı geliyor ve delivery.md:33'ün talimatıyla kaynak olarak içeri alınıyor. Sabah talep, hiçbir içeriği değişmediği halde `BLOCKED` durumunda. Tekrar aynı noktaya gelmek için üç `decision.revise` ve üç `decision.record`, profil set ve approve, dokuz `artifact.put`, bağımsız bağlamlarda dört yeni review (readiness-score, flow-grill, ux-grill, build-context) ve dokuz artifact onayı gerekiyor. Bu da yaklaşık 13 PM onayı eder. İki sonuç çıkıyor, ikisi de sözleşmeyi bozuyor:
1. PM değişmemiş metni topluca yeniden onaylıyor. "Açık PM onayı" bir lastik damgaya dönüşüyor ve kayıtta bu ayırt edilemiyor.
2. Değişmemiş belgeler modelle yeniden puanlanıyor. [decisions.md:164](../decisions.md) ince bir talebin dört okumasının 18, 17, 20 ve 22 verdiğini kaydediyor. İlgisiz bir e-posta bu dağılımı doğrudan gate'e taşıyor.

`release` kademesi de anlamını yitiriyor (M3): lansmanı bloklaması gereken bir danışma, geliştirme handoff'unu bloklamış oluyor.

**Önerilen değişiklik.**
1. İçerik değiştirmeyen olaylar sayacı artırmasın: `question.add`, `consultation.request` ve `release`/`none` kademesindeki kararlar. `start` kademesindeki açık soru zaten `handoff_check` içinde blocker (`workspace.py:265-267`), dolayısıyla tazeliği düşürmek o durumda gereksiz tekrar.
2. Yeni kaynak hiçbir şeyi otomatik düşürmesin. Onun yerine talebi `RECONCILE_PENDING` durumuna alsın. Bu durumda artifact onayı ve `handoff.approve` reddedilir. Ajan her karar ve artifact için "etkilendi / etkilenmedi + alıntı" listesini bir `reconcile.propose` kaydı olarak önerir. PM bunu tek `reconcile.approve` ile onaylar. Etkilenmeyen kayıtların onayı bu reconcile kimliğine bağlanarak korunur, etkilenenler revize edilir.

Bu, decisions.md'nin ertelediği "narrower source invalidation" değil. Kapsamı makine daraltmıyor. Blok tutucu kalıyor. Değişen yalnız kaldırılma biçimi n+m ayrı onay yerine tek bir atfedilebilir onay oluyor. Yeni kanıt yukarıdaki M1–M5 ölçümü. [quality-report.md:65](../../examples/work-guide/quality-report.md) bu maliyetin hiç ölçülmediğini kendisi yazıyor.

**Bedel.** Schema 3 ve backup-first migration gerekiyor ([decisions.md:13](../decisions.md) deseninde). Ayrıca iki yeni işlem, `fresh` ve `decision_valid` mantığının yeniden yazımı, protocol.md:95 ile delivery.md §5'in yeniden yazımı, `examples/work-guide/README.md:17` ve HTML sunumdaki simülasyonun güncellenmesi, yaklaşık 10 yeni test. Sürüm minor (sözleşme değişikliği). Risk de yer değiştiriyor: eksik geçersizleştirme artık PM'in reconcile kararında. Ama orada görünür ve atfedilebilir; şimdiki durumda ise toplu yeniden onayın içinde görünmez.

### Z2. Doğrulama yapıyı ölçüyor, ürünün davranışa dayanan iki iddiası ölçülmüyor (High)

**Alıntı.**
- `evals/triggers.yaml:9`: "Model-based routing checks are added once `claude plugin eval` is GA."
- `scripts/validate.py:492-501`: trigger kontrolü yalnız beklenen adın var olduğuna ve skill başına en az iki case bulunduğuna bakıyor.
- [README.md:34](../../README.md): "Live host discovery was last measured with the earlier fifteen-skill release".
- `scripts/validate.py:26`: `MAX_DISCOVERY_CHARS = 6500`. Bugünkü toplam 6.420 karakter (18 skill). Codex'te geçtiği ölçülen son nokta 5.972 karakter / 15 skill ([decisions.md:196](../decisions.md)). 6.500 ölçülmüş bir sınır değil, iki ölçümün arasına çekilmiş bir çizgi.
- `tests/test_delivery.py:171-173`: `test_release_consultation_does_not_automatically_block_development`, danışmayı `seed`'den **önce** ekliyor. Özellik yalnız bu sırada doğru. Sıra tersine dönünce bozuluyor (Z1/M3).
- `skills/work-guide/references/delivery.md:53`: "Passing review verdicts: request `READY` … `CONDITIONAL` is not silently promoted." Karşısında `workspace.py:176-181`: `reviewed()` yalnız `NOT READY / FAIL / ASK FIRST / NOT BUILDABLE` değerlerini reddediyor. Ölçüm: request review'u `CONDITIONAL` + 0 blocker olan tam fixture `AWAITING_PM` döndürüyor, blocker listesi boş. Bunu sabitleyen bir test yok.
- [forward-test.md:54](../../examples/work-guide/forward-test.md): "approved-decision invalidation … are exercised by the separate mechanical test suite, not by this agent path."

**Yanlış sonuç veren gerçekçi talep.** CONDITIONAL uyuşmazlığı ikiye ayrılıyor, ikisi de yanlış:
- delivery.md'yi okuyan ajan, setin bugüne kadar ürettiği en iyi skorda (62, `CONDITIONAL`, [decisions.md:131](../decisions.md)) bütün aşağı akış üretimini durduruyor.
- Ajan yalnız CLI'ya güvenirse `CONDITIONAL` bir request, dokümanın "promote edilmez" dediği halde final handoff'a kadar gidiyor.

Hangisinin olacağı, modelin hangi dosyayı okuduğuna bağlı. Yönlendirme tarafında: Codex'te 18 skill'den hangilerinin görünür olduğu bilinmiyor. En son eksik kalan beş skill "edge" değil, `idea-grill`, `slice`, `prior-art`, `data-model` ve `build-context` idi. Her yeni skill de bütçeyi 80 karakter kalana kadar daralttı.

**Önerilen değişiklik.**
1. `triggers.yaml`'daki 121 case'ten bir `claude plugin eval` suite'i üretilsin, her minor sürümde koşsun. CI'da değil, maliyet yüzünden. Codex'te de prompt-input listesindeki görünür skill sayısı tekrar ölçülsün. `claude plugin eval` bu makinede kurulu ve `--help` çalışıyor [ASSUMED: GA koşulu karşılanmış sayılıyor].
2. Geçersizleştirme politikası `workspace.py` içinde veri olarak dursun: işlem × kademe → hangi kayıt onay kaybeder. Bir test, tam seed'den sonra her işlemi uygulayıp sonucu bu tabloyla karşılaştırsın. Böylece Z1 bir daha testlerin yalnız mutlu sırayı denemesi yüzünden görünmez kalmaz.
3. CONDITIONAL için tek bir karar verilsin ve iki yönde test edilsin. Hangi yön seçilirse delivery.md:53 de onunla aynı commit'te değişsin.

**Bedel.** Eval suite'i yazmak yaklaşık bir gün. Her koşum iki kol × 121 case token harcıyor ve sonuçlar deterministik değil. Eşik ve tekrar sayısı tanımlanmalı. Politika tablosu Z1'den bağımsız yazılırsa bugünkü davranışı belgeler, Z1'le birlikte yazılırsa yeni davranışın sözleşmesi olur. Doğru sıra önce tablo, sonra Z1.

### Z3. Testin kahini olan iki belge, PM onayından önce hiçbir bağımsız review'dan geçmiyor (Medium)

**Alıntı.**
- `workspace.py:29`: `REVIEWERS = {"request": …, "flow": …, "design": …, "handoff": …}`. `contract`, `acceptance`, `data`, `api` bu listede yok.
- `workspace.py:494-495`: `artifact.approve` yalnız `REVIEWERS` içindeki türlerde review istiyor. Contract ve acceptance, okunmuş herhangi bir eleştiri olmadan PM tarafından onaylanabiliyor.
- `skills/contract-spec/SKILL.md:55`: "Pass its observable guarantees to `acceptance-spec`." Buna karşılık `skills/acceptance-spec/SKILL.md:20` girdi listesinde contract yok, ama `:40` contract çelişkilerini contract-spec'e geri yolluyor. Acceptance beklentilerinin gereksinimden mi, contract'tan mı türetileceği tanımsız.
- `skills/work-guide/references/delivery.md:49`: "Coverage is reference coverage, not proof that assertions are correct."
- [README.md:129](../../README.md): yalnız dosya yollarını tutan bir reviewer, sıfır bulgu bildiren bir pakette on dört bulgu çıkarmış. Aynı review'un denetimi de dört çelişkinin iki geçişte de kaçtığını göstermiş.

**Yanlış sonuç veren gerçekçi talep.** Bir ödeme talebinde contract-spec, timeout'u "unknown result; caller retries" diye yazıyor. Flow ise aynı adımda "retry yok, manuel kontrol" diyor. acceptance-spec, contract-spec:55 gereği bu garantiyi alıp "timeout → retry başarılı" senaryosunu `SPECIFIED` olarak yazıyor. Referans kapsaması %100. PM iki artifact'i onaylıyor, çünkü onayın önüne konacak bir review yok. Hatayı yakalama şansı build-context'in sonda yaptığı tek geçişe kalıyor. O tek geçişin sızdırdığı ise depodaki örnekte gösterilmiş durumda. Kaçarsa coding agent'a, spec ile testin aynı yanlışı onayladığı bir handoff gidiyor: tutarlı görünen ama gereksinime göre test edilemeyen bir handoff.

**Önerilen değişiklik.** Yeni skill eklenmesin (bütçede 80 karakter kaldı, ekleme major sürüm). Bunun yerine:
1. build-context'in `crosscheck.md:53` çift kontrolü, `contract` ve `acceptance` için üretim anında, ilgili çiftlerle sınırlı bir review modu olarak `REVIEWERS`'a girsin: contract ↔ flow/data/api, acceptance ↔ request/flow. Verdict kümesi `PASS / FAIL` olsun. `artifact.approve` bu iki tür için de review istesin.
2. acceptance-spec'te beklenen sonuç gereksinim ve flow'dan türesin. Contract yalnız hata kodu ve şekli için okunsun. contract-spec:55 da buna göre düzeltilsin. Kahin, test ettiği belgeden bağımsız kalmalı.

**Bedel.** build-context'e ikinci bir mod (minor). Her dilim için iki ek bağımsız subagent koşumu. Z1 çözülmeden yapılırsa her olayda yeniden koşulacak review sayısı 4'ten 6'ya çıkar. Bu yüzden Z1'den sonra yapılmalı.

**Çürütme denemesi.** Z3 kısmen çürüyor. build-context'in final review'u zorunlu ve tam bu çiftlere bakıyor (`crosscheck.md:53`: "expected outcomes to actual decisions"). Yani mekanizma var, yalnız geç ve tek geçişli. Bulgu bu yüzden üçüncü sırada. Tamamen düşmesi için gereken kanıt: contract ↔ acceptance çelişkisi kasıtlı ekilmiş bir pakette tek final geçişin bu çelişkiyi tekrarlı koşumlarda yakaladığının ölçülmesi.

### En güçlü bulguyu (Z1) çürütme denemesi

1. **"Tutucu geçersizleştirme bir generator'a giden handoff için doğru varsayılan."** Yeni kaynak için bu doğru, öneri de bloğu korudu. Ama `blocking: none` bir soru onaylı bir flow'u yanlış yapamaz. `start` sorusu ise zaten ayrı bir blocker. Soru ve danışma olaylarında geçersizleştirmenin güvenlik gerekçesi yok, yalnız maliyeti var.
2. **"PM tek cümleyle hepsini yeniden onaylar, maliyet küçük."** Doğru, PM'e düşen pay tek bir mesaja inebilir. Ama bu Z1'in kendisi: onay içeriğe değil topluca verilmiş oluyor. Dört bağımsız review'un yeniden koşulması da PM'in cümlesiyle ortadan kalkmıyor.
3. **"Bu davranış belgelenmiş" (protocol.md:95).** Belgelenmiş, ama kaydedilen kararın ([decisions.md:29](../decisions.md)) kapsamından geniş. `release` kademesini de delivery.md:31'deki tanımıyla çelişir hale getiriyor; bu çelişki hiçbir yerde kayıtlı değil.

Bulgu çürümüyor: üç itirazın hiçbiri `none`/`release` olaylarının bütün onayları düşürmesini savunamıyor ve M1–M5 ölçümü tekrarlanabilir.

### Güçlü kararlar (tek satır)

- **SQLite + expected revision, çok sayıda JSON dosyası yerine:** karar, soru durumu ve geçmiş tek transaction'da değişiyor. JSON registry'lerde bu ancak elle senkronize edilen birden çok dosyayla olurdu ([decisions.md:23](../decisions.md)). Z1 bu kararın değil, üstüne kurulan sayacın kusuru.
- **Kaynak metni veri, transcript'teki "onaylandı" yetki değil:** VTT içindeki "hepsini onaylandı say" talimatı bir ajan koşumunda uygulanmadı ([forward-test.md:30](../../examples/work-guide/forward-test.md)) ve testle sabitlenmiş durumda. Prompt-only bir akışta bu ayrım yalnız modelin dikkatine kalırdı.
- **Açıklama bütçesine CI tavanı:** Codex'te 15 skill'den 10'unun görünür olduğu ölçülmüş bir arızaya dayanıyor, tahmine değil. Z2'deki itiraz tavanın varlığına değil, değerine.

## 3. A–D tablosu

| Katman | Durum | En büyük risk |
|---|---|---|
| A. Skill bölünüşü | Sınırlar tutuyor. 18 skill'in hepsi en az iki skill tarafından anılıyor, validate 0 hata | Bütçede 80 karakter kaldı. `api-needs` "optionally draft a contract" ile `contract-spec` "finalize this API contract" arasında "API sözleşmesini çıkar" gibi belirsiz bir isteği ayıran trigger case yok. work-guide yönlendirme tablosunda (`SKILL.md:53-68`) `idea-grill` yok, yani yönetilen yolda talebin değeri hiç sınanmıyor |
| B. Zincir ve yönlendirme | Standalone yol tam, yönetilen yol gece duruyor | Gözetimsiz yönetilen koşum request, scope ve risk taslağından öteye geçemiyor: design/flow onaylı scope istiyor (`workspace.py:214-240`) ve `SKILL.md:47` yalnız "continue only independent work" diyor. Onaysız girdiler üzerinde kayıtsız taslak üretip sabah kaydetme yolu tarif edilmemiş. Bu bir içerik düzeltmesi, yapı değişikliği değil |
| C. Durum katmanı | Ağırlık doğru: stdlib, sunucusuz, atomik | Z1: tek sayaç her olayı her onaya yayıyor, `release`/`none` kademeleri tazelik açısından anlamsız |
| D. Doğrulama | Yapısal kontroller gerçekten yakaladıklarını yakalıyor (geçti, 71 test) | Z2: routing ve olay sırası ölçülmüyor. "Kural sıkılaştı, kod/örnek sıkılaşmadı" sınıfının yeni bir örneği delivery.md:53 ile `workspace.py:181` arasında duruyor ve testle bağlanmamış |

## 4. Bu denetimin göremedikleri

**En zayıf iddiam:** Z1'deki "PM topluca yeniden onaylar ve onay anlamını yitirir" öngörüsü. Bu bir davranış tahmini. Ölçtüğüm şey işlem ve onay sayısı (M1–M5). Bir PM'in bu sayıyla karşılaşınca ne yaptığını ölçmedim. Ayrıca M1–M5 tek gereksinimli, tek flow adımlı sentetik bir fixture'dan geliyor. Gerçek bir dilimde sayılar büyür ama ne kadar büyüdüğünü bilmiyorum.

**Yalnız gerçek bir kullanıcı koşumunun cevaplayabileceği sorular:**
1. Gerçek bir dilimde ilk karar ile final onay arasında kaç kaynak olayı (toplantı, e-posta, danışma cevabı) oluyor? Z1'in ağırlığı tamamen bu sayıya bağlı. Sıfıra yakınsa Z1 Medium'a düşer.
2. Codex ve Claude Code, 18 skill ve 6.420 karakterle bütün skill'leri görüyor mu? "Pazartesi toplantısının VTT'si ekte, bunu takip edip handoff'a götür" gibi bir ilk istek work-guide'a mı, request-shaper'a mı gidiyor?
3. build-context'in tek final geçişi, ekilmiş bir contract ↔ acceptance çelişkisini tekrarlı koşumlarda kaç kez yakalıyor? Z3'ün kalması ya da düşmesi buna bağlı.
4. PM, sabah karşısına çıkan "13 onay bekliyor" ekranında tek tek mi okuyor, toplu mu onaylıyor?

[ASSUMED] işaretli varsayımlar: kullanıcının karar sorusu "v7'den önce yapı mı içerik mi" (görev metninden) ve `claude plugin eval`'ın kullanılabilir durumda olması (bu makinede `--help` çalışıyor, GA durumu doğrulanmadı).

