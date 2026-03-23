async function run() {
  const res = await fetch('https://www.exploregis.ro/trasee-turistice/carpatii-orientali/muntii-ceahlau/');
  const text = await res.text();
  console.log(text);
}
run();
