export function generateRandomName(): string {
  const names = ['Tesla', 'Volkswagen', 'BMW', 'Lexus', 'Mitsubishi', 'Toyota',
    'Mazda', 'Audi', 'Opel', 'Skoda', 'KIA', 'Hyndai', 'Nissan',
    'Ford', 'Jaguar', 'Mercedes', 'Volvo', 'Honda', 'Subaru'];
  const models = ['Tiguan', 'Micra', 'Avensis', 'Solaris', 'Elantra', 'X3', 'X5', 'Galant',
    'Lancer', 'Mondeo', 'Octavia', 'Skyline', 'Juke', 'Sportage', 'Mustang', 'Ls',
    'Golf', 'Camry', 'Carnival', 'Optima', 'Yaris', 'Corolla'];
  const randomName = Math.floor(Math.random() * names.length);
  const randomModel = Math.floor(Math.random() * names.length);
  const name = `${names[randomName]} ${models[randomModel]}`;
  return name;
}
