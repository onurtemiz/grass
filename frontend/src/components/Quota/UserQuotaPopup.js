import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Form,
  Checkbox,
  Divider,
  Dropdown,
} from 'semantic-ui-react';
import { Label } from '../Nav/NavTheme';
import { useDispatch } from 'react-redux';
import { updateDepSemInfo } from '../../reducers/userReducer';

const UserQuotaPopup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotification, setIsNotification] = useState(true);
  const [isEmail, setIsEmail] = useState(false);
  const [selectedDeps, setSelectedDeps] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState();
  const [submitReady, setSubmitReady] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      selectedSemester &&
      selectedDeps.length > 0 &&
      selectedDeps.length < 3
    ) {
      setSubmitReady(true);
    } else {
      setSubmitReady(false);
    }
  }, [selectedDeps, selectedSemester]);

  const semesters = Array.from(Array(9).keys()).map((i) => {
    i++;
    if (i === 9) {
      return {
        key: i,
        value: i,
        text: '8+ Dönem',
      };
    } else {
      return {
        key: i,
        value: i,
        text: `${i}. Dönem`,
      };
    }
  });

  const departments = [
    'Batı Dilleri ve Edebiyatları',
    'Bilgisayar Mühendisliği',
    'Bilgisayar ve Öğretim Teknolojileri Öğretmenliği',
    'Çeviribilim',
    'Dilbilim',
    'Ekonomi',
    'Elektrik Elektronik Mühendisliği',
    'Endüstri Mühendisliği',
    'Felsefe',
    'Fen Bilgisi Öğretmenliği',
    'Fizik',
    'Fizik Öğretmenliği',
    'İlköğretim Matematik Öğretmenliği',
    'İngilizce Öğretmenliği',
    'İnşaat Mühendisliği',
    'İşletme',
    'Kimya',
    'Kimya Öğretmenliği',
    'Kimya Mühendisliği',
    'Makina Mühendisliği',
    'Matematik',
    'Matematik Öğretmenliği',
    'Moleküler Biyololik ve Genetik',
    'Okul Öncesi Öğretmenliği',
    'Psikoloji',
    'Rehberlik ve Psikolojik Danışmanlık',
    'Siyaset Bilimi ve Uluslararası İlişkiler',
    'Sosyoloji',
    'Tarih',
    'Turizm İşletmeciliği',
    'Türk Dili ve Edebiyatı',
    'Uluslararası Ticaret',
    'Yönetim Bilişim Sistemleri',
  ].map((dep) => {
    return {
      key: dep,
      value: dep,
      text: dep,
    };
  });

  const handleDepsChange = (e, data) => {
    setSelectedDeps(data.value);
  };

  const handleSemesterChange = (e, data) => {
    setSelectedSemester(data.value);
  };

  const handleSubmit = () => {
    const data = {
      quotaNotifications: { notification: isNotification, email: isEmail },
      departments: selectedDeps,
      semester: selectedSemester,
    };
    setIsLoading(true);
    dispatch(updateDepSemInfo(data, setIsLoading, setIsOpen));
  };
  return (
    <>
      <Modal open={isOpen}>
        <Modal.Header>
          <Label color="blue">
            Kota Takip İçin Bazı Bilgilere İhtiyacımız Var
          </Label>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            Çoğu dersi alabilmek için belirli bir dönemde ya da bölümde olmanız
            gerekiyor. Sadece sizin alabileceğiniz yerler açıldığı zaman
            bildirim alabilmeniz için lütfen bilgileri doğru doldurun.{' '}
            <Label color="red" bold>
              Eğer ÇAP yapıyorsanız ÇAP yaptığınız bölümü de ekleyin.
            </Label>
            <br />
            <br />
            <Form reply style={{ marginBottom: '1em', marginLeft: '1em' }}>
              <Form.Field>
                <Dropdown
                  placeholder="Bölüm"
                  selection
                  onChange={handleDepsChange}
                  multiple
                  options={departments}
                />
              </Form.Field>

              <Form.Field>
                <Dropdown
                  placeholder="Dönem"
                  clearable
                  selection
                  onChange={handleSemesterChange}
                  options={semesters}
                />
              </Form.Field>
              <Divider />
              <Label color="blue" bold>
                Uygun Kota Varsa(Henüz Aktif Değil):
              </Label>
              <br />
              <br />
              <Form.Field>
                <Checkbox
                  label="Bildirim Yolla"
                  disabled={isLoading}
                  checked={isNotification}
                  value={isNotification}
                  onChange={() => setIsNotification(!isNotification)}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label="Eposta Yolla"
                  disabled={isLoading}
                  value={isEmail}
                  onChange={() => setIsEmail(!isEmail)}
                />
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            disabled={isLoading}
            negative
            content="İptal"
            icon="cancel"
            labelPosition="right"
            onClick={() => setIsOpen(false)}
          />
          <Button
            disabled={!submitReady}
            loading={isLoading}
            positive
            labelPosition="right"
            primary
            icon="checkmark"
            content="Yolla"
            onClick={() => handleSubmit()}
          />{' '}
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default UserQuotaPopup;
