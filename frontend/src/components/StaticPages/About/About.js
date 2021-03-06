import React from 'react';
import { Label } from '../../Nav/NavTheme';
import { Header, Divider } from 'semantic-ui-react';
const About = () => {
  return (
    <div>
      <Header as="h1" color="blue">
        Hakkında
      </Header>
      <Divider />
      Boğaziçine yeni başlayan biri hangi dersin hocasının iyi olduğu gibi
      konularda bilgi edinmek istediği zaman Buddy-Ekşi gibi platformlarda daha
      önceden hoca ya da ders hakkında ne dendiğine bakıyor. Aynı şekilde hangi
      kulübün tam olarak hangi etkinlikler yaptığına, iç dinamiklerine ya da
      ortamına dair bilgi edinmek için ya hali hazırda o kulüpte olan bir
      arkadaşınız olması gerekiyor ya da kendiniz katılmalısınız. Bu sistemde
      bazı sıkıntılar var.
      <ul>
        <li>Bulduğu içerik ya eski ya da yetersiz oluyor.</li>
        <li>
          Sadece bir hoca/ders hakkında bile arama yaparken hoca/ders ile
          tamamen alakasız bir sürü postu okumak zorunda.
        </li>
        <li>
          Eğer seçmeli ders kotasını doldurmak için arama yapıyorsa çok büyük
          uğraşa giriyor.
        </li>
        <li>
          Eğer X dersi ya da Y hocası çok iyiyse ama kişi bunu bilmiyorsa hiçbir
          zaman aratmayacak.
        </li>
        <li>
          Genel olarak bir düşünceyle ilgili fikir belirtirken Facebook'taki
          aşırı göz önünde olma durumu insanların fikirlerini engelleyebiliyor.
        </li>
      </ul>
      Çimin çok bir olayı yok. Sadece boun epostasıyla girebildiğin -okuldaki
      public epostaya sahip hocaların yasaklandığı- basit
      filter/like/notification sistemi olan ve içerisinde son 4 senenin bütün
      derslerini/hocalarını, okulun kulüplerini/yurtlarını/kampüslerini ve en
      önemlisi öğrencilerin sorularını/tavsiyelerini barındıran bir site.
      <br />
      <br />
      Herhangi bir öneri/tavsiye/hata ya da özellikle bebekle oynayan köpek
      videosu için:{' '}
      <a href="mailto:onur.temiz@boun.edu.tr">
        <Label color="green" bold pointer>
          onur.temiz@boun.edu.tr
        </Label>
      </a>
      <br />
      <br />
      <p>
        Not: Destekleri ve fikirleri için özellikle G.V.ye, Ceme, Ufuğa, Maliye,
        Seline, Utkana ve tavsiye veren diğer bütün arkadaşlarıma teşekkür
        ederim :).
      </p>
    </div>
  );
};

export default About;
