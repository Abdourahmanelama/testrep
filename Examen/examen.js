document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');
    
    // Fonction pour ajouter un contact à la liste
    function addContact(name, email, phone) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${name}</strong>: ${email}, ${phone} <button class="delete">Supprimer</button>`;
        contactList.appendChild(li);
    }
    
    // Lecture du fichier XML (simulation)
    // Supposons que le fichier XML a déjà été chargé et stocké dans une variable contactsXML
    
    // Simulation des contacts à partir du fichier XML
    const contactsXML = `<contacts>
                            <contact>
                                <name>Diouf</name>
                                <email>abdoulayediouf@gmail.com</email>
                                <phone>78901-456 123</phone>
                            </contact>
                            <contact>
                                <name>fall</name>
                                <email>fallala@gmail.com</email>
                                <phone>77-654-3210</phone>
                            </contact>
                        </contacts>`;
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(contactsXML, 'text/xml');
    const contacts = xmlDoc.getElementsByTagName('contact');
    
   
    
    // Ajout de contact
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = contactForm.elements['name'].value;
        const email = contactForm.elements['email'].value;
        const phone = contactForm.elements['phone'].value;
        
        addContact(name, email, phone);
        
        // Effacer les champs du formulaire après l'ajout
        contactForm.reset();
    });
    
    // Modification de contact
contactList.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit')) {
        const li = event.target.parentElement;
        const nameElement = li.querySelector('.name');
        const emailElement = li.querySelector('.email');
        const phoneElement = li.querySelector('.phone');
        
        const newName = prompt('Entrez le nouveau nom:', nameElement.textContent);
        const newEmail = prompt('Entrez le nouvel email:', emailElement.textContent);
        const newPhone = prompt('Entrez le nouveau téléphone:', phoneElement.textContent);
        
        if (newName && newEmail && newPhone) {
            nameElement.textContent = newName;
            emailElement.textContent = newEmail;
            phoneElement.textContent = newPhone;
            
            // Mettre à jour le fichier XML (simulation)
            const contact = li.getElementsByTagName('contact')[0];
            contact.getElementsByTagName('name')[0].textContent = newName;
            contact.getElementsByTagName('email')[0].textContent = newEmail;
            contact.getElementsByTagName('phone')[0].textContent = newPhone;
        }
    }
});

// Ajout de boutons d'édition aux contacts existants
for (let i = 0; i < contacts.length; i++) {
    const name = contacts[i].getElementsByTagName('name')[0].textContent;
    const email = contacts[i].getElementsByTagName('email')[0].textContent;
    const phone = contacts[i].getElementsByTagName('phone')[0].textContent;
    addContact(name, email, phone);
}

function addContact(name, email, phone) {
    const li = document.createElement('li');
    li.innerHTML = `<strong class="name">${name}</strong>: <span class="email">${email}</span>, <span class="phone">${phone}</span> 
    <button class="edit">Modifier</button> <button class="delete">Supprimer</button>`;
    contactList.appendChild(li);
}

    // Suppression de contact
    contactList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            event.target.parentElement.remove();
        }
    });
});
