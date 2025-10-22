import { useState } from "react";
import React from "react";
import "./App.css";

function Owoce() {
  const [owoce, setOwoce] = useState([
    {
      id: 1,
      typ: "gruszka",
      odmiana: "Pospolita",
      grafika: "Pospolita.jpeg",
      opis: "Najczęściej występująca gruszka w Polsce",
      sztuk: 21,
      cena: 7.55,
    },
    {
      id: 2,
      typ: "gruszka",
      odmiana: "Radana",
      grafika: "Radana.jpg",
      opis: "Odmiana uprawna(kultywar) gruszy nalezaca do grupy grusz zachodnich otrzymywanych w Czechach",
      sztuk: 12,
      cena: 6.5,
    },
    {
      id: 3,
      typ: "gruszka",
      odmiana: "Concorde",
      grafika: "Concorde.jpg",
      opis: "Grusza 'Concorde' to jesienna, angielska odmiana gruszy (Pyrus communis) wyhodowana w 1977 roku",
      sztuk: 15,
      cena: 9.5,
    },
    {
      id: 4,
      typ: "jablko",
      odmiana: "Gala",
      grafika: "Gala.jpg",
      opis: "Odmiana jabłka często spotikana na baziarach",
      sztuk: 9,
      cena: 4.30,
    },
    {
      id: 5,
      typ: "jablko",
      odmiana: "Jonagold",
      grafika: "Jonagold.jpg",
      opis: "Jabłoń Jonagold to popularna odmiana jabłoni domowej pochodząca ze Stanów Zjednoczonych",
      sztuk: 33,
      cena: 4.70,
    },
    {
      id: 6,
      typ: "jablko",
      odmiana: "Antonowka",
      grafika: "Antonowka.jpg",
      opis: "Jabłoń Antonówka to bardzo stara odmiana jabłoni domowej pochodząca z Rosji, prawdopodobnie z byłej guberni kurskiej",
      sztuk: 56,
      cena: 2.70,
    },
    {
      id: 7,
      typ: "sliwka",
      odmiana: "Kalifornijska",
      grafika: "Kalifornijska.jpg",
      opis: "Śliwa kalifornijska 'Petit d’Agen' – odmiana uprawna śliwy domowej.",
      sztuk: 90,
      cena: 5.70,
    },
    {
      id: 7,
      typ: "jablko",
      odmiana: "Ligol",
      grafika: "Ligol.jpg",
      opis: "Jabłko Ligol to polska odmiana jabłoni wyhodowana w 1972 roku w Instytucie Sadownictwa i Kwiaciarstwa w Skierniewicach poprzez skrzyżowanie odmian Golden Delicious i Linda.",
      sztuk: 11,
      cena: 2.20,
    },
    {
      id: 8,
      typ: "sliwka",
      odmiana: "Domowa",
      grafika: "Domowa.jpg",
      opis: "Rodzaj Prunus zaliczany jest tradycyjnie do podrodziny Amygdaloideae (= Prunoideae) w obrębie rodziny różowatych. Podrodzina ta obejmuje obok śliwy jeszcze trzy rodzaje, które wyróżniają się także owocem w postaci pestkowca z pojedynczą twardą pestką otoczoną mięsistą owocnią – Maddenia Hook. f. & Thomson, Oemleria Reichb. i Prinsepia Royle.",
      sztuk: 18,
      cena: 9.20,
    },
    
  ]);

  const [filtry, setFiltry] = useState({
    gruszka: true,
    jablko: true,
    sliwka: true,
  });

  const [koszyk, setKoszyk] = useState({});

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFiltry((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleAddToCart = (owoc) => {
    if (owoc.sztuk <= 0) return alert("Brak owoców na stanie!");

    setOwoce((prev) =>
      prev.map((item) =>
        item.id === owoc.id ? { ...item, sztuk: item.sztuk - 1 } : item,
      ),
    );

    setKoszyk((prev) => ({
      ...prev,
      [owoc.id]: (prev[owoc.id] || 0) + 1,
    }));
  };

  const handleShowCart = () => {
    const wynik = Object.entries(koszyk).map(([id, sztuk]) => ({
      id: Number(id),
      sztuk,
    }));
    console.log("Zawartość koszyka:", wynik);
  };

  const przeFiltrowane = owoce.filter((owoc) => filtry[owoc.typ]);

  return (
    <div className="container mt-4">
      <h1 className="text-center">Owoce</h1>

      <div className="mb-4 text-center">
        <label className="me-3">
          <input
            type="checkbox"
            name="gruszka"
            checked={filtry.gruszka}
            onChange={handleFilterChange}
          />
          Gruszka
        </label>
        <label className="me-3">
          <input
            type="checkbox"
            name="jablko"
            checked={filtry.jablko}
            onChange={handleFilterChange}
          />
          Jablko
        </label>
        <label className="me-3">
          <input
            type="checkbox"
            name="sliwka"
            checked={filtry.sliwka}
            onChange={handleFilterChange}
          />
          Sliwka
        </label>
      </div>

      <div className="row">
        {przeFiltrowane.map((owoc) => (
          <div key={owoc.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={owoc.grafika} alt={owoc.typ} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">
                  {owoc.typ} - {owoc.odmiana}
                </h5>
                <p className="card-text">{owoc.opis}</p>
                <p>
                  <strong>Cena:</strong> {owoc.cena.toFixed(2)} PLN
                </p>
                <p>
                  <strong>Sztuk:</strong> {owoc.sztuk}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(owoc)}
                >
                  Dodaj do koszyka
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-success" onClick={handleShowCart}>
          Pokaż koszyk
        </button>
      </div>
    </div>
  );
}

export default Owoce;
