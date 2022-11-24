# JsonServer-JWT-Mockdata
json-server kullanılarak oluşturulmuş bir Fake REST API JWT uyuglaması

Endpointler yüklendi, login,register

# Yükleme kısmı
Server ve Client  dependencilerini yüklemek için tek bir komuta indirgedim. Ana dizindeyken aşağıdaki komut ile çalıştırabilirsiniz.

```
 npm run install-dependencies
```

Dependencileri klasörlere gidip ayrı ayrı yüklemek ve çalıştırmak da mümkün

Server :

```bash
cd server
$ npm install
$ npm run start-auth

```
Client :

```bash
cd client
$ npm install
$ npm run start

```

#Post endpointleri 
Şu adreslere POST isteğinde bulunarak kayıt olma / giriş yapma eylemlerini gerçekleştirebilirsiniz

```
POST http://localhost:4000/auth/login
POST http://localhost:4000/auth/register
```
Ek olarak react client de .env dosyasında Api portunu da 4000 olarak ayarlamayı unutmayın. 

Sunucu başladıktan sonra ve login olduktan sonra aşağıdaki adresten fake verilere erişebilirsiniz.
```
GET http://localhost:4000/auth/login/books
```

