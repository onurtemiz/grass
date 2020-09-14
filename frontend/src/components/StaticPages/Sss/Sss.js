import React from 'react';
import { Header, Divider } from 'semantic-ui-react';
import { Label } from '../../Nav/NavTheme';
const Sss = () => {
  return (
    <div>
      <Header color="blue" as="h1">
        Sıkça Sorulan Sorular
      </Header>
      <Divider />
      <Header color="blue" as="h3">
        Neden sadece 1 yorum yazabiliyorum?
      </Header>
      <p>
        Kullanıcılar arasında tartışmayı engellemek ve yazılan içerikten
        sapılmaması için her kullanıcı her dönem konuyla ilgili 1 yorum yazma
        hakkına sahiptir.
      </p>
      <Header color="blue" as="h3">
        Çim Course Plannerın özellikleri nedir?
      </Header>
      <p>
        <Label color="green" bold>
          Saat Whitelist/Blacklist:
        </Label>{' '}
        Mesela programınızda perşembe saat 2, 3 ve cuma 3 vakitlerinde bir
        boşluk var ve orayı doldurmak istiyorsunuz ancak hangi dersler o saatte
        bilmiyorsunuz. Çim Course Planner'da o saatlere tıklayıp whiteliste
        eklediğinizde sadece o saatlere uyan dersler arama sonuçlarında yer
        alıyor. Aynı şekilde istemediğiniz saat aralıklarının da gözükmesini
        engelleyebiliyorsunuz.
      </p>
      <p>
        <Label color="green" bold>
          Bu Derslerden Biri Kesin Eklensin:
        </Label>{' '}
        Mesela Almanca ya da Fransızca almak istiyorsunuz. İkisinden birinin
        oluşturulacak programda %100 olmasını istiyorsunuz. O vakit bir Kesin
        Olmalı Ders Grubuna bu iki dersi eklediğiniz zaman ikisinden biri %100
        programda yer alacak. EC101 dersi zorunlu dersiniz ve kesin almanız
        lazım ama 2. veya 3. sectiondan istiyorsunuz. Gene bir Kesin Olmalı Ders
        Grubuna bu 2 sectionu eklerseniz ikisinden biri %100 programda yer alır.
      </p>
      <p>
        <Label color="green" bold>
          Seçili Ders Grubu:
        </Label>{' '}
        Burayı envanter gibi düşünün. Almayı planladığınız dersleri buraya
        ekledikten sonra bir daha aramayla uğraşmanıza gerek yok. Buradan
        derslerin görünürlüğünü değiştirebilir ekle çıkar yapabilirsiniz.
      </p>
      <p>
        <Label color="green" bold>
          Bir Günü Boş Bırakma:
        </Label>{' '}
        Program Oluştur ile oluşturduğunuz programlarda 1 günü kesin boş
        olmasını garantileyebilirsiniz.
      </p>
      <p>
        <Label color="green" bold>
          Conflicte İzin Ver:
        </Label>{' '}
        Program Oluştur ile oluşturduğunuz programda conflict olup olmamasını
        eğer olacaksa ne kadar conflict olacağını seçebilirsiniz.
      </p>
      <p>
        <Label color="green" bold>
          Ders ve Kredi Aralığı:
        </Label>{' '}
        Program Oluştur ile oluşturduğunuz programın minimum ve maksimum ders ve
        kredi aralığını karşılamasını sağlayabilirsiniz.
      </p>
      <p>
        <Label color="green" bold>
          Toplu Section Ekleme:
        </Label>{' '}
        Mesela EC101 dersini kesin almak istiyorsunuz ve hepsinin programda
        nasıl gözüktüğünü merak ediyorsunuz. Tek tek bütün sectionları Seçili
        Dersler kısmına eklemek yerine toplu ekleyebilirsiniz.
      </p>
      <Header color="blue" as="h3">
        Kota Takip nasıl çalışıyor?
      </Header>
      <p>
        Registrationda birden fazla dersin kotasına bakmak istediğiniz zaman bir
        sürü tab açılıyor ve bir kaos meydana geliyor. Sitedeki Kota Takip bütün
        derslerinizin kota bilgilerini tek bir sayfadan kontrol edebilmenizi
        sağlıyor.
      </p>
      <p>
        Kota Takipte şu anlık bildirim ve eposta sistemi aktif değil. Bunun
        sebebi Registrationun siteden gelen isteklere kısa sürede cevap verip
        vermeyeceğini ilk dönem test etmek istememiz. Eğer Registration bir
        sıkıntı çıkarmaz ise 2. dönem istediğiniz dersin size özel (buna bölüm
        ve sınıf kotaları da dahil) kota bildirim sistemini de ekleyeceğim.{' '}
      </p>
      <Header color="blue" as="h3">
        Mobil uygulama gelecek mi?
      </Header>
      <p>
        Mobil uygulama için çalışmalara başladım ve en erken 2. dönem en geç yaz
        okuluna kadar çıkarmayı planlıyorum ancak App Store için senelik 100
        dolar ve Android için tek seferlik 25 dolar gerekiyor. Eğer geliştirmeye
        destek olmak istiyorsanız Patreon sayfasına bakabilirsiniz ya da Flutter
        veya React Native konusunda bilgiliyseniz iletişime geçebilirsiniz.
      </p>
      <Header color="blue" as="h3">
        Mama Kabım ve Meydan nedir?
      </Header>
      <p>
        Mama Kabı takip ettiğiniz kişilerin ya da konuların bulunduğu sayfadır.
        Meydan ise bütün yorumların bulunduğu sayfa.
      </p>

      <Header color="blue" as="h3">
        Kullanıcı adımı değiştirebilir miyim?
      </Header>
      <p>
        Kullanıcı adınızı istediğiniz zaman değiştirebilirsiniz. Ancak çok sık
        değiştirmeyi denemeniz durumunda sistem sizi bir süreliğine
        engelleyebilir.
      </p>
      <Header color="blue" as="h3">
        Tavsiyelerim neden kullanıcı sayfamda gözükmüyor?
      </Header>
      <p>
        Şu anda sadece yorumlarınız kullanıcı sayfanızda gözükmekte.
        Tavsiyelerin de oraya eklenmesi için çeşitli gelişmeler ilerleyen
        zamanlarda olacak.
      </p>

      <Header color="blue" as="h3">
        Yazdığım tavsiyeyi Tavsiyeler sayfasında göremiyorum. Neden?
      </Header>
      <p>
        Bir tavsiyenin onaylanabilmesi için tavsiyenin genel geçer olmaması
        gerekiyor. Aynı zamanda sitede başka yerde yazılabilecek tavsiyeler
        (dersle ilgili bir tavsiye ya da 2. Kuzeyde hayatta kalma tavsiyesi)
        onaylanmamaktadır.
      </p>
      <Header color="blue" as="h3">
        Yazdığım soruyu Sorular sayfasında göremiyorum. Neden?
      </Header>
      <p>
        Yazdığınız soru sitenin başka yerinde cevaplanacak türdeyse ya da genel
        geçer bir soru ise onaylanmayacaktır.
      </p>
      <Header color="blue" as="h3">
        Yorumum neden kaldırıldı?
      </Header>
      <p>
        Eğer yorumunuz küfür, hakaret ya da nefret söylemi içeriyorsa ya da spam
        olduğundan şüpheleniyorsak kaldırılır.
      </p>
      <Header color="blue" as="h3">
        Toplam Pati sayım toplam yorum Pati sayımdan fazla. Neden?
      </Header>
      <p>Anonim olmayan tavsiyeleriniz için de Patileniyorsunuz.</p>
    </div>
  );
};

export default Sss;
