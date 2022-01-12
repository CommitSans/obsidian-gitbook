# Obsidian GitBook
Deploy an Obsidian vault on GitBook.

This is a repository that turns an Obsidian project into a GitBook project, that can be linked with GitHub, so it will be automatically deployed. Just link your GitBook project with your fork of this repo, and run the deploy flow.


## Manual Deployment
You can make the deploy by your own, moving the stuff manually, and making your commits.

Just copy your obsidian project to a directory (in the repo root) called `obsidian`. Commit and push. Every time that new code goes to GitHub, there's an action that automatically build the `obsidian` folder into a GitBook project under the `gitbook` folder.

Every time you want to update the code, copy and paste your obsidian vault into the `obsidian` folder, commit and push. Remember to pull before doing so.


## Automatic deployment
If you don't want to be manually updating your GitBook deployment, you can follow this short guide. You will only need two repos:

### Deploy repository
> You can [see an example here](https://github.com/recursosdisenoes/obsidian-gitbook)

1. Fork this repository, and connect it with GitBook.
2. [Create a Personal Access Token (pat)](https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). *Don't lose this, you will need it later, and there won't be a way to watching it again.*
3. Create a secret in your fork (Settings > Secets), called `DEPLOY_PAT`, and set its value to the PAT you've just created.

### Obsidian repository
> You can [see an example here](https://github.com/recursosdisenoes/example-obsidian)

1. Create a repository for yor Obsidian vault, and push the changes there. You can check [recursos-diseno-es](https://github.com/recursosdisenoes/recursos-diseno-es) as an example (check out the `.gitignore`, it might be useful for your vault)
2. Create a secret in this repo (Settings > Secets), called `DEPLOY_PAT`, and set its value to the PAT you've created before.
3. Create a folder called `.github` and, inside it, another called `workflows`. Right there, add a `build-gitbook.yaml` file like this:

```yaml
name: Launch GitBook deploy workflow
on: push

jobs:
  run:
    name: Launch deploy actions
    runs-on: ubuntu-latest
    steps:
      - name: Deploy GitBook
        uses: actions/github-script@v5
        with:
          github-token: ${{ secrets.DEPLOY_PAT }}
          script: |
            await github.rest.actions.createWorkflowDispatch({
              owner: 'recursosdisenoes',
              repo: 'obsidian-gitbook',
              workflow_id: 'build-gitbook.yml',
              ref: 'main',
              inputs: {
                repo: '${{ github.repository }}',
              },
            });
```

> Update the `owner` and `repo` values with your fork!

4. Push your obsidian repository, and see the actions work together.

And that's all.

As soon as you push code to your Obsidian repository, it will trigget an action in your fork, so it will bring te obsidian vault, transformed into a GitBook project, and deployed automatically.


## Status and known issues:
- [x] Transform Obsidian project in Gitbook project (naming and structure)
- [x] Generate a valid SUMMARY.md
- [x] Remove git related files and folders
- [ ] Transform page links to plain markdown links (next-up)
- [ ] Replace tildes and ñ instead of removing them (next-up)
- [ ] Show all the pages linking to the current one (on the roadmap)
- [ ] Link to blocks (on the roadmap)


## Contributing
This project has been created for the Recursos de Diseño en Español *(Design Resources in Spanish)* project. The goal is to have an Open Source and tool to spread the knowledege in a well structured way.

It's a basic version, built in a few free hours of a few people volunteering. So it might not cover all the features you might want. 

In case you want to add a feature, fix something that is not working propperly or improve some part of the code, feel free to add a PR.
