document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const contactsList = document.getElementById('contacts-list');

    // Fonction pour ajouter un contact
    function addContact(contact) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${contact.nom}</strong> - ${contact.email} - ${contact.telephone}`;
        contactsList.appendChild(li);
    }

    // Fonction pour lire le fichier XML et afficher les contacts
    function loadContacts() {
        // Remplacer le chemin du fichier XML par le vôtre
        fetch('projet.xml')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, 'text/xml');
                const contacts = xml.querySelectorAll('contact');
                contacts.forEach(contact => {
                    const nom = contact.querySelector('nom').textContent;
                    const email = contact.querySelector('email').textContent;
                    const telephone = contact.querySelector('telephone').textContent;
                    addContact({ nom, email, telephone });
                });
            });
    }

    loadContacts();

    // Écouteur d'événement pour soumettre le formulaire d'ajout de contact
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nom = contactForm.nom.value;
        const email = contactForm.email.value;
        const telephone = contactForm.telephone.value;

        // Création du nouveau contact
        const newContact = { nom, email, telephone };
        addContact(newContact);

        // Remplacer le chemin du fichier XML par le vôtre
        const xmlString = `<contact><nom>${nom}</nom><email>${email}</email><telephone>${telephone}</telephone></contact>`;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

        fetch('projet.xml', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/xml'
            },
            body: xmlDoc
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Erreur:', error));
    });
});
