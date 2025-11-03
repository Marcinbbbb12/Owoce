import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './App.css';
//Uzylem gemini do naprawienia błędów w kodzie + sprawdzenie jak obliczyc cene

const CENA_BAZOWA = 75000;
const CENA_FELGI_ALU = 7000;
const CENA_CZUJNIKI = 6500;
const CENA_CLIMATRONIC = 8500;
const CENA_NAWIGACJA = 5000;


const OPCJE_KOLOROW = [
    { value: 'szary', label: 'Szary' },
    { value: 'czerwony', label: 'Czerwony' },
    { value: 'zielony', label: 'Zielony' },
    { value: 'zolty', label: 'Żółty' },
    { value: 'granatowy', label: 'Granatowy'} 
];


const dajObrazekKoloru = (kolor) => {
    if (kolor === 'szary') return "https://i.ibb.co/0VWDWwh1/szary.png";
    if (kolor === 'czerwony') return "https://i.ibb.co/QjFQ3q7s/czerwony.png";
    
    if (kolor === 'zielony') return "https://i.ibb.co/dXTFb34/zielony.png";
    if (kolor === 'zolty') return "https://i.ibb.co/4RvG6RYV/zolty.png";
    if (kolor === 'granatowy') return "https://i.ibb.co/35CRzWrM/granatowy.png";
    return "https://i.ibb.co/396BnZ1h/czerwony.png"; 
}

export default function App() {
 
    const [wybranyKolor, ustawKolor] = useState(OPCJE_KOLOROW[1]); 
    const [maFelgiAlu, ustawFelgiAlu] = useState(false); 
    const [maCzujniki, ustawCzujniki] = useState(false);
    const [maClimatronic, ustawClimatronic] = useState(false); 
    const [maNawigacje, ustawNawigacje] = useState(false); 
    const [cenaCalkowita, ustawCene] = useState(CENA_BAZOWA); 


    useEffect(() => {
        let nowaCena = CENA_BAZOWA;

       
        if (maFelgiAlu) {
            nowaCena = nowaCena + CENA_FELGI_ALU;
        }

        
        if (maCzujniki) {
            nowaCena = nowaCena + CENA_CZUJNIKI;
        }

        
        if (maClimatronic) {
            nowaCena = nowaCena + CENA_CLIMATRONIC;
        }

       
        if (maNawigacje) {
            nowaCena = nowaCena + CENA_NAWIGACJA;
        }

        ustawCene(nowaCena); 
    }, [maFelgiAlu, maCzujniki, maClimatronic, maNawigacje]); 

    const aktualnyURL = dajObrazekKoloru(wybranyKolor.value);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>

           
            <div style={{ textAlign: 'center' }}>
                <img src={aktualnyURL} alt="Samochód" style={{ width: '100%', maxWidth: '300px' }} />
                <h3 style={{ backgroundColor:'#1B5E20', color: 'white', padding: '10px' }}>Konfigurator</h3>
                <p>Wybrany kolor:</p>
            </div>

            <hr />

            
            <label style={{ color: '#1B5E20' }}>Wybierz kolor:</label>
            <Select 
                options={OPCJE_KOLOROW}
                value={wybranyKolor}
                onChange={(opcja) => ustawKolor(opcja)} 
            />

            <hr />

           
            <label style={{ color: '#1B5E20' }}>Felgi</label>
            <div style={{ padding: '10px', backgroundColor: '#E8F5E9' }}>
                <input 
                    type="radio" name="felgi" 
                    checked={!maFelgiAlu} 
                    onChange={() => ustawFelgiAlu(false)}
                /> Stalowe

                <input 
                    type="radio" name="felgi" 
                    checked={maFelgiAlu} 
                    onChange={() => ustawFelgiAlu(true)}
                    style={{ marginLeft: '15px' }}
                /> Aluminiowe (+{CENA_FELGI_ALU} PLN)
            </div>

            <hr />

           
            <label style={{ color: '#1B5E20' }}>Wyposażenie</label>

            <div>
                <input type="checkbox" checked={maCzujniki} onChange={(e) => ustawCzujniki(e.target.checked)} />
                <label>Czujniki parkowania </label>  
            </div>
            <div>
                <input type="checkbox" checked={maClimatronic} onChange={(e) => ustawClimatronic(e.target.checked)} />
                <label>Climatronic </label>
            </div>
            <div>
                <input type="checkbox" checked={maNawigacje} onChange={(e) => ustawNawigacje(e.target.checked)} />
                <label>Nawigacja </label>
            </div>

            <hr />

         
            <div>
                <p style={{ margin: '0 0 5px 0' }}>Cena bazowa: **{CENA_BAZOWA} PLN**</p>
                <h2 style={{ margin: '0' }}>Razem: **{cenaCalkowita} PLN**</h2>
            </div>
        </div>
    );
}
