export function main() {

    // Si on est bien sur la pages de fonction PHP
    if (document.URL.search("indexes.functions.php") != -1) {

        let firstLetter = prompt('Quel est la première lettre de la fonction recherchée ?');
        let nbrOfLetters = prompt('Quelle est la taille de la fonction recherchée ?');

        // On traite si les champs ne sont pas vides
        if ((firstLetter != null && firstLetter !== "") || (nbrOfLetters != null && nbrOfLetters !== "")) {
            // Toutes les fonctions php dans des element.a
            let allFunctions = document.querySelectorAll('li.gen-index ul li a');

            for(let i in allFunctions) {

                let phpFunc = "";
                let element = allFunctions[i];

                if (typeof element.text == "string") {
                    phpFunc = element.text;
                    // Gère les syntax Class::fonction (Ex : ArrayIterator::asort)
                    if(phpFunc.search('::') !== -1) {
                        phpFunc = phpFunc.split("::")[1];
                    }
                    // Si la fonction ne match pas avec la première lettre et la taille recherchées
                    if (!phpFunc.startsWith(firstLetter) || phpFunc.length != nbrOfLetters) {
                        // on supprime l'élément
                        element.parentNode.remove();
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
        } else {
            alert('Réactualisez la page quand vous souhaiterez utiliser le module.');
        }
    } else {
        // Pour lancer la page charger le jeu
        setTimeout(() => {
            let nbrOfLetters = document.querySelectorAll('#grille table tr:first-child td').length;
            let redirect = confirm("Le mot à deviner contient " + nbrOfLetters + " lettres.\nSouhaitez-vous vous rendre sur la documentation php pour trouver des indices ?");
            if(redirect) {
                window.open('https://www.php.net/manual/fr/indexes.functions.php', '_blank');
            }
        }, 1500)
    }
}
