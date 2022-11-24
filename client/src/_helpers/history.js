// react componentleri dışında gezinmeye izin vermek için özel history objesi
/*
 History yardımcısı, dış bileşenler de dahil olmak üzere React uygulamasının
 herhangi bir yerinden React Router navigate() işlevine ve konum özelliğine erişim sağlayan düz bir javascript nesnesidir.
 
 Bu örnekte Redux auth diliminde oturum açma ve oturumu kapatma sırasında gezinmeyi etkinleştirmek gereklidir.

 Properties, React Router useNavigate() ve useLocation() hookları yardımıyla root App componentinde uygulama başlangıcında başlatılır.
*/

export const history = {
    navigate: null,
    location: null
};