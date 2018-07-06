REST NodeJS – domaći zadatak
Potrebno je napraviti REST web servis koji će manipulisati podacima kroz MongoDB bazu
podataka. Potrebno je napraviti sistem koji čuva podatke o studentima i njihovim položenim
ispitima. Dakle, za svakog studenta se zna ime, prezime, broj indeksa, kao i svi ispiti koje je
položio. i sa kojom ocjenom Od informacija za ispit, čuvati ime. Bazu podataka organizovati po
želji.
Potrebno je implementirati sljedeće akcije:
• insertStudent() - akcija koja treba da unese studenta u bazu podataka
• getAllStudents() akcija koja vraća sve studente I sve informacije o njima
• getBestStudents() - akcija koja vraća najbolja dva studenta. Student A je bolji od studenta B
ako ima veći prosjek. Prosjek studenta se računa na “tradicionalni” način, odnosno kao
prosječna ocjena svih njegovih ispita.
• getStudent(_id), koja vraća studenta sa određenim id-jem
• deleteStudent(_id), koja briše studenta sa određenim id-jem
• updateStudent(_id), koja update-uje informacije o studentu