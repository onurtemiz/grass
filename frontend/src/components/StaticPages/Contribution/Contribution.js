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
      <a href="mailto:iletisim@bouncim.com?subject=Çim Bug">
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
        <li>Sitedeki tasarım ve işlevsellikle alakalı sıkıntıları giderme.</li>
        <li>
          Kota Takip ettiğin derslerde bildirim/email notification sistemi.
        </li>
        <li>Consent generator</li>
        <li>
          Ders öneri sistemi. Mantık basit: Önceki derslerini veriyorsun,
          aynılarını beğenenlerin ek beğendiklerini gösteriyoruz.
        </li>
        <li>Düzgün çalışan GPA calculator XD</li>
        <li>
          Çiko olsun Prenses olsun kampüs hayvanlarını ikonlaştırabilecek
          birisini arıyoruz.
        </li>
        <li>Bir sürü yerde refactoring gerek.</li>
        <li>
          Eğer bütün API sistemini Graphql'e taşıyabilirsek harika olurdu.
        </li>
      </lu>
    </div>
  );
};

export default Contribution;
