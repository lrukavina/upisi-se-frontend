export function pretrazi(str, podaci) {
  const filtriraniPodaci = podaci.filter(item =>
    item.name.toLowerCase().includes(str.toLowerCase())
  );
}
