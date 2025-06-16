export const Rot13 = {
  map: null,
  init: function () {
    if (this.map != null) {
      return;
    }

    let e = {};
    const t = "abcdefghijklmnopqrstuvwxyz";
    // Inicjalizacja mapy dla małych liter
    for (let i = 0; i < t.length; i++) {
      e[t.charAt(i)] = t.charAt((i + 13) % 26);
    }
    // Inicjalizacja mapy dla dużych liter
    for (let i = 0; i < t.length; i++) {
      e[t.charAt(i).toUpperCase()] = t.charAt((i + 13) % 26).toUpperCase();
    }

    this.map = e; // Zapisz mapę do obiektu
  },
  convert: function (str) {
    this.init(); // Upewnij się, że mapa została zainicjalizowana

    let result = "";
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      // Sprawdź, czy znak jest literą i jest w mapie
      result += this.map[char] || char;
    }

    return result;
  },
  decode: function () {
    let obf = document.querySelectorAll(".obf");
    obf.forEach((single) => {
      single.classList.remove("obf");
      single.innerHTML = this.convert(single.innerHTML);
    })
  }
};
