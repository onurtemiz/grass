import React, { useState, useEffect } from 'react';
import { Modal, Button, Divider } from 'semantic-ui-react';
import { Label } from '../Nav/NavTheme';
import { useSelector, useDispatch } from 'react-redux';
import { sawModal } from '../../reducers/userReducer';

const FirstTimeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    user.sawModal ? setIsOpen(false) : setIsOpen(true);
  }, [user]);

  const handleAction = () => {
    dispatch(sawModal());
  };

  return (
    <Modal open={isOpen}>
      <Modal.Header>
        <Label color="blue">
          <Label color="green">Çimi</Label> kullanmaya başlamadan önce
        </Label>
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Label color="green" bold style={{ fontSize: '1.5em' }}>
            Sitedeki herhangi bir konuya sadece{' '}
            <Label color="blue" bold>
              bir
            </Label>{' '}
            kez yorum yazabilirsiniz.
          </Label>{' '}
          <br />
          Çimin amacı bir Boğaziçiliye direkt aradığıyla ilgili bilgi
          sağlamaktır.
          <br />
          Bu sebeple içerik çöplüğüyle uğraşmamak ve yazılan yorumların
          kalitesini arttırmak istediğimiz için her bir öğrenci konuyla ilgili
          her dönemde tek bir yorum yazabilir.
          <br />
          Yorumunuzu ardından düzenleyebilir ya da silip yeni bir yorum
          yazabilirsiniz.
          <br />
          <Divider />
          <Label color="green" bold style={{ fontSize: '1.5em' }}>
            Nefret söylemi, hakaret ve spam içerikler{' '}
            <Label color="red" bold>
              yasaktır ve kaldırılacaktır.{' '}
            </Label>{' '}
          </Label>
          <br />
          Moderatörler bir yorumu uygun gördükleri koşulda gizleme veya kaldırma
          hakkına sahiptir.
          <br /> Eğer siteden bir yorumu dışarıdan birileri kaldırtmak isterse{' '}
          <Label color="red" bold>
            en son çare olarak yorum gizlenir.
          </Label>{' '}
          İçeriği gizlenmiş bir yorum örneğini sitenin en eski yorumlarından
          görebilirsiniz.
          <Divider />
          <Label color="green" bold style={{ fontSize: '1.5em' }}>
            Öğrenciler Hariç Giriş Yasak
          </Label>
          <br />
          Öğrenci statüsünde olmayan ve halka açık @boun uzantılı epostalar
          sistemden banlıdır. Güncel banlı eposta listesini{' '}
          <Label color="green" bold pointer>
            buradan
          </Label>{' '}
          görebilirsiniz.
          <br />
          Eğer bir kullanıcının öğrenci olmadığından şüpheleniyorsanız iletişime
          geçin.
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="green"
          content="Okudum ve Onaylıyorum"
          onClick={() => handleAction()}
        />{' '}
      </Modal.Actions>
    </Modal>
  );
};

export default FirstTimeModal;
