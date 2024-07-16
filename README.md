# FlickNest

FlickNest, film bilgilerini ve detaylarını görüntülemek için oluşturulmuş bir Next.js ve TypeScript uygulamasıdır. Bu proje, The Movie Database (TMDb) API'sini kullanarak popüler filmleri, film detaylarını ve kategorilere göre film aramalarını sağlar.

## Özellikler

- Popüler filmleri görüntüleyin
- Film detaylarını inceleyin
- Film kategorileri arasında gezinme
- Film arama fonksiyonu
- Sayfa başına film sayısını ve toplam sayfa sayısını gösterir
- Mobil uyumlu ve duyarlı tasarım

## Kurulum

Bu projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin.

### Gerekli Araçlar

- Node.js (>=14.0.0)
- npm veya yarn

### Adımlar

1. **Depoyu klonlayın:**

    ```bash
    git clone https://github.com/kullanici-adiniz/flicknest.git
    cd flicknest
    ```

2. **Gerekli bağımlılıkları yükleyin:**

    ```bash
    npm install
    ```

    veya

    ```bash
    yarn install
    ```

3. **TMDb API anahtarını ayarlayın:**

    Proje dizininde `.env.local` adında bir dosya oluşturun ve içine TMDb API anahtarınızı ekleyin:

    ```plaintext
    NEXT_PUBLIC_TMDB_API_KEY=cb316d4945cc6ec4cfbd735eb6ee2a06
    ```

4. **Geliştirme sunucusunu başlatın:**

    ```bash
    npm run dev
    ```

    veya

    ```bash
    yarn dev
    ```

    Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın. Uygulamanızın çalıştığını görmelisiniz.

## Kullanım

- Ana sayfada popüler filmleri görebilirsiniz.
- Bir film kartına tıklayarak o filmin detay sayfasına gidebilirsiniz.
- Kategoriler arasında geçiş yaparak farklı türdeki filmleri görüntüleyebilirsiniz.
- Arama kutusunu kullanarak belirli bir filmi arayabilirsiniz.

## Ekran Görüntüleri

Aşağıda uygulamanın bazı ekran görüntülerini bulabilirsiniz:

### Ana Sayfa
![Ana Sayfa] ![ana sayfa](https://github.com/user-attachments/assets/39b5019e-f2dc-4786-b8db-5f5a199cb3e7)


### Film Detay Sayfası
![Film Detay Sayfası] ![film detay sayfasi](https://github.com/user-attachments/assets/28548a61-bbd6-4405-aa77-79bcb95eab05)


### Arama Sonuçları
![Arama Sonuçları] ![arama sonuclari](https://github.com/user-attachments/assets/de5ef384-7871-49a1-a484-9be37af8a690)


## Katkıda Bulunma

Katkıda bulunmak isterseniz lütfen bir pull request açın. Her türlü katkı ve geri bildirim memnuniyetle karşılanır.


