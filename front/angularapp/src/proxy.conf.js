/* SE COMENTA PARA BORRAR EL ERRO DE LA TERMINAL*/

const PROXY_CONFIG = [
  {
    context: ["/weatherforecast"],
    target: "https://localhost:7008",
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
