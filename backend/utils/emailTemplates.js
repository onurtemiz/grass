const emailVerificationTemplate = (user, link) => {
  return `<style>
  body {
    font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif,
      'Helvetica Neue', Arial, Helvetica, sans-serif;
  }

  .button {
    max-width: 300px;
    text-align: center;
    box-shadow: 0px 0em 0px 0px rgba(34, 36, 38, 0.15) inset;
    background-color: #21ba45;
    text-decoration: none;
    color: #ffffff;
    text-shadow: none;
    background-image: none;
    display: block;
    font-size: 1.15384615rem;
    cursor: pointer;
    min-height: 1em;
    border: none;
    outline: none;
    margin: 0em 0.25em 0em 0em;
    padding: 0.84615385em 1.5em 0.84615385em;
    font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif,
      'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: bold;
    line-height: 1em;
    font-style: normal;
    border-radius: 0.30769231rem;
    transition: opacity 0.1s ease, background-color 0.1s ease,
      color 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
  }
 
</style>
<h1>
  <label style="color: #2185d0;">BOUN</label>
  <label style="color: #21ba45;">ÇİM</label>
</h1>
<b>Merhaba ${user.username},</b>
<p>Çim'i kullanmaya başlayabilmen için emailini onaylamamız gerekiyor.</p>
<p>Emailini onaylamak için aşağıdaki butona basman yeterli.</p>
<p><a href="${link}" class="button">Hesabı Onayla</a></p>

<p>Eğer bu emaili sen istemediysen hiçbir şey yapmana gerek yok.</p>
<p>
  Buton çalışmıyorsa aşağıdaki linke tıklayarak hesabını onaylayabilirsin.
</p>
<a
  href="${link}"
  >${link}</a
>
<p>Teşekkürler,</p>
<p>Boun Çim</p>`;
};

const passwordResetTemplate = (user, link) => {
  return `<style>
  body {
    font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif,
      'Helvetica Neue', Arial, Helvetica, sans-serif;
  }

  .button {
    max-width: 300px;
    text-align: center;
    box-shadow: 0px 0em 0px 0px rgba(34, 36, 38, 0.15) inset;
    background-color: #21ba45;
    text-decoration: none;
    color: #ffffff;
    text-shadow: none;
    background-image: none;
    display: block;
    font-size: 1.15384615rem;
    cursor: pointer;
    min-height: 1em;
    border: none;
    outline: none;
    margin: 0em 0.25em 0em 0em;
    padding: 0.84615385em 1.5em 0.84615385em;
    font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif,
      'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: bold;
    line-height: 1em;
    font-style: normal;
    border-radius: 0.30769231rem;
    transition: opacity 0.1s ease, background-color 0.1s ease,
      color 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
  }
 
</style>
<h1>
  <label style="color: #2185d0;">BOUN</label>
  <label style="color: #21ba45;">ÇİM</label>
</h1>
<b>Merhaba ${user.username},</b>
<p>Çim hesabının şifresini sıfırlamak için talepte bulundun.</p>
<p>Çim şifreni sıfırlamak için aşağıdaki butona tıkla.</p>
<p><a href="${link}" class="button">Şifre Sıfırla</a></p>

<p>Eğer şifreyi sıfırlamayı sen istemediysen hiçbir şey yapmana gerek yok. Eğer endişeleniyorsan bizimle iletişeme geç.</p>
<p>
  Buton çalışmıyorsa aşağıdaki linke tıklayarak şifreni sıfırlayabilirsin.
</p>
<a
  href="${link}"
  >${link}</a
>
<p>Teşekkürler,</p>
<p>Boun Çim</p>`;
};

module.exports = {
  passwordResetTemplate,
  emailVerificationTemplate,
};
