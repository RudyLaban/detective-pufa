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
    setTimeout(() => {
        alert("Le mot à deviner contient " + document.querySelectorAll('#grille table tr:first-child td').length + " lettres. \nRendez-vous sur https://www.php.net/manual/fr/indexes.functions.php pour trouver des indices.");
    }, 1500)
}
