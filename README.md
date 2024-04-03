# Eneo Energy - SharePoint Framework Project

## Description

Eneo Energy is a comprehensive SharePoint Framework (SPFx) project designed to enhance the functionality and appearance of SharePoint site. It includes a set of extensions for adding custom footer and header and multiple web parts to display various types of content such as agency lists, animated cards, author boxes, and more. The project leverages PrimeReact for UI components, ensuring a rich user experience.

## Features

- **Extensions for Custom Header and Footer**: Easily add header and footers to your SharePoint site.
- **Multiple Web Parts**: Including Agency, Animated Card, Author Box, Button, Card, Card Article, and many others for diverse content display.
- **Global Styling**: Utilizes a `global.scss` file within the `assets/components` folder for consistent styling across all web parts.
- **Customization and Configuration**: Detailed instructions for updating web part properties and styles.

## Prerequisites

Before setting up the project, ensure you have the following:

- SharePoint Online environment
- Latest SPFx development environment
- Node.js (preferably the version compatible with your SPFx version)

## Installation Guide

1. Clone the project from the repository.
2. Navigate to the project directory and run `npm install` to install dependencies.
3. To deploy the solution to SharePoint Online, run `gulp bundle --ship` followed by `gulp package-solution --ship`.
4. Upload the generated package to the SharePoint app catalog and add it to your site.

## Running Locally

To run the project locally and test the web parts:

1. Execute `gulp serve` from the command line within the project directory.
2. This will open the SharePoint workbench, where you can add and interact with the web parts.

## Customizing Web Parts

### Updating Web Part Properties

For example, to update the properties of the Agency web part:

1. Open `AgencyWebPart.ts`.
2. Modify the `getPropertyPaneConfiguration` method as needed.

### Updating Styles

- To update the style for a specific web part, e.g., Agency, look for the `.dx-agency` class in the `global.scss` file and make your adjustments.