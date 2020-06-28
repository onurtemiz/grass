import React from 'react';
import { Header } from 'semantic-ui-react';
import { Label } from '../../Nav/NavTheme';
const Contribution = () => {
  return (
    <div>
      <Label color="blue" bold style={{ fontSize: '1.5em' }}>
        Bir yerde hata gördüm site patladı
      </Label>
      <br />
      Böyle bir durumda{' '}
      <a href="mailto:onur.temiz@boun.edu.tr?subject=Çim Bug">
        <Label color="green" bold pointer>
          eposta
        </Label>
      </a>{' '}
      ile olayı bildirebilir ya da GitHub kullanmayı biliyorsanız bir{' '}
      <a href="https://github.com/onurtemiz/grass/issues/new">
        {' '}
        <Label color="green" bold pointer>
          issue açabilirsiniz.
        </Label>
      </a>{' '}
      <br />
      <br />
      <Label color="blue" bold style={{ fontSize: '1.5em' }}>
        Nasıl katkı sağlarım
      </Label>
      <br />
      Sitedeki her şey open source ve dileyen herhangi biri katkı sağlayabilir.
      Eğer bir yerde yazım hatası gördüyseniz ya da React, Redux, Node(Express)
      ve MongoDB(Mongoose) biliyorsanız ve yardımcı olmak istiyorsanız bana{' '}
      <a href="mailto:onur.temiz@boun.edu.tr?subject=Çim Katkı">
        <Label color="green" bold pointer>
          ulaşabilirsiniz
        </Label>{' '}
      </a>
      ya da
      <a href="https://github.com/onurtemiz/grass/issues/new">
        {' '}
        <Label color="green" bold pointer>
          issue açabilirsiniz.
        </Label>
      </a>{' '}
      <br />
      <br />
      <Label color="blue" bold style={{ fontSize: '1.5em' }}>
        Planlar/İhtiyaçlar
      </Label>
      <lu>
        <li>
          Fark ettiğiniz üzere sitenin tasarımı bazı yerlerde tutarlı değil ve
          genel olarak bakıldığında da yetersiz -dizayn çöpü olmamız da bunda
          büyük etken- Eğer daha iyi tasarım tavsiyeleriniz varsa uygulamaya
          çalışırız.
        </li>
        <li>
          Gene tasarım çöpü olduğumuz için yapamadığımız şeylerden biri ikonlar.
          Aslında ilk başta kampüsteki kedilerin/köpeklerin ikonlaşmış hallerini
          istiyorduk. Çiko olsun Prenses olsun hayvanları ikonlaştırabilecek
          birisini arıyoruz.
        </li>
        <li>
          Bilgisayar mühendisliği okumadığım için en iyi pratiklere sahip
          değilim. Backend ve Frontend'de inanılmaz çöp kodlar bulunmakta.
          Üstteki teknolojilerde yetkin birisi çok yardımcı olur.
        </li>
        <li>Değişecek..........!!!</li>
      </lu>
    </div>
  );
};

export default Contribution;
