export const COLLEGES = [
  "A P Shah Institute of Technology (APSIT, Thane)",
  "Veermata Jijabai Technological Institute (VJTI, Mumbai)",
  "Sardar Patel Institute of Technology (SPIT, Mumbai)",
  "Indian Institute of Technology (IIT, Bombay)",
  "Indian Institute of Technology (IIT, Delhi)",
  "College of Engineering Pune (COEP, Pune)",
  "Delhi Technological University (DTU, Delhi)",
  "Birla Institute of Technology and Science (BITS, Pilani)",
  "National Institute of Technology (NIT, Trichy)",
  "Other Educational Institution"
] as const;

export type College = typeof COLLEGES[number];
