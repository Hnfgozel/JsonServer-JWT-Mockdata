// Uygulamada veri durumları props olarka aktardık
function Dropdown({ data, setSelectedCategory, setSelectedSubCategory }) {
  // Sonuçları Resetlemesi için fonksiyon. 
  function reset() {
    // Durum değerlerini resetliyoruz. 
    setSelectedCategory("");
    setSelectedSubCategory("");
  }

  // Verileri çağırırken her bir index için kategori ve alt kategori 
  // değerlerini tekrar tekrar alıyordu. mesela 1, 3, 5 ürünlerinin
  // kategorisi aynı olsun. hepsi için ayrı ayrı getiriyordu. Burada bir
  // Regülasyon işlemi gerçekleştirdim.
  const uniqueCategory = [...new Set(data.map(item => item.category))];
  const uniqueSubCategory = [...new Set(data.map(item => item.subcategory))];



  // Child componentin JSX render kısmı.
  return (
    <div className="container-fluid">
      {/* Dropdown listesi için değer ve özellikler yükleniyor. */}
      <div className="row">
        <div className="col-sm">
          <select
            className="form-control size"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Category</option>
            {uniqueCategory.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm">
          <select
            className="form-control size"
            onChange={(e) => setSelectedSubCategory(e.target.value)}
          >
            <option value="">Sub-Category</option>
            {uniqueSubCategory.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}

          </select>
        </div>
        <button className="reset" onClick={reset}>
          RESET
        </button>
      </div>
    </div>
  );
}

export default Dropdown;