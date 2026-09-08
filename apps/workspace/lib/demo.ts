import { newCase, addSource, addProposal, addQuestion } from './workflow.ts';

export async function createDemo(actor: string, domain = 'telecom') {
  const banking = domain === 'banking';
  const c = newCase(
    banking
      ? 'Başvuru durumunu takip etme'
      : 'Temsilci eşliğinde dijital destek',
    banking ? 'Finansal hizmetler' : 'Dijital kanallar',
    'TAMAMEN KURGUSAL. Gerçek kurum, müşteri veya onay içermez.',
    ['mobile-app', 'web'],
    true,
  );
  const source = await addSource(
    c,
    actor,
    'Örnek talep · kurgusal',
    banking
      ? 'Müşteriler başvurularının hangi aşamada olduğunu göremediği için destek ekibini arıyor.\nAmaç, durum bilgisini mobil uygulamada ve temsilci panelinde tutarlı göstermek.\nKredi kararı vermek veya koşulları değiştirmek bu talebin konusu değil.\nBaşarı ölçümü, veri kaynağı, güncellik ve hata davranışları henüz netleşmedi.'
      : 'Müşteriler dijital kanalda işlem adımlarını bulmakta zorlanıyor.\nTemsilci, müşteri izniyle sınırlı ekranlarda yönlendirme yapabilsin.\nTemsilci müşteri adına işlem tamamlayamaz; görüntü kaydı tutulmaz.\nMobil uygulama ve temsilci web paneli kapsamda.\nRıza, sonlandırma, maskeleme ve başarı ölçümü ayrıntıları açık.',
  );
  const transcript =
    'WEBVTT\n\nNOTE\nTAMAMEN KURGUSAL DEMO\n\n001\n00:00:05.000 --> 00:00:18.000\n<v İş Birimi>' +
    (banking
      ? 'Durum ekranını günde bir güncellemek yeterli olabilir; bunu operasyonla doğrulayalım.'
      : 'İlk sürümde iki bilgi ekranıyla başlayabiliriz. Bu henüz onay değil.') +
    '</v>\n\n002\n00:00:21.000 --> 00:00:39.000\n<v Güvenlik>Verinin nereden geçtiğini görmeden güvenlik onayı veremem.</v>\n\n003\n00:00:41.000 --> 00:01:02.000\n<v PM>Seçenekleri ve açık soruları hazırlayın. Belgeleri ben onaylamadan kesinleştirmeyin.</v>';
  const meeting = await addSource(
    c,
    actor,
    'Çalışma toplantısı.vtt · kurgusal',
    transcript,
    'vtt',
  );
  addProposal(c, actor, {
    title: banking
      ? 'Bilgi güncelliğini kararlaştır'
      : 'İlk sürümü daraltmayı değerlendir',
    recommendation: banking
      ? '[DRAFT] Günde bir yenileme yerine işlem durumunun kritik değişimlerini esas alan seçenekleri karşılaştırın.'
      : '[DRAFT] İlk sürümü sınırlı bilgi ekranlarıyla deneyin; diğer akışları açıkça erteleyin.',
    rationale: 'Toplantıda bir seçenek dile getirildi; onay verilmedi.',
    tradeoff: banking
      ? 'Daha güncel bilgi entegrasyon maliyetini artırabilir; mevcut sistem doğrulanmalı.'
      : 'Daha küçük kapsam, işlem tamamlama faydasının bir kısmını sonraya bırakır.',
    evidence: [
      { sourceId: meeting.id, chunkId: 'C1', quote: meeting.chunks[0].text },
    ],
  });
  addQuestion(c, actor, {
    text: 'Bu işin başarılı olduğunu hangi ölçümle ayırt edeceğiz?',
    area: 'Başarı ölçümü',
    blocks: 'start',
    evidence: [
      {
        sourceId: source.id,
        chunkId: source.chunks.at(-1)!.id,
        quote: source.chunks.at(-1)!.text,
      },
    ],
  });
  addQuestion(c, actor, {
    text: 'Veri aktarımının güvenlik değerlendirmesini hangi kaynakla tamamlayacağız?',
    area: 'Güvenlik',
    blocks: 'start',
    evidence: [
      { sourceId: meeting.id, chunkId: 'C2', quote: meeting.chunks[1].text },
    ],
  });
  return c;
}
