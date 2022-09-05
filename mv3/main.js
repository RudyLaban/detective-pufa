// Si on est bien sur la pages de fonction PHP
if (document.URL.search("indexes.functions.php") != -1) {

    let launchInvestigation = confirm("Souhaitez-vous que Détective Pufa vous aide a trouver le motus pufa.afup.org/ du jours ? Il vous faut la première et le nombre de lettre du mot à trouver.");
    if(launchInvestigation) {

        let firstLetter = prompt('Quel est la première lettre du mot recherchée ?');
        let nbrOfLetters = prompt('Quelle est la taille du mot recherchée ?');
        // On traite si les champs ne sont pas vides
        if ((firstLetter != null && firstLetter !== "") || (nbrOfLetters != null && nbrOfLetters !== "")) {
            // Toutes les fonctions php dans des element.a
            let allFunctions = document.querySelectorAll('li.gen-index ul li a');
            let counter = allFunctions.length;

            for(let i in allFunctions) {

                let phpFunc = "";
                let element = allFunctions[i];

                if (typeof element.text == "string") {
                    phpFunc = element.text;
                    // Gère les syntaxes Class::fonction (Ex : ArrayIterator::asort)
                    if(phpFunc.search('::') !== -1) {
                        phpFunc = phpFunc.split("::")[1];
                    }
                    // Si la fonction ne match pas avec la première lettre et la taille recherchées
                    if (!phpFunc.startsWith(firstLetter) || phpFunc.length != nbrOfLetters) {
                        // on supprime l'élément
                        element.parentNode.remove();
                        counter--;
                    }
                }
            }

            // Suppression des éléments restant vide
            let genIndexUL = document.querySelectorAll('li.gen-index ul');
            for(let i in genIndexUL) {

                let element = genIndexUL[i];

                if(typeof(element) == "object") {

                    if(element.children.length == 0) {
                        element.parentNode.remove();
                    }
                }
            }

            alert("l'enquête a relevée " + counter + " mots potentiels. Bonne chance !")
        } else {
            alert('Réactualisez la page quand vous souhaiterez utiliser le module.');
        }
    }
} else {
    // Modal affichant les règles
    let target = document.querySelector('div#panel-area');
    debugger;
    if (target.style.display === 'block') {

        // Lance la le compteur de lettre et le popup de redirection si la modale disparait
        let observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                proposeRedirect();
            });
        });
        // Check si la modale disparait en observant son style
        observer.observe(target, {
            attributes: true,
            attributeFilter: ['style']
        });
    }

    proposeRedirect();

    // Propose une redirection vers la doc PHP
    function proposeRedirect() {
        // Pour laisser la page charger le jeu
        setTimeout(() => {

            let nbrOfLetters = document.querySelectorAll('#grille table tr:first-child td').length;
            let redirect = confirm("Le mot à deviner contient " + nbrOfLetters + " lettres.\nSouhaitez-vous vous rendre sur la documentation php pour trouver des indices ?");
            if(redirect) {
                window.open('https://www.php.net/manual/fr/indexes.functions.php', '_blank');
            }
        }, 2000)
    }
}
