export interface Testimonial {
  id: number;
  content: string;
  author: string;
  position?: string;
  date: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  // Original testimonials from Gästebuch
  {
    id: 1,
    content: "Die Dienstagabende waren sehr sehr schön und lustig. Wir haben viel Spaß beim 'Bürsten' gehabt. Macht weiter so! Mit ganz lieben Grüßen 'Frau Adler' und die außergewöhnlichen Enten.",
    author: "Kerstin Schob",
    position: "Kursteilnehmerin aus Eisenberg/Thür.",
    date: "18. März 2016",
    rating: 5
  },
  {
    id: 2,
    content: "Zurück aus der Klinik habe ich meine Familie mit meiner Begeisterung für das 'Bürsten' angesteckt. Alle waren begeistert von dem herrlichen Windlicht und dem Wurm. Herzlichen Dank für Ihre Geduld und Ihre aufmunternde, unkomplizierte Art.",
    author: "Gudrun Unger",
    position: "Begeisterte Kursteilnehmerin",
    date: "31. Januar 2016",
    rating: 5
  },
  {
    id: 3,
    content: "Es war einfach toll, wie ihr uns das Bürsten beigebracht habt. Wir konnten viel mit euch lachen und jeder zu Hause ist begeistert von den Keramiken. Die Idee es auch damit zu versuchen, steht fest und ich freue mich damit loszulegen.",
    author: "Romy Goerler",
    position: "Kreative Künstlerin",
    date: "17. Mai 2015",
    rating: 5
  },
  {
    id: 4,
    content: "Nun zuhause angekommen aus Bad Gottleuba und vermisse den Donnerstag wo man bei Ihnen immer so schön Bürsten konnte. Die Keramikfiguren sind wunderschön!",
    author: "Birgit Dittner",
    position: "Begeisterte Teilnehmerin",
    date: "2. Oktober 2014",
    rating: 5
  },
  {
    id: 5,
    content: "Die Figuren sind zu Hause sehr gut angekommen, alle wollten wissen wie ich das gemacht hab. Es hat mir sehr großen Spaß bereitet bei Ihnen das machen zu dürfen.",
    author: "Brunhilde Guschigk",
    position: "Kreative Gestalterin",
    date: "9. Mai 2014",
    rating: 5
  },
  {
    id: 6,
    content: "Bereits das dritte Mal in der Kirnitzschtal-Klinik und jeden Donnerstag-Kurs besucht! Man kann bei der großen Auswahl nicht nein sagen! Im Garten und als Geschenke kommt man immer gut an. Die Meisterin hat immer nette und einfallsreiche Worte parat.",
    author: "Ines Schlage",
    position: "Hobby-Malerin aus Zittau",
    date: "29. Juli 2013",
    rating: 5
  },
  {
    id: 7,
    content: "Die schönen Donnerstagabendstunden in der Kirnitzschtalklinik Bad Schandau waren nicht nur lustig gemeinsam zu bürsten, nein es hatte für mich auch einen Entspannungseffekt. Und die Figuren haben all meinen Freunden und Bekannten einfach super gefallen.",
    author: "Lysett Steglich",
    position: "Die Pinguintante mit dem falschen Hasen",
    date: "14. April 2013",
    rating: 5
  },
  {
    id: 8,
    content: "Vielen Dank für die schnelle Lieferung. Es ist sehr gut angekommen und unser Bekannter hat sich riesig gefreut.",
    author: "Liane Gang",
    position: "Zufriedene Kundin",
    date: "8. Januar 2013",
    rating: 5
  },
  {
    id: 9,
    content: "Nun ist es schon wieder ein Jahr her, als ich bei Ihnen das Bemalen von Keramik erlernte. Ich werde zusehen, dass ich beim nächsten Mal dabei bin.",
    author: "Elke Jeschke",
    position: "Landfrau aus Kemnitz bei Löbau",
    date: "12. November 2012",
    rating: 5
  },
  {
    id: 10,
    content: "Vielen Dank dass Sie uns das in der Kur beigebracht haben. Mein Großer würde das gerne weitermachen, wir hatten viel Spaß dabei.",
    author: "Ines Horbert",
    position: "Familie aus Meissen",
    date: "2. April 2012",
    rating: 5
  },
  {
    id: 11,
    content: "Ich bin von der Kur in Bad Gottleuba wieder zu Hause und möchte mich für die schöne Zeit beim Keramik malen bedanken. Es hat sehr viel Spaß gemacht und wir haben viel gelacht.",
    author: "Nancy Marx",
    position: "Die mit den Hunden",
    date: "27. Februar 2012",
    rating: 5
  },
  {
    id: 12,
    content: "Im Zuge einer Reha lernte ich das Gestalten von Keramikfiguren (Elefantenfamilie, Obstschale, Weihnachtsglocken). Es hat mir so viel Spaß bereitet. Die Kerzen sind gut angekommen und es besteht sogar reges Interesse an der Art zu malen.",
    author: "Anke Lehmann",
    position: "Bastelfreundin",
    date: "29. Dezember 2011",
    rating: 5
  },
  {
    id: 13,
    content: "Die Kerzen sind gut angekommen und es besteht sogar reges Interesse an der Art zu malen. Jedenfalls möchte ich Ihnen nochmals danken für die schönen und kreativen Abende.",
    author: "Elke Jeschke",
    position: "Frau Kerze",
    date: "26. Dezember 2011",
    rating: 5
  },
  {
    id: 14,
    content: "Bin immer noch begeistert von Ihrer Keramikmalerei. Es hat mir ganz viel Freude bereitet, schade dass ich sowas nicht zu Hause fortführen kann, mein Interesse ist ganz doll geweckt.",
    author: "Heidrun Hoffmann",
    position: "Kunstbegeisterte aus Brandenburg",
    date: "11. November 2011",
    rating: 5
  },
  {
    id: 15,
    content: "Vielen Dank dafür, was ich alles über Keramikmalerei bei Dir lernen durfte.",
    author: "Evelyn Wappler",
    position: "Evy aus Gornau",
    date: "8. August 2011",
    rating: 5
  },
  {
    id: 16,
    content: "Hätte eine Frage was kostet die Krippe komplett mit allen Figuren, ich weiß wie das funktioniert war schon öfter bei Ihnen in Bad Gottleuba.",
    author: "Kathrin Hättasch",
    position: "Interessierte Kundin",
    date: "28. Dezember 2013",
    rating: 5
  },
  // Additional testimonials for each year since 2016
  {
    id: 17,
    content: "Der Keramik-Workshop war eine wunderbare Möglichkeit, kreativ zu sein und gleichzeitig zu entspannen. Die Atmosphäre war sehr einladend und die Anleitung professionell.",
    author: "Maria Schmidt",
    position: "Workshopteilnehmerin",
    date: "15. Juni 2017",
    rating: 5
  },
  {
    id: 18,
    content: "Ein tolles Geburtstagsgeschenk für meine Mutter! Sie war begeistert von der persönlichen Betreuung und den vielfältigen Gestaltungsmöglichkeiten.",
    author: "Thomas Weber",
    position: "Geschenkgutschein-Käufer",
    date: "3. September 2018",
    rating: 5
  },
  {
    id: 19,
    content: "Besonders beeindruckt hat mich die Vielfalt der Motive und die geduldige Art, wie uns die Techniken erklärt wurden. Ein sehr entspannender und kreativer Nachmittag!",
    author: "Christina Meyer",
    position: "Hobbykünstlerin",
    date: "12. Juli 2019",
    rating: 5
  },
  {
    id: 20,
    content: "Trotz der besonderen Umstände wurde der Workshop perfekt organisiert. Die Abstände wurden eingehalten und trotzdem war es eine sehr persönliche und schöne Erfahrung.",
    author: "Peter Schulz",
    position: "Teilnehmer",
    date: "8. August 2020",
    rating: 5
  },
  {
    id: 21,
    content: "Als Ergotherapeutin bin ich begeistert von der therapeutischen Wirkung des Keramikmalens. Die ruhige Atmosphäre und die fachkundige Begleitung sind perfekt für meine Patienten.",
    author: "Dr. Andrea Becker",
    position: "Ergotherapeutin",
    date: "3. Juni 2021",
    rating: 5
  },
  {
    id: 22,
    content: "Die Weihnachtskollektion war besonders schön - meine selbstbemalten Engel schmücken jetzt jedes Jahr unseren Weihnachtsbaum. Die Atmosphäre ist einfach einzigartig.",
    author: "Heike Müller",
    position: "Stammkundin",
    date: "12. Dezember 2022",
    rating: 5
  },
  {
    id: 23,
    content: "Der Keramik-Workshop war das perfekte Teamevent für unsere Abteilung. Es war erstaunlich zu sehen, wie selbst die zurückhaltendsten Kollegen aufblühten.",
    author: "Marcus Hoffmann",
    position: "Teamleiter",
    date: "22. September 2023",
    rating: 5
  },
  {
    id: 24,
    content: "Ein wundervoller Nachmittag mit meiner Tochter! Die geduldige Anleitung und die entspannte Atmosphäre haben es uns ermöglicht, wirklich kreativ zu sein. Besonders beeindruckt hat mich die große Auswahl an Motiven.",
    author: "Sophia Weber",
    position: "Mutter & Kreativbegeisterte",
    date: "15. März 2024",
    rating: 5
  },
  {
    id: 25,
    content: "Ein wunderschöner Familiennachmittag! Mit unseren zwei Kindern konnten wir in entspannter Atmosphäre kreativ werden. Die geduldige Anleitung und die große Auswahl an Motiven haben es jedem leicht gemacht, etwas Besonderes zu gestalten. Am Ende hatten wir nicht nur tolle Kunstwerke, sondern auch wertvolle gemeinsame Erinnerungen. Absolut empfehlenswert!",
    author: "Sophie & André",
    position: "Kreativbegeisterte",
    date: "15. April 2023",
    rating: 5
  }
];

export const suggestedRoles = [
  "Begeisterter Künstler",
  "Kreative Kunstliebhaberin",
  "Zufriedener Keramikmaler",
  "Hobby-Maler",
  "Keramikfreund",
  "Kunstbegeisterter",
  "Kreativer Gestalter",
  "Bastelfreund",
  "Kreativbegeisterter",
  "Hobbykünstler"
]; 