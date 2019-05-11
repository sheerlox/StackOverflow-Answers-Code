/**
 * generate.js
 *
 * This script generates a new project in the answers folder,
 * using a selected template from the templates folder.
 *
 * It renders the package.json and README.md files using
 * user-input provided variables.
 *
 * It also adds a line to the "Directory-Answer Map"
 * in the main README.md.
 */

const fs = require('fs-extra')
const path = require('path')
const handlebars = require('handlebars')
const inquirer = require('inquirer')

;(async () => {
  try {
    /**
     * Helpers
     */
    const isDirectory = source =>
      fs.lstatSync(source).isDirectory()
    const getDirectories = source =>
      fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory)
    const popDirectory = source =>
      source.split('/').pop()

    /**
     * User inputs & transformations
     */

    const templates = (await getDirectories(path.join(__dirname, 'templates'))).map(popDirectory)
    const answers = await inquirer
      .prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name'
        },
        {
          type: 'input',
          name: 'projectLink',
          message: 'SO question link',
          validate: (value) => {
            var pass = value.match(
              /https:\/\/stackoverflow.com\/questions\/\d*\/.+/i
            )
            if (pass) {
              return true
            }

            return 'Please enter a valid SO question link'
          }
        },
        {
          type: 'list',
          name: 'templateName',
          message: 'Template to use',
          choices: templates
        }
      ])
    const templateName = answers.templateName
    const projectLink = answers.projectLink

    const projectName = answers.projectName.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
      .replace(/[^a-zA-Z\d\s]/g, '')
      .replace(/\s+(?!\s)(?=$)/g, '')

    const projectId = projectName
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]/g, '')
      .replace(/\s+(?!$)(?!\s)/g, '-')

    /**
     * Main logic
     */

    const templatePath = path.join(__dirname, 'templates', templateName)
    const projectPath = path.join(__dirname, 'answers', projectId)
    await fs.copy(templatePath, projectPath)

    // Handlebars rendering
    const data = {
      projectName,
      projectId,
      projectLink
    }
    const rendered = {
      'package.json': handlebars.compile(fs.readFileSync(path.join(projectPath, 'package.json')).toString())(data),
      'README.md': handlebars.compile(fs.readFileSync(path.join(projectPath, 'README.md')).toString())(data)
    }
    await fs.writeFile(path.join(projectPath, 'package.json'), rendered['package.json'])
    await fs.writeFile(path.join(projectPath, 'README.md'), rendered['README.md'])
    await fs.appendFile(path.join(__dirname, 'README.md'), `\n- [${projectName}](${projectLink})`)
    console.log('Project created at:', popDirectory(__dirname) + '/answers/' + projectId)
  } catch (err) {
    console.error(err)
  }
})()
