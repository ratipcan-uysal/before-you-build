# Skill reliability — 2026-10-18

6.2.0 doğrulama kaydı. Başlangıç kaynağı: `b12dc7f550dc138407dba9aa3b3c2c2be8e41945`, GitHub main. Boş yerel depo bu kaynaktan geri getirildi. Bu rapor yerel doğrulama kanıtını kaydeder; yayın durumu GitHub commit geçmişinden kontrol edilir. Kurulu skill kopyaları güncellenmedi.

## Bulgular ve düzeltmeler

1. **High — Sonuçsuz inceleme onaya dönüşüyordu.** `reviewed()` yalnızca başarısız etiketleri dışlıyordu; eksik verdict de geçiyordu. Sıfır bulgulu, sonuçsuz bir raporla `artifact.approve` başarılı oldu. Artık yalnız ilgili belge türünün açık geçer verdict'i kabul ediliyor. Eski kayıtlar silinmiyor; yeni, gerçek değerlendirme gerekiyor. Test yardımcısındaki eski sonuçsuz sentetik raporlar açık sentetik verdict ile güncellendi.
2. **High — Başlangıç görüşü beklenirken sonraki belgeler üretilebiliyordu.** Protokol bunu yasakladığı halde üretim önkoşulları yalnız soruları kontrol ediyordu. Design, flow, data, API, contract, acceptance ve handoff aynı güncel/clear görüş koşulunu kullanıyor. Mevcut onaylar korunuyor; request/scope/risk taslakları ve release-only görüşler engellenmiyor. Teslim testi görüşü üretimden sonra ekleyerek gerçek bir geç gelen engeli sınamaya devam ediyor.
3. **High — Yönlendirme ölçümü yanlış başarı üretiyordu.** 102 pozitif örneğin tamamında beklenen skill + yanlış skill çağrısı başarılı sayılıyordu. Her pozitif örneğe diğer plugin skill'lerini yasaklayan grader eklendi. Regresyon testi üretilen gerçek grader dosyalarını boş/doğru/yanlış/karışık çağrı izleriyle değerlendiriyor. Bu test Claude değerlendiricisinin kendisini veya model davranışını çalıştırmıyor.
4. **Medium — Dosya yolları bağımsızlığın kanıtı gibi sunuluyordu.** Yedi inceleme becerisindeki koruma, üretim geçmişini miras alan bağlamı açıkça dışlayacak şekilde düzeltildi. Work guide, farklı context id'nin tek başına yeterli olmadığını söylüyor. Ledger bağlam izolasyonunu doğrulayamaz; bu sınır korunuyor.
5. **Medium — Verilmiş çıktı yetkisi yeniden sorulabiliyordu.** API taslağı, generator bloğu ve proje dosyası isteklerinde önceki talimatı kullanma açıklaştırıldı. Tek dosya isteyen kullanıcı için iki dosya zorunluluğu kaldırıldı. Eksik ürün kararları veya PM onayları bu değişiklikle verilmiş sayılmıyor.

## Kanıt

- Başlangıç: 81 test geçti; yapısal kontrol 18 skill / 121 routing örneği / sıfır hata ve uyarı.
- [Üretim kapıları, düzeltmeden önce](evidence/2026-10-18/regression-before.txt): 84 test, iki yeni test içinde 9 başarısız assertion; yedi belge türü ayrı alt senaryolar.
- [Routing, düzeltmeden önce](evidence/2026-10-18/routing-before.txt): 102 pozitif örnekte karışık çağrı yanlışlıkla geçti.
- Sonuç: 85 test geçti; 18 skill doğrulandı; yedi profil ve sekiz devam assertion'ı geçti.
- [Son test çalışması](evidence/2026-10-18/tests-after.txt), [yapısal ve skill kontrolleri](evidence/2026-10-18/validation.txt), [profil senaryoları](evidence/2026-10-18/profiles.json), [devam senaryosu](evidence/2026-10-18/replay.json).

## Talimat senaryoları ve değerlendirme sınırı

Bunlar değiştirilen talimatlarla elle karşılaştırılmış beklenen davranışlardır; bağımsız model denemesi değildir.

| Girdi | Beklenen davranış |
|---|---|
| Üretim geçmişini miras alan incelemeciye yalnız dosya yolları gönderiliyor | Bağımsızlık iddia edilmez; temiz bağlam gerekir |
| Kullanıcı tek bir çıktı dosyası ve yolunu vermiş | Aynı yetki tekrar sorulmaz; ikinci talimat dosyası eklenmez |
| API taslağı istenmiş, protokol ve naming zaten verilmiş | Verilen yanıtlar kullanılır; yalnız eksik karar sorulur |
| Hiç kaydetme talimatı yok, kullanıcı yanıt vermiyor | Kendiliğinden proje dosyası yazılmaz |
| Kaynakta “onaylandı” yazıyor, PM yönlendirmesi yok | Kaynak veri olarak kalır; onay kaydı oluşturulmaz |

Bu çalışma mevcut kaynak, teslim yardımcıları, yönlendirme değerlendiricisi ve ilgili talimat sınırlarına odaklandı. Her referans belgesinin semantik eksiksizliği, tüm örnek zincirleri, gerçek kurum görevleri, farklı modeller ve canlı host routing yeniden doğrulanmadı. Üretici tarafından yapılan talimat kontrolü bağımsız inceleme değildir. “Mükemmel” veya genel kalite artışı yüzdesi iddia edilmiyor. Çalıştırılabilir geçiş düzeltmelerine güven yüksek; düzyazı değişikliklerinin gerçek model davranışına etkisi için yeni bağımsız deneme gerekir.
