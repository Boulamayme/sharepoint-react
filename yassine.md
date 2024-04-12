# Création d'un nouvel SPFx:

    Ouvrez votre terminal.
    Naviguez jusqu'au répertoire où vous souhaitez créer votre projet SPFx.
    Exécutez la commande suivante pour démarrer le processus de création du projet :
      `yo @microsoft/sharepoint`

    Répondre aux questions :

      Vous serez invité à répondre à plusieurs questions pour configurer votre projet. Celles-ci peuvent inclure :
      Le nom de votre solution SharePoint.
      Le nom de votre web part ou de votre extension.
      Le framework JavaScript que vous souhaitez utiliser (par exemple, React, Angular, ou No JavaScript Framework).
      Les composants que vous souhaitez inclure dans votre projet (web part, extension, etc.).


# Tester et exécuter le projet :

    Pour tester votre projet localement, exécutez la commande suivante dans le terminal :
      gulp serve


# Déploiement :

    Une fois que vous avez terminé le développement et que vous êtes prêt à déployer votre solution, vous pouvez utiliser la commande gulp bundle --ship pour créer les packages de déploiement et gulp package-solution --ship pour créer le fichier de solution.